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
  X,
} from "lucide-react";

/**
 * PaymentFormModal — popup modal with Payment Details form.
 *
 * Flow:
 *   1. User fills form (Name, MOB No, Email, Location, Course)
 *   2. Form submit → POST /api/purchase (saved as PENDING in Supabase)
 *   3. Redirect to Razorpay payment link (rzp.io/...) in SAME tab
 *   4. User completes payment on Razorpay page
 *   5. Razorpay redirects back to homepage (https://indranipathsala.com/)
 *
 * Razorpay payment links:
 *   ₹999 plans → https://rzp.io/rzp/GtZpWok
 *   ₹1499 plans → https://rzp.io/rzp/mBBPn9cU
 */

const COURSES = [
  { label: "1st Year — English Only — ₹999", value: "1en", amount: 999, razorpayUrl: "https://rzp.io/rzp/GtZpWok" },
  { label: "1st Year — Combo (English+Bengali) — ₹1499", value: "1combo", amount: 1499, razorpayUrl: "https://rzp.io/rzp/mBBPn9cU" },
  { label: "2nd Year — English Only — ₹999", value: "2en", amount: 999, razorpayUrl: "https://rzp.io/rzp/GtZpWok" },
  { label: "2nd Year — Combo (English+Bengali) — ₹1499", value: "2combo", amount: 1499, razorpayUrl: "https://rzp.io/rzp/mBBPn9cU" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
};

export function PaymentFormModal({ isOpen, onClose, preselectedCourse }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    course: "1en",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedCourse) {
      setForm((f) => ({ ...f, course: preselectedCourse }));
    }
  }, [preselectedCourse]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedCourse = COURSES.find((c) => c.value === form.course);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // 1. Save form data as PENDING in Supabase
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Submission failed");
      }

      const data = await res.json();
      const purchaseId = data.purchase?.id;

      // 2. Close the modal
      onClose();

      // 3. Redirect to Razorpay payment page in the SAME tab
      // After payment, Razorpay redirects back to /payment-success?purchase_id=xxx
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://indranipathsala.com";
      const returnUrl = purchaseId
        ? `${baseUrl}/payment-success?purchase_id=${purchaseId}`
        : `${baseUrl}/`;
      const razorpayBase = selectedCourse?.razorpayUrl || "https://rzp.io/rzp/GtZpWok";
      // Append return_url so Razorpay redirects back after payment
      const separator = razorpayBase.includes("?") ? "&" : "?";
      const razorpayUrl = `${razorpayBase}${separator}return_url=${encodeURIComponent(returnUrl)}`;
      window.location.href = razorpayUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setForm({ name: "", email: "", mobile: "", location: "", course: preselectedCourse || "1en" });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">Payment Details</span>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Info bar */}
        <div className="bg-primary/10 px-5 py-3 text-center">
          <p className="bn text-[11px] font-semibold text-foreground/80">
            D.PHARM 1st/2nd year Premium Suggestive Notes — সম্পূর্ণ প্যাকেজ Payment-এর পর।
          </p>
          <p className="bn mt-0.5 text-[10px] text-muted-foreground">
            0% Preparation থেকে Hero Result আপনার হাতে · Payment করার পর back বোতাম টিপবেন না · 10 second পর আপনার Email check করুন।
          </p>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-5">
          <form onSubmit={submit} className="space-y-3">
            {/* Name + MOB No (side by side) */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

            {/* Email */}
            <Field
              icon={Mail}
              label="Email"
              labelBn="ইমেইল (নোটস এখানে পাবেন)"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              required
            />

            {/* Location */}
            <Field
              icon={MapPin}
              label="Location"
              labelBn="ঠিকানা"
              value={form.location}
              onChange={(v) => setForm({ ...form, location: v })}
              required
            />

            {/* Course select */}
            <div>
              <label className="bn mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-foreground">
                <CreditCard className="h-3 w-3 text-primary" />
                Select Notes Plan
              </label>
              <select
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

            {/* Amount + PAY */}
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  AMOUNT
                </div>
                <div className="text-2xl font-extrabold text-foreground">
                  ₹{selectedCourse?.amount.toLocaleString("en-IN")}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="glow-amber flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent-orange px-6 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:brightness-110 disabled:opacity-60"
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

            <p className="bn text-center text-[11px] text-muted-foreground">
              PAY বাটনে ক্লিক করলে আপনি Razorpay payment page-এ যাবেন। Payment সম্পূর্ণ করার পর
              স্বয়ংক্রিয়ভাবে homepage-এ ফিরে আসবেন।
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                100% Secure
              </span>
              <span>·</span>
              <span>UPI / VISA / RUPAY</span>
              <span>·</span>
              <span className="bn">All sales are final</span>
            </div>

            {/* Contact */}
            <div className="mt-2 rounded-xl border border-border bg-muted/20 p-3 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Any Problem? Contact Us
              </div>
              <div className="mt-1.5 flex flex-wrap items-center justify-center gap-3 text-[11px] text-foreground">
                <a href="tel:+918293742022" className="inline-flex items-center gap-1 font-mono font-bold">
                  <Phone className="h-3 w-3 text-emerald-500" />
                  8293742022
                </a>
                <a
                  href="mailto:indranipathsala2026@gmail.com"
                  className="inline-flex items-center gap-1 break-all font-bold"
                >
                  <Mail className="h-3 w-3 text-primary" />
                  indranipathsala2026@gmail.com
                </a>
              </div>
            </div>

            {/* Terms */}
            <div className="text-center text-[10px] text-muted-foreground">
              <span className="font-semibold text-foreground">Terms:</span>{" "}
              <span className="bn">All sales are Final once the Digital Product is dispatched to your Email.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
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
      <label className="bn mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-foreground">
        <Icon className="h-3 w-3 text-primary" />
        {label} <span className="text-muted-foreground normal-case">({labelBn})</span>
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
