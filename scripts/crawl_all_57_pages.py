import urllib.request
import time
from bs4 import BeautifulSoup
import json
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

def fetch_single_page(page_num):
    url = f"https://aitoolsrecap.com/AITools.aspx?page={page_num}#tools" if page_num > 1 else "https://aitoolsrecap.com/AITools.aspx"
    req = urllib.request.Request(url, headers=HEADERS)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=12) as response:
                html = response.read().decode('utf-8', errors='ignore')
                return page_num, html
        except Exception as e:
            if attempt == 2:
                print(f"Failed page {page_num}: {e}")
                return page_num, ""
            time.sleep(1)
    return page_num, ""

print("Starting full crawl of all 57 pages from aitoolsrecap.com...")
start_time = time.time()

pages_html = {}
with ThreadPoolExecutor(max_workers=8) as executor:
    futures = {executor.submit(fetch_single_page, p): p for p in range(1, 58)}
    for future in as_completed(futures):
        page_num, html = future.result()
        if html:
            pages_html[page_num] = html
            print(f"  [OK] Page {page_num}/57 fetched ({len(html)} bytes)")

print(f"\nFetched {len(pages_html)}/57 pages in {time.time() - start_time:.2f}s.")

# Parse all cards
all_tools = []
seen_slugs = set()

for p in sorted(pages_html.keys()):
    html = pages_html[p]
    soup = BeautifulSoup(html, 'html.parser')
    cards = soup.find_all('a', class_='dx-card')
    for c in cards:
        href = c.get('href', '')
        slug = href.split('/')[-1].lower() if '/Product/' in href else ""
        if not slug or slug in seen_slugs:
            continue
        seen_slugs.add(slug)
        
        name_el = c.find(class_='dx-name')
        name = name_el.get_text(strip=True) if name_el else slug
        
        desc_el = c.find(class_='dx-desc')
        desc = desc_el.get_text(strip=True) if desc_el else ""
        
        meta_el = c.find(class_='dx-meta')
        meta = meta_el.get_text(strip=True) if meta_el else ""
        
        price_el = c.find(class_='dx-price')
        price_type = price_el.get_text(strip=True) if price_el else "Freemium"
        
        score_el = c.find(class_='dx-score')
        score = score_el.get_text(strip=True) if score_el else "4.0"
        
        tags_el = c.find(class_='dx-tags')
        tags = [t.get_text(strip=True) for t in tags_el.find_all(class_='dx-tag')] if tags_el else []
        
        img_el = c.find('img')
        img_src = img_el.get('src', '') if img_el else ""
        
        counts_el = c.find(class_='dx-counts')
        counts_text = counts_el.get_text(strip=True) if counts_el else ""
        
        all_tools.append({
            "slug": slug,
            "name": name,
            "desc": desc,
            "meta": meta,
            "price_type": price_type,
            "score": score,
            "tags": tags,
            "img_src": img_src,
            "counts": counts_text,
            "page": p,
            "product_url": f"https://aitoolsrecap.com{href}"
        })

print(f"\n=======================================================")
print(f"TOTAL TOOLS EXTRACTED FROM ALL 57 PAGES: {len(all_tools)}")
print(f"=======================================================")

with open('scripts/all_aitoolsrecap_database.json', 'w', encoding='utf-8') as f:
    json.dump(all_tools, f, ensure_ascii=False, indent=2)

print("Saved complete master database to scripts/all_aitoolsrecap_database.json")
