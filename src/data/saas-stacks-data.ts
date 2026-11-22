export interface LegacyStackItem {
  name: string;
  monthlyCost: number;
  plan: string;
}

export interface SaaSStackReplacement {
  id: string;
  category: "crm_sales" | "automation" | "ai_content" | "ai_video" | "funnels_forms";
  categoryBadge: {
    en: string;
    vi: string;
  };
  title: {
    en: string;
    vi: string;
  };
  summary: {
    en: string;
    vi: string;
  };
  legacyStack: {
    name: string;
    items: LegacyStackItem[];
    totalMonthlyCost: number;
    annualCost: number;
    drawbacks: {
      en: string[];
      vi: string[];
    };
  };
  leanStack: {
    toolSlug: string;
    toolName: string;
    plan: string;
    monthlyCost: number;
    annualCost: number;
    officialAffiliateUrl: string;
    advantages: {
      en: string[];
      vi: string[];
    };
  };
  savings: {
    monthlyDollar: number;
    annualDollar: number;
    percentSavings: number;
  };
  honestTradeOffs: {
    en: string[];
    vi: string[];
  };
  migrationEffort: {
    en: string;
    vi: string;
  };
  recommendedFor: {
    en: string;
    vi: string;
  };
}

export const SAAS_STACK_REPLACEMENTS: SaaSStackReplacement[] = [
  {
    id: "hubspot-to-ghl",
    category: "crm_sales",
    categoryBadge: {
      en: "Sales & Marketing CRM",
      vi: "CRM & Marketing Tự Động",
    },
    title: {
      en: "Replace HubSpot ($500+/mo) with GoHighLevel ($97/mo)",
      vi: "Thay thế HubSpot ($500+/tháng) bằng GoHighLevel ($97/tháng)",
    },
    summary: {
      en: "Eliminate per-seat CRM extortion. Get unlimited sub-accounts, users, email marketing, and unified SMS funnels for a flat monthly subscription.",
      vi: "Chấm dứt bẫy thu phí theo đầu người (Per-seat pricing). Sử dụng không giới hạn tài khoản con, nhân viên, email marketing và phễu SMS chỉ với 1 mức giá cố định.",
    },
    legacyStack: {
      name: "HubSpot Marketing & Sales Pro",
      items: [
        { name: "HubSpot Marketing Hub Pro (2,000 contacts)", monthlyCost: 800, plan: "Pro Tier" },
        { name: "HubSpot Sales Hub Pro (5 seats minimum)", monthlyCost: 450, plan: "$90/seat/mo" },
      ],
      totalMonthlyCost: 500, // Standard baseline entry for growing teams
      annualCost: 6000,
      drawbacks: {
        en: [
          "Aggressive price escalation as contact lists grow ($250+/mo per extra 5k contacts)",
          "Strict per-seat taxation: Adding sales reps immediately inflates the monthly bill",
          "Expensive mandatory onboarding fees ($3,000 upfront requirement on Enterprise tiers)",
          "Fragmented add-on ecosystem forcing external tools for SMS and telephony",
        ],
        vi: [
          "Đội giá phi mã khi danh sách khách hàng tăng ($250/tháng cho mỗi 5,000 contact phụ trội)",
          "Thuế theo ghế: Cứ tuyển thêm 1 nhân viên sales là hóa đơn đội thêm $90 - $120/tháng",
          "Bắt buộc đóng phí khởi tạo Onboarding bắt buộc đắt đỏ lên tới $3,000",
          "Hệ sinh thái phân mảnh, phải mua thêm dịch vụ ngoài để gửi tin nhắn SMS/Zalo/Điện thoại",
        ],
      },
    },
    leanStack: {
      toolSlug: "highlevel",
      toolName: "GoHighLevel (LeadConnector)",
      plan: "Agency Starter / Unlimited",
      monthlyCost: 97,
      annualCost: 970, // With 2 months free annual discount
      officialAffiliateUrl: "https://www.gohighlevel.com/?fp_ref=asmire",
      advantages: {
        en: [
          "100% Unlimited Users & Team Members with Zero per-seat surcharge",
          "All-in-one unified CRM, Drag-and-Drop Funnels, Calendar Booking, and Pipeline stages",
          "Native Two-Way SMS, WhatsApp, and Twilio infrastructure integration",
          "Snapshot cloning: Replicate proven business setups across multiple accounts in 60 seconds",
        ],
        vi: [
          "Không giới hạn số lượng nhân viên và thành viên với chi phí $0 phụ thu",
          "Tích hợp trọn gói CRM, Kéo-thả Phễu bán hàng, Lịch hẹn tự động và Pipeline bán hàng",
          "Nhúng sẵn hạ tầng SMS 2 chiều, WhatsApp và tổng đài Twilio chi phí gốc",
          "Nhân bản nhanh (Snapshot): Sao chép toàn bộ quy trình sang tài khoản mới trong 60 giây",
        ],
      },
    },
    savings: {
      monthlyDollar: 403,
      annualDollar: 4836,
      percentSavings: 80,
    },
    honestTradeOffs: {
      en: [
        "GoHighLevel's user interface is feature-dense and has a steeper 3 to 7 day learning curve than HubSpot.",
        "HubSpot offers superior enterprise ABM (Account-Based Marketing) reports and deeply polished Fortune 500 integrations.",
        "Twilio SMS & Mailgun email sending costs are paid at raw wholesale rates (typically ~$10 to $25/mo for 10k messages).",
      ],
      vi: [
        "Giao diện của GoHighLevel có quá nhiều tính năng nên mất khoảng 3 - 7 ngày để làm quen thành thạo.",
        "HubSpot vẫn vượt trội hơn ở mảng báo cáo ABM (Account-Based Marketing) cho tập đoàn quy mô nghìn người.",
        "Chi phí gửi SMS và Email được tính theo giá bán buôn gốc của Twilio/Mailgun (thường khoảng $10 - $25/tháng cho 10,000 tin).",
      ],
    },
    migrationEffort: {
      en: "3 to 5 business days (Export contacts CSV, map custom fields, recreate pipelines).",
      vi: "3 đến 5 ngày làm việc (Xuất danh bạ CSV, ánh xạ trường dữ liệu và dựng lại phễu).",
    },
    recommendedFor: {
      en: "Marketing agencies, SMB sales teams (2-25 people), course creators, and service businesses.",
      vi: "Agency truyền thông, đội ngũ sales SMB (2-25 nhân sự), chuyên gia đào tạo và doanh nghiệp dịch vụ.",
    },
  },
  {
    id: "zapier-to-make",
    category: "automation",
    categoryBadge: {
      en: "Workflow Automation",
      vi: "Tự Động Hóa Quy Trình",
    },
    title: {
      en: "Replace Zapier Pro ($74/mo) with Make.com ($16/mo)",
      vi: "Thay thế Zapier Pro ($74/tháng) bằng Make.com ($16/tháng)",
    },
    summary: {
      en: "Stop paying 4.6x more per automated step. Visual drag-and-drop logic with native branch routers, array manipulators, and unlimited multi-step workflows.",
      vi: "Dừng chi trả đắt gấp 4.6 lần cho mỗi tác vụ tự động. Sơ đồ luồng trực quan với bộ chia nhánh Router, xử lý mảng và không giới hạn bước thực thi.",
    },
    legacyStack: {
      name: "Zapier Professional",
      items: [
        { name: "Zapier Pro (5,000 tasks/mo, multi-step zaps)", monthlyCost: 74, plan: "Pro Tier" },
      ],
      totalMonthlyCost: 74,
      annualCost: 888,
      drawbacks: {
        en: [
          "Charges a full task execution credit for simple filter steps and data formatters",
          "Linear list UI makes complex multi-branch logic painful to debug and maintain",
          "Staggering cost jumps when scaling from 5,000 to 50,000 tasks ($300+/month)",
          "Restricted webhook polling frequency on non-enterprise tiers",
        ],
        vi: [
          "Mỗi bước lọc (Filter) hay định dạng văn bản đơn giản vẫn bị trừ 1 tác vụ (Task credit)",
          "Giao diện dạng danh sách dọc tuyến tính rất khó debug khi luồng rẽ nhiều nhánh",
          "Chi phí tăng sốc khi nâng từ 5,000 lên 50,000 tác vụ (hơn $300/tháng)",
          "Bị giới hạn tần suất quét Webhook ở các gói tiêu chuẩn",
        ],
      },
    },
    leanStack: {
      toolSlug: "make",
      toolName: "Make.com (Integromat)",
      plan: "Core / Pro Tier",
      monthlyCost: 16,
      annualCost: 192,
      officialAffiliateUrl: "https://www.make.com/en/register?pc=asmire",
      advantages: {
        en: [
          "Massive 10,000 operations for just $16/mo (vs 5,000 tasks for $74 on Zapier)",
          "Infinite 2D visual canvas with built-in routers, iterators, and aggregators",
          "1-second execution speed with granular real-time execution bundle inspector",
          "Advanced JSON parsing and webhook error-handling directives out of the box",
        ],
        vi: [
          "Cung cấp tới 10,000 operations chỉ với $16/tháng (so với 5,000 tasks giá $74 ở Zapier)",
          "Mặt phẳng đồ họa 2D trực quan vô tận với bộ chia Router, Iterator và Aggregator nhúng sẵn",
          "Tốc độ kích hoạt 1 giây kèm bảng theo dõi gói tin dữ liệu (Data Bundle) chi tiết từng node",
          "Tự động giải mã JSON phức tạp và có cơ chế xử lý lỗi (Error Handlers) chuyên nghiệp",
        ],
      },
    },
    savings: {
      monthlyDollar: 58,
      annualDollar: 696,
      percentSavings: 78,
    },
    honestTradeOffs: {
      en: [
        "Make requires basic understanding of data types (arrays, collections) vs Zapier's dummy-proof wizards.",
        "A few obscure legacy US government/insurance internal apps only exist on Zapier's directory.",
      ],
      vi: [
        "Make đòi hỏi người dùng hiểu cơ bản về cấu trúc dữ liệu (mảng Array, Collection) hơn là thuật sĩ từng bước của Zapier.",
        "Một vài ứng dụng nội bộ cũ ít phổ biến tại Mỹ chỉ hỗ trợ độc quyền trên kho Zapier.",
      ],
    },
    migrationEffort: {
      en: "1 to 2 business days (Rebuild core Webhook listeners and test end-to-end payloads).",
      vi: "1 đến 2 ngày làm việc (Dựng lại các điểm nhận Webhook và kiểm thử luồng dữ liệu).",
    },
    recommendedFor: {
      en: "Growth hackers, automation architects, SaaS operators, and developers.",
      vi: "Growth marketer, chuyên gia tự động hóa, chủ doanh nghiệp online và lập trình viên.",
    },
  },
  {
    id: "jasper-to-koala",
    category: "ai_content",
    categoryBadge: {
      en: "AI SEO & Content Writing",
      vi: "AI Viết Bài Chuẩn SEO",
    },
    title: {
      en: "Replace Jasper & Copy.ai ($118/mo) with KoalaWriter ($25/mo)",
      vi: "Thay thế Jasper & Copy.ai ($118/tháng) bằng KoalaWriter ($25/tháng)",
    },
    summary: {
      en: "Generate complete, rank-ready 2,500-word SEO articles with live Google SERP citations and Amazon affiliate boxes in 90 seconds, without stacking multi-tool AI subscriptions.",
      vi: "Tạo bài viết SEO 2,500 từ chuẩn cấu trúc, tự động cào dữ liệu Google SERP thời gian thực và chèn bảng affiliate chỉ trong 90 giây mà không cần mua cùng lúc 2-3 công cụ AI đắt đỏ.",
    },
    legacyStack: {
      name: "Jasper AI Pro + Copy.ai Team",
      items: [
        { name: "Jasper Creator / Pro (unlimited words with caveats)", monthlyCost: 69, plan: "Pro Plan" },
        { name: "Copy.ai Pro (workflow automation credits)", monthlyCost: 49, plan: "Pro Tier" },
      ],
      totalMonthlyCost: 118,
      annualCost: 1416,
      drawbacks: {
        en: [
          "Generic marketing copy that requires extensive manual editing for SEO readability",
          "No native automated live Google SERP analysis without paying extra for SurferSEO add-on ($89/mo)",
          "Frequent hallucination of factual citations and outdated statistics",
          "Clunky UI crammed with 60+ redundant prompt templates that dilute focus",
        ],
        vi: [
          "Nội dung viết chung chung, tốn nhiều thời gian biên tập lại để đạt chuẩn hành văn SEO",
          "Không tự động cào top 10 Google nếu không bỏ thêm $89/tháng mua thêm SurferSEO",
          "Thường xuyên bịa số liệu thống kê hoặc trích dẫn thông tin lỗi thời",
          "Giao diện nhồi nhét hơn 60 template ngắn rời rạc, làm phân tán quy trình sản xuất bài dài",
        ],
      },
    },
    leanStack: {
      toolSlug: "koala",
      toolName: "KoalaWriter (Koala.sh)",
      plan: "Professional (45,000 words/mo)",
      monthlyCost: 25,
      annualCost: 300,
      officialAffiliateUrl: "https://koala.sh/?via=asmire",
      advantages: {
        en: [
          "Real-time Google search integration: Pulls top-ranking factual data automatically",
          "Automated Amazon & Affiliate link insertion with custom CTA buttons and product tables",
          "Powered by Claude 3.5 Sonnet & GPT-4o for natural human cadence and lowest AI detection",
          "1-Click WordPress, Ghost, and Webflow publishing with featured images included",
        ],
        vi: [
          "Tích hợp tìm kiếm Google thời gian thực: Tự động tổng hợp dữ liệu chuẩn xác từ đối thủ top đầu",
          "Tự động chèn link affiliate, tạo bảng so sánh sản phẩm và nút bấm kêu gọi hành động (CTA)",
          "Sử dụng lõi Claude 3.5 Sonnet & GPT-4o cho giọng văn mượt mà, hạn chế tối đa cờ AI detection",
          "Xuất bản 1 chạm thẳng vào WordPress, Ghost, Webflow kèm ảnh đại diện tạo sẵn",
        ],
      },
    },
    savings: {
      monthlyDollar: 93,
      annualDollar: 1116,
      percentSavings: 78,
    },
    honestTradeOffs: {
      en: [
        "KoalaWriter is strictly built for long-form SEO articles and product roundups; it lacks Jasper's short-form Facebook ad copywriting templates.",
        "Word credit usage burns faster when selecting maximum research depth.",
      ],
      vi: [
        "KoalaWriter tập trung 100% cho bài viết SEO dài và đánh giá sản phẩm, không có sẵn nhiều mẫu viết tút quảng cáo Facebook ngắn như Jasper.",
        "Số lượng từ (Word limit) tiêu hao nhanh hơn khi bạn bật chế độ nghiên cứu sâu nhất.",
      ],
    },
    migrationEffort: {
      en: "Immediate (1 hour: Connect WordPress API key and configure brand voice rules).",
      vi: "Ngay lập tức (1 giờ: Kết nối API WordPress và cài đặt phong cách giọng văn).",
    },
    recommendedFor: {
      en: "Affiliate publishers, niche site builders, SEO content agencies, and solo bloggers.",
      vi: "Nhà sáng tạo nội dung Affiliate, quản trị viên website ngách, content agency và blogger độc lập.",
    },
  },
  {
    id: "synthesia-to-heygen",
    category: "ai_video",
    categoryBadge: {
      en: "AI Avatar & Video Production",
      vi: "Sản Xuất Video Avatar AI",
    },
    title: {
      en: "Replace Synthesia Studio ($89/mo) with HeyGen ($29/mo)",
      vi: "Thay thế Synthesia Studio ($89/tháng) bằng HeyGen ($29/tháng)",
    },
    summary: {
      en: "Create viral 9:16 TikTok/Reels and studio-grade landscape avatars with industry-leading micro-expressions, rapid 4K rendering, and instant voice cloning.",
      vi: "Sản xuất video dọc TikTok/Reels triệu view và video ngang thuyết trình chuẩn studio với khẩu hình tự nhiên nhất thế giới, render 4K siêu tốc và nhân bản giọng nói tức thì.",
    },
    legacyStack: {
      name: "Synthesia Studio Plan",
      items: [
        { name: "Synthesia Creator / Starter (limited minutes, rigid poses)", monthlyCost: 89, plan: "Annualized $89/mo" },
      ],
      totalMonthlyCost: 89,
      annualCost: 1068,
      drawbacks: {
        en: [
          "Avatars often appear stiff and robotic with unnatural eye blinking patterns",
          "Heavy corporate presentation orientation, lacking modern vertical mobile video templates",
          "Strict minute-per-month quotas with expensive video credit top-ups",
          "Voice cloning requires extensive voice recording verification and setup time",
        ],
        vi: [
          "Biểu cảm nhân vật avatar khá đơ cứng, chuyển động mí mắt và nhịp thở chưa tự nhiên",
          "Thiết kế nghiêng về slide thuyết trình doanh nghiệp cổ điển, thiếu template video dọc hiện đại",
          "Hạn mức phút video hàng tháng khắt khe, mua thêm phút phụ trội rất đắt",
          "Quy trình duyệt và nhân bản giọng nói riêng đòi hỏi nhiều bước thủ tục phức tạp",
        ],
      },
    },
    leanStack: {
      toolSlug: "heygen",
      toolName: "HeyGen AI",
      plan: "Creator Tier",
      monthlyCost: 29,
      annualCost: 348,
      officialAffiliateUrl: "https://www.heygen.com/?via=asmire",
      advantages: {
        en: [
          "World-class natural lip-syncing and facial emotion dynamics powered by latest AI models",
          "Instant Avatar 2.0: Generate your personal digital twin from a 2-minute webcam recording",
          "One-click video translation into 70+ languages with matched voice timbre and mouth movements",
          "Optimized for viral Short-form videos (9:16) with auto-captions and b-roll inserts",
        ],
        vi: [
          "Độ khớp khẩu hình (Lip-sync) và cử động cơ mặt mượt mà, chân thực hàng đầu thế giới",
          "Instant Avatar 2.0: Tạo bản sao kỹ thuật số cá nhân chỉ từ đoạn video quay bằng webcam 2 phút",
          "Dịch video sang 70+ ngôn ngữ chỉ với 1 click, giữ nguyên âm sắc giọng nói và đồng bộ lại môi",
          "Tối ưu hoàn hảo cho video ngắn TikTok/Reels (9:16) với phụ đề động và hiệu ứng chèn b-roll",
        ],
      },
    },
    savings: {
      monthlyDollar: 60,
      annualDollar: 720,
      percentSavings: 67,
    },
    honestTradeOffs: {
      en: [
        "Synthesia still possesses a larger library of traditional corporate boardrooms and multilingual European enterprise backgrounds.",
        "High-volume 4K batch rendering during peak US hours can take 5 to 10 minutes.",
      ],
      vi: [
        "Synthesia vẫn có kho hình nền phòng họp doanh nghiệp châu Âu truyền thống đa dạng hơn.",
        "Render video 4K hàng loạt vào khung giờ cao điểm của Mỹ có thể mất từ 5 - 10 phút.",
      ],
    },
    migrationEffort: {
      en: "Immediate (Same day: Record your instant avatar video sample and begin rendering).",
      vi: "Ngay trong ngày (Quay 1 đoạn mẫu 2 phút để tạo avatar số và xuất bản video ngay).",
    },
    recommendedFor: {
      en: "Content creators, TikTok/Reels marketers, SaaS product educators, and global course instructors.",
      vi: "Nhà sáng tạo nội dung, marketer video ngắn TikTok/Reels, chuyên gia đào tạo sản phẩm SaaS.",
    },
  },
  {
    id: "clickfunnels-typeform-to-ghl",
    category: "funnels_forms",
    categoryBadge: {
      en: "Funnels & Lead Capture",
      vi: "Phễu Bán Hàng & Biểu Mẫu",
    },
    title: {
      en: "Replace ClickFunnels & Typeform ($206/mo) with GoHighLevel ($97/mo)",
      vi: "Thay thế ClickFunnels & Typeform ($206/tháng) bằng GoHighLevel ($97/tháng)",
    },
    summary: {
      en: "Consolidate your standalone funnel builder and quiz forms into one zero-latency system with built-in instant CRM sync, 1-click upsells, and zero zap lag.",
      vi: "Hợp nhất trình dựng phễu bán hàng độc lập và form khảo sát vào 1 hệ thống duy nhất: Tự động lưu vào CRM tức thì, kích hoạt Upsell 1 chạm và không bị trễ Webhook.",
    },
    legacyStack: {
      name: "ClickFunnels 2.0 + Typeform Plus",
      items: [
        { name: "ClickFunnels 2.0 Basic Plan", monthlyCost: 147, plan: "Basic Plan" },
        { name: "Typeform Plus (1,000 responses/mo)", monthlyCost: 59, plan: "Plus Plan" },
      ],
      totalMonthlyCost: 206,
      annualCost: 2472,
      drawbacks: {
        en: [
          "Disjointed tech stack requiring Zapier webhooks to sync leads from Typeform to ClickFunnels",
          "ClickFunnels basic tier limits the number of active funnels and courses you can publish",
          "Typeform aggressively penalizes volume: Over 1,000 responses requires upgrading to $99+/mo",
          "Lead follow-up delay: Webhook latency causes 3 to 15 minute delays in sending confirmation texts",
        ],
        vi: [
          "Ngăn xếp công nghệ rời rạc, phải cấu hình Zapier trung gian để chuyển khách từ Typeform sang ClickFunnels",
          "Gói cơ bản của ClickFunnels giới hạn số lượng phễu và trang bạn được phép chạy",
          "Typeform phạt nặng khi vượt hạn mức: Vượt quá 1,000 lượt điền form phải nâng lên gói $99+/tháng",
          "Độ trễ gửi SMS/Email xác nhận mất từ 3 đến 15 phút do phải chờ đồng bộ webhook",
        ],
      },
    },
    leanStack: {
      toolSlug: "highlevel",
      toolName: "GoHighLevel Funnels & Surveys",
      plan: "All-in-One Engine",
      monthlyCost: 97,
      annualCost: 970,
      officialAffiliateUrl: "https://www.gohighlevel.com/?fp_ref=asmire",
      advantages: {
        en: [
          "Unlimited High-Speed Funnels, Landing Pages, and Multi-Step Conditional Surveys",
          "Instant 0-second lead routing to sales reps via SMS, automated voice call, and push notice",
          "Built-in 1-Click Upsells, Order Bumps, Stripe Elements, and PayPal integration",
          "Save over $1,500/year while cutting out 3 intermediary automation subscription costs",
        ],
        vi: [
          "Không giới hạn số lượng Phễu bán hàng, Landing Page và Form khảo sát phân nhánh điều kiện",
          "Bắn thông tin khách cho nhân viên Sales chỉ trong 0 giây qua SMS, cuộc gọi tự động và app mobile",
          "Nhúng sẵn tính năng Upsell 1 chạm, Order Bump, cổng thanh toán Stripe và PayPal bảo mật",
          "Tiết kiệm hơn $1,500/năm đồng thời cắt bỏ hoàn toàn chi phí các phần mềm nối trung gian",
        ],
      },
    },
    savings: {
      monthlyDollar: 109,
      annualDollar: 1308,
      percentSavings: 53,
    },
    honestTradeOffs: {
      en: [
        "Typeform has slightly sleeker micro-animations on conversational question transitions.",
        "ClickFunnels provides a very dedicated affiliate marketing template community.",
      ],
      vi: [
        "Typeform có hiệu ứng chuyển cảnh từng câu hỏi mượt mà và tinh tế hơn một chút.",
        "ClickFunnels có cộng đồng chia sẻ template phễu MMO/Affiliate lâu đời hơn.",
      ],
    },
    migrationEffort: {
      en: "2 to 4 business days (Use GHL's 1-Click Funnel Importer to clone URLs, then wire native forms).",
      vi: "2 đến 4 ngày làm việc (Dùng công cụ 1-Click Funnel Importer để sao chép URL và nối form nội bộ).",
    },
    recommendedFor: {
      en: "E-commerce stores, info-product funnels, coaching programs, and local lead generation.",
      vi: "Chủ shop thương mại điện tử, người bán sản phẩm số, chương trình đào tạo và dịch vụ thu thập lead.",
    },
  },
];

export function getAllSaaSStacks(): SaaSStackReplacement[] {
  return SAAS_STACK_REPLACEMENTS;
}

export function getSaaSStackById(id: string): SaaSStackReplacement | undefined {
  return SAAS_STACK_REPLACEMENTS.find((s) => s.id === id);
}

export function getTotalPotentialSavings(): { monthlyTotal: number; annualTotal: number } {
  const monthlyTotal = SAAS_STACK_REPLACEMENTS.reduce((sum, s) => sum + s.savings.monthlyDollar, 0);
  const annualTotal = SAAS_STACK_REPLACEMENTS.reduce((sum, s) => sum + s.savings.annualDollar, 0);
  return { monthlyTotal, annualTotal };
}
