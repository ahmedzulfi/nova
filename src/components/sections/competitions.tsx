'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const Competitions = () => {
  const t = useTranslations('Competitions');
  const items = t.raw('items') as any[];

  const images = [
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2068&auto=format&fit=crop",
    "/grooming.jpeg",
    "/best.PNG",
    "/cathsow.PNG",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop"
  ];

  return (
    <section className="bg-white py-[120px] md:py-[160px]" id="competitions">
      <div className="container max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="inline-flex items-center px-5 py-2 rounded-sm bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
            {t('badge')}
          </span>
          <h2 className="text-[40px] md:text-[72px] font-bold leading-[1] text-black mb-8 font-display tracking-tighter max-w-[900px]">
            {t('title')}
          </h2>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-black/50 max-w-[680px] font-medium font-body">
            {t('desc')}
          </p>
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((competition, index) => (
            <div key={index} className="group bg-[#F5F5F0] rounded-sm overflow-hidden border border-black/5 transition-all duration-500 hover: shadow-sm  hover:-translate-y-1">
              <div className="relative h-[280px] w-full overflow-hidden">
                <Image
                  src={images[index]}
                  alt={competition.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-10">
                <h4 className="text-[24px] md:text-[28px] font-bold text-black font-display mb-4 tracking-tight leading-none group-hover:text-primary transition-colors">
                  {competition.title}
                </h4>
                <p className="text-[15px] md:text-[16px] leading-[1.6] text-black/50 font-medium font-body">
                  {competition.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <Link
            href="/tickets"
            className="inline-flex items-center justify-center h-16 px-12 bg-primary text-white rounded-sm font-bold text-[14px] uppercase tracking-[0.2em] transition-all hover:bg-black active:scale-95  shadow-sm  shadow-primary/20"
          >
            {t('cta')}
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Competitions;
