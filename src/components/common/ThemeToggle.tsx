"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check current state from documentElement
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    const applyTheme = () => {
      setTheme(nextTheme);
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    // Modern View Transitions API for 60/120fps hardware-accelerated instant crossfade
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      suppressHydrationWarning
      className={`flex h-9 w-9 items-center justify-center border-0 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-150 active:scale-90 cursor-pointer outline-none focus:outline-none ${className}`}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
    >
      {mounted && theme === "light" ? (
        <Moon className="h-4 w-4 transition-transform duration-150" />
      ) : (
        <Sun className="h-4 w-4 transition-transform duration-150" />
      )}
    </button>
  );
}
