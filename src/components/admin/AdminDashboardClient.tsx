"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminStats, ToolClickStat, MemberLeaderboardStat } from "@/services/admin";
import { AdminLinksManager } from "@/components/admin/AdminLinksManager";
import { Locale } from "@/lib/i18n";
import { 
  ShieldAlert, Database, MousePointerClick, CheckCircle2, 
  DollarSign, Users, CreditCard, Activity, ArrowUpRight, 
  Download, RefreshCw, Check, Sparkles, TrendingUp, Layers,
  Flame, Award, Search, ExternalLink, BarChart3, Clock,
  Globe, ShieldCheck, UserCheck, AlertCircle
} from "lucide-react";

interface AdminDashboardClientProps {
  stats: AdminStats;
  locale: Locale;
}

export function AdminDashboardClient({ stats, locale }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"RADAR" | "TOOLS_ANALYTICS" | "LINKS" | "REVENUE" | "MEMBERS" | "CLICKS_STREAM">("RADAR");
  const [toolSearch, setToolSearch] = useState("");
  const isVi = locale === "vi";

  // Filter tools for the detailed analytics tab
  const filteredTools = (stats.allClickedTools || []).filter((t) =>
    t.toolName.toLowerCase().includes(toolSearch.toLowerCase()) ||
    t.toolSlug.toLowerCase().includes(toolSearch.toLowerCase()) ||
    t.category.toLowerCase().includes(toolSearch.toLowerCase()) ||
    t.targetHost.toLowerCase().includes(toolSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-secondary/80 border border-border overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("RADAR")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "RADAR"
              ? "bg-card text-foreground shadow-xs ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Activity className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span>{isVi ? "Radar Điều Khiển & Top 10" : "Radar Telemetry & Top 10"}</span>
        </button>

        <button
          onClick={() => setActiveTab("TOOLS_ANALYTICS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "TOOLS_ANALYTICS"
              ? "bg-card text-foreground shadow-xs ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-amber-500" />
          <span>{isVi ? "Thống Kê Chi Tiết Từng Tool" : "Tool Click Breakdown"}</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-amber-500/10 text-amber-600 font-extrabold">
            {stats.allClickedTools?.length || 0} active
          </span>
        </button>

        <button
          onClick={() => setActiveTab("LINKS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "LINKS"
              ? "bg-card text-foreground shadow-xs ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Database className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>{isVi ? "130 Link Affiliate Của Admin" : "Master Affiliate Links"}</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-brand-500/10 text-brand-600 font-extrabold">
            {stats.totalTools}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("REVENUE")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "REVENUE"
              ? "bg-card text-foreground shadow-xs ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <DollarSign className="h-4 w-4 text-emerald-500" />
          <span>{isVi ? "Doanh Thu & Gói Pro" : "Revenue & Subscriptions"}</span>
          {stats.proMembers > 0 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-emerald-500/10 text-emerald-600 font-extrabold">
              {stats.proMembers} Pro
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("MEMBERS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "MEMBERS"
              ? "bg-card text-foreground shadow-xs ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="h-4 w-4 text-blue-500" />
          <span>{isVi ? "Người Dùng & Hội Viên" : "Users & Referrers"}</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-blue-500/10 text-blue-600 font-extrabold">
            {stats.totalMembers}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("CLICKS_STREAM")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "CLICKS_STREAM"
              ? "bg-card text-foreground shadow-xs ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MousePointerClick className="h-4 w-4 text-purple-500" />
          <span>{isVi ? "Luồng Click Thời Gian Thực" : "Real-time Click Log"}</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-purple-500/10 text-purple-600 font-extrabold">
            {stats.totalClicks}
          </span>
        </button>
      </div>

      {/* TAB 1: RADAR OVERVIEW & TOP 10 */}
      {activeTab === "RADAR" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top 4 Real KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Revenue */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isVi ? "Doanh Thu Đã Thanh Toán" : "Verified Paid Revenue"}
                </span>
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <DollarSign className="h-4 w-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground">
                {stats.totalRevenueVnd.toLocaleString("vi-VN")} ₫
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>${stats.totalRevenueUsd} USD</span>
                <span className="text-muted-foreground font-normal">• {stats.proMembers} Pro</span>
              </div>
            </div>

            {/* Card 2: Registered Members */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isVi ? "Tổng Người Dùng / Hội Viên" : "Registered Accounts"}
                </span>
                <span className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Users className="h-4 w-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground">
                {stats.totalMembers}
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground">{stats.proMembers}</span> Pro (
                {stats.totalMembers > 0 ? Math.round((stats.proMembers / stats.totalMembers) * 100) : 0}% tỉ lệ nâng cấp)
              </div>
            </div>

            {/* Card 3: Catalog Tools */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isVi ? "Công Cụ SaaS Đang Quản Lý" : "SaaS Catalog Tools"}
                </span>
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Layers className="h-4 w-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground">
                {stats.totalTools} Tools
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>100% Gắn Link & Audit Giá Chuẩn</span>
              </div>
            </div>

            {/* Card 4: Click Attribution Ratio */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isVi ? "Hoa Hồng Thu Về Admin" : "Admin Fallback Traffic"}
                </span>
                <span className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                  <MousePointerClick className="h-4 w-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground">
                {stats.adminFallbackPct}%
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground">{stats.adminFallbackClicks}</span> clicks về Admin /{" "}
                <span className="font-bold text-brand-600">{stats.memberAttributedClicks}</span> về Member
              </div>
            </div>
          </div>

          {/* Customer Interaction Telemetry Radar */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-black text-base text-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4 text-brand-600" />
                  <span>{isVi ? "Radar Phân Bổ Hành Vi Khách Hàng (Click Traffic Radar)" : "Customer Click Interaction Radar"}</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isVi 
                    ? "Cơ chế phân luồng tự động giữa link của Admin và hoa hồng của Member khi khách hàng tương tác tìm kiếm phần mềm"
                    : "Automatic traffic attribution between Admin master links and Member referrals"}
                </p>
              </div>

              <div className="text-xs font-mono font-bold px-3 py-1 bg-secondary rounded-lg text-foreground">
                {stats.totalClicks} Tổng Lượt Click Ghi Nhận
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Khách Vãng Lai Trực Tiếp</span>
                <div className="text-xl font-black text-foreground">{stats.clickReasonStats.directAdmin}</div>
                <p className="text-[11px] text-muted-foreground leading-tight">100% hoa hồng về link của Admin</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Ghi Nhận Cho Member</span>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{stats.clickReasonStats.memberAttributed}</div>
                <p className="text-[11px] text-muted-foreground leading-tight">Khách mua qua link của Member</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Vượt Hạn Mức Member (3 Slot)</span>
                <div className="text-xl font-black text-amber-600 dark:text-amber-400">{stats.clickReasonStats.planLimitFallback}</div>
                <p className="text-[11px] text-muted-foreground leading-tight">Tự động fallback về link Admin</p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Fallback Ngoại Lệ / Khác</span>
                <div className="text-xl font-black text-purple-600 dark:text-purple-400">{stats.clickReasonStats.otherFallback}</div>
                <p className="text-[11px] text-muted-foreground leading-tight">Tool chưa gắn link / Bot lọc sạch</p>
              </div>
            </div>
          </div>

          {/* TWO RADAR LEADERBOARDS: TOP 10 TOOLS & TOP 10 MEMBERS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PANEL 1: TOP 10 MOST CLICKED TOOLS */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-base text-foreground flex items-center gap-2">
                    <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span>{isVi ? "Top 10 Tool Được Click Nhiều Nhất" : "Top 10 Most Clicked Tools"}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {isVi ? "Đo lường mức độ quan tâm thực tế của khách hàng" : "Ranked by total outbound referral redirects"}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab("TOOLS_ANALYTICS")}
                  className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
                >
                  {isVi ? "Xem tất cả" : "View all"} <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {stats.topTools.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground text-xs space-y-2">
                  <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground/50" />
                  <p className="font-bold">Chưa có lượt click nào được ghi nhận</p>
                  <p>Khi người dùng bấm vào các nút &quot;Dùng Thử Miễn Phí&quot; hoặc &quot;Xem Giá&quot;, hệ thống sẽ tự động tổng hợp tại đây.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.topTools.map((tool, idx) => {
                    const maxClicks = stats.topTools[0].totalClicks || 1;
                    const percent = Math.round((tool.totalClicks / maxClicks) * 100);

                    return (
                      <div key={tool.toolSlug} className="p-3 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/40 transition-colors space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full font-black text-[10px] ${
                              idx === 0 
                                ? "bg-amber-500 text-black shadow-xs" 
                                : idx === 1 
                                ? "bg-zinc-300 dark:bg-zinc-700 text-foreground" 
                                : idx === 2 
                                ? "bg-amber-700 text-white" 
                                : "bg-secondary text-muted-foreground"
                            }`}>
                              {idx + 1}
                            </span>
                            <span className="font-black text-foreground text-sm">{tool.toolName}</span>
                            <span className="text-[10px] text-muted-foreground font-mono">({tool.targetHost})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-black text-brand-600 dark:text-brand-400 text-sm">
                              {tool.totalClicks} clicks
                            </span>
                            <a
                              href={`/go/${tool.toolSlug}`}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              title="Test luồng điều hướng"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>

                        {/* Progress Bar & Breakdown */}
                        <div className="space-y-1">
                          <div className="w-full h-2 rounded-full bg-secondary overflow-hidden flex">
                            <div
                              style={{ width: `${percent}%` }}
                              className="bg-brand-600 h-full rounded-full transition-all"
                            />
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                            <span>
                              Hoa hồng Admin: <strong className="text-foreground">{tool.adminClicks}</strong> ({tool.adminSharePct}%)
                            </span>
                            <span>
                              Ghi nhận Member: <strong className="text-foreground">{tool.memberClicks}</strong>
                            </span>
                            <span>{tool.lastClickedAt}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* PANEL 2: TOP 10 REFERRING MEMBERS */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-base text-foreground flex items-center gap-2">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span>{isVi ? "Top 10 Người Dùng Giới Thiệu (Leaderboard)" : "Top 10 Referring Members"}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {isVi ? "Xếp hạng theo tổng số clicks affiliate tạo ra" : "Ranked by outbound CTA clicks driven"}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab("MEMBERS")}
                  className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
                >
                  {isVi ? "Xem tất cả" : "View all"} <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {stats.topReferringMembers.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground text-xs space-y-2">
                  <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground/50" />
                  <p className="font-bold">Chưa có thành viên nào chia sẻ link</p>
                  <p>Khi các hội viên giới thiệu bạn bè hoặc quảng bá mã referral, bảng xếp hạng sẽ tự động cập nhật.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.topReferringMembers.map((member, idx) => (
                    <div key={member.memberId} className="p-3 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/40 transition-colors flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full font-black text-xs ${
                          idx === 0 
                            ? "bg-amber-500 text-black font-extrabold" 
                            : idx === 1 
                            ? "bg-zinc-300 dark:bg-zinc-700 text-foreground" 
                            : idx === 2 
                            ? "bg-amber-700 text-white" 
                            : "bg-secondary text-muted-foreground"
                        }`}>
                          {idx + 1}
                        </span>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground text-xs">{member.email}</span>
                            <span className={`px-1.5 py-0.2 rounded text-[10px] font-extrabold ${
                              member.plan.includes("PRO") 
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" 
                                : "bg-secondary text-muted-foreground"
                            }`}>
                              {member.plan}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span>Mã: <code className="font-mono text-foreground font-bold">{member.referralCode}</code></span>
                            <span>•</span>
                            <span>{member.totalVisits} lượt truy cập</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-black text-foreground">
                          {member.totalCtaClicks}
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">clicks</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TOOL CLICKS DETAILED BREAKDOWN */}
      {activeTab === "TOOLS_ANALYTICS" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card">
            <div>
              <h3 className="font-black text-base text-foreground">
                {isVi ? "Thống Kê Chi Tiết Số Lượt Click Của Từng Công Cụ" : "Detailed Tool Click Breakdown"}
              </h3>
              <p className="text-xs text-muted-foreground">
                Theo dõi chi tiết số lượt click khách hàng bấm vào từng tool, tỉ lệ fallback về Admin link và domain đích
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={toolSearch}
                onChange={(e) => setToolSearch(e.target.value)}
                placeholder="Tìm kiếm tool / domain..."
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                  <th className="p-3.5">Hạng</th>
                  <th className="p-3.5">Tên Công Cụ</th>
                  <th className="p-3.5">Danh Mục</th>
                  <th className="p-3.5">Tên Miền Đích</th>
                  <th className="p-3.5 text-center">Tổng Clicks</th>
                  <th className="p-3.5 text-center">Về Link Admin</th>
                  <th className="p-3.5 text-center">Về Member</th>
                  <th className="p-3.5 text-right">Tỉ Lệ Admin (%)</th>
                  <th className="p-3.5 text-right">Lần Cuối</th>
                  <th className="p-3.5 text-center">Kiểm Tra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTools.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-muted-foreground">
                      Không tìm thấy công cụ nào phù hợp với từ khóa tìm kiếm.
                    </td>
                  </tr>
                ) : (
                  filteredTools.map((t, idx) => (
                    <tr key={t.toolSlug} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-3.5 font-bold font-mono text-muted-foreground">#{idx + 1}</td>
                      <td className="p-3.5">
                        <span className="font-bold text-foreground text-sm">{t.toolName}</span>
                        <div className="text-[10px] text-muted-foreground font-mono">{t.toolSlug}</div>
                      </td>
                      <td className="p-3.5 text-muted-foreground">{t.category}</td>
                      <td className="p-3.5 font-mono text-foreground font-semibold">{t.targetHost}</td>
                      <td className="p-3.5 text-center font-black text-brand-600 dark:text-brand-400 text-sm">
                        {t.totalClicks}
                      </td>
                      <td className="p-3.5 text-center font-bold text-amber-600 dark:text-amber-400">
                        {t.adminClicks}
                      </td>
                      <td className="p-3.5 text-center font-bold text-emerald-600 dark:text-emerald-400">
                        {t.memberClicks}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-foreground">
                        {t.adminSharePct}%
                      </td>
                      <td className="p-3.5 text-right text-muted-foreground text-[11px] whitespace-nowrap">
                        {t.lastClickedAt}
                      </td>
                      <td className="p-3.5 text-center">
                        <a
                          href={`/go/${t.toolSlug}`}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-secondary hover:bg-secondary/80 text-[10px] font-bold text-foreground transition-colors"
                        >
                          <span>Test</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MASTER AFFILIATE LINKS (ADMIN'S OWN LINKS) */}
      {activeTab === "LINKS" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-brand-500/5 border border-brand-500/20 text-xs">
            <p className="font-bold text-foreground">
              {isVi ? "Trung Tâm Điều Khiển Link Affiliate Gốc Của Admin (Master Fallback System)" : "Admin Master Affiliate Fallback Hub"}
            </p>
            <p className="text-muted-foreground mt-1 leading-relaxed">
              {isVi
                ? "Toàn bộ 130 công cụ SaaS trên website đều có một Link Affiliate mặc định của Admin. Khi độc giả vào web không qua mã giới thiệu của ai, hoặc Member chưa gắn link công cụ đó, hệ thống /go/[slug] sẽ tự động chuyển hướng và ghi nhận 100% doanh thu hoa hồng trực tiếp cho tài khoản Admin."
                : "Every SaaS tool in the catalog has a default Admin Affiliate URL. When visitors land directly or when a member does not link that tool, the /go/[slug] router automatically falls back to these master admin links, securing direct vendor commissions."}
            </p>
          </div>

          <AdminLinksManager />
        </div>
      )}

      {/* TAB 4: REVENUE & ORDERS */}
      {activeTab === "REVENUE" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Tổng Thu VietQR (SePay)</span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {stats.totalRevenueVnd.toLocaleString("vi-VN")} ₫
              </div>
              <p className="text-[11px] text-muted-foreground">Ngân hàng TPBank tự động khớp lệnh</p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Tổng Thu Quốc Tế (PayPal)</span>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                ${stats.totalRevenueUsd} USD
              </div>
              <p className="text-[11px] text-muted-foreground">Thanh toán thẻ tín dụng & ví PayPal</p>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Hội Viên Pro Đang Hoạt Động</span>
              <div className="text-2xl font-black text-foreground">
                {stats.proMembers} / {stats.totalMembers}
              </div>
              <p className="text-[11px] text-muted-foreground">Gói $29/tháng (725.000đ)</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
            <div className="p-4 border-b border-border font-bold text-sm text-foreground flex items-center justify-between">
              <span>{isVi ? "Danh Sách Hóa Đơn & Đơn Hàng Gần Đây" : "Invoices & Payment Orders"}</span>
              <span className="text-xs text-muted-foreground font-normal">Dữ liệu thực tế từ cơ sở dữ liệu</span>
            </div>

            {stats.recentOrders.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-xs space-y-2">
                <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground/50" />
                <p className="font-bold">Chưa có giao dịch thanh toán nào phát sinh</p>
                <p>Khi người dùng thực hiện nâng cấp gói Pro qua VietQR (SePay) hoặc PayPal, hóa đơn thật sẽ xuất hiện tại đây.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40 font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                    <th className="p-3.5">Mã Đơn Hàng</th>
                    <th className="p-3.5">Email Khách Hàng</th>
                    <th className="p-3.5">Gói Dịch Vụ</th>
                    <th className="p-3.5">Số Tiền</th>
                    <th className="p-3.5">Cổng Thanh Toán</th>
                    <th className="p-3.5">Ngày Thanh Toán</th>
                    <th className="p-3.5">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {stats.recentOrders.map((ord) => (
                    <tr key={ord.orderCode} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-3.5 font-bold font-mono text-foreground">{ord.orderCode}</td>
                      <td className="p-3.5 text-foreground">{ord.email}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-brand-500/10 text-brand-600">
                          {ord.plan}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-foreground">{ord.amount}</td>
                      <td className="p-3.5 text-muted-foreground">{ord.gateway}</td>
                      <td className="p-3.5 text-muted-foreground">{ord.date}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded font-extrabold text-[10px] bg-emerald-500/10 text-emerald-600">
                          ✓ {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: USERS & MEMBERS */}
      {activeTab === "MEMBERS" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card">
            <div>
              <h3 className="font-bold text-sm text-foreground">
                {isVi ? "Mạng Lưới Hội Viên & Người Dùng Đăng Ký" : "Member Referral Network"}
              </h3>
              <p className="text-xs text-muted-foreground">Toàn bộ tài khoản đã xác thực OTP trên hệ thống Asmire</p>
            </div>
            <span className="text-xs font-bold text-brand-600 px-3 py-1 rounded-lg bg-brand-500/10">
              {stats.totalMembers} Tài Khoản
            </span>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                  <th className="p-3.5">Email Thành Viên</th>
                  <th className="p-3.5">Vai Trò</th>
                  <th className="p-3.5">Mã Giới Thiệu (Referral Code)</th>
                  <th className="p-3.5">Gói Đăng Ký</th>
                  <th className="p-3.5">Clicks Tạo Ra</th>
                  <th className="p-3.5">Ngày Tham Gia</th>
                  <th className="p-3.5">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.recentMembers.map((m, i) => (
                  <tr key={i} className="hover:bg-secondary/30 transition-colors">
                    <td className="p-3.5 font-bold text-foreground flex items-center gap-2">
                      <span>{m.email}</span>
                      {m.role === "ADMIN" && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-rose-500/10 text-rose-600 border border-rose-500/20">
                          ADMIN
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-mono text-muted-foreground">{m.role}</td>
                    <td className="p-3.5">
                      <span className="font-mono bg-secondary px-2 py-0.5 rounded font-bold text-[11px] text-foreground">
                        {m.referralCode}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        m.plan.includes("PRO") 
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {m.plan}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-foreground">{m.clicks} clicks</td>
                    <td className="p-3.5 text-muted-foreground">{m.joinedAt}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded font-extrabold text-[10px] bg-emerald-500/10 text-emerald-600">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: CLICK AUDIT STREAM (REAL-TIME LOG) */}
      {activeTab === "CLICKS_STREAM" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-brand-600" />
              {isVi ? "Nhật Ký Phân Bổ Điều Hướng Outbound Thực Tế (/go/[slug])" : "Outbound Click Telemetry & Reason Codes"}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Hệ thống gắn mã lý do bất biến (Immutable Reason Code) và mã băm ẩn danh khách truy cập (Visitor Hash) cho từng lượt click.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
            {stats.recentClicks.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-xs space-y-2">
                <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground/50" />
                <p className="font-bold">Chưa có lượt click outbound nào</p>
                <p>Mỗi khi có khách bấm vào link phần mềm, luồng ghi nhận thời gian thực sẽ xuất hiện tại đây.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40 font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                    <th className="p-3.5">Thời Gian</th>
                    <th className="p-3.5">Công Cụ SaaS</th>
                    <th className="p-3.5">Tên Miền Đích</th>
                    <th className="p-3.5">Visitor Hash</th>
                    <th className="p-3.5">Mã Lý Do Phân Bổ</th>
                    <th className="p-3.5">Luồng Ghi Nhận</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {stats.recentClicks.map((click, idx) => (
                    <tr key={click.id || idx} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-3.5 text-muted-foreground whitespace-nowrap">{click.time}</td>
                      <td className="p-3.5 font-bold text-foreground">{click.tool}</td>
                      <td className="p-3.5 font-mono text-muted-foreground font-semibold">{click.targetHost}</td>
                      <td className="p-3.5 font-mono text-muted-foreground text-[10px]">{click.visitorHash}</td>
                      <td className="p-3.5">
                        <span className="font-mono text-[11px] bg-secondary px-2 py-0.5 rounded text-foreground font-semibold">
                          {click.reason}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {click.fallback ? (
                          <span className="text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded text-[11px]">
                            Fallback về Admin Link
                          </span>
                        ) : (
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">
                            Thuộc về Member Referral
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
