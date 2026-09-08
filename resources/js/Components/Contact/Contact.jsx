import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Mail, MapPin, Phone, ArrowUpRight, Loader2 } from "lucide-react";

const SERVICES_OPTIONS = [
  "Konsultasi Strategi HR",
  "Akuisisi & Seleksi Talenta",
  "Pengembangan Kepemimpinan",
  "People Analytics",
  "Transformasi Budaya",
  "HR Outsourcing",
  "Lainnya",
];

const inputCls =
  "w-full bg-nexus-base border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-nexus-faint focus:outline-none focus:border-nexus-accent transition-[border-color] duration-300";

import { usePage } from "@inertiajs/react";

export default function Contact() {
  const { site_settings = {} } = usePage().props;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  const title = site_settings?.home_contact_title || "Mari mulai\npercakapan.";
  const desc =
    site_settings?.home_contact_desc ||
    "Ceritakan tantangan human capital Anda. Konsultan kami akan merespons dengan gambaran awal pendekatan yang paling relevan.";
  const email = site_settings?.contact_email_general || "halo@atheranexus.id";
  const phone = site_settings?.contact_phone || "+62 21 5000 1234";
  const address =
    site_settings?.contact_address ||
    "Menara Sudirman Lt. 21, Jl. Jend. Sudirman Kav. 60,\nJakarta Selatan 12190";

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/contact`, {
        name: form.name,
        email: form.email,
        company: form.company || null,
        service: form.service || null,
        message: form.message,
      });
      toast.success("Pesan terkirim. Tim kami akan menghubungi Anda dalam 1x24 jam.");
      setForm({ name: "", email: "", company: "", service: "", message: "" });
    } catch (err) {
      const errMsg = err?.response?.data?.message || "Pesan gagal terkirim. Silakan periksa kembali input Anda atau coba sesaat lagi.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontak" data-testid="contact-section" className="relative py-28 lg:py-40 bg-nexus-surface/40 border-t border-white/5">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] tracking-tight mb-8 text-white whitespace-pre-line">
            {title}
          </h2>
          <p className="text-nexus-muted leading-relaxed text-base md:text-lg max-w-md mb-12">
            {desc}
          </p>
          <div className="flex flex-col gap-6">
            <div data-testid="contact-info-email" className="flex items-center gap-4 text-nexus-muted">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                <Mail size={18} className="text-nexus-accent" strokeWidth={1.5} />
              </div>
              <span className="text-sm text-gray-300">{email}</span>
            </div>
            <div data-testid="contact-info-phone" className="flex items-center gap-4 text-nexus-muted">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                <Phone size={18} className="text-nexus-accent" strokeWidth={1.5} />
              </div>
              <span className="text-sm text-gray-300">{phone}</span>
            </div>
            <div data-testid="contact-info-address" className="flex items-start gap-4 text-nexus-muted">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shrink-0 mt-0.5">
                <MapPin size={18} className="text-nexus-accent" strokeWidth={1.5} />
              </div>
              <span className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">
                {address}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.form
          data-testid="contact-form"
          onSubmit={submit}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="bg-nexus-elevated/60 border border-white/10 rounded-xl p-8 lg:p-10 flex flex-col gap-5 shadow-2xl backdrop-blur-sm"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-name" className="block text-xs tracking-[0.15em] uppercase text-nexus-muted mb-2">Nama Lengkap</label>
              <input id="contact-name" data-testid="contact-name-input" required minLength={2} value={form.name} onChange={set("name")} placeholder="Nama Anda" className={inputCls} />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs tracking-[0.15em] uppercase text-nexus-muted mb-2">Email</label>
              <input id="contact-email" data-testid="contact-email-input" type="email" required value={form.email} onChange={set("email")} placeholder="nama@perusahaan.co.id" className={inputCls} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-company" className="block text-xs tracking-[0.15em] uppercase text-nexus-muted mb-2">Perusahaan</label>
              <input id="contact-company" data-testid="contact-company-input" value={form.company} onChange={set("company")} placeholder="PT Contoh Indonesia" className={inputCls} />
            </div>
            <div>
              <label htmlFor="contact-service" className="block text-xs tracking-[0.15em] uppercase text-nexus-muted mb-2">Kebutuhan</label>
              <select id="contact-service" data-testid="contact-service-select" value={form.service} onChange={set("service")} className={`${inputCls} appearance-none`}>
                <option value="" className="bg-nexus-base">Pilih layanan</option>
                {SERVICES_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-nexus-base">{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-xs tracking-[0.15em] uppercase text-nexus-muted mb-2">Pesan</label>
            <textarea id="contact-message" data-testid="contact-message-input" required minLength={10} rows={5} value={form.message} onChange={set("message")} placeholder="Ceritakan singkat kebutuhan atau tantangan HR Anda..." className={`${inputCls} resize-none`} />
          </div>
          <button
            data-testid="contact-submit-button"
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-nexus-accent text-nexus-base font-medium px-7 py-3.5 rounded-full hover:bg-nexus-accentHover hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 transition-[background-color,transform,opacity] duration-300 shadow-md cursor-pointer"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowUpRight size={18} />}
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
