import { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
  Save,
  Building2,
  Share2,
  Sparkles,
  ArrowRight,
  Phone,
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsIndex({ settings = {} }) {
  const [form, setForm] = useState({
    // General & Branding
    site_name: settings.site_name || "Athera Nexus",
    company_name: settings.company_name || "PT Adiwangsa Humanika Solusi",
    tagline: settings.tagline || "Human Capital Consulting",
    meta_description: settings.meta_description || "",

    // Social Media Links
    social_instagram: settings.social_instagram || "https://instagram.com",
    social_facebook: settings.social_facebook || "https://facebook.com",
    social_whatsapp: settings.social_whatsapp || "https://wa.me/6281198765432",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    router.post("/admin/settings", form, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Pengaturan website berhasil disimpan!");
        setSaving(false);
      },
      onError: () => {
        toast.error("Gagal menyimpan pengaturan.");
        setSaving(false);
      },
    });
  };

  return (
    <AdminLayout title="Pengaturan Umum Website">
      <Head title="Pengaturan Website — Athera CMS" />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Info Banner: Page CMS */}
        <div className="bg-nexus-accent/10 border border-nexus-accent/25 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-nexus-accent/20 border border-nexus-accent/30 flex items-center justify-center text-nexus-accent shrink-0 mt-0.5">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-white">
                Pengaturan Konten & Kontak Terintegrasi di Halaman
              </h3>
              <p className="text-xs text-nexus-muted mt-0.5">
                Alamat kantor, nomor telepon/hotline, email, jam operasional, serta teks hero section per halaman dikelola secara mandiri pada menu <strong>CMS Konten Halaman &gt; Halaman Kontak</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/admin/pages/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-nexus-accent hover:underline bg-nexus-accent/10 px-3.5 py-2 rounded-xl border border-nexus-accent/20"
            >
              <Phone size={13} />
              <span>Buka CMS Kontak</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* SECTION 1: PERUSAHAAN & BRANDING */}
        <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-nexus-elevated border border-white/10 flex items-center justify-center text-nexus-accent">
              <Building2 size={20} />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Identitas Perusahaan & Branding</h2>
              <p className="text-nexus-muted text-xs">Nama entitas, legal PT, dan meta deskripsi SEO website</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">Nama Brand Website</label>
              <input value={form.site_name} onChange={handleChange("site_name")} className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent" />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">Nama Legal Perusahaan</label>
              <input value={form.company_name} onChange={handleChange("company_name")} className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent" />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">Tagline Perusahaan</label>
              <input value={form.tagline} onChange={handleChange("tagline")} className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent" />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">Meta Deskripsi (SEO)</label>
              <input value={form.meta_description} onChange={handleChange("meta_description")} className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent" />
            </div>
          </div>
        </div>

        {/* SECTION 2: SOSIAL MEDIA LINKS */}
        <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-nexus-elevated border border-white/10 flex items-center justify-center text-nexus-accent">
              <Share2 size={20} />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Tautan Sosial Media</h2>
              <p className="text-nexus-muted text-xs">Tautan ikon footer (Instagram, Facebook, WhatsApp)</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">Instagram URL</label>
              <input value={form.social_instagram} onChange={handleChange("social_instagram")} placeholder="https://instagram.com/..." className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent" />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">Facebook URL</label>
              <input value={form.social_facebook} onChange={handleChange("social_facebook")} placeholder="https://facebook.com/..." className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent" />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">WhatsApp Direct Link</label>
              <input value={form.social_whatsapp} onChange={handleChange("social_whatsapp")} placeholder="https://wa.me/..." className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end p-4 rounded-2xl bg-nexus-surface border border-white/10">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-8 py-3.5 rounded-xl hover:bg-nexus-accentHover hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl cursor-pointer disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Menyimpan..." : "Simpan Pengaturan"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
