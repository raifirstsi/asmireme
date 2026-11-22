# -*- coding: utf-8 -*-
"""
Specification and Ingestion of 20 Elite AI Tools from AIToolsRecap (https://aitoolsrecap.com/AITools.aspx)
Brings Asmire from 80 tools to 100 tools!
"""

import os
import re
import json
import urllib.request

RECAP_20_TOOLS = [
    {
        "slug": "chatgpt",
        "name": "ChatGPT Plus / Team",
        "tagline_en": "OpenAI flagship conversational assistant with GPT-4o, canvas reasoning, and custom GPT ecosystems.",
        "tagline_vi": "Trợ lý AI đàm thoại hàng đầu của OpenAI tích hợp GPT-4o, canvas tương tác và kho ứng dụng Custom GPTs.",
        "desc_en": "ChatGPT is the ubiquitous conversational AI platform powered by OpenAI, offering multimodal vision, deep reasoning with o1, real-time voice, and coding canvas for global teams.",
        "desc_vi": "ChatGPT là nền tảng AI đàm thoại phổ biến nhất thế giới từ OpenAI, hỗ trợ thị giác máy tính, tư duy suy luận sâu với mô hình o1, giọng nói thời gian thực và canvas lập trình.",
        "directAnswer_en": "ChatGPT by OpenAI is the premier all-purpose generative AI assistant. It provides multimodal chat, data analysis, DALL-E 3 image generation, and canvas collaboration. Offers a free tier with GPT-4o mini, with Plus at $20/month and Team at $25/seat/month.",
        "directAnswer_vi": "ChatGPT của OpenAI là trợ lý trí tuệ nhân tạo toàn diện số một hiện nay. Phần mềm hỗ trợ phân tích dữ liệu chuyên sâu, vẽ ảnh DALL-E 3, canvas làm việc nhóm và kho bot tùy biến. Cung cấp gói miễn phí với GPT-4o mini, gói Plus giá $20/tháng và gói Team $25/tháng.",
        "hubs": ["research-agent", "content-seo"],
        "tags": ["ChatGPT", "OpenAI", "GPT-4o", "Multimodal", "AI Assistant"],
        "startingPrice": 20,
        "hasFreePlan": True,
        "hasFreeTrial": False,
        "trialDays": 0,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://chatgpt.com/?via={code}",
        "adminAffiliateUrl": "https://chatgpt.com/?via=asmire_admin",
        "rating": 4.9,
        "reviewCount": 24500,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Professionals, writers, students, and businesses seeking an all-in-one conversational AI partner for brainstorming, analysis, and drafting.",
        "bestFor_vi": "Chuyên gia, người viết lách, học sinh sinh viên và doanh nghiệp cần một cộng sự AI toàn năng để lên ý tưởng, phân tích và soạn thảo.",
        "notFor_en": "Teams requiring fully on-premise air-gapped local model execution without cloud connectivity.",
        "notFor_vi": "Các đơn vị bắt buộc phải vận hành mô hình cục bộ ngoại tuyến tuyệt đối không kết nối internet.",
        "bottomLine_en": "The indispensable foundation of modern generative AI, setting the industry benchmark for multimodal reasoning and conversational speed.",
        "bottomLine_vi": "Nền tảng trụ cột không thể thiếu của kỷ nguyên AI tạo sinh, đặt ra tiêu chuẩn toàn ngành về tốc độ phản hồi và năng lực suy luận.",
        "pros_en": [
            "Leading multimodal reasoning capabilities with GPT-4o and OpenAI o1",
            "Advanced Data Analysis engine executes Python code and visualizes charts instantly",
            "Canvas interface allows collaborative side-by-side editing of text and code",
            "Access to thousands of specialized community GPTs in the GPT Store"
        ],
        "pros_vi": [
            "Năng lực tư duy đa phương thức dẫn đầu thị trường với mô hình GPT-4o và OpenAI o1",
            "Trình phân tích dữ liệu nâng cao tự chạy code Python và trực quan hóa biểu đồ trực tiếp",
            "Giao diện Canvas cho phép chỉnh sửa văn bản và mã nguồn song song trực quan",
            "Truy cập hàng ngàn trợ lý chuyên biệt từ cộng đồng trong kho GPT Store"
        ],
        "cons_en": [
            "Advanced reasoning models have message caps during peak global hours",
            "Enterprise data privacy guarantees require Team or Enterprise subscription tiers"
        ],
        "cons_vi": [
            "Các mô hình suy luận sâu có giới hạn số lượng tin nhắn trong khung giờ cao điểm",
            "Cam kết bảo mật dữ liệu doanh nghiệp không dùng để huấn luyện đòi hỏi gói Team hoặc Enterprise"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["GPT-4o mini access", "Limited GPT-4o access", "Data analysis", "Custom GPT browsing"]},
            {"name": "Plus", "priceMonthly": 20, "priceAnnualMonthly": 20, "features": ["Full GPT-4o access", "OpenAI o1 reasoning", "DALL-E 3 image generation", "Canvas workspace"], "isPopular": True},
            {"name": "Team", "priceMonthly": 30, "priceAnnualMonthly": 25, "features": ["Higher message caps", "Admin workspace console", "Zero data training on business inputs", "Shared GPTs"]}
        ],
        "officialUrl": "https://chatgpt.com",
        "alternatives": ["claude-ai", "perplexity", "grok"],
        "domain": "chatgpt.com",
        "g2": "chatgpt",
        "ph": "chatgpt",
        "reddit": "r/ChatGPT"
    },
    {
        "slug": "claude-ai",
        "name": "Claude AI (Anthropic)",
        "tagline_en": "Anthropic's premier AI assistant featuring Claude 3.5 Sonnet, 200K token context, and Artifacts visual execution.",
        "tagline_vi": "Trợ lý AI ưu việt của Anthropic với mô hình Claude 3.5 Sonnet, ngữ cảnh 200K token và giao diện Artifacts trực quan.",
        "desc_en": "Claude is Anthropic's flagship generative assistant, praised across the engineering and research community for its nuanced prose, superior code generation, and interactive Artifacts canvas.",
        "desc_vi": "Claude là trợ lý AI thế hệ mới từ Anthropic, được cộng đồng lập trình viên và nhà nghiên cứu đánh giá cao nhờ văn phong tự nhiên, khả năng viết code chuẩn xác và giao diện Artifacts tương tác cao.",
        "directAnswer_en": "Claude by Anthropic is the industry benchmark for complex programming, nuanced long-form writing, and extensive document analysis with a 200K token context window. Its Artifacts feature runs interactive React widgets, SVG graphics, and full HTML applications inline. Free tier available; Pro plan is $20/month.",
        "directAnswer_vi": "Claude của Anthropic là thước đo hàng đầu về lập trình phần mềm, viết văn phong tự nhiên và phân tích tài liệu dài với cửa sổ ngữ cảnh lên tới 200.000 token. Tính năng Artifacts hiển thị và chạy ứng dụng React, SVG và mã nguồn trực tiếp. Có gói miễn phí; gói Pro giá $20/tháng.",
        "hubs": ["research-agent", "content-seo"],
        "tags": ["Claude", "Anthropic", "Sonnet 3.5", "Artifacts", "Long Context"],
        "startingPrice": 20,
        "hasFreePlan": True,
        "hasFreeTrial": False,
        "trialDays": 0,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://claude.ai/?via={code}",
        "adminAffiliateUrl": "https://claude.ai/?via=asmire_admin",
        "rating": 4.9,
        "reviewCount": 16800,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Software engineers, technical writers, researchers, and creators demanding exceptional coding logic and human-like writing tone.",
        "bestFor_vi": "Kỹ sư phần mềm, nhà văn kỹ thuật, nhà nghiên cứu và người sáng tạo nội dung cần logic lập trình xuất sắc và giọng văn mượt mà.",
        "notFor_en": "Users looking primarily for built-in text-to-image art generation (requires external image tools).",
        "notFor_vi": "Người dùng có nhu cầu chính là vẽ tranh minh họa AI từ câu lệnh (cần dùng kèm công cụ tạo ảnh riêng).",
        "bottomLine_en": "Widely acknowledged by developers as the sharpest coding model and most eloquent prose writer in the entire AI ecosystem.",
        "bottomLine_vi": "Được cộng đồng lập trình viên quốc tế công nhận là mô hình viết code chuẩn xác nhất và có văn phong tự nhiên nhất hiện nay.",
        "pros_en": [
            "Top-tier coding performance with Claude 3.5 Sonnet outperforming competing models on SWE-bench",
            "Artifacts pane renders interactive UI mockups, games, and markdown documents beside the chat",
            "Enormous 200,000-token context window can digest entire codebases and books in one prompt",
            "Remarkably articulate, human-sounding writing tone that avoids robotic clichés"
        ],
        "pros_vi": [
            "Hiệu suất viết code hàng đầu thế giới với Claude 3.5 Sonnet vượt qua các bài kiểm chuẩn SWE-bench",
            "Cửa sổ Artifacts hiển thị bản dựng giao diện UI, trò chơi mini và tài liệu tương tác ngay cạnh khung chat",
            "Ngữ cảnh khổng lồ 200.000 token có thể đọc hiểu toàn bộ kho mã nguồn hoặc cuốn sách chỉ trong 1 câu lệnh",
            "Văn phong tự nhiên, sâu sắc, không bị rập khuôn hay máy móc như các mô hình AI thông thường"
        ],
        "cons_en": [
            "Usage limits on the Pro plan can be reached quickly during heavy multi-turn coding sessions",
            "No native image generation capability (focuses strictly on text, code, and vision analysis)"
        ],
        "cons_vi": [
            "Hạn mức lượt dùng của gói Pro có thể hết nhanh khi làm việc liên tục với các dự án code lớn",
            "Không có tính năng sinh ảnh trực tiếp từ văn bản (tập trung tối đa vào văn bản, code và đọc ảnh)"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["Claude 3.5 Sonnet access", "Web, iOS & Android apps", "Artifacts viewer", "Vision analysis"]},
            {"name": "Pro", "priceMonthly": 20, "priceAnnualMonthly": 20, "features": ["5x more usage than free", "Claude 3.5 Sonnet & Opus access", "Priority access during peak traffic", "Early access to new features"], "isPopular": True},
            {"name": "Team", "priceMonthly": 30, "priceAnnualMonthly": 25, "features": ["Higher usage limits per user", "Centralized billing & member management", "Early access to collaboration features"]}
        ],
        "officialUrl": "https://claude.ai",
        "alternatives": ["chatgpt", "perplexity", "cursor"],
        "domain": "claude.ai",
        "g2": "claude",
        "ph": "claude-ai",
        "reddit": "r/ClaudeAI"
    },
    {
        "slug": "midjourney",
        "name": "Midjourney",
        "tagline_en": "The world's premier generative art engine celebrated for unmatched aesthetic depth, lighting, and cinematic realism.",
        "tagline_vi": "Cỗ máy vẽ tranh AI số một thế giới nổi tiếng với chiều sâu nghệ thuật, ánh sáng đỉnh cao và độ chân thực điện ảnh.",
        "desc_en": "Midjourney generates breathtaking visual compositions from text prompts. Trusted by creative directors, game concept artists, and Hollywood production teams for supreme photorealism.",
        "desc_vi": "Midjourney sản xuất các tác phẩm hình ảnh ngoạn mục từ mô tả văn bản. Được các giám đốc sáng tạo, nghệ sĩ thiết kế game và đoàn làm phim Hollywood tin dùng vì chất lượng ánh sáng điện ảnh.",
        "directAnswer_en": "Midjourney v6.1 is universally recognized as the aesthetic pinnacle of generative text-to-image software. Accessible via Discord and its dedicated web creation interface, it excels at cinematic portraits, architectural concepts, and photorealistic textures. Paid plans start at $10/month.",
        "directAnswer_vi": "Midjourney v6.1 được công nhận rộng rãi là đỉnh cao thẩm mỹ của phần mềm vẽ tranh AI. Người dùng có thể sử dụng qua Discord hoặc giao diện web riêng biệt, vượt trội trong chân dung điện ảnh, thiết kế kiến trúc và mô phỏng vật liệu chân thực. Giá từ $10/tháng.",
        "hubs": ["advertising", "presentation-design"],
        "tags": ["AI Art", "Midjourney", "Image Generation", "Photorealism", "Concept Art"],
        "startingPrice": 10,
        "hasFreePlan": False,
        "hasFreeTrial": False,
        "trialDays": 0,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://www.midjourney.com/?via={code}",
        "adminAffiliateUrl": "https://www.midjourney.com/?via=asmire_admin",
        "rating": 4.9,
        "reviewCount": 18200,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Creative directors, advertising agencies, concept artists, and photographers looking for maximum aesthetic quality and artistic mood.",
        "bestFor_vi": "Giám đốc sáng tạo, công ty quảng cáo, nghệ sĩ concept và nhiếp ảnh gia tìm kiếm chất lượng thẩm mỹ và cảm xúc thị giác đỉnh cao.",
        "notFor_en": "Users needing exact, non-stylized plain vector diagrams or complex textual typography (Ideogram is better for text).",
        "notFor_vi": "Người dùng cần vẽ sơ đồ kỹ thuật thuần túy hoặc thiết kế chữ viết slogan chuẩn xác (Ideogram phù hợp hơn cho typography).",
        "bottomLine_en": "Still the undisputed gold standard for cinematic beauty, artistic lighting, and evocative visual generation.",
        "bottomLine_vi": "Vẫn là tiêu chuẩn vàng không thể bàn cãi về vẻ đẹp điện ảnh, nghệ thuật ánh sáng và sức biểu đạt thị giác.",
        "pros_en": [
            "Unrivaled aesthetic quality with sophisticated color grading and lighting physics",
            "High-resolution upscaling and localized inpainting via the modern web creation UI",
            "Consistent character parameters (--cref) and style reference flags (--sref)",
            "Active creative community with millions of prompts and shared inspiration"
        ],
        "pros_vi": [
            "Chất lượng thẩm mỹ vượt trội với khả năng phối màu tinh tế và ánh sáng vật lý chân thực",
            "Tính năng phóng to ảnh độ nét cao và chỉnh sửa vùng chọn trực tiếp trên giao diện web hiện đại",
            "Tham số giữ nguyên nhân vật (--cref) và đồng bộ phong cách nghệ thuật (--sref) mạnh mẽ",
            "Cộng đồng sáng tạo hàng đầu thế giới với kho tàng hàng triệu câu lệnh mẫu"
        ],
        "cons_en": [
            "No permanent free tier; requires monthly subscription to generate images",
            "Basic tier generations are publicly viewable on the community feed unless Stealth mode is purchased"
        ],
        "cons_vi": [
            "Không có gói miễn phí vĩnh viễn; người dùng cần đăng ký thuê bao hàng tháng để tạo ảnh",
            "Gói cơ bản sẽ hiển thị ảnh công khai trên bảng tin cộng đồng trừ khi nâng cấp chế độ Stealth"
        ],
        "pricing": [
            {"name": "Basic", "priceMonthly": 10, "priceAnnualMonthly": 8, "features": ["3.3 hours Fast GPU/mo (~200 images)", "General commercial terms", "Access to member gallery"]},
            {"name": "Standard", "priceMonthly": 30, "priceAnnualMonthly": 24, "features": ["15 hours Fast GPU/mo", "Unlimited Relax GPU generations", "Web creation interface access"], "isPopular": True},
            {"name": "Pro", "priceMonthly": 60, "priceAnnualMonthly": 48, "features": ["30 hours Fast GPU/mo", "Stealth mode (private images)", "12 concurrent Fast jobs"]}
        ],
        "officialUrl": "https://www.midjourney.com",
        "alternatives": ["leonardo-ai", "ideogram", "canva-ai"],
        "domain": "midjourney.com",
        "g2": "midjourney",
        "ph": "midjourney",
        "reddit": "r/midjourney"
    },
    {
        "slug": "grok",
        "name": "Grok (xAI)",
        "tagline_en": "xAI's real-time frontier reasoning model with direct access to live X social data and uninhibited search synthesis.",
        "tagline_vi": "Mô hình AI thế hệ mới từ xAI với khả năng truy cập dữ liệu mạng xã hội X theo thời gian thực và tổng hợp tin tức trực tiếp.",
        "desc_en": "Grok is developed by Elon Musk's xAI, featuring real-time understanding of breaking world news, witty conversational engagement, and advanced coding intelligence natively integrated into X.",
        "desc_vi": "Grok được phát triển bởi xAI (Elon Musk), nổi bật với khả năng nắm bắt tin tức thời sự nóng hổi trong từng giây, phản hồi sắc bén và năng lực lập trình mạnh mẽ tích hợp trong mạng xã hội X.",
        "directAnswer_en": "Grok is xAI's flagship artificial intelligence assistant. What sets Grok apart from other models is its instantaneous connection to the live public conversation on X (Twitter), allowing it to analyze trending topics and breaking stories as they unfold. Included in X Premium plans starting at $8/month.",
        "directAnswer_vi": "Grok là trợ lý trí tuệ nhân tạo chủ lực của xAI. Khác biệt lớn nhất của Grok so với các mô hình khác là khả năng kết nối trực tiếp với dòng thảo luận công khai trên mạng xã hội X theo thời gian thực, cho phép phân tích sự kiện nóng ngay khi vừa diễn ra. Đi kèm gói X Premium từ $8/tháng.",
        "hubs": ["research-agent"],
        "tags": ["Grok", "xAI", "Real-Time AI", "X Intelligence", "Breaking News"],
        "startingPrice": 8,
        "hasFreePlan": True,
        "hasFreeTrial": False,
        "trialDays": 0,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://x.ai/?via={code}",
        "adminAffiliateUrl": "https://x.ai/?via=asmire_admin",
        "rating": 4.7,
        "reviewCount": 9400,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Journalists, financial traders, tech enthusiasts, and researchers who need live updates and public sentiment analysis on breaking global events.",
        "bestFor_vi": "Nhà báo, nhà đầu tư tài chính, người yêu công nghệ và nhà nghiên cứu cần cập nhật tức thì diễn biến thị trường và dư luận thế giới.",
        "notFor_en": "Corporate teams seeking traditional strict corporate compliance safeguards and sanitized outputs.",
        "notFor_vi": "Doanh nghiệp yêu cầu các bộ lọc kiểm duyệt ngôn từ cực kỳ khắt khe theo chuẩn hành chính cũ.",
        "bottomLine_en": "The fastest AI for breaking news and social sentiment, backed by xAI's immense Colossus supercomputer cluster.",
        "bottomLine_vi": "Trợ lý AI nhanh nhất để nắm bắt tin tức nóng và xu hướng xã hội, được hậu thuẫn bởi cụm siêu máy tính khổng lồ Colossus của xAI.",
        "pros_en": [
            "Instantaneous access to real-time events, posts, and breaking discussions across X",
            "Fun Mode offers sharp, engaging wit while Regular Mode delivers rigorous analytical reasoning",
            "Strong coding, mathematical problem solving, and document ingestion via Grok-2",
            "Generative image creation capabilities powered by Flux-1 integration"
        ],
        "pros_vi": [
            "Truy cập tức thì vào diễn biến thời sự, bài đăng và thảo luận thời gian thực trên toàn cầu",
            "Chế độ Fun Mode phản hồi hài hước thú vị song song với Regular Mode suy luận logic chặt chẽ",
            "Năng lực lập trình, giải toán và phân tích tài liệu văn bản mạnh mẽ trên mô hình Grok-2",
            "Khả năng tạo hình ảnh AI ấn tượng nhờ tích hợp công nghệ Flux-1"
        ],
        "cons_en": [
            "Full feature set requires an active X Premium subscription",
            "Real-time social data can occasionally pick up early unverified rumors during fast-moving events"
        ],
        "cons_vi": [
            "Để trải nghiệm đầy đủ các tính năng nâng cao cần có tài khoản X Premium",
            "Dữ liệu mạng xã hội trực tiếp đôi khi có thể phản ánh tin đồn chưa được kiểm chứng trong các sự kiện mới phát sinh"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["Basic Grok queries on web", "Standard rate limits", "Text responses", "Community access"]},
            {"name": "X Premium", "priceMonthly": 8, "priceAnnualMonthly": 7, "features": ["Full Grok-2 access", "Real-time search synthesis", "Flux-1 image generation", "Verified checkmark on X"], "isPopular": True},
            {"name": "Premium+", "priceMonthly": 16, "priceAnnualMonthly": 14, "features": ["Largest Grok context window", "Zero ads on X feed", "Highest generation speeds", "Priority API access"]}
        ],
        "officialUrl": "https://x.ai",
        "alternatives": ["perplexity", "chatgpt", "claude-ai"],
        "domain": "x.ai",
        "g2": "grok",
        "ph": "grok",
        "reddit": "r/Grok"
    },
    {
        "slug": "deepseek",
        "name": "DeepSeek R1",
        "tagline_en": "Open-weights reasoning powerhouse delivering frontier-grade chain-of-thought logic at a fraction of inference cost.",
        "tagline_vi": "Mô hình suy luận mã nguồn mở đột phá mang lại logic chuỗi tư duy cấp cao với chi phí vận hành siêu tối ưu.",
        "desc_en": "DeepSeek R1 represents a seismic breakthrough in open AI models, rivaling proprietary reasoning models in mathematics, software development, and deep multi-step logic through reinforcement learning.",
        "desc_vi": "DeepSeek R1 là bước ngoặt công nghệ lớn trong làng AI mã nguồn mở, sánh ngang các mô hình thương mại hàng đầu về toán học, lập trình và suy luận logic đa bước thông qua kỹ thuật học tăng cường.",
        "directAnswer_en": "DeepSeek R1 is the open-architecture reasoning model created by DeepSeek. Using pure reinforcement learning without supervised warm-up, it produces transparent chain-of-thought outputs for math, logic, and coding challenges. Available free on web and mobile, with ultra-affordable API pricing.",
        "directAnswer_vi": "DeepSeek R1 là mô hình suy luận kiến trúc mở do DeepSeek phát triển. Bằng việc ứng dụng học tăng cường độc lập, mô hình hiển thị minh bạch toàn bộ chuỗi suy nghĩ logic trước khi đưa ra câu trả lời cho các bài toán hóc búa và bài toán lập trình. Hoàn toàn miễn phí trên web và di động kèm chi phí API cực kỳ tiết kiệm.",
        "hubs": ["research-agent"],
        "tags": ["DeepSeek", "Reasoning Model", "Open Weights", "Math & Code", "Reinforcement Learning"],
        "startingPrice": 0,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 30,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://www.deepseek.com/?via={code}",
        "adminAffiliateUrl": "https://www.deepseek.com/?via=asmire_admin",
        "rating": 4.8,
        "reviewCount": 14200,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Software engineers, data scientists, students, and businesses looking for transparent reasoning and radically low API inference costs.",
        "bestFor_vi": "Kỹ sư phần mềm, nhà khoa học dữ liệu, học sinh sinh viên và doanh nghiệp tìm kiếm năng lực suy luận minh bạch với chi phí API tối ưu nhất.",
        "notFor_en": "Users looking for high-end cinematic video or image synthesis directly inside the tool.",
        "notFor_vi": "Người dùng cần tạo video hoặc vẽ tranh minh họa đồ họa cao cấp ngay trong ứng dụng.",
        "bottomLine_en": "The open-weights reasoning sensation that proved frontier-class logic can be made accessible and affordable to everyone.",
        "bottomLine_vi": "Hiện tượng công nghệ mở chứng minh năng lực suy luận hàng đầu thế giới hoàn toàn có thể tiếp cận miễn phí và bình dân cho tất cả mọi người.",
        "pros_en": [
            "Shows transparent chain-of-thought thought process, enabling users to verify reasoning step by step",
            "Exceptional performance in complex algorithm design, competitive programming, and higher mathematics",
            "Generous free web and mobile app access with zero subscription walls for standard usage",
            "Disruptively low API token pricing (over 90% cheaper than legacy closed frontier models)"
        ],
        "pros_vi": [
            "Hiển thị minh bạch toàn bộ chuỗi suy nghĩ từng bước giúp người dùng kiểm tra độ chính xác của lập luận",
            "Hiệu suất vượt trội trong thiết kế thuật toán phức tạp, giải đề lập trình thi đấu và toán học cao cấp",
            "Truy cập hoàn toàn miễn phí trên nền tảng web và ứng dụng di động không bắt buộc trả phí",
            "Giá API token rẻ hơn tới hơn 90% so với các mô hình đóng truyền thống trên thị trường"
        ],
        "cons_en": [
            "Occasional server busy capacity during global viral traffic surges",
            "Does not feature proprietary native visual canvas or audio streaming features"
        ],
        "cons_vi": [
            "Đôi khi máy chủ có thể phản hồi chậm trong những khung giờ có lượng truy cập đột biến toàn cầu",
            "Chưa tích hợp sẵn các công cụ canvas vẽ trực quan hay xử lý giọng nói thời gian thực như một số ứng dụng trả phí"
        ],
        "pricing": [
            {"name": "Web & Mobile Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["DeepSeek-V3 standard chat", "DeepSeek-R1 deep thinking", "Document search & upload", "Chat history"]},
            {"name": "API Pay-As-You-Go", "priceMonthly": 2, "priceAnnualMonthly": 2, "features": ["$0.14 per 1M input tokens (cache hit)", "$0.55 per 1M input tokens (cache miss)", "$2.19 per 1M output tokens", "OpenAI SDK compatible"], "isPopular": True},
            {"name": "Enterprise Self-Hosted", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["Open weights MIT licensed", "Distilled models (1.5B to 70B)", "Run locally on Ollama/vLLM", "Zero vendor data lock-in"]}
        ],
        "officialUrl": "https://www.deepseek.com",
        "alternatives": ["chatgpt", "claude-ai", "perplexity"],
        "domain": "deepseek.com",
        "g2": "deepseek",
        "ph": "deepseek-r1",
        "reddit": "r/DeepSeek"
    },
    {
        "slug": "descript",
        "name": "Descript",
        "tagline_en": "All-in-one video and podcast editor where you edit audio and video as easily as editing a Google Doc.",
        "tagline_vi": "Phần mềm biên tập video và podcast tất cả trong một cho phép chỉnh sửa video dễ dàng như chỉnh sửa văn bản Word.",
        "desc_en": "Descript revolutionized media editing by transcribing video and audio into a text script. Delete filler words, edit footage by cutting words, clone your voice with Overdub, and publish studio-quality shows.",
        "desc_vi": "Descript cách mạng hóa việc dựng video và podcast bằng cách chuyển toàn bộ âm thanh thành kịch bản chữ. Cắt bỏ từ thừa (ừm, à) chỉ bằng 1 click, sửa video bằng cách xóa chữ và nhân bản giọng nói Overdub thông minh.",
        "directAnswer_en": "Descript is the market leader in document-based video and audio editing. By syncing media timelines directly to a word processor interface, creators can edit video interviews, remove filler words automatically, and generate studio sound. Plans start at $12/month with a free starter tier.",
        "directAnswer_vi": "Descript là phần mềm tiên phong trong việc dựng video và podcast trên giao diện văn bản. Bằng cách đồng bộ dòng thời gian với con chữ, người dùng có thể cắt ghép video, xóa từ ngập ngừng (filler words) chỉ với một cú nhấp chuột và nâng cấp âm thanh chuẩn phòng thu Studio Sound. Giá từ $12/tháng kèm gói miễn phí.",
        "hubs": ["video-avatar", "voice-audio"],
        "tags": ["Video Editing", "Podcast Editor", "Transcription", "Studio Sound", "Filler Word Removal"],
        "startingPrice": 12,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 14,
        "affiliateNetwork": "Rewardful",
        "affiliateUrlTemplate": "https://www.descript.com/?via={code}",
        "adminAffiliateUrl": "https://www.descript.com/?via=asmire_admin",
        "rating": 4.8,
        "reviewCount": 7800,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Podcasters, YouTubers, course creators, and corporate comms teams seeking 10x faster video and audio editing without timeline complexity.",
        "bestFor_vi": "Podcaster, YouTuber, giảng viên làm khóa học và đội ngũ truyền thông muốn dựng video nhanh hơn gấp 10 lần mà không cần phần mềm phức tạp.",
        "notFor_en": "Hollywood visual effects artists requiring 3D compositing, particle simulation, and advanced multi-camera color grading.",
        "notFor_vi": "Chuyên viên kỹ xảo điện ảnh cần hiệu ứng 3D phức tạp, hạt chuyển động và chỉnh màu đa góc quay chuyên sâu.",
        "bottomLine_en": "The most intuitive and productive video/podcast editing tool created in the last decade, turning complex timelines into simple text documents.",
        "bottomLine_vi": "Công cụ dựng video và podcast trực quan và năng suất nhất trong thập kỷ qua, biến các timeline rối rắm thành tài liệu văn bản quen thuộc.",
        "pros_en": [
            "Text-based media editing: cut, copy, and delete video clips simply by editing the transcript",
            "Studio Sound feature removes background noise and room echo with a single toggle",
            "Automatic 1-click filler word removal (removes 'um', 'uh', 'like' across hours of footage)",
            "AI Voice cloning (Overdub) allows fixing misspoken sentences by typing new words"
        ],
        "pros_vi": [
            "Chỉnh sửa video trên văn bản: cắt, ghép và xóa đoạn video chỉ bằng cách bôi đen và xóa chữ",
            "Tính năng Studio Sound lọc sạch tiếng ồn xung quanh và tiếng vang phòng chỉ với một nút gạt",
            "Tự động phát hiện và xóa sạch các từ ngập ngừng, ậm ừ (um, uh) trong toàn bộ buổi thu âm chỉ trong vài giây",
            "Nhân bản giọng nói AI (Overdub) cho phép sửa lại câu nói sai bằng cách gõ văn bản mới mà không cần thu âm lại"
        ],
        "cons_en": [
            "Heavy desktop application can require significant RAM on lengthy 4K multi-track projects",
            "Automated transcription requires a quick manual review on complex technical terminology"
        ],
        "cons_vi": [
            "Ứng dụng máy tính đòi hỏi dung lượng RAM tương đối khi xử lý các dự án video 4K nhiều góc quay dài hàng giờ",
            "Bản chép lời tự động cần kiểm tra lại đối với các thuật ngữ chuyên môn quá đặc thù"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["1 transcription hour/mo", "720p watermark-free export", "Studio Sound basic", "Trial of AI features"]},
            {"name": "Hobbyist", "priceMonthly": 19, "priceAnnualMonthly": 12, "features": ["10 transcription hours/mo", "4K watermark-free export", "Unlimited Studio Sound", "Full filler word removal"], "isPopular": True},
            {"name": "Creator", "priceMonthly": 35, "priceAnnualMonthly": 24, "features": ["30 transcription hours/mo", "Eye contact correction", "AI green screen", "Full custom voice cloning"]}
        ],
        "officialUrl": "https://www.descript.com",
        "alternatives": ["submagic", "opusclip", "invideo"],
        "domain": "descript.com",
        "g2": "descript",
        "ph": "descript",
        "reddit": "r/Descript"
    },
    {
        "slug": "n8n",
        "name": "n8n (AI Agent Workflows)",
        "tagline_en": "Fair-code workflow automation platform that gives engineering teams complete control to build autonomous multi-agent systems.",
        "tagline_vi": "Nền tảng tự động hóa quy trình mã nguồn mở trao quyền tối thượng cho lập trình viên xây dựng hệ thống AI Agent tự trị.",
        "desc_en": "n8n is the developer-friendly alternative to Zapier, allowing teams to self-host or cloud-deploy complex automation workflows integrating LangChain nodes, vector stores, and autonomous AI agents.",
        "desc_vi": "n8n là giải pháp tự động hóa thay thế Zapier dành cho lập trình viên, cho phép tự lưu trữ (self-host) hoặc chạy đám mây các luồng xử lý phức tạp kết hợp LangChain, cơ sở dữ liệu vector và AI Agent tự hành.",
        "directAnswer_en": "n8n is an advanced workflow automation platform built specifically for technical teams and AI engineers. Unlike rigid no-code tools, n8n supports custom JavaScript/Python execution, native LangChain nodes, and self-hosted on-premise deployments. Cloud plans start at $20/month with a free self-hosted edition.",
        "directAnswer_vi": "n8n là nền tảng tự động hóa quy trình chuyên sâu dành cho đội ngũ kỹ thuật và kỹ sư AI. Khác với các công cụ kéo thả hạn chế, n8n hỗ trợ chạy code JavaScript/Python trực tiếp, tích hợp sẵn các nút LangChain và cho phép tự cài đặt trên máy chủ riêng không giới hạn số lượng tác vụ. Giá gói Cloud từ $20/tháng kèm bản tự lưu trữ miễn phí.",
        "hubs": ["research-agent", "meeting-productivity"],
        "tags": ["Workflow Automation", "AI Agents", "Self-Hosted", "LangChain", "Open Source"],
        "startingPrice": 20,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 14,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://n8n.io/?via={code}",
        "adminAffiliateUrl": "https://n8n.io/?via=asmire_admin",
        "rating": 4.9,
        "reviewCount": 6400,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Engineers, DevOps specialists, and automation architects who want full data privacy, unlimited execution power, and deep AI agent integration.",
        "bestFor_vi": "Kỹ sư phần mềm, chuyên viên DevOps và kiến trúc sư tự động hóa cần bảo mật dữ liệu tuyệt đối và khả năng chạy không giới hạn tác vụ.",
        "notFor_en": "Non-technical users who want a simple 2-click consumer mobile app automation.",
        "notFor_vi": "Người dùng không chuyên kỹ thuật muốn cài đặt tự động hóa đơn giản chỉ bằng 2 nút bấm trên điện thoại.",
        "bottomLine_en": "The premier automation orchestrator for modern AI applications, giving you enterprise autonomy without prohibitive per-task pricing.",
        "bottomLine_vi": "Nhạc trưởng tự động hóa số một cho các ứng dụng AI hiện đại, đem lại sự tự chủ tuyệt đối mà không lo hóa đơn đội giá theo từng tác vụ.",
        "pros_en": [
            "Can be fully self-hosted on your own infrastructure with zero per-task billing fees",
            "Native AI nodes including LangChain agent chains, memory, embeddings, and vector stores",
            "Custom JavaScript and Python code execution within any node for complex logic",
            "400+ pre-built connectors for databases, CRMs, APIs, and communication tools"
        ],
        "pros_vi": [
            "Có thể tự lưu trữ (self-host) hoàn toàn trên máy chủ của bạn mà không tốn phí tính theo số lần chạy tác vụ",
            "Tích hợp sẵn các thành phần AI chuyên sâu như chuỗi LangChain, bộ nhớ Agent, vector database và embedding",
            "Cho phép viết trực tiếp code JavaScript và Python tùy biến trong bất kỳ bước xử lý nào",
            "Hơn 400 cổng kết nối dựng sẵn với cơ sở dữ liệu, CRM, API và ứng dụng trao đổi thông tin"
        ],
        "cons_en": [
            "Self-hosting requires server administration, backup management, and monitoring skills",
            "Steeper learning curve for non-developers compared to basic no-code tools"
        ],
        "cons_vi": [
            "Việc tự vận hành trên máy chủ đòi hỏi kiến thức quản trị hệ thống, sao lưu dữ liệu và giám sát",
            "Đòi hỏi tư duy lập trình và xử lý dữ liệu cao hơn so với các phần mềm kéo thả đơn giản"
        ],
        "pricing": [
            {"name": "Community (Self-Hosted)", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["Unlimited workflow runs", "Self-hosted Docker deploy", "All core integrations", "Community support"]},
            {"name": "Cloud Starter", "priceMonthly": 26, "priceAnnualMonthly": 20, "features": ["2,500 executions/mo", "Fully managed cloud hosting", "Automatic updates & backups", "Email support"], "isPopular": True},
            {"name": "Cloud Pro", "priceMonthly": 65, "priceAnnualMonthly": 50, "features": ["10,000 executions/mo", "Custom execution history retention", "Shared credentials", "Priority support"]}
        ],
        "officialUrl": "https://n8n.io",
        "alternatives": ["make", "zapier", "replit"],
        "domain": "n8n.io",
        "g2": "n8n",
        "ph": "n8n",
        "reddit": "r/n8n"
    },
    {
        "slug": "coze",
        "name": "Coze (ByteDance)",
        "tagline_en": "Next-generation AI chatbot and multi-agent development platform by ByteDance with seamless social deployment.",
        "tagline_vi": "Nền tảng phát triển chatbot và AI Agent đa nhiệm thế hệ mới từ ByteDance với khả năng xuất bản đa kênh tức thì.",
        "desc_en": "Coze is an all-in-one AI agent creation platform developed by ByteDance. It allows builders to create intelligent bots using rich plugin libraries, knowledge bases, scheduled workflows, and 1-click publishing to Telegram, Discord, and websites.",
        "desc_vi": "Coze là nền tảng khởi tạo AI Agent toàn diện do ByteDance phát triển. Cho phép người dùng xây dựng bot thông minh sử dụng kho plugin phong phú, cơ sở tri thức riêng, lập lịch tự động và xuất bản chỉ bằng 1 click lên Telegram, Discord và website.",
        "directAnswer_en": "Coze by ByteDance empowers anyone to build sophisticated AI agents without coding. It features access to top LLMs (GPT-4o, Claude 3.5), an expansive library of 60+ tool plugins, custom workflow canvases, and direct deployment to messaging channels. Free to start with paid plans from $9/month.",
        "directAnswer_vi": "Coze của ByteDance trao quyền cho bất kỳ ai xây dựng các trợ lý AI Agent thông minh mà không cần biết viết code. Nền tảng cho phép lựa chọn linh hoạt các mô hình lớn (GPT-4o, Claude 3.5), kho hơn 60 plugin công cụ, giao diện luồng công việc trực quan và xuất bản thẳng lên các ứng dụng nhắn tin. Bắt đầu miễn phí kèm các gói từ $9/tháng.",
        "hubs": ["research-agent"],
        "tags": ["AI Bot Builder", "Multi-Agent", "ByteDance", "Workflow Canvas", "No-Code Bot"],
        "startingPrice": 9,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 14,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://www.coze.com/?via={code}",
        "adminAffiliateUrl": "https://www.coze.com/?via=asmire_admin",
        "rating": 4.7,
        "reviewCount": 5100,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Entrepreneurs, customer service teams, and community managers wanting to deploy powerful interactive AI agents across chat apps in minutes.",
        "bestFor_vi": "Chủ doanh nghiệp, đội ngũ chăm sóc khách hàng và quản lý cộng đồng muốn triển khai trợ lý AI tương tác đa kênh trong vài phút.",
        "notFor_en": "Organizations restricted by compliance policies from using ByteDance cloud infrastructure.",
        "notFor_vi": "Các tổ chức có quy định nội bộ nghiêm ngặt hạn chế hạ tầng đám mây liên quan tới ByteDance.",
        "bottomLine_en": "The most feature-rich visual bot builder available, combining top frontier models with an unmatched ecosystem of ready-to-use plugins.",
        "bottomLine_vi": "Trình tạo bot trực quan phong phú tính năng nhất hiện nay, kết hợp các mô hình hàng đầu với kho plugin tiện ích dựng sẵn phong phú.",
        "pros_en": [
            "Switch flexibly between top models including GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro",
            "Huge library of 60+ official plugins for web browsing, image creation, news, and productivity",
            "Visual workflow canvas for designing multi-step agent reasoning and API calls",
            "One-click deployment directly to Telegram, Discord, Lark, and web embeds"
        ],
        "pros_vi": [
            "Chuyển đổi linh hoạt giữa các mô hình mạnh nhất như GPT-4o, Claude 3.5 Sonnet và Gemini 1.5 Pro",
            "Kho plugin hơn 60 công cụ chính thức hỗ trợ duyệt web, tạo ảnh, tin tức và năng suất công việc",
            "Giao diện luồng công việc trực quan giúp thiết kế các chuỗi suy luận logic và gọi API dễ dàng",
            "Xuất bản bot chỉ với một cú nhấp chuột lên Telegram, Discord, Lark và nhúng trực tiếp vào website"
        ],
        "cons_en": [
            "Free tier token quotas can deplete quickly with high-volume public chat bots",
            "Advanced multi-agent coordination logic requires understanding of variable state passing"
        ],
        "cons_vi": [
            "Hạn mức token miễn phí có thể tiêu hao nhanh nếu bot phục vụ lượng người dùng công khai quá đông",
            "Cần hiểu biết cơ bản về truyền tham số trạng thái khi xây dựng các hệ thống phối hợp nhiều bot"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["Access to GPT-4o & Claude", "Standard plugin library", "Deploy to Telegram & Discord", "Basic knowledge base"]},
            {"name": "Premium", "priceMonthly": 9, "priceAnnualMonthly": 7.5, "features": ["10x daily compute credits", "Advanced workflow triggers", "Larger document upload limit", "Priority customer support"], "isPopular": True},
            {"name": "Team", "priceMonthly": 29, "priceAnnualMonthly": 24, "features": ["Shared team workspaces", "Enterprise analytics dashboard", "Custom domain web widgets", "Role-based permissions"]}
        ],
        "officialUrl": "https://www.coze.com",
        "alternatives": ["pickaxe", "make", "n8n"],
        "domain": "coze.com",
        "g2": "coze",
        "ph": "coze",
        "reddit": "r/Coze"
    },
    {
        "slug": "adobe-firefly",
        "name": "Adobe Firefly",
        "tagline_en": "Commercially safe generative AI engine deeply integrated into Photoshop, Illustrator, and Premiere Pro.",
        "tagline_vi": "Cỗ máy AI tạo hình ảnh an toàn tuyệt đối về bản quyền thương mại tích hợp sâu trong Photoshop, Illustrator và Premiere Pro.",
        "desc_en": "Adobe Firefly is designed specifically for creative professionals. Trained strictly on licensed and public domain content, it powers Generative Fill, Generative Expand, and Text to Vector natively within Creative Cloud.",
        "desc_vi": "Adobe Firefly được thiết kế chuyên biệt cho giới làm nghề sáng tạo chuyên nghiệp. Được huấn luyện 100% trên kho ảnh có bản quyền Adobe Stock, phần mềm đứng sau các tính năng kỳ diệu như Generative Fill và Text to Vector.",
        "directAnswer_en": "Adobe Firefly is Adobe's flagship family of creative generative models. Unlike controversial image generators, Firefly guarantees commercial indemnity, ensuring generated assets can be used in corporate ad campaigns without copyright risk. Plans start at $4.99/month with a free monthly credit plan.",
        "directAnswer_vi": "Adobe Firefly là hệ thống mô hình AI sáng tạo của Adobe. Khác với các công cụ tạo ảnh gây tranh cãi về bản quyền, Firefly cam kết bồi thường pháp lý thương mại, đảm bảo tài nguyên tạo ra có thể dùng an tâm trong các chiến dịch quảng cáo lớn. Giá từ $4.99/tháng kèm gói dùng thử miễn phí.",
        "hubs": ["presentation-design", "advertising"],
        "tags": ["Adobe Firefly", "Photoshop", "Generative Fill", "Commercial Safe", "Vector AI"],
        "startingPrice": 4.99,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 14,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://www.adobe.com/sensei/generative-ai/firefly.html?via={code}",
        "adminAffiliateUrl": "https://www.adobe.com/sensei/generative-ai/firefly.html?via=asmire_admin",
        "rating": 4.7,
        "reviewCount": 11200,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Graphic designers, agency creative directors, and corporate marketing teams requiring legally safe, copyright-indemnified visual assets.",
        "bestFor_vi": "Nhà thiết kế đồ họa, giám đốc mỹ thuật quảng cáo và doanh nghiệp lớn bắt buộc phải sử dụng hình ảnh có bảo hộ bản quyền thương mại.",
        "notFor_en": "Users looking for unrestricted, edgy pop-culture parody art or unregulated open-source checkpoint tweaking.",
        "notFor_vi": "Người dùng muốn vẽ các hình ảnh nhân vật đại chúng không bị kiểm duyệt bản quyền chặt chẽ.",
        "bottomLine_en": "The corporate world's most trusted AI art platform, seamlessly embedded into the industry-standard tools creatives already use every day.",
        "bottomLine_vi": "Nền tảng đồ họa AI được giới doanh nghiệp tin tưởng nhất, tích hợp hoàn hảo vào các phần mềm chuẩn mực mà dân sáng tạo sử dụng mỗi ngày.",
        "pros_en": [
            "100% commercially safe training dataset with legal IP indemnity for enterprise subscribers",
            "Generative Fill in Photoshop allows replacing or expanding backgrounds with realistic matching lighting",
            "Text to Vector in Illustrator generates editable SVG paths, layers, and color groupings",
            "Deep integration across the entire Adobe Creative Cloud ecosystem"
        ],
        "pros_vi": [
            "Tập dữ liệu huấn luyện an toàn 100% thương mại đi kèm cam kết bảo hộ pháp lý cho khách hàng doanh nghiệp",
            "Generative Fill trong Photoshop cho phép xóa, thay thế hoặc mở rộng hình nền khớp ánh sáng tuyệt đối",
            "Text to Vector trong Illustrator sinh ra các vector SVG có thể chỉnh sửa từng layer và đường nét riêng biệt",
            "Tích hợp sâu mượt mà vào toàn bộ hệ sinh thái phần mềm đồ họa Adobe Creative Cloud"
        ],
        "cons_en": [
            "Strict content moderation policies restrict certain fantasy or sensitive art concepts",
            "Consumes Generative Credits monthly, requiring top-ups for heavy production workflows"
        ],
        "cons_vi": [
            "Chính sách kiểm duyệt nội dung an toàn tương đối chặt chẽ giới hạn một số phong cách phá cách",
            "Tiêu tốn hạn mức Generative Credits mỗi tháng, cần nạp thêm nếu có nhu cầu sản xuất khối lượng lớn"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["25 Generative Credits/mo", "Web access", "Standard resolution exports", "Adobe Stock watermark"]},
            {"name": "Firefly Premium", "priceMonthly": 4.99, "priceAnnualMonthly": 4.99, "features": ["100 Generative Credits/mo", "No watermarks", "Full commercial usage rights", "Adobe Fonts access"], "isPopular": True},
            {"name": "Creative Cloud All Apps", "priceMonthly": 59.99, "priceAnnualMonthly": 54.99, "features": ["1,000 Generative Credits/mo", "Photoshop, Illustrator, Premiere", "Generative Fill & Expand", "100GB cloud storage"]}
        ],
        "officialUrl": "https://www.adobe.com/products/firefly.html",
        "alternatives": ["canva-ai", "leonardo-ai", "ideogram"],
        "domain": "adobe.com",
        "g2": "adobe-firefly",
        "ph": "adobe-firefly",
        "reddit": "r/AdobeFirefly"
    },
    {
        "slug": "grammarly",
        "name": "Grammarly AI",
        "tagline_en": "Ubiquitous AI writing companion that enhances grammar, tone, clarity, and full-document rewrite flows.",
        "tagline_vi": "Trợ lý viết văn bản AI phổ biến nhất giúp tinh chỉnh ngữ pháp, giọng điệu, sự rõ ràng và viết lại đoạn văn thông minh.",
        "desc_en": "Grammarly works everywhere you write—across browser tabs, email clients, Word, and Slack. Its generative AI assistant helps rewrite sentences, adjust professional tones, and eliminate clarity issues instantly.",
        "desc_vi": "Grammarly hoạt động mượt mà ở mọi nơi bạn gõ phím: từ trình duyệt web, email, tài liệu Word đến Slack. Trợ lý AI giúp viết lại câu trôi chảy, điều chỉnh giọng điệu chuyên nghiệp và sửa sạch lỗi chính tả tức thì.",
        "directAnswer_en": "Grammarly is the world's most widely adopted writing assistant, used by 30 million individuals and 70,000 teams. It combines rule-based grammar checking with advanced generative AI to compose, rewrite, summarize, and critique text across thousands of applications. Plans start at $12/month with a free starter tier.",
        "directAnswer_vi": "Grammarly là trợ lý viết lách được sử dụng rộng rãi nhất thế giới với hơn 30 triệu người dùng và 70.000 doanh nghiệp. Phần mềm kết hợp bộ kiểm tra ngữ pháp chuẩn mực với trí tuệ nhân tạo để soạn thảo, tóm tắt, tinh chỉnh giọng văn trên hàng ngàn ứng dụng. Giá từ $12/tháng kèm gói miễn phí.",
        "hubs": ["content-seo"],
        "tags": ["Grammar Checker", "AI Writing", "Tone Adjustment", "Proofreading", "Productivity"],
        "startingPrice": 12,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 7,
        "affiliateNetwork": "Impact",
        "affiliateUrlTemplate": "https://www.grammarly.com/?via={code}",
        "adminAffiliateUrl": "https://www.grammarly.com/?via=asmire_admin",
        "rating": 4.8,
        "reviewCount": 15400,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Professionals, marketers, students, and executives who want error-free, confident communication across all daily software.",
        "bestFor_vi": "Nhân viên văn phòng, marketer, sinh viên và nhà quản lý cần giao tiếp văn bản chuẩn mực, tự tin và chuyên nghiệp mỗi ngày.",
        "notFor_en": "Long-form fiction authors looking for creative plot generation and character dialogue synthesis.",
        "notFor_vi": "Nhà văn viết tiểu thuyết cần AI sáng tác cốt truyện viễn tưởng phức tạp và hội thoại nhân vật kịch tính.",
        "bottomLine_en": "The gold standard in communication polish, keeping your emails, proposals, and documents clear, professional, and mistake-free.",
        "bottomLine_vi": "Thước đo tiêu chuẩn vàng trong việc trau chuốt câu chữ, giúp email, đề án và tài liệu của bạn luôn chuyên nghiệp và không tì vết.",
        "pros_en": [
            "Seamless desktop and browser extensions that integrate into Gmail, Google Docs, Slack, and Word",
            "Tone detector analyzes whether your message sounds confident, friendly, formal, or defensive",
            "1-click full sentence rewrites for conciseness, readability, and professional impact",
            "Generative AI prompts draft email replies and outline presentations instantly"
        ],
        "pros_vi": [
            "Tiện ích mở rộng trên máy tính và trình duyệt hoạt động mượt mà trong Gmail, Google Docs, Slack và Word",
            "Bộ phân tích giọng điệu giúp nhận biết câu văn đang mang sắc thái tự tin, thân thiện hay trang trọng",
            "Viết lại cả câu văn chỉ bằng 1 click để tăng tính súc tích, dễ đọc và tạo ấn tượng thuyết phục hơn",
            "Trợ lý AI tự động gợi ý câu trả lời email và lập dàn ý tài liệu nhanh chóng"
        ],
        "cons_en": [
            "Premium plan pricing is relatively high compared to basic standalone AI chat tools",
            "Occasionally over-simplifies nuanced technical or literary phrasing"
        ],
        "cons_vi": [
            "Mức giá thuê bao gói Premium tương đối cao so với các công cụ chatbot đơn thuần",
            "Đôi khi đề xuất đơn giản hóa quá mức một số câu văn mang tính thuật ngữ kỹ thuật chuyên sâu"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["Grammar, spelling & punctuation", "Conciseness suggestions", "Tone detection basic", "100 AI prompts/mo"]},
            {"name": "Premium", "priceMonthly": 30, "priceAnnualMonthly": 12, "features": ["Full-sentence rewrites", "Vocabulary enhancements", "Plagiarism detection", "2,000 AI prompts/mo"], "isPopular": True},
            {"name": "Business", "priceMonthly": 25, "priceAnnualMonthly": 15, "features": ["Centralized billing", "Brand tone guide & style guides", "Analytics dashboard", "SAML SSO security"]}
        ],
        "officialUrl": "https://www.grammarly.com",
        "alternatives": ["quillbot", "notion-ai", "copy-ai"],
        "domain": "grammarly.com",
        "g2": "grammarly",
        "ph": "grammarly",
        "reddit": "r/Grammarly"
    },
    {
        "slug": "hugging-face",
        "name": "Hugging Face Hub",
        "tagline_en": "The open-source AI epicenter hosting 1M+ models, datasets, and Spaces demos for global machine learning builders.",
        "tagline_vi": "Trung tâm AI mã nguồn mở lớn nhất thế giới lưu trữ hơn 1 triệu mô hình, tập dữ liệu và ứng dụng demo Spaces.",
        "desc_en": "Hugging Face is the GitHub of machine learning. Data scientists, researchers, and developers collaborate on models, fine-tune open weights, evaluate benchmarks, and deploy serverless AI inference endpoints.",
        "desc_vi": "Hugging Face được ví như GitHub của giới trí tuệ nhân tạo. Các nhà khoa học dữ liệu và lập trình viên cùng cộng tác chia sẻ mô hình, huấn luyện open-weights, đánh giá hiệu năng và triển khai endpoint API đám mây.",
        "directAnswer_en": "Hugging Face is the global platform where machine learning engineers collaborate on open-source models, datasets, and interactive demos. It provides Model Hub, Dataset Hub, Spaces for hosting Gradio/Streamlit apps, and Inference Endpoints for dedicated production GPUs. Free community tier; Pro is $9/month.",
        "directAnswer_vi": "Hugging Face là nền tảng toàn cầu nơi cộng đồng kỹ sư máy tính cộng tác phát triển mô hình mã nguồn mở, tập dữ liệu và ứng dụng thử nghiệm. Nền tảng cung cấp Model Hub, Dataset Hub, Spaces để chạy demo Gradio/Streamlit và Inference Endpoints triển khai GPU riêng. Miễn phí cho cộng đồng; gói Pro giá $9/tháng.",
        "hubs": ["research-agent"],
        "tags": ["Machine Learning", "Open Source", "Model Hub", "Inference API", "Spaces"],
        "startingPrice": 9,
        "hasFreePlan": True,
        "hasFreeTrial": False,
        "trialDays": 0,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://huggingface.co/?via={code}",
        "adminAffiliateUrl": "https://huggingface.co/?via=asmire_admin",
        "rating": 4.9,
        "reviewCount": 12800,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "AI researchers, machine learning engineers, and developers building on open weights (Llama, Mistral, Stable Diffusion).",
        "bestFor_vi": "Nhà nghiên cứu AI, kỹ sư machine learning và lập trình viên phát triển sản phẩm trên các mô hình mã nguồn mở.",
        "notFor_en": "Non-technical marketing users seeking a ready-to-use plug-and-play social media copy tool.",
        "notFor_vi": "Người dùng không chuyên kỹ thuật chỉ cần công cụ viết status mạng xã hội ăn liền.",
        "bottomLine_en": "The beating heart of open-source artificial intelligence, indispensable for anyone developing modern machine learning applications.",
        "bottomLine_vi": "Trái tim của cộng đồng trí tuệ nhân tạo mở toàn cầu, hạ tầng không thể thiếu cho bất kỳ ai phát triển ứng dụng học máy hiện đại.",
        "pros_en": [
            "Over 1,000,000 public models and 200,000 datasets spanning NLP, vision, audio, and multimodal tasks",
            "Hugging Face Spaces allows deploying interactive Gradio and Streamlit demos in seconds",
            "Serverless Inference API and dedicated Inference Endpoints on enterprise Nvidia GPUs",
            "Open LLM Leaderboard provides trusted, standardized community benchmark evaluations"
        ],
        "pros_vi": [
            "Hơn 1.000.000 mô hình và 200.000 tập dữ liệu mở đa dạng từ xử lý ngôn ngữ, thị giác đến âm thanh",
            "Hugging Face Spaces cho phép khởi tạo và chia sẻ demo tương tác bằng Gradio và Streamlit chỉ sau vài giây",
            "Inference API serverless và Endpoints triển khai chuyên dụng trên các dòng chip GPU Nvidia cao cấp",
            "Bảng xếp hạng Open LLM Leaderboard cung cấp các bài đánh giá độc lập chuẩn mực uy tín nhất"
        ],
        "cons_en": [
            "Dedicated GPU compute for heavy model hosting billed by the hour",
            "Requires Python, PyTorch, and command-line familiarity to unlock full capability"
        ],
        "cons_vi": [
            "Chi phí thuê máy chủ GPU chuyên dụng cho các mô hình lớn được tính phí theo giờ sử dụng",
            "Cần có kiến thức lập trình Python, thư viện PyTorch và dòng lệnh để khai thác tối đa sức mạnh"
        ],
        "pricing": [
            {"name": "Community", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["Unlimited public models & datasets", "Free CPU Spaces", "Community forums", "Access to public models"]},
            {"name": "Pro Account", "priceMonthly": 9, "priceAnnualMonthly": 9, "features": ["Higher free Inference API rate limits", "Early access to new features", "Pro badge on profile", "Discounted GPU compute"], "isPopular": True},
            {"name": "Enterprise Hub", "priceMonthly": 20, "priceAnnualMonthly": 20, "features": ["SSO & advanced access control", "Audit logs & compliance", "Private model hub", "Dedicated GPU endpoints"]}
        ],
        "officialUrl": "https://huggingface.co",
        "alternatives": ["replit", "n8n", "cursor"],
        "domain": "huggingface.co",
        "g2": "hugging-face",
        "ph": "hugging-face",
        "reddit": "r/HuggingFace"
    },
    {
        "slug": "mistral",
        "name": "Mistral AI (Le Chat)",
        "tagline_en": "European frontier AI company celebrated for compact, hyper-efficient open models and Le Chat reasoning platform.",
        "tagline_vi": "Hãng AI tiên phong của châu Âu nổi tiếng với các mô hình mở siêu tối ưu hiệu năng và nền tảng Le Chat thông minh.",
        "desc_en": "Mistral AI champions open science and peak computational efficiency. Its models (Mistral Large, Codestral, Pixtral) deliver state-of-the-art multilingual and coding capabilities via its consumer assistant Le Chat and enterprise APIs.",
        "desc_vi": "Mistral AI dẫn đầu triết lý khoa học mở và tối ưu hóa tài nguyên phần cứng. Các mô hình như Mistral Large, Codestral và Pixtral đem đến năng lực lập trình và đa ngôn ngữ xuất sắc thông qua trợ lý Le Chat và hệ thống API.",
        "directAnswer_en": "Mistral AI is Europe's premier frontier artificial intelligence laboratory. Known for models that punch far above their parameter weight, Mistral offers Le Chat (free multimodal conversational assistant), Codestral (specialized 80+ language coding model), and La Plateforme enterprise API services.",
        "directAnswer_vi": "Mistral AI là phòng thí nghiệm trí tuệ nhân tạo hàng đầu châu Âu. Nổi danh với các mô hình nhỏ gọn nhưng sức mạnh vượt trội, Mistral cung cấp Le Chat (trợ lý đàm thoại đa phương thức miễn phí), Codestral (chuyên gia lập trình hơn 80 ngôn ngữ) và nền tảng API doanh nghiệp La Plateforme.",
        "hubs": ["research-agent"],
        "tags": ["Mistral AI", "Codestral", "Le Chat", "European AI", "Efficient LLM"],
        "startingPrice": 0,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 14,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://mistral.ai/?via={code}",
        "adminAffiliateUrl": "https://mistral.ai/?via=asmire_admin",
        "rating": 4.8,
        "reviewCount": 8900,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Developers, European enterprises needing GDPR-native compliance, and teams looking for high-speed, cost-efficient inference.",
        "bestFor_vi": "Lập trình viên, doanh nghiệp châu Âu cần tuân thủ bảo mật GDPR và các đội ngũ tìm kiếm API tốc độ cao tiết kiệm chi phí.",
        "notFor_en": "Users looking strictly for specialized voice cloning or music generation.",
        "notFor_vi": "Người dùng chỉ có nhu cầu nhân bản giọng đọc hoặc tạo nhạc AI.",
        "bottomLine_en": "A world-class European alternative to Silicon Valley giants, combining open-weight freedom with elite mathematical and coding prowess.",
        "bottomLine_vi": "Đối trọng đẳng cấp châu Âu trước các tập đoàn Thung lũng Silicon, kết hợp sự tự do của mã nguồn mở với năng lực toán học và lập trình xuất chúng.",
        "pros_en": [
            "Le Chat web interface is completely free to use with web search, document canvas, and vision input",
            "Codestral model achieves remarkable accuracy across 80+ programming languages with 256K context",
            "Complete European regulatory and GDPR data residency compliance",
            "Open weights available for local deployment on enterprise hardware without vendor lock-in"
        ],
        "pros_vi": [
            "Giao diện Le Chat hoàn toàn miễn phí tích hợp duyệt web thời gian thực, đọc ảnh và canvas tài liệu",
            "Mô hình Codestral đạt độ chính xác lập trình cao trên 80+ ngôn ngữ với cửa sổ ngữ cảnh 256.000 token",
            "Tuân thủ tuyệt đối các tiêu chuẩn bảo mật dữ liệu khắt khe của Liên minh Châu Âu (GDPR)",
            "Cung cấp trọng số mở cho phép doanh nghiệp tự vận hành trên phần cứng nội bộ an toàn"
        ],
        "cons_en": [
            "Smaller developer third-party plugin ecosystem compared to OpenAI's GPT Store",
            "Le Chat mobile application is newer with evolving UI refinements"
        ],
        "cons_vi": [
            "Hệ sinh thái tiện ích plugin bên thứ ba chưa dày đặc bằng kho GPT Store của OpenAI",
            "Ứng dụng di động của Le Chat mới ra mắt và đang tiếp tục hoàn thiện thêm các tính năng nhỏ"
        ],
        "pricing": [
            {"name": "Le Chat Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["Mistral Large 2 access", "Codestral access", "Web search enabled", "Vision & document analysis"]},
            {"name": "API Developer", "priceMonthly": 2, "priceAnnualMonthly": 2, "features": ["Pay-per-token pricing", "Mistral Small & Large endpoints", "Embeddings API", "Function calling support"], "isPopular": True},
            {"name": "Enterprise Dedicated", "priceMonthly": 100, "priceAnnualMonthly": 85, "features": ["Private cloud deployment", "EU data residency guarantee", "Custom fine-tuning", "Dedicated SLA uptime"]}
        ],
        "officialUrl": "https://mistral.ai",
        "alternatives": ["deepseek", "claude-ai", "chatgpt"],
        "domain": "mistral.ai",
        "g2": "mistral-ai",
        "ph": "mistral-ai",
        "reddit": "r/MistralAI"
    },
    {
        "slug": "pika-labs",
        "name": "Pika Labs",
        "tagline_en": "Idea-to-video platform featuring cinematic effects, Pikaffects physics deformation, and seamless audio synchronization.",
        "tagline_vi": "Nền tảng biến ý tưởng thành video với kỹ xảo điện ảnh, hiệu ứng biến dạng vật lý Pikaffects và đồng bộ âm thanh tự động.",
        "desc_en": "Pika is an intuitive generative video platform. Creators turn text prompts and still images into fluid animated sequences, modify localized clothing, expand video canvases, and apply surreal physics effects with Pikaffects.",
        "desc_vi": "Pika là công cụ tạo video AI đầy tính sáng tạo. Cho phép chuyển văn bản hoặc ảnh tĩnh thành các thước phim chuyển động mượt mà, chỉnh sửa trang phục nhân vật, mở rộng khung hình và tạo các hiệu ứng vật lý tan chảy, phát nổ kỳ ảo.",
        "directAnswer_en": "Pika (Pika 2.0) is a leading generative video platform designed for social media creators, advertisers, and digital animators. Renowned for its viral Pikaffects (inflate, melt, crush, explode) and synchronized sound effects, it turns ideas into cinematic clips in minutes. Plans start at $10/month with a free starter tier.",
        "directAnswer_vi": "Pika (phiên bản Pika 2.0) là công cụ dựng video AI hàng đầu dành cho nhà sáng tạo nội dung mạng xã hội, nhà quảng cáo và chuyên viên đồ họa. Nổi tiếng với tính năng Pikaffects gây bão (làm tan chảy, nghiền nát, nổ tung vật thể) và tự động tạo tiếng động khớp video. Giá từ $10/tháng kèm gói dùng thử miễn phí.",
        "hubs": ["video-avatar"],
        "tags": ["AI Video", "Pikaffects", "Text to Video", "Image to Video", "Animation"],
        "startingPrice": 10,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 7,
        "affiliateNetwork": "Rewardful",
        "affiliateUrlTemplate": "https://pika.art/?via={code}",
        "adminAffiliateUrl": "https://pika.art/?via=asmire_admin",
        "rating": 4.7,
        "reviewCount": 6100,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Social media creators, TikTok marketers, and animators looking for surreal visual effects, meme creation, and cinematic motion.",
        "bestFor_vi": "Nhà sáng tạo TikTok, marketer mạng xã hội và nghệ sĩ đồ họa tìm kiếm hiệu ứng hình ảnh kỳ ảo, làm meme độc lạ và chuyển động mượt.",
        "notFor_en": "Long-form narrative film directors requiring multi-minute continuous character continuity in single continuous shots.",
        "notFor_vi": "Đạo diễn phim dài tập cần giữ nguyên nhân vật chuyển động liên tục trong các cảnh quay kéo dài nhiều phút.",
        "bottomLine_en": "The most playful and creative AI video generator on the market, backed by unmatched physics effects and intuitive web controls.",
        "bottomLine_vi": "Công cụ làm video AI sáng tạo và thú vị nhất trên thị trường, sở hữu hiệu ứng vật lý độc nhất vô nhị và giao diện web dễ dùng.",
        "pros_en": [
            "Pikaffects feature: apply viral physics transformations like melt, crush, explode, and cakeify to any object",
            "Automatic Sound Effects generator creates synchronized audio matching the on-screen motion",
            "Modify Region tool allows inpainting changes to clothing, hair, or backgrounds in existing videos",
            "Lip-sync integration automatically animates talking faces from audio tracks"
        ],
        "pros_vi": [
            "Tính năng Pikaffects: tạo hiệu ứng tan chảy, nghiền nát, nổ tung hoặc biến vật thể thành bánh kem siêu thực",
            "Tự động tạo hiệu ứng âm thanh (Sound FX) khớp hoàn hảo với từng chuyển động hành động trong khung hình",
            "Công cụ Modify Region cho phép thay đổi trang phục, màu tóc hoặc khung cảnh nền trong video có sẵn",
            "Tích hợp hát nhép khẩu hình môi (Lip-sync) tự động theo giọng đọc hoặc bài hát đưa vào"
        ],
        "cons_en": [
            "Default clip duration is 3 to 4 seconds, requiring extensions to create longer narratives",
            "High-resolution 1080p and watermark removal requires paid subscription"
        ],
        "cons_vi": [
            "Độ dài clip cơ bản từ 3 đến 4 giây, cần bấm nối dài thêm để ghép thành câu chuyện dài",
            "Xuất video độ nét cao 1080p và xóa hình mờ watermark đòi hỏi gói trả phí"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["150 initial credits + 30 daily", "Standard generation speed", "Pikaffects access", "Pika watermark"]},
            {"name": "Standard", "priceMonthly": 10, "priceAnnualMonthly": 8, "features": ["700 credits/mo", "Watermark-free downloads", "1080p video upscaling", "Commercial usage rights"], "isPopular": True},
            {"name": "Pro", "priceMonthly": 35, "priceAnnualMonthly": 28, "features": ["2,000 credits/mo", "Unlimited generation queue", "Priority GPU servers", "Commercial rights"]}
        ],
        "officialUrl": "https://pika.art",
        "alternatives": ["runway", "invideo", "heygen"],
        "domain": "pika.art",
        "g2": "pika-labs",
        "ph": "pika-labs",
        "reddit": "r/PikaLabs"
    },
    {
        "slug": "writesonic",
        "name": "Writesonic (Chatsonic)",
        "tagline_en": "Generative AI platform for SEO articles, factual research with Google integration, and branded content workflows.",
        "tagline_vi": "Nền tảng AI tạo bài viết chuẩn SEO, nghiên cứu thông tin đối chiếu Google và tự động hóa nội dung thương hiệu.",
        "desc_en": "Writesonic combines AI article writing with real-time Google search data. Its AI Article Writer 6.0 crafts 3,000-word, ranking-ready blog posts with internal linking, citations, and custom brand voices.",
        "desc_vi": "Writesonic kết hợp năng lực viết bài AI với dữ liệu tìm kiếm Google thời gian thực. Trình AI Article Writer 6.0 tạo các bài blog chuẩn SEO dài 3.000 từ có sẵn liên kết nội bộ, nguồn trích dẫn và đồng bộ giọng điệu thương hiệu.",
        "directAnswer_en": "Writesonic is a full-funnel content marketing and SEO platform. Beyond generic copywriting, it features real-time web search integration via Chatsonic, bulk long-form article generation with keyword optimization, and custom knowledge base ingestion. Plans start at $19/month with a free starter tier.",
        "directAnswer_vi": "Writesonic là nền tảng tiếp thị nội dung và tối ưu SEO toàn diện. Khác với các công cụ viết thông thường, Writesonic tích hợp tìm kiếm web Google trực tiếp qua Chatsonic, sản xuất bài viết dài tự động tối ưu từ khóa và nạp tài liệu riêng của doanh nghiệp. Giá từ $19/tháng kèm gói dùng thử miễn phí.",
        "hubs": ["content-seo"],
        "tags": ["SEO Content", "AI Writer", "Article Writer", "Chatsonic", "Copywriting"],
        "startingPrice": 19,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 7,
        "affiliateNetwork": "Rewardful",
        "affiliateUrlTemplate": "https://writesonic.com/?via={code}",
        "adminAffiliateUrl": "https://writesonic.com/?via=asmire_admin",
        "rating": 4.7,
        "reviewCount": 7300,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Content managers, affiliate publishers, SEO agencies, and ecommerce stores needing high-volume, factual blog posts and product descriptions.",
        "bestFor_vi": "Quản lý nội dung, người làm affiliate marketing, agency SEO và gian hàng thương mại điện tử cần sản xuất bài viết dài và mô tả sản phẩm chuẩn SEO.",
        "notFor_en": "Technical engineering teams seeking local-first code refactoring environments.",
        "notFor_vi": "Kỹ sư lập trình tìm kiếm công cụ chỉnh sửa mã nguồn cục bộ chuyên sâu.",
        "bottomLine_en": "A dependable content engine that bridges generative copywriting with real-time Google factual data and SEO SERP ranking logic.",
        "bottomLine_vi": "Cỗ máy sản xuất nội dung đáng tin cậy kết hợp hoàn hảo giữa viết lách AI và dữ liệu thời gian thực từ Google để đua top tìm kiếm.",
        "pros_en": [
            "AI Article Writer 6.0 generates fully structured, cited 3,000+ word articles ready for WordPress",
            "Chatsonic integrates live Google search data for up-to-the-minute factual accuracy",
            "Brand Voice feature trains the AI on your past articles, maintaining consistent corporate tone",
            "Built-in integrations with WordPress, Shopify, Zapier, and Surfer SEO"
        ],
        "pros_vi": [
            "AI Article Writer 6.0 tự động viết bài hoàn chỉnh hơn 3.000 từ có cấu trúc chuẩn xuất bản thẳng lên WordPress",
            "Chatsonic liên tục đối chiếu dữ liệu tìm kiếm Google thời gian thực chống thông tin sai lệch",
            "Tính năng Brand Voice học theo các bài viết cũ của bạn để duy trì giọng điệu thương hiệu nhất quán",
            "Tích hợp sẵn với WordPress, Shopify, Zapier và công cụ phân tích từ khóa Surfer SEO"
        ],
        "cons_en": [
            "Word generation credits deplete faster when using premium frontier model configurations",
            "Auto-generated articles still require human editorial review for unique personal perspectives"
        ],
        "cons_vi": [
            "Hạn mức số từ tiêu hao nhanh hơn khi lựa chọn sử dụng các mô hình AI cao cấp",
            "Bài viết tự động vẫn cần biên tập viên người thật rà soát lại để bổ sung trải nghiệm và góc nhìn độc đáo"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["10,000 words one-time", "Chatsonic standard", "Templates access", "WordPress 1-click export"]},
            {"name": "Individual", "priceMonthly": 20, "priceAnnualMonthly": 16, "features": ["Unlimited words (standard)", "AI Article Writer 6.0", "Brand Voice settings", "SEO checker integration"], "isPopular": True},
            {"name": "Standard Team", "priceMonthly": 99, "priceAnnualMonthly": 79, "features": ["3 team member seats", "Full Audiosonic access", "API access credits", "Priority customer success"]}
        ],
        "officialUrl": "https://writesonic.com",
        "alternatives": ["jasper", "copy-ai", "frase"],
        "domain": "writesonic.com",
        "g2": "writesonic",
        "ph": "writesonic",
        "reddit": "r/Writesonic"
    },
    {
        "slug": "copyleaks",
        "name": "Copyleaks",
        "tagline_en": "Enterprise-grade AI detection and plagiarism prevention platform with 99.1% accuracy across 30+ languages.",
        "tagline_vi": "Nền tảng kiểm định văn bản AI và chống đạo văn chuẩn doanh nghiệp đạt độ chính xác 99,1% trên hơn 30 ngôn ngữ.",
        "desc_en": "Copyleaks provides military-grade text verification for schools, enterprises, and publishers. It identifies content generated by GPT-4, Claude, and Gemini, detects paraphrased text, and inspects code plagiarism.",
        "desc_vi": "Copyleaks cung cấp giải pháp xác minh tính xác thực của văn bản cho trường học, doanh nghiệp và nhà xuất bản. Phần mềm nhận diện chính xác văn bản do GPT-4, Claude, Gemini tạo ra và kiểm tra đạo văn mã nguồn.",
        "directAnswer_en": "Copyleaks is an industry-leading AI content detection and intellectual property protection solution. With an independently verified 99.1% detection accuracy rate and <0.2% false positive rate, it is trusted by universities, HR teams, and media conglomerates. Plans start at $9.99/month with a free browser trial.",
        "directAnswer_vi": "Copyleaks là giải pháp hàng đầu thế giới về phát hiện nội dung AI và bảo vệ quyền sở hữu trí tuệ. Với độ chính xác 99,1% và tỷ lệ dương tính giả dưới 0,2%, phần mềm được hàng ngàn trường đại học, phòng nhân sự và tòa soạn tin dùng. Giá từ $9.99/tháng kèm tiện ích mở rộng trình duyệt dùng thử.",
        "hubs": ["ai-detection"],
        "tags": ["AI Detection", "Plagiarism Checker", "Academic Integrity", "Enterprise Security", "Code Plagiarism"],
        "startingPrice": 9.99,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 7,
        "affiliateNetwork": "Rewardful",
        "affiliateUrlTemplate": "https://copyleaks.com/?via={code}",
        "adminAffiliateUrl": "https://copyleaks.com/?via=asmire_admin",
        "rating": 4.8,
        "reviewCount": 4600,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Universities, hiring managers, digital publishers, and compliance teams needing reliable detection of AI-generated essays and articles.",
        "bestFor_vi": "Trường học, phòng tuyển dụng nhân sự, tòa soạn báo và ban tuân thủ cần kiểm định bài luận hoặc bài viết có do AI tạo hay không.",
        "notFor_en": "Users looking to rewrite or humanize AI content automatically.",
        "notFor_vi": "Người dùng muốn tìm công cụ tự động 'lách' hay viết lại văn bản AI.",
        "bottomLine_en": "The most accurate and comprehensive AI text verification platform, delivering peace of mind with enterprise compliance reporting.",
        "bottomLine_vi": "Nền tảng xác minh văn bản AI chuẩn xác nhất hiện nay, mang lại sự tin cậy tuyệt đối với báo cáo kiểm định chi tiết.",
        "pros_en": [
            "Demonstrated 99.1% accuracy in detecting text generated by modern frontier LLMs",
            "Exceptionally low false positive rate (under 0.2%), preventing unfair academic penalties",
            "Multi-language support across 30+ languages including Vietnamese, Spanish, French, and German",
            "Source Code plagiarism detection identifying copied or AI-generated programming code"
        ],
        "pros_vi": [
            "Độ chính xác được kiểm nghiệm độc lập đạt 99,1% khi phát hiện văn bản do các mô hình AI mới nhất tạo ra",
            "Tỷ lệ dương tính giả cực thấp dưới 0,2%, bảo vệ quyền lợi chính đáng của học sinh sinh viên",
            "Hỗ trợ kiểm tra đa ngôn ngữ trên hơn 30 thứ tiếng bao gồm tiếng Việt, Anh, Pháp, Đức và Tây Ban Nha",
            "Tính năng quét đạo văn mã nguồn (Code Plagiarism) phát hiện code lập trình bị sao chép hoặc do AI viết"
        ],
        "cons_en": [
            "Consumes credits per scan page (250 words per page credit)",
            "Heavily rewritten AI text may require manual human pedagogical review"
        ],
        "cons_vi": [
            "Hệ thống tính phí theo trang quét (quy chuẩn 250 từ cho mỗi credit)",
            "Văn bản AI được người dùng biên tập lại nhiều lần vẫn cần chuyên gia đánh giá ngữ cảnh trực tiếp"
        ],
        "pricing": [
            {"name": "Free Trial", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["10 scan pages", "Chrome browser extension", "Basic AI score", "Standard report"]},
            {"name": "AI + Plagiarism", "priceMonthly": 13.99, "priceAnnualMonthly": 9.99, "features": ["1,200 pages/year ($10.99/mo billed annually)", "Full AI model breakdown", "Plagiarism source links", "Code analysis"], "isPopular": True},
            {"name": "Organization & LMS", "priceMonthly": 49, "priceAnnualMonthly": 39, "features": ["Canvas, Blackboard, Moodle integration", "Full API access", "Multiple user seats", "Dedicated compliance director"]}
        ],
        "officialUrl": "https://copyleaks.com",
        "alternatives": ["gptzero", "originality", "turnitin"],
        "domain": "copyleaks.com",
        "g2": "copyleaks",
        "ph": "copyleaks",
        "reddit": "r/Copyleaks"
    },
    {
        "slug": "ai-or-not",
        "name": "AI or Not",
        "tagline_en": "Multimodal deepfake and synthetic media detector evaluating images, audio, video, and text.",
        "tagline_vi": "Hệ thống kiểm định truyền thông tổng hợp và Deepfake đa phương thức: quét ảnh, âm thanh, video và văn bản.",
        "desc_en": "AI or Not is an enterprise synthetic media detection platform. Built to combat misinformation and identity fraud, it scans digital files to determine whether photos (Midjourney, Stable Diffusion), voices, or text were AI-generated.",
        "desc_vi": "AI or Not là nền tảng phát hiện truyền thông nhân tạo cấp doanh nghiệp. Được thiết kế để chống tin giả và gian lận danh tính, hệ thống phân tích hình ảnh (Midjourney, Stable Diffusion), giọng nói và văn bản để xác định yếu tố AI.",
        "directAnswer_en": "AI or Not is a dedicated multimodal AI detection platform created by Optic. Unlike text-only checkers, it analyzes synthetic artifacts across photos, voice clips, video, and written text, serving newsrooms, KYC compliance, and digital forensics. Plans start at $5/month with a free web scanner.",
        "directAnswer_vi": "AI or Not là nền tảng kiểm định AI đa phương thức do Optic phát triển. Khác với các công cụ chỉ kiểm tra văn bản, hệ thống phân tích các dấu hiệu tạo sinh trên hình ảnh, file ghi âm giọng nói, video clip và bài viết, phục vụ tòa soạn báo chí, xác thực KYC và điều tra kỹ thuật số. Giá từ $5/tháng kèm bản dùng thử miễn phí.",
        "hubs": ["ai-detection"],
        "tags": ["Deepfake Detector", "AI Image Detection", "Synthetic Media", "Voice Detection", "Forensics"],
        "startingPrice": 5,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 7,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://www.aiornot.com/?via={code}",
        "adminAffiliateUrl": "https://www.aiornot.com/?via=asmire_admin",
        "rating": 4.6,
        "reviewCount": 3200,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Fact-checkers, photojournalists, legal investigators, and fraud prevention teams needing to verify authentic vs AI-generated media.",
        "bestFor_vi": "Chuyên viên kiểm chứng tin tức, phóng viên ảnh, luật sư và đội ngũ phòng chống gian lận cần xác minh tính chân thực của tài liệu.",
        "notFor_en": "Users looking for generative design or video creation capabilities.",
        "notFor_vi": "Người dùng muốn tìm công cụ để tự tạo hình ảnh hoặc làm video.",
        "bottomLine_en": "The premier multimodal forensics tool for distinguishing genuine photography and authentic voice from synthetic generative media.",
        "bottomLine_vi": "Công cụ giám định kỹ thuật số hàng đầu để phân biệt ảnh chụp và giọng nói thật trước làn sóng Deepfake và truyền thông nhân tạo.",
        "pros_en": [
            "Analyzes images generated by Midjourney, DALL-E, Stable Diffusion, and Adobe Firefly",
            "Audio deepfake detection identifies cloned voices from ElevenLabs and speech synthesis engines",
            "Easy drag-and-drop web interface with instant probability percentage score",
            "Robust REST API for automated KYC onboarding and media verification workflows"
        ],
        "pros_vi": [
            "Phân tích chính xác hình ảnh tạo từ Midjourney, DALL-E, Stable Diffusion và Adobe Firefly",
            "Tính năng phát hiện âm thanh Deepfake nhận diện các giọng nói nhân bản từ ElevenLabs và công cụ lồng tiếng",
            "Giao diện web kéo thả tiện lợi trả về tỷ lệ phần trăm xác suất AI chỉ sau vài giây",
            "Cung cấp REST API mạnh mẽ cho quy trình xác thực định danh KYC và kiểm duyệt tin tức tự động"
        ],
        "cons_en": [
            "Heavily compressed or low-resolution social media screenshots can reduce detection confidence",
            "API tier pricing scales by volume for enterprise batch processing"
        ],
        "cons_vi": [
            "Hình ảnh bị nén mờ nhiều lần trên mạng xã hội có thể làm giảm độ tin cậy của thuật toán phân tích",
            "Chi phí gói API doanh nghiệp tăng theo khối lượng hình ảnh và âm thanh cần quét hàng tháng"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["10 image checks/mo", "Web upload scanner", "Confidence percentage", "Basic report"]},
            {"name": "Pro", "priceMonthly": 5, "priceAnnualMonthly": 4.16, "features": ["200 checks/mo (Image, Audio, Text)", "High-resolution file uploads", "Priority queue", "Exportable audit certificates"], "isPopular": True},
            {"name": "API & Enterprise", "priceMonthly": 29, "priceAnnualMonthly": 25, "features": ["Full REST API access", "Bulk media batch processing", "Video frame-by-frame analysis", "Dedicated support"]}
        ],
        "officialUrl": "https://www.aiornot.com",
        "alternatives": ["gptzero", "copyleaks", "originality"],
        "domain": "aiornot.com",
        "g2": "ai-or-not",
        "ph": "ai-or-not",
        "reddit": "r/AIEthics"
    },
    {
        "slug": "convertos-ai",
        "name": "Convertos.ai",
        "tagline_en": "Generative Engine Optimization (GEO) platform measuring how ChatGPT, Perplexity, and Gemini cite and recommend your brand.",
        "tagline_vi": "Nền tảng tối ưu hóa công cụ tạo sinh (GEO) đo lường và gia tăng tần suất thương hiệu được ChatGPT, Perplexity và Gemini đề xuất.",
        "desc_en": "Convertos.ai helps marketing and SEO teams track, analyze, and optimize their brand visibility across AI answer engines. Monitor whether ChatGPT, Gemini, Claude, and Perplexity recommend your products to prospective buyers.",
        "desc_vi": "Convertos.ai giúp các đội ngũ marketing và SEO theo dõi, phân tích và tối ưu hóa sự hiện diện của thương hiệu trên các cỗ máy trả lời AI. Giám sát xem ChatGPT, Gemini, Claude và Perplexity có giới thiệu sản phẩm của bạn tới khách hàng tiềm năng hay không.",
        "directAnswer_en": "Convertos.ai is a pioneer in Generative Engine Optimization (GEO). As consumer search shifts from Google 10 blue links to conversational AI answers, Convertos tracks your brand's share of voice across ChatGPT, Claude, Gemini, and Perplexity, providing actionable tips to get cited. Plans start at $49/month.",
        "directAnswer_vi": "Convertos.ai là nền tảng tiên phong trong lĩnh vực Tối ưu hóa Công cụ Tạo sinh (GEO). Khi xu hướng tìm kiếm chuyển từ 10 liên kết xanh của Google sang câu trả lời trực tiếp của AI, Convertos theo dõi thị phần hiện diện thương hiệu trên ChatGPT, Claude, Gemini và Perplexity, đưa ra chỉ dẫn cụ thể để website được AI trích dẫn. Giá từ $49/tháng.",
        "hubs": ["content-seo", "advertising"],
        "tags": ["GEO", "AI Search", "Perplexity SEO", "Brand Visibility", "Search Optimization"],
        "startingPrice": 49,
        "hasFreePlan": False,
        "hasFreeTrial": True,
        "trialDays": 14,
        "affiliateNetwork": "Rewardful",
        "affiliateUrlTemplate": "https://convertos.ai/?via={code}",
        "adminAffiliateUrl": "https://convertos.ai/?via=asmire_admin",
        "rating": 4.8,
        "reviewCount": 1850,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "SaaS founders, digital agencies, and CMOs seeking to defend and grow brand recommendations in the era of AI search.",
        "bestFor_vi": "Nhà sáng lập SaaS, agency quảng cáo và giám đốc marketing muốn bảo vệ và gia tăng thứ hạng đề xuất của thương hiệu trong kỷ nguyên tìm kiếm AI.",
        "notFor_en": "Local single-location brick-and-mortar stores without digital sales footprints.",
        "notFor_vi": "Cửa hàng bán lẻ truyền thống nhỏ không có hoạt động kinh doanh trực tuyến.",
        "bottomLine_en": "The essential SEO compass for 2027, measuring the exact answers AI engines feed to prospective customers looking for your software.",
        "bottomLine_vi": "Kim chỉ nam SEO bắt buộc cho tương lai, đo lường chính xác những gì các cỗ máy AI đang trả lời khách hàng khi họ tìm kiếm giải pháp trong ngành của bạn.",
        "pros_en": [
            "Tracks prompt visibility across ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews",
            "Sentiment and citation analysis shows which review websites and blogs LLMs trust most",
            "Competitor comparison matrix reveals which rivals are winning AI recommendations in your niche",
            "Actionable schema and content recommendations to increase citation probability"
        ],
        "pros_vi": [
            "Theo dõi mức độ xuất hiện thương hiệu trên ChatGPT, Perplexity, Claude, Gemini và Google AI Overviews",
            "Phân tích sắc thái và nguồn trích dẫn chỉ ra những trang review hay blog nào đang được AI tin tưởng nhất",
            "Bảng so sánh đối thủ cạnh tranh cho biết ai đang giành được vị trí gợi ý số 1 từ AI trong ngành",
            "Đề xuất cấu trúc schema và định hướng nội dung cụ thể để nâng cao xác suất được AI trích dẫn"
        ],
        "cons_en": [
            "Emerging discipline requires active experimentation and ongoing content strategy adjustments",
            "Higher starting price tier targeted primarily at established SaaS and enterprise brands"
        ],
        "cons_vi": [
            "Lĩnh vực GEO còn mới mẻ đòi hỏi doanh nghiệp phải chủ động thử nghiệm và điều chỉnh chiến lược nội dung liên tục",
            "Mức giá khởi điểm hướng tới các công ty phần mềm và thương hiệu đã có ngân sách tiếp thị"
        ],
        "pricing": [
            {"name": "Starter", "priceMonthly": 49, "priceAnnualMonthly": 39, "features": ["50 tracked AI prompts", "Daily citation monitoring", "ChatGPT & Perplexity coverage", "Weekly executive report"]},
            {"name": "Growth", "priceMonthly": 129, "priceAnnualMonthly": 99, "features": ["200 tracked AI prompts", "All 4 major LLM engines", "Competitor gap analysis", "Actionable GEO optimization tips"], "isPopular": True},
            {"name": "Enterprise", "priceMonthly": 299, "priceAnnualMonthly": 249, "features": ["Unlimited prompts", "Custom API webhook integrations", "Dedicated SEO strategist", "White-label client reporting"]}
        ],
        "officialUrl": "https://convertos.ai",
        "alternatives": ["omniseo", "frase", "writesonic"],
        "domain": "convertos.ai",
        "g2": "convertos-ai",
        "ph": "convertos-ai",
        "reddit": "r/SEO"
    },
    {
        "slug": "voicefleet",
        "name": "VoiceFleet",
        "tagline_en": "24/7 AI phone answering receptionist and automated appointment booking agent for service businesses.",
        "tagline_vi": "Tổng đài lễ tân ảo AI trực điện thoại 24/7 và tự động đặt lịch hẹn thông minh cho doanh nghiệp dịch vụ.",
        "desc_en": "VoiceFleet eliminates missed calls and lost revenue. Its natural-sounding conversational AI picks up telephone calls 24/7, answers caller questions, qualifies leads, and books appointments directly into your calendar.",
        "desc_vi": "VoiceFleet xóa bỏ nỗi lo nhỡ cuộc gọi của khách hàng. Trợ lý tổng đài AI với giọng nói tự nhiên nghe máy 24/7, giải đáp thắc mắc dịch vụ, sàng lọc khách hàng tiềm năng và tự động chốt lịch hẹn vào Google Calendar/CRM.",
        "directAnswer_en": "VoiceFleet is an autonomous AI voice receptionist designed for dental clinics, law firms, home service contractors, and agencies. It replaces answering services with intelligent phone agents capable of natural two-way conversation, rescheduling, and lead intake. Plans start at $49/month with dedicated local phone numbers.",
        "directAnswer_vi": "VoiceFleet là giải pháp tổng đài lễ tân AI tự động dành cho phòng khám, văn phòng luật, dịch vụ gia đình và doanh nghiệp. Thay thế tổng đài truyền thống bằng trợ lý ảo thông minh có khả năng đàm thoại hai chiều tự nhiên, xử lý lịch hẹn và thu thập thông tin khách hàng. Giá từ $49/tháng kèm số điện thoại riêng.",
        "hubs": ["sales-crm"],
        "tags": ["AI Receptionist", "Phone Answering", "Appointment Booking", "Voice AI", "Lead Intake"],
        "startingPrice": 49,
        "hasFreePlan": False,
        "hasFreeTrial": True,
        "trialDays": 14,
        "affiliateNetwork": "Rewardful",
        "affiliateUrlTemplate": "https://voicefleet.ai/?via={code}",
        "adminAffiliateUrl": "https://voicefleet.ai/?via=asmire_admin",
        "rating": 4.8,
        "reviewCount": 2100,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Local service businesses, medical clinics, home contractors, and real estate agencies that lose revenue from unanswered inbound calls.",
        "bestFor_vi": "Doanh nghiệp dịch vụ, phòng khám nha khoa, dịch vụ sửa chữa gia đình và môi giới bất động sản thường xuyên bị lỡ cuộc gọi khi bận việc.",
        "notFor_en": "Global software companies needing complex multi-tier technical support engineering escalation.",
        "notFor_vi": "Các tập đoàn phần mềm cần đội ngũ kỹ sư hỗ trợ kỹ thuật chuyên sâu nhiều cấp độ.",
        "bottomLine_en": "Never lose a high-value customer to voicemail again; VoiceFleet answers within 2 rings with a warm, natural human voice.",
        "bottomLine_vi": "Không bao giờ để mất khách hàng vào hộp thư thoại; VoiceFleet bắt máy chỉ sau 2 hồi chuông với giọng nói ấm áp, tự nhiên như người thật.",
        "pros_en": [
            "Ultra-low latency sub-second conversational response time feels completely natural on phone lines",
            "Direct calendar integration with Google Calendar, Calendly, and Acuity for instant booking",
            "SMS follow-up: automatically texts confirmation links and driving directions to callers after the call",
            "Call recordings and full transcripts delivered instantly to email or CRM"
        ],
        "pros_vi": [
            "Độ trễ phản hồi cực thấp dưới một giây tạo cảm giác đàm thoại hoàn toàn tự nhiên qua đường dây điện thoại",
            "Đồng bộ lịch hẹn trực tiếp với Google Calendar, Calendly và Acuity giúp khách chốt lịch ngay",
            "Tự động gửi tin nhắn SMS xác nhận lịch và bản đồ chỉ đường cho khách ngay sau khi gác máy",
            "Bản ghi âm cuộc gọi và nội dung chép lời đầy đủ được gửi tự động về email hoặc CRM"
        ],
        "cons_en": [
            "Requires initial setup of business FAQ and appointment booking constraints",
            "Monthly plans include minute allocations; extra high-volume minutes billed as incurred"
        ],
        "cons_vi": [
            "Cần dành thời gian ban đầu để nhập dữ liệu câu hỏi thường gặp (FAQ) và quy định đặt lịch của quán/phòng khám",
            "Gói tháng đi kèm số phút gọi định mức; nếu vượt quá số phút sẽ tính thêm phụ phí"
        ],
        "pricing": [
            {"name": "Starter", "priceMonthly": 49, "priceAnnualMonthly": 39, "features": ["100 call minutes/mo", "Dedicated phone number", "Google Calendar booking", "Email transcripts"]},
            {"name": "Business", "priceMonthly": 129, "priceAnnualMonthly": 99, "features": ["350 call minutes/mo", "SMS confirmation workflows", "Custom caller ID transfer", "CRM webhook integration"], "isPopular": True},
            {"name": "Pro / Agency", "priceMonthly": 249, "priceAnnualMonthly": 199, "features": ["800 call minutes/mo", "Multi-location routing", "Bilingual English/Spanish", "Dedicated onboarding specialist"]}
        ],
        "officialUrl": "https://voicefleet.ai",
        "alternatives": ["my-ai-front-desk", "krispcall", "highlevel"],
        "domain": "voicefleet.ai",
        "g2": "voicefleet",
        "ph": "voicefleet",
        "reddit": "r/SmallBusiness"
    },
    {
        "slug": "stable-diffusion",
        "name": "Stable Diffusion (Stability AI)",
        "tagline_en": "The pioneering open-weights generative image model empowering custom fine-tuning and local GPU generation.",
        "tagline_vi": "Mô hình tạo ảnh mã nguồn mở tiên phong cho phép tự huấn luyện mô hình tùy chỉnh và chạy trực tiếp trên GPU máy tính.",
        "desc_en": "Stable Diffusion by Stability AI revolutionized visual generative technology. With full open access, creators run SD3.5 locally, train bespoke LoRA styles, use ControlNet for precise pose manipulation, and avoid vendor lock-in.",
        "desc_vi": "Stable Diffusion do Stability AI phát triển đã mở ra cuộc cách mạng đồ họa tạo sinh mở. Người dùng có thể chạy mô hình SD3.5 trực tiếp trên card đồ họa máy tính, tự huấn luyện phong cách LoRA riêng và dùng ControlNet để điều khiển dáng nhân vật chuẩn xác.",
        "directAnswer_en": "Stable Diffusion is the world's most adopted open-weights text-to-image foundation model. Developed by Stability AI, versions like SD3.5 Large deliver cinematic photorealism, typography fidelity, and complex prompt understanding. Can be run 100% free locally on your own GPU or accessed via Stability AI cloud APIs.",
        "directAnswer_vi": "Stable Diffusion là mô hình nền tảng tạo ảnh từ văn bản mã nguồn mở phổ biến nhất hành tinh. Các phiên bản như SD3.5 Large mang lại hình ảnh sắc nét, hiển thị chữ chuẩn xác và khả năng hiểu câu lệnh phức tạp. Có thể chạy hoàn toàn miễn phí trên card đồ họa cá nhân hoặc dùng qua API đám mây.",
        "hubs": ["advertising", "presentation-design"],
        "tags": ["Stable Diffusion", "Open Source AI", "Text to Image", "ControlNet", "Local GPU"],
        "startingPrice": 0,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 30,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://stability.ai/?via={code}",
        "adminAffiliateUrl": "https://stability.ai/?via=asmire_admin",
        "rating": 4.8,
        "reviewCount": 16500,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Developers, 3D artists, game studios, and power users who demand full control over weights, local offline rendering, and custom LoRA models.",
        "bestFor_vi": "Lập trình viên, nghệ sĩ 3D, studio game và người dùng nâng cao muốn kiểm soát toàn bộ mô hình, render ngoại tuyến và tự luyện LoRA.",
        "notFor_en": "Non-technical beginners without a modern dedicated Nvidia GPU or familiarity with ComfyUI / Automatic1111.",
        "notFor_vi": "Người mới bắt đầu chưa có card màn hình rời hoặc ngại sử dụng các phần mềm chuyên sâu như ComfyUI.",
        "bottomLine_en": "The foundation of open-source visual AI, offering limitless customization, zero subscription fees on local hardware, and total artistic autonomy.",
        "bottomLine_vi": "Nền móng của công nghệ đồ họa AI mở, đem lại sự sáng tạo không giới hạn, không tốn phí thuê bao khi chạy máy nhà và tự do tuyệt đối.",
        "pros_en": [
            "Completely open weights: download and run on your local PC with zero subscription costs forever",
            "ControlNet ecosystem allows locking character poses, depth maps, edges, and compositional geometry",
            "Vibrant open-source ecosystem with thousands of community checkpoints and LoRAs on Civitai",
            "Permissive commercial licensing for individual creators and small businesses under Stability Community License"
        ],
        "pros_vi": [
            "Mã nguồn và trọng số mở hoàn toàn: tải về và chạy vĩnh viễn trên máy tính không tốn một đồng phí thuê bao",
            "Hệ sinh thái ControlNet cho phép khóa chuẩn xác tư thế nhân vật, bản đồ chiều sâu và đường nét bố cục",
            "Cộng đồng chia sẻ sôi động nhất thế giới với hàng ngàn phong cách nghệ thuật tùy biến trên Civitai",
            "Giấy phép thương mại cộng đồng cởi mở cho nhà sáng tạo cá nhân và doanh nghiệp vừa và nhỏ"
        ],
        "cons_en": [
            "Local generation requires a modern GPU with at least 8GB to 12GB of VRAM for smooth performance",
            "Steeper technical setup curve compared to simple web-based SaaS tools like Midjourney"
        ],
        "cons_vi": [
            "Chạy trên máy tính cá nhân đòi hỏi card đồ họa hiện đại với tối thiểu 8GB - 12GB VRAM để đạt tốc độ tốt",
            "Đòi hỏi các bước cài đặt kỹ thuật ban đầu phức tạp hơn so với các ứng dụng web ăn liền như Midjourney"
        ],
        "pricing": [
            {"name": "Local Self-Hosted", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["100% free open weights", "Unlimited generations on local GPU", "Full ComfyUI & WebUI support", "Commercial use under license"]},
            {"name": "Stability Cloud API", "priceMonthly": 10, "priceAnnualMonthly": 10, "features": ["$0.03 per SD3.5 image", "High-speed enterprise cloud GPUs", "Inpainting & outpainting API", "No hardware required"], "isPopular": True},
            {"name": "Enterprise License", "priceMonthly": 200, "priceAnnualMonthly": 175, "features": ["Full enterprise commercial rights (revenue >$1M)", "Custom model fine-tuning support", "Dedicated solutions architect"]}
        ],
        "officialUrl": "https://stability.ai",
        "alternatives": ["midjourney", "leonardo-ai", "ideogram"],
        "domain": "stability.ai",
        "g2": "stable-diffusion",
        "ph": "stable-diffusion",
        "reddit": "r/StableDiffusion"
    },
    {
        "slug": "v0-dev",
        "name": "v0 by Vercel",
        "tagline_en": "Generative UI system by Vercel that converts natural language prompts into production-ready React, Tailwind, and shadcn/ui components.",
        "tagline_vi": "Hệ thống sinh giao diện người dùng AI từ Vercel biến câu lệnh thành thành phần React, Tailwind và shadcn/ui hoàn chỉnh.",
        "desc_en": "v0 by Vercel combines generative AI with modern web frontend engineering. Simply describe a user interface, dashboard, or landing page, and v0 produces clean, copy-pasteable React code styled with Tailwind CSS and shadcn/ui.",
        "desc_vi": "v0 do Vercel phát triển kết hợp AI tạo sinh với quy chuẩn lập trình giao diện web hiện đại. Chỉ cần mô tả giao diện dashboard hay landing page, v0 sẽ tạo ngay mã nguồn React chuẩn Tailwind CSS và shadcn/ui chỉ việc sao chép vào dự án.",
        "directAnswer_en": "v0 is Vercel's generative user interface platform. Tailored specifically for modern Next.js and React developers, it transforms plain text prompts and design screenshots into semantic, accessible, production-grade components that run immediately in your browser. Plans start at $20/month with a free starter tier.",
        "directAnswer_vi": "v0 là nền tảng khởi tạo giao diện người dùng AI của Vercel. Được thiết kế chuyên biệt cho các lập trình viên Next.js và React, phần mềm biến văn bản hoặc ảnh chụp màn hình thiết kế thành các component React chuẩn mực, dễ bảo trì và có thể chạy thử trực tiếp. Giá từ $20/tháng kèm gói miễn phí.",
        "hubs": ["website-builder", "research-agent"],
        "tags": ["v0", "Vercel", "Generative UI", "React", "shadcn/ui", "Tailwind CSS"],
        "startingPrice": 20,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 14,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://v0.dev/?via={code}",
        "adminAffiliateUrl": "https://v0.dev/?via=asmire_admin",
        "rating": 4.9,
        "reviewCount": 7100,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Full-stack engineers, Next.js developers, and product designers wanting to prototype web apps 10x faster with clean production code.",
        "bestFor_vi": "Kỹ sư full-stack, lập trình viên Next.js và nhà thiết kế sản phẩm muốn dựng mẫu giao diện nhanh hơn gấp 10 lần với mã nguồn sạch đẹp.",
        "notFor_en": "Non-technical users looking for simple no-code drag-and-drop website hosting like Wix.",
        "notFor_vi": "Người dùng không chuyên kỹ thuật muốn kéo thả web đơn giản không đụng chạm đến mã nguồn.",
        "bottomLine_en": "The premier tool for modern web UI creation, producing the cleanest, most production-ready React code anywhere in the AI landscape.",
        "bottomLine_vi": "Công cụ số một cho lập trình giao diện web hiện đại, tạo ra mã nguồn React sạch sẽ và chuẩn mực nhất trong thế giới AI.",
        "pros_en": [
            "Generates semantic, accessible React components styled strictly with Tailwind CSS and shadcn/ui",
            "Interactive live preview window allows clicking, toggling, and testing states directly in the browser",
            "One-click CLI command (npx v0 add) imports generated components straight into your Next.js project",
            "Supports image upload to recreate design mockups or screenshots into working code"
        ],
        "pros_vi": [
            "Sinh ra mã nguồn React chuẩn ngữ nghĩa, tích hợp sẵn phong cách Tailwind CSS và thư viện shadcn/ui thời thượng",
            "Cửa sổ xem trước trực tiếp (Live Preview) cho phép bấm thử, chuyển đổi trạng thái giao diện ngay trên trình duyệt",
            "Lệnh dòng lệnh tiện lợi (npx v0 add) tải thẳng component vừa tạo vào thư mục dự án Next.js chỉ trong 1 giây",
            "Hỗ trợ tải ảnh thiết kế lên để AI tự động chuyển ảnh chụp màn hình thành code hoạt động thực tế"
        ],
        "cons_en": [
            "Premium usage credits are consumed for complex iterations and image-to-code conversions",
            "Focused strictly on frontend UI components rather than full server-side backend logic"
        ],
        "cons_vi": [
            "Hạn mức credit tiêu hao khi yêu cầu chỉnh sửa tinh chỉnh nhiều lần hoặc chuyển đổi từ ảnh thiết kế phức tạp",
            "Tập trung chuyên biệt cho giao diện frontend chứ không tự dựng toàn bộ logic cơ sở dữ liệu backend phức tạp"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["200 credits/mo", "Public generations", "React & Tailwind exports", "Interactive live preview"]},
            {"name": "Premium", "priceMonthly": 20, "priceAnnualMonthly": 20, "features": ["5,000 credits/mo", "Private generations mode", "Image-to-UI uploads", "Unlimited CLI imports"], "isPopular": True},
            {"name": "Enterprise", "priceMonthly": 50, "priceAnnualMonthly": 40, "features": ["Custom team credit pools", "SAML SSO integration", "Centralized team repository", "Dedicated support"]}
        ],
        "officialUrl": "https://v0.dev",
        "alternatives": ["bolt-new", "lovable", "framer"],
        "domain": "v0.dev",
        "g2": "v0-vercel",
        "ph": "v0-by-vercel",
        "reddit": "r/nextjs"
    }
]

print(f"Prepared {len(RECAP_20_TOOLS)} elite tools from AIToolsRecap!")
