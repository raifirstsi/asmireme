import { NextRequest, NextResponse } from "next/server";
import { getToolBySlug } from "@/data/tools-data";
import { isValidOutboundUrl, generateVisitorHash } from "@/lib/security";
import { verifyReferralCookie } from "@/lib/referral";
import { verifySessionToken } from "@/services/auth";
import { db } from "@/db";
import { 
  referralClicks, memberProfiles, subscriptions, 
  activeToolSlots, memberAffiliateLinks 
} from "@/db/schema";
import { eq, and } from "drizzle-orm";

const BOT_USER_AGENTS = ["googlebot", "bingbot", "gptbot", "perplexitybot", "claudebot", "applebot"];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return new NextResponse("Requested AI tool was not found in catalog.", { status: 404 });
  }

  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();
  const visitorHash = generateVisitorHash(ip, userAgent);
  const referer = request.headers.get("referer") || "direct";

  // Target URL defaults to site owner (Admin) affiliate link
  let targetUrl = tool.adminAffiliateUrl;
  let reasonCode = "fallback_no_cookie";
  let attributedMemberId: string | null = null;
  let isFallback = true;

  // Branch 1: Known search or AI bot
  const isBot = BOT_USER_AGENTS.some((b) => userAgent.includes(b));
  if (isBot) {
    reasonCode = "bot_crawler_clean";
    return issueRedirect(targetUrl, reasonCode, isFallback, attributedMemberId, visitorHash, tool.slug, referer);
  }

  // Branch 2: Read 365-day signed HMAC referral cookie
  const refCookie = request.cookies.get("asmire_ref")?.value;
  const sessionCookie = request.cookies.get("asmire_session")?.value;
  const loggedInUser = sessionCookie ? verifySessionToken(sessionCookie) : null;

  if (refCookie) {
    const verifiedRef = verifyReferralCookie(refCookie);

    if (verifiedRef) {
      const memberId = verifiedRef.memberId;

      // Branch 6: Self-referral guard
      if (loggedInUser && loggedInUser.memberId === memberId) {
        reasonCode = "self_referral_blocked";
        return issueRedirect(targetUrl, reasonCode, true, null, visitorHash, tool.slug, referer);
      }

      // Branch 3: Verify member status, plan limits, and active slots
      try {
        const profile = await db.select().from(memberProfiles).where(eq(memberProfiles.id, memberId));

        if (profile.length === 0 || profile[0].status !== "ACTIVE") {
          // Member not found or suspended
          reasonCode = "fallback_member_suspended";
        } else if (!tool.allowMemberLinks) {
          // Tool vendor restricts member links
          reasonCode = "fallback_tool_restricted";
        } else {
          // Check Subscription (Standard vs Pro)
          const sub = await db
            .select()
            .from(subscriptions)
            .where(and(eq(subscriptions.userId, profile[0].userId), eq(subscriptions.status, "ACTIVE")));

          const isPro = sub.length > 0 && sub[0].planId === "PRO" && new Date(sub[0].currentPeriodEnd) > new Date();

          let isToolInEntitlement = false;

          if (isPro) {
            // Pro plan has unlimited access to all tools
            isToolInEntitlement = true;
          } else {
            // Standard plan: tool MUST be chosen in member's 3 active slots
            const slots = await db
              .select()
              .from(activeToolSlots)
              .where(and(eq(activeToolSlots.userId, profile[0].userId), eq(activeToolSlots.toolSlug, tool.slug)));
            
            isToolInEntitlement = slots.length > 0;
          }

          if (!isToolInEntitlement) {
            // Tool is not in member's active 3 slots
            reasonCode = "fallback_plan_limit";
          } else {
            // Check if member entered a valid affiliate link for this tool
            const links = await db
              .select()
              .from(memberAffiliateLinks)
              .where(and(eq(memberAffiliateLinks.userId, profile[0].userId), eq(memberAffiliateLinks.toolSlug, tool.slug)));

            if (links.length > 0 && links[0].status === "VALID" && links[0].affiliateUrl) {
              // SUCCESS! Attributed to member
              targetUrl = links[0].affiliateUrl;
              reasonCode = "attributed_member";
              attributedMemberId = memberId;
              isFallback = false;
            } else {
              // Member has slot but has not entered link
              reasonCode = "fallback_tool_not_linked";
            }
          }
        }
      } catch (dbErr) {
        // Fallback gracefully on DB error
        reasonCode = "fallback_no_cookie";
      }
    } else {
      // Cookie was tampered or expired (> 365 days)
      reasonCode = "fallback_no_cookie";
    }
  }

  return issueRedirect(targetUrl, reasonCode, isFallback, attributedMemberId, visitorHash, tool.slug, referer);
}

async function issueRedirect(
  targetUrl: string,
  reasonCode: string,
  isFallback: boolean,
  attributedMemberId: string | null,
  visitorHash: string,
  toolSlug: string,
  referer: string
) {
  // Security check: validate outbound target
  if (!isValidOutboundUrl(targetUrl)) {
    return new NextResponse("Security Alert: Invalid target URL rejected.", { status: 400 });
  }

  const parsed = new URL(targetUrl);

  // Log click event asynchronously
  try {
    await db.insert(referralClicks).values({
      visitorHash,
      toolSlug,
      pagePath: referer,
      attributedMemberId: attributedMemberId as any,
      isFallback,
      reasonCode,
      targetUrlHost: parsed.hostname,
    });
  } catch (err) {
    // Non-blocking log
  }

  const response = NextResponse.redirect(targetUrl, 307);
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set("Referrer-Policy", "no-referrer-when-downgrade");

  return response;
}
