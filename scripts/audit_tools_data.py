import re
import json

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Match each tool block by 'slug: "..."'
slug_matches = list(re.finditer(r'slug:\s*"([^"]+)"', content))
print(f"Total slugs matched: {len(slug_matches)}")

tools = []
for i, sm in enumerate(slug_matches):
    start = sm.start()
    end = slug_matches[i+1].start() if i+1 < len(slug_matches) else len(content)
    chunk = content[start:end]
    
    slug = sm.group(1)
    name_m = re.search(r'name:\s*"([^"]+)"', chunk)
    name = name_m.group(1) if name_m else slug
    
    url_m = re.search(r'officialUrl:\s*"([^"]+)"', chunk)
    url = url_m.group(1) if url_m else ""
    
    sp_m = re.search(r'startingPrice:\s*([0-9.]+)', chunk)
    starting_price = float(sp_m.group(1)) if sp_m else 0
    
    tiers_block_m = re.search(r'pricingTiers:\s*\[(.*?)\]\s*,', chunk, re.DOTALL)
    tiers = []
    if tiers_block_m:
        tb = tiers_block_m.group(1)
        for tm in re.finditer(r'name:\s*"([^"]+)".*?priceMonthly:\s*([0-9.]+).*?priceAnnualMonthly:\s*([0-9.]+)', tb, re.DOTALL):
            t_name = tm.group(1)
            pm = float(tm.group(2))
            pam = float(tm.group(3))
            
            # find features
            feat_m = re.search(r'features:\s*\[(.*?)\]', tb[tm.start():tm.end()+200])
            feats = []
            if feat_m:
                feats = [f.strip(' "\'') for f in feat_m.group(1).split(',') if f.strip()]
            tiers.append({"name": t_name, "monthly": pm, "annual": pam, "features": feats})
            
    tools.append({
        "slug": slug,
        "name": name,
        "url": url,
        "startingPrice": starting_price,
        "tiers": tiers
    })

print(f"Successfully extracted {len(tools)} tools.")
with open('scripts/all_tools_audit_raw.json', 'w', encoding='utf-8') as f:
    json.dump(tools, f, indent=2, ensure_ascii=False)

for i, t in enumerate(tools):
    print(f"{i+1:2d}. {t['slug']:<25} | {t['name']:<25} | Tiers: {len(t['tiers'])} | SP: ${t['startingPrice']}")
