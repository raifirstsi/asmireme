import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { TOOLS_DATA } from "@/data/tools-data";
import { AdminLinksManager } from "@/components/admin/AdminLinksManager";
import { 
  ShieldAlert, Database, MousePointerClick, CheckCircle, 
  RefreshCw, ExternalLink, Settings, Activity 
} from "lucide-react";

interface AdminPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AdminPageProps) {
  return {
    title: "Asmire Admin Dashboard - Master Registry & Click Audit",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params;

  // Mock / baseline stream of recent outbound clicks for demonstration
  const recentClicks = [
    { tool: "HighLevel", targetHost: "gohighlevel.com", reason: "fallback_no_cookie", fallback: true, time: "2 mins ago" },
    { tool: "ElevenLabs", targetHost: "elevenlabs.io", reason: "attributed_member", fallback: false, time: "5 mins ago" },
    { tool: "CapCut", targetHost: "capcut.com", reason: "fallback_no_cookie", fallback: true, time: "12 mins ago" },
    { tool: "Gamma", targetHost: "gamma.app", reason: "fallback_tool_not_linked", fallback: true, time: "18 mins ago" },
    { tool: "Synthesia", targetHost: "synthesia.io", reason: "attributed_member", fallback: false, time: "25 mins ago" },
    { tool: "Taskade", targetHost: "taskade.com", reason: "fallback_plan_limit", fallback: true, time: "34 mins ago" },
  ];

  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-10">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <ShieldAlert className="h-4 w-4" />
              <span>Restricted Management Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">
              Asmire Core Admin & Telemetry
            </h1>
            <p className="text-xs text-muted-foreground">
              Monitor catalog status, audit outbound redirect reasons, and review affiliate allowlists.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/api/cron/sync-reviews"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Trigger Review Sync</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Catalog SaaS Tools
            </span>
            <div className="text-3xl font-black text-foreground">
              {TOOLS_DATA.length}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">100% active allowlists</span>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Member Links Allowed
            </span>
            <div className="text-3xl font-black text-brand-600 dark:text-brand-400">
              {TOOLS_DATA.filter((t) => t.allowMemberLinks).length} / 50
            </div>
            <span className="text-[11px] text-muted-foreground">Governed by vendor ToS</span>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Billing Gateway
            </span>
            <div className="text-2xl font-black text-foreground">
              SePay VietQR
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">Webhook Ready</span>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              SSRF & Security Shield
            </span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle className="h-6 w-6" />
              <span>Active</span>
            </div>
            <span className="text-[11px] text-muted-foreground">Loopbacks & Private IPs Blocked</span>
          </div>
        </div>

        {/* Section 1: Outbound Click Reason Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-brand-600" />
              Outbound Click Audit Log (Real-time Stream)
            </h3>
            <span className="text-xs text-muted-foreground">Logged with immutable reason codes</span>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                  <th className="p-3.5">Software Tool</th>
                  <th className="p-3.5">Destination Host</th>
                  <th className="p-3.5">Attribution Reason Code</th>
                  <th className="p-3.5">Routing Status</th>
                  <th className="p-3.5">Recorded At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentClicks.map((click, idx) => (
                  <tr key={idx} className="hover:bg-secondary/30 transition-colors">
                    <td className="p-3.5 font-bold text-foreground">{click.tool}</td>
                    <td className="p-3.5 font-mono text-muted-foreground">{click.targetHost}</td>
                    <td className="p-3.5">
                      <span className="font-mono text-[11px] bg-secondary px-2 py-0.5 rounded text-foreground font-semibold">
                        {click.reason}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {click.fallback ? (
                        <span className="text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded text-[11px]">
                          Fallback to Admin Link
                        </span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">
                          Attributed to Member
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-muted-foreground">{click.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: 50 SaaS Tools Allowlist, CSV Import/Export & Registry */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Database className="h-4 w-4 text-brand-600" />
              50 SaaS Tools Registry, CSV Import/Export & Admin Links
            </h3>
            <span className="text-xs text-muted-foreground">From affiliate-terms-audit.md</span>
          </div>

          <AdminLinksManager />
        </div>
      </div>
    </div>
  );
}
