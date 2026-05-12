'use client';

import React from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('PrivacyPage');

  const sectionKeys = ['collection', 'usage', 'security'];

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 max-w-[800px]">
          <div className="mb-16">
            <h1 className="text-[48px] md:text-[64px] font-bold font-display leading-[1] text-black mb-6 tracking-tighter">
              {t('title')}
            </h1>
            <p className="text-[16px] text-black/40 font-medium">
              {t('last_updated')}
            </p>
          </div>

          <div className="space-y-12">
            {sectionKeys.map((key) => (
              <div key={key} className="space-y-4">
                <h2 className="text-[24px] font-bold font-display text-black rtl:text-right">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="text-[18px] text-black/60 leading-relaxed font-body rtl:text-right">
                  {t(`sections.${key}.content`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
