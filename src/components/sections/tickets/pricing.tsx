'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface TicketsPricingProps {
  onSelect: (tier: string) => void;
  selectedTier: string;
}

const TicketsPricing = ({ onSelect, selectedTier }: TicketsPricingProps) => {
  const t = useTranslations('Tickets');

  const tiers = [
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
    <section className="pb-24 md:pb-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col p-10 md:p-14 rounded-sm border transition-all h-full duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] group ${selectedTier === tier.id
                ? 'border-primary bg-[#F5F5F0]  shadow-sm  shadow-primary/10'
                : 'border-black/5 bg-[#F5F5F0]'
                }`}
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
                {(t.raw(`tiers.${tier.key}.features`) as string[]).map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-[15px] md:text-[16px] font-bold font-body tracking-tight">
                    <div className="w-2 h-2 rounded-sm shrink-0 bg-primary shadow-sm shadow-primary/40" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onSelect(tier.id)}
                className={`inline-flex items-center justify-center w-full h-16 rounded-sm font-bold text-[14px] uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.95]  shadow-sm  ${selectedTier === tier.id
                  ? 'bg-primary text-white shadow-primary/20'
                  : 'bg-black text-white hover:bg-primary shadow-black/10'
                  }`}
              >
                {selectedTier === tier.id ? t('view_pass') : t('purchase')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TicketsPricing;
