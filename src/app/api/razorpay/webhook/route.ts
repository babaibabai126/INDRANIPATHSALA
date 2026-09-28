import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import crypto from "crypto";

/**
 * Razorpay Webhook Handler
 * 
 * Razorpay sends a webhook event to this endpoint when a payment is completed.
 * This is the SECURE way to verify payment — no user can fake it.
 * 
 * Setup in Razorpay Dashboard:
 *   1. Go to Razorpay Dashboard → Settings → Webhooks
 *   2. Add webhook URL: https://indranipathsala.com/api/razorpay/webhook
 *   3. Select events: payment.captured
 *   4. Set webhook secret (any random string) and add it to Vercel env: RAZORPAY_WEBHOOK_SECRET
 * 
 * When a payment is captured:
 *   1. Razorpay sends POST with payment details + signature
 *   2. We verify the signature using RAZORPAY_WEBHOOK_SECRET
 *   3. We find the matching purchase by notes.email + notes.mobile
 *   4. Mark purchase as PAID
 *   5. Send course email automatically
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    // Verify webhook signature (if secret is configured)
    if (webhookSecret) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(body)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("Webhook signature mismatch — ignoring");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(body);
    console.log("Razorpay webhook received:", event.event);

    // Handle payment.captured event
    if (event.event === "payment.captured") {
      const payment = event.payload?.payment?.entity;
      if (!payment) {
        return NextResponse.json({ error: "No payment entity" }, { status: 400 });
      }

      // Extract user info from payment notes (we set these in the payment link)
      const notes = payment.notes || {};
      const email = notes.email || payment.email || "";
      const mobile = notes.contact || payment.contact || "";

      console.log(`Payment captured: ${payment.id}, email: ${email}, mobile: ${mobile}, amount: ${payment.amount}`);

      // Find the matching PENDING purchase
      const db = await getDb();
      
      // Try to find by email first (most reliable)
      let purchases = await db.purchase.findMany({
        where: {
          email: email.toLowerCase(),
          status: "PENDING",
        },
        orderBy: { createdAt: "desc" },
        take: 1,
      });

      // If not found by email, try by mobile
      if (purchases.length === 0 && mobile) {
        const cleanMobile = mobile.replace(/\D/g, "").slice(-10);
        purchases = await db.purchase.findMany({
          where: {
            mobile: { contains: cleanMobile },
            status: "PENDING",
          },
          orderBy: { createdAt: "desc" },
          take: 1,
        });
      }

      if (purchases.length === 0) {
        console.log("No matching PENDING purchase found — may already be processed");
        return NextResponse.json({ ok: true, message: "No matching purchase" });
      }

      const purchase = purchases[0];

      // Mark as PAID
      await db.purchase.update({
        where: { id: purchase.id },
        data: {
          status: "PAID",
          razorpayPaymentId: payment.id,
        },
      });

      console.log(`✅ Purchase ${purchase.id} marked as PAID (payment: ${payment.id})`);

      // Send course email automatically
      try {
        const emailRes = await fetch(`${process.env.NEXTAUTH_URL || "https://indranipathsala.com"}/api/send-course-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ purchaseId: purchase.id }),
        });

        if (emailRes.ok) {
          console.log(`✅ Course email sent to ${purchase.email}`);
        } else {
          console.error(`❌ Failed to send email to ${purchase.email}`);
        }
      } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
      }

      return NextResponse.json({ ok: true, message: "Payment processed and email sent" });
    }

    // Handle other events (just acknowledge)
    return NextResponse.json({ ok: true, message: `Event ${event.event} received` });
  } catch (e) {
    console.error("Webhook error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
