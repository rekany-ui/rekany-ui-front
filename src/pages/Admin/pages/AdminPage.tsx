import { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/layout/AdminLayout';
import { DashboardPage } from './DashboardPage';
import { ContactsPage } from './ContactsPage';
import { ProductsPage } from './ProductsPage';
import type { Section, ToastType } from '../types';
import { useAuth } from '../hook/useAuth';
import { OrdersPage } from './OrdersPage';

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentSection, setCurrentSection] = useState<Section>('dashboard');
  const [toasts, setToasts] = useState<{ id: string; message: string; type: ToastType }[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleRefresh = useCallback(() => {
    showToast('Données rafraîchies', 'info');
  }, [showToast]);

  const renderPage = () => {
  switch (currentSection) {
    case 'dashboard':
      return (
        <DashboardPage
          showToast={showToast}
          onSectionChange={setCurrentSection}
        />
      );
    case 'contacts':
      return (
        <ContactsPage
          showToast={showToast}
          toasts={toasts}
          removeToast={removeToast}
        />
      );
    case 'produits':
      return (
        <ProductsPage
          showToast={showToast}
          toasts={toasts}
          removeToast={removeToast}
        />
      );
    case 'commandes':
      return <OrdersPage showToast={showToast} />;
    default:
      return null;
  }
};

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="spinner mx-auto" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <AdminLayout
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      onRefresh={handleRefresh}
    >
      {renderPage()}
    </AdminLayout>
  );
}
