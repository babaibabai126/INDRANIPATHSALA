"use client";

import { CreditCard, Mail, Printer, MousePointerClick } from "lucide-react";

const STEPS = [
  {
    icon: CreditCard,
    title: "Razorpay Form Fill-up",
    bn: "Form পূরণ করে Secure Payment করুন।",
    desc: "নাম, ইমেইল, মোবাইল ও লোকেশন পূরণ করে Razorpay-এর মাধ্যমে সিকিউর পেমেন্ট করুন।",
    color: "#3B82F6",
  },
  {
    icon: Mail,
    title: "Email PDF Download Link",
    bn: "Payment confirm হলে সাথে সাথে Email-এ লিংক।",
    desc: "Payment সফল হলে আপনার Email-এ সাথে সাথেই PDF Download link চলে যাবে।",
    color: "#FACC15",
  },
  {
    icon: Printer,
    title: "Download · Print · Study",
    bn: "Download করুন, তারপর প্রিন্ট ও Study শুরু করুন।",
    desc: "PDF Download করুন, তারপর প্রিন্ট করে বা মোবাইলে পড়ে Study শুরু করুন।",
    color: "#2DD4BF",
  },
];

export function PaymentProcess() {
  return (
    <section className="relative border-y border-white/5 bg-[#0a1124]/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#3B82F6]">
            <MousePointerClick className="h-3.5 w-3.5" />
            <span>How It Works</span>
          </div>
          <h2 className="bn mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Payment করার পর কিভাবে{" "}
            <span className="text-yellow-300">নোটস পাবেন?</span>
          </h2>
          <p className="bn mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            মাত্র ৩টি সহজ ধাপ — পেমেন্ট থেকে শুরু করে আপনার Email-এ PDF পৌঁছানো পর্যন্ত।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={i} className="relative">
              <div className="h-full rounded-2xl border border-white/8 bg-[#0e1730]/80 p-6">
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
                <h3 className="mt-1 text-base font-bold text-white">{s.title}</h3>
                <p className="bn mt-1 text-[12px] font-medium text-slate-300">{s.bn}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-slate-400">{s.desc}</p>
              </div>

              {/* arrow */}
              {i < STEPS.length - 1 && (
                <div className="hidden -right-3 top-1/2 z-10 -translate-y-1/2 sm:absolute sm:block">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#0e1730] text-slate-400">
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
