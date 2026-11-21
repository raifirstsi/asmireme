import urllib.request
import re

url = "https://asmire.me/en/tools/highlevel"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
    m = re.search(r'<nav[^>]*aria-label="Breadcrumb".*?</nav>', html, re.DOTALL)
    if m:
        print("LIVE BREADCRUMB:")
        print(m.group(0))
    else:
        print("Breadcrumb tag not found, searching for Home:")
        for line in html.splitlines():
            if "Home" in line and "Tools" in line:
                print(line[:200])
except Exception as e:
    print("Error:", e)
