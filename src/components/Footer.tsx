import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-cream">
      <div className="h-3 bg-stripes-tight" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-10 text-center">
        <a
          href="#top"
          className="group relative h-20 w-20 overflow-hidden rounded-full border-2 border-mustard bg-white logo-ring-glow transition-transform duration-300 hover:scale-110"
          title="Retour en haut de page"
        >
          <Image
            src="/images/logo-square.jpg"
            alt="Chez Ricco — Logo officiel Snack Saint-Hippolyte"
            fill
            sizes="80px"
            className="object-cover object-center"
          />
        </a>
        <p className="font-script text-4xl text-mustard-light drop-shadow-sm">Chez Ricco</p>
        <address className="not-italic font-body text-sm text-cream/90 max-w-md space-y-1">
          <p className="font-display text-xs text-mustard uppercase tracking-widest">
            Point Chaud · Pizza au feu de tradition · Snack · Viennoiseries
          </p>
          <p className="font-semibold text-cream">
            📍 6 rue des Petits Commerçants, 66510 Saint-Hippolyte
          </p>
        </address>
        <a
          href="tel:0469361985"
          className="mt-2 inline-flex items-center gap-2 rounded-full border-2 border-mustard bg-mustard/15 px-6 py-2.5 font-display text-base tracking-wide text-mustard hover:bg-mustard hover:text-black transition-all shadow-md"
        >
          📞 Commandes par téléphone : 04 69 36 19 85
        </a>
        <p className="mt-6 font-body text-xs text-cream/50">
          © {new Date().getFullYear()} Snack Chez Ricco — 66510 Saint-Hippolyte. Spécialités fait maison.
        </p>
      </div>
    </footer>
  );
}
