import React from "react";
import Link from "next/link";
import { Locale, getDictionary } from "@/lib/i18n";
import { Sparkles, Shield, FileCheck, HelpCircle } from "lucide-react";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);

  return (
    <footer className="w-full border-t border-border bg-card text-card-foreground mt-20">
      {/* FTC / Transparency Bar */}
      <div className="border-b border-border/80 bg-muted/40 py-4 px-4 sm:px-6">
        <div className="container mx-auto flex items-start gap-3 max-w-6xl text-xs text-muted-foreground leading-relaxed">
          <Shield className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
          <p>{dict.footer.disclosure}</p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-foreground">
                {dict.brandName}
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-normal">
              {dict.brandDescription}
            </p>
            <div className="pt-2 text-[11px] text-muted-foreground/80 space-y-1">
              <p>Domain: <span className="font-semibold text-foreground">asmire.me</span></p>
              <p>Operating Entity: <span className="font-medium text-foreground">Vietnam Registered Enterprise</span></p>
            </div>
          </div>

          {/* Tools & Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {dict.footer.toolsCol}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href={`/${locale}/categories/video-avatar`} className="hover:text-foreground transition-colors">
                  Video & AI Avatars
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories/content-seo`} className="hover:text-foreground transition-colors">
                  Content Writing & SEO
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories/voice-audio`} className="hover:text-foreground transition-colors">
                  Voice & Speech Synthesis
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories/sales-crm`} className="hover:text-foreground transition-colors">
                  Sales Automation & CRM
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories/presentation-design`} className="hover:text-foreground transition-colors">
                  AI Slide Presentations
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools`} className="font-medium text-brand-600 dark:text-brand-400 hover:underline">
                  View All 50 SaaS Tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Testing Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {dict.footer.resourcesCol}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href={`/${locale}/reviews`} className="hover:text-foreground transition-colors font-medium text-amber-600 dark:text-amber-400">
                  {locale === "vi" ? "Kho 200+ Đánh Giá Thực Tế →" : "200+ Verified Reviews Hub →"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-foreground transition-colors">
                  AI Research Blog & Guides
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/methodology`} className="hover:text-foreground transition-colors">
                  {dict.footer.methodology}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/editorial-policy`} className="hover:text-foreground transition-colors">
                  {dict.footer.editorialPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/compare`} className="hover:text-foreground transition-colors">
                  Head-to-Head Comparisons
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/rankings`} className="hover:text-foreground transition-colors">
                  Weekly Leaderboard
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/deals`} className="hover:text-foreground transition-colors">
                  Verified SaaS Coupons & Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {dict.footer.legalCol}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href={`/${locale}/affiliate-disclosure`} className="hover:text-foreground transition-colors">
                  {dict.footer.affiliateDisclosure}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/member-terms`} className="hover:text-foreground transition-colors">
                  {dict.footer.memberTerms}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/refund-policy`} className="hover:text-foreground transition-colors">
                  {dict.footer.refundPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-foreground transition-colors">
                  {dict.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-foreground transition-colors">
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-foreground transition-colors">
                  {dict.footer.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Asmire. {dict.footer.rights}</p>
          <div className="flex items-center gap-4 text-muted-foreground/80">
            <span>Server: Cloud VPS (167.86.106.149)</span>
            <span>•</span>
            <span>Payments: SePay VietQR Automated</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
