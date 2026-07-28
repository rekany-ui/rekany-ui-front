import React, { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Phone,        // ← Gardez (votre version)
  MapPin,       // ← Gardez (votre version)
  Clock,
  Leaf,
  Send,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Globe,
  CheckCircle,  // ← Ajoutez (version distante)
  Download,     // ← Ajoutez (version distante)
} from "lucide-react";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import rizierImage from "../../assets/images/rizier.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const contactMethods = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+261 32 05 436 53",
    hint: "Lun – Sam · 8h – 17h",
    href: "tel:+261 32 05 436 53",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@rekany.mg",
    hint: "Réponse sous 24 h",
    href: "mailto:contact@rekany.mg",
  },
  {
    icon: MapPin,
    label: "Siège social",
    value: "Antananarivo, Madagascar",
    hint: "Lot IIK 60 B Mahatony",
    href: "https://maps.google.com/?q=Antananarivo+Madagascar",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+261 32 07 400 06",
    hint: "Chat professionnel 7j/7",
    href: "https://wa.me/261320740006",
  },
] as const;

const subjects = [
  { id: "particulier", label: "Commande particulier" },
  { id: "grande-surface", label: "Grande surface" },
  { id: "export", label: "Export international" },
  { id: "restaurant", label: "Restaurant / Hôtel" },
  { id: "partenariat", label: "Partenariat agriculteur" },
  { id: "autre", label: "Autre demande" },
] as const;

