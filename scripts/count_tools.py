import re

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

slugs = re.findall(r'slug:\s*"([^"]+)"', text)
print(f"Total tools in tools-data.ts: {len(slugs)}")

# Check if any tool lacks pricingTiers
missing_tiers = []
tool_blocks = re.findall(r'(  \{\n    id: "[^"]+",[\s\S]*?\n  \}(?:,|\n\];))', text)
for b in tool_blocks:
    s = re.search(r'slug:\s*"([^"]+)"', b)
    slug = s.group(1) if s else "unknown"
    if "pricingTiers:" not in b:
        missing_tiers.append(slug)

print(f"Total tool blocks: {len(tool_blocks)}")
print(f"Missing pricingTiers: {len(missing_tiers)}")
if missing_tiers:
    print(missing_tiers)
