import { db } from "@/db";
import { users, memberProfiles, invoices, paymentEvents, referralClicks, subscriptions } from "@/db/schema";
import { TOOLS_DATA } from "@/data/tools-data";
import { desc, eq } from "drizzle-orm";

export interface ToolClickStat {
  toolSlug: string;
  toolName: string;
  category: string;
  totalClicks: number;
  adminClicks: number;
  memberClicks: number;
  adminSharePct: number;
  targetHost: string;
  adminAffiliateUrl: string;
  lastClickedAt: string;
}

export interface MemberLeaderboardStat {
  memberId: string;
  email: string;
  referralCode: string;
  totalVisits: number;
  totalCtaClicks: number;
  plan: string;
  status: string;
  joinedAt: string;
}

export interface AdminStats {
  totalTools: number;
  totalMembers: number;
  proMembers: number;
  totalRevenueVnd: number;
  totalRevenueUsd: number;
  totalClicks: number;
  memberAttributedClicks: number;
  adminFallbackClicks: number;
  adminFallbackPct: number;
  topTools: ToolClickStat[];
  allClickedTools: ToolClickStat[];
  topReferringMembers: MemberLeaderboardStat[];
  clickReasonStats: {
    directAdmin: number;
    memberAttributed: number;
    planLimitFallback: number;
    otherFallback: number;
  };
  recentOrders: {
    orderCode: string;
    email: string;
    plan: string;
    amount: string;
    gateway: string;
    status: string;
    date: string;
  }[];
  recentMembers: {
    email: string;
    referralCode: string;
    role: string;
    plan: string;
    clicks: number;
    joinedAt: string;
    status: string;
  }[];
  recentClicks: {
    id: string;
    tool: string;
    targetHost: string;
    reason: string;
    fallback: boolean;
    visitorHash: string;
    pagePath: string;
    time: string;
  }[];
}

function formatRelativeTime(date: Date | null): string {
  if (!date) return "N/A";
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  if (diffSec < 60) return "Vừa xong";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} phút trước`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} giờ trước`;
  return `${Math.floor(diffSec / 86400)} ngày trước`;
}

