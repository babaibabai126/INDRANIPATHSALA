"use client";

import { CreditCard, Mail, Printer, MousePointerClick } from "lucide-react";

const STEPS = [
  {
    icon: CreditCard,
    title: "Razorpay Form Fill-up",
    bn: "প্রথমে Razorpay মাধ্যমে Fill-up করে Secure Payment করুন।",
    desc: "নাম, ইমেইল, মোবাইল ও লোকেশন পূরণ করে Razorpay-এর মাধ্যমে সিকিউর পেমেন্ট করুন।",
    color: "#3B82F6",
  },
  {
    icon: Mail,
    title: "Email এ PDF Download Link",
    bn: "Payment confirm হওয়ার সাথে সাথে আপনার Email এ PDF Download link যাবে।",
    desc: "Payment সফল হলে আপনার Email-এ সাথে সাথেই PDF Download link চলে যাবে।",
    color: "#FACC15",
  },
  {
    icon: Printer,
    title: "Download · Print · Study",
    bn: "Download করুন, তারপর প্রিন্ট করে Study শুরু করুন।",
    desc: "PDF Download করুন, তারপর প্রিন্ট করে বা মোবাইলে পড়ে Study শুরু করুন।",
    color: "#2DD4BF",
  },
];

export function PaymentProcess() {
  return (
    <section className="relative border-y border-border bg-muted/20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <MousePointerClick className="h-3.5 w-3.5" />
            <span>How It Works</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Payment করার পর কিভাবে{" "}
            <span className="text-accent">নোটস পাবেন?</span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            মাত্র ৩টি সহজ ধাপ — পেমেন্ট থেকে শুরু করে আপনার Email-এ PDF পৌঁছানো পর্যন্ত।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={i} className="relative">
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${s.color}20`, color: s.color }}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <div
                  className="mt-4 text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: s.color }}
                >
                  Step {i + 1}
                </div>
                <h3 className="mt-1 text-base font-bold text-foreground">{s.title}</h3>
                <p className="bn mt-1 text-[12px] font-medium text-foreground/80">{s.bn}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>

              {i < STEPS.length - 1 && (
                <div className="hidden -right-3 top-1/2 z-10 -translate-y-1/2 sm:absolute sm:block">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8m0 0L7 3m3 3L7 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
