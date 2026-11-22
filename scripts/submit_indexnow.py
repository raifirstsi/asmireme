import requests
import json
import xml.etree.ElementTree as ET

INDEXNOW_KEY = "a19f864e29be49b6b9075e81d113c49e"
HOST = "asmire.me"
KEY_LOCATION = f"https://{HOST}/{INDEXNOW_KEY}.txt"
SITEMAP_URL = f"https://{HOST}/sitemap.xml"

def get_urls_from_sitemap():
    try:
        r = requests.get(SITEMAP_URL, timeout=15)
        if r.status_code == 200:
            root = ET.fromstring(r.content)
            # xmlns namespace
            namespaces = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
            urls = [elem.text for elem in root.findall('.//ns:loc', namespaces)]
            return urls
    except Exception as e:
        print(f"Error fetching sitemap: {e}")
    
    # Fallback essential URLs
    return [
        f"https://{HOST}/vi",
        f"https://{HOST}/en",
        f"https://{HOST}/vi/tools/highlevel",
        f"https://{HOST}/vi/snapshots/agency-os",
        f"https://{HOST}/vi/snapshots/sme-os",
        f"https://{HOST}/vi/tools/highlevel/alternatives",
        f"https://{HOST}/vi/tools/highlevel/pricing",
    ]

def submit_indexnow():
    urls = get_urls_from_sitemap()
    print(f"[*] Found {len(urls)} URLs to submit to IndexNow...")

    payload = {
        "host": HOST,
        "key": INDEXNOW_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }

    headers = {
        "Content-Type": "application/json; charset=utf-8"
    }

    # Submit to IndexNow API (Bing / Yandex / AI search engine network)
    for endpoint in ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow"]:
        try:
            print(f"[*] Submitting to {endpoint}...")
            res = requests.post(endpoint, json=payload, headers=headers, timeout=20)
            print(f"[*] Result from {endpoint}: HTTP {res.status_code} ({res.text or 'OK'})")
        except Exception as e:
            print(f"[!] Error submitting to {endpoint}: {e}")

if __name__ == "__main__":
    submit_indexnow()
