"use client";

import React from "react";
import { Locale } from "@/lib/i18n";
import { SearchProvider, useSearch } from "@/context/SearchContext";
import { SearchModal } from "@/components/common/SearchModal";

interface SearchModalWrapperProps {
  children: React.ReactNode;
  locale: Locale;
}

function InnerSearchModal({ locale }: { locale: Locale }) {
  const { isOpen, closeSearch } = useSearch();
  return <SearchModal isOpen={isOpen} onClose={closeSearch} locale={locale} />;
}

export function SearchModalWrapper({ children, locale }: SearchModalWrapperProps) {
  return (
    <SearchProvider>
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
      <InnerSearchModal locale={locale} />
    </SearchProvider>
  );
}
