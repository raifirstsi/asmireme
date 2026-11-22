"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, CheckCircle, AlertTriangle, ExternalLink, ShieldAlert, Sparkles, FileText, Info } from "lucide-react";
import { ContentBenchmarkItem } from "@/data/benchmarks-data";
import { Locale } from "@/lib/i18n";

interface ContentBenchmarkCardProps {
  item: ContentBenchmarkItem;
  locale: Locale;
}

export function ContentBenchmarkCard({ item, locale }: ContentBenchmarkCardProps) {
  const isVi = locale === "vi";
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);

  // Originality.ai detection score visual color
  const isHumanLike = item.metrics.originalityAiDetectionPct <= 25;
  const isModerateAi = item.metrics.originalityAiDetectionPct > 25 && item.metrics.originalityAiDetectionPct <= 75;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
        item.isWinner
          ? "bg-[#12141a] border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.08)] ring-1 ring-emerald-500/20"
          : "bg-[#141417] border-zinc-800/80 hover:border-zinc-700/80"
      }`}
    >
      {/* Top Banner / Verdict */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-zinc-800/50">
        <div className="flex items-center gap-2">
          {item.isWinner ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Award className="h-3 w-3" />
              {isVi ? item.verdictBadge.vi : item.verdictBadge.en}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
              Rank #{item.rank} • {isVi ? item.verdictBadge.vi : item.verdictBadge.en}
            </span>
          )}
        </div>
        <span className="text-[11px] font-mono text-zinc-500">
          {item.metrics.generationSpeedSeconds}s • {item.metrics.costPer1kWords}
        </span>
      </div>

      {/* Main Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-lg font-semibold text-white tracking-tight">{item.name}</h3>
            <span className="text-xs font-mono text-zinc-400">
              {item.metrics.costPer1kWords}
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed mb-4">
            {isVi ? item.keyTakeaway.vi : item.keyTakeaway.en}
          </p>

          {/* Originality.ai Detection Radar Pill */}
          <div className="rounded-xl bg-black/60 border border-zinc-800/80 p-3.5 mb-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="flex items-center gap-1.5 font-mono text-zinc-400">
                <ShieldAlert className="h-3.5 w-3.5 text-zinc-400" />
                Originality.ai Detection
              </span>
              <span
                className={`font-mono font-bold ${
                  isHumanLike
                    ? "text-emerald-400"
                    : isModerateAi
                    ? "text-amber-400"
                    : "text-rose-400"
                }`}
              >
                {item.metrics.originalityAiDetectionPct}% AI Footprint
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${item.metrics.originalityAiDetectionPct}%` }}
                className={`h-full transition-all duration-500 ${
                  isHumanLike
                    ? "bg-emerald-500"
                    : isModerateAi
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
              />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1.5">
              <span>0% (100% Human)</span>
              <span>100% (Pure AI)</span>
            </div>
          </div>

          {/* Interactive Semantic Text Excerpt with Hover Annotations */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                {isVi ? "Đoạn trích thực nghiệm đã phân tích" : "Annotated Output Excerpt"}
              </span>
              <span className="text-[10px] text-zinc-500 italic">
                {isVi ? "Chạm vào đoạn tô màu để xem giải thích" : "Tap colored text for notes"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs leading-relaxed text-zinc-300">
              {item.generatedTextSegments.map((segment, sIdx) => {
                if (segment.type === "factual") {
                  return (
                    <span
                      key={sIdx}
                      onClick={() =>
                        setActiveAnnotation(
                          activeAnnotation === segment.text
                            ? null
                            : isVi
                            ? segment.annotation?.vi || ""
                            : segment.annotation?.en || ""
                        )
                      }
                      className="bg-emerald-950/60 text-emerald-200 border-b border-emerald-500/60 px-1 py-0.5 rounded cursor-pointer hover:bg-emerald-900/50 transition-colors"
                      title={isVi ? segment.annotation?.vi : segment.annotation?.en}
                    >
                      {segment.text}
                    </span>
                  );
                }
                if (segment.type === "fluff") {
                  return (
                    <span
                      key={sIdx}
                      onClick={() =>
                        setActiveAnnotation(
                          activeAnnotation === segment.text
                            ? null
                            : isVi
                            ? segment.annotation?.vi || ""
                            : segment.annotation?.en || ""
                        )
                      }
                      className="bg-amber-950/50 text-amber-200 border-b border-amber-500/60 px-1 py-0.5 rounded cursor-pointer hover:bg-amber-900/40 transition-colors"
                      title={isVi ? segment.annotation?.vi : segment.annotation?.en}
                    >
                      {segment.text}
                    </span>
                  );
                }
                if (segment.type === "hallucination") {
                  return (
                    <span
                      key={sIdx}
                      onClick={() =>
                        setActiveAnnotation(
                          activeAnnotation === segment.text
                            ? null
                            : isVi
                            ? segment.annotation?.vi || ""
                            : segment.annotation?.en || ""
                        )
                      }
                      className="bg-rose-950/60 text-rose-200 border-b border-rose-500/60 px-1 py-0.5 rounded cursor-pointer hover:bg-rose-900/50 transition-colors"
                      title={isVi ? segment.annotation?.vi : segment.annotation?.en}
                    >
                      {segment.text}
                    </span>
                  );
                }
                return <span key={sIdx}>{segment.text}</span>;
              })}
            </div>

            {/* Active Annotation Display Box */}
            {activeAnnotation && (
              <div className="mt-2 p-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-[11px] text-zinc-300 flex items-start gap-2">
                <Info className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <p>{activeAnnotation}</p>
              </div>
            )}
          </div>

          {/* Quantitative Radar & Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                {isVi ? "Độ sâu dữ liệu SERP" : "SERP Factual Depth"}
              </span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                {item.metrics.factualSerpDepthScore}{" "}
                <span className="text-xs font-normal text-zinc-400">/ 10</span>
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
              <span className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                {isVi ? "Tỷ lệ ảo giác (Hallucination)" : "Hallucination Rate"}
              </span>
              <span
                className={`text-base font-bold font-mono ${
                  item.metrics.hallucinationRatePct < 2
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                {item.metrics.hallucinationRatePct}%
              </span>
            </div>
          </div>

          {/* Key Pros */}
          <div className="space-y-1.5 mb-5 text-xs text-zinc-300">
            {(isVi ? item.pros.vi : item.pros.en).map((pro, pIdx) => (
              <div key={pIdx} className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{pro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate Outbound CTA */}
        <Link
          href={item.affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${
            item.isWinner
              ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20"
              : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
          }`}
        >
          <span>
            {isVi ? `Dùng thử ${item.name.split(" ")[0]} Miễn Phí` : `Try ${item.name.split(" ")[0]} Free`}
          </span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
