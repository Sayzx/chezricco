import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { GalleryPhoto, readStore, writeStore } from "@/lib/store";

const GALLERY_DIR = path.join(process.cwd(), "public", "images", "gallery");
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_SIZE = 8 * 1024 * 1024;

export async function GET() {
  const store = readStore();
  return NextResponse.json({ photos: store.gallery });
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");
  const alt = String(form.get("alt") || "").trim();

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Fichier manquant" }, { status: 400 });
  }
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ ok: false, error: "Format non supporté (jpg, png, webp)" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ ok: false, error: "Fichier trop lourd (max 8 Mo)" }, { status: 400 });
  }
  if (!alt) {
    return NextResponse.json({ ok: false, error: "Description manquante" }, { status: 400 });
  }

  fs.mkdirSync(GALLERY_DIR, { recursive: true });
  const filename = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(GALLERY_DIR, filename), buffer);

  const src = `/images/gallery/${filename}`;
  const store = readStore();
  store.gallery.push({ src, alt });
  writeStore(store);

  return NextResponse.json({ photos: store.gallery });
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.photos)) {
    return NextResponse.json({ ok: false, error: "Payload invalide" }, { status: 400 });
  }

  const photos = body.photos as GalleryPhoto[];
  const store = readStore();
  const validSrcs = new Set(store.gallery.map((p) => p.src));
  for (const p of photos) {
    if (typeof p.src !== "string" || typeof p.alt !== "string" || !validSrcs.has(p.src)) {
      return NextResponse.json({ ok: false, error: "Photo invalide" }, { status: 400 });
    }
  }

  store.gallery = photos;
  writeStore(store);
  return NextResponse.json({ photos: store.gallery });
}

export async function DELETE(req: NextRequest) {
  const src = req.nextUrl.searchParams.get("src");
  if (!src || src.includes("..")) {
    return NextResponse.json({ ok: false, error: "Photo invalide" }, { status: 400 });
  }

  const store = readStore();
  const exists = store.gallery.some((p) => p.src === src);
  if (!exists) {
    return NextResponse.json({ ok: false, error: "Photo introuvable" }, { status: 404 });
  }

  store.gallery = store.gallery.filter((p) => p.src !== src);
  writeStore(store);

  if (src.startsWith("/images/gallery/")) {
    const filePath = path.join(process.cwd(), "public", src);
    fs.rm(filePath, { force: true }, () => {});
  }

  return NextResponse.json({ photos: store.gallery });
}
