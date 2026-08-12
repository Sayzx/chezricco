"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Order, OrderStatus } from "@/types/order";

const ADMIN_PIN = "ricco66"; // Default passcode for testing

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "COMPLETED">("ACTIVE");

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Erreur de chargement des commandes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 10000); // Auto refresh every 10s
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN || pinInput.trim() === "1234") {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  const handleClearOrders = async () => {
    if (!confirm("Voulez-vous vraiment effacer toutes les commandes de test ?")) return;
    try {
      const res = await fetch("/api/orders?action=CLEAR_ALL", { method: "DELETE" });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      alert("Erreur de suppression");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-cream flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border-4 border-mustard bg-cream p-8 text-black shadow-2xl text-center">
          <span className="text-5xl">🔑</span>
          <h1 className="font-script text-4xl text-red mt-2">Espace Admin Chez Ricco</h1>
          <p className="text-xs font-display text-black/70 mt-1 uppercase tracking-wider">
            Gestion des commandes en direct
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-display text-black mb-1">Mot de Passe / Code PIN</label>
              <input
                type="password"
                placeholder="Entrez le code (ex: ricco66 ou 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center rounded-xl border-2 border-black bg-white p-3 font-display text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-mustard"
              />
              {pinError && (
                <p className="mt-2 text-xs font-display text-red">Code incorrect. Re-essayez avec <strong>ricco66</strong> ou <strong>1234</strong>.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl border-2 border-black bg-red py-3 font-display text-base text-cream shadow-[4px_4px_0_#ffce54] hover:bg-red-dark transition-all"
            >
              🔓 Accéder à la Cuisine & Commandes
            </button>
          </form>

          <div className="mt-6 border-t border-black/20 pt-4">
            <Link href="/" className="text-xs font-display text-black/70 hover:underline">
              ← Retour au site public
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Stats calculation
  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((acc, o) => acc + o.totalPrice, 0);

  const pendingCount = orders.filter((o) => o.status === "PENDING").length;
  const preparingCount = orders.filter((o) => o.status === "PREPARING").length;
  const readyCount = orders.filter((o) => o.status === "READY").length;

  const filteredOrders = orders.filter((o) => {
    if (filter === "ACTIVE") return o.status === "PENDING" || o.status === "PREPARING" || o.status === "READY";
    if (filter === "COMPLETED") return o.status === "COMPLETED" || o.status === "CANCELLED";
    return true;
  });

  return (
    <div className="min-h-screen bg-cream text-black flex flex-col">
      {/* HEADER BAR */}
      <header className="bg-black text-cream border-b-4 border-mustard px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👨‍🍳</span>
          <div>
            <h1 className="font-script text-3xl text-mustard-light leading-none">Espace Cuisine & Commandes</h1>
            <p className="text-[11px] font-display tracking-widest text-cream/70 uppercase">Chez Ricco · Saint-Hippolyte</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="rounded-full border border-mustard/50 bg-mustard/20 px-3.5 py-1.5 font-display text-xs text-mustard hover:bg-mustard hover:text-black transition-all"
          >
            🔄 Rafraîchir
          </button>
          <Link
            href="/"
            className="rounded-full border border-cream/40 px-3.5 py-1.5 font-display text-xs text-cream hover:bg-cream hover:text-black transition-all"
          >
            Voir le Site
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="rounded-full bg-red px-3.5 py-1.5 font-display text-xs text-cream hover:bg-red-dark transition-all"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* STATS BAR */}
      <div className="bg-mustard border-b-2 border-black px-6 py-4">
        <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="bg-cream/90 rounded-lg p-2.5 border border-black/20 shadow-sm">
            <span className="text-xs font-display text-black/70 block uppercase">Chiffre Estimé</span>
            <span className="font-display text-xl text-red font-bold">{totalRevenue.toFixed(2)} €</span>
          </div>

          <div className="bg-white rounded-lg p-2.5 border border-black/20 shadow-sm">
            <span className="text-xs font-display text-black/70 block uppercase">En Attente</span>
            <span className="font-display text-xl text-amber-600 font-bold">⏳ {pendingCount}</span>
          </div>

          <div className="bg-white rounded-lg p-2.5 border border-black/20 shadow-sm">
            <span className="text-xs font-display text-black/70 block uppercase">En Préparation</span>
            <span className="font-display text-xl text-blue-600 font-bold">👨‍🍳 {preparingCount}</span>
          </div>

          <div className="bg-white rounded-lg p-2.5 border border-black/20 shadow-sm">
            <span className="text-xs font-display text-black/70 block uppercase">Prêtes à Retirer</span>
            <span className="font-display text-xl text-emerald-600 font-bold">✅ {readyCount}</span>
          </div>

          <div className="bg-white rounded-lg p-2.5 border border-black/20 shadow-sm col-span-2 sm:col-span-1">
            <span className="text-xs font-display text-black/70 block uppercase">Total Reçues</span>
            <span className="font-display text-xl text-black font-bold">{orders.length}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-6xl w-full px-5 py-8 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("ACTIVE")}
              className={`rounded-full border-2 px-4 py-1.5 font-display text-xs transition-all ${
                filter === "ACTIVE"
                  ? "border-black bg-black text-mustard font-bold"
                  : "border-black/30 bg-white text-black hover:border-black"
              }`}
            >
              🔥 Commandes en Cours ({orders.filter((o) => o.status !== "COMPLETED" && o.status !== "CANCELLED").length})
            </button>
            <button
              onClick={() => setFilter("COMPLETED")}
              className={`rounded-full border-2 px-4 py-1.5 font-display text-xs transition-all ${
                filter === "COMPLETED"
                  ? "border-black bg-black text-mustard font-bold"
                  : "border-black/30 bg-white text-black hover:border-black"
              }`}
            >
              🏁 Historique & Terminées
            </button>
            <button
              onClick={() => setFilter("ALL")}
              className={`rounded-full border-2 px-4 py-1.5 font-display text-xs transition-all ${
                filter === "ALL"
                  ? "border-black bg-black text-mustard font-bold"
                  : "border-black/30 bg-white text-black hover:border-black"
              }`}
            >
              Toutes ({orders.length})
            </button>
          </div>

          <button
            onClick={handleClearOrders}
            className="text-xs font-display text-red hover:underline"
          >
            🗑️ Re-initialiser les commandes de test
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="font-display text-lg">Chargement des commandes...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="rounded-2xl border-2 border-black/20 bg-white p-12 text-center shadow-md">
            <span className="text-4xl">📭</span>
            <h3 className="font-display text-xl text-black mt-2">Aucune commande dans cette catégorie</h3>
            <p className="text-xs text-black/60 font-body mt-1">
              Les nouvelles commandes passées par les clients apparaîtront ici automatiquement.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map((order) => {
              const statusColors: Record<OrderStatus, string> = {
                PENDING: "bg-amber-100 border-amber-500 text-amber-800",
                PREPARING: "bg-blue-100 border-blue-500 text-blue-800",
                READY: "bg-emerald-100 border-emerald-500 text-emerald-800",
                COMPLETED: "bg-gray-100 border-gray-400 text-gray-700",
                CANCELLED: "bg-red-100 border-red-400 text-red-700",
              };

              const statusLabels: Record<OrderStatus, string> = {
                PENDING: "⏳ En Attente",
                PREPARING: "👨‍🍳 En Préparation",
                READY: "✅ Prête à Retirer",
                COMPLETED: "🎉 Récupérée / Terminée",
                CANCELLED: "❌ Annulée",
              };

              return (
                <div
                  key={order.id}
                  className="flex flex-col justify-between rounded-2xl border-4 border-black bg-white p-5 shadow-xl relative overflow-hidden"
                >
                  <div>
                    {/* CARD HEADER */}
                    <div className="flex items-center justify-between border-b-2 border-black/20 pb-3">
                      <div>
                        <span className="font-display text-lg text-red font-bold">
                          Commande #{order.orderNumber}
                        </span>
                        <span className="block text-[11px] font-body text-black/60">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: "22h", minute: "2-digit" })}
                        </span>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 font-display text-xs font-bold ${
                          statusColors[order.status]
                        }`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </div>

                    {/* CUSTOMER INFO */}
                    <div className="mt-3 bg-cream p-3 rounded-xl border border-black/20 space-y-1 text-xs">
                      <p className="font-display text-sm text-black">👤 {order.customerName}</p>
                      <p className="font-body text-black/80 flex items-center gap-1">
                        <span>📞</span>{" "}
                        <a href={`tel:${order.customerPhone}`} className="underline font-bold text-red">
                          {order.customerPhone}
                        </a>
                      </p>
                      <p className="font-display text-black/90 text-xs mt-1">
                        ⏰ Retrait souhaité : <strong className="text-red">{order.pickupTime}</strong>
                      </p>
                      {order.notes && (
                        <p className="text-[11px] font-body text-amber-900 bg-amber-50 p-1.5 rounded border border-amber-200 mt-1 italic">
                          📝 &quot;{order.notes}&quot;
                        </p>
                      )}
                    </div>

                    {/* ITEMS LIST */}
                    <div className="mt-4 space-y-2">
                      <p className="font-display text-xs text-black/60 uppercase">Détail des articles :</p>
                      <ul className="divide-y divide-black/10 border-t border-b border-black/10 py-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="py-2 text-xs">
                            <div className="flex items-center justify-between font-display font-bold">
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                              <span className="text-red">{(item.price * item.quantity).toFixed(2)}€</span>
                            </div>
                            {item.details && (
                              <p className="text-[11px] font-body text-black/70 leading-tight mt-0.5 pl-2 border-l-2 border-mustard">
                                {item.details}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BUTTONS */}
                  <div className="mt-5 border-t-2 border-black/20 pt-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display text-xs text-black/70 uppercase">Total Commande :</span>
                      <span className="font-display text-xl text-red font-bold">
                        {order.totalPrice.toFixed(2)} €
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {order.status === "PENDING" && (
                        <button
                          onClick={() => handleStatusChange(order.id, "PREPARING")}
                          className="col-span-2 rounded-lg border-2 border-black bg-blue-600 py-2 font-display text-xs text-white shadow-sm hover:bg-blue-700"
                        >
                          👨‍🍳 Passer en Préparation
                        </button>
                      )}

                      {order.status === "PREPARING" && (
                        <button
                          onClick={() => handleStatusChange(order.id, "READY")}
                          className="col-span-2 rounded-lg border-2 border-black bg-emerald-600 py-2 font-display text-xs text-white shadow-sm hover:bg-emerald-700"
                        >
                          ✅ Marquer Prête à Retirer
                        </button>
                      )}

                      {order.status === "READY" && (
                        <button
                          onClick={() => handleStatusChange(order.id, "COMPLETED")}
                          className="col-span-2 rounded-lg border-2 border-black bg-black py-2 font-display text-xs text-mustard shadow-sm hover:bg-gray-800"
                        >
                          🎉 Marquer Récupérée
                        </button>
                      )}

                      {order.status !== "COMPLETED" && order.status !== "CANCELLED" && (
                        <button
                          onClick={() => handleStatusChange(order.id, "CANCELLED")}
                          className="col-span-2 rounded-lg border border-red/40 bg-red/10 py-1.5 font-display text-xs text-red hover:bg-red hover:text-white"
                        >
                          Annuler la commande
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
