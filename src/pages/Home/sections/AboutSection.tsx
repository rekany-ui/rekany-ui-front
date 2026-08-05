import { motion } from "framer-motion";
import { Star, Leaf, Shield, Truck, Handshake } from "lucide-react";

import tomate from "@/assets/images/tomate.jpg";
import karoty from "@/assets/images/karoty.jpg";
import poivron from "@/assets/images/poivron.jpg";

import Button from "../../../components/ui/Button";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-rekany-beige">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-4">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-rekany-cream bg-rekany-white group"
            >
              <img
                src={tomate}
                alt="Produits de qualité Madagascar"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />

              <div className="absolute top-6 left-6 bg-rekany-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-rekany-cream flex items-center gap-2 shadow-sm">

                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>

                <span className="text-xs font-bold text-rekany-gray">
                  5.0
                </span>

              </div>
            </motion.div>

          </div>

          <div className="lg:col-span-5 space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className="space-y-6"
            >

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-rekany-gray leading-tight">
                REKANY AGRI
                <br />
                <span className="text-rekany-light text-2xl sm:text-3xl lg:text-4xl">Qualité & Collaboration Paysanne</span>
              </h2>

              <p className="text-rekany-gray/80 text-base leading-relaxed">
                REKANY AGRI collabore étroitement avec les paysans malgaches pour produire et commercialiser des produits de qualité, issus d'une agriculture responsable, pour le bien-être des consommateurs.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-rekany-light mt-0.5 flex-shrink-0" />
                  <p className="text-rekany-gray/70 text-sm">
                    <span className="font-semibold text-rekany-gray">Agriculture Responsable :</span> Production respectueuse de l'environnement pour garantir une disponibilité toute l'année, en harmonie avec la nature.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Handshake className="h-5 w-5 text-rekany-light mt-0.5 flex-shrink-0" />
                  <p className="text-rekany-gray/70 text-sm">
                    <span className="font-semibold text-rekany-gray">Collaboration Paysanne :</span> Travail main dans la main avec les agriculteurs locaux, respect des savoir-faire traditionnels et partage des connaissances.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-rekany-light mt-0.5 flex-shrink-0" />
                  <p className="text-rekany-gray/70 text-sm">
                    <span className="font-semibold text-rekany-gray">Logistique & Circuit Court :</span> De la récolte chez le paysan jusqu'au consommateur, avec un suivi transparent et un partenariat équitable.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="primary">
                  Découvrir nos produits
                </Button>
              </div>

            </motion.div>

          </div>

          <div className="lg:col-span-3 flex flex-col gap-6">

            {[karoty, poivron].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-rekany-cream bg-rekany-white group"
              >
                <img
                  src={img}
                  alt="Produits de Madagascar"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition" />
              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}