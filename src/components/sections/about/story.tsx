'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const AboutStory = () => {
  const t = useTranslations('AboutPage.story');

  return (
    <section className="py-24 md:py-40 bg-white" id="story">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Image with floating elements */}
          <div className="relative group">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
                alt="Festival Vibe"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            
            {/* Floating Info Cards */}
            <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 bg-primary p-8 md:p-10 rounded-[2.5rem] shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500 z-20 border-4 border-white">
              <span className="block text-[44px] md:text-[64px] font-bold text-black leading-none mb-1 font-display tracking-tighter">10K</span>
              <span className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] text-black/40 whitespace-nowrap">{t('stats.visitors')}</span>
            </div>
            
            <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-black p-8 md:p-10 rounded-[2.5rem] shadow-2xl -rotate-3 transition-transform hover:rotate-0 duration-500 z-20 border-4 border-black/10">
              <span className="block text-[44px] md:text-[64px] font-bold text-white leading-none mb-1 font-display tracking-tighter">270m</span>
              <span className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">{t('stats.venue')}</span>
            </div>
          </div>

          {/* Right Side: Detailed Text Content */}
          <div className="space-y-12">
            <div>
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-[12px] mb-6 block leading-none">
                {t('badge')}
              </span>
              <h2 className="text-[44px] md:text-[72px] font-display font-bold text-black leading-[0.95] tracking-tighter">
                {t('title')}
              </h2>
            </div>
            
            <div className="space-y-8 text-[18px] md:text-[22px] leading-[1.6] text-black/50 font-body font-medium">
              <p>
                {t.rich('p1', {
                  date: (chunks) => <span className="text-black font-bold border-b-2 border-primary/30">{chunks}</span>
                })}
              </p>
              <p>
                {t('p2')}
              </p>
              <div className="p-10 bg-[#F5F5F0] border-l-4 rtl:border-l-0 rtl:border-r-4 border-primary rounded-r-2xl rtl:rounded-r-none rtl:rounded-l-2xl shadow-sm">
                <p className="text-black font-bold text-[20px] md:text-[24px] leading-[1.4] tracking-tight italic">
                  {t.rich('quote', {
                    wku: (chunks) => <span className="text-primary">{chunks}</span>,
                    wcf: (chunks) => <span className="text-primary">{chunks}</span>
                  })}
                </p>
              </div>
              <p>
                {t('p3')}
              </p>
              <p>
                {t('p4')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
