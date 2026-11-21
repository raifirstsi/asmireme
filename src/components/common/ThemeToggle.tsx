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
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      suppressHydrationWarning
      className={`flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer active:scale-95 shadow-2xs ${className}`}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
    >
      {mounted && theme === "light" ? (
        <Moon className="h-4 w-4 text-zinc-700 hover:text-black transition-colors" />
      ) : (
        <Sun className="h-4 w-4 text-zinc-300 hover:text-white transition-colors" />
      )}
    </button>
  );
}
