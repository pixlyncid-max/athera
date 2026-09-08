import { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
  Mail,
  MailOpen,
  CheckCircle2,
  Trash2,
  Building2,
  Briefcase,
  Clock,
  MessageSquare,
  X,
  ExternalLink,
} from "lucide-react";

export default function InquiriesIndex({ inquiries, currentStatus, counts }) {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusForm, setStatusForm] = useState({ status: "unread", notes: "" });

  const openDetailModal = (inq) => {
    setSelectedInquiry(inq);
    setStatusForm({
      status: inq.status || "unread",
      notes: inq.notes || "",
    });

    // Automatically mark as read if it was unread
    if (inq.status === "unread") {
      router.patch(`/admin/inquiries/${inq.id}/status`, {
        status: "read",
        notes: inq.notes || "",
      }, { preserveScroll: true });
    }
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;

    router.patch(`/admin/inquiries/${selectedInquiry.id}/status`, statusForm, {
      preserveScroll: true,
      onSuccess: () => setSelectedInquiry(null),
    });
  };

  const handleDelete = (id, name) => {
    if (confirm(`Hapus pesan dari "${name}"?`)) {
      router.delete(`/admin/inquiries/${id}`, {
        onSuccess: () => {
          if (selectedInquiry?.id === id) setSelectedInquiry(null);
        },
      });
    }
  };

  return (
    <AdminLayout title="Kotak Masuk Permintaan Konsultasi">
      <Head title="Pesan Masuk — Athera CMS" />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 mb-8 pb-4">
        {[
          { key: "all", label: "Semua Pesan", count: counts.all },
          { key: "unread", label: "Belum Dibaca", count: counts.unread },
          { key: "read", label: "Telah Dibaca", count: counts.read },
          { key: "replied", label: "Telah Dibalas", count: counts.replied },
        ].map((tab) => (
          <Link
            key={tab.key}
            href={tab.key === "all" ? "/admin/inquiries" : `/admin/inquiries?status=${tab.key}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              currentStatus === tab.key || (tab.key === "all" && !["unread", "read", "replied"].includes(currentStatus))
                ? "bg-nexus-accent text-nexus-base shadow-md"
                : "bg-white/5 text-nexus-muted hover:text-white hover:bg-white/10"
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              currentStatus === tab.key || (tab.key === "all" && !["unread", "read", "replied"].includes(currentStatus))
                ? "bg-black/20 text-nexus-base font-bold"
                : "bg-white/10 text-nexus-muted"
            }`}>
              {tab.count}
            </span>
          </Link>
        ))}
      </div>

      {/* Inquiries Table */}
      <div className="bg-nexus-surface border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-nexus-muted">
            <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-white">
              <tr>
                <th className="px-6 py-4">Pengirim & Email</th>
                <th className="px-6 py-4">Perusahaan</th>
                <th className="px-6 py-4">Layanan Diminati</th>
                <th className="px-6 py-4">Pesan Singkat</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {inquiries.data && inquiries.data.length > 0 ? (
                inquiries.data.map((inq) => (
                  <tr
                    key={inq.id}
                    className={`hover:bg-white/[0.02] transition-colors ${
                      inq.status === "unread" ? "bg-nexus-accent/[0.02]" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white flex items-center gap-2">
                        {inq.name}
                        {inq.status === "unread" && (
                          <span className="w-2 h-2 rounded-full bg-nexus-accent glow-accent" />
                        )}
                      </div>
                      <a href={`mailto:${inq.email}`} className="text-xs text-nexus-accent hover:underline">
                        {inq.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-300">
                      {inq.company || "-"}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {inq.service ? (
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white">
                          {inq.service}
                        </span>
                      ) : (
                        <span className="text-nexus-faint">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-nexus-muted max-w-xs truncate">
                      {inq.message}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          inq.status === "unread"
                            ? "bg-nexus-accent/20 text-nexus-accent border border-nexus-accent/30"
                            : inq.status === "replied"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-white/10 text-gray-300 border border-white/10"
                        }`}
                      >
                        {inq.status === "unread" ? "Baru" : inq.status === "replied" ? "Dibalas" : "Dibaca"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openDetailModal(inq)}
                        className="px-3 py-1.5 rounded-lg bg-nexus-accent/10 border border-nexus-accent/20 text-xs font-semibold text-nexus-accent hover:bg-nexus-accent hover:text-nexus-base transition-colors cursor-pointer"
                      >
                        Lihat Detail
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id, inq.name)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-nexus-muted transition-colors cursor-pointer"
                        title="Hapus Pesan"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-nexus-muted">
                    Tidak ada pesan dalam kategori ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-nexus-surface border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Detail Permintaan Konsultasi</h3>
                <p className="text-nexus-muted text-xs mt-0.5">
                  Diterima pada {new Date(selectedInquiry.created_at).toLocaleString("id-ID")}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 text-nexus-muted hover:text-white rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Sender Info Grid */}
              <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-nexus-base/60 border border-white/5">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-nexus-muted">Nama Klien</div>
                  <div className="font-semibold text-white text-base mt-0.5">{selectedInquiry.name}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-nexus-muted">Email</div>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-nexus-accent hover:underline text-sm mt-0.5 block">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-nexus-muted">Perusahaan</div>
                  <div className="text-gray-300 text-sm mt-0.5">{selectedInquiry.company || "-"}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-nexus-muted">Kebutuhan Layanan</div>
                  <div className="text-gray-300 text-sm mt-0.5">{selectedInquiry.service || "Umum"}</div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-nexus-muted mb-2">Isi Pesan</div>
                <div className="p-4 rounded-2xl bg-nexus-base border border-white/10 text-white text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Update Status & Internal Notes Form */}
              <form onSubmit={handleUpdateStatus} className="pt-4 border-t border-white/10 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">
                      Update Status Pesan
                    </label>
                    <select
                      value={statusForm.status}
                      onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                      className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                    >
                      <option value="unread" className="bg-nexus-base">Belum Dibaca (Baru)</option>
                      <option value="read" className="bg-nexus-base">Telah Dibaca</option>
                      <option value="replied" className="bg-nexus-base">Selesai / Telah Dibalas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-medium text-nexus-muted mb-2">
                      Catatan Tindak Lanjut (Internal)
                    </label>
                    <input
                      value={statusForm.notes}
                      onChange={(e) => setStatusForm({ ...statusForm, notes: e.target.value })}
                      placeholder="mis. Dijadwalkan meeting tgl 12 Maret"
                      className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-nexus-accent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Tanggapan%20Konsultasi%20Athera%20Nexus&body=Halo%20${encodeURIComponent(selectedInquiry.name)},%0A%0ATerima%20kasih%20telah%20menghubungi%20Athera%20Nexus.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-nexus-accent hover:underline font-semibold"
                  >
                    <Mail size={14} />
                    Balas via Email Klien
                    <ExternalLink size={12} />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedInquiry(null)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Tutup
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-nexus-accent text-nexus-base text-sm font-semibold hover:bg-nexus-accentHover transition-colors cursor-pointer"
                    >
                      Simpan Status
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
