import re

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for target in ["cursor", "heygen", "synthesia", "originality", "winston"]:
    m = re.search(r'slug:\s*"' + target + r'",[\s\S]*?officialUrl:\s*"[^"]+"', content)
    if m:
        print(f"=== {target.upper()} ===")
        # extract pricingTiers
        pt = re.search(r'pricingTiers:\s*\[([\s\S]*?)\]', m.group(0))
        if pt:
            print(pt.group(0))
        print("--------------------")
