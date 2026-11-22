import React from "react";
import Link from "next/link";
import { Locale, locales, getDictionary } from "@/lib/i18n";
import { Check, Shield, HelpCircle, ArrowRight, Zap, QrCode } from "lucide-react";

interface MembershipPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: MembershipPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi ? "Gói Thành Viên Asmire - Kiếm Tiền Từ Lời Khuyên Phần Mềm" : "Asmire Membership - Turn Software Knowledge Into Direct Revenue",
    description: isVi
      ? "Gói Standard miễn phí 3 tool hoặc gói Pro 725.000đ/tháng không giới hạn. Gắn link affiliate của bạn và nhận 100% hoa hồng trực tiếp từ hãng."
      : "Standard free plan for 3 tools or Pro for $29/mo with all verified SaaS tools. Insert your own affiliate links and earn direct vendor commissions.",
    alternates: {
      canonical: `/${locale}/membership`,
      languages: {
        en: "/en/membership",
        vi: "/vi/membership",
        "x-default": "/en/membership",
      },
    },
  };
}

export default async function MembershipPage({ params }: MembershipPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const isVi = locale === "vi";

  const faqs = isVi
    ? [
        {
          q: "Hoa hồng của tôi được chi trả như thế nào?",
          a: "Hoa hồng được chi trả trực tiếp 100% từ nhà cung cấp SaaS (qua PartnerStack, FirstPromoter, Rewardful...) vào tài khoản của bạn. Asmire không giữ và không thu bất kỳ phần trăm hoa hồng nào của bạn.",
        },
        {
          q: "Điều gì xảy ra khi khách bấm vào tool tôi chưa gắn link?",
          a: "Theo quy tắc kinh doanh minh bạch, nếu khách bấm vào công cụ bạn chưa nhập link hoặc nằm ngoài giới hạn 3 slot của gói Standard, hệ thống sẽ tự động chuyển hướng đến link affiliate của chủ site (Admin).",
        },
        {
          q: "Cookie giới thiệu 365 ngày hoạt động ra sao?",
          a: "Khi bạn chia sẻ link dạng asmire.me/r/[mã-của-bạn], hệ thống sẽ lưu cookie first-party an toàn trong 365 ngày. Trong suốt 1 năm, bất kể khi nào khách quay lại và bấm CTA mua các tool bạn đã chọn, họ sẽ được chuyển đến link affiliate của bạn.",
        },
        {
          q: "Thanh toán gói Pro qua SePay như thế nào?",
          a: "Bạn bấm Nâng cấp Pro, hệ thống tạo mã VietQR động với số tiền chính xác 725.000đ ($29) và mã nội dung riêng. Bạn quét mã trên ứng dụng ngân hàng bất kỳ, hệ thống kích hoạt tài khoản Pro tự động sau 2–5 giây.",
        },
        {
          q: "Chính sách hoàn tiền 14 ngày áp dụng thế nào?",
          a: "Nếu bạn không hài lòng vì bất kỳ lý do gì trong vòng 14 ngày đầu tiên kể từ khi nâng cấp Pro, hãy gửi email tới support@asmire.me hoặc bấm yêu cầu hoàn tiền trong tài khoản. Chúng tôi sẽ hoàn tiền 100% vào tài khoản ngân hàng của bạn mà không gây phiền hà.",
        },
      ]
    : [
        {
          q: "How are my affiliate commissions paid?",
          a: "Commissions are paid directly to your private accounts by the SaaS vendors (via PartnerStack, FirstPromoter, Rewardful, Impact, etc.). Asmire takes 0% cut of your commissions.",
        },
        {
          q: "What happens if a visitor clicks a tool I haven't linked?",
          a: "Under our transparent business model, if a visitor clicks an unlinked tool or a tool exceeding your plan limit (Standard limited to 3 tools), the click deterministically routes to the Admin (site owner) affiliate link.",
        },
        {
          q: "How does the 365-day attribution cookie work?",
          a: "When you share your unique referral link (asmire.me/r/[code]), a secure first-party HTTP cookie is set for 365 days. Within this full year, any CTA click on tools in your entitlement routes to your affiliate link.",
        },
        {
          q: "How do I pay for Pro via SePay VietQR?",
          a: "Click Upgrade to Pro, scan the dynamic VietQR code with any mobile banking app, and your account will automatically upgrade to Pro within 2 to 5 seconds upon bank confirmation.",
        },
        {
          q: "What is your 14-day refund policy?",
          a: "If you are not completely satisfied within 14 days of subscribing to Pro, request a refund via support@asmire.me or your billing dashboard. We issue a full 100% refund without hassle.",
        },
      ];

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-3.5 py-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            <Zap className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
            <span>Community Attribution Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            {dict.membership.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {dict.membership.subtitle}
          </p>
        </div>

        {/* Pricing Cards Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {/* Standard Free Tier */}
          <div className="flex flex-col justify-between rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Starter Tier
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
                  {dict.membership.standardName}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-extrabold text-foreground">
                    {dict.membership.standardPrice}
                  </span>
                  <span className="ml-2 text-base text-muted-foreground">
                    {dict.membership.standardPeriod}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {isVi ? "Hoàn hảo cho người mới bắt đầu muốn chia sẻ 3 công cụ cốt lõi." : "Perfect for individual creators wanting to monetize their top 3 recommended tools."}
                </p>
              </div>

              <div className="border-t border-border pt-6 space-y-3">
                <span className="text-sm font-bold uppercase tracking-wider text-foreground block">
                  Included Features:
                </span>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {dict.membership.standardFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-zinc-900 dark:text-zinc-100 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href={`/${locale}/account`}
                className="w-full inline-flex items-center justify-center h-12 px-6 text-base font-semibold rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-foreground transition-colors shadow-sm"
              >
                {dict.membership.standardCta}
              </Link>
            </div>
          </div>

          {/* Pro Tier ($29/mo) - Apple Luxury Contrast */}
          <div className="relative flex flex-col justify-between rounded-3xl border border-zinc-900 dark:border-zinc-700 bg-zinc-950 text-white dark:bg-zinc-900 dark:text-white p-8 shadow-2xl">
            {/* Best Value Ribbon */}
            <div className="absolute -top-3.5 right-6 rounded-full bg-white dark:bg-zinc-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-zinc-950 shadow-md">
              Most Popular
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                  Full Powerhouse
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {dict.membership.proName}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    {dict.membership.proPrice}
                  </span>
                  <span className="text-base font-semibold text-zinc-300">
                    ({dict.membership.proVnd})
                  </span>
                  <span className="text-base text-zinc-400">
                    {dict.membership.proPeriod}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                  {isVi ? "Dành cho agency, blogger chuyên nghiệp và đội ngũ làm affiliate quy mô lớn." : "Engineered for growth agencies, professional bloggers, and media publishers."}
                </p>
              </div>

              <div className="border-t border-zinc-800 pt-6 space-y-3">
                <span className="text-sm font-bold uppercase tracking-wider text-zinc-200 block">
                  Everything in Standard, plus:
                </span>
                <ul className="space-y-3 text-sm text-zinc-300 font-medium">
                  {dict.membership.proFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-white shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 space-y-3">
              <Link
                href={`/${locale}/account/billing`}
                className="w-full inline-flex items-center justify-center h-12 px-6 text-base font-bold rounded-full bg-white hover:bg-zinc-200 text-zinc-950 transition-all shadow-md"
              >
                <QrCode className="h-4 w-4 mr-2" />
                {dict.membership.proCta}
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400">
                <Shield className="h-3.5 w-3.5 text-zinc-300" />
                <span>14-day 100% money-back guarantee • Instant SePay activation</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-border space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              {isVi ? "Câu Hỏi Thường Gặp Về Quyền Lợi Thành Viên" : "Frequently Asked Questions"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              {isVi ? "Minh bạch tuyệt đối - Không cam kết ảo, không chiêu trò lừa dối." : "Transparent rules and honest policies - No deceptive scarcity or false promises."}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 space-y-2 shadow-sm">
                <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-zinc-500 shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
