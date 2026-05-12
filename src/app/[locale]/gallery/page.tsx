"use client";

import React from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import VenuesGrid from "@/components/sections/gallery/venues-grid";
import HighlightsGrid from "@/components/sections/gallery/highlights-grid";
import { Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function GalleryPage() {
  const t = useTranslations('Gallery');

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-10 lg:pt-48 lg:pb-20">
        <div className="container mx-auto px-6 max-w-[1280px] text-center">
          <span className="inline-block bg-[#F5F5F0] text-black text-[12px] font-bold px-5 py-2 rounded-sm uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {t('badge')}
          </span>
          <h1 className="text-[48px] md:text-[84px] font-bold font-display leading-[1] text-black mb-10 tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 whitespace-pre-line">
            {t('title')}
          </h1>
          <p className="text-[18px] md:text-[20px] text-black/50 leading-[1.6] max-w-[700px] mx-auto font-medium font-body animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            {t('desc')}
          </p>
        </div>
      </section>

      {/* Venues Grid */}
      <VenuesGrid />

      {/* Highlights Grid */}
      <HighlightsGrid />

      {/* Social CTA */}
      <section className="py-24 bg-primary text-black overflow-hidden relative border-y border-black/5">
        <div className="container mx-auto px-6 max-w-[1280px] text-center relative z-10">
          <h3 className="text-[36px] md:text-[64px] font-display font-bold mb-8 tracking-tighter leading-none">
            {t('social_title')}
          </h3>
          <p className="text-black/60 text-[18px] md:text-[22px] mb-12 max-w-[640px] mx-auto leading-relaxed font-bold tracking-tight">
            {t.rich('social_desc', {
              hashtag: (chunks) => <span className="text-black underline decoration-black/20">{chunks}</span>
            })}
          </p>
          <a
            href="https://www.instagram.com/nova_paw_festival/"
            target="_blank"
            className="inline-flex items-center gap-4 bg-black text-white px-12 py-6 rounded-sm font-bold text-[14px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black active:scale-95 shadow-2xl shadow-black/20"
          >
            <Instagram className="w-5 h-5" />
            {t('social_cta')}
          </a>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[150px] -mr-80 -mt-80" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[130px] -ml-60 -mb-60" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
