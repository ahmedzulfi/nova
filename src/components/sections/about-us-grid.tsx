'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const AboutUsGrid = () => {
  const t = useTranslations('AboutGrid');

  return (
    <section className="relative overflow-hidden bg-[#FFF2E5]" id="about-us">
      {/* Top Half: Yellow Section */}
      <div className="bg-[#FBC84F] relative h-[360px] sm:h-[460px] lg:h-[571px] overflow-hidden z-10 flex flex-col justify-between items-center py-8">
        {/* Decorative Figma Paw Prints on Yellow */}
        <div className="absolute left-0 bottom-0 w-[180px] sm:w-[220px] lg:w-[260px] aspect-[420/404] opacity-100 pointer-events-none select-none">
          <Image src="/vectors/White_paw_print 1 copy 2.png" alt="" fill className="object-contain object-left-bottom" />
        </div>
        <div className="absolute right-0 top-0 w-[220px] sm:w-[280px] lg:w-[340px] aspect-[420/404] opacity-100 pointer-events-none select-none">
          <Image src="/vectors/White_paw_print 1-1.png" alt="" fill className="object-contain object-right-top" />
        </div>

        {/* Top Center Badge */}
        <div className="relative z-20 lg:absolute lg:top-[28px] lg:left-1/2 lg:-translate-x-1/2">
          <div className="bg-[#465067] rounded-sm w-[197px] h-[43px] flex items-center justify-center shadow-sm">
            <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">
              {t('badge')}
            </span>
          </div>
        </div>

        {/* Center Pets Image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[440px] md:w-[560px] lg:w-[717px] lg:h-[478px] h-[220px] sm:h-[290px] md:h-[360px] z-10 select-none pointer-events-none">
          <Image
            src="/vectors/ChatGPT Image Jun 1, 2026, 10_23_36 AM 1.png"
            alt="About Pets"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* The Nova Story CTA Button */}
        <Link
          href="/about"
          className="absolute z-30 inline-flex items-center justify-center rounded-sm bg-[#465067] text-white font-bold uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-black active:scale-95 shadow-md
            bottom-4 left-1/2 -translate-x-1/2 h-11 w-[200px] text-[12px]
            lg:bottom-auto lg:top-[441px] lg:w-[229px] lg:h-[45px] lg:text-[13px]"
        >
          {t('cta')}
        </Link>
      </div>

      {/* Bottom Half: Orange Section */}
      <div className="bg-[#FC7911] relative py-20 lg:py-0 lg:h-[720px] z-0 overflow-hidden flex items-center">
        {/* Decorative Background Assets on Orange */}
        <div className="absolute left-6 bottom-6 w-[180px] h-[180px] lg:w-[250px] lg:h-[250px] opacity-100 pointer-events-none hidden md:block select-none">
          <Image src="/vectors/pets 1 copy.png" alt="" fill className="object-contain" />
        </div>
        <div className="absolute right-6 bottom-6 w-[180px] h-[180px] lg:w-[241px] lg:h-[241px] opacity-100 pointer-events-none hidden md:block select-none">
          <Image src="/vectors/black-cat 1 copy.png" alt="" fill className="object-contain" />
        </div>

        <div className="container mx-auto px-6 max-w-[1280px] relative z-10 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
            {/* Left Column: Story Text */}
            <div className="lg:col-span-7 lg:pt-[80px]">
              <p className="text-[20px] sm:text-[24px] md:text-[28px] leading-[1.6] text-white font-medium tracking-tight">
                {t.rich('story', {
                  bold_nova: (chunks) => <span className="text-[#FBC84F] font-bold">{chunks}</span>,
                  bold_wku: (chunks) => <span className="text-white font-bold border-b-2 border-[#FBC84F] pb-1">{chunks}</span>,
                  bold_wcf: (chunks) => <span className="text-white font-bold border-b-2 border-[#FBC84F] pb-1">{chunks}</span>
                })}
              </p>
            </div>

            {/* Right Column: Stats Grid */}
            <div className="lg:col-span-5 lg:h-[500px] flex items-center">
              <div className="grid grid-cols-2 gap-x-12 gap-y-16 w-full lg:pl-12">
                <div>
                  <div className="flex items-baseline mb-2">
                    <h3 className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-white tracking-tighter">
                      6
                    </h3>
                    <span className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-[#37352F]">.</span>
                  </div>
                  <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-[#37352F] leading-snug whitespace-pre-line">
                    {t('stat_competitions')}
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline mb-2">
                    <h3 className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-white tracking-tighter">
                      10K
                    </h3>
                    <span className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-[#37352F]">.</span>
                  </div>
                  <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-[#37352F] leading-snug whitespace-pre-line">
                    {t('stat_visitors')}
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline mb-2">
                    <h3 className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-white tracking-tighter">
                      2
                    </h3>
                    <span className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-[#37352F]">.</span>
                  </div>
                  <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-[#37352F] leading-snug whitespace-pre-line">
                    {t('stat_days')}
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline mb-2">
                    <h3 className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-white tracking-tighter">
                      48
                    </h3>
                    <span className="text-[64px] md:text-[84px] font-display font-extrabold leading-none text-[#37352F]">.</span>
                  </div>
                  <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-[#37352F] leading-snug whitespace-pre-line">
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