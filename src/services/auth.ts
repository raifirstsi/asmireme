import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_resend_api_key");
const AUTH_SECRET = process.env.REFERRAL_SECRET || "asmire_auth_jwt_secret_2026";

// In-memory OTP storage for rapid verification
interface OtpEntry {
  email: string;
  code: string;
  expiresAt: number;
  attempts: number;
}

const otpStore = new Map<string, OtpEntry>();

export interface SessionUser {
  userId: string;
  email: string;
  role: "USER" | "MEMBER" | "ADMIN";
  memberId: string;
  referralCode: string;
}

/**
 * Generates and sends a 6-digit OTP code to the user's email via Resend
 */
export async function sendOtpEmail(email: string): Promise<{ success: boolean; message: string }> {
  const normalizedEmail = email.toLowerCase().trim();
  
  // Rate limit: 1 OTP request every 60 seconds per email
  const existing = otpStore.get(normalizedEmail);
  if (existing && Date.now() < existing.expiresAt - (9 * 60 * 1000)) {
    return { success: false, message: "Please wait 60 seconds before requesting a new code." };
  }

  // Generate 6-digit cryptographic numeric code
  const code = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(normalizedEmail, {
    email: normalizedEmail,
    code,
    expiresAt,
    attempts: 0,
  });

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || "support@asmire.me";
    
    // Dispatch via Resend API
    await resend.emails.send({
      from: `Asmire Security <${fromEmail}>`,
      to: normalizedEmail,
      subject: `Your Asmire Verification Code: ${code}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="margin: 0; color: #0d9488; font-size: 24px; font-weight: 800;">Asmire</h2>
            <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">AI SaaS Review & Referral Platform</p>
          </div>
          <div style="background: #f8fafc; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <p style="margin: 0 0 12px; color: #334155; font-size: 14px;">Here is your one-time authentication code:</p>
            <div style="font-size: 36px; font-weight: 900; letter-spacing: 6px; color: #0f172a; font-family: monospace;">${code}</div>
            <p style="margin: 12px 0 0; color: #94a3b8; font-size: 12px;">This code expires in 10 minutes. Do not share it with anyone.</p>
          </div>
          <p style="margin: 0; color: #64748b; font-size: 12px; text-align: center;">If you did not request this login code, you can safely ignore this email.</p>
        </div>
      `,
    });

    return { success: true, message: `Verification code sent to ${normalizedEmail}` };
  } catch (err) {
    console.error("[Auth] Resend Email error:", err);
    // Even if domain DNS is pending in dev, allow dev log
    console.log(`[DEV OTP FALLBACK] Code for ${normalizedEmail}: ${code}`);
    return { success: true, message: `Verification code sent. (Dev mode: check console)` };
  }
}

/**
 * Validates the OTP code
 */
export function verifyOtpCode(email: string, code: string): boolean {
  const normalizedEmail = email.toLowerCase().trim();
  const entry = otpStore.get(normalizedEmail);

  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(normalizedEmail);
    return false;
  }

  entry.attempts += 1;
  if (entry.attempts > 5) {
    otpStore.delete(normalizedEmail);
    return false;
  }

  if (entry.code === code.trim()) {
    otpStore.delete(normalizedEmail);
    return true;
  }

  return false;
}

/**
 * Signs a session cookie token
 */
export function createSessionToken(user: SessionUser): string {
  const payload = JSON.stringify({
    ...user,
    iat: Date.now(),
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  const b64Payload = Buffer.from(payload).toString("base64url");
  const hmac = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(b64Payload)
    .digest("base64url");
  return `${b64Payload}.${hmac}`;
}

/**
 * Verifies a session cookie token
 */
export function verifySessionToken(token: string): SessionUser | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [b64Payload, signature] = parts;
  const expectedHmac = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(b64Payload)
    .digest("base64url");

  if (signature !== expectedHmac) return null;

  try {
    const raw = Buffer.from(b64Payload, "base64url").toString("utf-8");
    const data = JSON.parse(raw);
    if (Date.now() > data.exp) return null;
    return {
      userId: data.userId,
      email: data.email,
      role: data.role,
      memberId: data.memberId,
      referralCode: data.referralCode,
    };
  } catch {
    return null;
  }
}
