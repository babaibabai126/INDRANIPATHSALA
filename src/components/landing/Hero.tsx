"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  FileText,
  Languages,
  ListChecks,
  ScrollText,
  FileCheck2,
  PenLine,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: FileCheck2,
    title: "PCI ER-20 Latest Syllabus",
    bn: "PCI (Pharmacy Council of India) ER-2020 সিলেবাস অনুযায়ী তৈরি।",
  },
  {
    icon: BookOpen,
    title: "Chapter-wise Exam Oriented",
    bn: "প্রতিটি Chapter পরীক্ষা ভিত্তিক ভাবে সাজানো।",
  },
  {
    icon: PenLine,
    title: "সহজ ও সাবলীল ভাষা",
    bn: "সহজ ও সাবলীল ভাষায় লেখা — সবার বোঝার উপযোগী।",
  },
  {
    icon: ListChecks,
    title: "VVI MCQ · SAQ · FIB",
    bn: "VVI MCQ, SAQ, FIB ও Suggestive Long Question-Answer।",
  },
  {
    icon: Languages,
    title: "Bengali · Hindi · English Translation",
    bn: "বাংলা, হিন্দি, ও ইংরাজি Translation (বোঝার সুবিধার্থে)।",
  },
  {
    icon: ScrollText,
    title: "Chapter-wise Summary",
    bn: "Chapter-wise Summary — chapter এর সারাংশ এক নজরে।",
  },
  {
    icon: FileText,
    title: "100% Digital PDF Notes",
    bn: "Complete digital notes — প্রিন্ট নিয়ে অধ্যয়নবৃত্তি সম্পূর্ণ সহজ।",
  },
];

export function Hero() {
  const [form, setForm] = useState({ name: "", phone: "", course: "1st Year" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitted(true);
  };

  return (
    <section id="top" className="relative overflow-hidden bg-grid">
      {/* glow overlays */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[#0056d2]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-[#a855f7]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
        {/* LEFT: copy + features */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#facc15]/30 bg-[#facc15]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-yellow-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="bn">D.Pharm Premium Suggestive Notes</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
            ডিপ্লোমা ফার্মেসি স্টুডেন্ট?
            <br />
            <span className="bn text-yellow-300">পরীক্ষায় ভালো না?</span>{" "}
            <span className="bg-gradient-to-r from-[#0056d2] to-[#3b82f6] bg-clip-text text-transparent">
              আজই সংগ্রে করুন
            </span>
          </h1>

          <p className="bn mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            আমাদের ইন্দ্রানী সাজেশন নোটটি সম্পূর্ণ PCI ER-2020 সিলেবাস অনুযায়ী তৈরি —
            বাংলা + English Translation সহ। টু-দ্য-পয়েন্ট, পরীক্ষা-ভিত্তিক, সহজ ভাষায় লেখা।
          </p>

          <p className="bn mt-3 max-w-2xl text-sm text-slate-400">
            গত বছরে পড়েছে হাজারের বেশি প্রশ্ন ও বিগত বছরের প্রশ্ন বিশ্লেষণ করে আজই আমাদের
            ইন্দ্রানী সাজেশন নোটস সংগ্রহ করুন।
          </p>

          {/* Quick feature chips */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {FEATURES.slice(0, 6).map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-3 transition hover:border-white/15 hover:bg-white/[0.06]"
              >
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#0056d2]/15 text-[#3b82f6]">
                  <f.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white">{f.title}</div>
                  <div className="bn text-[11px] leading-snug text-slate-400">{f.bn}</div>
                </div>
              </div>
            ))}
          </div>

          {/* trust row */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="bn">Secure Razorpay Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <span className="bn">Instant Email PDF Delivery</span>
            </div>
          </div>
        </div>

        {/* RIGHT: inquiry form */}
        <div className="mt-10 lg:col-span-5 lg:mt-0">
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0e1730] to-[#0a1124] p-5 shadow-2xl shadow-blue-500/10 sm:p-6">
            {/* progress bar */}
            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-slate-400">
                <span className="bn">এই ব্যাচের সিট সংখ্যা</span>
                <span className="text-yellow-300">
                  412 / 500 <span className="bn">সিট বুকড</span>
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FF4500] to-[#facc15]"
                  style={{ width: "82%" }}
                />
              </div>
            </div>

            <div className="text-center">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#3b82f6]">
                Free Inquiry
              </div>
              <h3 className="bn mt-1 text-xl font-bold text-white">
                নোটস সম্পর্কে জানুন
              </h3>
              <p className="bn mt-1 text-xs text-slate-400">
                ফর্ম পূরণ করুন, আমরা আপনাকে কল করব
              </p>
            </div>

            {submitted ? (
              <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="bn text-sm font-semibold text-white">
                  ধন্যবাদ {form.name}! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                </div>
                <a
                  href="#pricing"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#0056d2] px-4 py-2 text-xs font-bold text-white hover:bg-[#0044a8]"
                >
                  Buy Now <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Full Name <span className="bn text-slate-500">(নাম)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="আপনার নাম লিখুন"
                    className="bn w-full rounded-lg border border-white/10 bg-white/95 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/40"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Phone Number <span className="bn text-slate-500">(মোবাইল)</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="98XXXXXXXX"
                    className="w-full rounded-lg border border-white/10 bg-white/95 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/40"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Course <span className="bn text-slate-500">(কোর্স)</span>
                  </label>
                  <select
                    value={form.course}
                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/95 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/40"
                  >
                    <option>D.Pharm 1st Year</option>
                    <option>D.Pharm 2nd Year</option>
                    <option>Both (Combo Pack)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="glow-blue mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0056d2] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0044a8]"
                >
                  Request Call Back
                  <ChevronRight className="h-4 w-4" />
                </button>
                <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-[10px] text-slate-500">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  <span className="bn">আপনার তথ্য 100% নিরাপদ</span>
                </p>
              </form>
            )}
          </div>

          {/* mini avatar social proof */}
          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-400">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#02081b] bg-gradient-to-br from-[#0056d2] to-[#a855f7] text-[10px] font-bold text-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="bn">412+ স্টুডেন্ট এই সপ্তাহে নোটস কিনেছে</span>
          </div>
        </div>
      </div>
    </section>
  );
}
