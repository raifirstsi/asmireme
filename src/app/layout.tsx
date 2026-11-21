import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asmire — The Verified AI SaaS Directory & Benchmark Engine",
  description: "Independent, empirically tested AI software reviews, unbiased comparisons, real-time pricing alerts, and community-powered referral rewards.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://asmire.me"),
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      vi: "/vi",
      "x-default": "/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
