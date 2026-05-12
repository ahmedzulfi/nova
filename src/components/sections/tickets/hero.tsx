'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const TicketsHero = () => {
  const t = useTranslations('TicketsPage');

  return (
    <section className="relative w-full pt-[140px] pb-[40px] md:pt-[180px] md:pb-[60px] bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        <div className="text-center">
          <span className="inline-flex items-center px-5 py-2 rounded-sm bg-[#F5F5F0] text-black text-[11px] font-bold uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {t('hero_badge')}
          </span>
          <h1 className="text-[44px] md:text-[84px] font-bold font-display leading-[0.95] text-black mb-10 tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 whitespace-pre-line">
            {t('hero_title')}
          </h1>
          <p className="text-[18px] md:text-[20px] text-black/50 leading-[1.6] max-w-[640px] mx-auto font-medium font-body animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            {t('hero_desc')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TicketsHero;
