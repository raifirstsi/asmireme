import React from "react";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { ToolCard } from "@/components/tools/ToolCard";
import { MarqueeBar } from "@/components/home/MarqueeBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Leaderboard } from "@/components/home/Leaderboard";
import { HomeSidebar } from "@/components/home/HomeSidebar";
import { Sparkles, ShieldCheck, ArrowRight, Layers, TrendingUp, RefreshCw } from "lucide-react";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return {
    title: `${dict.brandName} - ${dict.brandTagline}`,
    description: dict.brandDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        vi: "/vi",
        "x-default": "/en",
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  // Trending tools: first 12 tools
  const trendingTools = TOOLS_DATA.slice(0, 12);
  // Recently updated: tools 12 to 24
  const recentTools = TOOLS_DATA.slice(12, 20);

  // JSON-LD structured data for Google Search & AI Overviews
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://asmire.me/#organization",
        name: "Asmire",
        url: "https://asmire.me",
        logo: "https://asmire.me/logo.png",
        sameAs: [],
        description: dict.brandDescription,
      },
      {
        "@type": "WebSite",
        "@id": "https://asmire.me/#website",
        url: "https://asmire.me",
        name: "Asmire",
        publisher: { "@id": "https://asmire.me/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://asmire.me/en/tools?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section - Apple Minimalist Aesthetic */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-800 dark:text-zinc-200" />
              <span>{dict.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.08]">
              {dict.hero.title}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
              {dict.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Link
                href={`/${locale}/tools`}
                className="inline-flex items-center justify-center h-10 px-6 text-xs sm:text-sm font-medium rounded-full bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black transition-all shadow-xs"
              >
                {dict.hero.browseCta}
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Link>
              <Link
                href={`/${locale}/compare`}
                className="inline-flex items-center justify-center h-10 px-6 text-xs sm:text-sm font-medium rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors"
              >
                {dict.hero.compareCta}
              </Link>
            </div>

            {/* Quick Metrics - Apple Unified Glass Capsule */}
            <div className="pt-8 max-w-md mx-auto">
              <div className="grid grid-cols-3 divide-x divide-zinc-200/80 dark:divide-zinc-800 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 p-3 sm:p-4 text-center shadow-2xs backdrop-blur-xs">
                <div>
                  <span className="block text-lg sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{TOOLS_DATA.length}+</span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{dict.hero.stats.tools}</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">100%</span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{dict.hero.stats.benchmarks}</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">24/7</span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{dict.hero.stats.pricingUpdates}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <MarqueeBar locale={locale as Locale} />

      {/* Main Content Area - Focused Center Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Category Grid Section */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
                <Layers className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
                {dict.sections.categoriesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {dict.sections.categoriesSub}
              </p>
            </div>
            <Link
              href={`/${locale}/categories`}
              className="text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white flex items-center gap-1 group"
            >
              <span>All Categories</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <CategoryGrid locale={locale as Locale} />
        </section>

        {/* Weekly Leaderboard Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {dict.sections.rankingsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {dict.sections.rankingsSub}
            </p>
          </div>
          <Leaderboard locale={locale as Locale} />
        </section>

        {/* Two-Column Rhythm: Left Products (70%) & Right Activity Sidebar (30%) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Feed: Trending Tools */}
          <div className="lg:col-span-8 space-y-12">
            {/* Trending Tools */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
                  {dict.sections.trendingTitle}
                </h3>
                <Link
                  href={`/${locale}/tools`}
                  className="text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:underline flex items-center gap-1 group"
                >
                  <span>{locale === "vi" ? "Xem tất cả công cụ" : "View All Tools"}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trendingTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} locale={locale as Locale} />
                ))}
              </div>
            </div>

            {/* Recently Updated & Benchmarked */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                  Recently Re-tested & Updated
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} locale={locale as Locale} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <HomeSidebar locale={locale as Locale} />
          </div>
        </section>
      </div>
    </>
  );
}
