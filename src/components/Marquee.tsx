const words = [
  "PIZZA",
  "TACOS",
  "PANINI",
  "KEBAB",
  "AMÉRICAIN",
  "POINT CHAUD",
  "BAGUETTES",
  "VIENNOISERIES",
];

export default function Marquee() {
  const line = [...words, ...words];

  return (
    <div className="overflow-hidden border-y-4 border-black bg-mustard py-3">
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
        {[...line, ...line].map((w, i) => (
          <span
            key={i}
            className="font-display text-xl tracking-wide text-black"
          >
            {w} <span className="text-red">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
