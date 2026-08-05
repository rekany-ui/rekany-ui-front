import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import legumes from "@/assets/images/potiron.jpg";
import transformes from "@/assets/images/confiture.jpg";
import fruits from "@/assets/images/banane.jpg";

type Category = {
  id: number;
  name: string;
  image: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Fruits Bio",
    image: fruits,
    description: "Mangues, litchis, bananes, ananas..."
  },
  {
    id: 2,
    name: "Légumes Bio",
    image: legumes,
    description: "Tomates, poivrons, haricots, salades..."
  },
  {
    id: 3,
    name: "Produits Transformés",
    image: transformes,
    description: "Confitures, jus, fruits séchés..."
  },
];

const slideshowImages = [
  { src: fruits, label: "🍎 Fruits Bio de Madagascar" },
  { src: legumes, label: "🥬 Légumes Bio & Frais" },
  { src: transformes, label: "🍯 Produits Transformés Bio" },
];

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex-1 min-w-35 max-w-45 mx-auto bg-rekany-white border border-rekany-cream rounded-full py-8 px-4 flex flex-col items-center gap-6 group hover:bg-rekany-white hover:border-rekany-orange transition-all duration-500 shadow-sm hover:shadow-md cursor-pointer"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden border border-rekany-cream shadow-inner">
        <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <span className="text-sm font-poppins font-bold text-rekany-gray group-hover:text-rekany-orange transition-colors text-center">
        {cat.name}
      </span>
    </motion.div>
  );
}

export default function CategoryTypeSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section id="types" className="py-20 md:py-28 overflow-hidden bg-rekany-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-16/10 rounded-[2.5rem] overflow-hidden shadow-xl border border-rekany-cream group"
            >
              <img
                src={slideshowImages[currentSlide].src}
                alt="Nos produits bio"
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-white text-xs font-medium">
                  {slideshowImages[currentSlide].label}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-rekany-gray">
                Nos <span className="text-rekany-orange">Produits Bio</span>
              </h2>

              <p className="text-rekany-gray/70 text-sm leading-relaxed max-w-lg">
                Découvrez notre gamme de produits de qualité, cultivés en étroite collaboration avec les paysans locaux dans le respect de l'environnement.              </p>
            </motion.div>

            <div className="flex flex-wrap md:flex-nowrap gap-6 items-center">
              {categories.map((cat, i) => (
                <CategoryCard key={cat.id} cat={cat} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4"
            >
              <p className="text-xs text-rekany-gray/50 italic">
                🌱 Tous nos produits sont issus du commerce équitable et bénéficient d'une traçabilité complète.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}