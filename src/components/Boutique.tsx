import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import { ArrowRight, Heart } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
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

const Boutique = () => {
  const [activeFilter, setActiveFilter] = useState("Tout");
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const addToCart = () => setCartCount((prev) => prev + 1);

  return (
    <div>
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
    </div>
  );
};

export default Boutique;
