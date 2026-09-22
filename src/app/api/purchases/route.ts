import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// GET /api/purchases — list purchases (newest first)
// Query params: ?limit=100&course=1en&status=PAID&q=search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "200", 10), 500);
    const course = searchParams.get("course");
    const status = searchParams.get("status");
    const q = searchParams.get("q")?.trim();

    const where: Record<string, unknown> = {};
    if (course) where.course = course;
    if (status) where.status = status;
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { email: { contains: q } },
        { mobile: { contains: q } },
        { location: { contains: q } },
      ];
    }

    const db = await getDb();
    const purchases = await db.purchase.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json({ purchases, count: purchases.length });
  } catch (e) {
    console.error("purchases error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/purchases — delete a purchase by id
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const db = await getDb();
    await db.purchase.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("delete purchase error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
