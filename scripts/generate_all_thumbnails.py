"""
Generate Luxury Black 3D Article Thumbnails for Asmire
Specifications:
- 100% Black 3D Background with volumetric studio lighting and depth vignette (NO grid lines / no square stripes)
- Floating 3D Glassmorphic Card on the right with soft shadow & top glass highlight rim
- Centered, prominent Tool Logo (148px) inside a 3D squircle / Custom 3D Vector Artwork for AI News
- "Tiêu đề vừa phải": Moderate, elegant title typography (40px bold Segoe UI with text shadow)
- NO Vietnamese description text
- Centered 3D Asmire Favicon 'a' badge (50px) perfectly aligned above title
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

THEMES = {
    "AI News": (245, 158, 11),
    "VIDEO & AVATAR": (139, 92, 246),
    "VOICE & AUDIO": (6, 182, 212),
    "SEO & CONTENT": (16, 185, 129),
    "CRM & GROWTH": (59, 130, 246),
    "AI DETECTION": (239, 68, 68),
    "PRODUCTIVITY & NOTES": (168, 85, 247),
    "PRESENTATIONS & SLIDES": (236, 72, 153),
    "DESIGN & AD CREATIVE": (249, 115, 22),
    "DEFAULT": (99, 102, 241),
}

def get_accent_for_article(art):
    cat = (art.get("category") or "").upper()
    for k in THEMES:
        if k in cat:
            return THEMES[k]
    slug = art.get("slug", "").lower()
    if "video" in slug or "avatar" in slug or "synthesia" in slug or "opus" in slug:
        return THEMES["VIDEO & AVATAR"]
    if "voice" in slug or "audio" in slug or "elevenlabs" in slug or "listnr" in slug:
        return THEMES["VOICE & AUDIO"]
    if "seo" in slug or "content" in slug or "writer" in slug or "textero" in slug or "jasper" in slug:
        return THEMES["SEO & CONTENT"]
    if "crm" in slug or "highlevel" in slug or "gohighlevel" in slug or "nutshell" in slug:
        return THEMES["CRM & GROWTH"]
    if "detection" in slug or "originality" in slug or "winston" in slug:
        return THEMES["AI DETECTION"]
    return THEMES["DEFAULT"]

def create_3d_black_canvas(width, height, accent_color):
    # 1. Base dark obsidian canvas with vertical 3D depth gradient
    base = Image.new("RGBA", (width, height), (5, 6, 8, 255))
    draw_base = ImageDraw.Draw(base)
    
    for y in range(height):
        factor = 1.0 - math.pow(abs(y - height * 0.45) / (height * 0.55), 1.6)
        r = int(5 + 10 * factor)
        g = int(6 + 11 * factor)
        b = int(8 + 15 * factor)
        draw_base.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # 2. 3D Volumetric Ambient Lighting
    glow_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow_layer)
    
    rx, ry = 920, 315
    ar, ag, ab = accent_color
    for rad in range(380, 0, -20):
        alpha = int((1.0 - (rad / 380) ** 1.5) * 65)
        gdraw.ellipse([rx - rad, ry - rad, rx + rad, ry + rad], fill=(ar, ag, ab, alpha))
        
    for rad in range(300, 0, -25):
        alpha = int((1.0 - (rad / 300) ** 1.8) * 35)
        gdraw.ellipse([600 - rad, 40 - rad, 600 + rad, 40 + rad], fill=(120, 140, 180, alpha))
        
    glow_blurred = glow_layer.filter(ImageFilter.GaussianBlur(radius=36))
    canvas = Image.alpha_composite(base, glow_blurred)

    # 3. 3D Camera Depth Vignette
    vignette = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vignette)
    cx, cy = width // 2, height // 2
    max_dist = math.sqrt(cx**2 + cy**2)
    for r in range(int(max_dist), int(height * 0.4), -30):
        norm = (r - height * 0.4) / (max_dist - height * 0.4)
        alpha = int(math.pow(norm, 2.2) * 160)
        vdraw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(0, 0, 0, alpha), width=30)
        
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=30))
    canvas = Image.alpha_composite(canvas, vignette)
    
    # 4. Subtle 3D Top Studio Bevel
    top_rim = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    tdraw = ImageDraw.Draw(top_rim)
    tdraw.line([(60, 0), (width - 60, 0)], fill=(255, 255, 255, 25), width=1)
    tdraw.line([(0, 0), (0, height)], fill=(255, 255, 255, 10), width=1)
    tdraw.line([(width - 1, 0), (width - 1, height)], fill=(255, 255, 255, 10), width=1)
    canvas = Image.alpha_composite(canvas, top_rim)

    return canvas

def draw_3d_card(canvas, card_x, card_y, card_w, card_h, accent_color):
    # 3D Floating Shadow (Deep ambient occlusion)
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rounded_rectangle(
        [(card_x - 10, card_y + 14), (card_x + card_w + 10, card_y + card_h + 28)],
        radius=36,
        fill=(0, 0, 0, 180)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=22))
    canvas = Image.alpha_composite(canvas, shadow)

    # 3D Glass Body
    card_img = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(card_img)
    
    cdraw.rounded_rectangle(
        [(card_x, card_y), (card_x + card_w, card_y + card_h)],
        radius=30,
        fill=(13, 15, 22, 235),
        outline=(accent_color[0], accent_color[1], accent_color[2], 75),
        width=1
    )
    cdraw.line([(card_x + 35, card_y + 1), (card_x + card_w - 35, card_y + 1)], fill=(255, 255, 255, 60), width=1)
    
    return Image.alpha_composite(canvas, card_img)

def draw_3d_tool_logo(im, draw, logo_slug, cx, cy, size=148):
    logo_path = f"public/logos/{logo_slug}.png"
    if os.path.exists(logo_path):
        try:
            logo = Image.open(logo_path).convert("RGBA").resize((size, size), Image.Resampling.LANCZOS)
            lw, lh = logo.size
            lx = cx - lw // 2
            ly = cy - lh // 2
            card_pad = 26
            
            draw.rounded_rectangle(
                [(lx - card_pad, ly - card_pad + 6), (lx + lw + card_pad, ly + lh + card_pad + 10)],
                radius=32,
                fill=(0, 0, 0, 90)
            )
            draw.rounded_rectangle(
                [(lx - card_pad, ly - card_pad), (lx + lw + card_pad, ly + lh + card_pad)],
                radius=30,
                fill=(255, 255, 255, 252),
                outline=(255, 255, 255, 100),
                width=1
            )
            im.paste(logo, (lx, ly), logo)
            return True
        except Exception:
            pass
    return False

def draw_3d_news_artwork(draw, slug, cx, cy, accent):
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
        draw.line([(cx - 160, cy + 110), (cx + 160, cy + 110)], fill=(255, 255, 255, 30), width=1)
        points = []
        for x in range(cx - 160, cx + 160, 10):
            norm = (x - (cx - 160)) / 320
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
        draw.line([(cx - 160, cy), (cx + 160, cy)], fill=(255, 255, 255, 120), width=2)
        return

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

def generate_single_thumbnail(art, asmire_icon_white):
    width, height = 1200, 630
    slug = art["slug"]
    title_raw = art.get("title_en", slug)

    # Clean and format English title gracefully
    clean_title = re.sub(r'\s*\(202\d\):.*', ' (2027)', title_raw)
    if ":" in title_raw:
        parts = title_raw.split(":", 1)
        p0 = parts[0].strip()
        p1 = parts[1].strip()
        if len(p1) > 42:
            words1 = p1.split()
            trunc = []
            cur_l = 0
            for w in words1:
                if cur_l + len(w) + 1 > 38:
                    break
                trunc.append(w)
                cur_l += len(w) + 1
            p1 = " ".join(trunc)
        clean_title = f"{p0}:\n{p1}"

    accent = get_accent_for_article(art)

    # 1. 3D Black Canvas (NO GRID LINES)
    im = create_3d_black_canvas(width, height, accent)

    # 2. 3D Floating Glass Card on Right (400x400)
    card_x, card_y = 730, 115
    card_w, card_h = 400, 400
    im = draw_3d_card(im, card_x, card_y, card_w, card_h, accent)

    draw = ImageDraw.Draw(im)
    cx = card_x + card_w // 2
    cy = card_y + card_h // 2

    # Draw Artwork or Logo
    tools = art.get("tools", [])
    primary_tool = tools[0] if tools else None
    if not primary_tool:
        match_slug = re.match(r'^([a-z0-9\-]+)-review', slug)
        if match_slug:
            primary_tool = match_slug.group(1)

    logo_drawn = False
    if primary_tool and "AI News" not in (art.get("category") or ""):
        logo_drawn = draw_3d_tool_logo(im, draw, primary_tool, cx, cy, size=148)

    if not logo_drawn:
        if "vs" in slug or len(tools) >= 2:
            t1 = tools[0] if len(tools) > 0 else "gamma"
            t2 = tools[1] if len(tools) > 1 else "decktopus"
            draw_3d_tool_logo(im, draw, t1, cx - 85, cy, size=110)
            draw_3d_tool_logo(im, draw, t2, cx + 85, cy, size=110)
            font_vs = ImageFont.truetype(FONT_BOLD, 24)
            draw.text((cx - 17, cy - 14), "VS", font=font_vs, fill=accent)
        else:
            draw_3d_news_artwork(draw, slug, cx, cy, accent)

    # 3. Left Section: "Tiêu đề vừa phải" (Font 40px) + Centered 3D Favicon 'a'
    col_center_x = 380
    max_title_w = 600

    font_title = ImageFont.truetype(FONT_BOLD, 40)

    if "\n" in clean_title:
        p0, p1 = clean_title.split("\n", 1)
        lines_en = [p0] + wrap_text(p1, font_title, max_title_w, draw)
    else:
        lines_en = wrap_text(clean_title, font_title, max_title_w, draw)

    if len(lines_en) > 4:
        lines_en = lines_en[:4]

    # Favicon 'a' badge: Balanced size (50px icon in 68px squircle)
    icon_size = 50
    badge_w = icon_size + 18
    gap_icon = 28
    line_h_title = 54

    total_h = badge_w + gap_icon + len(lines_en) * line_h_title
    start_y = (height - total_h) // 2

    # Draw 3D Favicon badge centered
    bx = col_center_x - badge_w // 2
    draw.rounded_rectangle(
        [(bx, start_y + 4), (bx + badge_w, start_y + badge_w + 6)],
        radius=18,
        fill=(0, 0, 0, 100)
    )
    draw.rounded_rectangle(
        [(bx, start_y), (bx + badge_w, start_y + badge_w)],
        radius=18,
        fill=(18, 20, 28, 245),
        outline=(255, 255, 255, 50),
        width=1
    )
    draw.line([(bx + 12, start_y + 1), (bx + badge_w - 12, start_y + 1)], fill=(255, 255, 255, 80), width=1)
    
    ico_scaled = asmire_icon_white.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    im.paste(ico_scaled, (bx + 9, start_y + 9), ico_scaled)

    # Draw Title Lines centered
    curr_y = start_y + badge_w + gap_icon
    for l in lines_en:
        bbox = draw.textbbox((0, 0), l, font=font_title)
        lw = bbox[2] - bbox[0]
        # Text shadow for subtle 3D pop
        draw.text((col_center_x - lw // 2 + 1, curr_y + 2), l, font=font_title, fill=(0, 0, 0, 130))
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
                print(f"[{i+1}/{len(articles)}] Generated 3D thumbnail for {slug}")
        except Exception as e:
            print(f"Error generating {slug}: {e}")

    print(f"\nSuccessfully generated {success_count} / {len(articles)} 3D thumbnail pairs in {out_dir}")

if __name__ == "__main__":
    main()
