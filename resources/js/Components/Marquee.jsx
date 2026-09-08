import FastMarquee from "react-fast-marquee";
import { usePage } from "@inertiajs/react";

const DEFAULT_TERMS = [
  "Strategi HR",
  "Akuisisi Talenta",
  "Pengembangan Kepemimpinan",
  "People Analytics",
  "Transformasi Budaya",
  "Kepercayaan",
];

export default function Marquee() {
  const { site_settings = {} } = usePage().props;

  let terms = DEFAULT_TERMS;
  if (site_settings?.home_marquee_text) {
    const parsed = site_settings.home_marquee_text
      .split(/[\n,]+/)
      .map((t) => t.trim())
      .filter(Boolean);
    if (parsed.length > 0) {
      terms = parsed;
    }
  }

  const speed = parseInt(site_settings?.home_marquee_speed, 10) || 28;

  return (
    <div data-testid="editorial-marquee" className="border-y border-white/5 bg-nexus-surface/50 py-8 overflow-hidden">
      <FastMarquee speed={speed} gradient={false} pauseOnHover>
        {terms.map((t, idx) => (
          <span key={t + idx} className="flex items-center">
            <span className="font-display font-bold uppercase tracking-[0.25em] text-2xl sm:text-4xl text-outline px-8 whitespace-nowrap">
              {t}
            </span>
            <span className="w-2 h-2 rounded-full bg-nexus-accent/60" />
          </span>
        ))}
      </FastMarquee>
    </div>
  );
}
