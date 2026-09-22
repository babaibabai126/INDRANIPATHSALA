"use client";

import { useState } from "react";
import { Sparkles, ShieldCheck, ChevronRight, Loader2 } from "lucide-react";

export function Hero() {
  const [form, setForm] = useState({ name: "", phone: "", course: "D.Pharm 1st Year" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-accent-purple/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
        {/* LEFT: copy */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="bn">Welcome to Indrani Pathsala</span>
          </div>

          <h1 className="bn mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            আপনিও কি একজন ডিপ্লোমা ফার্মেসি স্টুডেন্ট?
            <br />
            <span className="text-primary">তবে পরীক্ষায় ভালো</span>{" "}
            <span className="text-accent">রেজাল্টের জন্য</span>{" "}
            <span className="text-primary">আজই সংগ্রহ করুন</span>
            <br />
            <span className="bn text-foreground/90">আমাদের ইন্দ্রানী সাজেশন নোটসটি</span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent-blue bg-clip-text text-transparent">
              Bengali Translation সহ।
            </span>
          </h1>

          <p className="bn mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            গত বছরের পড়ানো হাজার এবং বিগত বছরের প্রশ্ন বিশ্লেষণ করে প্রস্তুত — সব কিছু আছে
            সমাধান করতে সময় থাকলে নিয়ে যান এবং আজই আমাদের ইন্দ্রানী সাজেশন নোটস সংগ্রহ করুন।
          </p>

          {/* trust row */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span className="bn">Secure Razorpay Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="bn">Instant Email PDF Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span className="bn">10 second পরেই PDF</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#pricing"
              className="glow-blue inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:opacity-90"
            >
              <span className="bn">Buy Now</span> <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href="#notes"
              className="bn inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted/50"
            >
              নোটস এ কী কী আছে?
            </a>
          </div>
        </div>

        {/* RIGHT: inquiry form */}
        <div className="mt-10 lg:col-span-5 lg:mt-0">
          <div className="relative rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-primary/10 sm:p-6">
            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                <span className="bn">এই ব্যাচের সিট সংখ্যা</span>
                <span className="text-accent">
                  412 / 500 <span className="bn">সিট বুকড</span>
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FF4500] to-[#facc15]"
                  style={{ width: "82%" }}
                />
              </div>
            </div>

            <div className="text-center">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Free Inquiry
              </div>
              <h3 className="bn mt-1 text-xl font-bold text-foreground">
                নোটস সম্পর্কে জানুন
              </h3>
              <p className="bn mt-1 text-xs text-muted-foreground">
                ফর্ম পূরণ করুন, আমরা আপনাকে কল করব
              </p>
            </div>

            {submitted ? (
              <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <ShieldCheck className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="bn text-sm font-semibold text-foreground">
                  ধন্যবাদ {form.name}! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                </div>
                <a
                  href="#pricing"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
                >
                  Buy Now <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <div>
                  <label className="bn mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Full Name (নাম)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="আপনার নাম লিখুন"
                    className="bn w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="bn mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Phone Number (মোবাইল)
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="98XXXXXXXX"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="bn mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Course (কোর্স)
                  </label>
                  <select
                    value={form.course}
                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                  >
                    <option>D.Pharm 1st Year</option>
                    <option>D.Pharm 2nd Year</option>
                    <option>Both (Combo Pack)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="glow-blue mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Request Call Back
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-[10px] text-muted-foreground">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  <span className="bn">আপনার তথ্য 100% নিরাপদ</span>
                </p>
              </form>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent-purple text-[10px] font-bold text-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="bn">412+ স্টুডেন্ট এই সপ্তাহে নোটস কিনেছে</span>
          </div>
        </div>
      </div>
    </section>
  );
}
