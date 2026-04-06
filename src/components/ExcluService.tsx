import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import logoImage from "@/assets/modolk-logo.png";
import productHero1 from "@/assets/product-hero-1.jpg";

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const ExcluService = () => {
  return (
    <div>
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
    </div>
  );
};

export default ExcluService;
