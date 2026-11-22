import re

with open("src/data/tools-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Verify matching pricingTiers -> officialUrl
matches = re.findall(r'pricingTiers:\s*\[[\s\S]*?\n    \],\s*officialUrl:', content)
print(f"Matched {len(matches)} pricingTiers blocks directly preceding officialUrl")
