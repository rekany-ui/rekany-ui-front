import type { Contact } from '@/types/contact';

export const CONTACT_FIELDS = [
  { name: 'nom', label: 'Nom complet', type: 'text', required: true, placeholder: 'Marie Rasoa' },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'marie@email.com' },
  { name: 'telephone', label: 'Téléphone', type: 'text', required: true, placeholder: '032 12 345 67' },
  { name: 'entreprise', label: 'Entreprise', type: 'text', required: true, placeholder: 'Bio Madagascar SARL' },
  { name: 'sujet', label: 'Sujet', type: 'text', required: true, placeholder: 'Commande en gros' },
  { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Détails de la demande...', rows: 4 },
] as const;

export const getDefaultContact = (): Omit<Contact, 'id' | 'created_at' | 'updated_at'> => ({
  nom: '',
  email: '',
  telephone: '',
  entreprise: '',
  sujet: '',
  message: '',
  lu: false,
});