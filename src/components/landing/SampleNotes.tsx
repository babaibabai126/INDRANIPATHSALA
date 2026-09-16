"use client";

import { useState } from "react";
import { FileText, Eye, Download, CheckCircle2 } from "lucide-react";

export function SampleNotes() {
  const [year, setYear] = useState<"1st" | "2nd">("1st");

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#facc15]/30 bg-[#facc15]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-yellow-300">
            <FileText className="h-3.5 w-3.5" />
            <span>Sample Notes</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            নোটস পছন্দ হবে কি না{" "}
            <span className="text-yellow-300">আগেই দেখে নিন</span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            সম্পূর্ণ নোটস কেনার আগে একটি Free Sample PDF ডাউনলোড করে দেখে নিন।
            ভাষা, ছবি, প্রশ্ন ও প্রতিটি অংশ যাচাই করুন।
          </p>
        </div>

        {/* year toggle */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setYear("1st")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              year === "1st"
                ? "bg-[#0056d2] text-white shadow-lg shadow-blue-500/20"
                : "border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            1st Year Sample
          </button>
          <button
            onClick={() => setYear("2nd")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              year === "2nd"
                ? "bg-[#0056d2] text-white shadow-lg shadow-blue-500/20"
                : "border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            2nd Year Sample
          </button>
        </div>

        {/* sample preview card */}
        <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0e1730]/80">
          <div className="grid gap-0 sm:grid-cols-5">
            <div className="relative min-h-[260px] overflow-hidden bg-gradient-to-br from-[#0a1124] to-[#1a233a] p-6 sm:col-span-2">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
              <div className="relative flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0056d2]/20 ring-2 ring-[#0056d2]/30">
                  <FileText className="h-8 w-8 text-[#3b82f6]" />
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#3b82f6]">
                  Sample Preview
                </div>
                <div className="mt-1 text-2xl font-bold text-white">
                  {year} Year
                </div>
                <div className="bn mt-1 text-xs text-slate-400">
                  Pharmaceutics · Chapter 1
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px]">
                  <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-300">PDF</span>
                  <span className="rounded-full bg-blue-500/15 px-2 py-1 text-blue-300">English</span>
                  <span className="rounded-full bg-yellow-500/15 px-2 py-1 text-yellow-300">বাংলা</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:col-span-3 sm:p-8">
              <h3 className="bn text-xl font-bold text-white sm:text-2xl">
                {year === "1st" ? "Pharmaceutics — Introduction" : "Pharmacology — Introduction"}
              </h3>
              <p className="bn mt-2 text-sm leading-relaxed text-slate-400">
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
                  <li key={t} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                    <span className="bn">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0056d2] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#0044a8]"
                >
                  <Eye className="h-4 w-4" />
                  View Sample
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
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
