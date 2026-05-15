'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const CompetitionsHero = () => {
  const t = useTranslations('CompetitionsPage.hero');

  return (
    <section className="relative w-full pt-[140px] pb-[80px] md:pt-[180px] md:pb-[120px] bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center px-6 py-2 rounded-full bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500  shadow-sm  shadow-black/10">
            {t('badge')}
          </span>
          <h1 className="text-[44px] md:text-[84px] font-display font-bold text-black leading-[0.95] tracking-tighter mb-10 max-w-[1100px] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            {t('title')}
          </h1>
          <p className="text-[18px] md:text-[24px] leading-[1.5] text-black/40 max-w-[860px] font-body font-medium animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            {t.rich('desc', {
              wku: (chunks) => <span className="text-primary font-bold">{chunks}</span>,
              wcf: (chunks) => <span className="text-primary font-bold">{chunks}</span>
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompetitionsHero;
