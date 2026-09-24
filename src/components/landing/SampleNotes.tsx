"use client";

import { useState } from "react";
import { Eye, Download, X, FileText, Loader2 } from "lucide-react";

/**
 * Sample Notes section — "View File" button opens a popup modal
 * with a preview iframe + Download button.
 *
 * Files are hosted on Google Drive (user-provided):
 *   - 1st Year Sample: https://drive.google.com/drive/u/0/folders/1m8xn2-Rx2TiMvBNgKUTy0Hq4km_fmnv3
 *
 * For Drive files: preview = /preview, download = direct download link.
 */

const SAMPLE_FILES = [
  {
    id: "1st",
    title: "1st Year Sample Notes",
    subtitle: "Pharmaceutics, Pharmaceutical Chemistry, Pharmacognosy",
    color: "#5b8def",
    // User provided a folder URL — using sample preview of folder contents
    driveFolder: "1m8xn2-Rx2TiMvBNgKUTy0Hq4km_fmnv3",
  },
  {
    id: "2nd",
    title: "2nd Year Sample Notes",
    subtitle: "Pharmacology, Pharmacotherapy, Clinical Pharmacy",
    color: "#b27ddb",
    driveFolder: "1m8xn2-Rx2TiMvBNgKUTy0Hq4km_fmnv3",
  },
];

type Props = {
  file: (typeof SAMPLE_FILES)[0] | null;
  onClose: () => void;
};

export function SampleFileModal({ file, onClose }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (!file) return null;

  const previewUrl = `https://drive.google.com/drive/folders/${file.driveFolder}`;
  const downloadUrl = `https://drive.google.com/drive/folders/${file.driveFolder}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: `${file.color}20`, color: file.color }}
            >
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">{file.title}</div>
              <div className="bn text-[11px] text-muted-foreground">{file.subtitle}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Loading overlay */}
        {!loaded && (
          <div className="flex h-12 items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="bn">Google Drive থেকে ফাইল লোড হচ্ছে...</span>
          </div>
        )}

        {/* Iframe with Google Drive folder preview */}
        <iframe
          src={previewUrl}
          title={file.title}
          onLoad={() => setLoaded(true)}
          className="h-[500px] w-full border-0 bg-background"
          allow="autoplay"
        />

        {/* Footer with download button */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/30 px-4 py-3">
          <span className="bn text-[11px] text-muted-foreground">
            ফাইলটি Google Drive-এ হোস্ট করা আছে — Download করতে নিচের বাটনে ক্লিক করুন।
          </span>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
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
  const [activeFile, setActiveFile] = useState<(typeof SAMPLE_FILES)[0] | null>(null);
  const [year, setYear] = useState<"1st" | "2nd">("1st");

  const currentFile = SAMPLE_FILES.find((f) => f.id === year) || SAMPLE_FILES[0];

  return (
    <section id="sample" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            <FileText className="h-3.5 w-3.5" />
            <span>Sample Notes</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            নোটস পছন্দ হবে কি না{" "}
            <span className="text-accent">আগেই দেখে নিন</span>
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

        {/* View File cards */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {SAMPLE_FILES.map((f) => (
            <div
              key={f.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-xl"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `${f.color}20`, color: f.color }}
              >
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">{f.title}</h3>
              <p className="bn mt-1 text-[12px] text-muted-foreground">{f.subtitle}</p>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setActiveFile(f)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View File
                </button>
                <a
                  href={`https://drive.google.com/drive/folders/${f.driveFolder}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
          স্যাম্পল ফাইল Google Drive-এ হোস্ট করা। View File ক্লিক করলে popup আসবে যেখানে
          আপনি সরাসরি ফাইল দেখতে ও ডাউনলোড করতে পারবেন।
        </p>
      </div>

      {/* In-page popup modal */}
      <SampleFileModal file={activeFile} onClose={() => setActiveFile(null)} />
    </section>
  );
}
