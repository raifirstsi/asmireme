from PIL import Image, ImageDraw

def render_highlevel_clean(path):
    size = 128
    im = Image.new("RGBA", (size, size), (15, 23, 42, 255)) # Elegant dark navy background
    draw = ImageDraw.Draw(im)
    
    # 3 upward arrows: Left (Yellow/Orange), Center (Cyan/Blue), Right (Green)
    # Arrow 1: Left (x: 28 to 44)
    # Arrow 2: Center (x: 56 to 72)
    # Arrow 3: Right (x: 84 to 100)
    
    # Arrow 1 (Left - Orange/Yellow)
    # Tip at (36, 44), base at (36, 100)
    col1 = (245, 158, 11, 255) # amber/orange
    draw.polygon([(36, 36), (22, 54), (30, 54), (30, 96), (42, 96), (42, 54), (50, 54)], fill=col1)
    
    # Arrow 2 (Center - Cyan/Blue)
    # Taller, tip at (64, 24)
    col2 = (14, 165, 233, 255) # cyan
    draw.polygon([(64, 22), (50, 42), (58, 42), (58, 104), (70, 104), (70, 42), (78, 42)], fill=col2)
    
    # Arrow 3 (Right - Emerald/Green)
    # Tip at (92, 44)
    col3 = (16, 185, 129, 255) # green
    draw.polygon([(92, 36), (78, 54), (86, 54), (86, 96), (98, 96), (98, 54), (106, 54)], fill=col3)
    
    im.save(path, "PNG")
    print("Saved high-res clean highlevel logo to", path)

render_highlevel_clean("public/logos/highlevel.png")
