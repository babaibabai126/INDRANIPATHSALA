"use client";

import { useEffect, useRef } from "react";

/**
 * Loads the Razorpay Checkout SDK script once, then resolves.
 */
let loadPromise: Promise<void> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loadPromise = null;
      reject(new Error(`Failed to load ${src}`));
    };
    document.body.appendChild(s);
  });
}

export function useRazorpay(): { open: typeof import("./types").openModal } {
  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      loadPromise = loadPromise || loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }
  }, []);

  const open = (opts: {
    key?: string;
    name: string;
    description: string;
    image?: string;
    amount: number;
    currency?: string;
    prefill?: { name: string; email: string; contact: string };
    notes?: Record<string, string>;
    onSuccess: (paymentId: string) => void;
    onDismiss?: () => void;
  }) => {
    loadPromise
      ?.then(() => {
        const w = window as unknown as {
          Razorpay?: new (opts: Record<string, unknown>) => {
            open: () => void;
            on: (event: string, cb: (e?: unknown) => void) => void;
          };
        };
        if (!w.Razorpay) {
          alert("Razorpay SDK not loaded yet. Please try again.");
          return;
        }
        const rzp = new w.Razorpay({
          // Using Razorpay payment link URL is the simpler approach.
          // For full in-page modal, we'd need a real key_id + order_id from backend.
          // Since user is using payment LINKS, we open the link in new tab
          // and show a modal that says "Complete payment in the popup".
          key: opts.key || "",
          amount: opts.amount * 100, // paise
          currency: opts.currency || "INR",
          name: opts.name,
          description: opts.description,
          image: opts.image,
          prefill: opts.prefill,
          notes: opts.notes,
          theme: { color: "#c8901f" },
          modal: {
            ondismiss: () => opts.onDismiss?.(),
          },
          handler: (response: { razorpay_payment_id: string }) => {
            opts.onSuccess(response.razorpay_payment_id);
          },
        });
        rzp.open();
      })
      .catch(() => {
        alert("Failed to load payment gateway. Please try again.");
      });
  };

  return { open };
}
