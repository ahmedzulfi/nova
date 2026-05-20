"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Trophy, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const CompetitionsList = () => {
  const t = useTranslations('CompetitionsPage.list');
  const tCTA = useTranslations('CompetitionsPage.cta');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const registration = localStorage.getItem('nova_registration');
    if (registration) {
      setIsLoggedIn(true);
    }
  }, []);

  const competitions = [
    { key: "fashion", detailSlug: "dog-fashion-show", icon: <Users className="w-4 h-4" />, timeIcon: <Clock className="w-4 h-4" />, awardIcon: <Trophy className="w-4 h-4" />, image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2068&auto=format&fit=crop" },
    { key: "grooming", detailSlug: "grooming-competition", icon: <Users className="w-4 h-4" />, timeIcon: <Clock className="w-4 h-4" />, awardIcon: <Star className="w-4 h-4" />, image: "/grooming.jpeg" },
    { key: "dog_show", detailSlug: "best-dog-show", icon: <Users className="w-4 h-4" />, timeIcon: <Star className="w-4 h-4" />, awardIcon: <Trophy className="w-4 h-4" />, image: "/best.PNG" },
    { key: "cat_show", detailSlug: "best-cat-show", icon: <Users className="w-4 h-4" />, timeIcon: <Star className="w-4 h-4" />, awardIcon: <Trophy className="w-4 h-4" />, image: "/cathsow.jfif" },
    { key: "drawing", detailSlug: "cat-drawing-battle", icon: <Users className="w-4 h-4" />, timeIcon: <Star className="w-4 h-4" />, awardIcon: <Trophy className="w-4 h-4" />, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" }
  ];

  return (
    <section className="py-24 md:py-40 bg-[#F5F5F0]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="space-y-24 md:space-y-40">
          {competitions.map((comp, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3]  rounded-sm  overflow-hidden  shadow-sm  group border-8 border-white">
                  <Image
                    src={comp.image}
                    alt={t(`items.${comp.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-10">
                <div className="space-y-8">
                  <h3 className="text-[40px] md:text-[64px] font-display font-bold text-black leading-[0.95] tracking-tighter">
                    {t(`items.${comp.key}.title`)}
                  </h3>
                  <p className="text-[18px] md:text-[22px] text-black/40 font-body font-medium leading-relaxed rtl:text-right">
                    {t(`items.${comp.key}.desc`)}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-primary rtl:flex-row-reverse rtl:justify-end">
                      {comp.icon}
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{t('labels.contestants')}</span>
                    </div>
                    <span className="text-[17px] font-bold text-black rtl:text-right">
                      {t(`values.${comp.key === 'dog_show' ? '40_dogs' : comp.key === 'cat_show' ? '20_cats' : '8_per_day'}`)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-primary rtl:flex-row-reverse rtl:justify-end">
                      {comp.timeIcon}
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                        {t(`labels.${comp.key === 'fashion' || comp.key === 'grooming' ? 'duration' : comp.key === 'dog_show' ? 'classes' : comp.key === 'cat_show' ? 'judges' : 'eligibility'}`)}
                      </span>
                    </div>
                    <span className="text-[17px] font-bold text-black rtl:text-right">
                      {t(`values.${comp.key === 'fashion' ? '50_min' : comp.key === 'grooming' ? '60_min' : comp.key === 'dog_show' ? '3_classes' : comp.key === 'cat_show' ? 'wcf_intl' : 'all_ages'}`)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-primary rtl:flex-row-reverse rtl:justify-end">
                      {comp.awardIcon}
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                        {t(`labels.${comp.key === 'grooming' || comp.key === 'drawing' ? 'provided' : comp.key === 'dog_show' || comp.key === 'cat_show' ? 'grand_prize' : 'awards'}`)}
                      </span>
                    </div>
                    <span className="text-[17px] font-bold text-black rtl:text-right">
                      {t(`values.${comp.key === 'fashion' ? 'cups' : comp.key === 'grooming' ? 'tables' : comp.key === 'dog_show' ? 'best_in_show' : comp.key === 'cat_show' ? 'best_cat' : 'materials'}`)}
                    </span>
                  </div>
                </div>

                <div className="pt-8 flex flex-col gap-4">
                  <Link
                    href={isLoggedIn ? "/dashboard" : "/tickets"}
                    className="inline-flex items-center justify-center h-18 px-12 bg-black text-white rounded-full font-bold text-[14px] uppercase tracking-[0.3em] hover:bg-primary transition-all duration-300 hover:scale-105 active:scale-95  shadow-sm  shadow-black/10 w-fit"
                  >
                    {isLoggedIn ? tCTA('manage') : tCTA('primary')} <ArrowRight className="w-6 h-6 rtl:rotate-180 ml-3" />
                  </Link>

                  <Link
                    href={`/competitions/${comp.detailSlug}`}
                    className="inline-flex items-center gap-2 text-black/40 hover:text-primary font-bold text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 w-fit group"
                  >
                    View Full Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                  </Link>

                  <p className="text-[12px] font-bold text-black/20 uppercase tracking-[0.2em] italic flex items-center gap-3 rtl:flex-row-reverse rtl:justify-end">
                    <Star className="w-4 h-4 text-primary" /> {tCTA('warning')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitionsList;
