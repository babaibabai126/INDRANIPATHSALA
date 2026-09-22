import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

const COURSES: Record<string, { label: string; amount: number }> = {
  "1en": { label: "1st Year — Only English", amount: 1399 },
  "1combo": { label: "1st Year — English + Bengali (Combo)", amount: 1899 },
  "2en": { label: "2nd Year — Only English", amount: 1499 },
  "2combo": { label: "2nd Year — English + Bengali (Combo)", amount: 1999 },
};

// POST /api/purchase — creates a new purchase (paid)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, location, course } = body as {
      name?: string;
      email?: string;
      mobile?: string;
      location?: string;
      course?: string;
    };

    if (!name || !email || !mobile || !location || !course) {
      return NextResponse.json(
        { error: "All fields (name, email, mobile, location, course) are required" },
        { status: 400 }
      );
    }

    const meta = COURSES[course];
    if (!meta) {
      return NextResponse.json({ error: "Invalid course" }, { status: 400 });
    }

    const db = await getDb();
    const purchase = await db.purchase.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        mobile: String(mobile).trim(),
        location: String(location).trim(),
        course: String(course),
        courseLabel: meta.label,
        amount: meta.amount,
        status: "PAID",
      },
    });

    return NextResponse.json({ ok: true, purchase });
  } catch (e) {
    console.error("purchase error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
