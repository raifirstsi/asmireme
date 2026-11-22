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
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-black text-zinc-900 dark:text-zinc-100 mt-20">
      {/* FTC / Transparency Bar - Apple Minimalist */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/40 dark:bg-zinc-900/40 py-3.5 px-4 sm:px-6">
        <div className="mx-auto flex items-start gap-2.5 max-w-5xl text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          <Shield className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5" />
          <p className="font-normal">{dict.footer.disclosure}</p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto px-4 sm:px-6 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3.5 md:col-span-1">
            <Link href={`/${locale}`} className="inline-flex items-center transition-opacity hover:opacity-85" aria-label="Asmire Home">
              <img
                src="/brand/asmire-logo-black.png?v=3"
                alt="Asmire"
                className="h-5 w-auto object-contain dark:invert"
              />
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {dict.brandDescription}
            </p>
          </div>

          {/* Tools & Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              {dict.footer.toolsCol}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li>
                <Link href={`/${locale}/categories/video-avatar`} className="hover:text-black dark:hover:text-white transition-colors">
                  Video & AI Avatars
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories/content-seo`} className="hover:text-black dark:hover:text-white transition-colors">
                  Content Writing & SEO
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories/voice-audio`} className="hover:text-black dark:hover:text-white transition-colors">
                  Voice & Speech Synthesis
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories/sales-crm`} className="hover:text-black dark:hover:text-white transition-colors">
                  Sales Automation & CRM
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/categories/presentation-design`} className="hover:text-black dark:hover:text-white transition-colors">
                  AI Slide Presentations
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools`} className="font-medium text-zinc-900 dark:text-zinc-100 hover:underline">
                  {locale === "vi" ? "Xem tất cả công cụ AI →" : "View All AI SaaS Tools →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Testing Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              {dict.footer.resourcesCol}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li>
                <Link href={`/${locale}/replace`} className="hover:text-black dark:hover:text-white transition-colors font-medium text-emerald-600 dark:text-emerald-400">
                  {locale === "vi" ? "Ma Trận Cắt Giảm SaaS (Save $8k+) →" : "Cut My SaaS Bill (Save $8k+) →"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/reviews`} className="hover:text-black dark:hover:text-white transition-colors font-medium">
                  {locale === "vi" ? "Kho 200+ Đánh Giá Thực Tế →" : "200+ Verified Reviews Hub →"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/news`} className="hover:text-black dark:hover:text-white transition-colors">
                  {locale === "vi" ? "Tin Tức & Đánh Giá AI (News) →" : "AI News & In-Depth Reviews →"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/methodology`} className="hover:text-black dark:hover:text-white transition-colors">
                  {dict.footer.methodology}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/editorial-policy`} className="hover:text-black dark:hover:text-white transition-colors">
                  {dict.footer.editorialPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/compare`} className="hover:text-black dark:hover:text-white transition-colors">
                  Head-to-Head Comparisons
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/rankings`} className="hover:text-black dark:hover:text-white transition-colors">
                  Weekly Leaderboard
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/deals`} className="hover:text-black dark:hover:text-white transition-colors">
                  Verified SaaS Coupons & Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policy */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              {dict.footer.legalCol}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li>
                <Link href={`/${locale}/affiliate-disclosure`} className="hover:text-black dark:hover:text-white transition-colors">
                  {dict.footer.affiliateDisclosure}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/member-terms`} className="hover:text-black dark:hover:text-white transition-colors">
                  {dict.footer.memberTerms}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/refund-policy`} className="hover:text-black dark:hover:text-white transition-colors">
                  {dict.footer.refundPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-black dark:hover:text-white transition-colors">
                  {dict.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-black dark:hover:text-white transition-colors">
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-black dark:hover:text-white transition-colors">
                  {dict.footer.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© Asmire. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
