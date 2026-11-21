/**
 * Direct & Authentic Verified 3rd-Party Review Links Registry
 * Maps each of the 50 SaaS tools to their actual, working review URLs on:
 * - G2 (https://www.g2.com/products/{slug}/reviews)
 * - Trustpilot (https://www.trustpilot.com/review/{domain})
 * - Product Hunt (https://www.producthunt.com/products/{slug}/reviews)
 * - Reddit (Direct subreddit or dedicated community discussions)
 * - Hacker News (Algolia domain search)
 */

export interface PlatformReviewMeta {
  domain: string;
  g2: string;
  ph: string;
  reddit: string;
}

export const TOOL_PLATFORM_META: Record<string, PlatformReviewMeta> = {
  "highlevel": {
    "domain": "gohighlevel.com",
    "g2": "highlevel",
    "ph": "highlevel",
    "reddit": "r/gohighlevel"
  },
  "decktopus": {
    "domain": "decktopus.com",
    "g2": "decktopus",
    "ph": "decktopus",
    "reddit": "r/SaaS/search/?q=decktopus"
  },
  "taskade": {
    "domain": "taskade.com",
    "g2": "taskade",
    "ph": "taskade",
    "reddit": "r/Taskade"
  },
  "getresponse": {
    "domain": "getresponse.com",
    "g2": "getresponse",
    "ph": "getresponse",
    "reddit": "r/emailmarketing/search/?q=getresponse"
  },
  "omniseo": {
    "domain": "omniseo.ai",
    "g2": "omniseo",
    "ph": "omniseo",
    "reddit": "r/SEO/search/?q=omniseo"
  },
  "reclaim": {
    "domain": "reclaim.ai",
    "g2": "reclaim-ai",
    "ph": "reclaim-ai",
    "reddit": "r/productivity/search/?q=reclaim.ai"
  },
  "marblism": {
    "domain": "marblism.com",
    "g2": "marblism",
    "ph": "marblism",
    "reddit": "r/webdev/search/?q=marblism"
  },
  "rightblogger": {
    "domain": "rightblogger.com",
    "g2": "rightblogger",
    "ph": "rightblogger",
    "reddit": "r/Blogging/search/?q=rightblogger"
  },
  "pickaxe": {
    "domain": "pickaxe.co",
    "g2": "pickaxe",
    "ph": "pickaxe-2",
    "reddit": "r/ArtificialInteligence/search/?q=pickaxe"
  },
  "winston": {
    "domain": "gowinston.ai",
    "g2": "winston-ai",
    "ph": "winston-ai",
    "reddit": "r/ChatGPT/search/?q=winston+ai"
  },
  "ai-studios": {
    "domain": "deepbrain.io",
    "g2": "ai-studios",
    "ph": "ai-studios-3-0",
    "reddit": "r/artificial/search/?q=deepbrain+ai+studios"
  },
  "capcut": {
    "domain": "capcut.com",
    "g2": "capcut",
    "ph": "capcut",
    "reddit": "r/CapCut"
  },
  "akool": {
    "domain": "akool.com",
    "g2": "akool",
    "ph": "akool",
    "reddit": "r/AI_Agents/search/?q=akool"
  },
  "nutshell": {
    "domain": "nutshell.com",
    "g2": "nutshell",
    "ph": "nutshell",
    "reddit": "r/sales/search/?q=nutshell+crm"
  },
  "elevenlabs": {
    "domain": "elevenlabs.io",
    "g2": "elevenlabs",
    "ph": "elevenlabs",
    "reddit": "r/ElevenLabs"
  },
  "adcreative": {
    "domain": "adcreative.ai",
    "g2": "adcreative-ai",
    "ph": "adcreative-ai",
    "reddit": "r/marketing/search/?q=adcreative.ai"
  },
  "krispcall": {
    "domain": "krispcall.com",
    "g2": "krispcall",
    "ph": "krispcall",
    "reddit": "r/VoIP/search/?q=krispcall"
  },
  "my-ai-front-desk": {
    "domain": "myaifrontdesk.com",
    "g2": "my-ai-front-desk",
    "ph": "my-ai-front-desk",
    "reddit": "r/smallbusiness/search/?q=my+ai+front+desk"
  },
  "fliki": {
    "domain": "fliki.ai",
    "g2": "fliki",
    "ph": "fliki",
    "reddit": "r/VideoEditing/search/?q=fliki"
  },
  "describely": {
    "domain": "describely.ai",
    "g2": "describely",
    "ph": "describely",
    "reddit": "r/ecommerce/search/?q=describely"
  },
  "koala": {
    "domain": "koala.sh",
    "g2": "koala-ai",
    "ph": "koala-writer",
    "reddit": "r/SEO/search/?q=koala+writer"
  },
  "submagic": {
    "domain": "submagic.co",
    "g2": "submagic",
    "ph": "submagic",
    "reddit": "r/ContentCreation/search/?q=submagic"
  },
  "videogen": {
    "domain": "videogen.io",
    "g2": "videogen",
    "ph": "videogen",
    "reddit": "r/videography/search/?q=videogen"
  },
  "textero": {
    "domain": "textero.ai",
    "g2": "textero-ai",
    "ph": "textero-ai",
    "reddit": "r/writing/search/?q=textero"
  },
  "quickads": {
    "domain": "quickads.ai",
    "g2": "quickads-ai",
    "ph": "quickads",
    "reddit": "r/PPC/search/?q=quickads"
  },
  "meetgeek": {
    "domain": "meetgeek.ai",
    "g2": "meetgeek",
    "ph": "meetgeek-ai",
    "reddit": "r/productivity/search/?q=meetgeek"
  },
  "castmagic": {
    "domain": "castmagic.io",
    "g2": "castmagic",
    "ph": "castmagic",
    "reddit": "r/podcasting/search/?q=castmagic"
  },
  "palette": {
    "domain": "palette.fm",
    "g2": "palette-fm",
    "ph": "palette-fm",
    "reddit": "r/Colorization/search/?q=palette.fm"
  },
  "fireflies": {
    "domain": "fireflies.ai",
    "g2": "fireflies-ai",
    "ph": "fireflies-ai",
    "reddit": "r/productivity/search/?q=fireflies.ai"
  },
  "frase": {
    "domain": "frase.io",
    "g2": "frase",
    "ph": "frase",
    "reddit": "r/SEO/search/?q=frase.io"
  },
  "10web": {
    "domain": "10web.io",
    "g2": "10web",
    "ph": "10web",
    "reddit": "r/Wordpress/search/?q=10web"
  },
  "palabra": {
    "domain": "palabra.ai",
    "g2": "palabra-ai",
    "ph": "palabra-ai",
    "reddit": "r/languagelearning/search/?q=palabra"
  },
  "postcrest": {
    "domain": "postcrest.com",
    "g2": "postcrest",
    "ph": "postcrest",
    "reddit": "r/SocialMediaMarketing/search/?q=postcrest"
  },
  "pineapple-builder": {
    "domain": "pineapplebuilder.com",
    "g2": "pineapple-builder",
    "ph": "pineapple-builder",
    "reddit": "r/webdev/search/?q=pineapple+builder"
  },
  "potion": {
    "domain": "sendpotion.com",
    "g2": "potion",
    "ph": "potion-2",
    "reddit": "r/sales/search/?q=sendpotion"
  },
  "rytr": {
    "domain": "rytr.me",
    "g2": "rytr",
    "ph": "rytr",
    "reddit": "r/copywriting/search/?q=rytr"
  },
  "listnr": {
    "domain": "listnr.ai",
    "g2": "listnr",
    "ph": "listnr",
    "reddit": "r/podcasts/search/?q=listnr"
  },
  "jotform": {
    "domain": "jotform.com",
    "g2": "jotform",
    "ph": "jotform",
    "reddit": "r/webdev/search/?q=jotform"
  },
  "lebesgue": {
    "domain": "lebesgue.io",
    "g2": "lebesgue",
    "ph": "lebesgue-io",
    "reddit": "r/ecommerce/search/?q=lebesgue"
  },
  "gamma": {
    "domain": "gamma.app",
    "g2": "gamma-app",
    "ph": "gamma-app",
    "reddit": "r/PowerPoint/search/?q=gamma+app"
  },
  "synthesia": {
    "domain": "synthesia.io",
    "g2": "synthesia",
    "ph": "synthesia",
    "reddit": "r/videography/search/?q=synthesia+ai"
  },
  "jasper": {
    "domain": "jasper.ai",
    "g2": "jasper-ai",
    "ph": "jasper-ai",
    "reddit": "r/JasperAI"
  },
  "opusclip": {
    "domain": "opus.pro",
    "g2": "opus-clip",
    "ph": "opus-clip",
    "reddit": "r/videoediting/search/?q=opus+clip"
  },
  "originality": {
    "domain": "originality.ai",
    "g2": "originality-ai",
    "ph": "originality-ai",
    "reddit": "r/SEO/search/?q=originality.ai"
  },
  "speak-ai": {
    "domain": "speakai.co",
    "g2": "speak-ai",
    "ph": "speak-ai",
    "reddit": "r/audioengineering/search/?q=speak+ai"
  },
  "undetectable": {
    "domain": "undetectable.ai",
    "g2": "undetectable-ai",
    "ph": "undetectable-ai",
    "reddit": "r/ChatGPT/search/?q=undetectable+ai"
  },
  "simplified": {
    "domain": "simplified.com",
    "g2": "simplified",
    "ph": "simplified",
    "reddit": "r/graphic_design/search/?q=simplified"
  },
  "magicslides": {
    "domain": "magicslides.app",
    "g2": "magicslides",
    "ph": "magicslides-app",
    "reddit": "r/presentation/search/?q=magicslides"
  },
  "paperguide": {
    "domain": "paperguide.ai",
    "g2": "paperguide",
    "ph": "paperguide",
    "reddit": "r/GradSchool/search/?q=paperguide"
  },
  "browse-ai": {
    "domain": "browse.ai",
    "g2": "browse-ai",
    "ph": "browse-ai",
    "reddit": "r/webscraping/search/?q=browse+ai"
  }
};

