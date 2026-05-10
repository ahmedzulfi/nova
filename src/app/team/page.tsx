import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import TeamHero from "@/components/sections/team-hero";
import TeamGrid from "@/components/sections/team-grid";
import TestimonialQuote from "@/components/sections/testimonial-quote";
import CTABanner from "@/components/sections/cta-banner";

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <TeamHero />
      <TeamGrid />
      <TestimonialQuote />
      <CTABanner />
      <Footer />
    </main>
  );
}
