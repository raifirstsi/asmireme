import React from "react";
import { notFound } from "next/navigation";
import { Locale, locales } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchModalWrapper } from "@/components/common/SearchModalWrapper";
import { ReferralTransparencyBanner } from "@/components/common/ReferralTransparencyBanner";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Asmire",
    url: "https://asmire.me",
    logo: "https://asmire.me/logo.png",
    publishingPrinciples: `https://asmire.me/${locale}/editorial-policy`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@asmire.me",
      contactType: "Customer Support",
    },
  };

  return (
    <SearchModalWrapper locale={locale as Locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <ReferralTransparencyBanner locale={locale as Locale} />
      <Header locale={locale as Locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} />
    </SearchModalWrapper>
  );
}
