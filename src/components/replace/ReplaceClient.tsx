"use client";

import React, { useState, useMemo } from "react";
import { SaaSStackReplacement } from "@/data/saas-stacks-data";
import { Locale } from "@/lib/i18n";
import { 
  ArrowRight, 
  Check, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  TrendingDown, 
  Clock, 
  Users, 
  HelpCircle 
} from "lucide-react";
import Link from "next/link";

interface ReplaceClientProps {
  stacks: SaaSStackReplacement[];
  locale: Locale;
}

export function ReplaceClient({ stacks, locale }: ReplaceClientProps) {
  const isVi = locale === "vi";

  // Selected categories for filtering
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Selected stack IDs for the Interactive Annual Savings Calculator
  const [selectedStackIds, setSelectedStackIds] = useState<string[]>(
    stacks.map((s) => s.id)
  );

  // Sync state to URL without page refresh for easy sharing
  const updateUrlState = (category: string, activeIds: string[]) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (category && category !== "all") {
      url.searchParams.set("cat", category);
    } else {
      url.searchParams.delete("cat");
    }

    if (activeIds.length < stacks.length) {
      url.searchParams.set("stacks", activeIds.join(","));
    } else {
      url.searchParams.delete("stacks");
    }

    window.history.replaceState(null, "", url.toString());
  };

  // Read URL query params on mount
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get("cat");
    const stacksParam = params.get("stacks");

    if (catParam && ["crm_sales", "automation", "ai_content", "ai_video", "funnels_forms"].includes(catParam)) {
      setSelectedCategory(catParam);
    }

    if (stacksParam) {
      const ids = stacksParam.split(",").filter((id) => stacks.some((s) => s.id === id));
      if (ids.length > 0) {
        setSelectedStackIds(ids);
      }
    }

    // Hash check: if arriving at #stack-id, ensure category shows it
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const targetStack = stacks.find((s) => s.id === hash);
      if (targetStack && targetStack.category !== catParam) {
        setSelectedCategory("all");
      }
    }
  }, [stacks]);

  // Toggle stack selection in calculator
  const toggleStackSelection = (id: string) => {
    setSelectedStackIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      updateUrlState(selectedCategory, next);
      return next;
    });
  };

  // Select all or clear all
  const selectAll = () => {
    const allIds = stacks.map((s) => s.id);
    setSelectedStackIds(allIds);
    updateUrlState(selectedCategory, allIds);
  };

  const clearAll = () => {
    setSelectedStackIds([]);
    updateUrlState(selectedCategory, []);
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    updateUrlState(catId, selectedStackIds);
  };

  // Calculate live cumulative savings
  const cumulativeSavings = useMemo(() => {
    const active = stacks.filter((s) => selectedStackIds.includes(s.id));
    const monthlyTotal = active.reduce((sum, s) => sum + s.savings.monthlyDollar, 0);
    const annualTotal = active.reduce((sum, s) => sum + s.savings.annualDollar, 0);
    const legacyMonthlyTotal = active.reduce((sum, s) => sum + s.legacyStack.totalMonthlyCost, 0);
    const leanMonthlyTotal = active.reduce((sum, s) => sum + s.leanStack.monthlyCost, 0);
    const averagePercent = legacyMonthlyTotal > 0 
      ? Math.round(((legacyMonthlyTotal - leanMonthlyTotal) / legacyMonthlyTotal) * 100) 
      : 0;

    return {
      activeCount: active.length,
      monthlyTotal,
      annualTotal,
      legacyMonthlyTotal,
      leanMonthlyTotal,
      averagePercent,
    };
  }, [stacks, selectedStackIds]);

  // Filter stacks by category
  const filteredStacks = useMemo(() => {
    if (selectedCategory === "all") return stacks;
    return stacks.filter((s) => s.category === selectedCategory);
  }, [stacks, selectedCategory]);

  const categories = [
    { id: "all", label: isVi ? "Tất Cả (5)" : "All Stacks (5)" },
    { id: "crm_sales", label: isVi ? "CRM & Bán Hàng" : "CRM & Sales" },
    { id: "automation", label: isVi ? "Tự Động Hóa" : "Automation" },
    { id: "ai_content", label: isVi ? "AI SEO & Content" : "AI Content" },
    { id: "ai_video", label: isVi ? "Video Avatar AI" : "AI Video" },
    { id: "funnels_forms", label: isVi ? "Phễu & Form" : "Funnels & Forms" },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          {isVi ? "Khoảng Trống #3: Ma Trận Cắt Giảm Chi Phí SaaS" : "Moat #3: The Lean Stack Matrix"}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          {isVi ? "Cắt Giảm SaaS Bill: Tiết Kiệm $8,600+/Năm" : "Cut My SaaS Bill: Save $8,600+/Year"}
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {isVi
            ? "Chấm dứt việc trả tiền cho các phần mềm cồng kềnh thu tiền theo đầu người. 5 cặp combo tinh gọn đã được Asmire kiểm nghiệm thực tế, giúp doanh nghiệp tiết kiệm 50% - 80% ngân sách mà không giảm sút hiệu suất."
            : "Stop paying for fragmented per-seat software monopolies. Discover 5 battle-tested lean stacks audited by Asmire that cut 50% - 80% of your software burn while boosting workflow speed."}
        </p>
      </div>

      {/* Interactive Annual SaaS Savings Calculator Widget */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#141415] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <TrendingDown className="h-4 w-4 text-emerald-500" />
                {isVi ? "Bộ Tính Toán Khoản Tiết Kiệm Tích Lũy" : "Cumulative Annual Savings Engine"}
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                {cumulativeSavings.activeCount} / {stacks.length} {isVi ? "ngăn xếp đã chọn" : "stacks selected"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-1">
              {isVi ? "Chọn các phần mềm công ty bạn đang chi trả:" : "Select the tools your business currently pays for:"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={selectAll}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {isVi ? "Chọn Tất Cả" : "Select All"}
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {isVi ? "Bỏ Chọn" : "Clear All"}
            </button>
          </div>
        </div>

        {/* Stack Checkboxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 py-6">
          {stacks.map((stack) => {
            const isChecked = selectedStackIds.includes(stack.id);
            return (
              <label
                key={stack.id}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                  isChecked
                    ? "border-emerald-500/40 bg-white dark:bg-zinc-900/90 shadow-xs ring-1 ring-emerald-500/20"
                    : "border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/30 opacity-60 hover:opacity-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleStackSelection(stack.id)}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-emerald-500 focus:ring-emerald-500 h-4 w-4 mt-0.5 accent-emerald-500"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-zinc-900 dark:text-white truncate">
                    {isVi ? stack.title.vi : stack.title.en}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center justify-between">
                    <span>{isVi ? "Tiết kiệm:" : "Saves:"} <strong className="text-emerald-600 dark:text-emerald-400 font-mono">+${stack.savings.annualDollar.toLocaleString()}/yr</strong></span>
                    <span className="font-mono text-zinc-400">(-{stack.savings.percentSavings}%)</span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        {/* Live Savings Calculation Output Banner */}
        <div className="p-6 rounded-xl bg-white dark:bg-[#0c0d0e] border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              {isVi ? "Tổng Ngân Sách Bạn Giữ Lại Được Mỗi Năm" : "Total Net Retained Capital Annually"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                ${cumulativeSavings.annualTotal.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                /{isVi ? "năm ròng" : "year"}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {isVi ? "Tương đương tiết kiệm: " : "Equivalent to saving "}
              <strong className="text-zinc-900 dark:text-zinc-200 font-mono">${cumulativeSavings.monthlyTotal.toLocaleString()}/tháng</strong>
              {isVi ? ` (Giảm ~${cumulativeSavings.averagePercent}% toàn bộ chi phí phần mềm).` : ` (Cutting ~${cumulativeSavings.averagePercent}% of recurring software overhead).`}
            </p>
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed border-t md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800 pt-3 md:pt-0 md:pl-6">
            <p className="font-semibold text-zinc-900 dark:text-zinc-200 mb-1">
              💡 {isVi ? "Quy chuẩn chuyển đổi thông minh:" : "Smart capital reallocation:"}
            </p>
            {isVi
              ? "Số tiền $8,600+ tiết kiệm được có thể dùng để tài trợ 100% ngân sách quảng cáo Facebook/Google hoặc thuê thêm 1 nhân sự chuyên môn."
              : "Retaining $8,600+ in annual overhead directly funds your ad acquisition budget or covers key operational freelance talent."}
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 5 Stack Deep-Dive Cards */}
      <div className="space-y-10">
        {filteredStacks.map((stack, index) => {
          const title = isVi ? stack.title.vi : stack.title.en;
          const summary = isVi ? stack.summary.vi : stack.summary.en;
          const catBadge = isVi ? stack.categoryBadge.vi : stack.categoryBadge.en;
          const migration = isVi ? stack.migrationEffort.vi : stack.migrationEffort.en;
          const recommended = isVi ? stack.recommendedFor.vi : stack.recommendedFor.en;

          return (
            <div
              key={stack.id}
              id={stack.id}
              className="scroll-mt-24 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#141415] overflow-hidden shadow-xs space-y-6 p-6 sm:p-8"
            >
              {/* Stack Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                      #{index + 1} • {catBadge}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {isVi ? `Tiết kiệm $${stack.savings.monthlyDollar}/tháng (-${stack.savings.percentSavings}%)` : `Saves $${stack.savings.monthlyDollar}/mo (-${stack.savings.percentSavings}%)`}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
                    {summary}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="text-xs text-zinc-400 uppercase font-mono">
                    {isVi ? "Tiết kiệm hàng năm" : "Annual Cash Retention"}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                    +${stack.savings.annualDollar.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Side-by-Side Comparison Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Legacy Stack (Left) */}
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
                        {isVi ? "Ngăn Xếp Cũ Phân Mảnh" : "Legacy Monopolies"}
                      </span>
                      <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-200">
                        {stack.legacyStack.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold line-through text-zinc-400 dark:text-zinc-500">
                        ${stack.legacyStack.totalMonthlyCost}/mo
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono">
                        ${stack.legacyStack.annualCost}/yr
                      </div>
                    </div>
                  </div>

                  {/* Legacy Items breakdown */}
                  <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {stack.legacyStack.items.map((item) => (
                      <div key={item.name} className="flex justify-between items-center text-[11px]">
                        <span>• {item.name}</span>
                        <span className="font-mono text-zinc-500">${item.monthlyCost}/mo</span>
                      </div>
                    ))}
                  </div>

                  {/* Drawbacks */}
                  <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                      {isVi ? "Điểm thắt cổ chai & Bẫy giá:" : "Bottlenecks & Pricing Traps:"}
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      {(isVi ? stack.legacyStack.drawbacks.vi : stack.legacyStack.drawbacks.en).map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <X className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Lean Stack (Right) */}
                <div className="rounded-xl border border-emerald-500/30 dark:border-emerald-500/20 bg-white dark:bg-[#18191c] p-5 space-y-4 shadow-xs ring-1 ring-emerald-500/20">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        {isVi ? "Asmire Verified Lean Stack" : "Asmire Verified Lean Stack"}
                      </span>
                      <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                        {stack.leanStack.toolName}
                      </h4>
                      <p className="text-[11px] text-zinc-500 font-mono">
                        {stack.leanStack.plan}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        ${stack.leanStack.monthlyCost}/mo
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono">
                        ${stack.leanStack.annualCost}/yr
                      </div>
                    </div>
                  </div>

                  {/* Advantages */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                      {isVi ? "Ưu việt vận hành tinh gọn:" : "Operational Advantages:"}
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                      {(isVi ? stack.leanStack.advantages.vi : stack.leanStack.advantages.en).map((adv, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA & Tool Link */}
                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3">
                    <Link
                      href={`/${locale}/tools/${stack.leanStack.toolSlug}`}
                      className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      {isVi ? "Xem hồ sơ kiểm thử →" : "View Audit Dossier →"}
                    </Link>
                    <a
                      href={stack.leanStack.officialAffiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      {isVi ? `Bắt Đầu Với ${stack.leanStack.toolName}` : `Switch to ${stack.leanStack.toolName}`}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Honest Trade-Offs & Migration Audit Footer */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 p-4 space-y-3 text-xs">
                {/* Honest Trade-offs */}
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400 mb-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span>{isVi ? "Phân tích đánh đổi thành thật (Honest Trade-Offs):" : "Honest Trade-Offs & Limitations:"}</span>
                  </div>
                  <ul className="space-y-1 text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed pl-5 list-disc">
                    {(isVi ? stack.honestTradeOffs.vi : stack.honestTradeOffs.en).map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* Migration and Recommendation Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                  <div className="flex items-start gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span><strong className="text-zinc-700 dark:text-zinc-300 font-sans">{isVi ? "Thời gian di chuyển: " : "Migration Effort: "}</strong>{migration}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Users className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span><strong className="text-zinc-700 dark:text-zinc-300 font-sans">{isVi ? "Phù hợp nhất: " : "Recommended for: "}</strong>{recommended}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editorial Credibility & FAQ Section (AEO optimized) */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#141415] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-zinc-500" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            {isVi ? "Câu Hỏi Thường Gặp Về Ma Trận Thay Thế SaaS" : "Frequently Asked Questions on SaaS Replacement"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          <div className="space-y-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
            <h4 className="font-bold text-zinc-900 dark:text-white">
              {isVi ? "1. Chuyển từ HubSpot sang GoHighLevel có làm mất dữ liệu khách hàng không?" : "1. Will migrating from HubSpot to GoHighLevel cause data loss?"}
            </h4>
            <p>
              {isVi
                ? "Không. Toàn bộ danh bạ, trường tùy biến (Custom Fields), tags và ghi chú lịch sử cuộc gọi đều có thể xuất qua CSV chuẩn và ánh xạ 100% vào GoHighLevel. Duy nhất các chuỗi workflow cũ cần dựng lại theo sơ đồ kích hoạt mới."
                : "No. All contacts, custom fields, company associations, and historical notes can be exported via CSV and mapped directly into GoHighLevel. Only legacy multi-branch workflows must be recreated."}
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
            <h4 className="font-bold text-zinc-900 dark:text-white">
              {isVi ? "2. Make.com có ổn định bằng Zapier khi xử lý khối lượng tác vụ lớn không?" : "2. Is Make.com as stable as Zapier under heavy enterprise workload?"}
            </h4>
            <p>
              {isVi
                ? "Thực tế kiểm nghiệm cho thấy Make.com xử lý các payload phức tạp và vòng lặp tốt hơn Zapier nhờ khả năng quản lý bộ nhớ đệm (Data Store) và bảng Error Handlers chuyên nghiệp. Tỷ lệ uptime đạt 99.98%."
                : "Empirical benchmarks reveal Make.com handles complex array iterations and nested payloads better than Zapier with dedicated Data Stores and robust Error Handlers. Historical uptime exceeds 99.98%."}
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
            <h4 className="font-bold text-zinc-900 dark:text-white">
              {isVi ? "3. Asmire có nhận tiền tài trợ để khuyên người dùng chọn các công cụ trên không?" : "3. Does Asmire accept sponsorships to bias these recommendations?"}
            </h4>
            <p>
              {isVi
                ? "Tuyệt đối không. Asmire không nhận tiền tài trợ để thay đổi thứ hạng hay làm mờ nhược điểm. Chúng tôi công khai trung thực mọi điểm yếu và hạn chế kỹ thuật của từng công cụ để người dùng đưa ra quyết định sáng suốt nhất."
                : "Absolutely not. Asmire rejects pay-to-play rankings. We publicly list every technical constraint and trade-off for each recommended tool, allowing teams to make informed engineering decisions."}
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
            <h4 className="font-bold text-zinc-900 dark:text-white">
              {isVi ? "4. Làm sao để nhận trọn bộ Snapshot và Template di chuyển độc quyền?" : "4. How do I access Asmire's proprietary migration snapshots?"}
            </h4>
            <p>
              {isVi
                ? "Khi đăng ký tài khoản qua liên kết kiểm định trên Asmire, bạn tự động mở khóa bộ Snapshot GoHighLevel độc quyền và 10 kịch bản Make.com dựng sẵn tại trung tâm thành viên Asmire Pro."
                : "Registering through Asmire's verified links automatically unlocks pre-built GoHighLevel Agency Snapshots and 10 production Make.com blueprints in the Asmire Pro member portal."}
            </p>
            <div className="pt-2">
              <Link
                href={`/${locale}/membership`}
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <span>{isVi ? "Xem đặc quyền thành viên Asmire Pro →" : "Explore Asmire Pro Member Perks →"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
