import { getAxios } from "@/config/axios";
import type { CreateContact, UpdateContact, ContactResponse, ContactsResponse } from "@/types/contact";

export const contactProvider = {
  async findAll(): Promise<ContactsResponse> {
    const response = await getAxios().get("/api/contact");
    return response.data;
  },

  async findOne(id: number): Promise<ContactResponse> {
    const response = await getAxios().get(`/api/contact/${id}`);
    return response.data;
  },

  async create(data: CreateContact): Promise<ContactResponse> {
    const response = await getAxios().post("/api/contact", data);
    return response.data;
  },

  async update(id: number, data: UpdateContact): Promise<ContactResponse> {
    const response = await getAxios().put(`/api/contact/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const response = await getAxios().delete(`/api/contact/${id}`);
    return response.data;
  },

  async markAsRead(id: number): Promise<ContactResponse> {
    return this.update(id, { lu: true });
  },

  async findUnread(): Promise<ContactsResponse> {
    const response = await this.findAll();
    return {
      ...response,
      data: response.data.filter((contact) => !contact.lu),
    };
  },
};