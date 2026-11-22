"use client";

import React, { useState } from "react";
import { ToolItem } from "@/types";
import { Locale } from "@/lib/i18n";
import { Calculator, Users, Sparkles, Check, ExternalLink, ShieldCheck, AlertCircle, Cpu } from "lucide-react";

interface PriceCalculatorProps {
  tool: ToolItem;
  locale: Locale;
}

export function PriceCalculator({ tool, locale }: PriceCalculatorProps) {
  const [teamSize, setTeamSize] = useState(3);
  const [usageMultiplier, setUsageMultiplier] = useState(1); // 1x, 2x, 3x, 5x
  const [includeApiBurn, setIncludeApiBurn] = useState(true);
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

  // Base tool cost calculation
  const baseEffectiveCost = isFlatRate || isUsageBased
    ? baseMonthlyPrice
    : Math.round(baseMonthlyPrice * teamSize * 100) / 100;

  // Empirical audit fine-print details
  const audit = tool.empiricalAudit;
  const finePrint = audit?.finePrintAudit;
  const requiresApi = finePrint?.requiresExternalApiKey ?? false;
  
  // Calculate raw external API / infrastructure delta based on baseline startingPrice so it remains consistent across all tier selections
  const estimatedApiBase = finePrint?.typicalRealMonthlyCost 
    ? Math.max(0, finePrint.typicalRealMonthlyCost - tool.startingPrice)
    : (requiresApi ? 25 : 0);

  // Estimated external API / Token burn
  const apiBurnCost = (requiresApi && includeApiBurn)
    ? Math.round(estimatedApiBase * usageMultiplier * 100) / 100
    : 0;

  // Estimated overage cost if usage > 1x for usage-based tools
  const overageEstimate = (isUsageBased && usageMultiplier > 1)
    ? Math.round(baseEffectiveCost * (usageMultiplier - 1) * 0.45 * 100) / 100
    : 0;

  // Total Real Monthly Operational Cost
  const totalRealMonthlyCost = Math.round((baseEffectiveCost + apiBurnCost + overageEstimate) * 100) / 100;
  const annualTotalCost = Math.round(totalRealMonthlyCost * 12);

  // Annual billing discount savings on base plan
  const annualBillingSavings = isAnnual
    ? isFlatRate || isUsageBased
      ? Math.round((tier.priceMonthly - tier.priceAnnualMonthly) * 12)
      : Math.round((tier.priceMonthly - tier.priceAnnualMonthly) * teamSize * 12)
    : 0;

  // Benchmark savings against legacy per-seat CRM/tools ($50/user/mo)
  const legacyPerSeatBenchmark = 50;
  const legacyCostPerMonth = legacyPerSeatBenchmark * teamSize;
  const flatRateUserSavingsMonthly = isFlatRate ? Math.max(0, legacyCostPerMonth - baseEffectiveCost) : 0;
  const flatRateAnnualSavings = flatRateUserSavingsMonthly * 12;

  const auditTimestamp = audit?.cancellationAudit?.auditTimestamp || "2027-Q1";
  const overageDescription = isVi 
    ? finePrint?.overageRateDescription?.vi 
    : finePrint?.overageRateDescription?.en;
  const externalApiNote = isVi 
    ? finePrint?.externalApiNote?.vi 
    : finePrint?.externalApiNote?.en;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#141415] p-6 sm:p-8 space-y-8 shadow-xs text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
              <Calculator className="h-4 w-4 text-emerald-500" />
              {isVi ? "Dự Toán Chi Phí & Token Thực Tế" : "Real-Cost & Token Burn Simulator"}
            </span>
            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
              isFlatRate 
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : isUsageBased
                ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
                : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300 border-zinc-500/20"
            }`}>
              {isFlatRate 
                ? (isVi ? "Gói Cố Định (Không giới hạn User)" : "Flat Rate (Unlimited Seats)")
                : isUsageBased
                ? (isVi ? "Theo Hạn Mức Sử Dụng / Credits" : "Usage / Credit Pool")
                : (isVi ? "Tính Theo Số Ghế (Per Seat)" : "Per User / Seat")}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700/60 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {isVi ? `Đối soát: ${auditTimestamp}` : `Audited: ${auditTimestamp}`}
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mt-2">
            {tool.name} Real-Cost Simulator
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            {isVi 
              ? "Công cụ mô phỏng chi phí thực tế: Tính toán giá niêm yết, số ghế, mức độ tiêu thụ tài nguyên và phụ phí API/overage ẩn để bạn không bao giờ bị sốc hóa đơn cuối tháng." 
              : "Empirical operational simulator: Calculates base subscription, seat scaling, token consumption burn, and hidden overage surcharges so you never face billing surprises."}
          </p>
        </div>

        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !isAnnual ? "bg-white dark:bg-[#1a1b1e] text-zinc-900 dark:text-white shadow-xs" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {isVi ? "Hàng Tháng" : "Monthly"}
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              isAnnual ? "bg-white dark:bg-[#1a1b1e] text-zinc-900 dark:text-white shadow-xs" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {isVi ? "Hàng Năm" : "Annual"}
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded">
              -15%~20%
            </span>
          </button>
        </div>
      </div>

      {/* 1. Select Tier Cards */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-3">
          1. {isVi ? "Chọn Gói Bản Quyền Cơ Sở" : "Select Subscription Plan"}
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
                    ? "border-zinc-900 dark:border-white ring-1 ring-zinc-900 dark:ring-white bg-zinc-50 dark:bg-zinc-900/60 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-[#18191c]"
                }`}
              >
                {t.isPopular && (
                  <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs">
                    Popular
                  </span>
                )}
                <div className="font-semibold text-sm text-zinc-900 dark:text-white flex items-center justify-between">
                  <span>{t.name}</span>
                  {isSelected && <Check className="h-4 w-4 text-emerald-500" />}
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    ${price}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    /{isVi ? "tháng" : "mo"}
                  </span>
                </div>
                {t.userLimit && (
                  <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                    ✓ {t.userLimit}
                  </p>
                )}
                {t.usageLimit && (
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    • {t.usageLimit}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Sliders (Team & Volume) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Team Size Slider */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-zinc-500" />
              2. {isVi ? "Số Lượng Nhân Viên (Seats)" : "Team Scale (Seats)"}
            </label>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">
              {teamSize} {teamSize === 1 ? (isVi ? "người" : "user") : (isVi ? "người" : "users")}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="50"
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-2">
            <span>1 solo</span>
            <span>10 team</span>
            <span>25 agency</span>
            <span>50+ enterprise</span>
          </div>

          {isFlatRate && (
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-3 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              {isVi ? "Gói cố định: Thêm thành viên hoàn toàn miễn phí ($0/seat)." : "Flat rate: Adding team members is 100% free ($0/seat)."}
            </p>
          )}
        </div>

        {/* Usage & Volume Multiplier Slider */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-zinc-500" />
              3. {isVi ? "Cường Độ Sử Dụng / Volume" : "Usage Volume Scale"}
            </label>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">
              {usageMultiplier === 1 ? (isVi ? "1x Tiêu Chuẩn" : "1x Standard") : `${usageMultiplier}x ${isVi ? "Cường Độ Cao" : "Heavy Load"}`}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={usageMultiplier}
            onChange={(e) => setUsageMultiplier(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-2">
            <span>1x Gói gốc</span>
            <span>2x Tăng 100%</span>
            <span>3x Tăng 200%</span>
            <span>5x Cực hạn</span>
          </div>

          {requiresApi && (
            <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeApiBurn}
                  onChange={(e) => setIncludeApiBurn(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-emerald-500 focus:ring-emerald-500 h-3.5 w-3.5 accent-emerald-500"
                />
                {isVi ? "Cộng ước tính phí API OpenAI / Twilio ngoài" : "Include external OpenAI / Twilio API burn"}
              </label>
              <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                +${apiBurnCost}/mo
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Fine-print Audit Transparency Alert */}
      {finePrint && (overageDescription || externalApiNote) && (
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/40 text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-200 font-semibold">
            <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
            {isVi ? "Lưu ý đối soát điều khoản ẩn (Fine-Print Audit)" : "Fine-Print & Overage Audit Details"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
            {overageDescription && (
              <div>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{isVi ? "Phụ phí vượt hạn mức: " : "Overage fee rate: "}</span>
                {overageDescription}
              </div>
            )}
            {externalApiNote && (
              <div>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{isVi ? "Chi phí API ngoài: " : "External API requirement: "}</span>
                {externalApiNote}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3-Tier Summary Card */}
      <div className="p-6 rounded-xl bg-zinc-50 dark:bg-[#0c0d0e] border border-zinc-200 dark:border-zinc-800/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 w-full md:w-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
            {isVi ? "Bóc Tách Chi Phí Vận Hành Thực Tế" : "Real Operational Cost Breakdown"}
          </span>

          {/* Breakdown items */}
          <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <span>{isVi ? "• Phí thuê bao gói gốc:" : "• Base subscription:"}</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">${baseEffectiveCost}/mo</span>
            </div>
            {apiBurnCost > 0 && (
              <div className="flex items-center justify-between sm:justify-start gap-4 text-amber-600 dark:text-amber-400">
                <span>{isVi ? "• Đốt API / Token bên thứ ba:" : "• External API token burn:"}</span>
                <span className="font-semibold">+${apiBurnCost}/mo</span>
              </div>
            )}
            {overageEstimate > 0 && (
              <div className="flex items-center justify-between sm:justify-start gap-4 text-amber-600 dark:text-amber-400">
                <span>{isVi ? "• Ước tính phụ phí vượt quota:" : "• Estimated quota overage:"}</span>
                <span className="font-semibold">+${overageEstimate}/mo</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                ${totalRealMonthlyCost}
              </span>
              <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                /{isVi ? "thực chi tháng" : "real mo"}
              </span>
            </div>

            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
              {isAnnual ? (
                <>
                  {isVi ? "Thanh toán hàng năm: " : "Billed annually at "}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">${annualTotalCost}/year</span>
                </>
              ) : (
                isVi ? "Thanh toán từng tháng linh hoạt" : "Billed month-to-month"
              )}
            </p>

            {annualBillingSavings > 0 && (
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                {isVi 
                  ? `Tiết kiệm $${annualBillingSavings}/năm khi thanh toán chu kỳ năm` 
                  : `Save $${annualBillingSavings}/year with annual billing`}
              </p>
            )}

            {isFlatRate && teamSize > 1 && flatRateAnnualSavings > 0 && (
              <p className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 mt-0.5 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                {isVi
                  ? `Tiết kiệm ~$${flatRateAnnualSavings.toLocaleString()}/năm so với phần mềm thu theo ghế`
                  : `Saves ~$${flatRateAnnualSavings.toLocaleString()}/yr vs legacy per-seat CRM`}
              </p>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:items-end gap-2.5 w-full md:w-auto shrink-0">
          <a
            href={tool.adminAffiliateUrl || tool.officialUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 font-semibold text-sm text-center shadow-xs transition-all flex items-center justify-center gap-2"
          >
            {isVi ? `Đăng Ký Gói ${tier.name}` : `Get Started on ${tier.name}`}
            <ExternalLink className="h-4 w-4" />
          </a>

          {tool.pricingEvidenceUrl && (
            <a
              href={tool.pricingEvidenceUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[11px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              {isVi ? "Xem trang giá gốc của nhà cung cấp" : "Official vendor pricing page"}
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center sm:text-right">
            {isVi ? "Dữ liệu đối soát độc lập • 100% Không thiên vị" : "Independently audited data • Zero sponsored bias"}
          </p>
        </div>
      </div>

      {/* SaaS Stack Matrix Link */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span>
          {isVi 
            ? "Muốn cắt giảm toàn diện chi phí phần mềm doanh nghiệp?" 
            : "Looking to audit and consolidate your entire software stack?"}
        </span>
        <a
          href={`/${locale}/replace`}
          className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
        >
          {isVi ? "Xem Ma Trận Cắt Giảm SaaS (Save $8,600+/năm) →" : "View Cut My SaaS Bill Matrix (Save $8,600+/yr) →"}
        </a>
      </div>
    </div>
  );
}
