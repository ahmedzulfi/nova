import React from 'react';
import { useTranslations } from 'next-intl';
import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import CompetitionsHero from '@/components/sections/competitions/hero';
import CompetitionsList from '@/components/sections/competitions/list';
import AwardsSection from '@/components/sections/competitions/prizes';
import CTABanner from '@/components/sections/cta-banner';

export default function CompetitionsPage() {
  const t = useTranslations('CompetitionsPage.cta');

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <CompetitionsHero />
      <CompetitionsList />
      <AwardsSection />
      
      <CTABanner 
        title={t('title')}
        subtitle={t('subtitle')}
        primaryBtnText={t('primary')}
        primaryBtnHref="/registration"
      />

      <Footer />
    </main>
  );
}
