'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

const HeroBanner: React.FC = () => {
  const t = useTranslations('EventsPage.hero');

  return (
    <section className="relative overflow-hidden pt-[180px] pb-[100px] md:pt-[220px] md:pb-[140px] bg-white">
      {/* Premium Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto">
        <div className="flex flex-col items-center justify-center text-center max-w-[1000px] mx-auto">
          {/* Badge */}
          <span className="inline-block bg-[#F5F5F0] text-black text-[12px] font-bold px-6 py-2 rounded-full uppercase tracking-[0.3em] mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm border border-black/5">
            2026 Season Lineup
          </span>

          {/* Headline */}
          <h1 className="mb-8 text-[48px] md:text-[94px] font-bold font-display leading-[0.9] tracking-tighter text-black whitespace-pre-line animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            {t('title')}
          </h1>

          {/* Descriptive Paragraph */}
          <p className="mb-12 text-[18px] md:text-[22px] leading-[1.6] text-black/40 max-w-[720px] font-medium font-body animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            {t('desc')}
          </p>

          {/* CTA Button */}
          <Link
            href="/registration"
            className="group flex items-center justify-center px-12 py-6 bg-black hover:bg-black/90  rounded-sm  transition-all duration-300 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300  shadow-sm  hover:scale-105 active:scale-95"
          >
            <span className="text-[18px] font-bold text-white mr-4 rtl:mr-0 rtl:ml-4">
              Register Your Pet
            </span>
            <ArrowRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;