// Convert sample PDFs to PNG images (one per page) for carousel display.
// Run: bun run /home/z/my-project/scripts/pdf-to-images.ts
import { exec } from "child_process";
import { promisify } from "util";
import { mkdirSync, existsSync, readdirSync, unlinkSync } from "fs";
import { join } from "path";

const execAsync = promisify(exec);
const PDFS = [
  { name: "1st-year-english", path: "public/samples/1st-year-english-demo.pdf" },
  { name: "1st-year-bengali", path: "public/samples/1st-year-bengali-demo.pdf" },
  { name: "2nd-year-english", path: "public/samples/2nd-year-english-demo.pdf" },
  { name: "2nd-year-bengali", path: "public/samples/2nd-year-bengali-demo.pdf" },
];

const OUT_DIR = "public/samples/pages";

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  // Clear existing pages
  const existing = readdirSync(OUT_DIR).filter((f) => f.endsWith(".png"));
  for (const f of existing) unlinkSync(join(OUT_DIR, f));

  for (const pdf of PDFS) {
    if (!existsSync(pdf.path)) {
      console.log(`Skipping ${pdf.name} (file not found)`);
      continue;
    }
    const prefix = `${OUT_DIR}/${pdf.name}`;
    console.log(`Converting ${pdf.name}...`);
    try {
      // pdftoppm is part of poppler-utils
      // -r 100 → 100 DPI (good for web)
      // -png → output PNG format
      await execAsync(`pdftoppm -r 100 -png "${pdf.path}" "${prefix}"`);
      console.log(`  ✓ ${pdf.name} converted`);
    } catch (e) {
      console.error(`  ✗ Failed: ${pdf.name}`, e);
    }
  }

  const files = readdirSync(OUT_DIR).filter((f) => f.endsWith(".png"));
  console.log(`\n✓ Generated ${files.length} page images in ${OUT_DIR}/`);
  files.sort().forEach((f) => console.log(`  - ${f}`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
