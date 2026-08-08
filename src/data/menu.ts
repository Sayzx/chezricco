export type MenuItem = {
  name: string;
  desc?: string;
  price: string;
};

export type MenuGroup = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

export const pizzas: MenuItem[] = [
  { name: "Margarita", desc: "Tomate, fromage", price: "9,90€" },
  { name: "Bambi", desc: "Tomate, fromage, jambon", price: "10,90€" },
  { name: "Reine", desc: "Tomate, fromage, jambon, champignons", price: "11,90€" },
  { name: "Diablo", desc: "Tomate, fromage, chorizo", price: "11,90€" },
  { name: "Capra del miel", desc: "Crème aux herbes, fromages, chèvre, miel", price: "11,90€" },
  { name: "Sicilienne", desc: "Tomate, fromage, anchois, oignons, poivrons", price: "11,90€" },
  { name: "Kebab", desc: "Tomate, fromage, kebab, oignons, pita", price: "12,90€" },
  { name: "Calzone", desc: "Tomate, fromage, jambon, œuf, champignons", price: "12,90€" },
  { name: "4 saisons", desc: "Tomate, fromage, aubergines, champignons, oignons, poivrons", price: "12,90€" },
  { name: "Oriental", desc: "Tomate, fromage, merguez, poivrons", price: "12,90€" },
  { name: "Cheese", desc: "Tomate, fromage, viande hachée, oignons, cheddar, oignons frits", price: "13,90€" },
  { name: "Farmer barbecue", desc: "Tomate, fromage, viande de bœuf, poulet, oignon, sauce BBQ, oignons frits", price: "13,90€" },
  { name: "3 fromages", desc: "Crème aux herbes, fromage, roquefort, chèvre", price: "13,90€" },
  { name: "Poulet curry", desc: "Sauce curry, fromage, poulet, oignons, poivrons", price: "13,90€" },
  { name: "Savoyarde", desc: "Crème aux herbes, fromage, oignons, patates, lardons, tartiflette", price: "13,90€" },
  { name: "Tagliatelles", desc: "Crème aux herbes, fromage, tagliatelle, œuf, lardons, oignons", price: "13,90€" },
  { name: "Tagliatelles saumon", desc: "Crème aux herbes, fromage, tagliatelle, œuf, saumon", price: "13,90€" },
  { name: "Paysanne", desc: "Crème aux herbes, patates, poulet, lardons, champignons", price: "13,90€" },
  { name: "Pêcheur", desc: "Tomate, fromage, cocktail de fruits de mer", price: "13,90€" },
  { name: "Saumon", desc: "Crème aux herbes, fromage, saumon", price: "14,90€" },
];

export const paninis: MenuItem[] = [
  { name: "Jerry", desc: "Fromage, jambon", price: "6,90€" },
  { name: "Bouba", desc: "Fromage, jambon, chèvre", price: "6,90€" },
  { name: "Chorizo", desc: "Fromage, oignons, tomate, chorizo", price: "6,90€" },
  { name: "Chèvre miel", desc: "Fromage, chèvre, miel", price: "6,90€" },
  { name: "3 fromages", desc: "Fromage, roquefort, chèvre", price: "6,90€" },
  { name: "Kebab", desc: "Fromage, oignons, tomate, kebab", price: "6,90€" },
  { name: "Steak", desc: "Fromage, steak haché, tomates", price: "6,90€" },
];

export const otherSandwiches: MenuGroup[] = [
  {
    id: "kebab",
    title: "Kebab",
    note: "7,90€ · formule +1,50€ boisson",
    items: [
      { name: "Kebab", desc: "Pain kebab, pitta, salade, tomate, oignons, kebab, frites", price: "7,90€" },
    ],
  },
  {
    id: "americain",
    title: "Américain",
    note: "8,90€ · formule +1,50€ boisson",
    items: [
      { name: "Américain steak", desc: "Salade, tomate, oignons, steak, frites", price: "8,90€" },
      { name: "Américain poulet", desc: "Salade, tomate, oignons, poulet, frites", price: "8,90€" },
      { name: "Américain kebab", desc: "Salade, tomate, oignons, kebab, frites", price: "8,90€" },
    ],
  },
  {
    id: "tacos",
    title: "Tacos",
    note: "Formule +1,50€ boisson · garnitures au choix : kebab, cordon bleu, nuggets, tender's, steak · sauce fromagère + frites incluses",
    items: [
      { name: "Tacos simple", price: "6,90€" },
      { name: "Tacos double", price: "8,90€" },
    ],
  },
];

export const pointChaud: MenuItem[] = [
  { name: "Croissant", desc: "Pur beurre", price: "" },
  { name: "Pain au chocolat", desc: "Pur beurre", price: "" },
  { name: "Chausson aux pommes", desc: "Pur beurre", price: "" },
  { name: "Baguette", desc: "Tradition", price: "" },
];

export const petitsPlaisirs: MenuItem[] = [
  { name: "Petite frites", price: "2€" },
  { name: "Grande frites", price: "4€" },
  { name: "Nuggets x5", price: "4,90€" },
  { name: "Nuggets x10", price: "8,90€" },
];

export const menuEnfant = {
  name: "Menu enfant",
  desc: "1 cheese ou 5 nuggets + 1 petite frites + compote + boisson",
  price: "6,90€",
};
