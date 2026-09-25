"use client";

import Image from "next/image";
import { Phone, LayoutDashboard } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-xl ring-2 ring-primary/30">
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
            <div className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              Indrani Pathsala
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-accent sm:text-xs">
              YOUR STUDY PARTNER FOR SUCCESS
            </div>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <a
            href="tel:+918293742022"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground/90 transition hover:bg-muted/50"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="font-mono">8293742022</span>
          </a>
          <a
            href="/admin/login"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground/90 transition hover:bg-muted/50"
            title="Admin Login"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90 sm:px-5 sm:text-sm"
          >
            Buy Now
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
