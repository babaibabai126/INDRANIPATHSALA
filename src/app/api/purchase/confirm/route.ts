import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

/**
 * POST /api/purchase/confirm — mark a purchase as PAID.
 *
 * Flow:
 *   1. User fills the form -> /api/purchase (creates PENDING record)
 *   2. Frontend opens Razorpay payment URL in new tab
 *   3. After successful payment, user returns to ?paid=<purchaseId>
 *   4. Frontend calls /api/purchase/confirm?id=<purchaseId>
 *   5. This sets status = PAID and unlocks PDF download
 *
 * (For real production, you'd verify the Razorpay signature server-side.
 *  For this MVP demo, we trust the redirect with the purchase ID.)
 */
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const db = await getDb();
    const updated = await db.purchase.update({
      where: { id },
      data: { status: "PAID" },
    });

    return NextResponse.json({ ok: true, purchase: updated });
  } catch (e) {
    console.error("confirm error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
