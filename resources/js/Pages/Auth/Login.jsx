import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk — Portal Manajemen Athera Nexus" />

            {/* Form Header */}
            <div className="mb-8 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexus-accent/10 border border-nexus-accent/20 text-nexus-accent text-[11px] font-semibold uppercase tracking-wider mb-4">
                    <KeyRound size={12} />
                    <span>Portal Administrator & CMS</span>
                </div>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    Selamat Datang Kembali
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-nexus-muted leading-relaxed">
                    Masukkan kredensial Anda untuk mengakses panel kontrol dan mengelola seluruh konten website.
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-xs uppercase tracking-wider font-semibold text-nexus-muted mb-2"
                    >
                        Alamat Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-nexus-muted">
                            <Mail size={16} />
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            required
                            autoComplete="username"
                            autoFocus
                            placeholder="admin@atheranexus.id"
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-nexus-base/90 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-nexus-faint focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all duration-200"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5 text-xs text-red-400" />
                </div>

                {/* Password Field */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label
                            htmlFor="password"
                            className="block text-xs uppercase tracking-wider font-semibold text-nexus-muted"
                        >
                            Kata Sandi
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-nexus-muted hover:text-nexus-accent transition-colors"
                            >
                                Lupa kata sandi?
                            </Link>
                        )}
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-nexus-muted">
                            <Lock size={16} />
                        </div>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            required
                            autoComplete="current-password"
                            placeholder="••••••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-nexus-base/90 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder:text-nexus-faint focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-nexus-muted hover:text-white transition-colors cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1.5 text-xs text-red-400" />
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="w-4 h-4 rounded bg-nexus-base border-white/20 text-nexus-accent focus:ring-nexus-accent focus:ring-offset-nexus-base cursor-pointer"
                        />
                        <span className="text-xs text-nexus-muted hover:text-gray-300 transition-colors">
                            Ingat sesi saya
                        </span>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-nexus-accent text-nexus-base font-semibold py-3.5 px-6 rounded-xl hover:bg-nexus-accentHover hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-[background-color,transform,opacity] duration-200 shadow-lg cursor-pointer text-sm"
                >
                    {processing ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Memverifikasi Akses...</span>
                        </>
                    ) : (
                        <>
                            <span>Masuk ke Panel Kontrol</span>
                            <ArrowRight size={16} />
                        </>
                    )}
                </button>
            </form>
        </GuestLayout>
    );
}
