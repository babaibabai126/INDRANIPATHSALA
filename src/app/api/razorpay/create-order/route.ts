import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import crypto from "crypto";

/**
 * POST /api/razorpay/create-order
 *
 * Creates a Razorpay order on the server.
 * Returns order_id + key_id for frontend checkout modal.
 */

const COURSES: Record<string, { amount: number; label: string }> = {
  "1en": { amount: 999, label: "1st Year — Only English" },
  "1combo": { amount: 1499, label: "1st Year — English + Bengali (Combo)" },
  "2en": { amount: 999, label: "2nd Year — Only English" },
  "2combo": { amount: 1499, label: "2nd Year — English + Bengali (Combo)" },
  "rc1en": { amount: 149, label: "1st Year Recorded Class Access" },
  "rc2en": { amount: 199, label: "2nd Year Recorded Class Access" },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { purchaseId } = body as { purchaseId?: string };

    if (!purchaseId) {
      return NextResponse.json({ error: "purchaseId is required" }, { status: 400 });
    }

    const db = await getDb();
    const purchase = await db.purchase.findUnique({ where: { id: purchaseId } });

    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    // If already PAID, don't create another order
    if (purchase.status === "PAID") {
      return NextResponse.json({ error: "This purchase is already paid" }, { status: 400 });
    }

    const courseInfo = COURSES[purchase.course];
    if (!courseInfo) {
      return NextResponse.json({ error: "Invalid course" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Razorpay keys not configured" }, { status: 500 });
    }

    const amountInPaise = courseInfo.amount * 100;

    const orderData = {
      amount: amountInPaise,
      currency: "INR",
      receipt: purchaseId.substring(0, 40),
      notes: {
        purchase_id: purchaseId,
        name: purchase.name,
        email: purchase.email,
        mobile: purchase.mobile,
        course: purchase.course,
      },
    };

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!orderRes.ok) {
      const errText = await orderRes.text();
      console.error("Razorpay order creation failed:", errText);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    const order = await orderRes.json();

    return NextResponse.json({
      orderId: order.id,
      amount: courseInfo.amount,
      currency: "INR",
      keyId: keyId,
      name: "Indrani Pathsala",
      description: courseInfo.label,
      prefill: {
        name: purchase.name,
        email: purchase.email,
        contact: purchase.mobile,
      },
      purchaseId: purchaseId,
    });
  } catch (e) {
    console.error("create-order error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
