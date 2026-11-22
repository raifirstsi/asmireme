export interface BenchmarkToolMetric {
  label: { en: string; vi: string };
  value: string;
  scorePercent: number; // 0 to 100 for visual progress bar
  highlight?: boolean;
}

export interface AudioBenchmarkItem {
  id: string;
  toolSlug: string;
  name: string;
  category: "voice-ai";
  rank: number;
  isWinner: boolean;
  verdictBadge: { en: string; vi: string };
  audioUrl: string;
  durationSeconds: number;
  fileSizeBytes: number;
  sampleScriptEn: string;
  sampleScriptVi: string;
  metrics: {
    mosScore: number; // out of 5.0
    latencyMs: number;
    pronunciationAccuracy: number; // %
    emotionDepthScore: number; // out of 10
    costPerMinute: string;
  };
  keyTakeaway: { en: string; vi: string };
  pros: { en: string[]; vi: string[] };
  cons: { en: string[]; vi: string[] };
  affiliateUrl: string;
}

export interface VideoBenchmarkItem {
  id: string;
  toolSlug: string;
  name: string;
  category: "video-avatar";
  rank: number;
  isWinner: boolean;
  verdictBadge: { en: string; vi: string };
  videoUrl: string;
  durationSeconds: number;
  fileSizeBytes: number;
  resolution: string;
  sampleScriptEn: string;
  sampleScriptVi: string;
  metrics: {
    lipSyncAccuracy: number; // %
    renderSpeedRatio: string;
    microGestureScore: number; // out of 10
    watermarkQuality: string;
    costPerMinute: string;
  };
  keyTakeaway: { en: string; vi: string };
  pros: { en: string[]; vi: string[] };
  cons: { en: string[]; vi: string[] };
  affiliateUrl: string;
}

export interface ContentSnippetSegment {
  text: string;
  type: "normal" | "factual" | "fluff" | "hallucination";
  annotation?: { en: string; vi: string };
}

export interface ContentBenchmarkItem {
  id: string;
  toolSlug: string;
  name: string;
  category: "content-seo";
  rank: number;
  isWinner: boolean;
  verdictBadge: { en: string; vi: string };
  metrics: {
    originalityAiDetectionPct: number; // Lower is more human-like, e.g. 12% vs 89%
    factualSerpDepthScore: number; // out of 10
    hallucinationRatePct: number; // %
    generationSpeedSeconds: number;
    costPer1kWords: string;
  };
  samplePromptEn: string;
  samplePromptVi: string;
  generatedTextSegments: ContentSnippetSegment[];
  keyTakeaway: { en: string; vi: string };
  pros: { en: string[]; vi: string[] };
  cons: { en: string[]; vi: string[] };
  affiliateUrl: string;
}

