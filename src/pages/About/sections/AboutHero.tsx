import { motion } from "framer-motion";
import tomate from "/src/assets/images/tomate.jpg"
import { Leaf, Shield, Users } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="pt-32 pb-24 md:pt-44 md:pb-32 bg-rekany-beige min-h-[100vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-rekany-orange bg-rekany-orange/10 px-4 py-1.5 rounded-full border border-rekany-orange/20">
              À Propos de Nous
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-poppins font-bold text-rekany-gray leading-tight">
              REKANY AGRI
              <br />
              <span className="text-rekany-orange">Bio & Commerce Équitable</span>
            </h1>
            <p className="text-rekany-gray/70 text-lg leading-relaxed max-w-lg">
              Fournir des produits certifiés bio à la population malgache prioritairement et à l'export,
              dans un modèle économique construit sur le commerce équitable.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-rekany-gray/60">
                <Leaf className="h-4 w-4 text-rekany-orange" />
                <span>100% Bio</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-rekany-gray/60">
                <Shield className="h-4 w-4 text-rekany-orange" />
                <span>Certifié</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-rekany-gray/60">
                <Users className="h-4 w-4 text-rekany-orange" />
                <span>Commerce Équitable</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border border-rekany-cream">
              <img
                src={tomate}
                alt="REKANY AGRI"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-rekany-orange text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              🌿 Bio Certifié
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}