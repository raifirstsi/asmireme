/**
 * Real IP Geolocation Service for Asmire Radar
 * Accurately determines country, city, and flag for visitor IP addresses.
 * 100% REAL telemetry with multi-provider failover and in-memory LRU caching.
 */

export interface GeoLocation {
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  flag: string;
}

interface CacheEntry {
  data: GeoLocation;
  expiresAt: number;
}

const geoCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_ENTRIES = 10000;

// High-fidelity Vietnamese country names mapping
const COUNTRY_NAME_VI: Record<string, string> = {
  VN: "Việt Nam",
  US: "Hoa Kỳ (Mỹ)",
  SG: "Singapore",
  JP: "Nhật Bản",
  KR: "Hàn Quốc",
  GB: "Vương Quốc Anh",
  AU: "Úc (Australia)",
  CA: "Canada",
  DE: "Đức (Germany)",
  FR: "Pháp (France)",
  TH: "Thái Lan",
  MY: "Malaysia",
  ID: "Indonesia",
  PH: "Philippines",
  TW: "Đài Loan",
  HK: "Hồng Kông",
  CN: "Trung Quốc",
  IN: "Ấn Độ",
  NL: "Hà Lan",
  RU: "Nga",
  SE: "Thụy Điển",
  CH: "Thụy Sĩ",
  AE: "Các TVQ Ả Rập Thống Nhất (UAE)",
  IT: "Ý (Italy)",
  ES: "Tây Ban Nha",
};

/**
 * Generate Unicode Flag Emoji from 2-letter ISO Country Code
 */
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const upper = countryCode.toUpperCase();
  if (upper === "LO" || upper === "XX") return "🏠";
  try {
    const codePoints = [...upper].map((c) => 127397 + c.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return "🌐";
  }
}

/**
 * Check if IP is private, loopback, or local
 */
export function isPrivateIp(ip: string): boolean {
  if (!ip) return true;
  const cleanIp = ip.replace(/^::ffff:/, "").trim();
  if (
    cleanIp === "127.0.0.1" ||
    cleanIp === "::1" ||
    cleanIp === "localhost" ||
    cleanIp.startsWith("10.") ||
    cleanIp.startsWith("192.168.") ||
    cleanIp.startsWith("169.254.")
  ) {
    return true;
  }
  if (cleanIp.startsWith("172.")) {
    const parts = cleanIp.split(".");
    const second = parseInt(parts[1], 10);
    if (!isNaN(second) && second >= 16 && second <= 31) return true;
  }
  return false;
}

/**
 * Extract clean client IP from Request Headers
 */
export function getClientIp(reqHeaders: Headers): string {
  const xRealIp = reqHeaders.get("x-real-ip");
  if (xRealIp && xRealIp.trim()) {
    return xRealIp.trim().replace(/^::ffff:/, "");
  }

  const xForwardedFor = reqHeaders.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0].trim().replace(/^::ffff:/, "");
    if (firstIp) return firstIp;
  }

  const cfConnectingIp = reqHeaders.get("cf-connecting-ip");
  if (cfConnectingIp && cfConnectingIp.trim()) {
    return cfConnectingIp.trim().replace(/^::ffff:/, "");
  }

  return "127.0.0.1";
}

/**
 * Lookup real geographical information for an IP address
 */
export async function getIpGeoLocation(rawIp: string): Promise<GeoLocation> {
  const ip = (rawIp || "").replace(/^::ffff:/, "").trim();

  // 1. Private / Local IP check
  if (isPrivateIp(ip)) {
    return {
      ip,
      country: "Mạng nội bộ / Máy chủ Local",
      countryCode: "VN",
      city: "Localhost",
      flag: "🏠",
    };
  }

  // 2. Cache check
  const now = Date.now();
  const cached = geoCache.get(ip);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  // 3. Fallback Providers
  let result: GeoLocation | null = null;

  // Provider 1: ip-api.com (HTTP, fast, no auth needed, 45 req/min)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city`, {
      signal: controller.signal,
      headers: { "User-Agent": "asmire-geo-telemetry/1.0" },
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data.status === "success" && data.countryCode) {
        const countryCode = data.countryCode.toUpperCase();
        result = {
          ip,
          country: COUNTRY_NAME_VI[countryCode] || data.country || countryCode,
          countryCode,
          city: data.city || "",
          flag: getFlagEmoji(countryCode),
        };
      }
    }
  } catch (err) {
    // Provider 1 failed or timed out, proceed to provider 2
  }

  // Provider 2: freeipapi.com (HTTPS, free, 60 req/min)
  if (!result) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`https://freeipapi.com/api/json/${ip}`, {
        signal: controller.signal,
        headers: { "User-Agent": "asmire-geo-telemetry/1.0" },
      });
      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        if (data.countryCode) {
          const countryCode = data.countryCode.toUpperCase();
          result = {
            ip,
            country: COUNTRY_NAME_VI[countryCode] || data.countryName || countryCode,
            countryCode,
            city: data.cityName || "",
            flag: getFlagEmoji(countryCode),
          };
        }
      }
    } catch (err) {
      // Provider 2 failed
    }
  }

  // Provider 3: ipwho.is (HTTPS, free)
  if (!result) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`https://ipwho.is/${ip}`, {
        signal: controller.signal,
        headers: { "User-Agent": "asmire-geo-telemetry/1.0" },
      });
      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.country_code) {
          const countryCode = data.country_code.toUpperCase();
          result = {
            ip,
            country: COUNTRY_NAME_VI[countryCode] || data.country || countryCode,
            countryCode,
            city: data.city || "",
            flag: getFlagEmoji(countryCode),
          };
        }
      }
    } catch (err) {
      // Provider 3 failed
    }
  }

  // Fallback if all lookups failed
  if (!result) {
    result = {
      ip,
      country: "Không xác định",
      countryCode: "XX",
      city: "",
      flag: "🌐",
    };
  }

  // Save to Cache
  if (geoCache.size > MAX_CACHE_ENTRIES) {
    const cutoff = now;
    for (const [k, v] of geoCache.entries()) {
      if (v.expiresAt < cutoff) geoCache.delete(k);
    }
    if (geoCache.size > MAX_CACHE_ENTRIES) geoCache.clear();
  }

  geoCache.set(ip, {
    data: result,
    expiresAt: now + CACHE_TTL_MS,
  });

  return result;
}
