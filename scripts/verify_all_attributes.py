import re

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

tool_blocks = re.findall(r'(  \{\n    id: "[^"]+",[\s\S]*?\n  \}(?:,|\n\];))', text)

missing_model = []
missing_evidence = []

for b in tool_blocks:
    s = re.search(r'slug:\s*"([^"]+)"', b)
    slug = s.group(1) if s else "unknown"
    if "pricingModel:" not in b:
        missing_model.append(slug)
    if "pricingEvidenceUrl:" not in b:
        missing_evidence.append(slug)

print(f"Missing pricingModel: {len(missing_model)}")
if missing_model:
    print(missing_model)

print(f"Missing pricingEvidenceUrl: {len(missing_evidence)}")
if missing_evidence:
    print(missing_evidence)
