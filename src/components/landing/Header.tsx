"use client";

import Image from "next/image";
import { Phone } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#02081b]/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-xl ring-2 ring-white/10">
            <Image
              src="/images/logo.jpeg"
              alt="Indrani Pathsala Logo"
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold tracking-tight text-white sm:text-lg">
              Indrani Pathsala
            </div>
            <div className="bn text-[10px] text-yellow-300 sm:text-xs">
              ইন্দ্রানী পাঠশালা · D.Pharm Premium Notes
            </div>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="tel:+918293742022"
            className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-medium text-white/90 transition hover:border-white/30 hover:bg-white/5 sm:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="font-mono">8293742022</span>
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0056d2] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#0044a8] sm:px-5 sm:text-sm"
          >
            Buy Now
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
