import React from "react";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { Trophy, Star, ArrowRight } from "lucide-react";

interface LeaderboardProps {
  locale: Locale;
}

export function Leaderboard({ locale }: LeaderboardProps) {
  const dict = getDictionary(locale);

  // Top 3 ranked tools
  const topRanked = [...TOOLS_DATA].sort((a, b) => b.rating - a.rating).slice(0, 3);

  const medalColors = [
    { badge: "🥇 #1", bg: "from-amber-500/20 to-yellow-500/10", border: "border-amber-500/40", text: "text-amber-600 dark:text-amber-400" },
    { badge: "🥈 #2", bg: "from-slate-400/20 to-zinc-400/10", border: "border-slate-400/40", text: "text-slate-600 dark:text-slate-300" },
    { badge: "🥉 #3", bg: "from-amber-700/20 to-orange-700/10", border: "border-amber-700/40", text: "text-amber-700 dark:text-amber-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {topRanked.map((tool, idx) => {
        const medal = medalColors[idx];
        return (
          <div
            key={tool.id}
            className={`relative flex flex-col justify-between p-5 rounded-xl border bg-gradient-to-br ${medal.bg} ${medal.border} bg-card shadow-xs transition-all hover:-translate-y-0.5`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-black px-2.5 py-1 rounded-full bg-card border ${medal.border} ${medal.text}`}>
                  {medal.badge} Editor's Choice
                </span>
                <span className="flex items-center text-xs font-bold text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current mr-0.5" />
                  {tool.rating} / 5.0
                </span>
              </div>

              <h4 className="font-extrabold text-base text-foreground mb-1">
                {tool.name}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                {tool.tagline[locale]}
              </p>
            </div>

            <div className="pt-3 border-t border-border/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Starting
                </span>
                <span className="text-sm font-extrabold text-foreground">
                  ${tool.startingPrice}/mo
                </span>
              </div>
              <Link
                href={`/${locale}/tools/${tool.slug}`}
                className="inline-flex items-center text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                In-Depth Review <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
