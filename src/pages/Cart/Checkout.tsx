import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/useCart';
import { orderProvider } from '@/provider/orderProvider';
import { formatPrice } from '@/types/product';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await orderProvider.create({
        ...formData,
        items,
        total: totalPrice,
      });
      setSuccess(true);
      clearCart();
    } catch (err) {
      if (isAxiosError<{ message?: string }>(err)) {
        setError(err.response?.data?.message || 'Une erreur est survenue.');
      } else {
        setError('Une erreur est survenue.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !success) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="text-sm text-rekany-gray/70">Votre panier est vide.</p>
        <Link to="/produits" className="mt-4 inline-block text-sm font-semibold text-rekany-dark hover:underline">
          Voir le catalogue
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
        <h1 className="mt-6 font-poppins text-2xl font-bold text-rekany-gray">
          Commande envoyée !
        </h1>
        <p className="mt-2 text-sm text-rekany-gray/70">
          Notre équipe vous contactera rapidement pour confirmer votre commande.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-rekany-dark px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <Link
        to="/panier"
        className="inline-flex items-center gap-2 text-sm font-medium text-rekany-gray/70 hover:text-rekany-dark"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au panier
      </Link>

      <h1 className="mt-6 font-poppins text-3xl font-extrabold text-rekany-gray">
        Finaliser la commande
      </h1>

      <div className="mt-8 grid gap-10 md:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-5 md:col-span-2" noValidate>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-rekany-dark">
              Nom complet *
            </label>
            <input
              required
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full rounded-xl border border-rekany-cream bg-white px-4 py-2.5 text-sm text-rekany-gray outline-none focus:border-rekany-dark"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-rekany-dark">
                Email *
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-rekany-cream bg-white px-4 py-2.5 text-sm text-rekany-gray outline-none focus:border-rekany-dark"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-rekany-dark">
                Téléphone *
              </label>
              <input
                required
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full rounded-xl border border-rekany-cream bg-white px-4 py-2.5 text-sm text-rekany-gray outline-none focus:border-rekany-dark"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-rekany-dark">
              Adresse de livraison *
            </label>
            <textarea
              required
              rows={3}
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              className="w-full resize-none rounded-xl border border-rekany-cream bg-white px-4 py-2.5 text-sm text-rekany-gray outline-none focus:border-rekany-dark"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-rekany-dark">
              Notes (optionnel)
            </label>
            <textarea
              rows={2}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Instructions particulières pour la livraison..."
              className="w-full resize-none rounded-xl border border-rekany-cream bg-white px-4 py-2.5 text-sm text-rekany-gray outline-none focus:border-rekany-dark"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-rekany-dark py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {submitting ? 'Envoi...' : 'Confirmer la commande'}
          </button>
        </form>

        <div className="h-fit rounded-2xl border border-rekany-cream bg-rekany-cream/40 p-6">
          <h2 className="font-poppins text-lg font-bold text-rekany-gray">Récapitulatif</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-rekany-gray/80">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-rekany-dark">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-rekany-cream pt-4 font-poppins text-lg font-bold text-rekany-dark">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}