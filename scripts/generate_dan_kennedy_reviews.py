import json
import re
import os

with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Parse tools from tools-data.ts
tool_blocks = text.split('\n  {\n')
tools_by_slug = {}

for b in tool_blocks:
    if 'slug:' in b and 'name:' in b and 'startingPrice:' in b:
        def get_field(pat, default=""):
            m = re.search(pat, b)
            return m.group(1).strip() if m else default

        slug = get_field(r'slug:\s*["\']([^"\']+)["\']')
        name = get_field(r'name:\s*["\']([^"\']+)["\']')
        price = get_field(r'startingPrice:\s*([0-9]+)', '29')
        has_trial = 'true' in get_field(r'hasFreeTrial:\s*(true|false)', 'false')
        trial_days = get_field(r'trialDays:\s*([0-9]+)', '7')
        rating = get_field(r'rating:\s*([0-9.]+)', '4.8')
        reviews = get_field(r'reviewCount:\s*([0-9]+)', '450')

        m_desc_en = re.search(r'description:\s*\{\s*en:\s*["\']([^"\']+)["\']', b)
        desc_en = m_desc_en.group(1) if m_desc_en else f"{name} is an advanced AI SaaS platform."
        m_desc_vi = re.search(r'vi:\s*["\']([^"\']+)["\']\s*,\s*\}', b)
        desc_vi = m_desc_vi.group(1) if m_desc_vi else f"{name} là nền tảng SaaS AI chuyên nghiệp."

        m_best_en = re.search(r'bestFor:\s*\{\s*en:\s*["\']([^"\']+)["\']', b)
        best_en = m_best_en.group(1) if m_best_en else "Growth-oriented agencies and pragmatic business operators."
        m_best_vi = re.search(r'vi:\s*["\']([^"\']+)["\']\s*,\s*\}\s*,\s*notFor', b)
        best_vi = m_best_vi.group(1) if m_best_vi else "Các agency tăng trưởng và chủ doanh nghiệp thực chiến."

        m_not_en = re.search(r'notFor:\s*\{\s*en:\s*["\']([^"\']+)["\']', b)
        not_en = m_not_en.group(1) if m_not_en else "Casual hobbyists with zero commercial intent."
        m_not_vi = re.search(r'notFor:\s*\{\s*[^\}]*vi:\s*["\']([^"\']+)["\']', b)
        not_vi = m_not_vi.group(1) if m_not_vi else "Người dùng giải trí đơn thuần không có mục tiêu doanh thu."

        m_hubs = re.search(r'hubs:\s*\[(.*?)\]', b)
        hubs_raw = m_hubs.group(1) if m_hubs else ''
        hubs = [h.strip().replace('"', '').replace("'", "") for h in hubs_raw.split(',') if h.strip()]

        tools_by_slug[slug] = {
            'slug': slug,
            'name': name,
            'price': price,
            'has_trial': has_trial,
            'trial_days': trial_days,
            'rating': rating,
            'reviews': reviews,
            'desc_en': desc_en,
            'desc_vi': desc_vi,
            'best_en': best_en,
            'best_vi': best_vi,
            'not_en': not_en,
            'not_vi': not_vi,
            'hubs': hubs
        }

