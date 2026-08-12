"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Hours from "@/components/Hours";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import TacosBuilderModal from "@/components/TacosBuilderModal";
import CartDrawer from "@/components/CartDrawer";
import { CartItem } from "@/types/order";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isTacosBuilderOpen, setIsTacosBuilderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccessNum, setOrderSuccessNum] = useState<number | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("chezricco_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("chezricco_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.name === newItem.name && i.details === newItem.details
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="pb-16 md:pb-0 min-h-screen">
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTacosBuilder={() => setIsTacosBuilderOpen(true)}
      />
      <Hero />
      <Marquee />
      <About />
      <Menu
        onOpenTacosBuilder={() => setIsTacosBuilderOpen(true)}
      />
      <Gallery />
      <Hours />
      <Footer />
      <StickyMobileBar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTacosBuilder={() => setIsTacosBuilderOpen(true)}
      />

      {/* TACOS BUILDER MODAL */}
      <TacosBuilderModal
        isOpen={isTacosBuilderOpen}
        onClose={() => setIsTacosBuilderOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* CART DRAWER & CHECKOUT */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={(orderNum) => setOrderSuccessNum(orderNum)}
      />

      {/* ORDER SUCCESS MODAL */}
      {orderSuccessNum !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setOrderSuccessNum(null)}
        >
          <div
            className="relative max-w-md w-full rounded-2xl border-4 border-mustard bg-cream p-6 text-black text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-5xl">🎉</span>
            <h3 className="font-script text-4xl text-red mt-2">Commande Reçue !</h3>
            <div className="my-3 inline-block rounded-full bg-mustard px-4 py-1 font-display text-base text-black border border-black font-bold">
              Commande N° #{orderSuccessNum}
            </div>
            <p className="text-sm font-body text-black/80 leading-relaxed">
              Votre commande a été transmise directement à la cuisine du snack <strong>Chez Ricco</strong> !
            </p>
            <p className="mt-2 text-xs font-display text-black/70 bg-white p-3 rounded-xl border border-black/20">
              📍 Retrait sur place au 6 rue des Petits Commerçants, 66510 Saint-Hippolyte.
            </p>
            <button
              onClick={() => setOrderSuccessNum(null)}
              className="mt-6 w-full rounded-xl border-2 border-black bg-red py-3 font-display text-base text-cream shadow-[4px_4px_0_#1c1410]"
            >
              C&apos;est noté, Merci !
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
