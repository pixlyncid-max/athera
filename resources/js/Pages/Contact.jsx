import { useState, useRef } from "react";
import { Head } from "@inertiajs/react";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowUpRight,
  ArrowDown,
  Loader2,
  Shield,
  CheckCircle2,
} from "lucide-react";
import PublicLayout from "@/Layouts/PublicLayout";

const HERO_LINES = ["Mari Memulai", "Dialog Strategis", "Human Capital."];

const lineVariant = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: "0%",
    transition: { delay: 0.15 + i * 0.13, duration: 0.9, ease: [0.33, 1, 0.68, 1] },
  }),
};

const SERVICES_OPTIONS = [
  "Konsultasi Strategi HR & Organisasi",
  "Akuisisi & Seleksi Talenta (Executive Search)",
  "Pengembangan Kepemimpinan & Suksesi",
  "People Analytics & Workforce Planning",
  "Transformasi Budaya & Manajemen Perubahan",
  "HR Outsourcing & Managed Services",
  "Lainnya / Diskusi Umum",
];

const FAQS = [
  {
    q: "Bagaimana proses awal setelah kami mengirim formulir ini?",
    a: "Partner Senior kami akan meninjau kebutuhan Anda dan menghubungi kembali dalam 1x24 jam kerja untuk menjadwalkan sesi discovery meeting 30 menit via video call atau tatap muka.",
  },
  {
    q: "Apakah kami dapat menandatangani NDA sebelum diskusi detail?",
    a: "Tentu. Kami sangat menghormati kerahasiaan bisnis Anda. Kami dapat menandatangani Non-Disclosure Agreement (NDA) dari pihak Anda sebelum sesi pendalaman dilakukan.",
  },
  {
    q: "Berapa lama estimasi pengerjaan suatu proyek konsultasi?",
    a: "Durasi penugasan disesuaikan dengan ruang lingkup: 2-4 minggu untuk asesmen/audit awal, 6-10 minggu untuk perancangan job grading/remunerasi, hingga 6-12 bulan untuk transformasi organisasi menyeluruh.",
  },
  {
    q: "Apakah layanan Athera Nexus mencakup wilayah di luar Jabodetabek?",
    a: "Ya. Kami mendampingi klien di seluruh wilayah Indonesia (Sumatera, Kalimantan, Sulawesi, Jawa, Bali, hingga Papua) serta regional Asia Tenggara, baik melalui metode on-site maupun hybrid.",
  },
];

const inputCls =
  "w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-nexus-faint focus:outline-none focus:border-nexus-accent transition-[border-color] duration-300";

