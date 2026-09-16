"use client";

import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Rohit Kumar",
    initials: "RK",
    rating: 5,
    course: "D.Pharm 2nd Year",
    text:
      "এই নোটস আমার জন্য গেম-চেঞ্জার। বাংলা translation সহ থাকায় বুঝতে সুবিধা হয়েছে। Exit Exam-এ 80+ পেয়েছি।",
    color: "#F97316",
  },
  {
    name: "Sourav Das",
    initials: "SD",
    rating: 5,
    course: "D.Pharm 1st Year",
    text:
      "Chapter-wise summary খুবই কাজে দিয়েছে। পরীক্ষার আগের রাতে শুধু রিভিশন করেছি, ফলাফল দাঁড়িয়েছে First Class।",
    color: "#3B82F6",
  },
  {
    name: "Priya Saha",
    initials: "PS",
    rating: 5,
    course: "D.Pharm 2nd Year",
    text:
      "গ্রামীণ এলাকা থেকে পড়ি। ইংরেজি বুঝতে সমস্যা হত। বাংলা সাপোর্ট থাকায় অনেক সাহায্য পেয়েছি।",
    color: "#A855F7",
  },
  {
    name: "Anik Mallick",
    initials: "AM",
    rating: 5,
    course: "Both Years (Combo)",
    text:
      "Combo কিনেছিলাম। দুই বছরেরই প্রস্তুতি একসাথে পেয়েছি। ভালো র‍্যাঙ্ক করেছি বলে মনে হচ্ছে।",
    color: "#FACC15",
  },
  {
    name: "Tania Roy",
    initials: "TR",
    rating: 5,
    course: "D.Pharm 1st Year",
    text:
      "VVI MCQ ও SAQ গুলো সরাসরি পরীক্ষায় এসেছিল। সবাইকে সাজেস্ট করব।",
    color: "#2DD4BF",
  },
  {
    name: "Subham Ghosh",
    initials: "SG",
    rating: 5,
    course: "D.Pharm 2nd Year",
    text:
      "Razorpay-এ payment সিকিউর এবং ইমেইলে সাথে সাথে PDF এসে গেছে। সার্ভিস দারুণ।",
    color: "#EF4444",
  },
];

export function Reviews() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2DD4BF]">
            <Quote className="h-3.5 w-3.5" />
            <span>Google Reviews</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            আমাদের ইন্দ্রানী পাঠশালার{" "}
            <span className="bg-gradient-to-r from-[#FACC15] to-[#F97316] bg-clip-text text-transparent">
              ছাত্র-ছাত্রীদের রিভিউ
            </span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 fill-[#FACC15] text-[#FACC15]" />
              ))}
            </div>
            <div className="text-sm text-slate-400">
              <span className="font-bold text-white">4.9</span>
              <span className="bn"> / 5 · 412+ রিভিউ</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-white/8 bg-[#0e1730]/80 p-6 transition hover:border-white/15 hover:bg-[#131e3a]"
            >
              <Quote className="absolute right-4 top-4 h-8 w-8 text-white/5" />
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: `${r.color}30`, color: r.color }}
                >
                  {r.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="text-[11px] text-slate-400">{r.course}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-[#FACC15] text-[#FACC15]" />
                ))}
              </div>
              <p className="bn mt-3 text-[13px] leading-relaxed text-slate-300">
                “{r.text}”
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/search?q=Indrani+Pathsala+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="bn inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            <Star className="h-3.5 w-3.5 fill-[#FACC15] text-[#FACC15]" />
            সব Google Review দেখুন
          </a>
        </div>
      </div>
    </section>
  );
}
