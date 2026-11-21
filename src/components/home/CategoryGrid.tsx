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
          className="group relative flex flex-col justify-between p-4 rounded-xl border border-border bg-card hover:bg-secondary/40 hover:border-brand-500/40 transition-all duration-200 shadow-xs hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
              {getIcon(hub.iconName)}
            </div>
            {hub.newCount > 0 && (
              <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded-full">
                +{hub.newCount} new
              </span>
            )}
          </div>

          <div>
            <h4 className="font-bold text-xs sm:text-sm text-foreground line-clamp-1 group-hover:text-brand-600 transition-colors">
              {hub.name[locale]}
            </h4>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">
              {hub.count} tools evaluated
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
