import Image from "next/image";

export default function About() {
  return (
    <section id="histoire" className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-lg bg-red" />
          <Image
            src="/images/storefront.jpg"
            alt="Devanture du snack Chez Ricco"
            width={960}
            height={720}
            className="w-full rounded-lg border-4 border-black object-cover shadow-xl"
          />
        </div>

        <div>
          <p className="font-display text-sm tracking-[0.2em] text-red">
            LE SNACK
          </p>
          <h2 className="mt-2 font-display text-4xl leading-tight text-black sm:text-5xl">
            Comme un food-truck,
            <br />
            posé sur place.
          </h2>
          <p className="mt-5 max-w-lg font-body text-black/80">
            Chez Ricco, c&apos;est le point chaud du quartier : baguettes et
            viennoiseries pur beurre cuites plusieurs fois par jour, pizzas
            généreuses, sandwichs, paninis, tacos, kebabs et américains
            préparés minute. À emporter ou en terrasse, tous les jours sauf
            le mardi.
          </p>

          <ul className="mt-6 flex flex-wrap gap-3">
            {["Pains & viennoiseries", "Pizzas", "Sandwichs & paninis", "Tacos & kebabs", "Menu enfant"].map(
              (tag) => (
                <li
                  key={tag}
                  className="rounded-full border-2 border-black bg-cream-dim px-4 py-1.5 font-display text-xs tracking-wide text-black"
                >
                  {tag}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
