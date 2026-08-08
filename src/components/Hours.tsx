const schedule = [
  { day: "Lundi", hours: "7h–14h · 17h30–21h30" },
  { day: "Mardi", hours: "Fermé" },
  { day: "Mercredi", hours: "7h–14h · 17h30–21h30" },
  { day: "Jeudi", hours: "7h–14h · 17h30–21h30" },
  { day: "Vendredi", hours: "7h–14h · 17h30–21h30" },
  { day: "Samedi", hours: "7h–14h · 17h30–21h30" },
  { day: "Dimanche", hours: "7h–14h · 17h30–21h30" },
];

export default function Hours() {
  return (
    <section id="infos" className="bg-red text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
        <div>
          <p className="font-display text-sm tracking-[0.2em] text-mustard-light">
            INFOS PRATIQUES
          </p>
          <h2 className="mt-2 font-script text-5xl text-cream">
            Venez nous voir
          </h2>

          <div className="mt-6 space-y-3 font-body">
            <p>
              <span className="font-display tracking-wide text-mustard-light">
                📍 Adresse —
              </span>{" "}
              <a
                href="https://www.google.com/maps/search/?api=1&query=6+rue+des+Petits+Commer%C3%A7ants+66510+Saint-Hippolyte"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                6 rue des Petits Commerçants, 66510 Saint-Hippolyte
              </a>
            </p>
            <p>
              <span className="font-display tracking-wide text-mustard-light">
                📞 Téléphone —
              </span>{" "}
              <a href="tel:0469361985" className="underline">
                04 69 36 19 85
              </a>
            </p>
            <p>
              <span className="font-display tracking-wide text-mustard-light">
                🥡 Formules —
              </span>{" "}
              Sur place ou à emporter
            </p>
          </div>

          <a
            href="tel:0469361985"
            className="mt-8 inline-block rounded-md bg-mustard px-6 py-3 font-display text-lg tracking-wide text-black shadow-[4px_4px_0_#1c1410] transition-transform hover:-translate-y-0.5"
          >
            Appeler pour commander
          </a>
        </div>

        <div className="rounded-xl border-4 border-black bg-cream p-6 text-black">
          <p className="font-display text-lg tracking-wide text-red">
            HORAIRES D&apos;OUVERTURE
          </p>
          <ul className="mt-4 divide-y-2 divide-dashed divide-black/20">
            {schedule.map((s) => (
              <li
                key={s.day}
                className="flex items-center justify-between py-2.5 font-body"
              >
                <span className="font-display text-sm tracking-wide">
                  {s.day}
                </span>
                <span
                  className={
                    s.hours === "Fermé" ? "font-display text-red" : ""
                  }
                >
                  {s.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
