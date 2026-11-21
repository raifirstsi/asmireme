import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { 
  COMPARISON_PAIRS, 
  getComparisonPairBySlug, 
  getToolsForComparisonPair 
} from "@/data/comparisons-data";
import { ComparisonMatrix } from "@/components/tools/ComparisonMatrix";
import { PriceCalculator } from "@/components/tools/PriceCalculator";
import { 
  ArrowLeftRight, Check, X, ShieldCheck, Sparkles, 
  Star, ExternalLink, ArrowRight, Layers, HelpCircle, Trophy
} from "lucide-react";

interface ComparePairPageProps {
  params: Promise<{ locale: string; pair: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; pair: string }[] = [];
  for (const pair of COMPARISON_PAIRS) {
    params.push({ locale: "en", pair: pair.slug });
    params.push({ locale: "vi", pair: pair.slug });
  }
  return params;
}

export async function generateMetadata({ params }: ComparePairPageProps) {
  const { locale, pair: pairSlug } = await params;
  const pair = getComparisonPairBySlug(pairSlug);
  if (!pair) return {};

  const tools = getToolsForComparisonPair(pair);
  if (!tools) return {};

  return {
    title: pair.title[locale as Locale],
    description: pair.metaDescription[locale as Locale],
    alternates: {
      canonical: `/${locale}/compare/${pair.slug}`,
      languages: {
        en: `/en/compare/${pair.slug}`,
        vi: `/vi/compare/${pair.slug}`,
        "x-default": `/en/compare/${pair.slug}`,
      },
    },
  };
}

