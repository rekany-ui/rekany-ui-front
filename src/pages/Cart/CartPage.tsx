import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/useCart';
import { formatPrice } from '@/types/product';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-rekany-gray/30" />
        <h1 className="mt-6 font-poppins text-2xl font-bold text-rekany-gray">
          Votre panier est vide
        </h1>
        <p className="mt-2 text-sm text-rekany-gray/70">
          Parcourez notre catalogue pour ajouter des produits.
        </p>
        <Link
          to="/produits"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-rekany-dark px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <Link
        to="/produits"
        className="inline-flex items-center gap-2 text-sm font-medium text-rekany-gray/70 hover:text-rekany-dark"
      >
        <ArrowLeft className="h-4 w-4" /> Continuer mes achats
      </Link>

      <div className="mt-6 flex items-center justify-between">
        <h1 className="font-poppins text-3xl font-extrabold text-rekany-gray">Mon panier</h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm font-medium text-red-500 hover:text-red-600"
        >
          Vider le panier
        </button>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-rekany-cream bg-white p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 shrink-0 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="font-poppins text-sm font-bold text-rekany-gray">{item.name}</h3>
                <p className="mt-1 text-sm text-rekany-dark">
                  {formatPrice(item.price)}
                  <span className="ml-1 text-xs text-rekany-gray/60">/{item.unit}</span>
                </p>
              </div>

              <div className="flex items-center rounded-full border border-rekany-cream">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="grid h-8 w-8 place-items-center text-rekany-gray hover:text-rekany-dark"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="grid h-8 w-8 place-items-center text-rekany-gray hover:text-rekany-dark"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="w-24 text-right font-poppins text-sm font-bold text-rekany-dark">
                {formatPrice(item.price * item.quantity)}
              </p>

              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Retirer ${item.name}`}
                className="text-rekany-gray/50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-rekany-cream bg-rekany-cream/40 p-6">
          <h2 className="font-poppins text-lg font-bold text-rekany-gray">Résumé</h2>

          <div className="mt-4 flex items-center justify-between text-sm text-rekany-gray/80">
            <span>Sous-total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-rekany-cream pt-4 font-poppins text-lg font-bold text-rekany-dark">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block rounded-full bg-rekany-dark py-3 text-center text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Passer la commande
          </Link>
        </div>
      </div>
    </div>
  );
}