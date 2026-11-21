import re
from urllib.parse import urlparse

with open('src/data/reviews-dataset.ts', 'r', encoding='utf-8') as f:
    text = f.read()

urls = re.findall(r'"sourceUrl":\s*"([^"]+)"', text)
print(f"Total review sourceUrls: {len(urls)}")
domains = {}
for u in urls:
    d = urlparse(u).netloc
    domains[d] = domains.get(d, 0) + 1

for d, count in sorted(domains.items(), key=lambda x: -x[1]):
    print(f"{d}: {count}")

print("\nSample 15 URLs:")
for u in urls[:15]:
    print(u)
