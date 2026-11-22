"""
Generate International-Standard AI SaaS Article Thumbnails for Asmire
Matches strict user layout requirements:
- Restore original subtle background (step=45 delicate grid fill 8, smooth radial Gaussian glows)
- NO Vietnamese description text inserted into thumbnails
- NO bottom diagram boxes inside the card
- Asmire Favicon 'a' badge enlarged and centered
- Illustration / Tool Logo in the right card enlarged, prominent, and centered
- Large, bold high-contrast English title typography
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

# Original, subtle background radial glow from version 1
def add_radial_glow(base, center, radius, color):
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    cx, cy = center
    for r in range(radius, 0, -12):
        alpha = int((1 - (r / radius) ** 1.8) * color[3])
        if alpha <= 0:
            continue
        c = (color[0], color[1], color[2], alpha)
        gdraw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=c)
    glow = glow.filter(ImageFilter.GaussianBlur(radius=28))
    return Image.alpha_composite(base, glow)

# Original delicate grid from version 1 (step=45, fill 8, crosses fill 20)
def draw_grid_and_crosses(draw, width, height, step=45):
    for x in range(0, width, step):
        draw.line([(x, 0), (x, height)], fill=(255, 255, 255, 8), width=1)
    for y in range(0, height, step):
        draw.line([(0, y), (width, y)], fill=(255, 255, 255, 8), width=1)
    for x in range(0, width, step * 3):
        for y in range(0, height, step * 3):
            draw.line([(x - 3, y), (x + 3, y)], fill=(255, 255, 255, 20), width=1)
            draw.line([(x, y - 3), (x, y + 3)], fill=(255, 255, 255, 20), width=1)

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
        "glow_main": (245, 158, 11, 80),
        "glow_sec": (234, 88, 12, 60),
        "accent": (245, 158, 11),
    },
    "VIDEO & AVATAR": {
        "glow_main": (139, 92, 246, 80),
        "glow_sec": (99, 102, 241, 60),
        "accent": (139, 92, 246),
    },
    "VOICE & AUDIO": {
        "glow_main": (6, 182, 212, 80),
        "glow_sec": (14, 165, 233, 60),
        "accent": (6, 182, 212),
    },
    "SEO & CONTENT": {
        "glow_main": (16, 185, 129, 80),
        "glow_sec": (5, 150, 105, 60),
        "accent": (16, 185, 129),
    },
    "CRM & GROWTH": {
        "glow_main": (59, 130, 246, 80),
        "glow_sec": (37, 99, 235, 60),
        "accent": (59, 130, 246),
    },
    "AI DETECTION": {
        "glow_main": (239, 68, 68, 80),
        "glow_sec": (245, 158, 11, 60),
        "accent": (239, 68, 68),
    },
    "PRODUCTIVITY & NOTES": {
        "glow_main": (168, 85, 247, 80),
        "glow_sec": (192, 132, 252, 60),
        "accent": (168, 85, 247),
    },
    "PRESENTATIONS & SLIDES": {
        "glow_main": (236, 72, 153, 80),
        "glow_sec": (244, 114, 182, 60),
        "accent": (236, 72, 153),
    },
    "DESIGN & AD CREATIVE": {
        "glow_main": (249, 115, 22, 80),
        "glow_sec": (251, 146, 60, 60),
        "accent": (249, 115, 22),
    },
    "DEFAULT": {
        "glow_main": (99, 102, 241, 80),
        "glow_sec": (139, 92, 246, 60),
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
    if "crm" in slug or "highlevel" in slug or "gohighlevel" in slug or "nutshell" in slug:
        return "CRM & GROWTH", THEMES["CRM & GROWTH"]
    if "detection" in slug or "originality" in slug or "winston" in slug:
        return "AI DETECTION", THEMES["AI DETECTION"]
    return "DEFAULT", THEMES["DEFAULT"]

def draw_centered_tool_logo(im, draw, logo_slug, cx, cy, size=150):
    logo_path = f"public/logos/{logo_slug}.png"
    if os.path.exists(logo_path):
        try:
            logo = Image.open(logo_path).convert("RGBA").resize((size, size), Image.Resampling.LANCZOS)
            lw, lh = logo.size
            lx = cx - lw // 2
            ly = cy - lh // 2
            card_pad = 28
            draw.rounded_rectangle(
                [(lx - card_pad, ly - card_pad), (lx + lw + card_pad, ly + lh + card_pad)],
                radius=32,
                fill=(255, 255, 255, 250),
                outline=(255, 255, 255, 80),
                width=1
            )
            im.paste(logo, (lx, ly), logo)
            return True
        except Exception:
            pass
    return False

def draw_clean_card_artwork(im, draw, slug, cat_name, card_x, card_y, card_w, card_h, accent, tools):
    cx = card_x + card_w // 2
    cy = card_y + card_h // 2

    # 1. AI News Custom Vector Artworks (Large, beautifully centered, no bottom boxes)
    if "frictionless" in slug or "gemini" in slug:
        draw.ellipse([(cx - 48, cy - 48), (cx + 48, cy + 48)], fill=(accent[0], accent[1], accent[2], 230))
        font_bold = ImageFont.truetype(FONT_BOLD, 15)
        draw.text((cx - 30, cy - 11), "SWARM", font=font_bold, fill=(10, 10, 15, 255))
        for angle in [45, 135, 225, 315]:
            rad = math.radians(angle)
            nx = cx + int(math.cos(rad) * 135)
            ny = cy + int(math.sin(rad) * 135)
            draw.line([(cx, cy), (nx, ny)], fill=accent, width=2)
            draw.ellipse([(nx - 20, ny - 20), (nx + 20, ny + 20)], outline=accent, width=2)
            draw.ellipse([(nx - 7, ny - 7), (nx + 7, ny + 7)], fill=(255, 255, 255, 240))
        return

    if "amd-silicon" in slug:
        chip_size = 170
        draw.rounded_rectangle([(cx - chip_size//2, cy - chip_size//2), (cx + chip_size//2, cy + chip_size//2)], radius=20, fill=(24, 24, 32, 255), outline=accent, width=2)
        core_s = 90
        draw.rounded_rectangle([(cx - core_s//2, cy - core_s//2), (cx + core_s//2, cy + core_s//2)], radius=12, fill=(accent[0]//4, accent[1]//4, accent[2]//4, 255), outline=(255, 255, 255, 80), width=1)
        font_bold = ImageFont.truetype(FONT_BOLD, 18)
        draw.text((cx - 36, cy - 12), "AI CORE", font=font_bold, fill=(255, 255, 255, 255))
        for offset in [-50, -25, 0, 25, 50]:
            draw.line([(cx + offset, cy - chip_size//2), (cx + offset, cy - chip_size//2 - 28)], fill=accent, width=2)
            draw.line([(cx + offset, cy + chip_size//2), (cx + offset, cy + chip_size//2 + 28)], fill=accent, width=2)
            draw.line([(cx - chip_size//2, cy + offset), (cx - chip_size//2 - 28, cy + offset)], fill=accent, width=2)
            draw.line([(cx + chip_size//2, cy + offset), (cx + chip_size//2 + 28, cy + offset)], fill=accent, width=2)
        return

    if "knowledge-trap" in slug:
        font_semi = ImageFont.truetype(FONT_SEMI, 14)
        font_bold = ImageFont.truetype(FONT_BOLD, 15)
        draw.ellipse([(cx - 28, cy - 90), (cx + 28, cy - 34)], fill=(24, 24, 36, 255), outline=(255, 255, 255, 140), width=2)
        draw.text((cx - 18, cy - 70), "Root", font=font_semi, fill=(255, 255, 255, 220))
        draw.line([(cx, cy - 34), (cx - 95, cy + 25)], fill=(239, 68, 68, 220), width=3)
        draw.line([(cx, cy - 34), (cx + 95, cy + 25)], fill=accent, width=3)
        draw.ellipse([(cx - 120, cy + 25), (cx - 70, cy + 75)], fill=(239, 68, 68, 40), outline=(239, 68, 68, 220), width=2)
        draw.text((cx - 110, cy + 40), "Trap", font=font_semi, fill=(239, 68, 68, 240))
        draw.ellipse([(cx + 70, cy + 25), (cx + 120, cy + 75)], fill=(accent[0], accent[1], accent[2], 220))
        draw.text((cx + 80, cy + 40), "Apex", font=font_bold, fill=(10, 10, 15, 255))
        draw.line([(cx + 95, cy + 75), (cx + 50, cy + 135)], fill=accent, width=2)
        draw.line([(cx + 95, cy + 75), (cx + 140, cy + 135)], fill=accent, width=2)
        return

    if "intuition-engine" in slug or "robot" in slug:
        draw.arc([(cx - 105, cy - 105), (cx + 105, cy + 105)], start=25, end=335, fill=accent, width=3)
        draw.ellipse([(cx - 24, cy - 24), (cx + 24, cy + 24)], fill=(255, 255, 255, 245))
        draw.line([(cx, cy), (cx + 115, cy - 58)], fill=(239, 68, 68, 220), width=3)
        draw.line([(cx, cy), (cx - 75, cy - 88)], fill=(34, 197, 94, 220), width=3)
        draw.line([(cx, cy), (cx, cy + 115)], fill=(59, 130, 246, 220), width=3)
        return

    if "anthropic" in slug or "ipo" in slug:
        draw.line([(card_x + 40, cy + 110), (card_x + card_w - 40, cy + 110)], fill=(255, 255, 255, 30), width=1)
        points = []
        for x in range(card_x + 40, card_x + card_w - 40, 10):
            norm = (x - (card_x + 40)) / (card_w - 80)
            y = (cy + 110) - int(math.pow(norm, 2.5) * 210)
            points.append((x, y))
        for i in range(len(points) - 1):
            draw.line([points[i], points[i+1]], fill=accent, width=4)
        last_pt = points[-1]
        draw.ellipse([(last_pt[0] - 12, last_pt[1] - 12), (last_pt[0] + 12, last_pt[1] + 12)], fill=(255, 255, 255, 255))
        font_bold = ImageFont.truetype(FONT_BOLD, 18)
        draw.text((last_pt[0] - 130, last_pt[1] - 35), "$40B+ IPO", font=font_bold, fill=accent)
        return

    if "intelligence-shift" in slug:
        for i in range(1, 6):
            r = i * 32
            draw.arc([(cx - r, cy - r), (cx + r, cy + r)], start=180, end=360, fill=accent, width=2)
        draw.line([(card_x + 40, cy), (card_x + card_w - 40, cy)], fill=(255, 255, 255, 120), width=2)
        return

    # 2. Tool Review Articles: Derive tool logo (Enlarged & Perfectly Centered)
    primary_tool = tools[0] if tools else None
    if not primary_tool:
        match_slug = re.match(r'^([a-z0-9\-]+)-review', slug)
        if match_slug:
            primary_tool = match_slug.group(1)

    logo_drawn = False
    if primary_tool and "AI News" not in cat_name:
        logo_drawn = draw_centered_tool_logo(im, draw, primary_tool, cx, cy, size=150)

    if not logo_drawn:
        if "vs" in slug or len(tools) >= 2:
            t1 = tools[0] if len(tools) > 0 else "gamma"
            t2 = tools[1] if len(tools) > 1 else "decktopus"
            draw_centered_tool_logo(im, draw, t1, cx - 85, cy, size=110)
            draw_centered_tool_logo(im, draw, t2, cx + 85, cy, size=110)
            font_vs = ImageFont.truetype(FONT_BOLD, 24)
            draw.text((cx - 17, cy - 14), "VS", font=font_vs, fill=accent)
            logo_drawn = True

def generate_single_thumbnail(art, asmire_icon_white):
    width, height = 1200, 630
    slug = art["slug"]
    title_raw = art.get("title_en", slug)

    # Clean and format English title (no chopped words)
    clean_title = re.sub(r'\s*\(202\d\):.*', ' (2027)', title_raw)
    if ":" in title_raw:
        parts = title_raw.split(":", 1)
        part0 = parts[0].strip()
        part1 = parts[1].strip()
        if len(part1) > 46:
            words1 = part1.split()
            trunc = []
            cur_l = 0
            for w in words1:
                if cur_l + len(w) + 1 > 42:
                    break
                trunc.append(w)
                cur_l += len(w) + 1
            part1 = " ".join(trunc)
        clean_title = f"{part0}:\n{part1}"

    cat_label, theme = get_theme_for_article(art)

    # 1. Base Image Canvas with original subtle radial glow
    im = Image.new("RGBA", (width, height), (9, 10, 13, 255))
    im = add_radial_glow(im, (960, 315), 360, theme["glow_main"])
    im = add_radial_glow(im, (1120, 140), 260, theme["glow_sec"])
    im = add_radial_glow(im, (400, 315), 260, (theme["accent"][0], theme["accent"][1], theme["accent"][2], 28))

    draw = ImageDraw.Draw(im)
    draw_grid_and_crosses(draw, width, height, step=45)
    draw.rectangle([(0, 0), (width - 1, height - 1)], outline=(255, 255, 255, 18), width=1)

    # 2. Right Card: Symmetrical & Clean 400x400 (Centered at y=315)
    card_x, card_y = 730, 115
    card_w, card_h = 400, 400
    card_border = (theme["accent"][0], theme["accent"][1], theme["accent"][2], 80)
    draw.rounded_rectangle([(card_x, card_y), (card_x + card_w, card_y + card_h)], radius=28, fill=(13, 14, 20, 235), outline=card_border, width=1)

    tools = art.get("tools", [])
    draw_clean_card_artwork(im, draw, slug, cat_label, card_x, card_y, card_w, card_h, theme["accent"], tools)

    # 3. Left Section: Centered Favicon 'a' + Bold English Title (NO Vietnamese text!)
    col_center_x = 385
    max_title_w = 620

    font_title = ImageFont.truetype(FONT_BOLD, 48)

    if "\n" in clean_title:
        p0, p1 = clean_title.split("\n", 1)
        lines_en = [p0] + wrap_text(p1, font_title, max_title_w, draw)
    else:
        lines_en = wrap_text(clean_title, font_title, max_title_w, draw)

    if len(lines_en) > 4:
        lines_en = lines_en[:4]

    # Larger, harmonious Asmire Favicon Icon
    icon_size = 56
    badge_w = icon_size + 18
    gap_icon = 32
    line_h_title = 62

    total_h = badge_w + gap_icon + len(lines_en) * line_h_title
    start_y = (height - total_h) // 2

    # Draw Favicon 'a' badge centered
    bx = col_center_x - badge_w // 2
    draw.rounded_rectangle(
        [(bx, start_y), (bx + badge_w, start_y + badge_w)],
        radius=18,
        fill=(22, 23, 30, 240),
        outline=(255, 255, 255, 45),
        width=1
    )
    ico_scaled = asmire_icon_white.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    im.paste(ico_scaled, (bx + 9, start_y + 9), ico_scaled)

    # Draw Title Lines centered
    curr_y = start_y + badge_w + gap_icon
    for l in lines_en:
        bbox = draw.textbbox((0, 0), l, font=font_title)
        lw = bbox[2] - bbox[0]
        draw.text((col_center_x - lw // 2, curr_y), l, font=font_title, fill=(255, 255, 255, 255))
        curr_y += line_h_title

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
