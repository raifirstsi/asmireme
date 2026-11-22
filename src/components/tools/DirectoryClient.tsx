"use client";

import React, { useState, useMemo, useEffect, useRef, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();

  // URL state
  const selectedHub = searchParams.get("hub") || "all";
  const selectedPriceTier = searchParams.get("price") || "all";
  const freePlanOnly = searchParams.get("freePlan") === "true";
  const freeTrialOnly = searchParams.get("freeTrial") === "true";
  const sortBy = searchParams.get("sort") || "rating";
  const searchQuery = searchParams.get("q") || "";

  // Local filter states for instant response
  const [query, setQuery] = useState(searchQuery);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync external URL param changes to local query
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  // Helper to push updated search params non-blockingly
  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "all" || value === "" || value === "false") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      updateParams({ q: val.trim() ? val : null });
    }, 250);
  };

  const clearAllFilters = () => {
    setQuery("");
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
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
          const matchTagline = tool.tagline[locale]?.toLowerCase().includes(q);
          const matchDesc = tool.description[locale]?.toLowerCase().includes(q);
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
      {/* Search & Top Action Bar - Apple Minimalist */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder={locale === "vi" ? `Tìm nhanh ${initialTools.length} công cụ AI...` : `Search across all ${initialTools.length} AI tools...`}
            className="w-full h-10 pl-10 pr-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141415] text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 shadow-2xs"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                updateParams({ q: null });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-black dark:hover:text-white active:scale-95 transition-colors"
              aria-label="Clear search input"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
          <span className="text-xs font-medium text-zinc-400 hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="h-10 px-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141415] text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 cursor-pointer shadow-2xs"
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
              className="flex items-center gap-1.5 h-10 px-3.5 text-xs font-medium rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors active:scale-95 cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="h-3 w-3 text-zinc-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Filter Chips & Pills - Apple Pill Aesthetic */}
      <div className="space-y-3">
        {/* Hub Category Pills with Smooth Touch Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
          <button
            onClick={() => updateParams({ hub: "all" })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight shrink-0 transition-all cursor-pointer active:scale-95 ${
              selectedHub === "all"
                ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                : "bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            All Categories ({initialTools.length})
          </button>
          {CATEGORY_HUBS.map((hub) => (
            <button
              key={hub.slug}
              onClick={() => updateParams({ hub: hub.slug })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight shrink-0 transition-all cursor-pointer active:scale-95 ${
                selectedHub === hub.slug
                  ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                  : "bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {hub.name[locale]} ({hub.count})
            </button>
          ))}
        </div>

        {/* Secondary Filter Badges: Price & Trials */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-400 font-medium text-[11px] uppercase tracking-wider">
            Filter:
          </span>
          <button
            onClick={() => updateParams({ price: selectedPriceTier === "free" ? null : "free" })}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer active:scale-95 ${
              selectedPriceTier === "free"
                ? "bg-black text-white dark:bg-white dark:text-black font-semibold"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            Has Free Plan
          </button>
          <button
            onClick={() => updateParams({ price: selectedPriceTier === "under20" ? null : "under20" })}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer active:scale-95 ${
              selectedPriceTier === "under20"
                ? "bg-black text-white dark:bg-white dark:text-black font-semibold"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            Under $20/mo
          </button>
          <button
            onClick={() => updateParams({ price: selectedPriceTier === "under50" ? null : "under50" })}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer active:scale-95 ${
              selectedPriceTier === "under50"
                ? "bg-black text-white dark:bg-white dark:text-black font-semibold"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            Under $50/mo
          </button>
          <button
            onClick={() => updateParams({ price: selectedPriceTier === "50plus" ? null : "50plus" })}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer active:scale-95 ${
              selectedPriceTier === "50plus"
                ? "bg-black text-white dark:bg-white dark:text-black font-semibold"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            $50+/mo
          </button>

          <span className="text-zinc-300 dark:text-zinc-700 mx-0.5">•</span>

          <button
            onClick={() => updateParams({ freeTrial: freeTrialOnly ? null : "true" })}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer active:scale-95 ${
              freeTrialOnly
                ? "bg-black text-white dark:bg-white dark:text-black font-semibold"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            }`}
          >
            Free Trial Available
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Showing {filteredTools.length} of {initialTools.length} tools
        </span>
        {isPending && (
          <span className="text-xs font-medium text-brand-600 animate-pulse">
            Updating...
          </span>
        )}
      </div>

      {/* Grid of Tool Cards */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-3 bg-card border border-border rounded-2xl p-8">
          <p className="text-base font-bold text-foreground">
            No AI tools match your current filter criteria.
          </p>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Try resetting your price filter or searching for another keyword to discover verified software.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
