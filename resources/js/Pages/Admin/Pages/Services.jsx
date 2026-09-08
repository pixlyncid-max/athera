import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
  Briefcase,
  Sparkles,
  GitCommit,
  Layers,
  Save,
  Eye,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  PlusCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminServicesPage({ settings = {}, services = [] }) {
  const [form, setForm] = useState({
    // Hero
    services_hero_badge: settings.services_hero_badge || "Layanan Human Capital",
    services_hero_line_1: settings.services_hero_line_1 || settings.hero_services_title_1 || "Solusi Human Capital",
    services_hero_line_2: settings.services_hero_line_2 || settings.hero_services_title_2 || "Presisi untuk Setiap",
    services_hero_line_3: settings.services_hero_line_3 || settings.hero_services_title_3 || "Pertumbuhan Bisnis.",
    services_hero_subtitle:
      settings.services_hero_subtitle ||
      settings.hero_services_subtitle ||
      "Pendekatan multidisiplin yang memadukan strategi bisnis, tata kelola organisasi, asesmen psikometrik, dan people analytics untuk mengoptimalkan potensi seluruh insan perusahaan.",

    // Services Catalog Section Intro
    services_catalog_badge: settings.services_catalog_badge || "Portofolio Layanan",
    services_catalog_title:
      settings.services_catalog_title || "Eksplorasi Detail Layanan & Ruang Lingkup",
    services_catalog_desc:
      settings.services_catalog_desc ||
      "Pilih dan sesuaikan solusi human capital yang tepat untuk fase pertumbuhan organisasi Anda saat ini.",

    // 4-Step Methodology / Workflow
    services_process_badge: settings.services_process_badge || "Metodologi Kerja",
    services_process_title:
      settings.services_process_title || "Pendekatan Terstruktur & Terukur",
    services_process_desc:
      settings.services_process_desc ||
      "Kami memastikan setiap inisiatif bertumpu pada diagnosa yang akurat, perancangan presisi, dan transfer kapabilitas berkelanjutan.",

    services_step1_num: settings.services_step1_num || "01",
    services_step1_title: settings.services_step1_title || "Diagnosa & Asesmen Mendalam",
    services_step1_desc:
      settings.services_step1_desc ||
      "Pemetaan komprehensif atas kapabilitas organisasi, kesenjangan kompetensi, dan analisis data HR yang ada.",

    services_step2_num: settings.services_step2_num || "02",
    services_step2_title: settings.services_step2_title || "Perancangan Solusi Kustom",
    services_step2_desc:
      settings.services_step2_desc ||
      "Penyusunan arsitektur kebijakan, job framework, atau matriks asesmen yang selaras dengan tujuan strategis perusahaan.",

    services_step3_num: settings.services_step3_num || "03",
    services_step3_title: settings.services_step3_title || "Implementasi & Pendampingan",
    services_step3_desc:
      settings.services_step3_desc ||
      "Eksekusi penugasan bersama tim internal Anda dengan pengawalan change management dan tata kelola berstandar tinggi.",

    services_step4_num: settings.services_step4_num || "04",
    services_step4_title: settings.services_step4_title || "Evaluasi & Alih Pengetahuan",
    services_step4_desc:
      settings.services_step4_desc ||
      "Pengukuran dampak menggunakan KPI/metrik bisnis serta pelatihan internal agar sistem baru mandiri dijalankan.",

    // CTA Bottom Banner
    services_cta_title:
      settings.services_cta_title || "Siap Mengoptimalkan Potensi Human Capital Anda?",
    services_cta_desc:
      settings.services_cta_desc ||
      "Konsultasikan kebutuhan organisasi Anda dengan Partner Senior kami. Kami siap membantu merancang solusi terukur.",
    services_cta_button: settings.services_cta_button || "Jadwalkan Sesi Konsultasi",
  });

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  // --- CRUD Modal States for Services ---
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    badge: "",
    icon: "Compass",
    description: "",
    deliverables: [""],
    impact: "",
    sort_order: 1,
    is_active: true,
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    router.post("/admin/pages/services", form, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Konten halaman Layanan berhasil disimpan!");
        setSaving(false);
      },
      onError: () => {
        toast.error("Gagal menyimpan konten. Silakan coba lagi.");
        setSaving(false);
      },
    });
  };

  // --- Service CRUD Handlers ---
  const openAddModal = () => {
    setEditingService(null);
    setServiceForm({
      title: "",
      badge: "",
      icon: "Compass",
      description: "",
      deliverables: [""],
      impact: "",
      sort_order: services.length + 1,
      is_active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      badge: service.badge || "",
      icon: service.icon || "Compass",
      description: service.description || "",
      deliverables:
        Array.isArray(service.deliverables) && service.deliverables.length > 0
          ? service.deliverables
          : [""],
      impact: service.impact || "",
      sort_order: service.sort_order || 1,
      is_active: Boolean(service.is_active),
    });
    setModalOpen(true);
  };

  const addDeliverable = () => {
    setServiceForm({ ...serviceForm, deliverables: [...serviceForm.deliverables, ""] });
  };

  const updateDeliverable = (index, value) => {
    const updated = [...serviceForm.deliverables];
    updated[index] = value;
    setServiceForm({ ...serviceForm, deliverables: updated });
  };

  const removeDeliverable = (index) => {
    const updated = serviceForm.deliverables.filter((_, i) => i !== index);
    setServiceForm({ ...serviceForm, deliverables: updated.length > 0 ? updated : [""] });
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    const cleanDeliverables = serviceForm.deliverables.filter((d) => d.trim() !== "");
    const payload = { ...serviceForm, deliverables: cleanDeliverables };

    if (editingService) {
      router.put(`/admin/services/${editingService.id}`, payload, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Layanan berhasil diperbarui.");
          setModalOpen(false);
        },
      });
    } else {
      router.post("/admin/services", payload, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Layanan baru berhasil ditambahkan.");
          setModalOpen(false);
        },
      });
    }
  };

  const handleDeleteService = (id, title) => {
    if (confirm(`Hapus layanan "${title}"?`)) {
      router.delete(`/admin/services/${id}`, {
        preserveScroll: true,
        onSuccess: () => toast.success("Layanan berhasil dihapus."),
      });
    }
  };

  const handleToggleService = (service) => {
    router.patch(`/admin/services/${service.id}/toggle`, {}, {
      preserveScroll: true,
      onSuccess: () => toast.success("Status layanan berhasil diubah."),
    });
  };

  const inputClass =
    "w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-nexus-muted/40 focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all";

  const textareaClass =
    "w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-nexus-muted/40 focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all min-h-[90px] resize-y";

  const TABS = [
    { id: "hero", label: "Hero Header", icon: Sparkles },
    { id: "services", label: `Katalog Layanan (${services.length})`, icon: Briefcase },
    { id: "catalog", label: "Teks Pengantar Katalog", icon: Layers },
    { id: "process", label: "4 Langkah Metodologi", icon: GitCommit },
    { id: "cta", label: "Banner CTA Bawah", icon: Layers },
  ];

  const isDataTab = activeTab === "services";

  return (
    <AdminLayout title="CMS Halaman Layanan">
      <Head title="Kelola Halaman Layanan — Athera CMS" />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-nexus-surface border border-white/10 rounded-2xl p-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-nexus-accent glow-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-nexus-accent">
                CMS Halaman Layanan (/layanan)
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl text-white">
              Kelola Konten & Katalog Layanan
            </h1>
            <p className="text-xs text-nexus-muted mt-1">
              Atur teks hero section, item katalog layanan (tambah/edit/hapus/deliverables), 4 langkah metodologi, dan banner CTA.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/layanan"
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

        {/* ================= TAB CONTENT ================= */}

        {/* TAB 1: HERO */}
        {activeTab === "hero" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">Hero Halaman Layanan</h2>
                <p className="text-xs text-nexus-muted">
                  Teks header atas dan subjudul di halaman detail layanan.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Badge Label Kecil
                </label>
                <input
                  type="text"
                  value={form.services_hero_badge}
                  onChange={handleChange("services_hero_badge")}
                  className={inputClass}
                  placeholder="Layanan Human Capital"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Headline Baris 1
                  </label>
                  <input
                    type="text"
                    value={form.services_hero_line_1}
                    onChange={handleChange("services_hero_line_1")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Headline Baris 2 <span className="text-nexus-accent">(Warna Aksen Hijau)</span>
                  </label>
                  <input
                    type="text"
                    value={form.services_hero_line_2}
                    onChange={handleChange("services_hero_line_2")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Headline Baris 3
                  </label>
                  <input
                    type="text"
                    value={form.services_hero_line_3}
                    onChange={handleChange("services_hero_line_3")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Deskripsi / Sub-headline Hero Layanan
                </label>
                <textarea
                  value={form.services_hero_subtitle}
                  onChange={handleChange("services_hero_subtitle")}
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

        {/* TAB 2: SERVICES (DATA MASTER KATALOG LAYANAN) */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-nexus-surface border border-white/10 rounded-2xl p-6">
              <div>
                <h2 className="font-display font-bold text-lg text-white">
                  Katalog Layanan & Solusi Human Capital
                </h2>
                <p className="text-xs text-nexus-muted mt-1">
                  Atur daftar layanan, rincian deliverables, metrik dampak, dan status aktif.
                </p>
              </div>
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-4 py-2.5 rounded-xl text-xs hover:bg-nexus-accentHover transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus size={15} />
                Tambah Layanan Baru
              </button>
            </div>

            <div className="bg-nexus-surface border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-nexus-muted">
                  <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-white">
                    <tr>
                      <th className="px-6 py-4 w-16 text-center">Urutan</th>
                      <th className="px-6 py-4">Layanan</th>
                      <th className="px-6 py-4">Kategori / Badge</th>
                      <th className="px-6 py-4">Deliverables</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {services && services.length > 0 ? (
                      services.map((s) => (
                        <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 font-bold text-white text-center">
                            {s.sort_order}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white text-base">{s.title}</div>
                            <div className="text-xs text-nexus-muted mt-1 max-w-md line-clamp-2">
                              {s.description}
                            </div>
                            {s.impact && (
                              <div className="text-[11px] text-nexus-accent mt-1.5 font-medium">
                                Dampak: {s.impact}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {s.badge ? (
                              <span className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300">
                                {s.badge}
                              </span>
                            ) : (
                              <span className="text-xs text-nexus-faint">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-nexus-base/80 border border-white/10 text-white">
                              {Array.isArray(s.deliverables) ? s.deliverables.length : 0} Item
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleToggleService(s)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                                s.is_active
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-red-500/10 text-red-400 border border-red-500/20"
                              }`}
                            >
                              {s.is_active ? <Check size={12} /> : <X size={12} />}
                              {s.is_active ? "Aktif" : "Nonaktif"}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => openEditModal(s)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-nexus-accent/20 hover:text-nexus-accent text-nexus-muted transition-colors cursor-pointer"
                              title="Edit Layanan"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteService(s.id, s.title)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-nexus-muted transition-colors cursor-pointer"
                              title="Hapus Layanan"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-nexus-muted text-xs">
                          Belum ada data layanan. Klik "Tambah Layanan Baru" di atas.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATALOG INTRO */}
        {activeTab === "catalog" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Teks Pengantar Katalog Layanan
                </h2>
                <p className="text-xs text-nexus-muted">
                  Teks pengantar di atas kartu-kartu layanan komprehensif pada halaman publik.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={form.services_catalog_badge}
                    onChange={handleChange("services_catalog_badge")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Judul Section Katalog
                  </label>
                  <input
                    type="text"
                    value={form.services_catalog_title}
                    onChange={handleChange("services_catalog_title")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Deskripsi Singkat Katalog
                </label>
                <textarea
                  value={form.services_catalog_desc}
                  onChange={handleChange("services_catalog_desc")}
                  className={textareaClass}
                  rows={2}
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

        {/* TAB 4: PROCESS */}
        {activeTab === "process" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  4 Langkah Metodologi & Alur Kerja
                </h2>
                <p className="text-xs text-nexus-muted">
                  Menjelaskan tahapan kerja profesional mulai dari diagnosa hingga alih pengetahuan.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Badge Label Section
                  </label>
                  <input
                    type="text"
                    value={form.services_process_badge}
                    onChange={handleChange("services_process_badge")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Judul Besar Metodologi
                  </label>
                  <input
                    type="text"
                    value={form.services_process_title}
                    onChange={handleChange("services_process_title")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Deskripsi Pengantar Metodologi
                </label>
                <textarea
                  value={form.services_process_desc}
                  onChange={handleChange("services_process_desc")}
                  className={textareaClass}
                  rows={2}
                />
              </div>

              {/* Steps 1 to 4 */}
              <div className="space-y-6 pt-4 border-t border-white/5">
                {/* Step 1 */}
                <div className="space-y-3 bg-nexus-base/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-nexus-accent uppercase tracking-wider">
                    Langkah 1
                  </span>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Nomor</label>
                      <input
                        type="text"
                        value={form.services_step1_num}
                        onChange={handleChange("services_step1_num")}
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Judul Langkah</label>
                      <input
                        type="text"
                        value={form.services_step1_title}
                        onChange={handleChange("services_step1_title")}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Deskripsi Langkah</label>
                    <textarea
                      value={form.services_step1_desc}
                      onChange={handleChange("services_step1_desc")}
                      className={textareaClass}
                      rows={2}
                    />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-3 bg-nexus-base/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-nexus-accent uppercase tracking-wider">
                    Langkah 2
                  </span>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Nomor</label>
                      <input
                        type="text"
                        value={form.services_step2_num}
                        onChange={handleChange("services_step2_num")}
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Judul Langkah</label>
                      <input
                        type="text"
                        value={form.services_step2_title}
                        onChange={handleChange("services_step2_title")}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Deskripsi Langkah</label>
                    <textarea
                      value={form.services_step2_desc}
                      onChange={handleChange("services_step2_desc")}
                      className={textareaClass}
                      rows={2}
                    />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-3 bg-nexus-base/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-nexus-accent uppercase tracking-wider">
                    Langkah 3
                  </span>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Nomor</label>
                      <input
                        type="text"
                        value={form.services_step3_num}
                        onChange={handleChange("services_step3_num")}
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Judul Langkah</label>
                      <input
                        type="text"
                        value={form.services_step3_title}
                        onChange={handleChange("services_step3_title")}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Deskripsi Langkah</label>
                    <textarea
                      value={form.services_step3_desc}
                      onChange={handleChange("services_step3_desc")}
                      className={textareaClass}
                      rows={2}
                    />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="space-y-3 bg-nexus-base/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-nexus-accent uppercase tracking-wider">
                    Langkah 4
                  </span>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Nomor</label>
                      <input
                        type="text"
                        value={form.services_step4_num}
                        onChange={handleChange("services_step4_num")}
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Judul Langkah</label>
                      <input
                        type="text"
                        value={form.services_step4_title}
                        onChange={handleChange("services_step4_title")}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Deskripsi Langkah</label>
                    <textarea
                      value={form.services_step4_desc}
                      onChange={handleChange("services_step4_desc")}
                      className={textareaClass}
                      rows={2}
                    />
                  </div>
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

        {/* TAB 5: CTA BANNER */}
        {activeTab === "cta" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Banner Ajakan Bertindak (CTA Bawah)
                </h2>
                <p className="text-xs text-nexus-muted">
                  Kotak penutup di bagian bawah halaman layanan yang mengarahkan pengunjung ke halaman kontak.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Judul Banner CTA
                </label>
                <input
                  type="text"
                  value={form.services_cta_title}
                  onChange={handleChange("services_cta_title")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Deskripsi / Sub-judul CTA
                </label>
                <textarea
                  value={form.services_cta_desc}
                  onChange={handleChange("services_cta_desc")}
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
                  value={form.services_cta_button}
                  onChange={handleChange("services_cta_button")}
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

        {/* ================= SERVICE ADD/EDIT MODAL ================= */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-nexus-surface border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <h3 className="font-display font-bold text-xl text-white">
                  {editingService ? "Edit Layanan" : "Tambah Layanan Baru"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-nexus-muted hover:text-white rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleServiceSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">
                      Judul Layanan *
                    </label>
                    <input
                      required
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      placeholder="mis. Konsultasi Strategi HR"
                      className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">
                      Kategori / Badge Tag
                    </label>
                    <input
                      value={serviceForm.badge}
                      onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                      placeholder="mis. Strategic Advisory"
                      className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">
                    Deskripsi Lengkap *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={serviceForm.description}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, description: e.target.value })
                    }
                    placeholder="Jelaskan ruang lingkup dan pendekatan layanan ini..."
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent resize-none"
                  />
                </div>

                {/* Dynamic Deliverables Repeater */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase font-medium text-nexus-muted">
                      Deliverables & Ruang Lingkup Layanan
                    </label>
                    <button
                      type="button"
                      onClick={addDeliverable}
                      className="text-xs text-nexus-accent hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <PlusCircle size={14} />
                      Tambah Item
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {serviceForm.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          value={item}
                          onChange={(e) => updateDeliverable(idx, e.target.value)}
                          placeholder={`Deliverable ${idx + 1} (mis. Job Grading & Salary Structure)`}
                          className="flex-1 bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-nexus-accent"
                        />
                        {serviceForm.deliverables.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDeliverable(idx)}
                            className="p-2 text-nexus-muted hover:text-red-400 cursor-pointer"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">
                      Estimasi Dampak / Metrik
                    </label>
                    <input
                      value={serviceForm.impact}
                      onChange={(e) => setServiceForm({ ...serviceForm, impact: e.target.value })}
                      placeholder="mis. Efisiensi struktur hingga 28%"
                      className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">
                      Urutan Tampilan
                    </label>
                    <input
                      type="number"
                      value={serviceForm.sort_order}
                      onChange={(e) =>
                        setServiceForm({
                          ...serviceForm,
                          sort_order: parseInt(e.target.value) || 1,
                        })
                      }
                      className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={serviceForm.is_active}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, is_active: e.target.checked })
                    }
                    className="rounded border-white/10 bg-nexus-base text-nexus-accent focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="is_active"
                    className="text-sm text-white cursor-pointer select-none"
                  >
                    Tampilkan di Website (Status Aktif)
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-nexus-accent text-nexus-base text-sm font-semibold hover:bg-nexus-accentHover transition-colors cursor-pointer"
                  >
                    {editingService ? "Simpan Perubahan" : "Tambah Layanan"}
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
