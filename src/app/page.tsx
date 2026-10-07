"use client";

import { useState } from "react";
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
import { PaymentFormModal } from "@/components/landing/PaymentFormModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("1en");
  const [isRecordedClass, setIsRecordedClass] = useState(false);

  const openModal = (code: string, rc = false) => {
    setSelectedCourse(code);
    setIsRecordedClass(rc);
    setModalOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <AlertBar />
      <Header />

      <div className="flex-1">
        <Hero />
        <SampleNotes />
        <Benefits onBuy={openModal} />
        <Reviews />
        <PaymentProcess />
        <Pricing onBuy={openModal} />
        <FAQ />
      </div>

      <Footer />
      <FloatingButtons />

      {/* SINGLE shared PaymentFormModal at page level */}
      <PaymentFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedCourse={selectedCourse}
        isRecordedClass={isRecordedClass}
      />
    </main>
  );
}
