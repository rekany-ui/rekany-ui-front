import { getAxios } from "@/config/axios";
import type { Product, CreateProduct, UpdateProduct } from "@/types/product";
import { toProduct } from "@/types/product";

export const productProvider = {
  async findAll(): Promise<Product[]> {
    const { data } = await getAxios().get("/api/produit");
    return data.data.map(toProduct);
  },

  async findOne(id: number): Promise<Product> {
    const { data } = await getAxios().get(`/api/produit/${id}`);
    return toProduct(data.data);
  },

  async create(data: CreateProduct): Promise<Product> {
    const formData = new FormData();

    formData.append('nom', data.name);
    formData.append('categorie', data.category);
    formData.append('prix', String(data.price));
    formData.append('unite', data.unit);
    formData.append('certification', data.certification);
    formData.append('origine', data.origin);
    formData.append('disponible', data.available ? '1' : '0');
    formData.append('description', data.description);

    if (data.image) {
      formData.append('image', data.image);
    }

    const { data: result } = await getAxios().post("/api/produit", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return toProduct(result.data);
  },

  async update(id: number, data: UpdateProduct): Promise<Product> {
    const formData = new FormData();

    if (data.name !== undefined) formData.append('nom', data.name);
    if (data.category !== undefined) formData.append('categorie', data.category);
    if (data.price !== undefined) formData.append('prix', String(data.price));
    if (data.unit !== undefined) formData.append('unite', data.unit);
    if (data.certification !== undefined) formData.append('certification', data.certification);
    if (data.origin !== undefined) formData.append('origine', data.origin);
    if (data.available !== undefined) formData.append('disponible', data.available ? '1' : '0');
    if (data.description !== undefined) formData.append('description', data.description);

    if (data.image) {
      formData.append('image', data.image);
    }

    formData.append('_method', 'PUT');

    const { data: result } = await getAxios().post(`/api/produit/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return toProduct(result.data);
  },

  async delete(id: number): Promise<void> {
    await getAxios().delete(`/api/produit/${id}`);
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