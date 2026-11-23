"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import type { BlogPost } from "@/data/blog-data";
import { Clock, ArrowRight, Sparkles, Newspaper, ShieldCheck, Flame, Search } from "lucide-react";

interface NewsListClientProps {
  posts: BlogPost[];
  locale: Locale;
}

export function NewsListClient({ posts, locale }: NewsListClientProps) {
  const isVi = locale === "vi";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: isVi ? "Tất Cả" : "All Updates", count: posts.length },
    {
      id: "AI News",
      label: isVi ? "Tin Tức AI" : "AI News",
      count: posts.filter((p) => p.category === "AI News").length,
    },
    {
      id: "Reviews",
      label: isVi ? "Đánh Giá Thực Nghiệm" : "Empirical Reviews",
      count: posts.filter((p) => p.category === "Reviews").length,
    },
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCat =
        selectedCategory === "all" || post.category === selectedCategory;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const title = post.title[locale]?.toLowerCase() || "";
      const desc = post.metaDescription[locale]?.toLowerCase() || "";
      const author = post.author.name.toLowerCase();
      return title.includes(q) || desc.includes(q) || author.includes(q);
    });
  }, [posts, selectedCategory, searchQuery, locale]);

  return (
    <div className="space-y-8">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                    : "bg-zinc-100 text-zinc-600 hover:text-zinc-950 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {cat.id === "AI News" && <Flame className="h-3 w-3 text-amber-500 fill-amber-500" />}
                {cat.id === "Reviews" && <ShieldCheck className="h-3 w-3 text-emerald-500" />}
                {cat.id === "all" && <Newspaper className="h-3 w-3" />}
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/20 dark:bg-zinc-900/20 text-white dark:text-zinc-950"
                      : "bg-zinc-200/70 dark:bg-zinc-700/60 text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isVi ? "Lọc bài viết theo từ khóa..." : "Search news & reviews..."}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-zinc-200 transition-all"
          />
        </div>
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center space-y-3 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {isVi ? "Không tìm thấy bài viết nào phù hợp." : "No articles found matching your criteria."}
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 underline hover:opacity-80"
          >
            {isVi ? "Xóa bộ lọc" : "Reset filters"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, idx) => {
            const isAiNews = post.category === "AI News";
            return (
              <article
                key={post.slug}
                className={`rounded-2xl border transition-all flex flex-col justify-between space-y-6 group p-6 sm:p-7 ${
                  isAiNews
                    ? "border-amber-200/80 dark:border-amber-900/40 bg-gradient-to-b from-amber-500/[0.02] to-transparent dark:bg-[#151412] hover:border-amber-400/80 dark:hover:border-amber-700/60 hover:shadow-[0_8px_30px_rgba(245,158,11,0.06)]"
                    : "border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                }`}
              >
                {/* Modern SaaS 16:9 Card Thumbnail */}
                <Link
                  href={`/${locale}/news/${post.slug}`}
                  className="block relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100 dark:bg-zinc-900 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-all shrink-0 shadow-2xs"
                >
                  <picture>
                    <source srcSet={`/thumbnails/news/${post.slug}.webp`} type="image/webp" />
                    <img
                      src={`/thumbnails/news/${post.slug}.webp`}
                      alt={post.title[locale]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading={idx < 4 ? "eager" : "lazy"}
                      fetchPriority={idx < 2 ? "high" : "auto"}
                      decoding="async"
                    />
                  </picture>
                </Link>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span
                      className={`font-semibold uppercase tracking-wider text-[11px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                        isAiNews
                          ? "bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800/60"
                          : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                      }`}
                    >
                      {isAiNews ? (
                        <>
                          <Flame className="h-3 w-3 fill-current text-amber-500" />
                          <span>AI News</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="h-3 w-3 text-emerald-500" />
                          <span>Reviews</span>
                        </>
                      )}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{post.readingTimeMinutes} min read</span>
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors leading-snug tracking-tight">
                    <Link href={`/${locale}/news/${post.slug}`}>
                      {post.title[locale]}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 font-normal">
                    {post.metaDescription[locale]}
                  </p>

                  {/* Direct Answer Preview */}
                  <div
                    className={`rounded-xl border p-3.5 space-y-1 ${
                      isAiNews
                        ? "border-amber-200/50 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20"
                        : "border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/70 dark:bg-zinc-900/40"
                    }`}
                  >
                    <span className="text-[10px] font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles
                        className={`h-3 w-3 ${
                          isAiNews ? "text-amber-600 dark:text-amber-400" : "text-zinc-600 dark:text-zinc-400"
                        }`}
                      />
                      <span>{isAiNews ? (isVi ? "Cốt Lõi Triết Lý & Sự Thật" : "Core Truth & Takeaway") : "Key Takeaway"}</span>
                    </span>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium line-clamp-2 leading-relaxed">
                      {post.directAnswerSummary[locale]}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="h-5 w-5 rounded-full flex items-center justify-center border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/80 overflow-hidden shrink-0">
                      <img
                        src={post.author.avatarUrl || "/icon.png"}
                        alt={post.author.name}
                        className="h-3 w-3 object-contain dark:invert transition-[filter] duration-200"
                      />
                    </div>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {post.author.name}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(post.lastReviewedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <Link
                    href={`/${locale}/news/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:translate-x-1 transition-transform"
                  >
                    <span>{isVi ? "Đọc bài viết" : "Read dispatch"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
