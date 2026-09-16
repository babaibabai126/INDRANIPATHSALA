"use client";

import {
  GraduationCap,
  Clock,
  Brain,
  FileCheck,
  Globe2,
  ShieldCheck,
} from "lucide-react";

const WHY_USEFUL = [
  {
    icon: GraduationCap,
    color: "#F97316",
    title: "Best Career & Performance তৈরি",
    bn: "ভালো রেজাল্ট ও ক্যারিয়ার তৈরি করতে সাহায্য করে।",
  },
  {
    icon: Clock,
    color: "#FACC15",
    title: "শিক্ষাজীবনে দীর্ঘ Gap দূর করে",
    bn: "শিক্ষাজীবনে দীর্ঘ gap (বিরতি) থাকলেও পরীক্ষায় ভালো করতে পারবেন।",
  },
  {
    icon: FileCheck,
    color: "#3B82F6",
    title: "Year-Back স্টুডেন্টদের জন্য",
    bn: "সাবজেক্ট ব্যাক-ইয়ার (Year back) পাওয়া শিক্ষার্থীদের জন্য উপযোগী।",
  },
  {
    icon: Brain,
    color: "#A855F7",
    title: "Upcoming Exit Exam প্রস্তুতি",
    bn: "আসন্ন Exit Exam নিয়ে চিন্তিত শিক্ষার্থীদের জন্য সাহায্যকারী।",
  },
  {
    icon: Globe2,
    color: "#2DD4BF",
    title: "গ্রামীণ শিক্ষার্থীদের জন্য উপযোগী",
    bn: "গ্রামীণ পরিবেশে পড়ুয়া শিক্ষার্থীদের জন্য বিশেষ সহায়ক।",
  },
  {
    icon: ShieldCheck,
    color: "#EF4444",
    title: "সংকোচ ও ভয় দূর করে",
    bn: "সংকোচ ও পরীক্ষাভীতি এবং ইংরেজি ভাষায় দুর্বলতা দূর করতে সাহায্য করে।",
  },
];

export function WhyUseful() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#3b82f6]">
            <span className="bn">কেন প্রয়োজন?</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            এই নোটসটি আপনার{" "}
            <span className="bg-gradient-to-r from-[#FACC15] to-[#F97316] bg-clip-text text-transparent">
              কেন প্রয়োজন?
            </span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            এই নোটসটি শুধু একটি সাজেশন নয় — এটি আপনার পরীক্ষা প্রস্তুতির সম্পূর্ণ
            সহযোগী। নিচের কারণগুলো দেখুন কেন এই নোটস আপনার প্রয়োজন।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_USEFUL.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0e1730]/80 p-5 transition hover:border-white/15 hover:bg-[#131e3a]"
              style={{
                borderTop: `3px solid ${item.color}`,
              }}
            >
              <div
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 transition group-hover:opacity-20"
                style={{ background: item.color }}
              />
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  background: `${item.color}20`,
                  color: item.color,
                }}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="bn mt-4 text-[15px] font-semibold leading-snug text-white">
                {item.title}
              </h3>
              <p className="bn mt-2 text-[13px] leading-relaxed text-slate-400">
                {item.bn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
