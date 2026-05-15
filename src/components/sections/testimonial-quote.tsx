'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const TestimonialQuote = () => {
  const t = useTranslations('TeamPage.quote');

  return (
    <section className="bg-[#F5F5F0] py-24 md:py-40 px-6 overflow-hidden relative">
      {/* Decorative Marks */}
      <div className="absolute top-20 left-10 text-[200px] font-display text-black/5 leading-none select-none pointer-events-none">“</div>
      <div className="absolute bottom-0 right-10 text-[200px] font-display text-black/5 leading-none select-none pointer-events-none translate-y-20">”</div>

      <div className="container mx-auto max-w-[1000px] relative z-10">
        <div className="flex flex-col items-center">
          <blockquote className="text-[28px] md:text-[44px] font-bold font-display text-black text-center leading-[1.2] tracking-tighter mb-16 italic rtl:text-right">
            &ldquo;{t('text')}&rdquo;
          </blockquote>

          <div className="flex flex-col items-center gap-6">
            {/* Avatar */}
            <div className="relative w-20 h-20 overflow-hidden rounded-full border-4 border-white  shadow-sm ">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                alt={t('author')}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            <div className="text-center">
              <h6 className="text-[24px] font-bold font-display tracking-tight text-black mb-1">
                {t('author')}
              </h6>
              <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-primary">
                {t('role')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialQuote;