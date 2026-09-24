"use client";

import { useState } from "react";
import { X, ExternalLink, Loader2, CheckCircle2 } from "lucide-react";

/**
 * In-page payment modal that loads the Razorpay payment LINK
 * (rzp.io/...) inside an iframe popup, so the user stays on the same page.
 *
 * NOTE: Razorpay payment links render fine in an iframe.
 * This approach needs NO backend API key — works directly with the
 * payment link URL the user has already created.
 */

type Props = {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  courseLabel: string;
  amount: number;
  userEmail: string;
  userName: string;
  onPaid: () => void;
};

export function PaymentModal({
  isOpen,
  onClose,
  url,
  courseLabel,
  amount,
  userEmail,
  userName,
  onPaid,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  if (!isOpen) return null;

  // Append prefilled name/email as Razorpay payment link query params
  // (Razorpay supports `?prefill[name]=...&prefill[email]=...`)
  const finalUrl = new URL(url);
  if (userName) finalUrl.searchParams.set("prefill[name]", userName);
  if (userEmail) finalUrl.searchParams.set("prefill[email]", userEmail);
  finalUrl.searchParams.set("prefill[contact]", "");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Razorpay Payment
            </div>
            <div className="bn text-sm font-semibold text-foreground">{courseLabel}</div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Amount badge */}
        <div className="flex items-center justify-between bg-primary/10 px-4 py-3">
          <span className="bn text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Amount Payable
          </span>
          <span className="font-mono text-xl font-extrabold text-primary">
            ₹{amount.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Loading overlay */}
        {!loaded && (
          <div className="flex h-12 items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="bn">Payment gateway লোড হচ্ছে...</span>
          </div>
        )}

        {/* Iframe with the Razorpay payment link */}
        <iframe
          key={iframeKey}
          src={finalUrl.toString()}
          title="Razorpay Payment"
          onLoad={() => setLoaded(true)}
          className="h-[500px] w-full border-0 bg-background"
          allow="payment"
        />

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t border-border bg-muted/30 px-4 py-3 text-[11px] text-muted-foreground">
          <a
            href={finalUrl.toString()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            নতুন ট্যাবে খুলুন
          </a>
          <span className="bn">
            Payment সম্পূর্ণ করার পর এই উইন্ডো বন্ধ করুন
          </span>
          <button
            onClick={() => {
              onPaid();
              onClose();
            }}
            className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white transition hover:bg-emerald-700"
            title="Payment সম্পন্ন হলে এই বাটনে ক্লিক করুন"
          >
            <CheckCircle2 className="h-3 w-3" />
            আমি পরিশোধ করেছি
          </button>
        </div>
      </div>
    </div>
  );
}
