import React from 'react';
import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import CompetitionsHero from '@/components/sections/competitions/hero';
import CompetitionsList from '@/components/sections/competitions/list';
import AwardsSection from '@/components/sections/competitions/prizes';
import CTABanner from '@/components/sections/cta-banner';

export default function CompetitionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <CompetitionsHero />
      <CompetitionsList />
      <AwardsSection />
      
      <CTABanner 
        title="Ready to Take the Spotlight?"
        subtitle="Register your pet for one of our international competitions and compete for championship titles, cups, and medals."
        primaryBtnText="Register Now"
        primaryBtnHref="/registration"
      />

      <Footer />
    </main>
  );
}
