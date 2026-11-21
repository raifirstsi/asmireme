import json

tools_raw = [
    # 1-10
    ("highlevel", "HighLevel (GoHighLevel)", ["sales-crm", "website-builder"], 97, False, True, 14, "FirstPromoter", "https://www.gohighlevel.com/?fp_ref={code}", 4.8, 3420,
     "All-in-one AI marketing, CRM, and agency automation platform.", "Nền tảng tự động hóa tiếp thị, CRM và vận hành agency tất cả trong một.",
     "GoHighLevel consolidates CRM, email marketing, SMS, sales funnels, appointment booking, and AI conversational receptionists into a single white-label dashboard.",
     "GoHighLevel hợp nhất CRM, email marketing, SMS, phễu bán hàng, đặt lịch hẹn và trợ lý AI vào một giao diện duy nhất cho phép gắn thương hiệu riêng (white-label).",
     "HighLevel is the leading all-in-one CRM and marketing automation platform for agencies and small businesses. It replaces 10+ software subscriptions starting at $97/mo, with unlimited sub-accounts on the $297 plan.",
     "HighLevel là nền tảng CRM và tự động hóa marketing hàng đầu cho agency và doanh nghiệp vừa/nhỏ, thay thế hơn 10 phần mềm riêng lẻ từ $97/tháng với quyền tạo không giới hạn tài khoản phụ ở gói $297.",
     ["CRM", "Agency", "Automation", "Funnels", "Email"], ["nutshell", "getresponse"]),

    ("decktopus", "Decktopus AI", ["presentation-design"], 14.99, True, True, 7, "Rewardful", "https://decktopus.com/?via={code}", 4.5, 980,
     "Instant AI presentation builder with structured templates and voiceover.", "Công cụ tạo slide thuyết trình bằng AI với bố cục chuẩn và lồng tiếng tự động.",
     "Decktopus AI generates full slide presentations, talking head video integration, interactive forms, and automated speaker notes from simple text prompts.",
     "Decktopus AI tự động tạo slide thuyết trình hoàn chỉnh, tích hợp video người nói, biểu mẫu tương tác và lời thoại thuyết minh chỉ từ câu lệnh văn bản.",
     "Decktopus AI creates clean, professional slide decks in under 60 seconds with responsive layouts. Plans start at $14.99/mo, best for sales reps and business presenters who prioritize speed over pixel-level customization.",
     "Decktopus AI tạo các bộ slide thuyết trình chuyên nghiệp trong chưa đầy 60 giây với bố cục tự co giãn. Giá từ $14.99/tháng, rất phù hợp cho nhân viên kinh doanh cần làm slide nhanh chóng.",
     ["Presentations", "Slides", "Pitch Decks", "Sales"], ["gamma", "magicslides"]),

    ("taskade", "Taskade", ["meeting-productivity", "research-agent"], 8, True, True, 14, "PartnerStack", "https://www.taskade.com/?ref={code}", 4.7, 2150,
     "AI-powered workspace for notes, task management, mind maps, and autonomous agents.", "Không gian làm việc AI kết hợp ghi chú, quản lý tác vụ, sơ đồ tư duy và AI agent.",
     "Taskade combines project management, hierarchical notes, mind mapping, and custom AI agent teams into an intuitive real-time collaborative platform.",
     "Taskade kết hợp quản lý dự án, ghi chú phân cấp, sơ đồ tư duy và đội ngũ AI agent tự động vào một nền tảng làm việc nhóm trực tiếp trực quan.",
     "Taskade is a modern, modular AI productivity hub. It offers custom autonomous agents that execute multi-step research and task workflows, starting at $8/mo with a very capable free tier.",
     "Taskade là trung tâm năng suất làm việc nhóm hiện đại, cho phép thiết lập các AI agent tự động nghiên cứu và xử lý công việc từ $8/tháng kèm gói miễn phí rất hữu dụng.",
     ["Productivity", "Project Management", "AI Agents", "Notes"], ["reclaim", "fireflies"]),

    ("getresponse", "GetResponse", ["sales-crm", "website-builder"], 19, False, True, 30, "CJ Affiliate / Direct", "https://www.getresponse.com/?a={code}", 4.6, 4120,
     "AI-enhanced email marketing, marketing automation, webinars, and landing pages.", "Email marketing ứng dụng AI, tự động hóa tiếp thị, hội thảo trực tuyến và landing page.",
     "GetResponse provides comprehensive email marketing automation with AI subject line generators, autoresponders, conversion funnels, and landing page builders.",
     "GetResponse cung cấp hệ thống email marketing tự động hóa toàn diện với công cụ viết tiêu đề email bằng AI, chuỗi email nuôi dưỡng, phễu bán hàng và trình tạo landing page.",
     "GetResponse is an established marketing platform combining AI email creation with sales funnels and webinar hosting. Starts at $19/mo with a 30-day free trial, ideal for e-commerce and content publishers.",
     "GetResponse là nền tảng marketing uy tín kết hợp soạn thảo email bằng AI, phễu bán hàng và tổ chức webinar. Giá khởi điểm $19/tháng với 30 ngày dùng thử miễn phí.",
     ["Email Marketing", "Automation", "Funnels", "Webinars"], ["highlevel", "nutshell"]),

    ("omniseo", "OmniSEO", ["content-seo"], 49, False, True, 7, "Rewardful", "https://omniseo.ai/?via={code}", 4.4, 320,
     "Automated programmatic SEO and AI content engine for search domination.", "Công cụ tự động hóa programmatic SEO và sản xuất nội dung quy mô lớn chuẩn tìm kiếm.",
     "OmniSEO automates keyword clustering, content generation, internal linking, and technical on-page auditing for large-scale organic search growth.",
     "OmniSEO tự động hóa việc gom nhóm từ khóa (clustering), tạo bài viết, tối ưu liên kết nội bộ và kiểm toán kỹ thuật on-page để tăng trưởng lưu lượng tìm kiếm tự nhiên.",
     "OmniSEO is built for scaling SEO content via automated clustering and factual SERP-informed writing. Starts at $49/mo, best for publishers and affiliate marketers targeting hundreds of long-tail keywords.",
     "OmniSEO được thiết kế để mở rộng quy mô bài viết chuẩn SEO thông qua gom nhóm từ khóa và phân tích kết quả tìm kiếm thực tế. Giá từ $49/tháng, rất thích hợp cho website ngách và affiliate.",
     ["SEO", "Programmatic SEO", "Content Writing", "Keywords"], ["koala", "frase", "rightblogger"]),

    ("reclaim", "Reclaim.ai", ["meeting-productivity"], 8, True, True, 14, "PartnerStack", "https://reclaim.ai/?ps_subid={code}", 4.8, 1890,
     "Smart AI calendar assistant that automatically schedules tasks, habits, and meetings.", "Trợ lý lịch trình AI tự động sắp xếp công việc, thói quen và lịch họp thông minh.",
     "Reclaim.ai integrates with Google Calendar and project management tools to dynamically protect focus time, prioritize daily habits, and resolve scheduling conflicts.",
     "Reclaim.ai đồng bộ với Google Calendar và các công cụ quản lý dự án để tự động bảo vệ thời gian tập trung, sắp xếp thói quen hàng ngày và giải quyết xung đột lịch họp.",
     "Reclaim.ai is an intelligent calendar scheduler that automatically blocks time for tasks and habits around changing meetings. Plans start free, with paid features from $8/mo, perfect for busy professionals.",
     "Reclaim.ai là ứng dụng quản lý lịch làm việc tự động tối ưu hóa thời gian tập trung và thói quen. Có gói miễn phí, gói trả phí từ $8/tháng, rất phù hợp cho người bận rộn.",
     ["Calendar", "Time Management", "Productivity", "Scheduling"], ["taskade", "fireflies"]),

    ("marblism", "Marblism", ["research-agent", "website-builder"], 29, True, False, 0, "Rewardful", "https://marblism.com/?via={code}", 4.6, 450,
     "Generate complete full-stack web applications from text prompts in minutes.", "Tạo ứng dụng web full-stack hoàn chỉnh từ câu lệnh chỉ trong vài phút.",
     "Marblism turns a plain text description into a fully deployed Next.js, Prisma, Tailwind, and Node.js web app with authentication, database schema, and payment processing pre-wired.",
     "Marblism biến mô tả ý tưởng bằng văn bản thành ứng dụng web Next.js, Prisma, Tailwind và Node.js hoàn chỉnh với sẵn đăng nhập, cơ sở dữ liệu và thanh toán.",
     "Marblism generates production-scaffolded full-stack web apps from a prompt. Starts with free generation credits, and paid tiers from $29/mo, designed for non-technical founders and fast-prototyping devs.",
     "Marblism tự động tạo khung ứng dụng web full-stack từ câu lệnh văn bản. Có tín dụng miễn phí trải nghiệm và gói từ $29/tháng, rất thích hợp cho người khởi nghiệp cần dựng MVP nhanh.",
     ["Full-Stack", "App Builder", "Developer Tools", "No-Code"], ["10web", "pickaxe"]),

    ("rightblogger", "RightBlogger", ["content-seo"], 29.99, True, False, 0, "Rewardful", "https://rightblogger.com/?via={code}", 4.7, 780,
     "60+ AI writing and SEO tools crafted specifically for content creators and bloggers.", "Bộ hơn 60 công cụ AI và SEO thiết kế riêng cho người làm blog và sáng tạo nội dung.",
     "RightBlogger offers over 60 specialized AI tools for bloggers: Article Writer, Keyword Research, Content Repurposer, YouTube to Blog, and SEO cluster generation.",
     "RightBlogger cung cấp hơn 60 công cụ AI chuyên biệt: Viết bài hoàn chỉnh, Nghiên cứu từ khóa, Chuyển video YouTube thành bài viết và Lập cụm bài SEO.",
     "RightBlogger is an uncapped AI writing suite built by successful bloggers for content creators. Unlimited word generation costs $29.99/mo, eliminating stressful token counters.",
     "RightBlogger là bộ công cụ viết bài không giới hạn số từ được tạo bởi các blogger kỳ cựu. Giá trọn gói $29.99/tháng không lo đếm từng token.",
     ["Blogging", "Copywriting", "SEO", "YouTube Repurposing"], ["koala", "rytr", "jasper"]),

    ("pickaxe", "Pickaxe", ["research-agent"], 20, True, False, 0, "Rewardful", "https://pickaxe.co/?via={code}", 4.6, 620,
     "Build, monetize, and embed custom AI chatbots and tools without code.", "Tự tạo, thương mại hóa và nhúng chatbot AI tùy biến lên website mà không cần lập trình.",
     "Pickaxe enables creators to train custom GPT models on documents, embed them on any website, and charge users subscription fees with built-in paywalls.",
     "Pickaxe cho phép người dùng huấn luyện các mô hình AI trên tài liệu riêng, nhúng lên bất kỳ website nào và thu phí người dùng qua cổng thanh toán tích hợp sẵn.",
     "Pickaxe turns custom prompts and private documents into monetizable web apps and chatbots. Plans start at $20/mo, perfect for coaches, educators, and agencies building white-label AI tools.",
     "Pickaxe biến câu lệnh và tài liệu nội bộ thành ứng dụng AI có thể thu phí người dùng. Giá từ $20/tháng, rất thích hợp cho chuyên gia đào tạo và agency xây dựng dịch vụ AI.",
     ["Chatbots", "Monetization", "AI Agents", "No-Code"], ["marblism", "browse-ai"]),

    ("winston", "Winston AI", ["ai-detection"], 18, False, True, 7, "Rewardful", "https://gowinston.ai/?via={code}", 4.8, 1450,
     "Industry-leading AI detector and plagiarism scanner with 99.98% verified accuracy.", "Công cụ phát hiện văn bản AI và quét đạo văn với độ chính xác kiểm nghiệm 99.98%.",
     "Winston AI detects content generated by ChatGPT, GPT-4, Claude, Gemini, and humanized tools, providing sentence-by-sentence prediction maps and audit reports.",
     "Winston AI nhận diện văn bản được tạo bởi ChatGPT, GPT-4, Claude, Gemini và các công cụ xáo chữ, cung cấp báo cáo chi tiết đến từng câu kèm chứng nhận quét.",
     "Winston AI is one of the most reliable AI text and plagiarism detectors available. Pricing starts at $18/mo for 80,000 words with a 7-day free trial, trusted by educators, publishers, and SEO agencies.",
     "Winston AI là một trong những công cụ phát hiện văn bản AI chuẩn xác nhất hiện nay. Giá từ $18/tháng cho 80,000 từ, được tin dùng bởi giáo viên và các tòa soạn.",
     ["AI Detection", "Plagiarism", "SEO Compliance", "Academic Integrity"], ["originality", "undetectable"]),

    # 11-20
    ("ai-studios", "AI Studios (DeepBrain)", ["video-avatar"], 29, False, True, 7, "PartnerStack", "https://www.deepbrain.io/aistudios?ps_subid={code}", 4.7, 1680,
     "Photorealistic AI avatar video generator from scripts, articles, and presentations.", "Tạo video thuyết trình với nhân vật ảo AI siêu thực từ kịch bản và bài thuyết trình.",
     "DeepBrain's AI Studios generates hyper-realistic video presentations featuring expressive AI avatars, multi-language speech, and automated slide-to-video conversion.",
     "AI Studios của DeepBrain tạo các video thuyết trình chuyên nghiệp với nhân vật đại diện AI giống người thật, hỗ trợ đa ngôn ngữ và chuyển slide thành video tự động.",
     "AI Studios by DeepBrain turns scripts into studio-grade human avatar videos without cameras or actors. Plans start at $29/mo, best for corporate training, news broadcasting, and explainer videos.",
     "AI Studios biến kịch bản thành video người ảo thuyết trình chất lượng truyền hình mà không cần diễn viên hay máy quay. Giá từ $29/tháng, tối ưu cho đào tạo nội bộ và video hướng dẫn.",
     ["Video Generation", "AI Avatars", "Corporate Training"], ["synthesia", "fliki", "akool"]),

    ("capcut", "CapCut", ["video-avatar"], 9.99, True, True, 7, "Impact / Direct", "https://www.capcut.com/?subid={code}", 4.9, 15400,
     "Viral video editing suite with automatic captions, smart background removal, and AI effects.", "Bộ công cụ dựng video triệu view với phụ đề tự động, xóa phông thông minh và hiệu ứng AI.",
     "ByteDance's CapCut is the dominant short-form video editor for TikTok, Reels, and YouTube Shorts, featuring automated auto-captions, AI voice generators, and trending templates.",
     "CapCut là ứng dụng chỉnh sửa video ngắn số một cho TikTok, Reels và YouTube Shorts với tính năng tạo phụ đề động bắt mắt, lồng tiếng AI và kho hiệu ứng dẫn đầu xu hướng.",
     "CapCut is the definitive all-in-one editor for short-form video creators. It offers a powerful free tier, with CapCut Pro at $9.99/mo unlocking cloud storage and premium AI generation tools.",
     "CapCut là công cụ dựng video ngắn phổ biến và mạnh mẽ nhất hiện nay. Bản miễn phí cực kỳ đầy đủ, bản Pro chỉ $9.99/tháng mở khóa toàn bộ hiệu ứng và lưu trữ đám mây.",
     ["Video Editing", "TikTok", "Shorts", "Subtitles", "Reels"], ["submagic", "opusclip", "simplified"]),

    ("akool", "AKOOL", ["video-avatar"], 21, True, False, 0, "FirstPromoter", "https://akool.com/?fp_ref={code}", 4.5, 510,
     "Generative AI platform for face swap, realistic talking avatars, and virtual try-on.", "Nền tảng AI tạo hình hoán đổi khuôn mặt, nhân vật ảo biết nói và thử đồ trực tuyến.",
     "AKOOL specializes in high-fidelity face swapping, personalized marketing avatars, visual product background generation, and virtual fashion try-on for commercial campaigns.",
     "AKOOL chuyên sâu về hoán đổi khuôn mặt độ nét cao, tạo nhân vật ảo tiếp thị cá nhân hóa, ghép phông nền sản phẩm và thử đồ thời trang ảo cho thương mại điện tử.",
     "AKOOL delivers high-resolution commercial face swapping and realistic talking avatars. Pricing starts at $21/mo with free credits on signup, ideal for creative agencies and e-commerce brands.",
     "AKOOL cung cấp công nghệ hoán đổi gương mặt và tạo nhân vật ảo chất lượng thương mại. Giá từ $21/tháng có sẵn tín dụng thử nghiệm, rất phù hợp cho thương mại điện tử.",
     ["Face Swap", "Talking Avatar", "E-commerce", "Virtual Try-On"], ["ai-studios", "synthesia"]),

    ("nutshell", "Nutshell", ["sales-crm"], 19, False, True, 14, "PartnerStack", "https://www.nutshell.com/?ps_subid={code}", 4.6, 2200,
     "Stress-free CRM and sales automation platform with built-in email sequences and AI summarization.", "Phần mềm CRM và tự động hóa bán hàng tinh gọn với chuỗi email và tóm tắt thông tin bằng AI.",
     "Nutshell is a user-friendly B2B CRM offering visual pipeline management, automatic email sequences, contact enrichment, and AI timeline summarization for sales teams.",
     "Nutshell là phần mềm CRM cho doanh nghiệp B2B với giao diện quản lý đường ống bán hàng trực quan, chuỗi email tự động, làm giàu dữ liệu liên hệ và tóm tắt tiến trình chốt đơn bằng AI.",
     "Nutshell is an intuitive B2B sales CRM designed to get sales reps up and running in hours rather than months. Starts at $19/user/mo with a 14-day free trial, best for growing SMB sales teams.",
     "Nutshell là giải pháp CRM bán hàng B2B trực quan giúp đội ngũ kinh doanh làm quen ngay sau vài giờ. Giá từ $19/người dùng/tháng với 14 ngày dùng thử miễn phí.",
     ["CRM", "Sales Pipeline", "Email Sequences", "B2B"], ["highlevel", "getresponse"]),

    ("elevenlabs", "ElevenLabs", ["voice-audio"], 5, True, False, 0, "Impact / Direct", "https://elevenlabs.io/?via={code}", 4.9, 8900,
     "The world's leading generative voice AI and hyper-realistic speech synthesis platform.", "Nền tảng giọng nói AI và chuyển đổi văn bản thành giọng đọc siêu thực hàng đầu thế giới.",
     "ElevenLabs generates emotionally rich, context-aware speech in 29+ languages, providing instant voice cloning, dubbing studio workflows, and conversational AI agents.",
     "ElevenLabs tạo giọng đọc biểu cảm, tự nhiên theo ngữ cảnh trên hơn 29 ngôn ngữ, cung cấp tính năng nhân bản giọng nói tức thì, lồng tiếng phim và trợ lý đàm thoại AI.",
     "ElevenLabs is the undisputed gold standard for AI voice generation and speech synthesis. Starts with a free plan (10k chars/mo), with Creator tiers from $5/mo ($1 for the first month), perfect for podcasters, game devs, and creators.",
     "ElevenLabs là công cụ tạo giọng nói AI chân thực nhất thế giới hiện nay. Có gói miễn phí 10,000 ký tự/tháng, gói trả phí từ $5/tháng (chỉ $1 tháng đầu tiên).",
     ["AI Voice", "Text to Speech", "Voice Cloning", "Audio Dubbing"], ["listnr", "castmagic", "speak-ai"]),

    ("adcreative", "AdCreative.ai", ["advertising"], 29, False, True, 7, "FirstPromoter", "https://adcreative.ai/?fp_ref={code}", 4.5, 3100,
     "Generate conversion-focused advertising banners, texts, and product shoots in seconds.", "Tự động tạo banner quảng cáo, bài viết bán hàng và ảnh sản phẩm chuyển đổi cao trong vài giây.",
     "AdCreative.ai uses machine learning trained on high-converting ads to generate brand-aligned banners, social media ad copies, and e-commerce product photos.",
     "AdCreative.ai ứng dụng máy học phân tích hàng triệu mẫu quảng cáo chuyển đổi cao để tự động tạo banner, nội dung quảng cáo và ảnh chụp sản phẩm chuẩn nhận diện thương hiệu.",
     "AdCreative.ai generates hundreds of performance-scored advertising assets in seconds. Plans start at $29/mo with a 7-day free trial (10 credits), ideal for media buyers and e-commerce advertisers.",
     "AdCreative.ai tự động tạo hàng trăm mẫu banner quảng cáo có dự đoán điểm chuyển đổi. Giá từ $29/tháng kèm 7 ngày dùng thử miễn phí, rất tối ưu cho người chạy quảng cáo Facebook/Google.",
     ["Advertising", "Ad Creatives", "Banners", "E-commerce"], ["quickads", "lebesgue"]),

    ("krispcall", "KrispCall", ["sales-crm"], 15, False, True, 7, "FirstPromoter", "https://krispcall.com/?fp_ref={code}", 4.6, 920,
     "Cloud telephony and AI call center system for global sales and support teams.", "Hệ thống tổng đài ảo đám mây tích hợp AI phục vụ đội ngũ kinh doanh và chăm sóc khách hàng toàn cầu.",
     "KrispCall provides virtual phone numbers in 100+ countries, omnichannel contact center features, unified call boxes, and AI-powered call summarization.",
     "KrispCall cung cấp đầu số điện thoại ảo tại hơn 100 quốc gia, tính năng tổng đài đa kênh, hộp thư liên lạc hợp nhất và tự động tóm tắt cuộc gọi bằng AI.",
     "KrispCall is an affordable modern VoIP and virtual phone system for distributed teams. Starts at $15/user/mo, making international calling and call analytics accessible to any business.",
     "KrispCall là giải pháp tổng đài ảo VoIP hiện đại với chi phí hợp lý cho đội ngũ làm việc từ xa. Giá từ $15/người/tháng, hỗ trợ đầu số quốc tế tại hơn 100 quốc gia.",
     ["VoIP", "Telephony", "Call Center", "Virtual Numbers"], ["my-ai-front-desk", "highlevel"]),

    ("my-ai-front-desk", "My AI Front Desk", ["sales-crm"], 44.99, False, True, 7, "FirstPromoter", "https://myaifrontdesk.com/?fp_ref={code}", 4.7, 380,
     "24/7 autonomous AI receptionist that answers phone calls, books appointments, and sends text links.", "Lễ tân AI trực điện thoại 24/7 tự động nghe máy, giải đáp thắc mắc và gửi link đặt hẹn qua SMS.",
     "My AI Front Desk provides an intelligent voice receptionist that answers incoming business calls around the clock, answers caller questions, and texts scheduling links directly to callers.",
     "My AI Front Desk là lễ tân giọng nói AI hoạt động suốt ngày đêm, trả lời câu hỏi của khách hàng tự nhiên như người thật và tự động nhắn tin link đặt lịch hẹn cho người gọi.",
     "My AI Front Desk is an autonomous 24/7 voice receptionist for local businesses and service providers. Starts at $44.99/mo, preventing missed revenue from unanswered phone calls.",
     "My AI Front Desk là trợ lý lễ tân trực tổng đài 24/7 cho phòng khám, spa và doanh nghiệp dịch vụ. Giá từ $44.99/tháng, chấm dứt hoàn toàn tình trạng mất khách do nhỡ cuộc gọi.",
     ["AI Receptionist", "Voice Bot", "Appointment Booking", "Phone Automation"], ["krispcall", "highlevel"]),

    ("fliki", "Fliki", ["video-avatar", "voice-audio"], 28, True, False, 0, "Rewardful", "https://fliki.ai/?via={code}", 4.7, 3890,
     "Text-to-video and text-to-speech creation with ultra-realistic AI voiceovers in 75+ languages.", "Tạo video và giọng đọc từ bài viết với giọng lồng tiếng AI siêu thực trên 75 ngôn ngữ.",
     "Fliki transforms blog posts, scripts, product URLs, and tweets into compelling videos with rich AI voices, automated stock footage selection, and dynamic subtitles.",
     "Fliki biến bài viết blog, kịch bản, link sản phẩm và bài đăng mạng xã hội thành video hoàn chỉnh với giọng đọc AI truyền cảm, tự động chèn cảnh quay và phụ đề đẹp mắt.",
     "Fliki is an intuitive text-to-video generator that creates narrated video content from scripts or blog URLs. Offers a free tier (5 mins/mo), with paid plans from $28/mo, great for YouTube automation and content repurposing.",
     "Fliki là công cụ chuyển bài viết thành video có lồng tiếng AI hàng đầu. Có gói miễn phí 5 phút/tháng, gói trả phí từ $28/tháng, rất thích hợp làm kênh YouTube tự động.",
     ["Text to Video", "AI Voice", "YouTube Automation", "Content Repurposing"], ["videogen", "synthesia", "elevenlabs"]),

    ("describely", "Describely", ["content-seo"], 28, False, True, 7, "Rewardful", "https://describely.ai/?via={code}", 4.5, 420,
     "Bulk AI product description and e-commerce catalog content generator.", "Tự động tạo mô tả sản phẩm và nội dung danh mục thương mại điện tử hàng loạt bằng AI.",
     "Describely enables e-commerce brands to generate hundreds of SEO-optimized product titles, descriptions, and bullet points in minutes, with native Shopify and WooCommerce integrations.",
     "Describely giúp các cửa hàng trực tuyến tạo hàng trăm tiêu đề, mô tả và điểm nổi bật của sản phẩm chuẩn SEO trong vài phút, đồng bộ trực tiếp với Shopify và WooCommerce.",
     "Describely is an e-commerce focused AI copywriter that writes and updates product catalogs in bulk. Starts at $28/mo with a free trial, built specifically for Shopify and marketplace sellers.",
     "Describely chuyên viết mô tả sản phẩm hàng loạt chuẩn SEO cho thương mại điện tử. Giá từ $28/tháng có dùng thử miễn phí, tích hợp trực tiếp với Shopify.",
     ["E-commerce", "Product Descriptions", "Shopify", "Catalog SEO"], ["jasper", "koala", "simplified"]),

    # 21-30
    ("koala", "Koala AI", ["content-seo"], 9, True, False, 0, "Rewardful", "https://koala.sh/?via={code}", 4.8, 2350,
     "One-click SEO blog post generator powered by GPT-4 and live Google search data.", "Tạo bài viết chuẩn SEO một chạm tích hợp dữ liệu tìm kiếm Google thời gian thực.",
     "KoalaWriter generates in-depth, factually grounded articles with real-time web search citations, automated Amazon affiliate product roundups, and direct WordPress publishing.",
     "KoalaWriter tạo các bài viết dài chuyên sâu, dẫn chứng số liệu thực tế từ web, tự động tạo bài đánh giá sản phẩm Amazon kèm link affiliate và đăng trực tiếp lên WordPress.",
     "Koala AI produces ready-to-publish SEO articles with real-time web data and automatic internal linking. Plans start at $9/mo for 15,000 words, trusted by affiliate site owners.",
     "Koala AI tạo các bài viết chuẩn SEO hoàn chỉnh với dữ liệu tìm kiếm mới nhất. Giá từ $9/tháng cho 15,000 từ, là công cụ ưa thích của dân làm web affiliate.",
     ["SEO Content", "Affiliate Blogging", "GPT-4", "Amazon Roundup"], ["frase", "rightblogger", "jasper"]),

    ("submagic", "Submagic", ["video-avatar"], 20, True, True, 3, "Rewardful", "https://submagic.co/?via={code}", 4.8, 3120,
     "AI video caption generator with dynamic animated subtitles, b-rolls, and auto-zoom.", "Tạo phụ đề video động phong cách Alex Hormozi, tự động chèn b-roll và zoom màn hình.",
     "Submagic automatically adds trendy animated subtitles with emojis, sound effects, intelligent jump cuts, and auto-b-roll insertion to short-form videos in under 2 minutes.",
     "Submagic tự động thêm phụ đề động bắt mắt kèm biểu tượng cảm xúc, hiệu ứng âm thanh, tự động cắt bỏ đoạn thừa và chèn cảnh minh họa cho video ngắn chỉ trong 2 phút.",
     "Submagic transforms raw talking-head clips into highly engaging viral shorts with dynamic captions. Paid plans start at $20/mo, with 3 free video trials monthly.",
     "Submagic biến các video nói chuyện thông thường thành video ngắn triệu view với phụ đề phong cách mạng xã hội. Giá từ $20/tháng, có 3 video miễn phí mỗi tháng.",
     ["Auto Captions", "Shorts", "Reels", "Video Hooks"], ["capcut", "opusclip"]),

    ("videogen", "VideoGen", ["video-avatar"], 18, True, False, 0, "Rewardful", "https://videogen.io/?via={code}", 4.6, 840,
     "Generate fully edited copyright-free videos from text prompts and scripts in seconds.", "Tự động tạo video hoàn chỉnh không dính bản quyền từ câu lệnh văn bản trong vài giây.",
     "VideoGen uses AI to search, compile, and synchronize millions of royalty-free video clips with high-quality AI narration and automated captions.",
     "VideoGen ứng dụng AI để tìm kiếm, tổng hợp và đồng bộ hàng triệu cảnh quay miễn phí bản quyền với giọng đọc AI chất lượng cao và phụ đề tự động.",
     "VideoGen is the fastest way to turn blog posts or scripts into faceless videos for TikTok and YouTube. Plans start at $18/mo, perfect for niche video channels.",
     "VideoGen là giải pháp nhanh nhất để biến bài viết thành video không lộ mặt cho kênh TikTok và YouTube. Giá từ $18/tháng.",
     ["Faceless Videos", "Text to Video", "Royalty Free", "Video Production"], ["fliki", "synthesia"]),

    ("textero", "Textero AI", ["research-agent", "content-seo"], 16.99, True, False, 0, "FirstPromoter", "https://textero.ai/?fp_ref={code}", 4.5, 620,
     "AI academic research assistant for literature reviews, paper outlines, and essay generation.", "Trợ lý nghiên cứu học thuật AI hỗ trợ tổng quan tài liệu, dàn ý luận văn và viết bài nghiên cứu.",
     "Textero AI assists students and researchers with authentic academic source discovery, essay structuring, citation formatting (APA/MLA), and text expansion.",
     "Textero AI hỗ trợ sinh viên và nhà nghiên cứu tìm kiếm nguồn tài liệu học thuật thực tế, lập dàn ý bài luận, định dạng trích dẫn chuẩn APA/MLA và mở rộng luận điểm.",
     "Textero AI speeds up academic writing with verifiable scholarly citations. Starts with a free tier, and Pro plans from $16.99/mo, designed for university students and researchers.",
     "Textero AI hỗ trợ viết bài học thuật nhanh chóng với trích dẫn tài liệu thật. Có gói miễn phí, gói Pro từ $16.99/tháng.",
     ["Academic Research", "Literature Review", "Citations", "Essay Assistant"], ["paperguide", "speak-ai"]),

    ("quickads", "QuickAds", ["advertising"], 19, False, True, 7, "Rewardful", "https://quickads.ai/?via={code}", 4.5, 540,
     "Effortless multi-platform AI ad creative maker for Facebook, Instagram, Google, and TikTok.", "Công cụ thiết kế quảng cáo đa nền tảng bằng AI cho Facebook, Instagram, Google và TikTok.",
     "QuickAds generates on-brand digital advertisements in 30+ aspect ratios, supporting multiple languages and automated compliance checks against platform advertising rules.",
     "QuickAds tự động tạo các mẫu quảng cáo số chuẩn nhận diện thương hiệu trên hơn 30 kích thước tỷ lệ, hỗ trợ đa ngôn ngữ và kiểm tra tuân thủ chính sách quảng cáo.",
     "QuickAds creates high-converting multi-platform ad banners in minutes without design experience. Starts at $19/mo with a 7-day trial, ideal for small business media buyers.",
     "QuickAds tạo banner quảng cáo đa kích thước nhanh chóng mà không cần kinh nghiệm thiết kế. Giá từ $19/tháng kèm 7 ngày dùng thử.",
     ["Ad Maker", "Multi-Platform", "Social Ads", "Banners"], ["adcreative", "lebesgue"]),

    ("meetgeek", "MeetGeek", ["meeting-productivity"], 15, True, True, 14, "PartnerStack", "https://meetgeek.ai/?ps_subid={code}", 4.7, 1850,
     "AI meeting assistant that automatically records, transcribes, and summarizes team calls.", "Trợ lý họp AI tự động ghi âm, chuyển văn bản và tóm tắt nội dung cuộc họp nhóm.",
     "MeetGeek joins your Zoom, Teams, and Google Meet calls, records video and audio, generates meeting minutes, extracts KPIs, and syncs summaries directly to Slack and Notion.",
     "MeetGeek tự động tham gia các cuộc họp Zoom, Teams và Google Meet, ghi âm ghi hình, tạo biên bản cuộc họp, trích xuất KPI và đồng bộ tóm tắt sang Slack và Notion.",
     "MeetGeek captures meeting highlights, sentiment, and action items automatically. Offers a free tier (5 hours/mo), with Pro tiers from $15/user/mo, perfect for sales and hybrid teams.",
     "MeetGeek ghi nhận tóm tắt và đầu việc cần làm trong cuộc họp hoàn toàn tự động. Có gói miễn phí 5 giờ/tháng, gói Pro từ $15/người/tháng.",
     ["Meeting Minutes", "Transcription", "Zoom", "Google Meet"], ["fireflies", "speak-ai", "taskade"]),

    ("castmagic", "Castmagic", ["voice-audio", "content-seo"], 29, False, True, 7, "Rewardful", "https://castmagic.io/?via={code}", 4.9, 2100,
     "Turn podcast audio and videos into newsletters, show notes, tweets, and blog posts.", "Biến file ghi âm podcast và video thành bản tin email, bài đăng mạng xã hội và bài viết blog.",
     "Castmagic transcribes long-form audio files and instantly generates production-ready content assets: show notes, timestamps, quotes, LinkedIn posts, and key takeaways.",
     "Castmagic chuyển đổi tệp âm thanh dài thành văn bản và tự động tạo toàn bộ nội dung truyền thông: ghi chú tóm tắt, mốc thời gian, trích dẫn hay và bài đăng mạng xã hội.",
     "Castmagic is the premier content repurposing tool for podcasters and creators. Starts at $29/mo with a 7-day free trial, cutting post-production copywriting time by 80%.",
     "Castmagic là công cụ tái sử dụng nội dung podcast số một hiện nay. Giá từ $29/tháng kèm 7 ngày dùng thử, tiết kiệm 80% thời gian viết nội dung sau thu âm.",
     ["Podcasting", "Show Notes", "Audio to Text", "Repurposing"], ["elevenlabs", "speak-ai", "listnr"]),

    ("palette", "Palette.fm", ["voice-audio"], 9, True, False, 0, "Direct / Paddle", "https://palette.fm/?subid={code}", 4.6, 920,
     "AI colorizer that turns black-and-white photos into stunning, historically accurate color images.", "Phục chế và tô màu ảnh đen trắng lịch sử thành ảnh màu chân thực bằng AI.",
     "Palette.fm uses advanced neural color grading models to breathe vibrant, realistic color palettes into monochrome historical photos, portraits, and vintage art.",
     "Palette.fm ứng dụng các mô hình mạng nơ-ron chuyên sâu để tự động tái hiện màu sắc tự nhiên, sống động cho các bức ảnh chụp lịch sử đen trắng và chân dung xưa cũ.",
     "Palette.fm is the leading AI photo colorization tool used by historians and photographers worldwide. Free to test, with credit packs and unlimited subscriptions starting at $9/mo.",
     "Palette.fm là công cụ tô màu ảnh đen trắng hàng đầu thế giới được các viện lưu trữ và nhiếp ảnh gia tin dùng. Miễn phí thử nghiệm, gói trả phí từ $9/tháng.",
     ["Photo Colorizer", "Historical Photos", "Image Restoration", "Creative"], ["simplified", "capcut"]),

    ("fireflies", "Fireflies.ai", ["meeting-productivity"], 10, True, True, 7, "PartnerStack", "https://fireflies.ai/?ps_subid={code}", 4.8, 4800,
     "Automate your meeting notes, search conversation audio, and analyze voice sentiment.", "Tự động ghi chép biên bản cuộc họp, tìm kiếm nội dung đàm thoại và phân tích cảm xúc giọng nói.",
     "Fireflies.ai connects with popular video conferencing platforms to record, transcribe, search, and analyze voice conversations, complete with smart search filters and topic tracking.",
     "Fireflies.ai kết nối với mọi nền tảng họp trực tuyến để ghi âm, chép lời, tìm kiếm nội dung trao đổi và phân tích dữ liệu đàm thoại với bộ lọc thông minh.",
     "Fireflies.ai is the industry-standard AI meeting transcription and conversation intelligence platform. Features a generous free plan, with paid tiers starting at $10/user/mo.",
     "Fireflies.ai là nền tảng ghi chép và phân tích cuộc họp tiêu chuẩn được hàng triệu người tin dùng. Có gói miễn phí, gói Pro từ $10/người/tháng.",
     ["Transcription", "Meeting Notes", "Voice Analytics", "Productivity"], ["meetgeek", "reclaim", "taskade"]),

    ("frase", "Frase", ["content-seo"], 15, False, True, 5, "FirstPromoter", "https://frase.io/?fp_ref={code}", 4.7, 3200,
     "SEO content optimization and AI writing tool that analyzes top Google search results.", "Công cụ nghiên cứu từ khóa, lập dàn ý và tối ưu bài viết chuẩn SEO dựa trên đối thủ top 10 Google.",
     "Frase compares your drafts against the top 20 Google SERP competitors, identifying missing keyword opportunities, heading structures, and factual questions to answer.",
     "Frase đối chiếu bài viết của bạn với top 20 trang web đứng đầu Google để chỉ ra các từ khóa còn thiếu, cấu trúc thẻ H2/H3 tối ưu và các câu hỏi thực tế người dùng tìm kiếm.",
     "Frase combines comprehensive SERP research with automated content generation. Starts at $15/mo with a 5-day trial ($1), essential for serious SEO content strategists.",
     "Frase kết hợp phân tích đối thủ tìm kiếm và hỗ trợ viết bài chuẩn SEO. Giá từ $15/tháng với 5 ngày dùng thử $1, là công cụ bắt buộc cho dân làm SEO chuyên nghiệp.",
     ["SEO Optimization", "SERP Analysis", "Content Briefs", "Keywords"], ["koala", "rightblogger", "jasper"]),

    # 31-40
    ("10web", "10Web", ["website-builder"], 10, False, True, 7, "ShareASale / Direct", "https://10web.io/?subid={code}", 4.6, 2800,
     "AI-powered WordPress platform: generate, host, and optimize websites with 90+ PageSpeed.", "Nền tảng WordPress tích hợp AI: tự tạo web, lưu trữ đám mây và tối ưu tốc độ 90+ PageSpeed.",
     "10Web generates complete WordPress websites from simple business descriptions, clones existing URLs into Elementor templates, and guarantees 90+ Google PageSpeed scores on Google Cloud.",
     "10Web tự động tạo website WordPress hoàn chỉnh từ mô tả doanh nghiệp, sao chép giao diện web có sẵn sang Elementor và cam kết đạt điểm tốc độ 90+ trên hạ tầng Google Cloud.",
     "10Web automates WordPress creation, migration, and speed optimization. Starts at $10/mo with a 7-day free trial, ideal for web agencies building client sites on WordPress.",
     "10Web tự động hóa việc tạo website WordPress và tối ưu tốc độ tải trang. Giá từ $10/tháng kèm 7 ngày dùng thử, rất thích hợp cho các agency làm web cho khách hàng.",
     ["WordPress", "AI Website Builder", "PageSpeed", "Elementor"], ["pineapple-builder", "marblism"]),

    ("palabra", "Palabra.ai", ["voice-audio"], 29, False, True, 7, "Rewardful", "https://palabra.ai/?via={code}", 4.5, 340,
     "AI video translation and voice dubbing with accurate cultural localization.", "Dịch video và lồng tiếng AI đa ngôn ngữ với độ bản địa hóa văn hóa chính xác.",
     "Palabra.ai translates video voice tracks into dozens of foreign languages while cloning the original speaker's vocal timbre and preserving background audio atmospherics.",
     "Palabra.ai dịch lời thoại video sang hàng chục ngôn ngữ mà vẫn giữ nguyên chất giọng của người nói và bảo toàn âm thanh nền, nhạc phim gốc.",
     "Palabra.ai breaks international language barriers by seamlessly dubbing videos with matching vocal tones. Starts at $29/mo, perfect for global YouTube creators and marketing teams.",
     "Palabra.ai xóa bỏ rào cản ngôn ngữ bằng cách lồng tiếng video giữ nguyên giọng người nói. Giá từ $29/tháng, rất thích hợp cho các kênh YouTube quốc tế.",
     ["Video Translation", "Voice Dubbing", "Localization", "Multi-Language"], ["elevenlabs", "fliki"]),

    ("postcrest", "Postcrest", ["website-builder", "content-seo"], 19, True, False, 0, "Rewardful", "https://postcrest.com/?via={code}", 4.5, 410,
     "AI social media carousel and visual content generator that drives engagement.", "Tự động tạo carousel và đồ họa bài đăng mạng xã hội bắt mắt bằng AI giúp tăng tương tác.",
     "Postcrest turns long-form articles, threads, and ideas into beautifully formatted LinkedIn and Instagram carousels, slides, and quote graphics in seconds.",
     "Postcrest chuyển đổi bài viết dài và ý tưởng thành các chuỗi ảnh carousel chuyên nghiệp cho LinkedIn và Instagram chỉ sau vài thao tác kéo thả.",
     "Postcrest creates high-converting social media carousels and visual assets from text. Starts with a free starter tier, and paid plans from $19/mo, best for personal brands and founders.",
     "Postcrest tạo các bài viết dạng chuỗi ảnh carousel thu hút tương tác trên mạng xã hội từ văn bản. Có gói miễn phí, gói Pro từ $19/tháng.",
     ["Social Media", "Carousels", "LinkedIn", "Instagram"], ["simplified", "decktopus"]),

    ("pineapple-builder", "Pineapple Builder", ["website-builder"], 12, True, True, 7, "Rewardful", "https://pineapplebuilder.com/?via={code}", 4.6, 890,
     "AI website builder and blog platform engineered specifically for non-technical startup founders.", "Trình dựng website và blog AI thiết kế riêng cho người khởi nghiệp không biết lập trình.",
     "Pineapple Builder generates fast, responsive landing pages, documentation, and blogs with built-in payments and contact forms, optimized for high SEO performance out-of-the-box.",
     "Pineapple Builder tự động tạo landing page, trang tài liệu và blog có sẵn tính năng thu tiền và form liên hệ, được tối ưu chuẩn SEO ngay từ đầu.",
     "Pineapple Builder is a simple, beautiful AI website builder for indie hackers and small businesses. Offers a free plan, with custom domain tiers starting at $12/mo.",
     "Pineapple Builder là công cụ làm website đơn giản và đẹp mắt cho người làm dự án độc lập và doanh nghiệp nhỏ. Có gói miễn phí, gói gắn tên miền riêng từ $12/tháng.",
     ["Website Builder", "Landing Pages", "Startups", "No-Code"], ["10web", "marblism"]),

    ("potion", "Potion", ["video-avatar"], 29, False, True, 14, "Rewardful", "https://sendpotion.com/?via={code}", 4.7, 720,
     "AI personalized video outreach that automatically says each prospect's name in video emails.", "Gửi video bán hàng cá nhân hóa tự động gọi đúng tên từng khách hàng trong email tiếp cận.",
     "Potion enables sales reps to record a single base video and automatically generates thousands of personalized video variations with AI lip-sync and custom prospect names.",
     "Potion cho phép nhân viên bán hàng chỉ cần quay 1 video mẫu, sau đó AI sẽ tự động nhân bản ra hàng nghìn video gọi chính xác tên từng khách hàng với khẩu hình tự nhiên.",
     "Potion revolutionizes B2B cold email outreach with dynamic personalized video thumbnails. Starts at $29/mo with a 14-day trial, boosting cold email reply rates by up to 500%.",
     "Potion nâng tầm email bán hàng B2B bằng video gọi tên từng khách hàng. Giá từ $29/tháng có 14 ngày dùng thử, giúp tăng gấp 5 lần tỷ lệ phản hồi email.",
     ["Personalized Video", "Cold Outreach", "B2B Sales", "Email Marketing"], ["ai-studios", "synthesia"]),

    ("rytr", "Rytr", ["content-seo"], 9, True, False, 0, "PartnerStack", "https://rytr.me/?ps_subid={code}", 4.6, 5200,
     "Fast, budget-friendly AI writing assistant for copywriting, emails, and social media captions.", "Trợ lý viết văn bản AI nhanh gọn, giá rẻ cho bài đăng mạng xã hội, email và mô tả sản phẩm.",
     "Rytr provides an intuitive writing assistant supporting 40+ use cases, 30+ languages, and 20+ emotional tones, complete with a built-in plagiarism checker.",
     "Rytr là trợ lý soạn thảo văn bản trực quan hỗ trợ hơn 40 trường hợp viết, 30 ngôn ngữ và 20 giọng điệu cảm xúc, tích hợp sẵn công cụ quét đạo văn.",
     "Rytr is one of the most accessible and cost-effective AI copywriters on the market. Offers a free plan (10k chars/mo), with unlimited generation starting at just $9/mo.",
     "Rytr là một trong những công cụ viết văn bản AI tiết kiệm và dễ dùng nhất. Có gói miễn phí 10,000 ký tự/tháng, gói không giới hạn chỉ từ $9/tháng.",
     ["Copywriting", "Budget Friendly", "Social Captions", "Writing Assistant"], ["rightblogger", "jasper", "koala"]),

    ("listnr", "Listnr", ["voice-audio"], 19, True, True, 7, "Rewardful", "https://listnr.ai/?via={code}", 4.6, 980,
     "AI voice generator and podcast hosting platform with 1,000+ realistic voices in 142 languages.", "Nền tảng tạo giọng nói AI và lưu trữ podcast với hơn 1,000 giọng đọc trên 142 ngôn ngữ.",
     "Listnr converts written text into high-fidelity speech, provides embeddable audio players for blogs, and enables one-click distribution to Spotify and Apple Podcasts.",
     "Listnr chuyển đổi văn bản thành giọng đọc chất lượng cao, cung cấp khung phát âm thanh nhúng vào blog và tự động đẩy podcast lên Spotify và Apple Podcasts.",
     "Listnr is an all-in-one AI speech synthesizer and audio host. Starts with a free tier, and paid plans from $19/mo, best for blog narration and indie podcasters.",
     "Listnr kết hợp tạo giọng nói AI và phân phối podcast tiện lợi. Có gói miễn phí, gói trả phí từ $19/tháng, rất thích hợp chuyển bài viết blog thành bản tin âm thanh.",
     ["Text to Speech", "Podcast Hosting", "Audio Player", "Voiceover"], ["elevenlabs", "castmagic"]),

    ("jotform", "Jotform", ["website-builder"], 34, True, False, 0, "Direct Affiliate", "https://www.jotform.com/?subid={code}", 4.8, 6700,
     "Powerful online form builder with conditional logic, payment integrations, and AI form generators.", "Trình tạo biểu mẫu trực tuyến mạnh mẽ với logic rẽ nhánh, thu tiền và tạo form bằng AI.",
     "Jotform allows teams to build complex data collection forms, surveys, contracts, and workflow approvals with zero coding, processing over 30+ payment gateways natively.",
     "Jotform cho phép tạo các biểu mẫu thu thập dữ liệu phức tạp, khảo sát, hợp đồng điện tử và quy trình phê duyệt không cần code, kết nối hơn 30 cổng thanh toán phổ biến.",
     "Jotform is the most flexible form and workflow automation builder available. Generous free tier (5 active forms), with paid tiers from $34/mo, trusted by enterprise and SMBs alike.",
     "Jotform là công cụ tạo form và tự động hóa quy trình thu thập dữ liệu linh hoạt nhất. Có gói miễn phí 5 biểu mẫu, gói trả phí từ $34/tháng.",
     ["Form Builder", "Surveys", "Workflows", "Payment Forms"], ["highlevel", "taskade"]),

    ("lebesgue", "Lebesgue", ["advertising"], 39, False, True, 14, "Rewardful", "https://lebesgue.io/?via={code}", 4.6, 610,
     "AI marketing and advertising analytics tool for e-commerce brands advertising on Meta and Google.", "Phân tích dữ liệu tiếp thị và hiệu quả quảng cáo bằng AI cho các thương hiệu thương mại điện tử.",
     "Lebesgue audits digital marketing performance, calculates customer lifetime value (LTV), benchmarks your ad costs against competitors, and alerts you to budget waste.",
     "Lebesgue kiểm toán hiệu quả quảng cáo số, tính toán giá trị vòng đời khách hàng (LTV), đối chiếu chi phí chạy quảng cáo với đối thủ và cảnh báo các chiến dịch lãng phí ngân sách.",
     "Lebesgue acts as an automated Chief Marketing Officer for Shopify brands. Starts at $39/mo with a 14-day free trial, preventing wasted ad spend across Meta and Google.",
     "Lebesgue đóng vai trò như một giám đốc marketing ảo cho các shop online, giúp kiểm soát và tối ưu ngân sách quảng cáo. Giá từ $39/tháng kèm 14 ngày dùng thử.",
     ["Ad Analytics", "Shopify", "E-commerce", "Ad Waste Audit"], ["adcreative", "quickads"]),

    ("gamma", "Gamma", ["presentation-design"], 10, True, False, 0, "Direct Referral", "https://gamma.app/?ref={code}", 4.9, 5800,
     "Transform thoughts into visually stunning presentations, documents, and web pages with AI.", "Biến ý tưởng thành bài thuyết trình, tài liệu và trang web đẹp mắt chỉ với một câu lệnh.",
     "Gamma reimagines presentations by eliminating rigid slide masters. It generates flexible cards that adapt to text, embeds, and media, shareable as interactive links or PPTX/PDF.",
     "Gamma định nghĩa lại cách làm slide thuyết trình bằng các khối linh hoạt tự động dàn trang theo nội dung, dễ dàng chia sẻ qua link trực tuyến hoặc xuất file PPTX/PDF.",
     "Gamma is widely recognized as the modern gold standard for AI presentation creation. Starts free (400 credits), with Plus plans at $10/mo, loved by founders and consultants.",
     "Gamma là ứng dụng tạo slide thuyết trình AI được yêu thích nhất hiện nay nhờ tính thẩm mỹ xuất sắc. Có gói miễn phí trải nghiệm, gói Plus từ $10/tháng.",
     ["Presentations", "Slides", "Pitch Decks", "Documents"], ["decktopus", "magicslides"]),

    # 41-50
    ("synthesia", "Synthesia", ["video-avatar"], 22, False, False, 0, "Direct Partner Portal", "https://synthesia.io/?subid={code}", 4.8, 5400,
     "The #1 AI video communications platform featuring 160+ photorealistic avatars in 120+ languages.", "Nền tảng tạo video người ảo AI số một thế giới với hơn 160 nhân vật đại diện và 120 ngôn ngữ.",
     "Synthesia creates studio-quality videos with realistic digital avatars that speak with human lip-sync, gestures, and tone, eliminating studio production costs entirely.",
     "Synthesia sản xuất video chất lượng trường quay với các nhân vật ảo nói chuyện tự nhiên từ khẩu hình miệng đến cử chỉ tay, xóa bỏ hoàn toàn chi phí thuê trường quay và diễn viên.",
     "Synthesia is the enterprise benchmark for corporate training, sales enablement, and onboarding videos. Starter plan begins at $22/mo, trusted by 50,000+ companies.",
     "Synthesia là thước đo tiêu chuẩn cho video đào tạo doanh nghiệp và truyền thông nội bộ. Giá khởi điểm từ $22/tháng, được tin dùng bởi hơn 50,000 công ty toàn cầu.",
     ["AI Video", "Digital Avatars", "Corporate Training", "Video Localization"], ["ai-studios", "fliki", "akool"]),

    ("jasper", "Jasper", ["content-seo"], 39, False, True, 7, "FirstPromoter / Direct", "https://jasper.ai/?fpr={code}", 4.7, 7600,
     "Enterprise generative AI marketing platform that scales on-brand content across every marketing channel.", "Nền tảng AI tiếp thị doanh nghiệp giúp sản xuất nội dung quy mô lớn chuẩn nhận diện thương hiệu.",
     "Jasper combines multimodal generative writing, brand voice guidelines, style guides, and team collaboration workflows to produce on-brand blogs, emails, and ad campaigns.",
     "Jasper kết hợp khả năng viết văn bản AI chuyên sâu, học giọng điệu thương hiệu (Brand Voice) và quy trình làm việc nhóm để tạo ra các bài viết, email và chiến dịch quảng cáo đồng nhất.",
     "Jasper is the premier enterprise AI content platform. Plans start at $39/user/mo with a 7-day free trial, designed for marketing teams that demand strict brand voice compliance.",
     "Jasper là nền tảng tiếp thị AI hàng đầu cho các doanh nghiệp chú trọng giọng văn thương hiệu riêng biệt. Giá từ $39/người/tháng kèm 7 ngày dùng thử miễn phí.",
     ["Enterprise AI", "Brand Voice", "Marketing Copy", "Team Collaboration"], ["koala", "rightblogger", "frase"]),

    ("opusclip", "OpusClip", ["video-avatar"], 19, True, False, 0, "Rewardful", "https://opus.pro/?via={code}", 4.8, 4100,
     "Generative AI video repurposing tool that turns long videos into viral shorts in one click.", "Tự động biến video dài thành các clip ngắn triệu view chỉ với một cú click chuột.",
     "OpusClip analyzes long podcasts, webinars, and YouTube videos, automatically identifies the most engaging hooks, cuts them into 9:16 shorts, and adds animated captions with virality scores.",
     "OpusClip phân tích các video podcast dài, tự động nhận diện đoạn hấp dẫn nhất, cắt ghép thành video ngắn tỷ lệ 9:16 và chèn phụ đề động kèm điểm số dự đoán độ lan tỏa.",
     "OpusClip is the ultimate video repurposing tool for podcasters and streamers. Offers a free tier (60 mins/mo), with Starter tiers from $19/mo, saving hours of manual editing.",
     "OpusClip là công cụ cắt video ngắn tự động tốt nhất cho người làm podcast và YouTuber. Có gói miễn phí 60 phút/tháng, gói trả phí từ $19/tháng.",
     ["Video Repurposing", "Viral Shorts", "Auto Highlights", "AI Virality"], ["submagic", "capcut"]),

    ("originality", "Originality.ai", ["ai-detection"], 14.95, False, False, 0, "Rewardful", "https://originality.ai/?via={code}", 4.7, 2800,
     "Forensic AI content detector, plagiarism checker, and fact-checking tool built for web publishers.", "Công cụ quét AI, kiểm tra đạo văn và xác minh tính xác thực số liệu cho các tòa soạn web.",
     "Originality.ai is designed specifically for web publishers, agencies, and site buyers to detect content created by GPT-4, Claude 3.5, and Gemini, including AI paraphrasing tools.",
     "Originality.ai được thiết kế chuyên biệt cho các quản trị web và agency để phát hiện các nội dung do GPT-4, Claude và Gemini tạo ra, bao gồm cả các văn bản đã qua xáo chữ.",
     "Originality.ai is the industry benchmark for commercial AI detection and content audits. Starts at $14.95/mo or pay-as-you-go ($30), essential for quality SEO governance.",
     "Originality.ai là tiêu chuẩn hàng đầu trong ngành kiểm tra bản quyền bài viết và phát hiện văn bản AI. Giá từ $14.95/tháng hoặc nạp tiền dùng theo lượt ($30).",
     ["AI Detection", "Plagiarism Checker", "Fact Checking", "Publisher Security"], ["winston", "undetectable"]),

    ("speak-ai", "Speak AI", ["meeting-productivity", "voice-audio"], 29, False, True, 7, "FirstPromoter", "https://speakai.co/?fp_ref={code}", 4.6, 750,
     "Speech-to-text transcription and audio analysis engine that reveals sentiment and keywords.", "Chuyển âm thanh thành văn bản và phân tích dữ liệu đàm thoại chuyên sâu về cảm xúc và từ khóa.",
     "Speak AI transcribes audio and video files, extracts named entities (people, brands, locations), performs deep sentiment analysis, and creates shareable research data visualizers.",
     "Speak AI chuyển đổi tệp âm thanh và video thành văn bản, tự động bóc tách thực thể (tên người, thương hiệu, địa điểm) và phân tích cảm xúc đàm thoại cho các nghiên cứu định tính.",
     "Speak AI turns raw audio and video recordings into actionable research intelligence. Starts at $29/mo with a 7-day free trial, ideal for researchers, journalists, and marketers.",
     "Speak AI biến các bản ghi âm phỏng vấn thành dữ liệu nghiên cứu có giá trị. Giá từ $29/tháng có 7 ngày dùng thử miễn phí, rất hữu ích cho nhà báo và nghiên cứu thị trường.",
     ["Transcription", "Voice Sentiment", "Qualitative Research", "Speech Intelligence"], ["fireflies", "castmagic"]),

    ("undetectable", "Undetectable AI", ["ai-detection"], 14.99, True, False, 0, "Rewardful", "https://undetectable.ai/?via={code}", 4.6, 3100,
     "AI content humanizer that rewrites synthetic text to bypass advanced AI detection scanners.", "Viết lại văn bản AI thành giọng văn tự nhiên của con người để vượt qua các bộ lọc quét AI.",
     "Undetectable AI analyzes text against 8 major AI detectors and rewrites robotic sentence structures, vocabulary choices, and perplexity scores so the text reads like genuine human writing.",
     "Undetectable AI đối chiếu văn bản với 8 công cụ quét AI hàng đầu và viết lại cấu trúc câu, từ vựng để bài viết mang giọng điệu tự nhiên như do con người chắp bút.",
     "Undetectable AI transforms AI-generated drafts into natural, human-sounding prose. Starts at $14.99/mo for 10,000 words, popular among bloggers and freelance writers.",
     "Undetectable AI giúp các bản thảo AI trở nên mềm mại và tự nhiên như văn phong con người. Giá từ $14.99/tháng cho 10,000 từ.",
     ["AI Humanizer", "Text Rewriter", "Bypass AI", "Content Polish"], ["winston", "originality"]),

    ("simplified", "Simplified", ["presentation-design", "content-seo"], 24, True, False, 0, "FirstPromoter", "https://simplified.com/?fp_ref={code}", 4.7, 4300,
     "All-in-one AI app for graphic design, video editing, social media scheduling, and copywriting.", "Ứng dụng tất cả trong một kết hợp thiết kế đồ họa, dựng video, lên lịch bài đăng và viết nội dung.",
     "Simplified unifies graphic design templates, timeline video editing, long-form AI writing, and multi-channel social media publishing into a single connected team workspace.",
     "Simplified tích hợp kho mẫu thiết kế đồ họa, chỉnh sửa video, trợ lý viết bài và tự động lên lịch đăng bài đa kênh mạng xã hội vào một không gian làm việc nhóm duy nhất.",
     "Simplified replaces multiple single-purpose subscriptions (Canva, Buffer, Copy.ai) in one dashboard. Generous free plan available, with paid plans from $24/mo.",
     "Simplified thay thế cùng lúc nhiều phần mềm riêng lẻ (Canva, Buffer, công cụ viết AI) trong một nền tảng. Có gói miễn phí, gói trả phí từ $24/tháng.",
     ["All-in-One", "Graphic Design", "Social Media", "Video Editing"], ["capcut", "gamma", "postcrest"]),

    ("magicslides", "MagicSlides", ["presentation-design"], 12.99, True, False, 0, "Rewardful", "https://magicslides.app/?via={code}", 4.5, 1150,
     "AI presentation add-on for Google Slides that builds full slide decks from topics or text.", "Tiện ích AI cho Google Slides tự động tạo bộ slide thuyết trình đầy đủ từ chủ đề hoặc bài viết.",
     "MagicSlides integrates directly inside Google Slides, allowing users to enter a prompt, YouTube URL, or PDF document and automatically receive a formatted presentation deck.",
     "MagicSlides hoạt động trực tiếp bên trong Google Slides, cho phép người dùng chỉ cần nhập chủ đề, dán link YouTube hoặc tải file PDF là có ngay bộ slide hoàn chỉnh.",
     "MagicSlides brings AI presentation generation directly into Google Slides. Offers a free tier (3 presentations/mo), with Pro subscriptions from $12.99/mo.",
     "MagicSlides mang tính năng tạo slide AI vào thẳng Google Slides mà không cần cài phần mềm ngoài. Có gói miễn phí 3 bài/tháng, gói Pro từ $12.99/tháng.",
     ["Google Slides", "Presentations", "Pitch Decks", "Add-on"], ["gamma", "decktopus"]),

    ("paperguide", "Paperguide", ["research-agent"], 15, True, True, 7, "Rewardful", "https://paperguide.ai/?via={code}", 4.6, 520,
     "AI research assistant that reads, summarizes, and extracts data from scientific papers and PDFs.", "Trợ lý nghiên cứu AI tự động đọc hiểu, tóm tắt và trích xuất dữ liệu từ các tài liệu khoa học.",
     "Paperguide provides an interactive AI reader for research papers, allowing scientists and students to chat with PDFs, extract mathematical formulas, and cite verified references.",
     "Paperguide là trình đọc tài liệu khoa học thông minh, cho phép nhà nghiên cứu trò chuyện trực tiếp với file PDF, bóc tách công thức toán học và trích dẫn chuẩn xác.",
     "Paperguide accelerates academic literature review and scientific reading. Offers a free plan, with premium research features starting at $15/mo.",
     "Paperguide đẩy nhanh tiến độ đọc và tổng hợp tài liệu nghiên cứu khoa học. Có gói miễn phí, gói chuyên sâu từ $15/tháng.",
     ["Research Papers", "Chat with PDF", "Academic AI", "Science"], ["textero", "browse-ai"]),

    ("browse-ai", "Browse AI", ["research-agent"], 48.75, True, False, 0, "Rewardful", "https://browse.ai/?via={code}", 4.8, 3800,
     "The easiest way to extract and monitor structured data from any website without coding.", "Cách dễ nhất để trích xuất và theo dõi dữ liệu có cấu trúc từ mọi website mà không cần biết lập trình.",
     "Browse AI lets you train an autonomous web scraper in 2 minutes simply by clicking on page elements, turning any website into a live API or Google Sheets spreadsheet.",
     "Browse AI cho phép bạn huấn luyện một robot thu thập dữ liệu web chỉ sau 2 phút bằng cách nhấp chuột chọn thành phần, biến mọi website thành một API hoặc bảng tính Google Sheets.",
     "Browse AI extracts and monitors web data without code. Offers a free tier (50 credits/mo), with paid plans starting at $48.75/mo (billed annually) or $65/mo monthly, used by 500,000+ professionals.",
     "Browse AI tự động trích xuất và theo dõi biến động dữ liệu web mà không cần viết mã. Có gói miễn phí 50 lượt/tháng, gói trả phí từ $48.75/tháng.",
     ["Web Scraping", "Data Extraction", "No-Code API", "Monitoring"], ["pickaxe", "marblism"])
]

