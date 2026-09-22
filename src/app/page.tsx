import { AlertBar } from "@/components/landing/AlertBar";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { NotesFeatures } from "@/components/landing/NotesFeatures";
import { WhyNeeded } from "@/components/landing/WhyNeeded";
import { SampleNotes } from "@/components/landing/SampleNotes";
import { Benefits } from "@/components/landing/Benefits";
import { Reviews } from "@/components/landing/Reviews";
import { Pricing } from "@/components/landing/Pricing";
import { PaymentProcess } from "@/components/landing/PaymentProcess";
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
        <Hero />
        <NotesFeatures />
        <WhyNeeded />
        <SampleNotes />
        <Benefits />
        <Reviews />
        <Pricing />
        <PaymentProcess />
        <FAQ />
        <PaymentForm />
      </div>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
