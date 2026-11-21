import React from "react";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { ToolLogo } from "@/components/common/ToolLogo";
import { Trophy, Star, ArrowRight } from "lucide-react";

interface LeaderboardProps {
  locale: Locale;
}

export function Leaderboard({ locale }: LeaderboardProps) {
  const dict = getDictionary(locale);

  // Top 3 ranked tools
  const topRanked = [...TOOLS_DATA].sort((a, b) => b.rating - a.rating).slice(0, 3);

  const medalColors = [
    { badge: "#1 Choice", border: "border-zinc-300 dark:border-zinc-700", bg: "bg-zinc-50/50 dark:bg-zinc-900/40" },
    { badge: "#2 Choice", border: "border-zinc-200 dark:border-zinc-800", bg: "bg-white dark:bg-[#141415]" },
    { badge: "#3 Choice", border: "border-zinc-200 dark:border-zinc-800", bg: "bg-white dark:bg-[#141415]" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {topRanked.map((tool, idx) => {
        const medal = medalColors[idx];
        return (
          <div
            key={tool.id}
            className={`relative flex flex-col justify-between p-5 rounded-2xl border ${medal.border} ${medal.bg} shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600`}
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  {medal.badge}
                </span>
                <span className="flex items-center text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  <Star className="h-3 w-3 fill-zinc-900 dark:fill-zinc-100 text-zinc-900 dark:text-zinc-100 mr-1" />
                  {tool.rating} / 5.0
                </span>
              </div>

              <div className="flex items-center gap-3 mb-2.5">
                <ToolLogo slug={tool.slug} name={tool.name} size="md" />
                <h4 className="font-semibold text-base text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {tool.name}
                </h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                {tool.tagline[locale]}
              </p>
            </div>

            <div className="pt-3.5 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-semibold text-zinc-400 block tracking-wider">
                  Starting
                </span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  ${tool.startingPrice}/mo
                </span>
              </div>
              <Link
                href={`/${locale}/tools/${tool.slug}`}
                className="inline-flex items-center text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white group"
              >
                <span>In-Depth Review</span>
                <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
