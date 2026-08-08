import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-black text-cream">
      <div className="h-3 bg-stripes-tight" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div className="relative z-10">
          <p className="mb-3 inline-block rounded-full border-2 border-mustard px-4 py-1 font-display text-xs tracking-[0.2em] text-mustard">
            SAINT-HIPPOLYTE · SUR PLACE OU À EMPORTER
          </p>

          <h1 className="font-script text-6xl leading-none text-mustard-light drop-shadow-[3px_3px_0_#7d0d13] sm:text-7xl">
            Chez Ricco
          </h1>

          <p className="mt-4 font-display text-2xl leading-tight tracking-wide sm:text-3xl">
            POINT CHAUD · PIZZA
            <br />
            SANDWICH · SNACK
          </p>

          <p className="mt-5 max-w-md font-body text-cream/80">
            Baguettes et viennoiseries chaudes dès 7h, pizzas au feu de
            tradition, tacos, kebabs, paninis et bien plus. Fait maison,
            tous les jours (sauf le mardi).
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:0469361985"
              className="rounded-md bg-red px-6 py-3 font-display text-lg tracking-wide text-cream shadow-[4px_4px_0_#ffce54] transition-transform hover:-translate-y-0.5"
            >
              📞 04 69 36 19 85
            </a>
            <a
              href="#carte"
              className="rounded-md border-2 border-cream px-6 py-3 font-display text-lg tracking-wide text-cream transition-colors hover:bg-cream hover:text-black"
            >
              Voir la carte
            </a>
          </div>

          <p className="mt-6 font-display text-sm tracking-wide text-mustard">
            OUVERT TOUS LES JOURS SAUF LE MARDI · 7H–14H / 17H30–21H30
          </p>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="animate-float-slow badge-stamp relative h-72 w-72 overflow-hidden rounded-full border-4 border-mustard sm:h-96 sm:w-96">
            <Image
              src="/images/logo.jpg"
              alt="Logo Chez Ricco — food truck et spécialités"
              fill
              priority
              sizes="(min-width: 640px) 384px, 288px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      <div className="h-10 bg-checker" />
    </section>
  );
}
