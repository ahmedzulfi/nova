import Navbar from "@/components/sections/navbar";
import InnerBanner from "@/components/sections/inner-banner";
import DetailsContent from "@/components/sections/details-content";
import MoreInformation from "@/components/sections/more-information";
import GallerySection from "@/components/sections/gallery";
import Testimonials from "@/components/sections/testimonials";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";

export default function UrbanNightEventPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-[89px]"> {/* Offset for fixed navbar */}
        <InnerBanner />
        <MoreInformation />
        <GallerySection />
        <Testimonials />
        <CTABanner />
      </div>
      <Footer />
    </main>
  );
}
