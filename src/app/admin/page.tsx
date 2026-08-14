"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { MenuCategory, MenuItem, DaySchedule, DayRange, GalleryPhoto } from "@/lib/store";

type Section = "menu" | "hours" | "gallery";

function emptyItem(): MenuItem {
  return { id: "", name: "", desc: "", price: "" };
}

function emptyCategory(): MenuCategory {
  return { id: "", label: "Nouvelle catégorie", note: "", items: [] };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [section, setSection] = useState<Section>("menu");
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuMsg, setMenuMsg] = useState("");
  const [menuSaving, setMenuSaving] = useState(false);

  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [hoursMsg, setHoursMsg] = useState("");
  const [hoursSaving, setHoursSaving] = useState(false);

  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [galleryMsg, setGalleryMsg] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/menu").then((r) => r.json()),
      fetch("/api/admin/hours").then((r) => r.json()),
      fetch("/api/admin/gallery").then((r) => r.json()),
    ]).then(([menu, hours, gallery]) => {
      setCategories(menu.categories);
      setSchedule(hours.schedule);
      setPhotos(gallery.photos);
      setLoading(false);
    });
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function saveMenu() {
    setMenuSaving(true);
    setMenuMsg("");
    const res = await fetch("/api/admin/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categories }),
    });
    const data = await res.json();
    setMenuSaving(false);
    if (!res.ok) {
      setMenuMsg(data.error || "Erreur lors de l'enregistrement");
      return;
    }
    setCategories(data.categories);
    setMenuMsg("Menu enregistré ✓");
  }

  function updateCategory(index: number, patch: Partial<MenuCategory>) {
    setCategories((cats) => cats.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  function removeCategory(index: number) {
    if (!confirm("Supprimer cette catégorie et tous ses articles ?")) return;
    setCategories((cats) => cats.filter((_, i) => i !== index));
  }

  function addCategory() {
    setCategories((cats) => [...cats, emptyCategory()]);
  }

  function updateItem(catIndex: number, itemIndex: number, patch: Partial<MenuItem>) {
    setCategories((cats) =>
      cats.map((c, i) =>
        i === catIndex
          ? { ...c, items: c.items.map((it, j) => (j === itemIndex ? { ...it, ...patch } : it)) }
          : c
      )
    );
  }

  function removeItem(catIndex: number, itemIndex: number) {
    setCategories((cats) =>
      cats.map((c, i) => (i === catIndex ? { ...c, items: c.items.filter((_, j) => j !== itemIndex) } : c))
    );
  }

  function addItem(catIndex: number) {
    setCategories((cats) =>
      cats.map((c, i) => (i === catIndex ? { ...c, items: [...c.items, emptyItem()] } : c))
    );
  }

  async function saveHours() {
    setHoursSaving(true);
    setHoursMsg("");
    const res = await fetch("/api/admin/hours", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule }),
    });
    const data = await res.json();
    setHoursSaving(false);
    if (!res.ok) {
      setHoursMsg(data.error || "Erreur lors de l'enregistrement");
      return;
    }
    setSchedule(data.schedule);
    setHoursMsg("Horaires enregistrés ✓");
  }

  function updateDay(dayIndex: number, patch: Partial<DaySchedule>) {
    setSchedule((sched) => sched.map((d) => (d.dayIndex === dayIndex ? { ...d, ...patch } : d)));
  }

  function updateRange(dayIndex: number, rangeIndex: number, patch: Partial<DayRange>) {
    setSchedule((sched) =>
      sched.map((d) =>
        d.dayIndex === dayIndex
          ? { ...d, ranges: d.ranges.map((r, i) => (i === rangeIndex ? { ...r, ...patch } : r)) }
          : d
      )
    );
  }

  function addRange(dayIndex: number) {
    setSchedule((sched) =>
      sched.map((d) => (d.dayIndex === dayIndex ? { ...d, ranges: [...d.ranges, { open: "09:00", close: "12:00" }] } : d))
    );
  }

  function removeRange(dayIndex: number, rangeIndex: number) {
    setSchedule((sched) =>
      sched.map((d) =>
        d.dayIndex === dayIndex ? { ...d, ranges: d.ranges.filter((_, i) => i !== rangeIndex) } : d
      )
    );
  }

  async function saveGalleryAlts() {
    setGalleryMsg("");
    const res = await fetch("/api/admin/gallery", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photos }),
    });
    const data = await res.json();
    if (!res.ok) {
      setGalleryMsg(data.error || "Erreur lors de l'enregistrement");
      return;
    }
    setPhotos(data.photos);
    setGalleryMsg("Légendes enregistrées ✓");
  }

  async function deletePhoto(src: string) {
    if (!confirm("Supprimer cette photo de la galerie ?")) return;
    const res = await fetch(`/api/admin/gallery?src=${encodeURIComponent(src)}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) setPhotos(data.photos);
  }

  async function uploadPhoto() {
    if (!uploadFile || !uploadAlt.trim()) {
      setGalleryMsg("Choisis une photo et une description avant d'ajouter");
      return;
    }
    setUploading(true);
    setGalleryMsg("");
    const form = new FormData();
    form.append("file", uploadFile);
    form.append("alt", uploadAlt.trim());
    const res = await fetch("/api/admin/gallery", { method: "POST", body: form });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) {
      setGalleryMsg(data.error || "Erreur lors de l'ajout");
      return;
    }
    setPhotos(data.photos);
    setUploadFile(null);
    setUploadAlt("");
    setGalleryMsg("Photo ajoutée ✓");
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-cream font-body">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-cream font-body">
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b-4 border-black bg-black px-6 py-4 text-cream">
        <div>
          <p className="font-script text-2xl text-mustard-light">Chez Ricco</p>
          <p className="text-[11px] uppercase tracking-widest text-cream/60">Administration</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-xs underline text-cream/70 hover:text-mustard">
            Voir le site
          </a>
          <button
            onClick={handleLogout}
            className="rounded-lg border-2 border-cream/40 px-4 py-2 text-xs font-display hover:bg-red hover:border-red transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <nav className="flex gap-2 border-b-2 border-black/10 bg-white px-6 py-3">
        {([
          ["menu", "🍕 Menu & Catégories"],
          ["hours", "🕒 Horaires"],
          ["gallery", "🖼️ Galerie photos"],
        ] as [Section, string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setSection(id)}
            className={`rounded-full px-4 py-2 text-sm font-display transition-colors ${
              section === id ? "bg-mustard text-black font-bold" : "text-black/60 hover:bg-black/5"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {section === "menu" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Catégories & articles</h2>
              <div className="flex items-center gap-3">
                {menuMsg && <span className="text-sm font-bold text-emerald-700">{menuMsg}</span>}
                <button
                  onClick={saveMenu}
                  disabled={menuSaving}
                  className="rounded-lg bg-red px-5 py-2.5 text-sm font-display text-cream shadow-[3px_3px_0_#1c1410] hover:bg-red-dark transition-all disabled:opacity-50"
                >
                  {menuSaving ? "Enregistrement..." : "Enregistrer le menu"}
                </button>
              </div>
            </div>

            {categories.map((cat, ci) => (
              <div key={ci} className="rounded-xl border-2 border-black/15 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-[11px] font-bold uppercase text-black/50">Nom de la catégorie</label>
                    <input
                      value={cat.label}
                      onChange={(e) => updateCategory(ci, { label: e.target.value })}
                      className="mt-1 w-full rounded-md border border-black/20 px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-[11px] font-bold uppercase text-black/50">Note (optionnel)</label>
                    <input
                      value={cat.note ?? ""}
                      onChange={(e) => updateCategory(ci, { note: e.target.value })}
                      placeholder="ex: formule +1,50€ boisson"
                      className="mt-1 w-full rounded-md border border-black/20 px-3 py-2 text-sm"
                    />
                  </div>
                  <button
                    onClick={() => removeCategory(ci)}
                    className="mt-6 rounded-md border-2 border-red/40 px-3 py-2 text-xs font-display text-red hover:bg-red hover:text-cream transition-colors"
                  >
                    Supprimer la catégorie
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  {cat.items.map((it, ii) => (
                    <div key={ii} className="flex flex-wrap items-center gap-2 rounded-md bg-black/5 p-2">
                      <input
                        value={it.name}
                        onChange={(e) => updateItem(ci, ii, { name: e.target.value })}
                        placeholder="Nom"
                        className="flex-1 min-w-[140px] rounded-md border border-black/20 px-2 py-1.5 text-sm"
                      />
                      <input
                        value={it.desc ?? ""}
                        onChange={(e) => updateItem(ci, ii, { desc: e.target.value })}
                        placeholder="Description (ingrédients...)"
                        className="flex-[2] min-w-[180px] rounded-md border border-black/20 px-2 py-1.5 text-sm"
                      />
                      <input
                        value={it.price}
                        onChange={(e) => updateItem(ci, ii, { price: e.target.value })}
                        placeholder="Prix"
                        className="w-24 rounded-md border border-black/20 px-2 py-1.5 text-sm"
                      />
                      <button
                        onClick={() => removeItem(ci, ii)}
                        className="rounded-md px-2 py-1.5 text-xs text-red hover:bg-red/10"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addItem(ci)}
                    className="mt-1 rounded-md border-2 border-dashed border-black/20 px-3 py-1.5 text-xs font-display text-black/60 hover:border-mustard hover:text-black"
                  >
                    + Ajouter un article
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addCategory}
              className="w-full rounded-xl border-2 border-dashed border-black/25 py-4 text-sm font-display text-black/60 hover:border-mustard hover:text-black transition-colors"
            >
              + Ajouter une catégorie
            </button>
          </div>
        )}

        {section === "hours" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Horaires d&apos;ouverture</h2>
              <div className="flex items-center gap-3">
                {hoursMsg && <span className="text-sm font-bold text-emerald-700">{hoursMsg}</span>}
                <button
                  onClick={saveHours}
                  disabled={hoursSaving}
                  className="rounded-lg bg-red px-5 py-2.5 text-sm font-display text-cream shadow-[3px_3px_0_#1c1410] hover:bg-red-dark transition-all disabled:opacity-50"
                >
                  {hoursSaving ? "Enregistrement..." : "Enregistrer les horaires"}
                </button>
              </div>
            </div>

            {schedule.map((d) => (
              <div key={d.dayIndex} className="rounded-xl border-2 border-black/15 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-display text-base">{d.day}</span>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={d.closed}
                      onChange={(e) => updateDay(d.dayIndex, { closed: e.target.checked })}
                    />
                    Fermé ce jour
                  </label>
                </div>

                {!d.closed && (
                  <div className="mt-3 space-y-2">
                    {d.ranges.map((r, ri) => (
                      <div key={ri} className="flex items-center gap-2">
                        <input
                          type="time"
                          value={r.open}
                          onChange={(e) => updateRange(d.dayIndex, ri, { open: e.target.value })}
                          className="rounded-md border border-black/20 px-2 py-1.5 text-sm"
                        />
                        <span className="text-black/40">–</span>
                        <input
                          type="time"
                          value={r.close}
                          onChange={(e) => updateRange(d.dayIndex, ri, { close: e.target.value })}
                          className="rounded-md border border-black/20 px-2 py-1.5 text-sm"
                        />
                        <button
                          onClick={() => removeRange(d.dayIndex, ri)}
                          className="rounded-md px-2 py-1.5 text-xs text-red hover:bg-red/10"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addRange(d.dayIndex)}
                      className="rounded-md border-2 border-dashed border-black/20 px-3 py-1 text-xs font-display text-black/60 hover:border-mustard hover:text-black"
                    >
                      + Ajouter un créneau
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {section === "gallery" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Galerie photos</h2>
              <div className="flex items-center gap-3">
                {galleryMsg && <span className="text-sm font-bold text-emerald-700">{galleryMsg}</span>}
                <button
                  onClick={saveGalleryAlts}
                  className="rounded-lg bg-red px-5 py-2.5 text-sm font-display text-cream shadow-[3px_3px_0_#1c1410] hover:bg-red-dark transition-all"
                >
                  Enregistrer les légendes
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {photos.map((p, pi) => (
                <div key={p.src} className="rounded-xl border-2 border-black/15 bg-white p-3 shadow-sm">
                  <div className="relative h-40 w-full overflow-hidden rounded-lg bg-black/5">
                    <Image src={p.src} alt={p.alt} fill className="object-cover" unoptimized />
                  </div>
                  <input
                    value={p.alt}
                    onChange={(e) =>
                      setPhotos((ph) => ph.map((x, i) => (i === pi ? { ...x, alt: e.target.value } : x)))
                    }
                    className="mt-2 w-full rounded-md border border-black/20 px-2 py-1.5 text-sm"
                    placeholder="Description de la photo"
                  />
                  <button
                    onClick={() => deletePhoto(p.src)}
                    className="mt-2 w-full rounded-md border-2 border-red/40 px-3 py-1.5 text-xs font-display text-red hover:bg-red hover:text-cream transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-xl border-2 border-dashed border-black/25 p-5">
              <h3 className="font-display text-sm text-black/70">Ajouter une nouvelle photo</h3>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
                  className="text-sm"
                />
                <input
                  value={uploadAlt}
                  onChange={(e) => setUploadAlt(e.target.value)}
                  placeholder="Description de la photo"
                  className="flex-1 min-w-[200px] rounded-md border border-black/20 px-3 py-2 text-sm"
                />
                <button
                  onClick={uploadPhoto}
                  disabled={uploading}
                  className="rounded-lg bg-mustard px-4 py-2 text-sm font-display text-black font-bold hover:bg-mustard-light transition-all disabled:opacity-50"
                >
                  {uploading ? "Envoi..." : "Ajouter la photo"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
