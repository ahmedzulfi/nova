'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const AboutHero = () => {
  const t = useTranslations('AboutPage.hero');

  const floatingImages = [
    { src: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1974&auto=format&fit=crop", delay: "0s", pos: "top-[20%] left-[5%] md:left-[12%]", size: "w-24 h-24 md:w-32 md:h-32" },
    { src: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop", delay: "1s", pos: "top-[40%] left-[5%] md:left-[8%]", size: "w-20 h-20 md:w-28 md:h-28" },
    { src: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop", delay: "2s", pos: "bottom-[15%] left-[15%] md:left-[20%]", size: "w-28 h-28 md:w-40 md:h-40" },
    { src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop", delay: "0.5s", pos: "top-[10%] right-[10%] md:right-[15%]", size: "w-24 h-24 md:w-36 md:h-36" },
    { src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000&auto=format&fit=crop", delay: "1.5s", pos: "top-[45%] right-[5%] md:right-[8%]", size: "w-32 h-32 md:w-44 md:h-44" },
    { src: "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=2070&auto=format&fit=crop", delay: "2.5s", pos: "bottom-[10%] right-[15%] md:right-[20%]", size: "w-24 h-24 md:w-32 md:h-32" },
  ];

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-24 pb-20 lg:pt-32">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingImages.map((img, i) => (
          <div
            key={i}
            className={`absolute ${img.pos} ${img.size} rounded-full overflow-hidden border-4 border-white  shadow-sm  animate-float hidden md:block`}
            style={{ animationDelay: img.delay }}
          >
            <Image src={img.src} alt="Moment" fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-[40px] sm:text-[64px] md:text-[84px] font-bold leading-[1.1] tracking-tighter text-black mb-6 md:mb-10 font-display px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {t('title')}
          </h1>
          <p className="text-[17px] md:text-[22px] leading-[1.6] text-black/50 max-w-[760px] font-body mb-10 md:mb-14 px-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            {t.rich('desc', {
              nova_vet: (chunks) => <span className="text-primary font-bold">{chunks}</span>,
              adoption_zones: (chunks) => <span className="text-primary font-bold">{chunks}</span>,
              food_trucks: (chunks) => <span className="text-primary font-bold">{chunks}</span>
            })}
          </p>
          <a
            href="#story"
            className="group bg-primary hover:bg-black text-white font-bold h-16 md:h-18 px-10 md:px-12 rounded-full flex items-center gap-4 transition-all duration-300 transform hover:scale-105  shadow-sm  shadow-primary/20 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300 uppercase tracking-[0.2em] text-[13px]"
          >
            {t('cta')}
            <svg className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
