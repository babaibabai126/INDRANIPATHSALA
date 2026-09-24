"use client";

import { useState } from "react";
import { Download, X, FileText, Loader2, Eye, Folder } from "lucide-react";

/**
 * Sample Notes section — individual PDF files from Google Drive.
 *
 * User-provided Google Drive folder structure:
 *   Root: 11k3F1tS_r9rLGs-BcNnPLo_NAHy1hccS
 *     ├── 1ST year Bengali translation-1499  (folder: 1mr58yom0DYw2Fsdtiw6UOkofzFEcZGMg) — 5 PDFs
 *     ├── 1st year English version -999      (folder: 10bd7ltAYvgWereSRlbcvmpP62xg3w4tU) — 5 PDFs
 *     ├── 2ND year Bengali translation-1499  (folder: 1FD3WD7812KOTSjjSfen53vAvSDrrKKKz) — 6 PDFs
 *     └── 2nd year English version - 999     (folder: 16f_3fNfFToLnAES4mn8vtAAVdFFIQg4h) — 6 PDFs
 *
 * Each file gets its own "View File" popup (Google Drive iframe preview)
 * + "Download" button (Google Drive direct download URL).
 */

type File = {
  id: string;
  name: string;
  size: string;
};

type Folder = {
  id: string;
  title: string;
  badge: string;
  color: string;
  files: File[];
};

const FOLDERS: Folder[] = [
  {
    id: "1mr58yom0DYw2Fsdtiw6UOkofzFEcZGMg",
    title: "1st Year — Bengali Translation (Combo ₹1499)",
    badge: "1st Year · Bengali · Combo",
    color: "#5b8def",
    files: [
      { id: "15Ax-9mVzIWoX8onfsKQpOkQP1adjArOo", name: "Human Anatomy & Physiology — 1st Year (Bengali)", size: "94.5 MB" },
      { id: "1Blxyf7uM9QGK_-3l-hH-PuwXnPkXiII5", name: "Pharmaceutical Chemistry — 1st Year (Bengali)", size: "113.6 MB" },
      { id: "1Hol2QQMRZ0U0EtlFV_cmwqmAlWA8JfMF", name: "Pharmaceutics — 1st Year (Bengali)", size: "104.9 MB" },
      { id: "1SkKCQjAT8h_afrH_f7Svd5n7PECn0P_i", name: "Pharmacognosy — 1st Year (Bengali)", size: "40 MB" },
      { id: "1iYbKCN0QJN03aJNWEVhYN2U2XEtKVlRz", name: "Social Pharmacy — 1st Year (Bengali)", size: "77.7 MB" },
    ],
  },
  {
    id: "10bd7ltAYvgWereSRlbcvmpP62xg3w4tU",
    title: "1st Year — English Version (₹999)",
    badge: "1st Year · English",
    color: "#b27ddb",
    files: [
      { id: "1Nkoa24HRa5hkU1Z8KnZxh8AyrcVd1j5Y", name: "Human Anatomy & Physiology — 1st Year (English)", size: "116.1 MB" },
      { id: "1vB_zkoJ68hi9wimEgV3XAQlGYxqNSJh5", name: "Pharmaceutical Chemistry — 1st Year (English)", size: "143.7 MB" },
      { id: "1ecJ4nOJL1yq03YIaoxA7tBzEIVeggvtC", name: "Pharmaceutics — 1st Year (English)", size: "113 MB" },
      { id: "1yME6KBDwp9WWqtflNovnwy1Z-qnixg0c", name: "Pharmacognosy — 1st Year (English)", size: "49.6 MB" },
      { id: "1ZSrcrU-8LL6ErUv9j5OxKMeT1xyaiLKV", name: "Social Pharmacy — 1st Year (English)", size: "71.3 MB" },
    ],
  },
  {
    id: "1FD3WD7812KOTSjjSfen53vAvSDrrKKKz",
    title: "2nd Year — Bengali Translation (Combo ₹1499)",
    badge: "2nd Year · Bengali · Combo",
    color: "#f5c451",
    files: [
      { id: "10lqe0wQVmXthfy5KBWQIxL297G6J2Xpv", name: "Biochemistry & Clinical Pathology — 2nd Year (Bengali)", size: "61 MB" },
      { id: "12A1bIaiCIi_-DGpbtEsON-LbPZKzHeTZ", name: "Community Pharmacy & Management — 2nd Year (Bengali)", size: "42.9 MB" },
      { id: "1XP0LVfHPphmPFVWZwC8vlETx07idvboj", name: "Hospital & Clinical Pharmacy — 2nd Year (Bengali)", size: "47.8 MB" },
      { id: "1n4ZdmfjHipX3t7ATNe0I-Z4YmJa-NSit", name: "Pharmacology — 2nd Year (Bengali)", size: "63.9 MB" },
      { id: "1VdjGe6Attmla47MXjEAPR59n91GJZ_h6", name: "Pharmacotherapeutics — 2nd Year (Bengali)", size: "40.5 MB" },
      { id: "1Wom_8GE4rXXejMO_Qf2VRwxTMfqKS6ev", name: "Pharmacy Law & Ethics — 2nd Year (Bengali)", size: "61.5 MB" },
    ],
  },
  {
    id: "16f_3fNfFToLnAES4mn8vtAAVdFFIQg4h",
    title: "2nd Year — English Version (₹999)",
    badge: "2nd Year · English",
    color: "#f08a3e",
    files: [
      { id: "1YspqwTdmgWChj-IRi1czVXOsW3LxAPqT", name: "Biochemistry & Clinical Pharmacy — 2nd Year (English)", size: "94.1 MB" },
      { id: "1U7l-5rT9POpSropPsiqcusTLqAIRkvof", name: "Community Pharmacy & Management — 2nd Year (English)", size: "61.1 MB" },
      { id: "1y5RdpCyDzRdTMPst36fdt2KKr_LxuBRp", name: "Hospital & Clinical Pharmacy — 2nd Year (English)", size: "70 MB" },
      { id: "1Utc31yWJo9tM2XbpsJDL_hOxnqKCZGt4", name: "Pharmacology — 2nd Year (English)", size: "93.7 MB" },
      { id: "1f_9P1flFt9fQvt7LLd90t8WXJFMI8VtD", name: "Pharmacotherapeutics — 2nd Year (English)", size: "50 MB" },
      { id: "12RVOAgL95ozw7daxw9el-kVbfKbeiewp", name: "Pharmacy Law & Ethics — 2nd Year (English)", size: "43.4 MB" },
    ],
  },
];

