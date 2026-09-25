"use client";

import { useState } from "react";
import { FileText, Eye, Download, CheckCircle2, X, Loader2 } from "lucide-react";

/**
 * Sample Notes section — RESTORED original design with local PDF downloads.
 *
 * User specs:
 *   - "Sample Notes" heading: big, bold, colored (accent)
 *   - No subtitle text ("নোটস পছন্দ হবে কি না..." etc. removed)
 *   - Sample PDFs downloaded from Google Drive, hosted locally on website
 *   - Users can download directly from website (no Drive open)
 *
 * Sample PDFs hosted at /public/samples/:
 *   - 1st-year-bengali-demo.pdf  (1st Year Combo sample)
 *   - 1st-year-english-demo.pdf  (1st Year English sample)
 *   - 2nd-year-bengali-demo.pdf  (2nd Year Combo sample)
 *   - 2nd-year-english-demo.pdf  (2nd Year English sample)
 */

type SampleFile = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  downloadUrl: string;
};

const SAMPLE_FILES: SampleFile[] = [
  {
    id: "1st-year-english",
    title: "1st Year Sample File",
    subtitle: "English Version — Pharmaceutics, Pharmaceutical Chemistry, Pharmacognosy, etc.",
    color: "#5b8def",
    downloadUrl: "/samples/1st-year-english-demo.pdf",
  },
  {
    id: "1st-year-bengali",
    title: "1st Year Sample File (Combo)",
    subtitle: "English + Bengali Translation — Pharmaceutics, Pharmaceutical Chemistry, etc.",
    color: "#b27ddb",
    downloadUrl: "/samples/1st-year-bengali-demo.pdf",
  },
  {
    id: "2nd-year-english",
    title: "2nd Year Sample File",
    subtitle: "English Version — Pharmacology, Pharmacotherapy, Clinical Pharmacy, etc.",
    color: "#f5c451",
    downloadUrl: "/samples/2nd-year-english-demo.pdf",
  },
  {
    id: "2nd-year-bengali",
    title: "2nd Year Sample File (Combo)",
    subtitle: "English + Bengali Translation — Pharmacology, Pharmacotherapy, etc.",
    color: "#f08a3e",
    downloadUrl: "/samples/2nd-year-bengali-demo.pdf",
  },
];

function SampleFileModal({
  file,
  onClose,
}: {
  file: SampleFile | null;
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
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ background: `${file.color}20`, color: file.color }}
            >
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-foreground">{file.title}</div>
              <div className="bn truncate text-[11px] text-muted-foreground">{file.subtitle}</div>
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
          src={file.downloadUrl}
          title={file.title}
          onLoad={() => setLoaded(true)}
          className="h-[500px] w-full border-0 bg-background"
        />

        {/* Footer with download button */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/30 px-4 py-3">
          <span className="bn text-[11px] text-muted-foreground">
            Sample PDF — সম্পূর্ণ নোটস কিনলে আরও বিস্তারিত পাবেন
          </span>
          <a
            href={file.downloadUrl}
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
  const [activeFile, setActiveFile] = useState<SampleFile | null>(null);

  return (
    <section id="sample" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Big, bold, colored heading — no subtitle */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-accent sm:text-4xl lg:text-5xl">
            Sample Notes
          </h2>
        </div>

        {/* 4 sample file cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SAMPLE_FILES.map((file) => (
            <div
              key={file.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-xl"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `${file.color}20`, color: file.color }}
              >
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">{file.title}</h3>
              <p className="bn mt-1 text-[11px] text-muted-foreground">{file.subtitle}</p>

              <div className="mt-5 flex flex-col gap-2">
                <button
                  onClick={() => setActiveFile(file)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View File
                </button>
                <a
                  href={file.downloadUrl}
                  download
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-muted/50"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="bn mx-auto mt-8 max-w-2xl text-center text-[12px] text-muted-foreground">
          স্যাম্পল ফাইল সরাসরি আমাদের ওয়েবসাইট থেকে ডাউনলোড করুন। সম্পূর্ণ নোটস কিনলে আরও
          বিস্তারিত এবং সব subject পাবেন।
        </p>
      </div>

      {/* In-page popup modal */}
      <SampleFileModal file={activeFile} onClose={() => setActiveFile(null)} />
    </section>
  );
}
