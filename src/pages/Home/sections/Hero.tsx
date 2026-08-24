import { motion } from "framer-motion";
import { Search, Star, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import bg from "@/assets/images/fond.jpeg";
import legume from "@/assets/images/fond2.jpeg";
import Button from "../../../components/ui/Button";
import Counter from "../../../components/ui/Counter";

const stats = [
  { label: "Producteurs partenaires", value: 50 },
  { label: "Paysans accompagnés", value: 20 },
  { label: "Années de collaboration", value: 5 },
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center min-h-screen flex items-center pt-20"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />

      <div className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-24 w-full py-16">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">

            <div className="space-y-8 text-white">

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-rekany-light/30 bg-rekany-light/10 px-5 py-2 text-sm font-semibold text-rekany-light backdrop-blur-sm"
              >
                <Globe className="h-5 w-5" />
                Madagascar • Agriculture & Collaboration Paysanne
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.2 }}
                className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
              >
                Des produits de
                <br />
                <span className="text-rekany-light">
                  qualité
                </span>
                <br />
                de Madagascar
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="max-w-xl text-white/80 text-lg leading-relaxed"
              >
                REKANY AGRI collabore étroitement avec les paysans malgaches pour produire et commercialiser des produits de qualité, issus d'une agriculture respectueuse, pour le bien-être des consommateurs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4"
              >

                <Link to="/produits">
                  <Button variant="primary" icon>
                    Découvrir nos produits
                  </Button>
                </Link>

                <Link to="/contact">
                  <Button variant="secondary">
                    Nous contacter
                  </Button>
                </Link>

                <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <Search className="h-5 w-5" />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="grid grid-cols-3 gap-8 pt-6 border-t border-white/10"
              >
                {stats.map((item, i) => (
                  <div key={i}>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                      <Counter value={item.value} duration={2000} suffix="+" />
                    </div>
                    <p className="text-sm text-white/50 mt-1">{item.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex items-center gap-3"
              >
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-white/60">
                  <span className="font-bold text-white">5.0</span> • Qualité & collaboration paysanne
                </p>
              </motion.div>

            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="hidden lg:block"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 hover:border-rekany-light/30 transition-all duration-500 hover:shadow-2xl hover:shadow-rekany-light/10">
                <img
                  src={legume}
                  className="h-72 w-full rounded-2xl object-cover"
                  alt="Produits de Madagascar"
                />

                <div className="mt-5">
                  <h3 className="text-white font-semibold text-xl">
                    Qualité & Collaboration
                  </h3>
                  <p className="text-lg text-white/50">
                    Récolte locale, collaboration paysanne
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-rekany-light font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-rekany-light rounded-full animate-pulse" />
                    Qualité garantie
                  </span>
                  <span className="text-white/40 text-sm">
                    Partenariat durable
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs text-white/30">
                  <span>🌱 Agriculture responsable</span>
                  <span>🤝 Collaboration paysanne</span>
                  <span>🇲🇬 Origine Madagascar</span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link
                    to="/a-propos"
                    className="w-full py-3 text-sm font-semibold text-rekany-light border border-rekany-light/30 rounded-xl hover:bg-rekany-light/10 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    En savoir plus
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}