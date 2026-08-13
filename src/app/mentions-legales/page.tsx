import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions Légales & Politique de Confidentialité — Chez Ricco",
  description:
    "Mentions légales, informations réglementaires, hébergement et politique de confidentialité du snack Chez Ricco à Saint-Hippolyte (66510).",
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-cream text-black flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-4xl px-5 py-12 flex-1">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-cream-dim px-4 py-1.5 font-display text-xs tracking-wide text-black hover:bg-mustard transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>

        <h1 className="font-script text-5xl text-red leading-tight">
          Mentions Légales & Confidentialité
        </h1>
        <p className="mt-2 font-display text-sm uppercase tracking-widest text-black/60 border-b-2 border-black/20 pb-4">
          Conformément à la Loi n° 2004-575 du 21 juin 2004 (LCEN) & au Règlement Général sur la Protection des Données (RGPD)
        </p>

        <div className="mt-8 space-y-10 font-body text-sm text-black/90 leading-relaxed">
          {/* Section 1 */}
          <section className="rounded-xl border-2 border-black bg-white p-6 shadow-md">
            <h2 className="font-display text-xl text-black border-b border-black/20 pb-2 flex items-center gap-2">
              <span>🏪</span> 1. Éditeur du site
            </h2>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Nom de l&apos;établissement :</strong> Chez Ricco
              </p>
              <p>
                <strong>Activité :</strong> Restauration rapide, snack, point chaud (pizzas, sandwichs, viennoiseries)
              </p>
              <p>
                <strong>Adresse de l&apos;établissement :</strong> 6 rue des Commerçants, 66510 Saint-Hippolyte, France
              </p>
              <p>
                <strong>Téléphone :</strong>{" "}
                <a href="tel:0469361985" className="font-bold underline hover:text-red">
                  04 69 36 19 85
                </a>
              </p>
              <p>
                <strong>Forme juridique :</strong> SAS, société par actions simplifiée
              </p>
              <p>
                <strong>SIREN :</strong> 101 340 057
              </p>
              <p>
                <strong>SIRET (siège) :</strong> 101 340 057 00013
              </p>
              <p>
                <strong>N° de TVA intracommunautaire :</strong> FR67101340057
              </p>
              <p>
                <strong>RCS :</strong> Inscrit
              </p>
              <p>
                <strong>Directeur de la publication :</strong> Le responsable de l&apos;établissement Chez Ricco.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="rounded-xl border-2 border-black bg-white p-6 shadow-md">
            <h2 className="font-display text-xl text-black border-b border-black/20 pb-2 flex items-center gap-2">
              <span>☁️</span> 2. Hébergement du site
            </h2>
            <div className="mt-4 space-y-2">
              <p>Le site est hébergé de manière sécurisée sur la plateforme Vercel :</p>
              <p>
                <strong>Hébergeur :</strong> Vercel Inc.
              </p>
              <p>
                <strong>Adresse :</strong> 440 Mission Street, 1st Floor, San Francisco, CA 94105, États-Unis
              </p>
              <p>
                <strong>Site Web :</strong>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-red"
                >
                  https://vercel.com
                </a>
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="rounded-xl border-2 border-black bg-white p-6 shadow-md">
            <h2 className="font-display text-xl text-black border-b border-black/20 pb-2 flex items-center gap-2">
              <span>🎨</span> 3. Propriété intellectuelle & Crédits
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                L&apos;ensemble des contenus présents sur le site <strong>Chez Ricco</strong> (textes, logos, photographies des produits et menus, charte graphique) sont protégés par les lois en vigueur au titre de la propriété intellectuelle et du droit d&apos;auteur.
              </p>
              <p>
                Toute reproduction, représentation, modification ou adaptation totale ou partielle des éléments du site sans l&apos;autorisation écrite préalable de Chez Ricco est strictement interdite.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="rounded-xl border-2 border-black bg-white p-6 shadow-md">
            <h2 className="font-display text-xl text-black border-b border-black/20 pb-2 flex items-center gap-2">
              <span>🔒</span> 4. Protection des données personnelles & Cookies (RGPD)
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Le site <strong>Chez Ricco</strong> est un site vitrine d&apos;information à destination du public.
              </p>
              <p>
                <strong>Collecte de données :</strong> Aucune donnée personnelle n&apos;est collectée à votre insu. Aucun formulaire de création de compte ou de traitement publicitaire intrusif n&apos;est présent sur le site.
              </p>
              <p>
                <strong>Cookies :</strong> Ce site n&apos;utilise aucun cookie tiers nécessitant un consentement de suivi publicitaire. Seuls des cookies techniques essentiels ou de mesure d&apos;audience anonyme peuvent être utilisés pour assurer le bon fonctionnement du site.
              </p>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi « Informatique et Libertés », vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant en contactant l&apos;établissement par téléphone au{" "}
                <a href="tel:0469361985" className="font-bold underline hover:text-red">
                  04 69 36 19 85
                </a>{" "}
                ou directement sur place au 6 rue des Commerçants, 66510 Saint-Hippolyte.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="rounded-xl border-2 border-black bg-white p-6 shadow-md">
            <h2 className="font-display text-xl text-black border-b border-black/20 pb-2 flex items-center gap-2">
              <span>📜</span> 5. Produits, Prix & Vente à emporter
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Les prix indiqués sur les menus et cartes du site sont donnés en Euros (€) Toutes Taxes Comprises (TTC). Ils sont fournis à titre indicatif et sont susceptibles de modifications en fonction des arrivages et de la saisonnalité des produits.
              </p>
              <p>
                Les commandes s&apos;effectuent par téléphone au{" "}
                <strong className="text-red">04 69 36 19 85</strong> ou directement sur place. Le paiement s&apos;effectue au moment du retrait au snack (6 rue des Commerçants, 66510 Saint-Hippolyte).
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="rounded-xl border-2 border-black bg-white p-6 shadow-md">
            <h2 className="font-display text-xl text-black border-b border-black/20 pb-2 flex items-center gap-2">
              <span>⚖️</span> 6. Droit applicable
            </h2>
            <p className="mt-4">
              Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français compétents seront seuls habilités à trancher.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
