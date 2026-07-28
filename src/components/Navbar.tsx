import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import iconImage from "../assets/images/icon.jpeg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
            {/* Logo */}
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

            {/* Desktop Menu */}
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
              <button className="btn-primary text-white px-6 py-2.5 rounded-full font-medium text-sm">
                Commander
              </button>
            </div>

            {/* Mobile menu button */}
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

      {/* Mobile Menu */}
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
              <button className="btn-primary w-full text-white px-6 py-2.5 rounded-full font-medium text-sm">
                Commander
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}