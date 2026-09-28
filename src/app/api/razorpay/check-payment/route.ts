import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

/**
 * GET /api/razorpay/check-payment?purchase_id=xxx
 *
 * Checks if a purchase has been marked as PAID by the Razorpay webhook.
 * Called by the frontend polling mechanism.
 *
 * If the purchase is still PENDING after 5 minutes, returns "timeout".
 */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const purchaseId = searchParams.get("purchase_id");

    if (!purchaseId) {
      return NextResponse.json({ error: "purchase_id is required" }, { status: 400 });
    }

    const db = await getDb();
    const purchase = await db.purchase.findUnique({ where: { id: purchaseId } });

    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    const isPaid = purchase.status === "PAID";

    const createdTime = new Date(purchase.createdAt).getTime();
    const now = Date.now();
    const elapsed = now - createdTime;
    const isTimeout = !isPaid && elapsed > 5 * 60 * 1000; // 5 minutes

    return NextResponse.json({
      status: purchase.status,
      isPaid,
      isTimeout,
    });
  } catch (e) {
    console.error("check-payment error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
