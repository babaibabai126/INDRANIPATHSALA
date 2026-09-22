"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "এই নোটসটি কোন সিলেবাস অনুযায়ী তৈরি করা হয়েছে?",
    a:
      "আমাদের এই নোটসটি সম্পূর্ণভাবে PCI (Pharmacy Council of India)-এর সর্বশেষ ER-2020 সিলেবাস অনুযায়ী তৈরি। প্রতিটি chapter, প্রতিটি topic সিলেবাসের সাথে সামঞ্জস্যপূর্ণ।",
  },
  {
    q: "এই English Notes-এ সাথে বাংলা translation পাব?",
    a:
      "একদম পাবেন! যদি Only English Version Note আপনার না পছন্দ হয়, তাহলে নিজে থেকে English + Bengali Translation (Combo) বেছে নিতে পারেন। BUY NOW Option-এ click করলেই আপনার Email-এ Combo PDF চলে যাবে।",
  },
  {
    q: "এই নোটসটি পড়লে কি পয়েন্ট পেয়ে এক্সামে ভালো নম্বর পাওয়া যাবে?",
    a:
      "নিশ্চয়ই, অবশ্যই। নোটসটি অত্যন্ত সহজ ও সাবলীল ভাষায় লেখা, যাতে যে কোনো স্টুডেন্ট সহজে বুঝতে পারেন। বিশেষ করে পয়েন্ট পরীক্ষায় সংক্ষিপ্ত ও গুরুত্বপূর্ণ প্রশ্নগুলোকে চিহ্নিত করে এনে তৈরি করা হয়েছে, যা আপনার পয়েন্ট পরীক্ষায় সঠিকভাবে 100% মজবুত হবে।",
  },
  {
    q: "এই নোটসটি কি আমাদের আসন্ন 'এক্সিট এক্সাম' (Exit Exam)-এর জন্য উপযোগী?",
    a:
      "অত্যন্ত গুরুত্বপূর্ণ প্রশ্ন! এই নোটসটি এমনভাবে তৈরি করা হয়েছে যা আপনাকে মাথায় রেখে দেওয়া হয়েছে যাতে আপনার থাকা চূড়ান্ত একদম দূরে থাকে। এর সাথে সাথে আরও কিছু কঠিন MCQ/FIB/SAQ রাখা হয়েছে, যা আপনাকে D.Pharm Exit Exam-এ অবশ্যই ক্রান্তিকারী সাহায্য করবে।",
  },
  {
    q: "আমি কি কিনতে আগে নোটসের কোনো স্যাম্পল বা স্ক্রিনশট দেখতে পারি?",
    a:
      "অবশ্যই! শিক্ষার্থীদের সুবিধার্থে আমরা একটি ফ্রি 'Free Sample PDF' দিয়ে দিয়েছি। আপনি \"View Sample\" বাটনটি ক্লিক করে নোটসের একটি অংশ, ভাষা ও প্রতিটি বিষয় দেখে নিয়ে সম্পূর্ণ নিশ্চিত হয়ে তবেই কিনতে পারেন।",
  },
  {
    q: "বাজারে অন্যান্য বই বা গাইডের সাথে নোটসের তুলনা করলে কি আলাদা ও ভালো?",
    a:
      "বাজারের অন্যান্য বইয়ের মতো মোটা বইয়ে ভাষা অপঠনীয় এবং প্রয়োজনীয় বিষয় নিয়ে ভালো স্টুডেন্ট হতে পারে না যা এড়িয়ে যাওয়া যায়। আমাদের নোটসটি অভিজ্ঞ ফার্মেসিস্ট শিক্ষকদের দ্বারা তৈরি, যা টু-দ্য-পয়েন্ট (To-the-point) এবং পরীক্ষার জন্য যা যা প্রয়োজন ঠিক ততটুকুই সহজ ভাষায় লেখা। এটি আপনার মূল্যবান সময় বাঁচাবে। এবং সাথে বাংলা ট্রান্সলেশন দেওয়া হয়েছে বোঝার সুবিধার্থে।",
  },
  {
    q: "অনলাইন পেমেন্ট করা কি সম্পূর্ণ সুরক্ষিত?",
    a:
      "হ্যাঁ, আমাদের ওয়েবসাইটে পেমেন্ট গেটওয়ে সম্পূর্ণ সুরক্ষিত (Secure & Encrypted)। আপনি UPI (GPay, PhonePe, Paytm), ডেবিট/ক্রেডিট কার্ড বা নেট ব্যাংকিংয়ের মাধ্যমে অত্যন্ত নিরাপদে পেমেন্ট করতে পারেন। কোনো প্রয়োজনে আমাদের সাপোর্ট টিম ২৪ ঘণ্টার মধ্যে তা সমাধান করবে।",
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
            <span>Student-দের সবচেয়ে জিজ্ঞাসিত প্রশ্ন (FAQs)</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            স্টুডেন্টদের সবচেয়ে জিজ্ঞাসিত{" "}
            <span className="text-accent">প্রশ্ন (FAQs)</span>
          </h2>
          <p className="bn mx-auto mt-3 text-sm text-muted-foreground sm:text-base">
            নোটস সম্পর্কে আপনার সব সন্দেহ দূর করুন। নিচের উত্তরগুলো পড়ুন।
          </p>
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
