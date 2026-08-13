"use client";

import { useEffect, useState } from "react";
import OpenStatus from "./OpenStatus";

const schedule = [
  { dayIndex: 1, day: "Lundi", hours: "7h00 – 14h00 · 17h30 – 21h00" },
  { dayIndex: 2, day: "Mardi", hours: "Fermé" },
  { dayIndex: 3, day: "Mercredi", hours: "7h00 – 14h00 · 17h30 – 21h00" },
  { dayIndex: 4, day: "Jeudi", hours: "7h00 – 14h00 · 17h30 – 21h00" },
  { dayIndex: 5, day: "Vendredi", hours: "7h00 – 14h00 · 17h30 – 21h30" },
  { dayIndex: 6, day: "Samedi", hours: "7h00 – 14h00 · 17h30 – 21h30" },
  { dayIndex: 0, day: "Dimanche", hours: "7h00 – 14h00 · 17h30 – 21h00" },
];

export default function Hours() {
  const [currentDay, setCurrentDay] = useState<number | null>(null);

  useEffect(() => {
    setCurrentDay(new Date().getDay());
  }, []);

  return (
    <section id="infos" className="relative bg-red py-16 text-cream border-t-4 border-black font-body">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Infos Pratiques */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block rounded-full border-2 border-mustard bg-black/40 px-4 py-1 font-body text-xs tracking-[0.2em] text-mustard uppercase font-bold">
                INFOS PRATIQUES & LOCALISATION
              </span>
              <h2 className="mt-3 font-script text-5xl text-mustard-light drop-shadow-md">
                Venez nous voir
              </h2>
            </div>

            {/* Structured Card Block for Ultra Readability */}
            <div className="rounded-2xl border-4 border-black bg-black/40 p-6 backdrop-blur-sm shadow-xl space-y-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mustard text-black font-bold text-lg shadow-sm">
                  📍
                </span>
                <div>
                  <strong className="font-body text-xs font-bold uppercase tracking-wider text-mustard-light block">
                    Adresse
                  </strong>
                  <p className="font-body text-base text-white font-bold leading-snug mt-0.5">
                    6 rue des Commerçants
                  </p>
                  <p className="text-sm text-cream/90 font-body">66510 Saint-Hippolyte</p>
                </div>
              </div>

              <div className="h-px bg-white/15" />

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mustard text-black font-bold text-lg shadow-sm">
                  📞
                </span>
                <div>
                  <strong className="font-body text-xs font-bold uppercase tracking-wider text-mustard-light block">
                    Téléphone & Commandes
                  </strong>
                  <a
                    href="tel:0469361985"
                    className="font-body text-2xl text-mustard font-bold underline hover:text-white transition-colors block mt-0.5"
                  >
                    04 69 36 19 85
                  </a>
                </div>
              </div>

              <div className="h-px bg-white/15" />

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mustard text-black font-bold text-lg shadow-sm">
                  🛍️
                </span>
                <div>
                  <strong className="font-body text-xs font-bold uppercase tracking-wider text-mustard-light block">
                    Service
                  </strong>
                  <p className="text-sm font-body text-white mt-0.5">Sur place en terrasse ou à emporter</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-1">
              <a
                href="tel:0469361985"
                className="inline-flex items-center gap-2 rounded-xl bg-mustard px-6 py-3.5 font-body text-base text-black font-bold shadow-[4px_4px_0_#1c1410] hover:bg-mustard-light transition-all"
              >
                📞 Appeler pour commander
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=6+rue+des+Commer%C3%A7ants+66510+Saint-Hippolyte"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-cream bg-black/60 px-6 py-3.5 font-body text-base text-cream font-bold shadow-[4px_4px_0_#1c1410] hover:bg-cream hover:text-black transition-all"
              >
                🗺️ Itinéraire Google Maps
              </a>
            </div>
          </div>

          {/* Right Column: Horaires Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border-4 border-black bg-cream p-6 text-black shadow-2xl">
              <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-4">
                <div>
                  <h3 className="font-body text-base text-black uppercase font-bold tracking-wide">
                    Horaires d&apos;Ouverture
                  </h3>
                  <p className="text-xs text-black/60 font-body">Ouvert 6j/7 (fermé le mardi)</p>
                </div>
                <OpenStatus />
              </div>

              <ul className="space-y-2">
                {schedule.map((s) => {
                  const isToday = currentDay === s.dayIndex;
                  return (
                    <li
                      key={s.day}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors ${
                        isToday
                          ? "bg-mustard font-bold border-2 border-black shadow-[2px_2px_0_#1c1410]"
                          : "bg-white border border-black/15"
                      }`}
                    >
                      <span className="font-body font-bold tracking-wide flex items-center gap-2">
                        {s.day}
                        {isToday && (
                          <span className="text-[10px] uppercase font-bold bg-black text-white px-2 py-0.5 rounded-full font-body">
                            Aujourd&apos;hui
                          </span>
                        )}
                      </span>
                      <span
                        className={
                          s.hours === "Fermé"
                            ? "font-body text-red font-bold"
                            : "font-body text-black/90 font-medium"
                        }
                      >
                        {s.hours}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
