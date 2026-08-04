import { Env } from "@/config/env";

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
  created_at?: string;
  updated_at?: string;
}

export interface CreateProduct {
  name: string;
  category: string;
  price: number;
  unit: string;
  certification: string;
  origin: string;
  available: boolean;
  image: File;
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
  image?: File | null;
  description?: string;
}


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
  created_at?: string;
  updated_at?: string;
}

const toAbsoluteImageUrl = (imageUrl: string | null): string => {
  if (!imageUrl) return "";

  if (/^(https?:)?\/\//.test(imageUrl) || imageUrl.startsWith("data:") || imageUrl.startsWith("blob:")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return `${Env.API_URL?.replace(/\/$/, "") ?? ""}${imageUrl}`;
  }

  return imageUrl;
};

export const toProduct = (api: ApiProduct): Product => ({
  id: String(api.id),
  name: api.nom,
  category: api.categorie,
  price: Number(api.prix),
  unit: api.unite,
  certification: api.certification,
  origin: api.origine,
  available: Boolean(api.disponible),
  image: toAbsoluteImageUrl(api.image_url),
  description: api.description,
  created_at: api.created_at,
  updated_at: api.updated_at,
});

export const toApiProduct = (product: CreateProduct) => ({
  nom: product.name,
  categorie: product.category,
  prix: product.price,
  unite: product.unit,
  certification: product.certification,
  origine: product.origin,
  disponible: product.available,
  image: product.image,
  description: product.description,
});


export const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-MG", {
    style: "currency",
    currency: "MGA",
    minimumFractionDigits: 0,
  }).format(price);
