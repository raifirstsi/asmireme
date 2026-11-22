import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { SmeSnapshotClaimForm } from "@/components/snapshots/SmeSnapshotClaimForm";
import { 
  Sparkles, Check, CheckCircle2, ArrowRight, ExternalLink, 
  ShieldCheck, Layers, Bot, Calendar, Zap, Mail, PhoneCall, 
  Video, Gift, Building2, Scissors, Home, Utensils, HelpCircle, 
  ArrowLeft, Clock, Target, Star, Users, Flame, Award, Wrench,
  DollarSign, MessageSquare, PhoneForwarded, ThumbsUp, RefreshCw,
  Share2, ChevronRight, Sliders, Smartphone, Palette, FileText
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
      ? "SMEs Snapshot ($997 Bonus): Hệ Thống Vận Hành & Tự Động Bán Hàng Cho Doanh Nghiệp Địa Phương - Asmire"
      : "SMEs Snapshot ($997 Bonus): All-in-One Sales & Automation Engine for Local Small Businesses - Asmire",
    description: isVi
      ? "Nhận miễn phí trọn bộ SMEs Snapshot trị giá $997 khi đăng ký GoHighLevel gói $97/tháng. Hộp thư hợp nhất đa kênh, cuộc gọi kết nối trong 60 giây, form họp tự gửi recap 5 phút, 52 tuần SMS nuôi dưỡng và xin review Google 5 sao tự động."
      : "Claim the $997 SMEs Snapshot 100% free when starting your HighLevel $97/mo Starter plan. Unified omnichannel inbox, 60s speed-to-lead callback, meeting recap automation, 52-week SMS nurture, and automated Google reviews.",
    alternates: {
      canonical: `/${locale}/snapshots/sme-os`,
      languages: {
        en: `/en/snapshots/sme-os`,
        vi: `/vi/snapshots/sme-os`,
        "x-default": `/en/snapshots/sme-os`,
      },
    },
  };
}

