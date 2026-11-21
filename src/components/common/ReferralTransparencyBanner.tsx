"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { Users, X } from "lucide-react";

interface ReferralTransparencyBannerProps {
  locale: Locale;
}

export function ReferralTransparencyBanner({ locale }: ReferralTransparencyBannerProps) {
  const [hasRef, setHasRef] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if asmire_ref cookie exists or was set
    const cookies = document.cookie;
    if (cookies.includes("asmire_ref=")) {
      setHasRef(true);
    }
  }, []);

  if (!hasRef || dismissed) return null;

  const isVi = locale === "vi";

  return (
    <aside
      aria-label={isVi ? "Thông báo liên kết giới thiệu" : "Referral attribution notice"}
      className="w-full bg-brand-500/10 border-b border-brand-500/20 py-2 px-4 text-xs text-foreground transition-all"
    >
      <div className="container mx-auto flex items-center justify-between gap-3 max-w-6xl">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0" />
          <p className="m-0 leading-tight">
            {isVi ? (
              <span>
                Bạn đang xem qua link của một thành viên cộng đồng; lượt mua có thể là affiliate link của thành viên đó hoặc của Asmire và họ có thể nhận hoa hồng.{" "}
                <Link href={`/${locale}/affiliate-disclosure`} className="underline font-bold hover:text-brand-600">
                  Tìm hiểu thêm
                </Link>
              </span>
            ) : (
              <span>
                You are viewing via a community member referral; software purchases may credit the member or Asmire at zero extra cost to you.{" "}
                <Link href={`/${locale}/affiliate-disclosure`} className="underline font-bold hover:text-brand-600">
                  Learn more
                </Link>
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-brand-500/20 rounded text-muted-foreground hover:text-foreground shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}
