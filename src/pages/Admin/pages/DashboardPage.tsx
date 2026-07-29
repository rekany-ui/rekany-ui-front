import { useQuery } from '@tanstack/react-query';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { RecentContacts } from '../components/dashboard/RecentContacts';
import { RecentProducts } from '../components/dashboard/RecentProducts';
import { contactProvider } from '@/provider/contactProvider';
import { productProvider } from '@/provider/productProvider';
import type { Section, ToastType } from '@/types';

interface DashboardPageProps {
  showToast: (message: string, type: ToastType) => void;
  onSectionChange: (section: Section) => void;
}

export function DashboardPage({ onSectionChange }: DashboardPageProps) {
  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await contactProvider.findAll();
      return response.data;
    },
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productProvider.findAll(),
  });

  const isLoading = contactsLoading || productsLoading;

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

  const handleViewContact = () => {
    onSectionChange('contacts');
  };

  const handleViewProduct = () => {
    onSectionChange('produits');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardStats contacts={contacts} products={products} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentContacts
          contacts={contacts}
          onViewAll={() => onSectionChange('contacts')}
          onViewContact={handleViewContact}
          formatDate={formatDate}
        />
        <RecentProducts
          products={products}
          onViewAll={() => onSectionChange('produits')}
          onViewProduct={handleViewProduct}
        />
      </div>
    </div>
  );
}