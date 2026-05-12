'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Dog, Cat, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const ZoneSplit = () => {
    const t = useTranslations('ZoneSplit');

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-[1280px]">
                {/* Section Header */}
                <div className="mb-12 md:mb-16 max-w-[800px]">
                    <span className="inline-block bg-[#F3F3F3] text-black text-[12px] font-bold px-5 py-2 rounded-sm uppercase tracking-[0.2em] mb-8">
                        {t('badge')}
                    </span>
                    <h2 className="text-[32px] md:text-[64px] leading-[1] font-bold text-black tracking-tighter font-display">
                        {t('title')}
                    </h2>
                </div>

                {/* Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Dog Zone Card */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-primary rounded-sm p-10 md:p-14 flex flex-col justify-between min-h-[500px] overflow-hidden relative group shadow-sm border border-black/5">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white rounded-sm flex items-center justify-center mb-10 shadow-xl shadow-primary/20">
                                    <Dog className="text-primary w-10 h-10" />
                                </div>
                                <h3 className="text-white text-[32px] md:text-[48px] font-bold mb-8 font-display tracking-tight leading-none">
                                    {t('dog_title')}
                                </h3>
                                <ul className="space-y-4 mb-12">
                                    {(t.raw('dog_items') as string[]).map((item) => (
                                        <li key={item} className="flex items-center gap-4 text-white font-bold tracking-tight text-[16px] md:text-[18px]">
                                            <div className="w-6 h-6 rounded-sm bg-white/20 flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative z-10">
                                <Link
                                    href="/registration"
                                    className="inline-flex items-center justify-between gap-6 bg-black text-white px-10 py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-[13px] transition-all hover:bg-white hover:text-black active:scale-95 group/btn shadow-xl shadow-black/10"
                                >
                                    <span>{t('dog_cta')}</span>
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform rtl:rotate-180" />
                                </Link>
                            </div>
                            {/* Decorative Background Icon */}
                            <Dog className="absolute -bottom-10 -right-10 w-72 h-72 text-white/10 -rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                        </div>
                        <div className="relative h-[280px] rounded-sm overflow-hidden shadow-sm border border-black/5">
                            <Image
                                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
                                alt="Dog Competition"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Cat Zone Card */}
                    <div className="flex flex-col-reverse lg:flex-col gap-8">
                        <div className="relative h-[280px] rounded-sm overflow-hidden shadow-sm border border-black/5">
                            <Image
                                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
                                alt="Cat Show"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                        </div>
                        <div className="bg-accent rounded-sm p-10 md:p-14 flex flex-col justify-between min-h-[500px] overflow-hidden relative group shadow-sm border border-black/5">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white rounded-sm flex items-center justify-center mb-10 shadow-xl shadow-accent/20">
                                    <Cat className="text-accent w-10 h-10" />
                                </div>
                                <h3 className="text-white text-[32px] md:text-[48px] font-bold mb-8 font-display tracking-tight leading-none">
                                    {t('cat_title')}
                                </h3>
                                <ul className="space-y-4 mb-12">
                                    {(t.raw('cat_items') as string[]).map((item) => (
                                        <li key={item} className="flex items-center gap-4 text-white font-bold tracking-tight text-[16px] md:text-[18px]">
                                            <div className="w-6 h-6 rounded-sm bg-white/20 flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative z-10">
                                <Link
                                    href="/registration"
                                    className="inline-flex items-center justify-between gap-6 bg-black text-white px-10 py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-[13px] transition-all hover:bg-white hover:text-black active:scale-95 group/btn shadow-xl shadow-black/10"
                                >
                                    <span>{t('cat_cta')}</span>
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform rtl:rotate-180" />
                                </Link>
                            </div>
                            {/* Decorative Background Icon */}
                            <Cat className="absolute -bottom-10 -right-10 w-72 h-72 text-white/10 -rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ZoneSplit;
