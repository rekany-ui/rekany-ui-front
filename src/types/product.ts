// src/types/product.ts

// ===== TYPES PRINCIPAUX =====

export interface Product {
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
}

export interface CreateProduct {
  name: string;
  category: string;
  price: number;
  unit: string;
  certification: string;
  origin: string;
  available: boolean;
  image: string;
  description: string;
}

export interface UpdateProduct {
  name?: string;
  category?: string;
  price?: number;
  unit?: string;
  certification?: string;
  origin?: string;
  available?: boolean;
  image?: string;
  description?: string;
}

// ===== TYPES API (interne) =====

interface ApiProduct {
  id: number;
  nom: string;
  categorie: string;
  prix: number;
  unite: string;
  certification: string;
  origine: string;
  disponible: boolean;
  image_url: string | null;
  description: string;
}

// ===== TRANSFORMATEURS =====

export const toProduct = (api: ApiProduct): Product => ({
  id: String(api.id),
  name: api.nom,
  category: api.categorie,
  price: Number(api.prix),
  unit: api.unite,
  certification: api.certification,
  origin: api.origine,
  available: Boolean(api.disponible),
  image: api.image_url || "/images/placeholder.jpg",
  description: api.description,
});

export const toApiProduct = (product: CreateProduct) => ({
  nom: product.name,
  categorie: product.category,
  prix: product.price,
  unite: product.unit,
  certification: product.certification,
  origine: product.origin,
  disponible: product.available,
  image_url: product.image,
  description: product.description,
});

// ===== UTILITAIRES =====

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-MG", {
    style: "currency",
    currency: "MGA",
    minimumFractionDigits: 0,
  }).format(price);