import re

EVIDENCE_URLS = {
    "kling-ai": "https://klingai.com/pricing",
    "luma-dream-machine": "https://lumalabs.ai/dream-machine/pricing",
    "minimax-video": "https://www.minimaxi.com/pricing",
    "ltx-studio": "https://ltx.studio/pricing",
    "udio": "https://www.udio.com/pricing",
    "soundraw": "https://soundraw.io/pricing",
    "stable-audio": "https://stableaudio.com/pricing",
    "flux-ai": "https://bfl.ml/pricing",
    "krea-ai": "https://www.krea.ai/pricing",
    "recraft-ai": "https://www.recraft.ai/pricing",
    "freepik-mystic": "https://www.freepik.com/pricing",
    "surfer-seo": "https://surferseo.com/pricing",
    "marketmuse": "https://www.marketmuse.com/pricing",
    "scalenut": "https://www.scalenut.com/pricing",
    "fathom-ai": "https://fathom.video/pricing",
    "tldv": "https://tldv.io/pricing",
    "supernormal": "https://supernormal.com/pricing",
    "clay-ai": "https://www.clay.com/pricing",
    "apollo-ai": "https://www.apollo.io/pricing",
    "instantly-ai": "https://instantly.ai/pricing",
    "beautiful-ai": "https://www.beautiful.ai/pricing",
    "napkin-ai": "https://www.napkin.ai/pricing",
    "glide-apps": "https://www.glideapps.com/pricing",
    "flutterflow": "https://flutterflow.io/pricing",
    "bubble-io": "https://bubble.io/pricing",
    "webflow": "https://webflow.com/pricing",
    "cohere": "https://cohere.com/pricing",
    "groq": "https://groq.com/pricing",
    "langchain": "https://www.langchain.com/pricing",
    "codeium": "https://codeium.com/pricing"
}

with open("src/data/tools-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

count = 0
for slug, url in EVIDENCE_URLS.items():
    pattern = rf'(slug:\s*"{slug}",[\s\S]*?\n    pricingTiers:)'
    m = re.search(pattern, content)
    if m:
        block = m.group(1)
        if "pricingEvidenceUrl:" not in block:
            new_block = block.replace("pricingTiers:", f'pricingEvidenceUrl: "{url}",\n    pricingTiers:')
            content = content.replace(block, new_block)
            count += 1

print(f"Added pricingEvidenceUrl to {count} tools.")

with open("src/data/tools-data.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Saved tools-data.ts successfully!")
