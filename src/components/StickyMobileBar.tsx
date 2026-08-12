"use client";

export default function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t-4 border-black bg-black p-3 shadow-2xl md:hidden">
      <a
        href="tel:0469361985"
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red py-2.5 font-display text-sm text-cream shadow-[2px_2px_0_#ffce54] active:scale-95 transition-transform"
      >
        <span>📞</span> Appeler (04 69 36 19 85)
      </a>
      <a
        href="#carte"
        className="ml-2 flex items-center justify-center gap-1.5 rounded-lg border-2 border-cream bg-cream py-2.5 px-4 font-display text-sm text-black active:scale-95 transition-transform"
      >
        <span>📜</span> La Carte
      </a>
    </div>
  );
}
