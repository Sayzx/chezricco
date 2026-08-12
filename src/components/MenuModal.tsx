"use client";

import { useState } from "react";
import Image from "next/image";

type MenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "pizzas" | "sandwiches";
};

export default function MenuModal({ isOpen, onClose, initialTab = "pizzas" }: MenuModalProps) {
  const [activeTab, setActiveTab] = useState<"pizzas" | "sandwiches">(initialTab);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border-4 border-mustard bg-cream text-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-4 border-black bg-black p-4 text-cream">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📜</span>
            <div>
              <h3 className="font-script text-2xl text-mustard-light">Carte Officielle Chez Ricco</h3>
              <p className="text-xs text-cream/70 font-display tracking-wider">PHOTO DU MENU PHYSIQUE DU SNACK</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-cream bg-red text-cream font-bold hover:bg-cream hover:text-black transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Tab selector */}
        <div className="flex justify-center gap-4 bg-black/90 p-3 border-b-2 border-black">
          <button
            onClick={() => setActiveTab("pizzas")}
            className={`rounded-full px-5 py-2 font-display text-sm transition-all ${
              activeTab === "pizzas"
                ? "bg-mustard text-black font-bold border-2 border-black shadow-[2px_2px_0_#000]"
                : "bg-cream/20 text-cream hover:bg-cream/30"
            }`}
          >
            🍕 Menu Pizzas
          </button>
          <button
            onClick={() => setActiveTab("sandwiches")}
            className={`rounded-full px-5 py-2 font-display text-sm transition-all ${
              activeTab === "sandwiches"
                ? "bg-mustard text-black font-bold border-2 border-black shadow-[2px_2px_0_#000]"
                : "bg-cream/20 text-cream hover:bg-cream/30"
            }`}
          >
            🥖 Menu Sandwichs & Tacos
          </button>
        </div>

        {/* Image Display */}
        <div className="relative flex flex-1 items-center justify-center overflow-auto p-4 bg-zinc-900 min-h-[450px]">
          {activeTab === "pizzas" ? (
            <div className="relative w-full max-w-2xl h-[65vh] min-h-[400px]">
              <Image
                src="/images/menu-card-pizzas.jpg"
                alt="Menu Pizzas - Chez Ricco"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          ) : (
            <div className="relative w-full max-w-2xl h-[65vh] min-h-[400px]">
              <Image
                src="/images/menu-card-sandwiches.jpg"
                alt="Menu Sandwichs & Tacos - Chez Ricco"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t-4 border-black bg-cream p-4">
          <p className="text-xs font-body text-black/70">
            💡 Pour commander par téléphone : <strong className="text-red font-display">04 69 36 19 85</strong>
          </p>
          <button
            onClick={onClose}
            className="rounded-md bg-black px-4 py-2 font-display text-xs text-cream hover:bg-red transition-colors"
          >
            Fermer l'aperçu
          </button>
        </div>
      </div>
    </div>
  );
}
