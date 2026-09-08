import { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
  LayoutDashboard,
  Home,
  Briefcase,
  ShieldCheck,
  HelpCircle,
  Mail,
  Sliders,
  ExternalLink,
  LogOut,
  User,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { toast, Toaster } from "sonner";

const NAV_SECTIONS = [
  {
    title: "Menu Utama",
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, pattern: "/admin/dashboard" },
    ],
  },
  {
    title: "CMS Konten Halaman",
    items: [
      { name: "Halaman Beranda", href: "/admin/pages/home", icon: Home, pattern: "/admin/pages/home" },
      { name: "Halaman Layanan", href: "/admin/pages/services", icon: Sparkles, pattern: "/admin/pages/services" },
      { name: "Halaman Tentang Kami", href: "/admin/pages/about", icon: ShieldCheck, pattern: "/admin/pages/about" },
      { name: "Halaman Kontak", href: "/admin/pages/contact", icon: PhoneCall, pattern: "/admin/pages/contact" },
    ],
  },
  {
    title: "Pesan & Masukan",
    items: [
      { name: "Pesan Masuk", href: "/admin/inquiries", icon: Mail, pattern: "/admin/inquiries" },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      { name: "Pengaturan Website", href: "/admin/settings", icon: Sliders, pattern: "/admin/settings" },
    ],
  },
];

export default function AdminLayout({ children, title }) {
  const page = usePage();
  const url = page.url || "";
  const { flash, auth } = page.props || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const handleLogout = (e) => {
    e.preventDefault();
    router.post(typeof route === "function" ? route('logout') : '/logout');
  };

  return (
    <div className="min-h-screen bg-nexus-base text-white flex flex-col noise-overlay">
      {/* Top Bar on Mobile */}
      <header className="lg:hidden h-16 bg-nexus-surface border-b border-white/10 px-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/ATHERA%20FONT%20BESAR@300x.png"
            alt="Athera CMS"
            className="h-7 w-auto object-contain"
          />
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-nexus-muted hover:text-white"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-nexus-surface border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Logo */}
            <div className="h-20 px-6 border-b border-white/10 flex items-center justify-between shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/images/ATHERA%20FONT%20BESAR@300x.png"
                  alt="Athera CMS"
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-nexus-muted hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-5 flex-1">
              {NAV_SECTIONS.map((section) => (
                <div key={section.title} className="space-y-1">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-nexus-muted/60">
                    {section.title}
                  </div>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = url.startsWith(item.pattern);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors duration-200 ${
                          active
                            ? "bg-nexus-accent/15 text-nexus-accent border border-nexus-accent/30 shadow-sm font-semibold"
                            : "text-nexus-muted hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon size={16} className={active ? "text-nexus-accent" : "text-nexus-muted"} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom links & User profile */}
          <div className="p-4 border-t border-white/10 space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-nexus-muted hover:text-white hover:bg-white/5 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink size={15} className="text-nexus-accent" />
                Lihat Website Publik
              </span>
              <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-nexus-faint">Tab Baru</span>
            </Link>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-nexus-elevated border border-white/10 flex items-center justify-center text-xs font-bold text-nexus-accent shrink-0">
                  {auth?.user?.name ? auth.user.name.charAt(0) : "A"}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-white truncate">
                    {auth?.user?.name || "Admin"}
                  </div>
                  <div className="text-[10px] text-nexus-muted truncate">
                    {auth?.user?.email || "admin@atheranexus.id"}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Keluar"
                className="p-1.5 text-nexus-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-nexus-base/50 p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            {title && (
              <div className="mb-8">
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  {title}
                </h1>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>

      <Toaster position="bottom-right" theme="dark" richColors />
    </div>
  );
}
