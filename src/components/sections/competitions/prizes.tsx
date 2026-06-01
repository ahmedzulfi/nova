'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const AwardsSection = () => {
  const t = useTranslations('CompetitionsPage.awards');

  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="container mx-auto px-6 max-w-[1280px]">

        {/* Section Header */}
        <div className="text-center">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[12px] mb-6 block leading-none">
            {t('badge')}
          </span>
          <h2 className="text-[48px] md:text-[84px] font-display font-bold text-black tracking-tighter leading-[0.85]">
            {t('title')}
          </h2>
          <p className="mt-8 text-[18px] md:text-[20px] text-black/40 font-medium max-w-[600px] mx-auto leading-relaxed">
            {t('desc')}
          </p>
        </div>

      </div>
    </section>
  );
};

export default AwardsSection;
