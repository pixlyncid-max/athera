import { Link } from '@inertiajs/react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-nexus-base text-white relative flex flex-col justify-between overflow-hidden noise-overlay">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nexus-base via-nexus-base/80 to-nexus-base/60" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nexus-accent/10 via-transparent to-transparent" />
            </div>

            {/* Top Navigation */}
            <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <ApplicationLogo />
                </Link>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-medium text-nexus-muted hover:text-nexus-accent transition-colors duration-200 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm"
                >
                    <ArrowLeft size={14} />
                    <span>Kembali ke Beranda</span>
                </Link>
            </header>

            {/* Main Auth Container */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-md">
                    <div className="relative bg-nexus-surface/90 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-nexus-accent/60 to-transparent glow-accent" />
                        {children}
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-nexus-muted/60 text-center">
                        <ShieldCheck size={14} className="text-nexus-accent/70" />
                        <span>Sistem Keamanan Terenkripsi & Akses Internal Terproteksi</span>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 text-center text-xs text-nexus-muted/50 border-t border-white/5">
                © 2026 PT Adiwangsa Humanika Solusi. Hak Cipta Dilindungi.
            </footer>
        </div>
    );
}
