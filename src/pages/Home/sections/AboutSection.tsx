import { motion } from "framer-motion";
import { Star, Leaf, Truck, Handshake } from "lucide-react";

import tomate from "@/assets/images/tomate.jpg";
import karoty from "@/assets/images/karoty.jpg";
import poivron from "@/assets/images/poivron.jpg";

import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";

const sections = [
  {
    mainImage: tomate,
    secondaryImages: [karoty, poivron],
    title: "REKANY AGRI",
    subtitle: "Qualité & Collaboration Paysanne",
    description:
      "REKANY AGRI collabore étroitement avec les paysans malgaches pour produire et commercialiser des produits de qualité, issus d'une agriculture responsable, pour le bien-être des consommateurs.",
    points: [
      {
        icon: Leaf,
        title: "Agriculture Responsable",
        description:
          "Production respectueuse de l'environnement pour garantir une disponibilité toute l'année, en harmonie avec la nature.",
      },
      {
        icon: Handshake,
        title: "Collaboration Paysanne",
        description:
          "Travail main dans la main avec les agriculteurs locaux, respect des savoir-faire traditionnels et partage des connaissances.",
      },
      {
        icon: Truck,
        title: "Logistique & Circuit Court",
        description:
          "De la récolte chez le paysan jusqu'au consommateur, avec un suivi transparent et un partenariat équitable.",
      },
    ],
  },
  {
    mainImage: karoty,
    secondaryImages: [poivron, tomate],
    title: "NOS PRODUCTEURS",
    subtitle: "Au cœur de notre agriculture",
    description:
      "Nous travaillons directement avec les producteurs locaux afin de valoriser leur savoir-faire et de construire une relation durable basée sur la confiance et le respect.",
    points: [
      {
        icon: Handshake,
        title: "Partenariat Local",
        description:
          "Une collaboration durable et équitable avec les agriculteurs malgaches.",
      },
      {
        icon: Leaf,
        title: "Savoir-faire Paysan",
        description:
          "Nous valorisons les connaissances et les méthodes traditionnelles de nos producteurs.",
      },
      {
        icon: Truck,
        title: "Accompagnement",
        description:
          "Un accompagnement permettant d'améliorer la production et la commercialisation des produits.",
      },
    ],
  },
  {
    mainImage: poivron,
    secondaryImages: [tomate, karoty],
    title: "NOS PRODUITS",
    subtitle: "Du champ jusqu'à votre table",
    description:
      "Nous sélectionnons soigneusement nos produits afin de garantir fraîcheur, qualité et traçabilité tout au long de leur parcours.",
    points: [
      {
        icon: Leaf,
        title: "Qualité",
        description:
          "Des produits sélectionnés avec soin pour répondre aux attentes des consommateurs.",
      },
      {
        icon: Handshake,
        title: "Traçabilité",
        description:
          "Une relation transparente entre les producteurs, REKANY AGRI et les consommateurs.",
      },
      {
        icon: Truck,
        title: "Circuit Court",
        description:
          "Une chaîne logistique optimisée pour préserver la fraîcheur des produits.",
      },
    ],
  },
];

export default function AboutSection() {
  return (
    <>
      {sections.map((section, index) => (
        <section
          key={index}
          id={index === 0 ? "about" : undefined}
          className="bg-rekany-beige py-8 sm:py-10 lg:py-12"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="w-full md:col-span-1 lg:col-span-4">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8 }}
                  className="group relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-3xl border border-rekany-cream bg-rekany-white shadow-lg"
                >
                  <img
                    src={section.mainImage}
                    alt={section.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-rekany-cream bg-rekany-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:py-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-current"
                        />
                      ))}
                    </div>

                    <span className="text-[11px] font-bold text-rekany-gray sm:text-xs">
                      5.0
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="w-full md:col-span-1 lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4 sm:space-y-5"
                >
                  <h2 className="font-poppins text-3xl font-bold leading-tight text-rekany-gray sm:text-4xl lg:text-5xl">
                    {section.title}

                    <br />

                    <span className="text-xl font-semibold text-rekany-light sm:text-2xl lg:text-3xl xl:text-4xl">
                      {section.subtitle}
                    </span>
                  </h2>

                  <p className="max-w-2xl text-sm leading-relaxed text-rekany-gray/80 sm:text-base">
                    {section.description}
                  </p>

                  <div className="space-y-3">
                    {section.points.map((point, pointIndex) => {
                      const Icon = point.icon;

                      return (
                        <div
                          key={pointIndex}
                          className="flex items-start gap-2.5 sm:gap-3"
                        >
                          <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-rekany-light sm:h-5 sm:w-5" />

                          <p className="text-xs leading-relaxed text-rekany-gray/70 sm:text-sm">
                            <span className="font-semibold text-rekany-gray">
                              {point.title} :
                            </span>{" "}
                            {point.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-1 sm:pt-2">
                    <Link to="/produits">
                      <Button variant="primary">
                        Découvrir nos produits
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>

              <div className="grid w-full grid-cols-2 gap-3 md:col-span-2 lg:col-span-3 lg:grid-cols-1 lg:gap-5">
                {section.secondaryImages.map((img, imageIndex) => (
                  <motion.div
                    key={imageIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.7,
                      delay: imageIndex * 0.15,
                    }}
                    className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-rekany-cream bg-rekany-white"
                  >
                    <img
                      src={img}
                      alt={`${section.title} ${imageIndex + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/5 transition group-hover:bg-black/0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}