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
  ExternalLink,
  AlertCircle,
} from "lucide-react";

/**
 * PaymentFormModal — SECURE payment flow with Razorpay webhook + polling.
 *
 * Flow:
 *   1. User fills form → save PENDING → open Razorpay in new tab
 *   2. Modal shows "waiting" state, polls /api/razorpay/check-payment every 3s
 *   3. User pays on Razorpay → Razorpay webhook marks PAID → auto email
 *   4. Polling detects PAID → shows success
 *   5. After 5 min timeout → shows "still waiting" with contact option
 *
 * Also: when user returns to the tab (window focus), immediately poll.
 * Also: stops polling when modal closes or success/timeout reached.
 */

const COURSES = [
  { label: "1st Year — English Only — ₹999", value: "1en", amount: 999, razorpayUrl: "https://rzp.io/rzp/GtZpWok" },
  { label: "1st Year — Combo (English+Bengali) — ₹1499", value: "1combo", amount: 1499, razorpayUrl: "https://rzp.io/rzp/mBBPn9cU" },
  { label: "2nd Year — English Only — ₹999", value: "2en", amount: 999, razorpayUrl: "https://rzp.io/rzp/GtZpWok" },
  { label: "2nd Year — Combo (English+Bengali) — ₹1499", value: "2combo", amount: 1499, razorpayUrl: "https://rzp.io/rzp/mBBPn9cU" },
];

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

type ModalState = "form" | "waiting" | "success" | "timeout";

