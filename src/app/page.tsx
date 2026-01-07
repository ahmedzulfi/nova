import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero";
import PartnersSection from "@/components/sections/partners";
import AboutUsGrid from "@/components/sections/about-us-grid";
import Advantages from "@/components/sections/advantages";
import FAQAccordion from "@/components/sections/faq-accordion";
import Testimonials from "@/components/sections/testimonials";
import EventCardSection from "@/components/sections/event-card";
import ProfilesSection from "@/components/sections/profiles";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <PartnersSection />
      <AboutUsGrid />
      <Advantages />
      <FAQAccordion />
      <Testimonials />
      <EventCardSection />
      <ProfilesSection />
      <CTABanner />
      <Footer />
    </main>
  );
}
