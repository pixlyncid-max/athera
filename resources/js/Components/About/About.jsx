import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { usePage } from "@inertiajs/react";

const Chapter = ({ chapter, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      data-testid={`about-chapter-${chapter.num}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className="border-t border-white/10 pt-8 grid grid-cols-[auto_1fr] gap-6 sm:gap-10"
    >
      <span className="font-display font-light text-4xl sm:text-5xl text-nexus-accent/60 leading-none">
        {chapter.num}
      </span>
      <div>
        <h3 className="font-display font-bold text-2xl sm:text-3xl mb-4 text-white">{chapter.title}</h3>
        <p className="text-nexus-muted leading-relaxed text-base md:text-lg">{chapter.body}</p>
      </div>
    </motion.div>
  );
};

export default function About() {
  const { site_settings = {} } = usePage().props;
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const title = site_settings?.home_about_title || "Manusia adalah\npusat strategi.";

  const chapters = [
    {
      num: site_settings?.home_ch1_num || "01",
      title: site_settings?.home_ch1_title || "Siapa Kami",
      body:
        site_settings?.home_ch1_body ||
        "Athera Nexus adalah praktik konsultasi human capital dari PT Adiwangsa Humanika Solusi. Kami mendampingi perusahaan merancang organisasi yang sehat — dari struktur, sistem, hingga budaya kerja.",
    },
    {
      num: site_settings?.home_ch2_num || "02",
      title: site_settings?.home_ch2_title || "Pendekatan Kami",
      body:
        site_settings?.home_ch2_body ||
        "Setiap rekomendasi lahir dari data dan dialog. Kami memadukan people analytics dengan pemahaman mendalam atas konteks bisnis, sehingga solusi yang kami bangun relevan dan dapat dieksekusi.",
    },
    {
      num: site_settings?.home_ch3_num || "03",
      title: site_settings?.home_ch3_title || "Komitmen Kami",
      body:
        site_settings?.home_ch3_body ||
        "Kerahasiaan, integritas, dan dampak yang terukur. Kami menjaga kepercayaan klien sebagaimana kami membantu mereka membangun kepercayaan di dalam organisasinya sendiri.",
    },
  ];

  return (
    <section id="tentang" data-testid="about-section" className="relative py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="lg:sticky lg:top-32">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] tracking-tight mb-10 text-white whitespace-pre-line">
            {title}
          </h2>
          <div ref={imgRef} className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <motion.img
              style={{ y: imgY }}
              src="https://images.pexels.com/photos/9566361/pexels-photo-9566361.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Kolaborasi tim profesional Athera Nexus"
              className="w-full h-[320px] sm:h-[420px] object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nexus-base/80 via-transparent to-transparent" />
          </div>
        </div>
        <div className="flex flex-col gap-12 lg:pt-24">
          {chapters.map((c, i) => (
            <Chapter key={c.num + i} chapter={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
