import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { verifySessionToken } from "@/services/auth";
import { getUserSubscriptionStatus } from "@/services/billing";
import { BillingDashboardClient } from "@/components/account/BillingDashboardClient";

interface BillingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata() {
  return {
    title: "Billing & Subscription - Asmire Pro",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function BillingPage({ params }: BillingPageProps) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("asmire_session")?.value;

  const sessionUser = sessionCookie ? verifySessionToken(sessionCookie) : null;

  if (!sessionUser) {
    redirect(`/${locale}/account/login`);
  }

  const initialStatus = await getUserSubscriptionStatus(sessionUser.userId);

  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <BillingDashboardClient
          initialStatus={initialStatus}
          user={sessionUser}
          locale={locale as Locale}
        />
      </div>
    </div>
  );
}
