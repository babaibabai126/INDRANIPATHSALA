"use client";

import Image from "next/image";
import { Phone, Mail, MessageCircle, MapPin, Send, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/5 bg-[#0a1124]/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl ring-2 ring-white/10">
                <Image src="/images/logo.jpeg" alt="Indrani Pathsala Logo" fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <div className="text-base font-bold text-white">Indrani Pathsala</div>
                <div className="bn text-[10px] text-yellow-300">ইন্দ্রানী পাঠশালা</div>
              </div>
            </div>
            <p className="bn mt-3 text-[12px] leading-relaxed text-slate-400">
              PCI ER-2020 সিলেবাস অনুযায়ী তৈরি D.Pharm 1st & 2nd Year Premium Suggestive Notes।
              বাংলা + English Translation সহ সম্পূর্ণ প্রস্তুতি।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</div>
            <ul className="mt-3 space-y-2 text-[13px] text-slate-400">
              <li><a href="#top" className="bn transition hover:text-white">Home</a></li>
              <li><a href="#pricing" className="bn transition hover:text-white">Buy Notes</a></li>
              <li><a href="#payment" className="bn transition hover:text-white">Payment</a></li>
              <li><a href="#top" className="bn transition hover:text-white">Sample Notes</a></li>
              <li><a href="#top" className="bn transition hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-white">Contact Us</div>
            <ul className="mt-3 space-y-3 text-[13px] text-slate-400">
              <li>
                <a href="tel:+918293742022" className="flex items-center gap-2.5 transition hover:text-white">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono">+91 82937 42022</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:indranipathsala2026@gmail.com"
                  className="flex items-start gap-2.5 transition hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                  <span className="break-all">indranipathsala2026@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                <a
                  href="https://wa.me/918293742022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  WhatsApp Chat
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                <span className="bn">24×7 Support (কল ও WhatsApp)</span>
              </li>
            </ul>
          </div>

          {/* Payment + TnC */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-white">Payments & Terms</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["UPI", "VISA", "RUPAY", "MasterCard", "Net Banking", "GPay", "PhonePe", "Paytm"].map((p) => (
                <span
                  key={p}
                  className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold text-slate-300"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-start gap-2 text-[11px] text-slate-500">
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span className="bn">West Bengal, India</span>
            </div>
            <div className="mt-3 rounded-lg border border-white/8 bg-white/[0.02] p-2.5 text-[10px] text-slate-400">
              <span className="font-semibold text-slate-300">Terms:</span>{" "}
              <span className="bn">All sales are final once digital product is dispatched to email.</span>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-[11px] text-slate-500 sm:flex-row">
          <div className="bn">
            © {new Date().getFullYear()} Indrani Pathsala. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="bn">Made with ❤️ for D.Pharm Students</span>
            <Send className="h-3 w-3" />
          </div>
        </div>
      </div>
    </footer>
  );
}
