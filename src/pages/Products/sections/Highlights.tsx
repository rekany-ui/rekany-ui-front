import { motion } from "framer-motion";
import { BadgeCheck, Leaf, Sprout, Truck } from "lucide-react";

const highlights = [
  { icon: Leaf, title: "100% Biologique", text: "Cultures sans intrant chimique" },
  { icon: BadgeCheck, title: "Qualité Garantie", text: "Contrôle rigoureux sur chaque lot" },
  { icon: Sprout, title: "Producteurs locaux", text: "500+ agriculteurs partenaires" },
  { icon: Truck, title: "Livraison suivie", text: "Traçabilité QR code 24/7" },
];

export default function Highlights() {
  return (
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
  );
}