"use client";

import { Target } from "lucide-react";

/**
 * নোটস নিলে আপনার কী লাভ হবে? — 10 items i–x (verbatim from user).
 * PDF used only for placement.
 * Benefits section also has "Recorded Class Available" banner (clickable → opens payment form)
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

type Props = {
  onBuy?: (code: string, rc?: boolean) => void;
};

export function Benefits({ onBuy }: Props) {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-purple">
            <Target className="h-3.5 w-3.5" />
            <span className="bn">যা যা পাবেন</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-accent sm:text-3xl lg:text-4xl">
            নোটস নিলে আপনার কী লাভ হবে?
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
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:opacity-90"
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

        {/* Recorded Class Available banner — clickable, opens payment form */}
        {onBuy && (
          <button
            onClick={() => onBuy("rc1en", true)}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-accent-purple/30 bg-accent-purple/10 p-4 text-left transition hover:bg-accent-purple/15"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent-purple/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="bn text-sm font-bold text-foreground">Recorded Class Available</div>
              <div className="bn text-[11px] text-muted-foreground">
                1st Year ₹149 · 2nd Year ₹199 — ক্লিক করে কিনুন
              </div>
            </div>
          </button>
        )}
      </div>
    </section>
  );
}
