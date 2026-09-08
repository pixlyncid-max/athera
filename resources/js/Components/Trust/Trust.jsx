import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

const STATS = [
  { value: 10000, suffix: "+", label: "Profesional Terhubung" },
  { value: 120, suffix: "+", label: "Klien Korporat" },
  { value: 15, suffix: "+", label: "Tahun Pengalaman" },
  { value: 98, suffix: "%", label: "Retensi Klien" },
];

const CLIENTS = [
  "Nusantara Energi",
  "Samudra Logistik",
  "Arunika Bank",
  "Graha Medika",
  "Praja Teknologi",
  "Bumi Retail",
];

const Stat = ({ stat, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const unsubscribe = count.on("change", (latest) => {
      setDisplayValue(Math.round(latest).toLocaleString("id-ID"));
    });
    return () => unsubscribe();
  }, [count]);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, stat.value, {
        duration: 2,
        ease: [0.33, 1, 0.68, 1],
        delay: index * 0.1,
      });
      return controls.stop;
    }
  }, [inView, stat.value, index, count]);

  return (
    <div ref={ref} data-testid={`trust-stat-${index}`} className="border-l border-white/10 pl-6">
      <div className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight flex items-baseline text-white">
        <span>{displayValue}</span>
        <span className="text-nexus-accent">{stat.suffix}</span>
      </div>
      <p className="text-nexus-muted text-sm mt-2">{stat.label}</p>
    </div>
  );
};

export default function Trust() {
  const { site_settings = {} } = usePage().props;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const title = site_settings?.home_trust_title || "Dipercaya oleh organisasi yang menuntut standar tertinggi.";
  const desc = site_settings?.home_trust_desc || "Setiap keterlibatan dijalankan dengan kerahasiaan penuh dan tata kelola profesional.";
  const clientLabel = site_settings?.home_trust_client_label || "Klien & Mitra Kami";
  const cta = site_settings?.home_trust_cta || "Lihat Portofolio & Standar Tata Kelola";

  return (
    <section id="kepercayaan" data-testid="trust-section" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
        <img
          src="https://images.pexels.com/photos/6194033/pexels-photo-6194033.jpeg?auto=compress&cs=tinysrgb&w=2000"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nexus-base via-nexus-base/60 to-nexus-base" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-20">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] tracking-tight max-w-xl text-white">
            {title}
          </h2>
          <p className="text-nexus-muted max-w-sm text-sm md:text-base leading-relaxed flex items-start gap-3">
            <ShieldCheck size={20} className="text-nexus-accent shrink-0 mt-0.5" strokeWidth={1.5} />
            {desc}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-24"
        >
          {STATS.map((s, i) => (
            <Stat key={s.label} stat={s} index={i} />
          ))}
        </motion.div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <p className="text-nexus-muted text-xs tracking-[0.3em] uppercase">{clientLabel}</p>
          <Link
            href="/kepercayaan"
            className="inline-flex items-center gap-2 text-xs text-nexus-accent hover:text-nexus-accentHover transition-colors duration-300 font-semibold cursor-pointer"
          >
            {cta}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10">
          {CLIENTS.map((c, i) => (
            <motion.div
              key={c}
              data-testid={`client-logo-${i}`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
              className="flex items-center gap-2 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-[opacity,filter] duration-500 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-nexus-accent" />
              <span className="font-display font-bold uppercase tracking-[0.14em] text-xs sm:text-sm text-white whitespace-nowrap">
                {c}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
