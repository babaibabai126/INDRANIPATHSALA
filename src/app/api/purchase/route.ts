import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// New prices (per user spec):
//   1st Year — English Only: ₹999
//   1st Year — Combo: ₹1499
//   2nd Year — English Only: ₹999
//   2nd Year — Combo: ₹1499
const COURSES: Record<string, { label: string; amount: number; razorpayUrl: string }> = {
  "1en": {
    label: "1st Year — Only English",
    amount: 999,
    razorpayUrl: "https://rzp.io/rzp/GtZpWok",
  },
  "1combo": {
    label: "1st Year — English + Bengali (Combo)",
    amount: 1499,
    razorpayUrl: "https://rzp.io/rzp/mBBPn9cU",
  },
  "2en": {
    label: "2nd Year — Only English",
    amount: 999,
    razorpayUrl: "https://rzp.io/rzp/GtZpWok",
  },
  "2combo": {
    label: "2nd Year — English + Bengali (Combo)",
    amount: 1499,
    razorpayUrl: "https://rzp.io/rzp/mBBPn9cU",
  },
};

// POST /api/purchase — user filled the form, save as PENDING.
// Returns the Razorpay URL for the chosen course so the frontend can redirect.
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
    // Save as PENDING — admin sees the entry immediately
    const purchase = await db.purchase.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        mobile: String(mobile).trim(),
        location: String(location).trim(),
        course: String(course),
        courseLabel: meta.label,
        amount: meta.amount,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      ok: true,
      purchase,
      razorpayUrl: meta.razorpayUrl,
      amount: meta.amount,
    });
  } catch (e) {
    console.error("purchase error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/purchase?id=xxx — fetch a single purchase status (used by frontend polling)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const db = await getDb();
    const purchase = await db.purchase.findUnique({ where: { id } });
    if (!purchase) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ purchase });
  } catch (e) {
    console.error("purchase get error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
