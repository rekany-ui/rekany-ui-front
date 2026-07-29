// src/providers/productProvider.ts

import { getAxios } from "@/config/axios";
import type { Product, CreateProduct, UpdateProduct } from "@/types/product";
import { toProduct, toApiProduct } from "@/types/product";
import { mockProducts } from "@/data/products";

// Mettre à false quand le backend est prêt
const USE_MOCK = true;

export const productProvider = {
  async findAll(): Promise<Product[]> {
    if (USE_MOCK) {
      console.log("📦 Mode mock: Utilisation des données locales");
      return mockProducts;
    }

    try {
      const { data } = await getAxios().get("/api/produit");
      return data.data.map(toProduct);
    } catch (error) {
      console.warn("⚠️ Erreur backend, utilisation des données mock:", error);
      return mockProducts;
    }
  },

  async findOne(id: string): Promise<Product> {
    if (USE_MOCK) {
      const product = mockProducts.find((p) => p.id === id);
      if (!product) throw new Error(`Produit ${id} non trouvé`);
      return product;
    }

    try {
      const { data } = await getAxios().get(`/api/produit/${id}`);
      return toProduct(data.data);
    } catch (error) {
      console.warn(`⚠️ Erreur backend pour l'ID ${id}, utilisation des données mock`);
      const product = mockProducts.find((p) => p.id === id);
      if (!product) throw new Error(`Produit ${id} non trouvé`);
      return product;
    }
  },

  async create(data: CreateProduct): Promise<Product> {
    if (USE_MOCK) {
      const newProduct: Product = {
        id: `mock-${Date.now()}`,
        ...data,
      };
      mockProducts.push(newProduct);
      console.log("📦 Mock: Produit créé", newProduct);
      return newProduct;
    }

    try {
      const payload = toApiProduct(data);
      const { data: result } = await getAxios().post("/api/produit", payload);
      return toProduct(result.data);
    } catch (error) {
      console.warn("⚠️ Erreur backend, création en mode mock");
      const newProduct: Product = {
        id: `mock-${Date.now()}`,
        ...data,
      };
      mockProducts.push(newProduct);
      return newProduct;
    }
  },

  async update(id: string, data: UpdateProduct): Promise<Product> {
    if (USE_MOCK) {
      const index = mockProducts.findIndex((p) => p.id === id);
      if (index === -1) throw new Error(`Produit ${id} non trouvé`);
      const updated = { ...mockProducts[index], ...data };
      mockProducts[index] = updated;
      console.log("📦 Mock: Produit mis à jour", updated);
      return updated;
    }

    try {
      const payload = toApiProduct(data as CreateProduct);
      const { data: result } = await getAxios().put(`/api/produit/${id}`, payload);
      return toProduct(result.data);
    } catch (error) {
      console.warn(`⚠️ Erreur backend pour l'update ID ${id}, utilisation des données mock`);
      const index = mockProducts.findIndex((p) => p.id === id);
      if (index === -1) throw new Error(`Produit ${id} non trouvé`);
      const updated = { ...mockProducts[index], ...data };
      mockProducts[index] = updated;
      return updated;
    }
  },

  async delete(id: string): Promise<void> {
    if (USE_MOCK) {
      const index = mockProducts.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
        console.log(`📦 Mock: Produit ${id} supprimé`);
      }
      return;
    }

    try {
      await getAxios().delete(`/api/produit/${id}`);
    } catch (error) {
      console.warn(`⚠️ Erreur backend pour la suppression ID ${id}, suppression en mode mock`);
      const index = mockProducts.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
      }
    }
  },

  async getCategories(): Promise<string[]> {
    const products = await this.findAll();
    const categories = products.map((p) => p.category);
    return [...new Set(categories)].sort();
  },

  async getOrigins(): Promise<string[]> {
    const products = await this.findAll();
    const origins = products.map((p) => p.origin);
    return [...new Set(origins)].sort();
  },

  async getCertifications(): Promise<string[]> {
    const products = await this.findAll();
    const certifications = products.map((p) => p.certification);
    return [...new Set(certifications)].sort();
  },

  async getMaxPrice(): Promise<number> {
    const products = await this.findAll();
    const prices = products.map((p) => p.price);
    return Math.max(...prices, 50000);
  },
};