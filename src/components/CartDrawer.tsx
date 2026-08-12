"use client";

import { useState } from "react";
import { CartItem } from "@/types/order";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (orderNum: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}: Props) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("Dès que possible (~15-20 min)");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Veuillez renseigner votre nom et votre numéro de téléphone pour la commande.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          pickupTime,
          notes,
          items: cart,
          totalPrice,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onClearCart();
        onOrderSuccess(data.orderNumber);
        onClose();
      } else {
        alert("Erreur lors de l'envoi de la commande. Veuillez réessayer ou appeler le 04 69 36 19 85.");
      }
    } catch (err) {
      alert("Impossible de joindre le serveur. Vous pouvez commander directement par téléphone au 04 69 36 19 85.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-lg flex-col border-l-4 border-mustard bg-cream text-black shadow-2xl p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b-2 border-black/20 pb-4">
          <div>
            <h2 className="font-script text-3xl text-red">Votre Panier Chez Ricco</h2>
            <p className="text-xs font-display text-black/60 uppercase">
              {cart.length} article{cart.length > 1 ? "s" : ""} sélectionné{cart.length > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-red text-white font-bold hover:bg-black transition-colors"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="my-auto text-center py-12">
            <span className="text-5xl">🛒</span>
            <p className="mt-4 font-display text-lg text-black">Votre panier est vide</p>
            <p className="mt-1 text-xs text-black/70 font-body max-w-xs mx-auto">
              Ajoutez des pizzas, sandwichs ou composez votre Tacos sur-mesure pour passer commande.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full border-2 border-black bg-mustard px-6 py-2 font-display text-sm text-black shadow-[3px_3px_0_#1c1410]"
            >
              Découvrir la Carte
            </button>
          </div>
        ) : (
          <div className="mt-6 flex-1 space-y-6">
            {/* ARTICLES */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border-2 border-black/20 bg-white p-3 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display text-sm text-black font-bold">{item.name}</h4>
                      {item.details && (
                        <p className="text-xs text-black/70 font-body leading-tight mt-0.5">
                          {item.details}
                        </p>
                      )}
                    </div>
                    <span className="font-display text-sm text-red font-bold shrink-0">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-2">
                    <div className="flex items-center gap-2 border border-black/30 rounded-lg p-0.5 bg-cream-dim">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="h-6 w-6 rounded border border-black/40 bg-white text-xs font-bold hover:bg-red hover:text-white"
                      >
                        -
                      </button>
                      <span className="font-display text-xs px-1">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="h-6 w-6 rounded border border-black/40 bg-white text-xs font-bold hover:bg-mustard"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-xs font-display text-red hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* FORMULAIRE DE COMMANDE */}
            <form onSubmit={handleSubmitOrder} className="rounded-xl border-2 border-black bg-white p-4 space-y-3.5 shadow-md">
              <h3 className="font-display text-sm text-red border-b border-black/20 pb-1.5 flex items-center gap-1.5">
                <span>📋</span> Informations pour le Retrait (Sur Place)
              </h3>

              <div>
                <label className="block text-xs font-display text-black mb-1">Votre Nom & Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Marc Dupont"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-lg border-2 border-black/30 bg-cream p-2 text-xs font-body focus:outline-none focus:border-red"
                />
              </div>

              <div>
                <label className="block text-xs font-display text-black mb-1">Numéro de Téléphone *</label>
                <input
                  type="tel"
                  required
                  placeholder="ex: 06 12 34 56 78"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full rounded-lg border-2 border-black/30 bg-cream p-2 text-xs font-body focus:outline-none focus:border-red"
                />
              </div>

              <div>
                <label className="block text-xs font-display text-black mb-1">Heure de retrait souhaitée</label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full rounded-lg border-2 border-black/30 bg-cream p-2 text-xs font-body focus:outline-none focus:border-red"
                >
                  <option value="Dès que possible (~15-20 min)">⚡ Dès que possible (~15-20 min)</option>
                  <option value="12h00">12h00</option>
                  <option value="12h30">12h30</option>
                  <option value="13h00">13h00</option>
                  <option value="13h30">13h30</option>
                  <option value="18h30">18h30</option>
                  <option value="19h00">19h00</option>
                  <option value="19h30">19h30</option>
                  <option value="20h00">20h00</option>
                  <option value="20h30">20h30</option>
                  <option value="21h00">21h00</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-display text-black mb-1">Remarques ou précisions (optionnel)</label>
                <textarea
                  rows={2}
                  placeholder="ex: Sans oignons, paiement en espèces..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border-2 border-black/30 bg-cream p-2 text-xs font-body focus:outline-none focus:border-red"
                />
              </div>

              <div className="border-t border-black/20 pt-3 flex items-center justify-between">
                <span className="font-display text-sm text-black">Total à régler au snack:</span>
                <span className="font-display text-xl text-red font-bold">{totalPrice.toFixed(2)} €</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl border-2 border-black bg-red py-3 font-display text-base tracking-wide text-cream shadow-[4px_4px_0_#1c1410] hover:bg-red-dark transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Envoi en cours..." : "🚀 Envoyer ma Commande au Snack"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
