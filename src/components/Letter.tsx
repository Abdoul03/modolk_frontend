import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import logoImage from "@/assets/modolk-logo.png";

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

const Letter = () => {
  return (
    <div>
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
    </div>
  );
};

export default Letter;
