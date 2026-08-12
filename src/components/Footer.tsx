import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-cream">
      <div className="h-3 bg-stripes-tight" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-10 text-center">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-mustard bg-white">
          <Image
            src="/images/logo-square.jpg"
            alt="Chez Ricco"
            fill
            className="object-cover"
          />
        </div>
        <p className="font-script text-3xl text-mustard-light">Chez Ricco</p>
        <p className="font-body text-sm text-cream/80 max-w-md">
          Point Chaud · Pizza au feu de tradition · Sandwich · Snack · Baguettes & Viennoiseries
          <br />
          6 rue des Petits Commerçants, 66510 Saint-Hippolyte
        </p>
        <a
          href="tel:0469361985"
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-mustard/40 bg-mustard/10 px-5 py-2 font-display text-base tracking-wide text-mustard hover:bg-mustard hover:text-black transition-colors"
        >
          📞 04 69 36 19 85
        </a>
        <p className="mt-6 font-body text-xs text-cream/40">
          © {new Date().getFullYear()} Chez Ricco. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
