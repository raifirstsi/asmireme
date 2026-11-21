import re
import urllib.parse

def clean_tool_name(slug):
    # Mapping slug to tool name
    slug_names = {
        "highlevel": "GoHighLevel",
        "decktopus": "Decktopus AI",
        "taskade": "Taskade",
        "getresponse": "GetResponse",
        "omniseo": "OmniSEO",
        "reclaim": "Reclaim.ai",
        "capcut": "CapCut",
        "elevenlabs": "ElevenLabs",
        "koala": "Koala AI",
        "submagic": "Submagic",
        "winston": "Winston AI",
        "fireflies": "Fireflies.ai",
        "jotform": "Jotform",
        "synthesia": "Synthesia",
        "vrew": "Vrew",
        "descript": "Descript",
        "fliki": "Fliki",
        "heygen": "HeyGen",
        "opusclip": "Opus Clip",
        "murf": "Murf AI",
        "speechify": "Speechify",
        "lovo": "Lovo.ai",
        "resemble": "Resemble AI",
        "jasper": "Jasper AI",
        "copyai": "Copy.ai",
        "writesonic": "Writesonic",
        "surfer": "Surfer SEO",
        "scalenut": "Scalenut",
        "originality": "Originality.ai",
        "copyleaks": "Copyleaks",
        "gamma": "Gamma App",
        "tome": "Tome",
        "beautiful": "Beautiful.ai",
        "otter": "Otter.ai",
        "fathom": "Fathom",
        "tl-dv": "tl;dv",
        "meetgeek": "MeetGeek",
        "hubspot": "HubSpot",
        "apollo": "Apollo.io",
        "instantly": "Instantly.ai",
        "smartlead": "Smartlead",
        "adcreative": "AdCreative.ai",
        "madgicx": "Madgicx",
        "triplewhale": "Triple Whale",
        "framer": "Framer",
        "webflow": "Webflow",
        "typeform": "Typeform",
        "tally": "Tally",
        "perplexity": "Perplexity AI",
        "julius": "Julius AI"
    }
    return slug_names.get(slug, slug.capitalize())

def generate_source_url(source, slug):
    tool_name = clean_tool_name(slug)
    q = urllib.parse.quote(tool_name)
    q_rev = urllib.parse.quote(f"{tool_name} review")
    
    src = source.upper()
    if "TRUSTPILOT" in src:
        return f"https://www.trustpilot.com/search?query={q}"
    elif "PRODUCT_HUNT" in src or "PRODUCT HUNT" in src:
        return f"https://www.producthunt.com/search?q={q}"
    elif "REDDIT" in src:
        return f"https://www.reddit.com/search/?q={q_rev}"
    elif "G2" in src:
        return f"https://www.google.com/search?q=site:g2.com+{q}+reviews"
    elif "HACKER_NEWS" in src or "HACKER NEWS" in src:
        return f"https://hn.algolia.com/?q={q}"
    elif "CAPTERRA" in src:
        return f"https://www.capterra.com/search/?search={q}"
    else:
        return f"https://www.google.com/search?q={q}+reviews"

with open("src/services/review-ingestion.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Pattern for slug key: e.g. "  highlevel: ["
current_slug = ""
lines = text.split("\n")
new_lines = []

for line in lines:
    m_slug = re.match(r'^\s*([a-z0-9\-]+):\s*\[', line)
    if m_slug:
        current_slug = m_slug.group(1)
        
    m_src = re.search(r'source:\s*"([^"]+)"', line)
    if m_src:
        current_src = m_src.group(1)
        
    m_url = re.search(r'sourceUrl:\s*"([^"]+)"', line)
    if m_url and current_slug and 'current_src' in locals():
        valid_url = generate_source_url(current_src, current_slug)
        line = re.sub(r'sourceUrl:\s*"[^"]+"', f'sourceUrl: "{valid_url}"', line)
        
    new_lines.append(line)

with open("src/services/review-ingestion.ts", "w", encoding="utf-8") as f:
    f.write("\n".join(new_lines))

print("Updated src/services/review-ingestion.ts successfully!")
