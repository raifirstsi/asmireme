import json
import os
import re
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Setup paths
OUT_DIR = os.path.join("public", "thumbnails", "news")
os.makedirs(OUT_DIR, exist_ok=True)

# System fonts
FONT_BOLD = "C:\\Windows\\Fonts\\segoeuib.ttf"
FONT_SEMI = "C:\\Windows\\Fonts\\seguisb.ttf"
FONT_REG = "C:\\Windows\\Fonts\\segoeui.ttf"

def get_fonts():
    return {
        "badge": ImageFont.truetype(FONT_BOLD, 12),
        "tag": ImageFont.truetype(FONT_SEMI, 11),
        "title_large": ImageFont.truetype(FONT_BOLD, 36),
        "title_medium": ImageFont.truetype(FONT_BOLD, 30),
        "sub": ImageFont.truetype(FONT_SEMI, 16),
        "meta": ImageFont.truetype(FONT_SEMI, 12),
        "card_header": ImageFont.truetype(FONT_SEMI, 12),
        "card_bold": ImageFont.truetype(FONT_BOLD, 14),
        "card_stat_num": ImageFont.truetype(FONT_BOLD, 18),
        "card_stat_lbl": ImageFont.truetype(FONT_SEMI, 10),
    }

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
        "pill_bg": (245, 158, 11, 28),
        "pill_border": (245, 158, 11, 160),
        "pill_text": (251, 191, 36, 255),
        "accent": (245, 158, 11),
    },
    "VIDEO & AVATAR": {
        "glow_main": (139, 92, 246, 80),
        "glow_sec": (99, 102, 241, 60),
        "pill_bg": (139, 92, 246, 28),
        "pill_border": (139, 92, 246, 160),
        "pill_text": (196, 181, 253, 255),
        "accent": (139, 92, 246),
    },
    "VOICE & AUDIO": {
        "glow_main": (6, 182, 212, 80),
        "glow_sec": (14, 165, 233, 60),
        "pill_bg": (6, 182, 212, 28),
        "pill_border": (6, 182, 212, 160),
        "pill_text": (103, 232, 249, 255),
        "accent": (6, 182, 212),
    },
    "SEO & CONTENT": {
        "glow_main": (16, 185, 129, 80),
        "glow_sec": (5, 150, 105, 60),
        "pill_bg": (16, 185, 129, 28),
        "pill_border": (16, 185, 129, 160),
        "pill_text": (110, 231, 183, 255),
        "accent": (16, 185, 129),
    },
    "CRM & GROWTH": {
        "glow_main": (59, 130, 246, 80),
        "glow_sec": (37, 99, 235, 60),
        "pill_bg": (59, 130, 246, 28),
        "pill_border": (59, 130, 246, 160),
        "pill_text": (147, 197, 253, 255),
        "accent": (59, 130, 246),
    },
    "AI DETECTION": {
        "glow_main": (239, 68, 68, 80),
        "glow_sec": (245, 158, 11, 60),
        "pill_bg": (239, 68, 68, 28),
        "pill_border": (239, 68, 68, 160),
        "pill_text": (252, 165, 165, 255),
        "accent": (239, 68, 68),
    },
    "WEBSITE BUILDER": {
        "glow_main": (236, 72, 153, 80),
        "glow_sec": (168, 85, 247, 60),
        "pill_bg": (236, 72, 153, 28),
        "pill_border": (236, 72, 153, 160),
        "pill_text": (249, 168, 212, 255),
        "accent": (236, 72, 153),
    },
    "PRESENTATION DESIGN": {
        "glow_main": (234, 179, 8, 80),
        "glow_sec": (139, 92, 246, 60),
        "pill_bg": (234, 179, 8, 28),
        "pill_border": (234, 179, 8, 160),
        "pill_text": (253, 224, 71, 255),
        "accent": (234, 179, 8),
    },
    "MEETING & WORK": {
        "glow_main": (56, 189, 248, 80),
        "glow_sec": (52, 211, 153, 60),
        "pill_bg": (56, 189, 248, 28),
        "pill_border": (56, 189, 248, 160),
        "pill_text": (186, 230, 253, 255),
        "accent": (56, 189, 248),
    },
    "AGENTIC RESEARCH": {
        "glow_main": (168, 85, 247, 80),
        "glow_sec": (20, 184, 166, 60),
        "pill_bg": (168, 85, 247, 28),
        "pill_border": (168, 85, 247, 160),
        "pill_text": (216, 180, 254, 255),
        "accent": (168, 85, 247),
    },
    "AI ADVERTISING": {
        "glow_main": (249, 115, 22, 80),
        "glow_sec": (234, 179, 8, 60),
        "pill_bg": (249, 115, 22, 28),
        "pill_border": (249, 115, 22, 160),
        "pill_text": (253, 186, 116, 255),
        "accent": (249, 115, 22),
    },
    "DEFAULT": {
        "glow_main": (99, 102, 241, 80),
        "glow_sec": (168, 85, 247, 60),
        "pill_bg": (99, 102, 241, 28),
        "pill_border": (99, 102, 241, 160),
        "pill_text": (199, 210, 254, 255),
        "accent": (99, 102, 241),
    }
}

