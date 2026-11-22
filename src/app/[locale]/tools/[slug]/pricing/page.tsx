import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { getToolBySlug, TOOLS_DATA } from "@/data/tools-data";
import { PriceCalculator } from "@/components/tools/PriceCalculator";
import { Check, Calendar, ExternalLink, ArrowLeft, ShieldCheck } from "lucide-react";

interface PricingPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const tool of TOOLS_DATA) {
    params.push({ locale: "en", slug: tool.slug });
    params.push({ locale: "vi", slug: tool.slug });
  }
  return params;
}

export async function generateMetadata({ params }: PricingPageProps) {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const isVi = locale === "vi";
  return {
    title: isVi
      ? `Bảng Giá ${tool.name} 2027: Chi Phí Từng Gói & Cách Chọn - Asmire`
      : `${tool.name} Pricing Guide (2027): Plans, Hidden Costs & Discounts - Asmire`,
    description: `Complete, verified breakdown of ${tool.name} pricing tiers, monthly vs annual billing, and free options.`,
    alternates: {
      canonical: `/${locale}/tools/${tool.slug}/pricing`,
      languages: {
        en: `/en/tools/${tool.slug}/pricing`,
        vi: `/vi/tools/${tool.slug}/pricing`,
        "x-default": `/en/tools/${tool.slug}/pricing`,
      },
    },
  };
}

export default async function ToolPricingPage({ params }: PricingPageProps) {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const isVi = locale === "vi";

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://asmire.me/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `https://asmire.me/${locale}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: `https://asmire.me/${locale}/tools/${tool.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Pricing",
        item: `https://asmire.me/${locale}/tools/${tool.slug}/pricing`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-10">
        <Link
          href={`/${locale}/tools/${tool.slug}`}
          className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          {isVi ? `Quay lại đánh giá ${tool.name}` : `Back to ${tool.name} review`}
        </Link>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              {isVi ? `Bảng Giá & Chi Phí ${tool.name} (2027)` : `${tool.name} Pricing & Plans (2027)`}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span>
              {isVi
                ? `Đã xác thực & kiểm toán ngày ${tool.verifiedAt}.`
                : `Audited & verified on ${tool.verifiedAt}.`}
            </span>
            {tool.pricingEvidenceUrl && (
              <a
                href={tool.pricingEvidenceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded-md transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                {isVi ? "Trang giá chính thức của hãng" : "Official Vendor Pricing Source"}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* Interactive Usage & Team Seat Calculator */}
        <PriceCalculator tool={tool} locale={locale as Locale} />

        {/* Exclusive Deep Dive Callout for HighLevel */}
        {tool.slug === "highlevel" && (
          <div className="p-5 sm:p-6 rounded-2xl border border-brand-500/30 bg-gradient-to-r from-brand-500/5 via-amber-500/5 to-transparent dark:from-brand-950/20 dark:via-zinc-900/40 dark:to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                  {isVi ? "Báo Cáo Phân Tích Độc Quyền" : "Exclusive Deep Dive Guide"}
                </span>
                <span className="text-xs text-muted-foreground">• 14 min read</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                {isVi
                  ? "Bảng Giá GoHighLevel & Bóc Trần Chi Phí Ẩn (2027): Gói $97, $297, $497 & Bài Toán SaaS Rebilling"
                  : "GoHighLevel Pricing Breakdown & Hidden Costs (2027): $97 vs $297 vs $497 Audit"}
              </h3>
              <p className="text-xs text-muted-foreground max-w-xl">
                {isVi
                  ? "Phân tích tường tận mọi chi phí viễn thông LC Phone/Twilio, cước SMS, email, lệ phí A2P 10DLC và cách nhận bộ Asmire Turnkey Agency Snapshot ($1,997) miễn phí."
                  : "Complete breakdown of telephony usage fees, LC Email rates, A2P 10DLC carrier compliance, and how to claim the $1,997 Asmire Turnkey Agency Snapshot bonus."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Link
                href={`/${locale}/news/gohighlevel-pricing-hidden-costs-guide-2027`}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <span>{isVi ? "Đọc bài phân tích giá" : "Read Pricing Audit"}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={`/${locale}/news/gohighlevel-saas-mode-playbook-2027`}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <span>{isVi ? "Playbook Kiếm $10k/Tháng" : "SaaS Playbook ($10k/mo)"}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={`/${locale}/snapshots/agency-os`}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-brand-500 hover:from-amber-600 hover:to-brand-600 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>{isVi ? "Agency Snapshot $1,997" : "Agency Snapshot $1,997"}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={`/${locale}/snapshots/sme-os`}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>{isVi ? "SMEs Snapshot (Gói $97)" : "SMEs Snapshot ($97 Plan)"}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {tool.pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-6 rounded-2xl border bg-card flex flex-col justify-between ${
                tier.isPopular ? "border-brand-500 shadow-md ring-1 ring-brand-500" : "border-border"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-foreground">{tier.name}</h3>
                  {tier.isPopular && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-brand-600 text-white px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-foreground">${tier.priceMonthly}</span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    ${tier.priceAnnualMonthly}/mo when billed annually
                  </p>
                  {tier.userLimit && (
                    <div className="inline-block mt-2 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      ✓ {tier.userLimit}
                    </div>
                  )}
                  {tier.usageLimit && (
                    <p className="text-[11px] text-muted-foreground font-medium mt-1">
                      • {tier.usageLimit}
                    </p>
                  )}
                </div>
                <div className="pt-3 border-t border-border space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                    What's included:
                  </span>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={`/go/${tool.slug}`}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="w-full inline-flex items-center justify-center h-10 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-sm"
                >
                  <span>Select Plan</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