export default function ContactPage() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("particulier");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });

      setTimeout(() => {
        setSent(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen pt-20 pb-16 bg-rekany-beige/40 text-rekany-gray">
      {/* Ambient background blur circles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-rekany-dark/10 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-rekany-light/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-rekany-mint/15 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden mx-4 sm:mx-6 lg:mx-8 rounded-3xl pt-14 pb-20 lg:pt-20 lg:pb-28">
        {/* Background image & overlays */}
        <div className="absolute inset-0 -z-10">
          <img
            src={rizierImage}
            alt="Rizières biologiques à Madagascar"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rekany-dark/90 via-rekany-dark/80 to-rekany-dark/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative z-10 mx-auto max-w-7xl px-6"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/25"
            >
              ← Retour à l'accueil
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-rekany-light" /> Parlons de vos besoins
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl font-poppins text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
            On cultive la{" "}
            <span className="bg-gradient-to-r from-rekany-light via-rekany-mint to-white bg-clip-text text-transparent">
              conversation.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Une question sur nos produits bio, un projet d'exportation, une commande en gros ou un
            partenariat avec nos agriculteurs ? Notre équipe vous répond sous 24 heures.
          </p>
        </motion.div>
      </section>

      {/* Main Grid: Contact Cards & Form */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pb-16">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Contact Methods & Hours/Socials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {contactMethods.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.a
                    key={m.label}
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel={m.href.startsWith("http") ? "noreferrer" : undefined}
                    initial={reduce ? undefined : "hidden"}
                    whileInView={reduce ? undefined : "show"}
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp}
                    custom={i}
                    whileHover={{ y: -4 }}
                    className="group glass-card relative overflow-hidden rounded-2xl p-5 border border-white/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-rekany-light/50"
                  >
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-rekany-dark/10 text-rekany-dark transition-colors group-hover:bg-rekany-dark group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-semibold tracking-wide text-rekany-gray/60 uppercase">
                      {m.label}
                    </div>
                    <div className="mt-1 font-poppins text-base font-semibold text-rekany-dark">
                      {m.value}
                    </div>
                    <div className="mt-1 text-xs text-rekany-gray/70">{m.hint}</div>
                    <ArrowRight className="absolute top-5 right-5 h-4 w-4 -translate-x-1 text-rekany-dark opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </motion.a>
                );
              })}
            </div>

            {/* Hours & Social Links */}
            <motion.div
              initial={reduce ? undefined : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true }}
              variants={fadeUp}
              custom={4}
              className="glass-card rounded-2xl p-6 border border-white/60 shadow-sm"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-rekany-dark">
                <Clock className="h-4 w-4 text-rekany-light" /> Horaires d'ouverture
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                {[
                  ["Lundi – Vendredi", "8h00 – 17h00"],
                  ["Samedi", "8h00 – 13h00"],
                  ["Dimanche", "Fermé"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between border-b border-rekany-cream/80 py-2 last:border-0"
                  >
                    <dt className="text-rekany-gray/70">{k}</dt>
                    <dd className="font-medium text-rekany-dark">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 pt-4 border-t border-rekany-cream/80 flex items-center justify-between">
                <span className="text-xs font-medium text-rekany-gray/60 uppercase tracking-wider">
                  Suivez-nous
                </span>
                <div className="flex items-center gap-2">
                  {[
                    { Icon: FiFacebook, label: "Facebook", href: "https://facebook.com" },
                    { Icon: FiInstagram, label: "Instagram", href: "https://instagram.com" },
                    { Icon: FiLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
                    { Icon: Globe, label: "Site Web", href: "#" },
                  ].map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-rekany-cream bg-white text-rekany-gray transition-all hover:-translate-y-0.5 hover:border-rekany-dark hover:text-rekany-dark hover:shadow-md"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 30 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl border border-rekany-cream bg-white p-6 sm:p-10 shadow-sm">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-rekany-light/15 blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-rekany-dark" />
                  <h2 className="font-poppins text-2xl font-bold text-rekany-dark sm:text-3xl">
                    Envoyez-nous un message
                  </h2>
                </div>
                <p className="text-sm text-rekany-gray/70">
                  Remplissez ce formulaire et notre équipe commerciale vous recontactera rapidement.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Nom complet"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jean Rakoto"
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jean@exemple.mg"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Téléphone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+261 34 XX XXX XX"
                    />
                    <Field
                      label="Entreprise / Organisation"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Optionnel"
                    />
                  </div>

                  {/* Interactive Subject Chips */}
                  <div>
                    <label className="mb-2.5 block text-sm font-semibold text-rekany-dark">
                      Sujet de votre demande <span className="text-rekany-marang">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((s) => {
                        const active = selectedSubject === s.id;
                        return (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => setSelectedSubject(s.id)}
                            className={
                              "rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 " +
                              (active
                                ? "border-rekany-dark bg-rekany-dark text-white shadow-md"
                                : "border-rekany-cream bg-rekany-beige/40 text-rekany-gray hover:border-rekany-dark/40 hover:text-rekany-dark")
                            }
                            aria-pressed={active}
                          >
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-rekany-dark"
                    >
                      Votre message <span className="text-rekany-marang">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      maxLength={1000}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Dites-nous en plus sur vos besoins, quantités souhaitées, délais..."
                      className="w-full resize-none rounded-xl border border-rekany-cream bg-rekany-beige/20 px-4 py-3 text-sm text-rekany-gray shadow-sm outline-none transition-all placeholder:text-rekany-gray/40 focus:border-rekany-dark focus:ring-2 focus:ring-rekany-dark/15"
                    />
                  </div>

                  <div className="flex flex-col-reverse items-center gap-4 pt-2 sm:flex-row sm:justify-between">
                    <p className="text-xs text-rekany-gray/60">
                      En envoyant ce message, vous acceptez nos mentions légales.
                    </p>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rekany-dark px-7 py-3.5 font-poppins text-sm font-semibold text-white shadow-md transition-all hover:bg-rekany-dark/90 disabled:opacity-50 sm:w-auto"
                    >
                      {sent ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-rekany-light" /> Message envoyé
                        </>
                      ) : isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          Envoyer le message
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map & Office Location */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 30 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-3xl border border-rekany-cream bg-white shadow-sm"
        >
          <div className="grid gap-0 md:grid-cols-5">
            <div className="p-8 md:col-span-2 md:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rekany-dark/10 px-3 py-1 text-xs font-semibold text-rekany-dark uppercase tracking-wider">
                  <MapPin className="h-3.5 w-3.5" /> Nous rendre visite
                </span>
                <h3 className="mt-4 font-poppins text-2xl font-bold text-rekany-dark sm:text-3xl">
                  Siège REKANY AGRI
                </h3>
                <p className="mt-3 text-rekany-gray/80 leading-relaxed">
                  Lot IIK 60 B Mahatony
                  <br />
                  101 Antananarivo, Madagascar
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="https://maps.google.com/?q=Antananarivo+Madagascar"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-rekany-dark hover:underline"
                >
                  Ouvrir dans Google Maps <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="relative min-h-[300px] md:col-span-3">
              <iframe
                title="Localisation REKANY AGRI - Antananarivo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242859.2547627579!2d47.40107905!3d-18.88792905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07de34f1f4eb3%3A0xdf10b5c0d41466c0!2sAntananarivo%2C%20Madagascar!5e0!3m2!1sfr!2s!4v1700000000000!5m2!1sfr!2s"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[15%]"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/261320740006"
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-emerald-500"
        aria-label="Contact WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" />
        <span className="absolute right-16 whitespace-nowrap rounded-lg bg-rekany-dark px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          Discuter sur WhatsApp
        </span>
      </a>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-rekany-dark">
        {label}
        {required && <span className="ml-0.5 text-rekany-marang">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        maxLength={255}
        placeholder={placeholder}
        className="w-full rounded-xl border border-rekany-cream bg-rekany-beige/20 px-4 py-3 text-sm text-rekany-gray shadow-sm outline-none transition-all placeholder:text-rekany-gray/40 focus:border-rekany-dark focus:ring-2 focus:ring-rekany-dark/15"
      />
    </div>
  );
}