import { isPrivateOrLoopbackHost } from "./security";

// Strict Regex Allowlists for all 50 SaaS Tools derived from docs/affiliate-terms-audit.md
export const TOOL_ALLOWLIST_PATTERNS: Record<string, RegExp> = {
  highlevel: /^https:\/\/([a-zA-Z0-9\-]+\.)?(gohighlevel\.com|highlevel\.com)(\/.*)?/,
  decktopus: /^https:\/\/([a-zA-Z0-9\-]+\.)?decktopus\.com(\/.*)?/,
  taskade: /^https:\/\/([a-zA-Z0-9\-]+\.)?taskade\.com(\/.*)?/,
  getresponse: /^https:\/\/([a-zA-Z0-9\-]+\.)?getresponse\.com(\/.*)?/,
  omniseo: /^https:\/\/([a-zA-Z0-9\-]+\.)?omniseo\.ai(\/.*)?/,
  reclaim: /^https:\/\/([a-zA-Z0-9\-]+\.)?(reclaim\.ai|grsm\.io)(\/.*)?/,
  marblism: /^https:\/\/([a-zA-Z0-9\-]+\.)?marblism\.com(\/.*)?/,
  rightblogger: /^https:\/\/([a-zA-Z0-9\-]+\.)?rightblogger\.com(\/.*)?/,
  pickaxe: /^https:\/\/([a-zA-Z0-9\-]+\.)?(pickaxe\.co|pickaxeproject\.com)(\/.*)?/,
  winston: /^https:\/\/([a-zA-Z0-9\-]+\.)?gowinston\.ai(\/.*)?/,
  "ai-studios": /^https:\/\/([a-zA-Z0-9\-]+\.)?(deepbrain\.io|aistudios\.com)(\/.*)?/,
  capcut: /^https:\/\/([a-zA-Z0-9\-]+\.)?capcut\.com(\/.*)?/,
  akool: /^https:\/\/([a-zA-Z0-9\-]+\.)?akool\.com(\/.*)?/,
  nutshell: /^https:\/\/([a-zA-Z0-9\-]+\.)?nutshell\.com(\/.*)?/,
  elevenlabs: /^https:\/\/([a-zA-Z0-9\-]+\.)?elevenlabs\.io(\/.*)?/,
  adcreative: /^https:\/\/([a-zA-Z0-9\-]+\.)?adcreative\.ai(\/.*)?/,
  krispcall: /^https:\/\/([a-zA-Z0-9\-]+\.)?krispcall\.com(\/.*)?/,
  "my-ai-front-desk": /^https:\/\/([a-zA-Z0-9\-]+\.)?myaifrontdesk\.com(\/.*)?/,
  fliki: /^https:\/\/([a-zA-Z0-9\-]+\.)?fliki\.ai(\/.*)?/,
  describely: /^https:\/\/([a-zA-Z0-9\-]+\.)?describely\.ai(\/.*)?/,
  koala: /^https:\/\/([a-zA-Z0-9\-]+\.)?koala\.sh(\/.*)?/,
  submagic: /^https:\/\/([a-zA-Z0-9\-]+\.)?submagic\.co(\/.*)?/,
  videogen: /^https:\/\/([a-zA-Z0-9\-]+\.)?videogen\.io(\/.*)?/,
  textero: /^https:\/\/([a-zA-Z0-9\-]+\.)?textero\.ai(\/.*)?/,
  quickads: /^https:\/\/([a-zA-Z0-9\-]+\.)?quickads\.ai(\/.*)?/,
  meetgeek: /^https:\/\/([a-zA-Z0-9\-]+\.)?meetgeek\.ai(\/.*)?/,
  castmagic: /^https:\/\/([a-zA-Z0-9\-]+\.)?castmagic\.io(\/.*)?/,
  palette: /^https:\/\/([a-zA-Z0-9\-]+\.)?palette\.fm(\/.*)?/,
  fireflies: /^https:\/\/([a-zA-Z0-9\-]+\.)?fireflies\.ai(\/.*)?/,
  frase: /^https:\/\/([a-zA-Z0-9\-]+\.)?frase\.io(\/.*)?/,
  "10web": /^https:\/\/([a-zA-Z0-9\-]+\.)?10web\.io(\/.*)?/,
  palabra: /^https:\/\/([a-zA-Z0-9\-]+\.)?palabra\.ai(\/.*)?/,
  postcrest: /^https:\/\/([a-zA-Z0-9\-]+\.)?postcrest\.com(\/.*)?/,
  "pineapple-builder": /^https:\/\/([a-zA-Z0-9\-]+\.)?pineapplebuilder\.com(\/.*)?/,
  potion: /^https:\/\/([a-zA-Z0-9\-]+\.)?sendpotion\.com(\/.*)?/,
  rytr: /^https:\/\/([a-zA-Z0-9\-]+\.)?rytr\.me(\/.*)?/,
  listnr: /^https:\/\/([a-zA-Z0-9\-]+\.)?(listnr\.ai|listnr\.tech)(\/.*)?/,
  jotform: /^https:\/\/([a-zA-Z0-9\-]+\.)?jotform\.com(\/.*)?/,
  lebesgue: /^https:\/\/([a-zA-Z0-9\-]+\.)?lebesgue\.io(\/.*)?/,
  gamma: /^https:\/\/([a-zA-Z0-9\-]+\.)?gamma\.app(\/.*)?/,
  synthesia: /^https:\/\/([a-zA-Z0-9\-]+\.)?synthesia\.io(\/.*)?/,
  jasper: /^https:\/\/([a-zA-Z0-9\-]+\.)?jasper\.ai(\/.*)?/,
  opusclip: /^https:\/\/([a-zA-Z0-9\-]+\.)?(opus\.pro|opusclip\.com)(\/.*)?/,
  originality: /^https:\/\/([a-zA-Z0-9\-]+\.)?originality\.ai(\/.*)?/,
  "speak-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?speakai\.co(\/.*)?/,
  undetectable: /^https:\/\/([a-zA-Z0-9\-]+\.)?undetectable\.ai(\/.*)?/,
  simplified: /^https:\/\/([a-zA-Z0-9\-]+\.)?simplified\.com(\/.*)?/,
  magicslides: /^https:\/\/([a-zA-Z0-9\-]+\.)?magicslides\.app(\/.*)?/,
  paperguide: /^https:\/\/([a-zA-Z0-9\-]+\.)?paperguide\.ai(\/.*)?/,
  "browse-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?browse\.ai(\/.*)?/,
};

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  normalizedUrl?: string;
}

