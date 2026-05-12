import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero";
import AboutUsGrid from "@/components/sections/about-us-grid";
import Competitions from "@/components/sections/competitions";
import Tickets from "@/components/sections/tickets";
import Venue from "@/components/sections/venue";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutUsGrid />
      <Competitions />
      <Tickets />
      <Venue />
      <CTABanner />
      <Footer />
    </main>
  );
}
