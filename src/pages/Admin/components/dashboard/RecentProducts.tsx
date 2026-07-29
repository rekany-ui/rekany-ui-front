import type { Product } from '@/types';
import { FaBox, FaArrowRight } from 'react-icons/fa';
import Button from '@/components/ui/Button';

interface RecentProductsProps {
  products: Product[];
  onViewAll: () => void;
  onViewProduct: (id: string) => void;
}

export function RecentProducts({ products, onViewAll, onViewProduct }: RecentProductsProps) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <FaBox className="text-xs text-rekany-dark" />
          Derniers produits
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
        {products.slice(0, 5).length === 0 ? (
          <div className="p-6 text-center text-rekany-gray/40 text-sm">
            <FaBox className="mr-2 inline" />Aucun produit
          </div>
        ) : (
          products.slice(0, 5).map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => onViewProduct(product.id)}
              className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-rekany-beige/50"
            >
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-rekany-beige text-rekany-gray/40">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                  <FaBox className="text-rekany-gray/40" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{product.name}</p>
                <p className="truncate text-xs text-rekany-gray/40">
                  {product.category} · {product.price.toLocaleString('fr-FR')} MGA
                </p>
              </div>
              <span className={`status-dot ${product.available ? 'online' : 'offline'}`} />
            </button>
          ))
        )}
      </div>
    </div>
  );
}