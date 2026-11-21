import urllib.request
import re

req = urllib.request.Request('https://www.gohighlevel.com', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req, timeout=10) as r:
        html = r.read().decode('utf-8', errors='ignore')
        icons = re.findall(r'<link[^>]*href=["\']([^"\']+\.(?:png|svg|ico))["\'][^>]*rel=["\'][^"\']*icon[^"\']*["\']', html, re.I)
        if not icons:
            icons = re.findall(r'<link[^>]*rel=["\'][^"\']*icon[^"\']*["\'][^>]*href=["\']([^"\']+)["\']', html, re.I)
        print('GoHighLevel icons:', icons)
except Exception as e:
    print('Error:', e)
