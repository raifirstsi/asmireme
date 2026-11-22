"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { SAAS_STACK_REPLACEMENTS } from "@/data/saas-stacks-data";
import { ToolLogo } from "@/components/common/ToolLogo";
import { Search, X, Star, ArrowRight, TrendingDown, Sparkles } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export function SearchModal({ isOpen, onClose, locale }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const isVi = locale === "vi";
  const prevPathname = useRef(pathname);

  // Auto-close on route change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Lock body scroll on mobile and desktop
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Robust navigation handler ensuring reliable routing without unmount cancellation
  const handleSelect = (href: string, e?: React.MouseEvent) => {
    if (e && (e.metaKey || e.ctrlKey || e.button === 1)) {
      // Allow opening in a new tab if command/ctrl/middle click
      onClose();
      return;
    }
    if (e) {
      e.preventDefault();
    }
    router.push(href);
    onClose();
  };

  // Match tools
  const filteredTools = useMemo(() => {
    if (!query.trim()) return TOOLS_DATA.slice(0, 5);
    const q = query.toLowerCase();
    return TOOLS_DATA.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.tagline[locale].toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query, locale]);

  // Match SaaS Stacks
  const matchedStacks = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const isGenericLeanSearch = 
      q.includes("replace") || 
      q.includes("thay the") || 
      q.includes("thay thế") || 
      q.includes("cat giam") || 
      q.includes("cắt giảm") || 
      q.includes("tiet kiem") || 
      q.includes("tiết kiệm") || 
      q.includes("saas") || 
      q.includes("bill") || 
      q.includes("lean");

    if (isGenericLeanSearch) {
      return SAAS_STACK_REPLACEMENTS.slice(0, 3);
    }

    return SAAS_STACK_REPLACEMENTS.filter((s) => {
      const matchLegacy = 
        s.legacyStack.name.toLowerCase().includes(q) ||
        s.legacyStack.items.some((item) => item.name.toLowerCase().includes(q));
      const matchLean = 
        s.leanStack.toolName.toLowerCase().includes(q) ||
        s.leanStack.toolSlug.toLowerCase().includes(q);
      const matchTitle = 
        s.title.en.toLowerCase().includes(q) || 
        s.title.vi.toLowerCase().includes(q);
      return matchLegacy || matchLean || matchTitle;
    }).slice(0, 3);
  }, [query]);

  const isPlaygroundMatch = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return false;
    return (
      q.includes("play") ||
      q.includes("thử nghiệm") ||
      q.includes("thu nghiem") ||
      q.includes("voice") ||
      q.includes("audio") ||
      q.includes("avatar") ||
      q.includes("benchmark")
    );
  }, [query]);

  // Keyboard Enter navigation
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isPlaygroundMatch) {
        handleSelect(`/${locale}/playground`);
      } else if (matchedStacks.length > 0) {
        handleSelect(`/${locale}/replace#${matchedStacks[0].id}`);
      } else if (filteredTools.length > 0) {
        handleSelect(`/${locale}/tools/${filteredTools[0].slug}`);
      } else if (query.trim()) {
        handleSelect(`/${locale}/tools?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl bg-white dark:bg-[#151516] border border-zinc-200/90 dark:border-zinc-700/70 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar - Apple Spotlight Style with refined font-size */}
        <div className="flex items-center px-3.5 sm:px-4 h-12 border-b border-zinc-100 dark:border-zinc-800">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={isVi ? "Tìm công cụ, từ khóa thay thế (HubSpot, Zapier, ClickFunnels)..." : "Search tools, replacements (HubSpot, Zapier, ClickFunnels)..."}
            className="w-full h-full bg-transparent px-3 text-xs sm:text-[13.5px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none tracking-normal font-normal"
            autoFocus
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors mr-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 mr-2 select-none">
              ESC
            </kbd>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-3">
          {/* Playground Spotlight Match */}
          {isPlaygroundMatch && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 px-3 py-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isVi ? "Phòng Thử Nghiệm Đa Phương Tiện (Output Playground)" : "AI Output Playground Match"}</span>
              </div>
              <Link
                href={`/${locale}/playground`}
                onClick={(e) => handleSelect(`/${locale}/playground`, e)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/20 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white truncate">
                      {isVi ? "Nghe & Xem Thực Tế Đầu Ra (Voice, Video, Content AI)" : "Listen & Watch AI Outputs (Voice, Video, Content)"}
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {isVi ? "So sánh ElevenLabs, HeyGen, KoalaWriter trên đề bài chuẩn hóa" : "Compare ElevenLabs, HeyGen, KoalaWriter side-by-side"}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-cyan-600 dark:text-cyan-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </Link>
            </div>
          )}

          {/* 1. Matched SaaS Stack Replacements (High-Intent Conversion Spotlight) */}
          {matchedStacks.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-3 py-1 flex items-center gap-1.5">
                <TrendingDown className="h-3.5 w-3.5" />
                <span>{isVi ? "Ma Trận Cắt Giảm SaaS (Tiết Kiệm 50-80%)" : "Cut My SaaS Bill Match"}</span>
              </div>
              {matchedStacks.map((stack) => (
                <Link
                  key={stack.id}
                  href={`/${locale}/replace#${stack.id}`}
                  onClick={(e) => handleSelect(`/${locale}/replace#${stack.id}`, e)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white truncate">
                        {isVi ? stack.title.vi : stack.title.en}
                      </div>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                        {isVi ? "Tiết kiệm:" : "Saves:"} +${stack.savings.annualDollar.toLocaleString()}/yr (-{stack.savings.percentSavings}%)
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          )}

          {/* 2. Standard Tool Catalog Results */}
          <div className="space-y-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-3 py-1">
              {query.trim() ? (isVi ? "Công Cụ Khớp Từ Khóa" : "Catalog Tools") : (isVi ? "Công Cụ Nổi Bật Đã Kiểm Thử" : "Featured & Top Ranked")}
            </div>

            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/${locale}/tools/${tool.slug}`}
                  prefetch={true}
                  onClick={(e) => handleSelect(`/${locale}/tools/${tool.slug}`, e)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ToolLogo slug={tool.slug} name={tool.name} size="md" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors truncate">
                          {tool.name}
                        </span>
                        <span className="text-[11px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.2 rounded-full shrink-0">
                          ${tool.startingPrice}/mo
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-1 max-w-md">
                        {tool.tagline[locale]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="flex items-center text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      <Star className="h-3 w-3 fill-zinc-900 dark:fill-zinc-100 text-zinc-900 dark:text-zinc-100 mr-1" />
                      {tool.rating}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))
            ) : matchedStacks.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-400">
                {isVi ? `Không tìm thấy công cụ AI cho "${query}". Thử tìm theo chuyên mục "CRM", "video" hoặc "SEO".` : `No matching AI tools found for "${query}". Try searching by category like "video" or "SEO".`}
              </div>
            ) : null}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-400">
          <span>{isVi ? "Nhấn Esc để đóng hoặc Enter để chọn" : "Press Esc to close, Enter to open"}</span>
          <span>{TOOLS_DATA.length}+ {isVi ? "Công Cụ & Ma Trận Cắt Giảm SaaS" : "Verified AI Tools & Lean Stacks"}</span>
        </div>
      </div>
    </div>
  );
}
