"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Locale, getDictionary } from "@/lib/i18n";
import { useSearch } from "@/context/SearchContext";
import { Search, Globe, Menu, X, Sparkles } from "lucide-react";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const router = useRouter();
  const { openSearch } = useSearch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleLanguage = () => {
    const targetLocale = locale === "en" ? "vi" : "en";
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    router.push(segments.join("/") || `/${targetLocale}`);
  };

  // Apple-style streamlined primary navigation: 4 core links
  const primaryNavItems = [
    { label: dict.nav.tools, href: `/${locale}/tools` },
    { label: dict.nav.categories, href: `/${locale}/categories` },
    { label: dict.nav.compare, href: `/${locale}/compare` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
  ];

  // Secondary links for mobile drawer and search
  const secondaryNavItems = [
    { label: dict.nav.rankings, href: `/${locale}/rankings` },
    { label: locale === "vi" ? "Đánh Giá Thực Tế" : "Reviews", href: `/${locale}/reviews` },
    { label: dict.nav.deals, href: `/${locale}/deals` },
    { label: dict.nav.membership, href: `/${locale}/membership` },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-black/[0.08] dark:border-white/[0.12] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            : "bg-white/95 dark:bg-black/95 backdrop-blur-md border-black/[0.04] dark:border-white/[0.06]"
        }`}
      >
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 max-w-7xl">
          {/* Brand Logo - Apple Minimalist Typography */}
          <div className="flex items-center gap-8">
            <Link href={`/${locale}`} prefetch={true} className="flex items-center gap-2 group">
              <span className="text-lg font-bold tracking-tight text-black dark:text-white transition-opacity group-hover:opacity-80">
                {dict.brandName}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.2 rounded-full">
                AI
              </span>
            </Link>

            {/* Desktop Minimalist Navigation - 4 clean items */}
            <nav className="hidden md:flex items-center space-x-1">
              {primaryNavItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    className={`px-3 py-1.5 text-xs font-medium tracking-tight rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-black dark:text-white bg-black/[0.05] dark:bg-white/[0.1] font-semibold"
                        : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Cluster: Search, Lang, Pro Pill, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Desktop Quick Search Trigger (Cmd+K) */}
            <button
              onClick={openSearch}
              className="hidden sm:flex items-center gap-2 h-8 px-3 text-xs text-zinc-500 bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-transparent rounded-full transition-all w-44 lg:w-56 cursor-pointer text-left"
              aria-label="Search tools"
            >
              <Search className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">{dict.nav.searchPlaceholder.slice(0, 18)}...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-4 select-none items-center rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 font-mono text-[9px] font-medium text-zinc-500">
                ⌘K
              </kbd>
            </button>

            {/* Mobile search icon */}
            <button
              onClick={openSearch}
              className="sm:hidden flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
              aria-label="Open search modal"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 h-8 px-2.5 text-[11px] font-semibold rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-800 dark:text-zinc-200 active:scale-95"
              title="Switch Language"
            >
              <Globe className="h-3 w-3 text-zinc-500" />
              <span>{locale.toUpperCase()}</span>
            </button>

            {/* Apple-style Pill CTA */}
            <Link
              href={`/${locale}/membership`}
              prefetch={true}
              className="inline-flex items-center justify-center h-8 px-3.5 text-xs font-medium rounded-full bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black transition-all shadow-xs"
            >
              {locale === "vi" ? "Gói Pro" : "Get Pro"}
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Apple-Style Full-Width Clean Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-black/95 backdrop-blur-2xl px-5 py-6 space-y-4 animate-in slide-in-from-top-3 duration-200 relative z-50">
            {/* Core Links */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block px-3 mb-1">
                {locale === "vi" ? "Khám Phá" : "Explore"}
              </span>
              {primaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
                    pathname === item.href
                      ? "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white font-semibold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Secondary Links */}
            <div className="space-y-1 pt-3 border-t border-zinc-100 dark:border-zinc-900">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block px-3 mb-1">
                {locale === "vi" ? "Tính Năng Khác" : "More"}
              </span>
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={`/${locale}/membership`}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-medium text-xs shadow-xs block transition-all"
              >
                {dict.nav.getStarted}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-14 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
