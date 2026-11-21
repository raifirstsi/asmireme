"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ToolItem } from "@/types";
import { Locale, getDictionary } from "@/lib/i18n";
import { ToolCard } from "@/components/tools/ToolCard";
import { CATEGORY_HUBS } from "@/data/categories-data";
import { 
  Filter, Search, SlidersHorizontal, ArrowUpDown, 
  Check, RotateCcw, X, Sparkles, Plus, Layers
} from "lucide-react";

interface DirectoryClientProps {
  initialTools: ToolItem[];
  locale: Locale;
}

export function DirectoryClient({ initialTools, locale }: DirectoryClientProps) {
  const dict = getDictionary(locale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state
  const selectedHub = searchParams.get("hub") || "all";
  const selectedPriceTier = searchParams.get("price") || "all";
  const freePlanOnly = searchParams.get("freePlan") === "true";
  const freeTrialOnly = searchParams.get("freeTrial") === "true";
  const sortBy = searchParams.get("sort") || "rating";
  const searchQuery = searchParams.get("q") || "";

  // Local filter states
  const [query, setQuery] = useState(searchQuery);

  // Helper to push updated search params
  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "all" || value === "" || value === "false") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    setQuery("");
    router.push(pathname, { scroll: false });
  };

  // Filtered & Sorted Tools Memo
  const filteredTools = useMemo(() => {
    return initialTools
      .filter((tool) => {
        // Hub filter
        if (selectedHub !== "all" && !tool.hubs.includes(selectedHub as any)) {
          return false;
        }
        // Price tier filter
        if (selectedPriceTier === "free" && !tool.hasFreePlan) return false;
        if (selectedPriceTier === "under20" && tool.startingPrice >= 20) return false;
        if (selectedPriceTier === "under50" && tool.startingPrice >= 50) return false;
        if (selectedPriceTier === "50plus" && tool.startingPrice < 50) return false;
        // Free flags
        if (freePlanOnly && !tool.hasFreePlan) return false;
        if (freeTrialOnly && !tool.hasFreeTrial) return false;
        // Search query filter
        if (query.trim()) {
          const q = query.toLowerCase();
          const matchName = tool.name.toLowerCase().includes(q);
          const matchTags = tool.tags.some((t) => t.toLowerCase().includes(q));
          const matchTagline = tool.tagline[locale].toLowerCase().includes(q);
          const matchDesc = tool.description[locale].toLowerCase().includes(q);
          if (!matchName && !matchTags && !matchTagline && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "priceAsc") return a.startingPrice - b.startingPrice;
        if (sortBy === "priceDesc") return b.startingPrice - a.startingPrice;
        if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [initialTools, selectedHub, selectedPriceTier, freePlanOnly, freeTrialOnly, sortBy, query, locale]);

  return (
    <div className="space-y-8">
      {/* Search & Top Action Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              updateParams({ q: e.target.value });
            }}
            placeholder={locale === "vi" ? "Tìm nhanh 50 công cụ AI..." : "Search across all 50 AI tools..."}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                updateParams({ q: null });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="h-11 px-3 rounded-xl border border-border bg-card text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="rating">Highest Editorial Rating</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="reviews">Most Community Reviews</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>

          {(selectedHub !== "all" || selectedPriceTier !== "all" || freePlanOnly || freeTrialOnly || query) && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 h-11 px-3 text-xs font-semibold rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Filter Chips & Pills */}
      <div className="space-y-3">
        {/* Hub Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => updateParams({ hub: "all" })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
              selectedHub === "all"
                ? "bg-brand-600 text-white shadow-xs"
                : "bg-secondary/80 hover:bg-secondary text-foreground"
            }`}
          >
            All Categories ({initialTools.length})
          </button>
          {CATEGORY_HUBS.map((hub) => (
            <button
              key={hub.slug}
              onClick={() => updateParams({ hub: hub.slug })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                selectedHub === hub.slug
                  ? "bg-brand-600 text-white shadow-xs"
                  : "bg-secondary/80 hover:bg-secondary text-foreground"
              }`}
            >
              {hub.name[locale]} ({hub.count})
            </button>
          ))}
        </div>

        {/* Secondary Filter Badges: Price & Trials */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground font-semibold text-[11px] uppercase tracking-wider">
            Pricing Filter:
          </span>
          <button
            onClick={() => updateParams({ price: selectedPriceTier === "free" ? null : "free" })}
            className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
              selectedPriceTier === "free"
                ? "border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            Has Free Plan
          </button>
          <button
            onClick={() => updateParams({ price: selectedPriceTier === "under20" ? null : "under20" })}
            className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
              selectedPriceTier === "under20"
                ? "border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            Under $20/mo
          </button>
          <button
            onClick={() => updateParams({ price: selectedPriceTier === "under50" ? null : "under50" })}
            className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
              selectedPriceTier === "under50"
                ? "border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            Under $50/mo
          </button>
          <button
            onClick={() => updateParams({ price: selectedPriceTier === "50plus" ? null : "50plus" })}
            className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
              selectedPriceTier === "50plus"
                ? "border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            $50+/mo (Pro/Enterprise)
          </button>

          <span className="text-muted-foreground/40 mx-1">|</span>

          {/* Free Trial Toggle */}
          <button
            onClick={() => updateParams({ freeTrial: freeTrialOnly ? null : "true" })}
            className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors flex items-center gap-1 ${
              freeTrialOnly
                ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {freeTrialOnly && <Check className="h-3 w-3" />}
            <span>Free Trial Available</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/60">
        <span>Showing <strong>{filteredTools.length}</strong> of {initialTools.length} verified AI tools</span>
        <span>All prices verified for 2026</span>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} locale={locale} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="py-20 text-center rounded-2xl border border-dashed border-border bg-card p-8 space-y-3">
          <p className="text-sm font-semibold text-foreground">
            No AI tools matched your exact filter combination.
          </p>
          <p className="text-xs text-muted-foreground">
            Try resetting your price filter or expanding your category selection.
          </p>
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center justify-center h-9 px-4 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
