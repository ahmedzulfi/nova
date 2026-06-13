'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const AboutUsGrid = () => {
  const t = useTranslations('AboutGrid');

  return (
    <section className="relative overflow-hidden" id="about-us">
      {/* Top Half: Yellow Section */}
      <div className="bg-[#FBC84F] relative h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden z-10 flex flex-col justify-between items-center py-8">
        {/* Decorative Figma Paw Prints on Yellow */}
        <div className="absolute left-0 top-0 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] opacity-100 pointer-events-none select-none transform rotate-[45deg]">
          <Image src="/vectors/White_paw_print 1 copy.png" alt="" fill className="object-contain object-left-top" />
        </div>
        <div className="absolute right-0 top-0 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] opacity-100 pointer-events-none select-none">
          <Image src="/vectors/White_paw_print 1.png" alt="" fill className="object-contain object-right-top" />
        </div>

        {/* Top Center Badge */}
        <div className="relative z-20">
          <span className="inline-flex items-center px-6 py-2 bg-[#465067] text-white text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] rounded-sm">
            {t('badge')}
          </span>
        </div>

        {/* Center Pets Image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[440px] md:w-[560px] h-[240px] sm:h-[320px] md:h-[400px] z-10 select-none pointer-events-none">
          <Image
            src="/vectors/about_hero_pets.png"
            alt="About Pets"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* Bottom CTA Overlap Badge */}
        <Link
          href="/about"
          className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 z-30 inline-flex items-center justify-center h-12 md:h-14 px-8 rounded-sm bg-[#465067] text-white font-bold uppercase tracking-[0.2em] text-[12px] md:text-[13px] transition-all hover:bg-white hover:text-black active:scale-95 shadow-md"
        >
          {t('cta')}
        </Link>
      </div>

      {/* Bottom Half: Orange Section */}
      <div className="bg-[#FC7911] relative py-28 md:py-36 z-0 overflow-hidden">
        {/* Decorative Background Assets on Orange */}
        <div className="absolute left-6 bottom-6 w-[200px] h-[200px] opacity-95 pointer-events-none hidden md:block select-none">
          <Image src="/vectors/pets 1 copy.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute right-6 bottom-6 w-[200px] h-[200px] opacity-95 pointer-events-none hidden md:block select-none">
          <Image src="/vectors/black-cat 1 copy.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute right-0 top-[10%] w-[250px] h-[250px] md:w-[300px] md:h-[300px] opacity-100 pointer-events-none hidden lg:block select-none">
          <Image src="/vectors/White_paw_print 2.png" alt="" fill className="object-contain object-right" />
        </div>

        <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left Column: Story Text */}
            <div className="lg:col-span-7">
              <p className="text-[20px] sm:text-[24px] md:text-[28px] leading-[1.6] text-white font-medium tracking-tight">
                {t.rich('story', {
                  bold_nova: (chunks) => <span className="text-[#FBC84F] font-bold">{chunks}</span>,
                  bold_wku: (chunks) => <span className="text-white font-bold border-b-2 border-[#FBC84F] pb-1">{chunks}</span>,
                  bold_wcf: (chunks) => <span className="text-white font-bold border-b-2 border-[#FBC84F] pb-1">{chunks}</span>
                })}
              </p>
            </div>

            {/* Right Column: Stats Grid */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-x-12 gap-y-16">
                <div>
                  <h3 className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-white tracking-tighter mb-2">
                    6.
                  </h3>
                  <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-white/80 leading-snug whitespace-pre-line">
                    {t('stat_competitions')}
                  </p>
                </div>
                <div>
                  <h3 className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-white tracking-tighter mb-2">
                    10K.
                  </h3>
                  <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-white/80 leading-snug whitespace-pre-line">
                    {t('stat_visitors')}
                  </p>
                </div>
                <div>
                  <h3 className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-white tracking-tighter mb-2">
                    2.
                  </h3>
                  <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-white/80 leading-snug whitespace-pre-line">
                    {t('stat_days')}
                  </p>
                </div>
                <div>
                  <h3 className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-white tracking-tighter mb-2">
                    48.
                  </h3>
                  <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-white/80 leading-snug whitespace-pre-line">
                    {t('stat_cups')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsGrid;