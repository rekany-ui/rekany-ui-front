import type { Product } from '@/types';
import { FaBox, FaLeaf, FaTimes } from 'react-icons/fa';
import Button from '@/components/ui/Button';

interface ProductDetailsProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  formatDate: (date?: string) => string;
}

export function ProductDetails({ product, isOpen, onClose, formatDate }: ProductDetailsProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white border border-white/20 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/90 px-6 py-4 backdrop-blur-sm">
          <h3 className="text-lg font-extrabold text-gray-900">Détails du produit</h3>
          <Button
            variant="secondary"
            onClick={onClose}
            className="p-2! rounded-xl! w-8! h-8! flex! items-center! justify-center! border-0 hover:bg-rekany-beige!"
          >
            <FaTimes className="text-rekany-gray/40 hover:text-rekany-gray" />
          </Button>
        </div>
        <div className="p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-rekany-beige text-2xl text-rekany-gray/40">
              {product.image ? (
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <FaBox />
              )}
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-gray-900">{product.name}</h4>
              <p className="text-sm text-rekany-gray/60">{product.category}</p>
            </div>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <div className="rounded-xl bg-rekany-beige p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-rekany-gray/40">Prix</p>
              <p className="text-sm font-bold text-gray-900">{product.price.toLocaleString('fr-FR')} MGA / {product.unit}</p>
            </div>
            <div className="rounded-xl bg-rekany-beige p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-rekany-gray/40">Origine</p>
              <p className="text-sm font-bold text-gray-900">{product.origin}</p>
            </div>
            <div className="rounded-xl bg-rekany-beige p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-rekany-gray/40">Certification</p>
              <p className="text-sm font-bold text-rekany-dark">
                <FaLeaf className="mr-1.5 inline text-[9px] text-rekany-light" />
                {product.certification}
              </p>
            </div>
            <div className="rounded-xl bg-rekany-beige p-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-rekany-gray/40">Disponible</p>
              <p className={`text-sm font-bold ${product.available ? 'text-rekany-dark' : 'text-red-700'}`}>
                {product.available ? 'Oui' : 'Non'}
              </p>
            </div>
          </div>
          <div className="mt-2.5 rounded-xl bg-rekany-beige p-3">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-rekany-gray/40">Description</p>
            <p className="whitespace-pre-wrap text-sm text-gray-700">{product.description}</p>
          </div>
          <p className="mt-3 text-xs text-rekany-gray/40">Créé le {formatDate(product.created_at)}</p>
        </div>
      </div>
    </div>
  );
}