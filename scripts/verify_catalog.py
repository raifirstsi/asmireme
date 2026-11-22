import re
import os

with open('src/types/index.ts', 'r', encoding='utf-8') as f:
    type_content = f.read()

idx = type_content.find('export type ToolHub =')
idx2 = type_content.find(';', idx)
valid_hubs = set(re.findall(r'"([^"]+)"', type_content[idx:idx2]))
print("Valid hubs in types/index.ts:", sorted(valid_hubs))

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    tools_content = f.read()

# Fix productivity-work in napkin-ai if present
if '"productivity-work"' in tools_content:
    tools_content = tools_content.replace('"productivity-work"', '"presentation-design"')
    with open('src/data/tools-data.ts', 'w', encoding='utf-8') as f:
        f.write(tools_content)
    print("Fixed 'productivity-work' -> 'presentation-design' in tools-data.ts")

# Re-read
with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    tools_content = f.read()

slugs = re.findall(r'slug:\s*["\']([^"\']+)["\']', tools_content)
print(f"Total tools: {len(slugs)}")
print(f"Unique tools: {len(set(slugs))}")

# Check hubs of every tool
tool_blocks = re.findall(r'slug:\s*["\']([^"\']+)["\'].*?hubs:\s*(\[[^\]]+\])', tools_content, re.DOTALL)
invalid_hubs_found = []
for slug, hubs_raw in tool_blocks:
    hubs = re.findall(r'["\']([^"\']+)["\']', hubs_raw)
    for h in hubs:
        if h not in valid_hubs:
            invalid_hubs_found.append((slug, h))

if invalid_hubs_found:
    print("INVALID HUBS FOUND:", invalid_hubs_found)
else:
    print("All tool hubs are 100% valid!")

# Check logos
missing_logos = []
small_logos = []
for s in slugs:
    p = os.path.join("public", "logos", f"{s}.png")
    if not os.path.exists(p):
        missing_logos.append(s)
    elif os.path.getsize(p) < 100:
        small_logos.append((s, os.path.getsize(p)))

print(f"Missing logos ({len(missing_logos)}): {missing_logos}")
print(f"Small logos (<100b) ({len(small_logos)}): {small_logos}")

# Check review-ingestion
with open('src/services/review-ingestion.ts', 'r', encoding='utf-8') as f:
    ingestion_content = f.read()

missing_reviews = [s for s in slugs if f'"{s}": [' not in ingestion_content]
print(f"Missing reviews in ingestion ({len(missing_reviews)}): {missing_reviews}")

# Check platform-review-links
with open('src/data/platform-review-links.ts', 'r', encoding='utf-8') as f:
    meta_content = f.read()

missing_meta = [s for s in slugs if f'"{s}": {{' not in meta_content]
print(f"Missing platform meta ({len(missing_meta)}): {missing_meta}")
