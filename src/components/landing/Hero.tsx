"use client";

import Image from "next/image";
import { ShieldCheck, ChevronRight } from "lucide-react";

/**
 * Hero — EXACT verbatim text from user.
 * - Solid dark heading text (no gradient — was unreadable)
 * - Image on side (right) with text on left for desktop
 * - Full-width layout, no excessive empty space
 */

const FEATURES: { n: string; text: string }[] = [
  { n: "i",   text: "PCI ER-20 Latest Syllabus অনুযায়ী তৈরি।" },
  { n: "ii",  text: "কোন Chapter থেকে কত নম্বর পরীক্ষাতে আসবে তার বিশ্লেষণ।" },
  { n: "iii", text: "সরল ও সাবলীল ভাষা।" },
  { n: "iv",  text: "VVI MCQ, SAQ, FIB এবং Suggestive Long Question-Answer" },
  { n: "v",   text: "বাংলা, হিন্দি, ওড়িয়া Translation (আপনার বোঝার সুবিধার্থে)" },
  { n: "vi",  text: "Chapter wise Summary (সারসংক্ষেপটি chapter-এর মূল ধারণা পেতে সাহায্য করবে)" },
  { n: "vii", text: "প্রতেকটি বিষয়ের অধ্যায়ভিত্তিক সম্পূর্ণ ধারণা।" },
];

const NEEDED_FOR: { n: string; text: string }[] = [
  { n: "i",   text: "ব্যস্ত চাকরিজীবী ও কর্পোরেট কর্মী।" },
  { n: "ii",  text: "শিক্ষাজীবনে দীর্ঘ বিরতি (gap) থাকা ছাত্রছাত্রী।" },
  { n: "iii", text: "সাপ্লিমেন্টারি বা ইয়ার-বাক (Year back) পাওয়া শিক্ষার্থী।" },
  { n: "iv",  text: "আসন্ন Exit Exam নিয়ে চিন্তিত ছাত্রছাত্রী।" },
  { n: "v",   text: "গ্রামীণ ফার্মাক বা পল্লী চিকিৎসক।" },
  { n: "vi",  text: "সংসার ও পড়াশোনা এক সাথে সামলানো শিক্ষার্থী।" },
  { n: "vii", text: "ইংরেজি ভাষায় ভীতি থাকা শিক্ষার্থী।" },
  { n: "viii",text: "পরীক্ষার ঠিক আগে জেগে ওঠা শিক্ষার্থী।" },
  { n: "ix",  text: "স্মার্ট এবং আধুনিক স্টাডিতে বিশ্বাসী শিক্ষার্থী।" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:pb-24 lg:pt-14">
        {/* Top brand + heading — centered */}
        <div className="flex flex-col items-center text-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl ring-4 ring-primary/30 shadow-xl sm:h-24 sm:w-24">
            <Image src="/images/logo.jpeg" alt="Indrani Pathsala Logo" fill sizes="96px" className="object-cover" priority />
          </div>

          {/* SOLID dark heading — no gradient (was unreadable) */}
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Welcome to
            <br className="sm:hidden" />{" "}
            <span className="text-accent">Indrani Pathsala</span>
          </h1>

          {/* Intro paragraph — VERBATIM */}
          <p className="bn mx-auto mt-6 max-w-3xl text-base leading-relaxed text-foreground sm:text-lg">
            আপনি কি একজন ডিপ্লোমা ফার্মেসি স্টুডেন্ট? তাহলে পরীক্ষায় নিশ্চিত সাফল্যের জন্য
            আজই সংগ্রহ করুন আমাদের প্রিমিয়াম সাজেস্টিভ নোটস সঙ্গে Bengali Translation।
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#pricing"
              className="glow-amber inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:opacity-90"
            >
              <span className="bn">নোটস কিনুন</span> <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href="#notes-features"
              className="bn inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold text-foreground transition hover:bg-muted/50"
            >
              নোটস-এ কী আছে?
            </a>
          </div>
        </div>

        {/* === Section: আমাদের নোট এ কী বিশেষত্ব আছে? ===
            Use a 2-col layout on desktop:
              - LEFT: heading + 7 numbered items + blockquote
              - RIGHT: the IMAGE (sized to fit nicely, not stretched)
            On mobile: stacked vertically */}
        <div
          id="notes-features"
          className="mt-16 rounded-3xl border border-border p-6 shadow-xl sm:p-10"
          style={{ backgroundColor: "var(--surface-elevated)" }}
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* LEFT: heading + items + blockquote */}
            <div>
              <h2
                className="bn text-2xl font-bold sm:text-3xl"
                style={{ color: "var(--surface-elevated-foreground)" }}
              >
                আমাদের নোট এ কী বিশেষত্ব আছে?
              </h2>

              <ol className="bn mt-6 space-y-3 text-[15px] leading-relaxed sm:text-base">
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

              {/* middle paragraph as BLOCKQUOTE (verbatim) */}
              <blockquote
                className="bn mt-8 rounded-r-xl border-l-4 px-5 py-4 text-[14px] leading-relaxed sm:text-[15px]"
                style={{
                  borderColor: "var(--surface-elevated-accent)",
                  backgroundColor: "var(--surface-elevated-muted)",
                  color: "var(--surface-elevated-foreground)",
                }}
              >
                গত বছরের ফেল করার হার এবং বর্তমান পরীক্ষার কঠোর ব্যবস্থা ও পাশ করার
                নিশ্চয়তা—সবকিছুর সমাধান পেতে সময় থাকতে সিরিয়াস হন এবং আজই আমাদের
                প্রিমিয়াম সাজেস্টিভ নোটস সংগ্রহ করুন।
              </blockquote>
            </div>

            {/* RIGHT: IMAGE — properly sized, not stretched, capped to ~480px tall */}
            <div className="flex flex-col items-center lg:sticky lg:top-24">
              <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border shadow-xl">
                <div className="relative aspect-[1317/1600] w-full">
                  <Image
                    src="/images/notes-sample.png"
                    alt="Indrani Pathsala — Premium Suggestive Notes preview"
                    fill
                    sizes="(max-width: 1024px) 100vw, 448px"
                    className="object-cover"
                    loading="eager"
                  />
                </div>
              </div>
              <p
                className="bn mt-3 text-[11px] text-center"
                style={{ color: "var(--surface-elevated-muted-foreground)" }}
              >
                নোটসের স্যাম্পল পেজ — সম্পূর্ণ নোটস কিনলে পাবেন
              </p>
            </div>
          </div>
        </div>

        {/* === Section: এই নোটস টি কাদের প্রয়োজন? ===
            Full-width, two-column items on desktop */}
        <div
          className="mt-8 rounded-3xl border border-border p-6 shadow-xl sm:p-10"
          style={{ backgroundColor: "var(--surface-elevated)" }}
        >
          <h2
            className="bn text-center text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--surface-elevated-foreground)" }}
          >
            এই নোটস টি কাদের প্রয়োজন?
          </h2>

          <ol className="bn mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
            {NEEDED_FOR.map((f) => (
              <li
                key={f.n}
                className="flex items-start gap-3 rounded-xl p-2"
                style={{ color: "var(--surface-elevated-foreground)" }}
              >
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

          {/* Trust row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span className="bn">Secure Razorpay Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="bn">Instant Email PDF Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span className="bn">10 second পরেই PDF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
