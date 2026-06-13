'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const AboutUsGrid = () => {
  const t = useTranslations('AboutGrid');

  return (
    <section className="py-24 md:py-32 bg-[#FFF2E5] relative overflow-hidden" id="about-us">
      {/* Decorative Background Assets from Figma */}
      <div className="absolute left-[-150px] top-[10%] w-[350px] h-[350px] opacity-40 pointer-events-none hidden xl:block select-none">
        <Image src="/vectors/White_paw_print 1.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute right-[-150px] top-[40%] w-[350px] h-[350px] opacity-40 pointer-events-none hidden xl:block select-none transform rotate-[-161deg]">
        <Image src="/vectors/White_paw_print 1 copy.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute left-4 bottom-[20px] w-[180px] h-[180px] opacity-30 pointer-events-none hidden 2xl:block select-none">
        <Image src="/vectors/pets 1.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute right-4 bottom-[20px] w-[180px] h-[180px] opacity-30 pointer-events-none hidden 2xl:block select-none">
        <Image src="/vectors/black-cat 1.png" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        {/* Top Bento Block: Yellow Main Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8 bg-[#FBC84F] rounded-sm p-10 md:p-14 flex flex-col justify-between items-start min-h-[400px] md:min-h-[500px] shadow-sm relative overflow-hidden group">
            <div className="space-y-8 relative z-10">
              <span className="inline-flex items-center px-5 py-2 rounded-sm bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em]">
                {t('badge')}
              </span>
              <h2 className="text-[32px] sm:text-[48px] md:text-[64px] font-bold leading-[1] tracking-tighter text-black max-w-[680px] font-display">
                {t('title')}
              </h2>
            </div>
            <Link
              href="/about"
              className="mt-12 inline-flex items-center justify-center h-16 px-10 rounded-sm bg-black text-white font-bold uppercase tracking-[0.2em] text-[13px] transition-all hover:bg-white hover:text-black active:scale-95  shadow-sm  relative z-10"
            >
              {t('cta')}
            </Link>
            {/* Subtle decorative element */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-black/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          </div>

          <div className="lg:col-span-4">
            <div className="relative h-full min-h-[320px] md:min-h-[500px] rounded-sm overflow-hidden shadow-sm border border-black/5 group">
              <Image
                src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop"
                alt="Happy Pets"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
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