import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// GET /api/stats — total sales, student counts by course, etc.
export async function GET() {
  try {
    const db = await getDb();
    const purchases = await db.purchase.findMany({
      where: { status: "PAID" },
      select: { amount: true, course: true, createdAt: true },
    });

    const totalSales = purchases.reduce((s, p) => s + p.amount, 0);
    const totalStudents = purchases.length;

    // Also count pending submissions (awaiting payment)
    const allPurchases = await db.purchase.findMany({
      select: { status: true, createdAt: true },
    });
    const pendingCount = allPurchases.filter((p) => p.status === "PENDING").length;

    const byCourse: Record<string, { count: number; revenue: number; label: string }> = {
      "1en": { count: 0, revenue: 0, label: "1st Year — Only English" },
      "1combo": { count: 0, revenue: 0, label: "1st Year — Combo" },
      "2en": { count: 0, revenue: 0, label: "2nd Year — Only English" },
      "2combo": { count: 0, revenue: 0, label: "2nd Year — Combo" },
    };

    for (const p of purchases) {
      if (!byCourse[p.course]) continue;
      byCourse[p.course].count += 1;
      byCourse[p.course].revenue += p.amount;
    }

    // today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayPurchases = purchases.filter((p) => p.createdAt >= todayStart);
    const todaySales = todayPurchases.reduce((s, p) => s + p.amount, 0);

    // last 7 days for sparkline
    const last7Days: { date: string; sales: number; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      const dayPurchases = purchases.filter(
        (p) => p.createdAt >= d && p.createdAt < next
      );
      last7Days.push({
        date: d.toISOString().slice(0, 10),
        sales: dayPurchases.reduce((s, p) => s + p.amount, 0),
        count: dayPurchases.length,
      });
    }

    return NextResponse.json({
      totalSales,
      totalStudents,
      todaySales,
      todayStudents: todayPurchases.length,
      pendingCount,
      byCourse,
      last7Days,
    });
  } catch (e) {
    console.error("stats error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
