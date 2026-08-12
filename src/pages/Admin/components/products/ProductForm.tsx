import { FaCheckCircle } from 'react-icons/fa';
import { Modal } from '../shared/Modal';
import Button from '@/components/ui/Button';
import { type Product } from '@/types/product';
import type { FormMode } from '@/types';
import { PRODUCT_FIELDS } from '../../constants/product.constants';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formValues: Partial<Product>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  mode: FormMode;
  editingId: string | null;
}

const UNIT_OPTIONS = [
  { value: 'kg', label: 'Kilogramme (kg)' },
  { value: 'g', label: 'Gramme (g)' },
  { value: 'L', label: 'Litre (L)' },
  { value: 'mL', label: 'Millilitre (mL)' },
  { value: 'pièce', label: 'Pièce' },
  { value: 'botte', label: 'Botte' },
  { value: 'sachet', label: 'Sachet' },
  { value: 'barquette', label: 'Barquette' },
  { value: 'unité', label: 'Unité' },
];

const CATEGORY_OPTIONS = [
  { value: 'céréales', label: 'Céréales' },
  { value: 'légumes', label: 'Légumes' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'légumineuses', label: 'Légumineuses' },
  { value: 'tubercules', label: 'Tubercules' },
  { value: 'oléagineux', label: 'Oléagineux' },
  { value: 'épices', label: 'Épices' },
  { value: 'plantes médicinales', label: 'Plantes médicinales' },
  { value: 'produits transformés', label: 'Produits transformés' },
  { value: 'boissons', label: 'Boissons' },
  { value: 'huiles', label: 'Huiles' },
  { value: 'autres', label: 'Autres' },
];

export function ProductForm({
  isOpen,
  onClose,
  onSubmit,
  formValues,
  onFormChange,
  mode,
  editingId
}: ProductFormProps) {
  if (!isOpen) return null;

  const title = mode === 'edit' ? 'Modifier le produit' : 'Nouveau produit';

  const handleSelectChange = (name: string, value: string) => {
    const event = {
      target: {
        name,
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onFormChange(event);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form className="p-6" onSubmit={onSubmit}>
        <div className="space-y-4">
          {PRODUCT_FIELDS.map((field) => {
            if (field.name === 'category') {
              return (
                <div key={field.name}>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    {field.label} {field.required ? <span className="text-red-400">*</span> : null}
                  </label>
                  <select
                    name={field.name}
                    required={field.required}
                    value={String(formValues[field.name] ?? '')}
                    onChange={(e) => handleSelectChange(field.name, e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-rekany-beige/50 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-rekany-light transition-shadow appearance-none"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (field.name === 'unit') {
              return (
                <div key={field.name}>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    {field.label} {field.required ? <span className="text-red-400">*</span> : null}
                  </label>
                  <select
                    name={field.name}
                    required={field.required}
                    value={String(formValues[field.name] ?? 'kg')}
                    onChange={(e) => handleSelectChange(field.name, e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-rekany-beige/50 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-rekany-light transition-shadow appearance-none"
                  >
                    {UNIT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (field.type === 'textarea') {
              return (
                <div key={field.name}>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    {field.label} {field.required ? <span className="text-red-400">*</span> : null}
                  </label>
                  <textarea
                    name={field.name}
                    required={field.required}
                    rows={field.rows ?? 3}
                    value={String(formValues[field.name] ?? '')}
                    onChange={onFormChange}
                    placeholder={field.placeholder}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-rekany-beige/50 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-rekany-light transition-shadow"
                  />
                </div>
              );
            }

            if (field.type === 'checkbox') {
              return (
                <div className="flex items-center gap-3 pt-1" key={field.name}>
                  <input
                    id={`chk-${field.name}`}
                    name={field.name}
                    type="checkbox"
                    checked={Boolean(formValues[field.name])}
                    onChange={onFormChange}
                    className="h-4 w-4 rounded border-gray-300 text-rekany-dark focus:ring-rekany-light"
                  />
                  <label htmlFor={`chk-${field.name}`} className="text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                </div>
              );
            }

            return (
              <div key={field.name}>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  {field.label} {field.required ? <span className="text-red-400">*</span> : null}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  value={String(formValues[field.name] ?? '')}
                  onChange={onFormChange}
                  required={field.required}
                  step={(field as any).step}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-gray-200 bg-rekany-beige/50 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-rekany-light transition-shadow"
                />
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
          <Button variant="primary" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit" icon>
            <FaCheckCircle className="text-xs" />
            <span>{editingId ? 'Mettre à jour' : 'Enregistrer'}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}

