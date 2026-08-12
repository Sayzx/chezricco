"use client";

interface StickyMobileBarProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenTacosBuilder?: () => void;
}

export default function StickyMobileBar({
  cartCount = 0,
  onOpenCart,
  onOpenTacosBuilder,
}: StickyMobileBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-2 border-t-4 border-black bg-black p-2.5 shadow-2xl md:hidden">
      <a
        href="tel:0469361985"
        className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-red py-2 font-display text-xs text-cream shadow-[2px_2px_0_#ffce54] active:scale-95 transition-transform"
      >
        <span>📞</span> Appeler
      </a>

      {onOpenTacosBuilder && (
        <button
          onClick={onOpenTacosBuilder}
          className="flex-1 flex items-center justify-center gap-1 rounded-lg border-2 border-black bg-mustard py-2 font-display text-xs text-black active:scale-95 transition-transform"
        >
          <span>🌮</span> Tacos
        </button>
      )}

      {onOpenCart && (
        <button
          onClick={onOpenCart}
          className="relative flex-1 flex items-center justify-center gap-1 rounded-lg border-2 border-cream bg-cream py-2 font-display text-xs text-black active:scale-95 transition-transform"
        >
          <span>🛒</span> Panier
          {cartCount > 0 && (
            <span className="ml-1 rounded-full bg-red text-white text-[10px] font-bold px-1.5 py-0.5">
              {cartCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
