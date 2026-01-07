import Navigation from "@/components/sections/navigation";
import AboutHero from "@/components/sections/about-hero";
import AboutVideoFeatures from "@/components/sections/about-video-features";
import EventHighlight from "@/components/sections/event-highlight";
import PartnersGrid from "@/components/sections/partners-grid";
import ReviewsSlider from "@/components/sections/reviews-slider";
import TeamCarousel from "@/components/sections/team-carousel";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <AboutHero />
      <AboutVideoFeatures />
      <EventHighlight />
      <PartnersGrid />
      <ReviewsSlider />
      <TeamCarousel />
      <CTABanner />
      <Footer />
    </main>
  );
}
