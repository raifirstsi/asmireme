import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { getAdminDashboardData } from "@/services/admin";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { ShieldAlert, RefreshCw, Lock } from "lucide-react";

interface AdminPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AdminPageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" 
      ? "Bảng Quản Trị Hệ Thống Asmire - Quản Lý Link, Doanh Thu & Hội Viên" 
      : "Asmire Admin Dashboard - Master Registry, Revenue & Member Telemetry",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";
  const stats = await getAdminDashboardData();

  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <ShieldAlert className="h-4 w-4" />
              <span>{isVi ? "Khu Vực Quản Trị Cấp Cao (Admin Console)" : "Restricted Management Console"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">
              {isVi ? "Asmire Command Center & Báo Cáo" : "Asmire Core Admin & Telemetry"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isVi 
                ? "Theo dõi toàn bộ 130 link affiliate của Admin, doanh thu gói Pro, danh sách thành viên và phân bổ hoa hồng."
                : "Manage all 130 master admin affiliate links, monitor Pro subscriptions, member referrals, and click telemetry."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/api/cron/sync-reviews"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{isVi ? "Đồng Bộ Đánh Giá (Cron)" : "Trigger Review Sync"}</span>
            </Link>
          </div>
        </div>

        {/* Tabbed Interactive Client Dashboard */}
        <AdminDashboardClient stats={stats} locale={locale as Locale} />
      </div>
    </div>
  );
}