/**
 * Validates a member-submitted affiliate URL against security policies and tool allowlists
 */
export function validateMemberAffiliateLink(toolSlug: string, inputUrl: string): ValidationResult {
  if (!inputUrl || typeof inputUrl !== "string") {
    return { isValid: false, error: "Link cannot be empty." };
  }

  const trimmed = inputUrl.trim();

  // 1. Must be valid URL format
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { isValid: false, error: "Invalid URL format. Please provide a complete https:// URL." };
  }

  // 2. Must be HTTPS
  if (parsed.protocol !== "https:") {
    return { isValid: false, error: "Security requirement: Only secure HTTPS links are permitted." };
  }

  // 3. Reject credentials / userinfo
  if (parsed.username || parsed.password) {
    return { isValid: false, error: "Security violation: URLs containing credentials are not permitted." };
  }

  // 4. Reject strange ports
  if (parsed.port && parsed.port !== "443") {
    return { isValid: false, error: "Security violation: Non-standard web ports are rejected." };
  }

  // 5. SSRF & Loopback / Private IP checks
  if (isPrivateOrLoopbackHost(parsed.hostname)) {
    return { isValid: false, error: "Security alert: Internal or private IP addresses are strictly prohibited." };
  }

  // 6. Generic link shorteners (bit.ly, tinyurl, etc.) are forbidden to prevent cloaked malware
  const forbiddenShorteners = ["bit.ly", "tinyurl.com", "ow.ly", "t.co", "is.gd", "buff.ly", "rebrand.ly"];
  if (forbiddenShorteners.some((s) => parsed.hostname.toLowerCase().includes(s))) {
    return { isValid: false, error: "Link shorteners are forbidden. Please use your official vendor affiliate URL directly." };
  }

  // 7. Check tool allowlist
  const pattern = TOOL_ALLOWLIST_PATTERNS[toolSlug];
  if (!pattern) {
    return { isValid: false, error: `Tool ${toolSlug} does not support member links or has no active allowlist.` };
  }

  if (!pattern.test(trimmed)) {
    return {
      isValid: false,
      error: `Domain mismatch: This link does not belong to the verified domain of ${toolSlug}. Only official vendor/network domains are accepted.`,
    };
  }

  return { isValid: true, normalizedUrl: trimmed };
}
