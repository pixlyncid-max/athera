import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import Hero from "@/Components/Hero";
import Marquee from "@/Components/Marquee";
import About from "@/Components/About";
import Services from "@/Components/Services";
import Trust from "@/Components/Trust";
import Contact from "@/Components/Contact";

export default function Welcome() {
  return (
    <PublicLayout>
      <Head>
        <title>Athera Nexus — Human Capital Consulting | PT Adiwangsa Humanika Solusi</title>
        <meta
          name="description"
          content="Athera Nexus adalah praktik konsultasi human capital dari PT Adiwangsa Humanika Solusi. Solusi menyeluruh untuk siklus talenta dan transformasi organisasi."
        />
      </Head>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Trust />
      <Contact />
    </PublicLayout>
  );
}