export async function getAdminDashboardData(): Promise<AdminStats> {
  const totalTools = TOOLS_DATA.length;
  const toolLookup = new Map(TOOLS_DATA.map((t) => [t.slug, t]));

  try {
    // 1. Query Users & Profiles
    const dbUsers = await db.select().from(users).orderBy(desc(users.createdAt));
    const dbProfiles = await db.select().from(memberProfiles);
    const profileMap = new Map(dbProfiles.map((p) => [p.userId, p]));

    // 2. Query Invoices & Subscriptions
    const dbInvoices = await db.select().from(invoices).orderBy(desc(invoices.createdAt));
    const dbSubs = await db.select().from(subscriptions);
    const proUsersCount = dbSubs.filter((s) => s.planId === "PRO" && s.status === "ACTIVE").length;

    // Real Revenue calculation
    let totalRevenueVnd = 0;
    let totalRevenueUsd = 0;
    dbInvoices.forEach((inv) => {
      if (inv.status === "PAID") {
        totalRevenueVnd += inv.amountVnd || 0;
        totalRevenueUsd += (inv.amountVnd || 0) / 25000;
      }
    });

    // 3. Query All Outbound Referral Clicks
    const dbClicks = await db.select().from(referralClicks).orderBy(desc(referralClicks.createdAt));
    const totalClicksCount = dbClicks.length;
    const fallbackCount = dbClicks.filter((c) => c.isFallback).length;
    const memberAttributedCount = totalClicksCount - fallbackCount;
    const adminFallbackPct = totalClicksCount > 0 ? Math.round((fallbackCount / totalClicksCount) * 100) : 0;

    // Click reason stats breakdown
    const clickReasonStats = {
      directAdmin: dbClicks.filter((c) => c.reasonCode === "fallback_no_cookie" || c.reasonCode === "bot_crawler_clean").length,
      memberAttributed: dbClicks.filter((c) => c.reasonCode === "attributed_member").length,
      planLimitFallback: dbClicks.filter((c) => c.reasonCode === "fallback_plan_limit").length,
      otherFallback: dbClicks.filter((c) => !["fallback_no_cookie", "bot_crawler_clean", "attributed_member", "fallback_plan_limit"].includes(c.reasonCode)).length,
    };

    // 4. Aggregate Tool Clicks (Top 10 & Detailed Breakdown)
    const toolAggMap = new Map<string, {
      total: number;
      admin: number;
      member: number;
      lastClicked: Date | null;
      targetHost: string;
    }>();

    const memberClicksMap = new Map<string, number>();

    for (const c of dbClicks) {
      // Aggregate per tool
      const existing = toolAggMap.get(c.toolSlug) || {
        total: 0,
        admin: 0,
        member: 0,
        lastClicked: c.createdAt,
        targetHost: c.targetUrlHost || "",
      };
      existing.total += 1;
      if (c.isFallback) {
        existing.admin += 1;
      } else {
        existing.member += 1;
      }
      if (!existing.lastClicked || (c.createdAt && new Date(c.createdAt) > new Date(existing.lastClicked))) {
        existing.lastClicked = c.createdAt;
      }
      if (!existing.targetHost && c.targetUrlHost) {
        existing.targetHost = c.targetUrlHost;
      }
      toolAggMap.set(c.toolSlug, existing);

      // Aggregate per member
      if (c.attributedMemberId) {
        memberClicksMap.set(
          c.attributedMemberId,
          (memberClicksMap.get(c.attributedMemberId) || 0) + 1
        );
      }
    }

    const allClickedTools: ToolClickStat[] = Array.from(toolAggMap.entries())
      .map(([slug, data]) => {
        const meta = toolLookup.get(slug);
        const total = data.total;
        return {
          toolSlug: slug,
          toolName: meta?.name || slug,
          category: meta?.hubs?.[0] || meta?.tags?.[0] || "AI SaaS",
          totalClicks: total,
          adminClicks: data.admin,
          memberClicks: data.member,
          adminSharePct: total > 0 ? Math.round((data.admin / total) * 100) : 0,
          targetHost: data.targetHost || (meta ? new URL(meta.adminAffiliateUrl).hostname : ""),
          adminAffiliateUrl: meta?.adminAffiliateUrl || "#",
          lastClickedAt: formatRelativeTime(data.lastClicked),
        };
      })
      .sort((a, b) => b.totalClicks - a.totalClicks);

    const topTools = allClickedTools.slice(0, 10);

    // 5. Aggregate Top 10 Referring Members
    const topReferringMembers: MemberLeaderboardStat[] = dbProfiles
      .map((p) => {
        const user = dbUsers.find((u) => u.id === p.userId);
        const sub = dbSubs.find((s) => s.userId === p.userId);
        const clicksTracked = memberClicksMap.get(p.id) || 0;
        const totalClicks = Math.max(clicksTracked, p.totalCtaClicks || 0);

        return {
          memberId: p.id,
          email: user?.email || "anonymous@member",
          referralCode: p.referralCode,
          totalVisits: p.totalVisits || 0,
          totalCtaClicks: totalClicks,
          plan: sub?.planId === "PRO" ? "PRO ($29)" : "STANDARD (Free)",
          status: p.status || "ACTIVE",
          joinedAt: p.createdAt ? new Date(p.createdAt).toLocaleDateString("vi-VN") : "N/A",
        };
      })
      .sort((a, b) => b.totalCtaClicks - a.totalCtaClicks || b.totalVisits - a.totalVisits)
      .slice(0, 10);

    // 6. Recent Real Orders
    const recentOrders = dbInvoices.map((inv) => {
      const user = dbUsers.find((u) => u.id === inv.userId);
      return {
        orderCode: inv.orderCode,
        email: user?.email || "member@asmire.me",
        plan: inv.planId,
        amount: `${(inv.amountVnd || 0).toLocaleString("vi-VN")} ₫`,
        gateway: "SePay VietQR / PayPal",
        status: inv.status,
        date: inv.createdAt ? new Date(inv.createdAt).toLocaleDateString("vi-VN") : "Vừa xong",
      };
    });

    // 7. Recent Real Members
    const recentMembers = dbUsers.map((u) => {
      const profile = profileMap.get(u.id);
      const sub = dbSubs.find((s) => s.userId === u.id);
      const clicks = memberClicksMap.get(profile?.id || "") || profile?.totalCtaClicks || 0;
      return {
        email: u.email,
        referralCode: profile?.referralCode || "CHƯA_TẠO",
        role: u.role,
        plan: sub?.planId === "PRO" ? "PRO ($29/mo)" : "STANDARD (Free)",
        clicks,
        joinedAt: u.createdAt ? new Date(u.createdAt).toLocaleDateString("vi-VN") : "Mới đây",
        status: profile?.status || "ACTIVE",
      };
    });

    // 8. Recent Real Clicks Radar
    const recentClicks = dbClicks.slice(0, 50).map((c) => {
      const meta = toolLookup.get(c.toolSlug);
      return {
        id: c.id,
        tool: meta?.name || c.toolSlug,
        targetHost: c.targetUrlHost || "outbound",
        reason: c.reasonCode,
        fallback: c.isFallback,
        visitorHash: c.visitorHash.slice(0, 10) + "...",
        pagePath: c.pagePath || "/",
        time: c.createdAt ? new Date(c.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : "Vừa xong",
      };
    });

    return {
      totalTools,
      totalMembers: dbUsers.length,
      proMembers: proUsersCount,
      totalRevenueVnd,
      totalRevenueUsd: Math.round(totalRevenueUsd),
      totalClicks: totalClicksCount,
      memberAttributedClicks: memberAttributedCount,
      adminFallbackClicks: fallbackCount,
      adminFallbackPct,
      topTools,
      allClickedTools,
      topReferringMembers,
      clickReasonStats,
      recentOrders,
      recentMembers,
      recentClicks,
    };
  } catch (err) {
    console.error("[Admin] Database query error:", (err as Error).message);
    return getEmptyAdminData(totalTools);
  }
}

function getEmptyAdminData(totalTools: number): AdminStats {
  return {
    totalTools,
    totalMembers: 0,
    proMembers: 0,
    totalRevenueVnd: 0,
    totalRevenueUsd: 0,
    totalClicks: 0,
    memberAttributedClicks: 0,
    adminFallbackClicks: 0,
    adminFallbackPct: 0,
    topTools: [],
    allClickedTools: [],
    topReferringMembers: [],
    clickReasonStats: {
      directAdmin: 0,
      memberAttributed: 0,
      planLimitFallback: 0,
      otherFallback: 0,
    },
    recentOrders: [],
    recentMembers: [],
    recentClicks: [],
  };
}