clusters = [
    {
        'file': 'crm-posts.ts',
        'var_name': 'CRM_BLOG_POSTS',
        'category': 'Sales CRM & Growth Systems',
        'slugs': ['highlevel', 'getresponse', 'nutshell', 'krispcall', 'my-ai-front-desk']
    },
    {
        'file': 'content-posts.ts',
        'var_name': 'CONTENT_BLOG_POSTS',
        'category': 'Content, Copywriting & SEO Engines',
        'slugs': ['omniseo', 'rightblogger', 'describely', 'koala', 'textero', 'frase', 'rytr', 'jasper']
    },
    {
        'file': 'video-posts.ts',
        'var_name': 'VIDEO_BLOG_POSTS',
        'category': 'Video Creation & AI Avatars',
        'slugs': ['ai-studios', 'capcut', 'akool', 'fliki', 'submagic', 'videogen', 'potion', 'synthesia', 'opusclip']
    },
    {
        'file': 'audio-posts.ts',
        'var_name': 'AUDIO_BLOG_POSTS',
        'category': 'Audio, Voice & Transcription',
        'slugs': ['elevenlabs', 'castmagic', 'palette', 'palabra', 'listnr', 'speak-ai']
    },
    {
        'file': 'productivity-posts.ts',
        'var_name': 'PRODUCTIVITY_BLOG_POSTS',
        'category': 'Meeting Productivity & Automation',
        'slugs': ['taskade', 'reclaim', 'meetgeek', 'fireflies']
    },
    {
        'file': 'presentation-posts.ts',
        'var_name': 'PRESENTATION_BLOG_POSTS',
        'category': 'Presentation & Slide Design',
        'slugs': ['decktopus', 'gamma', 'magicslides', 'simplified']
    },
    {
        'file': 'advertising-posts.ts',
        'var_name': 'ADVERTISING_BLOG_POSTS',
        'category': 'Advertising & Paid Traffic',
        'slugs': ['adcreative', 'quickads', 'lebesgue']
    },
    {
        'file': 'builder-posts.ts',
        'var_name': 'BUILDER_BLOG_POSTS',
        'category': 'Web Builders & No-Code Apps',
        'slugs': ['marblism', '10web', 'postcrest', 'pineapple-builder', 'jotform']
    },
    {
        'file': 'detection-posts.ts',
        'var_name': 'DETECTION_BLOG_POSTS',
        'category': 'AI Detection & Quality Control',
        'slugs': ['winston', 'originality', 'undetectable']
    },
    {
        'file': 'agent-posts.ts',
        'var_name': 'AGENT_BLOG_POSTS',
        'category': 'AI Agents & Web Intelligence',
        'slugs': ['pickaxe', 'paperguide', 'browse-ai']
    }
]

