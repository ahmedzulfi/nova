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

const AboutZones = () => {
  const t = useTranslations('AboutPage.zones');

  const zones = [
    { key: "zone_a", badge: "ZONE A", icon: <HeartPulse className="w-6 h-6 text-primary" />, image: "https://lh3.googleusercontent.com/aida/ADBb0ug3FTyX27bIQDtqPyiLbQsJbt0y3qVYmcHqFkqLIcnPpr97EIkERxs5yMnv3nE_1THtxKA2IX6VbzB7ZOtQYeiTHpTuvXJZa4ZCGd7X39T8EE-O_SlnpHVc6vQiYnZhOOW1NeeIWSiGKYdJGJnhUhkZ0dbDaFHUvlAgPq-C41pE54MPMPK3MqQAig_55PwdOi92mqm5U5_riep-xULLmU-GXvSpHy47lKsEJH9R5Yze0gMwS4sC9ubbabs", emoji: "🏥" },
    { key: "zone_b", badge: "ZONE B", icon: <Heart className="w-6 h-6 text-primary" />, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3EMI-j7Z2B5SM6-op-XWAPi88Fwxmp1CfGuJtCz-BMg-x9LqWdPX7J5o_Yy0pkh6Y3LXrOf_6XHgUWMBBB9yOKSrMnVbjBa19ZSljQabTc8epS6d_iU62oJRruToK--yWGE3OxvfYSYbx4aopAUAKwLmw9ov0wjQgShpUoXt-1ZTP4iSFuSXnLW4E03uFpbUfX3k0GNc466YQV7fCiSJXaBMCPW50Eg9j_mDoGeiK6ONJAFXJDkwWzNsn6Fzj8aO7x1-jtpaa1RI", emoji: "🐾" },
    { key: "zone_c", badge: "ZONE C", icon: <Gamepad2 className="w-6 h-6 text-primary" />, image: "https://lh3.googleusercontent.com/aida/ADBb0ugiluHjNAeT5lpEkjah5_R_VNqXk2P6y4r7ZNQMiUwKXByjt9N0ECHgGWkSS861YvRpA8kCGKf7dVbzTQDfbMOfsd3tJviXM_Zc59AtrpCFIMPikG0VEQQ-8860m0dCE5sFGOu1QhO6CnJt9ReiWoXmcWJ5iDEHrcIQCO4-KPYWatifgAE3bG6DrvnZV48kF4f_4GY3RjulKOz6DRcsyl2gKP59socjMz3Cehp1XAenJ4mU9nRRNwJ1Ols", emoji: "🎪" },
    { key: "zone_d", badge: "ZONE D", icon: <Utensils className="w-6 h-6 text-primary" />, image: "https://lh3.googleusercontent.com/aida/ADBb0uhYp1zQ_ZQEUtqghBnvNaEm9Omvhumjj91pO2dqvRu6i2uuQ1Kqx9h8koXi5ARZqnFftkx7KqCCybDyJZZxmqUjKB3mwyWZP6Ly7jvUVyEORrHkD1R9M9kBsaEkH0QeXtFy-PS-75-0LIxzRxrFfJ0jTUVX7n7jifhXKks_zmrxvDV8UszB3rlV2SYiCAJWlH7aEV18wooeQa-7gCGSGNSmXd4xd3w8lP4OtN-G8e21_iZzeonEzvSKs3w", emoji: "🍔" },
    { key: "zone_e", badge: "ZONE E", icon: <Cat className="w-6 h-6 text-primary" />, image: "https://lh3.googleusercontent.com/aida/ADBb0ujYmhd4CKNi2Ii5-Di4wM67sbXMtTWAo71Av766TMaH-jPwwCikM4NfyszjPIVdhFMFQtrUtkhGJzHz81GOGuZ58ju24awPBn0648kQszIpYsGtgSa27bg0JZcXerKG2LyZRK8AkTv4rTZeUrwOpPbsmlEZb33NOyBDeSZvIm8-3vEse-X9oPL0OGyz10t-LrH7iadeLWI1JuMbR-Ha_WDa4odtbbotaTlx0vbMATjFhvB8HDWvcxAB9_Q", emoji: "🐱" },
    { key: "zone_f", badge: "ZONE F", icon: <Camera className="w-6 h-6 text-primary" />, image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop", emoji: "📸" }
  ];

  return (
    <section className="py-24 md:py-40 bg-white" id="zones">
      <div className="container mx-auto px-6 max-w-[1350px]">
        {/* Header */}
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

        {/* 3x3 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {zones.map((zone, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col h-full bg-[#FAF6F0] rounded-sm overflow-hidden border border-black/5 transition-all duration-700 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2"
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
                    <p className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] mt-1.5 font-display">
                      {t(`list.${zone.key}.subtitle`)}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-sm bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 shadow-xl flex-shrink-0">
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
                        className={`flex gap-4 text-[15px] md:text-[16px] font-body font-bold leading-snug transition-colors duration-500 ${
                          isWarning ? "text-red-500" : "text-black/50 group-hover:text-black"
                        }`}
                      >
                        {isWarning ? (
                          <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                        ) : (
                          <div className="mt-1.5 w-2 h-2 rounded-full bg-primary/20 flex-shrink-0 group-hover:bg-primary transition-all duration-500 shadow-sm" />
                        )}
                        {item}
                      </li>
                    );
                  })}
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
