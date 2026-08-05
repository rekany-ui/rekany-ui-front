import { getAxios } from "@/config/axios";
import type { CartItem } from "@/context/cart-context";

export interface CreateOrder {
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  items: CartItem[];
  total: number;
  notes?: string;
}

export interface Order {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  items: CartItem[];
  total: number;
  statut: 'en_attente' | 'confirmee' | 'expediee' | 'livree' | 'annulee';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const orderProvider = {
  async create(data: CreateOrder): Promise<Order> {
    const { data: result } = await getAxios().post("/api/order", data);
    return result.data;
  },

  async findAll(): Promise<Order[]> {
    const { data } = await getAxios().get("/api/order");
    return data.data;
  },

  async findOne(id: number): Promise<Order> {
    const { data } = await getAxios().get(`/api/order/${id}`);
    return data.data;
  },

  async updateStatus(id: number, statut: Order['statut']): Promise<Order> {
    const { data } = await getAxios().put(`/api/order/${id}`, { statut });
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await getAxios().delete(`/api/order/${id}`);
  },
};