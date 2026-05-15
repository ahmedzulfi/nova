'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Mic2,
  Dog,
  Cat,
  HeartPulse,
  Heart,
  ShoppingBag,
  Gamepad2,
  Utensils,
  Camera,
  ArrowUpRight
} from 'lucide-react';

const AboutZones = () => {
  const t = useTranslations('AboutPage.zones');

  const zones = [
    { key: "stage", icon: <Mic2 className="w-6 h-6 text-primary" />, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop", emoji: "🎤" },
    { key: "dog", icon: <Dog className="w-6 h-6 text-primary" />, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop", emoji: "🐕" },
    { key: "cat", icon: <Cat className="w-6 h-6 text-black" />, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop", emoji: "🐱" },
    { key: "vet", icon: <HeartPulse className="w-6 h-6 text-primary" />, image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=2070&auto=format&fit=crop", emoji: "🏥" },
    { key: "adoption", icon: <Heart className="w-6 h-6 text-primary" />, image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000&auto=format&fit=crop", emoji: "🐾" },
    { key: "market", icon: <ShoppingBag className="w-6 h-6 text-black" />, image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop", emoji: "🛍️" },
    { key: "kids", icon: <Gamepad2 className="w-6 h-6 text-primary" />, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/6e/e7/92/kidz-klub-danbury-toddler.jpg?w=900&h=500&s=1", emoji: "🎪" },
    { key: "food", icon: <Utensils className="w-6 h-6 text-primary" />, image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=2070&auto=format&fit=crop", emoji: "🍔" },
    { key: "photo", icon: <Camera className="w-6 h-6 text-black" />, image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop", emoji: "📸" }
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
              className="group relative flex flex-col h-full bg-[#F5F5F0] rounded-sm overflow-hidden border border-black/5 transition-all duration-700 hover: shadow-sm  hover:shadow-black/5 hover:-translate-y-2"
            >
              {/* Image Header */}
              <div className="relative h-[280px] w-full overflow-hidden">
                <Image
                  src={zone.image}
                  alt={t(`list.${zone.key}.title`)}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between">
                  <h3 className="text-[32px] font-display font-bold text-white leading-none tracking-tighter">
                    {t(`list.${zone.key}.title`)}
                  </h3>
                  <div className="w-14 h-14 rounded-sm bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20  shadow-sm ">
                    {zone.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 md:p-12 flex flex-col flex-grow">
                <ul className="space-y-5 mb-10">
                  {(t.raw(`list.${zone.key}.items`) as string[]).map((item, i) => (
                    <li key={i} className="flex gap-4 text-[15px] md:text-[16px] text-black/50 font-body font-bold leading-snug group-hover:text-black transition-colors duration-500">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-primary/20 flex-shrink-0 group-hover:bg-primary transition-all duration-500 shadow-sm" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[24px] grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110">{zone.emoji}</span>
                  <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.2em] text-[12px] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-700">
                    {t('cta')} <ArrowUpRight className="w-5 h-5 rtl:rotate-[270deg]" />
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
