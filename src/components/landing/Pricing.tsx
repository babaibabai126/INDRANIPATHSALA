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
  code: string;
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
    code: "1en",
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
    code: "1combo",
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
    code: "2en",
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
    code: "2combo",
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
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            <Crown className="h-3.5 w-3.5" />
            <span>BUY NOW</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            D.Pharm 1st / 2nd Year{" "}
            <span className="bg-gradient-to-r from-accent to-accent-orange bg-clip-text text-transparent">
              Premium Suggestive Notes
            </span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Payment সম্পূর্ণ হওয়ার সাথে সাথেই আপনার Email-এ PDF Download link চলে যাবে।
          </p>
        </div>

        {/* Year group dividers */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 1st Year group */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                1st Year Premium Suggestive Notes
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PLANS.filter((p) => p.year === "1st Year").map((plan, i) => (
                <PlanCard key={i} plan={plan} />
              ))}
            </div>
          </div>

          {/* 2nd Year group */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-purple/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-purple">
                2nd Year Premium Suggestive Notes
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PLANS.filter((p) => p.year === "2nd Year").map((plan, i) => (
                <PlanCard key={i} plan={plan} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Languages className="h-3.5 w-3.5 text-primary" />
            <span className="bn">UPI · Cards · Net Banking</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span className="bn">100% Secure Razorpay</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border bg-card p-5 transition hover:-translate-y-1 ${
        plan.popular
          ? "border-accent/50 shadow-2xl shadow-accent/10"
          : "border-border hover:border-primary/40"
      }`}
    >
      {plan.popular && (
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-accent-foreground">
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

      <h3 className="mt-3 text-base font-bold text-foreground">{plan.title}</h3>
      <p className="bn text-[11px] text-muted-foreground">{plan.titleBn}</p>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-2xl font-extrabold text-foreground">₹{plan.price}</span>
        {plan.originalPrice && (
          <span className="text-sm text-muted-foreground line-through">
            ₹{plan.originalPrice}
          </span>
        )}
        <span className="text-[10px] text-muted-foreground">/-</span>
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="h-3 w-3" />
        <span className="bn">Instant Email PDF Delivery</span>
      </div>

      <ul className="mt-4 space-y-2">
        {plan.features.map((f, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
            <div>
              <div className="text-[12px] text-foreground/90">{f.en}</div>
              <div className="bn text-[10px] text-muted-foreground">{f.bn}</div>
            </div>
          </li>
        ))}
      </ul>

      <a
        href={`#payment?course=${plan.code}`}
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("payment");
          el?.scrollIntoView({ behavior: "smooth" });
          // Try to set the dropdown
          setTimeout(() => {
            const sel = document.querySelector<HTMLSelectElement>("#payment-course-select");
            if (sel) sel.value = plan.code;
            sel?.dispatchEvent(new Event("change", { bubbles: true }));
          }, 400);
        }}
        className={`mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
          plan.popular
            ? "bg-accent text-accent-foreground hover:opacity-90"
            : "bg-primary text-primary-foreground hover:opacity-90"
        }`}
      >
        BUY NOW →
      </a>
    </div>
  );
}
