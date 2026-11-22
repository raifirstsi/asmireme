import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { SnapshotClaimForm } from "@/components/snapshots/SnapshotClaimForm";
import { 
  Sparkles, Check, CheckCircle2, ArrowRight, ExternalLink, 
  ShieldCheck, Layers, Bot, Calendar, Zap, Mail, PhoneCall, 
  Video, Gift, Building2, Scissors, Home, Utensils, HelpCircle, 
  ArrowLeft, Clock, Target, Star, Users, Flame, Award
} from "lucide-react";

interface SnapshotPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}

export async function generateMetadata({ params }: SnapshotPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";
  return {
    title: isVi
      ? "AI Agency Snapshot ($1,997 Bonus): Khởi Chạy Công Ty AI SaaS Cùng HighLevel - Asmire"
      : "AI Agency Snapshot ($1,997 Bonus): Launch Your AI SaaS with HighLevel - Asmire",
    description: isVi
      ? "Nhận miễn phí trọn bộ AI Agency Snapshot trị giá $1,997 khi đăng ký GoHighLevel qua link đối tác Asmire. Cài đặt sẵn phễu cho 4 ngách (Nhà hàng, Bất động sản, Dịch vụ gia đình, Salon), kịch bản SMS/Email và video đào tạo."
      : "Claim the $1,997 AI Agency Snapshot 100% free when activating GoHighLevel via Asmire. Pre-built funnels for 4 niches, email/SMS sequences, retargeting ads, and webinar deck.",
    alternates: {
      canonical: `/${locale}/snapshots/agency-os`,
      languages: {
        en: `/en/snapshots/agency-os`,
        vi: `/vi/snapshots/agency-os`,
        "x-default": `/en/snapshots/agency-os`,
      },
    },
  };
}

