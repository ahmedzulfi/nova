'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Venue = () => {
  const t = useTranslations('Venue');

  return (
    <section className="bg-[#FFF2E5] relative min-h-[750px] lg:h-[950.38px] overflow-hidden flex items-center py-20 lg:py-0" id="venue">
      {/* Decorative Figma Paw Print on the Right */}
      <div className="absolute right-[-100px] top-[-60px] w-[380px] h-[380px] pointer-events-none select-none hidden lg:block">
        <Image src="/vectors/White_paw_print 1 copy 3.png" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Image (Figma aspect ratio 550x675) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[550px] aspect-[550/675] h-[400px] sm:h-[500px] lg:h-[675px] rounded-sm overflow-hidden border border-black/5 shadow-sm group">
              <Image
                src="/vectors/venue_park.png"
                alt="pet park The Pearl Island Qatar"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-start">
            {/* Badge container */}
            <div className="mb-6">
              <span className="inline-flex items-center px-5 py-2 bg-[#465067] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm">
                {t('badge')}
              </span>
            </div>

            {/* Heading 2 */}
            <h2 className="text-[40px] md:text-[56px] lg:text-[72px] font-display font-bold text-[#465067] leading-[1] lg:leading-[72px] tracking-[-1.5px] lg:tracking-[-3.6px] mb-8">
              A World-Class<br className="hidden sm:inline" /> Destination for<br className="hidden sm:inline" /> Pets
            </h2>

            {/* Description */}
            <p className="text-[16px] md:text-[20px] leading-[1.6] lg:leading-[32px] text-black/50 font-medium font-body max-w-[580px] mb-12">
              {t('desc')}
            </p>

            {/* CTA Button */}
            <a
              href="/contact"
              className="inline-flex items-center justify-center h-14 lg:h-16 px-10 bg-[#465067] text-white font-bold text-[14px] uppercase tracking-[0.2em] rounded-sm transition-all hover:bg-[#FC7911] active:scale-95 shadow-sm"
            >
              {t('cta')}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Venue;
