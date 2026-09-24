"use client";

import { Target } from "lucide-react";

/**
 * নোটস নিলে আপনার কী লাভ হবে? — 10 items i–x (verbatim from user).
 * PDF used only for placement.
 */

const BENEFITS: { n: string; text: string }[] = [
  { n: "i",   text: "স্মার্ট স্টাডিতে, কম সময়ের সেরা প্রস্তুতি।" },
  { n: "ii",  text: "টু-দ্য পয়েন্ট (To-the point) নির্ভুল উত্তর।" },
  { n: "iii", text: "আঞ্চলিক ভাষা সঙ্গে থাকায় বোঝা অতি সহজ হবে।" },
  { n: "iv",  text: "পরীক্ষার ভীতি দূর, আত্মবিশ্বাসে ভরপুর।" },
  { n: "v",   text: "Smart Revision Material (শেষ মুহূর্তের সম্বল)।" },
  { n: "vi",  text: "দুর্বলতা কাটিয়ে সেরাদের তালিকায় ওঠার সুযোগ।" },
  { n: "vii", text: "পড়াশোনার একঘেয়েমি থেকে মুক্তি।" },
  { n: "viii",text: "মুখস্থ করার চাপ কমবে।" },
  { n: "ix",  text: "কম সময়ে সিলেবাস শেষ করা অতি সহজ হবে।" },
  { n: "x",   text: "পরীক্ষার নম্বর ও লেখার মান উন্নত হবে।" },
];

export function Benefits() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-purple">
            <Target className="h-3.5 w-3.5" />
            <span className="bn">যা যা পাবেন</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            নোটস নিলে আপনার{" "}
            <span className="bg-gradient-to-r from-accent-teal to-primary bg-clip-text text-transparent">
              কী লাভ হবে?
            </span>
          </h2>
        </div>

        {/* Elevated card for readability */}
        <div
          className="mt-10 rounded-3xl border border-border p-6 shadow-xl sm:p-10"
          style={{ backgroundColor: "var(--surface-elevated)" }}
        >
          <ol className="bn mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <li
                key={b.n}
                className="flex items-start gap-3 rounded-xl p-2"
                style={{ color: "var(--surface-elevated-foreground)" }}
              >
                <span
                  className="mt-0.5 flex h-8 w-9 flex-shrink-0 items-center justify-center rounded-lg font-mono text-[12px] font-bold"
                  style={{
                    backgroundColor: "var(--surface-elevated-muted)",
                    color: "var(--surface-elevated-accent)",
                  }}
                >
                  {b.n}
                </span>
                <span className="text-[14px] leading-relaxed">{b.text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            className="glow-amber inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:opacity-90"
          >
            <span className="bn">এখনই কিনুন</span> →
          </a>
          <a
            href="https://wa.me/918293742022?text=আমি%20D.Pharm%20Notes%20সম্পর্কে%20জানতে%20চাই"
            target="_blank"
            rel="noopener noreferrer"
            className="bn inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-7 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400 transition hover:bg-emerald-500/20"
          >
            WhatsApp-এ জিজ্ঞাসা করুন
          </a>
        </div>
      </div>
    </section>
  );
}
