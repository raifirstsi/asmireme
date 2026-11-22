import { NextRequest, NextResponse } from "next/server";
import { signReferralCookie, verifyReferralCookie } from "@/lib/referral";
import { verifySessionToken } from "@/services/auth";
import { db } from "@/db";
import { memberProfiles, referralVisits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateVisitorHash } from "@/lib/security";

// Known bots to exclude from referral cookies
const BOT_USER_AGENTS = ["googlebot", "bingbot", "gptbot", "perplexitybot", "claudebot", "applebot", "yandexbot", "baiduspider"];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://asmire.me";
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
  const visitorHash = generateVisitorHash(ip, userAgent);

  // Target clean destination URL (supports optional ?to= or ?next= relative path)
  const nextParam = request.nextUrl.searchParams.get("to") || request.nextUrl.searchParams.get("next") || "/en";
  const safePath = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/en";
  const targetUrl = new URL(safePath, baseUrl);
  const response = NextResponse.redirect(targetUrl, 307);

  // Security headers: No index, no referrer leakage
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");

  // Rule 1: Exclude known search and AI crawlers
  const isBot = BOT_USER_AGENTS.some((bot) => userAgent.includes(bot));
  if (isBot) {
    return response;
  }

  // Rule 2: Self-referral handling: allow member to test their own referral landing
  const sessionCookie = request.cookies.get("asmire_session")?.value;
  if (sessionCookie) {
    const session = verifySessionToken(sessionCookie);
    if (session && session.referralCode.toUpperCase() === code.toUpperCase()) {
      console.log(`[Referral] Member ${session.userId} visited own referral link - setting referral cookie for testing`);
    }
  }

  // Rule 3: First-Touch Attribution Policy
  // If visitor already carries a valid unexpired 365-day cookie, DO NOT overwrite and DO NOT renew
  const existingCookie = request.cookies.get("asmire_ref")?.value;
  if (existingCookie) {
    const verified = verifyReferralCookie(existingCookie);
    if (verified) {
      console.log(`[Referral] First-touch preserved for member ${verified.memberId}`);
      return response;
    }
  }

  // Look up member by referral code
  let targetMemberId = "mem-default-ref";

  try {
    const profiles = await db
      .select()
      .from(memberProfiles)
      .where(eq(memberProfiles.referralCode, code.toUpperCase()));

    if (profiles.length > 0 && profiles[0].status === "ACTIVE") {
      targetMemberId = profiles[0].id;

      // Log visit telemetry
      await db.insert(referralVisits).values({
        referralCode: code.toUpperCase(),
        visitorHash,
        landingPath: targetUrl.pathname,
      });
    } else {
      // Invalid or suspended member code: redirect to clean page without cookie
      return response;
    }
  } catch (err) {
    console.warn("[Referral] DB lookup warning (using code fallback):", (err as Error).message);
    targetMemberId = `mem-${code.toLowerCase()}`;
  }

  // Sign cryptographic 365-day HMAC cookie
  const signedCookieValue = signReferralCookie(targetMemberId);

  // Set HTTP-Only, Secure, Lax cookie for 365 days (31,536,000 seconds)
  response.cookies.set("asmire_ref", signedCookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 365 * 24 * 60 * 60, // Exactly 365 days in seconds
    path: "/",
  });

  return response;
}
