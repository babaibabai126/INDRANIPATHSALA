"use client";

import { useState } from "react";
import { FileText, Eye, Download, CheckCircle2, X, Loader2 } from "lucide-react";

/**
 * Sample Notes section — 2 cards (toggle by year).
 *
 * User spec:
 *   - Two sample files: 1st year sample file + 2nd year sample file
 *   - Each shows BOTH English + Bengali combo in one card (single button)
 *   - Year toggle: "1st year – view sample" / "2nd year – view sample"
 *   - Sample PDFs hosted locally (downloaded from Drive)
 *   - View File popup (local iframe preview) + Download button
 */

type SampleFile = {
  year: "1st" | "2nd";
  title: string;
  subtitle: string;
  englishUrl: string;
  bengaliUrl: string;
};

const SAMPLE_FILES: SampleFile[] = [
  {
    year: "1st",
    title: "1st Year Sample File",
    subtitle: "English + Bengali Translation — Pharmaceutics · Chapter 1",
    englishUrl: "/samples/1st-year-english-demo.pdf",
    bengaliUrl: "/samples/1st-year-bengali-demo.pdf",
  },
  {
    year: "2nd",
    title: "2nd Year Sample File",
    subtitle: "English + Bengali Translation — Pharmacology · Chapter 1",
    englishUrl: "/samples/2nd-year-english-demo.pdf",
    bengaliUrl: "/samples/2nd-year-bengali-demo.pdf",
  },
];

function SampleFileModal({
  file,
  onClose,
}: {
  file: { title: string; url: string } | null;
  onClose: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  if (!file) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-foreground">{file.title}</div>
              <div className="bn text-[11px] text-muted-foreground">Sample PDF Preview</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Loading overlay */}
        {!loaded && (
          <div className="flex h-12 items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="bn">PDF লোড হচ্ছে...</span>
          </div>
        )}

        {/* Iframe with local PDF preview */}
        <iframe
          src={file.url}
          title={file.title}
          onLoad={() => setLoaded(true)}
          className="h-[500px] w-full border-0 bg-background"
        />

        {/* Footer with download button */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/30 px-4 py-3">
          <span className="bn text-[11px] text-muted-foreground">
            স্যাম্পল ফাইল — সম্পূর্ণ নোটস কিনলে সব subject পাবেন
          </span>
          <a
            href={file.url}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" />
            ডাউনলোড করুন
          </a>
        </div>
      </div>
    </div>
  );
}

export function SampleNotes() {
  const [year, setYear] = useState<"1st" | "2nd">("1st");
  const [activeModal, setActiveModal] = useState<{ title: string; url: string } | null>(null);

  const current = SAMPLE_FILES.find((f) => f.year === year) || SAMPLE_FILES[0];

  return (
    <section id="sample" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Big, bold, colored heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-accent sm:text-4xl lg:text-5xl">
            Sample Notes
          </h2>
        </div>

        {/* year toggle */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setYear("1st")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              year === "1st"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "border border-border bg-card text-foreground hover:bg-muted/50"
            }`}
          >
            1st year – view sample
          </button>
          <button
            onClick={() => setYear("2nd")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              year === "2nd"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "border border-border bg-card text-foreground hover:bg-muted/50"
            }`}
          >
            2nd year – view sample
          </button>
        </div>

        {/* Single sample file card (year-toggle based) */}
        <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid gap-0 sm:grid-cols-5">
            {/* LEFT: Preview thumbnail */}
            <div className="relative min-h-[260px] overflow-hidden bg-gradient-to-br from-muted/50 to-card p-6 sm:col-span-2">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
              <div className="relative flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 ring-2 ring-primary/30">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                  Sample Preview
                </div>
                <div className="mt-1 text-2xl font-bold text-foreground">
                  {year === "1st" ? "1st Year" : "2nd Year"}
                </div>
                <div className="bn mt-1 text-xs text-muted-foreground">
                  {year === "1st" ? "Pharmaceutics · Chapter 1" : "Pharmacology · Chapter 1"}
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px]">
                  <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-600 dark:text-emerald-400">PDF</span>
                  <span className="rounded-full bg-primary/15 px-2 py-1 text-primary">English</span>
                  <span className="rounded-full bg-accent/15 px-2 py-1 text-accent">বাংলা</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Details + actions */}
            <div className="p-6 sm:col-span-3 sm:p-8">
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                {current.title}
              </h3>
              <p className="bn mt-2 text-sm leading-relaxed text-muted-foreground">
                এই স্যাম্পলে আপনি দেখবেন: chapter summary, VVI MCQ/SAQ/FIB, সহজ ভাষায়
                explanation, বাংলা translation এবং পরীক্ষা-ভিত্তিক সাজেশন।
              </p>

              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  "Chapter Summary",
                  "VVI MCQ + SAQ",
                  "Bengali Translation",
                  "Long Question-Answer",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-xs text-foreground/80">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                    <span className="bn">{t}</span>
                  </li>
                ))}
              </ul>

              {/* Two cards: English version + Bengali version */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      English
                    </span>
                  </div>
                  <h4 className="bn mt-2 text-[12px] font-semibold text-foreground">
                    English Version Sample
                  </h4>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() =>
                        setActiveModal({ title: `${current.title} — English`, url: current.englishUrl })
                      }
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold text-primary-foreground transition hover:opacity-90"
                    >
                      <Eye className="h-3 w-3" />
                      View File
                    </button>
                    <a
                      href={current.englishUrl}
                      download
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-semibold text-foreground transition hover:bg-muted/50"
                    >
                      <Download className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                      বাংলা
                    </span>
                  </div>
                  <h4 className="bn mt-2 text-[12px] font-semibold text-foreground">
                    Bengali Translation Sample
                  </h4>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() =>
                        setActiveModal({ title: `${current.title} — Bengali`, url: current.bengaliUrl })
                      }
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold text-accent-foreground transition hover:opacity-90"
                    >
                      <Eye className="h-3 w-3" />
                      View File
                    </button>
                    <a
                      href={current.bengaliUrl}
                      download
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-semibold text-foreground transition hover:bg-muted/50"
                    >
                      <Download className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* In-page popup modal */}
      <SampleFileModal file={activeModal} onClose={() => setActiveModal(null)} />
    </section>
  );
}
