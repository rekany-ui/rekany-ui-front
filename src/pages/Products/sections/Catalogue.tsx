import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, MapPin } from "lucide-react";
import { formatPrice, type Product } from "@/types/product";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/useCart";

interface CatalogueProps {
  products: Product[];
  categories: string[];
  origins: string[];
  certifications: string[];
  isLoading: boolean;
  query: string;
  setQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  origin: string;
  setOrigin: (v: string) => void;
  certification: string;
  setCertification: (v: string) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  onlyAvailable: boolean;
  setOnlyAvailable: (v: boolean) => void;
  priceRangeMax: number;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
  e.stopPropagation();
  addToCart({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    unit: product.unit,
  });
  navigate(`/produits/${product.id}#action`);
};

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/produits/${product.id}`)}
      className="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-rekany-cream bg-white p-3.5 shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative overflow-hidden rounded-[1.35rem] bg-rekany-beige/60">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        {!product.available ? (
          <span className="absolute inset-x-3 top-3 rounded-full bg-white/90 px-3 py-1 text-center text-[11px] font-semibold uppercase tracking-wider text-rekany-gray/70">
            Rupture de stock
          </span>
        ) : null}
      </div>

      <div className="px-2 pb-1 pt-4">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-rekany-orange">
          <MapPin className="h-3.5 w-3.5 text-rekany-orange" aria-hidden />
          {product.origin}
        </div>
        <h3 className="mt-2 font-poppins text-base font-bold leading-snug text-rekany-gray">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-rekany-gray/70">{product.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-poppins text-lg font-bold text-rekany-dark">
            {formatPrice(product.price)}
            <span className="ml-1 text-xs font-medium text-rekany-gray/60">/{product.unit}</span>
          </p>
          <button
            type="button"
            disabled={!product.available}
            onClick={handleAdd}
            aria-label={`Ajouter ${product.name}`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rekany-dark text-white transition-transform duration-200 hover:scale-110 hover:bg-rekany-dark/90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            <Plus className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold text-rekany-gray/80">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-rekany-cream bg-white px-4 py-2.5 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-rekany-dark text-rekany-gray"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Catalogue({
  products,
  categories,
  origins,
  certifications,
  isLoading,
  query,
  setQuery,
  category,
  setCategory,
  origin,
  setOrigin,
  certification,
  setCertification,
  maxPrice,
  setMaxPrice,
  onlyAvailable,
  setOnlyAvailable,
  priceRangeMax,
}: CatalogueProps) {
  return (
    <section id="catalogue" className="mx-auto max-w-7xl px-5 py-16 md:py-20">
      <p className="font-script text-2xl text-rekany-orange">Nos produits</p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-poppins text-3xl font-extrabold md:text-4xl text-rekany-gray">
          Notre <span className="text-rekany-dark">Catalogue Bio</span>
        </h2>
        <span className="text-sm text-rekany-gray/70" aria-live="polite">
          {products.length} produit{products.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Category pills */}
      <div className="mt-8 flex flex-wrap gap-2">
        {["Toutes", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${category === c
                ? "bg-rekany-dark text-white shadow-sm"
                : "bg-rekany-cream/80 text-rekany-gray hover:bg-rekany-mint/40 hover:text-rekany-dark"
              }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-2xl bg-rekany-cream/60 border border-rekany-cream p-5">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <label htmlFor="search" className="text-xs font-semibold text-rekany-gray/80">
              Recherche
            </label>
            <div className="relative mt-2">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-rekany-gray/50"
                aria-hidden
              />
              <input
                id="search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Riz, vanille, miel…"
                className="w-full rounded-lg border border-rekany-cream bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-rekany-dark text-rekany-gray"
              />
            </div>
          </div>

          <Select
            id="origin"
            label="Origine"
            value={origin}
            onChange={setOrigin}
            options={["Toutes", ...origins]}
          />
          <Select
            id="certification"
            label="Certification"
            value={certification}
            onChange={setCertification}
            options={["Toutes", ...certifications]}
          />

          <div className="lg:col-span-2">
            <label htmlFor="price" className="text-xs font-semibold text-rekany-gray/80">
              Produits de qualité 
            </label>
            <input
              id="price"
              type="range"
              min={10000}
              max={priceRangeMax}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-4 w-full accent-[#1B5E20]"
            />
          </div>

          <div className="flex items-end lg:col-span-2">
            <label className="inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-rekany-gray">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="h-4 w-4 accent-[#1B5E20]"
              />
              Disponibles uniquement
            </label>
          </div>
        </div>
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {products.map((p: Product, i: number) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {isLoading ? (
        <div className="mt-12 rounded-2xl border border-dashed border-rekany-cream p-12 text-center text-sm text-rekany-gray/70">
          Chargement des produits...
        </div>
      ) : null}

      {!isLoading && products.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-rekany-cream p-12 text-center text-sm text-rekany-gray/70">
          Aucun produit ne correspond à vos filtres.
        </div>
      ) : null}
    </section>
  );
}