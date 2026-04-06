import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Star,
  Truck,
  RotateCcw,
  Shield,
  MessageCircle,
  Instagram,
  Phone,
  Play,
  Pause,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import logoImage from "@/assets/modolk-logo.png";
import heroMain from "@/assets/hero-main.jpg";
import productHero1 from "@/assets/product-hero-1.jpg";
import productHero2 from "@/assets/product-hero-2.jpg";
import editorialLookbook from "@/assets/editorial-lookbook.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const products = [
  {
    id: 1,
    name: "Blazer Signature Doré",
    category: "Homme",
    price: "185 000",
    image: product1,
    tag: "Nouveau",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Robe Soirée Sahel",
    category: "Femme",
    price: "145 000",
    image: product2,
    tag: "Best-seller",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 3,
    name: "Ensemble Nuit Noire",
    category: "Femme",
    price: "120 000",
    image: product3,
    tag: "Édition limitée",
    sizes: ["S", "M", "L"],
  },
  {
    id: 4,
    name: "Chemise Premium Lin",
    category: "Homme",
    price: "65 000",
    image: product4,
    tag: "Essentiel",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

export default function ModolkLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState("Tout");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const addToCart = () => setCartCount((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ═══════════════════════ NAVIGATION ═══════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/98 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Top announcement */}
        {/* <div className={`text-center py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-500 ${
          scrolled ? "bg-primary/5 text-primary" : "bg-accent/80 text-accent-foreground"
        }`}>
          Livraison offerte dès 150 000 FCFA — Retours gratuits sous 14 jours
        </div> */}

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

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={heroMain}
            alt="MODOL'K Collection"
            className="w-full h-full object-cover object-top"
            width={1920}
            height={1280}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />

        {/* African-inspired decorative line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="text-center px-4"
          >
            {/* Logo prominent in hero */}
            <motion.div variants={scaleIn} className="mb-6">
              <img
                src={logoImage}
                alt="MODOL'K"
                className="h-20 md:h-28 lg:h-36 w-auto mx-auto drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(184, 134, 59, 0.3))",
                }}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <span className="w-12 h-[1px] bg-primary/60" />
              <span className="text-primary text-[10px] tracking-[0.5em] uppercase font-medium">
                Paris • Bamako • Abidjan
              </span>
              <span className="w-12 h-[1px] bg-primary/60" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[0.15em] mb-3"
              style={{ color: "hsl(40, 33%, 97%)" }}
            >
              MODOL'K
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-heading text-lg md:text-xl italic tracking-wide mb-10"
              style={{ color: "hsl(40, 55%, 70%)" }}
            >
              L'art du tissu, l'âme de l'élégance
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#boutique"
                className="inline-block bg-primary text-primary-foreground px-12 py-4 text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg"
              >
                Découvrir la collection
              </a>
              <a
                href="#lookbook"
                className="inline-flex items-center justify-center gap-2 px-12 py-4 text-[11px] tracking-[0.25em] uppercase font-semibold border transition-all duration-300"
                style={{
                  borderColor: "hsl(40, 33%, 97%, 0.4)",
                  color: "hsl(40, 33%, 97%)",
                }}
              >
                Lookbook
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span
            className="text-[9px] tracking-[0.3em] uppercase"
            style={{ color: "hsl(40, 33%, 97%, 0.5)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-6 bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════ BRAND STORY STRIP ═══════════════════════ */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center"
          >
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center"
            >
              <span className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                100%
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                Fait main
              </span>
            </motion.div>
            <div className="hidden md:block w-[1px] h-12 bg-border" />
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center"
            >
              <span className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                3
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                Ateliers
              </span>
            </motion.div>
            <div className="hidden md:block w-[1px] h-12 bg-border" />
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center"
            >
              <span className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                2 500+
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                Clients
              </span>
            </motion.div>
            <div className="hidden md:block w-[1px] h-12 bg-border" />
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center"
            >
              <span className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                15+
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                Pays
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ EDITORIAL SPLIT ═══════════════════════ */}
      <section className="grid md:grid-cols-2 min-h-[70vh]">
        {/* Left: Image */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative overflow-hidden"
        >
          <img
            src={productHero2}
            alt="Collection Homme"
            className="w-full h-full object-cover min-h-[400px]"
            loading="lazy"
            width={960}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-2">
              Collection
            </p>
            <h3
              className="font-heading text-3xl md:text-4xl font-semibold"
              style={{ color: "hsl(40, 33%, 97%)" }}
            >
              Homme
            </h3>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-4 text-[11px] tracking-[0.2em] uppercase font-medium border-b pb-1 transition-colors hover:text-primary hover:border-primary"
              style={{
                color: "hsl(40, 33%, 97%)",
                borderColor: "hsl(40, 33%, 97%, 0.5)",
              }}
            >
              Explorer <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Right: Content + smaller image */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative overflow-hidden"
        >
          <img
            src={editorialLookbook}
            alt="Collection Femme"
            className="w-full h-full object-cover min-h-[400px]"
            loading="lazy"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-2">
              Collection
            </p>
            <h3
              className="font-heading text-3xl md:text-4xl font-semibold"
              style={{ color: "hsl(40, 33%, 97%)" }}
            >
              Femme
            </h3>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-4 text-[11px] tracking-[0.2em] uppercase font-medium border-b pb-1 transition-colors hover:text-primary hover:border-primary"
              style={{
                color: "hsl(40, 33%, 97%)",
                borderColor: "hsl(40, 33%, 97%, 0.5)",
              }}
            >
              Explorer <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════ LOGO SHOWCASE STRIP ═══════════════════════ */}
      <section className="py-20 md:py-28 bg-card relative overflow-hidden">
        {/* Subtle African-inspired geometric pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 1px, transparent 0, transparent 50%)`,
            backgroundSize: "30px 30px",
          }}
        />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.img
              variants={scaleIn}
              src={logoImage}
              alt="MODOL'K"
              className="h-24 md:h-32 w-auto mx-auto mb-8 object-contain"
              style={{
                filter: "drop-shadow(0 0 30px rgba(184, 134, 59, 0.2))",
              }}
            />
            <motion.p
              variants={fadeUp}
              className="text-[10px] tracking-[0.5em] uppercase text-primary font-medium mb-4"
            >
              Maison de couture
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-2xl md:text-4xl text-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Là où l'héritage africain rencontre
              <br />
              l'élégance contemporaine
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <span className="w-16 h-[1px] bg-primary/40" />
              <span className="text-primary text-lg">◆</span>
              <span className="w-16 h-[1px] bg-primary/40" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ BOUTIQUE ═══════════════════════ */}
      <section id="boutique" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="flex flex-col md:flex-row md:items-end justify-between mb-12"
            >
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-medium mb-2">
                  Boutique
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
                  Pièces sélectionnées
                </h2>
              </div>
              <div className="flex gap-6 mt-4 md:mt-0">
                {["Tout", "Homme", "Femme"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`text-[11px] tracking-[0.15em] uppercase pb-1 transition-all duration-300 ${
                      activeFilter === filter
                        ? "text-foreground border-b-2 border-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {products
                .filter(
                  (p) => activeFilter === "Tout" || p.category === activeFilter,
                )
                .map((product) => (
                  <motion.div
                    key={product.id}
                    variants={fadeUp}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        width={960}
                        height={1280}
                      />
                      <AnimatePresence>
                        {hoveredProduct === product.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/20 flex flex-col justify-end p-4"
                          >
                            <motion.button
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 20, opacity: 0 }}
                              onClick={addToCart}
                              className="w-full bg-background text-foreground py-3 text-[10px] tracking-[0.15em] uppercase font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            >
                              Ajouter au panier
                            </motion.button>
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{
                                y: 0,
                                opacity: 1,
                                transition: { delay: 0.05 },
                              }}
                              exit={{ y: 20, opacity: 0 }}
                              className="flex justify-center gap-2 mt-2"
                            >
                              {product.sizes.map((size) => (
                                <span
                                  key={size}
                                  className="text-[10px] bg-black/40 px-2 py-1 hover:bg-primary cursor-pointer transition-colors"
                                  style={{ color: "hsl(40, 33%, 97%, 0.8)" }}
                                >
                                  {size}
                                </span>
                              ))}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            wishlist.includes(product.id)
                              ? "fill-primary text-primary"
                              : "text-foreground"
                          }`}
                        />
                      </button>
                      <span className="absolute top-3 left-3 text-[9px] tracking-[0.12em] uppercase bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5 font-medium">
                        {product.tag}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-[10px] text-muted-foreground tracking-[0.1em] uppercase">
                        {product.category}
                      </p>
                      <h3 className="text-sm font-medium text-foreground mt-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-foreground mt-1.5 font-semibold">
                        {product.price}{" "}
                        <span className="text-[10px] font-normal text-muted-foreground">
                          FCFA
                        </span>
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>

            <motion.div variants={fadeUp} className="text-center mt-14">
              <a
                href="#"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-foreground font-medium group"
              >
                <span className="border-b border-foreground pb-0.5 group-hover:border-primary group-hover:text-primary transition-colors">
                  Voir toute la collection
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-primary transition-all" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ SUR-MESURE ═══════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={productHero1}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-accent/90" />
        </div>
        {/* Subtle decorative African pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='none' stroke='%23B8863B' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="text-[10px] tracking-[0.4em] uppercase text-primary font-medium mb-4"
              >
                Service exclusif
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-heading text-3xl md:text-5xl text-accent-foreground font-semibold mb-6"
              >
                Sur-mesure
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-accent-foreground/70 leading-relaxed mb-4 text-sm"
              >
                Créez votre pièce unique. Nos maîtres artisans de Bamako
                conçoivent chaque vêtement selon vos mesures exactes, votre
                choix de tissu premium et votre vision.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-accent-foreground/50 leading-relaxed mb-10 text-sm"
              >
                Un service de haute couture accessible, du premier croquis à la
                livraison finale. Consultation en ligne ou en atelier.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#"
                  className="inline-block bg-primary text-primary-foreground px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-primary/90 transition-all duration-300"
                >
                  Prendre rendez-vous
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 text-accent-foreground/70 text-[11px] tracking-[0.2em] uppercase hover:text-primary transition-colors py-4"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </motion.div>
            </div>
            <motion.div
              variants={scaleIn}
              className="hidden md:flex justify-center"
            >
              <img
                src={logoImage}
                alt="MODOL'K"
                className="w-48 h-48 object-contain opacity-20"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ LOOKBOOK ═══════════════════════ */}
      <section id="lookbook" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-medium mb-2">
                Lookbook
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
                Printemps-Été 2026
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {[
                heroMain,
                product1,
                product2,
                product3,
                editorialLookbook,
                productHero2,
              ].map((img, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`relative overflow-hidden group cursor-pointer ${
                    i === 4 ? "col-span-2 aspect-[2/1]" : "aspect-square"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Lookbook ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  {/* Logo watermark on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <img
                      src={logoImage}
                      alt=""
                      className="h-12 w-auto object-contain opacity-60"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ TRUST FEATURES ═══════════════════════ */}
      <section className="py-14 border-y border-border bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Livraison mondiale",
                text: "Express 5-14 jours",
              },
              {
                icon: RotateCcw,
                title: "Retours gratuits",
                text: "Sous 14 jours",
              },
              {
                icon: Shield,
                title: "Paiement sécurisé",
                text: "SSL & 3D Secure",
              },
              { icon: Phone, title: "Service client", text: "WhatsApp 7j/7" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center group">
                <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/5 transition-colors">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-[11px] tracking-[0.1em] uppercase font-semibold text-foreground mb-1">
                  {title}
                </p>
                <p className="text-[11px] text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ NEWSLETTER ═══════════════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-xl text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.img
              variants={scaleIn}
              src={logoImage}
              alt=""
              className="w-16 h-16 mx-auto mb-6 object-contain opacity-40"
            />
            <motion.h2
              variants={fadeUp}
              className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3"
            >
              Rejoignez la Maison
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm text-muted-foreground mb-8 leading-relaxed"
            >
              Recevez en avant-première nos nouvelles collections, offres
              exclusives et invitations aux événements privés.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex gap-0 max-w-md mx-auto"
            >
              <Input
                placeholder="Votre adresse email"
                className="rounded-none border-border focus:border-primary text-sm h-12 flex-1"
              />
              <button className="bg-foreground text-background px-8 h-12 text-[10px] tracking-[0.15em] uppercase font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                S'inscrire
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            <div className="col-span-2 md:col-span-1">
              <img
                src={logoImage}
                alt="MODOL'K"
                className="w-12 h-12 object-contain mb-4"
              />
              <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-3">
                MODOL'K
              </p>
              <p className="text-[11px] text-accent-foreground/50 leading-relaxed">
                Mode premium. Conçu à Bamako, porté dans le monde.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-accent-foreground/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-accent-foreground/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {[
              {
                title: "Boutique",
                links: [
                  "Homme",
                  "Femme",
                  "Sur-mesure",
                  "Accessoires",
                  "Nouveautés",
                ],
              },
              {
                title: "Aide",
                links: [
                  "FAQ",
                  "Livraison",
                  "Retours",
                  "Guide des tailles",
                  "Paiement",
                ],
              },
              {
                title: "Maison",
                links: [
                  "À propos",
                  "Nos artisans",
                  "Durabilité",
                  "Carrières",
                  "Presse",
                ],
              },
              {
                title: "Contact",
                links: ["WhatsApp", "Email", "Instagram", "Rendez-vous"],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-4 text-accent-foreground/80">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[11px] text-accent-foreground/50 hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-accent-foreground/10">
          <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-accent-foreground/30 tracking-wider">
              © 2026 MODOL'K. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              {["CGV", "Confidentialité", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-[10px] text-accent-foreground/30 hover:text-accent-foreground/60 transition-colors tracking-wider"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
