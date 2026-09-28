"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { FileText, Eye, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Sample Notes section — 2 cards (toggle by year).
 *
 * User spec:
 *   - Remove Download buttons — only carousel view (always open)
 *   - "View File" button removed — carousel is always open/visible
 *   - Carousel format: page images with prev/next navigation
 *   - Sample PDFs hosted locally, converted to PNG page images
 *   - Year toggle: "1st year – view sample" / "2nd year – view sample"
 *   - Each year has 2 sub-cards: English + Bengali (carousel for each)
 */

// Page image paths
const PAGES_1ST_EN = Array.from({ length: 10 }, (_, i) => `/samples/pages/1st-year-english-${String(i + 1).padStart(2, "0")}.png`);
const PAGES_1ST_BN = Array.from({ length: 8 }, (_, i) => `/samples/pages/1st-year-bengali-${String(i + 1).padStart(2, "0")}.png`);
const PAGES_2ND_EN = Array.from({ length: 18 }, (_, i) => `/samples/pages/2nd-year-english-${String(i + 1).padStart(2, "0")}.png`);
const PAGES_2ND_BN = Array.from({ length: 13 }, (_, i) => `/samples/pages/2nd-year-bengali-${String(i + 1).padStart(2, "0")}.png`);

const SAMPLE_FILES = [
  {
    year: "1st" as const,
    title: "1st Year Sample File",
    englishPages: PAGES_1ST_EN,
    bengaliPages: PAGES_1ST_BN,
  },
  {
    year: "2nd" as const,
    title: "2nd Year Sample File",
    englishPages: PAGES_2ND_EN,
    bengaliPages: PAGES_2ND_BN,
  },
];

function InlineCarousel({
  pages,
  title,
  accentColor,
}: {
  pages: string[];
  title: string;
  accentColor: string;
}) {
  const [current, setCurrent] = useState(0);
  const mountedRef = useRef(false);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c === 0 ? pages.length - 1 : c - 1));
  }, [pages.length]);

  const goNext = useCallback(() => {
    setCurrent((c) => (c === pages.length - 1 ? 0 : c + 1));
  }, [pages.length]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-muted/20">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: `${accentColor}25`, color: accentColor }}
          >
            {title}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground">
          Page {current + 1} / {pages.length}
        </span>
      </div>

      {/* Carousel */}
      <div className="relative flex h-[300px] items-center justify-center bg-black/10 sm:h-[400px]">
        {/* Prev */}
        <button
          onClick={goPrev}
          className="absolute left-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 text-foreground backdrop-blur transition hover:bg-muted sm:left-2 sm:h-9 sm:w-9"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Current page */}
        <div className="relative h-full w-full">
          <Image
            src={pages[current]}
            alt={`${title} — Page ${current + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-contain p-3 sm:p-4"
            priority
          />
        </div>

        {/* Next */}
        <button
          onClick={goNext}
          className="absolute right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 text-foreground backdrop-blur transition hover:bg-muted sm:right-2 sm:h-9 sm:w-9"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-1.5 overflow-x-auto p-2 pb-3">
        {pages.map((page, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative h-12 w-9 flex-shrink-0 overflow-hidden rounded border-2 transition ${
              i === current
                ? "border-primary ring-1 ring-primary/30"
                : "border-border hover:border-primary/40"
            }`}
          >
            <Image
              src={page}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="36px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function SampleNotes() {
  const [year, setYear] = useState<"1st" | "2nd">("1st");
  const current = SAMPLE_FILES.find((f) => f.year === year) || SAMPLE_FILES[0];

  return (
    <section id="sample" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-accent sm:text-4xl lg:text-5xl">
            Sample Notes
          </h2>
        </div>

        {/* Year toggle */}
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

        {/* Carousels — always open (no popup, no View File button)
            Mobile: stacked vertically. Desktop: side by side */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-6 grid-cols-1 sm:grid-cols-2">
          {/* English Version */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                {year === "1st" ? "1st Year English Version Sample" : "2nd Year English Version Sample"}
              </h3>
            </div>
            <InlineCarousel
              pages={current.englishPages}
              title="English Version"
              accentColor="#5b8def"
            />
          </div>

          {/* Bengali Translation */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-bold text-foreground">
                {year === "1st" ? "1st Year Bengali Translation Sample" : "2nd Year Bengali Translation Sample"}
              </h3>
            </div>
            <InlineCarousel
              pages={current.bengaliPages}
              title="Bengali Translation"
              accentColor="#f5c451"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
