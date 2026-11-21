import { TOOLS_DATA } from "./tools-data";
import { ToolItem } from "@/types";
import { Locale } from "@/lib/i18n";

export interface ComparisonPair {
  slug: string; // e.g. "highlevel-vs-nutshell"
  toolASlug: string;
  toolBSlug: string;
  category: string;
  title: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  directAnswer: Record<Locale, string>;
  winnerOverall: "A" | "B" | "TIE";
  verdictSummary: Record<Locale, string>;
  whoShouldChooseA: Record<Locale, string>;
  whoShouldChooseB: Record<Locale, string>;
  pricingVerdict: Record<Locale, string>;
}

export const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    slug: "highlevel-vs-nutshell",
    toolASlug: "highlevel",
    toolBSlug: "nutshell",
    category: "CRM & Marketing Automation",
    title: {
      en: "HighLevel vs Nutshell (2026): In-Depth CRM & Agency Automation Comparison",
      vi: "So Sánh HighLevel vs Nutshell (2026): Đánh Giá CRM & Tự Động Hóa Thực Tế",
    },
    metaDescription: {
      en: "Head-to-head comparison between GoHighLevel and Nutshell CRM. Benchmarking multi-channel funnels, client sub-accounts, pricing scaling, and ease of use.",
      vi: "So sánh chi tiết GoHighLevel và Nutshell CRM. Phân tích tính năng phễu bán hàng đa kênh, quản lý sub-account, chi phí theo quy mô và độ khó triển khai.",
    },
    directAnswer: {
      en: "HighLevel is best for marketing agencies and multi-client consultants wanting an all-in-one white-label system replacing 5+ tools. Nutshell is superior for B2B sales teams who need a clean, zero-friction pipeline CRM with dedicated phone dialing and simple contact management.",
      vi: "HighLevel phù hợp nhất cho các agency marketing và chuyên gia tư vấn quản lý nhiều khách hàng cần hệ thống all-in-one gắn nhãn riêng. Nutshell vượt trội cho đội ngũ sales B2B cần một CRM quản lý pipeline trực quan, mượt mà và triển khai tức thì.",
    },
    winnerOverall: "A",
    verdictSummary: {
      en: "HighLevel wins on sheer feature breadth, unlimited client sub-accounts, and marketing automation capabilities, while Nutshell wins on learning curve and traditional B2B sales usability.",
      vi: "HighLevel chiến thắng về độ rộng tính năng, khả năng tạo tài khoản con không giới hạn và tự động hóa marketing, trong khi Nutshell chiếm ưu thế về thời gian làm quen và độ tinh gọn cho sales B2B.",
    },
    whoShouldChooseA: {
      en: "Choose HighLevel if you run an agency, manage multiple client brands, require automated SMS/call follow-ups, and want to consolidate landing pages, email marketing, and CRM into one flat monthly fee.",
      vi: "Chọn HighLevel nếu bạn là agency, quản lý nhiều nhãn hàng, cần tự động hóa SMS/cuộc gọi và muốn gom trang đích, email marketing, CRM về một gói cước cố định.",
    },
    whoShouldChooseB: {
      en: "Choose Nutshell if you have a traditional B2B sales team that hates cluttered dashboards and needs immediate pipeline visibility without hiring a full-time CRM administrator.",
      vi: "Chọn Nutshell nếu bạn có đội ngũ bán hàng B2B truyền thống, ghét giao diện rườm rà và cần nắm bắt pipeline doanh thu ngay lập tức mà không phải thuê chuyên gia cài đặt.",
    },
    pricingVerdict: {
      en: "HighLevel starts at $97/mo (unlimited contacts on Starter). Nutshell starts at $16/user/mo. For teams with 10+ users, HighLevel is drastically more cost-effective.",
      vi: "HighLevel khởi điểm $97/tháng (không giới hạn liên hệ gói Starter). Nutshell từ $16/người/tháng. Khi quy mô trên 10 nhân sự, HighLevel tiết kiệm chi phí vượt trội.",
    },
  },
  {
    slug: "elevenlabs-vs-listnr",
    toolASlug: "elevenlabs",
    toolBSlug: "listnr",
    category: "AI Voice & Speech Synthesis",
    title: {
      en: "ElevenLabs vs Listnr (2026): Which AI Voice Generator Produces Better Audio?",
      vi: "So Sánh ElevenLabs vs Listnr (2026): Nền Tảng Giọng Nói AI Nào Chân Thực Hơn?",
    },
    metaDescription: {
      en: "ElevenLabs vs Listnr tested on voice realism, emotion control, voice cloning latency, and commercial podcast licensing. See verified benchmark audio results.",
      vi: "Thử nghiệm ElevenLabs vs Listnr về độ chân thực của giọng đọc, biểu cảm cảm xúc, độ trễ voice cloning và bản quyền thương mại cho podcast.",
    },
    directAnswer: {
      en: "ElevenLabs dominates in hyper-realistic human emotion, subtle pauses, and instantaneous voice cloning. Listnr is better tailored for podcasters wanting an integrated podcast hosting platform with automatic RSS feed distribution.",
      vi: "ElevenLabs dẫn đầu tuyệt đối về độ chân thực, hơi thở tự nhiên, cảm xúc và khả năng nhân bản giọng đọc tức thì. Listnr phù hợp hơn cho người làm podcast muốn có sẵn hệ thống hosting và phân phối RSS tích hợp.",
    },
    winnerOverall: "A",
    verdictSummary: {
      en: "ElevenLabs is the undisputed industry benchmark for expressive voice synthesis and multi-lingual dubbing. Listnr offers a practical bundle if podcast distribution is your primary objective.",
      vi: "ElevenLabs là chuẩn mực của ngành về biểu cảm giọng nói và lồng tiếng đa ngôn ngữ. Listnr là giải pháp tiện lợi nếu mục tiêu chính của bạn là phân phối podcast trọn gói.",
    },
    whoShouldChooseA: {
      en: "Choose ElevenLabs for cinematic narration, audiobooks, game voiceovers, high-stakes video ads, and APIs requiring ultra-low latency speech synthesis.",
      vi: "Chọn ElevenLabs cho lồng tiếng phim, sách nói, game, video quảng cáo cao cấp và các ứng dụng cần gọi API giọng nói siêu tốc.",
    },
    whoShouldChooseB: {
      en: "Choose Listnr if you want an all-in-one podcast creation and hosting workflow with customizable embedded audio players for WordPress or blogs.",
      vi: "Chọn Listnr nếu bạn muốn một quy trình tạo và lưu trữ podcast tích hợp sẵn trình phát audio nhúng cho website hoặc WordPress.",
    },
    pricingVerdict: {
      en: "ElevenLabs has a generous Free tier, with Starter from $5/mo. Listnr starts at $19/mo. For heavy character volumes, monitor ElevenLabs tiered character usage.",
      vi: "ElevenLabs có gói Free trải nghiệm, gói Starter từ $5/tháng. Listnr khởi điểm từ $19/tháng. Hãy chú ý hạn mức ký tự hàng tháng khi dùng khối lượng lớn.",
    },
  },
  {
    slug: "jasper-vs-koala-ai",
    toolASlug: "jasper",
    toolBSlug: "koala",
    category: "AI Content & SEO Writing",
    title: {
      en: "Jasper AI vs Koala AI (2026): Best AI Writer for Long-Form SEO Articles?",
      vi: "So Sánh Jasper AI vs Koala AI (2026): Đâu Là Công Cụ Viết Bài SEO Dài Tốt Nhất?",
    },
    metaDescription: {
      en: "Comparing Jasper AI enterprise brand voice against Koala AI 1-click SEO articles. Real benchmarks on SERP ranking performance, live web search, and costs.",
      vi: "So sánh Jasper AI chuyên nghiệp cho thương hiệu với Koala AI viết bài SEO 1 chạm. Đánh giá khả năng index Google, trích xuất dữ liệu web trực tiếp và chi phí.",
    },
    directAnswer: {
      en: "Koala AI is significantly faster and more effective for niche affiliate bloggers needing 2,500+ word, SEO-structured articles with real-time Google search data and auto Amazon product roundups. Jasper is designed for corporate marketing departments managing unified brand voice across omnichannel campaigns.",
      vi: "Koala AI vượt trội rõ rệt cho các blogger làm affiliate ngách cần tạo bài viết chuẩn SEO 2.500+ từ chỉ với 1 click, tích hợp sẵn dữ liệu Google trực tiếp và bảng sản phẩm. Jasper hướng tới các phòng marketing doanh nghiệp cần kiểm soát tông giọng thương hiệu nhất quán trên mọi chiến dịch.",
    },
    winnerOverall: "TIE",
    verdictSummary: {
      en: "Tie based on distinct use cases: Koala AI wins for solo SEO affiliate publishers; Jasper wins for corporate content teams requiring brand governance.",
      vi: "Hòa điểm tùy theo mục tiêu: Koala AI chiến thắng cho người làm SEO/Affiliate độc lập; Jasper chiến thắng cho đội ngũ marketing doanh nghiệp cần quản trị thương hiệu.",
    },
    whoShouldChooseA: {
      en: "Choose Jasper if you collaborate with multiple copywriters, need strict brand style guides, produce diverse content (social, emails, ads), and use enterprise integrations.",
      vi: "Chọn Jasper nếu bạn có đội ngũ cộng tác nhiều người, cần tuân thủ guideline thương hiệu khắt khe và sáng tạo nhiều loại nội dung (social, email, quảng cáo).",
    },
    whoShouldChooseB: {
      en: "Choose Koala AI if your core objective is ranking informational articles on Google with accurate live citations, schema outlines, and direct WordPress auto-publishing.",
      vi: "Chọn Koala AI nếu mục tiêu duy nhất của bạn là bài viết dài lên top Google kèm dẫn nguồn dữ liệu thực tế và tự động đăng bài lên WordPress.",
    },
    pricingVerdict: {
      en: "Koala AI offers an affordable pay-as-you-go / $9/mo entry. Jasper starts at $39/mo billed annually ($49/mo monthly).",
      vi: "Koala AI có mức giá khởi điểm mềm chỉ từ $9/tháng. Jasper có giá khởi điểm từ $39/tháng (trả theo năm) hoặc $49/tháng.",
    },
  },
  {
    slug: "gamma-vs-decktopus",
    toolASlug: "gamma",
    toolBSlug: "decktopus",
    category: "AI Presentations & Decks",
    title: {
      en: "Gamma vs Decktopus AI (2026): Which AI Presentation Builder Is Better?",
      vi: "So Sánh Gamma vs Decktopus AI (2026): Trình Tạo Bài Thuyết Trình AI Nào Đỉnh Hơn?",
    },
    metaDescription: {
      en: "Gamma vs Decktopus AI tested for pitch decks, document-to-presentation workflows, interactive cards, and export flexibility. Full feature breakdown.",
      vi: "Đánh giá chi tiết Gamma và Decktopus AI cho pitch deck gọi vốn, chuyển tài liệu thành slide, thẻ tương tác và khả năng xuất file PDF/PowerPoint.",
    },
    directAnswer: {
      en: "Gamma is the market leader for modern, flexible presentations that look like interactive web documents with modular blocks and sleek typography. Decktopus AI is superior for rapid lead-generation presentations featuring built-in form capture, audio narration, and structured sales decks.",
      vi: "Gamma dẫn đầu thị trường về bài thuyết trình hiện đại dạng tài liệu web linh hoạt, thiết kế tối giản sang trọng. Decktopus AI vượt trội cho các bài thuyết trình bán hàng cần thu thập thông tin khách hàng (form lead), chèn voiceover và bố cục bài bản.",
    },
    winnerOverall: "A",
    verdictSummary: {
      en: "Gamma offers a vastly superior visual design aesthetic, interactive embed capabilities, and fluid canvas layout. Decktopus is best when presentations double as lead capture magnets.",
      vi: "Gamma có thẩm mỹ thiết kế hiện đại vượt bậc và trải nghiệm xem như website tương tác. Decktopus phù hợp nhất khi slide bài giảng gắn liền với mục tiêu thu thập contact khách hàng.",
    },
    whoShouldChooseA: {
      en: "Choose Gamma for modern startup pitch decks, executive briefings, product overviews, and interactive documents that look stunning on both mobile and desktop screens.",
      vi: "Chọn Gamma cho pitch deck startup, báo cáo ban giám đốc, tài liệu giới thiệu sản phẩm tương tác hiển thị đẹp hoàn hảo trên cả điện thoại và máy tính.",
    },
    whoShouldChooseB: {
      en: "Choose Decktopus if you are creating webinar decks, sales proposals, or coaching presentations where capturing attendee emails and scheduling meetings inside the deck is critical.",
      vi: "Chọn Decktopus nếu bạn làm slide hội thảo, đề xuất bán hàng hoặc bài giảng cần gắn form thu thập email và đặt lịch hẹn trực tiếp bên trong slide.",
    },
    pricingVerdict: {
      en: "Gamma has a strong Free tier with starter credits, Plus plan at $8/mo. Decktopus starts at $14.99/mo.",
      vi: "Gamma có gói Free với số credit khởi tạo rộng rãi, gói Plus từ $8/tháng. Decktopus có giá khởi điểm từ $14.99/tháng.",
    },
  },
  {
    slug: "originality-vs-winston",
    toolASlug: "originality",
    toolBSlug: "winston",
    category: "AI Content & Plagiarism Detection",
    title: {
      en: "Originality.ai vs Winston AI (2026): Most Accurate AI Detector Tested",
      vi: "So Sánh Originality.ai vs Winston AI (2026): Công Cụ Quét AI Nào Chính Xác Nhất?",
    },
    metaDescription: {
      en: "Originality.ai vs Winston AI detection accuracy benchmark against GPT-4o, Claude 3.5 Sonnet, and Gemini Pro. False positive rates and academic verification.",
      vi: "Thử nghiệm độ chính xác của Originality.ai và Winston AI trước văn bản tạo bởi GPT-4o, Claude 3.5 Sonnet và Gemini. Phân tích tỷ lệ nhận diện sai và quét đạo văn.",
    },
    directAnswer: {
      en: "Originality.ai is the top tool for web publishers and SEO agencies concerned with Google search quality updates and AI paraphrasers. Winston AI is preferred by educational institutions and teachers due to its student privacy compliance, OCR handwriting scan, and lower false-positive rate on human academic writing.",
      vi: "Originality.ai là công cụ số 1 cho các đơn vị xuất bản web và SEO agency theo dõi thuật toán Google và phát hiện văn bản AI xáo trộn. Winston AI được các trường học và giáo viên ưa chuộng hơn nhờ tuân thủ bảo mật học sinh, quét ảnh chữ viết tay OCR và tỷ lệ báo nhầm thấp hơn trên văn bản học thuật.",
    },
    winnerOverall: "A",
    verdictSummary: {
      en: "Originality.ai provides deeper heuristic analysis for modern web content, readability scores, and fact-checking assistance. Winston AI excels in academic integrity and scanned document handling.",
      vi: "Originality.ai cung cấp phân tích sâu hơn cho bài viết web, chấm điểm khả năng đọc và hỗ trợ kiểm tra nguồn. Winston AI xuất sắc trong môi trường giáo dục và xử lý tài liệu scan.",
    },
    whoShouldChooseA: {
      en: "Choose Originality.ai if you manage freelance content writers, buy content at scale, or verify website portfolios against Google Helpful Content guidelines.",
      vi: "Chọn Originality.ai nếu bạn quản lý đội ngũ cộng tác viên viết bài tự do, duyệt bài viết SEO số lượng lớn hoặc audit website theo tiêu chuẩn chất lượng của Google.",
    },
    whoShouldChooseB: {
      en: "Choose Winston AI if you are an educator, school administrator, or enterprise reviewing scanned PDFs, student essays, or requiring privacy certifications.",
      vi: "Chọn Winston AI nếu bạn là giáo viên, trường học hoặc doanh nghiệp cần quét file PDF scan, bài luận của học sinh và yêu cầu chứng nhận bảo mật dữ liệu học tập.",
    },
    pricingVerdict: {
      en: "Originality.ai offers flexible pay-as-you-go credits ($30 for 300,000 words) or $14.95/mo. Winston AI starts at $12/mo for 80,000 words.",
      vi: "Originality.ai có gói nạp tiền theo nhu cầu rất linh hoạt ($30 cho 300.000 từ) hoặc $14.95/tháng. Winston AI khởi điểm từ $12/tháng cho 80.000 từ.",
    },
  },
  {
    slug: "fireflies-vs-meetgeek",
    toolASlug: "fireflies",
    toolBSlug: "meetgeek",
    category: "AI Meeting Assistants & Note-taking",
    title: {
      en: "Fireflies.ai vs MeetGeek (2026): Which AI Meeting Notetaker Wins?",
      vi: "So Sánh Fireflies.ai vs MeetGeek (2026): Trợ Lý Họp AI Nào Ghi Chép Tốt Hơn?",
    },
    metaDescription: {
      en: "Tested: Fireflies.ai vs MeetGeek on transcription accuracy across Zoom/Teams/Meet, speaker diarization, CRM integrations, and automatic action items.",
      vi: "Thử nghiệm thực tế Fireflies.ai vs MeetGeek về độ chuẩn xác khi ghi âm Zoom/Teams/Meet, nhận diện giọng nói từng người, đồng bộ CRM và trích xuất to-do list.",
    },
    directAnswer: {
      en: "Fireflies.ai is superior for sales teams and engineering organizations that need deep integrations into CRMs (Salesforce, HubSpot), project tools (Jira, Slack), and custom soundbite sharing. MeetGeek shines for customer interviewers and consultants who want automated meeting video highlights and auto-generated meeting recap emails.",
      vi: "Fireflies.ai vượt trội cho các đội nhóm bán hàng và công nghệ cần đồng bộ sâu vào CRM (Salesforce, HubSpot), quản lý tác vụ (Jira, Slack) và cắt đoạn audio âm thanh quan trọng. MeetGeek nổi bật cho các nhà nghiên cứu người dùng và tư vấn viên muốn tạo video highlight ngắn và tự động gửi email tóm tắt cuộc họp.",
    },
    winnerOverall: "A",
    verdictSummary: {
      en: "Fireflies.ai takes the lead due to its mature ecosystem of 40+ app integrations, AI summary customization, and API availability. MeetGeek is a solid alternative for teams wanting video clip chapters.",
      vi: "Fireflies.ai dẫn đầu nhờ hệ sinh thái hơn 40 kết nối ứng dụng, khả năng tùy biến prompt tóm tắt và API mở rộng. MeetGeek là lựa chọn tốt nếu bạn thích cắt video tóm tắt theo chương.",
    },
    whoShouldChooseA: {
      en: "Choose Fireflies.ai if you need automated meeting notes pushed into HubSpot/Salesforce, extensive language coverage, and enterprise administrative controls.",
      vi: "Chọn Fireflies.ai nếu bạn cần tự động đẩy ghi chú cuộc họp vào CRM, hỗ trợ nhiều ngôn ngữ và có chính sách kiểm soát dữ liệu doanh nghiệp chặt chẽ.",
    },
    whoShouldChooseB: {
      en: "Choose MeetGeek if you frequently share 30-second video snippet highlights with stakeholders and want automated, ready-to-send follow-up emails.",
      vi: "Chọn MeetGeek nếu bạn thường xuyên cắt các clip video ngắn 30 giây để chia sẻ cho các bên liên quan và muốn email tổng kết họp sẵn sàng gửi ngay.",
    },
    pricingVerdict: {
      en: "Fireflies.ai has a Free tier with limited credits, Pro plan from $10/user/mo billed annually. MeetGeek has a Free tier, Pro from $15/user/mo.",
      vi: "Fireflies.ai có gói Free cơ bản, gói Pro từ $10/người/tháng (năm). MeetGeek có gói Free, gói Pro khởi điểm từ $15/người/tháng.",
    },
  },
];

export function getComparisonPairBySlug(slug: string): ComparisonPair | undefined {
  return COMPARISON_PAIRS.find((p) => p.slug === slug);
}

export function getToolsForComparisonPair(pair: ComparisonPair): { toolA: ToolItem; toolB: ToolItem } | null {
  const toolA = TOOLS_DATA.find((t) => t.slug === pair.toolASlug);
  const toolB = TOOLS_DATA.find((t) => t.slug === pair.toolBSlug);
  if (!toolA || !toolB) return null;
  return { toolA, toolB };
}
