"use client";

import {
  FileCheck2,
  BookOpen,
  PenLine,
  ListChecks,
  Languages,
  ScrollText,
  FileText,
} from "lucide-react";

const FEATURES = [
  {
    icon: FileCheck2,
    n: "i",
    title: "PCI ER-20 Latest Syllabus",
    bn: "PCI ER-20 Latest Syllabus অনুযায়ী তৈরি।",
  },
  {
    icon: BookOpen,
    n: "ii",
    title: "Chapter-wise Exam Oriented",
    bn: "Chapter তে পরীক্ষা ভিত্তিক।",
  },
  {
    icon: PenLine,
    n: "iii",
    title: "সহজ ও সাবলীল ভাষা",
    bn: "সহজ ও সাবলীল ভাষায় লেখা।",
  },
  {
    icon: ListChecks,
    n: "iv",
    title: "VVI MCQ · SAQ · FIB",
    bn: "VVI MCQ, SAQ, FIB ও Suggestive Long Question-Answer।",
  },
  {
    icon: Languages,
    n: "v",
    title: "বাংলা · হিন্দি · ওড়িয়া Translation",
    bn: "বাংলা, হিন্দি, ওড়িয়া Translation (বোঝার সুবিধার্থে)।",
  },
  {
    icon: ScrollText,
    n: "vi",
    title: "Chapter-wise Summary",
    bn: "Chapter wise Summary (chapter তে তে)।",
  },
  {
    icon: FileText,
    n: "vii",
    title: "Complete Digital PDF",
    bn: "সম্পূর্ণ ডিজিটাল নোটস — অধ্যয়নবৃত্তি সম্পূর্ণ ধারাবাহিক।",
  },
];

export function NotesFeatures() {
  return (
    <section id="notes" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <span className="bn">আমাদের নোটস-এ যা যা আছে</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            আমাদের নোটস-এ{" "}
            <span className="bg-gradient-to-r from-accent to-accent-orange bg-clip-text text-transparent">
              কী কী থাকবে?
            </span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            PCI সিলেবাস অনুযায়ী তৈরি, সহজ ভাষায় লেখা — বাংলা ট্রান্সলেশন সহ সম্পূর্ণ প্রস্তুতি।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:bg-muted/30"
            >
              <div className="absolute right-4 top-3 text-2xl font-extrabold italic text-muted/40">
                {f.n}.
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="bn mt-4 text-[15px] font-semibold leading-snug text-foreground">
                {f.title}
              </h3>
              <p className="bn mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {f.bn}
              </p>
            </div>
          ))}

          {/* IMAGE placeholder card */}
          <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-muted/30 p-5 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="bn mt-4 text-[15px] font-semibold leading-snug text-foreground">
              IMAGE
            </h3>
            <p className="bn mt-2 text-[12px] leading-relaxed text-muted-foreground">
              নোটসের স্যাম্পল পেজের ছবি এখানে দেখানো হবে — chapter preview, layout ও ছাপ সহ।
            </p>
            <a
              href="#sample"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-semibold text-foreground transition hover:bg-muted/50"
            >
              <span className="bn">View Sample →</span>
            </a>
          </div>
        </div>

        {/* ANALYSIS line */}
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card p-5 text-center">
          <p className="bn text-[14px] leading-relaxed text-foreground/90 sm:text-[15px]">
            গত বছরের পড়ানো হাজার এবং বিগত বছরের প্রশ্ন বিশ্লেষণ করে প্রস্তুত — সব
            কিছু আছে সমাধান করতে সময় থাকলে নিয়ে যান এবং আজই আমাদের ইন্দ্রানী
            সাজেশন নোটস সংগ্রহ করুন।
          </p>
        </div>
      </div>
    </section>
  );
}
