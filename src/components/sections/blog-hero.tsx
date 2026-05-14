'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

const BlogHero: React.FC = () => {
  const t = useTranslations('BlogPage.hero');

  const avatars = [
    {
      url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop",
      className: "top-[15%] left-[22%] w-[84px] h-[84px] md:w-[100px] md:h-[100px]",
    },
    {
      url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
      className: "top-[12%] right-[22%] w-[84px] h-[84px] md:w-[100px] md:h-[100px]",
    },
    {
      url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1988&auto=format&fit=crop",
      className: "top-[40%] left-[10%] w-[90px] h-[90px] md:w-[110px] md:h-[110px]",
    },
    {
      url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop",
      className: "top-[40%] right-[10%] w-[88px] h-[88px] md:w-[108px] md:h-[108px]",
    },
    {
      url: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2186&auto=format&fit=crop",
      className: "bottom-[12%] left-[22%] w-[94px] h-[94px] md:w-[114px] md:h-[114px]",
    },
    {
      url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
      className: "bottom-[15%] right-[22%] w-[94px] h-[94px] md:w-[114px] md:h-[114px]",
    },
  ];

  return (
    <section className="relative overflow-hidden pt-[180px] pb-[100px] md:pt-[220px] md:pb-[140px] bg-white">
      {/* Floating Images */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`absolute rounded-full overflow-hidden border-4 border-white shadow-2xl transition-transform duration-1000 hover:scale-110 ${avatar.className}`}
          >
            <Image
              src={avatar.url}
              alt="Pet"
              fill
              className="object-cover"
              sizes="120px"
              priority
            />
          </div>
        ))}
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="flex flex-col items-center justify-center text-center max-w-[1000px] mx-auto">
          {/* Badge */}
          <span className="inline-block bg-[#F5F5F0] text-black text-[12px] font-bold px-6 py-2 rounded-full uppercase tracking-[0.3em] mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm border border-black/5">
            Stories & Guides
          </span>

          {/* Headline */}
          <h1 className="mb-8 text-[48px] md:text-[94px] font-bold font-display leading-[0.9] tracking-tighter text-black animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            {t('title')}
          </h1>

          {/* Descriptive Paragraph */}
          <p className="mb-12 text-[18px] md:text-[22px] leading-[1.6] text-black/40 max-w-[720px] font-medium font-body animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            {t('desc')}
          </p>

          {/* CTA Button */}
          <Link
            href="/registration"
            className="group flex items-center justify-center px-12 py-6 bg-black hover:bg-black/90  rounded-sm  transition-all duration-300 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300 shadow-2xl hover:scale-105 active:scale-95"
          >
            <span className="text-[18px] font-bold text-white mr-4 rtl:mr-0 rtl:ml-4">
              Register Your Pet
            </span>
            <ArrowRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
