'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const HeroSection = () => {
  const t = useTranslations('Hero');

  return (
    <section className="relative w-full overflow-hidden bg-white pt-[100px] pb-[80px] md:pt-[140px] md:pb-[120px]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-start">
            {/* Badge */}
            <div
              className="group mb-8 inline-flex items-center gap-2 px-5 py-2 bg-black rounded-sm transition-all hover:bg-primary"
            >
              <span className="text-[12px] font-bold text-white uppercase tracking-[0.2em]">
                {t('badge')}
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 font-display text-[44px] sm:text-[58px] md:text-[72px] lg:text-[84px] xl:text-[96px] text-black leading-[0.95] tracking-tighter">
              {t('title')}
            </h1>
            
            <h2 className="mb-8 text-[20px] md:text-[26px] font-bold text-primary font-display leading-tight tracking-tight">
              {t('subtitle')}
            </h2>

            {/* Description */}
            <p className="mb-12 text-[17px] md:text-[19px] leading-[1.6] text-black/50 max-w-[600px] font-medium font-body">
              {t('description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <Link
                href="/competitions"
                className="group inline-flex items-center justify-center gap-4 w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-sm font-bold uppercase tracking-[0.2em] text-[13px] transition-all hover:bg-black active:scale-[0.95] shadow-xl shadow-primary/20"
              >
                <span>{t('cta_competitions')}</span>
                <div className="transition-transform group-hover:translate-x-1">
                  <Image
                    src="https://framerusercontent.com/images/mJ4B3sUua6gvwJ6rQYS23DLJ9c.svg"
                    alt="Arrow"
                    width={18}
                    height={18}
                    className="brightness-0 invert"
                  />
                </div>
              </Link>
              <Link
                href="/tickets"
                className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-black text-white rounded-sm font-bold uppercase tracking-[0.2em] text-[13px] transition-all hover:bg-primary active:scale-[0.95] shadow-xl shadow-black/10"
              >
                {t('cta_tickets')}
              </Link>
            </div>
          </div>

          {/* Right Column: Video Container */}
          <div className="relative w-full aspect-[4/5] lg:aspect-[4/5] rounded-sm overflow-hidden shadow-2xl group border border-black/5">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            >
              <source src="https://player.vimeo.com/external/494278657.sd.mp4?s=d5965457c154379a528e53ef711674a2b270a68d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

            {/* Floating Badges on Video */}
            <div className="absolute top-6 left-6 z-20">
              <div className="px-5 py-2 bg-white rounded-sm shadow-xl">
                <span className="text-black font-display text-[12px] font-bold uppercase tracking-widest">{t('video_badge_top')}</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="p-8 bg-white/10 backdrop-blur-xl rounded-sm border border-white/20 shadow-2xl">
                <p className="text-white font-display text-[18px] md:text-[20px] font-bold leading-tight tracking-tight">
                  {t('video_badge_bottom')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
