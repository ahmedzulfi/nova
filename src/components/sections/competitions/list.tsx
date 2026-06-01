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
    if (localStorage.getItem('nova_registration')) setIsLoggedIn(true);
  }, []);

  const competitions = [
    { key: "fashion", detailSlug: "dog-fashion-show", icon: <Users className="w-3.5 h-3.5" />, timeIcon: <Clock className="w-3.5 h-3.5" />, awardIcon: <Trophy className="w-3.5 h-3.5" />, image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2068&auto=format&fit=crop" },
    { key: "grooming", detailSlug: "grooming-competition", icon: <Users className="w-3.5 h-3.5" />, timeIcon: <Clock className="w-3.5 h-3.5" />, awardIcon: <Star className="w-3.5 h-3.5" />, image: "/grooming.jpeg" },
    { key: "dog_show", detailSlug: "best-dog-show", icon: <Users className="w-3.5 h-3.5" />, timeIcon: <Star className="w-3.5 h-3.5" />, awardIcon: <Trophy className="w-3.5 h-3.5" />, image: "/best.PNG" },
    { key: "cat_show", detailSlug: "best-cat-show", icon: <Users className="w-3.5 h-3.5" />, timeIcon: <Star className="w-3.5 h-3.5" />, awardIcon: <Trophy className="w-3.5 h-3.5" />, image: "/cathsow.PNG" },
    { key: "drawing", detailSlug: "cat-drawing-battle", icon: <Users className="w-3.5 h-3.5" />, timeIcon: <Star className="w-3.5 h-3.5" />, awardIcon: <Trophy className="w-3.5 h-3.5" />, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" },
  ];

  const statValues = {
    contestants: (key: string) =>
      key === 'dog_show' ? t('values.40_dogs') : key === 'cat_show' ? t('values.20_cats') : t('values.8_per_day'),
    duration: (key: string) =>
      key === 'fashion' ? t('values.50_min') : key === 'grooming' ? t('values.60_min') : key === 'dog_show' ? t('values.3_classes') : key === 'cat_show' ? t('values.wcf_intl') : t('values.all_ages'),
    award: (key: string) =>
      key === 'fashion' ? t('values.cups') : key === 'grooming' ? t('values.tables') : key === 'dog_show' ? t('values.best_in_show') : key === 'cat_show' ? t('values.best_cat') : t('values.materials'),
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5F5F0]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {competitions.map((comp, index) => (
            <div
              key={index}
              className="bg-white rounded-sm overflow-hidden border border-black/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <Link href={`/competitions/${comp.detailSlug}`} className="block relative aspect-[16/9] overflow-hidden group">
                <Image
                  src={comp.image}
                  alt={t(`items.${comp.key}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </Link>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                {/* Title + desc */}
                <div>
                  <h3 className="text-[20px] font-display font-bold text-black leading-tight tracking-tight mb-2">
                    {t(`items.${comp.key}.title`)}
                  </h3>
                  <p className="text-[13px] text-black/45 font-medium leading-relaxed line-clamp-2">
                    {t(`items.${comp.key}.desc`)}
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-black/5">
                  {[
                    { icon: comp.icon, label: t('labels.contestants'), val: statValues.contestants(comp.key) },
                    { icon: comp.timeIcon, label: t(`labels.${comp.key === 'fashion' || comp.key === 'grooming' ? 'duration' : comp.key === 'dog_show' ? 'classes' : comp.key === 'cat_show' ? 'judges' : 'eligibility'}`), val: statValues.duration(comp.key) },
                    { icon: comp.awardIcon, label: t(`labels.${comp.key === 'grooming' || comp.key === 'drawing' ? 'provided' : comp.key === 'dog_show' || comp.key === 'cat_show' ? 'grand_prize' : 'awards'}`), val: statValues.award(comp.key) },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-primary">
                        {s.icon}
                        <span className="text-[9px] font-bold uppercase tracking-widest text-black/30 truncate">{s.label}</span>
                      </div>
                      <span className="text-[12px] font-bold text-black leading-tight">{s.val}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3 mt-auto pt-1">
                  <Link
                    href={isLoggedIn ? "/dashboard" : "/tickets"}
                    className="flex-1 inline-flex items-center justify-center h-9 bg-black text-white rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all duration-300"
                  >
                    {isLoggedIn ? tCTA('manage') : tCTA('primary')}
                  </Link>
                  <Link
                    href={`/competitions/${comp.detailSlug}`}
                    className="inline-flex items-center gap-1 h-9 px-4 border border-black/10 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] text-black/50 hover:text-black hover:border-black transition-all group"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] font-bold text-black/20 uppercase tracking-[0.3em] mt-10 flex items-center justify-center gap-3">
          <Star className="w-3.5 h-3.5 text-primary" /> {tCTA('warning')}
        </p>
      </div>
    </section>
  );
};

export default CompetitionsList;
