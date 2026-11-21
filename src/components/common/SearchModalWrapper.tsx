"use client";

import React, { useState } from "react";
import { Locale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { SearchModal } from "@/components/common/SearchModal";

interface SearchModalWrapperProps {
  children: React.ReactNode;
  locale: Locale;
}

export function SearchModalWrapper({ children, locale }: SearchModalWrapperProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Clone or wrap children and provide open handler */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Header) {
            return React.cloneElement(child as React.ReactElement<any>, {
              onOpenSearch: () => setSearchOpen(true),
            });
          }
          return child;
        })}
      </div>
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        locale={locale}
      />
    </>
  );
}
