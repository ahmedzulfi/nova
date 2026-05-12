'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const CTABanner = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const t = useTranslations('CTABanner');

  useEffect(() => {
    const registration = localStorage.getItem('nova_registration');
    if (registration) {
      setIsRegistered(true);
    }
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1350px]">
        <div className="relative w-full rounded-sm overflow-hidden min-h-[550px] lg:h-[700px] flex items-center shadow-2xl border border-black/5 group">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=2070&auto=format&fit=crop"
              alt="Nova Paw Festival"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent rtl:bg-gradient-to-l" />
          </div>
          
          <div className="relative z-10 px-8 lg:px-24 py-16 lg:py-24 max-w-[950px] text-start">
            <h2 className="text-white text-[44px] lg:text-[84px] font-bold font-display leading-[0.9] mb-10 tracking-tighter drop-shadow-2xl whitespace-pre-line">
              {t('title')}
            </h2>
            <p className="text-white/80 text-[18px] lg:text-[22px] font-medium leading-[1.6] max-w-[640px] mb-14 drop-shadow-md font-body">
              {t('subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-primary text-white font-bold px-12 py-6 rounded-sm transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30"
                href={isRegistered ? "/dashboard" : "/tickets"}
              >
                <span className="text-[14px] uppercase tracking-[0.2em]">{isRegistered ? t('registered') : t('primary')}</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white text-white hover:text-black font-bold px-12 py-6 rounded-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                href="/about"
              >
                <span className="text-[14px] uppercase tracking-[0.2em]">{t('secondary')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;