export function PaymentFormModal({ isOpen, onClose, preselectedCourse, isRecordedClass }: Props) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", location: "", course: "1en" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<ModalState>("form");
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const [razorpayUrl, setRazorpayUrl] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      setElapsed(0);
    }
  }, [isOpen, preselectedCourse]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Stop all intervals when modal closes
  useEffect(() => {
    if (!isOpen) {
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    }
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Poll for payment status
  useEffect(() => {
    if (state !== "waiting" || !purchaseId) return;

    const poll = async () => {
      try {
        const res = await fetch(`/api/razorpay/check-payment?purchase_id=${purchaseId}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.isPaid) {
            stopPolling();
            setState("success");
            return;
          }
          if (data.isTimeout) {
            stopPolling();
            setState("timeout");
            return;
          }
        }
      } catch (err) {
        // Network error — keep polling
      }
    };

    // Elapsed timer (updates every 1s for UI)
    timerRef.current = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);

    // Poll every 3 seconds
    pollRef.current = setInterval(poll, 3000);
    poll(); // immediate poll

    return () => {
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };
  }, [state, purchaseId]);

  // Also poll when window regains focus (user returns from Razorpay tab)
  useEffect(() => {
    if (state !== "waiting" || !purchaseId) return;

    const onFocus = () => {
      // Immediate poll on focus
      fetch(`/api/razorpay/check-payment?purchase_id=${purchaseId}`, { cache: "no-store" })
        .then((r) => r.json())
        .then((data) => {
          if (data.isPaid) {
            stopPolling();
            setState("success");
          }
        })
        .catch(() => {});
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [state, purchaseId]);

  const stopPolling = () => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  if (!isOpen) return null;

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
        throw new Error(j.error || "Submission failed");
      }
      const data = await res.json();
      setPurchaseId(data.purchase.id);
      setRazorpayUrl(selectedCourse?.razorpayUrl || "https://rzp.io/rzp/GtZpWok");

      // Open Razorpay in new tab
      window.open(selectedCourse?.razorpayUrl || "https://rzp.io/rzp/GtZpWok", "_blank", "noopener,noreferrer");
      setState("waiting");
      setElapsed(0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    stopPolling();
    setError(null);
    setForm({ name: "", email: "", mobile: "", location: "", course: preselectedCourse || "1en" });
    setPurchaseId(null);
    setRazorpayUrl(null);
    setState("form");
    setElapsed(0);
    onClose();
  };

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

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
          {/* SUCCESS */}
          {state === "success" && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="bn text-base font-bold text-foreground">ধন্যবাদ {form.name}!</div>
              <p className="bn mt-2 text-[12px] leading-relaxed text-foreground/80">
                আপনার Payment সফলভাবে যাচাই হয়েছে এবং {isRecordedClass ? "Recorded Class লিংক" : "কোর্সের নোটস"} আপনার Email-এ পাঠানো হয়েছে।
              </p>
              <p className="bn mt-1 text-[11px] text-muted-foreground">দয়া করে আপনার Email ({form.email}) চেক করুন।</p>
              <p className="bn mt-2 text-[11px] text-muted-foreground">যেকোনো সমস্যায় কল করুন: <span className="font-mono font-bold">8293742022</span></p>
              <button onClick={handleClose} className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90">
                বন্ধ করুন
              </button>
            </div>
          )}

          {/* TIMEOUT */}
          {state === "timeout" && (
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <AlertCircle className="h-6 w-6 text-accent" />
              </div>
              <div className="bn text-base font-bold text-foreground">Payment যাচাই সময় শেষ হয়েছে</div>
              <p className="bn mt-2 text-[12px] leading-relaxed text-muted-foreground">
                আপনার Payment সম্পূর্ণ হলে স্বয়ংক্রিয়ভাবে ইমেইল চলে যাবে। যদি ইমেইল না পান তবে আমাদের সাথে যোগাযোগ করুন।
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <a href="tel:+918293742022" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90">
                  <Phone className="h-3.5 w-3.5" /> 8293742022
                </a>
                <a href="mailto:info@indranipathsala.com" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground hover:bg-muted/50">
                  <Mail className="h-3.5 w-3.5" /> ইমেইল করুন
                </a>
                <button onClick={() => { setState("form"); setPurchaseId(null); setElapsed(0); }} className="bn mt-2 text-xs text-primary hover:underline">
                  আবার চেষ্টা করুন
                </button>
              </div>
            </div>
          )}

          {/* WAITING */}
          {state === "waiting" && (
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
              </div>
              <div className="bn text-base font-bold text-foreground">Payment যাচাই হচ্ছে...</div>
              <p className="bn mt-2 text-[12px] leading-relaxed text-muted-foreground">
                নতুন ট্যাবে Razorpay-এ payment সম্পূর্ণ করুন। Payment সফল হলে এখানে স্বয়ংক্রিয়ভাবে confirm হবে।
              </p>
              <p className="mt-2 font-mono text-sm text-foreground/60">
                ⏱ {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </p>
              <div className="mt-4">
                <a href={razorpayUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90">
                  <ExternalLink className="h-3.5 w-3.5" /> Razorpay পেজ খুলুন
                </a>
              </div>
              <p className="bn mt-3 text-[10px] text-muted-foreground">
                <ShieldCheck className="inline h-3 w-3 text-emerald-500" /> Payment স্বয়ংক্রিয়ভাবে verify হবে — কিছু করতে হবে না।
              </p>
              <button onClick={handleClose} className="bn mt-3 text-[10px] text-muted-foreground hover:text-foreground">
                বন্ধ করুন (payment হলে ইমেইল স্বয়ংক্রিয়ভাবে যাবে)
              </button>
            </div>
          )}

          {/* FORM */}
          {state === "form" && (
            <>
              <div className="bg-primary/10 px-4 py-3 text-center mb-4 rounded-xl">
                <p className="bn text-[11px] font-semibold text-foreground/80">
                  {isRecordedClass ? "Recorded Class Access — Payment-এর পর লিংক আপনার Email-এ চলে যাবে।" : "D.PHARM 1st/2nd year Premium Suggestive Notes — সম্পূর্ণ প্যাকেজ Payment-এর পর।"}
                </p>
              </div>

              <form onSubmit={submit} className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field icon={User} label="Name" labelBn="নাম" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                  <Field icon={Phone} label="MOB No" labelBn="মোবাইল নম্বর" type="tel" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} required />
                </div>
                <Field icon={Mail} label="Email" labelBn="ইমেইল (নোটস এখানে পাবেন)" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                <Field icon={MapPin} label="Location" labelBn="ঠিকানা" value={form.location} onChange={(v) => setForm({ ...form, location: v })} required />

                <div>
                  <label className="bn mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-foreground">
                    <CreditCard className="h-3 w-3 text-primary" />
                    {isRecordedClass ? "Select Recorded Class" : "Select Notes Plan"}
                  </label>
                  <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40">
                    {courses.map((c) => (<option key={c.value} value={c.value}>{c.label}</option>))}
                  </select>
                </div>

                {error && (<div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-[12px] text-destructive">{error}</div>)}

                <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">AMOUNT</div>
                    <div className="text-2xl font-extrabold text-foreground">₹{selectedCourse?.amount.toLocaleString("en-IN")}</div>
                  </div>
                  <button type="submit" disabled={loading}
                    className="glow-amber flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent-orange px-6 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:brightness-110 disabled:opacity-60">
                    {loading ? (<><Loader2 className="h-4 w-4 animate-spin" />Processing...</>) : (<>PAY →</>)}
                  </button>
                </div>

                <p className="bn text-center text-[11px] text-muted-foreground">
                  PAY ক্লিক করলে নতুন ট্যাবে Razorpay খুলবে। Payment সম্পূর্ণ করলে স্বয়ংক্রিয়ভাবে verify হবে এবং ইমেইল চলে যাবে।
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-500" />100% Secure</span>
                  <span>·</span><span>UPI / VISA / RUPAY</span>
                  <span>·</span><span className="bn">All sales are final</span>
                </div>

                <div className="mt-2 rounded-xl border border-border bg-muted/20 p-3 text-center">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Any Problem? Contact Us</div>
                  <div className="mt-1.5 flex flex-wrap items-center justify-center gap-3 text-[11px] text-foreground">
                    <a href="tel:+918293742022" className="inline-flex items-center gap-1 font-mono font-bold"><Phone className="h-3 w-3 text-emerald-500" />8293742022</a>
                    <a href="mailto:info@indranipathsala.com" className="inline-flex items-center gap-1 break-all font-bold"><Mail className="h-3 w-3 text-primary" />info@indranipathsala.com</a>
                  </div>
                </div>

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

function Field({ icon: Icon, label, labelBn, value, onChange, type = "text", required = false }: {
  icon: React.ElementType; label: string; labelBn: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="bn mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-foreground">
        <Icon className="h-3 w-3 text-primary" />
        {label} <span className="text-muted-foreground normal-case">({labelBn})</span>
        {required && <span className="text-destructive">*</span>}
      </label>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
      />
    </div>
  );
}
