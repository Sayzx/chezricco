import { NextRequest, NextResponse } from "next/server";
import { MenuCategory, normalizeMenu, readStore, writeStore } from "@/lib/store";

export async function GET() {
  const store = readStore();
  return NextResponse.json(store.menu);
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.categories)) {
    return NextResponse.json({ ok: false, error: "Payload invalide" }, { status: 400 });
  }

  const categories = body.categories as MenuCategory[];
  for (const c of categories) {
    if (typeof c.label !== "string" || !c.label.trim() || !Array.isArray(c.items)) {
      return NextResponse.json({ ok: false, error: "Catégorie invalide" }, { status: 400 });
    }
    for (const it of c.items) {
      if (typeof it.name !== "string" || !it.name.trim() || typeof it.price !== "string") {
        return NextResponse.json({ ok: false, error: "Article invalide" }, { status: 400 });
      }
    }
  }

  const store = readStore();
  store.menu.categories = normalizeMenu(categories);
  writeStore(store);
  return NextResponse.json(store.menu);
}
