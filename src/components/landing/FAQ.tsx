"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "এই নোটটি কোন সিলেবাস অনুযায়ী তৈরি করা হয়েছে?",
    a:
      "আমাদের এই নোটটি সম্পূর্ণভাবে PCI (Pharmacy Council of India)-এর সর্বশেষ ER-2020 সিলেবাস অনুযায়ী তৈরি।",
  },
  {
    q: "এই English Notes-এর সাথে Bengali Translation কীভাবে পাব?",
    a:
      "প্রথমে যে Only English Version Note আছে তার নিচে যে English + Bengali Translation (Combo) রয়েছে, তার পাশে BUY NOW Option click করলেই আপনার Email-এ Combo PDF চলে যাবে।",
  },
  {
    q: "এই নোটটি পড়লে কি ফাইনাল পরীক্ষায় ভালো নম্বর পাওয়া যাবে?",
    a:
      "হ্যাঁ, অবশ্যই। নোটটি অত্যন্ত সহজ ও সরল ভাষায় লেখা, যাতে যে কোনো স্টুডেন্ট সহজে বুঝতে পারে। বিগত কয়েক বছরের পরীক্ষার ট্রেন্ড অ্যানালিসিস করে এবং গুরুত্বপূর্ণ প্রশ্নগুলোকে ফোকাস করে এটি তৈরি করা হয়েছে, যা আপনার ফাইনাল পরীক্ষার প্রস্তুতিতে ১০০% মনোযোগ দিতে সাহায্য করবে।",
  },
  {
    q: "এই নোটটি কি আমাদের আসন্ন ‘এক্সিট এক্সাম’ (Exit Exam)-এর জন্য উপকারী হবে?",
    a:
      "অত্যন্ত গুরুত্বপূর্ণ প্রশ্ন! এই নোটটি এমনভাবে ডিজাইন করা হয়েছে যে আপনার থিওরি কনসেপ্ট একদম ক্লিয়ার করে দেবে। এর পাশাপাশি এতে প্রচুর MCQ/FIB/SAQ যুক্ত করা হয়েছে, যা আপনাকে D.Pharm Exit Exam প্রথমবারেই ক্র্যাক করতে ভীষণভাবে সাহায্য করবে।",
  },
  {
    q: "আমি কি কেনার আগে নোটসের কোনো ডেমো বা স্যাম্পল কপি দেখতে পারি?",
    a:
      "অবশ্যই! শিক্ষার্থীদের সুবিধার্থে প্রতিটি সাবজেক্টেরই একটি করে ‘Free Sample PDF’ দেওয়া হয়েছে। আপনি “View Sample” বাটনে ক্লিক করে নোটের কোয়ালিটি, লেখার ভাষা এবং ফরম্যাট দেখে নিয়ে সম্পূর্ণ নিশ্চিত হয়েই কিনতে পারেন।",
  },
  {
    q: "বাজার বা কলেজের অন্যান্য বই ও নোটসের থেকে ইন্দ্রাণী পাঠশালার নোটস কেন আলাদা ও সেরা?",
    a:
      "বাজারের মোটা মোটা বইয়ের ভাষা অনেক সময় কঠিন হয় এবং প্রয়োজনের বাইরে ও কিছু তথ্য থাকে যা বাধ্য হয়ে স্টুডেন্টকে করতে হয়। আমাদের নোটস অভিজ্ঞ ফার্মেসি শিক্ষকদের দ্বারা তৈরি, যা টু-দ্য-পয়েন্ট (To-the-point) এবং পরীক্ষার জন্য ঠিক যতটুকু দরকার ততটুকুই সহজ ভাষায় লেখা। এটি আপনার মূল্যবান সময় বাঁচাবে। এবং সঙ্গে বাংলা ট্রান্সলেশন দেওয়া হয়েছে বোঝার সুবিধার জন্য।",
  },
  {
    q: "অনলাইনে পেমেন্ট করার পদ্ধতি কি সম্পূর্ণ সুরক্ষিত?",
    a:
      "হ্যাঁ, আমাদের ওয়েবসাইটের পেমেন্ট গেটওয়ে সম্পূর্ণ সুরক্ষিত (Secure & Encrypted)। আপনি UPI (GPay, PhonePe, Paytm), Debit/Credit Card বা Net Banking-এর মাধ্যমে অত্যন্ত নিরাপদে পেমেন্ট করতে পারবেন। কোনো টাকা আটকে গেলে আমাদের সাপোর্ট টিম ২৪ ঘণ্টার মধ্যে তা সমাধান করবে।",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Student-দের সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্ন (FAQs)</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Student-দের সবচেয়ে বেশি জিজ্ঞাসিত{" "}
            <span className="text-accent">প্রশ্ন (FAQs)</span>
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/40"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={open === i}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                    Q{i + 1}
                  </span>
                  <span className="bn text-[14px] font-semibold leading-snug text-foreground">
                    {faq.q}
                  </span>
                </div>
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 transition ${
                    open === i ? "rotate-180 bg-primary/20 text-primary" : "text-muted-foreground"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="bn border-t border-border px-5 py-4 text-[13px] leading-relaxed text-foreground/80 sm:pl-14">
                    <span className="font-semibold text-emerald-500">উত্তর:</span>{" "}
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
