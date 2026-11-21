"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Locale, getDictionary } from "@/lib/i18n";
import { useSearch } from "@/context/SearchContext";
import { ThemeToggle } from "@/components/common/ThemeToggle";
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
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Brand Logo - Left Column (flex-1 guarantees center alignment) */}
          <div className="flex items-center justify-start flex-1 shrink-0">
            <Link href={`/${locale}`} prefetch={true} className="flex items-center gap-2 group">
              <span className="text-lg font-bold tracking-tight text-black dark:text-white transition-opacity group-hover:opacity-80">
                {dict.brandName}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-100 dark:bg-zinc-850 px-1.5 py-0.5 rounded-sm">
                AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Pure Minimalist Typography (Centered Vertically & Horizontally, Zero Bubble, Zero Hover Box) */}
          <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 shrink-0">
            {primaryNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`text-xs font-medium tracking-normal transition-colors py-1 ${
                    isActive
                      ? "text-black dark:text-white font-semibold"
                      : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster - Right Column (flex-1 guarantees center alignment) */}
          <div className="flex items-center justify-end flex-1 gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop Quick Search Trigger (Cmd+K) - Clean Minimalist Pill with harmonious height */}
            <button
              onClick={openSearch}
              className="hidden sm:flex items-center gap-2 h-9 px-3.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 bg-zinc-100/80 hover:bg-zinc-200/80 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-full border-0 transition-colors cursor-pointer"
              aria-label="Search tools"
            >
              <Search className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span className="hidden xl:inline text-xs truncate max-w-[80px]">Search...</span>
              <kbd className="pointer-events-none inline-flex h-4.5 select-none items-center rounded bg-white dark:bg-zinc-800 px-1.5 font-mono text-[9px] font-medium text-zinc-400 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Mobile search icon - Borderless */}
            <button
              onClick={openSearch}
              className="sm:hidden flex h-9 w-9 items-center justify-center rounded-full border-0 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Open search modal"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Theme Toggle (Light / Dark - Borderless) */}
            <ThemeToggle className="h-9 w-9 rounded-full" />

            {/* Language Switcher - Borderless */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 h-9 px-3 text-xs font-semibold rounded-full border-0 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors active:scale-95 cursor-pointer"
              title="Switch Language"
            >
              <Globe className="h-3.5 w-3.5 text-zinc-400" />
              <span>{locale.toUpperCase()}</span>
            </button>

            {/* Pro CTA Button - Minimalist Luxury Pill */}
            <Link
              href={`/${locale}/membership`}
              prefetch={true}
              className="hidden sm:inline-flex items-center justify-center h-9 px-4 text-xs font-semibold rounded-full bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black transition-all shadow-xs"
            >
              {locale === "vi" ? "Gói Pro" : "Get Pro"}
            </Link>

            {/* Mobile Menu Hamburger - Borderless */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border-0 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Clean Balanced Mobile Drawer */}
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
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
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
                  className="block px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Actions: Language & Theme */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between px-2">
              <span className="text-xs text-zinc-500 font-medium">
                {locale === "vi" ? "Giao diện & Ngôn ngữ" : "Appearance & Language"}
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 h-9 px-3 text-xs font-semibold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border-0"
                >
                  <Globe className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{locale === "en" ? "Tiếng Việt" : "English"}</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/${locale}/membership`}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-md bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-semibold text-xs shadow-xs block transition-all"
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
          className="fixed inset-0 top-16 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
