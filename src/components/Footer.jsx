import { Leaf } from "lucide-react";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";
import avemaLogo from "../assets/images/AVEMA.png";
import fedemLogo from "../assets/images/fedem.jpeg";
import connectLogo from "../assets/images/connect.jpeg";
import exportLogo from "../assets/images/export.jpeg";

export default function Footer() {
  return (
    <footer className="bg-rekany-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                <img
                  src={avemaLogo}
                  alt="Rekany Agri"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-poppins font-bold text-xl">REKANY AGRI</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              « Bio Pour Tous » — L'homme au centre de nos préoccupations et la
              technologie au service de nos produits et de votre bien-être.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rekany-light transition-colors"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rekany-light transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rekany-light transition-colors"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rekany-light transition-colors"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Navigation</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>
                <Link to="/" className="hover:text-rekany-light transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/produits" className="hover:text-rekany-light transition-colors">
                  Nos Produits
                </Link>
              </li>
              <li>
                <Link to="/tracabilite" className="hover:text-rekany-light transition-colors">
                  Traçabilité
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-rekany-light transition-colors">
                  Développement Durable
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rekany-light transition-colors">
                  Actualités
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rekany-light transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Produits */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Nos Produits</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>
                <a href="#" className="hover:text-rekany-light transition-colors">
                  Riz Bio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rekany-light transition-colors">
                  Légumes & Fruits Bio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rekany-light transition-colors">
                  Épices Bio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rekany-light transition-colors">
                  Miel Naturel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rekany-light transition-colors">
                  Huiles Naturelles
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">
              Recevez nos actualités et offres bio.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-rekany-light transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full bg-rekany-light hover:bg-rekany-light/90 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Section Partenaires */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h4 className="font-poppins font-semibold text-lg text-center mb-6">
            Nos Partenaires
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="w-full max-w-[150px] h-[80px] flex items-center justify-center">
              <img
                src={avemaLogo}
                alt="AVEMA"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
            <div className="w-full max-w-[150px] h-[80px] flex items-center justify-center">
              <img
                src={fedemLogo}
                alt="FEDEM"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
            <div className="w-full max-w-[150px] h-[80px] flex items-center justify-center">
              <img
                src={connectLogo}
                alt="Connect"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
            <div className="w-full max-w-[150px] h-[80px] flex items-center justify-center">
              <img
                src={exportLogo}
                alt="Export"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/40 text-sm">
            © 2026 REKANY AGRI. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-white transition-colors">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}