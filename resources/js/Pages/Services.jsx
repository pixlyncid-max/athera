import { useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Compass,
  UserSearch,
  Award,
  BarChart3,
  RefreshCcw,
  Users,
  ArrowUpRight,
  ArrowDown,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import PublicLayout from "@/Layouts/PublicLayout";

const HERO_LINES = ["Solusi Human Capital", "Presisi untuk Setiap", "Pertumbuhan Bisnis."];

const lineVariant = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: "0%",
    transition: { delay: 0.15 + i * 0.13, duration: 0.9, ease: [0.33, 1, 0.68, 1] },
  }),
};

const DETAILED_SERVICES = [
  {
    id: "strategi-hr",
    icon: Compass,
    badge: "Strategic Advisory",
    title: "Konsultasi Strategi HR & Desain Organisasi",
    description:
      "Perancangan fungsi SDM komprehensif yang menyelaraskan arsitektur human capital dengan visi jangka panjang dan sasaran profitabilitas bisnis.",
    deliverables: [
      "Perancangan Struktur Organisasi & Analisis Beban Kerja (WLA)",
      "Job Grading & Evaluasi Jabatan (Metodologi Teruji)",
      "Remuneration & Compensation Structure (Salary Benchmarking)",
      "Roadmap Strategis Human Capital 3-5 Tahun",
    ],
    impact: "Efisiensi struktur hingga 28% dan kejelasan jalur akuntabilitas organisasi.",
  },
  {
    id: "akuisisi-talenta",
    icon: UserSearch,
    badge: "Executive & Talent Search",
    title: "Akuisisi & Asesmen Talenta Presisi",
    description:
      "Layanan executive search dan asesmen kompetensi mendalam untuk memastikan organisasi Anda dipimpin oleh talenta unggul yang sesuai secara budaya dan kapasitas teknis.",
    deliverables: [
      "Executive Search untuk level C-Suite, Direksi & Senior Management",
      "Assessment Center & Profiling Kompetensi Komprehensif",
      "Psychological & Behavioral Evaluation",
      "Background Check & Due Diligence Profesional",
    ],
    impact: "Tingkat keberhasilan penempatan 95% dengan retensi tahun pertama di atas 92%.",
  },
  {
    id: "kepemimpinan",
    icon: Award,
    badge: "Leadership Pipeline",
    title: "Pengembangan Kepemimpinan & Suksesi",
    description:
      "Mempersiapkan generasi pemimpin masa depan melalui program terstruktur, executive coaching terakreditasi, dan peta suksesi tanpa hambatan.",
    deliverables: [
      "Desain & Eksekusi Leadership Development Program (LDP)",
      "Executive 1-on-1 Coaching bersama Certified Coaches",
      "Peta Rencana Suksesi & High-Potential (HiPo) Identification",
      "Penyusunan Kompetensi Kepemimpinan (Leadership Competency Matrix)",
    ],
    impact: "Mempercepat kesiapan talenta suksesor internal hingga 2x lipat.",
  },
  {
    id: "people-analytics",
    icon: BarChart3,
    badge: "Data-Driven HR",
    title: "People Analytics & Efisiensi Tenaga Kerja",
    description:
      "Mengubah data kepegawaian yang terisolasi menjadi dashboard prediktif dan wawasan strategis untuk pengambilan keputusan manajemen yang tepat.",
    deliverables: [
      "Implementasi HR Metrics & Executive Dashboard Interaktif",
      "Predictive Attrition & Flight-Risk Modeling",
      "Analisis Produktivitas & Return on Human Capital (ROHC)",
      "Penyelarasan Key Performance Indicators (KPI & OKR)",
    ],
    impact: "Penurunan tingkat turnover yang tidak terencana rata-rata 22% dalam 12 bulan.",
  },
  {
    id: "transformasi-budaya",
    icon: RefreshCcw,
    badge: "Culture & Change",
    title: "Transformasi Budaya & Manajemen Perubahan",
    description:
      "Memfasilitasi perubahan mindset dan perilaku kerja saat organisasi melakukan merger, ekspansi skala besar, atau digitalisasi proses bisnis.",
    deliverables: [
      "Culture Diagnostic & Employee Engagement Audit",
      "Change Management Framework & Change Champions Network",
      "Post-Merger / Acquisition HR & Culture Integration",
      "Desain Program Core Values Activation & Internalization",
    ],
    impact: "Adopsi inisiatif perubahan mencapai 89% dalam 6 bulan pertama.",
  },
  {
    id: "hr-outsourcing",
    icon: Users,
    badge: "Managed Operations",
    title: "HR Outsourcing & Kepatuhan Ketenagakerjaan",
    description:
      "Dukungan operasional SDM menyeluruh mulai dari administrasi payroll, kepatuhan hukum tenaga kerja, hingga manajemen kontrak.",
    deliverables: [
      "Full Payroll Processing, PPh 21, dan Pelaporan BPJS",
      "Manajemen Hubungan Industrial & Kepatuhan UU Cipta Kerja",
      "Employee Lifecycle Administration & Onboarding Support",
      "Audit Kepatuhan Ketenagakerjaan (Labor Law Compliance)",
    ],
    impact: "Jaminan 100% kepatuhan regulasi dengan zero penalty dan SLA pemrosesan tepat waktu.",
  },
];

