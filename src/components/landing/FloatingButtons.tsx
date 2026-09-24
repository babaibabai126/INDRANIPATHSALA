"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";

/**
 * Floating WhatsApp + Call buttons — per user spec:
 * "Call and Whatsapp logo floating থাকবে"
 */

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [showBuy, setShowBuy] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowTop(y > 600);
      setShowBuy(y > 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground backdrop-blur transition hover:bg-muted ${
            showTop ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <ArrowUp className="h-4 w-4" />
        </button>

        {/* WhatsApp floating */}
        <a
          href="https://wa.me/918293742022?text=আমি%20D.Pharm%20Premium%20Notes%20সম্পর্কে%20জানতে%20চাই"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-500/30 transition hover:scale-105 hover:bg-[#1da851]"
        >
          <MessageCircle className="h-5 w-5" />
        </a>

        {/* Call floating */}
        <a
          href="tel:+918293742022"
          aria-label="Call"
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-105 hover:opacity-90"
        >
          <span className="absolute inset-0 rounded-full bg-primary opacity-60 animate-ping" />
          <Phone className="relative h-5 w-5" />
        </a>
      </div>

      {/* Bottom-center sticky Buy Now CTA */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 transition duration-300 ${
          showBuy ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 pb-3 sm:pb-4">
          <a
            href="#payment"
            className="glow-amber flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent-orange px-6 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:brightness-110 sm:mx-auto sm:inline-flex"
          >
            <span className="bn">এখনই কিনুন</span> — ₹999 থেকে শুরু →
          </a>
        </div>
      </div>
    </>
  );
}
