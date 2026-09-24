"use client";

import Image from "next/image";
import { Phone, Mail, MessageCircle, MapPin, Send, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl ring-2 ring-primary/30">
                <Image src="/images/logo.jpeg" alt="Indrani Pathsala Logo" fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <div className="text-base font-bold text-foreground">Indrani Pathsala</div>
                <div className="bn text-[10px] text-accent">ইন্দ্রাণী পাঠশালা</div>
              </div>
            </div>
            <p className="bn mt-3 text-[12px] leading-relaxed text-muted-foreground">
              PCI ER-2020 সিলেবাস অনুযায়ী তৈরি D.Pharm 1st & 2nd Year Premium Suggestive Notes।
              বাংলা + English Translation সহ সম্পূর্ণ প্রস্তুতি।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-foreground">Quick Links</div>
            <ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">
              <li><a href="#top" className="bn transition hover:text-foreground">Home</a></li>
              <li><a href="#notes-features" className="bn transition hover:text-foreground">নোটস-এ কী আছে</a></li>
              <li><a href="#pricing" className="bn transition hover:text-foreground">Buy Notes</a></li>
              <li><a href="#payment" className="bn transition hover:text-foreground">Payment</a></li>
              <li><a href="#sample" className="bn transition hover:text-foreground">Sample Notes</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-foreground">Contact Us</div>
            <ul className="mt-3 space-y-3 text-[13px] text-muted-foreground">
              <li>
                <a href="tel:+918293742022" className="flex items-center gap-2.5 transition hover:text-foreground">
                  <Phone className="h-4 w-4 text-emerald-500" />
                  <span className="font-mono">MOB-8293742022</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:indraniPathsala2026@gmail.com"
                  className="flex items-start gap-2.5 transition hover:text-foreground"
                >
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="break-all">indraniPathsala2026@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <a
                  href="https://wa.me/918293742022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-foreground"
                >
                  WhatsApp Chat
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span className="bn">24×7 Support (Call ও WhatsApp)</span>
              </li>
            </ul>
          </div>

          {/* Payment + TnC */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-foreground">Payments & Terms</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["UPI", "VISA", "RUPAY", "MasterCard", "Net Banking", "GPay", "PhonePe", "Paytm"].map((p) => (
                <span
                  key={p}
                  className="rounded border border-border bg-card px-2 py-1 text-[10px] font-semibold text-foreground/80"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-start gap-2 text-[11px] text-muted-foreground">
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span className="bn">West Bengal, India</span>
            </div>
            <div className="mt-3 rounded-lg border border-border bg-muted/30 p-2.5 text-[10px] text-muted-foreground">
              <span className="font-semibold text-foreground">Terms:</span>{" "}
              <span className="bn">All sales are Final once digital product is dispatched to email.</span>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-[11px] text-muted-foreground sm:flex-row">
          <div className="bn">
            © {new Date().getFullYear()} Indrani Pathsala. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <a href="/admin" className="bn transition hover:text-foreground">Admin Dashboard</a>
            <span>·</span>
            <span className="bn">Made with ❤️ for D.Pharm Students</span>
            <Send className="h-3 w-3" />
          </div>
        </div>
      </div>
    </footer>
  );
}
