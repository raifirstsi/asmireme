import React from "react";
import { Locale, locales, getDictionary } from "@/lib/i18n";
import { NEWS_POSTS } from "@/data/blog-data";
import { NewsListClient } from "@/components/news/NewsListClient";
import { Newspaper, Sparkles, ShieldCheck } from "lucide-react";

interface NewsIndexProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: NewsIndexProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi
      ? "Tin Tức AI & Đánh Giá Thực Nghiệm Chuyên Sâu (AI News & Reviews) - Asmire"
      : "Asmire AI News, Frontier Dispatches & In-Depth Reviews - Asmire",
    description: isVi
      ? "Cập nhật các bước đột phá công nghệ AI biên giới mới nhất cùng toàn bộ kho bài đánh giá phần mềm độc lập, chuẩn xác."
      : "Frontier AI intelligence dispatches alongside empirical software benchmarks and honest pricing audits.",
    alternates: {
      canonical: `/${locale}/news`,
      languages: {
        en: "/en/news",
        vi: "/vi/news",
        "x-default": "/en/news",
      },
    },
  };
}

export default async function NewsIndexPage({ params }: NewsIndexProps) {
  const { locale } = await params;
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
        name: isVi ? "Tin tức" : "News",
        item: `https://asmire.me/${locale}/news`,
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
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-10">
          {/* Header - Apple Minimalist */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-700/50">
              <Newspaper className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
              <span>{isVi ? "Tạp Chí Tin Tức & Đánh Giá Độc Lập" : "Frontier Intelligence & Empirical Audits"}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
              {isVi ? "Bản Tin AI & Đánh Giá Thực Nghiệm" : "AI News & In-Depth Reviews"}
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              {isVi
                ? "Tổng hợp các bài phân tích chuyển dịch công nghệ biên giới và toàn bộ kho dữ liệu đánh giá phần mềm độc lập, thực chứng, không quảng cáo trá hình."
                : "A high-signal synthesis of bleeding-edge AI structural shifts paired with empirical SaaS benchmarks and stress tests."}
            </p>
          </div>

          {/* Interactive Client Filter & Posts Grid */}
          <NewsListClient posts={NEWS_POSTS} locale={locale as Locale} />
        </div>
      </div>
    </>
  );
}
