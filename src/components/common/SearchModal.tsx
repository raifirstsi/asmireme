"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { Search, X, Star, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export function SearchModal({ isOpen, onClose, locale }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-background/80 backdrop-blur-sm animate-in fade-in-0 duration-200">
      <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={locale === "vi" ? "Tìm kiếm công cụ, tính năng, chuyên mục..." : "Search tools, features, categories..."}
            className="w-full h-14 bg-transparent px-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 py-1">
            {query.trim() ? "Search Results" : "Featured & Top Ranked"}
          </div>

          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/${locale}/tools/${tool.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/70 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 font-extrabold text-sm border border-brand-500/20">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground group-hover:text-brand-600 transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        ${tool.startingPrice}/mo
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                      {tool.tagline[locale]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center text-xs font-semibold text-amber-500">
                    <Star className="h-3 w-3 fill-current mr-0.5" />
                    {tool.rating}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No matching AI tools found for "{query}". Try searching by category like "video" or "SEO".
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-t border-border text-[11px] text-muted-foreground">
          <span>Use <strong>Esc</strong> to close</span>
          <span>50 Verified AI Tools Indexed</span>
        </div>
      </div>
    </div>
  );
}
