import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import iconImage from "../assets/images/icon.jpeg";
import { useCart } from "@/context/useCart";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Nos Produits", path: "/produits" },
    { name: "À Propos", path: "/a-propos" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""
        }`}
    >
      <div className="glass-card border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-15 h-15 rounded-full bg-gradient-to-br from-rekany-dark to-rekany-light flex items-center justify-center overflow-hidden">
                <img
                  src={iconImage}
                  alt="Rekany Agri"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-poppins font-bold text-xl text-rekany-dark tracking-tight">
                REKANY AGRI
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link text-sm font-medium transition-colors ${isActive
                      ? "text-rekany-dark font-semibold"
                      : "text-rekany-gray hover:text-rekany-dark"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/panier"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-rekany-gray transition-colors hover:bg-rekany-cream hover:text-rekany-dark"
                aria-label="Voir le panier"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rekany-dark text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            <button
              className="md:hidden text-rekany-gray p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/20">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${location.pathname === link.path
                  ? "text-rekany-dark font-semibold bg-rekany-light/10"
                  : "text-rekany-gray hover:text-rekany-dark hover:bg-white/40"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/panier"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-rekany-dark px-6 py-2.5 text-sm font-medium text-white"
              >
                <ShoppingCart className="h-4 w-4" />
                Panier {totalItems > 0 && `(${totalItems})`}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}