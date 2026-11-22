"""
Generate International-Standard AI SaaS Article Thumbnails for Asmire
Matches strict user layout requirements:
- Red-marked clutter removed completely:
  - No "ASMIRE INTELLIGENCE" text next to logo
  - No category pill badges
  - No top right epoch tags
  - No bottom left 3 stat boxes
  - No footer lines
  - No card top window bar (no ● ● ●, no url)
  - No card bottom technical status text
- Asmire Favicon 'a' and Title placed right in the CENTER (vertically & horizontally centered in the content section)
- Enlarged, bold high-contrast title typography (48-52px)
- Elegant Subtitle (20-22px)
- High-res Glassmorphic Illustration Card on the right with centered Tool Logo and clean vector diagram
"""

import os
import sys
import json
import re
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONT_BOLD = "C:\\Windows\\Fonts\\segoeuib.ttf"
FONT_SEMI = "C:\\Windows\\Fonts\\seguisb.ttf"
FONT_REG = "C:\\Windows\\Fonts\\segoeui.ttf"

def add_radial_glow(base_img, center, radius, color):
    cx, cy = center
    glow = Image.new("RGBA", base_img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    bbox = [cx - radius, cy - radius, cx + radius, cy + radius]
    draw.ellipse(bbox, fill=color)
    glow = glow.filter(ImageFilter.GaussianBlur(radius // 2))
    return Image.alpha_composite(base_img, glow)

def draw_grid_and_crosses(draw, width, height, step=48):
    for x in range(0, width, step):
        draw.line([(x, 0), (x, height)], fill=(255, 255, 255, 10), width=1)
    for y in range(0, height, step):
        draw.line([(0, y), (width, y)], fill=(255, 255, 255, 10), width=1)
    for x in range(step * 2, width, step * 3):
        for y in range(step * 2, height, step * 3):
            draw.line([(x - 4, y), (x + 4, y)], fill=(255, 255, 255, 20), width=1)
            draw.line([(x, y - 4), (x, y + 4)], fill=(255, 255, 255, 20), width=1)

def wrap_text(text, font, max_width, draw):
    words = text.split()
    lines = []
    current_line = []
    for word in words:
        test_line = " ".join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        w = bbox[2] - bbox[0]
        if w <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(" ".join(current_line))
                current_line = [word]
            else:
                lines.append(word)
                current_line = []
    if current_line:
        lines.append(" ".join(current_line))
    return lines

THEMES = {
    "AI News": {
        "glow_main": (245, 158, 11, 85),
        "glow_sec": (234, 88, 12, 65),
        "accent": (245, 158, 11),
    },
    "VIDEO & AVATAR": {
        "glow_main": (139, 92, 246, 85),
        "glow_sec": (99, 102, 241, 65),
        "accent": (139, 92, 246),
    },
    "VOICE & AUDIO": {
        "glow_main": (6, 182, 212, 85),
        "glow_sec": (14, 165, 233, 65),
        "accent": (6, 182, 212),
    },
    "SEO & CONTENT": {
        "glow_main": (16, 185, 129, 85),
        "glow_sec": (5, 150, 105, 65),
        "accent": (16, 185, 129),
    },
    "CRM & GROWTH": {
        "glow_main": (59, 130, 246, 85),
        "glow_sec": (37, 99, 235, 65),
        "accent": (59, 130, 246),
    },
    "AI DETECTION": {
        "glow_main": (239, 68, 68, 85),
        "glow_sec": (245, 158, 11, 65),
        "accent": (239, 68, 68),
    },
    "PRODUCTIVITY & NOTES": {
        "glow_main": (168, 85, 247, 85),
        "glow_sec": (192, 132, 252, 65),
        "accent": (168, 85, 247),
    },
    "PRESENTATIONS & SLIDES": {
        "glow_main": (236, 72, 153, 85),
        "glow_sec": (244, 114, 182, 65),
        "accent": (236, 72, 153),
    },
    "DESIGN & AD CREATIVE": {
        "glow_main": (249, 115, 22, 85),
        "glow_sec": (251, 146, 60, 65),
        "accent": (249, 115, 22),
    },
    "DEFAULT": {
        "glow_main": (99, 102, 241, 85),
        "glow_sec": (139, 92, 246, 65),
        "accent": (99, 102, 241),
    }
}

def get_theme_for_article(art):
    cat = (art.get("category") or "").upper()
    for k in THEMES:
        if k in cat:
            return k, THEMES[k]
    slug = art.get("slug", "").lower()
    if "video" in slug or "avatar" in slug or "synthesia" in slug or "opus" in slug:
        return "VIDEO & AVATAR", THEMES["VIDEO & AVATAR"]
    if "voice" in slug or "audio" in slug or "elevenlabs" in slug or "listnr" in slug:
        return "VOICE & AUDIO", THEMES["VOICE & AUDIO"]
    if "seo" in slug or "content" in slug or "writer" in slug or "textero" in slug or "jasper" in slug:
        return "SEO & CONTENT", THEMES["SEO & CONTENT"]
    if "crm" in slug or "highlevel" in slug or "gohighlevel" in slug:
        return "CRM & GROWTH", THEMES["CRM & GROWTH"]
    if "detection" in slug or "originality" in slug or "winston" in slug:
        return "AI DETECTION", THEMES["AI DETECTION"]
    return "DEFAULT", THEMES["DEFAULT"]

def draw_tool_logo(im, draw, logo_slug, cx, cy, size=108):
    logo_path = f"public/logos/{logo_slug}.png"
    if os.path.exists(logo_path):
        try:
            logo = Image.open(logo_path).convert("RGBA").resize((size, size), Image.Resampling.LANCZOS)
            lw, lh = logo.size
            lx = cx - lw // 2
            ly = cy - lh // 2
            draw.rounded_rectangle([(lx - 16, ly - 16), (lx + lw + 16, ly + lh + 16)], radius=24, fill=(255, 255, 255, 245), outline=(255, 255, 255, 60), width=1)
            im.paste(logo, (lx, ly), logo)
            return True
        except Exception:
            pass
    return False

def draw_clean_card_artwork(im, draw, slug, cat_name, card_x, card_y, card_w, card_h, accent, tools):
    cx = card_x + card_w // 2
    cy = card_y + card_h // 2

    # 1. AI News Custom Vector Artworks
    if "frictionless" in slug or "gemini" in slug:
        draw.ellipse([(cx - 38, cy - 38), (cx + 38, cy + 38)], fill=(accent[0], accent[1], accent[2], 220))
        font_bold = ImageFont.truetype(FONT_BOLD, 12)
        draw.text((cx - 24, cy - 9), "SWARM", font=font_bold, fill=(10, 10, 15, 255))
        for angle in [45, 135, 225, 315]:
            rad = math.radians(angle)
            nx = cx + int(math.cos(rad) * 115)
            ny = cy + int(math.sin(rad) * 115)
            draw.line([(cx, cy), (nx, ny)], fill=accent, width=2)
            draw.ellipse([(nx - 16, ny - 16), (nx + 16, ny + 16)], outline=accent, width=2)
            draw.ellipse([(nx - 5, ny - 5), (nx + 5, ny + 5)], fill=(255, 255, 255, 240))
        return

    if "amd-silicon" in slug:
        chip_size = 140
        draw.rounded_rectangle([(cx - chip_size//2, cy - chip_size//2), (cx + chip_size//2, cy + chip_size//2)], radius=16, fill=(24, 24, 32, 255), outline=accent, width=2)
        core_s = 76
        draw.rounded_rectangle([(cx - core_s//2, cy - core_s//2), (cx + core_s//2, cy + core_s//2)], radius=10, fill=(accent[0]//4, accent[1]//4, accent[2]//4, 255), outline=(255, 255, 255, 80), width=1)
        font_bold = ImageFont.truetype(FONT_BOLD, 15)
        draw.text((cx - 28, cy - 10), "AI CORE", font=font_bold, fill=(255, 255, 255, 255))
        for offset in [-40, -20, 0, 20, 40]:
            draw.line([(cx + offset, cy - chip_size//2), (cx + offset, cy - chip_size//2 - 22)], fill=accent, width=2)
            draw.line([(cx + offset, cy + chip_size//2), (cx + offset, cy + chip_size//2 + 22)], fill=accent, width=2)
            draw.line([(cx - chip_size//2, cy + offset), (cx - chip_size//2 - 22, cy + offset)], fill=accent, width=2)
            draw.line([(cx + chip_size//2, cy + offset), (cx + chip_size//2 + 22, cy + offset)], fill=accent, width=2)
        return

    if "knowledge-trap" in slug:
        font_semi = ImageFont.truetype(FONT_SEMI, 12)
        font_bold = ImageFont.truetype(FONT_BOLD, 12)
        draw.ellipse([(cx - 22, cy - 70), (cx + 22, cy - 26)], fill=(24, 24, 36, 255), outline=(255, 255, 255, 140), width=2)
        draw.text((cx - 14, cy - 56), "Root", font=font_semi, fill=(255, 255, 255, 220))
        draw.line([(cx, cy - 26), (cx - 75, cy + 20)], fill=(239, 68, 68, 220), width=2)
        draw.line([(cx, cy - 26), (cx + 75, cy + 20)], fill=accent, width=2)
        draw.ellipse([(cx - 95, cy + 20), (cx - 55, cy + 60)], fill=(239, 68, 68, 40), outline=(239, 68, 68, 220), width=2)
        draw.text((cx - 86, cy + 32), "Trap", font=font_semi, fill=(239, 68, 68, 240))
        draw.ellipse([(cx + 55, cy + 20), (cx + 95, cy + 60)], fill=(accent[0], accent[1], accent[2], 220))
        draw.text((cx + 64, cy + 32), "Apex", font=font_bold, fill=(10, 10, 15, 255))
        draw.line([(cx + 75, cy + 60), (cx + 40, cy + 110)], fill=accent, width=2)
        draw.line([(cx + 75, cy + 60), (cx + 110, cy + 110)], fill=accent, width=2)
        return

    if "intuition-engine" in slug or "robot" in slug:
        draw.arc([(cx - 85, cy - 85), (cx + 85, cy + 85)], start=25, end=335, fill=accent, width=3)
        draw.ellipse([(cx - 20, cy - 20), (cx + 20, cy + 20)], fill=(255, 255, 255, 245))
        draw.line([(cx, cy), (cx + 95, cy - 48)], fill=(239, 68, 68, 220), width=3)
        draw.line([(cx, cy), (cx - 60, cy - 72)], fill=(34, 197, 94, 220), width=3)
        draw.line([(cx, cy), (cx, cy + 95)], fill=(59, 130, 246, 220), width=3)
        return

    if "anthropic" in slug or "ipo" in slug:
        draw.line([(card_x + 50, cy + 100), (card_x + card_w - 50, cy + 100)], fill=(255, 255, 255, 30), width=1)
        points = []
        for x in range(card_x + 50, card_x + card_w - 50, 10):
            norm = (x - (card_x + 50)) / (card_w - 100)
            y = (cy + 100) - int(math.pow(norm, 2.5) * 190)
            points.append((x, y))
        for i in range(len(points) - 1):
            draw.line([points[i], points[i+1]], fill=accent, width=4)
        last_pt = points[-1]
        draw.ellipse([(last_pt[0] - 10, last_pt[1] - 10), (last_pt[0] + 10, last_pt[1] + 10)], fill=(255, 255, 255, 255))
        font_bold = ImageFont.truetype(FONT_BOLD, 16)
        draw.text((last_pt[0] - 115, last_pt[1] - 32), "$40B+ IPO", font=font_bold, fill=accent)
        return

    if "intelligence-shift" in slug:
        for i in range(1, 6):
            r = i * 28
            draw.arc([(cx - r, cy - r), (cx + r, cy + r)], start=180, end=360, fill=accent, width=2)
        draw.line([(card_x + 40, cy), (card_x + card_w - 40, cy)], fill=(255, 255, 255, 120), width=2)
        return

    # 2. Review Articles: Derive tool logo
    primary_tool = tools[0] if tools else None
    if not primary_tool:
        match_slug = re.match(r'^([a-z0-9\-]+)-review', slug)
        if match_slug:
            primary_tool = match_slug.group(1)

    logo_drawn = False
    if primary_tool and "AI News" not in cat_name:
        logo_drawn = draw_tool_logo(im, draw, primary_tool, cx, card_y + 135, size=108)

    if not logo_drawn:
        if "vs" in slug or len(tools) >= 2:
            t1 = tools[0] if len(tools) > 0 else "gamma"
            t2 = tools[1] if len(tools) > 1 else "decktopus"
            draw_tool_logo(im, draw, t1, card_x + 115, card_y + 135, size=80)
            draw_tool_logo(im, draw, t2, card_x + 275, card_y + 135, size=80)
            font_vs = ImageFont.truetype(FONT_BOLD, 22)
            draw.text((cx - 15, card_y + 124), "VS", font=font_vs, fill=accent)
            logo_drawn = True

    # 3. Clean Visual Feature Diagram in lower half of card (no text clutter)
    chart_y = card_y + 245
    if "VIDEO" in cat_name or "AVATAR" in cat_name:
        track_w = card_w - 70
        for i, off_y in enumerate([0, 36, 72]):
            draw.rounded_rectangle([(card_x + 35, chart_y + off_y), (card_x + 35 + track_w, chart_y + off_y + 24)], radius=8, fill=(24, 24, 34, 255))
            seg_w = int(track_w * [0.72, 0.55, 0.88][i])
            draw.rounded_rectangle([(card_x + 35, chart_y + off_y), (card_x + 35 + seg_w, chart_y + off_y + 24)], radius=8, fill=accent)
    elif "VOICE" in cat_name or "AUDIO" in cat_name:
        bar_x = card_x + 40
        heights = [18, 34, 52, 68, 58, 42, 30, 56, 74, 62, 48, 32, 22, 40, 58, 44, 28, 16]
        for h in heights:
            draw.rounded_rectangle([(bar_x, chart_y + 80 - h), (bar_x + 11, chart_y + 80)], radius=4, fill=accent)
            bar_x += 17
    elif "CRM" in cat_name:
        stages = ["Lead", "Audit", "Call", "Won"]
        sx = card_x + 36
        font_s = ImageFont.truetype(FONT_SEMI, 12)
        for s in stages:
            draw.rounded_rectangle([(sx, chart_y + 30), (sx + 66, chart_y + 64)], radius=8, fill=(24, 24, 34, 255), outline=accent, width=1)
            draw.text((sx + 15, chart_y + 40), s, font=font_s, fill=(255, 255, 255, 240))
            if s != "Won":
                draw.line([(sx + 66, chart_y + 47), (sx + 78, chart_y + 47)], fill=accent, width=2)
            sx += 78
    elif "DETECTION" in cat_name:
        font_s = ImageFont.truetype(FONT_SEMI, 13)
        font_b = ImageFont.truetype(FONT_BOLD, 18)
        draw.rounded_rectangle([(card_x + 40, chart_y + 24), (card_x + 185, chart_y + 80)], radius=10, fill=(34, 197, 94, 25), outline=(34, 197, 94, 160), width=1)
        draw.text((card_x + 55, chart_y + 32), "HUMAN", font=font_s, fill=(34, 197, 94, 220))
        draw.text((card_x + 55, chart_y + 50), "99.8%", font=font_b, fill=(34, 197, 94, 255))
        draw.rounded_rectangle([(card_x + 205, chart_y + 24), (card_x + card_w - 40, chart_y + 80)], radius=10, fill=(239, 68, 68, 25), outline=(239, 68, 68, 160), width=1)
        draw.text((card_x + 220, chart_y + 32), "AI SYNTH", font=font_s, fill=(239, 68, 68, 220))
        draw.text((card_x + 220, chart_y + 50), "0.2%", font=font_b, fill=(239, 68, 68, 255))
    else:
        draw.rounded_rectangle([(card_x + 40, chart_y + 45), (card_x + card_w - 40, chart_y + 63)], radius=8, fill=(24, 24, 34, 255))
        draw.rounded_rectangle([(card_x + 40, chart_y + 45), (card_x + card_w - 85, chart_y + 63)], radius=8, fill=accent)

def generate_single_thumbnail(art, asmire_icon_white):
    width, height = 1200, 630
    slug = art["slug"]
    title_raw = art.get("title_en", slug)

    # Clean title
    clean_title = title_raw
    if "review" in slug.lower():
        # Keep crisp review title
        clean_title = re.sub(r'\s*\(202\d\):.*', ' (2027)', title_raw)
        if len(clean_title) < 25 and ":" in title_raw:
            parts = title_raw.split(":", 1)
            clean_title = parts[0].strip() + ": " + parts[1].strip()[:38]
    if len(clean_title) > 65:
        clean_title = clean_title[:62] + "..."

    cat_label, theme = get_theme_for_article(art)

    # 1. Base Image Canvas
    im = Image.new("RGBA", (width, height), (9, 10, 13, 255))
    im = add_radial_glow(im, (960, 315), 360, theme["glow_main"])
    im = add_radial_glow(im, (1120, 140), 260, theme["glow_sec"])
    im = add_radial_glow(im, (400, 315), 280, (theme["accent"][0], theme["accent"][1], theme["accent"][2], 35))

    draw = ImageDraw.Draw(im)
    draw_grid_and_crosses(draw, width, height, step=48)
    draw.rectangle([(0, 0), (width - 1, height - 1)], outline=(255, 255, 255, 18), width=1)

    # 2. Right Card: Sleek Minimalist Glass Slate (NO window dots, NO URL bar, NO footer text)
    card_x, card_y = 750, 120
    card_w, card_h = 390, 390
    card_border = (theme["accent"][0], theme["accent"][1], theme["accent"][2], 90)
    draw.rounded_rectangle([(card_x, card_y), (card_x + card_w, card_y + card_h)], radius=24, fill=(13, 14, 20, 235), outline=card_border, width=1)

    tools = art.get("tools", [])
    draw_clean_card_artwork(im, draw, slug, cat_label, card_x, card_y, card_w, card_h, theme["accent"], tools)

    # 3. Left Section: Centered Favicon 'a' + Bold Large Title + Subtitle
    col_center_x = 400
    max_title_w = 640

    font_title = ImageFont.truetype(FONT_BOLD, 50)
    font_sub = ImageFont.truetype(FONT_SEMI, 21)

    lines_en = wrap_text(clean_title, font_title, max_title_w, draw)
    if len(lines_en) > 3:
        lines_en = lines_en[:3]
        if not lines_en[-1].endswith("..."):
            lines_en[-1] = lines_en[-1][:len(lines_en[-1])-3] + "..."

    sub_text = art.get("title_vi", "")
    lines_vi = wrap_text(sub_text, font_sub, max_title_w, draw) if sub_text else []

    # Calculate total height for vertical centering
    icon_size = 50
    badge_w = icon_size + 14
    gap_icon = 26
    line_h_title = 60
    gap_sub = 22
    line_h_sub = 30

    total_h = badge_w + gap_icon + len(lines_en) * line_h_title
    if lines_vi:
        total_h += gap_sub + min(len(lines_vi), 2) * line_h_sub

    start_y = (height - total_h) // 2

    # Draw Favicon 'a' badge centered
    bx = col_center_x - badge_w // 2
    draw.rounded_rectangle([(bx, start_y), (bx + badge_w, start_y + badge_w)], radius=15, fill=(24, 25, 34, 235), outline=(255, 255, 255, 45), width=1)
    ico_scaled = asmire_icon_white.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    im.paste(ico_scaled, (bx + 7, start_y + 7), ico_scaled)

    # Draw Title Lines centered
    curr_y = start_y + badge_w + gap_icon
    for l in lines_en:
        bbox = draw.textbbox((0, 0), l, font=font_title)
        lw = bbox[2] - bbox[0]
        draw.text((col_center_x - lw // 2, curr_y), l, font=font_title, fill=(255, 255, 255, 255))
        curr_y += line_h_title

    # Draw Subtitle Lines centered
    if lines_vi:
        curr_y += gap_sub - 10
        for l in lines_vi[:2]:
            bbox = draw.textbbox((0, 0), l, font=font_sub)
            lw = bbox[2] - bbox[0]
            draw.text((col_center_x - lw // 2, curr_y), l, font=font_sub, fill=(160, 165, 180, 220))
            curr_y += line_h_sub

    return im

def main():
    metadata_path = "scripts/all_articles_metadata.json"
    if not os.path.exists(metadata_path):
        print(f"Error: {metadata_path} not found.")
        sys.exit(1)

    with open(metadata_path, "r", encoding="utf-8") as f:
        articles = json.load(f)

    print(f"Loaded {len(articles)} articles from metadata.")

    # Load Asmire Icon White
    icon_orig = Image.open("public/icon.png").convert("RGBA")
    r, g, b, a = icon_orig.split()
    white_img = Image.new("L", icon_orig.size, 255)
    asmire_icon_white = Image.merge("RGBA", (white_img, white_img, white_img, a))

    out_dir = "public/thumbnails/news"
    os.makedirs(out_dir, exist_ok=True)

    success_count = 0
    for i, art in enumerate(articles):
        slug = art["slug"]
        try:
            im = generate_single_thumbnail(art, asmire_icon_white)
            png_path = os.path.join(out_dir, f"{slug}.png")
            webp_path = os.path.join(out_dir, f"{slug}.webp")
            
            im.save(png_path, "PNG", optimize=True)
            rgb_im = im.convert("RGB")
            rgb_im.save(webp_path, "WEBP", quality=92, method=6)
            
            success_count += 1
            if (i + 1) % 10 == 0 or (i + 1) == len(articles):
                print(f"[{i+1}/{len(articles)}] Generated thumbnail for {slug}")
        except Exception as e:
            print(f"Error generating {slug}: {e}")

    print(f"\nSuccessfully generated {success_count} / {len(articles)} thumbnail pairs in {out_dir}")

if __name__ == "__main__":
    main()
