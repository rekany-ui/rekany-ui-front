import { useState, useMemo } from 'react';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { SearchBar } from '../shared/SearchBar';
import { Pagination } from '../shared/Pagination';
import Button from '@/components/ui/Button';
import type { Contact } from '@/types';
import { ITEMS_PER_PAGE } from '../../constants/ndex';

interface ContactListProps {
  contacts: Contact[];
  onView: (id: number) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
  onExport: () => void;
  onAdd: () => void;
  formatDate: (date?: string) => string;
}

export function ContactList({ contacts, onView, onEdit, onDelete, onExport, onAdd }: ContactListProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return contacts;
    return contacts.filter(
      (c) =>
        c.nom.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.entreprise.toLowerCase().includes(query) ||
        c.sujet.toLowerCase().includes(query)
    );
  }, [contacts, search]);

  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un contact..." />
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" onClick={onExport}>
            Exporter
          </Button>
          <Button variant="primary" onClick={onAdd} icon>
            Nouveau contact
          </Button>
        </div>
      </div>

      <div className="table-responsive overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-rekany-beige/80 text-rekany-gray/60 text-[10px] uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-5 py-3.5">Nom</th>
              <th className="px-5 py-3.5">Email</th>
              <th className="px-5 py-3.5">Téléphone</th>
              <th className="px-5 py-3.5">Entreprise</th>
              <th className="px-5 py-3.5">Sujet</th>
              <th className="px-5 py-3.5">Statut</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedContacts.map((contact) => (
              <tr key={contact.id} className="group table-row-hover transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rekany-light/20 text-[10px] font-bold text-rekany-dark">
                      {contact.nom.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900">{contact.nom}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-gray-500">{contact.email}</td>
                <td className="px-5 py-3.5 text-gray-500">{contact.telephone}</td>
                <td className="px-5 py-3.5 text-gray-500">{contact.entreprise}</td>
                <td className="px-5 py-3.5 text-gray-500">{contact.sujet}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${contact.lu
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-rekany-fair/20 text-rekany-fair'
                    }`}>
                    <span className={`status-dot ${contact.lu ? 'offline' : 'pending'}`} />
                    {contact.lu ? 'Lu' : 'Non lu'}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => onView(contact.id)}
                      className="rounded-lg p-1.5 text-rekany-light transition-colors hover:bg-rekany-light/10"
                      title="Voir"
                    >
                      <FaEye className="text-xs" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(contact)}
                      className="rounded-lg p-1.5 text-rekany-dark transition-colors hover:bg-rekany-dark/10"
                      title="Modifier"
                    >
                      <FaPen className="text-xs" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(contact.id)}
                      className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50"
                      title="Supprimer"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={filteredContacts.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}