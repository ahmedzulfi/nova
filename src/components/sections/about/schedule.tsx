'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const AboutSchedule = () => {
  const t = useTranslations('AboutPage.schedule');
  const [activeDay, setActiveDay] = useState(1);

  const days = [
    { id: 1, key: 'day1' },
    { id: 2, key: 'day2' }
  ];

  const currentEvents = t.raw(`days.day${activeDay}.events`) as any[];

  return (
    <section className="py-24 md:py-40 bg-white" id="schedule">
      <div className="container mx-auto px-6 max-w-[1350px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-x-32 items-start">

          {/* Left Column: Sticky Navigation */}
          <div className="flex flex-col gap-10 md:sticky md:top-32">
            <div>
              <span className="inline-flex items-center px-6 py-2 rounded-full bg-[#F5F5F0] text-black text-[11px] font-bold uppercase tracking-[0.3em] border border-black/5 shadow-sm">
                {t('badge')}
              </span>
            </div>

            <div className="flex flex-row lg:flex-col gap-5 overflow-x-auto lg:overflow-x-visible pb-6 lg:pb-0 no-scrollbar">
              {days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setActiveDay(day.id)}
                  className={`text-left rtl:text-right px-8 py-6 rounded-sm transition-all duration-500 min-w-[260px] lg:min-w-0 shadow-sm border ${activeDay === day.id
                      ? 'bg-black text-white border-black scale-[1.02]  shadow-sm  shadow-black/20'
                      : 'bg-[#F5F5F0] text-black border-black/5 hover:bg-black/5'
                    }`}
                >
                  <span className={`block text-[12px] uppercase tracking-[0.3em] font-bold mb-2 transition-opacity ${activeDay === day.id ? 'opacity-40' : 'opacity-20'}`}>
                    {t(`days.${day.key}.label`)}
                  </span>
                  <span className="block text-[22px] font-bold font-display leading-[1.1] tracking-tight whitespace-nowrap">
                    {t(`days.${day.key}.date`)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Events List */}
          <div className="flex flex-col mt-16 lg:mt-0">
            <h2 className="text-[48px] md:text-[84px] font-display font-bold leading-[0.85] text-black mb-16 tracking-tighter">
              {t('title')}
            </h2>

            <div className="flex flex-col relative min-h-[700px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {currentEvents.map((item, index) => (
                    <div
                      key={index}
                      className={`py-12 group ${index !== 0 ? 'border-t border-black/5' : ''}`}
                    >
                      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16">
                        <span className="text-[20px] font-bold text-primary min-w-[120px] font-display tracking-tight pt-1">
                          {item.time}
                        </span>
                        <div className="flex flex-col gap-4">
                          <h4 className="text-[28px] md:text-[36px] font-display font-bold text-black leading-none tracking-tighter group-hover:text-primary transition-all duration-500">
                            {item.title}
                          </h4>
                          <p className="text-[17px] md:text-[19px] leading-[1.6] text-black/40 max-w-[680px] font-body font-medium">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-20 pt-16 border-t border-black/5">
              <a
                className="inline-flex items-center justify-center h-18 px-12 bg-black text-white rounded-full font-bold text-[14px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-primary hover:scale-105 active:scale-95  shadow-sm  shadow-black/10"
                href="/tickets"
              >
                {t('cta')}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSchedule;
