"use client";

import React, { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // When route changes, complete the progress bar
  useEffect(() => {
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept link clicks for 0ms instant visual response
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      try {
        const targetUrl = new URL(target.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // If navigating to different internal page
        if (
          targetUrl.origin === currentUrl.origin &&
          (targetUrl.pathname !== currentUrl.pathname || targetUrl.search !== currentUrl.search)
        ) {
          setLoading(true);
          setProgress(30);
          setTimeout(() => {
            setProgress((prev) => (prev >= 30 && prev < 80 ? 75 : prev));
          }, 150);
        }
      } catch {
        // Ignore invalid URLs
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[2.5px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-brand-600 via-teal-400 to-brand-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100 ? "width 150ms ease-out, opacity 200ms 100ms" : "width 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}
