import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chez Ricco — Snack & Point Chaud Saint-Hippolyte",
    short_name: "Chez Ricco",
    description:
      "Point Chaud, Pizzas au feu de bois, Tacos, Kebabs & Viennoiseries chaudes dès 7h à Saint-Hippolyte (66510).",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf1de",
    theme_color: "#c3121a",
    lang: "fr",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
