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
    <div className="w-full bg-zinc-50/60 dark:bg-zinc-900/40 border-y border-zinc-200/80 dark:border-zinc-800/80 py-2.5 overflow-hidden select-none">
      <div className="flex w-max animate-marquee space-x-5 items-center">
        {tools.map((tool, idx) => (
          <Link
            key={`${tool.id}-${idx}`}
            href={`/${locale}/tools/${tool.slug}`}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#141415] border border-zinc-200/60 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all text-xs font-medium text-zinc-800 dark:text-zinc-200 shrink-0 group shadow-2xs"
          >
            <div className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-[9px] border border-zinc-200/40 dark:border-zinc-700/40">
              {tool.name.charAt(0)}
            </div>
            <span className="group-hover:text-black dark:group-hover:text-white transition-colors">
              {tool.name}
            </span>
            <span className="text-[10px] text-zinc-400 font-normal">
              ${tool.startingPrice}/mo
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
