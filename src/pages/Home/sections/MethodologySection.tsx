import { motion } from "framer-motion";
import {
    Sprout,
    Users,
    ClipboardCheck,
    Truck,
    ShoppingBag,
    Award,
    Handshake,
} from "lucide-react";

const steps = [
    {
        icon: Handshake,
        title: "Collaboration Paysanne",
        desc: "Travail main dans la main avec les agriculteurs locaux, respect des savoir-faire traditionnels et partage des connaissances.",
    },
    {
        icon: Users,
        title: "Commerce Équitable",
        desc: "Partenariat juste avec les paysans locaux pour garantir une rémunération équitable et des conditions de travail dignes.",
    },
    {
        icon: ClipboardCheck,
        title: "Contrôle & Traçabilité",
        desc: "Suivi numérique rigoureux de chaque produit, de la récolte jusqu'au consommateur final pour une transparence totale.",
    },
    {
        icon: Truck,
        title: "Logistique Transparente",
        desc: "Livraison en ligne avec suivi en temps réel pour garantir la fraîcheur et la qualité des produits.",
    },
    {
        icon: ShoppingBag,
        title: "Distribution Équitable",
        desc: "Vente en grandes surfaces, marchés dédiés et e-commerce avec des prix adaptés au pouvoir d'achat local.",
    },
    {
        icon: Sprout,
        title: "Culture Bio & Qualité",
        desc: "Production biologique de qualité exceptionnelle, respectueuse de l'environnement et des traditions paysannes, pour la santé des consommateurs.",
    },
];

export default function MethodologySection() {
    return (
        <section className="py-20 bg-rekany-cream text-rekany-gray">
            <div className="mx-auto max-w-7xl px-4">

                <div className="text-center max-w-2xl mx-auto">
                    <span className="inline-flex items-center gap-2 rounded-full bg-rekany-orange/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-rekany-orange border border-rekany-orange/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-rekany-orange" />
                        Notre Engagement
                    </span>

                    <h2 className="mt-4 text-3xl md:text-5xl font-poppins font-bold text-rekany-gray">
                        Du champ à votre table
                    </h2>

                    <p className="mt-4 text-rekany-gray/70 text-sm md:text-base">
                        Un processus transparent et responsable, en étroite collaboration avec les paysans, pour garantir la qualité à chaque étape.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, i) => {
                        const Icon = step.icon;

                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.07,
                                }}
                                className="group rounded-2xl border border-rekany-cream bg-rekany-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-rekany-orange/30"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 grid place-items-center rounded-xl bg-rekany-orange/10 text-rekany-orange group-hover:bg-rekany-orange group-hover:text-white transition-all duration-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="text-xs text-rekany-gray/50">
                                            Étape {String(i + 1).padStart(2, "0")}
                                        </div>
                                        <div className="font-bold text-rekany-gray">
                                            {step.title}
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm text-rekany-gray/70">
                                    {step.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-3 rounded-full bg-rekany-orange/10 px-6 py-3 border border-rekany-orange/20">
                        <span className="text-sm font-semibold text-rekany-orange">
                            🌱 "BIO & QUALITÉ POUR TOUS" — Paysans au centre, qualité au service du bien-être
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}