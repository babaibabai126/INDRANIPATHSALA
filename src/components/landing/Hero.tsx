"use client";

import Image from "next/image";
import { ShieldCheck, ChevronRight } from "lucide-react";

/**
 * Hero — EXACT text from PDF / poster screenshot (verbatim).
 * Big "Welcome to Indrani Pathsala" hero heading on top.
 * Then: intro paragraph + "আমাদের নোটস-এ কী বিশেষ আছে?" (7 items i–vii)
 * + IMAGE placeholder + middle paragraph
 * + "এই নোটসটি কাদের প্রয়োজন?" (9 items i–ix)
 *
 * NOTE: User explicitly said "EI WISE LEKHA GULO DAO..NIJER MOTON LEKHA DEBE NA"
 * = "Use the text exactly like this, don't write your own version"
 * So all Bengali text below is a verbatim copy from the reference poster.
 */

const FEATURES: { n: string; text: string }[] = [
  { n: "i",   text: "PCI ER-20 Latest Syllabus অনুযায়ী তৈরি।" },
  { n: "ii",  text: "প্রত্যেক Chapter এক করে নতুন পরীক্ষার আলো ও বিশ্লেষণ।" },
  { n: "iii", text: "সহজ ও সাবলীল ভাষায়।" },
  { n: "iv",  text: "VVI MCQ, SAQ, FIB এবং Suggestive Long Question-Answer" },
  { n: "v",   text: "বাংলা, হিন্দি, ওড়িয়া Translation (আপনার বোঝার সুবিধার্থে)" },
  { n: "vi",  text: "Chapter wise Summary (পরীক্ষার আগে chapter-এর মূল ধারণা পেতে সাহায্য করবে)" },
  { n: "vii", text: "প্রত্যেকটি বিষয়ের আলাদাভাবে সম্পূর্ণ ধারণা।" },
];

const NEEDED_FOR: { n: string; text: string }[] = [
  { n: "i",   text: "ব্যস্ত চাকরিজীবী ও কর্মচারী ব্যক্তি।" },
  { n: "ii",  text: "পরীক্ষার্থী যাদের বিরতি (gap) থাকে অধ্যয়নী।" },
  { n: "iii", text: "সাফল্যজনক বা ইয়ার-ব্যাক (Year back) পড়ুয়া পরীক্ষার্থী।" },
  { n: "iv",  text: "আগামী Exit Exam নিয়ে চিন্তিত ছাত্রছাত্রী।" },
  { n: "v",   text: "আত্মবিশ্বাস কমে যাওয়া ছাত্রছাত্রী।" },
  { n: "vi",  text: "সুযোগ ও সুবিধা একসাথে সম্পন্ন করতে চাওয়া শিক্ষার্থী।" },
  { n: "vii", text: "ইউনিভার্সিটি অধ্যয়নে জড়িত থাকা শিক্ষার্থী।" },
  { n: "viii",text: "পরীক্ষার ঠিক আগে যুক্ত পরীক্ষার্থী।" },
  { n: "ix",  text: "যাদের অভ্যন্তর আংশিক জ্ঞান আছে বিষয়ে শিক্ষার্থী।" },
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

          {/* intro paragraph — verbatim */}
          <p className="bn mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            আপনি কি একজন ডিপ্লোমা ফার্মেসি স্টুডেন্ট? তাহলে পরীক্ষার নিয়ত সাপ্তাহের জন্য
            আপনি সঠিক সময়ে আমাদের সাহায্য নিন নইলে নক Bengali Translation.
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

        {/* === Section: আমাদের নোটস-এ কী বিশেষ আছে? === */}
        <div id="notes-features" className="mt-16 rounded-3xl border border-border bg-card/60 p-6 shadow-xl backdrop-blur-sm sm:p-10">
          <h2 className="bn text-center text-2xl font-bold text-foreground sm:text-3xl">
            আমাদের নোটস-এ{" "}
            <span className="bg-gradient-to-r from-accent to-accent-orange bg-clip-text text-transparent">
              কী বিশেষ আছে?
            </span>
          </h2>

          <ol className="bn mx-auto mt-8 max-w-3xl space-y-3 text-[15px] leading-relaxed text-foreground/90 sm:text-base">
            {FEATURES.map((f) => (
              <li key={f.n} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-9 flex-shrink-0 items-center justify-center rounded-md bg-primary/15 font-mono text-[12px] font-bold text-primary">
                  {f.n}.
                </span>
                <span>{f.text}</span>
              </li>
            ))}
          </ol>

          {/* IMAGE placeholder (as per poster) */}
          <div className="mt-10 flex flex-col items-center">
            <div className="relative flex h-44 w-full max-w-md flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <div className="mt-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                IMAGE
              </div>
              <div className="bn mt-1 text-[11px] text-muted-foreground">
                নোটসের স্যাম্পল পেজের ছবি এখানে দেখানো হবে
              </div>
            </div>
          </div>

          {/* middle paragraph — verbatim */}
          <p className="bn mx-auto mt-8 max-w-3xl text-center text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
            যত বড়ই একল হোক এবং বর্তমান পরীক্ষার কঠিন ব্যবস্থা ও পাশ করার
            নিশ্চয়তা—সবক্ষেত্রে সমাধান পেতে সময় থাকলে নিয়ে যান এবং আজই আমাদের
            ইন্দ্রানী সাজেশন নোটস সংগ্রহ করুন।
          </p>
        </div>

        {/* === Section: এই নোটসটি কাদের প্রয়োজন? === */}
        <div className="mt-8 rounded-3xl border border-border bg-card/60 p-6 shadow-xl backdrop-blur-sm sm:p-10">
          <h2 className="bn text-center text-2xl font-bold text-foreground sm:text-3xl">
            এই নোটসটি{" "}
            <span className="bg-gradient-to-r from-accent-teal to-primary bg-clip-text text-transparent">
              কাদের প্রয়োজন?
            </span>
          </h2>

          <ol className="bn mx-auto mt-8 max-w-3xl space-y-3 text-[15px] leading-relaxed text-foreground/90 sm:text-base">
            {NEEDED_FOR.map((f) => (
              <li key={f.n} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-9 flex-shrink-0 items-center justify-center rounded-md bg-accent-teal/15 font-mono text-[12px] font-bold text-accent-teal">
                  {f.n}.
                </span>
                <span>{f.text}</span>
              </li>
            ))}
          </ol>

          {/* Trust row at the end */}
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
