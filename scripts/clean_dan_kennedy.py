import os
import glob

replacements = [
    # English replacements
    ("### The Dan Kennedy Diagnosis: The Hidden Payroll Bleed Most Businesses Ignore", "### The Operational Audit: The Hidden Payroll Bleed Most Businesses Ignore"),
    ("The Dan Kennedy Diagnosis", "The Operational Audit"),
    ("Dan Kennedy taught a relentless law of direct-response business:", "A relentless law of high-yield business dictates:"),
    ("In typical Dan Kennedy fashion, let us be ruthlessly transparent", "Let us be ruthlessly transparent"),
    ("### The Dan Kennedy Final Verdict & The Risk-Free Test Drive", "### The Cold-Blooded Final Verdict & The Risk-Free Test Drive"),
    ("The Dan Kennedy Final Verdict", "The Cold-Blooded Final Verdict"),
    ("Dan Kennedy style", "direct-response style"),
    ("Dan Kennedy's", "direct-response"),
    ("Dan Kennedy", "direct-response"),
    
    # Vietnamese replacements
    ("### Chẩn Đoán Kiểu Dan Kennedy: Vết Thương Chảy Máu Tiền Bạc Mà Doanh Nghiệp Thường Bỏ Quên", "### Kiểm Toán Dòng Tiền & Điểm Chết Vận Hành: Khoản Thất Thoát Nhân Lực Vô Hình"),
    ("Chẩn Đoán Kiểu Dan Kennedy", "Kiểm Toán Dòng Tiền & Điểm Chết Vận Hành"),
    ("Bậc thầy direct-response Dan Kennedy luôn nhắc nhở nguyên tắc kinh doanh thực chiến:", "Quy luật cốt lõi của kinh doanh thực chiến chỉ rõ:"),
    ("Theo đúng triết lý của Dan Kennedy, chúng tôi nói thẳng ai nên cất ví lại:", "Dưới góc nhìn lợi nhuận thực tế, chúng tôi nói thẳng ai nên cất ví lại:"),
    ("### Lời Kết Kiểu Dan Kennedy & Lời Đề Nghị Không Rủi Ro", "### Đánh Giá Cuối Cùng & Đề Xuất Trải Nghiệm Không Rủi Ro"),
    ("Lời Kết Kiểu Dan Kennedy", "Đánh Giá Cuối Cùng"),
    ("triết lý của Dan Kennedy", "triết lý tối ưu chi phí"),
    ("phong cách Dan Kennedy", "phong cách thực chiến"),
]

files = glob.glob("src/data/blog-posts/*.ts")
total_changes = 0

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    orig = content
    for old, new in replacements:
        content = content.replace(old, new)
        
    if content != orig:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        total_changes += 1
        print(f"Updated: {filepath}")

print(f"Replaced all Dan Kennedy text in {total_changes} files.")
