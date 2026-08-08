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

const tabs = [
  { id: "pizza", label: "Pizzas" },
  { id: "sandwich", label: "Sandwichs & Tacos" },
  { id: "chaud", label: "Point Chaud" },
  { id: "plaisirs", label: "Petits plaisirs" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function TicketCard({
  name,
  desc,
  price,
}: {
  name: string;
  desc?: string;
  price: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b-2 border-dashed border-black/30 py-3">
      <div>
        <p className="font-display text-base tracking-wide text-black">
          {name}
        </p>
        {desc && <p className="mt-0.5 text-sm text-black/60">{desc}</p>}
      </div>
      {price && (
        <p className="shrink-0 font-display text-lg text-red">{price}</p>
      )}
    </div>
  );
}

export default function Menu() {
  const [tab, setTab] = useState<TabId>("pizza");

  return (
    <section id="carte" className="bg-black py-16 text-cream">
      <div className="mx-auto max-w-5xl px-5">
        <p className="text-center font-display text-sm tracking-[0.2em] text-mustard">
          LA CARTE
        </p>
        <h2 className="mt-2 text-center font-script text-5xl text-mustard-light">
          Qu&apos;est-ce qu&apos;on vous sert ?
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full border-2 px-5 py-2 font-display text-sm tracking-wide transition-colors ${
                tab === t.id
                  ? "border-mustard bg-mustard text-black"
                  : "border-cream/40 text-cream/80 hover:border-mustard hover:text-mustard"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-xl border-4 border-mustard bg-cream p-5 text-black shadow-2xl sm:p-8">
          {tab === "pizza" && (
            <div className="grid gap-x-8 sm:grid-cols-2">
              {pizzas.map((p) => (
                <TicketCard key={p.name} {...p} />
              ))}
            </div>
          )}

          {tab === "sandwich" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-xl text-red">
                  Paninis · 6,90€
                </h3>
                <p className="text-sm text-black/60">
                  Formule 3,50€ : frites + boisson
                </p>
                <div className="mt-3 grid gap-x-8 sm:grid-cols-2">
                  {paninis.map((p) => (
                    <TicketCard key={p.name} {...p} price="" />
                  ))}
                </div>
              </div>

              {otherSandwiches.map((group) => (
                <div key={group.id}>
                  <h3 className="font-display text-xl text-red">
                    {group.title}
                  </h3>
                  {group.note && (
                    <p className="text-sm text-black/60">{group.note}</p>
                  )}
                  <div className="mt-3 grid gap-x-8 sm:grid-cols-2">
                    {group.items.map((it) => (
                      <TicketCard key={it.name} {...it} />
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-lg border-2 border-black bg-mustard-light/40 p-4">
                <TicketCard {...menuEnfant} />
              </div>
            </div>
          )}

          {tab === "chaud" && (
            <div>
              <p className="mb-4 text-center font-display text-sm tracking-wide text-black/60">
                CUITS SUR PLACE PLUSIEURS FOIS PAR JOUR
              </p>
              <div className="grid gap-x-8 sm:grid-cols-2">
                {pointChaud.map((p) => (
                  <TicketCard key={p.name} {...p} />
                ))}
              </div>
            </div>
          )}

          {tab === "plaisirs" && (
            <div className="grid gap-x-8 sm:grid-cols-2">
              {petitsPlaisirs.map((p) => (
                <TicketCard key={p.name} {...p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
