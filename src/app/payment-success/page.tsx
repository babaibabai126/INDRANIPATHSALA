"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Loader2, Download, Mail, Phone, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { FloatingButtons } from "@/components/landing/FloatingButtons";

/**
 * Payment Success page.
 *
 * User is redirected here after completing payment on Razorpay.
 * URL: /payment-success?purchase_id=xxx
 *
 * This page:
 *   1. Calls /api/send-course-email to send course PDFs to user's email
 *   2. Shows success message with download link
 *   3. Provides link back to homepage
 */

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const purchaseId = searchParams.get("purchase_id");

  const [status, setStatus] = useState<"loading" | "success" | "error" | "no-id">("loading");
  const [courseLabel, setCourseLabel] = useState("");
  const [driveUrl, setDriveUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!purchaseId) {
      const t = setTimeout(() => setStatus("no-id"), 0);
      return () => clearTimeout(t);
    }

    const sendEmail = async () => {
      try {
        const res = await fetch("/api/send-course-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ purchaseId }),
        });

        const data = await res.json();

        if (res.ok) {
          const t = setTimeout(() => {
            setStatus("success");
            if (data.courseLabel) setCourseLabel(data.courseLabel);
            if (data.driveUrl) setDriveUrl(data.driveUrl);
            if (data.userName) setUserName(data.userName);
            if (data.email) setEmail(data.email);
          }, 0);
          return () => clearTimeout(t);
        } else {
          // Even if email fails, show success (payment was made)
          const t = setTimeout(() => {
            setStatus("success");
            if (data.driveUrl) setDriveUrl(data.driveUrl);
            if (data.courseLabel) setCourseLabel(data.courseLabel);
          }, 0);
          return () => clearTimeout(t);
        }
      } catch (err) {
        console.error(err);
        const t = setTimeout(() => setStatus("error"), 0);
        return () => clearTimeout(t);
      }
    };

    sendEmail();
  }, [purchaseId]);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl ring-2 ring-primary/30">
              <Image src="/images/logo.jpeg" alt="Logo" fill sizes="40px" className="object-cover" />
            </div>
            <div>
              <div className="text-base font-bold text-foreground">Indrani Pathsala</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                YOUR STUDY PARTNER FOR SUCCESS
              </div>
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground/90 transition hover:bg-muted/50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="bn">হোমপেজ</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          {status === "loading" && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <h1 className="bn mt-4 text-xl font-bold text-foreground">
                আপনার পেমেন্ট যাচাই হচ্ছে...
              </h1>
              <p className="bn mt-2 text-sm text-muted-foreground">
                একটু অপেক্ষা করুন, আমরা আপনার কোর্সের নোটস ইমেইল করছি।
              </p>
            </div>
          )}

          {status === "no-id" && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
              <h1 className="bn text-xl font-bold text-foreground">
                কিছু ভুল হয়েছে
              </h1>
              <p className="bn mt-2 text-sm text-muted-foreground">
                Payment information পাওয়া যায়নি। অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <a href="tel:+918293742022" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground">
                  <Phone className="h-3.5 w-3.5" /> 8293742022
                </a>
                <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground hover:bg-muted/50">
                  <ArrowLeft className="h-3.5 w-3.5" /> হোমপেজে যান
                </Link>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-8 text-center shadow-xl">
              <h1 className="bn text-xl font-bold text-destructive">
                ইমেইল পাঠাতে সমস্যা হয়েছে
              </h1>
              <p className="bn mt-2 text-sm text-muted-foreground">
                আপনার পেমেন্ট সফল হয়েছে কিন্তু ইমেইল পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <a href="tel:+918293742022" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground">
                  <Phone className="h-3.5 w-3.5" /> 8293742022
                </a>
                <a href="mailto:indranipathsala2026@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground hover:bg-muted/50">
                  <Mail className="h-3.5 w-3.5" /> ইমেইল করুন
                </a>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="rounded-2xl border border-emerald-500/30 bg-card p-8 text-center shadow-xl">
              {/* Success icon */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>

              <h1 className="bn text-2xl font-bold text-foreground">
                ধন্যবাদ{userName ? ` ${userName}` : ""}! 🎉
              </h1>
              <p className="bn mt-3 text-sm leading-relaxed text-muted-foreground">
                আপনার পেমেন্ট সফল হয়েছে এবং আপনার কোর্সের সম্পূর্ণ নোটস
                {email ? ` ${email}` : " আপনার ইমেইলে"} পাঠানো হয়েছে।
              </p>

              {courseLabel && (
                <div className="mt-4 rounded-xl border border-border bg-muted/30 p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    আপনার কোর্স
                  </div>
                  <div className="bn mt-1 text-sm font-bold text-foreground">
                    {courseLabel}
                  </div>
                </div>
              )}

              {/* Download link */}
              {driveUrl && (
                <a
                  href={driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-amber mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:opacity-90"
                >
                  <Download className="h-4 w-4" />
                  নোটস ডাউনলোড করুন
                </a>
              )}

              {/* Contact */}
              <div className="mt-6 border-t border-border pt-4">
                <p className="bn text-[11px] text-muted-foreground">
                  ইমেইল না পেলে যোগাযোগ করুন:
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                  <a href="tel:+918293742022" className="inline-flex items-center gap-1 text-xs font-bold text-foreground">
                    <Phone className="h-3 w-3 text-emerald-500" /> 8293742022
                  </a>
                  <a href="mailto:indranipathsala2026@gmail.com" className="inline-flex items-center gap-1 text-xs font-bold text-foreground">
                    <Mail className="h-3 w-3 text-primary" /> indranipathsala2026@gmail.com
                  </a>
                </div>
              </div>

              <Link
                href="/"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                হোমপেজে ফিরে যান
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
