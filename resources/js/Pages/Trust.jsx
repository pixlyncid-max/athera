import { useRef, useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, useInView, useMotionValue, useScroll, useTransform, animate } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Award,
  Building2,
  FileCheck2,
  Scale,
  Users,
  ArrowUpRight,
  ArrowDown,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import PublicLayout from "@/Layouts/PublicLayout";

const HERO_LINES = ["Dipercaya Korporasi", "yang Menuntut", "Integritas Tertinggi."];

const lineVariant = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: "0%",
    transition: { delay: 0.15 + i * 0.13, duration: 0.9, ease: [0.33, 1, 0.68, 1] },
  }),
};

const STATS = [
  { value: 10000, suffix: "+", label: "Talenta & Profesional Terhubung", desc: "Database talenta tervalidasi di berbagai spesialisasi industri" },
  { value: 120, suffix: "+", label: "Klien Korporat & Institusi", desc: "Dari perusahaan multinasional hingga BUMN dan unicorn" },
  { value: 15, suffix: "+", label: "Tahun Rekam Jejak Gabungan", desc: "Dipimpin oleh konsultan senior dan mantan eksekutif HR" },
  { value: 98, suffix: "%", label: "Tingkat Retensi Klien", desc: "Kemitraan jangka panjang berbasis kepuasan dan hasil nyata" },
];

const TRUST_PILLARS = [
  {
    icon: Lock,
    title: "Kerahasiaan Ketat (Non-Disclosure)",
    desc: "Setiap data kandidat, struktur gaji, dan strategi korporat dilindungi oleh perjanjian kerahasiaan berkekuatan hukum penuh dengan protokol keamanan data ketat.",
  },
  {
    icon: Scale,
    title: "Kepatuhan Hukum & Regulasi 100%",
    desc: "Seluruh rekomendasi dan implementasi selaras dengan UU Ketenagakerjaan RI, UU Cipta Kerja, aturan BPJS, dan standar perpajakan resmi.",
  },
  {
    icon: Award,
    title: "Metodologi Terakreditasi Global",
    desc: "Kami menerapkan framework penilaian berstandar internasional (Hay Group, Mercer, Hogan Assessment, dan ICF Coaching Competencies).",
  },
  {
    icon: FileCheck2,
    title: "Service Level Agreement (SLA) Terukur",
    desc: "Komitmen waktu respon, garansi penggantian talenta, dan milestone berkala yang tertuang transparan dalam kontrak kerja sama.",
  },
];

const CLIENT_LOGOS = [
  { name: "Nusantara Energi", sector: "Energi & Sumber Daya" },
  { name: "Samudra Logistik", sector: "Supply Chain & Maritim" },
  { name: "Arunika Bank", sector: "Perbankan & Finansial" },
  { name: "Graha Medika", sector: "Layanan Kesehatan" },
  { name: "Praja Teknologi", sector: "Software & Digital" },
  { name: "Bumi Retail", sector: "FMCG & Jaringan Retail" },
  { name: "Adidaya Manufaktur", sector: "Manufaktur Presisi" },
  { name: "Kencana Properti", sector: "Real Estate & Konstruksi" },
];

const CASE_STUDIES = [
  {
    title: "Restrukturisasi & Job Grading Holding Energi Nasional",
    metric: "4.200+",
    metricLabel: "Posisi distandardisasi",
    result: "Menyelaraskan struktur 6 anak perusahaan menjadi 1 matriks grading seragam tanpa perselisihan industrial dalam 8 bulan.",
  },
  {
    title: "Executive Search & C-Suite Pipeline Konglomerasi Teknologi",
    metric: "94%",
    metricLabel: "Kandidat lolos masa percobaan",
    result: "Menempatkan 14 posisi kepemimpinan strategis (CTO, CPO, VP Engineering) dengan rata-rata waktu pemenuhan 42 hari.",
  },
  {
    title: "Transformasi People Analytics Perbankan Komersial",
    metric: "24%",
    metricLabel: "Penurunan turnover sukarela",
    result: "Membangun model prediktif retensi dan sistem manajemen kinerja berbasis OKR untuk 1.800+ staf operasional.",
  },
];

const StatCard = ({ stat, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
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
        duration: 2.2,
        ease: [0.33, 1, 0.68, 1],
        delay: index * 0.12,
      });
      return controls.stop;
    }
  }, [inView, stat.value, index, count]);

  return (
    <div
      ref={ref}
      data-testid={`trust-stat-page-${index}`}
      className="bg-nexus-surface/60 border border-white/10 rounded-2xl p-8 hover:border-nexus-accent/30 transition-all duration-300"
    >
      <div className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight flex items-baseline text-white mb-2">
        <span>{displayValue}</span>
        <span className="text-nexus-accent">{stat.suffix}</span>
      </div>
      <h3 className="font-display font-bold text-white text-base mb-2">{stat.label}</h3>
      <p className="text-nexus-muted text-xs leading-relaxed">{stat.desc}</p>
    </div>
  );
};

