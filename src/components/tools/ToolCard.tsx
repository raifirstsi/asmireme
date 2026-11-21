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
    <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-md">
      <div>
        {/* Top Header: Logo Initial + Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-teal-500/20 text-brand-700 dark:text-brand-300 font-black text-lg border border-brand-500/20">
              {tool.name.charAt(0)}
            </div>
            <div>
              <Link
                href={`/${locale}/tools/${tool.slug}`}
                prefetch={true}
                className="font-bold text-base text-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors line-clamp-1"
              >
                {tool.name}
              </Link>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="flex items-center text-xs font-bold text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current mr-0.5" />
                  {tool.rating}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  ({tool.reviewCount.toLocaleString()})
                </span>
                <span className="text-muted-foreground/40">•</span>
                <span className="inline-flex items-center text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  <ShieldCheck className="h-3 w-3 mr-0.5" />
                  {dict.cards.verified}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {tool.tagline[locale]}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
          {tool.hasFreePlan && (
            <span className="text-[10px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md">
              Free Plan
            </span>
          )}
          {tool.hasFreeTrial && (
            <span className="text-[10px] font-medium bg-blue-500/10 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md">
              {tool.trialDays}d Trial
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Pricing & Action Buttons */}
      <div className="pt-3 border-t border-border flex items-center justify-between gap-2 mt-auto">
        <div>
          <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
            {dict.cards.startingFrom}
          </span>
          <span className="text-base font-extrabold text-foreground">
            ${tool.startingPrice}
            <span className="text-xs font-normal text-muted-foreground">
              {dict.cards.perMonth}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/${locale}/tools/${tool.slug}`}
            prefetch={true}
            className="inline-flex items-center justify-center h-8 px-3 text-xs font-semibold rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
          >
            {dict.cards.viewDetails}
          </Link>
          <a
            href={`/go/${tool.slug}`}
            target="_blank"
            rel="nofollow sponsored"
            className="inline-flex items-center justify-center h-8 px-3 text-xs font-bold rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-xs"
          >
            <span>{dict.cards.visitSite}</span>
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
