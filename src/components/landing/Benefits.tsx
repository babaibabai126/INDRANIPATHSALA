"use client";

import { Target } from "lucide-react";

const BENEFITS = [
  { n: "i", title: "স্মার্ট ও স্টাইলিশ", bn: "স্মার্ট ও স্টাইলিশ, যা সম্পূর্ণ সতেজ রাখে।" },
  { n: "ii", title: "To-the-point লেখা", bn: "টু-দ্য পয়েন্ট (To-the-point) লেখার উদ্দেশ্যে।" },
  { n: "iii", title: "সহজ বোঝার সুবিধা", bn: "আঞ্চলিক ভাষা সহযোগে বোঝানো অত্যন্ত সহজ।" },
  { n: "iv", title: "আত্মবিশ্বাস বৃদ্ধি", bn: "পরীক্ষায় ভয় দূর, আত্মবিশ্বাস বৃদ্ধি পায়।" },
  { n: "v", title: "Smart Revision Material", bn: "Smart Revision Material (কম সময়ে সম্পূর্ণ স্মৃতি)।" },
  { n: "vi", title: "দুর্বলতম বিষয় ট্র্যাকিং", bn: "দুর্বলতম বিষয়গুলো সহজে ট্র্যাকিং ও সমাধান।" },
  { n: "vii", title: "পরীক্ষায় আত্মবিশ্বাস", bn: "পরীক্ষায় এমন প্রস্তুতি যাতে মুখস্থ না করতে হয়।" },
  { n: "viii", title: "চাপ না নেওয়া", bn: "মুখস্থ না করে চাপ না নেওয়া যায়।" },
  { n: "ix", title: "সংক্ষিপ্ত সহজ", bn: "যা সম্পূর্ণ সংক্ষিপ্ত হলেও অত্যন্ত সহজ হবে।" },
  { n: "x", title: "উন্নত রেজাল্ট", bn: "পরীক্ষায় নম্বর ও র‍্যাঙ্ক মান উন্নত হবে।" },
];

export function Benefits() {
  return (
    <section className="relative border-y border-border bg-muted/20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-purple">
            <Target className="h-3.5 w-3.5" />
            <span className="bn">যা যা পাবেন</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            নোটসটি পছন্দ হলে আপনার{" "}
            <span className="bg-gradient-to-r from-accent-teal to-primary bg-clip-text text-transparent">
              কী লাভ হবে?
            </span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            শুধু পাস করবেন না — ভালো নম্বর, আত্মবিশ্বাস ও ক্যারিয়ার উভয় দিক থেকেই এগিয়ে থাকবেন।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:bg-muted/30"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15 text-[11px] font-bold text-primary">
                {b.n}
              </div>
              <div>
                <h3 className="bn text-[14px] font-semibold leading-snug text-foreground">
                  {b.title}
                </h3>
                <p className="bn mt-1 text-[12px] leading-relaxed text-muted-foreground">
                  {b.bn}
                </p>
              </div>
            </div>
          ))}
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
      </div>
    </section>
  );
}
