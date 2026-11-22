import json
import re
from collections import Counter

with open('scripts/all_aitoolsrecap_database.json', 'r', encoding='utf-8') as f:
    tools = json.load(f)

print(f"Total tools in database: {len(tools)}")

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

asmire_slugs = set(re.findall(r'slug:\s*"([^"]+)"', text))
print(f"Asmire current tools: {len(asmire_slugs)}")

# Check overlap
in_asmire = []
not_in_asmire = []
for t in tools:
    slug = t['slug']
    if slug in asmire_slugs or slug.replace('-ai', '') in asmire_slugs or slug.replace('-', '') in [s.replace('-', '') for s in asmire_slugs]:
        in_asmire.append(t)
    else:
        not_in_asmire.append(t)

print(f"Already on Asmire: {len(in_asmire)} (including major tools like {', '.join([t['name'] for t in in_asmire[:15]])})")
print(f"Available to onboard: {len(not_in_asmire)}")

# Breakdown by meta/category
categories = Counter()
for t in not_in_asmire:
    meta = t.get('meta', 'General')
    cat = meta.split('·')[-1].strip() if '·' in meta else meta
    categories[cat] += 1

print("\nBreakdown of 1,600+ tools by Category on AIToolsRecap:")
for cat, count in categories.most_common(15):
    print(f"  • {cat}: {count} tools")

# Breakdown by price
prices = Counter(t.get('price_type', 'Unknown') for t in not_in_asmire)
print("\nBreakdown by Pricing Model:")
for pr, count in prices.most_common():
    print(f"  • {pr}: {count} tools")
