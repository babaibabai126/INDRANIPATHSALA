"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const t = setTimeout(() => {
      if (mountedRef.current) setMounted(true);
    }, 0);
    return () => {
      mountedRef.current = false;
      clearTimeout(t);
    };
  }, []);

  if (!mounted) {
    return (
      <button className="h-9 w-9 rounded-full border border-white/10 bg-white/5" aria-label="Toggle theme" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 transition hover:bg-accent/20"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-yellow-300" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700" />
      )}
    </button>
  );
}
