'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

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
    <section className="bg-white py-[120px] md:py-[160px]" id="tickets">
      <div className="container max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="inline-flex items-center px-5 py-2 rounded-sm bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
            {t('badge')}
          </span>
          <h2 className="text-[40px] md:text-[72px] font-bold leading-[1] text-black font-display tracking-tighter">
            {t('title')}
          </h2>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1250px] mx-auto">
          {ticketTiers.map((tier, index) => (
            <div
              key={index}
              className="flex flex-col p-10 md:p-14 rounded-sm border border-black/5 bg-[#F5F5F0] text-black transition-all duration-500 hover:scale-[1.03] hover:border-black/20 h-full shadow-sm group"
            >
              <h3 className="text-[32px] md:text-[36px] font-bold mb-3 font-display text-black tracking-tight leading-none group-hover:text-primary transition-colors">
                {t(`tiers.${tier.key}.name`)}
              </h3>
              <p className="text-[14px] md:text-[15px] mb-12 font-body text-black/40 font-bold tracking-tight">
                {t(`tiers.${tier.key}.desc`)}
              </p>

              <div className="flex items-baseline gap-3 mb-12">
                <span className="text-[64px] md:text-[72px] font-bold tracking-tighter font-display text-black leading-none">
                  {tier.price}
                </span>
                <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-black/30">
                  {t('currency')}
                </span>
              </div>

              <ul className="flex flex-col gap-6 mb-16 flex-grow">
                {(t.raw(`tiers.${tier.key}.features`) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-[15px] md:text-[16px] font-bold font-body tracking-tight">
                    <div className="w-2 h-2 rounded-sm shrink-0 bg-primary shadow-sm shadow-primary/40" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={isRegistered ? "/dashboard" : `/tickets?tier=${tier.id}`}
                className={`inline-flex items-center justify-center w-full h-16 rounded-sm font-bold text-[14px] uppercase tracking-[0.2em] transition-all active:scale-95  shadow-sm  ${isRegistered
                    ? "bg-primary text-white hover:bg-black"
                    : "bg-black text-white hover:bg-primary"
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
