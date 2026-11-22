"use client";

import React, { useState } from "react";
import { ToolItem } from "@/types";
import { Locale } from "@/lib/i18n";
import { Calculator, Users, Sparkles, Check, ExternalLink, ShieldCheck } from "lucide-react";

interface PriceCalculatorProps {
  tool: ToolItem;
  locale: Locale;
}

export function PriceCalculator({ tool, locale }: PriceCalculatorProps) {
  const [teamSize, setTeamSize] = useState(3);
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedTierIndex, setSelectedTierIndex] = useState(
    Math.max(0, tool.pricingTiers.findIndex((t) => t.isPopular))
  );

  const isVi = locale === "vi";
  const tier = tool.pricingTiers[selectedTierIndex] || tool.pricingTiers[0] || {
    name: "Standard",
    priceMonthly: tool.startingPrice,
    priceAnnualMonthly: tool.startingPrice,
    currency: "USD",
    features: [],
  };

  const model = tool.pricingModel || "per_seat";
  const isFlatRate = model === "flat";
  const isUsageBased = model === "usage";

  // Base price of selected tier
  const baseMonthlyPrice = isAnnual ? tier.priceAnnualMonthly : tier.priceMonthly;

  // Actual cost calculation based on model
  const effectiveMonthlyCost = isFlatRate || isUsageBased
    ? baseMonthlyPrice
    : Math.round(baseMonthlyPrice * teamSize * 100) / 100;

  const annualTotalCost = Math.round(effectiveMonthlyCost * 12);

  // Annual billing discount savings
  const annualBillingSavings = isAnnual
    ? isFlatRate || isUsageBased
      ? Math.round((tier.priceMonthly - tier.priceAnnualMonthly) * 12)
      : Math.round((tier.priceMonthly - tier.priceAnnualMonthly) * teamSize * 12)
    : 0;

  // For flat-rate platforms (like GoHighLevel), calculate benchmark savings against legacy per-seat platforms ($50/user/mo)
  const legacyPerSeatBenchmark = 50;
  const legacyCostPerMonth = legacyPerSeatBenchmark * teamSize;
  const flatRateUserSavingsMonthly = isFlatRate ? Math.max(0, legacyCostPerMonth - effectiveMonthlyCost) : 0;
  const flatRateAnnualSavings = flatRateUserSavingsMonthly * 12;

  return (
    <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-br from-card via-card to-brand-500/5 p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
              <Calculator className="h-4 w-4" />
              {isVi ? "Dự Toán Chi Phí & Định Giá Thực Tế" : "Usage & Team Cost Estimator"}
            </span>
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
              isFlatRate 
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : isUsageBased
                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
            }`}>
              {isFlatRate 
                ? (isVi ? "Gói Cố Định (Không giới hạn User)" : "Flat Rate (Unlimited Seats)")
                : isUsageBased
                ? (isVi ? "Theo Hạn Mức Sử Dụng" : "Usage/Credit Based")
                : (isVi ? "Tính Theo Số Ghế (Per Seat)" : "Per User / Seat")}
            </span>
          </div>

          <h3 className="text-xl font-black text-foreground mt-1">
            {tool.name} Cost Estimator
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isFlatRate 
              ? (isVi 
                  ? "Giá cố định theo tài khoản, không bị nhân tiền theo số lượng nhân viên." 
                  : "Fixed workspace fee with unlimited user seats. Zero per-user penalties.")
              : (isVi 
                  ? "Tính toán chi phí dựa trên số lượng thành viên và chu kỳ thanh toán." 
                  : "Calculate total cost based on team size, usage tier, and billing cycle.")}
          </p>
        </div>

        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center gap-2 p-1 rounded-xl border border-border bg-secondary/80">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              !isAnnual ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isVi ? "Hàng Tháng" : "Monthly"}
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              isAnnual ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isVi ? "Hàng Năm" : "Annual"}
            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/15 px-1.5 py-0.5 rounded-md">
              Save ~15-20%
            </span>
          </button>
        </div>
      </div>

      {/* Select Tier Cards */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">
          1. {isVi ? "Chọn Gói Phần Mềm Cần Tính" : "Select Subscription Plan"}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tool.pricingTiers.map((t, idx) => {
            const isSelected = selectedTierIndex === idx;
            const price = isAnnual ? t.priceAnnualMonthly : t.priceMonthly;

            return (
              <button
                key={t.name}
                type="button"
                onClick={() => setSelectedTierIndex(idx)}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? "border-brand-500 bg-brand-500/10 shadow-xs ring-1 ring-brand-500"
                    : "border-border hover:border-brand-500/40 bg-card"
                }`}
              >
                {t.isPopular && (
                  <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-brand-500 text-white shadow-xs">
                    Popular
                  </span>
                )}
                <div className="font-bold text-sm text-foreground flex items-center justify-between">
                  <span>{t.name}</span>
                  {isSelected && <Check className="h-4 w-4 text-brand-500" />}
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-foreground">
                    ${price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    /{isVi ? "tháng" : "mo"}
                  </span>
                </div>
                {t.userLimit && (
                  <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                    ✓ {t.userLimit}
                  </p>
                )}
                {t.usageLimit && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    • {t.usageLimit}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Team Size Slider & Model Specific Explanations */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Users className="h-4 w-4 text-brand-500" />
            2. {isVi ? "Quy Mô Đội Ngũ Sử Dụng" : "Team & User Scale"}
          </label>
          <span className="text-sm font-black px-3 py-1 rounded-lg bg-secondary text-foreground border border-border">
            {teamSize} {teamSize === 1 ? (isVi ? "thành viên" : "member") : (isVi ? "thành viên" : "members")}
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="50"
          value={teamSize}
          onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
          className="w-full accent-brand-500 cursor-pointer h-2 bg-secondary rounded-lg"
        />

        <div className="flex justify-between text-[11px] text-muted-foreground font-medium mt-1.5">
          <span>1 {isVi ? "người" : "solo"}</span>
          <span>10 {isVi ? "người" : "team"}</span>
          <span>25 {isVi ? "người" : "agency"}</span>
          <span>50+ {isVi ? "người" : "enterprise"}</span>
        </div>

        {/* Flat Rate Callout */}
        {isFlatRate && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-700 dark:text-emerald-300">
                {isVi ? "Không Phụ Thu Ghế (Zero Per-Seat Fee)" : "Flat Workspace Pricing - 100% Unlimited Users"}
              </p>
              <p className="text-emerald-800/80 dark:text-emerald-300/80 mt-0.5 leading-relaxed">
                {isVi
                  ? `Khác với HubSpot hay Salesforce thu $50/user/tháng, ${tool.name} áp dụng chính sách Flat Fee. Dù team bạn có 1 hay 50 người, tổng chi phí vẫn cố định $${effectiveMonthlyCost}/tháng.`
                  : `Unlike legacy per-seat CRMs (HubSpot, Salesforce) charging ~$50/seat/mo, ${tool.name} charges a flat fee. Adding ${teamSize} users costs exactly $${effectiveMonthlyCost}/mo total.`}
              </p>
            </div>
          </div>
        )}

        {isUsageBased && (
          <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-blue-700 dark:text-blue-300">
                {isVi ? "Hạn Mức Sử Dụng Dùng Chung" : "Shared Workspace Pool"}
              </p>
              <p className="text-blue-800/80 dark:text-blue-300/80 mt-0.5 leading-relaxed">
                {isVi
                  ? `Hạn mức ${tier.creditDetails || tier.usageLimit || "credits/phút"} của gói ${tier.name} được chia sẻ cho toàn bộ ${teamSize} thành viên trong workspace.`
                  : `All ${teamSize} members share the ${tier.creditDetails || tier.usageLimit || "credit pool"} included with the ${tier.name} plan.`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Output Summary Card */}
      <div className="p-6 rounded-xl bg-card border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            {isVi ? "Tổng Ước Tính Đầu Tư" : "Estimated Investment"}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black text-foreground tracking-tight">
              ${effectiveMonthlyCost}
            </span>
            <span className="text-sm font-bold text-muted-foreground">
              /{isVi ? "tháng" : "mo"}
            </span>
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            {isAnnual ? (
              <>
                {isVi ? "Thanh toán hàng năm: " : "Billed annually at "}
                <span className="font-bold text-foreground">${annualTotalCost}/year</span>
              </>
            ) : (
              isVi ? "Thanh toán từng tháng linh hoạt" : "Billed month-to-month"
            )}
          </p>

          {annualBillingSavings > 0 && (
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              {isVi 
                ? `Tiết kiệm $${annualBillingSavings}/năm khi thanh toán theo năm` 
                : `Save $${annualBillingSavings}/year with annual billing`}
            </p>
          )}

          {isFlatRate && teamSize > 1 && flatRateAnnualSavings > 0 && (
            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              {isVi
                ? `Tiết kiệm ~$${flatRateAnnualSavings.toLocaleString()}/năm so với phần mềm tính theo ghế`
                : `Saves ~$${flatRateAnnualSavings.toLocaleString()}/yr vs. traditional per-seat platforms`}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
          <a
            href={tool.adminAffiliateUrl || tool.officialUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-sm text-center shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
          >
            {isVi ? `Bắt Đầu Với Gói ${tier.name}` : `Get Started on ${tier.name}`}
            <ExternalLink className="h-4 w-4" />
          </a>

          {tool.pricingEvidenceUrl && (
            <a
              href={tool.pricingEvidenceUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[11px] font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              {isVi ? "Xem trang giá gốc của hãng" : "Official vendor pricing page"}
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
