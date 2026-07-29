import type { Contact } from '@/types';
import { FaEnvelope, FaPhone, FaTag, FaTimes } from 'react-icons/fa';

interface ContactDetailsProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  formatDate: (date?: string) => string;
}

export function ContactDetails({ contact, isOpen, onClose, formatDate }: ContactDetailsProps) {
  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white border border-white/20 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/90 px-6 py-4 backdrop-blur-sm">
          <h3 className="text-lg font-extrabold text-gray-900">Détails du contact</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rekany-light/20 text-2xl font-extrabold text-rekany-dark">
              {contact.nom?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-gray-900">{contact.nom}</h4>
              <p className="text-sm text-rekany-gray/60">{contact.entreprise}</p>
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 rounded-xl bg-rekany-beige p-3">
              <FaEnvelope className="text-rekany-gray/40" />
              <span className="text-sm text-gray-700">{contact.email}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-rekany-beige p-3">
              <FaPhone className="text-rekany-gray/40" />
              <span className="text-sm text-gray-700">{contact.telephone}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-rekany-beige p-3">
              <FaTag className="text-rekany-gray/40" />
              <span className="text-sm text-gray-700">{contact.sujet}</span>
            </div>
            <div className="rounded-xl bg-rekany-beige p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-rekany-gray/40">
                Message
              </p>
              <p className="whitespace-pre-wrap text-sm text-gray-700">{contact.message}</p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-rekany-gray/40">
                Créé le {formatDate(contact.created_at)}
              </span>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold ${contact.lu
                ? 'bg-gray-100 text-gray-500'
                : 'bg-rekany-fair/20 text-rekany-fair'
                }`}>
                {contact.lu ? 'Lu' : 'Non lu'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}