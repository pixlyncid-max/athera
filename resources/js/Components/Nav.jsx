import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

const LINKS = [
  { href: "/", label: "Beranda", id: "home" },
  { href: "/layanan", label: "Layanan", id: "layanan" },
  { href: "/kepercayaan", label: "Tentang Kami", id: "tentang-kami" },
  { href: "/kontak", label: "Kontak", id: "kontak" },
];

export default function Nav({ auth }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { url } = usePage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => {
    if (href === "/") {
      return url === "/" || url === "";
    }
    return url.startsWith(href);
  };

  return (
    <header
      data-testid="main-nav"
      className={`fixed top-0 inset-x-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
        scrolled
          ? "bg-nexus-base/85 backdrop-blur-xl border-white/5"
          : "bg-nexus-base/60 backdrop-blur-md border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          data-testid="nav-logo"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <img
            src="/images/ATHERA%20FONT%20BESAR@300x.png"
            alt="Athera Nexus"
            className="h-8 md:h-9 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.id}
                href={l.href}
                data-testid={`nav-link-${l.id}`}
                className={`text-sm tracking-wide transition-colors duration-300 relative py-1 ${
                  active
                    ? "text-nexus-accent font-medium"
                    : "text-nexus-muted hover:text-white"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-nexus-accent rounded-full glow-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          {auth?.user && (
            <Link
              href={typeof route === "function" ? route('dashboard') : '/dashboard'}
              className="text-sm text-nexus-accent hover:underline tracking-wide"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/kontak"
            data-testid="nav-cta-button"
            className="hidden md:inline-flex items-center gap-2 bg-nexus-accent text-nexus-base text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-nexus-accentHover hover:scale-[1.02] active:scale-[0.98] transition-[background-color,transform] duration-300 cursor-pointer shadow-md"
          >
            Mulai Konsultasi
            <ArrowUpRight size={16} />
          </Link>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 cursor-pointer"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="nav-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
            className="md:hidden overflow-hidden bg-nexus-surface/95 backdrop-blur-2xl border-b border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.id}
                    href={l.href}
                    data-testid={`nav-mobile-link-${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`text-left text-lg transition-colors duration-300 ${
                      active ? "text-nexus-accent font-semibold" : "text-nexus-muted hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              {auth?.user && (
                <Link
                  href={typeof route === "function" ? route('dashboard') : '/dashboard'}
                  onClick={() => setOpen(false)}
                  className="text-left text-lg text-nexus-accent hover:underline"
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/kontak"
                data-testid="nav-mobile-cta"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-nexus-accent text-nexus-base font-medium px-5 py-3 rounded-full cursor-pointer"
              >
                Mulai Konsultasi
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

