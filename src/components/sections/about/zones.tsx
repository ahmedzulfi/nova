'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  HeartPulse,
  Heart,
  Gamepad2,
  Utensils,
  Cat,
  Camera,
  ArrowUpRight
} from 'lucide-react';
import { cn } from "@/lib/utils";

const AboutZones = () => {
  const t = useTranslations('AboutPage.zones');

  const zones = [
    { key: "zone_a", badge: "ZONE A", icon: <HeartPulse className="w-6 h-6 text-primary" />, image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=2070&auto=format&fit=crop", emoji: "🏥" },
    { key: "zone_b", badge: "ZONE B", icon: <Heart className="w-6 h-6 text-primary" />, image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000&auto=format&fit=crop", emoji: "🐾" },
    { key: "zone_c", badge: "ZONE C", icon: <Gamepad2 className="w-6 h-6 text-primary" />, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/6e/e7/92/kidz-klub-danbury-toddler.jpg?w=900&h=500&s=1", emoji: "🎪" },
    { key: "zone_d", badge: "ZONE D", icon: <Utensils className="w-6 h-6 text-primary" />, image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=2070&auto=format&fit=crop", emoji: "🍔" },
    { key: "zone_e", badge: "ZONE E", icon: <Cat className="w-6 h-6 text-primary" />, image: "/cathsow.jfif", emoji: "🐱" },
    { key: "zone_f", badge: "ZONE F", icon: <Camera className="w-6 h-6 text-primary" />, image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop", emoji: "📸" }
  ];

  return (
    <section className="py-24 md:py-40 bg-white" id="zones">
      <div className="container mx-auto px-6 max-w-[1350px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-32">
          <div className="max-w-[800px]">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[12px] mb-6 block leading-none">{t('badge')}</span>
            <h2 className="text-[48px] md:text-[84px] font-display font-bold text-black tracking-tighter leading-[0.85]">
              {t('title')}
            </h2>
          </div>
          <p className="text-[18px] md:text-[22px] text-black/40 font-body max-w-[440px] font-medium leading-relaxed">
            {t('desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {zones.map((zone, index) => (
            <div
              key={index}
              className="group relative flex flex-col h-full bg-[#FAF6F0] rounded-sm overflow-hidden border border-black/5 transition-all duration-700 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-2"
            >
              {/* Image Header */}
              <div className="relative h-[280px] w-full overflow-hidden">
                <Image
                  src={zone.image}
                  alt={t(`list.${zone.key}.title`)}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-primary text-black shadow-md">
                    {zone.badge}
                  </span>
                </div>
                <div className="absolute bottom-8 left-10 right-10 flex items-end justify-between">
                  <div>
                    <h3 className="text-[28px] font-display font-bold text-white leading-tight tracking-tighter">
                      {t(`list.${zone.key}.title`).replace(/^Zone \w:\s*/i, '').replace(/^المنطقة \w:\s*/i, '').replace(/^المنطقة \S+:\s*/i, '')}
                    </h3>
                    <p className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] mt-1.5">
                      {t(`list.${zone.key}.subtitle`)}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-sm bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 shadow-sm flex-shrink-0">
                    {zone.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 md:p-12 flex flex-col flex-grow">
                <ul className="space-y-4 mb-10 flex-grow">
                  {(t.raw(`list.${zone.key}.items`) as string[]).map((item, i) => {
                    const isWarning = item.toLowerCase().includes('dogs are not allowed') || item.includes('يُمنع دخول');
                    return (
                      <li
                        key={i}
                        className={cn(
                          "flex gap-4 text-[15px] md:text-[16px] font-body font-bold leading-snug transition-colors duration-500",
                          isWarning ? "text-red-500" : "text-black/50 group-hover:text-black"
                        )}
                      >
                        {isWarning ? (
                          <div className="mt-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                        ) : (
                          <div className="mt-1.5 w-2 h-2 rounded-full bg-primary/20 flex-shrink-0 group-hover:bg-primary transition-all duration-500 shadow-sm" />
                        )}
                        {item}
                      </li>
                    );
                  })}
                </ul>

                {/* Stamp Here Circle */}
                <div className="pt-8 border-t border-black/5 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-primary/40 flex flex-col items-center justify-center bg-white/60 text-[#37352F]/40 group-hover:border-primary/80 group-hover:bg-primary/5 transition-all duration-500">
                    <span className="text-[8px] font-bold tracking-widest uppercase">Stamp</span>
                    <span className="text-[8px] font-bold tracking-widest uppercase -mt-1">Here</span>
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[11px] font-bold text-black mt-1.5 shadow-sm">{index + 1}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default AboutZones;
