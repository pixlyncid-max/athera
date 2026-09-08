import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Pemulihan Kata Sandi — Athera Nexus" />

            <div className="mb-6">
                <h1 className="font-display font-bold text-2xl text-white tracking-tight mb-2">
                    Pemulihan Kata Sandi
                </h1>
                <p className="text-xs sm:text-sm text-nexus-muted leading-relaxed">
                    Masukkan email terdaftar Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
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
                            autoFocus
                            placeholder="nama@atheranexus.id"
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-nexus-base/90 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-nexus-faint focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all duration-200"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5 text-xs text-red-400" />
                </div>

                <div className="pt-2 flex flex-col gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex items-center justify-center gap-2 bg-nexus-accent text-nexus-base font-semibold py-3 px-6 rounded-xl hover:bg-nexus-accentHover hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 transition-[background-color,transform,opacity] duration-200 shadow-lg cursor-pointer text-sm"
                    >
                        {processing ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                <span>Mengirimkan Tautan...</span>
                            </>
                        ) : (
                            <>
                                <span>Kirim Tautan Reset Password</span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>

                    <Link
                        href={route('login')}
                        className="inline-flex items-center justify-center gap-2 text-xs text-nexus-muted hover:text-white transition-colors py-2"
                    >
                        <ArrowLeft size={14} />
                        <span>Kembali ke Halaman Masuk</span>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