export const VOICE_BENCHMARKS: AudioBenchmarkItem[] = [
  {
    id: "elevenlabs-voice-test",
    toolSlug: "elevenlabs",
    name: "ElevenLabs Prime Voice AI",
    category: "voice-ai",
    rank: 1,
    isWinner: true,
    verdictBadge: {
      en: "Editor's Choice: #1 Natural Speech Synthesis",
      vi: "Lựa chọn số 1: Giọng đọc tự nhiên nhất 2026",
    },
    audioUrl: "/benchmarks/audio/elevenlabs-fintech.mp3",
    durationSeconds: 15,
    fileSizeBytes: 124000,
    sampleScriptEn:
      "Welcome to Asmire Capital. Our autonomous algorithmic trading engine executes high-frequency arbitrage across multi-asset liquidity pools, securing risk-adjusted yields while maintaining institutional-grade cold custody encryption.",
    sampleScriptVi:
      "Chào mừng bạn đến với Asmire Capital. Hệ thống giao dịch thuật toán tự động của chúng tôi xử lý chênh lệch giá tần suất cao trên các bể thanh khoản đa tài sản, tối ưu lợi nhuận phòng ngừa rủi ro và mã hóa bảo mật chuẩn quỹ đầu tư.",
    metrics: {
      mosScore: 4.88,
      latencyMs: 185,
      pronunciationAccuracy: 99.4,
      emotionDepthScore: 9.7,
      costPerMinute: "$0.015 / min (Turbo v2.5)",
    },
    keyTakeaway: {
      en: "Virtually indistinguishable from a professional studio voice actor. Natural breathing pauses, subtle cadence inflections, and zero metallic ringing on technical jargon.",
      vi: "Gần như không thể phân biệt với diễn viên lồng tiếng chuyên nghiệp. Có nhịp lấy hơi tự nhiên, ngữ điệu tinh tế và tuyệt đối không bị rè kim loại ở các thuật ngữ kỹ thuật khó.",
    },
    pros: {
      en: [
        "Unrivaled emotional depth & realistic breathing pauses",
        "Instant voice cloning with as little as 1 minute of audio",
        "Sub-200ms ultra-low latency for real-time conversational agents",
      ],
      vi: [
        "Độ sâu cảm xúc vô đối và tự động chèn nhịp thở siêu thực",
        "Nhân bản giọng nói tức thì chỉ với 1 phút audio mẫu",
        "Độ trễ phản hồi dưới 200ms phục vụ các tác vụ AI thoại thời gian thực",
      ],
    },
    cons: {
      en: ["Credit consumption can scale quickly on high-concurrency API calls"],
      vi: ["Hao hụt credit khá nhanh nếu chạy gọi API đa luồng quy mô lớn"],
    },
    affiliateUrl: "/go/elevenlabs",
  },
  {
    id: "murf-voice-test",
    toolSlug: "murf",
    name: "Murf AI Studio",
    category: "voice-ai",
    rank: 2,
    isWinner: false,
    verdictBadge: {
      en: "Best for Corporate E-Learning & Training",
      vi: "Tốt nhất cho Video đào tạo nội bộ doanh nghiệp",
    },
    audioUrl: "/benchmarks/audio/murf-fintech.mp3",
    durationSeconds: 15,
    fileSizeBytes: 122600,
    sampleScriptEn:
      "Welcome to Asmire Capital. Our autonomous algorithmic trading engine executes high-frequency arbitrage across multi-asset liquidity pools, securing risk-adjusted yields while maintaining institutional-grade cold custody encryption.",
    sampleScriptVi:
      "Chào mừng bạn đến với Asmire Capital. Hệ thống giao dịch thuật toán tự động của chúng tôi xử lý chênh lệch giá tần suất cao trên các bể thanh khoản đa tài sản, tối ưu lợi nhuận phòng ngừa rủi ro và mã hóa bảo mật chuẩn quỹ đầu tư.",
    metrics: {
      mosScore: 4.22,
      latencyMs: 640,
      pronunciationAccuracy: 96.8,
      emotionDepthScore: 8.2,
      costPerMinute: "$0.024 / min (Pro Plan)",
    },
    keyTakeaway: {
      en: "Clean and authoritative broadcast quality, though rhythm sounds slightly formal and less emotionally spontaneous than ElevenLabs.",
      vi: "Chất lượng phát thanh truyền hình chuẩn mực, tuy nhiên nhịp điệu mang hơi hướng bài thuyết trình chỉn chu, ít tính ngẫu hứng cảm xúc hơn ElevenLabs.",
    },
    pros: {
      en: [
        "Built-in timeline video sync and pitch/emphasis sliders",
        "Excellent commercial royalty-free library",
        "Robust enterprise governance and team collaboration",
      ],
      vi: [
        "Tích hợp sẵn timeline đồng bộ video và thanh kéo chỉnh cao độ/nhấn âm",
        "Kho thư viện âm nhạc thương mại miễn phí bản quyền phong phú",
        "Hỗ trợ phân quyền nhóm và bảo mật dữ liệu doanh nghiệp mạnh mẽ",
      ],
    },
    cons: {
      en: ["Higher rendering latency, not suitable for real-time streaming"],
      vi: ["Độ trễ render cao hơn, không phù hợp cho tương tác đàm thoại thời gian thực"],
    },
    affiliateUrl: "/go/murf",
  },
  {
    id: "listnr-voice-test",
    toolSlug: "listnr",
    name: "Listnr AI Voice",
    category: "voice-ai",
    rank: 3,
    isWinner: false,
    verdictBadge: {
      en: "Budget Option for Podcasting",
      vi: "Lựa chọn tiết kiệm ngân sách cho Podcast",
    },
    audioUrl: "/benchmarks/audio/listnr-fintech.mp3",
    durationSeconds: 15,
    fileSizeBytes: 57700,
    sampleScriptEn:
      "Welcome to Asmire Capital. Our autonomous algorithmic trading engine executes high-frequency arbitrage across multi-asset liquidity pools, securing risk-adjusted yields while maintaining institutional-grade cold custody encryption.",
    sampleScriptVi:
      "Chào mừng bạn đến với Asmire Capital. Hệ thống giao dịch thuật toán tự động của chúng tôi xử lý chênh lệch giá tần suất cao trên các bể thanh khoản đa tài sản, tối ưu lợi nhuận phòng ngừa rủi ro và mã hóa bảo mật chuẩn quỹ đầu tư.",
    metrics: {
      mosScore: 3.65,
      latencyMs: 1150,
      pronunciationAccuracy: 91.2,
      emotionDepthScore: 6.9,
      costPerMinute: "$0.009 / min (Standard)",
    },
    keyTakeaway: {
      en: "Economical choice for automated RSS podcasts, but displays noticeable robotic flatness and pitch compression on polysyllabic financial terminology.",
      vi: "Lựa chọn kinh tế cho kênh podcast tự động, nhưng để lộ âm điệu phẳng máy móc và nén cao độ khi gặp các từ chuyên ngành tài chính phức tạp.",
    },
    pros: {
      en: [
        "Built-in podcast hosting & distribution directly to Spotify/Apple",
        "Affordable entry pricing with lifetime plan promotions",
      ],
      vi: [
        "Tích hợp sẵn hosting podcast và phân phối tự động lên Spotify/Apple",
        "Chi phí khởi điểm rẻ, thường xuyên có các gói ưu đãi dài hạn",
      ],
    },
    cons: {
      en: [
        "Robotic cadence artifacts on technical vocabulary",
        "Limited micro-intonation customization",
      ],
      vi: [
        "Xuất hiện âm rè nhân tạo ở các từ vựng kỹ thuật",
        "Khả năng tùy chỉnh vi ngữ điệu (micro-intonation) còn hạn chế",
      ],
    },
    affiliateUrl: "/go/listnr",
  },
];

