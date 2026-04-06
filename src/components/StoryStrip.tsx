import { motion } from "framer-motion";

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

const StoryStrip = () => {
  return (
    <div>
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
    </div>
  );
};

export default StoryStrip;
