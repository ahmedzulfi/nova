'use client';

import React from 'react';
import { Dog, Cat, Tent, Utensils, HeartPulse, Flag } from 'lucide-react';
import { useTranslations } from 'next-intl';

const HighlightsGrid = () => {
  const t = useTranslations('GalleryPage.highlights');

  const highlights = [
    { key: "dog", icon: <Dog className="w-6 h-6" />, emoji: "🐕", bg: "bg-[#F5F5F0]" },
    { key: "cat", icon: <Cat className="w-6 h-6" />, emoji: "🐱", bg: "bg-[#EDEDE8]" },
    { key: "carnival", icon: <Tent className="w-6 h-6" />, emoji: "🎪", bg: "bg-white" },
    { key: "food", icon: <Utensils className="w-6 h-6" />, emoji: "🍔", bg: "bg-[#F5F5F0]" },
    { key: "vet", icon: <HeartPulse className="w-6 h-6" />, emoji: "🏥", bg: "bg-[#EDEDE8]" },
    { key: "landmarks", icon: <Flag className="w-6 h-6" />, emoji: "🎈", bg: "bg-white" }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F5F5F0]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-[12px] mb-6 block leading-none">
            {t('badge')}
          </span>
          <h2 className="text-[48px] md:text-[84px] font-display font-bold text-black tracking-tighter leading-[0.85] mb-10">
            {t('title')}
          </h2>
          <div className="w-24 h-1.5 bg-black mx-auto rounded-full shadow-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 shadow-2xl shadow-black/5">
          {highlights.map((item, index) => (
            <div 
              key={index} 
              className={`p-12 md:p-16 flex flex-col items-start transition-all duration-700 hover:z-10 hover:shadow-2xl hover:scale-[1.02] border border-black/5 ${item.bg} group`}
            >
              <div className="text-[48px] mb-10 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110">
                {item.emoji}
              </div>
              <h3 className="text-[28px] md:text-[32px] font-display font-bold mb-6 tracking-tighter leading-none flex items-center gap-4 rtl:flex-row-reverse rtl:justify-end">
                <span className="w-2 h-8 bg-primary rounded-full hidden group-hover:block transition-all" />
                {t(`list.${item.key}.title`)}
              </h3>
              <p className="text-[17px] md:text-[19px] text-black/40 leading-[1.6] font-body font-medium transition-colors group-hover:text-black/60 rtl:text-right">
                {t(`list.${item.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsGrid;
