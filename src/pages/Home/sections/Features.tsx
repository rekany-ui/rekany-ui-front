import { motion } from "framer-motion";
import { Truck, ShieldCheck, Award, Sprout, Handshake } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: Truck,
      title: "Logistique & Traçabilité",
      desc: "Suivi numérique de la livraison, du champ jusqu'au consommateur. Circuit court et partenariat équitable avec les paysans pour une transparence totale.",
    },
    {
      icon: Handshake,
      title: "Collaboration Paysanne",
      desc: "Travail main dans la main avec les agriculteurs malgaches pour une production de qualité, respectueuse des savoir-faire locaux et des traditions.",
    },
    {
      icon: ShieldCheck,
      title: "Qualité & Contrôle",
      desc: "Produits de qualité avec un processus de contrôle rigoureux, garantissant l'authenticité et l'excellence de chaque récolte.",
    },
    {
      icon: Award,
      title: "Santé & Engagement Social",
      desc: "Placer l'Homme et les paysans au centre de nos préoccupations. Lutter contre la malnutrition en offrant des produits sains et de qualité à tous.",
    },
  ];

  return (
    <section
      id="features"
      className="py-16 border-y border-rekany-cream bg-rekany-beige"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-rekany-cream">

          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="p-8 flex flex-col items-start text-left group cursor-pointer"
              >

                <div className="w-12 h-12 rounded-full bg-rekany-orange/10 flex items-center justify-center text-rekany-orange mb-5 transition-all duration-300 group-hover:bg-rekany-orange group-hover:text-white">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-serif font-bold text-rekany-gray mb-2 group-hover:text-rekany-orange transition">
                  {item.title}
                </h3>

                <p className="text-rekany-gray/70 text-sm leading-relaxed">
                  {item.desc}
                </p>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}