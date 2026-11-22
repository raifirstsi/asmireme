import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asmire - The Verified AI SaaS Directory & Benchmark Engine",
  description: "Independent, empirically tested AI software reviews, unbiased comparisons, real-time pricing alerts, and community-powered referral rewards.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://asmire.me"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
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
      <head>
        {/* Google Tag Manager / Google Analytics with non-blocking hydration */}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-TS2SM59D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var pref = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && pref)) {
                    document.documentElement.classList.add('dark');
                  } else if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
