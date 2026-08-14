import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Hours from "@/components/Hours";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import { readStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function Home() {
  const store = readStore();

  return (
    <div className="pb-16 md:pb-0 min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Menu categories={store.menu.categories} />
      <Gallery photos={store.gallery} />
      <Hours schedule={store.hours.schedule} />
      <Footer />
      <StickyMobileBar />
    </div>
  );
}
