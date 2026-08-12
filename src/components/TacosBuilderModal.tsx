"use client";

import { useState } from "react";
import { CartItem } from "@/types/order";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const TACOS_SIZES = [
  { id: "SIMPLE", label: "Tacos Simple", maxMeats: 1, basePrice: 7.5, desc: "1 Viande au choix + Frites & Sauce Fromagère" },
  { id: "DOUBLE", label: "Tacos Double", maxMeats: 2, basePrice: 9.5, desc: "2 Viandes au choix + Frites & Sauce Fromagère" },
  { id: "XL", label: "Tacos XL", maxMeats: 3, basePrice: 11.5, desc: "3 Viandes au choix + Frites & Sauce Fromagère" },
] as const;

const MEAT_OPTIONS = [
  "Poulet Mariné",
  "Kebab Tradition",
  "Viande Hachée",
  "Cordon Bleu",
  "Tenders Croustillants",
  "Merguez Grillée",
  "Nuggets",
];

const SAUCE_OPTIONS = [
  "Algérienne",
  "Sauce Blanche",
  "Mayonnaise",
  "Harissa",
  "Ketchup",
  "Biggy Burger",
  "Samouraï",
  "Barbecue",
];

const EXTRA_OPTIONS = [
  { name: "Cheddar Fondu", price: 1.0 },
  { name: "Bacon de Dinde", price: 1.0 },
  { name: "Fromage Raclette", price: 1.0 },
  { name: "Jalapeños Piquants", price: 1.0 },
  { name: "Œuf au plat", price: 1.0 },
  { name: "Frites supplémentaires", price: 1.0 },
];

