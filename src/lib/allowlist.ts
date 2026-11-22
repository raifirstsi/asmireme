import { isPrivateOrLoopbackHost } from "./security";
import { getToolBySlug } from "@/data/tools-data";

// Strict Regex Allowlists for all 133 verified SaaS Tools in the Asmire catalog
export const TOOL_ALLOWLIST_PATTERNS: Record<string, RegExp> = {
  "10web": /^https:\/\/([a-zA-Z0-9\-]+\.)?10web\.io(\/.*)?/,
  adcreative: /^https:\/\/([a-zA-Z0-9\-]+\.)?adcreative\.ai(\/.*)?/,
  "adobe-firefly": /^https:\/\/([a-zA-Z0-9\-]+\.)?adobe\.com(\/.*)?/,
  "ai-or-not": /^https:\/\/([a-zA-Z0-9\-]+\.)?aiornot\.com(\/.*)?/,
  "ai-studios": /^https:\/\/([a-zA-Z0-9\-]+\.)?(deepbrain\.io|aistudios\.com)(\/.*)?/,
  akool: /^https:\/\/([a-zA-Z0-9\-]+\.)?akool\.com(\/.*)?/,
  "apollo-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(apollo\.io|grsm\.io|partnerstack\.com|prpartner\.io)(\/.*)?/,
  "beautiful-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(beautiful\.ai|rewardful\.com)(\/.*)?/,
  "bolt-new": /^https:\/\/([a-zA-Z0-9\-]+\.)?(bolt\.new|stackblitz\.com)(\/.*)?/,
  "browse-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?browse\.ai(\/.*)?/,
  "bubble-io": /^https:\/\/([a-zA-Z0-9\-]+\.)?bubble\.io(\/.*)?/,
  "canva-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(canva\.com|impact\.com|partner\.canva\.com|sjv\.io)(\/.*)?/,
  capcut: /^https:\/\/([a-zA-Z0-9\-]+\.)?capcut\.com(\/.*)?/,
  castmagic: /^https:\/\/([a-zA-Z0-9\-]+\.)?castmagic\.io(\/.*)?/,
  chatgpt: /^https:\/\/([a-zA-Z0-9\-]+\.)?(chatgpt\.com|openai\.com)(\/.*)?/,
  chatpdf: /^https:\/\/([a-zA-Z0-9\-]+\.)?(chatpdf\.com|rewardful\.com)(\/.*)?/,
  "claude-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(anthropic\.com|claude\.ai)(\/.*)?/,
  "clay-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?clay\.com(\/.*)?/,
  clickfunnels: /^https:\/\/([a-zA-Z0-9\-]+\.)?(cf1\.me|clickfunnels\.com|firstpromoter\.com)(\/.*)?/,
  "clickup-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(clickup\.com|grsm\.io|partnerstack\.com|prpartner\.io)(\/.*)?/,
  codeium: /^https:\/\/([a-zA-Z0-9\-]+\.)?codeium\.com(\/.*)?/,
  cohere: /^https:\/\/([a-zA-Z0-9\-]+\.)?cohere\.com(\/.*)?/,
  "convertos-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(convertos\.ai|rewardful\.com)(\/.*)?/,
  "copy-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(copy\.ai|rewardful\.com)(\/.*)?/,
  copyleaks: /^https:\/\/([a-zA-Z0-9\-]+\.)?(copyleaks\.com|rewardful\.com)(\/.*)?/,
  coze: /^https:\/\/([a-zA-Z0-9\-]+\.)?coze\.com(\/.*)?/,
  cursor: /^https:\/\/([a-zA-Z0-9\-]+\.)?(cursor\.com|cursor\.sh)(\/.*)?/,
  "d-id": /^https:\/\/([a-zA-Z0-9\-]+\.)?(d-id\.com|rewardful\.com)(\/.*)?/,
  decktopus: /^https:\/\/([a-zA-Z0-9\-]+\.)?decktopus\.com(\/.*)?/,
  deepseek: /^https:\/\/([a-zA-Z0-9\-]+\.)?deepseek\.com(\/.*)?/,
  describely: /^https:\/\/([a-zA-Z0-9\-]+\.)?describely\.ai(\/.*)?/,
  descript: /^https:\/\/([a-zA-Z0-9\-]+\.)?(descript\.com|rewardful\.com)(\/.*)?/,
  elevenlabs: /^https:\/\/([a-zA-Z0-9\-]+\.)?elevenlabs\.io(\/.*)?/,
  "fathom-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?fathom\.video(\/.*)?/,
  fireflies: /^https:\/\/([a-zA-Z0-9\-]+\.)?fireflies\.ai(\/.*)?/,
  fliki: /^https:\/\/([a-zA-Z0-9\-]+\.)?fliki\.ai(\/.*)?/,
  flutterflow: /^https:\/\/([a-zA-Z0-9\-]+\.)?(flutterflow\.io|rewardful\.com)(\/.*)?/,
  "flux-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?blackforestlabs\.ai(\/.*)?/,
  framer: /^https:\/\/([a-zA-Z0-9\-]+\.)?(framer\.com|grsm\.io|partnerstack\.com|prpartner\.io)(\/.*)?/,
  frase: /^https:\/\/([a-zA-Z0-9\-]+\.)?frase\.io(\/.*)?/,
  "freepik-mystic": /^https:\/\/([a-zA-Z0-9\-]+\.)?freepik\.com(\/.*)?/,
  gamma: /^https:\/\/([a-zA-Z0-9\-]+\.)?gamma\.app(\/.*)?/,
  getresponse: /^https:\/\/([a-zA-Z0-9\-]+\.)?getresponse\.com(\/.*)?/,
  "glide-apps": /^https:\/\/([a-zA-Z0-9\-]+\.)?(glideapps\.com|rewardful\.com)(\/.*)?/,
  gptzero: /^https:\/\/([a-zA-Z0-9\-]+\.)?(gptzero\.me|rewardful\.com)(\/.*)?/,
  grammarly: /^https:\/\/([a-zA-Z0-9\-]+\.)?(grammarly\.com|impact\.com|sjv\.io)(\/.*)?/,
  grok: /^https:\/\/([a-zA-Z0-9\-]+\.)?(twitter\.com|x\.ai)(\/.*)?/,
  groq: /^https:\/\/([a-zA-Z0-9\-]+\.)?groq\.com(\/.*)?/,
  heygen: /^https:\/\/([a-zA-Z0-9\-]+\.)?(grsm\.io|heygen\.com|partnerstack\.com|prpartner\.io)(\/.*)?/,
  highlevel: /^https:\/\/([a-zA-Z0-9\-]+\.)?(gohighlevel\.com|highlevel\.com)(\/.*)?/,
  hubspot: /^https:\/\/([a-zA-Z0-9\-]+\.)?(hubspot\.com|impact\.com|sjv\.io)(\/.*)?/,
  "hubspot-crm": /^https:\/\/([a-zA-Z0-9\-]+\.)?(hubspot\.com|impact\.com|sjv\.io)(\/.*)?/,
  "hugging-face": /^https:\/\/([a-zA-Z0-9\-]+\.)?huggingface\.co(\/.*)?/,
  ideogram: /^https:\/\/([a-zA-Z0-9\-]+\.)?(ideogram\.ai|rewardful\.com)(\/.*)?/,
  "instantly-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(instantly\.ai|rewardful\.com)(\/.*)?/,
  invideo: /^https:\/\/([a-zA-Z0-9\-]+\.)?(impact\.com|invideo\.io|sjv\.io)(\/.*)?/,
  jasper: /^https:\/\/([a-zA-Z0-9\-]+\.)?jasper\.ai(\/.*)?/,
  jotform: /^https:\/\/([a-zA-Z0-9\-]+\.)?jotform\.com(\/.*)?/,
  klaviyo: /^https:\/\/([a-zA-Z0-9\-]+\.)?klaviyo\.com(\/.*)?/,
  "kling-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?klingai\.com(\/.*)?/,
  koala: /^https:\/\/([a-zA-Z0-9\-]+\.)?koala\.sh(\/.*)?/,
  "krea-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(krea\.ai|rewardful\.com)(\/.*)?/,
  krispcall: /^https:\/\/([a-zA-Z0-9\-]+\.)?krispcall\.com(\/.*)?/,
  langchain: /^https:\/\/([a-zA-Z0-9\-]+\.)?langchain\.com(\/.*)?/,
  lebesgue: /^https:\/\/([a-zA-Z0-9\-]+\.)?lebesgue\.io(\/.*)?/,
  "leonardo-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(leonardo\.ai|rewardful\.com)(\/.*)?/,
  listnr: /^https:\/\/([a-zA-Z0-9\-]+\.)?(listnr\.ai|listnr\.tech)(\/.*)?/,
  lovable: /^https:\/\/([a-zA-Z0-9\-]+\.)?lovable\.dev(\/.*)?/,
  "ltx-studio": /^https:\/\/([a-zA-Z0-9\-]+\.)?(lightricks\.com|ltx\.studio)(\/.*)?/,
  "luma-dream-machine": /^https:\/\/([a-zA-Z0-9\-]+\.)?lumalabs\.ai(\/.*)?/,
  magicslides: /^https:\/\/([a-zA-Z0-9\-]+\.)?magicslides\.app(\/.*)?/,
  make: /^https:\/\/([a-zA-Z0-9\-]+\.)?(celonis\.com|make\.com|rewardful\.com)(\/.*)?/,
  marblism: /^https:\/\/([a-zA-Z0-9\-]+\.)?marblism\.com(\/.*)?/,
  marketmuse: /^https:\/\/([a-zA-Z0-9\-]+\.)?marketmuse\.com(\/.*)?/,
  meetgeek: /^https:\/\/([a-zA-Z0-9\-]+\.)?meetgeek\.ai(\/.*)?/,
  midjourney: /^https:\/\/([a-zA-Z0-9\-]+\.)?midjourney\.com(\/.*)?/,
  "minimax-video": /^https:\/\/([a-zA-Z0-9\-]+\.)?(hailuoai\.video|minimaxi\.com)(\/.*)?/,
  mistral: /^https:\/\/([a-zA-Z0-9\-]+\.)?mistral\.ai(\/.*)?/,
  "murf-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(murf\.ai|rewardful\.com)(\/.*)?/,
  "my-ai-front-desk": /^https:\/\/([a-zA-Z0-9\-]+\.)?myaifrontdesk\.com(\/.*)?/,
  n8n: /^https:\/\/([a-zA-Z0-9\-]+\.)?n8n\.io(\/.*)?/,
  "napkin-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?napkin\.ai(\/.*)?/,
  "notion-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(notion\.com|notion\.so)(\/.*)?/,
  nutshell: /^https:\/\/([a-zA-Z0-9\-]+\.)?nutshell\.com(\/.*)?/,
  omniseo: /^https:\/\/([a-zA-Z0-9\-]+\.)?omniseo\.ai(\/.*)?/,
  opusclip: /^https:\/\/([a-zA-Z0-9\-]+\.)?(opus\.pro|opusclip\.com)(\/.*)?/,
  originality: /^https:\/\/([a-zA-Z0-9\-]+\.)?originality\.ai(\/.*)?/,
  "otter-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?otter\.ai(\/.*)?/,
  palabra: /^https:\/\/([a-zA-Z0-9\-]+\.)?palabra\.ai(\/.*)?/,
  palette: /^https:\/\/([a-zA-Z0-9\-]+\.)?palette\.fm(\/.*)?/,
  paperguide: /^https:\/\/([a-zA-Z0-9\-]+\.)?paperguide\.ai(\/.*)?/,
  perplexity: /^https:\/\/([a-zA-Z0-9\-]+\.)?perplexity\.ai(\/.*)?/,
  pickaxe: /^https:\/\/([a-zA-Z0-9\-]+\.)?(pickaxe\.co|pickaxeproject\.com)(\/.*)?/,
  "pika-labs": /^https:\/\/([a-zA-Z0-9\-]+\.)?(pika\.art|rewardful\.com)(\/.*)?/,
  "pineapple-builder": /^https:\/\/([a-zA-Z0-9\-]+\.)?pineapplebuilder\.com(\/.*)?/,
  pipedrive: /^https:\/\/([a-zA-Z0-9\-]+\.)?(grsm\.io|partnerstack\.com|pipedrive\.com|prpartner\.io)(\/.*)?/,
  postcrest: /^https:\/\/([a-zA-Z0-9\-]+\.)?postcrest\.com(\/.*)?/,
  potion: /^https:\/\/([a-zA-Z0-9\-]+\.)?sendpotion\.com(\/.*)?/,
  quickads: /^https:\/\/([a-zA-Z0-9\-]+\.)?quickads\.ai(\/.*)?/,
  quillbot: /^https:\/\/([a-zA-Z0-9\-]+\.)?(impact\.com|quillbot\.com|sjv\.io)(\/.*)?/,
  reclaim: /^https:\/\/([a-zA-Z0-9\-]+\.)?(reclaim\.ai|grsm\.io)(\/.*)?/,
  "recraft-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?recraft\.ai(\/.*)?/,
  replit: /^https:\/\/([a-zA-Z0-9\-]+\.)?(impact\.com|replit\.com|sjv\.io)(\/.*)?/,
  rightblogger: /^https:\/\/([a-zA-Z0-9\-]+\.)?rightblogger\.com(\/.*)?/,
  runway: /^https:\/\/([a-zA-Z0-9\-]+\.)?runwayml\.com(\/.*)?/,
  rytr: /^https:\/\/([a-zA-Z0-9\-]+\.)?rytr\.me(\/.*)?/,
  scalenut: /^https:\/\/([a-zA-Z0-9\-]+\.)?(rewardful\.com|scalenut\.com)(\/.*)?/,
  simplified: /^https:\/\/([a-zA-Z0-9\-]+\.)?simplified\.com(\/.*)?/,
  "slides-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?(rewardful\.com|slidesai\.io)(\/.*)?/,
  soundraw: /^https:\/\/([a-zA-Z0-9\-]+\.)?(rewardful\.com|soundraw\.io)(\/.*)?/,
  "speak-ai": /^https:\/\/([a-zA-Z0-9\-]+\.)?speakai\.co(\/.*)?/,
  speechify: /^https:\/\/([a-zA-Z0-9\-]+\.)?(impact\.com|sjv\.io|speechify\.com)(\/.*)?/,
  "stable-audio": /^https:\/\/([a-zA-Z0-9\-]+\.)?stableaudio\.com(\/.*)?/,
  "stable-diffusion": /^https:\/\/([a-zA-Z0-9\-]+\.)?stability\.ai(\/.*)?/,
  submagic: /^https:\/\/([a-zA-Z0-9\-]+\.)?submagic\.co(\/.*)?/,
  suno: /^https:\/\/([a-zA-Z0-9\-]+\.)?suno\.com(\/.*)?/,
  supernormal: /^https:\/\/([a-zA-Z0-9\-]+\.)?supernormal\.com(\/.*)?/,
  "surfer-seo": /^https:\/\/([a-zA-Z0-9\-]+\.)?(rewardful\.com|surferseo\.com)(\/.*)?/,
  synthesia: /^https:\/\/([a-zA-Z0-9\-]+\.)?synthesia\.io(\/.*)?/,
  taskade: /^https:\/\/([a-zA-Z0-9\-]+\.)?taskade\.com(\/.*)?/,
  textero: /^https:\/\/([a-zA-Z0-9\-]+\.)?textero\.ai(\/.*)?/,
  tldv: /^https:\/\/([a-zA-Z0-9\-]+\.)?(grsm\.io|partnerstack\.com|prpartner\.io|tldv\.io)(\/.*)?/,
  turnitin: /^https:\/\/([a-zA-Z0-9\-]+\.)?turnitin\.com(\/.*)?/,
  udio: /^https:\/\/([a-zA-Z0-9\-]+\.)?udio\.com(\/.*)?/,
  undetectable: /^https:\/\/([a-zA-Z0-9\-]+\.)?undetectable\.ai(\/.*)?/,
  "v0-dev": /^https:\/\/([a-zA-Z0-9\-]+\.)?(v0\.dev|vercel\.com)(\/.*)?/,
  videogen: /^https:\/\/([a-zA-Z0-9\-]+\.)?videogen\.io(\/.*)?/,
  voicefleet: /^https:\/\/([a-zA-Z0-9\-]+\.)?(rewardful\.com|voicefleet\.ai)(\/.*)?/,
  webflow: /^https:\/\/([a-zA-Z0-9\-]+\.)?webflow\.com(\/.*)?/,
  windsurf: /^https:\/\/([a-zA-Z0-9\-]+\.)?(codeium\.com|windsurf\.ai)(\/.*)?/,
  winston: /^https:\/\/([a-zA-Z0-9\-]+\.)?gowinston\.ai(\/.*)?/,
  writesonic: /^https:\/\/([a-zA-Z0-9\-]+\.)?(rewardful\.com|writesonic\.com)(\/.*)?/,
  zapier: /^https:\/\/([a-zA-Z0-9\-]+\.)?zapier\.com(\/.*)?/,
};

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  normalizedUrl?: string;
}

