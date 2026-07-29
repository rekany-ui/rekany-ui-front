
export interface Contact {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  sujet: string;
  message: string;
  lu: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateContact {
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  sujet: string;
  message: string;
}

export interface UpdateContact {
  nom?: string;
  email?: string;
  telephone?: string;
  entreprise?: string;
  sujet?: string;
  message?: string;
  lu?: boolean;
}

// ===== TYPES API =====

export interface ContactResponse {
  success: boolean;
  data: Contact;
  message?: string;
}

export interface ContactsResponse {
  success: boolean;
  data: Contact[];
  message?: string;
}

// ===== UTILITAIRES =====

export const toContact = (data: any): Contact => ({
  id: data.id,
  nom: data.nom,
  email: data.email,
  telephone: data.telephone,
  entreprise: data.entreprise,
  sujet: data.sujet,
  message: data.message,
  lu: Boolean(data.lu),
  created_at: data.created_at,
  updated_at: data.updated_at,
});