import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductList } from '../components/products/ProductList';
import { ProductForm } from '../components/products/ProductForm';
import { ProductDetails } from '../components/products/ProductDetails';
import { DeleteModal } from '../components/shared/DeleteModal';
import { ToastContainer } from '../components/shared/ToastContainer';
import type { Product, FormMode, ToastType, CreateProduct, UpdateProduct } from '@/types';
import { productProvider } from '@/provider/productProvider';
import { getDefaultProduct } from '../constants/product.constants';

interface ProductsPageProps {
  showToast: (message: string, type: ToastType) => void;
  toasts: { id: string; message: string; type: ToastType }[];
  removeToast: (id: string) => void;
}

export function ProductsPage({ showToast, toasts, removeToast }: ProductsPageProps) {
  const queryClient = useQueryClient();
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [formValues, setFormValues] = useState<Partial<Product>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentViewProduct, setCurrentViewProduct] = useState<Product | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);


  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productProvider.findAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateProduct) => productProvider.create(data),

    onSuccess: (newProduct) => {
      queryClient.setQueryData(['products'], (old: Product[] = []) => [...old, newProduct]);
      showToast('Produit créé avec succès', 'success');
      setFormModalOpen(false);
      setFormValues({});
      setImageFile(null);
      setImagePreview(null);
    },

    onError: (error: any) => {
      console.error('Erreur création:', error);
      if (error.response) {
        showToast(error.response.data?.message || 'Erreur lors de la création', 'error');
      } else {
        showToast('Erreur réseau lors de la création', 'error');
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProduct }) =>
      productProvider.update(id, data),
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(['products'], (old: Product[] = []) =>
        old.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      showToast('Produit modifié avec succès', 'success');
      setFormModalOpen(false);
      setFormValues({});
      setImageFile(null);
      setImagePreview(null);
    },
    onError: (error: any) => {
      console.error('Erreur mise à jour:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        showToast(error.response.data?.message || 'Erreur lors de la modification', 'error');
      } else {
        showToast('Erreur réseau lors de la modification', 'error');
      }
    },
  });

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
    onError: (error: any) => {
      console.error('Erreur suppression:', error);
      showToast('Erreur lors de la suppression', 'error');
    },
  });

  const handleOpenCreateForm = () => {
    setFormMode('create');
    setEditingId(null);
    setFormValues(getDefaultProduct());
    setImageFile(null);
    setImagePreview(null);
    setFormModalOpen(true);
  };

  const handleOpenEditForm = (product: Product) => {
    setFormMode('edit');
    setEditingId(product.id);
    setFormValues(product);
    setImagePreview(product.image || null);
    setImageFile(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      if (formMode === 'edit' && formValues.image) {
        setImagePreview(formValues.image);
      } else {
        setImagePreview(null);
      }
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formMode === 'create') {
      if (!imageFile) {
        showToast('Veuillez sélectionner une image', 'error');
        return;
      }

      const createData: CreateProduct = {
        name: formValues.name || '',
        category: formValues.category || '',
        price: formValues.price || 0,
        unit: formValues.unit || '',
        certification: formValues.certification || '',
        origin: formValues.origin || '',
        available: formValues.available || false,
        image: imageFile,
        description: formValues.description || '',
      };
      createMutation.mutate(createData);
    } else {
      const updateData: UpdateProduct = {};

      if (formValues.name !== undefined) updateData.name = formValues.name;
      if (formValues.category !== undefined) updateData.category = formValues.category;
      if (formValues.price !== undefined) updateData.price = formValues.price;
      if (formValues.unit !== undefined) updateData.unit = formValues.unit;
      if (formValues.certification !== undefined) updateData.certification = formValues.certification;
      if (formValues.origin !== undefined) updateData.origin = formValues.origin;
      if (formValues.available !== undefined) updateData.available = formValues.available;
      if (formValues.description !== undefined) updateData.description = formValues.description;

      if (imageFile) {
        updateData.image = imageFile;
      }

      updateMutation.mutate({ id: Number(editingId), data: updateData });
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
        onClose={() => {
          setFormModalOpen(false);
          setImageFile(null);
          setImagePreview(null);
        }}
        onSubmit={handleSubmitForm}
        formValues={formValues}
        onFormChange={handleFormChange}
        onFileChange={handleFileChange}
        imagePreview={imagePreview}
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