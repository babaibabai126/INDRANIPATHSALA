import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// POST /api/leads — save a free inquiry from hero form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, course } = body as { name?: string; phone?: string; course?: string };
    if (!name || !phone) {
      return NextResponse.json({ error: "name and phone required" }, { status: 400 });
    }
    const db = await getDb();
    const lead = await db.lead.create({
      data: {
        name: String(name).trim(),
        phone: String(phone).trim(),
        course: String(course || "D.Pharm 1st Year"),
      },
    });
    return NextResponse.json({ ok: true, lead });
  } catch (e) {
    console.error("lead error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
