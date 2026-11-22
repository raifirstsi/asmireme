import re
import json

with open("src/data/tools-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Match each tool block
# Tools start with { and have id: "tool-..." or similar
tools_raw = re.findall(r'(\{\s*id:\s*"[^"]+",[\s\S]*?officialUrl:\s*"[^"]+"[\s\S]*?\n  \},?)', content)
print(f"Total tool blocks matched: {len(tools_raw)}")

synthetic_tools = []
detailed_tools = []

for block in tools_raw:
    slug_m = re.search(r'slug:\s*"([^"]+)"', block)
    name_m = re.search(r'name:\s*"([^"]+)"', block)
    start_p = re.search(r'startingPrice:\s*([0-9.]+)', block)
    tiers_m = re.search(r'pricingTiers:\s*\[([\s\S]*?)\]', block)
    model_m = re.search(r'pricingModel:\s*"([^"]+)"', block)
    
    slug = slug_m.group(1) if slug_m else "unknown"
    name = name_m.group(1) if name_m else "unknown"
    start = float(start_p.group(1)) if start_p else 0.0
    model = model_m.group(1) if model_m else "none"
    
    tier_info = []
    if tiers_m:
        tiers_str = tiers_m.group(1)
        # Match each tier
        t_matches = re.findall(r'name:\s*"([^"]+)",\s*priceMonthly:\s*([0-9.]+),\s*priceAnnualMonthly:\s*([0-9.]+)', tiers_str)
        for t_name, pm, pam in t_matches:
            tier_info.append((t_name, float(pm), float(pam)))
            
    # Check if synthetic (e.g. Starter & Pro where Pro is ~2.2x or has decimals like 213.4, or features are ["Core features..."])
    is_synthetic = False
    if len(tier_info) == 2 and tier_info[0][0] == "Starter" and tier_info[1][0] == "Pro":
        if "Core features" in tiers_str:
            is_synthetic = True
            
    if is_synthetic:
        synthetic_tools.append((slug, name, start, tier_info))
    else:
        detailed_tools.append((slug, name, start, model, tier_info))

print(f"\nSynthetic Tools count: {len(synthetic_tools)}")
print(f"Detailed/Custom Tools count: {len(detailed_tools)}")

print("\n--- Synthetic sample (first 10) ---")
for s in synthetic_tools[:10]:
    print(f"{s[0]:22} | start: {s[2]:5} | tiers: {s[3]}")

print("\n--- Detailed sample ---")
for d in detailed_tools:
    print(f"{d[0]:22} | start: {d[2]:5} | model: {d[3]} | tiers: {d[4]}")
