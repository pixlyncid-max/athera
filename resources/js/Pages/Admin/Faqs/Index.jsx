import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Plus, Pencil, Trash2, HelpCircle, X } from "lucide-react";

export default function FaqsIndex({ faqs }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    sort_order: 1,
    is_active: true,
  });

  const openAddModal = () => {
    setEditingFaq(null);
    setForm({
      question: "",
      answer: "",
      sort_order: faqs.length + 1,
      is_active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      sort_order: faq.sort_order || 1,
      is_active: Boolean(faq.is_active),
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingFaq) {
      router.put(`/admin/faqs/${editingFaq.id}`, form, {
        onSuccess: () => setModalOpen(false),
      });
    } else {
      router.post("/admin/faqs", form, {
        onSuccess: () => setModalOpen(false),
      });
    }
  };

  const handleDelete = (id, question) => {
    if (confirm(`Hapus pertanyaan FAQ "${question}"?`)) {
      router.delete(`/admin/faqs/${id}`);
    }
  };

  return (
    <AdminLayout title="Manajemen Tanya Jawab (FAQ)">
      <Head title="Kelola FAQ — Athera CMS" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <p className="text-nexus-muted text-sm max-w-xl">
          Kelola daftar pertanyaan yang sering diajukan calon klien seputar proses konsultasi awal, NDA, dan metode kerja sama.
        </p>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-5 py-2.5 rounded-xl hover:bg-nexus-accentHover transition-colors cursor-pointer text-sm shadow-md"
        >
          <Plus size={16} />
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
                  onClick={() => openEditModal(faq)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-nexus-accent/20 hover:text-nexus-accent text-nexus-muted transition-colors cursor-pointer"
                  title="Edit FAQ"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(faq.id, faq.question)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-nexus-muted transition-colors cursor-pointer"
                  title="Hapus FAQ"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-nexus-muted bg-nexus-surface border border-white/10 rounded-2xl">
            Belum ada daftar FAQ.
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-display font-bold text-lg text-white">
                {editingFaq ? "Edit Pertanyaan FAQ" : "Tambah FAQ Baru"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-nexus-muted hover:text-white rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">
                  Pertanyaan *
                </label>
                <input
                  required
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder="mis. Apakah kami dapat menandatangani NDA?"
                  className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">
                  Jawaban Lengkap *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  placeholder="Jelaskan jawaban secara ramah dan profesional..."
                  className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent resize-none"
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

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-nexus-accent text-nexus-base text-sm font-semibold hover:bg-nexus-accentHover transition-colors cursor-pointer"
                >
                  {editingFaq ? "Simpan Perubahan" : "Tambah FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
