import re

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

tool_chunks = re.findall(r'(  \{\n    id: "[^"]+",[\s\S]*?\n  \}(?:,|\n\];))', content)

synthetic = []
audited = []

for c in tool_chunks:
    slug_m = re.search(r'slug:\s*"([^"]+)"', c)
    name_m = re.search(r'name:\s*"([^"]+)"', c)
    start_p = re.search(r'startingPrice:\s*([0-9.]+)', c)
    tiers_m = re.search(r'pricingTiers:\s*\[([\s\S]*?)\]', c)
    official_m = re.search(r'officialUrl:\s*"([^"]+)"', c)
    
    slug = slug_m.group(1) if slug_m else ''
    name = name_m.group(1) if name_m else ''
    start = float(start_p.group(1)) if start_p else 0
    official_url = official_m.group(1) if official_m else ''
    
    tiers_text = tiers_m.group(1) if tiers_m else ''
    
    # Check if contains 'Core features'
    if 'Core features' in tiers_text:
        synthetic.append((slug, name, start, official_url))
    else:
        audited.append((slug, name, start, official_url))

print(f'Total tools: {len(tool_chunks)}')
print(f'Audited/Authentic tools: {len(audited)}')
print(f'Tools still having synthetic tiers: {len(synthetic)}')
print('\nList of synthetic tools:')
for s in synthetic:
    print(f' - {s[0]:22} | {s[1]:32} | starting: ${s[2]:5} | {s[3]}')
