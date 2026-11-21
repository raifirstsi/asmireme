"use client";

import React, { useState } from "react";
import { ToolItem } from "@/types";
import { Locale } from "@/lib/i18n";
import { Calculator, Users, Calendar, Sparkles, Check, ArrowRight } from "lucide-react";

interface PriceCalculatorProps {
  tool: ToolItem;
  locale: Locale;
}

export function PriceCalculator({ tool, locale }: PriceCalculatorProps) {
  const [teamSize, setTeamSize] = useState(1);
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);

  const isVi = locale === "vi";
  const tier = tool.pricingTiers[selectedTierIndex] || tool.pricingTiers[0];

  // Base price per user per month
  const baseMonthlyPrice = isAnnual ? tier.priceAnnualMonthly : tier.priceMonthly;
  const totalMonthlyCost = Math.round(baseMonthlyPrice * teamSize * 100) / 100;
  const annualTotalCost = Math.round(totalMonthlyCost * 12);
  const annualSavings = isAnnual
    ? Math.round((tier.priceMonthly - tier.priceAnnualMonthly) * teamSize * 12)
    : 0;

  return (
    <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-br from-card via-card to-brand-500/5 p-6 sm:p-8 shadow-sm space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
            <Calculator className="h-4 w-4" />
            {isVi ? "Dự Toán Chi Phí Thực Tế" : "Usage & Team Cost Calculator"}
          </span>
          <h3 className="text-xl font-black text-foreground mt-1">
            {tool.name} Cost Estimator
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Calculate your total cost based on team seats and billing cycle.
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
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
              isAnnual ? "bg-brand-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Annual</span>
            <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full font-black">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          {/* Plan Tier Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground">
              Select Plan Tier:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tool.pricingTiers.map((t, idx) => (
                <button
                  key={t.name}
                  onClick={() => setSelectedTierIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedTierIndex === idx
                      ? "border-brand-500 bg-brand-500/10 text-foreground font-bold shadow-xs"
                      : "border-border bg-card text-muted-foreground hover:border-brand-500/40"
                  }`}
                >
                  <span className="block text-xs font-bold">{t.name}</span>
                  <span className="text-sm font-black text-foreground">
                    ${isAnnual ? t.priceAnnualMonthly : t.priceMonthly}
                    <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Team Size Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Users className="h-4 w-4 text-brand-600" />
                Team Seats / Users:
              </label>
              <span className="text-base font-extrabold text-foreground px-2.5 py-0.5 rounded-lg bg-secondary">
                {teamSize} {teamSize === 1 ? "User" : "Users"}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>1 Seat (Solo)</span>
              <span>10 Seats (Team)</span>
              <span>25 Seats (Agency)</span>
            </div>
          </div>
        </div>

        {/* Calculated Results Summary Card */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-6">
          <div>
            <span className="text-xs uppercase font-bold text-muted-foreground">
              Estimated Total Investment
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-foreground">
                ${totalMonthlyCost}
              </span>
              <span className="text-xs text-muted-foreground">
                /month {isAnnual && "(billed annually)"}
              </span>
            </div>
            {isAnnual && annualSavings > 0 && (
              <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <Sparkles className="h-3.5 w-3.5" />
                <span>You save ${annualSavings}/year with annual billing</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Annual Contract Total:</span>
              <span className="font-bold text-foreground">${annualTotalCost} / year</span>
            </div>
            <div className="flex justify-between">
              <span>Included Tier:</span>
              <span className="font-bold text-foreground">{tier.name} Plan</span>
            </div>
            <div className="flex justify-between">
              <span>Assigned Seats:</span>
              <span className="font-bold text-foreground">{teamSize} Active User{teamSize > 1 ? "s" : ""}</span>
            </div>
          </div>

          <a
            href={`/go/${tool.slug}`}
            target="_blank"
            rel="nofollow sponsored"
            className="w-full inline-flex items-center justify-center h-11 px-4 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-sm hover:shadow"
          >
            <span>Proceed to {tool.name} with Calculated Tier</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
