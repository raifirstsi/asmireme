import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { NEWS_POSTS, getNewsPostBySlug } from "@/data/blog-data";
import { TOOLS_DATA } from "@/data/tools-data";
import { MarkdownRenderer } from "@/components/common/MarkdownRenderer";
import { ToolLogo } from "@/components/common/ToolLogo";
import { 
  Calendar, Clock, ShieldCheck, Sparkles, ArrowLeft, 
  ExternalLink, ArrowRight, Newspaper, Flame 
} from "lucide-react";

interface NewsPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const post of NEWS_POSTS) {
    params.push({ locale: "en", slug: post.slug });
    params.push({ locale: "vi", slug: post.slug });
  }
  return params;
}

export async function generateMetadata({ params }: NewsPostPageProps) {
  const { locale, slug } = await params;
  const post = getNewsPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title[locale as Locale]} - Asmire News`,
    description: post.metaDescription[locale as Locale],
    alternates: {
      canonical: `/${locale}/news/${post.slug}`,
      languages: {
        en: `/en/news/${post.slug}`,
        vi: `/vi/news/${post.slug}`,
        "x-default": `/en/news/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title[locale as Locale],
      description: post.metaDescription[locale as Locale],
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.lastReviewedDate,
      authors: [post.author.name],
      images: [
        {
          url: `https://asmire.me/thumbnails/news/${post.slug}.png`,
          width: 1200,
          height: 630,
          alt: post.title[locale as Locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title[locale as Locale],
      description: post.metaDescription[locale as Locale],
      images: [`https://asmire.me/thumbnails/news/${post.slug}.png`],
    },
  };
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { locale, slug } = await params;
  const post = getNewsPostBySlug(slug);
  if (!post) notFound();

  const isVi = locale === "vi";
  const isAiNews = post.category === "AI News";

  // Mentioned tools in this article
  const mentionedTools = TOOLS_DATA.filter((t) => post.featuredToolSlugs?.includes(t.slug));

  // Structured Data (Article & Breadcrumbs)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title[locale as Locale],
        description: post.metaDescription[locale as Locale],
        datePublished: post.publishedDate,
        dateModified: post.lastReviewedDate,
        author: {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          "@type": "Organization",
          name: "Asmire",
          url: "https://asmire.me",
          publishingPrinciples: "https://asmire.me/editorial-policy",
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
            name: isVi ? "Tin tức" : "News",
            item: `https://asmire.me/${locale}/news`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title[locale as Locale],
            item: `https://asmire.me/${locale}/news/${post.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={`/thumbnails/news/${post.slug}.webp`}
        type="image/webp"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-5 pb-12 sm:pt-7 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-8 sm:space-y-10">
          {/* Breadcrumbs - Apple Clean Single Line */}
          <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-zinc-400 dark:text-zinc-500 whitespace-nowrap overflow-x-auto scrollbar-none py-1">
            <Link href={`/${locale}`} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0">
              Home
            </Link>
            <span className="mx-2 text-zinc-400 dark:text-zinc-600 select-none shrink-0">/</span>
            <Link href={`/${locale}/news`} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0">
              {isVi ? "Tin tức" : "News"}
            </Link>
            <span className="mx-2 text-zinc-400 dark:text-zinc-600 select-none shrink-0">/</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 shrink-0">
              {post.category}
            </span>
          </nav>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`font-semibold uppercase tracking-wider px-3 py-1 rounded-full border inline-flex items-center gap-1.5 ${
                  isAiNews
                    ? "bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/60"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200/60 dark:border-zinc-700/60"
                }`}
              >
                {isAiNews ? (
                  <>
                    <Flame className="h-3 w-3 fill-current text-amber-500" />
                    <span>AI News (Dan Koe Dispatch)</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    <span>Reviews</span>
                  </>
                )}
              </span>
              <span className="text-zinc-400">•</span>
              <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readingTimeMinutes} min read</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight leading-tight">
              {post.title[locale as Locale]}
            </h1>

            <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              {post.metaDescription[locale as Locale]}
            </p>

            {/* Author Bar & Verification */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-zinc-500 border-t border-black/[0.05] dark:border-white/[0.07]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full flex items-center justify-center border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/80 overflow-hidden shrink-0 shadow-2xs">
                  <img
                    src={post.author.avatarUrl || "/icon.png"}
                    alt={post.author.name}
                    className="h-5 w-5 object-contain dark:invert transition-[filter] duration-200"
                  />
                </div>
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">{post.author.name}</div>
                  <div className="text-[11px] text-zinc-400">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Updated: {post.lastReviewedDate}</span>
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <Link
                  href={`/${locale}/editorial-policy`}
                  className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-medium hover:underline"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{isAiNews ? (isVi ? "Xác thực nguồn tin" : "Source Verified") : "Verified Review"}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Article Hero Thumbnail (International Standard 16:9 Modern SaaS Layout) */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[1.91/1] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-md">
            <picture>
              <source srcSet={`/thumbnails/news/${post.slug}.webp`} type="image/webp" />
              <img
                src={`/thumbnails/news/${post.slug}.webp`}
                alt={post.title[locale as Locale]}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.01]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>

          {/* Direct Takeaway Box (Apple Callout Card) */}
          <div
            className={`p-6 rounded-2xl border space-y-2.5 shadow-2xs ${
              isAiNews
                ? "border-amber-200/70 dark:border-amber-900/40 bg-gradient-to-r from-amber-50/60 to-orange-50/30 dark:from-amber-950/20 dark:to-zinc-900/40"
                : "border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Sparkles className={`h-4 w-4 ${isAiNews ? "text-amber-600 dark:text-amber-400" : ""}`} />
              <span>{isAiNews ? (isVi ? "Tóm Tắt Cốt Lõi & Lăng Kính Chiến Lược" : "Strategic Takeaway & Core Signal") : "Direct Takeaway / AI Overview Summary"}</span>
            </span>
            <p className="text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">
              {post.directAnswerSummary[locale as Locale]}
            </p>
          </div>

          {/* Main Article Body - Rendered with Apple Markdown Engine */}
          <div className="space-y-4">
            <MarkdownRenderer content={post.contentMarkdown[locale as Locale]} />
          </div>

          {/* Featured Tools Mentioned in This Guide */}
          {mentionedTools.length > 0 && (
            <div className="pt-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {isVi ? "Các Công Cụ Được Nhắc Đến Trong Bài" : "Featured Tools Mentioned in This Guide"}
                </h3>
                <p className="text-xs text-zinc-400">
                  {isVi ? "Kiểm tra thông số xác thực và truy cập link trực tiếp:" : "Explore verified specs and direct official links:"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mentionedTools.map((tool) => (
                  <div
                    key={tool.slug}
                    className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] flex flex-col justify-between space-y-4 shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <ToolLogo slug={tool.slug} name={tool.name} size="sm" />
                          <h4 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">{tool.name}</h4>
                        </div>
                        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">${tool.startingPrice}/mo</span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {tool.tagline[locale as Locale]}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/${locale}/tools/${tool.slug}`}
                        className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        {isVi ? "Xem đánh giá" : "Full Review"}
                      </Link>
                      <a
                        href={`/go/${tool.slug}`}
                        target="_blank"
                        rel="nofollow sponsored"
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black text-xs font-medium transition-all shadow-xs"
                      >
                        <span>{isVi ? "Dùng thử" : "Try Free"}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="pt-8 flex items-center justify-between border-t border-black/[0.05] dark:border-white/[0.07]">
            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{isVi ? "Quay lại chuyên mục Tin tức" : "Back to News & Reviews"}</span>
            </Link>

            <Link
              href={`/${locale}/compare`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:underline"
            >
              <span>{isVi ? "Xem ma trận so sánh công cụ" : "View Comparison Matrix"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
