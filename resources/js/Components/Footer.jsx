import { Link, usePage } from "@inertiajs/react";

const FOOTER_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/layanan", label: "Layanan" },
  { href: "/kepercayaan", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.03C9.33 7.03 9 7.11 8.71 7.42C8.42 7.73 7.6 8.5 7.6 10.05C7.6 11.6 8.73 13.09 8.89 13.3C9.05 13.51 11.11 16.69 14.26 18.05C15.01 18.37 15.59 18.57 16.05 18.71C16.8 18.95 17.48 18.92 18.02 18.84C18.63 18.75 19.9 18.07 20.16 17.33C20.42 16.6 20.42 15.97 20.34 15.84C20.26 15.71 20.06 15.63 19.75 15.48C19.45 15.32 17.96 14.59 17.68 14.49C17.41 14.39 17.21 14.34 17.01 14.65C16.81 14.95 16.23 15.63 16.05 15.84C15.88 16.04 15.7 16.07 15.4 15.92C15.09 15.76 14.12 15.44 12.96 14.41C12.06 13.61 11.45 12.62 11.27 12.31C11.1 12.01 11.25 11.84 11.41 11.69C11.55 11.55 11.72 11.32 11.87 11.14C12.03 10.97 12.08 10.84 12.18 10.63C12.28 10.43 12.23 10.25 12.16 10.1C12.08 9.95 11.5 8.53 11.27 7.96C11.04 7.41 10.81 7.49 10.64 7.48C10.48 7.47 10.28 7.47 10.08 7.47C9.88 7.47 9.55 7.55 9.53 7.03Z" />
  </svg>
);

export default function Footer() {
  const { site_settings = {} } = usePage().props;

  const siteName = site_settings?.site_name || "Athera Nexus";
  const legalName = site_settings?.company_legal_name || "PT Adiwangsa Humanika Solusi";
  const igUrl = site_settings?.social_instagram || "https://instagram.com";
  const fbUrl = site_settings?.social_facebook || "https://facebook.com";
  const waUrl = site_settings?.contact_whatsapp
    ? `https://wa.me/${site_settings.contact_whatsapp.replace(/[^0-9]/g, "")}`
    : "https://wa.me/6281198765432";

  const SOCIAL_LINKS = [
    { name: "Instagram", href: igUrl, icon: InstagramIcon },
    { name: "Facebook", href: fbUrl, icon: FacebookIcon },
    { name: "WhatsApp", href: waUrl, icon: WhatsAppIcon },
  ];

  return (
    <footer data-testid="site-footer" className="border-t border-white/5 py-14 bg-nexus-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <Link
            href="/"
            data-testid="footer-logo"
            className="inline-flex items-center gap-2 mb-3 cursor-pointer"
          >
            <img
              src="/images/ATHERA%20FONT%20BESAR@300x.png"
              alt={siteName}
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>
          <p className="text-nexus-muted text-xs">
            by {legalName} — Konsultan Human Capital
          </p>
        </div>

        <nav className="flex flex-wrap gap-8">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-xs text-nexus-muted hover:text-nexus-accent transition-colors duration-300 tracking-wide cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  data-testid={`footer-social-${item.name.toLowerCase()}`}
                  className="w-9 h-9 rounded-full bg-nexus-surface border border-white/10 flex items-center justify-center text-nexus-muted hover:text-nexus-accent hover:border-nexus-accent/50 hover:scale-105 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
          <p className="text-nexus-muted text-xs">© 2026 {legalName}</p>
        </div>
      </div>
    </footer>
  );
}


