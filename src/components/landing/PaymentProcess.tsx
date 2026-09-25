"use client";

import { CreditCard, Mail, Printer, MousePointerClick } from "lucide-react";

/**
 * Payment করার পর কীভাবে notes টি পাবেন? — 3 items i–iii (verbatim from user).
 * Compact point-wise layout (single row, less vertical space).
 */

const STEPS = [
  {
    icon: CreditCard,
    title: "Razorpay মাধ্যমে Fill-up করুন",
    bn: "প্রথমে Razorpay মাধ্যমে Fill-up করে Secure Payment করুন।",
    color: "#5b8def",
  },
  {
    icon: Mail,
    title: "Email এ PDF Download link",
    bn: "Payment confirm হওয়ার সাথে সাথে আপনার Email এ PDF Download link যাবে।",
    color: "#f5c451",
  },
  {
    icon: Printer,
    title: "Download · Print · Study",
    bn: "Download করুন তারপর print করে Study শুরু করুন।",
    color: "#4ec9b0",
  },
];

export function PaymentProcess() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <MousePointerClick className="h-3.5 w-3.5" />
            <span>How It Works</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-accent sm:text-3xl lg:text-4xl">
            Payment করার পর কীভাবে notes টি পাবেন?
          </h2>
        </div>

        {/* Compact point-wise 3-column layout — less vertical space */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ background: `${s.color}20`, color: s.color }}
              >
                <s.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{ background: `${s.color}25`, color: s.color }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="bn text-[13px] font-bold leading-snug text-foreground">
                    {s.title}
                  </h3>
                </div>
                <p className="bn mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                  {s.bn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
