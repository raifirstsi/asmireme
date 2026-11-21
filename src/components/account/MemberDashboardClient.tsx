"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToolItem } from "@/types";
import { TOOLS_DATA } from "@/data/tools-data";
import { Locale } from "@/lib/i18n";
import { validateMemberAffiliateLink } from "@/lib/allowlist";
import { 
  Sparkles, Link2, Copy, CheckCheck, QrCode, Shield, 
  ExternalLink, Lock, CheckCircle2, AlertCircle, RefreshCw, LogOut, ArrowRight 
} from "lucide-react";

interface MemberSlot {
  slotIndex: number;
  toolSlug: string;
  affiliateUrl: string;
  status: "VALID" | "INVALID" | "EMPTY";
  lastSwappedAt: string;
}

interface MemberDashboardClientProps {
  user: {
    userId: string;
    email: string;
    memberId: string;
    referralCode: string;
  };
  locale: Locale;
  isPro?: boolean;
  daysRemaining?: number;
}

export function MemberDashboardClient({ user, locale, isPro = false, daysRemaining = 0 }: MemberDashboardClientProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"LINKS" | "ANALYTICS" | "BILLING">("LINKS");

  // Initial 3 active slots for Standard plan
  const [slots, setSlots] = useState<MemberSlot[]>([
    {
      slotIndex: 1,
      toolSlug: "highlevel",
      affiliateUrl: "https://www.gohighlevel.com/?fp_ref=my_sample_code",
      status: "VALID",
      lastSwappedAt: "2027-11-20",
    },
    {
      slotIndex: 2,
      toolSlug: "elevenlabs",
      affiliateUrl: "https://elevenlabs.io/?via=my_voice_ref",
      status: "VALID",
      lastSwappedAt: "2027-11-18",
    },
    {
      slotIndex: 3,
      toolSlug: "capcut",
      affiliateUrl: "",
      status: "EMPTY",
      lastSwappedAt: "2027-11-15",
    },
  ]);

  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ slotIndex: number; text: string; isError: boolean } | null>(null);

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : "https://asmire.me"}/r/${user.referralCode}`;

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdateSlot = (slotIndex: number, toolSlug: string, affiliateUrl: string) => {
    setSavingIndex(slotIndex);
    setFeedback(null);

    // Validate using strict allowlist
    const validation = validateMemberAffiliateLink(toolSlug, affiliateUrl);

    setTimeout(() => {
      if (!validation.isValid) {
        setFeedback({
          slotIndex,
          text: validation.error || "Invalid link.",
          isError: true,
        });
      } else {
        setSlots((prev) =>
          prev.map((s) =>
            s.slotIndex === slotIndex
              ? { ...s, toolSlug, affiliateUrl: validation.normalizedUrl!, status: "VALID" }
              : s
          )
        );
        setFeedback({
          slotIndex,
          text: "Link successfully verified & active!",
          isError: false,
        });
      }
      setSavingIndex(null);
    }, 400);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`/${locale}`);
  };

  return (
    <div className="space-y-10">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Community Member Portal
            </span>
            {isPro ? (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border border-zinc-950 dark:border-white flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>Pro Member (All 50 Tools)</span>
              </span>
            ) : (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-foreground border border-border">
                Standard Plan ($0 Free)
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
            Welcome, {user.email.split("@")[0]}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Member ID: <code className="text-foreground font-mono">{user.memberId}</code> • Referral Code: <code className="text-zinc-900 dark:text-zinc-100 font-mono font-bold">{user.referralCode}</code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isPro ? (
            <Link
              href={`/${locale}/account/billing`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-all shadow-xs"
            >
              <Shield className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Manage Billing ({daysRemaining}d left)</span>
            </Link>
          ) : (
            <Link
              href={`/${locale}/account/billing`}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-full bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 transition-all shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Upgrade to Pro ($29/mo)</span>
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="p-2 text-muted-foreground hover:text-foreground rounded-full border border-border bg-card hover:bg-secondary"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Share Link Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Link2 className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
              Your Shareable Referral Link (365-Day Attribution)
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Share this link on YouTube, your blog, Twitter, or client audits. Visitors retain a signed first-party cookie for 1 full year.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 max-w-xl">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full h-11 px-4 rounded-full border border-border bg-background text-xs font-mono text-foreground focus:outline-none select-all"
          />
          <button
            onClick={copyShareLink}
            className="flex items-center gap-1.5 h-11 px-5 rounded-full bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs shrink-0 transition-all shadow-xs"
          >
            {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab("LINKS")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "LINKS" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          My 3 Active Tool Slots
        </button>
        <button
          onClick={() => setActiveTab("ANALYTICS")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "ANALYTICS" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Referral Analytics
        </button>
        <button
          onClick={() => setActiveTab("BILLING")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "BILLING" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Plan & Billing
        </button>
      </div>

      {/* Tab 1: Slots Management */}
      {activeTab === "LINKS" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-foreground">
              Standard Plan Slots Used: <span className="text-foreground underline">3 of 3 Available</span>
            </span>
            <span className="text-muted-foreground">
              Slot swaps throttled to 1 change per 30 days
            </span>
          </div>

          {/* 3 Active Tool Slots */}
          <div className="space-y-4">
            {slots.map((slot) => {
              const currentTool = TOOLS_DATA.find((t) => t.slug === slot.toolSlug) || TOOLS_DATA[0];

              return (
                <div
                  key={slot.slotIndex}
                  className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card space-y-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-border/80">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-black text-foreground">
                        #{slot.slotIndex}
                      </span>
                      <span className="font-bold text-sm text-foreground">
                        Active Slot: {currentTool.name}
                      </span>
                      {slot.status === "VALID" && (
                        <span className="inline-flex items-center text-[10px] font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full border border-border">
                          <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-500" />
                          Verified & Active
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-muted-foreground">
                      Network: {currentTool.affiliateNetwork}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                    <div className="md:col-span-4">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Select Software Tool:
                      </label>
                      <select
                        value={slot.toolSlug}
                        onChange={(e) => {
                          const newSlug = e.target.value;
                          setSlots((prev) =>
                            prev.map((s) => (s.slotIndex === slot.slotIndex ? { ...s, toolSlug: newSlug } : s))
                          );
                        }}
                        className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:outline-none"
                      >
                        {TOOLS_DATA.map((t) => (
                          <option key={t.slug} value={t.slug}>
                            {t.name} (${t.startingPrice}/mo)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-6">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Your Personal Affiliate Link:
                      </label>
                      <input
                        type="url"
                        value={slot.affiliateUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSlots((prev) =>
                            prev.map((s) => (s.slotIndex === slot.slotIndex ? { ...s, affiliateUrl: val } : s))
                          );
                        }}
                        placeholder={`https://www.${slot.toolSlug}.com/?via=your_id`}
                        className="w-full h-11 px-3.5 rounded-xl border border-border bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-zinc-400"
                      />
                    </div>

                    <div className="md:col-span-2 pt-5">
                      <button
                        onClick={() => handleUpdateSlot(slot.slotIndex, slot.toolSlug, slot.affiliateUrl)}
                        disabled={savingIndex === slot.slotIndex}
                        className="w-full h-11 rounded-full bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        {savingIndex === slot.slotIndex ? (
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <span>Verify & Save</span>
                        )}
                      </button>
                    </div>
                  </div>

                  {feedback && feedback.slotIndex === slot.slotIndex && (
                    <div
                      className={`text-xs p-2.5 rounded-xl border flex items-center gap-2 ${
                        feedback.isError
                          ? "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {feedback.isError ? <AlertCircle className="h-4 w-4 shrink-0" /> : <CheckCircle2 className="h-4 w-4 shrink-0" />}
                      <span>{feedback.text}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Remaining 47 Tools Locked Banner */}
          <div className="p-8 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/30 text-center space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground mb-1">
              <Lock className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-foreground">
              47 Additional AI Tools Locked (Standard Plan Limit: 3 Slots)
            </h4>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Any visitor clicks on the remaining 47 tools currently fall back to Asmire's owner link. Upgrade to Pro for $29/mo to unlock all 50 tools with unlimited link slots.
            </p>
            <Link
              href={`/${locale}/membership`}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold rounded-full bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 transition-all shadow-xs"
            >
              <span>Unlock All 50 Tools on Pro</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: Analytics Summary */}
      {activeTab === "ANALYTICS" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-border bg-card">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Total Referred Visits
              </span>
              <div className="text-3xl font-black text-foreground mt-1">128</div>
              <span className="text-[11px] text-muted-foreground">Unique visitors via /r/{user.referralCode}</span>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Outbound CTA Clicks
              </span>
              <div className="text-3xl font-black text-brand-600 dark:text-brand-400 mt-1">42</div>
              <span className="text-[11px] text-muted-foreground">Routed to your affiliate links</span>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Top Clicked Tool
              </span>
              <div className="text-2xl font-black text-foreground mt-1">HighLevel</div>
              <span className="text-[11px] text-emerald-600 font-semibold">24 clicks (57% share)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card text-xs text-muted-foreground">
            * Note: Asmire tracks on-site click attributions and outbound redirects. Actual commission earnings are calculated and paid directly to you by each SaaS vendor.
          </div>
        </div>
      )}

      {/* Tab 3: Plan & Billing */}
      {activeTab === "BILLING" && (
        <div className="space-y-6 max-w-xl">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h4 className="font-bold text-sm text-foreground">
                  Current Tier: {isPro ? "Asmire Pro" : "Asmire Standard"}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isPro
                    ? `Prepaid 30-day active cycle • ${daysRemaining} days remaining`
                    : "Free forever • 3 tool slots"}
                </p>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  isPro
                    ? "bg-brand-500/10 text-brand-600 dark:text-brand-400"
                    : "bg-emerald-500/10 text-emerald-600"
                }`}
              >
                Active
              </span>
            </div>

            <div className="space-y-3 text-xs text-muted-foreground">
              {isPro ? (
                <p>
                  You have full access to all 50 AI SaaS tool affiliate slots and 365-day first-touch referral attribution.
                </p>
              ) : (
                <p>
                  Looking to monetize all 50 SaaS tools without slot limits? Upgrade with automated VietQR banking.
                </p>
              )}
              <div>
                <Link
                  href={`/${locale}/account/billing`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-xs"
                >
                  <Shield className="h-3.5 w-3.5" />
                  <span>{isPro ? "Open Billing & Invoices Management" : "Upgrade to Pro ($29 / 725,000 VND / month)"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
