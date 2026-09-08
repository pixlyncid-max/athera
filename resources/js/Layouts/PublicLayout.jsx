import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollContext } from "@/Context/ScrollContext";
import { Toaster } from "@/Components/ui/sonner";
import Nav from "@/Components/Nav";
import Footer from "@/Components/Footer";
import { usePage } from "@inertiajs/react";

export default function PublicLayout({ children }) {
  const lenisRef = useRef(null);
  const { url } = usePage();
  const props = usePage().props;
  const auth = props?.auth;

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [url]);

  const scrollTo = (target) => {
    if (typeof target === "string" && target.startsWith("#")) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -72 });
      } else {
        const el = document.querySelector(target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <ScrollContext.Provider value={scrollTo}>
      <div className="min-h-screen bg-nexus-base text-white noise-overlay relative selection:bg-nexus-accent/30 selection:text-white flex flex-col justify-between">
        <Nav auth={auth} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" theme="dark" richColors />
      </div>
    </ScrollContext.Provider>
  );
}