type Props = {
  file: File | null;
  onClose: () => void;
};

export function SampleFileModal({ file, onClose }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (!file) return null;

  // Google Drive preview URL: https://drive.google.com/file/d/<id>/preview
  // Google Drive download URL: https://drive.google.com/uc?export=download&id=<id>
  const previewUrl = `https://drive.google.com/file/d/${file.id}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-foreground">{file.name}</div>
              <div className="text-[11px] text-muted-foreground">{file.size} · PDF</div>
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
            <span className="bn">Google Drive থেকে ফাইল লোড হচ্ছে...</span>
          </div>
        )}

        {/* Iframe with Google Drive file preview */}
        <iframe
          src={previewUrl}
          title={file.name}
          onLoad={() => setLoaded(true)}
          className="h-[500px] w-full border-0 bg-background"
          allow="autoplay"
        />

        {/* Footer with download button */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-muted/30 px-4 py-3">
          <span className="bn text-[11px] text-muted-foreground">
            ফাইলটি Google Drive-এ হোস্ট করা। Download করতে নিচের বাটনে ক্লিক করুন।
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
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [activeFolderId, setActiveFolderId] = useState<string>(FOLDERS[0].id);

  const currentFolder = FOLDERS.find((f) => f.id === activeFolderId) || FOLDERS[0];

  return (
    <section id="sample" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            <FileText className="h-3.5 w-3.5" />
            <span>Sample Notes</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            সম্পূর্ণ নোটস আলাদা ফাইলে —{" "}
            <span className="text-accent">আগেই দেখে নিন</span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            প্রতিটি subject আলাদা PDF ফাইলে আছে। View File ক্লিক করে preview দেখুন
            অথবা Download বাটনে ক্লিক করে সরাসরি ডাউনলোড করুন।
          </p>
        </div>

        {/* Folder selector */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {FOLDERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFolderId(f.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                activeFolderId === f.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "border border-border bg-card text-foreground hover:bg-muted/50"
              }`}
              style={activeFolderId === f.id ? { backgroundColor: f.color, color: "#fff" } : {}}
            >
              {f.badge}
            </button>
          ))}
        </div>

        {/* Folder title */}
        <div className="mt-8 text-center">
          <h3 className="bn text-xl font-bold text-foreground">
            {currentFolder.title}
          </h3>
          <p className="bn mt-1 text-xs text-muted-foreground">
            {currentFolder.files.length} টি subject · Google Drive-এ হোস্ট করা
          </p>
        </div>

        {/* File list */}
        <div className="mx-auto mt-6 max-w-4xl grid grid-cols-1 gap-4 sm:grid-cols-2">
          {currentFolder.files.map((file) => (
            <div
              key={file.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${currentFolder.color}20`, color: currentFolder.color }}
                >
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="bn text-[13px] font-semibold leading-snug text-foreground">
                    {file.name}
                  </h4>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="rounded-full bg-muted px-2 py-0.5 font-mono">PDF</span>
                    <span>{file.size}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setActiveFile(file)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View File
                </button>
                <a
                  href={`https://drive.google.com/uc?export=download&id=${file.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-muted/50"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Folder-level download */}
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-muted/30 p-5 text-center">
          <div className="flex items-center justify-center gap-2 text-accent">
            <Folder className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">সম্পূর্ণ ফোল্ডার</span>
          </div>
          <p className="bn mt-2 text-[13px] text-muted-foreground">
            {currentFolder.title} — সব subject একসাথে ডাউনলোড করুন।
          </p>
          <a
            href={`https://drive.google.com/drive/folders/${currentFolder.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary bg-card px-5 py-2 text-xs font-bold text-primary transition hover:bg-primary/10"
          >
            <Folder className="h-3.5 w-3.5" />
            Google Drive-এ ফোল্ডার খুলুন
          </a>
        </div>
      </div>

      {/* In-page popup modal */}
      <SampleFileModal file={activeFile} onClose={() => setActiveFile(null)} />
    </section>
  );
}
