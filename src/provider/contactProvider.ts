import { getAxios } from "@/config/axios";
import type { Contact, CreateContact, UpdateContact, ContactResponse, ContactsResponse } from "@/types/contact";

export const contactProvider = {
  // GET /api/contact - Lister tous les contacts
  async findAll(): Promise<ContactsResponse> {
    const response = await getAxios().get("/api/contact");
    return response.data;
  },

  // GET /api/contact/{id} - Afficher un contact
  async findOne(id: number): Promise<ContactResponse> {
    const response = await getAxios().get(`/api/contact/${id}`);
    return response.data;
  },

  // POST /api/contact - Créer un contact
  async create(data: CreateContact): Promise<ContactResponse> {
    const response = await getAxios().post("/api/contact", data);
    return response.data;
  },

  // PUT /api/contact/{id} - Modifier un contact
  async update(id: number, data: UpdateContact): Promise<ContactResponse> {
    const response = await getAxios().put(`/api/contact/${id}`, data);
    return response.data;
  },

  // DELETE /api/contact/{id} - Supprimer un contact
  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const response = await getAxios().delete(`/api/contact/${id}`);
    return response.data;
  },

  // Marquer comme lu
  async markAsRead(id: number): Promise<ContactResponse> {
    return this.update(id, { lu: true });
  },

  // Récupérer les contacts non lus
  async findUnread(): Promise<ContactsResponse> {
    const response = await this.findAll();
    return {
      ...response,
      data: response.data.filter((contact) => !contact.lu),
    };
  },
};