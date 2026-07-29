export type { Contact, CreateContact, UpdateContact, ContactResponse, ContactsResponse } from '@/types/contact';
export type { Product, CreateProduct, UpdateProduct } from '@/types/product';
export { toContact } from '@/types/contact';
export { toProduct, toApiProduct, formatPrice } from '@/types/product';

export type Section = 'dashboard' | 'contacts' | 'produits';
export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type FormMode = 'create' | 'edit' | 'view';