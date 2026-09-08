import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
  ShieldCheck,
  Sparkles,
  Award,
  Layers,
  Save,
  Eye,
  Building,
  TrendingUp,
  Building2,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminAboutPage({
  settings = {},
  stats = [],
  clients = [],
  caseStudies = [],
}) {
  // Text Content Form
  const [form, setForm] = useState({
    // Hero
    about_hero_badge: settings.about_hero_badge || "Kepercayaan & Kredibilitas",
    about_hero_line_1: settings.about_hero_line_1 || settings.hero_trust_title_1 || "Dipercaya Korporasi",
    about_hero_line_2: settings.about_hero_line_2 || settings.hero_trust_title_2 || "yang Menuntut",
    about_hero_line_3: settings.about_hero_line_3 || settings.hero_trust_title_3 || "Integritas Tertinggi.",
    about_hero_subtitle:
      settings.about_hero_subtitle ||
      settings.hero_trust_subtitle ||
      "Komitmen kami pada kerahasiaan data tingkat tinggi, kepatuhan regulasi ketenagakerjaan yang rigid, dan metodologi berstandar internasional yang terbukti menghasilkan dampak bisnis terukur.",

    // Vision & Mission / Story Section
    about_story_badge: settings.about_story_badge || "Fondasi & Visi",
    about_story_title:
      settings.about_story_title || "Menghubungkan Potensi Manusia dengan Ambisi Korporasi",
    about_story_p1:
      settings.about_story_p1 ||
      "Athera Nexus didirikan di bawah naungan PT Adiwangsa Humanika Solusi sebagai respons atas kebutuhan mendesak industri terhadap mitra konsultan human capital yang berorientasi hasil, patuh hukum, dan berwawasan masa depan.",
    about_story_p2:
      settings.about_story_p2 ||
      "Kami percaya bahwa arsitektur organisasi yang kokoh, sistem penghargaan yang adil, serta kepemimpinan yang adaptif adalah fondasi utama bagi setiap perusahaan yang ingin bertahan dan bertumbuh melintasi siklus ekonomi.",

    about_vision_title: settings.about_vision_title || "Visi Kami",
    about_vision_desc:
      settings.about_vision_desc ||
      "Menjadi konsultan human capital paling terpercaya di Indonesia yang dikenal atas integritas tanpa kompromi dan presisi analitik kelas dunia.",

    about_mission_title: settings.about_mission_title || "Misi Kami",
    about_mission_desc:
      settings.about_mission_desc ||
      "Mendampingi transformasi organisasi melalui perancangan struktur SDM yang agile, akuisisi talenta strategis, dan penguatan budaya kerja berkinerja tinggi.",

    // 4 Trust Pillars
    about_pillars_badge: settings.about_pillars_badge || "Standar Tata Kelola",
    about_pillars_title:
      settings.about_pillars_title || "4 Pilar Kepatuhan & Integritas Profesional",
    about_pillars_desc:
      settings.about_pillars_desc ||
      "Standar tata kelola kami dirancang untuk memberikan rasa aman penuh bagi manajemen eksekutif dan dewan komisaris.",

    about_p1_title: settings.about_p1_title || "Kerahasiaan Ketat (Non-Disclosure)",
    about_p1_desc:
      settings.about_p1_desc ||
      "Setiap data kandidat, struktur gaji, dan strategi korporat dilindungi oleh perjanjian kerahasiaan berkekuatan hukum penuh dengan protokol keamanan data ketat.",

    about_p2_title: settings.about_p2_title || "Kepatuhan Hukum & Regulasi 100%",
    about_p2_desc:
      settings.about_p2_desc ||
      "Seluruh rekomendasi dan implementasi selaras dengan UU Ketenagakerjaan RI, UU Cipta Kerja, aturan BPJS, dan standar perpajakan resmi.",

    about_p3_title: settings.about_p3_title || "Metodologi Terakreditasi Global",
    about_p3_desc:
      settings.about_p3_desc ||
      "Kami menerapkan framework penilaian berstandar internasional (Hay Group, Mercer, Hogan Assessment, dan ICF Coaching Competencies).",

    about_p4_title: settings.about_p4_title || "Service Level Agreement (SLA) Terukur",
    about_p4_desc:
      settings.about_p4_desc ||
      "Komitmen waktu respon, garansi penggantian talenta, dan milestone berkala yang tertuang transparan dalam kontrak kerja sama.",

    // Track Record / Case Studies & Clients Intro
    about_cases_badge: settings.about_cases_badge || "Dampak Terbukti",
    about_cases_title:
      settings.about_cases_title || "Studi Kasus & Hasil Nyata Kemitraan",
    about_cases_desc:
      settings.about_cases_desc ||
      "Bagaimana kami membantu perusahaan terkemuka mentransformasi fungsi human capital mereka menjadi penggerak utama pertumbuhan.",

    // CTA Bottom Banner
    about_cta_title:
      settings.about_cta_title || "Ingin Bermitra dengan Standar Profesional Tertinggi?",
    about_cta_desc:
      settings.about_cta_desc ||
      "Diskusikan kebutuhan tata kelola SDM, executive search, atau audit struktur organisasi Anda bersama Partner kami.",
    about_cta_button: settings.about_cta_button || "Hubungi Kami Sekarang",
  });

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  // --- CRUD Modal States ---
  // Stats
  const [statModalOpen, setStatModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [statForm, setStatForm] = useState({ label: "", value: 100, suffix: "+", description: "", sort_order: 1 });

  // Clients
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clientForm, setClientForm] = useState({ name: "", sector: "", sort_order: 1 });

  // Case Studies
  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [caseForm, setCaseForm] = useState({ title: "", metric: "", metric_label: "", result: "", sort_order: 1 });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  // Submit Text Settings
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    router.post("/admin/pages/about", form, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Konten halaman Tentang Kami berhasil disimpan!");
        setSaving(false);
      },
      onError: () => {
        toast.error("Gagal menyimpan konten. Silakan coba lagi.");
        setSaving(false);
      },
    });
  };

  // --- Stat Handlers ---
  const openAddStat = () => {
    setEditingStat(null);
    setStatForm({ label: "", value: 100, suffix: "+", description: "", sort_order: stats.length + 1 });
    setStatModalOpen(true);
  };
  const openEditStat = (st) => {
    setEditingStat(st);
    setStatForm({ label: st.label, value: st.value, suffix: st.suffix, description: st.description || "", sort_order: st.sort_order });
    setStatModalOpen(true);
  };
  const handleStatSubmit = (e) => {
    e.preventDefault();
    if (editingStat) {
      router.put(`/admin/trust/stats/${editingStat.id}`, statForm, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Statistik berhasil diperbarui.");
          setStatModalOpen(false);
        },
      });
    } else {
      router.post("/admin/trust/stats", statForm, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Statistik baru berhasil ditambahkan.");
          setStatModalOpen(false);
        },
      });
    }
  };
  const deleteStat = (id, label) => {
    if (confirm(`Hapus statistik "${label}"?`)) {
      router.delete(`/admin/trust/stats/${id}`, {
        preserveScroll: true,
        onSuccess: () => toast.success("Statistik berhasil dihapus."),
      });
    }
  };

  // --- Client Handlers ---
  const openAddClient = () => {
    setEditingClient(null);
    setClientForm({ name: "", sector: "", sort_order: clients.length + 1 });
    setClientModalOpen(true);
  };
  const openEditClient = (cl) => {
    setEditingClient(cl);
    setClientForm({ name: cl.name, sector: cl.sector || "", sort_order: cl.sort_order });
    setClientModalOpen(true);
  };
  const handleClientSubmit = (e) => {
    e.preventDefault();
    if (editingClient) {
      router.put(`/admin/trust/clients/${editingClient.id}`, clientForm, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Data klien berhasil diperbarui.");
          setClientModalOpen(false);
        },
      });
    } else {
      router.post("/admin/trust/clients", clientForm, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Klien baru berhasil ditambahkan.");
          setClientModalOpen(false);
        },
      });
    }
  };
  const deleteClient = (id, name) => {
    if (confirm(`Hapus klien "${name}"?`)) {
      router.delete(`/admin/trust/clients/${id}`, {
        preserveScroll: true,
        onSuccess: () => toast.success("Klien berhasil dihapus."),
      });
    }
  };

  // --- Case Study Handlers ---
  const openAddCase = () => {
    setEditingCase(null);
    setCaseForm({ title: "", metric: "95%", metric_label: "Tingkat Retensi", result: "", sort_order: caseStudies.length + 1 });
    setCaseModalOpen(true);
  };
  const openEditCase = (cs) => {
    setEditingCase(cs);
    setCaseForm({ title: cs.title, metric: cs.metric, metric_label: cs.metric_label, result: cs.result, sort_order: cs.sort_order });
    setCaseModalOpen(true);
  };
  const handleCaseSubmit = (e) => {
    e.preventDefault();
    if (editingCase) {
      router.put(`/admin/trust/case-studies/${editingCase.id}`, caseForm, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Studi kasus berhasil diperbarui.");
          setCaseModalOpen(false);
        },
      });
    } else {
      router.post("/admin/trust/case-studies", caseForm, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Studi kasus baru berhasil ditambahkan.");
          setCaseModalOpen(false);
        },
      });
    }
  };
  const deleteCase = (id, title) => {
    if (confirm(`Hapus studi kasus "${title}"?`)) {
      router.delete(`/admin/trust/case-studies/${id}`, {
        preserveScroll: true,
        onSuccess: () => toast.success("Studi kasus berhasil dihapus."),
      });
    }
  };

  const inputClass =
    "w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-nexus-muted/40 focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all";

  const textareaClass =
    "w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-nexus-muted/40 focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all min-h-[90px] resize-y";

  const TABS = [
    { id: "hero", label: "Hero Header", icon: Sparkles },
    { id: "story", label: "Visi & Misi", icon: Building },
    { id: "pillars", label: "4 Pilar Kepatuhan", icon: ShieldCheck },
    { id: "stats", label: `Statistik & Counter (${stats.length})`, icon: TrendingUp },
    { id: "clients", label: `Mitra & Klien (${clients.length})`, icon: Building2 },
    { id: "cases", label: `Studi Kasus & Portofolio (${caseStudies.length})`, icon: Award },
    { id: "cta", label: "Banner CTA Bawah", icon: Layers },
  ];

  const isDataTab = ["stats", "clients", "cases"].includes(activeTab);

  return (
    <AdminLayout title="CMS Halaman Tentang Kami">
      <Head title="Kelola Halaman Tentang Kami — Athera CMS" />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-nexus-surface border border-white/10 rounded-2xl p-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-nexus-accent glow-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-nexus-accent">
                CMS Halaman Tentang Kami (/kepercayaan)
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl text-white">
              Kelola Konten & Data Tentang Kami
            </h1>
            <p className="text-xs text-nexus-muted mt-1">
              Atur seluruh narasi kredibilitas, visi & misi, 4 pilar standar kepatuhan hukum, angka statistik counter, daftar mitra klien, dan studi kasus.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/kepercayaan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-nexus-muted hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl transition-all"
            >
              <Eye size={15} />
              <span>Lihat Halaman</span>
            </a>
            {!isDataTab && (
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-nexus-accentHover active:scale-95 transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                <Save size={15} />
                <span>{saving ? "Menyimpan..." : "Simpan Teks Halaman"}</span>
              </button>
            )}
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

        {/* ================= FORM SECTIONS ================= */}
        {/* TAB 1: HERO */}
        {activeTab === "hero" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Hero Header Tentang Kami
                </h2>
                <p className="text-xs text-nexus-muted">
                  Teks besar dan deskripsi pembuka di bagian atas halaman /kepercayaan.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Badge Label Atas
                </label>
                <input
                  type="text"
                  value={form.about_hero_badge}
                  onChange={handleChange("about_hero_badge")}
                  className={inputClass}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Headline Baris 1
                  </label>
                  <input
                    type="text"
                    value={form.about_hero_line_1}
                    onChange={handleChange("about_hero_line_1")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Headline Baris 2
                  </label>
                  <input
                    type="text"
                    value={form.about_hero_line_2}
                    onChange={handleChange("about_hero_line_2")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Headline Baris 3 <span className="text-nexus-accent">(Aksen Hijau)</span>
                  </label>
                  <input
                    type="text"
                    value={form.about_hero_line_3}
                    onChange={handleChange("about_hero_line_3")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Sub-headline / Deskripsi Hero
                </label>
                <textarea
                  value={form.about_hero_subtitle}
                  onChange={handleChange("about_hero_subtitle")}
                  className={textareaClass}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 bg-nexus-surface border border-white/10 rounded-2xl p-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base text-xs font-bold px-8 py-3 rounded-xl hover:bg-nexus-accentHover active:scale-95 transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                <Save size={16} />
                <span>{saving ? "Menyimpan..." : "Simpan Perubahan Teks"}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: STORY & VISION MISSION */}
        {activeTab === "story" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Kisah Perusahaan, Visi & Misi
                </h2>
                <p className="text-xs text-nexus-muted">
                  Narasi latar belakang berdirinya perusahaan serta arah tujuan strategis.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={form.about_story_badge}
                    onChange={handleChange("about_story_badge")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Judul Narasi
                  </label>
                  <input
                    type="text"
                    value={form.about_story_title}
                    onChange={handleChange("about_story_title")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Paragraf Cerita 1
                  </label>
                  <textarea
                    value={form.about_story_p1}
                    onChange={handleChange("about_story_p1")}
                    className={textareaClass}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Paragraf Cerita 2
                  </label>
                  <textarea
                    value={form.about_story_p2}
                    onChange={handleChange("about_story_p2")}
                    className={textareaClass}
                    rows={4}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-3 bg-nexus-base/40 p-4 rounded-xl border border-white/5">
                  <label className="block text-xs font-bold text-nexus-accent uppercase tracking-wider">
                    Judul Visi
                  </label>
                  <input
                    type="text"
                    value={form.about_vision_title}
                    onChange={handleChange("about_vision_title")}
                    className={inputClass}
                  />
                  <label className="block text-xs font-semibold text-gray-300 mt-2 mb-1">
                    Isi Teks Visi
                  </label>
                  <textarea
                    value={form.about_vision_desc}
                    onChange={handleChange("about_vision_desc")}
                    className={textareaClass}
                    rows={3}
                  />
                </div>

                <div className="space-y-3 bg-nexus-base/40 p-4 rounded-xl border border-white/5">
                  <label className="block text-xs font-bold text-nexus-accent uppercase tracking-wider">
                    Judul Misi
                  </label>
                  <input
                    type="text"
                    value={form.about_mission_title}
                    onChange={handleChange("about_mission_title")}
                    className={inputClass}
                  />
                  <label className="block text-xs font-semibold text-gray-300 mt-2 mb-1">
                    Isi Teks Misi
                  </label>
                  <textarea
                    value={form.about_mission_desc}
                    onChange={handleChange("about_mission_desc")}
                    className={textareaClass}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 bg-nexus-surface border border-white/10 rounded-2xl p-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base text-xs font-bold px-8 py-3 rounded-xl hover:bg-nexus-accentHover active:scale-95 transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                <Save size={16} />
                <span>{saving ? "Menyimpan..." : "Simpan Perubahan Teks"}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: 4 PILLARS */}
        {activeTab === "pillars" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  4 Pilar Standar Kepatuhan & Tata Kelola
                </h2>
                <p className="text-xs text-nexus-muted">
                  Prinsip integritas ketat (Kerahasiaan data, Kepatuhan hukum, Metodologi internasional, SLA).
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={form.about_pillars_badge}
                    onChange={handleChange("about_pillars_badge")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Judul Section Pilar
                  </label>
                  <input
                    type="text"
                    value={form.about_pillars_title}
                    onChange={handleChange("about_pillars_title")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Deskripsi Pengantar Pilar
                </label>
                <textarea
                  value={form.about_pillars_desc}
                  onChange={handleChange("about_pillars_desc")}
                  className={textareaClass}
                  rows={2}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                {/* Pilar 1 */}
                <div className="space-y-3 bg-nexus-base/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-nexus-accent uppercase">Pilar 1: Kerahasiaan</span>
                  <input
                    type="text"
                    value={form.about_p1_title}
                    onChange={handleChange("about_p1_title")}
                    className={inputClass}
                    placeholder="Judul Pilar"
                  />
                  <textarea
                    value={form.about_p1_desc}
                    onChange={handleChange("about_p1_desc")}
                    className={textareaClass}
                    rows={3}
                    placeholder="Deskripsi Pilar"
                  />
                </div>

                {/* Pilar 2 */}
                <div className="space-y-3 bg-nexus-base/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-nexus-accent uppercase">Pilar 2: Kepatuhan Hukum</span>
                  <input
                    type="text"
                    value={form.about_p2_title}
                    onChange={handleChange("about_p2_title")}
                    className={inputClass}
                    placeholder="Judul Pilar"
                  />
                  <textarea
                    value={form.about_p2_desc}
                    onChange={handleChange("about_p2_desc")}
                    className={textareaClass}
                    rows={3}
                    placeholder="Deskripsi Pilar"
                  />
                </div>

                {/* Pilar 3 */}
                <div className="space-y-3 bg-nexus-base/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-nexus-accent uppercase">Pilar 3: Metodologi</span>
                  <input
                    type="text"
                    value={form.about_p3_title}
                    onChange={handleChange("about_p3_title")}
                    className={inputClass}
                    placeholder="Judul Pilar"
                  />
                  <textarea
                    value={form.about_p3_desc}
                    onChange={handleChange("about_p3_desc")}
                    className={textareaClass}
                    rows={3}
                    placeholder="Deskripsi Pilar"
                  />
                </div>

                {/* Pilar 4 */}
                <div className="space-y-3 bg-nexus-base/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-nexus-accent uppercase">Pilar 4: SLA & Garansi</span>
                  <input
                    type="text"
                    value={form.about_p4_title}
                    onChange={handleChange("about_p4_title")}
                    className={inputClass}
                    placeholder="Judul Pilar"
                  />
                  <textarea
                    value={form.about_p4_desc}
                    onChange={handleChange("about_p4_desc")}
                    className={textareaClass}
                    rows={3}
                    placeholder="Deskripsi Pilar"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 bg-nexus-surface border border-white/10 rounded-2xl p-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base text-xs font-bold px-8 py-3 rounded-xl hover:bg-nexus-accentHover active:scale-95 transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                <Save size={16} />
                <span>{saving ? "Menyimpan..." : "Simpan Perubahan Teks"}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: STATS (DATA MASTER COUNTER) */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-nexus-surface border border-white/10 rounded-2xl p-6">
              <div>
                <h2 className="font-display font-bold text-lg text-white">
                  Statistik & Counter Beranimasi
                </h2>
                <p className="text-xs text-nexus-muted mt-1">
                  Angka metrik pembuktian rekam jejak yang tampil di halaman Tentang Kami & Beranda.
                </p>
              </div>
              <button
                onClick={openAddStat}
                className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-4 py-2.5 rounded-xl text-xs hover:bg-nexus-accentHover transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus size={15} />
                Tambah Statistik Baru
              </button>
            </div>

            <div className="bg-nexus-surface border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-nexus-muted">
                  <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-white">
                    <tr>
                      <th className="px-6 py-4 w-16 text-center">Urutan</th>
                      <th className="px-6 py-4">Nilai & Suffix</th>
                      <th className="px-6 py-4">Label Metrik</th>
                      <th className="px-6 py-4">Keterangan</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {stats.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-nexus-muted text-xs">
                          Belum ada statistik. Klik "Tambah Statistik Baru" di atas.
                        </td>
                      </tr>
                    ) : (
                      stats.map((s) => (
                        <tr key={s.id} className="hover:bg-white/[0.02]">
                          <td className="px-6 py-4 font-bold text-white text-center">{s.sort_order}</td>
                          <td className="px-6 py-4">
                            <span className="font-display font-extrabold text-xl text-white">
                              {s.value}
                            </span>
                            <span className="text-nexus-accent font-bold text-lg">{s.suffix}</span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-white">{s.label}</td>
                          <td className="px-6 py-4 text-xs">{s.description || "-"}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => openEditStat(s)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-nexus-accent/20 hover:text-nexus-accent text-nexus-muted transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => deleteStat(s.id, s.label)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-nexus-muted transition-colors cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CLIENTS (DATA MASTER MITRA & KLIEN) */}
        {activeTab === "clients" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-nexus-surface border border-white/10 rounded-2xl p-6">
              <div>
                <h2 className="font-display font-bold text-lg text-white">
                  Daftar Mitra & Klien Korporat
                </h2>
                <p className="text-xs text-nexus-muted mt-1">
                  Nama entitas korporat dan mitra industri yang mempercayakan kebutuhan Human Capital pada Athera Nexus.
                </p>
              </div>
              <button
                onClick={openAddClient}
                className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-4 py-2.5 rounded-xl text-xs hover:bg-nexus-accentHover transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus size={15} />
                Tambah Klien Baru
              </button>
            </div>

            <div className="bg-nexus-surface border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-nexus-muted">
                  <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-white">
                    <tr>
                      <th className="px-6 py-4 w-16 text-center">Urutan</th>
                      <th className="px-6 py-4">Nama Perusahaan / Klien</th>
                      <th className="px-6 py-4">Sektor Industri</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {clients.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-nexus-muted text-xs">
                          Belum ada data klien. Klik "Tambah Klien Baru" di atas.
                        </td>
                      </tr>
                    ) : (
                      clients.map((c) => (
                        <tr key={c.id} className="hover:bg-white/[0.02]">
                          <td className="px-6 py-4 font-bold text-white text-center">{c.sort_order}</td>
                          <td className="px-6 py-4 font-semibold text-white">{c.name}</td>
                          <td className="px-6 py-4 text-xs">
                            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
                              {c.sector || "Umum"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => openEditClient(c)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-nexus-accent/20 hover:text-nexus-accent text-nexus-muted transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => deleteClient(c.id, c.name)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-nexus-muted transition-colors cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CASE STUDIES (PENGANTAR + DATA STUDI KASUS) */}
        {activeTab === "cases" && (
          <div className="space-y-6">
            {/* Case Studies Intro Text Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h2 className="font-display font-bold text-lg text-white">
                    Teks Pengantar Studi Kasus & Rekam Jejak
                  </h2>
                  <p className="text-xs text-nexus-muted">
                    Headline dan narasi pengantar sebelum kartu-kartu studi kasus ditampilkan di halaman publik.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      value={form.about_cases_badge}
                      onChange={handleChange("about_cases_badge")}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Judul Section Studi Kasus
                    </label>
                    <input
                      type="text"
                      value={form.about_cases_title}
                      onChange={handleChange("about_cases_title")}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Deskripsi Pengantar
                  </label>
                  <textarea
                    value={form.about_cases_desc}
                    onChange={handleChange("about_cases_desc")}
                    className={textareaClass}
                    rows={2}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-nexus-accentHover active:scale-95 transition-all shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    <Save size={15} />
                    <span>{saving ? "Menyimpan..." : "Simpan Teks Pengantar"}</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Case Studies Cards & Management */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-nexus-surface border border-white/10 rounded-2xl p-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Daftar Kartu Studi Kasus Transformasi ({caseStudies.length})
                  </h3>
                  <p className="text-xs text-nexus-muted mt-1">
                    Metrik utama dan hasil transformasi nyata yang telah diselesaikan.
                  </p>
                </div>
                <button
                  onClick={openAddCase}
                  className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-4 py-2.5 rounded-xl text-xs hover:bg-nexus-accentHover transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus size={15} />
                  Tambah Studi Kasus Baru
                </button>
              </div>

              {caseStudies.length === 0 ? (
                <div className="bg-nexus-surface border border-white/10 rounded-2xl p-8 text-center text-nexus-muted text-xs">
                  Belum ada studi kasus. Klik "Tambah Studi Kasus Baru" di atas.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {caseStudies.map((cs) => (
                    <div
                      key={cs.id}
                      className="bg-nexus-surface border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-nexus-accent/40 transition-colors shadow-lg"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="font-display font-extrabold text-3xl text-nexus-accent">
                              {cs.metric}
                            </div>
                            <div className="text-xs uppercase text-nexus-muted mt-0.5 font-semibold">
                              {cs.metric_label}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => openEditCase(cs)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-nexus-accent/20 hover:text-nexus-accent text-nexus-muted transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => deleteCase(cs.id, cs.title)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-nexus-muted transition-colors cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-display font-bold text-white text-base mb-2">
                          {cs.title}
                        </h4>
                        <p className="text-nexus-muted text-xs leading-relaxed">
                          {cs.result}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-nexus-muted">
                        <span>Urutan: <strong className="text-white">{cs.sort_order}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 7: CTA BANNER */}
        {activeTab === "cta" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Banner Ajakan Bertindak (CTA Bawah)
                </h2>
                <p className="text-xs text-nexus-muted">
                  Kotak penutup di bagian paling bawah halaman Tentang Kami.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Judul Banner CTA
                </label>
                <input
                  type="text"
                  value={form.about_cta_title}
                  onChange={handleChange("about_cta_title")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Deskripsi / Sub-judul CTA
                </label>
                <textarea
                  value={form.about_cta_desc}
                  onChange={handleChange("about_cta_desc")}
                  className={textareaClass}
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Teks Tombol CTA
                </label>
                <input
                  type="text"
                  value={form.about_cta_button}
                  onChange={handleChange("about_cta_button")}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 bg-nexus-surface border border-white/10 rounded-2xl p-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base text-xs font-bold px-8 py-3 rounded-xl hover:bg-nexus-accentHover active:scale-95 transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                <Save size={16} />
                <span>{saving ? "Menyimpan..." : "Simpan Perubahan Teks"}</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= MODALS ================= */}

        {/* STAT MODAL */}
        {statModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="w-full max-w-md bg-nexus-surface border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
              <h3 className="font-display font-bold text-lg text-white mb-4">
                {editingStat ? "Edit Statistik" : "Tambah Statistik Baru"}
              </h3>
              <form onSubmit={handleStatSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                    Label Metrik *
                  </label>
                  <input
                    required
                    value={statForm.label}
                    onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                    placeholder="mis. Klien Korporat"
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                      Nilai Angka *
                    </label>
                    <input
                      type="number"
                      required
                      value={statForm.value}
                      onChange={(e) =>
                        setStatForm({ ...statForm, value: parseInt(e.target.value) || 0 })
                      }
                      className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                      Suffix (mis. +, %)
                    </label>
                    <input
                      value={statForm.suffix}
                      onChange={(e) => setStatForm({ ...statForm, suffix: e.target.value })}
                      placeholder="+"
                      className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                    Deskripsi Singkat
                  </label>
                  <input
                    value={statForm.description}
                    onChange={(e) => setStatForm({ ...statForm, description: e.target.value })}
                    placeholder="Keterangan singkat"
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    value={statForm.sort_order}
                    onChange={(e) =>
                      setStatForm({ ...statForm, sort_order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStatModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-nexus-muted hover:text-white transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-nexus-accent text-nexus-base text-xs font-bold hover:bg-nexus-accentHover transition-colors cursor-pointer"
                  >
                    Simpan Statistik
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CLIENT MODAL */}
        {clientModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="w-full max-w-md bg-nexus-surface border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
              <h3 className="font-display font-bold text-lg text-white mb-4">
                {editingClient ? "Edit Klien" : "Tambah Klien Baru"}
              </h3>
              <form onSubmit={handleClientSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                    Nama Perusahaan / Klien *
                  </label>
                  <input
                    required
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    placeholder="mis. PT Nusantara Energi"
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                    Sektor Industri
                  </label>
                  <input
                    value={clientForm.sector}
                    onChange={(e) => setClientForm({ ...clientForm, sector: e.target.value })}
                    placeholder="mis. Energi & Sumber Daya"
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    value={clientForm.sort_order}
                    onChange={(e) =>
                      setClientForm({ ...clientForm, sort_order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setClientModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-nexus-muted hover:text-white transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-nexus-accent text-nexus-base text-xs font-bold hover:bg-nexus-accentHover transition-colors cursor-pointer"
                  >
                    Simpan Klien
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CASE STUDY MODAL */}
        {caseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-nexus-surface border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
              <h3 className="font-display font-bold text-lg text-white mb-4">
                {editingCase ? "Edit Studi Kasus" : "Tambah Studi Kasus Baru"}
              </h3>
              <form onSubmit={handleCaseSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                    Judul Proyek / Transformasi *
                  </label>
                  <input
                    required
                    value={caseForm.title}
                    onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })}
                    placeholder="mis. Restrukturisasi Holding Energi"
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                      Metrik Utama *
                    </label>
                    <input
                      required
                      value={caseForm.metric}
                      onChange={(e) => setCaseForm({ ...caseForm, metric: e.target.value })}
                      placeholder="mis. 4.200+"
                      className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                      Label Metrik *
                    </label>
                    <input
                      required
                      value={caseForm.metric_label}
                      onChange={(e) => setCaseForm({ ...caseForm, metric_label: e.target.value })}
                      placeholder="mis. Posisi distandardisasi"
                      className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                    Hasil / Pencapaian Transformasi *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={caseForm.result}
                    onChange={(e) => setCaseForm({ ...caseForm, result: e.target.value })}
                    placeholder="Jelaskan dampak nyata proyek ini..."
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-semibold">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    value={caseForm.sort_order}
                    onChange={(e) =>
                      setCaseForm({ ...caseForm, sort_order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCaseModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-nexus-muted hover:text-white transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-nexus-accent text-nexus-base text-xs font-bold hover:bg-nexus-accentHover transition-colors cursor-pointer"
                  >
                    Simpan Studi Kasus
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
