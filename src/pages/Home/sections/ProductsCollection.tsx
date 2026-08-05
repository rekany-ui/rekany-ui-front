import { motion } from "framer-motion";

import fruits from "@/assets/images/fruit.jpg";
import fruit1 from "@/assets/images/fruit1.jpg";
import fruit2 from "@/assets/images/fruit2.jpg";

import ProductCard from "../../../components/ui/ProductCard";
import Button from "../../../components/ui/Button";

const products = [
  {
    id: 1,
    name: "Mangues Bio",
    price: "8 000 Ar",
    image: fruits,
    origin: "Anjororobe"
  },
  {
    id: 2,
    name: "Tomates Bio",
    price: "5 000 Ar",
    image: fruit1,
    origin: "Antsirabe"
  },
  {
    id: 3,
    name: "Confiture de Litchis",
    price: "12 000 Ar",
    image: fruit2,
    origin: "Antananarivo"
  },
];

export default function ProductsCollection() {
  return (
    <section
      id="collections"
      className="py-20 bg-rekany-beige/40 border-y border-rekany-cream"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-rekany-orange bg-rekany-orange/10 px-3 py-1 rounded-full border border-rekany-orange/20 mb-2">
                Nos Produits Bio
              </span>

              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-rekany-gray leading-tight">
                Du <span className="text-rekany-orange">terroir</span>
                <br />
                à votre table
              </h2>

              <p className="text-rekany-gray/70 text-xs sm:text-sm leading-relaxed">
                Sélection de fruits, légumes et produits transformés issus de l'agriculture biologique malgache. Chaque produit est certifié, traçable et issu du commerce équitable.
              </p>

              <div className="mt-5 space-y-3">
                <Button variant="primary" icon>
                  Voir le catalogue
                </Button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-rekany-orange">
                <span className="inline-block h-2 w-2 rounded-full bg-rekany-orange" />
                <span>Certification bio & commerce équitable</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <ProductCard
                    image={p.image}
                    name={p.name}
                    price={p.price}
                  />
                </motion.div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}