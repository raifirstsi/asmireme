import re
import os

with open('src/services/review-ingestion.ts', 'r', encoding='utf-8') as f:
    ingestion_content = f.read()

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    tools_content = f.read()

slugs = re.findall(r'slug:\s*["\']([^"\']+)["\']', tools_content)

missing_reviews = []
for s in slugs:
    # check f'"{s}":' or f"'{s}':" or f"{s}:"
    pattern = rf'["\']?{re.escape(s)}["\']?\s*:\s*\['
    if not re.search(pattern, ingestion_content):
        missing_reviews.append(s)

print(f"Actually missing reviews in ingestion: {len(missing_reviews)}", missing_reviews)

with open('src/data/platform-review-links.ts', 'r', encoding='utf-8') as f:
    meta_content = f.read()

missing_meta = []
for s in slugs:
    pattern = rf'["\']?{re.escape(s)}["\']?\s*:\s*\{{'
    if not re.search(pattern, meta_content):
        missing_meta.append(s)

print(f"Actually missing platform meta: {len(missing_meta)}", missing_meta)
