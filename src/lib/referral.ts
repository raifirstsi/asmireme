import crypto from "crypto";

const SECRET = process.env.REFERRAL_SECRET || "asmire_referral_cookie_hmac_secret_key_2026";

export interface ReferralCookiePayload {
  memberId: string;
  issuedAt: number;
}

/**
 * Creates a cryptographically signed HMAC-SHA256 cookie value
 * Format: v1.<memberId>.<issuedAt>.<hmacSignature>
 */
export function signReferralCookie(memberId: string): string {
  const issuedAt = Date.now();
  const rawPayload = `v1.${memberId}.${issuedAt}`;
  const hmac = crypto
    .createHmac("sha256", SECRET)
    .update(rawPayload)
    .digest("hex");
  return `${rawPayload}.${hmac}`;
}

/**
 * Verifies and decodes a referral cookie
 * Validates HMAC signature and checks if within the 365-day rolling window
 */
export function verifyReferralCookie(cookieValue: string): ReferralCookiePayload | null {
  if (!cookieValue || typeof cookieValue !== "string") return null;

  const parts = cookieValue.split(".");
  if (parts.length !== 4) return null;

  const [version, memberId, issuedAtStr, signature] = parts;
  if (version !== "v1") return null;

  const issuedAt = parseInt(issuedAtStr, 10);
  if (isNaN(issuedAt)) return null;

  // Check 365-day rolling window (31,536,000,000 milliseconds)
  const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  if (now - issuedAt > MAX_AGE_MS || issuedAt > now + 60000) {
    // Expired or from the future
    return null;
  }

  // Re-compute HMAC and compare in constant time
  const rawPayload = `v1.${memberId}.${issuedAtStr}`;
  const expectedHmac = crypto
    .createHmac("sha256", SECRET)
    .update(rawPayload)
    .digest("hex");

  try {
    const sigBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedHmac, "hex");
    if (sigBuffer.length !== expectedBuffer.length) return null;
    if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null;
  } catch {
    return null;
  }

  return { memberId, issuedAt };
}

/**
 * Generates a random, collision-resistant 6-character referral code (e.g. ASM9F2)
 */
export function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous chars 0, O, 1, I
  let code = "ASM";
  const bytes = crypto.randomBytes(3);
  for (let i = 0; i < 3; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return code;
}
