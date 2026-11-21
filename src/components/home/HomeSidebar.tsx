import React from "react";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
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
      {/* Random Discovery Card */}
      <div className="rounded-xl border border-brand-500/30 bg-gradient-to-br from-brand-500/5 to-teal-500/10 p-5 shadow-xs">
        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Dna className="h-4 w-4" />
          <span>Random Discovery</span>
        </div>
        <h4 className="font-bold text-sm text-foreground mb-1">{randomTool.name}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {randomTool.tagline[locale]}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground">
            From ${randomTool.startingPrice}/mo
          </span>
          <Link
            href={`/${locale}/tools/${randomTool.slug}`}
            className="inline-flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            Inspect Tool <ArrowUpRight className="h-3 w-3 ml-0.5" />
          </Link>
        </div>
      </div>

      {/* Latest Verified Product Updates */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-muted-foreground mb-4">
          <Clock className="h-4 w-4 text-brand-600" />
          <span>{dict.sections.recentUpdates}</span>
        </div>
        <div className="space-y-3.5">
          {recentUpdates.map((item, idx) => (
            <div key={idx} className="border-b border-border/60 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-foreground">{item.tool}</span>
                <span className="text-[10px] text-muted-foreground">{item.date}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.update}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Verified External Community Reviews */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-muted-foreground">
            <MessageSquare className="h-4 w-4 text-amber-500" />
            <span>{dict.sections.communityReviews}</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            200+ Reviews
          </span>
        </div>
        <div className="space-y-3.5">
          {DETAILED_REVIEWS_DATASET.slice(0, 3).map((rev) => (
            <div key={rev.id} className="border-b border-border/60 pb-3 last:border-0 last:pb-0 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <Link
                  href={`/${locale}/tools/${rev.toolSlug}`}
                  className="font-bold text-foreground hover:text-brand-600 transition-colors"
                >
                  {rev.toolName}
                </Link>
                <span className="inline-flex items-center text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  <Star className="h-2.5 w-2.5 fill-current mr-0.5" />
                  {rev.rating}.0 ({rev.source.replace("_", " ")})
                </span>
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed line-clamp-2">
                "{rev.content}"
              </p>
              <div className="text-[10px] text-muted-foreground/80 flex items-center justify-between">
                <span>By {rev.author}</span>
                <span className="text-emerald-600 font-semibold">Verified</span>
              </div>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/reviews`}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-xs font-bold text-brand-600 dark:text-brand-400 transition-colors"
        >
          <span>{locale === "vi" ? "Xem toàn bộ 200+ đánh giá thực tế" : "Explore All 200+ Verified Reviews"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Popular Tags with Counts */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">
          <Tag className="h-4 w-4 text-brand-600" />
          <span>{dict.sections.quickFilter}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.map((tag) => (
            <Link
              key={tag.name}
              href={`/${locale}/tools?tag=${encodeURIComponent(tag.name)}`}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-secondary hover:bg-brand-500/10 hover:text-brand-600 transition-colors text-foreground"
            >
              <span>{tag.name}</span>
              <span className="text-[10px] text-muted-foreground font-semibold">({tag.count})</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
