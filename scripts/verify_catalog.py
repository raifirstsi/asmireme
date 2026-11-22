import re
import os

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

slugs = re.findall(r'slug:\s*"([^"]+)"', text)
print(f"Total tools in tools-data.ts: {len(slugs)}")
print(f"Unique slugs: {len(set(slugs))}")

with open('src/services/review-ingestion.ts', 'r', encoding='utf-8') as f:
    r_text = f.read()
review_slugs = re.findall(r'^\s*"([a-z0-9-]+)":\s*\[', r_text, re.MULTILINE) + re.findall(r'^\s*([a-z0-9-]+):\s*\[', r_text, re.MULTILINE)
print(f"Total review mapping keys: {len(set(review_slugs))}")

with open('src/data/platform-review-links.ts', 'r', encoding='utf-8') as f:
    p_text = f.read()
platform_slugs = re.findall(r'^\s*"([a-z0-9-]+)":\s*\{', p_text, re.MULTILINE)
print(f"Total platform meta keys: {len(set(platform_slugs))}")

# Check logos
missing_logos = []
for s in slugs:
    p = f"public/logos/{s}.png"
    if not os.path.exists(p) or os.path.getsize(p) < 200:
        missing_logos.append(s)

print(f"Missing logos count: {len(missing_logos)}")
if missing_logos:
    print(f"Missing logos: {missing_logos}")
else:
    print("All logos exist and are valid!")
