import { FaCheckCircle } from 'react-icons/fa';
import { Modal } from '../shared/Modal';
import Button from '@/components/ui/Button';
import { type Contact } from '@/types/contact';
import type { FormMode } from '@/types';
import { CONTACT_FIELDS } from '../../constants/contact.constants';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formValues: Partial<Contact>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  mode: FormMode;
  editingId: number | null;
}

export function ContactForm({
  isOpen,
  onClose,
  onSubmit,
  formValues,
  onFormChange,
  mode,
  editingId
}: ContactFormProps) {
  if (!isOpen) return null;

  const title = mode === 'edit' ? 'Modifier le contact' : 'Nouveau contact';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form className="p-6" onSubmit={onSubmit}>
        <div className="space-y-4">
          {CONTACT_FIELDS.map((field) => {
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