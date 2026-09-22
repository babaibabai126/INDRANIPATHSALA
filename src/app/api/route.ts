import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  return NextResponse.json({ message: "Indrani Pathsala API — see /api/purchase, /api/purchases, /api/stats, /api/leads" });
}
