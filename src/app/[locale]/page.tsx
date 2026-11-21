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
    title: `${dict.brandName} — ${dict.brandTagline}`,
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

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 border-b border-border bg-gradient-to-b from-background via-card/50 to-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-bold text-brand-600 dark:text-brand-400">
              <ShieldCheck className="h-4 w-4" />
              <span>{dict.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
              {dict.hero.title}
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {dict.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href={`/${locale}/tools`}
                className="inline-flex items-center justify-center h-11 px-6 text-sm font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-sm hover:shadow"
              >
                {dict.hero.browseCta}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <Link
                href={`/${locale}/compare`}
                className="inline-flex items-center justify-center h-11 px-6 text-sm font-bold rounded-xl border border-border bg-card hover:bg-secondary text-foreground transition-colors"
              >
                {dict.hero.compareCta}
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-2 border-t border-border/80 max-w-xl mx-auto text-center">
              <div>
                <span className="block text-base sm:text-lg font-black text-foreground">50</span>
                <span className="text-[11px] text-muted-foreground">{dict.hero.stats.tools}</span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-black text-brand-600 dark:text-brand-400">100%</span>
                <span className="text-[11px] text-muted-foreground">{dict.hero.stats.benchmarks}</span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-black text-foreground">24/7</span>
                <span className="text-[11px] text-muted-foreground">{dict.hero.stats.pricingUpdates}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <MarqueeBar locale={locale as Locale} />

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Category Grid Section */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
                <Layers className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                {dict.sections.categoriesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {dict.sections.categoriesSub}
              </p>
            </div>
            <Link
              href={`/${locale}/categories`}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              All Categories <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <CategoryGrid locale={locale as Locale} />
        </section>

        {/* Weekly Leaderboard Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              {dict.sections.rankingsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
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
                <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                  {dict.sections.trendingTitle}
                </h3>
                <Link
                  href={`/${locale}/tools`}
                  className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  View All 50 Tools <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trendingTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} locale={locale as Locale} />
                ))}
              </div>
            </div>

            {/* Recently Updated & Benchmarked */}
            <div className="space-y-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-teal-600" />
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
