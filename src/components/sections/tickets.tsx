'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Tickets = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const t = useTranslations('Tickets');

  useEffect(() => {
    const registration = localStorage.getItem('nova_registration');
    if (registration) {
      setIsRegistered(true);
    }
  }, []);

  const ticketTiers = [
    {
      id: "dog-owner",
      key: "dog",
      price: "45"
    },
    {
      id: "cat-owner",
      key: "cat",
      price: "45"
    },
    {
      id: "adult",
      key: "adult",
      price: "45"
    }
  ];

  return (
    <section className="bg-[#FBC84F] py-[120px] md:py-[160px] relative overflow-hidden z-10" id="tickets">
      {/* Decorative Background Assets from Figma */}
      <div className="absolute left-[-150px] top-[10%] w-[350px] h-[350px] opacity-20 pointer-events-none hidden xl:block select-none">
        <Image src="/vectors/White_paw_print 1-1.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute right-[-150px] top-[40%] w-[350px] h-[350px] opacity-20 pointer-events-none hidden xl:block select-none transform rotate-[45deg]">
        <Image src="/vectors/White_paw_print 2.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute left-6 bottom-6 w-[200px] h-[200px] opacity-95 pointer-events-none hidden md:block select-none">
        <Image src="/vectors/pets 1.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute right-6 bottom-6 w-[200px] h-[200px] opacity-95 pointer-events-none hidden md:block select-none">
        <Image src="/vectors/black-cat 1.png" alt="" fill className="object-contain" />
      </div>

      <div className="container max-w-[1280px] mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="inline-flex items-center px-5 py-2 rounded-sm bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
            {t('badge')}
          </span>
          <h2 className="text-[40px] md:text-[72px] font-bold leading-[1] text-[#465067] font-display tracking-tighter">
            {t('title')}
          </h2>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1250px] mx-auto">
          {ticketTiers.map((tier, index) => (
            <div
              key={index}
              className="flex flex-col p-10 md:p-14 rounded-sm border border-black/5 bg-[#F5F5F0] text-[#465067] transition-all duration-500 hover:scale-[1.03] hover:border-black/20 h-full shadow-sm group"
            >
              <h3 className="text-[32px] md:text-[36px] font-bold mb-3 font-display text-[#465067] tracking-tight leading-none group-hover:text-[#FC7911] transition-colors">
                {t(`tiers.${tier.key}.name`)}
              </h3>
              <p className="text-[14px] md:text-[15px] mb-12 font-body text-[#465067]/60 font-bold tracking-tight">
                {t(`tiers.${tier.key}.desc`)}
              </p>

              <div className="flex items-baseline gap-3 mb-12">
                <span className="text-[64px] md:text-[72px] font-bold tracking-tighter font-display text-[#465067] leading-none">
                  {tier.price}
                </span>
                <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#465067]/40">
                  {t('currency')}
                </span>
              </div>

              <ul className="flex flex-col gap-6 mb-16 flex-grow">
                {(t.raw(`tiers.${tier.key}.features`) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-[15px] md:text-[16px] font-bold font-body tracking-tight">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0 bg-[#FC7911] shadow-sm shadow-[#FC7911]/30" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={isRegistered ? "/dashboard" : `/tickets?tier=${tier.id}`}
                className={`inline-flex items-center justify-center w-full h-16 rounded-sm font-bold text-[14px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-sm ${isRegistered
                    ? "bg-[#FC7911] text-white hover:bg-[#465067]"
                    : "bg-[#465067] text-white hover:bg-[#FC7911]"
                  }`}
              >
                {isRegistered ? t('view_pass') : t('purchase')}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Tickets;
