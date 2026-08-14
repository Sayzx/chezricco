import { NextRequest, NextResponse } from "next/server";
import { DaySchedule, readStore, writeStore } from "@/lib/store";

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

export async function GET() {
  const store = readStore();
  return NextResponse.json(store.hours);
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.schedule) || body.schedule.length !== 7) {
    return NextResponse.json({ ok: false, error: "Payload invalide" }, { status: 400 });
  }

  const schedule = body.schedule as DaySchedule[];
  for (const d of schedule) {
    if (
      typeof d.dayIndex !== "number" ||
      typeof d.day !== "string" ||
      typeof d.closed !== "boolean" ||
      !Array.isArray(d.ranges)
    ) {
      return NextResponse.json({ ok: false, error: "Jour invalide" }, { status: 400 });
    }
    for (const r of d.ranges) {
      if (!TIME_RE.test(r.open) || !TIME_RE.test(r.close)) {
        return NextResponse.json({ ok: false, error: `Horaire invalide pour ${d.day}` }, { status: 400 });
      }
    }
  }

  const store = readStore();
  store.hours.schedule = schedule;
  writeStore(store);
  return NextResponse.json(store.hours);
}
