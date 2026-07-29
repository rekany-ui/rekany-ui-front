import { getAxios } from "@/config/axios";
import type { Product, CreateProduct, UpdateProduct } from "@/types/product";
import { toProduct, toApiProduct } from "@/types/product";

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
    const payload = toApiProduct(data);
    const { data: result } = await getAxios().post("/api/produit", payload);
    return toProduct(result.data);
  },

  async update(id: number, data: UpdateProduct): Promise<Product> {
    const payload = toApiProduct(data as CreateProduct);
    const { data: result } = await getAxios().put(`/api/produit/${id}`, payload);
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

