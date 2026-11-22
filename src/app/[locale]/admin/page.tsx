import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { verifySessionToken } from "@/services/auth";
import { getAdminDashboardData } from "@/services/admin";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { ShieldAlert, RefreshCw, Lock, UserCheck, ShieldCheck } from "lucide-react";

interface AdminPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AdminPageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" 
      ? "Bảng Quản Trị Hệ Thống Asmire - Quản Lý Link, Doanh Thu & Radar Telemetry" 
      : "Asmire Admin Dashboard - Master Registry, Revenue & Telemetry Radar",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  // Enforce cryptographic session authentication
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("asmire_session")?.value;
  const sessionUser = sessionToken ? verifySessionToken(sessionToken) : null;

  if (!sessionUser) {
    redirect(`/${locale}/account/login?redirect=/${locale}/admin`);
  }

  // Enforce Super Admin authorization: striverle@gmail.com or role ADMIN
  const isAdmin = 
    sessionUser.email.toLowerCase() === "striverle@gmail.com" || 
    sessionUser.role === "ADMIN";

  if (!isAdmin) {
    redirect(`/${locale}/account?error=unauthorized`);
  }

  const stats = await getAdminDashboardData();

  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>{isVi ? "Khu Vực Quản Trị Cấp Cao (Authenticated Admin)" : "Super Admin Authorized Console"}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20">
                {sessionUser.email}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">
              {isVi ? "Asmire Command Center & Radar Khách Hàng" : "Asmire Master Control & Interaction Radar"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isVi 
                ? "Theo dõi toàn bộ 130 link affiliate của Admin, radar click thời gian thực, Top 10 tool & Top 10 người dùng giới thiệu."
                : "Manage all 130 admin master affiliate links, real-time click radar, Top 10 tools & Top 10 referring members."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/api/cron/sync-reviews"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors shadow-xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{isVi ? "Đồng Bộ Đánh Giá (Cron)" : "Trigger Review Sync"}</span>
            </Link>

            <Link
              href={`/${locale}/account`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>{isVi ? "Xem View Hội Viên" : "Member View"}</span>
            </Link>
          </div>
        </div>

        {/* Tabbed Interactive Client Dashboard */}
        <AdminDashboardClient stats={stats} locale={locale as Locale} />
      </div>
    </div>
  );
}
