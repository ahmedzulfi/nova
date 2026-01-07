import Navbar from "@/components/sections/navbar";
import HeroBanner from "@/components/sections/hero-banner";
import EventsGrid from "@/components/sections/events-grid";
import CTACard from "@/components/sections/cta-card";
import Footer from "@/components/sections/footer";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroBanner />
      <EventsGrid />
      <CTACard />
      <Footer />
    </main>
  );
}
