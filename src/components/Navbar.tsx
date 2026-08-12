"use client";

import Image from "next/image";
import { useState } from "react";
import OpenStatus from "./OpenStatus";

const links = [
  { href: "#carte", label: "La carte" },
  { href: "#histoire", label: "Le snack" },
  { href: "#galerie", label: "Galerie" },
  { href: "#infos", label: "Infos & horaires" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b-4 border-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-3 group" title="Chez Ricco - Snack & Point Chaud Saint-Hippolyte">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-black ring-2 ring-mustard/80 bg-white shadow-md group-hover:scale-105 group-hover:ring-mustard transition-all duration-300">
            <Image
              src="/images/logo-square.jpg"
              alt="Chez Ricco — Snack & Point Chaud à Saint-Hippolyte (66510)"
              fill
              priority
              sizes="48px"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-script text-2xl text-red leading-none group-hover:text-red-dark transition-colors drop-shadow-sm">
              Chez Ricco
            </span>
            <span className="text-[10px] font-display tracking-widest text-black/70 uppercase font-semibold">
              Snack · Saint-Hippolyte
            </span>
          </div>
        </a>

        <div className="hidden lg:block">
          <OpenStatus className="bg-white/80" />
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-sm tracking-wide text-black hover:text-red transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:0469361985"
          className="hidden md:inline-flex items-center gap-2 rounded-md bg-red px-4 py-2 font-display text-sm tracking-wide text-cream shadow-[3px_3px_0_#1c1410] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#1c1410] transition-all"
        >
          <span>📞</span> 04 69 36 19 85
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border-2 border-black md:hidden"
        >
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t-2 border-black bg-cream px-5 py-5 md:hidden">
          <OpenStatus className="bg-white self-start" />
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-lg text-black hover:text-red"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:0469361985"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-red px-4 py-3 font-display text-base text-cream shadow-[3px_3px_0_#1c1410]"
          >
            📞 Appeler · 04 69 36 19 85
          </a>
        </nav>
      )}
    </header>
  );
}

