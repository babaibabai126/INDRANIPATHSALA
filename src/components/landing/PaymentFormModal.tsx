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
} from "lucide-react";

/**
 * PaymentFormModal — Razorpay Checkout JS SDK (in-page modal, no redirect).
 *
 * Flow:
 *   1. User fills form → save PENDING
 *   2. Call /api/razorpay/create-order → get order_id
 *   3. Open Razorpay checkout modal ON THE SAME PAGE (via JS SDK)
 *   4. User pays in the modal → modal closes → callback fires
 *   5. Call /api/razorpay/verify-payment → verify signature → PAID → email
 *   6. Show success message
 *
 * NO redirect, NO new tab, NO payment links.
 * Each payment creates a fresh order — no re-use issues.
 */

const COURSES = [
  { label: "1st Year — English Only — ₹999", value: "1en", amount: 999 },
  { label: "1st Year — Combo (English+Bengali) — ₹1499", value: "1combo", amount: 1499 },
  { label: "2nd Year — English Only — ₹999", value: "2en", amount: 999 },
  { label: "2nd Year — Combo (English+Bengali) — ₹1499", value: "2combo", amount: 1499 },
];

const RECORDED_CLASS_COURSES = [
  { label: "1st Year Recorded Class — ₹1", value: "rc1en", amount: 1 },
  { label: "2nd Year Recorded Class — ₹2", value: "rc2en", amount: 2 },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
  isRecordedClass?: boolean;
};

type ModalState = "form" | "processing" | "success" | "error";

// Load Razorpay checkout script
let razorpayScriptPromise: Promise<void> | null = null;
function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  const w = window as unknown as { Razorpay?: unknown };
  if (w.Razorpay) return Promise.resolve();
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => {
      razorpayScriptPromise = null;
      reject(new Error("Failed to load Razorpay SDK"));
    };
    document.body.appendChild(script);
  });
  return razorpayScriptPromise;
}

export function PaymentFormModal({ isOpen, onClose, preselectedCourse, isRecordedClass }: Props) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", location: "", course: "1en" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<ModalState>("form");

  const courses = isRecordedClass ? RECORDED_CLASS_COURSES : COURSES;
  const selectedCourse = courses.find((c) => c.value === form.course);

  useEffect(() => {
    if (isOpen) {
      setForm((f) => ({ ...f, course: preselectedCourse || "1en" }));
      setError(null);
      setState("form");
    }
  }, [isOpen, preselectedCourse]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setState("processing");

    try {
      // 1. Save form as PENDING
      const purchaseRes = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!purchaseRes.ok) {
        const j = await purchaseRes.json().catch(() => ({}));
        throw new Error(j.error || "Failed to save purchase");
      }
      const purchaseData = await purchaseRes.json();
      const purchaseId = purchaseData.purchase.id;

      // 2. Create Razorpay order
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseId }),
      });
      if (!orderRes.ok) {
        throw new Error("Failed to create payment order");
      }
      const order = await orderRes.json();

      // 3. Load Razorpay checkout script
      await loadRazorpayScript();

      // 4. Open Razorpay checkout modal (in-page, no redirect)
      const w = window as unknown as {
        Razorpay: new (opts: Record<string, unknown>) => {
          open: () => void;
          on: (event: string, cb: (data?: unknown) => void) => void;
        };
      };

      const razorpay = new w.Razorpay({
        key: order.keyId,
        amount: order.amount * 100, // paise
        currency: order.currency,
        name: order.name,
        description: order.description,
        order_id: order.orderId,
        prefill: order.prefill,
        notes: { purchase_id: purchaseId },
        theme: { color: "#c8901f" },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          // Payment successful — verify on server
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                purchaseId: purchaseId,
              }),
            });

            if (verifyRes.ok) {
              setState("success");
            } else {
              const err = await verifyRes.json().catch(() => ({}));
              setError(err.error || "Payment verification failed");
              setState("error");
            }
          } catch (err) {
            console.error("Verify error:", err);
            setError("Payment verification failed. Please contact us.");
            setState("error");
          }
        },
        modal: {
          ondismiss: () => {
            // User closed Razorpay modal without paying
            setState("form");
          },
        },
      });

      // Open the checkout modal
      razorpay.open();
    } catch (err: unknown) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setForm({ name: "", email: "", mobile: "", location: "", course: preselectedCourse || "1en" });
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

          {/* PROCESSING */}
          {state === "processing" && (
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
              </div>
              <div className="bn text-base font-bold text-foreground">Payment gateway খোলছে...</div>
              <p className="bn mt-2 text-[12px] text-muted-foreground">একটু অপেক্ষা করুন।</p>
            </div>
          )}

          {/* ERROR */}
          {state === "error" && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
                <X className="h-6 w-6 text-destructive" />
              </div>
              <div className="bn text-base font-bold text-destructive">সমস্যা হয়েছে</div>
              <p className="bn mt-2 text-[12px] text-muted-foreground">{error}</p>
              <div className="mt-4 flex flex-col gap-2">
                <button onClick={() => setState("form")} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90">
                  আবার চেষ্টা করুন
                </button>
                <a href="tel:+918293742022" className="bn inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground hover:bg-muted/50">
                  <Phone className="h-3.5 w-3.5" /> 8293742022
                </a>
              </div>
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
                  PAY ক্লিক করলে এই পেজেই Razorpay payment modal খুলবে। Payment সম্পূর্ণ হলে স্বয়ংক্রিয়ভাবে verify হবে এবং ইমেইল চলে যাবে।
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-500" />100% Secure</span>
                  <span>·</span><span>UPI / VISA / RUPAY</span>
                  <span>·</span><span className="bn">সব একই পেজে</span>
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
