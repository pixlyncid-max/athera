import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  PlusCircle,
  XCircle,
  Briefcase,
  Layers,
  ArrowUpDown,
} from "lucide-react";

export default function ServicesIndex({ services }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [form, setForm] = useState({
    title: "",
    badge: "",
    icon: "Compass",
    description: "",
    deliverables: [""],
    impact: "",
    sort_order: 1,
    is_active: true,
  });

  const openAddModal = () => {
    setEditingService(null);
    setForm({
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
    setForm({
      title: service.title,
      badge: service.badge || "",
      icon: service.icon || "Compass",
      description: service.description || "",
      deliverables: Array.isArray(service.deliverables) && service.deliverables.length > 0 ? service.deliverables : [""],
      impact: service.impact || "",
      sort_order: service.sort_order || 1,
      is_active: Boolean(service.is_active),
    });
    setModalOpen(true);
  };

  const addDeliverable = () => {
    setForm({ ...form, deliverables: [...form.deliverables, ""] });
  };

  const updateDeliverable = (index, value) => {
    const updated = [...form.deliverables];
    updated[index] = value;
    setForm({ ...form, deliverables: updated });
  };

  const removeDeliverable = (index) => {
    const updated = form.deliverables.filter((_, i) => i !== index);
    setForm({ ...form, deliverables: updated.length > 0 ? updated : [""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanDeliverables = form.deliverables.filter((d) => d.trim() !== "");

    const payload = {
      ...form,
      deliverables: cleanDeliverables,
    };

    if (editingService) {
      router.put(`/admin/services/${editingService.id}`, payload, {
        onSuccess: () => setModalOpen(false),
      });
    } else {
      router.post("/admin/services", payload, {
        onSuccess: () => setModalOpen(false),
      });
    }
  };

  const handleDelete = (id, title) => {
    if (confirm(`Apakah Anda yakin ingin menghapus layanan "${title}"?`)) {
      router.delete(`/admin/services/${id}`);
    }
  };

  const handleToggle = (service) => {
    router.patch(`/admin/services/${service.id}/toggle`);
  };

  return (
    <AdminLayout title="Manajemen Layanan & Solusi HR">
      <Head title="Kelola Layanan — Athera CMS" />

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <p className="text-nexus-muted text-sm max-w-xl">
          Atur katalog layanan, rincian deliverables, serta metrik dampak yang ditampilkan di halaman Layanan dan Beranda.
        </p>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-5 py-2.5 rounded-xl hover:bg-nexus-accentHover hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm shadow-md"
        >
          <Plus size={16} />
          Tambah Layanan Baru
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-nexus-surface border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-nexus-muted">
            <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-white">
              <tr>
                <th className="px-6 py-4 w-16">Urutan</th>
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
                        onClick={() => handleToggle(s)}
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
                        onClick={() => handleDelete(s.id, s.title)}
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
                  <td colSpan={6} className="px-6 py-12 text-center text-nexus-muted">
                    Belum ada data layanan. Klik "Tambah Layanan Baru" untuk menambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-nexus-surface border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">
                    Judul Layanan *
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="mis. Konsultasi Strategi HR"
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">
                    Kategori / Badge Tag
                  </label>
                  <input
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
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
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                    className="text-xs text-nexus-accent hover:underline flex items-center gap-1 font-semibold"
                  >
                    <PlusCircle size={14} />
                    Tambah Item
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {form.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        value={item}
                        onChange={(e) => updateDeliverable(idx, e.target.value)}
                        placeholder={`Deliverable ${idx + 1} (mis. Job Grading & Salary Structure)`}
                        className="flex-1 bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-nexus-accent"
                      />
                      {form.deliverables.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDeliverable(idx)}
                          className="p-2 text-nexus-muted hover:text-red-400"
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
                    value={form.impact}
                    onChange={(e) => setForm({ ...form, impact: e.target.value })}
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
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 1 })}
                    className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="rounded border-white/10 bg-nexus-base text-nexus-accent focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="is_active" className="text-sm text-white cursor-pointer select-none">
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
    </AdminLayout>
  );
}
