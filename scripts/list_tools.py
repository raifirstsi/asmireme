import json

with open('scripts/tools_pricing_dump.json', 'r', encoding='utf-8') as f:
    tools = json.load(f)

for i, t in enumerate(tools):
    print(f"{i+1:2d}. {t['slug']:<25} | {t['name']:<30} | {t['url']}")
