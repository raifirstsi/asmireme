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

  const navItems = [
    { label: dict.nav.tools, href: `/${locale}/tools` },
    { label: locale === "vi" ? "Đánh Giá Thực Tế" : "Reviews", href: `/${locale}/reviews` },
    { label: dict.nav.categories, href: `/${locale}/categories` },
    { label: dict.nav.compare, href: `/${locale}/compare` },
    { label: dict.nav.rankings, href: `/${locale}/rankings` },
    { label: dict.nav.deals, href: `/${locale}/deals` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
    { label: dict.nav.membership, href: `/${locale}/membership` },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-border shadow-sm"
            : "bg-background border-border/60"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href={`/${locale}`} prefetch={true} className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm transition-transform group-hover:scale-105">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-foreground flex items-center gap-1.5">
                  {dict.brandName}
                  <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded">
                    AI
                  </span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-secondary text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search Bar & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Quick Search Trigger (Cmd+K) */}
            <button
              onClick={openSearch}
              className="hidden md:flex items-center gap-2 h-9 px-3 text-sm text-muted-foreground bg-secondary/80 hover:bg-secondary border border-border/80 rounded-lg transition-all w-52 lg:w-64 cursor-pointer text-left"
              aria-label="Search tools"
            >
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="truncate">{dict.nav.searchPlaceholder.slice(0, 20)}...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            {/* Mobile search icon button */}
            <button
              onClick={openSearch}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground active:scale-95 transition-transform"
              aria-label="Open search modal"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 h-9 px-2.5 text-xs font-semibold rounded-lg border border-border hover:bg-secondary transition-colors text-foreground active:scale-95"
              title="Switch Language"
            >
              <Globe className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
              <span>{locale.toUpperCase()}</span>
            </button>

            {/* Membership / Sign In */}
            <Link
              href={`/${locale}/membership`}
              prefetch={true}
              className="hidden sm:inline-flex items-center justify-center h-9 px-4 text-xs font-bold rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-sm hover:shadow"
            >
              {dict.nav.getStarted}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary text-foreground active:scale-95 transition-transform"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-border bg-background px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150 relative z-50">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-brand-500/10 text-brand-600 dark:text-brand-400"
                    : "text-foreground hover:bg-secondary active:bg-secondary/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Link
                href={`/${locale}/membership`}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-brand-600 active:bg-brand-700 font-bold text-white text-sm shadow-sm"
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
          className="fixed inset-0 top-16 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
