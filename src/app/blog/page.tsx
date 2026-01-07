import Navigation from "@/components/sections/navigation";
import BlogHero from "@/components/sections/blog-hero";
import BlogGrid from "@/components/sections/blog-grid";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <BlogHero />
      <BlogGrid />
      <CTABanner />
      <Footer />
    </main>
  );
}
