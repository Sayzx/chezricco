"use client";

import { useState } from "react";
import type { MenuCategory } from "@/lib/store";
import MenuModal from "./MenuModal";

function TicketCard({
  name,
  desc,
  price,
  isMatch = true,
}: {
  name: string;
  desc?: string;
  price: string;
  isMatch?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 border-b-2 border-dashed border-black/30 py-3 transition-all ${
        isMatch ? "opacity-100" : "opacity-30"
      }`}
    >
      <div>
        <p className="font-display text-base tracking-wide text-black flex items-center gap-2">
          <span>{name}</span>
        </p>
        {desc && <p className="mt-0.5 text-sm text-black/70 leading-snug">{desc}</p>}
      </div>
      {Boolean(price) ? (
        <span className="shrink-0 rounded-md bg-red/10 px-2.5 py-1 font-display text-base text-red font-bold">
          {price}
        </span>
      ) : null}
    </div>
  );
}

export default function Menu({ categories }: { categories: MenuCategory[] }) {
  const [tab, setTab] = useState<string>(categories[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState<"pizzas" | "sandwiches">("pizzas");

  const query = search.trim().toLowerCase();

  const isMatching = (name: string, desc?: string): boolean => {
    if (!query) return true;
    return (
      name.toLowerCase().includes(query) ||
      Boolean(desc && desc.toLowerCase().includes(query))
    );
  };

  const activeCategory = categories.find((c) => c.id === tab) ?? categories[0];

  return (
    <section id="carte" className="bg-black py-16 text-cream">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex flex-col items-center text-center">
          <p className="font-display text-sm tracking-[0.2em] text-mustard uppercase">
            LA CARTE CHEZ RICCO
          </p>
          <h2 className="mt-2 font-script text-5xl text-mustard-light">
            Qu&apos;est-ce qu&apos;on vous sert ?
          </h2>
          <p className="mt-6 max-w-lg font-body text-sm text-cream/80 leading-relaxed">
            Tous nos produits sont préparés minute sur place. Appelez-nous au{" "}
            <a href="tel:0469361985" className="text-mustard underline font-bold">
              04 69 36 19 85
            </a>{" "}
            pour commander !
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setModalInitialTab("pizzas");
                setModalOpen(true);
              }}
              className="rounded-full border-2 border-mustard/60 px-4 py-1.5 font-display text-xs text-mustard hover:bg-mustard hover:text-black transition-all"
            >
              📜 Voir la carte pizzas en photo
            </button>
            <button
              onClick={() => {
                setModalInitialTab("sandwiches");
                setModalOpen(true);
              }}
              className="rounded-full border-2 border-mustard/60 px-4 py-1.5 font-display text-xs text-mustard hover:bg-mustard hover:text-black transition-all"
            >
              📜 Voir la carte sandwichs en photo
            </button>
          </div>
        </div>

        {/* Search bar & Category Tabs */}
        <div className="mt-8 space-y-4">
          <div className="mx-auto max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une pizza, un produit ou un ingrédient (ex: chèvre, saumon, frites...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border-2 border-mustard bg-cream px-5 py-3 pr-10 text-sm font-body text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-mustard"
              />
              {search ? (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-black/60 hover:text-black"
                >
                  ✕
                </button>
              ) : (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black/50">🔍</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setTab(c.id)}
                className={`rounded-full border-2 px-5 py-2 font-display text-sm tracking-wide transition-all ${
                  tab === c.id
                    ? "border-mustard bg-mustard text-black font-bold shadow-[2px_2px_0_#ffce54]"
                    : "border-cream/40 text-cream/80 hover:border-mustard hover:text-mustard"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Board Container */}
        <div className="mt-10 rounded-xl border-4 border-mustard bg-cream p-5 text-black shadow-2xl sm:p-8">
          {activeCategory && (
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3">
                <span className="font-display text-lg text-red uppercase">
                  {activeCategory.label}
                </span>
                {activeCategory.note && (
                  <span className="text-xs font-display bg-red/10 text-red px-3 py-1 rounded-full">
                    {activeCategory.note}
                  </span>
                )}
              </div>
              <div className="grid gap-x-8 sm:grid-cols-2">
                {activeCategory.items.map((it) => (
                  <TicketCard
                    key={it.id}
                    name={it.name}
                    desc={it.desc}
                    price={it.price}
                    isMatch={isMatching(it.name, it.desc)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Menu Modal */}
      <MenuModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={modalInitialTab}
      />
    </section>
  );
}
