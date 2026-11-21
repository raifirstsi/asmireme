import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { getToolBySlug, TOOLS_DATA } from "@/data/tools-data";
import { getExternalReviewsForTool } from "@/services/review-ingestion";
import { 
  Star, ShieldCheck, Check, X, ExternalLink, Calendar, 
  HelpCircle, Sparkles, AlertCircle, ArrowRight, Layers, MessageSquare 
} from "lucide-react";

interface ToolPageProps {
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

export async function generateMetadata({ params }: ToolPageProps) {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const isVi = locale === "vi";
  return {
    title: isVi
      ? `Đánh Giá ${tool.name} Chi Tiết (2026): Bảng Giá, Thử Nghiệm & Nhược Điểm — Asmire`
      : `${tool.name} Review (2026): Verified Benchmarks, Pricing & Drawbacks — Asmire`,
    description: tool.directAnswer[locale as Locale],
    alternates: {
      canonical: `/${locale}/tools/${tool.slug}`,
      languages: {
        en: `/en/tools/${tool.slug}`,
        vi: `/vi/tools/${tool.slug}`,
        "x-default": `/en/tools/${tool.slug}`,
      },
    },
  };
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const dict = getDictionary(locale as Locale);
  const isVi = locale === "vi";

  // Structured Data (JSON-LD) - Strict Google Review Policy & AEO Compliance
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        operatingSystem: "Web, Cloud",
        applicationCategory: "BusinessApplication",
        offers: {
          "@type": "Offer",
          price: tool.startingPrice,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        review: {
          "@type": "Review",
          author: {
            "@type": "Person",
            name: "Asmire Editorial Testing Team",
          },
          datePublished: tool.verifiedAt,
          reviewRating: {
            "@type": "Rating",
            ratingValue: tool.rating,
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: tool.verdict.bottomLine[locale as Locale],
        },
      },
      {
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
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: isVi ? `${tool.name} là gì và hoạt động như thế nào?` : `What is ${tool.name} and how does it work?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: tool.description[locale as Locale],
            },
          },
          {
            "@type": "Question",
            name: isVi ? `${tool.name} có giá bao nhiêu trong năm 2026?` : `How much does ${tool.name} cost in 2026?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: isVi
                ? `${tool.name} có giá khởi điểm từ $${tool.startingPrice}/tháng. Được Asmire kiểm chứng ngày ${tool.verifiedAt}.`
                : `${tool.name} starts at $${tool.startingPrice}/mo. Verified by Asmire on ${tool.verifiedAt}.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href={`/${locale}`} className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href={`/${locale}/tools`} className="hover:text-foreground">Tools</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">{tool.name}</span>
          </nav>

          {/* Hero Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-teal-500/20 text-brand-700 dark:text-brand-300 font-black text-2xl border border-brand-500/20">
                  {tool.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                    {tool.name}
                  </h1>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <span className="flex items-center font-bold text-amber-500">
                      <Star className="h-4 w-4 fill-current mr-1" />
                      {tool.rating} / 5.0
                    </span>
                    <span className="text-muted-foreground">({tool.reviewCount.toLocaleString()} reviews)</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                      <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {tool.tagline[locale as Locale]}
              </p>
            </div>

            {/* Outbound CTA Box */}
            <div className="flex flex-col gap-2 shrink-0 sm:w-56">
              <a
                href={`/go/${tool.slug}`}
                target="_blank"
                rel="nofollow sponsored"
                className="w-full inline-flex items-center justify-center h-12 px-6 text-sm font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-md hover:shadow-lg"
              >
                <span>{isVi ? "Dùng Thử Miễn Phí" : "Try Free / Visit"}</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
              <div className="text-[11px] text-center text-muted-foreground">
                Official website link • Starts ${tool.startingPrice}/mo
              </div>
            </div>
          </div>

          {/* GEO / AEO Direct Answer Box (40-60 Words) */}
          <div className="p-5 sm:p-6 rounded-2xl border border-brand-500/40 bg-brand-500/5 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              Direct Editorial Answer (TL;DR)
            </span>
            <p className="text-sm font-medium text-foreground leading-relaxed">
              {tool.directAnswer[locale as Locale]}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Verified on {tool.verifiedAt} by Asmire Benchmark Team</span>
            </div>
          </div>

          {/* Verdict Snapshot Card (Above the fold) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Check className="h-4 w-4" />
                Best For
              </h3>
              <p className="text-xs text-foreground/90 leading-relaxed">
                {tool.verdict.bestFor[locale as Locale]}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <X className="h-4 w-4" />
                Who It Is NOT For
              </h3>
              <p className="text-xs text-foreground/90 leading-relaxed">
                {tool.verdict.notFor[locale as Locale]}
              </p>
            </div>
          </div>

          {/* Pros & Cons (Genuine Drawbacks) */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              {isVi ? "Ưu & Nhược Điểm Thực Tế" : "Honest Pros & Real Limitations"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-border bg-card space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Key Advantages
                </h4>
                <ul className="space-y-2 text-xs text-foreground/90">
                  {tool.pros[locale as Locale].map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl border border-border bg-card space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Documented Drawbacks
                </h4>
                <ul className="space-y-2 text-xs text-foreground/90">
                  {tool.cons[locale as Locale].map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Verified Pricing Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {isVi ? "Bảng Giá Xác Thực" : "Verified Pricing Plans (2026)"}
              </h2>
              <Link
                href={`/${locale}/tools/${tool.slug}/pricing`}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Detailed Pricing & Cost Calculator →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tool.pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`p-5 rounded-xl border bg-card flex flex-col justify-between ${
                    tier.isPopular ? "border-brand-500 shadow-sm" : "border-border"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-foreground">{tier.name}</span>
                      {tier.isPopular && (
                        <span className="text-[10px] font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-2xl font-black text-foreground">${tier.priceMonthly}</span>
                      <span className="text-xs text-muted-foreground">/mo</span>
                      {tier.priceAnnualMonthly < tier.priceMonthly && (
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                          ${tier.priceAnnualMonthly}/mo billed annually
                        </div>
                      )}
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`/go/${tool.slug}`}
                    target="_blank"
                    rel="nofollow sponsored"
                    className="mt-6 w-full inline-flex items-center justify-center h-9 text-xs font-bold rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                  >
                    Select Plan
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Verified External Community Sentiment */}
          <div className="space-y-4 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-amber-500" />
                  {isVi ? "Ý Kiến Cộng Đồng & Đánh Giá Độc Lập" : "Verified Community Sentiment (External Sources)"}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Real feedback collected via official platform APIs. Kept separate from editorial benchmark scores.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getExternalReviewsForTool(tool.slug).length > 0 ? (
                getExternalReviewsForTool(tool.slug).map((rev, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-border bg-card space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider bg-secondary px-2 py-0.5 rounded text-foreground">
                        {rev.source.replace("_", " ")}
                      </span>
                      <span className="flex items-center text-xs font-bold text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-current mr-0.5" />
                        {rev.rating} (n={rev.reviewCount.toLocaleString()})
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      "{rev.excerpt}"
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
                      <span>Synced: {rev.lastSyncDate}</span>
                      <a
                        href={rev.sourceUrl}
                        target="_blank"
                        rel="nofollow"
                        className="font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-0.5"
                      >
                        Original Thread <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-5 rounded-xl border border-dashed border-border text-xs text-muted-foreground col-span-2">
                  Community threads currently being aggregated via Product Hunt & Reddit APIs.
                </div>
              )}
            </div>
          </div>

          {/* Alternatives */}
          <div className="space-y-4 pt-6 border-t border-border">
            <h2 className="text-xl font-bold text-foreground">
              {isVi ? `Các Lựa Chọn Thay Thế Cho ${tool.name}` : `Top Alternatives to ${tool.name}`}
            </h2>
            <div className="flex flex-wrap gap-2">
              {tool.alternatives.map((altSlug) => {
                const alt = getToolBySlug(altSlug);
                if (!alt) return null;
                return (
                  <Link
                    key={alt.slug}
                    href={`/${locale}/tools/${alt.slug}`}
                    className="inline-flex items-center gap-2 p-3 rounded-xl border border-border bg-card hover:border-brand-500/50 hover:bg-secondary/40 transition-colors"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-brand-500/10 text-brand-600 font-bold text-xs">
                      {alt.name.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-foreground">{alt.name}</span>
                    <span className="text-[11px] text-muted-foreground">${alt.startingPrice}/mo</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
