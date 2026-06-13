'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const AboutUsGrid = () => {
  const t = useTranslations('AboutGrid');

  return (
    <section className="py-24 md:py-32 bg-[#FFF2E5]" id="about-us">
      <div className="container mx-auto px-6 max-w-[1280px]">
        {/* Top Bento Block: Combined Full-width Yellow Main Block */}
        <div className="w-full bg-[#FBC84F] rounded-[33px] p-8 md:p-12 min-h-[400px] md:min-h-[500px] shadow-sm relative overflow-hidden group mb-6 flex flex-col lg:flex-row items-stretch justify-between gap-8">
          {/* Left Content Column */}
          <div className="flex flex-col items-start justify-between h-auto py-2 space-y-8 lg:max-w-[50%] z-10 relative">
            <div className="space-y-6">
              <span className="inline-flex items-center px-5 py-2 rounded-sm bg-[#465067] text-white text-[11px] font-bold uppercase tracking-[0.2em]">
                {t('badge')}
              </span>
              <h2 className="text-[32px] sm:text-[48px] md:text-[54px] font-bold leading-[1.1] tracking-tighter text-[#37352F] font-display max-w-[550px]">
                {t('title')}
              </h2>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center justify-center h-14 px-8 rounded bg-[#465067] text-white font-bold uppercase tracking-[0.2em] text-[12px] transition-all hover:bg-[#FC7911] active:scale-95 shadow-md shadow-[#465067]/10"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Right Image Column */}
          <div className="relative w-full lg:w-[48%] h-[280px] sm:h-[350px] lg:h-auto min-h-[300px] rounded-[24px] overflow-hidden shadow-md border border-white/10 group z-10">
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
              alt="Happy Pets"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Subtle decorative elements */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#465067]/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
        </div>

        {/* Bottom Bento Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Black Block: Description - Fixed UI */}
          <div className="lg:col-span-7 bg-[#FC7911] rounded-sm overflow-hidden flex flex-col group border border-white/5  shadow-sm ">
            <div className="p-10 md:p-14 relative z-10">
              <h4 className="text-[20px] sm:text-[22px] md:text-[28px] leading-[1.5] text-white font-medium font-body tracking-tight">
                {t.rich('story', {
                  bold_nova: (chunks) => <span className="text-[#FBC84F] font-bold">{chunks}</span>,
                  bold_wku: (chunks) => <span className="text-white font-bold border-b-2 border-[#FBC84F] pb-1">{chunks}</span>,
                  bold_wcf: (chunks) => <span className="text-white font-bold border-b-2 border-[#FBC84F] pb-1">{chunks}</span>
                })}
              </h4>
            </div>
            <div className="relative flex-grow min-h-[260px] sm:min-h-[300px] mt-auto mx-4 md:mx-6 mb-4 md:mb-6 rounded-sm overflow-hidden border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
                alt="Pet Festival"
                fill
                className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          </div>

          {/* Stats Block - Refined UI */}
          <div className="lg:col-span-5 bg-[#FC7911] border border-white/5 rounded-sm p-10 md:p-16 flex flex-col justify-center shadow-sm group">
            <div className="grid grid-cols-2 gap-x-10 gap-y-20">
              <div className="group/item">
                <div className="flex items-baseline gap-2 mb-4">
                  <h3 className="text-[64px] md:text-[84px] font-display font-bold leading-none text-white tracking-tighter transition-transform duration-500 group-hover/item:-translate-y-2">6</h3>
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#FBC84F] shadow-sm shadow-[#FBC84F]/40" />
                </div>
                <p className="text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em] text-white/60 leading-snug whitespace-pre-line">
                  {t('stat_competitions')}
                </p>
              </div>
              <div className="group/item">
                <div className="flex items-baseline gap-2 mb-4">
                  <h3 className="text-[64px] md:text-[84px] font-display font-bold leading-none text-white tracking-tighter transition-transform duration-500 group-hover/item:-translate-y-2">10K</h3>
                  <div className="w-2.5 h-2.5 rounded-sm bg-white/20" />
                </div>
                <p className="text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em] text-white/60 leading-snug whitespace-pre-line">
                  {t('stat_visitors')}
                </p>
              </div>
              <div className="group/item">
                <div className="flex items-baseline gap-2 mb-4">
                  <h3 className="text-[64px] md:text-[84px] font-display font-bold leading-none text-white tracking-tighter transition-transform duration-500 group-hover/item:-translate-y-2">2</h3>
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#FBC84F] shadow-sm shadow-[#FBC84F]/40" />
                </div>
                <p className="text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em] text-white/60 leading-snug whitespace-pre-line">
                  {t('stat_days')}
                </p>
              </div>
              <div className="group/item">
                <div className="flex items-baseline gap-2 mb-4">
                  <h3 className="text-[64px] md:text-[84px] font-display font-bold leading-none text-white tracking-tighter transition-transform duration-500 group-hover/item:-translate-y-2">48</h3>
                  <div className="w-2.5 h-2.5 rounded-sm bg-white/20" />
                </div>
                <p className="text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em] text-white/60 leading-snug whitespace-pre-line">
                  {t('stat_cups')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsGrid;