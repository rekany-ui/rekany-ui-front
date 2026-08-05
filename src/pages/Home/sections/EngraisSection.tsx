import { motion } from "framer-motion";
import { Star, Leaf, Shield, Truck, Sprout, Award, Droplets, Recycle } from "lucide-react";
import { Link } from "react-router-dom";

import engrais1 from "@/assets/images/engrais2.jpg";
import engrais2 from "@/assets/images/engrais1.jpg";

import Button from "../../../components/ui/Button";

export default function EngraisSection() {
  return (
    <section id="engrais" className="py-20 md:py-28 bg-gradient-to-br from-rekany-beige via-rekany-cream to-rekany-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-rekany-orange/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-rekany-orange border border-rekany-orange/20"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rekany-orange" />
            Notre Savoir-Faire
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-rekany-gray"
          >
            Engrais <span className="text-rekany-light">Biologiques</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-rekany-gray/70 text-base max-w-2xl mx-auto"
          >
            Des fertilisants naturels de haute qualité, fabriqués localement pour nourrir les sols et accompagner les paysans malgaches vers une agriculture durable et productive.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="col-span-2 rounded-2xl overflow-hidden shadow-lg border border-rekany-cream group"
            >
              <img
                src={engrais1}
                alt="Engrais naturel"
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-4 bg-rekany-white">
                <p className="text-sm font-semibold text-rekany-gray">🌱 Fertilisant 100% Naturel</p>
                <p className="text-xs text-rekany-gray/50">Riche en nutriments essentiels</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-rekany-cream group"
            >
              <img
                src={engrais2}
                alt="Engrais bio"
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-3 bg-rekany-white">
                <p className="text-xs font-semibold text-rekany-gray">🧪 Qualité Supérieure</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-rekany-cream bg-gradient-to-br from-rekany-orange/5 to-rekany-beige p-4 flex flex-col items-center justify-center text-center min-h-[200px]"
            >
              <div className="text-4xl mb-3">🌿</div>
              <p className="text-sm font-bold text-rekany-gray">Pour des sols vivants</p>
              <p className="text-xs text-rekany-gray/60 mt-1">Et des récoltes abondantes</p>
              <div className="mt-3 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-5"
            >

              <div className="bg-rekany-white rounded-2xl p-6 border border-rekany-cream shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-rekany-orange/10 text-rekany-orange group-hover:bg-green-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                    <Sprout className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-rekany-gray">100% Naturel & Bio</h3>
                    <p className="text-sm text-rekany-gray/70 mt-1">
                      Fabriqué à partir de matières organiques locales, sans produits chimiques, pour des sols sains et productifs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rekany-white rounded-2xl p-6 border border-rekany-cream shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-rekany-orange/10 text-rekany-orange group-hover:bg-green-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-rekany-gray">Qualité Supérieure</h3>
                    <p className="text-sm text-rekany-gray/70 mt-1">
                      Un processus de fabrication rigoureux garantit un engrais riche en nutriments essentiels pour des récoltes abondantes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rekany-white rounded-2xl p-6 border border-rekany-cream shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-rekany-orange/10 text-rekany-orange group-hover:bg-green-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-rekany-gray">Disponible pour les Paysans</h3>
                    <p className="text-sm text-rekany-gray/70 mt-1">
                      Mise à disposition des agriculteurs locaux à prix abordable, pour soutenir l'agriculture durable à Madagascar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rekany-white rounded-2xl p-6 border border-rekany-cream shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-rekany-orange/10 text-rekany-orange group-hover:bg-green-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-rekany-gray">Respect de l'Environnement</h3>
                    <p className="text-sm text-rekany-gray/70 mt-1">
                      Des engrais 100% biodégradables qui enrichissent les sols sans les polluer, pour une agriculture durable.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link to="/contact">
                  <Button variant="primary" icon>
                    Contactez-nous
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}