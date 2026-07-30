import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderProvider, type Order } from '@/provider/orderProvider';
import { formatPrice } from '@/types/product';
import type { ToastType } from '../types';

interface OrdersPageProps {
  showToast: (message: string, type: ToastType) => void;
}

const STATUS_LABELS: Record<Order['statut'], string> = {
  en_attente: 'En attente',
  confirmee: 'Confirmée',
  expediee: 'Expédiée',
  livree: 'Livrée',
  annulee: 'Annulée',
};

const STATUS_COLORS: Record<Order['statut'], string> = {
  en_attente: 'bg-amber-100 text-amber-700',
  confirmee: 'bg-blue-100 text-blue-700',
  expediee: 'bg-purple-100 text-purple-700',
  livree: 'bg-emerald-100 text-emerald-700',
  annulee: 'bg-red-100 text-red-700',
};

export function OrdersPage({ showToast }: OrdersPageProps) {
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderProvider.findAll(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, statut }: { id: number; statut: Order['statut'] }) =>
      orderProvider.updateStatus(id, statut),
    onSuccess: (updated) => {
      queryClient.setQueryData(['orders'], (old: Order[] = []) =>
        old.map((o) => (o.id === updated.id ? updated : o))
      );
      showToast('Statut mis à jour', 'success');
    },
    onError: () => {
      showToast('Erreur lors de la mise à jour', 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => orderProvider.delete(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(['orders'], (old: Order[] = []) => old.filter((o) => o.id !== id));
      showToast('Commande supprimée', 'success');
    },
    onError: () => {
      showToast('Erreur lors de la suppression', 'error');
    },
  });

  const handleDelete = (id: number) => {
    if (!confirm('Supprimer cette commande ?')) return;
    deleteMutation.mutate(id);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner mx-auto" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Commandes</h1>
        <span className="text-sm text-rekany-gray/60">
          {orders.length} commande{orders.length > 1 ? 's' : ''}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-sm text-rekany-gray/60">
          Aucune commande pour le moment.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const expanded = expandedId === order.id;
            return (
              <div key={order.id} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : order.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{order.nom}</p>
                    <p className="text-xs text-rekany-gray/60">
                      {order.email} · {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[order.statut]}`}>
                      {STATUS_LABELS[order.statut]}
                    </span>
                    <span className="font-bold text-rekany-dark">{formatPrice(order.total)}</span>
                  </div>
                </button>

                {expanded && (
                  <div className="border-t border-gray-100 px-5 py-4 space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2 text-sm">
                      <div>
                        <p className="text-xs font-semibold uppercase text-rekany-gray/50">Téléphone</p>
                        <p className="text-gray-800">{order.telephone}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-rekany-gray/50">Adresse</p>
                        <p className="text-gray-800">{order.adresse}</p>
                      </div>
                      {order.notes && (
                        <div className="sm:col-span-2">
                          <p className="text-xs font-semibold uppercase text-rekany-gray/50">Notes</p>
                          <p className="text-gray-800">{order.notes}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase text-rekany-gray/50 mb-2">Articles</p>
                      <div className="space-y-1.5">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-700">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="font-medium text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                      <select
                        value={order.statut}
                        onChange={(e) =>
                          updateStatusMutation.mutate({
                            id: order.id,
                            statut: e.target.value as Order['statut'],
                          })
                        }
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-rekany-dark"
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => handleDelete(order.id)}
                        className="text-sm font-medium text-red-500 hover:text-red-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}