export function getVerifiedReviewUrl(
  toolSlug: string,
  source: "G2" | "PRODUCT_HUNT" | "TRUSTPILOT" | "REDDIT" | "HACKER_NEWS" | "CAPTERRA" | string,
  fallbackName?: string
): string {
  const meta = TOOL_PLATFORM_META[toolSlug];
  const src = source.toUpperCase().replace(/\s+/g, "_");

  if (!meta) {
    const q = encodeURIComponent(fallbackName || toolSlug);
    if (src.includes("TRUSTPILOT")) return `https://www.trustpilot.com/search?query=${q}`;
    if (src.includes("PRODUCT_HUNT") || src.includes("PRODUCTHUNT")) return `https://www.producthunt.com/search?q=${q}`;
    if (src.includes("REDDIT")) return `https://www.reddit.com/r/SaaS/search/?q=${q}&restrict_sr=1`;
    return `https://www.g2.com/search?query=${q}`;
  }

  if (src === "G2" || src.includes("G2")) {
    return `https://www.g2.com/products/${meta.g2}/reviews`;
  }

  if (src === "TRUSTPILOT" || src.includes("TRUSTPILOT")) {
    return `https://www.trustpilot.com/review/${meta.domain}`;
  }

  if (src === "PRODUCT_HUNT" || src.includes("PRODUCT_HUNT") || src.includes("PRODUCTHUNT")) {
    return `https://www.producthunt.com/products/${meta.ph}/reviews`;
  }

  if (src === "REDDIT" || src.includes("REDDIT")) {
    if (meta.reddit.includes("search")) {
      return `https://www.reddit.com/${meta.reddit}`;
    }
    return `https://www.reddit.com/${meta.reddit}/`;
  }

  if (src === "HACKER_NEWS" || src.includes("HACKER_NEWS")) {
    return `https://hn.algolia.com/?q=${encodeURIComponent(meta.domain)}`;
  }

  if (src === "CAPTERRA" || src.includes("CAPTERRA")) {
    return `https://www.capterra.com/search/?search=${encodeURIComponent(fallbackName || meta.g2)}`;
  }

  return `https://www.g2.com/products/${meta.g2}/reviews`;
}
