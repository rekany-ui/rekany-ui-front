import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import salade2 from "@/assets/images/salade2.jpg";

export default function HeroProduct() {
  return (
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
  );
}