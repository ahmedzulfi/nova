'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const TeamHero = () => {
  const t = useTranslations('TeamPage');

  return (
    <section className="relative overflow-hidden bg-white pt-[140px] pb-[70px] md:pt-[180px] md:pb-[100px]">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-[1000px] mx-auto">
          <span className="inline-block bg-[#F5F5F0] text-black text-[12px] font-bold px-6 py-2 rounded-full uppercase tracking-[0.3em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm border border-black/5">
            Experts & Organizers
          </span>
          <h1 
            className="font-bold text-black tracking-tighter mb-8 font-display whitespace-pre-line animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100"
            style={{
              fontSize: 'clamp(44px, 8vw, 84px)',
              lineHeight: '0.9',
            }}
          >
            {t('hero.title')}
          </h1>
          
          <p 
            className="text-black/40 font-medium font-body animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200 rtl:text-right"
            style={{
              fontSize: '20px',
              lineHeight: '1.6',
              maxWidth: '720px',
            }}
          >
            {t('hero.desc')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamHero;