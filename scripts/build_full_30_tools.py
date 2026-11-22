# -*- coding: utf-8 -*-
"""
Build and Sync All 30 New Tier-1 AI SaaS Tools into Asmire
Source: AIxploria (https://www.aixploria.com/en/ultimate-list-ai/)
"""

import os
import re
import json
import urllib.request
import ast

# 1. Parse existing 24 tools from scripts/test_new_tools_spec.py
with open('scripts/test_new_tools_spec.py', 'r', encoding='utf-8') as f:
    spec_content = f.read()

m = spec_content.find('[')
e = spec_content.rfind(']')
raw = spec_content[m:e+1].replace(': true', ': True').replace(': false', ': False').replace(': null', ': None')
base_24_tools = ast.literal_eval(raw)

# 2. Define the 6 additional top-tier AI tools from AIxploria
extra_6_tools = [
    {
        "slug": "leonardo-ai",
        "name": "Leonardo.Ai",
        "tagline_en": "Creative generative AI platform for concept art, game assets, and high-fidelity production design.",
        "tagline_vi": "Nền tảng AI sáng tạo hàng đầu cho thiết kế ý tưởng, tài nguyên game và hình ảnh thương mại chất lượng cao.",
        "desc_en": "Leonardo.Ai empowers visual artists and creative teams to generate production-ready assets with fine-tuned custom models, interactive canvas editing, and 3D texture generation.",
        "desc_vi": "Leonardo.Ai trao quyền cho các nghệ sĩ và nhóm thiết kế sáng tạo tài nguyên đồ họa chất lượng cao thông qua các mô hình AI tùy chỉnh, trình chỉnh sửa canvas trực quan và tạo vân bề mặt 3D.",
        "directAnswer_en": "Leonardo.Ai is a powerhouse generative image platform tailored for production artists, game studios, and marketing agencies. Unlike basic prompt-to-image tools, it offers fine-tuned LoRA model training, real-time Canvas inpainting/outpainting, and motion generation. It features a generous free tier (150 daily tokens) and paid plans from $12/month.",
        "directAnswer_vi": "Leonardo.Ai là nền tảng đồ họa AI chuyên sâu dành cho nghệ sĩ, studio phát triển game và nhóm thiết kế thương mại. Điểm vượt trội so với các công cụ tạo ảnh thông thường là khả năng tự huấn luyện mô hình LoRA riêng, trình chỉnh sửa Canvas mở rộng ảnh trực quan và chuyển ảnh thành video ngắn. Có gói miễn phí 150 token/ngày và các gói trả phí từ $12/tháng.",
        "hubs": ["presentation-design", "advertising"],
        "tags": ["AI Art", "Game Assets", "Image Generator", "LoRA Training", "Canvas Editor"],
        "startingPrice": 12,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 7,
        "affiliateNetwork": "Rewardful",
        "affiliateUrlTemplate": "https://leonardo.ai/?via={code}",
        "adminAffiliateUrl": "https://leonardo.ai/?via=asmire_admin",
        "rating": 4.8,
        "reviewCount": 3600,
        "verifiedAt": "2027-11-21",
        "bestFor_en": "Game developers, digital illustrators, and branding teams seeking full control over artistic style and model fine-tuning.",
        "bestFor_vi": "Nhà phát triển game, họa sĩ kỹ thuật số và đội ngũ thương hiệu cần kiểm soát tuyệt đối phong cách nghệ thuật.",
        "notFor_en": "Users looking only for raw photorealistic stock photos without artistic stylization.",
        "notFor_vi": "Người dùng chỉ có nhu cầu tìm ảnh chụp đời thực cơ bản không cần tinh chỉnh nghệ thuật.",
        "bottomLine_en": "The most versatile and production-focused AI art generator available, bridging the gap between Midjourney aesthetic and Photoshop control.",
        "bottomLine_vi": "Công cụ đồ họa AI đa năng và hướng tới sản xuất hàng đầu hiện nay, kết hợp hoàn hảo giữa độ thẩm mỹ của Midjourney và quyền kiểm soát của Photoshop.",
        "pros_en": [
            "150 daily fast tokens on the permanently free plan",
            "Ability to train custom LoRA models on your own brand assets and character sheets",
            "Real-time AI Canvas for inpainting, outpainting, and element repositioning",
            "Motion generation converting still images into 4-second cinematic clips"
        ],
        "pros_vi": [
            "Cung cấp 150 token miễn phí mỗi ngày duy trì vĩnh viễn",
            "Cho phép huấn luyện mô hình LoRA tùy chỉnh theo nhận diện thương hiệu hoặc nhân vật riêng",
            "AI Canvas cho phép vẽ bù, mở rộng khung hình và thay đổi chi tiết trực quan theo thời gian thực",
            "Tính năng tạo chuyển động biến ảnh tĩnh thành video điện ảnh ngắn 4 giây mượt mà"
        ],
        "cons_en": [
            "Advanced settings (guidance scale, prompt weights, scheduler) can overwhelm casual beginners",
            "Ultra-high resolution 4K upscaling consumes significant token credits"
        ],
        "cons_vi": [
            "Các thông số kỹ thuật chuyên sâu (guidance scale, trọng số prompt) có thể hơi phức tạp cho người mới",
            "Tính năng phóng to ảnh siêu nét 4K tiêu tốn khá nhiều token"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["150 fast tokens/day", "Up to 30 upscale/day", "Standard models", "Community feed"]},
            {"name": "Apprentice", "priceMonthly": 12, "priceAnnualMonthly": 10, "features": ["8,500 fast tokens/mo", "Unlimited slow generations", "10 concurrent jobs", "Private generations"], "isPopular": True},
            {"name": "Artisan Unlimited", "priceMonthly": 30, "priceAnnualMonthly": 24, "features": ["25,000 fast tokens/mo", "Unlimited relaxed generations", "Custom model training", "Priority support"]}
        ],
        "officialUrl": "https://leonardo.ai",
        "alternatives": ["canva-ai", "adcreative", "runway"],
        "g2": {"rating": 4.7, "count": 890},
        "tp": {"rating": 4.6, "count": 1250},
        "ph": {"rating": 4.9, "count": 3100}
    },
    {
        "slug": "ideogram",
        "name": "Ideogram AI",
        "tagline_en": "State-of-the-art AI image generator renowned for flawless typography and graphic design compositions.",
        "tagline_vi": "Công cụ tạo ảnh AI đột phá nổi tiếng với khả năng hiển thị chữ viết chính xác tuyệt đối và bố cục đồ họa đẹp mắt.",
        "desc_en": "Ideogram solves the hardest challenge in generative image models: coherent, stylized text rendering. It is the premier tool for creating typography posters, t-shirt prints, logos, and advertising graphics.",
        "desc_vi": "Ideogram giải quyết thách thức lớn nhất của các mô hình vẽ tranh AI: hiển thị chữ viết chính xác, đúng chính tả và có tính thẩm mỹ cao. Đây là lựa chọn số một để thiết kế poster, áo thun, logo và ấn phẩm quảng cáo.",
        "directAnswer_en": "Ideogram 2.0 is the gold standard for text-in-image generation and graphic typography. While other models produce gibberish lettering, Ideogram renders long words, quotes, and brand slogans with crisp vector-like fidelity and color palettes. Plans start at $8/month with a free daily plan.",
        "directAnswer_vi": "Ideogram 2.0 là thước đo chuẩn mực cho việc vẽ chữ trong hình ảnh và thiết kế typography. Trong khi các công cụ AI khác thường làm biến dạng con chữ, Ideogram hiển thị chính xác từng từ ngữ, câu trích dẫn và slogan thương hiệu với độ sắc nét như đồ họa vector. Giá từ $8/tháng kèm gói miễn phí hàng ngày.",
        "hubs": ["advertising", "presentation-design"],
        "tags": ["AI Typography", "Graphic Design", "Logo Design", "T-Shirt Design", "Text to Image"],
        "startingPrice": 8,
        "hasFreePlan": True,
        "hasFreeTrial": False,
        "trialDays": 0,
        "affiliateNetwork": "Rewardful",
        "affiliateUrlTemplate": "https://ideogram.ai/?via={code}",
        "adminAffiliateUrl": "https://ideogram.ai/?via=asmire_admin",
        "rating": 4.8,
        "reviewCount": 2100,
        "bestFor_en": "Graphic designers, print-on-demand sellers, and marketers needing accurate text, slogans, and typography on visual assets.",
        "bestFor_vi": "Nhà thiết kế đồ họa, người làm Print-on-Demand (POD) và marketer cần chèn chữ, slogan chuẩn xác lên ấn phẩm hình ảnh.",
        "notFor_en": "Video editors seeking animated motion or timeline-based video generation.",
        "notFor_vi": "Biên tập viên video cần dựng chuyển động hoạt họa hoặc dựng video theo dòng thời gian.",
        "bottomLine_en": "If your creative visual requires readable words, logos, or typography layouts, Ideogram is unchallenged across the AI landscape.",
        "bottomLine_vi": "Nếu thiết kế của bạn cần hiển thị chữ rõ ràng, logo hoặc bố cục typography, Ideogram là công cụ số một không đối thủ.",
        "pros_en": [
            "Unrivaled accuracy in rendering English and Latin typography without spelling artifacts",
            "Magic Prompt feature automatically enriches brief prompts into photorealistic instructions",
            "Style palettes and aspect ratio locks for social media and merchandise sizing",
            "Fast web generation with free daily credits for registered users"
        ],
        "pros_vi": [
            "Độ chính xác vô song trong việc vẽ chữ viết không bị lỗi chính tả hay biến dạng ký tự",
            "Tính năng Magic Prompt tự động làm giàu câu lệnh ngắn thành hướng dẫn chi tiết sống động",
            "Hỗ trợ sẵn các bảng phối màu phong cách và cố định tỷ lệ khung hình cho mạng xã hội",
            "Tốc độ tạo ảnh nhanh trên trình duyệt kèm lượt dùng miễn phí mỗi ngày"
        ],
        "cons_en": [
            "Free tier generations are publicly visible in the community explorer",
            "Limited inpainting and brush-based localized editing compared to Photoshop"
        ],
        "cons_vi": [
            "Các ảnh tạo ở gói miễn phí được công khai trên bảng tin cộng đồng",
            "Tính năng xóa sửa vùng chọn cục bộ (inpainting) còn cơ bản hơn Photoshop"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["10 slow prompts/day", "Public gallery", "Standard resolution", "Magic Prompt"]},
            {"name": "Basic", "priceMonthly": 8, "priceAnnualMonthly": 7, "features": ["400 priority prompts/mo", "100 slow prompts/day", "Private generation mode", "Image editor access"], "isPopular": True},
            {"name": "Plus", "priceMonthly": 20, "priceAnnualMonthly": 16, "features": ["1,000 priority prompts/mo", "Unlimited slow prompts", "Bulk generation", "Top priority rendering"]}
        ],
        "officialUrl": "https://ideogram.ai",
        "alternatives": ["canva-ai", "leonardo-ai", "adcreative"],
        "g2": {"rating": 4.8, "count": 420},
        "tp": {"rating": 4.5, "count": 680},
        "ph": {"rating": 4.9, "count": 1850}
    },
    {
        "slug": "replit",
        "name": "Replit AI Agent",
        "tagline_en": "Cloud-based collaborative IDE with an autonomous AI agent that builds, tests, and deploys full-stack apps.",
        "tagline_vi": "Môi trường lập trình đám mây tích hợp trợ lý AI tự động xây dựng, kiểm thử và triển khai ứng dụng trọn gói.",
        "desc_en": "Replit combines an online multi-language IDE with Replit Agent, an autonomous software engineer capable of taking plain-English requirements and constructing working web applications, databases, and APIs in minutes.",
        "desc_vi": "Replit kết hợp môi trường lập trình đám mây đa ngôn ngữ với Replit Agent - kỹ sư phần mềm AI tự trị có khả năng nhận yêu cầu bằng văn bản và xây dựng hoàn chỉnh ứng dụng web, cơ sở dữ liệu và API trong vài phút.",
        "directAnswer_en": "Replit Agent is an autonomous cloud coding assistant that handles everything from scaffolding project files and installing dependencies to configuring PostgreSQL databases and deploying live URLs. It operates directly inside Replit's cloud container environment. Plans start at $25/month for Replit Core with agent access.",
        "directAnswer_vi": "Replit Agent là trợ lý lập trình đám mây tự động đảm nhiệm toàn bộ quy trình: từ khởi tạo cấu trúc thư mục, cài đặt gói phụ thuộc, thiết lập cơ sở dữ liệu PostgreSQL cho đến xuất bản đường dẫn website chạy thực tế. Giá gói Replit Core từ $25/tháng kèm quyền truy cập AI Agent.",
        "hubs": ["research-agent", "website-builder"],
        "tags": ["AI Coding Agent", "Cloud IDE", "Full-Stack Deployment", "PostgreSQL", "No-Setup Coding"],
        "startingPrice": 25,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 7,
        "affiliateNetwork": "Impact",
        "affiliateUrlTemplate": "https://replit.com/?via={code}",
        "adminAffiliateUrl": "https://replit.com/?via=asmire_admin",
        "rating": 4.7,
        "reviewCount": 4200,
        "bestFor_en": "Founders, solo entrepreneurs, and developers who want to prototype and host full-stack SaaS apps without setting up local dev environments.",
        "bestFor_vi": "Nhà sáng lập, lập trình viên độc lập muốn tạo mẫu nhanh và triển khai ứng dụng SaaS trực tiếp lên mạng mà không cần cài đặt môi trường máy cá nhân.",
        "notFor_en": "Large enterprise engineering organizations bound strictly to on-premise air-gapped repositories.",
        "notFor_vi": "Các tập đoàn lớn bắt buộc phải lưu trữ mã nguồn nội bộ trên máy chủ bảo mật vật lý riêng biệt.",
        "bottomLine_en": "Replit Agent removes 95% of developer friction, turning conversational prompts into live, clickable web applications with database backends.",
        "bottomLine_vi": "Replit Agent xóa bỏ 95% rào cản kỹ thuật thiết lập ban đầu, biến những câu mô tả bằng văn bản thành ứng dụng web hoạt động thực tế có cơ sở dữ liệu.",
        "pros_en": [
            "Complete zero-setup development: works instantly from any modern web browser or iPad",
            "Replit Agent autonomously installs npm/pip packages, fixes runtime bugs, and runs dev servers",
            "Built-in one-click cloud hosting with custom domains, SSL certificates, and serverless Postgres",
            "Real-time multiplayer coding and pair programming with team members"
        ],
        "pros_vi": [
            "Hoàn toàn không cần cài đặt phần mềm: lập trình ngay trên trình duyệt web hoặc máy tính bảng",
            "Replit Agent tự động cài đặt thư viện phụ thuộc, tự sửa lỗi phát sinh và khởi chạy máy chủ",
            "Triển khai đám mây chỉ bằng 1 cú nhấp chuột có sẵn tên miền tùy chỉnh, chứng chỉ SSL và Postgres",
            "Hỗ trợ làm việc nhóm thời gian thực (multiplayer) mượt mà như Google Docs"
        ],
        "cons_en": [
            "Requires active internet connection since all computation runs on Replit cloud containers",
            "Cloud resource scaling costs can grow for high-traffic production workloads"
        ],
        "cons_vi": [
            "Bắt buộc phải có mạng internet vì toàn bộ mã nguồn và máy chủ chạy trên đám mây Replit",
            "Chi phí tài nguyên đám mây có thể tăng khi ứng dụng có lượng truy cập lớn trong thực tế"
        ],
        "pricing": [
            {"name": "Starter", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["Basic cloud workspaces", "Community access", "Standard compute", "Public repls"]},
            {"name": "Replit Core", "priceMonthly": 25, "priceAnnualMonthly": 20, "features": ["Replit Agent access", "Unlimited private repls", "Fast cloud compute", "$10/mo deployment credits"], "isPopular": True},
            {"name": "Teams", "priceMonthly": 40, "priceAnnualMonthly": 35, "features": ["Centralized billing", "Role-based access control", "Shared agent memory", "Dedicated support"]}
        ],
        "officialUrl": "https://replit.com",
        "alternatives": ["cursor", "bolt-new", "lovable"],
        "g2": {"rating": 4.6, "count": 680},
        "tp": {"rating": 4.5, "count": 1150},
        "ph": {"rating": 4.9, "count": 3400}
    },
    {
        "slug": "windsurf",
        "name": "Windsurf Editor",
        "tagline_en": "Agentic AI code editor by Codeium featuring Cascade flow for synchronized multi-file reasoning and deep codebase context.",
        "tagline_vi": "Trình soạn thảo mã nguồn tích hợp AI Agent từ Codeium với luồng Cascade thấu hiểu sâu toàn bộ codebase và đồng bộ nhiều file.",
        "desc_en": "Windsurf is an agentic IDE designed to keep developers in deep flow. Its Cascade engine acts as a collaborative partner that reasons across your entire project, anticipates terminal commands, and edits code alongside you in real time.",
        "desc_vi": "Windsurf là IDE tích hợp AI Agent thế hệ mới từ Codeium. Công nghệ Cascade đóng vai trò như một cộng sự lập trình thông minh: thấu hiểu toàn bộ dự án, dự đoán lệnh terminal và tự động chỉnh sửa code đồng bộ trên nhiều tệp tin.",
        "directAnswer_en": "Windsurf (created by Codeium) is a native fork of VS Code built from the ground up for agentic programming. Its standout feature, Cascade, combines conversational AI with proactive autonomous action—reading linter errors, running shell commands, and applying multi-file edits simultaneously. Plans start at $15/month with a free starter plan.",
        "directAnswer_vi": "Windsurf (được phát triển bởi đội ngũ Codeium) là phiên bản tối ưu của VS Code dành riêng cho kỷ nguyên AI Agent. Điểm cốt lõi là Cascade - kết hợp giữa trò chuyện thông minh và hành động tự trị: đọc thông báo lỗi của linter, thực thi lệnh terminal và sửa nhiều file cùng lúc. Giá từ $15/tháng kèm gói dùng thử miễn phí.",
        "hubs": ["research-agent"],
        "tags": ["AI IDE", "Cascade Agent", "Codeium", "Multi-File Editing", "Context Awareness"],
        "startingPrice": 15,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 14,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://codeium.com/windsurf?via={code}",
        "adminAffiliateUrl": "https://codeium.com/windsurf?via=asmire_admin",
        "rating": 4.9,
        "reviewCount": 1850,
        "bestFor_en": "Software engineers and full-stack developers who want a seamless, fast AI coding assistant that feels deeply native to VS Code.",
        "bestFor_vi": "Lập trình viên phần mềm và full-stack developer muốn một trợ lý AI viết code tốc độ cao, thấu hiểu dự án và tương thích hoàn toàn với VS Code.",
        "notFor_en": "Non-technical users looking for no-code visual drag-and-drop website builders.",
        "notFor_vi": "Người dùng không chuyên kỹ thuật muốn kéo thả web không cần chạm vào code.",
        "bottomLine_en": "The chief rival to Cursor, Windsurf delivers unmatched flow state responsiveness and revolutionary multi-file context tracking.",
        "bottomLine_vi": "Đối thủ cạnh tranh trực tiếp lớn nhất của Cursor, Windsurf mang đến trải nghiệm lập trình tập trung cao độ và khả năng đồng bộ ngữ cảnh đa file vượt trội.",
        "pros_en": [
            "Cascade engine deeply coordinates terminal actions, directory traversal, and code edits",
            "Superfast response latency powered by Codeium's proprietary indexing infrastructure",
            "100% compatibility with existing VS Code extensions, themes, and keybindings",
            "Generous free tier with real-time autocompletions and basic Cascade access"
        ],
        "pros_vi": [
            "Công cụ Cascade kết hợp chặt chẽ giữa lệnh dòng lệnh terminal, duyệt cây thư mục và chỉnh sửa code",
            "Độ trễ phản hồi cực thấp nhờ hạ tầng lập chỉ mục mã nguồn độc quyền của Codeium",
            "Tương thích 100% với các tiện ích mở rộng (extension), giao diện và phím tắt của VS Code",
            "Gói miễn phí hào phóng với tính năng gợi ý code thời gian thực và trải nghiệm Cascade cơ bản"
        ],
        "cons_en": [
            "Still rolling out advanced enterprise administrative audit dashboards",
            "Requires initial full codebase indexing on massive gigabyte-scale repositories"
        ],
        "cons_vi": [
            "Các tính năng quản trị bảng điều khiển kiểm toán cấp doanh nghiệp lớn đang được tiếp tục hoàn thiện",
            "Cần thời gian lập chỉ mục ban đầu đối với các kho mã nguồn khổng lồ hàng chục gigabyte"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["Unlimited fast autocomplete", "Basic Cascade agent credits", "Context indexation", "Community support"]},
            {"name": "Pro", "priceMonthly": 15, "priceAnnualMonthly": 12, "features": ["Unlimited Cascade agent access", "Claude 3.5 Sonnet & GPT-4o models", "Priority index servers", "Zero data training lock"], "isPopular": True},
            {"name": "Enterprise", "priceMonthly": 30, "priceAnnualMonthly": 25, "features": ["SAML SSO & audit logs", "Custom self-hosted indexing", "Dedicated customer success", "SOC2 Type II compliance"]}
        ],
        "officialUrl": "https://codeium.com/windsurf",
        "alternatives": ["cursor", "bolt-new", "replit"],
        "g2": {"rating": 4.8, "count": 310},
        "tp": {"rating": 4.7, "count": 480},
        "ph": {"rating": 4.9, "count": 2100}
    },
    {
        "slug": "chatpdf",
        "name": "ChatPDF",
        "tagline_en": "Instant AI document assistant that analyzes, extracts, and summarizes lengthy PDF documents and research papers.",
        "tagline_vi": "Trợ lý tài liệu AI thông minh giúp phân tích, trích xuất dữ liệu và tóm tắt nhanh các file PDF và bài nghiên cứu dài.",
        "desc_en": "ChatPDF turns any PDF into a conversational partner. Students, researchers, and legal professionals upload textbooks, financial statements, and contracts to extract instant citations, summaries, and answers.",
        "desc_vi": "ChatPDF biến bất kỳ tài liệu PDF nào thành một đối tác trò chuyện thông minh. Sinh viên, nhà nghiên cứu và luật sư có thể tải lên sách giáo trình, báo cáo tài chính hay hợp đồng để trích xuất ngay trích dẫn, tóm tắt và lời giải đáp chính xác.",
        "directAnswer_en": "ChatPDF is the world's most widely adopted document Q&A assistant. Using semantic embeddings, it reads through 1,000+ page technical manuals, annual reports, and research papers, answering questions with exact page references. Plans start at $5/month with a free daily plan.",
        "directAnswer_vi": "ChatPDF là công cụ hỏi đáp tài liệu phổ biến nhất hiện nay. Ứng dụng công nghệ vector embedding, phần mềm có thể đọc hiểu tài liệu hướng dẫn kỹ thuật dày hơn 1.000 trang, báo cáo tài chính và luận văn, trả lời kèm số trang trích dẫn chính xác. Giá từ $5/tháng kèm gói dùng thử miễn phí.",
        "hubs": ["research-agent", "meeting-productivity"],
        "tags": ["PDF AI", "Document Q&A", "Research Assistant", "Academic Summaries", "Paper Reader"],
        "startingPrice": 5,
        "hasFreePlan": True,
        "hasFreeTrial": True,
        "trialDays": 7,
        "affiliateNetwork": "Rewardful",
        "affiliateUrlTemplate": "https://www.chatpdf.com/?via={code}",
        "adminAffiliateUrl": "https://www.chatpdf.com/?via=asmire_admin",
        "rating": 4.8,
        "reviewCount": 4900,
        "bestFor_en": "Students, academic researchers, accountants, and lawyers reviewing dense technical or legal PDF files.",
        "bestFor_vi": "Sinh viên, nhà nghiên cứu học thuật, kế toán viên và luật sư thường xuyên phải đọc tài liệu kỹ thuật hoặc hợp đồng pháp lý dày đặc.",
        "notFor_en": "Teams needing complex spreadsheet calculations or formula execution.",
        "notFor_vi": "Người dùng cần tính toán công thức bảng tính Excel phức tạp.",
        "bottomLine_en": "The easiest and most dependable tool for extracting factual information, executive summaries, and citations from any PDF.",
        "bottomLine_vi": "Công cụ đơn giản và đáng tin cậy nhất để trích xuất thông tin thực tế, bản tóm tắt điều hành và nguồn trích dẫn từ bất kỳ file PDF nào.",
        "pros_en": [
            "Upload and chat instantly without mandatory sign-up or complex onboarding",
            "Exact page number citations for every fact or quotation referenced in the answer",
            "Multi-language support: ask questions in Vietnamese or English on foreign-language PDFs",
            "Organized folder collections and multi-PDF synthesis on the Plus tier"
        ],
        "pros_vi": [
            "Tải file lên và hỏi đáp được ngay mà không bắt buộc phải đăng ký tài khoản rườm rà",
            "Trích dẫn số trang chính xác cho từng dữ kiện hoặc câu trích dẫn trong câu trả lời",
            "Hỗ trợ đa ngôn ngữ vượt trội: hỏi bằng tiếng Việt trên tài liệu gốc bằng tiếng Anh hoặc tiếng Đức",
            "Quản lý theo thư mục và tổng hợp thông tin từ nhiều file PDF cùng lúc trên gói Plus"
        ],
        "cons_en": [
            "Free tier caps PDF file size at 120 pages (32MB) per document",
            "Scanned handwritten documents require OCR pre-processing for best accuracy"
        ],
        "cons_vi": [
            "Gói miễn phí giới hạn dung lượng file tối đa 120 trang (32MB) cho mỗi tài liệu",
            "Tài liệu viết tay chụp mờ cần được quét OCR rõ nét trước để đạt độ chính xác cao nhất"
        ],
        "pricing": [
            {"name": "Free", "priceMonthly": 0, "priceAnnualMonthly": 0, "features": ["2 PDFs/day (up to 120 pages)", "50 questions/day", "32MB file limit", "Export chat history"]},
            {"name": "Plus", "priceMonthly": 5, "priceAnnualMonthly": 4.16, "features": ["Unlimited PDFs & questions", "Up to 2,000 pages/PDF (50MB)", "Multi-PDF folder chats", "Priority AI model reasoning"], "isPopular": True},
            {"name": "Team", "priceMonthly": 15, "priceAnnualMonthly": 12, "features": ["Shared team workspaces", "Centralized PDF vault", "Admin controls", "Dedicated API access"]}
        ],
        "officialUrl": "https://www.chatpdf.com",
        "alternatives": ["perplexity", "paperguide", "notion-ai"],
        "g2": {"rating": 4.7, "count": 820},
        "tp": {"rating": 4.6, "count": 1400},
        "ph": {"rating": 4.9, "count": 2700}
    },
    {
        "slug": "turnitin",
        "name": "Turnitin AI Detector",
        "tagline_en": "Industry-standard academic integrity platform for detecting AI-generated text and cross-institutional plagiarism.",
        "tagline_vi": "Nền tảng kiểm định tính liêm chính học thuật chuẩn mực thế giới về phát hiện văn bản AI và chống đạo văn liên trường.",
        "desc_en": "Turnitin is the premier plagiarism and AI writing detection system used by 16,000+ educational institutions globally, offering comprehensive similarity scoring and machine-learning text classification.",
        "desc_vi": "Turnitin là hệ thống kiểm tra đạo văn và phát hiện văn bản do AI tạo hàng đầu thế giới được hơn 16.000 trường đại học và viện nghiên cứu tin dùng, cung cấp điểm tương đồng toàn diện và phân tích cấu trúc ngôn ngữ.",
        "directAnswer_en": "Turnitin is the global academic benchmark for plagiarism and AI text detection. Its AI Writing Detection model boasts a 98% confidence score in identifying content generated by GPT-4, Claude, and Gemini, cross-referencing against an archive of 1.8 billion student papers and scholarly journals. Institutional pricing with custom quote models.",
        "directAnswer_vi": "Turnitin là chuẩn mực học thuật quốc tế về phát hiện đạo văn và văn bản AI. Mô hình AI Writing Detection đạt độ tin cậy tới 98% khi nhận diện nội dung do GPT-4, Claude và Gemini tạo ra, đối soát với kho dữ liệu khổng lồ gồm 1,8 tỷ bài luận và tạp chí khoa học toàn cầu. Báo giá tùy chỉnh theo quy mô trường học và viện nghiên cứu.",
        "hubs": ["ai-detection"],
        "tags": ["AI Detection", "Plagiarism Checker", "Academic Integrity", "University Standard", "Similarity Report"],
        "startingPrice": 20,
        "hasFreePlan": False,
        "hasFreeTrial": True,
        "trialDays": 14,
        "affiliateNetwork": "Direct",
        "affiliateUrlTemplate": "https://www.turnitin.com/?via={code}",
        "adminAffiliateUrl": "https://www.turnitin.com/?via=asmire_admin",
        "rating": 4.6,
        "reviewCount": 5100,
        "bestFor_en": "Universities, academic faculties, publishers, and schools requiring certified anti-plagiarism and AI writing verification.",
        "bestFor_vi": "Các trường đại học, hội đồng học thuật, nhà xuất bản và cơ sở đào tạo cần chứng nhận chống đạo văn và kiểm định văn bản AI chuẩn mực.",
        "notFor_en": "Individual casual bloggers looking for a 1-click free grammar fix.",
        "notFor_vi": "Người viết blog cá nhân thông thường chỉ cần kiểm tra lỗi ngữ pháp cơ bản miễn phí.",
        "bottomLine_en": "The universally recognized gold standard in higher education integrity, offering the most extensive global comparison database.",
        "bottomLine_vi": "Thước đo tiêu chuẩn vàng được công nhận trên toàn thế giới trong giáo dục đại học, sở hữu kho dữ liệu đối chiếu học thuật rộng lớn nhất.",
        "pros_en": [
            "Massive global repository of 1.8B+ student papers, 91B+ active web pages, and 190M+ scholarly articles",
            "Specialized AI writing detection trained specifically on synthetic model patterns",
            "Comprehensive color-coded Similarity Report showing matched sentence sources",
            "Seamless integration into Canvas, Blackboard, Moodle, and Google Classroom"
        ],
        "pros_vi": [
            "Kho lưu trữ toàn cầu khổng lồ với hơn 1,8 tỷ bài luận sinh viên, 91 tỷ trang web và 190 triệu bài báo khoa học",
            "Thuật toán phát hiện văn bản AI chuyên biệt được huấn luyện trên cấu trúc tạo từ của các mô hình LLM lớn",
            "Báo cáo tương đồng (Similarity Report) trực quan phân biệt bằng mã màu rõ ràng chỉ rõ từng nguồn gốc",
            "Tích hợp hoàn hảo vào các hệ thống quản lý học tập phổ biến như Canvas, Blackboard, Moodle"
        ],
        "cons_en": [
            "Primarily sold via institutional educational licenses rather than self-serve monthly credit card plans",
            "False positive considerations require human pedagogical review for fair grading"
        ],
        "cons_vi": [
            "Chủ yếu phân phối qua giấy phép tổ chức trường học thay vì đăng ký tự động theo tháng cho cá nhân",
            "Cần sự đánh giá đối chiếu của giảng viên để đảm bảo tính công bằng trước tỷ lệ dương tính giả"
        ],
        "pricing": [
            {"name": "Instructor / Pilot", "priceMonthly": 20, "priceAnnualMonthly": 15, "features": ["Similarity Report", "AI writing percentage", "LMS integration", "Standard support"]},
            {"name": "Campus License", "priceMonthly": 50, "priceAnnualMonthly": 40, "features": ["Unlimited student submissions", "Full institutional database", "Originality checking", "Custom API integration"], "isPopular": True},
            {"name": "Enterprise Consortium", "priceMonthly": 120, "priceAnnualMonthly": 100, "features": ["Multi-campus federation", "Dedicated account director", "Custom data retention", "SLA uptime guarantee"]}
        ],
        "officialUrl": "https://www.turnitin.com",
        "alternatives": ["gptzero", "originality", "winston"],
        "g2": {"rating": 4.5, "count": 2100},
        "tp": {"rating": 4.3, "count": 1800},
        "ph": {"rating": 4.7, "count": 1200}
    }
]

ALL_30_NEW_TOOLS = base_24_tools + extra_6_tools
print(f"Total new tools prepared: {len(ALL_30_NEW_TOOLS)}")

# Check for duplicates within new tools
slugs = [t['slug'] for t in ALL_30_NEW_TOOLS]
assert len(slugs) == len(set(slugs)), f"Duplicate slugs in new tools: {[s for s in slugs if slugs.count(s) > 1]}"

# Check for duplicates with existing tools
with open('src/data/tools-data.ts', 'r', encoding='utf-8') as f:
    existing_file = f.read()

existing_slugs = set(re.findall(r'slug:\s*"([^"]+)"', existing_file))
collision = existing_slugs.intersection(set(slugs))
if collision:
    raise ValueError(f"Collisions with existing tools: {collision}")

print("Verification passed! No duplicate slugs within new tools or against existing tools.")
