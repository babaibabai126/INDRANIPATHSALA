import type { Metadata } from "next";
import { Noto_Sans_Bengali, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Indrani Pathsala | D.Pharm Premium Suggestive Notes (Bengali + English)",
  description:
    "Indrani Pathsala - PCI ER-2020 Syllabus অনুযায়ী তৈরি D.Pharm 1st & 2nd Year Premium Suggestive Notes। বাংলা + English Translation, Chapter-wise Summary, VVI MCQ/SAQ/FIB সহ সম্পূর্ণ প্রস্তুতি।",
  keywords: [
    "Indrani Pathsala",
    "D.Pharm Notes",
    "Pharmacy Notes Bengali",
    "PCI ER-2020 Syllabus",
    "Diploma Pharmacy Notes",
    "Exit Exam Preparation",
    "Bengali Pharmacy Notes",
  ],
  authors: [{ name: "Indrani Pathsala" }],
  icons: {
    icon: "/images/logo.jpeg",
  },
  openGraph: {
    title: "Indrani Pathsala | D.Pharm Premium Suggestive Notes",
    description:
      "PCI ER-2020 Syllabus অনুযায়ী তৈরি D.Pharm 1st & 2nd Year Premium Suggestive Notes।",
    siteName: "Indrani Pathsala",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${notoBengali.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
