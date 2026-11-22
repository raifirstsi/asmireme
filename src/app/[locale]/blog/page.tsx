import React from "react";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { BLOG_POSTS } from "@/data/blog-data";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

interface BlogIndexProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogIndexProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi
      ? "Blog & Nghiên Cứu AI SaaS Chuyên Sâu - Asmire"
      : "Asmire AI SaaS Research & Benchmark Guides - Asmire",
    description: isVi
      ? "Các bài viết thử nghiệm thực tế, đối sánh tính năng và hướng dẫn chuyên sâu về toàn bộ công cụ SaaS AI hàng đầu."
      : "In-depth benchmark reports, empirical test findings, and tactical guides across verified top AI software tools.",
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: "/en/blog",
        vi: "/vi/blog",
        "x-default": "/en/blog",
      },
    },
  };
}

export default async function BlogIndexPage({ params }: BlogIndexProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const isVi = locale === "vi";

  // Breadcrumb Schema
  const jsonLd = {
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
        name: "Blog",
        item: `https://asmire.me/${locale}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-12">
          {/* Header - Apple Minimalist */}
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-700/50">
              <BookOpen className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
              <span>Independent AI Research Lab</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
              {isVi ? "Nghiên Cứu & Hướng Dẫn AI Thực Tế" : "Empirical AI Research & Guides"}
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              {isVi
                ? "Không quảng cáo trá hình, không số liệu bịa đặt. Toàn bộ bài viết là kết quả từ hàng trăm giờ thử nghiệm thực tế của ban biên tập Asmire."
                : "Zero sponsored fluff. Every guide represents dozens of hours of hands-on testing, stress tests, and verified pricing analysis."}
            </p>
          </div>

          {/* Featured Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] p-6 sm:p-7 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider text-[11px] bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{post.readingTimeMinutes} min read</span>
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors leading-snug tracking-tight">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {post.title[locale as Locale]}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 font-normal">
                    {post.metaDescription[locale as Locale]}
                  </p>

                  {/* Direct Answer Preview */}
                  <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/70 dark:bg-zinc-900/40 p-3.5 space-y-1">
                    <span className="text-[10px] font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
                      <span>Key Takeaway</span>
                    </span>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium line-clamp-2 leading-relaxed">
                      {post.directAnswerSummary[locale as Locale]}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{post.author.name}</span>
                    <span>•</span>
                    <span>{new Date(post.lastReviewedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>

                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:translate-x-1 transition-transform"
                  >
                    <span>{isVi ? "Đọc bài viết" : "Read guide"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
