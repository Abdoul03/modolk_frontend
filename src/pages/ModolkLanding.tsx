import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import logoImage from "@/assets/modolk-logo.png";

import productHero2 from "@/assets/product-hero-2.jpg";

import editorialLookbook from "@/assets/editorial-lookbook.jpg";

import Footer from "@/components/Footer";
import Letter from "@/components/Letter";
import Trust from "@/components/Trust";
import Exposition from "@/components/Exposition";
import ExcluService from "@/components/ExcluService";
import Boutique from "@/components/Boutique";
import StoryStrip from "@/components/StoryStrip";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

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

export default function ModolkLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ═══════════════════════ NAVIGATION ═══════════════════════ */}
      <Navbar />
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <HeroSection />
      {/* ═══════════════════════ BRAND STORY STRIP ═══════════════════════ */}
      <StoryStrip />
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
      <Boutique />
      {/* ═══════════════════════ SUR-MESURE ═══════════════════════ */}
      <ExcluService />
      {/* ═══════════════════════ LOOKBOOK ═══════════════════════ */}
      <Exposition />
      {/* ═══════════════════════ TRUST FEATURES ═══════════════════════ */}
      <Trust />
      {/* ═══════════════════════ NEWSLETTER ═══════════════════════ */}
      <Letter />
      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <Footer />
    </div>
  );
}
