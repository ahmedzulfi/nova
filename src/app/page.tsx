import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero";
import HighlightsStrip from "@/components/sections/highlights-strip";
import AboutUsGrid from "@/components/sections/about-us-grid";
import ZoneSplit from "@/components/sections/zone-split";
import ProgramPreview from "@/components/sections/program-preview";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <HighlightsStrip />
      <AboutUsGrid />
      <ZoneSplit />
      <ProgramPreview />
      <CTABanner />
      <Footer />
    </main>
  );
}
