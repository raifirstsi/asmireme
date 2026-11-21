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
      ? "Blog & Nghiên Cứu AI SaaS Chuyên Sâu — Asmire"
      : "Asmire AI SaaS Research & Benchmark Guides — Asmire",
    description: isVi
      ? "Các bài viết thử nghiệm thực tế, đối sánh tính năng và hướng dẫn chuyên sâu về 50 công cụ SaaS AI hàng đầu."
      : "In-depth benchmark reports, empirical test findings, and tactical guides across top 50 AI software tools.",
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
          {/* Header */}
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              <span>Independent AI Research Lab</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              {isVi ? "Nghiên Cứu & Hướng Dẫn AI Thực Tế" : "Empirical AI Research & Guides"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {isVi
                ? "Không quảng cáo trá hình, không số liệu bịa đặt. Toàn bộ bài viết là kết quả từ hàng trăm giờ thử nghiệm thực tế của ban biên tập Asmire."
                : "Zero sponsored fluff. Every guide represents dozens of hours of hands-on testing, stress tests, and verified pricing analysis."}
            </p>
          </div>

          {/* Featured Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-brand-500/50 hover:shadow-sm transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-bold text-brand-600 uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readingTimeMinutes} min read</span>
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-brand-600 transition-colors leading-snug">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {post.title[locale as Locale]}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.metaDescription[locale as Locale]}
                  </p>

                  {/* Direct Answer Preview */}
                  <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-3.5 space-y-1">
                    <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Key Takeaway</span>
                    </span>
                    <p className="text-xs text-foreground font-medium line-clamp-2">
                      {post.directAnswerSummary[locale as Locale]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{post.author.name}</span>
                    <span>•</span>
                    <span>{new Date(post.lastReviewedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>

                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform"
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