export default async function SnapshotAgencyOSPage({ params }: SnapshotPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "AI Agency Snapshot by Asmire",
    description: "Turnkey GoHighLevel AI Agency Snapshot with pre-built funnels, 2-way SMS sequences, and automated onboarding.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Asmire",
        url: "https://asmire.me",
      },
    },
  };

  const niches = [
    {
      icon: Utensils,
      name: isVi ? "Nhà Hàng & F&B" : "Restaurants & Dining",
      badge: isVi ? "Chốt bàn tự động" : "Table Booking",
      desc: isVi 
        ? "Phễu đặt bàn trực tuyến, thu thập số điện thoại tích điểm thành viên và tự động gửi tin nhắn SMS kích hoạt lại khách hàng cũ vào các ngày trong tuần vắng khách."
        : "Automated table reservation funnel, VIP loyalty phone capture, and weekday customer reactivation SMS campaigns.",
    },
    {
      icon: Building2,
      name: isVi ? "Bất Động Sản & Môi Giới" : "Real Estate & Brokers",
      badge: isVi ? "Sàng lọc khách mua" : "Buyer Qualification",
      desc: isVi
        ? "Phễu lọc khách hàng tiềm năng theo ngân sách mua nhà, tự động phân phối thông tin dự án qua Zalo/SMS và xếp lịch hẹn đi xem nhà trực tiếp vào Google Calendar."
        : "Budget-based buyer qualification quiz, automated property showcase drip, and automated open house tour booking.",
    },
    {
      icon: Home,
      name: isVi ? "Dịch Vụ Sửa Chữa & HVAC" : "Home Services & HVAC",
      badge: isVi ? "Bắt cuộc gọi nhỡ 45s" : "Speed-to-Lead 45s",
      desc: isVi
        ? "Hệ thống tự động nhắn tin lại sau 30 giây khi thợ hoặc tổng đài bỏ lỡ cuộc gọi (Missed Call Text-Back), khóa chặt khách hàng trước khi họ gọi cho đối thủ."
        : "30-second missed call text-back engine that locks down emergency residential repair jobs before homeowners call competitors.",
    },
    {
      icon: Scissors,
      name: isVi ? "Thẩm Mỹ Viện & Salon" : "Salons & MedSpas",
      badge: isVi ? "Giảm 90% bùng hẹn" : "Zero No-Show",
      desc: isVi
        ? "Quy trình gửi tin nhắn xác nhận lịch hẹn 2 chiều tự động, chuỗi nhắc lịch trước 24h và 2h giúp triệt tiêu tình trạng khách quên hoặc bùng lịch hẹn."
        : "2-way automated SMS appointment confirmation with 24h & 2h reminders that eliminate expensive customer no-shows.",
    },
  ];

  const features = [
    {
      num: "01",
      title: isVi ? "Lời Đề Nghị AI Offer Không Thể Từ Chối" : "Irresistible AI Offer Framework",
      desc: isVi
        ? "Công thức đóng gói dịch vụ AI SaaS giá cao ($197 – $497/tháng) giải quyết trực diện nỗi đau mất khách của chủ doanh nghiệp địa phương."
        : "High-converting B2B offer structure ($197–$497/mo) tailored to solve acute customer latency pain points without custom coding.",
    },
    {
      num: "02",
      title: isVi ? "4 Phễu Bán Hàng Dựng Sẵn Theo Từng Ngách" : "Pre-Built Sales Pages for 4 Niches",
      desc: isVi
        ? "Bao gồm 4 bộ Landing Page tối ưu chuyển đổi cao cho: Nhà hàng, Bất động sản, Dịch vụ gia đình (HVAC) và Salon/MedSpa."
        : "Battle-tested, mobile-responsive sales funnels ready to deploy for Restaurants, Real Estate, Home Services, and Salons.",
    },
    {
      num: "03",
      title: isVi ? "Trang Bán Hàng Đa Ngành & Bán Gói Năm" : "Non-Niche & Special Offer Annual Pages",
      desc: isVi
        ? "1 trang bán phần mềm tổng hợp cho mọi ngành nghề + 1 trang chuyên biệt kích thích khách hàng thanh toán gói cả năm để thu về khoản tiền mặt lớn ngay lập tức."
        : "1 universal SaaS sales page for any business + 1 special annual offer page designed to collect upfront high-ticket cash flow.",
    },
    {
      num: "04",
      title: isVi ? "Chuỗi Email & SMS Khuyến Mãi Bán Hàng" : "Email & SMS Promo Launch Sequence",
      desc: isVi
        ? "Kịch bản tin nhắn và email kích hoạt tương tác, gợi mở nhu cầu và thúc đẩy khách hàng đăng ký dùng thử hoặc đặt lịch demo phần mềm."
        : "High-engagement copywriting templates designed to generate inbound demo requests from cold or warm contact lists.",
    },
    {
      num: "05",
      title: isVi ? "Chuỗi Nuôi Dưỡng 7 Ngày Sau Buổi Demo" : "7-Day Post-Demo Nurture Sequence",
      desc: isVi
        ? "Hệ thống bám đuổi tự động 7 ngày xử lý mọi lời từ chối của khách hàng (giá cả, thời gian, sự phức tạp) và chốt hợp đồng."
        : "Automated follow-up drip overcoming every common client objection (budget, timing, complexity) to close deals.",
    },
    {
      num: "06",
      title: isVi ? "Lịch Hẹn Thông Minh & Phân Chia Nhân Sự" : "Scheduling & Demo Calendar Integration",
      desc: isVi
        ? "Lịch hẹn tự động đồng bộ hai chiều với Google Calendar và Outlook, tự động kiểm tra khung giờ trống và phân bổ lead cho nhân viên tư vấn."
        : "2-way calendar sync with smart round-robin lead routing and automated Zoom/Meet link generation.",
    },
    {
      num: "07",
      title: isVi ? "Bộ Template Quảng Cáo Bám Đuổi (Retargeting)" : "Retargeting Ad Templates (4 Graphics + 1 Copy)",
      desc: isVi
        ? "Bộ tài nguyên hình ảnh quảng cáo và bài viết bám đuổi chuẩn xác những ai đã ghé thăm phễu của bạn nhưng chưa đăng ký."
        : "4 custom high-contrast graphics and proven direct-response ad copy to convert abandoned landing page visitors.",
    },
    {
      num: "08",
      title: isVi ? "Tài Liệu Hướng Dẫn & Buổi Hỗ Trợ Triển Khai" : "Done-With-You Implementation Roadmap",
      desc: isVi
        ? "Quy trình từng bước (Step-by-Step checklist) hướng dẫn chi tiết cách nạp Snapshot vào HighLevel trong 5 phút và cách vận hành mượt mà."
        : "Step-by-step onboarding roadmap ensuring you import, brand, and launch your software snapshot in under 15 minutes.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-6 pb-16 sm:pt-10 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-12 sm:space-y-16">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-zinc-400 dark:text-zinc-500 whitespace-nowrap overflow-x-auto scrollbar-none">
            <Link href={`/${locale}`} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0">
              Home
            </Link>
            <span className="mx-2 text-zinc-400 dark:text-zinc-600 select-none shrink-0">/</span>
            <Link href={`/${locale}/tools/highlevel`} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0">
              HighLevel
            </Link>
            <span className="mx-2 text-zinc-400 dark:text-zinc-600 select-none shrink-0">/</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 shrink-0">
              AI Agency Snapshot
            </span>
          </nav>

          {/* Hero Section */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Gift className="h-4 w-4" />
              <span>{isVi ? "Bonus Độc Quyền Đối Tác Asmire • Trị Giá $1,997" : "Exclusive Asmire Partner Bonus • $1,997 Verified Value"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight leading-[1.1]">
              {isVi ? (
                <>
                  Khởi Chạy Công Ty AI SaaS Với <span className="bg-gradient-to-r from-brand-600 via-amber-500 to-brand-500 bg-clip-text text-transparent">GoHighLevel</span>
                </>
              ) : (
                <>
                  Launch Your Own AI SaaS with <span className="bg-gradient-to-r from-brand-600 via-amber-500 to-brand-500 bg-clip-text text-transparent">HighLevel</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {isVi 
                ? "Lối tắt nhanh nhất để Xây dựng, Đóng gói và Khởi chạy Lời Đề Nghị AI SaaS năm 2027. Chúng tôi đã làm sẵn 100% phần việc nặng nhọc nhất: từ Landing Page 4 ngành, kịch bản SMS/Email đến hệ thống chốt lịch hẹn tự động."
                : "The fastest way to Set up, Build, and Launch an Irresistible AI SaaS Offer. Forget about creating sales pages, lead magnets, or nurture emails—we've done the heavy lifting for you."}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="#claim-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-zinc-950 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-sm transition-all shadow-md active:scale-98"
              >
                <span>{isVi ? "Nhận Ngay Bộ Snapshot Miễn Phí" : "Claim Your Free Snapshot"}</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/go/highlevel"
                target="_blank"
                rel="nofollow sponsored"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm border border-zinc-200/80 dark:border-zinc-800 transition-all shadow-xs"
              >
                <span>{isVi ? "Mở 14 Ngày Dùng Thử HighLevel" : "Start 14-Day HighLevel Trial"}</span>
                <ExternalLink className="h-4 w-4 text-zinc-400" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 pt-3">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>{isVi ? "Nhập 1-Click vào tài khoản" : "1-Click Direct Import"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>{isVi ? "Không phụ thu phí duy trì" : "100% Free with Trial"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>{isVi ? "Hỗ trợ kỹ thuật qua email" : "Direct Onboarding Support"}</span>
              </span>
            </div>
          </div>

          {/* Value Anchor Card (How it helps you sell faster) */}
          <div className="p-7 sm:p-9 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900/60 dark:via-[#141415] dark:to-zinc-900/40 shadow-xs space-y-6">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {isVi ? "Lối Tắt Khởi Nghiệp AI Agency" : "The AI SaaS Fast-Track"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {isVi ? "Bán Được Hàng Nhanh Hơn — Không Mất Thời Gian Mò Mẫm" : "Get Started and Sell Faster — Without The Hassle"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isVi
                  ? "Bạn không cần thuê chuyên gia thiết kế web, không cần ngồi viết từng dòng email bán hàng hay tự nghĩ kịch bản chốt sale. Mọi thứ bạn cần để ký hợp đồng $197 – $497/tháng đã nằm sẵn trong tay bạn."
                  : "Forget about creating sales pages, lead magnets, nurture emails, or crafting an irresistible offer. We’ve already done the heavy lifting for you!"}
              </p>
            </div>

            {/* 4 Niche Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {niches.map((n, i) => {
                const IconComponent = n.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-[#18181b] space-y-3 flex flex-col justify-between shadow-2xs hover:border-brand-500/40 transition-colors"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="h-10 w-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {n.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{n.name}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {n.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complete 8 Assets Breakdown */}
          <div className="space-y-8">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {isVi ? "Trọn Bộ Vũ Khí Bao Gồm" : "What Is Inside The Snapshot"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {isVi ? "Tất Cả Công Cụ Cần Thiết Để Bán Hàng Thành Công" : "All The Tools You Need To Sell Successfully"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                {isVi ? "Được thiết kế chuẩn hóa và đóng gói thành 1 file Snapshot nhập trực tiếp vào HighLevel:" : "Pre-built, tested, and consolidated into a single 1-click importable Snapshot:"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141415] space-y-2.5 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-brand-600 dark:text-brand-400">
                      {f.num}
                    </span>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 tracking-tight">
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-10">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Transformational Outcomes (With AI Agency Snapshot) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 dark:bg-[#121214] text-white space-y-6 relative overflow-hidden shadow-xl border border-zinc-800">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Flame className="h-4 w-4 fill-current" />
                <span>{isVi ? "Khi Bạn Sở Hữu AI Agency Snapshot:" : "With AI Agency Snapshot:"}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {isVi ? "Từ Ý Tưởng Đến Dòng Tiền Thu Nhập Thực Tế" : "From Idea to Recurring Cash Flow"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isVi ? "Lời đề nghị AI SaaS của bạn sẵn sàng ra mắt ngay hôm nay mà không cần chờ đợi." : "Your offer will be ready to launch immediately with zero coding delay."}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isVi ? "Có sẵn chiến lược rõ ràng để tạo danh sách khách hàng tiềm năng cho từng ngách." : "You'll have a clear strategy for generating qualified local business leads."}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isVi ? "Sở hữu bài thuyết trình webinar chuẩn mực biến người xem thành khách hàng trả tiền." : "A powerful webinar presentation designed to turn warm leads into buyers."}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isVi ? "Biết chính xác cách demo phần mềm tự tin và giải quyết mọi khúc mắc của chủ doanh nghiệp." : "You'll know exactly how to demo, pitch, and sell the AI software."}</span>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isVi ? "Thành thạo cách cấu hình sub-account cho khách hàng chỉ trong 5 phút để họ thấy ngay kết quả." : "You'll master configuring client sub-accounts in 5 minutes so they achieve real success."}</span>
              </div>
            </div>
          </div>

          {/* The 2-Step Action Funnel & Claim Form */}
          <div className="space-y-8 pt-4">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {isVi ? "Quy Trình Nhận Quà 2 Bước" : "2-Step Claim Process"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {isVi ? "Cách Thức Nhận Trọn Bộ Snapshot $1,997" : "How to Unlock Your $1,997 Bonus"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                {isVi ? "Thực hiện theo 2 bước đơn giản bên dưới để hệ thống cấp link tải tự động:" : "Follow the 2 simple steps below to receive your instant access link:"}
              </p>
            </div>

            {/* 2 Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border border-brand-500/30 bg-brand-50/30 dark:bg-brand-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="h-8 w-8 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-sm">
                    1
                  </span>
                  <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                    {isVi ? "Bước 1 • Đăng Ký" : "Step 1 • Trial"}
                  </span>
                </div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  {isVi ? "Kích Hoạt 14 Ngày Dùng Thử HighLevel" : "Start 14-Day Free Trial"}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {isVi 
                    ? "Bấm vào link đối tác Asmire bên dưới để mở tài khoản dùng thử 14 ngày miễn phí trên GoHighLevel (chọn gói $97, $297 hoặc $497 tùy nhu cầu của bạn)."
                    : "Click our verified partner link below to launch your 14-day free trial on GoHighLevel (choose Starter, Unlimited, or SaaS Pro)."}
                </p>
                <div className="pt-2">
                  <a
                    href="/go/highlevel"
                    target="_blank"
                    rel="nofollow sponsored"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <span>{isVi ? "Mở tab đăng ký HighLevel" : "Launch HighLevel Trial"}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="h-8 w-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                    2
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {isVi ? "Bước 2 • Nhận Quà" : "Step 2 • Claim"}
                  </span>
                </div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  {isVi ? "Điền Thông Tin Xác Nhận Vào Form" : "Submit The Verification Form"}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {isVi
                    ? "Điền họ tên, email nhận quà và email bạn vừa dùng để đăng ký trên HighLevel vào form bên dưới. Hệ thống sẽ đối soát và gửi link nạp Snapshot vào email của bạn."
                    : "Enter your name, delivery email, and the email you used on HighLevel. Our system verifies the referral attribution and dispatches your 1-click import link."}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isVi ? "Bàn giao trong vòng 2–4 giờ" : "Delivered within 2–4 hours"}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* The Actual Claim Form Component */}
            <SnapshotClaimForm locale={locale as Locale} />
          </div>

          {/* Related Articles Footer Links */}
          <div className="pt-10 border-t border-zinc-200/80 dark:border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              {isVi ? "Các Bài Hướng Dẫn Chuyên Sâu Liên Quan:" : "In-Depth Guides & Strategic Analysis:"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <Link
                href={`/${locale}/news/gohighlevel-pricing-hidden-costs-guide-2027`}
                className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 hover:border-brand-500 bg-white dark:bg-[#141415] space-y-1 transition-colors"
              >
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {isVi ? "Bảng Giá GoHighLevel & Bóc Trần Chi Phí Ẩn 2027" : "GoHighLevel Pricing & Hidden Costs 2027"}
                </div>
                <p className="text-zinc-500 line-clamp-2">
                  {isVi ? "Chi tiết cước LC Phone, Twilio SMS, Email và phí A2P 10DLC." : "Complete breakdown of telephony usage fees and SMS costs."}
                </p>
              </Link>

              <Link
                href={`/${locale}/news/gohighlevel-vs-clickfunnels-2027`}
                className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 hover:border-brand-500 bg-white dark:bg-[#141415] space-y-1 transition-colors"
              >
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {isVi ? "GoHighLevel vs ClickFunnels 2027" : "GoHighLevel vs ClickFunnels (2027)"}
                </div>
                <p className="text-zinc-500 line-clamp-2">
                  {isVi ? "Cuộc chiến đẫm máu của Agency & Bản án tử cho thuế phễu." : "The agency bloodbath and the death of the funnel tax."}
                </p>
              </Link>

              <Link
                href={`/${locale}/news/gohighlevel-saas-mode-playbook-2027`}
                className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 hover:border-brand-500 bg-white dark:bg-[#141415] space-y-1 transition-colors"
              >
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {isVi ? "Playbook SaaS Mode Kiếm $10k/Tháng" : "GoHighLevel SaaS Playbook ($10k/mo)"}
                </div>
                <p className="text-zinc-500 line-clamp-2">
                  {isVi ? "Cách chọn ngách, đóng gói giá và nạp Snapshot onboarding trong 5 phút." : "How to pick niches, package offers, and onboard clients in 5 minutes."}
                </p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
