import type { Product } from '@/types/product';

interface ProductField {
  name: keyof Product;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'textarea' | 'file';
  required: boolean;
  placeholder?: string;
  step?: string;
  rows?: number;
}

export const PRODUCT_FIELDS: ProductField[] = [
  { name: 'name', label: 'Nom du produit', type: 'text', required: true, placeholder: 'Riz Bio' },
  { name: 'category', label: 'Catégorie', type: 'text', required: true, placeholder: 'Céréales' },
  { name: 'price', label: 'Prix (MGA)', type: 'number', required: true, placeholder: '5000', step: 'any' },
  { name: 'unit', label: 'Unité', type: 'text', required: true, placeholder: 'kg' },
  { name: 'certification', label: 'Certification', type: 'text', required: true, placeholder: 'Bio' },
  { name: 'origin', label: 'Origine', type: 'text', required: true, placeholder: 'Madagascar' },
  { name: 'available', label: 'Disponible', type: 'checkbox', required: false },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Description du produit...', rows: 3 },
  { name: 'image', label: "Image du produit", type: 'file', required: false },
];

export const getDefaultProduct = (): Omit<Product, 'id'> => ({
  name: '',
  category: '',
  price: 0,
  unit: 'kg',
  certification: '',
  origin: '',
  available: false,
  description: '',
  image: '',
});