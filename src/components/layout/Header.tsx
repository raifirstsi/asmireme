"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Locale, getDictionary } from "@/lib/i18n";
import { Search, Globe, Menu, X, Sparkles, ShieldCheck } from "lucide-react";

interface HeaderProps {
  locale: Locale;
  onOpenSearch?: () => void;
}

export function Header({ locale, onOpenSearch }: HeaderProps) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const targetLocale = locale === "en" ? "vi" : "en";
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    router.push(segments.join("/") || `/${targetLocale}`);
  };

  const navItems = [
    { label: dict.nav.tools, href: `/${locale}/tools` },
    { label: dict.nav.categories, href: `/${locale}/categories` },
    { label: dict.nav.compare, href: `/${locale}/compare` },
    { label: dict.nav.rankings, href: `/${locale}/rankings` },
    { label: dict.nav.deals, href: `/${locale}/deals` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
    { label: dict.nav.membership, href: `/${locale}/membership` },
  ];

  return (
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
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
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
          {/* Quick Search Trigger (Cmd+K) */}
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2 h-9 px-3 text-sm text-muted-foreground bg-secondary/80 hover:bg-secondary border border-border/80 rounded-lg transition-all w-52 lg:w-64"
            aria-label="Search tools"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{dict.nav.searchPlaceholder.slice(0, 20)}...</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          {/* Mobile search icon */}
          <button
            onClick={onOpenSearch}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground"
            aria-label="Open search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 h-9 px-2.5 text-xs font-semibold rounded-lg border border-border hover:bg-secondary transition-colors text-foreground"
            title="Switch Language"
          >
            <Globe className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
            <span>{locale.toUpperCase()}</span>
          </button>

          {/* Membership / Sign In */}
          <Link
            href={`/${locale}/membership`}
            className="hidden sm:inline-flex items-center justify-center h-9 px-4 text-xs font-bold rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-sm hover:shadow"
          >
            {dict.nav.getStarted}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg hover:bg-secondary text-foreground"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-background px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium rounded-md hover:bg-secondary text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border flex items-center justify-between">
            <Link
              href={`/${locale}/membership`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-brand-600 font-bold text-white text-sm"
            >
              {dict.nav.getStarted}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
