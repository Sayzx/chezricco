"use client";

import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [showLogoZoom, setShowLogoZoom] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden bg-black text-cream">
      <div className="h-3 bg-stripes-tight" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div className="relative z-10">
          <p className="mb-3 inline-block rounded-full border-2 border-mustard px-4 py-1 font-display text-xs tracking-[0.2em] text-mustard bg-mustard/10">
            SAINT-HIPPOLYTE (66510) · SUR PLACE OU À EMPORTER
          </p>

          <h1 className="font-script text-6xl leading-none text-mustard-light drop-shadow-[3px_3px_0_#7d0d13] sm:text-7xl">
            Chez Ricco
          </h1>

          <p className="mt-4 font-display text-2xl leading-tight tracking-wide sm:text-3xl">
            POINT CHAUD · PIZZA AU FEU DE TRADITION
            <br />
            SANDWICH · TACOS · KEBAB · SNACK
          </p>

          <p className="mt-5 max-w-md font-body text-cream/85 leading-relaxed">
            Baguettes et viennoiseries chaudes cuites sur place dès 7h, pizzas
            généreuses, tacos, kebabs, paninis et américains préparés minute.
            Recettes maison, tous les jours (sauf le mardi).
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:0469361985"
              className="rounded-md bg-red px-6 py-3.5 font-display text-lg tracking-wide text-cream shadow-[4px_4px_0_#ffce54] transition-all hover:-translate-y-0.5 hover:bg-red-dark"
            >
              📞 04 69 36 19 85
            </a>
            <a
              href="#carte"
              className="rounded-md border-2 border-cream px-6 py-3.5 font-display text-lg tracking-wide text-cream transition-colors hover:bg-cream hover:text-black"
            >
              Voir la carte
            </a>
          </div>

          <p className="mt-6 font-display text-sm tracking-wide text-mustard flex items-center gap-2">
            <span>⏰</span> OUVERT TOUS LES JOURS SAUF LE MARDI · 7H–14H / 17H30–21H30
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center md:items-end">
          {/* Logo badge with glow ring */}
          <div
            onClick={() => setShowLogoZoom(true)}
            className="group relative cursor-pointer"
            title="Cliquer pour agrandir le logo original Chez Ricco"
          >
            <div className="animate-float-slow logo-ring-glow badge-stamp relative h-72 w-72 overflow-hidden rounded-full border-4 border-mustard bg-white p-1 sm:h-96 sm:w-96 shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo-square.jpg"
                alt="Logo officiel Chez Ricco — Snack Food-Truck à Saint-Hippolyte"
                fill
                priority
                sizes="(min-width: 640px) 384px, 288px"
                className="rounded-full object-cover object-center"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="rounded-full bg-mustard px-4 py-2 font-display text-xs text-black shadow-lg">
                  🔍 Zoomer le logo
                </span>
              </div>
            </div>

            {/* Sub-badge sticker */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 rounded-full border-2 border-black bg-mustard px-4 py-1 font-display text-xs font-bold uppercase text-black shadow-md whitespace-nowrap">
              ⭐ Le Snack de Saint-Hippolyte ⭐
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox zoom on logo */}
      {showLogoZoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setShowLogoZoom(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-2xl border-4 border-mustard bg-black p-4 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLogoZoom(false)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-red text-white font-bold hover:bg-white hover:text-black transition-colors"
            >
              ✕
            </button>
            <h3 className="font-script text-3xl text-mustard-light mb-3">Logo Chez Ricco</h3>
            <div className="relative mx-auto h-[60vh] w-[80vw] max-w-xl">
              <Image
                src="/images/logo.jpg"
                alt="Logo original Chez Ricco - Van vintage Food Truck"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <p className="mt-3 font-display text-sm text-cream/90">
              Snack · Point Chaud · Pizzas & Spécialités · Saint-Hippolyte (66510)
            </p>
          </div>
        </div>
      )}

      <div className="h-10 bg-checker" />
    </section>
  );
}
