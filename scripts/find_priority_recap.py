import json
import re

with open('scripts/all_aitoolsrecap_database.json', 'r', encoding='utf-8') as f:
    tools = json.load(f)

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

asmire_slugs = set(re.findall(r'slug:\s*"([^"]+)"', text))
print(f"Existing slugs in Asmire: {len(asmire_slugs)}")

candidates = []
for t in tools:
    slug = t['slug']
    name = t['name']
    if slug in asmire_slugs:
        continue
    # Check normalized
    if slug.replace('-ai', '') in asmire_slugs:
        continue
    
    score = float(t.get('score') or 0)
    desc = t.get('desc', '')
    counts = t.get('counts', '')
    
    # We want authentic SaaS tools, not spam or toy apps
    candidates.append(t)

print(f"Total candidate tools: {len(candidates)}")

# Search for high-profile SaaS brands in candidates
priority_names = [
    'luma', 'sora', 'kling', 'minimax', 'hedra', 'runway', 'elevenlabs',
    'suno', 'udio', 'riffusion', 'soundraw', 'voicemod', 'respeecher',
    'flux', 'black forest', 'recraft', 'krea', 'magnific', 'freepik',
    'gamma', 'beautiful.ai', 'pitch', 'tome', 'popai', 'decktopus',
    'surfer', 'neilpatel', 'ubersuggest', 'marketmuse', 'scalenut', 'inlinks',
    'fathom', 'tldv', 'grain', 'supernormal', 'avoma', 'fellow', 'krisp',
    'apollo', 'seamless', 'instantly', 'smartlead', 'lemlist', 'clay',
    'retool', 'bubble', 'flutterflow', 'webflow', 'glide', 'softr',
    'codeium', 'tabnine', 'sourcegraph', 'cody', 'continue', 'aider', 'qodo',
    'phind', 'consensus', 'elicit', 'scite', 'chatdoc', 'humata',
    'cohere', 'ai21', 'together', 'groq', 'cerebras', 'sambanova',
    'weights & biases', 'langchain', 'llamaindex', 'crewai', 'autogen'
]

matched_priority = []
for c in candidates:
    n = c['name'].lower()
    s = c['slug'].lower()
    d = c['desc'].lower()
    for p in priority_names:
        if p in n or p in s:
            matched_priority.append((p, c))
            break

print(f"\nMatched priority SaaS tools: {len(matched_priority)}")
for p, c in matched_priority[:40]:
    print(f"[{p}] {c['name']} ({c['slug']}) - Score: {c['score']} - {c['price_type']} - Meta: {c['meta']}")
    print(f"     Desc: {c['desc'][:90]}...")
