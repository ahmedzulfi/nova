import Navigation from "@/components/sections/navigation";
import AboutHero from "@/components/sections/about-hero";
import AboutVideoFeatures from "@/components/sections/about-video-features";
import PartnersGrid from "@/components/sections/partners-grid";
import ZoneSplit from "@/components/sections/zone-split";
import TeamCarousel from "@/components/sections/team-carousel";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <AboutHero />
      <AboutVideoFeatures />
      <ZoneSplit />
      <PartnersGrid />
      <TeamCarousel />
      <CTABanner />
      <Footer />
    </main>
  );
}
