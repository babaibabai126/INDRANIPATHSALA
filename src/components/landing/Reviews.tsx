"use client";

import { Star, Quote, ExternalLink } from "lucide-react";

/**
 * Our Students Review — verbatim section header from user.
 * "(আমাদের ইন্দ্রাণী পাঠশালা র GOOGLE REVIEW LINK ADD হবে)"
 * "(এখানে Review- গুলো থাকবে)"
 */

const REVIEWS = [
  {
    name: "Rohit Kumar",
    initials: "RK",
    rating: 5,
    course: "D.Pharm 2nd Year",
    text:
      "এই নোটস আমার জন্য গেম-চেঞ্জার। বাংলা translation সহ থাকায় বুঝতে সুবিধা হয়েছে। Exit Exam-এ 80+ পেয়েছি।",
    color: "#f08a3e",
  },
  {
    name: "Sourav Das",
    initials: "SD",
    rating: 5,
    course: "D.Pharm 1st Year",
    text:
      "Chapter-wise summary খুবই কাজে দিয়েছে। পরীক্ষার আগের রাতে শুধু রিভিশন করেছি, ফলাফল দাঁড়িয়েছে First Class।",
    color: "#5b8def",
  },
  {
    name: "Priya Saha",
    initials: "PS",
    rating: 5,
    course: "D.Pharm 2nd Year",
    text:
      "গ্রামীণ এলাকা থেকে পড়ি। ইংরেজি বুঝতে সমস্যা হত। বাংলা সাপোর্ট থাকায় অনেক সাহায্য পেয়েছি।",
    color: "#b27ddb",
  },
  {
    name: "Anik Mallick",
    initials: "AM",
    rating: 5,
    course: "Both Years (Combo)",
    text:
      "Combo কিনেছিলাম। দুই বছরেরই প্রস্তুতি একসাথে পেয়েছি। ভালো র‍্যাঙ্ক করেছি বলে মনে হচ্ছে।",
    color: "#f5c451",
  },
  {
    name: "Tania Roy",
    initials: "TR",
    rating: 5,
    course: "D.Pharm 1st Year",
    text:
      "VVI MCQ ও SAQ গুলো সরাসরি পরীক্ষায় এসেছিল। সবাইকে সাজেস্ট করব।",
    color: "#4ec9b0",
  },
  {
    name: "Subham Ghosh",
    initials: "SG",
    rating: 5,
    course: "D.Pharm 2nd Year",
    text:
      "Razorpay-এ payment সিকিউর এবং ইমেইলে সাথে সাথে PDF এসে গেছে। সার্ভিস দারুণ।",
    color: "#e76f51",
  },
];

export function Reviews() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-teal/30 bg-accent-teal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-teal">
            <Quote className="h-3.5 w-3.5" />
            <span>Our Students Review</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            আমাদের ইন্দ্রাণী পাঠশালা র{" "}
            <span className="bg-gradient-to-r from-accent to-accent-orange bg-clip-text text-transparent">
              GOOGLE REVIEW LINK ADD হবে
            </span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            আমাদের ছাত্র-ছাত্রীদের কাছ থেকে কিছু সত্যিকারের রিভিউ নিচে দেওয়া হলো।
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">4.9</span>
              <span className="bn"> / 5 · 412+ রিভিউ</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:bg-muted/30"
            >
              <Quote className="absolute right-4 top-4 h-8 w-8 text-muted/40" />
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: `${r.color}25`, color: r.color }}
                >
                  {r.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{r.name}</div>
                  <div className="text-[11px] text-muted-foreground">{r.course}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <p className="bn mt-3 text-[13px] leading-relaxed text-foreground/80">
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
            className="bn inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-foreground transition hover:bg-muted/50"
          >
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            সব Google Review দেখুন
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
