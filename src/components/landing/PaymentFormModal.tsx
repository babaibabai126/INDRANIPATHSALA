"use client";

import { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Loader2,
  ShieldCheck,
  X,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

/**
 * PaymentFormModal — SECURE payment flow using Razorpay Webhook.
 *
 * Flow:
 *   1. User fills form (Name, MOB No, Email, Location, Course)
 *   2. Form submit → POST /api/purchase (saved as PENDING in Supabase)
 *   3. Razorpay payment link opens in NEW TAB
 *   4. Modal shows "Waiting for payment confirmation..." and auto-polls
 *   5. User pays in new tab → Razorpay sends webhook to /api/razorpay/webhook
 *   6. Webhook marks purchase as PAID → auto-sends email
 *   7. Modal detects status change → shows success
 *
 * SECURITY: User CANNOT mark as paid without actual payment.
 * Only the Razorpay webhook can change status from PENDING to PAID.
 */

const COURSES = [
  { label: "1st Year — English Only — ₹999", value: "1en", amount: 999, razorpayUrl: "https://rzp.io/rzp/GtZpWok" },
  { label: "1st Year — Combo (English+Bengali) — ₹1499", value: "1combo", amount: 1499, razorpayUrl: "https://rzp.io/rzp/mBBPn9cU" },
  { label: "2nd Year — English Only — ₹999", value: "2en", amount: 999, razorpayUrl: "https://rzp.io/rzp/GtZpWok" },
  { label: "2nd Year — Combo (English+Bengali) — ₹1499", value: "2combo", amount: 1499, razorpayUrl: "https://rzp.io/rzp/mBBPn9cU" },
];

// Recorded class courses (separate product)
const RECORDED_CLASS_COURSES = [
  { label: "1st Year Recorded Class — ₹1", value: "rc1en", amount: 1, razorpayUrl: "https://rzp.io/rzp/BrRtGSdu" },
  { label: "2nd Year Recorded Class — ₹2", value: "rc2en", amount: 2, razorpayUrl: "https://rzp.io/rzp/nww2OajL" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
  isRecordedClass?: boolean;
};

type ModalState = "form" | "waiting" | "success";

export function PaymentFormModal({ isOpen, onClose, preselectedCourse, isRecordedClass }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
    course: "1en",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<ModalState>("form");
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const [razorpayUrl, setRazorpayUrl] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const courses = isRecordedClass ? RECORDED_CLASS_COURSES : COURSES;
  const selectedCourse = courses.find((c) => c.value === form.course);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm((f) => ({ ...f, course: preselectedCourse || "1en" }));
      setPurchaseId(null);
      setRazorpayUrl(null);
      setError(null);
      setState("form");
    }
  }, [isOpen, preselectedCourse]);

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

  // Auto-poll for payment status when in "waiting" state
  useEffect(() => {
    if (state !== "waiting" || !purchaseId) return;

    const pollPayment = async () => {
      try {
        const res = await fetch(`/api/purchase?id=${purchaseId}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.purchase?.status === "PAID") {
            // Payment confirmed! Switch to success state.
            setState("success");
            if (pollRef.current) {
              clearInterval(pollRef.current);
              pollRef.current = null;
            }
          }
        }
      } catch (err) {
        console.error("Poll error:", err);
      }
    };

    // Poll every 3 seconds
    pollRef.current = setInterval(pollPayment, 3000);

    // Also poll immediately
    pollPayment();

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [state, purchaseId]);

  if (!isOpen) return null;

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
      setPurchaseId(data.purchase.id);
      setRazorpayUrl(selectedCourse?.razorpayUrl || "https://rzp.io/rzp/GtZpWok");

      // 2. Open Razorpay in NEW TAB
      window.open(selectedCourse?.razorpayUrl || "https://rzp.io/rzp/GtZpWok", "_blank", "noopener,noreferrer");

      // 3. Switch to "waiting" state — auto-poll will detect payment
      setState("waiting");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    setError(null);
    setForm({ name: "", email: "", mobile: "", location: "", course: preselectedCourse || "1en" });
    setPurchaseId(null);
    setRazorpayUrl(null);
    setState("form");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4"
      onClick={handleClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">
              {isRecordedClass ? "Recorded Class Access" : "Payment Details"}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* STATE: success — payment confirmed by webhook */}
          {state === "success" ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="bn text-base font-bold text-foreground">
                ধন্যবাদ {form.name}!
              </div>
              <p className="bn mt-2 text-[12px] leading-relaxed text-foreground/80">
                আপনার Payment সফলভাবে যাচাই হয়েছে এবং {isRecordedClass ? "Recorded Class লিংক" : "কোর্সের নোটস"} আপনার Email-এ পাঠানো হয়েছে।
              </p>
              <p className="bn mt-1 text-[11px] text-muted-foreground">
                দয়া করে আপনার Email ({form.email}) চেক করুন।
              </p>
              <p className="bn mt-2 text-[11px] text-muted-foreground">
                যেকোনো সমস্যায় কল করুন: <span className="font-mono font-bold">8293742022</span>
              </p>
              <button
                onClick={handleClose}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
              >
                বন্ধ করুন
              </button>
            </div>
          ) : state === "waiting" ? (
            /* STATE: waiting — payment link opened, auto-polling for confirmation */
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
              </div>
              <div className="bn text-base font-bold text-foreground">
                Payment যাচাই হচ্ছে...
              </div>
              <p className="bn mt-2 text-[12px] leading-relaxed text-muted-foreground">
                নতুন ট্যাবে Razorpay payment page খোলা হয়েছে। সেখানে payment সম্পূর্ণ করুন।
                Payment সফল হলে এখানে স্বয়ংক্রিয়ভাবে confirm হবে।
              </p>
              <p className="bn mt-1 text-[11px] text-muted-foreground">
                Amount: <span className="font-bold text-foreground">₹{selectedCourse?.amount}</span>
                {" · "}Email: <span className="font-bold">{form.email}</span>
              </p>

              <div className="mt-4">
                <a
                  href={razorpayUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Razorpay পেজ খুলুন
                </a>
              </div>

              <p className="bn mt-3 text-[10px] text-muted-foreground">
                <ShieldCheck className="inline h-3 w-3 text-emerald-500" />
                {" "}Payment স্বয়ংক্রিয়ভাবে verify হবে — কোনো ম্যানুয়াল confirm করতে হবে না।
              </p>
            </div>
          ) : (
            /* STATE: form — initial form fill */
            <>
              {/* Info bar */}
              <div className="bg-primary/10 px-4 py-3 text-center mb-4 rounded-xl">
                <p className="bn text-[11px] font-semibold text-foreground/80">
                  {isRecordedClass
                    ? "Recorded Class Access — Payment-এর পর লিংক আপনার Email-এ চলে যাবে।"
                    : "D.PHARM 1st/2nd year Premium Suggestive Notes — সম্পূর্ণ প্যাকেজ Payment-এর পর।"}
                </p>
                <p className="bn mt-0.5 text-[10px] text-muted-foreground">
                  0% Preparation থেকে Hero Result আপনার হাতে · Payment করার পর back বোতাম টিপবেন না
                </p>
              </div>

              <form onSubmit={submit} className="space-y-3">
                {/* Name + MOB No */}
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
                    {isRecordedClass ? "Select Recorded Class" : "Select Notes Plan"}
                  </label>
                  <select
                    value={form.course}
                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                  >
                    {courses.map((c) => (
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
                  PAY বাটনে ক্লিক করলে নতুন ট্যাবে Razorpay payment page খুলবে।
                  Payment সম্পূর্ণ করলে স্বয়ংক্রিয়ভাবে verify হবে এবং ইমেইল চলে যাবে।
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
                      href="mailto:info@indranipathsala.com"
                      className="inline-flex items-center gap-1 break-all font-bold"
                    >
                      <Mail className="h-3 w-3 text-primary" />
                      info@indranipathsala.com
                    </a>
                  </div>
                </div>

                {/* Terms */}
                <div className="text-center text-[10px] text-muted-foreground">
                  <span className="font-semibold text-foreground">Terms:</span>{" "}
                  <span className="bn">All sales are Final once the Digital Product is dispatched to your Email.</span>
                </div>
              </form>
            </>
          )}
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
