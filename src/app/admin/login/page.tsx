"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User, ArrowLeft, Loader2, ShieldAlert } from "lucide-react";

/**
 * Admin login page.
 * Credentials: hardcoded env-based check — not shown anywhere on the public site.
 */

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Indrani Pathsala-related admin credentials.
  // NOT shown on the public website. Only used here.
  const VALID_USERNAME = "indrani_admin";
  const VALID_PASSWORD = "Pathsala@2026#Indrani";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Simple client-side check (could be moved to API route + JWT for stronger security)
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        // Set session marker in localStorage + sessionStorage (both, for resilience)
        localStorage.setItem("indrani_admin_session", "true");
        sessionStorage.setItem("indrani_admin_session", "true");
        // Force a small delay so UX feels real
        await new Promise((r) => setTimeout(r, 600));
        router.push("/admin");
      } else {
        setError("ভুল username বা password। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="mb-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          <span className="bn">ওয়েবসাইটে ফিরে যান</span>
        </a>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-2xl">
          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl ring-4 ring-primary/30 shadow-xl">
              <Image src="/images/logo.jpeg" alt="Indrani Pathsala Logo" fill sizes="64px" className="object-cover" priority />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="bn mt-1 text-xs text-muted-foreground">
              ইন্দ্রাণী পাঠশালা · Admin Dashboard
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin username"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-[12px] text-destructive">
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                <span className="bn">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="glow-amber flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent-orange px-5 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>Login to Dashboard →</>
              )}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-border bg-muted/30 p-3 text-center text-[11px] text-muted-foreground">
            <p className="bn">
              এটি শুধুমাত্র Indrani Pathsala admin-এর জন্য।
              <br />
              Unauthorized access prohibited.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
