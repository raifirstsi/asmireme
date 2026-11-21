import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { verifySessionToken } from "@/services/auth";
import { getUserSubscriptionStatus } from "@/services/billing";
import { MemberDashboardClient } from "@/components/account/MemberDashboardClient";

interface AccountPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata() {
  return {
    title: "Member Dashboard — Asmire Referral Hub",
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

  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <MemberDashboardClient 
          user={sessionUser} 
          locale={locale as Locale} 
          isPro={subStatus.isPro} 
          daysRemaining={subStatus.daysRemaining}
        />
      </div>
    </div>
  );
}
