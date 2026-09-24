"use client";

import { useState } from "react";
import { FileText, Eye, Download, CheckCircle2 } from "lucide-react";

/**
 * Sample Notes section — RESTORED original design.
 * Shows a single notes-sample.png image as preview + View Sample / Download buttons.
 * (Individual PDF files per subject are shown ONLY after payment — see PaymentForm.)
 */

export function SampleNotes() {
  const [year, setYear] = useState<"1st" | "2nd">("1st");

  return (
    <section id="sample" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            <FileText className="h-3.5 w-3.5" />
            <span>Sample Notes</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            নোটস পছন্দ হবে কি না{" "}
            <span className="text-accent">আগেই দেখে নিন</span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            সম্পূর্ণ নোটস কেনার আগে একটি Free Sample PDF ডাউনলোড করে দেখে নিন।
          </p>
        </div>

        {/* year toggle */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setYear("1st")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              year === "1st"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "border border-border bg-card text-foreground hover:bg-muted/50"
            }`}
          >
            1st year – view sample
          </button>
          <button
            onClick={() => setYear("2nd")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              year === "2nd"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "border border-border bg-card text-foreground hover:bg-muted/50"
            }`}
          >
            2nd year – view sample
          </button>
        </div>

        {/* sample preview card */}
        <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid gap-0 sm:grid-cols-5">
            <div className="relative min-h-[260px] overflow-hidden bg-gradient-to-br from-muted/50 to-card p-6 sm:col-span-2">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
              <div className="relative flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 ring-2 ring-primary/30">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                  Sample Preview
                </div>
                <div className="mt-1 text-2xl font-bold text-foreground">
                  {year} Year
                </div>
                <div className="bn mt-1 text-xs text-muted-foreground">
                  {year === "1st" ? "Pharmaceutics · Chapter 1" : "Pharmacology · Chapter 1"}
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px]">
                  <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-600 dark:text-emerald-400">PDF</span>
                  <span className="rounded-full bg-primary/15 px-2 py-1 text-primary">English</span>
                  <span className="rounded-full bg-accent/15 px-2 py-1 text-accent">বাংলা</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:col-span-3 sm:p-8">
              <h3 className="bn text-xl font-bold text-foreground sm:text-2xl">
                {year === "1st" ? "Pharmaceutics — Introduction" : "Pharmacology — Introduction"}
              </h3>
              <p className="bn mt-2 text-sm leading-relaxed text-muted-foreground">
                এই স্যাম্পলে আপনি দেখবেন: chapter summary, VVI MCQ/SAQ/FIB, সহজ ভাষায়
                explanation, বাংলা translation এবং পরীক্ষা-ভিত্তিক সাজেশন।
              </p>

              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  "Chapter Summary",
                  "VVI MCQ + SAQ",
                  "Bengali Translation",
                  "Long Question-Answer",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-xs text-foreground/80">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                    <span className="bn">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
                >
                  <Eye className="h-4 w-4" />
                  View Sample
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-muted/50"
                >
                  <Download className="h-4 w-4" />
                  Download Free PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
