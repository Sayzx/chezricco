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
  title: "Chez Ricco — Snack à Saint-Hippolyte",
  description:
    "Chez Ricco, snack à Saint-Hippolyte : pizzas, sandwichs, tacos, kebabs, paninis et point chaud (viennoiseries, baguettes). Sur place ou à emporter. Ouvert tous les jours sauf le mardi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${pacifico.variable} ${workSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
