"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ToolLogoProps {
  slug: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_MAP = {
  xs: { box: "h-5 w-5 rounded-none", img: 16, text: "text-[9px]" },
  sm: { box: "h-7 w-7 rounded-none", img: 20, text: "text-[11px]" },
  md: { box: "h-9 w-9 rounded-none", img: 26, text: "text-xs" },
  lg: { box: "h-11 w-11 rounded-none", img: 32, text: "text-sm" },
  xl: { box: "h-14 w-14 rounded-none", img: 42, text: "text-base" },
};

export function ToolLogo({
  slug,
  name,
  size = "md",
  className = "",
}: ToolLogoProps) {
  const [error, setError] = useState(false);
  const cfg = SIZE_MAP[size] || SIZE_MAP.md;

  // Local static logo path
  const logoSrc = `/logos/${slug}.png`;

  if (error) {
    return (
      <div
        className={`flex ${cfg.box} shrink-0 items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold border border-zinc-200 dark:border-zinc-700 shadow-2xs ${cfg.text} ${className}`}
        aria-label={name}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div
      className={`relative flex ${cfg.box} shrink-0 items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs overflow-hidden p-1 ${className}`}
    >
      <img
        src={logoSrc}
        alt={`${name} logo`}
        width={cfg.img}
        height={cfg.img}
        className="object-contain max-h-full max-w-full rounded-none"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
}
