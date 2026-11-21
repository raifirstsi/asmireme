import React from "react";
import Link from "next/link";
import { ToolItem } from "@/types";
import { Locale, getDictionary } from "@/lib/i18n";
import { Star, ExternalLink, ShieldCheck } from "lucide-react";

interface ToolCardProps {
  tool: ToolItem;
  locale: Locale;
}

export function ToolCard({ tool, locale }: ToolCardProps) {
  const dict = getDictionary(locale);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600">
      <div>
        {/* Top Header: Logo Initial + Badges */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-base border border-zinc-200/60 dark:border-zinc-700/60 shadow-xs">
              {tool.name.charAt(0)}
            </div>
            <div>
              <Link
                href={`/${locale}/tools/${tool.slug}`}
                prefetch={true}
                className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white transition-colors line-clamp-1 tracking-tight"
              >
                {tool.name}
              </Link>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="flex items-center text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <Star className="h-3 w-3 fill-zinc-900 dark:fill-zinc-100 text-zinc-900 dark:text-zinc-100 mr-1" />
                  {tool.rating}
                </span>
                <span className="text-[11px] text-zinc-400">
                  ({tool.reviewCount.toLocaleString()})
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="inline-flex items-center text-[10px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="h-2.5 w-2.5 mr-1 text-zinc-700 dark:text-zinc-300" />
                  {dict.cards.verified}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4 font-normal">
          {tool.tagline[locale]}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium bg-zinc-100 dark:bg-zinc-850 text-zinc-600 dark:text-zinc-400 px-2.5 py-0.5 rounded-full border border-zinc-200/50 dark:border-zinc-800"
            >
              {tag}
            </span>
          ))}
          {tool.hasFreePlan && (
            <span className="text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2.5 py-0.5 rounded-full">
              Free Plan
            </span>
          )}
          {tool.hasFreeTrial && (
            <span className="text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2.5 py-0.5 rounded-full">
              {tool.trialDays}d Trial
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Pricing & Action Buttons */}
      <div className="pt-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2 mt-auto">
        <div>
          <span className="text-[9px] uppercase font-semibold text-zinc-400 block tracking-wider">
            {dict.cards.startingFrom}
          </span>
          <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
            ${tool.startingPrice}
            <span className="text-[11px] font-normal text-zinc-400 ml-0.5">
              {dict.cards.perMonth}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/${locale}/tools/${tool.slug}`}
            prefetch={true}
            className="inline-flex items-center justify-center h-7.5 px-3 text-xs font-medium rounded-full bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
          >
            {dict.cards.viewDetails}
          </Link>
          <a
            href={`/go/${tool.slug}`}
            target="_blank"
            rel="nofollow sponsored"
            className="inline-flex items-center justify-center h-7.5 px-3.5 text-xs font-medium rounded-full bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black transition-all shadow-xs"
          >
            <span>{dict.cards.visitSite}</span>
            <ExternalLink className="h-2.5 w-2.5 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
