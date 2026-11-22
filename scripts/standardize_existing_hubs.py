import re

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Update image generators to include "image-design"
image_tools = ['midjourney', 'stable-diffusion', 'leonardo-ai', 'ideogram', 'adobe-firefly']
for it in image_tools:
    pattern = rf'(id:\s*"{it}",[\s\S]*?hubs:\s*\[)([^\]]+)(\])'
    def repl(m):
        hubs = [h.strip().strip('"').strip("'") for h in m.group(2).split(',')]
        if 'image-design' not in hubs:
            hubs.insert(0, 'image-design')
        hubs_str = ', '.join([f'"{h}"' for h in hubs])
        return f"{m.group(1)}{hubs_str}{m.group(3)}"
    content = re.sub(pattern, repl, content)

# Update coding tools to include "code-developer"
code_tools = ['cursor', 'windsurf', 'replit', 'bolt-new', 'lovable', 'v0-dev', 'n8n', 'hugging-face']
for ct in code_tools:
    pattern = rf'(id:\s*"{ct}",[\s\S]*?hubs:\s*\[)([^\]]+)(\])'
    def repl(m):
        hubs = [h.strip().strip('"').strip("'") for h in m.group(2).split(',')]
        if 'code-developer' not in hubs:
            hubs.insert(0, 'code-developer')
        hubs_str = ', '.join([f'"{h}"' for h in hubs])
        return f"{m.group(1)}{hubs_str}{m.group(3)}"
    content = re.sub(pattern, repl, content)

with open('src/data/tools-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Standardized existing tools hubs successfully!")
