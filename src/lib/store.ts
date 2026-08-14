import fs from "fs";
import path from "path";

export type MenuItem = {
  id: string;
  name: string;
  desc?: string;
  price: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  note?: string;
  items: MenuItem[];
};

export type DayRange = {
  open: string;
  close: string;
};

export type DaySchedule = {
  dayIndex: number;
  day: string;
  closed: boolean;
  ranges: DayRange[];
};

export type GalleryPhoto = {
  src: string;
  alt: string;
};

export type StoreData = {
  menu: { categories: MenuCategory[] };
  hours: { schedule: DaySchedule[] };
  gallery: GalleryPhoto[];
};

const STORE_PATH = path.join(process.cwd(), "src/data/store.json");

export function readStore(): StoreData {
  const raw = fs.readFileSync(STORE_PATH, "utf-8");
  return JSON.parse(raw) as StoreData;
}

export function writeStore(data: StoreData): void {
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function slugify(input: string): string {
  const s = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
  return s || "item";
}

export function normalizeMenu(categories: MenuCategory[]): MenuCategory[] {
  const usedCatIds = new Set<string>();
  return categories.map((c) => {
    let id = (c.id && c.id.trim()) || slugify(c.label);
    const catBase = id;
    let n = 1;
    while (usedCatIds.has(id)) id = `${catBase}-${n++}`;
    usedCatIds.add(id);

    const usedItemIds = new Set<string>();
    const items = c.items.map((it) => {
      let iid = (it.id && it.id.trim()) || slugify(it.name);
      const itemBase = iid;
      let m = 1;
      while (usedItemIds.has(iid)) iid = `${itemBase}-${m++}`;
      usedItemIds.add(iid);
      return { ...it, id: iid };
    });

    return { ...c, id, label: c.label.trim(), items };
  });
}
