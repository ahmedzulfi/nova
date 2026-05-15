'use client';

import React from 'react';
import { Trophy, Medal, FileCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const AwardsSection = () => {
  const t = useTranslations('CompetitionsPage.awards');

  const awards = [
    {
      key: "cups",
      icon: <Trophy className="w-12 h-12 text-primary" />,
      color: "bg-primary/5"
    },
    {
      key: "medals",
      icon: <Medal className="w-12 h-12 text-accent" />,
      color: "bg-accent/5"
    },
    {
      key: "certificates",
      icon: <FileCheck className="w-12 h-12 text-black" />,
      color: "bg-black/5"
    }
  ];

  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="text-center mb-20 md:mb-32">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[12px] mb-6 block leading-none">
            {t('badge')}
          </span>
          <h2 className="text-[48px] md:text-[84px] font-display font-bold text-black tracking-tighter leading-[0.85]">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {awards.map((award, index) => (
            <div
              key={index}
              className={`p-14 rounded-[3.5rem] ${award.color} border border-transparent hover:border-black/5 transition-all duration-700 group flex flex-col items-center text-center hover: shadow-sm  hover:shadow-black/5 hover:-translate-y-2`}
            >
              <div className="mb-10 p-8 bg-white rounded-sm  shadow-sm  shadow-black/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                {award.icon}
              </div>
              <h3 className="text-[32px] font-display font-bold text-black mb-4 tracking-tighter">
                {t(`items.${award.key}.title`)}
              </h3>
              <span className="text-primary font-bold text-[20px] mb-8 block tracking-tight uppercase">
                {t(`items.${award.key}.count`)}
              </span>
              <p className="text-[17px] md:text-[19px] text-black/40 font-body font-medium leading-[1.6] max-w-[320px]">
                {t(`items.${award.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