export default function TrustPage({ stats = [], clients = [], caseStudies = [], settings = {} }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const statsToRender = stats && stats.length > 0 ? stats : STATS;
  const clientsToRender = clients && clients.length > 0 ? clients : CLIENT_LOGOS;
  const caseStudiesToRender = caseStudies && caseStudies.length > 0 ? caseStudies : CASE_STUDIES;

  const heroLines = [
    settings?.about_hero_line_1 || HERO_LINES[0],
    settings?.about_hero_line_2 || HERO_LINES[1],
    settings?.about_hero_line_3 || HERO_LINES[2],
  ];

  const heroSubtitle =
    settings?.about_hero_subtitle ||
    "Kemitraan strategis yang berlandaskan pada kerahasiaan institusional, kepatuhan hukum 100%, dan standar eksekusi tanpa kompromi untuk organisasi terkemuka di Indonesia.";

  const scrollToSection = (e) => {
    e.preventDefault();
    const el = document.getElementById("statistik-kemitraan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PublicLayout>
      <Head>
        <title>Kepercayaan & Kredibilitas — Athera Nexus</title>
        <meta
          name="description"
          content="Lihat rekam jejak, klien korporat, standar kepatuhan tata kelola, dan bukti kredibilitas Athera Nexus dalam mendampingi transformasi human capital terkemuka."
        />
      </Head>

      {/* Hero Header matching Beranda layout */}
      <section ref={heroRef} className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6194033/pexels-photo-6194033.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="Kepercayaan Athera Nexus"
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
                  className={`block ${i === 2 ? "text-nexus-accent" : ""}`}
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
              data-testid="trust-cta-primary"
              className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-7 py-3.5 rounded-full hover:bg-nexus-accentHover hover:scale-[1.02] active:scale-[0.98] transition-[background-color,transform] duration-300 cursor-pointer shadow-lg"
            >
              Mulai Kemitraan
              <ArrowUpRight size={18} />
            </Link>
            <button
              onClick={scrollToSection}
              data-testid="trust-cta-secondary"
              className="inline-flex items-center gap-2 border border-white/15 text-white px-7 py-3.5 rounded-full hover:border-nexus-accent hover:text-nexus-accent hover:scale-[1.02] active:scale-[0.98] transition-[border-color,color,transform] duration-300 cursor-pointer"
            >
              Pelajari Kredibilitas
            </button>
          </motion.div>
        </motion.div>

        <button
          onClick={scrollToSection}
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
        </button>
      </section>

      {/* Stats Section */}
      <section id="statistik-kemitraan" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsToRender.map((stat, idx) => (
              <StatCard key={stat.id || stat.label} stat={stat} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pillars of Trust */}
      <section className="py-20 lg:py-28 bg-nexus-surface/40 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              {settings?.about_pillars_title || "4 Pilar Tata Kelola Kemitraan Kami"}
            </h2>
            <p className="text-nexus-muted text-sm sm:text-base mt-4">
              {settings?.about_pillars_desc ||
                "Standar keunggulan operasional yang kami terapkan dalam setiap penugasan konsultasi dan akuisisi talenta."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Lock,
                title: settings?.about_p1_title || "Kerahasiaan Ketat (Non-Disclosure)",
                desc:
                  settings?.about_p1_desc ||
                  "Setiap data kandidat, struktur gaji, dan strategi korporat dilindungi oleh perjanjian kerahasiaan berkekuatan hukum penuh dengan protokol keamanan data ketat.",
              },
              {
                icon: Scale,
                title: settings?.about_p2_title || "Kepatuhan Hukum & Regulasi 100%",
                desc:
                  settings?.about_p2_desc ||
                  "Seluruh rekomendasi dan implementasi selaras dengan UU Ketenagakerjaan RI, UU Cipta Kerja, aturan BPJS, dan standar perpajakan resmi.",
              },
              {
                icon: Award,
                title: settings?.about_p3_title || "Metodologi Terakreditasi Global",
                desc:
                  settings?.about_p3_desc ||
                  "Kami menerapkan framework penilaian berstandar internasional (Hay Group, Mercer, Hogan Assessment, dan ICF Coaching Competencies).",
              },
              {
                icon: FileCheck2,
                title: settings?.about_p4_title || "Service Level Agreement (SLA) Terukur",
                desc:
                  settings?.about_p4_desc ||
                  "Komitmen waktu respon, garansi penggantian talenta, dan milestone berkala yang tertuang transparan dalam kontrak kerja sama.",
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-nexus-surface border border-white/10 rounded-2xl p-8 flex items-start gap-6 hover:border-nexus-accent/40 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-nexus-elevated border border-white/10 flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-nexus-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">{pillar.title}</h3>
                    <p className="text-nexus-muted text-sm leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies / Highlights */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {settings?.about_cases_title || "Studi Kasus & Transformasi Terpilih"}
              </h2>
              {settings?.about_cases_desc && (
                <p className="text-nexus-muted text-sm sm:text-base mt-2">{settings.about_cases_desc}</p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudiesToRender.map((cs, i) => (
              <motion.div
                key={cs.id || cs.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="bg-nexus-elevated/50 border border-white/10 rounded-2xl p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="border-b border-white/5 pb-6 mb-6">
                    <div className="font-display font-black text-4xl text-nexus-accent mb-1">
                      {cs.metric}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-nexus-muted">
                      {cs.metric_label || cs.metricLabel}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-3">{cs.title}</h3>
                  <p className="text-nexus-muted text-sm leading-relaxed">{cs.result}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients & Industry Grid */}
      <section className="py-20 lg:py-28 bg-nexus-surface/30 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-nexus-muted">
              Portofolio Mitra Industri
            </span>
            <h2 className="font-display font-bold text-2xl text-white mt-2">
              Jejaring Klien Lintas Sektor
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {clientsToRender.map((c, i) => (
              <motion.div
                key={c.id || c.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-nexus-base/60 border border-white/5 rounded-xl p-6 text-center hover:border-nexus-accent/30 transition-colors duration-300"
              >
                <div className="w-2 h-2 rounded-full bg-nexus-accent mx-auto mb-3" />
                <div className="font-display font-bold text-white text-sm sm:text-base tracking-wide">
                  {c.name}
                </div>
                <div className="text-nexus-muted text-xs mt-1">{c.sector}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
