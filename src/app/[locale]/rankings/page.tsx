import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { ToolLogo } from "@/components/common/ToolLogo";
import { Trophy, Star, ArrowRight, ShieldCheck } from "lucide-react";

interface RankingsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: RankingsPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return {
    title: isVi ? "Bảng Xếp Hạng 50 Công Cụ AI SaaS (Tuần & Tháng) — Asmire" : "Top 50 AI SaaS Software Rankings & Leaderboard — Asmire",
    description: "Weekly and monthly rankings of verified AI software ranked by objective benchmark scores.",
  };
}

export default async function RankingsPage({ params }: RankingsPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  // Sort tools by rating descending
  const ranked = [...TOOLS_DATA].sort((a, b) => b.rating - a.rating);

  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider">
            <Trophy className="h-4 w-4" />
            <span>Leaderboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "Bảng Xếp Hạng Công Cụ AI SaaS 2027" : "AI SaaS Software Leaderboard (2027)"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isVi
              ? "Bảng xếp hạng độc lập tính điểm dựa trên 5 tiêu chí: Tính năng cốt lõi (25%), Giá trị sử dụng (25%), Độ dễ dùng (20%), Độ ổn định & tốc độ (15%), Khả năng tích hợp (15%)."
              : "Rankings calculated from our 5-pillar rubric: Features (25%), Value (25%), Usability (20%), Speed/Uptime (15%), and Integrations (15%)."}
          </p>
        </div>

        {/* Ranked Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs">
          <div className="divide-y divide-border">
            {ranked.map((tool, idx) => (
              <div
                key={tool.id}
                className="flex items-center justify-between p-4 sm:p-5 hover:bg-secondary/40 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-secondary font-black text-xs sm:text-sm text-foreground shrink-0">
                    #{idx + 1}
                  </span>
                  <ToolLogo slug={tool.slug} name={tool.name} size="md" />
                  <div>
                    <Link
                      href={`/${locale}/tools/${tool.slug}`}
                      className="font-bold text-sm sm:text-base text-foreground hover:text-brand-600 transition-colors"
                    >
                      {tool.name}
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>From ${tool.startingPrice}/mo</span>
                      <span>•</span>
                      <span className="flex items-center text-amber-500 font-bold">
                        <Star className="h-3 w-3 fill-current mr-0.5" />
                        {tool.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/tools/${tool.slug}`}
                    className="inline-flex items-center justify-center h-8 px-3 text-xs font-semibold rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                  >
                    Review
                  </Link>
                  <a
                    href={`/go/${tool.slug}`}
                    target="_blank"
                    rel="nofollow sponsored"
                    className="inline-flex items-center justify-center h-8 px-3 text-xs font-bold rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-colors"
                  >
                    Visit
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
