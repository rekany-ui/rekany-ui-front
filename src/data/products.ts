export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  certification: string;
  origin: string;
  available: boolean;
  image: string;
  description: string;
};

export const CATEGORIES = [
  "Céréales",
  "Légumes",
  "Fruits",
  "Épices",
  "Miel",
  "Huiles",
  "Transformés",
] as const;

import vary from "@/assets/images/vary.jpg";
import salade2 from "@/assets/images/salade2.jpg";
import voankazo from "@/assets/images/voankazo.jpg";
import epice from "@/assets/images/epice.jpg";
import pasteque from "@/assets/images/pasteque.jpg";
import huile from "@/assets/images/huile.jpg";
import produit from "@/assets/images/produit.jpg";

export const products: Product[] = [
  {
    id: "riz-bio",
    name: "Riz Bio d'Alaotra",
    category: "Céréales",
    price: 12000,
    unit: "kg",
    certification: "Ecocert Bio",
    origin: "Alaotra-Mangoro",
    available: true,
    image: vary,
    description:
      "Riz blanc long grain cultivé sans intrant chimique, séché au soleil et trié à la main.",
  },
  {
    id: "legumes-bio",
    name: "Panier de Légumes Bio",
    category: "Légumes",
    price: 25000,
    unit: "panier",
    certification: "Ecocert Bio",
    origin: "Vakinankaratra",
    available: true,
    image: salade2,
    description:
      "Assortiment de légumes de saison récoltés le matin même et livrés en 24 heures.",
  },
  {
    id: "fruits-bio",
    name: "Fruits Tropicaux Bio",
    category: "Fruits",
    price: 18000,
    unit: "kg",
    certification: "Ecocert Bio",
    origin: "Atsinanana",
    available: true,
    image: voankazo,
    description: "Mangues, litchis et bananes issus de vergers agroforestiers certifiés.",
  },
  {
    id: "epices-bio",
    name: "Épices & Vanille Bio",
    category: "Épices",
    price: 45000,
    unit: "100 g",
    certification: "Bio + Équitable",
    origin: "Sava",
    available: true,
    image: epice,
    description: "Vanille bourbon, poivre noir et girofle séchés selon les méthodes ancestrales.",
  },
  {
    id: "miel-bio",
    name: "Miel Sauvage Bio",
    category: "Miel",
    price: 30000,
    unit: "500 g",
    certification: "Ecocert Bio",
    origin: "Itasy",
    available: false,
    image: pasteque, // Je mets pasteque ici car vous aviez 5 images pour 7 produits
    description: "Miel brut non pasteurisé récolté dans des ruches en forêt primaire.",
  },
  {
    id: "huiles-bio",
    name: "Huile Naturelle Pressée à Froid",
    category: "Huiles",
    price: 38000,
    unit: "500 ml",
    certification: "Bio + Équitable",
    origin: "Boeny",
    available: true,
    image: huile,
    description: "Huile première pression à froid, riche en oméga et sans raffinage.",
  },
  {
    id: "transformes-bio",
    name: "Produits Transformés Bio",
    category: "Transformés",
    price: 22000,
    unit: "lot",
    certification: "Ecocert Bio",
    origin: "Analamanga",
    available: true,
    image: produit,
    description: "Farines, fruits séchés et préparations artisanales conditionnés à l'unité.",
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("fr-MG", { maximumFractionDigits: 0 }).format(value) + " Ar";