"use client";

import { Target } from "lucide-react";

const BENEFITS = [
  { num: "01", title: "Smart ও Modern Style", bn: "স্মার্ট ও আধুনিক স্টাইলে সাজানো।" },
  { num: "02", title: "To-the-point লেখা", bn: "টু-দ্য পয়েন্ট (To-the-point) লেখার উদ্দেশ্যে।" },
  { num: "03", title: "সহজ বোঝার সুবিধা", bn: "আঞ্চলিক ভাষা সহযোগে বোঝানো অত্যন্ত সহজ।" },
  { num: "04", title: "Self-confidence বৃদ্ধি", bn: "পরীক্ষায় ভয় দূর, আত্মবিশ্বাস বৃদ্ধি পায়।" },
  { num: "05", title: "Smart Revision Material", bn: "স্মার্ট রিভিশন ম্যাটেরিয়াল (কম সময়ে সম্পূর্ণ স্মৃতি)।" },
  { num: "06", title: "বিষয় অনুযায়ী ট্র্যাকিং", bn: "দুর্বলতম বিষয়গুলো সহজে ট্র্যাকিং ও সমাধান।" },
  { num: "07", title: "পরীক্ষায় আত্মবিশ্বাস", bn: "পরীক্ষায় এমন প্রস্তুতি যাতে মুখস্থ না করতে হয়।" },
  { num: "08", title: "কম সময়ে চয়ন", bn: "যে সময় সংকোচে থাকা স্টুডেন্ট কম পড়ে বেশি পায়।" },
  { num: "09", title: "উন্নত রেজাল্ট", bn: "পরীক্ষায় নম্বর ও র‍্যাঙ্ক মান উন্নত করে।" },
];

export function Benefits() {
  return (
    <section className="relative border-y border-white/5 bg-[#0a1124]/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#a855f7]">
            <Target className="h-3.5 w-3.5" />
            <span className="bn">যা যা পাবেন</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            নোটসটি পছন্দ হলে আপনার{" "}
            <span className="bg-gradient-to-r from-[#2DD4BF] to-[#3b82f6] bg-clip-text text-transparent">
              কী লাভ হবে?
            </span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            শুধু পাস করবেন না — ভালো নম্বর, আত্মবিশ্বাস ও ক্যারিয়ার উভয় দিক থেকেই এগিয়ে থাকবেন।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-[#0056d2]/40 hover:bg-white/[0.05]"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[#0056d2] to-[#3b82f6] bg-clip-text text-3xl font-extrabold text-transparent">
                  {b.num}
                </div>
                <div>
                  <h3 className="bn text-[15px] font-semibold leading-snug text-white">
                    {b.title}
                  </h3>
                  <p className="bn mt-1.5 text-[12px] leading-relaxed text-slate-400">
                    {b.bn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA in middle */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-[#0056d2] px-7 py-3 text-sm font-bold text-white shadow-xl shadow-blue-500/30 transition hover:bg-[#0044a8]"
          >
            <span className="bn">এখনই কিনুন</span> →
          </a>
          <a
            href="https://wa.me/918293742022?text=আমি%20D.Pharm%20Notes%20সম্পর্কে%20জানতে%20চাই"
            target="_blank"
            rel="noopener noreferrer"
            className="bn inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-7 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
          >
            WhatsApp-এ জিজ্ঞাসা করুন
          </a>
        </div>
      </div>
    </section>
  );
}
