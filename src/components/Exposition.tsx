import logoImage from "@/assets/modolk-logo.png";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

import heroMain from "@/assets/hero-main.jpg";

import productHero2 from "@/assets/product-hero-2.jpg";
import editorialLookbook from "@/assets/editorial-lookbook.jpg";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const Exposition = () => {
  return (
    <div>
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
    </div>
  );
};

export default Exposition;
