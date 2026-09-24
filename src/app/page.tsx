import { AlertBar } from "@/components/landing/AlertBar";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { SampleNotes } from "@/components/landing/SampleNotes";
import { Benefits } from "@/components/landing/Benefits";
import { Reviews } from "@/components/landing/Reviews";
import { PaymentProcess } from "@/components/landing/PaymentProcess";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { PaymentForm } from "@/components/landing/PaymentForm";
import { Footer } from "@/components/landing/Footer";
import { FloatingButtons } from "@/components/landing/FloatingButtons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <AlertBar />
      <Header />

      <div className="flex-1">
        {/* Hero contains (per PDF placement):
            - BIG "Welcome to Indrani Pathsala" heading
            - Intro paragraph (verbatim)
            - "আমাদের নোট এ কী বিশেষত্ব আছে?" (7 items i–vii)
            - IMAGE
            - Middle paragraph (blockquote)
            - "এই নোটস টি কাদের প্রয়োজন?" (9 items i–ix) */}
        <Hero />

        {/* Per PDF placement: Sample Notes comes next */}
        <SampleNotes />

        {/* নোটস নিলে আপনার কী লাভ হবে? (10 items i–x) */}
        <Benefits />

        {/* Our Students Review */}
        <Reviews />

        {/* Payment করার পর কীভাবে notes টি পাবেন? (3 items i–iii) */}
        <PaymentProcess />

        {/* BUY NOW — 4 pricing cards */}
        <Pricing />

        {/* Student-দের সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্ন (FAQs) */}
        <FAQ />

        {/* Payment Details form */}
        <PaymentForm />
      </div>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
