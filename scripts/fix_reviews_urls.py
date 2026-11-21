import re
import urllib.parse

def clean_tool_name(name):
    # Remove parenthetical like "(GoHighLevel)" for cleaner search or keep it clean
    # e.g. "HighLevel (GoHighLevel)" -> "GoHighLevel"
    if "HighLevel" in name:
        return "GoHighLevel"
    name = re.sub(r'\(.*?\)', '', name).strip()
    return name

def generate_source_url(source, tool_name):
    cname = clean_tool_name(tool_name)
    q = urllib.parse.quote(cname)
    q_rev = urllib.parse.quote(f"{cname} review")
    
    src = source.upper()
    if "TRUSTPILOT" in src:
        return f"https://www.trustpilot.com/search?query={q}"
    elif "PRODUCT_HUNT" in src or "PRODUCT HUNT" in src:
        return f"https://www.producthunt.com/search?q={q}"
    elif "REDDIT" in src:
        return f"https://www.reddit.com/search/?q={q_rev}"
    elif "G2" in src:
        return f"https://www.google.com/search?q=site:g2.com+{q}+reviews"
    elif "HACKER_NEWS" in src or "HACKER NEWS" in src:
        return f"https://hn.algolia.com/?q={q}"
    elif "CAPTERRA" in src:
        return f"https://www.capterra.com/search/?search={q}"
    else:
        return f"https://www.google.com/search?q={q}+reviews"

with open("src/data/reviews-dataset.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
current_tool_name = ""
current_source = ""

for line in lines:
    m_tool = re.search(r'"toolName":\s*"([^"]+)"', line)
    if m_tool:
        current_tool_name = m_tool.group(1)
    
    m_src = re.search(r'"source":\s*"([^"]+)"', line)
    if m_src:
        current_source = m_src.group(1)
        
    m_url = re.search(r'"sourceUrl":\s*"([^"]+)"', line)
    if m_url and current_tool_name and current_source:
        valid_url = generate_source_url(current_source, current_tool_name)
        line = re.sub(r'"sourceUrl":\s*"[^"]+"', f'"sourceUrl": "{valid_url}"', line)
        
    new_lines.append(line)

with open("src/data/reviews-dataset.ts", "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Updated all reviews in src/data/reviews-dataset.ts successfully!")
