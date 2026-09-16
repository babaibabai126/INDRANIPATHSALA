"use client";

import { CheckCircle2, Crown, Zap, Languages } from "lucide-react";

type Plan = {
  badge: string;
  badgeColor: string;
  year: string;
  title: string;
  titleBn: string;
  price: number;
  originalPrice?: number;
  features: { en: string; bn: string }[];
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    badge: "1st Year",
    badgeColor: "#3B82F6",
    year: "1st Year",
    title: "Only English Version",
    titleBn: "শুধু English Version",
    price: 1399,
    originalPrice: 1999,
    features: [
      { en: "Complete PCI ER-2020 Syllabus", bn: "সম্পূর্ণ PCI ER-2020 সিলেবাস" },
      { en: "Chapter-wise Summary", bn: "Chapter-wise সারাংশ" },
      { en: "VVI MCQ · SAQ · FIB", bn: "VVI MCQ, SAQ, FIB" },
      { en: "Long Question-Answer", bn: "Long Question-Answer" },
      { en: "Smart Revision Material", bn: "Smart Revision Material" },
    ],
  },
  {
    badge: "1st Year · COMBO",
    badgeColor: "#FACC15",
    year: "1st Year",
    title: "English + Bengali Translation",
    titleBn: "English + বাংলা Translation (Combo)",
    price: 1899,
    originalPrice: 2499,
    popular: true,
    features: [
      { en: "Everything in English Version", bn: "English Version-এর সব সুবিধা" },
      { en: "Bengali Translation (chapter-wise)", bn: "প্রতিটি chapter-এ বাংলা অনুবাদ" },
      { en: "Easy to understand language", bn: "সহজ বোঝার ভাষা" },
      { en: "Both language combined PDF", bn: "দুটি ভাষার কম্বো PDF" },
      { en: "Best for rural students", bn: "গ্রামীণ স্টুডেন্টদের জন্য সেরা" },
    ],
  },
  {
    badge: "2nd Year",
    badgeColor: "#A855F7",
    year: "2nd Year",
    title: "Only English Version",
    titleBn: "শুধু English Version",
    price: 1499,
    originalPrice: 2199,
    features: [
      { en: "Complete PCI ER-2020 Syllabus", bn: "সম্পূর্ণ PCI ER-2020 সিলেবাস" },
      { en: "Chapter-wise Summary", bn: "Chapter-wise সারাংশ" },
      { en: "VVI MCQ · SAQ · FIB", bn: "VVI MCQ, SAQ, FIB" },
      { en: "Long Question-Answer", bn: "Long Question-Answer" },
      { en: "Exit Exam focused", bn: "Exit Exam প্রস্তুতি" },
    ],
  },
  {
    badge: "2nd Year · COMBO",
    badgeColor: "#F97316",
    year: "2nd Year",
    title: "English + Bengali Translation",
    titleBn: "English + বাংলা Translation (Combo)",
    price: 1999,
    originalPrice: 2799,
    features: [
      { en: "Everything in English Version", bn: "English Version-এর সব সুবিধা" },
      { en: "Bengali Translation (chapter-wise)", bn: "প্রতিটি chapter-এ বাংলা অনুবাদ" },
      { en: "Easy to understand language", bn: "সহজ বোঝার ভাষা" },
      { en: "Both language combined PDF", bn: "দুটি ভাষার কম্বো PDF" },
      { en: "Best for rural students", bn: "গ্রামীণ স্টুডেন্টদের জন্য সেরা" },
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-16 sm:py-20">
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#0056d2]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FACC15]/30 bg-[#FACC15]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-yellow-300">
            <Crown className="h-3.5 w-3.5" />
            <span>Premium Notes · Buy Now</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            D.Pharm 1st / 2nd Year{" "}
            <span className="bg-gradient-to-r from-[#FACC15] to-[#F97316] bg-clip-text text-transparent">
              Premium Suggestive Notes
            </span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            Payment সম্পূর্ণ হওয়ার সাথে সাথেই আপনার Email-এ PDF Download link চলে যাবে।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col overflow-hidden rounded-2xl border bg-[#0e1730]/80 p-5 transition hover:-translate-y-1 ${
                plan.popular
                  ? "border-[#FACC15]/50 shadow-2xl shadow-yellow-500/10"
                  : "border-white/8 hover:border-white/15"
              }`}
            >
              {plan.popular && (
                <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#FACC15] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-900">
                  <Zap className="h-3 w-3" /> Popular
                </div>
              )}

              <div
                className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: `${plan.badgeColor}25`,
                  color: plan.badgeColor,
                }}
              >
                {plan.badge}
              </div>

              <h3 className="mt-3 text-base font-bold text-white">{plan.title}</h3>
              <p className="bn text-[11px] text-slate-400">{plan.titleBn}</p>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-white">₹{plan.price}</span>
                {plan.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    ₹{plan.originalPrice}
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                <span className="bn">Instant Email PDF Delivery</span>
              </div>

              <ul className="mt-4 space-y-2">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                    <div>
                      <div className="text-[12px] text-slate-200">{f.en}</div>
                      <div className="bn text-[10px] text-slate-500">{f.bn}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href="#payment"
                className={`mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  plan.popular
                    ? "bg-[#FACC15] text-slate-900 hover:bg-[#e6b800]"
                    : "bg-[#0056d2] text-white hover:bg-[#0044a8]"
                }`}
              >
                Buy Now →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Languages className="h-3.5 w-3.5 text-blue-400" />
            <span className="bn">UPI · Cards · Net Banking</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span className="bn">100% Secure Razorpay</span>
          </div>
        </div>
      </div>
    </section>
  );
}
