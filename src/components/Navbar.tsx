import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import logoImage from "@/assets/modolk-logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/98 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left nav */}
            <div className="flex items-center gap-6 flex-1">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`transition-colors ${
                  scrolled ? "text-foreground" : "text-background"
                } hover:text-primary`}
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <div className="hidden lg:flex items-center gap-8">
                {["Collections", "Homme", "Femme", "Sur-mesure"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-colors hover:text-primary ${
                      scrolled ? "text-foreground" : "text-background"
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Center: LOGO - Prominent */}
            <a
              href="#"
              className="flex flex-col items-center gap-1 flex-shrink-0 group"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                src={logoImage}
                alt="MODOL'K"
                className="h-12 md:h-16 w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
              />
            </a>

            {/* Right actions */}
            <div className="flex items-center gap-5 flex-1 justify-end">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`transition-colors hover:text-primary ${
                  scrolled ? "text-foreground" : "text-background"
                }`}
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <button
                className={`transition-colors hover:text-primary hidden md:block ${
                  scrolled ? "text-foreground" : "text-background"
                }`}
              >
                <User className="w-[18px] h-[18px]" />
              </button>
              <button
                className={`transition-colors hover:text-primary relative ${
                  scrolled ? "text-foreground" : "text-background"
                }`}
              >
                <Heart className="w-[18px] h-[18px]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                className={`transition-colors hover:text-primary relative ${
                  scrolled ? "text-foreground" : "text-background"
                }`}
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg"
            >
              <div className="container mx-auto px-4 md:px-8 py-6">
                <div className="flex items-center gap-3 max-w-xl mx-auto">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit, une collection..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg overflow-hidden lg:hidden"
            >
              <div className="container mx-auto px-4 py-8 space-y-1">
                {[
                  "Collections",
                  "Homme",
                  "Femme",
                  "Sur-mesure",
                  "Lookbook",
                  "À propos",
                  "Contact",
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="flex items-center justify-between py-3 text-sm tracking-[0.1em] uppercase text-foreground hover:text-primary transition-colors border-b border-border/30"
                  >
                    {item}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
