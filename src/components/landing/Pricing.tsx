"use client";

import { useState } from "react";
import { Crown, CheckCircle2 } from "lucide-react";
import { PaymentFormModal } from "./PaymentFormModal";

/**
 * BUY NOW — Pricing section.
 * No features list, no Drive links. Just badge + title + price + BUY NOW button.
 * BUY NOW click → opens PaymentFormModal popup.
 */

type Plan = {
  badge: string;
  badgeColor: string;
  year: string;
  title: string;
  titleBn: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  code: string;
};

const PLANS: Plan[] = [
  {
    badge: "1st Year",
    badgeColor: "#5b8def",
    year: "1st Year",
    title: "Only English Version",
    titleBn: "শুধু English Version",
    price: 999,
    originalPrice: 1499,
    code: "1en",
  },
  {
    badge: "1st Year · COMBO",
    badgeColor: "#f5c451",
    year: "1st Year",
    title: "English + Bengali Translation (Combo)",
    titleBn: "English + বাংলা Translation (Combo)",
    price: 1499,
    originalPrice: 1999,
    popular: true,
    code: "1combo",
  },
  {
    badge: "2nd Year",
    badgeColor: "#b27ddb",
    year: "2nd Year",
    title: "Only English Version",
    titleBn: "শুধু English Version",
    price: 999,
    originalPrice: 1499,
    code: "2en",
  },
  {
    badge: "2nd Year · COMBO",
    badgeColor: "#f08a3e",
    year: "2nd Year",
    title: "English + Bengali Translation (Combo)",
    titleBn: "English + বাংলা Translation (Combo)",
    price: 1499,
    originalPrice: 1999,
    code: "2combo",
  },
];

export function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>("1en");

  const openModal = (code: string) => {
    setSelectedCourse(code);
    setModalOpen(true);
  };

  return (
    <section id="pricing" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            <Crown className="h-3.5 w-3.5" />
            <span>BUY NOW</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-accent sm:text-3xl lg:text-4xl">
            D.Pharm 1st / 2nd Year Premium Suggestive Notes
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 1st Year group */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="bn inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-primary">
                1st Year Premium Suggestive Notes
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PLANS.filter((p) => p.year === "1st Year").map((plan, i) => (
                <PlanCard key={i} plan={plan} onBuy={openModal} />
              ))}
            </div>
          </div>

          {/* 2nd Year group */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="bn inline-flex items-center gap-1.5 rounded-full bg-accent-purple/15 px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-accent-purple">
                2nd Year Premium Suggestive Notes
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PLANS.filter((p) => p.year === "2nd Year").map((plan, i) => (
                <PlanCard key={i} plan={plan} onBuy={openModal} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment form modal */}
      <PaymentFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedCourse={selectedCourse}
      />
    </section>
  );
}

function PlanCard({ plan, onBuy }: { plan: Plan; onBuy: (code: string) => void }) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border bg-card p-5 transition hover:-translate-y-1 ${
        plan.popular
          ? "border-accent/50 shadow-2xl shadow-accent/10"
          : "border-border hover:border-primary/40"
      }`}
    >
      {plan.popular && (
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-accent-foreground">
          Popular
        </div>
      )}

      <div
        className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
        style={{
          background: `${plan.badgeColor}25`,
          color: plan.badgeColor,
        }}
      >
        {plan.badge}
      </div>

      <h3 className="mt-3 text-base font-bold text-foreground">{plan.title}</h3>
      <p className="bn text-[11px] text-muted-foreground">{plan.titleBn}</p>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-2xl font-extrabold text-foreground">₹{plan.price}</span>
        {plan.originalPrice && (
          <span className="text-sm text-muted-foreground line-through">
            ₹{plan.originalPrice}
          </span>
        )}
        <span className="text-[10px] text-muted-foreground">/-</span>
      </div>

      <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="h-3 w-3" />
        <span className="bn">Instant Email PDF Delivery</span>
      </div>

      <button
        onClick={() => onBuy(plan.code)}
        className={`mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
          plan.popular
            ? "bg-accent text-accent-foreground hover:opacity-90"
            : "bg-primary text-primary-foreground hover:opacity-90"
        }`}
      >
        BUY NOW →
      </button>
    </div>
  );
}
