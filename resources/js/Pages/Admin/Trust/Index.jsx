import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  ShieldCheck,
  Building2,
  TrendingUp,
  Award,
} from "lucide-react";

export default function TrustIndex({ stats, clients, caseStudies }) {
  const [activeTab, setActiveTab] = useState("stats"); // stats | clients | caseStudies

  // Modal States
  const [statModalOpen, setStatModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [statForm, setStatForm] = useState({ label: "", value: 100, suffix: "+", description: "", sort_order: 1 });

  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clientForm, setClientForm] = useState({ name: "", sector: "", sort_order: 1 });

  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [caseForm, setCaseForm] = useState({ title: "", metric: "", metric_label: "", result: "", sort_order: 1 });

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
      router.put(`/admin/trust/stats/${editingStat.id}`, statForm, { onSuccess: () => setStatModalOpen(false) });
    } else {
      router.post("/admin/trust/stats", statForm, { onSuccess: () => setStatModalOpen(false) });
    }
  };
  const deleteStat = (id, label) => {
    if (confirm(`Hapus statistik "${label}"?`)) {
      router.delete(`/admin/trust/stats/${id}`);
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
      router.put(`/admin/trust/clients/${editingClient.id}`, clientForm, { onSuccess: () => setClientModalOpen(false) });
    } else {
      router.post("/admin/trust/clients", clientForm, { onSuccess: () => setClientModalOpen(false) });
    }
  };
  const deleteClient = (id, name) => {
    if (confirm(`Hapus klien "${name}"?`)) {
      router.delete(`/admin/trust/clients/${id}`);
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
      router.put(`/admin/trust/case-studies/${editingCase.id}`, caseForm, { onSuccess: () => setCaseModalOpen(false) });
    } else {
      router.post("/admin/trust/case-studies", caseForm, { onSuccess: () => setCaseModalOpen(false) });
    }
  };
  const deleteCase = (id, title) => {
    if (confirm(`Hapus studi kasus "${title}"?`)) {
      router.delete(`/admin/trust/case-studies/${id}`);
    }
  };

  return (
    <AdminLayout title="Manajemen Kepercayaan, Klien & Studi Kasus">
      <Head title="Kelola Kepercayaan & Klien — Athera CMS" />

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 mb-8 pb-4">
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "stats"
              ? "bg-nexus-accent text-nexus-base shadow-md"
              : "bg-white/5 text-nexus-muted hover:text-white hover:bg-white/10"
          }`}
        >
          <TrendingUp size={16} />
          Statistik & Counter ({stats.length})
        </button>
        <button
          onClick={() => setActiveTab("clients")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "clients"
              ? "bg-nexus-accent text-nexus-base shadow-md"
              : "bg-white/5 text-nexus-muted hover:text-white hover:bg-white/10"
          }`}
        >
          <Building2 size={16} />
          Mitra & Klien ({clients.length})
        </button>
        <button
          onClick={() => setActiveTab("caseStudies")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "caseStudies"
              ? "bg-nexus-accent text-nexus-base shadow-md"
              : "bg-white/5 text-nexus-muted hover:text-white hover:bg-white/10"
          }`}
        >
          <Award size={16} />
          Studi Kasus ({caseStudies.length})
        </button>
      </div>

      {/* TAB 1: STATS */}
      {activeTab === "stats" && (
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="text-nexus-muted text-sm">
              Angka metrik utama yang muncul pada counter beranimasi di halaman Tentang Kami & Beranda.
            </p>
            <button
              onClick={openAddStat}
              className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-4 py-2 rounded-xl text-xs hover:bg-nexus-accentHover transition-colors cursor-pointer"
            >
              <Plus size={14} />
              Tambah Statistik
            </button>
          </div>

          <div className="bg-nexus-surface border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-sm text-nexus-muted">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-white">
                <tr>
                  <th className="px-6 py-4 w-16">Urutan</th>
                  <th className="px-6 py-4">Nilai & Suffix</th>
                  <th className="px-6 py-4">Label Metrik</th>
                  <th className="px-6 py-4">Keterangan</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.map((s) => (
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
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteStat(s.id, s.label)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-nexus-muted transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CLIENTS */}
      {activeTab === "clients" && (
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="text-nexus-muted text-sm">
              Daftar nama perusahaan/mitra yang ditampilkan pada logo grid portofolio klien.
            </p>
            <button
              onClick={openAddClient}
              className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-4 py-2 rounded-xl text-xs hover:bg-nexus-accentHover transition-colors cursor-pointer"
            >
              <Plus size={14} />
              Tambah Klien
            </button>
          </div>

          <div className="bg-nexus-surface border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-sm text-nexus-muted">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-white">
                <tr>
                  <th className="px-6 py-4 w-16">Urutan</th>
                  <th className="px-6 py-4">Nama Perusahaan / Klien</th>
                  <th className="px-6 py-4">Sektor Industri</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {clients.map((c) => (
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
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteClient(c.id, c.name)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-nexus-muted transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CASE STUDIES */}
      {activeTab === "caseStudies" && (
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <p className="text-nexus-muted text-sm">
              Studi kasus transformasi nyata beserta metrik kunci pembuktian hasil.
            </p>
            <button
              onClick={openAddCase}
              className="inline-flex items-center gap-2 bg-nexus-accent text-nexus-base font-semibold px-4 py-2 rounded-xl text-xs hover:bg-nexus-accentHover transition-colors cursor-pointer"
            >
              <Plus size={14} />
              Tambah Studi Kasus
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="bg-nexus-surface border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="font-display font-extrabold text-3xl text-nexus-accent">
                        {cs.metric}
                      </div>
                      <div className="text-xs uppercase text-nexus-muted mt-0.5">{cs.metric_label}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditCase(cs)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-nexus-accent/20 hover:text-nexus-accent text-nexus-muted"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteCase(cs.id, cs.title)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-nexus-muted"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-2">{cs.title}</h3>
                  <p className="text-nexus-muted text-xs leading-relaxed">{cs.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STAT MODAL */}
      {statModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-nexus-surface border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h3 className="font-display font-bold text-lg text-white mb-4">
              {editingStat ? "Edit Statistik" : "Tambah Statistik"}
            </h3>
            <form onSubmit={handleStatSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Label Metrik *</label>
                <input required value={statForm.label} onChange={(e) => setStatForm({ ...statForm, label: e.target.value })} placeholder="mis. Klien Korporat" className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Nilai Angka *</label>
                  <input type="number" required value={statForm.value} onChange={(e) => setStatForm({ ...statForm, value: parseInt(e.target.value) || 0 })} className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Suffix (mis. +, %)</label>
                  <input value={statForm.suffix} onChange={(e) => setStatForm({ ...statForm, suffix: e.target.value })} className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Deskripsi Singkat</label>
                <input value={statForm.description} onChange={(e) => setStatForm({ ...statForm, description: e.target.value })} placeholder="Keterangan singkat" className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
              </div>
              <div>
                <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Urutan</label>
                <input type="number" value={statForm.sort_order} onChange={(e) => setStatForm({ ...statForm, sort_order: parseInt(e.target.value) || 1 })} className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setStatModalOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 text-sm">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-nexus-accent text-nexus-base text-sm font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLIENT MODAL */}
      {clientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-nexus-surface border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h3 className="font-display font-bold text-lg text-white mb-4">
              {editingClient ? "Edit Klien" : "Tambah Klien"}
            </h3>
            <form onSubmit={handleClientSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Nama Perusahaan *</label>
                <input required value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} placeholder="mis. PT Nusantara Energi" className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
              </div>
              <div>
                <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Sektor Industri</label>
                <input value={clientForm.sector} onChange={(e) => setClientForm({ ...clientForm, sector: e.target.value })} placeholder="mis. Energi & Sumber Daya" className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
              </div>
              <div>
                <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Urutan</label>
                <input type="number" value={clientForm.sort_order} onChange={(e) => setClientForm({ ...clientForm, sort_order: parseInt(e.target.value) || 1 })} className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setClientModalOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 text-sm">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-nexus-accent text-nexus-base text-sm font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CASE STUDY MODAL */}
      {caseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-nexus-surface border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h3 className="font-display font-bold text-lg text-white mb-4">
              {editingCase ? "Edit Studi Kasus" : "Tambah Studi Kasus"}
            </h3>
            <form onSubmit={handleCaseSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Judul Proyek / Studi Kasus *</label>
                <input required value={caseForm.title} onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })} placeholder="mis. Restrukturisasi Holding Energi" className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Metrik Utama *</label>
                  <input required value={caseForm.metric} onChange={(e) => setCaseForm({ ...caseForm, metric: e.target.value })} placeholder="mis. 4.200+" className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Label Metrik *</label>
                  <input required value={caseForm.metric_label} onChange={(e) => setCaseForm({ ...caseForm, metric_label: e.target.value })} placeholder="mis. Posisi distandardisasi" className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Hasil / Pencapaian Transformasi *</label>
                <textarea required rows={3} value={caseForm.result} onChange={(e) => setCaseForm({ ...caseForm, result: e.target.value })} placeholder="Jelaskan dampak nyata proyek ini..." className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent resize-none" />
              </div>
              <div>
                <label className="block text-xs uppercase text-nexus-muted mb-1 font-medium">Urutan</label>
                <input type="number" value={caseForm.sort_order} onChange={(e) => setCaseForm({ ...caseForm, sort_order: parseInt(e.target.value) || 1 })} className="w-full bg-nexus-base border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-nexus-accent" />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setCaseModalOpen(false)} className="px-4 py-2 rounded-xl bg-white/5 text-sm">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-nexus-accent text-nexus-base text-sm font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
