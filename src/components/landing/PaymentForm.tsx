"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const COURSES = [
  { label: "1st Year — English Only — ₹1399", value: "1en", amount: 1399 },
  { label: "1st Year — Combo (English+Bengali) — ₹1899", value: "1combo", amount: 1899 },
  { label: "2nd Year — English Only — ₹1499", value: "2en", amount: 1499 },
  { label: "2nd Year — Combo (English+Bengali) — ₹1999", value: "2combo", amount: 1999 },
];

export function PaymentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    course: "1en",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // allow pricing cards to set course via URL hash
  useEffect(() => {
    if (typeof window === "undefined") return;
    const applyHash = () => {
      const m = window.location.hash.match(/course=([a-z0-9]+)/);
      if (m && COURSES.some((c) => c.value === m[1])) {
        setForm((f) => ({ ...f, course: m[1] }));
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const selectedCourse = COURSES.find((c) => c.value === form.course);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Payment failed");
      }
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="payment" className="relative py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-72 w-[600px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10">
          <div className="grid gap-0 lg:grid-cols-5">
            {/* LEFT — info panel */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/30 to-background p-6 sm:p-8 lg:col-span-2">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/15 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
                  <CreditCard className="h-3.5 w-3.5" />
                  PAYMENT DETAILS
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-foreground">
                  D.PHARM 1st / 2nd Year Premium Suggestive
                </h2>
                <p className="bn mt-2 text-[13px] leading-relaxed text-foreground/80">
                  <span className="font-semibold">Notes সম্পূর্ণ পাবেন Payment-এর পর।</span>
                </p>

                <ul className="mt-5 space-y-3 text-[12px] text-foreground/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                    <span className="bn">0% Preparation সহ Hero Result আপনার হাতে।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                    <span className="bn">Payment করার পর back বোতাম টাপবেন না।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                    <span className="bn">10 second পর আপনার Email check করুন।</span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-semibold">
                  <span className="rounded-md bg-muted px-2 py-1 text-primary">UPI</span>
                  <span className="rounded-md bg-muted px-2 py-1 text-primary">VISA</span>
                  <span className="rounded-md bg-muted px-2 py-1 text-primary">RUPAY</span>
                  <span className="rounded-md bg-muted px-2 py-1 text-primary">MasterCard</span>
                  <span className="rounded-md bg-muted px-2 py-1 text-primary">Net Banking</span>
                </div>

                <div className="mt-6 rounded-xl border border-border bg-muted/40 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Any Problem? Contact Us
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-foreground">
                    <a href="tel:+918293742022" className="inline-flex items-center gap-1.5 font-mono">
                      <Phone className="h-3 w-3 text-emerald-500" />
                      MOB-8293742022
                    </a>
                    <a
                      href="mailto:indranipathsala2026@gmail.com"
                      className="inline-flex items-center gap-1.5 break-all"
                    >
                      <Mail className="h-3 w-3 text-primary" />
                      <span className="text-[11px]">indranipathsala2026@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — payment form */}
            <div className="p-6 sm:p-8 lg:col-span-3">
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                Payment Details
              </h3>
              <p className="bn mt-1 text-[13px] text-muted-foreground">
                নিচের ফর্মটি পূরণ করুন ও PAY বাটনে click করুন।
              </p>

              {done ? (
                <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
                    <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                  </div>
                  <div className="bn text-lg font-bold text-foreground">
                    ধন্যবাদ {form.name}!
                  </div>
                  <div className="bn mt-1 text-[13px] text-foreground/80">
                    আপনার Payment সফল হয়েছে। আপনার Email ({form.email}) চেক করুন। PDF Download link সাথে সাথে পৌঁছে গেছে।
                  </div>
                  <button
                    onClick={() => {
                      setDone(false);
                      setForm({
                        name: "",
                        email: "",
                        mobile: "",
                        location: "",
                        course: "1en",
                      });
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted/50"
                  >
                    New Payment
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      icon={User}
                      label="Name"
                      labelBn="নাম"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      required
                    />
                    <Field
                      icon={Phone}
                      label="MOB No"
                      labelBn="মোবাইল নম্বর"
                      type="tel"
                      value={form.mobile}
                      onChange={(v) => setForm({ ...form, mobile: v })}
                      required
                    />
                  </div>

                  <Field
                    icon={Mail}
                    label="Email"
                    labelBn="ইমেইল (নোটস এখানে পাবেন)"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    required
                  />

                  <Field
                    icon={MapPin}
                    label="Location"
                    labelBn="ঠিকানা"
                    value={form.location}
                    onChange={(v) => setForm({ ...form, location: v })}
                    required
                  />

                  <div>
                    <label className="bn mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <CreditCard className="h-3 w-3" />
                      Select Notes Plan
                    </label>
                    <select
                      id="payment-course-select"
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                    >
                      {COURSES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-[12px] text-destructive">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        AMOUNT (UPI/VISA/RUPAY)
                      </div>
                      <div className="text-3xl font-extrabold text-foreground">
                        ₹{selectedCourse?.amount.toLocaleString("en-IN")}
                      </div>
                      <div className="bn text-[11px] text-muted-foreground">
                        incl. GST · instant email delivery
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="glow-blue flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent-blue px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:brightness-110 disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>PAY →</>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-500" />
                      100% Secure Payment
                    </span>
                    <span>·</span>
                    <span>Razorpay Protected</span>
                    <span>·</span>
                    <span className="bn">All sales are final</span>
                  </div>
                </form>
              )}

              <div className="mt-6 rounded-xl border border-border bg-muted/30 p-3 text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">Terms and Conditions:</span>{" "}
                <span className="bn">
                  All sales are Final once the Digital Product is dispatched to your Email.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  labelBn,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  icon: React.ElementType;
  label: string;
  labelBn: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="bn mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label} <span className="text-muted-foreground normal-case tracking-normal">({labelBn})</span>
        {required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
      />
    </div>
  );
}
