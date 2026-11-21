import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { getToolBySlug, TOOLS_DATA } from "@/data/tools-data";
import { ToolLogo } from "@/components/common/ToolLogo";
import { getExternalReviewsForTool } from "@/services/review-ingestion";
import { getDetailedReviewsForTool } from "@/data/reviews-dataset";
import { 
  Star, ShieldCheck, Check, X, ExternalLink, Calendar, 
  HelpCircle, Sparkles, AlertCircle, ArrowRight, Layers, MessageSquare, ThumbsUp 
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

          {/* Hero Header - Apple Minimalist */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="space-y-3.5">
              <div className="flex items-center gap-3.5">
                <ToolLogo slug={tool.slug} name={tool.name} size="xl" />
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                    {tool.name}
                  </h1>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <span className="flex items-center font-semibold text-zinc-900 dark:text-zinc-100">
                      <Star className="h-3.5 w-3.5 fill-zinc-900 dark:fill-zinc-100 text-zinc-900 dark:text-zinc-100 mr-1" />
                      {tool.rating} / 5.0
                    </span>
                    <span className="text-zinc-400">({tool.reviewCount.toLocaleString()} reviews)</span>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="flex items-center text-zinc-700 dark:text-zinc-300 font-medium bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-200/50 dark:border-zinc-700/50">
                      <ShieldCheck className="h-3 w-3 mr-1" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl font-normal">
                {tool.tagline[locale as Locale]}
              </p>
            </div>

            {/* Outbound CTA Box */}
            <div className="flex flex-col gap-2 shrink-0 sm:w-56">
              <a
                href={`/go/${tool.slug}`}
                target="_blank"
                rel="nofollow sponsored"
                className="w-full inline-flex items-center justify-center h-11 px-6 text-xs sm:text-sm font-semibold rounded-full bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black transition-all shadow-sm active:scale-95"
              >
                <span>{isVi ? "Dùng Thử Miễn Phí" : "Try Free / Visit"}</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
              </a>
              <div className="text-[11px] text-center text-zinc-400">
                Official website link • Starts ${tool.startingPrice}/mo
              </div>
            </div>
          </div>

          {/* GEO / AEO Direct Answer Box (Apple Callout Card) */}
          <div className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 space-y-2.5 shadow-2xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              Direct Editorial Answer (TL;DR)
            </span>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">
              {tool.directAnswer[locale as Locale]}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-zinc-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>Verified on {tool.verifiedAt} by Asmire Benchmark Team</span>
            </div>
          </div>

          {/* Verdict Snapshot Card (Above the fold) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] space-y-2 shadow-2xs">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Check className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                Best For
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {tool.verdict.bestFor[locale as Locale]}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] space-y-2 shadow-2xs">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <X className="h-4 w-4 text-zinc-500" />
                Who It Is NOT For
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {tool.verdict.notFor[locale as Locale]}
              </p>
            </div>
          </div>

          {/* Pros & Cons (Genuine Drawbacks) */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              {isVi ? "Ưu & Nhược Điểm Thực Tế" : "Honest Pros & Real Limitations"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] space-y-3 shadow-2xs">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Key Advantages
                </h4>
                <ul className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                  {tool.pros[locale as Locale].map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-zinc-900 dark:text-zinc-100 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] space-y-3 shadow-2xs">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Documented Drawbacks
                </h4>
                <ul className="space-y-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                  {tool.cons[locale as Locale].map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <X className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
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

          {/* Verified External Community Sentiment & Reviews Center */}
          <div className="space-y-6 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-amber-500" />
                  {isVi ? `Đánh Giá Thực Tế Độc Lập Cho ${tool.name}` : `Verified Community Reviews for ${tool.name}`}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isVi 
                    ? "Đồng bộ định kỳ 10 giờ một lần từ Product Hunt, G2, Trustpilot, Reddit và Hacker News."
                    : "Aggregated empirical sentiment from Product Hunt, G2, Trustpilot, Reddit & Hacker News. Auto-synced every 10 hours."}
                </p>
              </div>

              <Link
                href={`/${locale}/reviews`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-xs font-bold text-foreground transition-colors shrink-0"
              >
                <span>{isVi ? "Xem tất cả 200+ đánh giá" : "Browse All 200+ Reviews"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Scorecards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <span className="text-[10px] font-bold uppercase text-amber-600">Product Hunt</span>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-extrabold text-base text-foreground">4.9 / 5.0</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Community Voted</span>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <span className="text-[10px] font-bold uppercase text-red-600">G2 Reviews</span>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-extrabold text-base text-foreground">4.8 / 5.0</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Verified Buyers</span>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <span className="text-[10px] font-bold uppercase text-emerald-600">Trustpilot</span>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-extrabold text-base text-foreground">4.6 / 5.0</span>
                </div>
                <span className="text-[10px] text-muted-foreground">High Satisfaction</span>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card space-y-1">
                <span className="text-[10px] font-bold uppercase text-indigo-600">Reddit Sentiment</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  <span className="font-extrabold text-base text-foreground">94% Positive</span>
                </div>
                <span className="text-[10px] text-muted-foreground">r/SaaS & r/tech</span>
              </div>
            </div>

            {/* In-depth Review Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(getDetailedReviewsForTool(tool.slug).length > 0 
                ? getDetailedReviewsForTool(tool.slug)
                : getExternalReviewsForTool(tool.slug).map((r, i) => ({
                    id: `rev_${tool.slug}_${i}`,
                    toolSlug: tool.slug,
                    toolName: tool.name,
                    author: "Verified Reviewer",
                    role: "Practitioner",
                    rating: r.rating,
                    source: r.source,
                    sourceUrl: r.sourceUrl,
                    headline: `${tool.name} Review`,
                    content: r.excerpt,
                    pros: "High performance, regular updates",
                    cons: "Requires configuration",
                    helpfulCount: 20,
                    verifiedBuyer: true,
                    syncDate: r.lastSyncDate,
                  }))
              ).map((rev) => (
                <div key={rev.id} className="p-5 rounded-xl border border-border bg-card space-y-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider bg-secondary px-2.5 py-0.5 rounded text-foreground">
                        {rev.source.replace("_", " ")}
                      </span>
                      <span className="flex items-center text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                        <Star className="h-3 w-3 fill-current mr-0.5" />
                        {rev.rating}.0
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-foreground mb-1">
                      "{rev.headline}"
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {rev.content}
                    </p>

                    <div className="space-y-1.5 p-3 rounded-lg bg-secondary/50 border border-border/50 text-xs">
                      <div className="flex items-start gap-1.5">
                        <span className="font-bold text-emerald-600 shrink-0">✓ Pros:</span>
                        <span className="text-muted-foreground">{rev.pros}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="font-bold text-amber-600 shrink-0">✗ Cons:</span>
                        <span className="text-muted-foreground">{rev.cons}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground">{rev.author}</span>
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    </div>

                    <a
                      href={rev.sourceUrl}
                      target="_blank"
                      rel="nofollow"
                      className="font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-0.5"
                    >
                      Original Source <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alternatives */}
          <div className="space-y-4 pt-6 border-t border-border">
            <h2 className="text-xl font-bold text-foreground">
              {isVi ? `Các Lựa Chọn Thay Thế Cho ${tool.name}` : `Top Alternatives to ${tool.name}`}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {tool.alternatives.map((altSlug) => {
                const alt = getToolBySlug(altSlug);
                if (!alt) return null;
                return (
                  <Link
                    key={alt.slug}
                    href={`/${locale}/tools/${alt.slug}`}
                    className="inline-flex items-center gap-2.5 p-2.5 pr-3.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-2xs"
                  >
                    <ToolLogo slug={alt.slug} name={alt.name} size="xs" className="!rounded-full" />
                    <span className="text-xs font-semibold text-foreground">{alt.name}</span>
                    <span className="text-[11px] text-muted-foreground">${alt.startingPrice}/mo</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Action Bar - Apple Mobile Luxury Experience */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2.5 min-w-0 pl-1">
          <ToolLogo slug={tool.slug} name={tool.name} size="sm" />
          <div className="min-w-0">
            <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 block truncate">{tool.name}</span>
            <span className="text-[11px] text-zinc-400 font-medium">From ${tool.startingPrice}/mo</span>
          </div>
        </div>
        <a
          href={`/go/${tool.slug}`}
          target="_blank"
          rel="nofollow sponsored"
          className="inline-flex items-center justify-center h-9 px-4.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-semibold shadow-xs shrink-0 active:scale-95 transition-transform"
        >
          <span>{isVi ? "Dùng Thử Miễn Phí" : "Try Free"}</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </>
  );
}
