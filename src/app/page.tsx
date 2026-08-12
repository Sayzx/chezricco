import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Hours from "@/components/Hours";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";

export default function Home() {
  return (
    <div className="pb-16 md:pb-0 min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Menu />
      <Gallery />
      <Hours />
      <Footer />
      <StickyMobileBar />
    </div>
  );
}
