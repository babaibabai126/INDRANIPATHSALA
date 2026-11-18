"use client";

import {
  GraduationCap,
  Clock,
  FileCheck,
  Brain,
  Globe2,
  ShieldAlert,
  Languages,
  HelpCircle,
  Sparkles,
} from "lucide-react";

const REASONS = [
  {
    icon: GraduationCap,
    n: "i",
    title: "Best Career & Performance",
    bn: "সেরা চারুকলাজীবী ও প্রযুক্তিজীবী সবার তৈরি।",
  },
  {
    icon: Clock,
    n: "ii",
    title: "শিক্ষাজীবনে দীর্ঘ gap",
    bn: "শিক্ষাজীবনে দীর্ঘ gap (বিরতি) থাকলেও পরীক্ষায় ভালো।",
  },
  {
    icon: FileCheck,
    n: "iii",
    title: "Year-back স্টুডেন্ট",
    bn: "সাবজেক্ট ব্যাক-ইয়ার (Year back) পাওয়া শিক্ষার্থীরা।",
  },
  {
    icon: Brain,
    n: "iv",
    title: "Upcoming Exit Exam",
    bn: "আসন্ন Exit Exam নিয়ে চিন্তিত শিক্ষার্থীদের জন্য।",
  },
  {
    icon: Globe2,
    n: "v",
    title: "গ্রামীণ শিক্ষার্থী",
    bn: "গ্রামীণ পরিবেশে পড়ুয়া শিক্ষার্থীদের জন্য উপযোগী।",
  },
  {
    icon: ShieldAlert,
    n: "vi",
    title: "সংকোচ ও পরীক্ষাভীতি",
    bn: "সংকোচ ও পরীক্ষাভীতি দূর করতে সাহায্য করে।",
  },
  {
    icon: Languages,
    n: "vii",
    title: "ইংরেজি ভাষায় দুর্বল",
    bn: "ইংরেজি ভাষায় দুর্বল শিক্ষার্থীদের জন্য বিশেষ সহায়ক।",
  },
  {
    icon: HelpCircle,
    n: "viii",
    title: "পরীক্ষার আগে জিজ্ঞেস",
    bn: "পরীক্ষার আগে আপনার নিজের জিজ্ঞেস ওঠা প্রশ্নগুলি সমাধান।",
  },
  {
    icon: Sparkles,
    n: "ix",
    title: "স্মার্ট ও আধুনিক স্টাইল",
    bn: "স্মার্ট ও আধুনিক স্টাইলে বিশ্বাসী শিক্ষার্থীদের জন্য।",
  },
];

export function WhyNeeded() {
  return (
    <section className="relative border-y border-border bg-muted/20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-purple">
            <span className="bn">যাদের জন্য এই নোটস</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            এই নোটসটি আপনার{" "}
            <span className="bg-gradient-to-r from-accent to-accent-orange bg-clip-text text-transparent">
              কেন প্রয়োজন?
            </span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            এই নোটসটি শুধু একটি সাজেশন নয় — এটি আপনার পরীক্ষা প্রস্তুতির সম্পূর্ণ
            সহযোগী। নিচের কারণগুলো দেখুন।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:bg-muted/30"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.n}.
                  </span>
                  <h3 className="bn text-[15px] font-semibold leading-snug text-foreground">
                    {item.title}
                  </h3>
                </div>
                <p className="bn mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                  {item.bn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
