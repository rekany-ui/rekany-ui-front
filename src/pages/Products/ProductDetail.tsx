import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Plus, Minus } from 'lucide-react';
import { productProvider } from '@/provider/productProvider';
import { formatPrice, type Product } from '@/types/product';
import { useCart } from '@/context/useCart';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    productProvider
      .findOne(Number(id))
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch(() => {
        if (!cancelled) setError('Produit introuvable.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
  if (window.location.hash === '#action') {
    document.getElementById('action')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        unit: product.unit,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center text-sm text-rekany-gray/70">
        Chargement du produit...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <p className="text-sm font-medium text-red-600">{error || 'Produit introuvable.'}</p>
        <button
          onClick={() => navigate('/produits')}
          className="mt-4 text-sm font-semibold text-rekany-dark hover:underline"
        >
          ← Retour au catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <Link
        to="/produits"
        className="inline-flex items-center gap-2 text-sm font-medium text-rekany-gray/70 hover:text-rekany-dark"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-[1.75rem] bg-rekany-beige/60">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rekany-orange">
            <MapPin className="h-3.5 w-3.5" /> {product.origin}
          </div>

          <h1 className="mt-3 font-poppins text-3xl font-extrabold text-rekany-gray">
            {product.name}
          </h1>

          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-rekany-dark/60">
            {product.certification}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-rekany-gray/80">
            {product.description}
          </p>

          <p className="mt-6 font-poppins text-2xl font-bold text-rekany-dark">
            {formatPrice(product.price)}
            <span className="ml-1 text-sm font-medium text-rekany-gray/60">/{product.unit}</span>
          </p>

          {!product.available && (
            <p className="mt-2 text-sm font-semibold text-red-500">Rupture de stock</p>
          )}

          <div id="action" className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-rekany-cream">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="grid h-10 w-10 place-items-center text-rekany-gray hover:text-rekany-dark"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="grid h-10 w-10 place-items-center text-rekany-gray hover:text-rekany-dark"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              disabled={!product.available}
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-rekany-dark py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {added ? 'Ajouté au panier ✓' : 'Ajouter au panier'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}