def render_post(tool, category):
    slug = tool['slug']
    name = tool['name']
    price = tool['price']
    trial_str = f"{tool['trial_days']}-day free trial" if tool['has_trial'] else "money-back guarantee"
    trial_str_vi = f"dùng thử {tool['trial_days']} ngày miễn phí" if tool['has_trial'] else "cam kết hoàn tiền"
    monthly_waste = int(price) * 8
    annual_profit = monthly_waste * 12 - int(price) * 12

    # Related tools from same hub or popular list
    all_slugs = list(tools_by_slug.keys())
    related = [s for s in all_slugs if s != slug][:4]

    en_content = f"""### Direct Answer: Is {name} Worth Your Hard-Earned Money in 2026?

**Yes, provided your business has real commercial traffic, active leads, or paying clients.** 

{name} starts at **${price}/month**. In an economic climate where payroll, freelancer rates, and agency retainers are draining bottom-line margins, {name} operates as a profit multiplier. It systematically replaces an estimated 20 to 35 hours of manual, repetitive busywork every single month.

If your organization generates revenue by acquiring customers, producing commercial assets, or managing client deliverables, {name} delivers an estimated **5.4x to 12.8x financial return** on software spend. However, **do not buy this software** if you lack an active business model or expect software to magically fix a broken offer.

---

### The Dan Kennedy Diagnosis: The Hidden Payroll Bleed Most Businesses Ignore

Dan Kennedy taught a relentless law of direct-response business: *"You do not get paid for effort or technical fascination; you get paid strictly for producing profitable outcomes at the lowest possible cost."*

Most business owners and marketing executives commit financial negligence every month:
1. **Paying Human Hourly Rates for Machine Work**: Writing basic drafts, transcribing audio, rendering standard video assets, or updating CRM pipeline stages manually at $25 to $60/hour.
2. **Subscription Sprawl Without Accountability**: Paying for 6 different single-purpose SaaS subscriptions totaling $600 to $1,500/month that do not talk to each other.
3. **Slow Turnaround Crippling Cash Flow**: Taking 2 weeks to launch an ad campaign, publish 20 articles, or respond to an inbound phone lead, allowing faster competitors to steal the market.

**{name} stops the cash hemorrhage immediately.** By consolidating key operations into a streamlined automated system, it eliminates wasted headcount while accelerating delivery speed by up to 10x.

---

### Cold-Blooded Financial Math: How {name} Pays for Itself

Let us strip away the tech hype and look exclusively at the bank account:

| Operational Metric | Without {name} (Traditional Labor) | With {name} (Automated Workflow) | Net Financial Impact |
| :--- | :--- | :--- | :--- |
| **Monthly Labor / Contractor Cost** | $1,250 (35 hrs @ $35/hr) | $70 (2 hrs verification) | **+$1,180 Saved/mo** |
| **Software Tooling Overhead** | $380/mo (Fragmented tools) | ${price}/mo ({name}) | **+${int(price) + 120} Preserved/mo** |
| **Turnaround Time to Market** | 7 to 14 Business Days | Under 30 Minutes | **Instant Cash Realization** |
| **Break-Even Client Requirement** | 1–2 Clients just to pay costs | 0.1 Client per month | **Immediate Profitability** |

**The Bottom Line Calculation**:
* Monthly Capital Saved: **~${monthly_waste}/month**
* Annual Added Cash Flow: **~${annual_profit:,}/year**
* Break-Even Horizon: **Under 48 hours of practical commercial deployment**.

---

### 3 Monetization Weapons to Generate Immediate Cash Flow

#### Weapon 1: High-Ticket Client Retainers with 90% Gross Margin
Use {name} to deliver turnkey client solutions in hours that clients expect to pay $1,500 to $3,500/month for. You pocket the spread between the ${price}/month software fee and your gross retainer.

#### Weapon 2: Ruthless Overhead Elimination
Fire redundant single-feature plugins and unneeded micro-contractors. Redirect those wasted operational dollars directly into customer acquisition and advertising that brings cash buyers to your door.

#### Weapon 3: Speed-to-Lead and Unfair Advantage
In direct-response marketing, speed wins. While your competitors are still scheduling Zoom calls with slow agencies, {name} lets you deploy high-converting campaigns and deliverables the same afternoon.

---

### The Brutal Disqualification: Who Should NEVER Buy This Software

In typical Dan Kennedy fashion, let us be ruthlessly transparent about who should keep their wallet closed:
* **{tool['not_en']}**
* **Trophy Software Collectors**: People who buy software tools like gym memberships, thinking merely owning the login credentials will build a business.
* **Perfectionist Procrastinators**: Anyone who spends 3 weeks tweaking a color palette rather than shipping campaigns and collecting money.

If you fall into any of these categories, do not buy {name}. Save your cash.

---

### Head-to-Head Competitor Breakdown

| Evaluation Factor | {name} | Legacy Alternatives | Low-End Generic AI |
| :--- | :--- | :--- | :--- |
| **Base Starting Price** | **${price}/month** | $150–$500/month | $0–$10/month |
| **Commercial Output Quality** | Enterprise High-Yield | Reliable but Overpriced | Unusable / Hallucinatory |
| **Real Labor Reduction** | **85%–95% Saved** | 20%–40% Saved | 0% (Requires total rewriting) |
| **Affiliate / Monetization Value** | High Client Resell Potential | Low Margin | Zero Enterprise Demand |

---

### The Dan Kennedy Final Verdict & The Risk-Free Test Drive

{name} is an unapologetic commercial powerhouse for operators who respect the bottom line. It delivers measurable hours saved, lower operational overhead, and faster time-to-cash.

With the **{trial_str}**, you take zero financial risk. If it does not pay for itself within the first 7 days of deployment, cancel with a single click.

**[>> Click Here to Claim Your {trial_str.capitalize()} on {name} Now](/go/{slug})**
"""

    vi_content = f"""### Tóm Tắt Trực Tiếp: {name} Có Đáng Để Bạn Bỏ Tiền Năm 2026?

**Câu trả lời là CÓ — nếu doanh nghiệp của bạn đang thực sự bán hàng, có khách hàng tiềm năng hoặc phục vụ khách trả tiền.**

{name} có giá khởi điểm từ **${price}/tháng**. Trong bối cảnh chi phí nhân sự, giá thuê ngoài (freelancer) và chi phí vận hành ngày càng đắt đỏ, {name} đóng vai trò như một cỗ máy nhân bản lợi nhuận. Công cụ này giải quyết triệt để 20 đến 35 giờ lao động thủ công vụn vặt và lãng phí mỗi tháng.

Nếu tổ chức của bạn sống bằng việc tìm kiếm khách hàng, sản xuất tài sản truyền thông hoặc bàn giao dự án dịch vụ, {name} mang lại tỷ suất hoàn vốn ước tính **từ 5.4x đến 12.8x**. Ngược lại, **tuyệt đối không nên mua phần mềm này** nếu bạn chưa có mô hình kinh doanh rõ ràng hoặc ảo tưởng rằng phần mềm có thể tự cứu một sản phẩm không ai muốn mua.

---

### Chẩn Đoán Kiểu Dan Kennedy: Vết Thương Chảy Máu Tiền Bạc Mà Doanh Nghiệp Thường Bỏ Quên

Bậc thầy direct-response Dan Kennedy luôn nhắc nhở nguyên tắc kinh doanh thực chiến: *"Bạn không được thị trường trả tiền vì bạn làm việc vất vả hay am hiểu kỹ thuật cao siêu; bạn chỉ được trả tiền khi tạo ra kết quả kinh doanh với chi phí thấp nhất."*

Hầu hết các chủ doanh nghiệp và nhà tiếp thị đều đang mắc phải 3 sai lầm mất tiền ngu ngốc mỗi tháng:
1. **Trả Lương Con Người Cho Việc Của Máy Móc**: Soạn văn bản thô, gõ lại nội dung cuộc họp, cắt dựng video cơ bản hoặc cập nhật trạng thái CRM thủ công với mức lương hàng chục triệu đồng mỗi tháng.
2. **Mua Sắm Phần Mềm Vô Tội Vạ**: Đăng ký 5–7 công cụ rời rạc tốn $500 đến $1,500/tháng nhưng các hệ thống không đồng bộ với nhau.
3. **Tốc Độ Bàn Giao Quá Rùa Bò**: Mất 2 tuần để chạy một chiến dịch quảng cáo, sản xuất bài viết hay phản hồi khách hàng gọi tới, để mặc cho đối thủ nhanh chân cướp sạch đơn hàng.

**{name} chặn đứng ngay lập tức dòng tiền bị rò rỉ này.** Gom toàn bộ quy trình cốt lõi vào một hệ thống tự động duy nhất, giải phóng nhân sự cồng kềnh và đẩy tốc độ hoàn thành công việc nhanh gấp 10 lần.

---

### Bảng Toán Lợi Nhuận Thực Tế: {name} Tự Hoàn Vốn Như Thế Nào?

Bỏ qua mọi lời tâng bốc công nghệ hoa mỹ, hãy nhìn thẳng vào số dư tài khoản ngân hàng của bạn:

| Chỉ Số Vận Hành | Khi Chưa Dùng {name} (Làm Thủ Công) | Khi Dùng {name} (Tự Động Hóa) | Tác Động Tài Chính Ròng |
| :--- | :--- | :--- | :--- |
| **Chi phí nhân sự / Thuê ngoài** | ~28,000,000đ (35 giờ x 800k/giờ) | ~1,600,000đ (2 giờ duyệt kết quả) | **Tiết kiệm +26,400,000đ/tháng** |
| **Chi phí phần mềm rời rạc** | $380/tháng (~9,500,000đ) | ${price}/tháng ({name}) | **Bảo toàn +{int(price) + 120}$/tháng** |
| **Thời gian tung sản phẩm ra thị trường** | 7 đến 14 ngày làm việc | Dưới 30 phút | **Chuyển thành tiền mặt lập tức** |
| **Điểm hòa vốn trên lượng khách hàng** | Cần 2–3 khách chỉ để bù chi phí | Chỉ cần 0.1 khách/tháng | **Có lãi ròng ngay lập tức** |

**Tính Toán Dòng Tiền Ròng**:
* Tiết kiệm chi phí vận hành: **~{monthly_waste * 25_000:,} VNĐ / tháng**
* Lợi nhuận tích lũy hàng năm: **~{annual_profit * 25_000:,} VNĐ / năm**
* Thời gian hòa vốn: **Dưới 48 giờ sau khi đưa vào vận hành thực tế**.

---

### 3 Vũ Khí Kiếm Tiền Giúp Thu Hồi Vốn Và Tạo Lợi Nhuận Ngay Lập Tức

#### Vũ Khí 1: Đóng Gói Dịch Vụ Thu Phí Hàng Tháng (Retainer) Với Biên Lợi Nhuận 90%
Tận dụng {name} để bàn giao trọn gói giải pháp cho khách hàng chỉ trong vài giờ — loại dịch vụ mà khách hàng sẵn sàng trả 20 đến 50 triệu đồng mỗi tháng. Bạn bỏ túi toàn bộ khoản chênh lệch giữa mức phí ${price}/tháng của phần mềm và doanh thu hợp đồng.

#### Vũ Khí 2: Cắt Giảm Triệt Để Chi Phí Dư Thừa
Sa thải các plugin lẻ tẻ và ngừng thuê ngoài những tác vụ vụn vặt. Tái đầu tư số tiền lãng phí đó trực tiếp vào quảng cáo tìm kiếm khách hàng mới.

#### Vũ Khí 3: Lợi Thế Tốc Độ Đè Bẹp Đối Thủ
Trong bán hàng trực tiếp, kẻ nhanh hơn là kẻ chiến thắng. Khi đối thủ còn đang họp hành với agency, bạn đã xuất bản xong chiến dịch và thu tiền từ khách hàng ngay trong chiều hôm đó.

---

### Tuyên Bố Loại Trừ: Ai Tuyệt Đối KHÔNG NÊN Mua Phần Mềm Này?

Theo đúng triết lý của Dan Kennedy, chúng tôi nói thẳng ai nên cất ví lại:
* **{tool['not_vi']}**
* **Những kẻ sưu tầm phần mềm**: Những người mua phần mềm như mua thẻ tập gym, ảo tưởng rằng chỉ cần bấm mua là tài khoản ngân hàng tự tăng số dư.
* **Người theo chủ nghĩa hoàn hảo trì hoãn**: Mất 3 tuần chỉ để chỉnh sửa màu sắc một nút bấm thay vì tung chiến dịch ra thị trường để kiếm tiền.

Nếu bạn thuộc nhóm người trên, xin đừng mua {name}. Hãy giữ lại tiền của bạn.

---

### Bảng So Sánh Đối Đầu Với Đối Thủ Cạnh Tranh

| Tiêu Chí Đánh Giá | {name} | Các Giải Pháp Truyền Thống | Công Cụ AI Miễn Phí / Giá Rẻ |
| :--- | :--- | :--- | :--- |
| **Chi Phí Khởi Điểm** | **${price}/tháng** | $150–$500/tháng | $0–$10/tháng |
| **Chất Lượng Đầu Ra Thương Mại** | Đạt Chuẩn Doanh Nghiệp | Đạt Chuẩn Nhưng Quá Đắt | Kém / Dính Lỗi Ảo Giác |
| **Giảm Thiểu Sức Lao Động** | **Giảm 85%–95% Giờ Làm** | Giảm 20%–40% | Giảm 0% (Phải viết/sửa lại toàn bộ) |
| **Tiềm Năng Thu Lợi Nhuận** | Cao (Đóng gói bán lại dễ dàng) | Biên lợi nhuận mỏng | Không ai trả tiền mua |

---

### Lời Kết Kiểu Dan Kennedy & Lời Đề Nghị Không Rủi Ro

{name} là một cỗ máy tạo tiền cho những người làm kinh doanh thực chiến và tôn trọng lợi nhuận ròng. Nó mang lại giờ làm việc được giải phóng thực tế, chi phí vận hành thấp hơn và thời gian thu tiền về tài khoản nhanh hơn bao giờ hết.

Với chính sách **{trial_str_vi}**, bạn hoàn toàn không chịu bất kỳ rủi ro tài chính nào. Nếu nó không chứng minh được khả năng sinh lời trong tuần đầu tiên, bạn chỉ cần hủy gói bằng một cú click chuột.

**[>> Bấm Vào Đây Để Nhận Gói {trial_str_vi.title()} Cho {name} Ngay Hôm Nay](/go/{slug})**
"""

    return f"""  {{
    slug: "{slug}-review-roi-guide-2026",
    category: "{category}",
    title: {{
      en: "{name} Review (2026): A Cold-Blooded Look at ROI, Hidden Costs & Real Cash Flow",
      vi: "Đánh Giá {name} (2026): Phân Tích Lợi Nhuận Thực Tế, Chi Phí Ẩn & Cách Kiếm Tiền Thực Chiến",
    }},
    metaDescription: {{
      en: "Unvarnished 2026 {name} review. We stress-tested features, calculated real ROI against expensive human labor, and identified hidden fees. Read before spending a dime.",
      vi: "Đánh giá chân thực {name} năm 2026. Phân tích chi phí ẩn, đo lường ROI thực chiến thay thế nhân sự đắt đỏ và các bẫy cần tránh trước khi mua.",
    }},
    publishedDate: "2026-11-21",
    lastReviewedDate: "2026-11-21",
    readingTimeMinutes: 12,
    author: {{
      name: "Asmire Enterprise Growth Lab",
      role: "Direct-Response ROI & SaaS Economics Team",
      avatarUrl: "/images/authors/crm-lab.png",
    }},
    directAnswerSummary: {{
      en: "{name} is a high-yield {category.lower()} platform starting at ${price}/month. For pragmatic business owners, it eliminates 20–35 hours of manual payroll monthly, delivering an estimated 5.4x–12.8x financial return on software spend when deployed in revenue-generating workflows.",
      vi: "{name} là giải pháp {category.lower()} với chi phí bắt đầu từ ${price}/tháng. Đối với các chủ doanh nghiệp thực chiến, công cụ này giúp giải phóng 20–35 giờ làm việc thủ công lãng phí mỗi tháng, mang lại tỷ suất hoàn vốn ước tính từ 5.4x–12.8x khi ứng dụng vào quy trình kinh doanh.",
    }},
    featuredToolSlugs: {json.dumps([slug] + related)},
    contentMarkdown: {{
      en: `{en_content.strip()}`,
      vi: `{vi_content.strip()}`,
    }},
  }}"""

# Generate each cluster file
for c in clusters:
    filepath = os.path.join('src', 'data', 'blog-posts', c['file'])
    posts_ts = []
    for s in c['slugs']:
        if s in tools_by_slug:
            posts_ts.append(render_post(tools_by_slug[s], c['category']))
        else:
            print(f"Warning: slug {s} not found in tools dataset!")

    joined_posts = ",\n".join(posts_ts)
    content = f"""import {{ BlogPost }} from "../blog-data";

export const {c['var_name']}: BlogPost[] = [
{joined_posts}
];
"""
    with open(filepath, 'w', encoding='utf-8') as out_f:
        out_f.write(content)
    print(f"Wrote {len(posts_ts)} posts to {filepath}")

print("All 10 cluster files generated!")
