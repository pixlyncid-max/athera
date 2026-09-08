import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import FastMarquee from "react-fast-marquee";
import {
  Home as HomeIcon,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle,
  Save,
  HelpCircle,
  Eye,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminHomePage({ settings = {} }) {
  const [form, setForm] = useState({
    // Hero Section
    hero_headline_1: settings.hero_headline_1 || settings.hero_home_title_1 || "Membangun Ekosistem",
    hero_headline_2: settings.hero_headline_2 || settings.hero_home_title_2 || "Human Capital yang",
    hero_headline_3: settings.hero_headline_3 || settings.hero_home_title_3 || "Berdaya Tahan.",
    hero_subtitle:
      settings.hero_subtitle ||
      settings.hero_home_subtitle ||
      "Konsultan human capital yang membantu organisasi tumbuh melalui strategi SDM yang terukur, akuisisi talenta yang presisi, dan pengembangan kepemimpinan yang berkelanjutan.",
    hero_cta_primary: settings.hero_cta_primary || "Mulai Konsultasi",
    hero_cta_secondary: settings.hero_cta_secondary || "Pelajari Layanan",

    // Running Text (Marquee)
    home_marquee_text:
      settings.home_marquee_text ||
      "Strategi HR, Akuisisi Talenta, Pengembangan Kepemimpinan, People Analytics, Transformasi Budaya, Kepercayaan",
    home_marquee_speed: settings.home_marquee_speed || "28",

    // Home Intro / About Section
    home_about_badge: settings.home_about_badge || "Siapa Kami",
    home_about_title: settings.home_about_title || "Manusia adalah pusat strategi.",
    home_ch1_num: settings.home_ch1_num || "01",
    home_ch1_title: settings.home_ch1_title || "Siapa Kami",
    home_ch1_body:
      settings.home_ch1_body ||
      "Athera Nexus adalah praktik konsultasi human capital dari PT Adiwangsa Humanika Solusi. Kami mendampingi perusahaan merancang organisasi yang sehat — dari struktur, sistem, hingga budaya kerja.",
    home_ch2_num: settings.home_ch2_num || "02",
    home_ch2_title: settings.home_ch2_title || "Pendekatan Kami",
    home_ch2_body:
      settings.home_ch2_body ||
      "Setiap rekomendasi lahir dari data dan dialog. Kami memadukan people analytics dengan pemahaman mendalam atas konteks bisnis, sehingga solusi yang kami bangun relevan dan dapat dieksekusi.",
    home_ch3_num: settings.home_ch3_num || "03",
    home_ch3_title: settings.home_ch3_title || "Komitmen Kami",
    home_ch3_body:
      settings.home_ch3_body ||
      "Kerahasiaan, integritas, dan dampak yang terukur. Kami menjaga kepercayaan klien sebagaimana kami membantu mereka membangun kepercayaan di dalam organisasinya sendiri.",

    // Home Services Section
    home_services_title: settings.home_services_title || "Solusi menyeluruh untuk siklus talenta.",
    home_services_cta: settings.home_services_cta || "Lihat Semua Layanan & Detail",

    // Home Trust & Stats Section
    home_trust_title: settings.home_trust_title || "Dipercaya oleh organisasi yang menuntut standar tertinggi.",
    home_trust_desc:
      settings.home_trust_desc ||
      "Setiap keterlibatan dijalankan dengan kerahasiaan penuh dan tata kelola profesional.",
    home_trust_client_label: settings.home_trust_client_label || "Klien & Mitra Kami",
    home_trust_cta: settings.home_trust_cta || "Lihat Portofolio & Standar Tata Kelola",

    // Home Contact Intro
    home_contact_title: settings.home_contact_title || "Mari mulai percakapan.",
    home_contact_desc:
      settings.home_contact_desc ||
      "Ceritakan tantangan human capital Anda. Konsultan kami akan merespons dengan gambaran awal pendekatan yang paling relevan.",
  });

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    router.post("/admin/pages/home", form, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Konten halaman Beranda berhasil disimpan!");
        setSaving(false);
      },
      onError: () => {
        toast.error("Gagal menyimpan konten. Silakan coba lagi.");
        setSaving(false);
      },
    });
  };

  const inputClass =
    "w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-nexus-muted/40 focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all";

  const textareaClass =
    "w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-nexus-muted/40 focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all min-h-[90px] resize-y";

  const TABS = [
    { id: "hero", label: "Hero Header", icon: Sparkles },
    { id: "marquee", label: "Teks Berjalan (Marquee)", icon: Activity },
    { id: "about", label: "Sekilas Tentang Kami", icon: Layers },
    { id: "services", label: "Sekilas Layanan", icon: HomeIcon },
    { id: "trust", label: "Kepercayaan & Klien", icon: ShieldCheck },
  ];

  return (
    <AdminLayout title="CMS Halaman Beranda">
      <Head title="Kelola Halaman Beranda — Athera CMS" />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-nexus-surface border border-white/10 rounded-2xl p-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-nexus-accent glow-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-nexus-accent">
                CMS Halaman Utama
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl text-white">
              Kelola Teks Halaman Beranda (Home)
            </h1>
            <p className="text-xs text-nexus-muted mt-1">
              Atur seluruh teks, judul besar, narasi intro, dan tombol ajakan bertindak di halaman utama.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-nexus-muted hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl transition-all"
            >
              <Eye size={15} />
              <span>Lihat Halaman</span>
            </a>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-nexus-accentHover active:scale-95 transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              <Save size={15} />
              <span>{saving ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-nexus-accent text-nexus-base shadow-md"
                    : "bg-nexus-surface text-nexus-muted hover:text-white border border-white/5 hover:border-white/15"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TAB 1: HERO */}
          {activeTab === "hero" && (
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">Hero Utama Beranda</h2>
                <p className="text-xs text-nexus-muted">
                  Teks besar dan tombol yang pertama kali dilihat pengunjung saat membuka website.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Headline Baris 1
                  </label>
                  <input
                    type="text"
                    value={form.hero_headline_1}
                    onChange={handleChange("hero_headline_1")}
                    className={inputClass}
                    placeholder="Membangun Ekosistem"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Headline Baris 2 <span className="text-nexus-accent">(Warna Aksen Hijau)</span>
                  </label>
                  <input
                    type="text"
                    value={form.hero_headline_2}
                    onChange={handleChange("hero_headline_2")}
                    className={inputClass}
                    placeholder="Human Capital yang"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Headline Baris 3
                  </label>
                  <input
                    type="text"
                    value={form.hero_headline_3}
                    onChange={handleChange("hero_headline_3")}
                    className={inputClass}
                    placeholder="Berdaya Tahan."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Sub-headline / Deskripsi Singkat Hero
                </label>
                <textarea
                  value={form.hero_subtitle}
                  onChange={handleChange("hero_subtitle")}
                  className={textareaClass}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Teks Tombol Utama (CTA 1)
                  </label>
                  <input
                    type="text"
                    value={form.hero_cta_primary}
                    onChange={handleChange("hero_cta_primary")}
                    className={inputClass}
                    placeholder="Mulai Konsultasi"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Teks Tombol Kedua (CTA 2)
                  </label>
                  <input
                    type="text"
                    value={form.hero_cta_secondary}
                    onChange={handleChange("hero_cta_secondary")}
                    className={inputClass}
                    placeholder="Pelajari Layanan"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: MARQUEE (RUNNING TEXT) */}
          {activeTab === "marquee" && (
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Teks Berjalan (Running Text / Marquee)
                </h2>
                <p className="text-xs text-nexus-muted">
                  Kelola daftar kata-kata dan frasa yang berjalan otomatis di bawah Hero section halaman utama.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Daftar Kata / Frasa Running Text
                </label>
                <textarea
                  value={form.home_marquee_text}
                  onChange={handleChange("home_marquee_text")}
                  className={textareaClass}
                  rows={3}
                  placeholder="Strategi HR, Akuisisi Talenta, Pengembangan Kepemimpinan, People Analytics, Transformasi Budaya, Kepercayaan"
                />
                <p className="text-[11px] text-nexus-muted mt-1.5">
                  Gunakan tanda koma (<code className="text-nexus-accent">,</code>) atau baris baru untuk memisahkan setiap kata/frasa.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Kecepatan Bergerak (Speed: 10 - 80)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={form.home_marquee_speed}
                    onChange={handleChange("home_marquee_speed")}
                    className={inputClass}
                    placeholder="28"
                  />
                  <p className="text-[11px] text-nexus-muted mt-1">
                    Standar: 28. Angka lebih besar = bergerak lebih cepat.
                  </p>
                </div>
              </div>

              {/* Interactive Live Preview */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-nexus-accent glow-accent" />
                  <span className="text-xs font-bold text-nexus-accent uppercase tracking-wider">
                    Live Preview Teks Berjalan
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-nexus-base/80 p-4 overflow-hidden">
                  <FastMarquee
                    speed={parseInt(form.home_marquee_speed, 10) || 28}
                    gradient={false}
                  >
                    {(form.home_marquee_text || "")
                      .split(/[\n,]+/)
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .map((t, idx) => (
                        <span key={t + idx} className="flex items-center">
                          <span className="font-display font-bold uppercase tracking-[0.25em] text-lg sm:text-2xl text-outline px-6 whitespace-nowrap">
                            {t}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-nexus-accent/60" />
                        </span>
                      ))}
                  </FastMarquee>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT INTRO */}
          {activeTab === "about" && (
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Section Sekilas Tentang Kami (Home)
                </h2>
                <p className="text-xs text-nexus-muted">
                  Mengatur judul besar di samping foto serta 3 pilar narasi (Siapa Kami, Pendekatan Kami, Komitmen).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Judul Besar Section (Samping Foto)
                </label>
                <input
                  type="text"
                  value={form.home_about_title}
                  onChange={handleChange("home_about_title")}
                  className={inputClass}
                  placeholder="Manusia adalah pusat strategi."
                />
              </div>

              {/* 3 Chapters */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-nexus-accent">
                  Pilar Narasi 1
                </h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Nomor</label>
                    <input
                      type="text"
                      value={form.home_ch1_num}
                      onChange={handleChange("home_ch1_num")}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Judul</label>
                    <input
                      type="text"
                      value={form.home_ch1_title}
                      onChange={handleChange("home_ch1_title")}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Isi Penjelasan</label>
                  <textarea
                    value={form.home_ch1_body}
                    onChange={handleChange("home_ch1_body")}
                    className={textareaClass}
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-nexus-accent">
                  Pilar Narasi 2
                </h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Nomor</label>
                    <input
                      type="text"
                      value={form.home_ch2_num}
                      onChange={handleChange("home_ch2_num")}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Judul</label>
                    <input
                      type="text"
                      value={form.home_ch2_title}
                      onChange={handleChange("home_ch2_title")}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Isi Penjelasan</label>
                  <textarea
                    value={form.home_ch2_body}
                    onChange={handleChange("home_ch2_body")}
                    className={textareaClass}
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-nexus-accent">
                  Pilar Narasi 3
                </h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Nomor</label>
                    <input
                      type="text"
                      value={form.home_ch3_num}
                      onChange={handleChange("home_ch3_num")}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Judul</label>
                    <input
                      type="text"
                      value={form.home_ch3_title}
                      onChange={handleChange("home_ch3_title")}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Isi Penjelasan</label>
                  <textarea
                    value={form.home_ch3_body}
                    onChange={handleChange("home_ch3_body")}
                    className={textareaClass}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES INTRO */}
          {activeTab === "services" && (
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Section Sekilas Layanan (Home)
                </h2>
                <p className="text-xs text-nexus-muted">
                  Mengatur judul pengantar kartu layanan serta tombol tautan ke halaman Layanan lengkap.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Judul Section Layanan di Beranda
                </label>
                <input
                  type="text"
                  value={form.home_services_title}
                  onChange={handleChange("home_services_title")}
                  className={inputClass}
                  placeholder="Solusi menyeluruh untuk siklus talenta."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Teks Tombol / Tautan Lihat Seluruh Layanan
                </label>
                <input
                  type="text"
                  value={form.home_services_cta}
                  onChange={handleChange("home_services_cta")}
                  className={inputClass}
                  placeholder="Lihat Semua Layanan & Detail"
                />
              </div>
            </div>
          )}

          {/* TAB 4: TRUST */}
          {activeTab === "trust" && (
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Section Kepercayaan & Klien (Home)
                </h2>
                <p className="text-xs text-nexus-muted">
                  Mengatur judul, deskripsi tata kelola, label klien, serta tombol portofolio di section kepercayaan.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Judul Section Kepercayaan
                </label>
                <input
                  type="text"
                  value={form.home_trust_title}
                  onChange={handleChange("home_trust_title")}
                  className={inputClass}
                  placeholder="Dipercaya oleh organisasi yang menuntut standar tertinggi."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Deskripsi Tata Kelola & Kerahasiaan
                </label>
                <textarea
                  value={form.home_trust_desc}
                  onChange={handleChange("home_trust_desc")}
                  className={textareaClass}
                  rows={2}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Label Sub-header Logo Klien
                  </label>
                  <input
                    type="text"
                    value={form.home_trust_client_label}
                    onChange={handleChange("home_trust_client_label")}
                    className={inputClass}
                    placeholder="Klien & Mitra Kami"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Teks Tombol Lihat Detail Kepercayaan
                  </label>
                  <input
                    type="text"
                    value={form.home_trust_cta}
                    onChange={handleChange("home_trust_cta")}
                    className={inputClass}
                    placeholder="Lihat Portofolio & Standar Tata Kelola"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-end gap-3 bg-nexus-surface border border-white/10 rounded-2xl p-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base text-xs font-bold px-8 py-3 rounded-xl hover:bg-nexus-accentHover active:scale-95 transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              <Save size={16} />
              <span>{saving ? "Menyimpan..." : "Simpan Perubahan Beranda"}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
