import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
  Mail,
  Sparkles,
  MapPin,
  HelpCircle,
  Clock,
  Save,
  Eye,
  Shield,
  Plus,
  Pencil,
  Trash2,
  X,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminContactPage({ settings = {}, faqs = [] }) {
  const [form, setForm] = useState({
    // Hero
    contact_hero_badge: settings.contact_hero_badge || "Kontak & Konsultasi",
    contact_hero_line_1: settings.contact_hero_line_1 || settings.hero_contact_title_1 || "Mari Memulai",
    contact_hero_line_2: settings.contact_hero_line_2 || settings.hero_contact_title_2 || "Dialog Strategis",
    contact_hero_line_3: settings.contact_hero_line_3 || settings.hero_contact_title_3 || "Human Capital.",
    contact_hero_subtitle:
      settings.contact_hero_subtitle ||
      settings.hero_contact_subtitle ||
      "Sampaikan kebutuhan spesifik organisasi Anda. Tim konsultan senior kami siap berdiskusi dan memberikan telaah awal yang relevan dan dapat segera diimplementasikan.",

    // Contact Details & Cards
    contact_info_title: settings.contact_info_title || "Informasi Kantor Pusat",
    contact_info_desc:
      settings.contact_info_desc ||
      "Silakan hubungi kami melalui saluran komunikasi resmi berikut atau buat janji temu untuk konsultasi tatap muka.",
    contact_address:
      settings.contact_address ||
      "Menara Sudirman Lt. 21, Jl. Jend. Sudirman Kav. 60, Jakarta Selatan 12190",
    contact_phone: settings.contact_phone || "+62 21 5000 1234",
    contact_whatsapp: settings.contact_whatsapp || "+62 811 9876 5432",
    contact_email_general: settings.contact_email_general || settings.contact_email || "halo@atheranexus.id",
    contact_email_partnership:
      settings.contact_email_partnership || settings.partnership_email || "partnership@atheranexus.id",
    contact_office_hours:
      settings.contact_office_hours || settings.office_hours || "Senin – Jumat: 08.30 – 17.30 WIB",
    contact_response_time:
      settings.contact_response_time || "Respons Terjamin Dalam 1x24 Jam Kerja",

    // Form Header
    contact_form_badge: settings.contact_form_badge || "Formulir Konsultasi",
    contact_form_title: settings.contact_form_title || "Kirimkan Gambaran Kebutuhan Anda",
    contact_form_desc:
      settings.contact_form_desc ||
      "Isi data singkat berikut. Seluruh informasi dijamin kerahasiaannya di bawah protokol NDA perusahaan.",
    contact_form_button: settings.contact_form_button || "Kirim Permintaan Konsultasi",

    // FAQ Section Intro
    contact_faq_badge: settings.contact_faq_badge || "Tanya Jawab Seputar Konsultasi",
    contact_faq_title: settings.contact_faq_title || "Pertanyaan yang Sering Diajukan",
    contact_faq_desc:
      settings.contact_faq_desc ||
      "Informasi mengenai proses awal, NDA, estimasi durasi, dan cakupan wilayah penugasan konsultasi kami.",
  });

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  // FAQ Modal States
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    sort_order: 1,
    is_active: true,
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    router.post("/admin/pages/contact", form, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Konten halaman Kontak berhasil disimpan!");
        setSaving(false);
      },
      onError: () => {
        toast.error("Gagal menyimpan konten. Silakan coba lagi.");
        setSaving(false);
      },
    });
  };

  // --- FAQ CRUD Handlers ---
  const openAddFaq = () => {
    setEditingFaq(null);
    setFaqForm({
      question: "",
      answer: "",
      sort_order: faqs.length + 1,
      is_active: true,
    });
    setFaqModalOpen(true);
  };

  const openEditFaq = (faq) => {
    setEditingFaq(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      sort_order: faq.sort_order || 1,
      is_active: Boolean(faq.is_active),
    });
    setFaqModalOpen(true);
  };

  const handleFaqSubmit = (e) => {
    e.preventDefault();
    if (editingFaq) {
      router.put(`/admin/faqs/${editingFaq.id}`, faqForm, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Pertanyaan FAQ berhasil diperbarui.");
          setFaqModalOpen(false);
        },
      });
    } else {
      router.post("/admin/faqs", faqForm, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Pertanyaan FAQ baru berhasil ditambahkan.");
          setFaqModalOpen(false);
        },
      });
    }
  };

  const deleteFaq = (id, question) => {
    if (confirm(`Hapus pertanyaan FAQ "${question}"?`)) {
      router.delete(`/admin/faqs/${id}`, {
        preserveScroll: true,
        onSuccess: () => toast.success("FAQ berhasil dihapus."),
      });
    }
  };

  const inputClass =
    "w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-nexus-muted/40 focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all";

  const textareaClass =
    "w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-nexus-muted/40 focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all min-h-[90px] resize-y";

  const TABS = [
    { id: "hero", label: "Hero Header", icon: Sparkles },
    { id: "faqs", label: `Daftar FAQ (${faqs.length})`, icon: HelpCircle },
    { id: "info", label: "Informasi Kantor & Jam", icon: MapPin },
    { id: "form", label: "Header Formulir", icon: Mail },
    { id: "faq_intro", label: "Pengantar Teks FAQ", icon: Layers },
  ];

  const isDataTab = activeTab === "faqs";

  return (
    <AdminLayout title="CMS Halaman Kontak">
      <Head title="Kelola Halaman Kontak — Athera CMS" />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-nexus-surface border border-white/10 rounded-2xl p-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-nexus-accent glow-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-nexus-accent">
                CMS Halaman Kontak (/kontak)
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl text-white">
              Kelola Konten & FAQ Kontak
            </h1>
            <p className="text-xs text-nexus-muted mt-1">
              Atur teks hero section, alamat kantor, saluran telepon/email, header form, dan daftar tanya-jawab (FAQ).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/kontak"
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
                <h2 className="font-display font-bold text-lg text-white">Hero Header Kontak</h2>
                <p className="text-xs text-nexus-muted">
                  Teks besar dan deskripsi pengantar di halaman /kontak.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Badge Label Atas
                </label>
                <input
                  type="text"
                  value={form.contact_hero_badge}
                  onChange={handleChange("contact_hero_badge")}
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
                    value={form.contact_hero_line_1}
                    onChange={handleChange("contact_hero_line_1")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Headline Baris 2
                  </label>
                  <input
                    type="text"
                    value={form.contact_hero_line_2}
                    onChange={handleChange("contact_hero_line_2")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Headline Baris 3 <span className="text-nexus-accent">(Aksen Hijau)</span>
                  </label>
                  <input
                    type="text"
                    value={form.contact_hero_line_3}
                    onChange={handleChange("contact_hero_line_3")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Sub-headline / Deskripsi Hero
                </label>
                <textarea
                  value={form.contact_hero_subtitle}
                  onChange={handleChange("contact_hero_subtitle")}
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

        {/* TAB 2: FAQS (DATA MASTER TANYA JAWAB) */}
        {activeTab === "faqs" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-nexus-surface border border-white/10 rounded-2xl p-6">
              <div>
                <h2 className="font-display font-bold text-lg text-white">
                  Daftar Pertanyaan & Jawaban FAQ
                </h2>
                <p className="text-xs text-nexus-muted mt-1">
                  Kelola pertanyaan yang sering diajukan calon klien seputar proses konsultasi, NDA, dan metode kerja sama.
                </p>
              </div>
              <button
                onClick={openAddFaq}
                className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-4 py-2.5 rounded-xl text-xs hover:bg-nexus-accentHover transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus size={15} />
                Tambah FAQ Baru
              </button>
            </div>

            <div className="space-y-4">
              {faqs && faqs.length > 0 ? (
                faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-nexus-surface border border-white/10 rounded-2xl p-6 flex items-start justify-between gap-6 hover:border-nexus-accent/30 transition-colors shadow-lg"
                  >
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-nexus-elevated border border-white/10 text-xs font-bold text-nexus-accent flex items-center justify-center shrink-0">
                          {faq.sort_order}
                        </span>
                        <h3 className="font-display font-bold text-white text-base">
                          {faq.question}
                        </h3>
                      </div>
                      <p className="text-nexus-muted text-sm leading-relaxed pl-8">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditFaq(faq)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-nexus-accent/20 hover:text-nexus-accent text-nexus-muted transition-colors cursor-pointer"
                        title="Edit FAQ"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => deleteFaq(faq.id, faq.question)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-nexus-muted transition-colors cursor-pointer"
                        title="Hapus FAQ"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-nexus-muted bg-nexus-surface border border-white/10 rounded-2xl text-xs">
                  Belum ada daftar FAQ. Klik "Tambah FAQ Baru" di atas.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: OFFICE INFO & HOURS */}
        {activeTab === "info" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Informasi Kontak & Jam Kerja
                </h2>
                <p className="text-xs text-nexus-muted">
                  Detail alamat, nomor telepon, WhatsApp, dan jaminan waktu respon.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Judul Section Info
                  </label>
                  <input
                    type="text"
                    value={form.contact_info_title}
                    onChange={handleChange("contact_info_title")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Badge Jaminan Waktu Respons
                  </label>
                  <input
                    type="text"
                    value={form.contact_response_time}
                    onChange={handleChange("contact_response_time")}
                    className={inputClass}
                    placeholder="Respons Terjamin Dalam 1x24 Jam Kerja"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Deskripsi Pengantar Info
                </label>
                <textarea
                  value={form.contact_info_desc}
                  onChange={handleChange("contact_info_desc")}
                  className={textareaClass}
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Alamat Lengkap Kantor
                </label>
                <textarea
                  value={form.contact_address}
                  onChange={handleChange("contact_address")}
                  className={textareaClass}
                  rows={2}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Nomor Telepon Kantor
                  </label>
                  <input
                    type="text"
                    value={form.contact_phone}
                    onChange={handleChange("contact_phone")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Nomor WhatsApp Konsultasi
                  </label>
                  <input
                    type="text"
                    value={form.contact_whatsapp}
                    onChange={handleChange("contact_whatsapp")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Email Umum (General Inquiries)
                  </label>
                  <input
                    type="email"
                    value={form.contact_email_general}
                    onChange={handleChange("contact_email_general")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Email Kemitraan (Corporate Partnership)
                  </label>
                  <input
                    type="email"
                    value={form.contact_email_partnership}
                    onChange={handleChange("contact_email_partnership")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Jam Operasional Kantor
                </label>
                <input
                  type="text"
                  value={form.contact_office_hours}
                  onChange={handleChange("contact_office_hours")}
                  className={inputClass}
                  placeholder="Senin – Jumat: 08.30 – 17.30 WIB"
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

        {/* TAB 4: FORM HEADER */}
        {activeTab === "form" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Header & Teks Formulir Kontak
                </h2>
                <p className="text-xs text-nexus-muted">
                  Teks ajakan di atas formulir kirim pesan dan label tombol pengiriman.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Badge Label Form
                  </label>
                  <input
                    type="text"
                    value={form.contact_form_badge}
                    onChange={handleChange("contact_form_badge")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Judul Formulir
                  </label>
                  <input
                    type="text"
                    value={form.contact_form_title}
                    onChange={handleChange("contact_form_title")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Deskripsi / Catatan Kerahasiaan NDA
                </label>
                <textarea
                  value={form.contact_form_desc}
                  onChange={handleChange("contact_form_desc")}
                  className={textareaClass}
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Teks Tombol Kirim Form
                </label>
                <input
                  type="text"
                  value={form.contact_form_button}
                  onChange={handleChange("contact_form_button")}
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

        {/* TAB 5: FAQ INTRO */}
        {activeTab === "faq_intro" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  Pengantar Tanya Jawab (FAQ)
                </h2>
                <p className="text-xs text-nexus-muted">
                  Teks pengantar di atas accordion FAQ pada halaman publik /kontak.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Badge Label FAQ
                  </label>
                  <input
                    type="text"
                    value={form.contact_faq_badge}
                    onChange={handleChange("contact_faq_badge")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Judul Section FAQ
                  </label>
                  <input
                    type="text"
                    value={form.contact_faq_title}
                    onChange={handleChange("contact_faq_title")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Deskripsi Singkat FAQ
                </label>
                <textarea
                  value={form.contact_faq_desc}
                  onChange={handleChange("contact_faq_desc")}
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

        {/* ================= FAQ MODAL ================= */}
        {faqModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <h3 className="font-display font-bold text-lg text-white">
                  {editingFaq ? "Edit Pertanyaan FAQ" : "Tambah FAQ Baru"}
                </h3>
                <button
                  onClick={() => setFaqModalOpen(false)}
                  className="p-2 text-nexus-muted hover:text-white rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleFaqSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-nexus-muted mb-1">
                    Pertanyaan *
                  </label>
                  <input
                    required
                    value={faqForm.question}
                    onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                    placeholder="mis. Apakah kami dapat menandatangani NDA?"
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-nexus-muted mb-1">
                    Jawaban Lengkap *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={faqForm.answer}
                    onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                    placeholder="Jelaskan jawaban secara ramah dan profesional..."
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-nexus-muted mb-1">
                    Urutan Tampilan
                  </label>
                  <input
                    type="number"
                    value={faqForm.sort_order}
                    onChange={(e) =>
                      setFaqForm({ ...faqForm, sort_order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setFaqModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-xs font-semibold text-nexus-muted hover:text-white transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-nexus-accent text-nexus-base text-xs font-bold hover:bg-nexus-accentHover transition-colors cursor-pointer"
                  >
                    {editingFaq ? "Simpan Perubahan" : "Tambah FAQ"}
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