def get_theme_for_article(art):
    cat = art.get("category", "").lower()
    slug = art.get("slug", "").lower()
    src = art.get("source_file", "").lower()

    if "ai-news" in src or "ai news" in cat:
        return "AI NEWS", THEMES["AI News"]
    if "video" in cat or "video" in src or "avatar" in cat:
        return "VIDEO & AVATAR", THEMES["VIDEO & AVATAR"]
    if "audio" in cat or "audio" in src or "voice" in cat:
        return "VOICE & AUDIO", THEMES["VOICE & AUDIO"]
    if "content" in cat or "content" in src or "writing" in cat or "seo" in cat:
        return "SEO & CONTENT", THEMES["SEO & CONTENT"]
    if "crm" in cat or "crm" in src or "sales" in cat:
        return "CRM & GROWTH", THEMES["CRM & GROWTH"]
    if "detection" in cat or "detection" in src:
        return "AI DETECTION", THEMES["AI DETECTION"]
    if "builder" in cat or "builder" in src or "web" in cat:
        return "WEBSITE BUILDER", THEMES["WEBSITE BUILDER"]
    if "presentation" in cat or "presentation" in src:
        return "PRESENTATION DESIGN", THEMES["PRESENTATION DESIGN"]
    if "productivity" in cat or "productivity" in src or "meeting" in cat:
        return "MEETING & WORK", THEMES["MEETING & WORK"]
    if "agent" in cat or "agent" in src or "research" in cat:
        return "AGENTIC RESEARCH", THEMES["AGENTIC RESEARCH"]
    if "advertising" in cat or "advertising" in src or "ad" in cat:
        return "AI ADVERTISING", THEMES["AI ADVERTISING"]
    
    return "SAAS BENCHMARK", THEMES["DEFAULT"]

# Drawing helpers for card interiors
def draw_card_base(draw, card_x, card_y, card_w, card_h, theme_border, url_label="asmire.me / verified"):
    draw.rounded_rectangle(
        [(card_x, card_y), (card_x + card_w, card_y + card_h)],
        radius=22,
        fill=(13, 15, 20, 230),
        outline=theme_border,
        width=1
    )
    # Window bar
    draw.line([(card_x + 15, card_y + 44), (card_x + card_w - 15, card_y + 44)], fill=(255, 255, 255, 18), width=1)
    # Red, Yellow, Green dots
    draw.ellipse([(card_x + 20, card_y + 18), (card_x + 30, card_y + 28)], fill=(239, 68, 68, 220))
    draw.ellipse([(card_x + 36, card_y + 18), (card_x + 46, card_y + 28)], fill=(234, 179, 8, 220))
    draw.ellipse([(card_x + 52, card_y + 18), (card_x + 62, card_y + 28)], fill=(34, 197, 94, 220))
    
    font_semi = ImageFont.truetype(FONT_SEMI, 11)
    draw.text((card_x + 75, card_y + 17), url_label, font=font_semi, fill=(140, 140, 160, 200))