export default function TacosBuilderModal({ isOpen, onClose, onAddToCart }: Props) {
  const [size, setSize] = useState<"SIMPLE" | "DOUBLE" | "XL">("DOUBLE");
  const [selectedMeats, setSelectedMeats] = useState<string[]>(["Poulet Mariné", "Kebab Tradition"]);
  const [hasSauceFromagere, setHasSauceFromagere] = useState(true);
  const [selectedSauces, setSelectedSauces] = useState<string[]>(["Algérienne", "Sauce Blanche"]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  if (!isOpen) return null;

  const currentSizeObj = TACOS_SIZES.find((s) => s.id === size)!;

  const handleMeatToggle = (meat: string) => {
    if (selectedMeats.includes(meat)) {
      setSelectedMeats(selectedMeats.filter((m) => m !== meat));
    } else {
      if (selectedMeats.length < currentSizeObj.maxMeats) {
        setSelectedMeats([...selectedMeats, meat]);
      }
    }
  };

  const handleSauceToggle = (sauce: string) => {
    if (selectedSauces.includes(sauce)) {
      setSelectedSauces(selectedSauces.filter((s) => s !== sauce));
    } else {
      if (selectedSauces.length < 2) {
        setSelectedSauces([...selectedSauces, sauce]);
      }
    }
  };

  const handleExtraToggle = (extra: string) => {
    if (selectedExtras.includes(extra)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== extra));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleSizeChange = (newSize: "SIMPLE" | "DOUBLE" | "XL") => {
    setSize(newSize);
    const newMax = TACOS_SIZES.find((s) => s.id === newSize)!.maxMeats;
    if (selectedMeats.length > newMax) {
      setSelectedMeats(selectedMeats.slice(0, newMax));
    }
  };

  // Calculate Total Price
  const extrasPrice = selectedExtras.length * 1.0;
  const totalPrice = currentSizeObj.basePrice + extrasPrice;

  const handleConfirm = () => {
    if (selectedMeats.length === 0) {
      alert("Veuillez choisir au moins 1 viande pour votre Tacos.");
      return;
    }

    const detailsParts = [
      `Viandes: ${selectedMeats.join(", ")}`,
      `Sauces: ${selectedSauces.join(", ") || "Sans sauce"}`,
      hasSauceFromagere ? "Avec Sauce Fromagère Maison" : "Sans Sauce Fromagère",
    ];

    if (selectedExtras.length > 0) {
      detailsParts.push(`Suppléments: ${selectedExtras.join(", ")}`);
    }

    const newItem: CartItem = {
      id: `tacos-${Date.now()}`,
      name: `Tacos ${currentSizeObj.label.replace("Tacos ", "")}`,
      type: "TACOS_CUSTOM",
      price: totalPrice,
      quantity: 1,
      details: detailsParts.join(" | "),
      tacosComposition: {
        size,
        meats: selectedMeats,
        sauces: selectedSauces,
        extras: selectedExtras,
        sauceFromagere: hasSauceFromagere,
      },
    };

    onAddToCart(newItem);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-4 border-mustard bg-cream p-6 text-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-red text-white font-bold hover:bg-black transition-colors"
        >
          ✕
        </button>

        <div className="text-center border-b-2 border-black/20 pb-4">
          <p className="font-display text-xs tracking-widest text-red uppercase">COMPOSER SUR-MESURE</p>
          <h2 className="font-script text-4xl text-black">Créer ton Tacos Chez Ricco</h2>
          <p className="text-xs text-black/70 font-body">Recette personnalisée préparée minute</p>
        </div>

        <div className="mt-6 space-y-6">
          {/* ÉTAPE 1 : TAILLE */}
          <div>
            <h3 className="font-display text-base text-red mb-2">
              1. Choisis la taille du Tacos
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {TACOS_SIZES.map((s) => {
                const active = size === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSizeChange(s.id)}
                    className={`flex flex-col items-center justify-between p-3 rounded-xl border-2 transition-all ${
                      active
                        ? "border-black bg-mustard shadow-[3px_3px_0_#1c1410] font-bold"
                        : "border-black/30 bg-white hover:border-black"
                    }`}
                  >
                    <span className="font-display text-sm text-black">{s.label}</span>
                    <span className="font-display text-xs text-red font-bold">{s.basePrice.toFixed(2)}€</span>
                    <span className="text-[10px] text-black/60 mt-1">{s.maxMeats} Viande{s.maxMeats > 1 ? "s" : ""}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ÉTAPE 2 : VIANDES */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-base text-red">
                2. Choisis tes viandes ({selectedMeats.length}/{currentSizeObj.maxMeats})
              </h3>
              <span className="text-xs font-display text-black/60">
                {currentSizeObj.maxMeats - selectedMeats.length} restante(s)
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {MEAT_OPTIONS.map((meat) => {
                const active = selectedMeats.includes(meat);
                const disabled = !active && selectedMeats.length >= currentSizeObj.maxMeats;
                return (
                  <button
                    key={meat}
                    disabled={disabled}
                    onClick={() => handleMeatToggle(meat)}
                    className={`rounded-full border-2 px-3.5 py-1.5 font-display text-xs transition-all ${
                      active
                        ? "border-black bg-red text-cream font-bold shadow-[2px_2px_0_#1c1410]"
                        : disabled
                        ? "border-black/10 bg-black/5 text-black/40 cursor-not-allowed"
                        : "border-black/30 bg-white text-black hover:border-black"
                    }`}
                  >
                    {active ? "✓ " : ""}{meat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ÉTAPE 3 : SAUCE FROMAGÈRE */}
          <div className="rounded-xl border-2 border-black/20 bg-mustard-light/30 p-3.5 flex items-center justify-between">
            <div>
              <span className="font-display text-sm text-black block">🧀 Sauce Fromagère Maison</span>
              <span className="text-xs text-black/70">Inclus avec frites dans le Tacos</span>
            </div>
            <input
              type="checkbox"
              checked={hasSauceFromagere}
              onChange={(e) => setHasSauceFromagere(e.target.checked)}
              className="h-5 w-5 accent-red cursor-pointer"
            />
          </div>

          {/* ÉTAPE 4 : SAUCES (MAX 2) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-base text-red">
                3. Sauces (Jusqu&apos;à 2 sauces)
              </h3>
              <span className="text-xs font-display text-black/60">
                {selectedSauces.length}/2 choisies
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAUCE_OPTIONS.map((sauce) => {
                const active = selectedSauces.includes(sauce);
                const disabled = !active && selectedSauces.length >= 2;
                return (
                  <button
                    key={sauce}
                    disabled={disabled}
                    onClick={() => handleSauceToggle(sauce)}
                    className={`rounded-full border-2 px-3.5 py-1.5 font-display text-xs transition-all ${
                      active
                        ? "border-black bg-black text-mustard font-bold"
                        : disabled
                        ? "border-black/10 bg-black/5 text-black/40 cursor-not-allowed"
                        : "border-black/30 bg-white text-black hover:border-black"
                    }`}
                  >
                    {active ? "✓ " : ""}{sauce}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ÉTAPE 5 : SUPPLEMANTS */}
          <div>
            <h3 className="font-display text-base text-red mb-2">
              4. Suppléments Gourmands (+1,00€)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EXTRA_OPTIONS.map((extra) => {
                const active = selectedExtras.includes(extra.name);
                return (
                  <button
                    key={extra.name}
                    onClick={() => handleExtraToggle(extra.name)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border-2 text-xs font-display transition-all ${
                      active
                        ? "border-black bg-mustard text-black font-bold shadow-[2px_2px_0_#1c1410]"
                        : "border-black/30 bg-white text-black hover:border-black"
                    }`}
                  >
                    <span>{extra.name}</span>
                    <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded font-bold">+1€</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION */}
        <div className="mt-8 border-t-2 border-black/20 pt-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-display text-black/60 uppercase block">Total Tacos</span>
            <span className="font-display text-2xl text-red">{totalPrice.toFixed(2)} €</span>
          </div>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-xl border-2 border-black bg-red py-3.5 px-6 font-display text-base tracking-wide text-cream shadow-[4px_4px_0_#1c1410] hover:bg-red-dark transition-all"
          >
            🛒 Ajouter mon Tacos au Panier
          </button>
        </div>
      </div>
    </div>
  );
}
