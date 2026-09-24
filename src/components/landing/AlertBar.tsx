"use client";

import { useEffect, useRef, useState } from "react";

export function AlertBar() {
  const [now, setNow] = useState<Date>(() => new Date());
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const t = setInterval(() => {
      if (mountedRef.current) setNow(new Date());
    }, 1000);
    return () => {
      mountedRef.current = false;
      clearInterval(t);
    };
  }, []);

  const target = new Date("2026-09-30T23:59:00+05:30").getTime();
  const diff = Math.max(0, target - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return (
    <div className="w-full bg-gradient-to-r from-[#c8901f] via-[#f08a3e] to-[#c8901f] text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-center text-[12px] font-semibold sm:text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <span className="bn">প্রিমিয়াম নোটস বিক্রি চলছে</span>
          <span className="hidden opacity-60 sm:inline">|</span>
        </span>
        <span className="hidden sm:inline">Limited Period Offer</span>
        <span className="opacity-60">|</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="bn">বন্ধ হবে</span>
          <span className="font-mono tabular-nums">
            {String(days).padStart(2, "0")}d : {String(hours).padStart(2, "0")}h :{" "}
            {String(minutes).padStart(2, "0")}m : {String(seconds).padStart(2, "0")}s
          </span>
        </span>
      </div>
    </div>
  );
}
