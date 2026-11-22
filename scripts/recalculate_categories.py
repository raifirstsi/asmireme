import re

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Match all tools and their hubs
# Each tool has slug: "..." and hubs: [...]
tool_matches = re.findall(r'slug:\s*["\']([^"\']+)["\'].*?hubs:\s*(\[[^\]]+\])', content, re.DOTALL)
print(f"Total tools matched with hubs: {len(tool_matches)}")

hub_counts = {}
for slug, hubs_raw in tool_matches:
    hubs = re.findall(r'["\']([^"\']+)["\']', hubs_raw)
    for h in hubs:
        hub_counts[h] = hub_counts.get(h, 0) + 1

print("\nActual Hub Counts for all 130 tools:")
for h, c in sorted(hub_counts.items()):
    print(f"  {h}: {c}")

# Now update src/data/categories-data.ts
cat_path = 'src/data/categories-data.ts'
with open(cat_path, 'r', encoding='utf-8') as f:
    cat_content = f.read()

def replacer(match):
    full_block = match.group(0)
    slug = match.group(1)
    actual_count = hub_counts.get(slug, 0)
    # replace count: \d+
    updated = re.sub(r'count:\s*\d+,', f'count: {actual_count},', full_block)
    return updated

new_cat_content = re.sub(
    r'\{\s*slug:\s*"([^"]+)".*?count:\s*\d+,.*?\}',
    replacer,
    cat_content,
    flags=re.DOTALL
)

with open(cat_path, 'w', encoding='utf-8') as f:
    f.write(new_cat_content)

print("\nUpdated src/data/categories-data.ts with exact counts across all 130 tools.")