export default async function ComparePairPage({ params }: ComparePairPageProps) {
  const { locale, pair: pairSlug } = await params;
  const pair = getComparisonPairBySlug(pairSlug);
  if (!pair) notFound();

  const toolPair = getToolsForComparisonPair(pair);
  if (!toolPair) notFound();

  const { toolA, toolB } = toolPair;
  const dict = getDictionary(locale as Locale);
  const isVi = locale === "vi";

  // Schema Markup (Breadcrumbs & FAQPage)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
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
            name: "Compare",
            item: `https://asmire.me/${locale}/compare`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${toolA.name} vs ${toolB.name}`,
            item: `https://asmire.me/${locale}/compare/${pair.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: isVi
              ? `Nên chọn ${toolA.name} hay ${toolB.name}?`
              : `Which is better: ${toolA.name} or ${toolB.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: pair.directAnswer[locale as Locale],
            },
          },
          {
            "@type": "Question",
            name: isVi
              ? `Ai nên sử dụng ${toolA.name}?`
              : `Who should choose ${toolA.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: pair.whoShouldChooseA[locale as Locale],
            },
          },
          {
            "@type": "Question",
            name: isVi
              ? `Ai nên sử dụng ${toolB.name}?`
              : `Who should choose ${toolB.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: pair.whoShouldChooseB[locale as Locale],
            },
          },
          {
            "@type": "Question",
            name: isVi
              ? `So sánh giá giữa ${toolA.name} và ${toolB.name}?`
              : `How do ${toolA.name} and ${toolB.name} compare on pricing?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: pair.pricingVerdict[locale as Locale],
            },
          },
        ],
      },
    ],
  };

  const otherPairs = COMPARISON_PAIRS.filter((p) => p.slug !== pair.slug).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href={`/${locale}`} className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href={`/${locale}/compare`} className="hover:text-foreground">Compare</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">{toolA.name} vs {toolB.name}</span>
          </nav>

          {/* Hero Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              <ArrowLeftRight className="h-4 w-4" />
              <span>{pair.category} • Head-to-Head Comparison</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
              {pair.title[locale as Locale]}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
              {pair.metaDescription[locale as Locale]}
            </p>
          </div>

          {/* Quick Duel Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tool A */}
            <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
              {pair.winnerOverall === "A" && (
                <div className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-3 py-1 text-[11px] font-bold shadow-xs">
                  <Trophy className="h-3 w-3" />
                  <span>Category Winner</span>
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-foreground font-black text-xl border border-border">
                    {toolA.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-foreground">{toolA.name}</h2>
                    <div className="flex items-center gap-1 text-xs text-foreground font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{toolA.rating} / 5.0</span>
                      <span className="text-muted-foreground font-normal">({toolA.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {toolA.tagline[locale as Locale]}
                </p>
                <div className="text-xs font-semibold text-foreground pt-1">
                  Starting at <span className="font-bold text-foreground">${toolA.startingPrice}/mo</span>
                </div>
              </div>

              <div>
                <a
                  href={`/go/${toolA.slug}`}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs transition-colors shadow-sm"
                >
                  <span>Visit {toolA.name}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Tool B */}
            <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
              {pair.winnerOverall === "B" && (
                <div className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-3 py-1 text-[11px] font-bold shadow-xs">
                  <Trophy className="h-3 w-3" />
                  <span>Category Winner</span>
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-foreground font-black text-xl border border-border">
                    {toolB.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-foreground">{toolB.name}</h2>
                    <div className="flex items-center gap-1 text-xs text-foreground font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{toolB.rating} / 5.0</span>
                      <span className="text-muted-foreground font-normal">({toolB.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {toolB.tagline[locale as Locale]}
                </p>
                <div className="text-xs font-semibold text-foreground pt-1">
                  Starting at <span className="font-bold text-foreground">${toolB.startingPrice}/mo</span>
                </div>
              </div>

              <div>
                <a
                  href={`/go/${toolB.slug}`}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs transition-colors shadow-sm"
                >
                  <span>Visit {toolB.name}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* GEO / AEO Direct Answer Box (40-60 Words Citation Target) */}
          <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>Direct Editorial Verdict (TL;DR)</span>
            </span>
            <p className="text-sm sm:text-base font-semibold text-foreground leading-relaxed">
              {pair.directAnswer[locale as Locale]}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              {pair.verdictSummary[locale as Locale]}
            </p>
          </div>

          {/* Personas: Who Should Choose A vs Who Should Choose B */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card space-y-3 shadow-xs">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Check className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                <span>Who Should Choose {toolA.name}</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {pair.whoShouldChooseA[locale as Locale]}
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card space-y-3 shadow-xs">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Check className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                <span>Who Should Choose {toolB.name}</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {pair.whoShouldChooseB[locale as Locale]}
              </p>
            </div>
          </div>

          {/* Interactive Comparison Matrix */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-foreground">
                {isVi ? "Bảng Ma Trận So Sánh Tính Năng" : "Feature & Specifications Matrix"}
              </h3>
            </div>
            <ComparisonMatrix initialTools={[toolA, toolB]} locale={locale as Locale} />
          </div>

          {/* Price Calculator Seat Scaling */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-foreground">
                {isVi ? "Dự Toán Chi Phí Theo Quy Mô Nhân Sự" : "Team Scaling Cost Calculator"}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PriceCalculator tool={toolA} locale={locale as Locale} />
              <PriceCalculator tool={toolB} locale={locale as Locale} />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4 border-t border-border pt-10">
            <div className="flex items-center gap-2 text-foreground font-black text-xl">
              <HelpCircle className="h-5 w-5 text-brand-600" />
              <span>{isVi ? "Câu Hỏi Thường Gặp Về So Sánh" : "Frequently Asked Questions"}</span>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h4 className="font-bold text-sm text-foreground">
                  {isVi ? `Nên chọn ${toolA.name} hay ${toolB.name}?` : `Which is better: ${toolA.name} or ${toolB.name}?`}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {pair.directAnswer[locale as Locale]}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h4 className="font-bold text-sm text-foreground">
                  {isVi ? `So sánh giá giữa ${toolA.name} và ${toolB.name}?` : `How do ${toolA.name} and ${toolB.name} compare on pricing?`}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {pair.pricingVerdict[locale as Locale]}
                </p>
              </div>
            </div>
          </div>

          {/* Other Popular Comparisons */}
          <div className="space-y-4 border-t border-border pt-10">
            <h3 className="text-lg font-bold text-foreground">
              {isVi ? "Các Cặp So Sánh Phổ Biến Khác" : "Explore More AI Comparisons"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {otherPairs.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${locale}/compare/${p.slug}`}
                  className="p-4 rounded-xl border border-border bg-card hover:border-brand-500/50 hover:shadow-xs transition-all space-y-1 block group"
                >
                  <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider block">
                    {p.category}
                  </span>
                  <span className="text-xs font-bold text-foreground group-hover:text-brand-600 transition-colors block">
                    {p.toolASlug} vs {p.toolBSlug}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
