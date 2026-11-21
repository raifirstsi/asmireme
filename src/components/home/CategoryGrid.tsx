import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { CATEGORY_HUBS } from "@/data/categories-data";
import { 
  Video, Mic, FileText, ShieldAlert, Presentation, 
  Clock, Headphones, Sparkles, Layout, Cpu 
} from "lucide-react";

interface CategoryGridProps {
  locale: Locale;
}

export function CategoryGrid({ locale }: CategoryGridProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Video": return <Video className="h-5 w-5" />;
      case "Mic": return <Mic className="h-5 w-5" />;
      case "FileText": return <FileText className="h-5 w-5" />;
      case "ShieldAlert": return <ShieldAlert className="h-5 w-5" />;
      case "Presentation": return <Presentation className="h-5 w-5" />;
      case "Clock": return <Clock className="h-5 w-5" />;
      case "Headphones": return <Headphones className="h-5 w-5" />;
      case "Sparkles": return <Sparkles className="h-5 w-5" />;
      case "Layout": return <Layout className="h-5 w-5" />;
      default: return <Cpu className="h-5 w-5" />;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
      {CATEGORY_HUBS.map((hub) => (
        <Link
          key={hub.slug}
          href={`/${locale}/categories/${hub.slug}`}
          className="group relative flex flex-col justify-between p-4 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/70 hover:bg-zinc-50/80 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-650 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 group-hover:scale-105 transition-all duration-200 border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs">
              {getIcon(hub.iconName)}
            </div>
            {hub.newCount > 0 && (
              <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-200/80 dark:border-zinc-700">
                +{hub.newCount} new
              </span>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1 tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
              {hub.name[locale]}
            </h4>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 block font-normal">
              {hub.count} tools evaluated
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
