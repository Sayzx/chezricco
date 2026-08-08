"use client";

import Image from "next/image";
import { useState } from "react";

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
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="Chez Ricco"
            width={52}
            height={52}
            className="h-12 w-12 rounded-full border-2 border-black object-cover"
          />
          <span className="font-script text-2xl text-red leading-none">
            Chez Ricco
          </span>
        </a>

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
          className="hidden md:inline-block rounded-md bg-red px-4 py-2 font-display text-sm tracking-wide text-cream shadow-[3px_3px_0_#1c1410] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#1c1410] transition-all"
        >
          04 69 36 19 85
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
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-lg text-black"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:0469361985"
            className="mt-2 inline-block w-fit rounded-md bg-red px-4 py-2 font-display text-sm text-cream"
          >
            Appeler · 04 69 36 19 85
          </a>
        </nav>
      )}
    </header>
  );
}
