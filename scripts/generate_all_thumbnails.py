"""
Generate Harmonious, Ultra-HD 3D Article Thumbnails for Asmire (2x Super-Sampled)
- 2400x1260 canvas downscaled to 1200x630 via Lanczos for flawless sub-pixel anti-aliasing
- 100% Deep Luxury Black 3D Background with smooth, balanced volumetric lighting
- Floating 3D Glassmorphic Card on the right with UNIFORM, continuous 360-degree border
- Centered, crystal-clear Tool Logos in 3D squircles or Dual-Tool VS Comparison
- Asmire Favicon 'a' badge with perfectly smooth anti-aliased border & centered white 'a'
- Balanced 2-line title hierarchy with zero text overflow or dangling words
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

def format_thumbnail_title(art):
    slug = art["slug"]
    title_raw = art.get("title_en", slug)
    
    # 1. AI News articles
    news_titles = {
        "the-frictionless-society-gemini-autonomous-agents": ("The Frictionless Society", "Autonomous AI & The Human Void"),
        "ai-rewriting-amd-silicon-death-of-manual-engineering": ("When AI Rewrites Silicon", "The Death of Manual Engineering"),
        "the-knowledge-trap-why-ai-cant-make-decisions": ("The Knowledge Trap", "Why AI Can't Make Real Decisions"),
        "the-intuition-engine-runway-praxis-robot-control": ("The Intuition Engine", "Video Models & Robot Common Sense"),
        "anthropic-ipo-hyper-leverage-and-the-death-of-linear-careers": ("The $93 Billion Lesson", "Extreme Leverage & Anthropic IPO"),
        "the-2026-intelligence-shift-master-briefing": ("The 2026 Intelligence Shift", "Master Briefing & Strategic Position"),
    }
    if slug in news_titles:
        return news_titles[slug]
        
    # 2. Megaguides / Comparisons
    if "vs" in slug:
        if "clickfunnels" in slug:
            return ("GoHighLevel vs ClickFunnels", "Agency War & Funnel Tax Breakdown (2027)")
        if "gamma-vs-decktopus" in slug:
            return ("Gamma vs Decktopus", "AI Presentation Benchmark (2027)")
        if "meeting" in slug:
            return ("Top AI Meeting Assistants", "Fireflies vs MeetGeek vs Speak AI")
        if "writing" in slug:
            return ("AI Writing Tools for SEO", "Jasper vs Koala AI vs Frase")
        if "detection" in slug:
            return ("AI Content Detection", "Originality.ai vs Winston AI (2027)")
        if "video" in slug:
            return ("Best AI Video Generators", "Avatar & Realism Benchmark (2027)")

    # 3. SaaS Playbook
    if "saas-mode" in slug or "playbook" in slug:
        return ("GoHighLevel SaaS Playbook", "How to Build a $10,000/Mo Software Agency")

    # 4. Dedicated Pricing breakdown
    if "pricing" in slug or "cost" in slug:
        return ("GoHighLevel Pricing", "Hidden Costs & Real Margins (2027)")

    # 5. Single-tool Reviews
    match_review = re.match(r"^([a-z0-9\-]+)-review", slug)
    if match_review:
        tool_slug = match_review.group(1)
        brand_map = {
            "gohighlevel": "GoHighLevel",
            "highlevel": "HighLevel",
            "getresponse": "GetResponse",
            "nutshell": "Nutshell CRM",
            "elevenlabs": "ElevenLabs",
            "jasper": "Jasper AI",
            "textero": "Textero AI",
            "adcreative": "AdCreative.ai",
            "quickads": "QuickAds",
            "lebesgue": "Lebesgue AI",
            "pickaxe": "Pickaxe AI",
            "paperguide": "Paperguide",
            "browse-ai": "Browse AI",
            "castmagic": "Castmagic",
            "palette": "Palette.fm",
            "palabra": "Palabra.ai",
            "listnr": "Listnr AI",
            "speak-ai": "Speak AI",
            "marblism": "Marblism",
            "10web": "10Web WordPress",
            "postcrest": "Postcrest",
            "pineapple-builder": "Pineapple Builder",
            "jotform": "Jotform AI",
            "omniseo": "OmniSEO",
            "rightblogger": "RightBlogger",
            "describely": "Describely",
            "koala": "Koala AI",
            "frase": "Frase.io",
            "rytr": "Rytr AI",
            "krispcall": "KrispCall",
            "my-ai-front-desk": "My AI Front Desk",
            "winston": "Winston AI",
            "originality": "Originality.ai",
            "undetectable": "Undetectable AI",
            "decktopus": "Decktopus AI",
            "gamma": "Gamma App",
            "magicslides": "MagicSlides",
            "simplified": "Simplified AI",
            "taskade": "Taskade Genesis",
            "reclaim": "Reclaim.ai",
            "meetgeek": "MeetGeek",
            "fireflies": "Fireflies.ai",
            "ai-studios": "AI Studios",
            "capcut": "CapCut Pro",
            "akool": "AKOOL AI",
            "fliki": "Fliki AI",
            "submagic": "Submagic",
            "videogen": "VideoGen",
            "potion": "Potion Video",
            "synthesia": "Synthesia",
            "opusclip": "OpusClip",
        }
        bname = brand_map.get(tool_slug, tool_slug.replace("-", " ").title())
        return (f"{bname} Review", "Empirical ROI & Pricing (2027)")

    parts = title_raw.split(":", 1)
    return (parts[0].strip()[:32], parts[1].strip()[:36] if len(parts) > 1 else "Empirical Evaluation (2027)")

def draw_2x_news_artwork(draw, slug, cx, cy, accent):
    # Vector illustration at 2x resolution
    if "frictionless" in slug or "gemini" in slug:
        draw.ellipse([(cx - 96, cy - 96), (cx + 96, cy + 96)], fill=(accent[0], accent[1], accent[2], 230))
        font_b = ImageFont.truetype(FONT_BOLD, 30)
        draw.text((cx - 60, cy - 22), "SWARM", font=font_b, fill=(10, 10, 15, 255))
        for angle in [45, 135, 225, 315]:
            rad = math.radians(angle)
            nx = cx + int(math.cos(rad) * 270)
            ny = cy + int(math.sin(rad) * 270)
            draw.line([(cx, cy), (nx, ny)], fill=accent, width=4)
            draw.ellipse([(nx - 40, ny - 40), (nx + 40, ny + 40)], outline=accent, width=4)
            draw.ellipse([(nx - 14, ny - 14), (nx + 14, ny + 14)], fill=(255, 255, 255, 240))
        return

    if "amd-silicon" in slug:
        chip_size = 340
        draw.rounded_rectangle([(cx - chip_size//2, cy - chip_size//2), (cx + chip_size//2, cy + chip_size//2)], radius=40, fill=(24, 24, 32, 255), outline=accent, width=4)
        core_s = 180
        draw.rounded_rectangle([(cx - core_s//2, cy - core_s//2), (cx + core_s//2, cy + core_s//2)], radius=24, fill=(accent[0]//4, accent[1]//4, accent[2]//4, 255), outline=(255, 255, 255, 80), width=2)
        font_b = ImageFont.truetype(FONT_BOLD, 36)
        draw.text((cx - 72, cy - 24), "AI CORE", font=font_b, fill=(255, 255, 255, 255))
        for offset in [-100, -50, 0, 50, 100]:
            draw.line([(cx + offset, cy - chip_size//2), (cx + offset, cy - chip_size//2 - 56)], fill=accent, width=4)
            draw.line([(cx + offset, cy + chip_size//2), (cx + offset, cy + chip_size//2 + 56)], fill=accent, width=4)
            draw.line([(cx - chip_size//2, cy + offset), (cx - chip_size//2 - 56, cy + offset)], fill=accent, width=4)
            draw.line([(cx + chip_size//2, cy + offset), (cx + chip_size//2 + 56, cy + offset)], fill=accent, width=4)
        return

    if "knowledge-trap" in slug:
        font_semi = ImageFont.truetype(FONT_SEMI, 28)
        font_bold = ImageFont.truetype(FONT_BOLD, 30)
        draw.ellipse([(cx - 56, cy - 180), (cx + 56, cy - 68)], fill=(24, 24, 36, 255), outline=(255, 255, 255, 140), width=4)
        draw.text((cx - 36, cy - 140), "Root", font=font_semi, fill=(255, 255, 255, 220))
        draw.line([(cx, cy - 68), (cx - 190, cy + 50)], fill=(239, 68, 68, 220), width=6)
        draw.line([(cx, cy - 68), (cx + 190, cy + 50)], fill=accent, width=6)
        draw.ellipse([(cx - 240, cy + 50), (cx - 140, cy + 150)], fill=(239, 68, 68, 40), outline=(239, 68, 68, 220), width=4)
        draw.text((cx - 220, cy + 80), "Trap", font=font_semi, fill=(239, 68, 68, 240))
        draw.ellipse([(cx + 140, cy + 50), (cx + 240, cy + 150)], fill=(accent[0], accent[1], accent[2], 220))
        draw.text((cx + 160, cy + 80), "Apex", font=font_bold, fill=(10, 10, 15, 255))
        draw.line([(cx + 190, cy + 150), (cx + 100, cy + 270)], fill=accent, width=4)
        draw.line([(cx + 190, cy + 150), (cx + 280, cy + 270)], fill=accent, width=4)
        return

    if "intuition-engine" in slug or "robot" in slug:
        draw.arc([(cx - 210, cy - 210), (cx + 210, cy + 210)], start=25, end=335, fill=accent, width=6)
        draw.ellipse([(cx - 48, cy - 48), (cx + 48, cy + 48)], fill=(255, 255, 255, 245))
        draw.line([(cx, cy), (cx + 230, cy - 116)], fill=(239, 68, 68, 220), width=6)
        draw.line([(cx, cy), (cx - 150, cy - 176)], fill=(34, 197, 94, 220), width=6)
        draw.line([(cx, cy), (cx, cy + 230)], fill=(59, 130, 246, 220), width=6)
        return

    if "anthropic" in slug or "ipo" in slug:
        draw.line([(cx - 320, cy + 220), (cx + 320, cy + 220)], fill=(255, 255, 255, 30), width=2)
        points = []
        for x in range(cx - 320, cx + 320, 20):
            norm = (x - (cx - 320)) / 640
            y = (cy + 220) - int(math.pow(norm, 2.5) * 420)
            points.append((x, y))
        for i in range(len(points) - 1):
            draw.line([points[i], points[i+1]], fill=accent, width=8)
        last_pt = points[-1]
        draw.ellipse([(last_pt[0] - 24, last_pt[1] - 24), (last_pt[0] + 24, last_pt[1] + 24)], fill=(255, 255, 255, 255))
        font_bold = ImageFont.truetype(FONT_BOLD, 36)
        draw.text((last_pt[0] - 260, last_pt[1] - 70), "$40B+ IPO", font=font_bold, fill=accent)
        return

    if "intelligence-shift" in slug:
        for i in range(1, 6):
            r = i * 64
            draw.arc([(cx - r, cy - r), (cx + r, cy + r)], start=180, end=360, fill=accent, width=4)
        draw.line([(cx - 320, cy), (cx + 320, cy)], fill=(255, 255, 255, 120), width=4)
        return

def generate_2x_thumbnail(art, white_a_img):
    W, H = 2400, 1260
    slug = art["slug"]
    category = art.get("category", "")
    accent = get_accent_for_article(art)
    t_main, t_sub = format_thumbnail_title(art)

    # 1. 3D Luxury Black Canvas with smooth ambient depth
    base = Image.new("RGBA", (W, H), (6, 7, 10, 255))
    draw_base = ImageDraw.Draw(base)
    for y in range(H):
        factor = 1.0 - math.pow(abs(y - H * 0.45) / (H * 0.55), 1.6)
        r = int(6 + 8 * factor)
        g = int(7 + 9 * factor)
        b = int(10 + 14 * factor)
        draw_base.line([(0, y), (W, y)], fill=(r, g, b, 255))

    # Ambient Right-Side Glow (smooth Gaussian)
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow_layer)
    rx, ry = 1680, 630
    ar, ag, ab = accent
    for rad in range(700, 0, -35):
        alpha = int((1.0 - (rad / 700) ** 1.6) * 45)
        gdraw.ellipse([rx - rad, ry - rad, rx + rad, ry + rad], fill=(ar, ag, ab, alpha))
    glow_blurred = glow_layer.filter(ImageFilter.GaussianBlur(radius=60))
    canvas = Image.alpha_composite(base, glow_blurred)

    # Vignette
    vignette = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vignette)
    cx, cy = W // 2, H // 2
    max_dist = math.sqrt(cx**2 + cy**2)
    for r in range(int(max_dist), int(H * 0.4), -50):
        norm = (r - H * 0.4) / (max_dist - H * 0.4)
        alpha = int(math.pow(norm, 2.2) * 140)
        vdraw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(0, 0, 0, alpha), width=50)
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=50))
    canvas = Image.alpha_composite(canvas, vignette)

    # 2. Right Column: 3D Floating Glassmorphic Card (800x800 at 2x)
    card_x, card_y = 1460, 230
    card_w, card_h = 800, 800
    card_r = 60

    # Ambient Drop Shadow
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rounded_rectangle(
        [(card_x - 20, card_y + 30), (card_x + card_w + 20, card_y + card_h + 60)],
        radius=card_r + 10,
        fill=(0, 0, 0, 190)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=40))
    canvas = Image.alpha_composite(canvas, shadow)

    # Card Body & UNIFORM 360-DEGREE BORDER (Zero patchy lines, completely uniform)
    card_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(card_img)
    cdraw.rounded_rectangle(
        [(card_x, card_y), (card_x + card_w, card_y + card_h)],
        radius=card_r,
        fill=(13, 16, 23, 240)
    )
    # Continuous elegant border (1.5px equivalent at 1x)
    cdraw.rounded_rectangle(
        [(card_x, card_y), (card_x + card_w, card_y + card_h)],
        radius=card_r,
        outline=(255, 255, 255, 45),
        width=3
    )
    canvas = Image.alpha_composite(canvas, card_img)

    card_cx = card_x + card_w // 2
    card_cy = card_y + card_h // 2
    draw = ImageDraw.Draw(canvas)

    tools = art.get("tools", [])
    is_vs = "vs" in slug or len(tools) >= 2
    is_ai_news = "AI News" in category

    if is_ai_news:
        draw_2x_news_artwork(draw, slug, card_cx, card_cy, accent)
    elif is_vs and len(tools) >= 2:
        # Comparison: 2 Floating Tool Squircles + Glowing VS badge
        t1, t2 = tools[0], tools[1]
        t1_x = card_cx - 175
        t2_x = card_cx + 175
        for tx, tslug in [(t1_x, t1), (t2_x, t2)]:
            box_s = 240
            draw.rounded_rectangle(
                [(tx - box_s//2, card_cy - box_s//2 + 12), (tx + box_s//2, card_cy + box_s//2 + 18)],
                radius=44,
                fill=(0, 0, 0, 90)
            )
            draw.rounded_rectangle(
                [(tx - box_s//2, card_cy - box_s//2), (tx + box_s//2, card_cy + box_s//2)],
                radius=42,
                fill=(250, 250, 252, 255),
                outline=(255, 255, 255, 120),
                width=3
            )
            logo_path = f"public/logos/{tslug}.png"
            if os.path.exists(logo_path):
                try:
                    logo = Image.open(logo_path).convert("RGBA")
                    logo_size = 150
                    logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
                    canvas.paste(logo, (tx - logo_size//2, card_cy - logo_size//2), logo)
                except Exception:
                    pass

        vs_r = 50
        draw.ellipse([(card_cx - vs_r, card_cy - vs_r), (card_cx + vs_r, card_cy + vs_r)], fill=(20, 24, 34, 255), outline=(255, 255, 255, 50), width=3)
        font_vs = ImageFont.truetype(FONT_BOLD, 36)
        draw.text((card_cx - 24, card_cy - 24), "VS", font=font_vs, fill=(ar, ag, ab, 255))
    else:
        # Single Tool
        primary_tool = tools[0] if tools else None
        if not primary_tool:
            m = re.match(r"^([a-z0-9\-]+)-review", slug)
            if m:
                primary_tool = m.group(1)

        box_s = 340
        draw.rounded_rectangle(
            [(card_cx - box_s//2, card_cy - box_s//2 + 16), (card_cx + box_s//2, card_cy + box_s//2 + 24)],
            radius=64,
            fill=(0, 0, 0, 110)
        )
        draw.rounded_rectangle(
            [(card_cx - box_s//2, card_cy - box_s//2), (card_cx + box_s//2, card_cy + box_s//2)],
            radius=60,
            fill=(250, 250, 252, 255),
            outline=(255, 255, 255, 140),
            width=3
        )
        if primary_tool:
            logo_path = f"public/logos/{primary_tool}.png"
            if os.path.exists(logo_path):
                try:
                    logo = Image.open(logo_path).convert("RGBA")
                    logo_size = 220
                    logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
                    canvas.paste(logo, (card_cx - logo_size//2, card_cy - logo_size//2), logo)
                except Exception:
                    pass

        # Optional Special Badge Pill
        badge_label = None
        if "saas-mode" in slug or "playbook" in slug:
            badge_label = "SAAS PRO MODE"
        elif "pricing" in slug:
            badge_label = "PRICING AUDIT"

        if badge_label:
            font_pill = ImageFont.truetype(FONT_BOLD, 26)
            bbox = draw.textbbox((0, 0), badge_label, font=font_pill)
            pw = (bbox[2] - bbox[0]) + 40
            ph = 48
            py = card_cy + box_s//2 + 30
            draw.rounded_rectangle(
                [(card_cx - pw//2, py), (card_cx + pw//2, py + ph)],
                radius=24,
                fill=(ar, ag, ab, 240),
                outline=(255, 255, 255, 80),
                width=2
            )
            draw.text((card_cx - (bbox[2] - bbox[0])//2, py + 9), badge_label, font=font_pill, fill=(10, 12, 16, 255))

    # 3. Left Section: Asmire "a" Logo Badge + Typography
    left_cx = 740
    badge_size = 120
    badge_r = 34

    font_main = ImageFont.truetype(FONT_BOLD, 82)
    font_sub = ImageFont.truetype(FONT_SEMI, 46)

    def wrap_at_2x(text, font, max_w):
        words = text.split()
        lines = []
        cur = []
        for w in words:
            test = " ".join(cur + [w])
            bb = draw.textbbox((0, 0), test, font=font)
            if bb[2] - bb[0] <= max_w:
                cur.append(w)
            else:
                if cur:
                    lines.append(" ".join(cur))
                    cur = [w]
                else:
                    lines.append(w)
                    cur = []
        if cur:
            lines.append(" ".join(cur))
        return lines

    lines_main = wrap_at_2x(t_main, font_main, 1100)
    lines_sub = wrap_at_2x(t_sub, font_sub, 1100)

    line_h_main = 108
    line_h_sub = 66
    gap_badge = 54
    gap_sub = 36

    total_h = badge_size + gap_badge + len(lines_main) * line_h_main + gap_sub + len(lines_sub) * line_h_sub
    start_y = (H - total_h) // 2

    # Draw Asmire "a" Badge (Uniform, smooth, anti-aliased border)
    bx = left_cx - badge_size // 2
    by = start_y
    draw.rounded_rectangle(
        [(bx, by + 8), (bx + badge_size, by + badge_size + 14)],
        radius=badge_r,
        fill=(0, 0, 0, 100)
    )
    draw.rounded_rectangle(
        [(bx, by), (bx + badge_size, by + badge_size)],
        radius=badge_r,
        fill=(18, 21, 30, 255),
        outline=(255, 255, 255, 55),
        width=3
    )

    # Place crisp white "a" inside
    a_size = 72
    white_a_scaled = white_a_img.resize((a_size, a_size), Image.Resampling.LANCZOS)
    canvas.paste(white_a_scaled, (left_cx - a_size // 2, by + (badge_size - a_size) // 2), white_a_scaled)

    # Draw Main Title
    curr_y = by + badge_size + gap_badge
    for line in lines_main:
        bb = draw.textbbox((0, 0), line, font=font_main)
        lw = bb[2] - bb[0]
        draw.text((left_cx - lw // 2 + 2, curr_y + 4), line, font=font_main, fill=(0, 0, 0, 160))
        draw.text((left_cx - lw // 2, curr_y), line, font=font_main, fill=(255, 255, 255, 255))
        curr_y += line_h_main

    # Draw Subtitle
    curr_y += gap_sub - 16
    for line in lines_sub:
        bb = draw.textbbox((0, 0), line, font=font_sub)
        lw = bb[2] - bb[0]
        draw.text((left_cx - lw // 2 + 2, curr_y + 2), line, font=font_sub, fill=(0, 0, 0, 120))
        draw.text((left_cx - lw // 2, curr_y), line, font=font_sub, fill=(160, 172, 192, 230))
        curr_y += line_h_sub

    # 4. Final High-Precision Lanczos Downscale to 1200x630
    return canvas.resize((1200, 630), Image.Resampling.LANCZOS)

def main():
    metadata_path = "scripts/all_articles_metadata.json"
    if not os.path.exists(metadata_path):
        print(f"Error: {metadata_path} not found.")
        sys.exit(1)

    with open(metadata_path, "r", encoding="utf-8") as f:
        articles = json.load(f)

    print(f"Loaded {len(articles)} articles from metadata.")

    # Prepare crisp white 'a' logo
    white_a_path = "scratch_white_a.png"
    if not os.path.exists(white_a_path):
        icon_orig = Image.open("public/icon.png").convert("RGBA")
        bbox = icon_orig.getbbox()
        crop = icon_orig.crop(bbox)
        r, g, b, a = crop.split()
        white = Image.new("L", crop.size, 255)
        white_a_img = Image.merge("RGBA", (white, white, white, a))
        white_a_img.save(white_a_path)
    else:
        white_a_img = Image.open(white_a_path).convert("RGBA")

    out_dir = "public/thumbnails/news"
    os.makedirs(out_dir, exist_ok=True)

    success_count = 0
    for i, art in enumerate(articles):
        slug = art["slug"]
        try:
            im = generate_2x_thumbnail(art, white_a_img)
            png_path = os.path.join(out_dir, f"{slug}.png")
            webp_path = os.path.join(out_dir, f"{slug}.webp")

            im.save(png_path, "PNG", optimize=True)
            rgb_im = im.convert("RGB")
            rgb_im.save(webp_path, "WEBP", quality=92, method=6)

            success_count += 1
            if (i + 1) % 10 == 0 or (i + 1) == len(articles):
                print(f"[{i+1}/{len(articles)}] Generated Ultra-HD 3D thumbnail for {slug}")
        except Exception as e:
            print(f"Error generating {slug}: {e}")

    print(f"\nSuccessfully generated {success_count} / {len(articles)} Ultra-HD 3D thumbnail pairs in {out_dir}")

if __name__ == "__main__":
    main()
