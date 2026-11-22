import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { verifySessionToken } from "@/services/auth";
import { getUserSubscriptionStatus } from "@/services/billing";
import { MemberDashboardClient } from "@/components/account/MemberDashboardClient";
import { db } from "@/db";
import { activeToolSlots, memberAffiliateLinks } from "@/db/schema";
import { eq } from "drizzle-orm";

interface AccountPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata() {
  return {
    title: "Member Dashboard - Asmire Referral Hub",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("asmire_session")?.value;

  const sessionUser = sessionCookie ? verifySessionToken(sessionCookie) : null;

  // If unauthenticated, redirect to login
  if (!sessionUser) {
    redirect(`/${locale}/account/login`);
  }

  const subStatus = await getUserSubscriptionStatus(sessionUser.userId);
  const maxSlots = subStatus.isPro ? 50 : 3;

  // Fetch initial slots and links directly from database
  let initialSlots = [];
  try {
    const userSlots = await db
      .select()
      .from(activeToolSlots)
      .where(eq(activeToolSlots.userId, sessionUser.userId));

    const userLinks = await db
      .select()
      .from(memberAffiliateLinks)
      .where(eq(memberAffiliateLinks.userId, sessionUser.userId));

    const linksMap = new Map<string, string>();
    userLinks.forEach((l) => {
      if (l.status === "VALID" && l.affiliateUrl) {
        linksMap.set(l.toolSlug, l.affiliateUrl);
      }
    });

    for (let i = 1; i <= maxSlots; i++) {
      const found = userSlots.find((s) => s.slotIndex === i);
      if (found) {
        const link = linksMap.get(found.toolSlug) || "";
        initialSlots.push({
          slotIndex: i,
          toolSlug: found.toolSlug,
          affiliateUrl: link,
          status: link ? ("VALID" as const) : ("EMPTY" as const),
          lastSwappedAt: found.lastSwappedAt ? found.lastSwappedAt.toISOString().slice(0, 10) : "",
        });
      } else {
        // Defaults for slots 1, 2, 3 if empty
        const defaultSlugs = ["highlevel", "elevenlabs", "capcut"];
        const fallbackSlug = defaultSlugs[i - 1] || "";
        const fallbackLink = linksMap.get(fallbackSlug) || "";
        initialSlots.push({
          slotIndex: i,
          toolSlug: fallbackSlug,
          affiliateUrl: fallbackLink,
          status: fallbackLink ? ("VALID" as const) : ("EMPTY" as const),
          lastSwappedAt: "",
        });
      }
    }
  } catch (err) {
    console.warn("[AccountPage] Could not load initial slots from DB:", err);
  }

  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <MemberDashboardClient 
          user={sessionUser} 
          locale={locale as Locale} 
          isPro={subStatus.isPro} 
          daysRemaining={subStatus.daysRemaining}
          initialSlots={initialSlots}
        />
      </div>
    </div>
  );
}
