import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import crypto from "crypto";

/**
 * POST /api/razorpay/verify-payment
 *
 * Verifies Razorpay payment signature server-side.
 * If valid → marks purchase as PAID → sends course email.
 *
 * This is called AFTER the Razorpay checkout modal closes successfully.
 * The frontend sends: razorpay_payment_id, razorpay_order_id, razorpay_signature, purchaseId
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      purchaseId,
    } = body as {
      razorpay_payment_id?: string;
      razorpay_order_id?: string;
      razorpay_signature?: string;
      purchaseId?: string;
    };

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !purchaseId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: "Razorpay key not configured" }, { status: 500 });
    }

    // Verify signature: HMAC SHA256(order_id + "|" + payment_id, key_secret)
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Payment signature mismatch — possible fraud attempt");
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Signature is valid — payment is genuine!
    const db = await getDb();
    const purchase = await db.purchase.findUnique({ where: { id: purchaseId } });

    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    // Mark as PAID
    await db.purchase.update({
      where: { id: purchaseId },
      data: {
        status: "PAID",
        razorpayPaymentId: razorpay_payment_id,
      },
    });

    console.log(`✅ Payment verified: ${razorpay_payment_id} for purchase ${purchaseId}`);

    // Send course email automatically
    try {
      const emailRes = await fetch("https://indranipathsala.com/api/send-course-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseId }),
      });

      if (emailRes.ok) {
        console.log(`✅ Course email sent to ${purchase.email}`);
      } else {
        console.error(`❌ Failed to send email to ${purchase.email}`);
      }
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
    }

    return NextResponse.json({
      ok: true,
      message: "Payment verified and email sent",
      purchaseId,
      status: "PAID",
    });
  } catch (e) {
    console.error("verify-payment error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
