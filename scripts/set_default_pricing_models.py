import re

with open("src/data/tools-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Let's inspect each tool
tool_blocks = re.findall(r'(\{\s*id:\s*"[^"]+",[\s\S]*?officialUrl:\s*"([^"]+)"[\s\S]*?\n  \},?)', content)
print(f"Total tools: {len(tool_blocks)}")

def determine_model(hubs_str, tags_str, name):
    hubs = hubs_str.lower()
    tags = tags_str.lower()
    if "crm" in hubs or "sales" in hubs or "meeting" in hubs or "productivity" in hubs:
        # Check if it's highlevel or similar flat platform
        if "highlevel" in name.lower():
            return "flat"
        return "per_seat"
    elif "website-builder" in hubs:
        return "flat"
    elif "video" in hubs or "voice" in hubs or "detection" in hubs or "advertising" in hubs or "presentation" in hubs or "content" in hubs or "research" in hubs:
        return "usage"
    return "per_seat"

updated_count = 0

for block, official_url in tool_blocks:
    if "pricingModel:" not in block:
        # Extract hubs and tags
        hubs_m = re.search(r'hubs:\s*\[(.*?)\]', block)
        tags_m = re.search(r'tags:\s*\[(.*?)\]', block)
        name_m = re.search(r'name:\s*"([^"]+)"', block)
        
        hubs_str = hubs_m.group(1) if hubs_m else ""
        tags_str = tags_m.group(1) if tags_m else ""
        name = name_m.group(1) if name_m else ""
        
        model = determine_model(hubs_str, tags_str, name)
        evidence_url = official_url.rstrip("/") + "/pricing"
        
        # Insert before pricingTiers
        replacement = f'pricingModel: "{model}",\n    pricingEvidenceUrl: "{evidence_url}",\n    pricingTiers:'
        new_block = block.replace("pricingTiers:", replacement)
        content = content.replace(block, new_block)
        updated_count += 1

print(f"Added default pricingModel & pricingEvidenceUrl to {updated_count} tools.")

with open("src/data/tools-data.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Saved updated tools data successfully.")
