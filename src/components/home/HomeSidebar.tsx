import React from "react";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { ToolLogo } from "@/components/common/ToolLogo";
import { Sparkles, Dna, Clock, MessageSquare, Tag, ArrowUpRight, Star, ArrowRight } from "lucide-react";
import { DETAILED_REVIEWS_DATASET } from "@/data/reviews-dataset";

interface HomeSidebarProps {
  locale: Locale;
}

export function HomeSidebar({ locale }: HomeSidebarProps) {
  const dict = getDictionary(locale);

  // Pick a random discovery tool
  const randomTool = TOOLS_DATA[Math.floor(Math.random() * TOOLS_DATA.length)] || TOOLS_DATA[0];

  const recentUpdates = [
    { tool: "ElevenLabs", update: "Added conversational AI agent studio & multi-speaker dubbing.", date: "Nov 20, 2026" },
    { tool: "CapCut", update: "Rolled out automatic 4K 60fps AI video upscaler.", date: "Nov 18, 2026" },
    { tool: "HighLevel", update: "Launched custom white-label AI voice telephony receptionist.", date: "Nov 15, 2026" },
    { tool: "Koala AI", update: "Integrated live Google SERP grounding for 2026 search updates.", date: "Nov 12, 2026" },
  ];

  const externalReviews = [
    { tool: "HighLevel", source: "G2 Verified", rating: 4.8, count: "3,420+", text: "Replaced 6 different subscriptions for our 20-person agency. The ROI was immediate." },
    { tool: "ElevenLabs", source: "Product Hunt", rating: 4.9, count: "8,900+", text: "The vocal inflection is completely indistinguishable from human voice actors." },
    { tool: "Reclaim.ai", source: "Reddit r/productivity", rating: 4.8, count: "1,890+", text: "Saved my engineering team roughly 6 hours of fragmented calendar blocks every single week." },
  ];

  const popularTags = [
    { name: "CRM", count: 5 },
    { name: "Video Generation", count: 9 },
    { name: "SEO Writing", count: 8 },
    { name: "Voice Synthesis", count: 5 },
    { name: "Presentations", count: 4 },
    { name: "AI Detectors", count: 3 },
    { name: "Transcripts", count: 5 },
    { name: "No-Code", count: 6 },
  ];

  return (
    <aside className="space-y-6">
      {/* Random Discovery Card - Apple Monochrome Refinement */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 p-5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-semibold text-[11px] uppercase tracking-wider mb-3">
          <Dna className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
          <span>Featured Discovery</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <ToolLogo slug={randomTool.slug} name={randomTool.name} size="md" />
          <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 tracking-tight">{randomTool.name}</h4>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3.5">
          {randomTool.tagline[locale]}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            From ${randomTool.startingPrice}/mo
          </span>
          <Link
            href={`/${locale}/tools/${randomTool.slug}`}
            className="inline-flex items-center text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white group"
          >
            <span>Inspect Tool</span>
            <ArrowUpRight className="h-3 w-3 ml-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Latest Verified Product Updates */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] p-5 shadow-2xs">
        <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wider text-zinc-400 mb-4">
          <Clock className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
          <span>{dict.sections.recentUpdates}</span>
        </div>
        <div className="space-y-3.5">
          {recentUpdates.map((item, idx) => (
            <div key={idx} className="border-b border-zinc-100 dark:border-zinc-800 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.tool}</span>
                <span className="text-[10px] text-zinc-400">{item.date}</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.update}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Verified External Community Reviews */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-semibold text-xs uppercase tracking-wider text-zinc-400">
            <MessageSquare className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
            <span>{dict.sections.communityReviews}</span>
          </div>
          <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-200/50 dark:border-zinc-700/50">
            200+ Reviews
          </span>
        </div>
        <div className="space-y-3.5">
          {DETAILED_REVIEWS_DATASET.slice(0, 3).map((rev) => (
            <div key={rev.id} className="border-b border-zinc-100 dark:border-zinc-800 pb-3 last:border-0 last:pb-0 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <Link
                  href={`/${locale}/tools/${rev.toolSlug}`}
                  className="font-semibold text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white transition-colors"
                >
                  {rev.toolName}
                </Link>
                <span className="inline-flex items-center text-[10px] font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                  <Star className="h-2.5 w-2.5 fill-current mr-0.5 text-zinc-800 dark:text-zinc-200" />
                  {rev.rating}.0 ({rev.source.replace("_", " ")})
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 italic leading-relaxed line-clamp-2">
                "{rev.content}"
              </p>
              <div className="text-[10px] text-zinc-400 flex items-center justify-between">
                <span>By {rev.author}</span>
                <span className="text-zinc-600 dark:text-zinc-300 font-medium">Verified</span>
              </div>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/reviews`}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-colors"
        >
          <span>{locale === "vi" ? "Xem toàn bộ 200+ đánh giá thực tế" : "Explore All 200+ Verified Reviews"}</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Popular Tags with Counts */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] p-5 shadow-2xs">
        <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wider text-zinc-400 mb-3">
          <Tag className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
          <span>{dict.sections.quickFilter}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.map((tag) => (
            <Link
              key={tag.name}
              href={`/${locale}/tools?tag=${encodeURIComponent(tag.name)}`}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors text-zinc-800 dark:text-zinc-200 border border-zinc-200/40 dark:border-zinc-750"
            >
              <span>{tag.name}</span>
              <span className="text-[10px] text-zinc-400 font-medium">({tag.count})</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
