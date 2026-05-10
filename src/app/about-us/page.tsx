import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import AboutHero from "@/components/sections/about-hero";
import AboutVideoFeatures from "@/components/sections/about-video-features";
import WelfareSafety from "@/components/sections/welfare-safety";
import CompetitionList from "@/components/sections/competition-list";
import ZoneSplit from "@/components/sections/zone-split";
import CTABanner from "@/components/sections/cta-banner";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <AboutHero />
      <AboutVideoFeatures />
      <WelfareSafety />
      <ZoneSplit />
      <CompetitionList />
      <CTABanner />
      <Footer />
    </main>
  );
}
