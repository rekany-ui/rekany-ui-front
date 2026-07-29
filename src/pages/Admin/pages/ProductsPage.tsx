import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductList } from '../components/products/ProductList';
import { ProductForm } from '../components/products/ProductForm';
import { ProductDetails } from '../components/products/ProductDetails';
import { DeleteModal } from '../components/shared/DeleteModal';
import { ToastContainer } from '../components/shared/ToastContainer';
import type { Product, FormMode, ToastType, CreateProduct } from '@/types';
import { productProvider } from '@/provider/productProvider';
import { getDefaultProduct } from '../constants/product.constants';

interface ProductsPageProps {
  showToast: (message: string, type: ToastType) => void;
  toasts: { id: string; message: string; type: ToastType }[];
  removeToast: (id: string) => void;
}

export function ProductsPage({ showToast, toasts, removeToast }: ProductsPageProps) {
  const queryClient = useQueryClient();

  // États des modals
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [formValues, setFormValues] = useState<Partial<Product>>({});
  const [currentViewProduct, setCurrentViewProduct] = useState<Product | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // ====== REACT QUERY ======

  // Query pour récupérer tous les produits
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productProvider.findAll(),
  });

  // Mutation pour créer un produit
  const createMutation = useMutation({
    mutationFn: (data: CreateProduct) => productProvider.create(data),
    onSuccess: (newProduct) => {
      queryClient.setQueryData(['products'], (old: Product[] = []) => [...old, newProduct]);
      showToast('Produit créé avec succès', 'success');
      setFormModalOpen(false);
      setFormValues({});
    },
    onError: () => {
      showToast("Erreur lors de la création du produit", 'error');
    },
  });

  // Mutation pour modifier un produit
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      productProvider.update(id, data),
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(['products'], (old: Product[] = []) =>
        old.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      showToast('Produit modifié avec succès', 'success');
      setFormModalOpen(false);
      setFormValues({});
    },
    onError: () => {
      showToast("Erreur lors de la modification du produit", 'error');
    },
  });

  // Mutation pour supprimer un produit
  const deleteMutation = useMutation({
    mutationFn: (id: number) => productProvider.delete(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(['products'], (old: Product[] = []) =>
        old.filter((p) => p.id !== String(id))
      );
      showToast('Produit supprimé avec succès', 'success');
      setDeleteModalOpen(false);
      setDeleteTargetId(null);
    },
    onError: () => {
      showToast("Erreur lors de la suppression du produit", 'error');
    },
  });

  // ====== HANDLERS ======

  const handleOpenCreateForm = () => {
    setFormMode('create');
    setEditingId(null);
    setFormValues(getDefaultProduct());
    setFormModalOpen(true);
  };

  const handleOpenEditForm = (product: Product) => {
    setFormMode('edit');
    setEditingId(product.id);
    setFormValues(product);
    setFormModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormValues((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormValues((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formMode === 'create') {
      createMutation.mutate(formValues as CreateProduct);
    } else {
      updateMutation.mutate({ id: Number(editingId), data: formValues });
    }
  };

  const handleViewProduct = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setCurrentViewProduct(product);
      setViewModalOpen(true);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    deleteMutation.mutate(Number(deleteTargetId));
  };

  const handleExportProducts = () => {
    if (products.length === 0) {
      showToast('Aucun produit à exporter', 'warning');
      return;
    }

    let csv = 'Nom,Catégorie,Prix,Unité,Origine,Certification,Disponible\n';
    products.forEach((product) => {
      csv += `"${product.name}","${product.category}",${product.price},"${product.unit}","${product.origin}","${product.certification}",${product.available ? 'Oui' : 'Non'}\n`;
    });

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `produits_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast('Export des produits terminé', 'success');
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
      <ProductList
        products={products}
        onView={handleViewProduct}
        onEdit={handleOpenEditForm}
        onDelete={handleDeleteProduct}
        onExport={handleExportProducts}
        onAdd={handleOpenCreateForm}
      />

      <ProductForm
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handleSubmitForm}
        formValues={formValues}
        onFormChange={handleFormChange}
        mode={formMode}
        editingId={editingId}
      />

      <ProductDetails
        product={currentViewProduct}
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