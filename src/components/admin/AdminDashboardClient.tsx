"use client";

import React, { useState } from "react";
import { AdminStats } from "@/services/admin";
import { AdminLinksManager } from "@/components/admin/AdminLinksManager";
import { Locale } from "@/lib/i18n";
import { 
  ShieldAlert, Database, MousePointerClick, CheckCircle2, 
  DollarSign, Users, CreditCard, Activity, ArrowUpRight, 
  Download, RefreshCw, Check, Sparkles, TrendingUp, Layers
} from "lucide-react";

interface AdminDashboardClientProps {
  stats: AdminStats;
  locale: Locale;
}

export function AdminDashboardClient({ stats, locale }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "LINKS" | "REVENUE" | "MEMBERS" | "CLICKS">("OVERVIEW");
  const isVi = locale === "vi";

  return (
    <div className="space-y-8">
      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-secondary/80 border border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab("OVERVIEW")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "OVERVIEW"
              ? "bg-card text-foreground shadow-xs ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Activity className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          <span>{isVi ? "Tổng Quan & Chỉ Số" : "Overview & KPIs"}</span>
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
          <span>{isVi ? "Link Affiliate Của Admin" : "Master Affiliate Links"}</span>
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
          <DollarSign className="h-4 w-4 text-amber-500" />
          <span>{isVi ? "Doanh Thu & Đơn Hàng" : "Revenue & Orders"}</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-emerald-500/10 text-emerald-600 font-extrabold">
            {stats.proMembers} Pro
          </span>
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
          <span>{isVi ? "Quản Lý Người Dùng" : "Users & Members"}</span>
          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-blue-500/10 text-blue-600 font-extrabold">
            {stats.totalMembers}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("CLICKS")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "CLICKS"
              ? "bg-card text-foreground shadow-xs ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MousePointerClick className="h-4 w-4 text-purple-500" />
          <span>{isVi ? "Nhật Ký Clicks & Điều Hướng" : "Click Audit Stream"}</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & KPIS */}
      {activeTab === "OVERVIEW" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top 4 KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Revenue */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isVi ? "Tổng Doanh Thu Thành Viên" : "Total Membership Revenue"}
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
                <span className="text-muted-foreground font-normal">• {stats.proMembers} Pro Subscriptions</span>
              </div>
            </div>

            {/* Card 2: Registered Members */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isVi ? "Cộng Đồng Hội Viên" : "Registered Members"}
                </span>
                <span className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Users className="h-4 w-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground">
                {stats.totalMembers}
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground">{stats.proMembers}</span> Pro Members ({Math.round((stats.proMembers / stats.totalMembers) * 100)}% Conversion)
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
                <span>100% Verified Pricing & Evidence</span>
              </div>
            </div>

            {/* Card 4: Click Attribution Ratio */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isVi ? "Tỷ Lệ Thu Thưởng Admin" : "Admin Fallback Traffic"}
                </span>
                <span className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                  <MousePointerClick className="h-4 w-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-foreground">
                {Math.round((stats.adminFallbackClicks / stats.totalClicks) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground">{stats.adminFallbackClicks}</span> clicks về link Admin / <span className="font-bold text-brand-600">{stats.memberAttributedClicks}</span> về Member
              </div>
            </div>
          </div>

          {/* Quick Summary Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders Panel */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-foreground">
                    {isVi ? "Đơn Hàng Gần Đây (SePay / PayPal)" : "Recent Invoices & Transactions"}
                  </h3>
                  <p className="text-xs text-muted-foreground">Các gói Pro Membership thanh toán thành công</p>
                </div>
                <button
                  onClick={() => setActiveTab("REVENUE")}
                  className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
                >
                  {isVi ? "Xem tất cả" : "View all"} <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="divide-y divide-border text-xs">
                {stats.recentOrders.slice(0, 4).map((order) => (
                  <div key={order.orderCode} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-foreground flex items-center gap-2">
                        <span>{order.orderCode}</span>
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 bg-emerald-500/10 text-emerald-600 rounded">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-[11px] mt-0.5">{order.email}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">{order.amount}</div>
                      <span className="text-[10px] text-muted-foreground">{order.gateway} • {order.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Click Telemetry Summary */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-foreground">
                    {isVi ? "Luồng Click & Điều Hướng Thực Tế" : "Recent Outbound Redirect Stream"}
                  </h3>
                  <p className="text-xs text-muted-foreground">Traffic người dùng click vào /go/[slug]</p>
                </div>
                <button
                  onClick={() => setActiveTab("CLICKS")}
                  className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
                >
                  {isVi ? "Xem luồng chi tiết" : "View stream"} <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="divide-y divide-border text-xs">
                {stats.recentClicks.slice(0, 4).map((c, i) => (
                  <div key={i} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-foreground flex items-center gap-2">
                        <span>{c.tool}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">({c.targetHost})</span>
                      </div>
                      <span className="text-[10px] font-mono bg-secondary px-1.5 py-0.5 rounded text-foreground">
                        {c.reason}
                      </span>
                    </div>
                    <div className="text-right">
                      {c.fallback ? (
                        <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          Fallback về Admin
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Ghi nhận cho Member
                        </span>
                      )}
                      <p className="text-[10px] text-muted-foreground mt-0.5">{c.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MASTER AFFILIATE LINKS (ADMIN'S OWN LINKS) */}
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

      {/* TAB 3: REVENUE & ORDERS */}
      {activeTab === "REVENUE" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-border bg-card space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Tổng Thu VietQR (SePay)</span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {(stats.proMembers * 725000).toLocaleString("vi-VN")} ₫
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
              <span className="text-xs text-muted-foreground font-normal">Cập nhật thời gian thực</span>
            </div>

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
          </div>
        </div>
      )}

      {/* TAB 4: USERS & MEMBERS */}
      {activeTab === "MEMBERS" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card">
            <div>
              <h3 className="font-bold text-sm text-foreground">
                {isVi ? "Mạng Lưới Hội Viên Giới Thiệu (Member Referral Network)" : "Member Referral Network"}
              </h3>
              <p className="text-xs text-muted-foreground">Theo dõi mã giới thiệu, số lượt clicks và trạng thái từng thành viên</p>
            </div>
            <span className="text-xs font-bold text-brand-600 px-3 py-1 rounded-lg bg-brand-500/10">
              {stats.totalMembers} Hội Viên Đăng Ký
            </span>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                  <th className="p-3.5">Email Thành Viên</th>
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
                    <td className="p-3.5 font-bold text-foreground">{m.email}</td>
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

      {/* TAB 5: CLICK AUDIT STREAM */}
      {activeTab === "CLICKS" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-brand-600" />
              {isVi ? "Nhật Ký Phân Bổ Điều Hướng Outbound (/go/[slug])" : "Outbound Click Telemetry & Reason Codes"}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Hệ thống gắn mã lý do bất biến (Immutable Reason Code) cho từng lượt click để bảo vệ tính công bằng giữa Member và Admin.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40 font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                  <th className="p-3.5">Công Cụ SaaS</th>
                  <th className="p-3.5">Tên Miền Đích</th>
                  <th className="p-3.5">Mã Lý Do Phân Bổ</th>
                  <th className="p-3.5">Luồng Ghi Nhận</th>
                  <th className="p-3.5">Thời Gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.recentClicks.map((click, idx) => (
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
                          Fallback về Admin Link
                        </span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">
                          Thuộc về Member Referral
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
      )}
    </div>
  );
}
