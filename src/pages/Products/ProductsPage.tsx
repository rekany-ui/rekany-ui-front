import type { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import HeroProduct from "./sections/HeroProduct";
import Highlights from "./sections/Highlights";
import Catalogue from "./sections/Catalogue";
import { productProvider } from "@/provider/productProvider";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Toutes");
  const [origin, setOrigin] = useState("Toutes");
  const [certification, setCertification] = useState("Toutes");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => productProvider.findAll(),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => productProvider.getCategories(),
  });

  const { data: origins = [] } = useQuery({
    queryKey: ["origins"],
    queryFn: () => productProvider.getOrigins(),
  });

  const { data: certifications = [] } = useQuery({
    queryKey: ["certifications"],
    queryFn: () => productProvider.getCertifications(),
  });

  const priceRangeMax = Math.max(50000, ...products.map((p) => p.price));

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
    [query, category, origin, certification, maxPrice, onlyAvailable, products],
  );

  if (isError) {
    return (
      <div className="min-h-screen bg-rekany-beige/30 pt-20 flex items-center justify-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-red-600">
            Erreur : {(error as Error)?.message || "Impossible de charger les produits"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rekany-beige/30 pt-20">
      <main>
        <HeroProduct />
        <Highlights />
        <Catalogue
          products={filtered}
          categories={categories}
          origins={origins}
          certifications={certifications}
          isLoading={isLoading}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          origin={origin}
          setOrigin={setOrigin}
          certification={certification}
          setCertification={setCertification}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onlyAvailable={onlyAvailable}
          setOnlyAvailable={setOnlyAvailable}
          priceRangeMax={priceRangeMax}
        />
      </main>
    </div>
  );
}