export default function ContactPage({ faqs = [], servicesOptions = [], settings = {} }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const faqsToRender = faqs && faqs.length > 0 ? faqs : FAQS;
  const optionsToRender = servicesOptions && servicesOptions.length > 0 ? servicesOptions : SERVICES_OPTIONS;

  const address = settings?.contact_address || "Menara Sudirman Lt. 21, Jl. Jend. Sudirman Kav. 60, Jakarta Selatan 12190, Indonesia";
  const emailGeneral = settings?.contact_email_general || "halo@atheranexus.id";
  const emailPartnership = settings?.contact_email_partnership || "partnership@atheranexus.id";
  const phone = settings?.contact_phone || "+62 21 5000 1234";
  const whatsapp = settings?.contact_whatsapp || "+62 811 9876 5432";
  const hoursWeekday = settings?.office_hours_weekday || "08:30 – 17:30 WIB";
  const hoursWeekend = settings?.office_hours_weekend || "Tutup";

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById("form-kontak");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToOffice = (e) => {
    e.preventDefault();
    const el = document.getElementById("kantor-info");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/contact`, {
        name: form.name,
        email: form.email,
        company: form.company || null,
        service: form.service || null,
        message: form.message,
      });
      toast.success("Pesan terkirim! Tim kami akan menghubungi Anda dalam 1x24 jam.");
      setForm({ name: "", email: "", company: "", service: "", message: "" });
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        "Pesan gagal terkirim. Silakan periksa kembali formulir atau hubungi kami via email.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const heroLines = [
    settings?.contact_hero_line_1 || HERO_LINES[0],
    settings?.contact_hero_line_2 || HERO_LINES[1],
    settings?.contact_hero_line_3 || HERO_LINES[2],
  ];

  const heroSubtitle =
    settings?.contact_hero_subtitle ||
    "Ceritakan tantangan talenta dan sasaran pertumbuhan organisasi Anda. Tim partner senior kami siap memberikan telaah awal yang relevan dalam 1x24 jam kerja.";

  return (
    <PublicLayout>
      <Head>
        <title>Kontak & Jadwalkan Konsultasi — Athera Nexus</title>
        <meta
          name="description"
          content="Hubungi tim konsultan Athera Nexus. Jadwalkan sesi konsultasi human capital, executive search, atau perancangan strategi organisasi."
        />
      </Head>

      {/* Hero Header matching Beranda layout */}
      <section ref={heroRef} className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop"
            alt="Kontak Athera Nexus"
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
            <button
              onClick={scrollToForm}
              data-testid="contact-cta-primary"
              className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-7 py-3.5 rounded-full hover:bg-nexus-accentHover hover:scale-[1.02] active:scale-[0.98] transition-[background-color,transform] duration-300 cursor-pointer shadow-lg"
            >
              Isi Formulir Konsultasi
              <ArrowUpRight size={18} />
            </button>
            <button
              onClick={scrollToOffice}
              data-testid="contact-cta-secondary"
              className="inline-flex items-center gap-2 border border-white/15 text-white px-7 py-3.5 rounded-full hover:border-nexus-accent hover:text-nexus-accent hover:scale-[1.02] active:scale-[0.98] transition-[border-color,color,transform] duration-300 cursor-pointer"
            >
              Informasi Kantor Pusat
            </button>
          </motion.div>
        </motion.div>

        <button
          onClick={scrollToForm}
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

      {/* Main Content: Form + Office Info */}
      <section id="form-kontak" className="py-20 lg:py-28 relative">
        <div id="kantor-info" className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6">
                {settings?.contact_info_title || "Kantor Pusat & Saluran Langsung"}
              </h2>
              <p className="text-nexus-muted text-sm sm:text-base leading-relaxed mb-10">
                {settings?.contact_info_desc ||
                  "Kami siap menerima kunjungan tatap muka dengan perjanjian sebelumnya di pusat distrik bisnis Jakarta."}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-nexus-surface/60 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-nexus-elevated flex items-center justify-center border border-white/10 shrink-0 text-nexus-accent">
                    <MapPin size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-sm mb-1">Lokasi Kantor</h3>
                    <p className="text-nexus-muted text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-nexus-surface/60 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-nexus-elevated flex items-center justify-center border border-white/10 shrink-0 text-nexus-accent">
                    <Mail size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-sm mb-1">Email Resmi</h3>
                    <p className="text-nexus-muted text-xs sm:text-sm">
                      Konsultasi: <span className="text-white">{emailGeneral}</span>
                      <br />
                      Kemitraan: <span className="text-white">{emailPartnership}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-nexus-surface/60 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-nexus-elevated flex items-center justify-center border border-white/10 shrink-0 text-nexus-accent">
                    <Phone size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-sm mb-1">Telepon & Hotline</h3>
                    <p className="text-nexus-muted text-xs sm:text-sm">
                      Telepon: <span className="text-white">{phone}</span>
                      <br />
                      WhatsApp: <span className="text-white">{whatsapp}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-nexus-surface/60 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-nexus-elevated flex items-center justify-center border border-white/10 shrink-0 text-nexus-accent">
                    <Clock size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-sm mb-1">Jam Operasional</h3>
                    <p className="text-nexus-muted text-xs sm:text-sm">
                      {settings?.contact_office_hours || `Senin – Jumat: ${hoursWeekday}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-nexus-accent/5 border border-nexus-accent/20 flex items-center gap-4">
              <Shield className="text-nexus-accent shrink-0" size={24} />
              <p className="text-xs text-nexus-muted leading-relaxed">
                {settings?.contact_response_time || "Respons Terjamin Dalam 1x24 Jam Kerja"} — Seluruh informasi dijamin kerahasiaannya di bawah standar etika konsultasi ketat.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-nexus-surface/90 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md flex flex-col gap-6"
            >
              <div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  {settings?.contact_form_title || "Formulir Permintaan Konsultasi"}
                </h3>
                <p className="text-nexus-muted text-xs sm:text-sm">
                  {settings?.contact_form_desc ||
                    "Lengkapi data berikut agar konsultan spesialis kami dapat mempersiapkan materi yang relevan."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-nexus-muted mb-2 font-medium">
                    Nama Lengkap <span className="text-nexus-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={set("name")}
                    placeholder="mis. Budi Santoso"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-nexus-muted mb-2 font-medium">
                    Email Perusahaan <span className="text-nexus-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    placeholder="nama@perusahaan.co.id"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-company" className="block text-xs uppercase tracking-wider text-nexus-muted mb-2 font-medium">
                    Nama Perusahaan / Organisasi
                  </label>
                  <input
                    id="contact-company"
                    value={form.company}
                    onChange={set("company")}
                    placeholder="PT Contoh Indonesia"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="contact-service" className="block text-xs uppercase tracking-wider text-nexus-muted mb-2 font-medium">
                    Layanan yang Diminati
                  </label>
                  <select
                    id="contact-service"
                    value={form.service}
                    onChange={set("service")}
                    className={`${inputCls} appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-nexus-base text-gray-400">
                      -- Pilih Layanan Utama --
                    </option>
                    {optionsToRender.map((s) => (
                      <option key={s} value={s} className="bg-nexus-base text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider text-nexus-muted mb-2 font-medium">
                  Rincian Kebutuhan / Sasaran Proyek <span className="text-nexus-accent">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  minLength={10}
                  rows={6}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Ceritakan secara ringkas tantangan SDM saat ini, skala organisasi, estimasi timeline, atau ekspektasi hasil yang diinginkan..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-8 py-4 rounded-full hover:bg-nexus-accentHover hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 transition-[background-color,transform,opacity] duration-300 shadow-xl cursor-pointer text-base"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowUpRight size={18} />}
                {loading ? "Mengirimkan Data..." : (settings?.contact_form_button || "Kirimkan Permintaan Konsultasi")}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-nexus-surface/40 border-t border-white/5 relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-display font-bold text-3xl text-white">
              {settings?.contact_faq_title || "Seputar Proses Konsultasi Awal"}
            </h2>
            {settings?.contact_faq_desc && (
              <p className="text-nexus-muted text-sm sm:text-base mt-2">{settings.contact_faq_desc}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqsToRender.map((faq, i) => (
              <div
                key={faq.id || i}
                className="bg-nexus-surface border border-white/10 rounded-2xl p-7 flex flex-col justify-between"
              >
                <h3 className="font-display font-bold text-base sm:text-lg text-white mb-3 flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-nexus-accent shrink-0 mt-1" />
                  <span>{faq.question || faq.q}</span>
                </h3>
                <p className="text-nexus-muted text-xs sm:text-sm leading-relaxed pl-7">
                  {faq.answer || faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
