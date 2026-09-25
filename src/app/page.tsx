import { AlertBar } from "@/components/landing/AlertBar";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { SampleNotes } from "@/components/landing/SampleNotes";
import { Benefits } from "@/components/landing/Benefits";
import { Reviews } from "@/components/landing/Reviews";
import { PaymentProcess } from "@/components/landing/PaymentProcess";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { FloatingButtons } from "@/components/landing/FloatingButtons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <AlertBar />
      <Header />

      <div className="flex-1">
        <Hero />
        <SampleNotes />
        <Benefits />
        <Reviews />
        <PaymentProcess />
        <Pricing />
        <FAQ />
      </div>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
