import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { getToolBySlug, TOOLS_DATA } from "@/data/tools-data";
import { PriceCalculator } from "@/components/tools/PriceCalculator";
import { Check, Calendar, ExternalLink, ArrowLeft } from "lucide-react";

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
      ? `Bảng Giá ${tool.name} 2026: Chi Phí Từng Gói & Cách Chọn — Asmire`
      : `${tool.name} Pricing Guide (2026): Plans, Hidden Costs & Discounts — Asmire`,
    description: `Complete, verified breakdown of ${tool.name} pricing tiers, monthly vs annual billing, and free options.`,
  };
}

export default async function ToolPricingPage({ params }: PricingPageProps) {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const isVi = locale === "vi";

  return (
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
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? `Bảng Giá & Chi Phí ${tool.name} (2026)` : `${tool.name} Pricing & Plans (2026)`}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isVi
              ? `Xác thực ngày ${tool.verifiedAt}. So sánh giá theo tháng, giá theo năm và các tính năng đi kèm.`
              : `Verified on ${tool.verifiedAt}. Compare monthly vs annual pricing, credit allowances, and features.`}
          </p>
        </div>

        {/* Interactive Usage & Team Seat Calculator */}
        <PriceCalculator tool={tool} locale={locale as Locale} />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {tool.pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-6 rounded-2xl border bg-card flex flex-col justify-between ${
                tier.isPopular ? "border-brand-500 shadow-md" : "border-border"
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
                  <span className="text-3xl font-black text-foreground">${tier.priceMonthly}</span>
                  <span className="text-xs text-muted-foreground">/mo</span>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    ${tier.priceAnnualMonthly}/mo when billed annually
                  </p>
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
  );
}
