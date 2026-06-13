'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Ticket } from 'lucide-react';

const HeroSection = () => {
  const t = useTranslations('Hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.85;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[#FFF2E5] flex items-end"
      aria-label="Hero Section"
    >
      {/* ── Video Background with parallax ── */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-[112%] z-0 will-change-transform"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
          className="w-full h-full object-cover scale-[1.15]"
        >
          <source src="/vectors/WIDE VERSION.mp4" type="video/mp4" />
        </video>

        {/* 
          Refined Black Gradient Scrim:
          Ensures the bottom text overlay is highly legible against a premium dark overlay.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 z-1" />
      </motion.div>

      {/* ── Top Decorative Border ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 z-20" />

      {/* ── Bottom Split-Screen Typographic Layout ── */}
      <motion.div
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1330px] mx-auto px-6 md:px-12 pb-12 md:pb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 md:gap-6 will-change-transform"
      >
        {/* Left Column: Metadata & Title & Subtitle */}
        <div className="flex flex-col items-start gap-4 max-w-[640px]">
          
          {/* Metadata Block */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-white/90">
              <Calendar className="w-4 h-4 text-[#FBC84F] shrink-0" />
              <span className="text-[11px] md:text-[12px] font-mono uppercase tracking-[0.2em]">
                {t('badge')}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-white/90">
              <MapPin className="w-4 h-4 text-[#FBC84F] shrink-0" />
              <span className="text-[11px] md:text-[12px] font-mono uppercase tracking-[0.2em]">
                Pet Park, The Pearl - Qatar
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="flex flex-col select-none mt-2">
            <h1 
              className="font-display font-black leading-[0.9] tracking-tighter text-white" 
              style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}
            >
              Nova Paw <span className="text-[#FC7911]">Festival</span>
            </h1>
          </div>

          {/* Subtitle / Description */}
          <p className="text-[14px] md:text-[16px] leading-relaxed text-white/70 max-w-[500px] font-sans">
            {t('description')}
          </p>
        </div>

        {/* Right Column: CTA Buttons & Social Proof */}
        <div className="flex flex-col items-start md:items-end gap-6 relative shrink-0">
          
          {/* Hand-drawn Arrow pointing to the tickets button */}
          <div className="absolute -top-14 -left-12 hidden lg:block text-[#FC7911] animate-pulse pointer-events-none">
            <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-[15deg]">
              <path d="M10 40 C 25 15, 35 45, 45 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M38 22 L45 20 L44 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
              href="/competitions"
              className="inline-flex items-center justify-center h-12 px-6 border border-white/20 hover:border-white text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full bg-white/10 backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
            >
              {t('cta_competitions')}
            </Link>
            <Link
              href="/tickets"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-[#FC7810] hover:bg-white hover:text-black text-white rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-200 active:scale-[0.98]"
            >
              <Ticket className="w-3.5 h-3.5" />
              {t('cta_tickets')}
            </Link>
          </div>

          {/* Social Proof (Avatar Row + Joined Count) */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5 rtl:space-x-reverse">
              <div className="relative w-8 h-8 rounded-full border border-white overflow-hidden shrink-0">
                <Image 
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=100&auto=format&fit=crop" 
                  alt="Pet" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="relative w-8 h-8 rounded-full border border-white overflow-hidden shrink-0">
                <Image 
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=100&auto=format&fit=crop" 
                  alt="Pet" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="relative w-8 h-8 rounded-full border border-white overflow-hidden shrink-0">
                <Image 
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=100&auto=format&fit=crop" 
                  alt="Pet" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>
            <span className="text-[11px] font-semibold text-white/80 uppercase tracking-widest font-mono">
              2,000+ pet lovers joined
            </span>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
