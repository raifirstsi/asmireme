"use client";

import React, { useState } from "react";

interface ToolLogoProps {
  slug: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

const SIZE_MAP = {
  xs: { box: "h-5 w-5", img: 16, text: "text-[9px]" },
  sm: { box: "h-7 w-7", img: 22, text: "text-[11px]" },
  md: { box: "h-9 w-9", img: 28, text: "text-xs" },
  lg: { box: "h-11 w-11", img: 36, text: "text-sm" },
  xl: { box: "h-14 w-14", img: 48, text: "text-base" },
};

export function ToolLogo({
  slug,
  name,
  size = "md",
  className = "",
  priority = false,
}: ToolLogoProps) {
  const [error, setError] = useState(false);
  const cfg = SIZE_MAP[size] || SIZE_MAP.md;

  if (error) {
    return (
      <div
        className={`flex ${cfg.box} shrink-0 items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold rounded-md ${cfg.text} ${className}`}
        aria-label={name}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div
      className={`relative flex ${cfg.box} shrink-0 items-center justify-center overflow-hidden rounded-md bg-white shadow-2xs p-0.5 border border-zinc-200/60 dark:border-zinc-700/60 ${className}`}
    >
      <picture className="flex items-center justify-center w-full h-full">
        <source srcSet={`/logos/${slug}.webp`} type="image/webp" />
        <img
          src={`/logos/${slug}.png`}
          alt={`${name} logo`}
          width={cfg.img}
          height={cfg.img}
          className="object-contain max-h-full max-w-full"
          onError={() => setError(true)}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          // @ts-ignore
          fetchPriority={priority ? "high" : "auto"}
        />
      </picture>
    </div>
  );
}
