'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const HeroSection = () => {
  const t = useTranslations('Hero');

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF2E5] py-20 lg:py-32">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Media Column */}
          <div className="lg:col-span-7 relative w-full aspect-[16/10] lg:aspect-[4/3] rounded-sm overflow-hidden shadow-sm group border border-black/5">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute top-6 left-6 z-20">
              <div className="px-5 py-2 bg-white rounded-sm shadow-sm">
                <span className="text-black font-display text-[12px] font-bold uppercase tracking-widest">{t('video_badge_top')}</span>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="p-6 bg-white/10 backdrop-blur-xl rounded-sm border border-white/20 shadow-sm">
                <p className="text-white font-display text-[16px] md:text-[18px] font-bold leading-tight tracking-tight">
                  {t('video_badge_bottom')}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Premium Yellow-Orange Container Card */}
          <div className="lg:col-span-5 bg-[#FBC84F]/90 backdrop-blur-md rounded-[33px] p-8 md:p-10 flex flex-col gap-6 shadow-xl border border-white/20 relative overflow-hidden">
            {/* Headline */}
            <div className="flex flex-col select-none">
              <h1 className="font-display text-[54px] sm:text-[64px] md:text-[72px] lg:text-[80px] xl:text-[90px] font-bold leading-[0.9] tracking-tighter text-white">
                Nova Paw
              </h1>
              <h1 className="font-display text-[54px] sm:text-[64px] md:text-[72px] lg:text-[80px] xl:text-[90px] font-bold leading-[0.9] tracking-tighter text-[#FC7911]">
                Festival
              </h1>
            </div>

            {/* Subtitle */}
            <h2 className="text-[22px] md:text-[26px] font-bold text-[#37352F] font-display leading-[32.5px] tracking-[-0.65px]">
              {t('subtitle')}
            </h2>

            {/* White card description overlay */}
            <div className="bg-white/80 backdrop-blur-sm rounded-[33px] p-6 shadow-sm border border-white/40">
              <p className="text-[15px] md:text-[19px] leading-[30.4px] text-[#37352F] font-medium font-body">
                {t('description')}
              </p>
            </div>

            {/* Date badge */}
            <div className="bg-[#465067] text-white py-4 px-4 rounded-[4px] text-center text-[12px] font-bold uppercase tracking-[2.40px]">
              {t('badge')}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
              <Link
                href="/competitions"
                className="flex-1 inline-flex items-center justify-center gap-3 w-full h-[60px] bg-[#FC7810] text-white rounded-[4px] font-bold uppercase tracking-[2.60px] text-[13px] leading-[20.8px] transition-all hover:bg-black active:scale-[0.97] shadow-sm shadow-[#FC7810]/20"
              >
                <span>{t('cta_competitions')}</span>
              </Link>
              <Link
                href="/tickets"
                className="flex-1 inline-flex items-center justify-center w-full h-[60px] bg-[#465067] text-white rounded-[4px] font-bold uppercase tracking-[2.60px] text-[13px] leading-[20.8px] transition-all hover:bg-[#FC7911] active:scale-[0.97] shadow-sm shadow-[#465067]/10"
              >
                {t('cta_tickets')}
              </Link>
            </div>

            {/* Subtle decorative background element */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