export const VIDEO_BENCHMARKS: VideoBenchmarkItem[] = [
  {
    id: "heygen-video-test",
    toolSlug: "heygen",
    name: "HeyGen Avatar 2.8",
    category: "video-avatar",
    rank: 1,
    isWinner: true,
    verdictBadge: {
      en: "Editor's Choice: #1 Video Avatar Realism",
      vi: "Lựa chọn số 1: Avatar chân thực & Khớp khẩu hình nhất",
    },
    videoUrl: "/benchmarks/video/heygen-saas-12s.webm",
    durationSeconds: 12,
    fileSizeBytes: 890000,
    resolution: "720p 30fps (Optimized WebM)",
    sampleScriptEn:
      "Scaling enterprise video production has never been faster. Transform raw markdown text into studio-grade executive presentations in seconds with zero camera equipment or studio overhead.",
    sampleScriptVi:
      "Nhân bản quy mô sản xuất video doanh nghiệp chưa bao giờ nhanh đến thế. Chuyển đổi tài liệu văn bản thành bài thuyết trình chuẩn studio chỉ trong vài giây mà không cần máy quay hay trường quay đắt đỏ.",
    metrics: {
      lipSyncAccuracy: 98.4,
      renderSpeedRatio: "3.2x Real-Time",
      microGestureScore: 9.6,
      watermarkQuality: "100% Invisible",
      costPerMinute: "$1.95 / min (Creator)",
    },
    keyTakeaway: {
      en: "Exceptional phoneme-level lip synchronization with dynamic tooth and tongue articulation. Natural micro-eye blinks and head tilt physics eliminate the uncanny valley.",
      vi: "Khớp khẩu hình chuẩn xác từng âm vị với chuyển động răng lưỡi tự nhiên. Nhịp chớp mắt và độ nghiêng đầu vi mô giải quyết triệt để cảm giác giả tạo (uncanny valley).",
    },
    pros: {
      en: [
        "Instant Custom Avatar from 2-minute webcam recording",
        "Dynamic video translation with native voice cloning in 40+ languages",
        "Rapid 3.2x real-time rendering engine",
      ],
      vi: [
        "Tạo avatar cá nhân tức thì chỉ từ video quay bằng webcam 2 phút",
        "Dịch thuật video kèm sao chép giọng nói gốc sang hơn 40 ngôn ngữ",
        "Tốc độ xử lý video vượt trội gấp 3.2 lần thời gian thực",
      ],
    },
    cons: {
      en: ["Paid credits deplete quickly if testing multiple script drafts"],
      vi: ["Credit tiêu hao nhanh nếu render nhiều bản nháp thử nghiệm"],
    },
    affiliateUrl: "/go/heygen",
  },
  {
    id: "synthesia-video-test",
    toolSlug: "synthesia",
    name: "Synthesia Studio v3.1",
    category: "video-avatar",
    rank: 2,
    isWinner: false,
    verdictBadge: {
      en: "Best Enterprise Compliance & Governance",
      vi: "Tiêu chuẩn bảo mật & Quản trị doanh nghiệp lớn",
    },
    videoUrl: "/benchmarks/video/synthesia-saas-12s.webm",
    durationSeconds: 12,
    fileSizeBytes: 840000,
    resolution: "720p 30fps (Optimized WebM)",
    sampleScriptEn:
      "Scaling enterprise video production has never been faster. Transform raw markdown text into studio-grade executive presentations in seconds with zero camera equipment or studio overhead.",
    sampleScriptVi:
      "Nhân bản quy mô sản xuất video doanh nghiệp chưa bao giờ nhanh đến thế. Chuyển đổi tài liệu văn bản thành bài thuyết trình chuẩn studio chỉ trong vài giây mà không cần máy quay hay trường quay đắt đỏ.",
    metrics: {
      lipSyncAccuracy: 92.1,
      renderSpeedRatio: "1.8x Real-Time",
      microGestureScore: 8.1,
      watermarkQuality: "95% Clean",
      costPerMinute: "$2.40 / min (Starter)",
    },
    keyTakeaway: {
      en: "Reliable, enterprise-certified corporate avatars. While lip-sync is accurate, torso movement remains slightly rigid compared to HeyGen's fluid gestures.",
      vi: "Hệ thống avatar doanh nghiệp đạt chuẩn chứng chỉ bảo mật cao. Khẩu hình chính xác nhưng tư thế thân người còn hơi cứng so với chuyển động uyển chuyển của HeyGen.",
    },
    pros: {
      en: [
        "SOC2 Type II certified enterprise security",
        "Massive library of 160+ diverse professional studio avatars",
        "Collaborative multi-user team workspaces",
      ],
      vi: [
        "Chứng nhận an toàn bảo mật cấp doanh nghiệp SOC2 Type II",
        "Thư viện hơn 160 avatar quay tại studio chuyên nghiệp",
        "Không gian làm việc nhóm và xét duyệt nội dung phân cấp",
      ],
    },
    cons: {
      en: [
        "Strict per-seat pricing model ($29/mo for only 10 mins)",
        "Less expressive spontaneous hand and head movement",
      ],
      vi: [
        "Mô hình giá theo đầu người đắt đỏ ($29/tháng chỉ được 10 phút)",
        "Cử chỉ tay và lắc đầu thiếu sự phóng khoáng, tự nhiên",
      ],
    },
    affiliateUrl: "/go/synthesia",
  },
  {
    id: "did-video-test",
    toolSlug: "d-id",
    name: "D-ID Creative Reality v2.0",
    category: "video-avatar",
    rank: 3,
    isWinner: false,
    verdictBadge: {
      en: "Fastest 2D Photo Animation",
      vi: "Làm chuyển động ảnh tĩnh 2D nhanh nhất",
    },
    videoUrl: "/benchmarks/video/did-saas-12s.webm",
    durationSeconds: 12,
    fileSizeBytes: 760000,
    resolution: "720p 30fps (Optimized WebM)",
    sampleScriptEn:
      "Scaling enterprise video production has never been faster. Transform raw markdown text into studio-grade executive presentations in seconds with zero camera equipment or studio overhead.",
    sampleScriptVi:
      "Nhân bản quy mô sản xuất video doanh nghiệp chưa bao giờ nhanh đến thế. Chuyển đổi tài liệu văn bản thành bài thuyết trình chuẩn studio chỉ trong vài giây mà không cần máy quay hay trường quay đắt đỏ.",
    metrics: {
      lipSyncAccuracy: 84.6,
      renderSpeedRatio: "0.9x Real-Time",
      microGestureScore: 6.8,
      watermarkQuality: "80% Clean",
      costPerMinute: "$1.50 / min (Lite)",
    },
    keyTakeaway: {
      en: "Capable of animating any still headshot portrait, but exhibits warping distortion around collar and jaw boundaries during rapid pronunciation.",
      vi: "Tạo chuyển động nói từ bất kỳ bức ảnh chân dung tĩnh nào, tuy nhiên dễ bị biến dạng co kéo (warping) ở vùng viền cằm và cổ áo khi nói nhanh.",
    },
    pros: {
      en: [
        "Can animate any historical painting, 2D avatar, or photo",
        "Streaming interactive API for real-time web agents",
      ],
      vi: [
        "Có thể thổi hồn nói chuyện cho ảnh lịch sử, tranh vẽ hay nhân vật 2D",
        "API streaming tương tác thời gian thực hỗ trợ chatbot website",
      ],
    },
    cons: {
      en: [
        "Noticeable 2D warping artifacts around jawline and neck",
        "Limited depth perception compared to full 3D neural meshes",
      ],
      vi: [
        "Biến dạng ảnh 2D thấy rõ ở vùng cổ và góc hàm",
        "Thiếu chiều sâu không gian so với lưới mô hình 3D thần kinh",
      ],
    },
    affiliateUrl: "/go/d-id",
  },
];

