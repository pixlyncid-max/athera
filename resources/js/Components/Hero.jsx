import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { useScrollTo } from "@/Context/ScrollContext";

const DEFAULT_LINES = ["Membangun Ekosistem", "Human Capital yang", "Berdaya Tahan."];

const lineVariant = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: "0%",
    transition: { delay: 0.15 + i * 0.13, duration: 0.9, ease: [0.33, 1, 0.68, 1] },
  }),
};

export default function Hero() {
  const { site_settings = {} } = usePage().props;
  const ref = useRef(null);
  const scrollTo = useScrollTo();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroLines = [
    site_settings?.hero_headline_1 || DEFAULT_LINES[0],
    site_settings?.hero_headline_2 || DEFAULT_LINES[1],
    site_settings?.hero_headline_3 || DEFAULT_LINES[2],
  ];

  const heroSubtitle =
    site_settings?.hero_subtitle ||
    "Konsultan human capital yang membantu organisasi tumbuh melalui strategi SDM yang terukur, akuisisi talenta yang presisi, dan pengembangan kepemimpinan yang berkelanjutan.";

  return (
    <section id="home" ref={ref} data-testid="hero-section" className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1762278805131-496ae6c5b920?q=80&w=2400&auto=format&fit=crop"
          alt="Athera Nexus Office"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nexus-base via-nexus-base/70 to-nexus-base/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-nexus-base/80 via-transparent to-nexus-base/60" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-20 lg:pt-44 lg:pb-24 w-full">


        <h1 className="font-display font-extrabold leading-[1.02] tracking-tight text-5xl sm:text-6xl lg:text-[5.5rem] text-white">
          {heroLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                custom={i}
                variants={lineVariant}
                initial="hidden"
                animate="visible"
                className={`block ${i === 1 ? "text-nexus-accent" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mt-8 max-w-xl text-nexus-muted text-base md:text-lg leading-relaxed"
        >
          {heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/kontak"
            data-testid="hero-cta-primary"
            className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-7 py-3.5 rounded-full hover:bg-nexus-accentHover hover:scale-[1.02] active:scale-[0.98] transition-[background-color,transform] duration-300 cursor-pointer shadow-lg"
          >
            {site_settings?.hero_cta_primary || "Mulai Konsultasi"}
            <ArrowUpRight size={18} />
          </Link>
          <Link
            href="/layanan"
            data-testid="hero-cta-secondary"
            className="inline-flex items-center gap-2 border border-white/15 text-white px-7 py-3.5 rounded-full hover:border-nexus-accent hover:text-nexus-accent hover:scale-[1.02] active:scale-[0.98] transition-[border-color,color,transform] duration-300 cursor-pointer"
          >
            {site_settings?.hero_cta_secondary || "Pelajari Layanan"}
          </Link>
        </motion.div>
      </motion.div>

      <motion.button
        data-testid="hero-scroll-indicator"
        onClick={() => scrollTo("#tentang")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 right-8 lg:right-12 z-10 text-nexus-muted hover:text-nexus-accent transition-colors duration-300 cursor-pointer p-2"
        aria-label="Gulir ke bawah"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={22} />
        </motion.span>
      </motion.button>
    </section>
  );
}
