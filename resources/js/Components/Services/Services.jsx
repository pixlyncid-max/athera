import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, UserSearch, Award, BarChart3, RefreshCcw, Users, ArrowUpRight } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

const SERVICES = [
  {
    icon: Compass,
    title: "Konsultasi Strategi HR",
    body: "Perancangan fungsi SDM end-to-end: struktur organisasi, job grading, remunerasi, hingga HR roadmap multi-tahun yang selaras dengan sasaran bisnis.",
    large: true,
  },
  {
    icon: UserSearch,
    title: "Akuisisi & Seleksi Talenta",
    body: "Executive search dan asesmen berbasis kompetensi untuk menemukan kandidat yang tepat secara kualitas dan budaya.",
  },
  {
    icon: Award,
    title: "Pengembangan Kepemimpinan",
    body: "Program leadership pipeline, coaching eksekutif, dan suksesi untuk mengamankan estafet kepemimpinan.",
  },
  {
    icon: BarChart3,
    title: "People Analytics",
    body: "Dashboard dan metrik SDM yang mengubah data kepegawaian menjadi keputusan strategis.",
  },
  {
    icon: RefreshCcw,
    title: "Transformasi Budaya",
    body: "Fasilitasi perubahan budaya organisasi saat merger, ekspansi, atau repositioning bisnis.",
  },
  {
    icon: Users,
    title: "HR Outsourcing",
    body: "Dukungan operasional HR — payroll, administrasi, dan kepatuhan ketenagakerjaan — agar tim Anda fokus pada hal strategis.",
  },
];

const Card = ({ service, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;
  return (
    <motion.div
      ref={ref}
      data-testid={`service-card-${index}`}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.1, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      className={`group relative bg-nexus-surface border border-white/10 rounded-xl p-8 lg:p-10 overflow-hidden hover:border-nexus-accent/40 transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between ${
        service.large ? "lg:col-span-2" : ""
      }`}
    >
      <div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nexus-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-accent" />
        <div className="w-12 h-12 rounded-lg bg-nexus-elevated border border-white/5 flex items-center justify-center mb-6">
          <Icon size={24} className="text-nexus-accent" strokeWidth={1.5} />
        </div>
        <h3 className="font-display font-bold text-xl sm:text-2xl mb-3 text-white">{service.title}</h3>
        <p className="text-nexus-muted leading-relaxed text-sm md:text-base mb-6">{service.body}</p>
      </div>
      <Link
        href="/layanan"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-nexus-accent hover:text-nexus-accentHover transition-colors mt-auto"
      >
        Pelajari rincian
        <ArrowUpRight size={14} />
      </Link>
    </motion.div>
  );
};

export default function Services() {
  const { site_settings = {} } = usePage().props;
  const title = site_settings?.home_services_title || "Solusi menyeluruh\nuntuk siklus talenta.";
  const cta = site_settings?.home_services_cta || "Lihat Semua Layanan & Detail";

  return (
    <section id="layanan" data-testid="services-section" className="relative py-28 lg:py-40 bg-nexus-surface/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] tracking-tight text-white whitespace-pre-line">
              {title}
            </h2>
          </div>
          <Link
            href="/layanan"
            data-testid="services-cta"
            className="inline-flex items-center gap-2 text-sm text-nexus-accent hover:text-nexus-accentHover transition-colors duration-300 group cursor-pointer"
          >
            {cta}
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <Card key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
