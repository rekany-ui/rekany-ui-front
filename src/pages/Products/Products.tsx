import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Leaf,
  MapPin,
  Plus,
  Search,
  Sprout,
  Truck,
} from "lucide-react";

import { CATEGORIES, formatPrice, products, type Product } from "@/data/products";
import salade2 from "@/assets/images/salade2.jpg";

const origins = Array.from(new Set<string>(products.map((p: Product) => p.origin))).sort();
const certifications = Array.from(new Set<string>(products.map((p: Product) => p.certification))).sort();

const highlights = [
  { icon: Leaf, title: "100% Biologique", text: "Cultures sans intrant chimique" },
  { icon: BadgeCheck, title: "Certifié Ecocert", text: "Contrôle qualité sur chaque lot" },
  { icon: Sprout, title: "Producteurs locaux", text: "500+ agriculteurs partenaires" },
  { icon: Truck, title: "Livraison suivie", text: "Traçabilité QR code 24/7" },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[1.75rem] border border-rekany-cream bg-white p-3.5 shadow-soft transition-shadow duration-300 hover:shadow-lift"
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

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Toutes");
  const [origin, setOrigin] = useState("Toutes");
  const [certification, setCertification] = useState("Toutes");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filtered = useMemo<Product[]>(
    () =>
      products.filter(
        (p: Product) =>
          (category === "Toutes" || p.category === category) &&
          (origin === "Toutes" || p.origin === origin) &&
          (certification === "Toutes" || p.certification === certification) &&
          p.price <= maxPrice &&
          (!onlyAvailable || p.available) &&
          (p.name + p.description + p.origin).toLowerCase().includes(query.toLowerCase()),
      ),
    [query, category, origin, certification, maxPrice, onlyAvailable],
  );

  return (
    <div className="min-h-screen bg-rekany-beige/30 pt-20">
      <main>
        {/* Hero */}
        <section className="bg-rekany-cream/50 border-b border-rekany-cream">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-script text-3xl text-rekany-orange">Bienvenue chez Rekany</p>
              <h1 className="mt-3 font-poppins text-4xl font-extrabold leading-[1.08] md:text-6xl text-rekany-gray">
                Bon Produit
                <br />
                <span className="text-rekany-dark">Bonne Santé</span>
                <br />
                Bonne Vie
              </h1>
              <p className="mt-6 max-w-md text-sm text-rekany-gray/80 md:text-base">
                Une sélection biologique certifiée, cultivée par nos producteurs partenaires et
                tracée du champ jusqu'à votre table.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#catalogue"
                  className="inline-flex items-center gap-2 rounded-lg bg-rekany-dark px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform duration-200 hover:scale-105 hover:bg-rekany-dark/90"
                >
                  Commander
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-lg border border-rekany-dark/30 px-6 py-3 text-sm font-semibold text-rekany-dark transition-colors hover:bg-rekany-dark/5"
                >
                  Notre histoire
                  <Leaf className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-[560px]"
            >
              <div className="pointer-events-none absolute -inset-6 rounded-full bg-rekany-light/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-3 shadow-lg backdrop-blur-sm">
                <motion.img
                  src={salade2}
                  alt="Bol de produits biologiques frais REKANY AGRI"
                  width={1200}
                  height={1000}
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-[320px] w-full rounded-[1.5rem] object-cover sm:h-[420px]"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        <section className="border-b border-rekany-cream bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="flex items-center gap-4"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rekany-mint/30">
                  <h.icon className="h-5 w-5 text-rekany-dark" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-poppins text-sm font-semibold text-rekany-gray">{h.title}</h2>
                  <p className="text-xs text-rekany-gray/70">{h.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Catalogue */}
        <section id="catalogue" className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <p className="font-script text-2xl text-rekany-orange">Nos produits</p>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-poppins text-3xl font-extrabold md:text-4xl text-rekany-gray">
              Notre <span className="text-rekany-dark">Catalogue Bio</span>
            </h2>
            <span className="text-sm text-rekany-gray/70" aria-live="polite">
              {filtered.length} produit{filtered.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Category pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {["Toutes", ...CATEGORIES].map((c) => (
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
                  Prix max : {formatPrice(maxPrice)}
                </label>
                <input
                  id="price"
                  type="range"
                  min={10000}
                  max={50000}
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
              {filtered.map((p: Product, i: number) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-rekany-cream p-12 text-center text-sm text-rekany-gray/70">
              Aucun produit ne correspond à vos filtres.
            </div>
          ) : null}
        </section>

        {/* CTA band */}
        <section className="mx-auto max-w-7xl px-5 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl bg-rekany-mint/30 border border-rekany-mint/50 px-8 py-12 md:px-14"
          >
            <h2 className="font-poppins text-2xl font-extrabold md:text-4xl text-rekany-gray">
              Commandez <span className="text-rekany-dark">en gros</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-rekany-gray/80 md:text-base">
              Grandes surfaces, restaurants, hôtels et export : bénéficiez de tarifs dédiés et d'une
              traçabilité complète sur chaque lot.
            </p>
            <a
              href="mailto:contact@rekany-agri.mg"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-rekany-dark px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-rekany-dark/90 shadow-soft"
            >
              Demander un devis
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>
        </section>
      </main>
    </div>
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