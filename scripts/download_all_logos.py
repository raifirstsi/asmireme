import os
import re
import urllib.request
from urllib.parse import urlparse

os.makedirs('public/logos', exist_ok=True)

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse slug and officialUrl pairs
pattern = r'slug:\s*"([^"]+)",[\s\S]*?officialUrl:\s*"([^"]+)"'
matches = re.findall(pattern, content)

print(f"Found {len(matches)} tool matches in tools-data.ts")

success_count = 0
for slug, official_url in matches:
    parsed = urlparse(official_url)
    domain = parsed.netloc.replace('www.', '')
    dest = f"public/logos/{slug}.png"
    
    # Try multiple sources to get the best logo
    sources = [
        f"https://logo.clearbit.com/{domain}",
        f"https://icon.horse/icon/{domain}",
        f"https://www.google.com/s2/favicons?domain={domain}&sz=128",
        f"https://unavatar.io/{domain}"
    ]
    
    downloaded = False
    best_data = None
    best_size = 0
    
    for url in sources:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            with urllib.request.urlopen(req, timeout=6) as resp:
                if resp.status == 200:
                    data = resp.read()
                    # Check that it's a valid image (not 0 bytes or default placeholder)
                    if len(data) > 300: # larger than tiny default favicon
                        best_data = data
                        best_size = len(data)
                        break
                    elif len(data) > best_size:
                        best_data = data
                        best_size = len(data)
        except Exception:
            continue
            
    if best_data and best_size > 0:
        with open(dest, 'wb') as out:
            out.write(best_data)
        print(f"[OK] {slug} ({domain}): saved {best_size} bytes")
        success_count += 1
    else:
        print(f"[FAIL] {slug} ({domain})")

print(f"\nDone! Downloaded {success_count}/{len(matches)} logos into public/logos/")
