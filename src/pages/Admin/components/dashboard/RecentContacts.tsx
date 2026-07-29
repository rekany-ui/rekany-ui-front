import type { Contact } from '@/types';
import { FaUserPlus, FaArrowRight } from 'react-icons/fa';
import Button from '@/components/ui/Button';

interface RecentContactsProps {
  contacts: Contact[];
  onViewAll: () => void;
  onViewContact: (id: number) => void;
  formatDate: (date?: string) => string;
}

export function RecentContacts({ contacts, onViewAll, onViewContact, formatDate }: RecentContactsProps) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <FaUserPlus className="text-xs text-rekany-dark" />
          Derniers contacts
        </h3>
        <Button
          variant="primary"
          onClick={onViewAll}
          className="px-4! py-1.5! text-xs! rounded-full! bg-rekany-orange hover:bg-rekany-dark"
        >
          Voir tout <FaArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
      <div className="divide-y divide-gray-50">
        {contacts.slice(0, 5).length === 0 ? (
          <div className="p-6 text-center text-rekany-gray/40 text-sm">
            <FaUserPlus className="mr-2 inline" />Aucun contact
          </div>
        ) : (
          contacts.slice(0, 5).map((contact) => (
            <button
              key={contact.id}
              type="button"
              onClick={() => onViewContact(contact.id)}
              className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-rekany-beige/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rekany-light/20 text-rekany-dark font-bold text-sm">
                {contact.nom.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{contact.nom}</p>
                <p className="truncate text-xs text-rekany-gray/40">{contact.sujet}</p>
              </div>
              <span className="text-xs text-rekany-gray/40 shrink-0">{formatDate(contact.created_at)}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}