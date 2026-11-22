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

// 1. Comprehensive bot and crawler list
export const dynamic = "force-dynamic";
export const revalidate = 0;

const BOT_USER_AGENTS = [
  "googlebot", "bingbot", "gptbot", "perplexitybot", "claudebot", "applebot",
  "bot", "crawler", "spider", "headless", "slurp", "facebookexternalhit",
  "lighthouse", "bytespider", "yandex", "duckduckbot", "baiduspider",
  "semrush", "ahrefs", "mj12bot", "petalbot", "screaming frog", "curl", "wget", "python"
];

// 2. In-memory click deduplication debounce cache (5-second window per visitor + tool)
const clickDedupeCache = new Map<string, number>();

// Slug aliases map to ensure zero affiliate 404 leakage
const SLUG_ALIASES: Record<string, string> = {
  ghl: "highlevel",
  gohighlevel: "highlevel",
  claude: "claude-ai",
  murf: "murf-ai",
  did: "d-id",
  make: "make",
  apollo: "apollo-ai",
  instantly: "instantly-ai",
  clay: "clay-ai",
  surfer: "surfer-seo",
  surferseo: "surfer-seo",
  bubble: "bubble-io",
  glide: "glide-apps",
  bolt: "bolt-new",
  canva: "canva-ai",
  leonardo: "leonardo-ai",
  fathom: "fathom-ai",
  pika: "pika-labs",
  opus: "opusclip",
  tenweb: "10web",
  kling: "kling-ai",
  luma: "luma-dream-machine",
  minimax: "minimax-video",
  flux: "flux-ai",
  krea: "krea-ai",
  recraft: "recraft-ai",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const normalizedSlug = (slug || "").toLowerCase();
  const resolvedSlug = SLUG_ALIASES[normalizedSlug] || normalizedSlug;
  const tool = getToolBySlug(resolvedSlug);

  if (!tool) {
    return new NextResponse("Requested AI tool was not found in catalog.", { status: 404 });
  }

  // CRITICAL: Block Next.js & browser speculative prefetch requests from triggering click analytics
  const isPrefetch =
    request.headers.get("next-router-prefetch") === "1" ||
    request.headers.get("purpose") === "prefetch" ||
    request.headers.get("sec-purpose") === "prefetch" ||
    request.headers.get("x-purpose") === "preview" ||
    request.headers.get("x-moz") === "prefetch";

  if (isPrefetch) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
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

  // Known search engine or AI bot - redirect cleanly without recording telemetry
  const isBot = BOT_USER_AGENTS.some((b) => userAgent.includes(b));
  if (isBot) {
    return createCleanRedirect(targetUrl);
  }

  // Session check for self-referral guard
  const sessionCookie = request.cookies.get("asmire_session")?.value;
  const loggedInUser = sessionCookie ? verifySessionToken(sessionCookie) : null;

  // Read 365-day signed HMAC referral cookie
  const refCookie = request.cookies.get("asmire_ref")?.value;
  if (refCookie) {
    const verifiedRef = verifyReferralCookie(refCookie);

    if (verifiedRef) {
      const memberId = verifiedRef.memberId;

      // Self-referral handling: allow member to test and verify their own affiliate links
      const isSelfVisit = Boolean(loggedInUser && loggedInUser.memberId === memberId);

      try {
        const profile = await db.select().from(memberProfiles).where(eq(memberProfiles.id, memberId));

        if (profile.length === 0 || profile[0].status !== "ACTIVE") {
          reasonCode = "fallback_member_suspended";
        } else if (!tool.allowMemberLinks) {
          reasonCode = "fallback_tool_restricted";
        } else {
          const sub = await db
            .select()
            .from(subscriptions)
            .where(and(eq(subscriptions.userId, profile[0].userId), eq(subscriptions.status, "ACTIVE")));

          const isPro = sub.length > 0 && sub[0].planId === "PRO" && new Date(sub[0].currentPeriodEnd) > new Date();

          let isToolInEntitlement = false;
          if (isPro) {
            isToolInEntitlement = true;
          } else {
            const slots = await db
              .select()
              .from(activeToolSlots)
              .where(and(eq(activeToolSlots.userId, profile[0].userId), eq(activeToolSlots.toolSlug, tool.slug)));
            isToolInEntitlement = slots.length > 0;
          }

          if (!isToolInEntitlement) {
            reasonCode = "fallback_plan_limit";
          } else {
            const links = await db
              .select()
              .from(memberAffiliateLinks)
              .where(and(eq(memberAffiliateLinks.userId, profile[0].userId), eq(memberAffiliateLinks.toolSlug, tool.slug)));

            if (links.length > 0 && links[0].status === "VALID" && links[0].affiliateUrl) {
              targetUrl = links[0].affiliateUrl;
              reasonCode = isSelfVisit ? "self_test_attributed" : "attributed_member";
              attributedMemberId = memberId;
              isFallback = false;
            } else {
              reasonCode = "fallback_tool_not_linked";
            }
          }
        }
      } catch (dbErr) {
        reasonCode = "fallback_no_cookie";
      }
    } else {
      reasonCode = "fallback_no_cookie";
    }
  }

  return issueRedirect(targetUrl, reasonCode, isFallback, attributedMemberId, visitorHash, tool.slug, referer);
}

function createCleanRedirect(targetUrl: string) {
  if (!isValidOutboundUrl(targetUrl)) {
    return new NextResponse("Security Alert: Invalid target URL rejected.", { status: 400 });
  }
  const response = NextResponse.redirect(targetUrl, 307);
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set("Referrer-Policy", "no-referrer-when-downgrade");
  return response;
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
  if (!isValidOutboundUrl(targetUrl)) {
    return new NextResponse("Security Alert: Invalid target URL rejected.", { status: 400 });
  }

  const parsed = new URL(targetUrl);
  const now = Date.now();
  const dedupeKey = `${visitorHash}:${toolSlug}`;
  const lastClickTime = clickDedupeCache.get(dedupeKey);

  // Anti-Duplicate Debounce Window: Ignore duplicate clicks within 5 seconds from the same visitor
  const isDuplicate = lastClickTime && now - lastClickTime < 5000;

  if (!isDuplicate) {
    clickDedupeCache.set(dedupeKey, now);

    // Keep cache bounded
    if (clickDedupeCache.size > 5000) {
      const cutoff = now - 60000;
      for (const [k, v] of clickDedupeCache.entries()) {
        if (v < cutoff) clickDedupeCache.delete(k);
      }
    }

    // Log genuine click event
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
      console.log(`[Click Logged] tool=${toolSlug} fallback=${isFallback} reason=${reasonCode} host=${parsed.hostname}`);
    } catch (err) {
      console.error("[Click Tracker DB Error]:", err);
    }
  }

  return createCleanRedirect(targetUrl);
}
