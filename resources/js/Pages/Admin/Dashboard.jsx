import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
  Mail,
  Briefcase,
  ShieldCheck,
  HelpCircle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function Dashboard({ metrics, recentInquiries }) {
  const cards = [
    {
      title: "Pesan Masuk (Inbox)",
      value: metrics.total_inquiries,
      subValue: `${metrics.unread_inquiries} Belum Dibaca`,
      icon: Mail,
      href: "/admin/inquiries",
      highlight: metrics.unread_inquiries > 0,
    },
    {
      title: "Layanan Aktif",
      value: metrics.active_services,
      subValue: `dari ${metrics.total_services} total layanan`,
      icon: Briefcase,
      href: "/admin/services",
    },
    {
      title: "Mitra & Klien Korporat",
      value: metrics.total_clients,
      subValue: "Terverifikasi di Website",
      icon: ShieldCheck,
      href: "/admin/trust",
    },
    {
      title: "Tanya Jawab (FAQ)",
      value: metrics.total_faqs,
      subValue: "Pertanyaan Aktif",
      icon: HelpCircle,
      href: "/admin/faqs",
    },
  ];

  return (
    <AdminLayout title="Ringkasan Dashboard CMS">
      <Head title="Admin Dashboard — Athera CMS" />

      {/* Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`p-6 rounded-2xl bg-nexus-surface border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${
                card.highlight
                  ? "border-nexus-accent/40 shadow-lg shadow-nexus-accent/5"
                  : "border-white/10 hover:border-nexus-accent/30"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-nexus-muted uppercase tracking-wider">
                  {card.title}
                </span>
                <div className="w-10 h-10 rounded-xl bg-nexus-elevated border border-white/10 flex items-center justify-center text-nexus-accent">
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-1">
                  {card.value}
                </div>
                <div className="text-xs text-nexus-muted flex items-center justify-between">
                  <span>{card.subValue}</span>
                  <ArrowUpRight size={14} className="text-nexus-accent" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions & Recent Inquiries */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-xl text-white">Permintaan Konsultasi Terbaru</h2>
              <p className="text-nexus-muted text-xs mt-1">Daftar calon klien yang menghubungi melalui formulir website</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-nexus-accent hover:underline flex items-center gap-1"
            >
              Lihat Semua
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {recentInquiries && recentInquiries.length > 0 ? (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-4 rounded-xl bg-nexus-base/60 border border-white/5 flex items-start justify-between gap-4 hover:border-nexus-accent/30 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white">{inq.name}</span>
                      {inq.company && (
                        <span className="text-xs text-nexus-muted px-2 py-0.5 rounded bg-white/5">
                          {inq.company}
                        </span>
                      )}
                      {inq.status === "unread" && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-nexus-accent/20 text-nexus-accent border border-nexus-accent/30">
                          Baru
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-nexus-muted truncate max-w-md">
                      {inq.service ? `[${inq.service}] ` : ""}{inq.message}
                    </div>
                    <div className="text-[11px] text-nexus-faint flex items-center gap-2 pt-1">
                      <span>{inq.email}</span>
                      <span>•</span>
                      <span>{new Date(inq.created_at).toLocaleDateString("id-ID")}</span>
                    </div>
                  </div>

                  <Link
                    href="/admin/inquiries"
                    className="shrink-0 text-xs font-medium text-nexus-accent hover:text-nexus-accentHover px-3 py-1.5 rounded-lg bg-nexus-accent/10 border border-nexus-accent/20"
                  >
                    Buka
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-nexus-muted text-sm">
              Belum ada pesan masuk.
            </div>
          )}
        </div>

        {/* Quick Shortcuts */}
        <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="font-display font-bold text-xl text-white mb-2">Pintasan Cepat CMS</h2>
            <p className="text-nexus-muted text-xs mb-6">Kelola konten dan parameter utama website Athera Nexus</p>

            <div className="space-y-3">
              <Link
                href="/admin/services"
                className="flex items-center justify-between p-3.5 rounded-xl bg-nexus-base/60 border border-white/5 hover:border-nexus-accent/40 text-sm text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Briefcase size={16} className="text-nexus-accent" />
                  <span>Tambah / Edit Layanan</span>
                </div>
                <ArrowUpRight size={14} className="text-nexus-muted" />
              </Link>

              <Link
                href="/admin/trust"
                className="flex items-center justify-between p-3.5 rounded-xl bg-nexus-base/60 border border-white/5 hover:border-nexus-accent/40 text-sm text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-nexus-accent" />
                  <span>Kelola Klien & Statistik</span>
                </div>
                <ArrowUpRight size={14} className="text-nexus-muted" />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3.5 rounded-xl bg-nexus-base/60 border border-white/5 hover:border-nexus-accent/40 text-sm text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-nexus-accent" />
                  <span>Ubah Kontak & Teks Hero</span>
                </div>
                <ArrowUpRight size={14} className="text-nexus-muted" />
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="p-4 rounded-xl bg-nexus-accent/10 border border-nexus-accent/20 text-xs text-nexus-muted leading-relaxed">
              <strong className="text-white block mb-1">Database Aktif: MySQL (athera)</strong>
              Semua perubahan yang disimpan di CMS akan langsung terupdate secara real-time pada tampilan website publik.
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
