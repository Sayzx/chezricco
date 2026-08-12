"use client";

import { useEffect, useState } from "react";
import OpenStatus from "./OpenStatus";

const schedule = [
  { dayIndex: 1, day: "Lundi", hours: "7h–14h · 17h30–21h30" },
  { dayIndex: 2, day: "Mardi", hours: "Fermé" },
  { dayIndex: 3, day: "Mercredi", hours: "7h–14h · 17h30–21h30" },
  { dayIndex: 4, day: "Jeudi", hours: "7h–14h · 17h30–21h30" },
  { dayIndex: 5, day: "Vendredi", hours: "7h–14h · 17h30–21h30" },
  { dayIndex: 6, day: "Samedi", hours: "7h–14h · 17h30–21h30" },
  { dayIndex: 0, day: "Dimanche", hours: "7h–14h · 17h30–21h30" },
];

export default function Hours() {
  const [currentDay, setCurrentDay] = useState<number | null>(null);

  useEffect(() => {
    setCurrentDay(new Date().getDay());
  }, []);

  return (
    <section id="infos" className="bg-red text-cream relative">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 items-center">
        <div>
          <p className="font-display text-sm tracking-[0.2em] text-mustard-light uppercase">
            INFOS PRATIQUES & LOCALISATION
          </p>
          <h2 className="mt-2 font-script text-5xl text-cream">
            Venez nous voir
          </h2>

          <div className="mt-4">
            <OpenStatus className="bg-cream text-black" />
          </div>

          <div className="mt-6 space-y-4 font-body text-cream/95">
            <div className="flex items-start gap-3 bg-red-dark/50 p-3 rounded-lg border border-mustard/30">
              <span className="text-2xl">📍</span>
              <div>
                <strong className="font-display tracking-wide text-mustard-light block">Adresse :</strong>
                <span>6 rue des Petits Commerçants, 66510 Saint-Hippolyte</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-red-dark/50 p-3 rounded-lg border border-mustard/30">
              <span className="text-2xl">📞</span>
              <div>
                <strong className="font-display tracking-wide text-mustard-light block">Téléphone & Commandes :</strong>
                <a href="tel:0469361985" className="underline font-bold hover:text-mustard">
                  04 69 36 19 85
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-red-dark/50 p-3 rounded-lg border border-mustard/30">
              <span className="text-2xl">🛍️</span>
              <div>
                <strong className="font-display tracking-wide text-mustard-light block">Services :</strong>
                <span>Sur place (terrasse) ou à emporter</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:0469361985"
              className="inline-flex items-center gap-2 rounded-md bg-mustard px-6 py-3 font-display text-lg tracking-wide text-black shadow-[4px_4px_0_#1c1410] transition-transform hover:-translate-y-0.5"
            >
              📞 Appeler pour commander
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=6+rue+des+Petits+Commer%C3%A7ants+66510+Saint-Hippolyte"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border-2 border-cream px-6 py-3 font-display text-lg tracking-wide text-cream transition-colors hover:bg-cream hover:text-black"
            >
              🗺️ Itinéraire Google Maps
            </a>
          </div>
        </div>

        <div className="rounded-xl border-4 border-black bg-cream p-6 text-black shadow-2xl">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <p className="font-display text-lg tracking-wide text-red">
              HORAIRES D&apos;OUVERTURE
            </p>
            <span className="text-xs font-display bg-black text-cream px-2.5 py-1 rounded-full">
              7j / 7 (sauf mardi)
            </span>
          </div>

          <ul className="mt-4 divide-y-2 divide-dashed divide-black/20">
            {schedule.map((s) => {
              const isToday = currentDay === s.dayIndex;
              return (
                <li
                  key={s.day}
                  className={`flex items-center justify-between py-2.5 px-2 rounded-md transition-colors ${
                    isToday ? "bg-mustard-light/50 font-bold border border-black/30" : ""
                  }`}
                >
                  <span className="font-display text-sm tracking-wide flex items-center gap-2">
                    {isToday && <span>👉</span>}
                    {s.day}
                  </span>
                  <span
                    className={
                      s.hours === "Fermé" ? "font-display text-red font-bold" : "font-body"
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
    </section>
  );
}
