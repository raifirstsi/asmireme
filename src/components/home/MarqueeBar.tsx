import React from "react";
import Link from "next/link";
import { TOOLS_DATA } from "@/data/tools-data";
import { Locale } from "@/lib/i18n";
import { ToolLogo } from "@/components/common/ToolLogo";

interface MarqueeBarProps {
  locale: Locale;
}

export function MarqueeBar({ locale }: MarqueeBarProps) {
  // Take 25 tools duplicated for a continuous seamless loop
  const tools = [...TOOLS_DATA.slice(0, 25), ...TOOLS_DATA.slice(0, 25)];

  return (
    <div className="w-full bg-zinc-50/50 dark:bg-zinc-950/50 border-y border-zinc-200/80 dark:border-zinc-800/80 py-3 overflow-hidden select-none relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee space-x-4 items-center">
        {tools.map((tool, idx) => (
          <Link
            key={`${tool.id}-${idx}`}
            href={`/${locale}/tools/${tool.slug}`}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all text-xs font-medium text-zinc-800 dark:text-zinc-200 shrink-0 group shadow-2xs hover:-translate-y-0.5"
          >
            <ToolLogo slug={tool.slug} name={tool.name} size="xs" className="rounded-none !border-0 !p-0.5" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
              {tool.name}
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">
              ${tool.startingPrice}/mo
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