export default async function SnapshotSmeOSPage({ params }: SnapshotPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SMEs Snapshot by Asmire",
    description: "Turnkey GoHighLevel SMEs Snapshot engineered for local service businesses and small business owners to automate pipelines, customer callbacks, meeting follow-ups, and Google reviews.",
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

  const softwareStackComparison = [
    { tool: isVi ? "Phần mềm CRM & Quản lý Lead" : "CRM & Lead Pipeline", cost: "$99/mo", ghl: isVi ? "Tích hợp sẵn" : "Included" },
    { tool: isVi ? "Email & SMS Marketing (Mailchimp/Klaviyo)" : "Email & SMS Marketing", cost: "$119/mo", ghl: isVi ? "Tích hợp sẵn" : "Included" },
    { tool: isVi ? "Lịch hẹn thông minh (Calendly Pro)" : "Appointment Scheduling (Calendly)", cost: "$16/mo", ghl: isVi ? "Tích hợp sẵn" : "Included" },
    { tool: isVi ? "Hộp thư Web Chat & Đa kênh (Podium)" : "Unified Webchat & Inbox (Podium)", cost: "$249/mo", ghl: isVi ? "Tích hợp sẵn" : "Included" },
    { tool: isVi ? "Phần mềm xin Review Google (Birdeye)" : "Review Generation Engine (Birdeye)", cost: "$150/mo", ghl: isVi ? "Tích hợp sẵn" : "Included" },
    { tool: isVi ? "Công cụ kết nối trung gian (Zapier)" : "Integration Glue (Zapier)", cost: "$49/mo", ghl: isVi ? "Tích hợp sẵn (Không cần Zapier)" : "Native (No Zapier Needed)" },
  ];

  const pipelineStages = [
    {
      step: "01",
      title: isVi ? "Lead Mới Vào Phễu" : "New Lead Inquiry",
      desc: isVi 
        ? "Ngay khi khách điền form, chat trên web hoặc nhắn tin qua Google Maps, hồ sơ khách tự động tạo và bắn thông báo ngay vào điện thoại của bạn."
        : "Immediately captures prospects from web forms, chat widgets, Google Maps, or social media and alerts your team instantly.",
      badge: isVi ? "Tự động 100%" : "100% Automated",
    },
    {
      step: "02",
      title: isVi ? "Đã Liên Hệ Thành Công" : "Contacted & Qualified",
      desc: isVi 
        ? "Hệ thống theo dõi tiến trình liên hệ. Tự động gắn tag và dừng chuỗi nhắc nhở ngay khi bạn hoặc nhân viên đã nhấc máy trao đổi với khách."
        : "Tracks connection attempts. Auto-tags lead and halts outreach reminders once a phone or chat conversation has begun.",
      badge: isVi ? "Kiểm soát phễu" : "Pipeline Control",
    },
    {
      step: "03",
      title: isVi ? "Lịch Hẹn Được Xác Nhận" : "Appointment Booked",
      desc: isVi 
        ? "Khách tự chọn giờ hẹn hoặc bạn chốt qua điện thoại. Hệ thống tự gửi email/SMS xác nhận và tự động nhắc nhở trước 24h & 2h để triệt tiêu bùng lịch."
        : "Prospect books a slot. HighLevel dispatches calendar invites and sends automated 24h & 2h reminders to eliminate no-shows.",
      badge: isVi ? "Chống bùng hẹn" : "Zero No-Show",
    },
    {
      step: "04",
      title: isVi ? "Khách Hàng Trả Tiền" : "Won Customer",
      desc: isVi 
        ? "Gửi hóa đơn, kích hoạt chuỗi cảm ơn, tự động đề nghị đánh giá Google 5 sao và đưa vào danh sách khách hàng thân thiết để nuôi dưỡng trọn đời."
        : "Generates invoice, triggers thank-you onboarding, requests a 5-star Google review, and enrolls client in long-term nurture loops.",
      badge: isVi ? "Tối đa LTV" : "Max LTV",
    },
  ];

  const meetingFormSteps = [
    {
      step: isVi ? "Bước 1" : "Step 1",
      title: isVi ? "Điền Thông Tin Cơ Bản" : "Contact Details",
      desc: isVi ? "Nhập họ tên, số điện thoại, email của khách hàng tiềm năng chỉ trong 10 giây." : "Quickly capture the prospect's first name, last name, mobile phone, and email.",
    },
    {
      step: isVi ? "Bước 2" : "Step 2",
      title: isVi ? "Nhập Giá Trị Đơn Hàng" : "Deal Value & Quote",
      desc: isVi ? "Ghi nhận mức giá dịch vụ bạn vừa báo (Ví dụ: $1,500 sửa điện hoặc $5,000 cảnh quan)." : "Log the estimated or agreed quote value (e.g. $1,500 repair or $5,000 project).",
    },
    {
      step: isVi ? "Bước 3" : "Step 3",
      title: isVi ? "Ghi Chú Cuộc Trò Chuyện (Recap)" : "Conversation Recap",
      desc: isVi ? "Viết ngắn gọn 1-2 câu tóm tắt điều khách muốn. Toàn bộ nội dung này sẽ được tự động chèn vào tin nhắn chuyên nghiệp gửi cho khách sau 5 phút!" : "Type 1-2 summary bullets. HighLevel automatically injects this into a polished recap SMS & email to the client in 5 minutes!",
    },
    {
      step: isVi ? "Bước 4" : "Step 4",
      title: isVi ? "Cập Nhật Trạng Thái Cuộc Hẹn" : "Appointment Outcome",
      desc: isVi ? "Đánh dấu: Có mặt, Vắng mặt (No-show), Đã chốt (Sold), Chưa phù hợp hoặc Cần theo dõi tiếp." : "Select: Show, No-Show, Sold, or Follow-Up Needed. System activates the exact matching automation.",
    },
    {
      step: isVi ? "Bước 5" : "Step 5",
      title: isVi ? "Hẹn Ngày Bám Đuổi Kế Tiếp" : "Next Follow-Up Date",
      desc: isVi ? "Khách nói: 'Để tôi bàn thêm với gia đình'? Chọn ngày gọi lại, hệ thống sẽ tự nhắc việc để bạn không bao giờ bỏ quên." : "Client says 'call me next Tuesday'? Pick the date and the CRM auto-schedules your task with full notes.",
    },
  ];

  const systemFeatures = [
    {
      icon: MessageSquare,
      title: isVi ? "Hộp Thư Hợp Nhất Đa Kênh (Omnichannel Inbox)" : "Unified Omnichannel Inbox",
      desc: isVi 
        ? "Gom toàn bộ tin nhắn từ Web Chat, Google Business Profile (Maps), Fanpage Facebook, Instagram DM và Form liên hệ vào đúng 1 màn hình duy nhất trên điện thoại."
        : "Consolidate webchat, Google Business messages, Facebook Messenger, Instagram DMs, and website contact forms into a single mobile dashboard.",
    },
    {
      icon: PhoneForwarded,
      title: isVi ? "Kết Nối Cuộc Gọi Hai Chiều Trong 60 Giây (Speed-to-Lead)" : "60-Second Speed-to-Lead Callback",
      desc: isVi 
        ? "Khách vừa gửi yêu cầu gọi lại trên website, điện thoại của bạn reo ngay lập tức: 'Có lead mới trên web, bấm phím 1 để nói chuyện'. Bấm 1 là bạn kết nối ngay với khách trước đối thủ!"
        : "Visitor clicks 'Request Call Back'. HighLevel calls your phone: 'New web lead, press 1 to connect'. Press 1 and you talk live in under 60 seconds.",
    },
    {
      icon: Mail,
      title: isVi ? "Nuôi Dưỡng 52 Tuần SMS & 365 Ngày Email" : "52-Week SMS & 365-Day Email Nurture",
      desc: isVi 
        ? "Không bao giờ để lead 'chết yểu'. Hệ thống tự động gửi tin nhắn giáo dục chuyên môn hàng tuần và chuỗi email nuôi dưỡng liên tục suốt 1 năm hoàn toàn tự động."
        : "Eliminates dead leads with 52 educational weekly SMS tips and a 365-day automated email drip that keeps your company top-of-mind.",
    },
    {
      icon: Palette,
      title: isVi ? "Biểu Mẫu Onboarding 1 Bước (Custom Values)" : "1-Form Brand Onboarding (Custom Values)",
      desc: isVi 
        ? "Không cần biết lập trình hay sửa từng trang. Điền vào 1 biểu mẫu cài đặt duy nhất: logo, tên công ty, số điện thoại, màu chủ đạo sẽ tự động đồng bộ lên toàn bộ hệ thống!"
        : "Zero coding. Fill out one master onboarding form: your company name, logo, phone, and brand hex color instantly propagate to all funnels.",
    },
    {
      icon: Star,
      title: isVi ? "Cỗ Máy Tự Động Xin Review Google 5 Sao" : "Automated 5-Star Google Review Engine",
      desc: isVi 
        ? "Tự động gửi tin nhắn cảm ơn và xin đánh giá sau khi hoàn thành đơn. Phân luồng thông minh: Khách hài lòng chuyển thẳng lên Google Reviews, phản hồi chưa tốt chuyển về bạn xử lý riêng."
        : "Dispatches review invitations post-job. Happy clients are guided directly to your Google Business Profile, while feedback is captured privately.",
    },
    {
      icon: DollarSign,
      title: isVi ? "Thu Tiền, Hóa Đơn & Nhắc Nợ Tự Động" : "Automated Payments & Invoice Reminders",
      desc: isVi 
        ? "Tích hợp cổng thanh toán online Stripe/PayPal. Tự động gửi link thanh toán, xuất hóa đơn điện tử, gửi tin nhắn nhắc nợ định kỳ và xử lý hoàn tiền tiện lợi."
        : "Integrated online checkout with automated invoice delivery, abandoned checkout follow-ups, overdue payment nudges, and refund management.",
    },
    {
      icon: Share2,
      title: isVi ? "Chiến Dịch Khách Hàng Giới Thiệu (Referral)" : "Automated Customer Referral Engine",
      desc: isVi 
        ? "Mỗi khi khách hàng khen dịch vụ tốt, hệ thống tự động kích hoạt kịch bản 'Lan Tỏa Niềm Vui', gửi voucher giảm giá khuyến khích họ giới thiệu người quen."
        : "Automatically prompts satisfied clients with exclusive referral codes and thank-you bonuses to generate high-trust word-of-mouth leads.",
    },
    {
      icon: RefreshCw,
      title: isVi ? "Kích Hoạt Lại Danh Sách Cũ (Database Reactivation)" : "Database Reactivation Sequences",
      desc: isVi 
        ? "Hàng trăm khách hàng cũ nằm im trong sổ bạ? Kích hoạt chiến dịch SMS ưu đãi đặc biệt để kéo lại doanh thu ngay trong 48 giờ mà không tốn 1 đồng quảng cáo."
        : "Wake up stale contact lists. Pre-built SMS blast sequences designed to generate immediate booked appointments without spending on ads.",
    },
    {
      icon: Smartphone,
      title: isVi ? "Trang Bio-Link Thay Thế Linktree Bản Quyền" : "Custom Mobile Bio-Link (Linktree Replacement)",
      desc: isVi 
        ? "Trang đích siêu nhẹ chuẩn di động gắn bio Instagram, TikTok, Facebook với đầy đủ nút gọi điện ngay, đặt lịch hẹn và xem bảng giá dịch vụ."
        : "High-converting mobile link page for Instagram, TikTok, and Facebook bio links featuring 1-click calling, booking calendars, and service cards.",
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
              SMEs Snapshot
            </span>
          </nav>

          {/* Hero Section */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Gift className="h-4 w-4" />
              <span>{isVi ? "Bonus Dành Riêng Cho Doanh Nghiệp Địa Phương • Trị Giá $997 Miễn Phí" : "Exclusive Local Business Bonus • $997 Value 100% Free"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight leading-[1.15]">
              {isVi ? (
                <>
                  Chấm Dứt Thất Thoát Khách Hàng: <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                    SMEs Snapshot Cho Doanh Nghiệp Địa Phương
                  </span>
                </>
              ) : (
                <>
                  Stop Losing High-Ticket Customers: <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                    All-in-One SMEs Snapshot for Local Businesses
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {isVi 
                ? "Giải pháp tự động hóa toàn bộ quy trình chăm sóc khách hàng, bắt kịp lead sau 60 giây, tự động gửi recap báo giá sau 5 phút và xin đánh giá Google 5 sao. Thiết kế tối ưu 100% cho gói GoHighLevel $97/tháng — thay thế hoàn toàn 5–7 phần mềm đắt đỏ."
                : "Automate your local business operations: 60-second speed-to-lead callback, 5-minute meeting recap SMS, 52-week nurture drips, and automated 5-star Google reviews. Turnkey engineered for HighLevel's $97/month Starter plan—replacing 5-7 fragmented tools."}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="#claim-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-zinc-950 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-sm transition-all shadow-md active:scale-98"
              >
                <span>{isVi ? "Nhận Ngay SMEs Snapshot Miễn Phí" : "Claim Your Free SMEs Snapshot"}</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/go/highlevel"
                target="_blank"
                rel="nofollow sponsored"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm border border-zinc-200/80 dark:border-zinc-800 transition-all shadow-xs"
              >
                <span>{isVi ? "Mở 14 Ngày Thử Gói $97/Tháng" : "Start HighLevel $97/mo Trial"}</span>
                <ExternalLink className="h-4 w-4 text-zinc-400" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 pt-3">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>{isVi ? "Tối ưu chuẩn cho gói $97/tháng" : "Built for $97/mo Starter Plan"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>{isVi ? "Nhập 1-Click vào tài khoản" : "1-Click Direct Import"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>{isVi ? "Cài đặt màu & logo qua 1 form" : "1-Form Brand Onboarding"}</span>
              </span>
            </div>
          </div>

          {/* Software Cost Comparison Anchor */}
          <div className="p-7 sm:p-9 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141415] shadow-xs space-y-6">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {isVi ? "Bài Toán Tối Ưu Chi Phí" : "Software Stack Consolidation"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {isVi ? "Tại Sao Phải Trả $682/Tháng Khi Bạn Chỉ Cần $97/Tháng?" : "Why Pay $682/Month When HighLevel Does It For $97?"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {isVi
                  ? "Chủ doanh nghiệp thường phải trả tiền cho quá nhiều ứng dụng rời rạc, dữ liệu bị phân tán và nhân viên mất hàng giờ copy paste thông tin giữa các phần mềm."
                  : "Small business owners waste hundreds of dollars monthly subscribing to disconnected tools that fail to talk to one another."}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-left text-zinc-400 dark:text-zinc-500 font-semibold">
                    <th className="py-3 px-3">{isVi ? "Hạng Mục Ứng Dụng" : "Software Capability"}</th>
                    <th className="py-3 px-3">{isVi ? "Mua Lẻ Từng Phần Mềm" : "Fragmented Apps"}</th>
                    <th className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-bold">{isVi ? "GoHighLevel Starter + SMEs Snapshot" : "HighLevel + SMEs Snapshot"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {softwareStackComparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3 px-3 font-medium text-zinc-800 dark:text-zinc-200">{row.tool}</td>
                      <td className="py-3 px-3 text-zinc-500 line-through">{row.cost}</td>
                      <td className="py-3 px-3 font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{row.ghl}</span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-50/50 dark:bg-emerald-950/20 font-bold">
                    <td className="py-4 px-3 text-zinc-900 dark:text-zinc-100">{isVi ? "Tổng chi phí hàng tháng:" : "Total Monthly Expense:"}</td>
                    <td className="py-4 px-3 text-rose-600 dark:text-rose-400 line-through">$682/mo</td>
                    <td className="py-4 px-3 text-emerald-600 dark:text-emerald-400 text-base sm:text-lg">
                      $97/mo <span className="text-xs font-normal text-zinc-500">({isVi ? "Tiết kiệm hơn $7,000/năm" : "Save $7,000+/year"})</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Spotlight Feature 1: The Automated 4-Step Pipeline */}
          <div className="space-y-8">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {isVi ? "Quy Trình Phễu Trực Quan" : "Automated Sales Pipeline"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {isVi ? "Phễu Bán Hàng 4 Giai Đoạn Vận Hành Tự Động" : "Visual 4-Stage Automated Sales Pipeline"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                {isVi 
                  ? "Không cần ghi chép sổ sách hay bảng tính Excel lộn xộn. Bạn luôn biết chính xác từng khách hàng đang ở bước nào:" 
                  : "Never let another prospective customer slip through the cracks with automated stage transitions:"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {pipelineStages.map((st, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141415] space-y-3 flex flex-col justify-between shadow-2xs hover:border-emerald-500/40 transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {st.step}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {st.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{st.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spotlight Feature 2: Meeting Status Update Form (The Star Feature) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 dark:bg-[#121214] text-white space-y-8 relative overflow-hidden shadow-xl border border-zinc-800">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sliders className="h-3.5 w-3.5" />
                <span>{isVi ? "Vũ Khí Chốt Đơn Tuyệt Đỉnh" : "Game-Changer Feature"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
                {isVi ? "Meeting Status Update Form: Tự Động Gửi Báo Giá & Tóm Tắt Sau 5 Phút" : "Meeting Status Update Form: Automated 5-Minute Recap & Quote"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {isVi 
                  ? "Bạn là thợ sửa chữa, chủ phòng khám, hay tư vấn viên thường xuyên di chuyển ngoài hiện trường? Form này mở được trực tiếp trên điện thoại. Điền xong trong 60 giây, hệ thống sẽ tự động gửi một tin nhắn tóm tắt cực kỳ chuyên nghiệp tới khách hàng!"
                  : "Designed for busy owners on the move. Open this form on your mobile phone after any consultation. Submit in 60 seconds, and HighLevel automatically sends your prospect a personalized quote recap!"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
              {meetingFormSteps.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono">{m.step}</div>
                  <h4 className="font-bold text-sm text-zinc-100">{m.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800/80 max-w-2xl text-xs space-y-2">
              <div className="font-bold text-emerald-400 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{isVi ? "Khách hàng của bạn sẽ nhận được tin nhắn mẫu như sau:" : "What your customer automatically receives:"}</span>
              </div>
              <blockquote className="italic text-zinc-300 border-l-2 border-emerald-500 pl-3 py-1">
                {isVi
                  ? `"Chào [Tên Khách], rất vui được trao đổi với bạn hôm nay! Về hạng mục bạn quan tâm: [Nội dung tóm tắt bạn vừa điền]. Báo giá chi tiết đã được gửi vào email của bạn. Nếu bạn có bất kỳ câu hỏi nào, chỉ cần nhắn lại cho tôi tại đây nhé!"`
                  : `"Hey Sharon, pleasure speaking with you! Just to recap: [Your 1-minute recap notes]. Your quote has been delivered to your email. Reply directly here if you need any adjustments!"`}
              </blockquote>
            </div>
          </div>

          {/* Complete 9 Features Matrix */}
          <div className="space-y-8">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {isVi ? "Các Tính Năng Sẵn Có Trong Snapshot" : "Complete Feature Matrix"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {isVi ? "Mọi Thứ Doanh Nghiệp Cần Đều Đã Được Cài Sẵn" : "Everything Built-In and Ready To Deploy"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                {isVi ? "Chỉ cần 1 cú nhấp chuột để nhập toàn bộ kho tài nguyên này vào tài khoản GoHighLevel của bạn:" : "A single 1-click import imports all these assets into your GoHighLevel account:"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {systemFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141415] space-y-3 shadow-2xs hover:border-emerald-500/30 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 tracking-tight">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transformation Section */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 space-y-6">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {isVi ? "Trước & Sau Khi Triển Khai" : "Before & After Transformation"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {isVi ? "Doanh Nghiệp Của Bạn Sẽ Thay Đổi Như Thế Nào?" : "How Your Business Runs Daily"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
                <div className="font-bold text-rose-600 dark:text-rose-400 text-sm flex items-center gap-2">
                  <span>❌ {isVi ? "Khi Chưa Có SMEs Snapshot:" : "Without SMEs Snapshot:"}</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <li>• {isVi ? "Mất hàng giờ mỗi tối để mở sổ ghi chép, nhớ lại xem hôm nay đã hứa gửi báo giá cho ai." : "Hours lost every evening scrolling through call logs wondering who needed quotes."}</li>
                  <li>• {isVi ? "Bỏ lỡ cuộc gọi khi đang bận làm việc, khách lập tức gọi sang đối thủ khác gần đó." : "Missed calls while working on jobs result in customers immediately hiring your competitors."}</li>
                  <li>• {isVi ? "Khách quên lịch hẹn hoặc bùng hẹn (no-show) gây lãng phí thời gian và nhiên liệu di chuyển." : "Expensive client no-shows that waste your technicians' travel time and fuel."}</li>
                  <li>• {isVi ? "Rất ít đánh giá trên Google Maps dù khách hàng thực tế rất yêu quý dịch vụ của bạn." : "Barely any Google reviews because you forget to ask clients manually."}</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                  <span>✅ {isVi ? "Khi Đã Cài Đặt SMEs Snapshot:" : "With SMEs Snapshot:"}</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <li>• {isVi ? "Điền form tóm tắt trong 60s, khách nhận được email & SMS báo giá chuyên nghiệp sau 5 phút." : "Fill the recap form in 60 seconds; clients receive custom quotes via SMS/email in 5 mins."}</li>
                  <li>• {isVi ? "Tính năng cuộc gọi 60s tự kết nối bạn với khách ngay khi họ vừa bấm gửi yêu cầu trên web." : "Instant 60-second callback connects you live with website leads before they leave."}</li>
                  <li>• {isVi ? "Chuỗi nhắc lịch tự động trước 24h & 2h giúp triệt tiêu hoàn toàn nỗi lo bùng lịch hẹn." : "Automated 24h and 2h SMS reminders virtually eliminate customer no-shows."}</li>
                  <li>• {isVi ? "Đánh giá Google 5 sao đổ về đều đặn hàng tuần, đưa bạn lên top 1 bản đồ tìm kiếm địa phương." : "Consistent 5-star Google reviews pour in every week, dominating local map pack rankings."}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* The 2-Step Action Funnel & Claim Form */}
          <div className="space-y-8 pt-4">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Award className="h-4 w-4" />
                <span>{isVi ? "Nhận Quà Độc Quyền" : "Exclusive Claim"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {isVi ? "2 Bước Đơn Giản Để Sở Hữu SMEs Snapshot" : "2 Simple Steps To Get Your Free Snapshot"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                {isVi ? "Làm theo hướng dẫn 2 bước dưới đây để nhận đường link cài đặt tự động vào tài khoản của bạn:" : "Follow the 2 steps below to import the snapshot directly into your HighLevel account:"}
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
                  {isVi ? "Mở 14 Ngày Dùng Thử Gói $97/Tháng" : "Start 14-Day Free Trial ($97 Starter)"}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {isVi 
                    ? "Bấm vào link đối tác Asmire bên dưới để kích hoạt tài khoản GoHighLevel (bạn có thể chọn gói Starter $97/tháng hoặc gói Unlimited tùy nhu cầu)."
                    : "Click our verified partner link below to launch your 14-day free trial on GoHighLevel (the $97/month Starter plan is fully supported)."}
                </p>
                <div className="pt-2">
                  <a
                    href="/go/highlevel"
                    target="_blank"
                    rel="nofollow sponsored"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <span>{isVi ? "Mở tab đăng ký HighLevel" : "Launch HighLevel Free Trial"}</span>
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
                    ? "Điền họ tên, email nhận quà và email bạn vừa dùng để đăng ký trên HighLevel vào form bên dưới. Hệ thống sẽ đối soát và gửi link nạp 1-Click Snapshot vào email của bạn."
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

            {/* The Sme Snapshot Claim Form Component */}
            <SmeSnapshotClaimForm locale={locale as Locale} />
          </div>

          {/* FAQ Section */}
          <div className="p-7 sm:p-9 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141415] space-y-6">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {isVi ? "Câu Hỏi Thường Gặp" : "Frequently Asked Questions"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {isVi ? "Giải Đáp Thắc Mắc Cho Doanh Nghiệp" : "Everything You Need to Know"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1.5">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{isVi ? "Tôi không rành kỹ thuật, có tự cài đặt được không?" : "I'm not tech-savvy, can I install this?"}</span>
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-xs">
                  {isVi 
                    ? "Hoàn toàn được! Snapshot này được nạp bằng 1 cú nhấp chuột (1-Click Import). Toàn bộ logo, số điện thoại, địa chỉ và màu sắc được đồng bộ tự động thông qua 1 form cài đặt đơn giản."
                    : "100% yes. It imports in 1 click. You just fill out one simple onboarding form with your phone, address, and logo, and the entire system updates automatically."}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1.5">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{isVi ? "Gói $97/tháng có dùng đủ hết tính năng này không?" : "Does the $97/mo plan support all these features?"}</span>
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-xs">
                  {isVi 
                    ? "Có, chính xác! Gói $97/tháng (HighLevel Starter) hỗ trợ không giới hạn số lượng liên hệ (contacts), đầy đủ CRM, hệ thống tự động hóa Workflow, Lịch hẹn và Hộp thư đa kênh."
                    : "Yes! The $97/mo Starter plan includes unlimited contacts, full CRM pipelines, automated workflows, calendars, and the unified omnichannel inbox."}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1.5">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{isVi ? "Chi phí gửi SMS và gọi điện là bao nhiêu?" : "What are the telephony and SMS costs?"}</span>
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-xs">
                  {isVi 
                    ? "GoHighLevel sử dụng cơ chế dùng bao nhiêu trả bấy nhiêu (pay-as-you-go) qua LC Phone. Cước phí chỉ khoảng $0.0079/SMS tại Mỹ (khoảng vài trăm đồng VNĐ), rẻ hơn 5 lần so với thuê tổng đài truyền thống."
                    : "Usage is pay-as-you-go via LC Phone at roughly $0.0079 per SMS segment, far cheaper than paying expensive standalone phone system retainers."}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1.5">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{isVi ? "Bao lâu sau khi đăng ký thì tôi nhận được Snapshot?" : "How fast will I receive my Snapshot link?"}</span>
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-xs">
                  {isVi 
                    ? "Ngay sau khi bạn gửi form xác nhận ở Bước 2, đội ngũ kỹ thuật của Asmire sẽ kiểm tra mã giới thiệu và gửi email chứa link nạp Snapshot bản quyền kèm video hướng dẫn trong vòng 2–4 giờ."
                    : "Once you submit the form in Step 2, our team verifies affiliate attribution and delivers your private 1-click snapshot link and setup video within 2-4 hours."}
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles Footer Links */}
          <div className="pt-10 border-t border-zinc-200/80 dark:border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              {isVi ? "Các Bài Hướng Dẫn Chuyên Sâu Liên Quan:" : "In-Depth Guides & Strategic Analysis:"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <Link
                href={`/${locale}/news/gohighlevel-pricing-hidden-costs-guide-2027`}
                className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500 bg-white dark:bg-[#141415] space-y-1 transition-colors"
              >
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {isVi ? "Bảng Giá GoHighLevel & Bóc Trần Chi Phí Ẩn 2027" : "GoHighLevel Pricing & Hidden Costs 2027"}
                </div>
                <p className="text-zinc-500 line-clamp-2">
                  {isVi ? "Chi tiết cước LC Phone, Twilio SMS, Email và gói $97 vs $297." : "Complete breakdown of telephony usage fees and Starter vs Unlimited."}
                </p>
              </Link>

              <Link
                href={`/${locale}/news/gohighlevel-vs-clickfunnels-2027`}
                className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500 bg-white dark:bg-[#141415] space-y-1 transition-colors"
              >
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {isVi ? "GoHighLevel vs ClickFunnels 2027" : "GoHighLevel vs ClickFunnels (2027)"}
                </div>
                <p className="text-zinc-500 line-clamp-2">
                  {isVi ? "Cuộc chiến đẫm máu của Agency & Bản án tử cho thuế phễu." : "The agency bloodbath and the death of the funnel tax."}
                </p>
              </Link>

              <Link
                href={`/${locale}/snapshots/agency-os`}
                className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500 bg-white dark:bg-[#141415] space-y-1 transition-colors"
              >
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {isVi ? "AI Agency Snapshot ($1,997 Bonus)" : "AI Agency Snapshot ($1,997 Bonus)"}
                </div>
                <p className="text-zinc-500 line-clamp-2">
                  {isVi ? "Bộ Snapshot chuyên biệt dành cho các Agency và người muốn bán lại phần mềm SaaS." : "Turnkey snapshot for agencies wanting to resell HighLevel SaaS mode."}
                </p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
