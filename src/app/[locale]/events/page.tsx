import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import HeroBanner from "@/components/sections/hero-banner";
import EventsGrid from "@/components/sections/events-grid";
import CTABanner from "@/components/sections/cta-banner";
import { useTranslations } from 'next-intl';

export default function EventsPage() {
  const t = useTranslations('CTABanner');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroBanner />
      <EventsGrid />
      <CTABanner 
        title={t('title')}
        subtitle={t('subtitle')}
        primaryBtnText={t('primaryBtnText')}
        primaryBtnHref="/registration"
      />
      <Footer />
    </main>
  );
}
