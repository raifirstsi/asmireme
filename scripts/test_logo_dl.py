import os
import urllib.request
from urllib.parse import urlparse

os.makedirs('public/logos', exist_ok=True)

test_domains = {
    'highlevel': 'gohighlevel.com',
    'decktopus': 'decktopus.com',
    'capcut': 'capcut.com',
    'elevenlabs': 'elevenlabs.io',
    'getresponse': 'getresponse.com'
}

for slug, domain in test_domains.items():
    # Try google 128px favicon first
    url = f"https://www.google.com/s2/favicons?domain={domain}&sz=128"
    dest = f"public/logos/{slug}.png"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(dest, 'wb') as out:
                out.write(data)
            print(f"Downloaded {slug}.png ({len(data)} bytes)")
    except Exception as e:
        print(f"Failed {slug}: {e}")
