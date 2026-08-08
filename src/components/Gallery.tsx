import Image from "next/image";

const photos = [
  { src: "/images/poster-hero.jpg", alt: "Chez Ricco — pizza, panini, café" },
  { src: "/images/poster-food.jpg", alt: "Pizzas, kebabs et sandwichs Chez Ricco" },
  { src: "/images/poster-viennoiseries.jpg", alt: "Croissants, pains au chocolat et baguettes" },
  { src: "/images/storefront.jpg", alt: "La devanture du snack" },
];

export default function Gallery() {
  return (
    <section id="galerie" className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-center font-display text-sm tracking-[0.2em] text-red">
        GALERIE
      </p>
      <h2 className="mt-2 text-center font-display text-4xl text-black sm:text-5xl">
        Ça donne faim
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {photos.map((p, i) => (
          <div
            key={p.src}
            className={`overflow-hidden rounded-lg border-4 border-black shadow-lg ${
              i === 0 ? "col-span-2 row-span-2 sm:col-span-2" : ""
            }`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={600}
              height={600}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
