import { NextResponse } from "next/server";
import { readStore } from "@/lib/store";

export async function GET() {
  const store = readStore();
  return NextResponse.json({ schedule: store.hours.schedule });
}
