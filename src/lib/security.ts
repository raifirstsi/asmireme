import crypto from "crypto";

// Check for private IP addresses / SSRF vectors
export function isPrivateOrLoopbackHost(hostname: string): boolean {
  const normalized = hostname.toLowerCase().trim();
  if (
    normalized === "localhost" ||
    normalized.endsWith(".local") ||
    normalized.endsWith(".internal") ||
    normalized.startsWith("127.") ||
    normalized.startsWith("10.") ||
    normalized.startsWith("192.168.") ||
    normalized === "169.254.169.254"
  ) {
    return true;
  }
  // Check 172.16.0.0 - 172.31.255.255
  if (normalized.startsWith("172.")) {
    const parts = normalized.split(".");
    if (parts.length >= 2) {
      const secondOctet = parseInt(parts[1], 10);
      if (secondOctet >= 16 && secondOctet <= 31) {
        return true;
      }
    }
  }
  return false;
}

// Generate GDPR-compliant anonymous visitor hash
export function generateVisitorHash(ip: string, userAgent: string): string {
  const salt = process.env.REFERRAL_SECRET || "asmire_default_salt_2026";
  return crypto
    .createHash("sha256")
    .update(`${ip}:${userAgent}:${salt}`)
    .digest("hex");
}

// Strict URL validation against HTTPS, userinfo, and weird ports
export function isValidOutboundUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    if (url.protocol !== "https:") return false;
    if (url.username || url.password) return false;
    if (url.port && url.port !== "443") return false;
    if (isPrivateOrLoopbackHost(url.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}
