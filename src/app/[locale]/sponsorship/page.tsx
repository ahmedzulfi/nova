'use client';

import React from 'react';
import Image from 'next/image';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import SponsorRegistrationForm from "@/components/sections/sponsor-registration-form";
import { useTranslations } from 'next-intl';

import sponsor1 from '@/media/Untitled-10.png';
import sponsor2 from '@/media/Untitled-102.png';

const sponsors = {
  platinum: [
    { name: "Sponsor 1", logo: sponsor1, width: 400 },
    { name: "Sponsor 2", logo: sponsor2, width: 400 },
  ],
  gold: [],
  silver: []
};

const SponsorTier = ({ title, sponsors, cardHeight, gridCols, t }: { title: string, sponsors: any[], cardHeight: string, gridCols: string, t: any }) => (
  <div className="mb-20">
    <div className="flex items-center gap-4 mb-10">
      <div className="h-px bg-primary flex-grow opacity-20"></div>
      <h3 className="text-[20px] font-bold text-black/30 uppercase tracking-[0.2em] font-display whitespace-nowrap">
        {title} {t('tiers.suffix')}
      </h3>
      <div className="h-px bg-primary flex-grow opacity-20"></div>
    </div>
    <div className={`grid ${gridCols} gap-6 md:gap-8`}>
      {sponsors.map((sponsor, idx) => (
        <div
          key={idx}
          className={`relative flex items-center justify-center w-full p-4 md:p-8 bg-[#F5F5F0]  rounded-sm  border border-black/5 hover:border-primary/20 transition-all duration-700 group ${cardHeight}`}
        >
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={sponsor.width}
            height={160}
            className="object-contain w-[85%] h-[85%] transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  </div>
);

export default function SponsorshipPage() {
  const t = useTranslations('SponsorshipPage');

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="text-center mb-16 lg:mb-32">
            <span className="inline-block bg-[#F5F5F0] text-black text-[12px] font-bold px-6 py-2 rounded-full uppercase tracking-[0.3em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm border border-black/5">
              {t('badge')}
            </span>
            <h1 className="text-[48px] md:text-[84px] font-bold font-display leading-[0.9] text-black mb-10 tracking-tighter whitespace-pre-line animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              {t('title')}
            </h1>
            <p className="text-[18px] md:text-[22px] text-black/40 leading-[1.6] max-w-[800px] mx-auto font-medium font-body animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
              {t('desc')}
            </p>
          </div>

          <div className="max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            {sponsors.platinum.length > 0 && (
              <SponsorTier title={t('tiers.platinum')} sponsors={sponsors.platinum} cardHeight="h-[220px] md:h-[320px]" gridCols="grid-cols-1 md:grid-cols-2" t={t} />
            )}
            {sponsors.gold.length > 0 && (
              <SponsorTier title={t('tiers.gold')} sponsors={sponsors.gold} cardHeight="h-[180px] md:h-[240px]" gridCols="grid-cols-1 md:grid-cols-3" t={t} />
            )}
            {sponsors.silver.length > 0 && (
              <SponsorTier title={t('tiers.silver')} sponsors={sponsors.silver} cardHeight="h-[140px] md:h-[180px]" gridCols="grid-cols-2 lg:grid-cols-4" t={t} />
            )}
          </div>

          <div className="mt-32 max-w-[800px] mx-auto animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <SponsorRegistrationForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
