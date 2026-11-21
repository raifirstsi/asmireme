"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { ToolLogo } from "@/components/common/ToolLogo";
import { Search, X, Star, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export function SearchModal({ isOpen, onClose, locale }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll on mobile and desktop
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTools = query.trim()
    ? TOOLS_DATA.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
          t.tagline[locale].toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : TOOLS_DATA.slice(0, 6);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl bg-white dark:bg-[#151516] border border-zinc-200/90 dark:border-zinc-700/70 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar - Apple Spotlight Style */}
        <div className="flex items-center px-4 h-13 border-b border-zinc-100 dark:border-zinc-800">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={locale === "vi" ? "Tìm kiếm công cụ, tính năng, chuyên mục..." : "Search tools, features, categories..."}
            className="w-full h-full bg-transparent px-3 text-sm sm:text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none tracking-tight"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-3 py-1">
            {query.trim() ? "Search Results" : "Featured & Top Ranked"}
          </div>

          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/${locale}/tools/${tool.slug}`}
                prefetch={true}
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <ToolLogo slug={tool.slug} name={tool.name} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-[11px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.2 rounded-full">
                        ${tool.startingPrice}/mo
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1 max-w-md">
                      {tool.tagline[locale]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    <Star className="h-3 w-3 fill-zinc-900 dark:fill-zinc-100 text-zinc-900 dark:text-zinc-100 mr-1" />
                    {tool.rating}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-zinc-400">
              No matching AI tools found for "{query}". Try searching by category like "video" or "SEO".
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-400">
          <span>Use <kbd className="px-1 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 font-mono">Esc</kbd> to close</span>
          <span>50 Verified AI Tools Indexed</span>
        </div>
      </div>
    </div>
  );
}
