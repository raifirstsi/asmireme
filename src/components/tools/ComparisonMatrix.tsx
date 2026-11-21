"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToolItem } from "@/types";
import { Locale } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { ToolLogo } from "@/components/common/ToolLogo";
import { 
  Check, X, Star, ExternalLink, Plus, Trash2, 
  ArrowLeftRight, Sparkles, Share2, CheckCheck 
} from "lucide-react";

interface ComparisonMatrixProps {
  initialTools: ToolItem[];
  locale: Locale;
}

export function ComparisonMatrix({ initialTools, locale }: ComparisonMatrixProps) {
  const [selectedTools, setSelectedTools] = useState<ToolItem[]>(
    initialTools.length >= 2 ? initialTools.slice(0, 4) : [TOOLS_DATA[0], TOOLS_DATA[1]]
  );
  const [highlightDiff, setHighlightDiff] = useState(false);
  const [copied, setCopied] = useState(false);

  // Available tools to add
  const availableTools = TOOLS_DATA.filter(
    (t) => !selectedTools.some((st) => st.slug === t.slug)
  );

  const addTool = (slug: string) => {
    if (selectedTools.length >= 4) return;
    const tool = TOOLS_DATA.find((t) => t.slug === slug);
    if (tool) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const removeTool = (slug: string) => {
    if (selectedTools.length <= 2) return; // Keep at least 2 tools
    setSelectedTools(selectedTools.filter((t) => t.slug !== slug));
  };

  const copyShareLink = () => {
    const slugs = selectedTools.map((t) => t.slug).join(",");
    const url = `${window.location.origin}/${locale}/compare?tools=${slugs}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isVi = locale === "vi";

  return (
    <div className="space-y-6">
      {/* Top Toolbar: Tool Selectors + Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Comparing ({selectedTools.length}/4 tools):
          </span>
          {selectedTools.length < 4 && (
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addTool(e.target.value);
                  e.target.value = "";
                }
              }}
              defaultValue=""
              className="h-9 px-3 rounded-lg border border-border bg-secondary text-xs font-bold text-foreground focus:outline-none"
            >
              <option value="" disabled>+ Add Tool to Compare...</option>
              {availableTools.map((tool) => (
                <option key={tool.slug} value={tool.slug}>
                  {tool.name} (${tool.startingPrice}/mo)
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setHighlightDiff(!highlightDiff)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              highlightDiff
                ? "border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold"
                : "border-border bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {highlightDiff ? "✓ Highlighting Differences" : "Highlight Differences"}
          </button>

          <button
            onClick={copyShareLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-xs font-semibold text-foreground transition-colors"
          >
            {copied ? <CheckCheck className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5 text-muted-foreground" />}
            <span>{copied ? "Copied!" : "Share Comparison"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="sm:hidden flex items-center justify-center gap-1.5 py-1 text-[11px] font-medium text-zinc-400">
        <span>← {isVi ? "Vuốt ngang để so sánh tất cả công cụ" : "Swipe horizontally to compare all tools"} →</span>
      </div>

      {/* Responsive Comparison Grid / Table - Apple Minimalist */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Table Header: Tools */}
          <thead>
            <tr className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900">
              <th className="p-4 w-48 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Software Feature
              </th>
              {selectedTools.map((tool) => (
                <th key={tool.id} className="p-4 align-top w-64 border-l border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <ToolLogo slug={tool.slug} name={tool.name} size="md" />
                      <div>
                        <Link
                          href={`/${locale}/tools/${tool.slug}`}
                          className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white transition-colors line-clamp-1"
                        >
                          {tool.name}
                        </Link>
                        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                          ${tool.startingPrice}/mo
                        </span>
                      </div>
                    </div>

                    {selectedTools.length > 2 && (
                      <button
                        onClick={() => removeTool(tool.slug)}
                        className="p-1 text-zinc-400 hover:text-rose-500 rounded transition-colors"
                        title="Remove tool from comparison"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <a
                    href={`/go/${tool.slug}`}
                    target="_blank"
                    rel="nofollow sponsored"
                    className="mt-3.5 w-full inline-flex items-center justify-center h-8 text-xs font-semibold rounded-full bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black transition-all shadow-xs"
                  >
                    <span>Visit {tool.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body: Deep Comparison Metrics */}
          <tbody className="divide-y divide-border text-xs">
            {/* Editorial Score */}
            <tr className="hover:bg-secondary/30 transition-colors">
              <td className="p-4 font-bold text-muted-foreground">Editorial Rating</td>
              {selectedTools.map((tool) => (
                <td key={tool.id} className="p-4 border-l border-border">
                  <span className="inline-flex items-center gap-1 font-extrabold text-amber-500 text-sm">
                    <Star className="h-4 w-4 fill-current" />
                    {tool.rating} / 5.0
                  </span>
                  <span className="text-[11px] text-muted-foreground block mt-0.5">
                    ({tool.reviewCount.toLocaleString()} reviews)
                  </span>
                </td>
              ))}
            </tr>

            {/* Starting Price */}
            <tr className="hover:bg-secondary/30 transition-colors">
              <td className="p-4 font-bold text-muted-foreground">Starting Monthly Price</td>
              {selectedTools.map((tool) => (
                <td key={tool.id} className="p-4 border-l border-border font-extrabold text-sm text-foreground">
                  ${tool.startingPrice}/mo
                </td>
              ))}
            </tr>

            {/* Free Plan */}
            <tr className={highlightDiff ? "bg-brand-500/5 hover:bg-brand-500/10 transition-colors" : "hover:bg-secondary/30 transition-colors"}>
              <td className="p-4 font-bold text-muted-foreground">Free Plan Available</td>
              {selectedTools.map((tool) => (
                <td key={tool.id} className="p-4 border-l border-border">
                  {tool.hasFreePlan ? (
                    <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold gap-1">
                      <Check className="h-4 w-4" /> Yes (Free Plan)
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-muted-foreground gap-1">
                      <X className="h-4 w-4 text-rose-500" /> Paid Only
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Free Trial */}
            <tr className={highlightDiff ? "bg-brand-500/5 hover:bg-brand-500/10 transition-colors" : "hover:bg-secondary/30 transition-colors"}>
              <td className="p-4 font-bold text-muted-foreground">Free Trial Window</td>
              {selectedTools.map((tool) => (
                <td key={tool.id} className="p-4 border-l border-border">
                  {tool.hasFreeTrial ? (
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {tool.trialDays} Days Free Trial
                    </span>
                  ) : (
                    <span className="text-muted-foreground">No Trial</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Best For */}
            <tr className="hover:bg-secondary/30 transition-colors">
              <td className="p-4 font-bold text-muted-foreground">Ideal Target Use-Case</td>
              {selectedTools.map((tool) => (
                <td key={tool.id} className="p-4 border-l border-border text-foreground/90 leading-relaxed">
                  {tool.verdict.bestFor[locale]}
                </td>
              ))}
            </tr>

            {/* Not For */}
            <tr className="hover:bg-secondary/30 transition-colors">
              <td className="p-4 font-bold text-muted-foreground">Who Should Avoid It</td>
              {selectedTools.map((tool) => (
                <td key={tool.id} className="p-4 border-l border-border text-rose-600 dark:text-rose-400 leading-relaxed">
                  {tool.verdict.notFor[locale]}
                </td>
              ))}
            </tr>

            {/* Key Advantages */}
            <tr className="hover:bg-secondary/30 transition-colors">
              <td className="p-4 font-bold text-muted-foreground">Top Pros</td>
              {selectedTools.map((tool) => (
                <td key={tool.id} className="p-4 border-l border-border">
                  <ul className="space-y-1 text-muted-foreground">
                    {tool.pros[locale].map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Documented Limitations */}
            <tr className="hover:bg-secondary/30 transition-colors">
              <td className="p-4 font-bold text-muted-foreground">Honest Limitations</td>
              {selectedTools.map((tool) => (
                <td key={tool.id} className="p-4 border-l border-border">
                  <ul className="space-y-1 text-muted-foreground">
                    {tool.cons[locale].map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <X className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
