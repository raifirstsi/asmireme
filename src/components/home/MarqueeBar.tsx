import React from "react";
import Link from "next/link";
import { TOOLS_DATA } from "@/data/tools-data";
import { Locale } from "@/lib/i18n";
import { Sparkles } from "lucide-react";

interface MarqueeBarProps {
  locale: Locale;
}

export function MarqueeBar({ locale }: MarqueeBarProps) {
  // Take 25 tools duplicated for a continuous seamless loop
  const tools = [...TOOLS_DATA.slice(0, 25), ...TOOLS_DATA.slice(0, 25)];

  return (
    <div className="w-full bg-secondary/50 border-y border-border py-3 overflow-hidden select-none">
      <div className="flex w-max animate-marquee space-x-6 items-center">
        {tools.map((tool, idx) => (
          <Link
            key={`${tool.id}-${idx}`}
            href={`/${locale}/tools/${tool.slug}`}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-card/80 border border-border/60 hover:border-brand-500/60 hover:bg-card transition-all text-xs font-semibold text-foreground/90 shrink-0 group"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold text-[10px]">
              {tool.name.charAt(0)}
            </div>
            <span className="group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {tool.name}
            </span>
            <span className="text-[10px] text-muted-foreground font-normal">
              ${tool.startingPrice}/mo
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