/**
 * Validates a member-submitted affiliate URL against security policies and tool allowlists.
 * Dual-layered verification:
 * 1. Primary check against strict tool allowlist regex patterns.
 * 2. Intelligent fallback verification against the official vendor domain from TOOLS_DATA.
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

  // 7. Layer 1: Check strict tool allowlist pattern
  const pattern = TOOL_ALLOWLIST_PATTERNS[toolSlug];
  if (pattern && pattern.test(trimmed)) {
    return { isValid: true, normalizedUrl: trimmed };
  }

  // 8. Layer 2: Intelligent Fallback check against official vendor catalog domain
  const tool = getToolBySlug(toolSlug);
  if (tool && tool.adminAffiliateUrl) {
    try {
      const vendorHost = new URL(tool.adminAffiliateUrl).hostname.replace(/^www\./, "").toLowerCase();
      const inputHost = parsed.hostname.replace(/^www\./, "").toLowerCase();

      // Check if input host is or subdomains of the vendor host
      if (inputHost === vendorHost || inputHost.endsWith("." + vendorHost)) {
        return { isValid: true, normalizedUrl: trimmed };
      }
    } catch {
      // Ignore URL parse fallback error
    }
  }

  return {
    isValid: false,
    error: `Domain mismatch: This link does not belong to the verified domain of ${toolSlug}. Only official vendor/network domains are accepted.`,
  };
}
