'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Venue = () => {
  const t = useTranslations('Venue');

  return (
    <section className="bg-white py-[120px] md:py-[160px]" id="venue">
      <div className="container max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Image Side */}
          <div className="relative h-[440px] md:h-[640px] w-full rounded-sm overflow-hidden  shadow-sm  border border-black/5 group">
            <Image
              src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop"
              alt="The Pearl Island Qatar"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <div className="inline-block px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-sm text-white text-[12px] font-bold tracking-[0.2em] uppercase mb-4">
                {t('location_badge')}
              </div>
              <h3 className="text-white text-[36px] md:text-[48px] font-bold leading-none font-display tracking-tight">
                {t('location_val')}
              </h3>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col items-start text-start">
            <span className="inline-flex items-center px-5 py-2 rounded-sm bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
              {t('badge')}
            </span>
            <h2 className="text-[40px] md:text-[72px] font-bold leading-[1] text-black mb-8 font-display tracking-tighter">
              {t('title')}
            </h2>
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-black/50 mb-12 font-medium font-body max-w-[640px]">
              {t('desc')}
            </p>

            <a
              href="#contact"
              className="inline-flex items-center justify-center h-16 px-10 bg-black text-white rounded-sm font-bold text-[14px] uppercase tracking-[0.2em] transition-all hover:bg-primary active:scale-95  shadow-sm  shadow-black/10"
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
