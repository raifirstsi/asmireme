import re
import json

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Match each tool block
slugs = re.findall(r'slug:\s*"([^"]+)"', content)
names = re.findall(r'name:\s*"([^"]+)"', content)
official_urls = re.findall(r'officialUrl:\s*"([^"]+)"', content)

print(f"Slugs found: {len(slugs)}")
print(f"Names found: {len(names)}")
print(f"Official URLs found: {len(official_urls)}")

for i in range(min(len(slugs), len(official_urls))):
    print(f"{i+1}. {slugs[i]} ({names[i] if i < len(names) else ''}) -> {official_urls[i]}")