def draw_tool_logo(im, draw, logo_slug, cx, cy, size=88):
    logo_path = f"public/logos/{logo_slug}.png"
    if os.path.exists(logo_path):
        try:
            logo = Image.open(logo_path).convert("RGBA").resize((size, size), Image.Resampling.LANCZOS)
            lw, lh = logo.size
            lx = cx - lw // 2
            ly = cy - lh // 2
            # White glass backing
            draw.rounded_rectangle([(lx - 12, ly - 12), (lx + lw + 12, ly + lh + 12)], radius=18, fill=(255, 255, 255, 245), outline=(255, 255, 255, 60), width=1)
            im.paste(logo, (lx, ly), logo)
            return True
        except Exception as e:
            pass
    return False

def draw_news_artwork(draw, slug, card_x, card_y, card_w, card_h, accent):
    cx = card_x + card_w // 2
    cy = card_y + 195
    font_bold = ImageFont.truetype(FONT_BOLD, 13)
    font_semi = ImageFont.truetype(FONT_SEMI, 11)

    if "amd-silicon" in slug:
        # Microchip Die
        chip_size = 110
        draw.rounded_rectangle([(cx - chip_size//2, cy - chip_size//2), (cx + chip_size//2, cy + chip_size//2)], radius=14, fill=(24, 24, 32, 255), outline=accent, width=2)
        # Inner silicon core
        core_s = 60
        draw.rounded_rectangle([(cx - core_s//2, cy - core_s//2), (cx + core_s//2, cy + core_s//2)], radius=8, fill=(accent[0]//4, accent[1]//4, accent[2]//4, 255), outline=(255, 255, 255, 80), width=1)
        draw.text((cx - 28, cy - 8), "AI DIE", font=font_bold, fill=(255, 255, 255, 240))
        # Radiation pins
        for i in range(-45, 50, 18):
            draw.line([(cx + i, cy - chip_size//2), (cx + i, cy - chip_size//2 - 25)], fill=(accent[0], accent[1], accent[2], 180), width=2)
            draw.line([(cx + i, cy + chip_size//2), (cx + i, cy + chip_size//2 + 25)], fill=(accent[0], accent[1], accent[2], 180), width=2)
            draw.line([(cx - chip_size//2, cy + i), (cx - chip_size//2 - 25, cy + i)], fill=(accent[0], accent[1], accent[2], 180), width=2)
            draw.line([(cx + chip_size//2, cy + i), (cx + chip_size//2 + 25, cy + i)], fill=(accent[0], accent[1], accent[2], 180), width=2)
        draw.text((card_x + 35, card_y + 315), "ARCH: 3nm GA-AI ENGINE", font=font_semi, fill=(180, 180, 200, 220))
        draw.text((card_x + 35, card_y + 335), "THROUGHPUT: 18.4 TFLOPS/WATT", font=font_semi, fill=(accent[0], accent[1], accent[2], 240))

    elif "knowledge-trap" in slug:
        # Decision matrix tree
        draw.ellipse([(cx - 16, cy - 80), (cx + 16, cy - 48)], fill=(accent[0], accent[1], accent[2], 220))
        draw.text((cx - 6, cy - 72), "Q0", font=font_bold, fill=(10, 10, 15, 255))
        # Branches
        draw.line([(cx, cy - 48), (cx - 70, cy + 10)], fill=(255, 255, 255, 100), width=2)
        draw.line([(cx, cy - 48), (cx + 70, cy + 10)], fill=accent, width=3)
        # Left node
        draw.ellipse([(cx - 85, cy + 10), (cx - 55, cy + 40)], fill=(30, 30, 45, 255), outline=(255, 255, 255, 80), width=1)
        draw.text((cx - 76, cy + 18), "Trap", font=font_semi, fill=(239, 68, 68, 220))
        # Right node (optimal)
        draw.ellipse([(cx + 55, cy + 10), (cx + 85, cy + 40)], fill=(accent[0], accent[1], accent[2], 220))
        draw.text((cx + 63, cy + 18), "Apex", font=font_bold, fill=(10, 10, 15, 255))
        # Further split
        draw.line([(cx + 70, cy + 40), (cx + 35, cy + 90)], fill=accent, width=2)
        draw.line([(cx + 70, cy + 40), (cx + 105, cy + 90)], fill=accent, width=2)
        draw.text((card_x + 35, card_y + 315), "DECISION HEURISTIC: EMPIRICAL OPTIMAL", font=font_semi, fill=(180, 180, 200, 220))
        draw.text((card_x + 35, card_y + 335), "ACCURACY VELOCITY: +84% CERTAINTY", font=font_semi, fill=(accent[0], accent[1], accent[2], 240))

    elif "intuition-engine" in slug or "robot" in slug:
        # Bionic kinematic vectors
        draw.arc([(cx - 70, cy - 70), (cx + 70, cy + 70)], start=30, end=330, fill=accent, width=3)
        draw.ellipse([(cx - 15, cy - 15), (cx + 15, cy + 15)], fill=(255, 255, 255, 240))
        # Coordinate vectors
        draw.line([(cx, cy), (cx + 80, cy - 40)], fill=(239, 68, 68, 220), width=2)
        draw.line([(cx, cy), (cx - 50, cy - 60)], fill=(34, 197, 94, 220), width=2)
        draw.line([(cx, cy), (cx, cy + 80)], fill=(59, 130, 246, 220), width=2)
        draw.text((card_x + 35, card_y + 315), "PRAXIS KINEMATICS: 6-DOF REALTIME", font=font_semi, fill=(180, 180, 200, 220))
        draw.text((card_x + 35, card_y + 335), "PHYSICAL REASONING: 120Hz LATENCY", font=font_semi, fill=(accent[0], accent[1], accent[2], 240))

    elif "anthropic" in slug or "ipo" in slug:
        # Valuation Exponential Curve
        draw.line([(card_x + 40, card_y + 240), (card_x + card_w - 40, card_y + 240)], fill=(255, 255, 255, 40), width=1)
        points = []
        for x in range(card_x + 40, card_x + card_w - 40, 10):
            norm = (x - (card_x + 40)) / (card_w - 80)
            y = (card_y + 240) - int(math.pow(norm, 2.5) * 160)
            points.append((x, y))
        for i in range(len(points) - 1):
            draw.line([points[i], points[i+1]], fill=accent, width=3)
        # Apex point
        last_pt = points[-1]
        draw.ellipse([(last_pt[0] - 8, last_pt[1] - 8), (last_pt[0] + 8, last_pt[1] + 8)], fill=(255, 255, 255, 255))
        draw.text((last_pt[0] - 85, last_pt[1] - 25), "$40B+ VALUATION", font=font_bold, fill=accent)
        draw.text((card_x + 35, card_y + 315), "VALUATION LEVERAGE: 18.5x REVENUE", font=font_semi, fill=(180, 180, 200, 220))
        draw.text((card_x + 35, card_y + 335), "HYPER-EFFICIENCY: 800+ TOP ENTERPRISE", font=font_semi, fill=(accent[0], accent[1], accent[2], 240))

    elif "frictionless" in slug or "gemini" in slug:
        # Multi-agent federation rings
        draw.ellipse([(cx - 30, cy - 30), (cx + 30, cy + 30)], fill=(accent[0], accent[1], accent[2], 220))
        draw.text((cx - 18, cy - 8), "SWARM", font=ImageFont.truetype(FONT_BOLD, 9), fill=(10, 10, 15, 255))
        # Orbiting agents
        orbits = [(-80, -60), (80, -60), (-80, 60), (80, 60)]
        for ox, oy in orbits:
            draw.line([(cx, cy), (cx + ox, cy + oy)], fill=(255, 255, 255, 80), width=1)
            draw.ellipse([(cx + ox - 14, cy + oy - 14), (cx + ox + 14, cy + oy + 14)], fill=(25, 25, 35, 255), outline=accent, width=2)
            draw.ellipse([(cx + ox - 4, cy + oy - 4), (cx + ox + 4, cy + oy + 4)], fill=(255, 255, 255, 220))
        draw.text((card_x + 35, card_y + 315), "AUTONOMOUS SWARM: ZERO-LATENCY BUS", font=font_semi, fill=(180, 180, 200, 220))
        draw.text((card_x + 35, card_y + 335), "TASK COMPLETION RATE: 99.1% AUTOPILOT", font=font_semi, fill=(accent[0], accent[1], accent[2], 240))

    else:
        # 2026 intelligence shift / default concept
        # Planetary horizon grid
        for i in range(1, 6):
            r = i * 26
            draw.arc([(cx - r, cy - r), (cx + r, cy + r)], start=180, end=360, fill=accent, width=2)
        draw.line([(card_x + 40, cy), (card_x + card_w - 40, cy)], fill=(255, 255, 255, 120), width=2)
        draw.text((card_x + 35, card_y + 315), "INTELLIGENCE HORIZON: 2026-2027", font=font_semi, fill=(180, 180, 200, 220))
        draw.text((card_x + 35, card_y + 335), "AGENTIC MATURITY: PHASE 4 COMPLETE", font=font_semi, fill=(accent[0], accent[1], accent[2], 240))

def draw_category_visual(draw, cat_name, card_x, card_y, card_w, card_h, accent):
    chart_y = card_y + 230
    font_bold = ImageFont.truetype(FONT_BOLD, 12)
    font_semi = ImageFont.truetype(FONT_SEMI, 11)

    if "VIDEO" in cat_name:
        # Timeline and keyframes
        draw.text((card_x + 35, chart_y), "Cinematic Render / 4K UHD", font=font_semi, fill=(180, 180, 200, 220))
        draw.rounded_rectangle([(card_x + 35, chart_y + 20), (card_x + card_w - 35, chart_y + 45)], radius=6, fill=(24, 24, 32, 255), outline=(255, 255, 255, 30), width=1)
        # Keyframe markers
        for k in range(card_x + 55, card_x + card_w - 55, 35):
            draw.line([(k, chart_y + 20), (k, chart_y + 45)], fill=(255, 255, 255, 30), width=1)
            draw.ellipse([(k - 3, chart_y + 29), (k + 3, chart_y + 35)], fill=accent)
        # Red scrub line
        scrub_x = card_x + 190
        draw.line([(scrub_x, chart_y + 15), (scrub_x, chart_y + 50)], fill=(239, 68, 68, 255), width=2)
        draw.text((card_x + 35, chart_y + 65), "OUTPUT: 60 FPS • AV1 / H.265 • HDR", font=font_bold, fill=(255, 255, 255, 240))

    elif "VOICE" in cat_name or "AUDIO" in cat_name:
        # Equalizer soundwaves
        draw.text((card_x + 35, chart_y), "Acoustic Naturalness & Waveform", font=font_semi, fill=(180, 180, 200, 220))
        bar_x = card_x + 35
        heights = [18, 32, 48, 62, 54, 40, 28, 50, 65, 58, 44, 30, 22, 38, 52, 42, 26, 15]
        for h in heights:
            draw.rounded_rectangle([(bar_x, chart_y + 70 - h), (bar_x + 10, chart_y + 70)], radius=3, fill=accent)
            bar_x += 16
        draw.text((card_x + 35, chart_y + 85), "CLONING FIDELITY: 99.4% REAL-VOICE", font=font_bold, fill=(255, 255, 255, 240))

    elif "SEO" in cat_name or "CONTENT" in cat_name:
        # SEO Score Dial
        draw.text((card_x + 35, chart_y), "Search Authority & NLP Quality", font=font_semi, fill=(180, 180, 200, 220))
        draw.rounded_rectangle([(card_x + 35, chart_y + 22), (card_x + card_w - 35, chart_y + 34)], radius=6, fill=(24, 24, 32, 255))
        draw.rounded_rectangle([(card_x + 35, chart_y + 22), (card_x + card_w - 75, chart_y + 34)], radius=6, fill=accent)
        draw.text((card_x + 35, chart_y + 48), "SERP INTENT MATCH: 98.2 / 100", font=font_bold, fill=accent)
        draw.text((card_x + 35, chart_y + 70), "HALLUCINATION RATE: < 0.4% VERIFIED", font=font_semi, fill=(180, 180, 200, 220))

    elif "CRM" in cat_name:
        # Pipeline Stages
        draw.text((card_x + 35, chart_y), "Automated Pipeline Velocity", font=font_semi, fill=(180, 180, 200, 220))
        stages = ["Lead", "Audit", "Call", "Won"]
        sx = card_x + 35
        for s in stages:
            draw.rounded_rectangle([(sx, chart_y + 24), (sx + 64, chart_y + 52)], radius=6, fill=(24, 24, 34, 255), outline=accent, width=1)
            draw.text((sx + 14, chart_y + 32), s, font=font_semi, fill=(255, 255, 255, 240))
            if s != "Won":
                draw.line([(sx + 64, chart_y + 38), (sx + 76, chart_y + 38)], fill=accent, width=2)
            sx += 76
        draw.text((card_x + 35, chart_y + 70), "CONVERSION MULTIPLIER: +3.8x ROI", font=font_bold, fill=accent)

    elif "DETECTION" in cat_name:
        # Scanner Radar
        draw.text((card_x + 35, chart_y), "Spectral Classifier Diagnostics", font=font_semi, fill=(180, 180, 200, 220))
        draw.rounded_rectangle([(card_x + 35, chart_y + 20), (card_x + 180, chart_y + 60)], radius=8, fill=(34, 197, 94, 25), outline=(34, 197, 94, 150), width=1)
        draw.text((card_x + 48, chart_y + 26), "HUMAN", font=font_semi, fill=(34, 197, 94, 220))
        draw.text((card_x + 48, chart_y + 39), "99.8%", font=font_bold, fill=(34, 197, 94, 255))
        draw.rounded_rectangle([(card_x + 195, chart_y + 20), (card_x + card_w - 35, chart_y + 60)], radius=8, fill=(239, 68, 68, 25), outline=(239, 68, 68, 150), width=1)
        draw.text((card_x + 208, chart_y + 26), "AI SYNTH", font=font_semi, fill=(239, 68, 68, 220))
        draw.text((card_x + 208, chart_y + 39), "0.2%", font=font_bold, fill=(239, 68, 68, 255))
        draw.text((card_x + 35, chart_y + 75), "FALSE POSITIVE RISK: < 0.05%", font=font_semi, fill=(180, 180, 200, 220))

    else:
        # Default Tech Benchmark Gauges
        draw.text((card_x + 35, chart_y), "Empirical Capability Benchmark", font=font_semi, fill=(180, 180, 200, 220))
        draw.rounded_rectangle([(card_x + 35, chart_y + 22), (card_x + card_w - 35, chart_y + 32)], radius=5, fill=(24, 24, 32, 255))
        draw.rounded_rectangle([(card_x + 35, chart_y + 22), (card_x + card_w - 65, chart_y + 32)], radius=5, fill=accent)
        draw.text((card_x + 35, chart_y + 45), "EFFICIENCY GAIN: +85% PRODUCTIVITY", font=font_bold, fill=accent)
        draw.text((card_x + 35, chart_y + 68), "INTEGRATION READINESS: PRODUCTION TIER", font=font_semi, fill=(180, 180, 200, 220))

def generate_single_thumbnail(art, fonts, asmire_white_icon):
    width, height = 1200, 630
    slug = art["slug"]
    title = art.get("title_en", slug)
    
    # Clean title for thumbnail (remove trailing parenthetical year or long suffix if too verbose)
    clean_title = re.sub(r'\s*\(202\d\):.*', '', title)
    if len(clean_title) > 60:
        clean_title = clean_title[:57] + "..."
    
    cat_label, theme = get_theme_for_article(art)
    
    # 1. Base Image
    im = Image.new("RGBA", (width, height), (9, 10, 13, 255))
    
    # 2. Dynamic Ambient Glows
    im = add_radial_glow(im, (980, 315), 340, theme["glow_main"])
    im = add_radial_glow(im, (1120, 140), 260, theme["glow_sec"])
    im = add_radial_glow(im, (180, 520), 220, (theme["accent"][0], theme["accent"][1], theme["accent"][2], 30))
    
    draw = ImageDraw.Draw(im)
    draw_grid_and_crosses(draw, width, height, step=45)
    
    # Outer frame border
    draw.rectangle([(0, 0), (width - 1, height - 1)], outline=(255, 255, 255, 18), width=1)
    
    # 3. Top Left Brand
    if asmire_white_icon:
        im.paste(asmire_white_icon, (60, 54), asmire_white_icon)
    draw.text((96, 59), "ASMIRE INTELLIGENCE", font=fonts["badge"], fill=(210, 210, 225, 230))
    
    # Category Pill
    pill_text = cat_label
    pill_bbox = draw.textbbox((0, 0), pill_text, font=fonts["badge"])
    pill_w = (pill_bbox[2] - pill_bbox[0]) + 24
    px = 280
    draw.rounded_rectangle([(px, 51), (px + pill_w, 81)], radius=15, fill=theme["pill_bg"], outline=theme["pill_border"], width=1)
    draw.text((px + 12, 58), pill_text, font=fonts["badge"], fill=theme["pill_text"])
    
    # Top Right Epoch Tag
    epoch_tag = "2027 EVALUATION" if "AI NEWS" not in cat_label else "STRATEGIC DISPATCH"
    draw.text((width - 250, 59), epoch_tag, font=fonts["badge"], fill=(160, 160, 180, 190))
    
    # 4. Title & Description
    title_lines = wrap_text(title, fonts["title_large"], 640, draw)
    if len(title_lines) > 3:
        title_lines = title_lines[:3]
        if not title_lines[-1].endswith("..."):
            title_lines[-1] = title_lines[-1][:len(title_lines[-1])-3] + "..."
    
    ty = 160
    for line in title_lines:
        draw.text((60, ty), line, font=fonts["title_large"], fill=(255, 255, 255, 255))
        ty += 46
    
    # Subtitle / Value line
    sub_text = art.get("title_vi", "")
    if sub_text:
        sub_lines = wrap_text(sub_text, fonts["sub"], 640, draw)
        ty += 15
        for sline in sub_lines[:2]:
            draw.text((60, ty), sline, font=fonts["sub"], fill=(155, 160, 175, 210))
            ty += 24
            
    # Empirical Metric Cards (Bottom Left)
    by = 445
    bx = 60
    badges = [
        ("VERIFIED AUDIT", "100% EMPIRICAL"),
        ("EVALUATION", "PRODUCTION-TIER"),
        ("INDEPENDENCE", "NO SPONSOR BIAS")
    ]
    if "AI NEWS" in cat_label:
        badges = [
            ("SIGNAL CLARITY", "TIER-1 BRIEFING"),
            ("HORIZON", "2026-2027 SHIFT"),
            ("IMPACT", "PARADIGM LEVEL")
        ]
        
    for lbl, val in badges:
        bw = 185
        draw.rounded_rectangle([(bx, by), (bx + bw, by + 56)], radius=12, fill=(16, 17, 24, 210), outline=(255, 255, 255, 25), width=1)
        draw.text((bx + 14, by + 9), lbl, font=fonts["card_stat_lbl"], fill=(130, 130, 150, 200))
        draw.text((bx + 14, by + 26), val, font=ImageFont.truetype(FONT_BOLD, 12), fill=(255, 255, 255, 240))
        bx += bw + 14
        
    # 5. Right Illustration Card
    card_x, card_y = 750, 135
    card_w, card_h = 390, 390
    card_border = (theme["accent"][0], theme["accent"][1], theme["accent"][2], 120)
    
    url_lbl = f"{slug[:24]}.ai / verified" if "AI NEWS" not in cat_label else "asmire.me / strategic-ai"
    draw_card_base(draw, card_x, card_y, card_w, card_h, card_border, url_lbl)
    
    # Check if tool review with logo
    tools = art.get("tools", [])
    primary_tool = tools[0] if tools else None
    
    # Also derive from slug e.g. "textero-review-roi-guide-2027" -> "textero"
    if not primary_tool:
        match_slug = re.match(r'^([a-z0-9\-]+)-review', slug)
        if match_slug:
            primary_tool = match_slug.group(1)
            
    logo_drawn = False
    if primary_tool and "AI NEWS" not in cat_label:
        logo_drawn = draw_tool_logo(im, draw, primary_tool, card_x + card_w // 2, card_y + 130, size=92)
        
    if not logo_drawn:
        # Check comparison or news
        if "vs" in slug or len(tools) >= 2:
            # Draw multi-logo collage
            t1 = tools[0] if len(tools) > 0 else "gamma"
            t2 = tools[1] if len(tools) > 1 else "decktopus"
            draw_tool_logo(im, draw, t1, card_x + 110, card_y + 130, size=70)
            draw_tool_logo(im, draw, t2, card_x + 280, card_y + 130, size=70)
            draw.text((card_x + card_w//2 - 12, card_y + 120), "VS", font=ImageFont.truetype(FONT_BOLD, 18), fill=theme["accent"])
        else:
            # AI News or custom visual
            draw_news_artwork(draw, slug, card_x, card_y, card_w, card_h, theme["accent"])
            
    if logo_drawn or "vs" in slug or len(tools) >= 2:
        draw_category_visual(draw, cat_label, card_x, card_y, card_w, card_h, theme["accent"])
        
    # 6. Bottom footer note
    draw.text((60, 565), "asmire.me / empirical-software-intelligence", font=fonts["meta"], fill=(110, 110, 130, 200))
    draw.text((width - 230, 565), "© 2027 ASMIRE GLOBAL", font=fonts["meta"], fill=(110, 110, 130, 200))
    
    # Save both PNG and WebP
    png_path = os.path.join(OUT_DIR, f"{slug}.png")
    webp_path = os.path.join(OUT_DIR, f"{slug}.webp")
    
    im.save(png_path, "PNG", optimize=True)
    im.save(webp_path, "WEBP", quality=92)
    return png_path, webp_path

def main():
    with open('scripts/all_articles_metadata.json', 'r', encoding='utf-8') as f:
        articles = json.load(f)
        
    print(f"Starting thumbnail generation for {len(articles)} articles...")
    fonts = get_fonts()
    
    # Prepare white Asmire icon
    icon_path = "public/icon.png"
    asmire_white_icon = None
    if os.path.exists(icon_path):
        icon = Image.open(icon_path).convert("RGBA").resize((26, 26), Image.Resampling.LANCZOS)
        _, _, _, a = icon.split()
        asmire_white_icon = Image.merge("RGBA", (
            Image.new("L", icon.size, 255),
            Image.new("L", icon.size, 255),
            Image.new("L", icon.size, 255),
            a
        ))
        
    count = 0
    for art in articles:
        p, w = generate_single_thumbnail(art, fonts, asmire_white_icon)
        count += 1
        print(f"[{count}/{len(articles)}] Generated: {art['slug']}")
        
    print(f"\nAll {count} article thumbnails generated successfully in {OUT_DIR}!")

if __name__ == "__main__":
    main()
