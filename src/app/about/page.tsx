import React from 'react';
import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import AboutHero from '@/components/sections/about/hero';
import AboutStory from '@/components/sections/about/story';
import AboutZones from '@/components/sections/about/zones';
import AboutSchedule from '@/components/sections/about/schedule';
import CTABanner from '@/components/sections/cta-banner';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <AboutHero />
      <AboutStory />
      <AboutZones />
      <AboutSchedule />
      <CTABanner />
      <Footer />
    </main>
  );
}
