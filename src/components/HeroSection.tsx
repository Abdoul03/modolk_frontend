import { motion } from "framer-motion";
import heroMain from "@/assets/hero-main.jpg";
import logoImage from "@/assets/modolk-logo.png";

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const HeroSection = () => {
  return (
    <div>
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
    </div>
  );
};

export default HeroSection;