const FRAMEWORK_STEPS = [
  {
    num: "01",
    title: "Diagnosa & Penilaian Mendalam",
    desc: "Kami melakukan audit menyeluruh terhadap arsitektur SDM, data kinerja, dan wawancara pemangku kepentingan untuk memetakan akar tantangan.",
  },
  {
    num: "02",
    title: "Desain Solusi Kustom",
    desc: "Merumuskan intervensi dan strategi yang disesuaikan secara spesifik dengan industri, skala organisasi, dan dinamika pasar Anda.",
  },
  {
    num: "03",
    title: "Implementasi & Pendampingan",
    desc: "Bekerja berdampingan dengan tim internal untuk memastikan eksekusi lancar, transfer pengetahuan, dan mitigasi resistensi perubahan.",
  },
  {
    num: "04",
    title: "Evaluasi & Pengukuran Dampak",
    desc: "Mengukur keberhasilan melalui indikator kinerja terukur (KPI/ROI) serta menyerahkan sistem mandiri untuk keberlanjutan jangka panjang.",
  },
];

const ICON_MAP = {
  Compass,
  UserSearch,
  Award,
  BarChart3,
  RefreshCcw,
  Users,
};

export default function ServicesPage({ services = [], settings = {} }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const itemsToRender = services && services.length > 0 ? services : DETAILED_SERVICES;

  const heroLines = [
    settings?.services_hero_line_1 || HERO_LINES[0],
    settings?.services_hero_line_2 || HERO_LINES[1],
    settings?.services_hero_line_3 || HERO_LINES[2],
  ];

  const heroSubtitle =
    settings?.services_hero_subtitle ||
    "Kami menggabungkan metodologi berbasis bukti (evidence-based), data analitik mutakhir, dan pemahaman mendalam atas regulasi bisnis Indonesia untuk menghadirkan dampak yang terukur.";

  const scrollToSection = (e) => {
    e.preventDefault();
    const el = document.getElementById("daftar-layanan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PublicLayout>
      <Head>
        <title>Layanan Human Capital — Athera Nexus</title>
        <meta
          name="description"
          content="Eksplorasi layanan konsultasi human capital dari Athera Nexus: strategi HR, executive search, asesmen talenta, people analytics, dan manajemen transformasi organisasi."
        />
      </Head>

      {/* Hero Header matching Beranda layout */}
      <section ref={heroRef} className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop"
            alt="Layanan Athera Nexus"
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
              data-testid="services-cta-primary"
              className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-7 py-3.5 rounded-full hover:bg-nexus-accentHover hover:scale-[1.02] active:scale-[0.98] transition-[background-color,transform] duration-300 cursor-pointer shadow-lg"
            >
              Konsultasikan Kebutuhan
              <ArrowUpRight size={18} />
            </Link>
            <button
              onClick={scrollToSection}
              data-testid="services-cta-secondary"
              className="inline-flex items-center gap-2 border border-white/15 text-white px-7 py-3.5 rounded-full hover:border-nexus-accent hover:text-nexus-accent hover:scale-[1.02] active:scale-[0.98] transition-[border-color,color,transform] duration-300 cursor-pointer"
            >
              Pelajari Layanan
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

      {/* Detailed Services Grid */}
      <section id="daftar-layanan" className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {itemsToRender.map((item, idx) => {
              let Icon = Compass;
              if (typeof item.icon === "string" && ICON_MAP[item.icon]) {
                Icon = ICON_MAP[item.icon];
              } else if (typeof item.icon === "function" || typeof item.icon === "object") {
                Icon = item.icon;
              }

              let delivs = [];
              if (Array.isArray(item.deliverables)) {
                delivs = item.deliverables;
              } else if (typeof item.deliverables === "string") {
                try {
                  delivs = JSON.parse(item.deliverables);
                } catch {
                  delivs = [item.deliverables];
                }
              }

              return (
                <motion.div
                  key={item.id || item.slug || item.title}
                  id={item.slug || `service-${item.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: (idx % 2) * 0.15, duration: 0.7 }}
                  className="group relative bg-nexus-surface/80 border border-white/10 rounded-2xl p-8 sm:p-10 hover:border-nexus-accent/40 transition-all duration-500 hover:shadow-2xl flex flex-col justify-between"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nexus-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-nexus-elevated border border-white/10 flex items-center justify-center">
                        <Icon size={26} className="text-nexus-accent" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-nexus-muted">
                        {item.badge || "Strategic Advisory"}
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-2xl text-white mb-4 group-hover:text-nexus-accent transition-colors duration-300">
                      {item.title}
                    </h2>

                    <p className="text-nexus-muted text-sm sm:text-base leading-relaxed mb-6">
                      {item.description || item.body}
                    </p>

                    {delivs.length > 0 && (
                      <div className="border-t border-white/5 pt-5 mb-6">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
                          Ruang Lingkup & Deliverables:
                        </p>
                        <ul className="space-y-2.5">
                          {delivs.map((deliv, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                              <CheckCircle2 size={16} className="text-nexus-accent shrink-0 mt-0.5" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-nexus-muted">
                      <TrendingUp size={14} className="text-nexus-accent" />
                      <span>{item.impact}</span>
                    </div>
                    <Link
                      href="/kontak"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-nexus-accent hover:text-nexus-accentHover group-hover:translate-x-1 transition-transform"
                    >
                      Pilih Layanan
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Framework / Workflow Section */}
      <section className="py-24 lg:py-32 bg-nexus-surface/40 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              {settings?.services_process_title || "Pendekatan Terstruktur & Berbasis Hasil"}
            </h2>
            <p className="text-nexus-muted text-sm sm:text-base mt-4">
              {settings?.services_process_desc ||
                "Kami memastikan setiap inisiatif human capital dieksekusi dengan disiplin konsultansi kelas dunia dan kejelasan akuntabilitas."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: settings?.services_step1_num || "01",
                title: settings?.services_step1_title || "Diagnosa & Asesmen Mendalam",
                desc:
                  settings?.services_step1_desc ||
                  "Pemetaan komprehensif atas kapabilitas organisasi, kesenjangan kompetensi, dan analisis data HR yang ada.",
              },
              {
                num: settings?.services_step2_num || "02",
                title: settings?.services_step2_title || "Perancangan Solusi Kustom",
                desc:
                  settings?.services_step2_desc ||
                  "Penyusunan arsitektur kebijakan, job framework, atau matriks asesmen yang selaras dengan tujuan strategis perusahaan.",
              },
              {
                num: settings?.services_step3_num || "03",
                title: settings?.services_step3_title || "Implementasi & Pendampingan",
                desc:
                  settings?.services_step3_desc ||
                  "Eksekusi penugasan bersama tim internal Anda dengan pengawalan change management dan tata kelola berstandar tinggi.",
              },
              {
                num: settings?.services_step4_num || "04",
                title: settings?.services_step4_title || "Evaluasi & Alih Pengetahuan",
                desc:
                  settings?.services_step4_desc ||
                  "Pengukuran dampak menggunakan KPI/metrik bisnis serta pelatihan internal agar sistem baru mandiri dijalankan.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-nexus-elevated/40 border border-white/10 rounded-xl p-6 relative overflow-hidden"
              >
                <div className="font-display font-black text-3xl text-nexus-accent/30 mb-3">
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-nexus-muted text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Card Section */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="relative bg-gradient-to-b from-nexus-elevated to-nexus-surface border border-nexus-accent/30 rounded-3xl p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-nexus-accent to-transparent glow-accent" />
            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
                {settings?.services_cta_title || "Butuh strategi khusus untuk organisasi Anda?"}
              </h2>
              <p className="text-nexus-muted text-base sm:text-lg mb-8 leading-relaxed">
                {settings?.services_cta_desc ||
                  "Jadwalkan sesi konsultasi awal tanpa komitmen dengan Partner Senior kami untuk membedah tantangan human capital Anda."}
              </p>
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-8 py-4 rounded-full hover:bg-nexus-accentHover hover:scale-[1.02] active:scale-[0.98] transition-[background-color,transform] duration-300 shadow-xl cursor-pointer text-base"
              >
                {settings?.services_cta_button || "Mulai Sesi Konsultasi"}
                <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
