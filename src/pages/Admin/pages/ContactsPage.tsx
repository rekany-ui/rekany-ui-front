import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ContactList } from '../components/contacts/ContactList';
import { ContactForm } from '../components/contacts/ContactForm';
import { DeleteModal } from '../components/shared/DeleteModal';
import { ToastContainer } from '../components/shared/ToastContainer';
import type { Contact, CreateContact, FormMode, ToastType } from '@/types';
import { contactProvider } from '@/provider/contactProvider';
import { getDefaultContact } from '../constants/contact.constants';
import { ContactDetails } from '../components/contacts/ContactDetails';

interface ContactsPageProps {
  showToast: (message: string, type: ToastType) => void;
  toasts: { id: string; message: string; type: ToastType }[];
  removeToast: (id: string) => void;
}

export function ContactsPage({ showToast, toasts, removeToast }: ContactsPageProps) {
  const queryClient = useQueryClient();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [formValues, setFormValues] = useState<Partial<Contact>>({});
  const [currentViewContact, setCurrentViewContact] = useState<Contact | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);


  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await contactProvider.findAll();
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateContact) => contactProvider.create(data),
    onSuccess: (response) => {
      queryClient.setQueryData(['contacts'], (old: Contact[] = []) => [...old, response.data]);
      showToast('Contact créé avec succès', 'success');
      setFormModalOpen(false);
      setFormValues({});
    },
    onError: () => {
      showToast("Erreur lors de la création du contact", 'error');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Contact> }) =>
      contactProvider.update(id, data),
    onSuccess: (response) => {
      queryClient.setQueryData(['contacts'], (old: Contact[] = []) =>
        old.map((c) => (c.id === response.data.id ? response.data : c))
      );
      showToast('Contact modifié avec succès', 'success');
      setFormModalOpen(false);
      setFormValues({});
    },
    onError: () => {
      showToast("Erreur lors de la modification du contact", 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => contactProvider.delete(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(['contacts'], (old: Contact[] = []) =>
        old.filter((c) => c.id !== id)
      );
      showToast('Contact supprimé avec succès', 'success');
      setDeleteModalOpen(false);
      setDeleteTargetId(null);
    },
    onError: () => {
      showToast("Erreur lors de la suppression du contact", 'error');
    },
  });


  const handleOpenCreateForm = () => {
    setFormMode('create');
    setEditingId(null);
    setFormValues(getDefaultContact());
    setFormModalOpen(true);
  };

  const handleOpenEditForm = (contact: Contact) => {
    setFormMode('edit');
    setEditingId(contact.id);
    setFormValues(contact);
    setFormModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormValues((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

 const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (formMode === 'create') {
    createMutation.mutate({
      nom: formValues.nom ?? '',
      email: formValues.email ?? '',
      telephone: formValues.telephone ?? '',
      entreprise: formValues.entreprise ?? '',
      sujet: formValues.sujet ?? '',
      message: formValues.message ?? '',
    });
  } else {
    updateMutation.mutate({ id: editingId!, data: formValues });
  }
};

  const handleViewContact = (id: number) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      setCurrentViewContact(contact);
      setViewModalOpen(true);
    }
  };

  const handleDeleteContact = (id: number) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    deleteMutation.mutate(deleteTargetId);
  };

  const handleExportContacts = () => {
    if (contacts.length === 0) {
      showToast('Aucun contact à exporter', 'warning');
      return;
    }

    let csv = 'Nom,Email,Téléphone,Entreprise,Sujet,Lu\n';
    contacts.forEach((contact) => {
      csv += `"${contact.nom}","${contact.email}","${contact.telephone}","${contact.entreprise}","${contact.sujet}",${contact.lu ? 'Oui' : 'Non'}\n`;
    });

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `contacts_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast('Export des contacts terminé', 'success');
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner mx-auto" />
      </div>
    );
  }

  return (
    <>
      <ContactList
        contacts={contacts}
        onView={handleViewContact}
        onEdit={handleOpenEditForm}
        onDelete={handleDeleteContact}
        onExport={handleExportContacts}
        onAdd={handleOpenCreateForm}
        formatDate={formatDate}
      />

      <ContactForm
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleSubmitForm}
        formValues={formValues}
        onFormChange={handleFormChange}
        mode={formMode}
        editingId={editingId}
      />

      <ContactDetails
        contact={currentViewContact}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        formatDate={formatDate}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}