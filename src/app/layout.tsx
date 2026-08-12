import type { Metadata } from "next";
import { Anton, Pacifico, Work_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-display-raw",
  weight: "400",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-script-raw",
  weight: "400",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-body-raw",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chezricco.fr"),
  title: {
    default: "Chez Ricco — Snack, Pizzas & Point Chaud à Saint-Hippolyte (66510)",
    template: "%s | Chez Ricco Saint-Hippolyte",
  },
  description:
    "Chez Ricco à Saint-Hippolyte (66510) : pizzas au feu de bois, tacos, kebabs, paninis & point chaud (baguettes & viennoiseries chaudes dès 7h). Sur place et à emporter. Tél: 04 69 36 19 85. 6 rue des Petits Commerçants.",
  keywords: [
    "Chez Ricco",
    "Snack Saint-Hippolyte",
    "Pizza Saint-Hippolyte",
    "Pizza Saint-Hippolyte 66510",
    "Kebab Saint-Hippolyte",
    "Tacos Saint-Hippolyte",
    "Point Chaud Saint-Hippolyte",
    "Viennoiseries Saint-Hippolyte",
    "Restauration rapide Saint-Hippolyte",
    "Boulangerie Saint-Hippolyte 66510",
    "Snack Salanque",
    "Pizza Salanque",
    "Pizzeria 66510",
  ],
  authors: [{ name: "Chez Ricco" }],
  creator: "Chez Ricco",
  publisher: "Chez Ricco",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "https://chezricco.fr",
  },
  openGraph: {
    title: "Chez Ricco — Snack & Point Chaud à Saint-Hippolyte (66510)",
    description:
      "Pizzas au feu de bois, tacos, kebabs, paninis & viennoiseries chaudes dès 7h à Saint-Hippolyte. Sur place ou à emporter. 📞 04 69 36 19 85.",
    url: "https://chezricco.fr",
    siteName: "Chez Ricco Saint-Hippolyte",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/logo-square.jpg",
        width: 800,
        height: 800,
        alt: "Logo Chez Ricco — Snack & Point Chaud Saint-Hippolyte",
      },
      {
        url: "/images/storefront.jpg",
        width: 960,
        height: 720,
        alt: "Devanture Snack Chez Ricco Saint-Hippolyte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chez Ricco — Snack & Point Chaud à Saint-Hippolyte",
    description:
      "Pizzas, tacos, kebabs, paninis et point chaud (baguettes & viennoiseries d'ici dès 7h). Sur place et à emporter.",
    images: ["/images/logo-square.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "geo.region": "FR-66",
    "geo.placename": "Saint-Hippolyte",
    "geo.position": "42.7847;2.9681",
    ICBM: "42.7847, 2.9681",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": ["FastFoodRestaurant", "Bakery", "LocalBusiness"],
  name: "Chez Ricco",
  alternateName: "Snack Chez Ricco Saint-Hippolyte",
  image: [
    "https://chezricco.fr/images/logo-square.jpg",
    "https://chezricco.fr/images/logo.jpg",
    "https://chezricco.fr/images/storefront.jpg",
  ],
  logo: "https://chezricco.fr/images/logo-square.jpg",
  "@id": "https://chezricco.fr",
  url: "https://chezricco.fr",
  telephone: "+33469361985",
  priceRange: "€",
  servesCuisine: [
    "Pizza",
    "Snack",
    "Panini",
    "Tacos",
    "Kebab",
    "Viennoiseries",
    "Point Chaud",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "6 rue des Petits Commerçants",
    addressLocality: "Saint-Hippolyte",
    postalCode: "66510",
    addressRegion: "Pyrénées-Orientales",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.7847,
    longitude: 2.9681,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "07:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "17:30",
      closes: "21:30",
    },
  ],
  hasMenu: "https://chezricco.fr#carte",
  acceptsReservations: "false",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${pacifico.variable} ${workSans.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
