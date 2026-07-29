
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

export const toContact = (data: Record<string, unknown>): Contact => ({
  id: data.id as number,
  nom: data.nom as string,
  email: data.email as string,
  telephone: data.telephone as string,
  entreprise: data.entreprise as string,
  sujet: data.sujet as string,
  message: data.message as string,
  lu: Boolean(data.lu),
  created_at: data.created_at as string | undefined,
  updated_at: data.updated_at as string | undefined,
});