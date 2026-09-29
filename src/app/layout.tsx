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
  title: "Indrani Pathsala | D.Pharm Premium Suggestive Notes & Recorded Classes (Bengali + English)",
  description:
    "Indrani Pathsala - PCI ER-2020 Syllabus অনুযায়ী তৈরি D.Pharm 1st & 2nd Year Premium Suggestive Notes এবং Recorded Classes। বাংলা + English Translation, Chapter-wise Summary, VVI MCQ/SAQ/FIB সহ সম্পূর্ণ প্রস্তুতি। Exit Exam Preparation, Bengali Pharmacy Notes পশ্চিমবঙ্গে।",
  keywords: [
    "Indrani Pathsala",
    "D.Pharm Notes",
    "D.Pharm Notes Bengali",
    "Pharmacy Notes Bengali",
    "PCI ER-2020 Syllabus",
    "Diploma Pharmacy Notes",
    "D.Pharm Exit Exam Preparation",
    "D.Pharm Recorded Classes",
    "Bengali Pharmacy Notes",
    "D.Pharm 1st Year Notes",
    "D.Pharm 2nd Year Notes",
    "Pharmacy Study Material West Bengal",
    "D.Pharm Suggestive Notes",
    "Pharmaceutics Notes Bengali",
    "Pharmacology Notes Bengali",
    "D.Pharm MCQ SAQ FIB",
    "Pharmacy Exam Preparation India",
    "RMP Notes Bengali",
    "Quack Pharmacy Notes",
    "D.Pharm Online Classes",
  ],
  authors: [{ name: "Indrani Pathsala" }],
  creator: "Indrani Pathsala",
  publisher: "Indrani Pathsala",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://indranipathsala.com/",
  },
  icons: {
    icon: "/images/logo.jpeg",
    apple: "/images/logo.jpeg",
  },
  openGraph: {
    title: "Indrani Pathsala | D.Pharm Premium Notes & Recorded Classes",
    description:
      "PCI ER-2020 Syllabus অনুযায়ী তৈরি D.Pharm 1st & 2nd Year Premium Suggestive Notes এবং Recorded Classes। বাংলা + English Translation সহ।",
    siteName: "Indrani Pathsala",
    type: "website",
    locale: "bn_IN",
    url: "https://indranipathsala.com/",
    images: [
      {
        url: "/images/notes-sample.png",
        width: 1317,
        height: 1600,
        alt: "Indrani Pathsala D.Pharm Premium Notes Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indrani Pathsala | D.Pharm Premium Notes & Recorded Classes",
    description:
      "PCI ER-2020 সিলেবাস অনুযায়ী D.Pharm Notes + Recorded Classes। বাংলা + English সহ।",
    images: ["/images/notes-sample.png"],
  },
  verification: {
    google: "google-site-verification=indranipathsala",
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Dark mode default (restored per user request)
  return (
    <html lang="bn" className="dark" suppressHydrationWarning>
      <body
        className={`${notoBengali.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
