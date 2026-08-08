export default function Footer() {
  return (
    <footer className="bg-black text-cream">
      <div className="h-3 bg-stripes-tight" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 text-center">
        <p className="font-script text-3xl text-mustard-light">Chez Ricco</p>
        <p className="font-body text-sm text-cream/70">
          Point Chaud · Pizza · Sandwich · Snack — Saint-Hippolyte
        </p>
        <a
          href="tel:0469361985"
          className="font-display text-sm tracking-wide text-mustard"
        >
          04 69 36 19 85
        </a>
        <p className="mt-4 font-body text-xs text-cream/40">
          © {new Date().getFullYear()} Chez Ricco. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