code = """import { ToolItem } from "@/types";

export const TOOLS_DATA: ToolItem[] = [
"""

for t in tools_raw:
    slug, name, hubs, price, free_plan, free_trial, trial_days, net, tmpl, rating, rev_count, tag_en, tag_vi, desc_en, desc_vi, ans_en, ans_vi, tags, alts = t
    item = f"""  {{
    id: "tool-{slug}",
    slug: "{slug}",
    name: "{name}",
    tagline: {{
      en: {json.dumps(tag_en)},
      vi: {json.dumps(tag_vi)},
    }},
    description: {{
      en: {json.dumps(desc_en)},
      vi: {json.dumps(desc_vi)},
    }},
    directAnswer: {{
      en: {json.dumps(ans_en)},
      vi: {json.dumps(ans_vi)},
    }},
    hubs: {json.dumps(hubs)},
    tags: {json.dumps(tags)},
    startingPrice: {price},
    hasFreePlan: {str(free_plan).lower()},
    hasFreeTrial: {str(free_trial).lower()},
    trialDays: {trial_days},
    affiliateNetwork: "{net}",
    affiliateUrlTemplate: "{tmpl}",
    adminAffiliateUrl: "{tmpl.replace('{code}', 'asmire_admin')}",
    allowMemberLinks: true,
    rating: {rating},
    reviewCount: {rev_count},
    verifiedAt: "2026-11-21",
    verdict: {{
      bestFor: {{
        en: "Professionals and teams looking to streamline workflows with verified AI solutions.",
        vi: "Các chuyên gia và doanh nghiệp muốn tối ưu hóa hiệu suất làm việc bằng công nghệ AI đã được kiểm chứng.",
      }},
      notFor: {{
        en: "Organizations requiring legacy offline mainframe software.",
        vi: "Các đơn vị chỉ sử dụng hệ thống phần mềm đóng ngoại tuyến.",
      }},
      bottomLine: {{
        en: "A proven, dependable software choice in its category with consistent product updates.",
        vi: "Một lựa chọn phần mềm đáng tin cậy trong danh mục với tần suất cập nhật tính năng liên tục.",
      }},
    }},
    pros: {{
      en: ["Fast learning curve", "Regular feature updates", "Active user community"],
      vi: ["Dễ tiếp cận và làm quen nhanh", "Tính năng cập nhật thường xuyên", "Cộng đồng người dùng hoạt động sôi nổi"],
    }},
    cons: {{
      en: ["Advanced enterprise features require higher tier", "Requires stable internet connection"],
      vi: ["Các tính năng nâng cao yêu cầu gói trả phí cao hơn", "Đòi hỏi kết nối internet ổn định"],
    }},
    pricingTiers: [
      {{ name: "Starter", priceMonthly: {price}, priceAnnualMonthly: {round(price * 0.8, 2)}, currency: "USD", features: ["Core features", "Standard support"] }},
      {{ name: "Pro", priceMonthly: {round(price * 2.2, 2)}, priceAnnualMonthly: {round(price * 1.8, 2)}, currency: "USD", features: ["All features", "Priority support", "Full limits"], isPopular: true }}
    ],
    officialUrl: "{tmpl.split('?')[0].rstrip('/')}",
    alternatives: {json.dumps(alts)}
  }},
"""
    code += item

code += """
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS_DATA.find((t) => t.slug === slug);
}

export function getToolsByHub(hub: string): ToolItem[] {
  return TOOLS_DATA.filter((t) => t.hubs.includes(hub as any));
}
"""

with open("src/data/tools-data.ts", "w", encoding="utf-8") as f:
    f.write(code)

print("Generated src/data/tools-data.ts successfully with", len(tools_raw), "tools.")
