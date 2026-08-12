"use client";

import { useState } from "react";
import {
  pizzas,
  paninis,
  otherSandwiches,
  pointChaud,
  petitsPlaisirs,
  menuEnfant,
} from "@/data/menu";
import MenuModal from "./MenuModal";

const tabs = [
  { id: "pizza", label: "🍕 Pizzas" },
  { id: "sandwich", label: "🥖 Sandwichs & Tacos" },
  { id: "chaud", label: "🥐 Point Chaud" },
  { id: "plaisirs", label: "🍟 Petits plaisirs" },
] as const;

type TabId = (typeof tabs)[number]["id"];

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

interface MenuProps {
  onOpenTacosBuilder?: () => void;
  onAddToCart?: (name: string, price: number, details?: string) => void;
}

export default function Menu({ onOpenTacosBuilder, onAddToCart }: MenuProps) {
  const [tab, setTab] = useState<TabId>("pizza");
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

  const openPhotoMenu = (initial: "pizzas" | "sandwiches") => {
    setModalInitialTab(initial);
    setModalOpen(true);
  };

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
          <p className="mt-2 max-w-lg font-body text-sm text-cream/70">
            Tous nos produits sont préparés minute sur place. Appelez-nous au{" "}
            <a href="tel:0469361985" className="text-mustard underline font-bold">
              04 69 36 19 85
            </a>{" "}
            ou commandez directement en ligne ci-dessous !
          </p>
        </div>

        {/* Action button to view real physical menu cards & Tacos Builder */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {onOpenTacosBuilder && (
            <button
              onClick={onOpenTacosBuilder}
              className="inline-flex items-center gap-2 rounded-full border-2 border-mustard bg-mustard px-5 py-2.5 font-display text-xs text-black font-bold shadow-[3px_3px_0_#1c1410] hover:scale-105 transition-all"
            >
              🌮 Composer ton Tacos Sur-Mesure
            </button>
          )}
          <button
            onClick={() => openPhotoMenu("pizzas")}
            className="inline-flex items-center gap-2 rounded-full border-2 border-mustard bg-mustard/20 px-4 py-2 font-display text-xs text-mustard hover:bg-mustard hover:text-black transition-all"
          >
            📸 Voir la carte pizza en photo
          </button>
          <button
            onClick={() => openPhotoMenu("sandwiches")}
            className="inline-flex items-center gap-2 rounded-full border-2 border-mustard bg-mustard/20 px-4 py-2 font-display text-xs text-mustard hover:bg-mustard hover:text-black transition-all"
          >
            📸 Voir la carte sandwichs en photo
          </button>
        </div>

        {/* Search bar & Category Tabs */}
        <div className="mt-8 space-y-4">
          <div className="mx-auto max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une pizza, un produit ou un ingrédient..."
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
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full border-2 px-5 py-2 font-display text-sm tracking-wide transition-all ${
                  tab === t.id
                    ? "border-mustard bg-mustard text-black font-bold shadow-[2px_2px_0_#ffce54]"
                    : "border-cream/40 text-cream/80 hover:border-mustard hover:text-mustard"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Board Container */}
        <div className="mt-10 rounded-xl border-4 border-mustard bg-cream p-5 text-black shadow-2xl sm:p-8">
          {tab === "pizza" && (
            <div>
              <div className="mb-4 flex items-center justify-between border-b-2 border-black pb-3">
                <span className="font-display text-lg text-red uppercase">
                  Pizzas au choix · 20 recettes
                </span>
                <span className="text-xs font-display bg-red/10 text-red px-3 py-1 rounded-full">
                  De 9,90€ à 14,90€
                </span>
              </div>
              <div className="grid gap-x-8 sm:grid-cols-2">
                {pizzas.map((p) => (
                  <TicketCard
                    key={p.name}
                    {...p}
                    isMatch={isMatching(p.name, p.desc)}
                  />
                ))}
              </div>
            </div>
          )}

          {tab === "sandwich" && (
            <div className="space-y-8">
              {/* TACOS BUILDER FEATURE CARD BANNER */}
              {onOpenTacosBuilder && (
                <div className="rounded-2xl border-4 border-black bg-mustard p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="font-display text-xs text-red uppercase tracking-widest block font-bold">
                      ⭐ COMPOSITEUR INTERACTIF ⭐
                    </span>
                    <h3 className="font-script text-3xl text-black">Compose ton Tacos Sur-Mesure !</h3>
                    <p className="text-xs font-body text-black/80">
                      Choisis ta taille (Simple, Double, XL), tes viandes préférées, ta sauce fromagère maison et tes suppléments.
                    </p>
                  </div>
                  <button
                    onClick={onOpenTacosBuilder}
                    className="shrink-0 rounded-xl border-2 border-black bg-red px-5 py-3 font-display text-sm text-cream shadow-[3px_3px_0_#1c1410] hover:bg-red-dark transition-all"
                  >
                    🌮 Composer Maintenant
                  </button>
                </div>
              )}

              {/* Paninis section */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2">
                  <h3 className="font-display text-xl text-red">
                    Paninis Chauds · 6,90€
                  </h3>
                  <span className="rounded-full bg-mustard px-3 py-1 font-display text-xs text-black border border-black font-bold">
                    🍟 Formule +3,50€ (Frites + Boisson)
                  </span>
                </div>
                <div className="mt-3 grid gap-x-8 sm:grid-cols-2">
                  {paninis.map((p) => (
                    <TicketCard
                      key={p.name}
                      {...p}
                      price="6,90€"
                      isMatch={isMatching(p.name, p.desc)}
                    />
                  ))}
                </div>
              </div>

              {/* Other sandwiches: Kebab, Américain, Tacos */}
              {otherSandwiches.map((group) => (
                <div key={group.id}>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2">
                    <h3 className="font-display text-xl text-red">{group.title}</h3>
                    {group.note && (
                      <span className="rounded-full bg-mustard/30 px-3 py-1 font-display text-xs text-black border border-black/40">
                        {group.note}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 grid gap-x-8 sm:grid-cols-2">
                    {group.items.map((it) => (
                      <TicketCard
                        key={it.name}
                        {...it}
                        isMatch={isMatching(it.name, it.desc)}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Menu Enfant */}
              <div className="rounded-lg border-2 border-black bg-mustard-light/50 p-4 shadow-md">
                <TicketCard
                  {...menuEnfant}
                  isMatch={isMatching(menuEnfant.name, menuEnfant.desc)}
                />
              </div>
            </div>
          )}

          {tab === "chaud" && (
            <div>
              <p className="mb-6 text-center font-display text-xs tracking-wider text-black/70 bg-mustard/20 py-2 rounded-md border border-black/20">
                🥖 BAGUETTES TRADITION & VIENNOISERIES PUR BEURRE CUITES CHAUDES DÈS 7H00
              </p>
              <div className="grid gap-x-8 sm:grid-cols-2">
                {pointChaud.map((p) => (
                  <TicketCard
                    key={p.name}
                    {...p}
                    isMatch={isMatching(p.name, p.desc)}
                  />
                ))}
              </div>
            </div>
          )}

          {tab === "plaisirs" && (
            <div>
              <div className="mb-4 border-b-2 border-black pb-2">
                <h3 className="font-display text-xl text-red">Accompagnements & Snacks</h3>
              </div>
              <div className="grid gap-x-8 sm:grid-cols-2">
                {petitsPlaisirs.map((p) => (
                  <TicketCard
                    key={p.name}
                    {...p}
                    isMatch={isMatching(p.name, p.desc)}
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
