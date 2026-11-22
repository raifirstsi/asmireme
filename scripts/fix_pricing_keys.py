import re

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace any '\n    pricing: [' with '\n    pricingTiers: ['
# But let's check what tools had pricing: [
matches = re.findall(r'slug:\s*"([^"]+)",[\s\S]*?\n    pricing:\s*\[', text)
print(f"Tools with 'pricing: [': {len(matches)}")
print(matches)

# Replace 'pricing: [' with 'pricingTiers: ['
text = re.sub(r'\n    pricing:\s*\[', '\n    pricingTiers: [', text)

with open('src/data/tools-data.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replaced all 'pricing: [' with 'pricingTiers: [' successfully!")
