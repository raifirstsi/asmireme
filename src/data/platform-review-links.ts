/**
 * Direct & Authentic Verified 3rd-Party Review Links Registry
 * Maps each verified SaaS tool to their actual, working review URLs on:
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
  },

  "heygen": {
    "domain": "heygen.com",
    "g2": "heygen",
    "ph": "heygen",
    "reddit": "r/HeyGen"
  },
  "invideo": {
    "domain": "invideo.io",
    "g2": "invideo",
    "ph": "invideo",
    "reddit": "r/InVideo"
  },
  "runway": {
    "domain": "runwayml.com",
    "g2": "runway",
    "ph": "runway-gen-3",
    "reddit": "r/runwayml"
  },
  "cursor": {
    "domain": "cursor.com",
    "g2": "cursor",
    "ph": "cursor-ai",
    "reddit": "r/cursor"
  },
  "bolt-new": {
    "domain": "bolt.new",
    "g2": "stackblitz",
    "ph": "bolt-new",
    "reddit": "r/BoltNew"
  },
  "lovable": {
    "domain": "lovable.dev",
    "g2": "lovable",
    "ph": "lovable",
    "reddit": "r/LovableDev"
  },
  "perplexity": {
    "domain": "perplexity.ai",
    "g2": "perplexity-ai",
    "ph": "perplexity-ai",
    "reddit": "r/perplexity_ai"
  },
  "notion-ai": {
    "domain": "notion.so",
    "g2": "notion",
    "ph": "notion",
    "reddit": "r/Notion"
  },
  "gptzero": {
    "domain": "gptzero.me",
    "g2": "gptzero",
    "ph": "gptzero",
    "reddit": "r/GPTZero"
  },
  "otter-ai": {
    "domain": "otter.ai",
    "g2": "otter-ai",
    "ph": "otter-ai",
    "reddit": "r/OtterAI"
  },
  "clickup-ai": {
    "domain": "clickup.com",
    "g2": "clickup",
    "ph": "clickup",
    "reddit": "r/clickup"
  },
  "framer": {
    "domain": "framer.com",
    "g2": "framer",
    "ph": "framer",
    "reddit": "r/framer"
  },
  "murf-ai": {
    "domain": "murf.ai",
    "g2": "murf-ai",
    "ph": "murf-ai",
    "reddit": "r/MurfAI"
  },
  "speechify": {
    "domain": "speechify.com",
    "g2": "speechify",
    "ph": "speechify",
    "reddit": "r/Speechify"
  },
  "suno": {
    "domain": "suno.com",
    "g2": "suno-ai",
    "ph": "suno",
    "reddit": "r/SunoAI"
  },
  "copy-ai": {
    "domain": "copy.ai",
    "g2": "copy-ai",
    "ph": "copy-ai",
    "reddit": "r/copyai"
  },
  "quillbot": {
    "domain": "quillbot.com",
    "g2": "quillbot",
    "ph": "quillbot",
    "reddit": "r/Quillbot"
  },
  "klaviyo": {
    "domain": "klaviyo.com",
    "g2": "klaviyo",
    "ph": "klaviyo",
    "reddit": "r/Klaviyo"
  },
  "make": {
    "domain": "make.com",
    "g2": "make",
    "ph": "make-formerly-integromat",
    "reddit": "r/Integromat"
  },
  "zapier": {
    "domain": "zapier.com",
    "g2": "zapier",
    "ph": "zapier",
    "reddit": "r/zapier"
  },
  "hubspot-crm": {
    "domain": "hubspot.com",
    "g2": "hubspot-crm",
    "ph": "hubspot-crm",
    "reddit": "r/hubspot"
  },
  "pipedrive": {
    "domain": "pipedrive.com",
    "g2": "pipedrive",
    "ph": "pipedrive",
    "reddit": "r/pipedrive"
  },
  "slides-ai": {
    "domain": "slidesai.io",
    "g2": "slidesai",
    "ph": "slidesai",
    "reddit": "r/SlidesAI"
  },
  "canva-ai": {
    "domain": "canva.com",
    "g2": "canva",
    "ph": "canva",
    "reddit": "r/canva"
  },
  "leonardo-ai": {
    "domain": "leonardo.ai",
    "g2": "leonardo-ai",
    "ph": "leonardo-ai",
    "reddit": "r/leonardoai"
  },
  "ideogram": {
    "domain": "ideogram.ai",
    "g2": "ideogram",
    "ph": "ideogram-ai",
    "reddit": "r/ideogramai"
  },
  "replit": {
    "domain": "replit.com",
    "g2": "replit",
    "ph": "replit",
    "reddit": "r/replit"
  },
  "windsurf": {
    "domain": "codeium.com",
    "g2": "codeium",
    "ph": "windsurf-by-codeium",
    "reddit": "r/Codeium"
  },
  "chatpdf": {
    "domain": "chatpdf.com",
    "g2": "chatpdf",
    "ph": "chatpdf",
    "reddit": "r/ChatPDF"
  },
  "turnitin": {
    "domain": "turnitin.com",
    "g2": "turnitin",
    "ph": "turnitin",
    "reddit": "r/Turnitin"
  },

  "chatgpt": {
    "domain": "chatgpt.com",
    "g2": "chatgpt",
    "ph": "chatgpt",
    "reddit": "r/ChatGPT"
  },
  "claude-ai": {
    "domain": "claude.ai",
    "g2": "claude",
    "ph": "claude-ai",
    "reddit": "r/ClaudeAI"
  },
  "midjourney": {
    "domain": "midjourney.com",
    "g2": "midjourney",
    "ph": "midjourney",
    "reddit": "r/midjourney"
  },
  "grok": {
    "domain": "x.ai",
    "g2": "grok",
    "ph": "grok",
    "reddit": "r/Grok"
  },
  "deepseek": {
    "domain": "deepseek.com",
    "g2": "deepseek",
    "ph": "deepseek-r1",
    "reddit": "r/DeepSeek"
  },
  "descript": {
    "domain": "descript.com",
    "g2": "descript",
    "ph": "descript",
    "reddit": "r/Descript"
  },
  "n8n": {
    "domain": "n8n.io",
    "g2": "n8n",
    "ph": "n8n",
    "reddit": "r/n8n"
  },
  "coze": {
    "domain": "coze.com",
    "g2": "coze",
    "ph": "coze",
    "reddit": "r/Coze"
  },
  "adobe-firefly": {
    "domain": "adobe.com",
    "g2": "adobe-firefly",
    "ph": "adobe-firefly",
    "reddit": "r/AdobeFirefly"
  },
  "grammarly": {
    "domain": "grammarly.com",
    "g2": "grammarly",
    "ph": "grammarly",
    "reddit": "r/Grammarly"
  },
  "hugging-face": {
    "domain": "huggingface.co",
    "g2": "hugging-face",
    "ph": "hugging-face",
    "reddit": "r/HuggingFace"
  },
  "mistral": {
    "domain": "mistral.ai",
    "g2": "mistral-ai",
    "ph": "mistral-ai",
    "reddit": "r/MistralAI"
  },
  "pika-labs": {
    "domain": "pika.art",
    "g2": "pika-labs",
    "ph": "pika-labs",
    "reddit": "r/PikaLabs"
  },
  "writesonic": {
    "domain": "writesonic.com",
    "g2": "writesonic",
    "ph": "writesonic",
    "reddit": "r/Writesonic"
  },
  "copyleaks": {
    "domain": "copyleaks.com",
    "g2": "copyleaks",
    "ph": "copyleaks",
    "reddit": "r/Copyleaks"
  },
  "ai-or-not": {
    "domain": "aiornot.com",
    "g2": "ai-or-not",
    "ph": "ai-or-not",
    "reddit": "r/AIEthics"
  },
  "convertos-ai": {
    "domain": "convertos.ai",
    "g2": "convertos-ai",
    "ph": "convertos-ai",
    "reddit": "r/SEO"
  },
  "voicefleet": {
    "domain": "voicefleet.ai",
    "g2": "voicefleet",
    "ph": "voicefleet",
    "reddit": "r/SmallBusiness"
  },
  "stable-diffusion": {
    "domain": "stability.ai",
    "g2": "stable-diffusion",
    "ph": "stable-diffusion",
    "reddit": "r/StableDiffusion"
  },
  "v0-dev": {
    "domain": "v0.dev",
    "g2": "v0-vercel",
    "ph": "v0-by-vercel",
    "reddit": "r/nextjs"
  },
  "kling-ai": {
    "domain": "klingai.com",
    "g2": "kling-ai",
    "ph": "kling-ai",
    "reddit": "r/KlingAI"
  },
  "luma-dream-machine": {
    "domain": "lumalabs.ai",
    "g2": "luma-dream-machine",
    "ph": "luma-dream-machine",
    "reddit": "r/LumaAI"
  },
  "minimax-video": {
    "domain": "hailuoai.video",
    "g2": "minimax-video",
    "ph": "minimax-video",
    "reddit": "r/AIVideo"
  },
  "ltx-studio": {
    "domain": "ltx.studio",
    "g2": "ltx-studio",
    "ph": "ltx-studio",
    "reddit": "r/Filmmakers"
  },
  "udio": {
    "domain": "udio.com",
    "g2": "udio",
    "ph": "udio",
    "reddit": "r/udio"
  },
  "soundraw": {
    "domain": "soundraw.io",
    "g2": "soundraw",
    "ph": "soundraw",
    "reddit": "r/WeAreTheMusicMakers"
  },
  "stable-audio": {
    "domain": "stableaudio.com",
    "g2": "stable-audio",
    "ph": "stable-audio",
    "reddit": "r/StabilityAI"
  },
  "flux-ai": {
    "domain": "blackforestlabs.ai",
    "g2": "flux-ai",
    "ph": "flux-1",
    "reddit": "r/FluxAI"
  },
  "krea-ai": {
    "domain": "krea.ai",
    "g2": "krea-ai",
    "ph": "krea-ai",
    "reddit": "r/KreaAI"
  },
  "recraft-ai": {
    "domain": "recraft.ai",
    "g2": "recraft-ai",
    "ph": "recraft-ai",
    "reddit": "r/graphic_design"
  },
  "freepik-mystic": {
    "domain": "freepik.com",
    "g2": "freepik",
    "ph": "freepik",
    "reddit": "r/Freepik"
  },
  "surfer-seo": {
    "domain": "surferseo.com",
    "g2": "surfer-seo",
    "ph": "surfer-seo",
    "reddit": "r/SEO"
  },
  "marketmuse": {
    "domain": "marketmuse.com",
    "g2": "marketmuse",
    "ph": "marketmuse",
    "reddit": "r/content_marketing"
  },
  "scalenut": {
    "domain": "scalenut.com",
    "g2": "scalenut",
    "ph": "scalenut",
    "reddit": "r/Blogging"
  },
  "fathom-ai": {
    "domain": "fathom.video",
    "g2": "fathom",
    "ph": "fathom",
    "reddit": "r/sales"
  },
  "tldv": {
    "domain": "tldv.io",
    "g2": "tldv",
    "ph": "tldv",
    "reddit": "r/remotework"
  },
  "supernormal": {
    "domain": "supernormal.com",
    "g2": "supernormal",
    "ph": "supernormal",
    "reddit": "r/ProductManagement"
  },
  "clay-ai": {
    "domain": "clay.com",
    "g2": "clay-data",
    "ph": "clay-com",
    "reddit": "r/sales"
  },
  "apollo-ai": {
    "domain": "apollo.io",
    "g2": "apollo-io",
    "ph": "apollo-io",
    "reddit": "r/sales"
  },
  "instantly-ai": {
    "domain": "instantly.ai",
    "g2": "instantly-ai",
    "ph": "instantly-ai",
    "reddit": "r/Emailmarketing"
  },
  "beautiful-ai": {
    "domain": "beautiful.ai",
    "g2": "beautiful-ai",
    "ph": "beautiful-ai",
    "reddit": "r/PowerPoint"
  },
  "napkin-ai": {
    "domain": "napkin.ai",
    "g2": "napkin-ai",
    "ph": "napkin-ai",
    "reddit": "r/productivity"
  },
  "glide-apps": {
    "domain": "glideapps.com",
    "g2": "glide-apps",
    "ph": "glide",
    "reddit": "r/nocode"
  },
  "flutterflow": {
    "domain": "flutterflow.io",
    "g2": "flutterflow",
    "ph": "flutterflow",
    "reddit": "r/FlutterFlow"
  },
  "bubble-io": {
    "domain": "bubble.io",
    "g2": "bubble",
    "ph": "bubble",
    "reddit": "r/BubbleIO"
  },
  "webflow": {
    "domain": "webflow.com",
    "g2": "webflow",
    "ph": "webflow",
    "reddit": "r/webflow"
  },
  "cohere": {
    "domain": "cohere.com",
    "g2": "cohere",
    "ph": "cohere",
    "reddit": "r/MachineLearning"
  },
  "groq": {
    "domain": "groq.com",
    "g2": "groq",
    "ph": "groq",
    "reddit": "r/Groq"
  },
  "langchain": {
    "domain": "langchain.com",
    "g2": "langchain",
    "ph": "langchain",
    "reddit": "r/LangChain"
  },
  "codeium": {
    "domain": "codeium.com",
    "g2": "codeium",
    "ph": "codeium",
    "reddit": "r/Codeium"
  },
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
