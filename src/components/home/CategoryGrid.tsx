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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
      {CATEGORY_HUBS.map((hub) => (
        <Link
          key={hub.slug}
          href={`/${locale}/categories/${hub.slug}`}
          className="group relative flex flex-col justify-between p-4.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
        >
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-200 border border-zinc-200/50 dark:border-zinc-700/50">
              {getIcon(hub.iconName)}
            </div>
            {hub.newCount > 0 && (
              <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-200/40 dark:border-zinc-700/40">
                +{hub.newCount} new
              </span>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1 tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
              {hub.name[locale]}
            </h4>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 block font-normal">
              {hub.count} tools evaluated
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
