import { useState, useMemo } from 'react';
import { FaEye, FaPen, FaTrash, FaBox, FaLeaf } from 'react-icons/fa';
import { SearchBar } from '../shared/SearchBar';
import { Pagination } from '../shared/Pagination';
import Button from '@/components/ui/Button';
import type { Product } from '@/types';
import { ITEMS_PER_PAGE } from '../../constants/ndex';

interface ProductListProps {
  products: Product[];
  onView: (id: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
  onAdd: () => void;
}

export function ProductList({ products, onView, onEdit, onDelete, onExport, onAdd }: ProductListProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.origin.toLowerCase().includes(query) ||
        p.certification.toLowerCase().includes(query)
    );
  }, [products, search]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un produit..." />
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" onClick={onExport}>
            Exporter
          </Button>
          <Button variant="primary" onClick={onAdd} icon>
            Nouveau produit
          </Button>
        </div>
      </div>

      <div className="table-responsive overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-rekany-beige/80 text-rekany-gray/60 text-[10px] uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-5 py-3.5">Produit</th>
              <th className="px-5 py-3.5">Catégorie</th>
              <th className="px-5 py-3.5">Prix</th>
              <th className="px-5 py-3.5">Origine</th>
              <th className="px-5 py-3.5">Certification</th>
              <th className="px-5 py-3.5">Disponible</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="group table-row-hover transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-rekany-beige text-rekany-gray/40">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      ) : (
                        <FaBox className="text-rekany-gray/40" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-[10px] text-rekany-gray/40">{product.unit}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-gray-500">{product.category}</td>
                <td className="px-5 py-3.5 font-semibold text-gray-900">{product.price.toLocaleString('fr-FR')} MGA</td>
                <td className="px-5 py-3.5 text-gray-500">{product.origin}</td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rekany-light/20 px-2.5 py-1 text-[10px] font-semibold text-rekany-dark">
                    <FaLeaf className="text-[9px]" />
                    {product.certification}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${product.available
                    ? 'bg-rekany-light/20 text-rekany-dark'
                    : 'bg-red-50 text-red-700'
                    }`}>
                    <span className={`status-dot ${product.available ? 'online' : 'offline'}`} />
                    {product.available ? 'Oui' : 'Non'}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => onView(product.id)}
                      className="rounded-lg p-1.5 text-rekany-light transition-colors hover:bg-rekany-light/10"
                      title="Voir"
                    >
                      <FaEye className="text-xs" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="rounded-lg p-1.5 text-rekany-dark transition-colors hover:bg-rekany-dark/10"
                      title="Modifier"
                    >
                      <FaPen className="text-xs" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product.id)}
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
        totalItems={filteredProducts.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}