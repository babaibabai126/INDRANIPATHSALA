"use client";

import Image from "next/image";
import { ShieldCheck, ChevronRight } from "lucide-react";

/**
 * Hero — EXACT text provided by user (verbatim, do NOT rewrite).
 * Big "Welcome to Indrani Pathsala" hero heading on top.
 * Then intro paragraph + "আমাদের নোটস এ কি বিশেষত্ব আছে ?" (7 items i–vii)
 * + IMAGE (user-provided notes sample image)
 *
 * User said: "ei gulo lekho...nicher chobi tao add korchi...r lekha gulo bojha jacche na
 * sevabe bg color change koro jate lekha gulo bojha jay"
 * = "Write these... I added the image below... the text is not readable,
 *    change the bg color so the text is readable"
 *
 * So all Bengali text below is a verbatim copy from the user's message,
 * and the section background uses a high-contrast solid color so text reads cleanly.
 */

const FEATURES: { n: string; text: string }[] = [
  { n: "i",   text: "PCI ER-20 Latest Syllabus অনুযায়ী তৈরি।" },
  { n: "ii",  text: "কোন Chapter থেকে কত নম্বর পরীক্ষাতে আসবে তার বিশ্লেষণ।" },
  { n: "iii", text: "সহজ ও সাবলীল ভাষা।" },
  { n: "iv",  text: "VVI MCQ, SAQ, FIB এবং Suggestive Long Question-Answer" },
  { n: "v",   text: "বাংলা, হিন্দি, ওড়িয়া Translation (আপনার বোঝার সুবিধার্থে)" },
  { n: "vi",  text: "Chapter wise Summary (সারসংক্ষেপটি chapter-এর মূল ধারণা পেতে সাহায্য করবে)" },
  { n: "vii", text: "প্রত্যেকটি বিষয়ের অধ্যায়ভিত্তিক সম্পূর্ণ ধারণা।" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-20 h-72 w-72 rounded-full bg-accent-purple/15 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:pb-24 lg:pt-20">
        {/* Logo + brand mark */}
        <div className="flex justify-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl ring-4 ring-primary/30 shadow-xl sm:h-24 sm:w-24">
            <Image src="/images/logo.jpeg" alt="Indrani Pathsala Logo" fill sizes="96px" className="object-cover" priority />
          </div>
        </div>

        {/* BIG "Welcome to Indrani Pathsala" hero heading */}
        <div className="mt-6 text-center">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Welcome to{" "}
            <span className="block bg-gradient-to-r from-primary via-accent-blue to-accent-purple bg-clip-text text-transparent sm:inline">
              Indrani Pathsala
            </span>
          </h1>

          {/* intro paragraph — VERBATIM from user's message */}
          <p className="bn mx-auto mt-6 max-w-3xl text-base leading-relaxed text-foreground sm:text-lg">
            আপনি কি একজন ডিপ্লোমা ফার্মেসি স্টুডেন্ট ? তাহলে পরীক্ষায় নিশ্চিত সাফল্যের জন্য
            আজই সংগ্রহ করুন আমাদের প্রিমিয়াম সাজেস্টিভ নোটস সঙ্গে Bengali Translation.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#pricing"
            className="glow-blue inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:opacity-90"
          >
            <span className="bn">নোটস কিনুন</span> <ChevronRight className="h-4 w-4" />
          </a>
          <a
            href="#notes-features"
            className="bn inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold text-foreground transition hover:bg-muted/50"
          >
            নোটস-এ কী কী আছে?
          </a>
        </div>

        {/* === Section: আমাদের নোটস এ কি বিশেষত্ব আছে ? ===
            Solid high-contrast background so Bengali text reads cleanly.
            In dark mode: a light cream card with dark text.
            In light mode: a white card with dark text.
            This guarantees readability in BOTH themes. */}
        <div
          id="notes-features"
          className="mt-16 rounded-3xl border border-border p-6 shadow-xl sm:p-10"
          style={{
            backgroundColor: "var(--surface-elevated)",
          }}
        >
          <h2
            className="bn text-center text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--surface-elevated-foreground)" }}
          >
            আমাদের নোটস এ কি বিশেষত্ব আছে ?
          </h2>

          <ol className="bn mx-auto mt-8 max-w-3xl space-y-3 text-[15px] leading-relaxed sm:text-base">
            {FEATURES.map((f) => (
              <li key={f.n} className="flex items-start gap-3" style={{ color: "var(--surface-elevated-foreground)" }}>
                <span
                  className="mt-0.5 flex h-7 w-9 flex-shrink-0 items-center justify-center rounded-md font-mono text-[12px] font-bold"
                  style={{
                    backgroundColor: "var(--surface-elevated-muted)",
                    color: "var(--surface-elevated-accent)",
                  }}
                >
                  {f.n}.
                </span>
                <span>{f.text}</span>
              </li>
            ))}
          </ol>

          {/* === IMAGE — user-provided notes sample image === */}
          <div className="mt-10 flex flex-col items-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border shadow-xl">
              <div className="relative aspect-[1317/1600] w-full">
                <Image
                  src="/images/notes-sample.png"
                  alt="Indrani Pathsala — Premium Suggestive Notes preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-cover"
                />
              </div>
            </div>
            <p
              className="bn mt-3 text-[11px]"
              style={{ color: "var(--surface-elevated-muted-foreground)" }}
            >
              নোটসের স্যাম্পল পেজ — সম্পূর্ণ নোটস কিনলে পাবেন
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
