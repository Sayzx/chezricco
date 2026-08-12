"use client";

import { useState } from "react";
import Image from "next/image";

const photos = [
  { src: "/images/logo.jpg", alt: "Logo officiel Chez Ricco — Van Food-Truck vintage" },
  { src: "/images/storefront.jpg", alt: "Devanture et terrasse du snack Chez Ricco" },
  { src: "/images/poster-hero.jpg", alt: "Spécialités pizzas, paninis, cafés & viennoiseries" },
  { src: "/images/poster-food.jpg", alt: "Pizzas au feu de bois, kebabs et tacos généreux" },
  { src: "/images/poster-viennoiseries.jpg", alt: "Point Chaud : Croissants, pains & baguettes chaudes" },
  { src: "/images/menu-card-pizzas.jpg", alt: "Carte physique des pizzas au feu de tradition" },
  { src: "/images/menu-card-sandwiches.jpg", alt: "Carte physique des sandwichs & formules" },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="galerie" className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-center font-display text-sm tracking-[0.2em] text-red uppercase">
        GALERIE PHOTOS
      </p>
      <h2 className="mt-2 text-center font-display text-4xl text-black sm:text-5xl">
        Ça donne faim
      </h2>
      <p className="mt-2 text-center text-sm text-black/70 font-body">
        Cliquez sur une photo pour l'agrandir en grand format
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((p) => (
          <div
            key={p.src}
            onClick={() => setSelectedPhoto(p)}
            className="group relative h-64 sm:h-72 cursor-pointer overflow-hidden rounded-xl border-4 border-black bg-cream shadow-lg hover:shadow-2xl transition-all"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="font-display text-xs text-cream tracking-wide flex items-center gap-1.5">
                <span>🔍</span> {p.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-xl border-4 border-mustard bg-black p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-red text-white font-bold hover:bg-white hover:text-black transition-colors"
            >
              ✕
            </button>
            <div className="relative h-[75vh] w-[85vw] max-w-3xl">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                unoptimized
                priority
                className="object-contain"
              />
            </div>
            <div className="p-3 text-center bg-black">
              <p className="font-display text-sm text-mustard">{selectedPhoto.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