export const CONTENT_BENCHMARKS: ContentBenchmarkItem[] = [
  {
    id: "koala-content-test",
    toolSlug: "koala",
    name: "KoalaWriter 3.0 (Live SERP + GPT-4o)",
    category: "content-seo",
    rank: 1,
    isWinner: true,
    verdictBadge: {
      en: "Editor's Choice: #1 SEO Depth & Lowest AI Footprint",
      vi: "Lựa chọn số 1: Chiều sâu SEO & Dấu vết AI thấp nhất",
    },
    metrics: {
      originalityAiDetectionPct: 12, // 12% detected as AI = 88% Human!
      factualSerpDepthScore: 9.8,
      hallucinationRatePct: 0.8,
      generationSpeedSeconds: 42,
      costPer1kWords: "$0.09 / 1k words",
    },
    samplePromptEn:
      "Write an in-depth, high-converting buyer guide section comparing the Best CRM for Commercial Real Estate agencies in 2026, focusing on pipeline tracking, commission split calculation, and mobile field sync.",
    samplePromptVi:
      "Viết bài hướng dẫn so sánh chuyên sâu các phần mềm CRM tốt nhất cho môi giới Bất động sản thương mại năm 2026, tập trung vào quản lý phễu giao dịch, công thức chia hoa hồng và đồng bộ di động tại hiện trường.",
    generatedTextSegments: [
      {
        text: "Commercial real estate transactions in 2026 require specialized transaction structures rather than generic B2B pipeline stages. ",
        type: "normal",
      },
      {
        text: "Unlike HubSpot which requires Custom Objects starting at the $500/mo Enterprise tier to track lease expirations, Buildout and Apto provide native multi-tenant property hierarchies out of the box. ",
        type: "factual",
        annotation: {
          en: "Real 2026 commercial pricing comparison verified against live pricing tiers.",
          vi: "Đối chiếu biểu phí thực tế năm 2026 chuẩn xác với các gói phần mềm.",
        },
      },
      {
        text: "For commission split accounting, agency leaders must handle tiered splits—such as 50/50 broker-house splits sliding to 70/30 once an agent passes the $100k gross commission income threshold. ",
        type: "factual",
        annotation: {
          en: "Authentic industry accounting mechanics rather than generic buzzwords.",
          vi: "Công thức phân chia tài chính thực tiễn của ngành môi giới thay vì từ ngữ sáo rỗng.",
        },
      },
      {
        text: "With real-time GPS property mapping and offline-first iOS caching, field brokers can log site walk-through inspections without losing sync during basement or high-rise signal drops.",
        type: "normal",
      },
    ],
    keyTakeaway: {
      en: "Synthesizes real-time Google search data into proprietary insights. Only 12% AI detection on Originality.ai with zero corporate fluff or repetitive thesis sentences.",
      vi: "Tổng hợp dữ liệu tìm kiếm Google thời gian thực thành hiểu biết sâu sắc. Chỉ 12% dấu vết AI trên Originality.ai, không mở bài sáo rỗng hay lặp lại ý vô nghĩa.",
    },
    pros: {
      en: [
        "Live Google Search integration extracts up-to-date pricing and features",
        "Automated internal linking and Amazon affiliate table insertion",
        "Lowest AI detection score across all commercial writing engines",
      ],
      vi: [
        "Tích hợp tìm kiếm Google trực tiếp để cập nhật giá cả và tính năng mới nhất",
        "Tự động chèn liên kết nội bộ và bảng so sánh affiliate chuẩn SEO",
        "Điểm phát hiện AI thấp nhất trong tất cả các công cụ viết thương mại",
      ],
    },
    cons: {
      en: ["Interface is focused purely on SEO articles rather than email copywriting"],
      vi: ["Giao diện tập trung thuần cho bài viết SEO, ít mẫu viết email marketing"],
    },
    affiliateUrl: "/go/koala",
  },
  {
    id: "jasper-content-test",
    toolSlug: "jasper",
    name: "Jasper AI Business",
    category: "content-seo",
    rank: 2,
    isWinner: false,
    verdictBadge: {
      en: "Best for Multi-Channel Enterprise Campaigns",
      vi: "Chiến dịch tiếp thị đa kênh cho doanh nghiệp lớn",
    },
    metrics: {
      originalityAiDetectionPct: 78,
      factualSerpDepthScore: 7.4,
      hallucinationRatePct: 4.6,
      generationSpeedSeconds: 28,
      costPer1kWords: "$0.38 / 1k words",
    },
    samplePromptEn:
      "Write an in-depth, high-converting buyer guide section comparing the Best CRM for Commercial Real Estate agencies in 2026, focusing on pipeline tracking, commission split calculation, and mobile field sync.",
    samplePromptVi:
      "Viết bài hướng dẫn so sánh chuyên sâu các phần mềm CRM tốt nhất cho môi giới Bất động sản thương mại năm 2026, tập trung vào quản lý phễu giao dịch, công thức chia hoa hồng và đồng bộ di động tại hiện trường.",
    generatedTextSegments: [
      {
        text: "In today's fast-paced real estate landscape, staying ahead of the competition is more crucial than ever before. ",
        type: "fluff",
        annotation: {
          en: "Generic AI cliche intro detected by search engines as low-value content.",
          vi: "Câu mở bài sáo rỗng điển hình của AI, dễ bị thuật toán Google đánh giá thấp.",
        },
      },
      {
        text: "Finding the right CRM solution can streamline your agency workflows and empower your sales representatives to close more deals. A robust pipeline lets you visualize opportunities seamlessly. ",
        type: "normal",
      },
      {
        text: "Leading software options provide intuitive dashboards, automated email sequences, and commission tracking modules that help your brokerage maintain a competitive edge. ",
        type: "normal",
      },
      {
        text: "For instance, tools like Propertybase offer standard 80/20 splits without requiring manual spreadsheets.",
        type: "factual",
        annotation: {
          en: "Accurate feature citation, but lacks granular tier constraints.",
          vi: "Dẫn chứng tính năng đúng nhưng chưa chi tiết các giới hạn của từng gói.",
        },
      },
    ],
    keyTakeaway: {
      en: "High stylistic polish for brand voice uniformity, but frequently introduces generic introductory fluff that triggers 78% AI detection rates.",
      vi: "Văn phong mượt mà thống nhất theo Brand Voice, nhưng thường mở đầu bằng các câu sáo rỗng dẫn đến tỷ lệ phát hiện AI lên tới 78%.",
    },
    pros: {
      en: [
        "Company Knowledge Base and Brand Voice customization",
        "Instant multi-asset generation (Blog + LinkedIn + Email)",
      ],
      vi: [
        "Tính năng học dữ liệu nội bộ (Knowledge Base) và giữ đúng tông giọng thương hiệu",
        "Tạo hàng loạt nội dung cùng lúc (Bài blog + Bài đăng LinkedIn + Email)",
      ],
    },
    cons: {
      en: [
        "Expensive monthly cost ($49/seat/mo) compared to output depth",
        "High AI detection footprint requires manual human editing",
      ],
      vi: [
        "Chi phí hàng tháng đắt đỏ ($49/người dùng/tháng)",
        "Dấu vết AI cao đòi hỏi biên tập viên phải sửa tay nhiều chỗ",
      ],
    },
    affiliateUrl: "/go/jasper",
  },
  {
    id: "copyai-content-test",
    toolSlug: "copy-ai",
    name: "Copy.ai Workflows",
    category: "content-seo",
    rank: 3,
    isWinner: false,
    verdictBadge: {
      en: "Best for Automated GTM Sales Outbound",
      vi: "Tự động hóa luồng tiếp cận bán hàng Outbound",
    },
    metrics: {
      originalityAiDetectionPct: 91,
      factualSerpDepthScore: 6.2,
      hallucinationRatePct: 8.5,
      generationSpeedSeconds: 20,
      costPer1kWords: "$0.32 / 1k words",
    },
    samplePromptEn:
      "Write an in-depth, high-converting buyer guide section comparing the Best CRM for Commercial Real Estate agencies in 2026, focusing on pipeline tracking, commission split calculation, and mobile field sync.",
    samplePromptVi:
      "Viết bài hướng dẫn so sánh chuyên sâu các phần mềm CRM tốt nhất cho môi giới Bất động sản thương mại năm 2026, tập trung vào quản lý phễu giao dịch, công thức chia hoa hồng và đồng bộ di động tại hiện trường.",
    generatedTextSegments: [
      {
        text: "Are you looking to take your commercial real estate agency to the next level? ",
        type: "fluff",
        annotation: {
          en: "Obsolete rhetorical opening question.",
          vi: "Câu hỏi tu từ khuôn mẫu, thiếu tính chuyên gia ngành.",
        },
      },
      {
        text: "A commercial CRM acts as your agency's central nervous system, keeping deals moving and agents accountable. ",
        type: "normal",
      },
      {
        text: "With built-in mobile capabilities, team members can access contact databases from any location at any time. ",
        type: "normal",
      },
      {
        text: "Top platforms even calculate commission payments instantly using proprietary AI forecasting algorithms.",
        type: "hallucination",
        annotation: {
          en: "Hallucination: Standard CRMs use rule-based split tables, not AI forecasting algorithms.",
          vi: "Ảo giác thông tin: Các CRM bất động sản dùng bảng chia tỷ lệ cố định, không dùng thuật toán AI dự báo hoa hồng.",
        },
      },
    ],
    keyTakeaway: {
      en: "Excellent for triggering automated sales webhooks and scraping LinkedIn contacts, but poor for long-form SEO where factual depth and human cadence matter.",
      vi: "Rất mạnh về webhook tự động hóa phễu bán hàng B2B, nhưng yếu khi viết bài SEO dài do thiếu chiều sâu thực tế và tỷ lệ phát hiện AI lên tới 91%.",
    },
    pros: {
      en: [
        "Powerful visual workflow builder for GTM pipeline automation",
        "Integrates with CRM webhooks and Apollo leads",
      ],
      vi: [
        "Trình tạo luồng trực quan mạnh mẽ cho tự động hóa bán hàng GTM",
        "Kết nối mượt mà với webhook CRM và dữ liệu khách hàng từ Apollo",
      ],
    },
    cons: {
      en: [
        "91% AI detection rate with repetitive syntax",
        "Hallucinates complex commercial industry formulas",
      ],
      vi: [
        "Tỷ lệ phát hiện AI tới 91% với cấu trúc câu rập khuôn",
        "Dễ bị ảo giác thông tin khi diễn giải các công thức tài chính chuyên sâu",
      ],
    },
    affiliateUrl: "/go/copy-ai",
  },
];
