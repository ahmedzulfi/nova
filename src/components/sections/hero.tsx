'use client';

import React, { useRef, useEffect } from 'react';
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
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.85;
  }, []);

  const badgeParts = t('badge').split('·');
  const dateStr = badgeParts[0]?.trim();
  const locationStr = badgeParts.slice(1).join('·').trim() || 'Pet Park, The Pearl - Qatar';

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-white flex items-end"
      aria-label="Hero Section"
    >
      {/* ── Video Background with parallax ── */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-[110%] z-0 will-change-transform"
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
          Premium Monochromatic Dark Overlay:
          Ensures absolute readability while keeping the look clean and cinematic.
        */}
        <div className="absolute inset-0 bg-black/55 z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-1" />
      </motion.div>

      {/* ── Bottom Split-Screen Typographic Layout ── */}
      <motion.div
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1330px] mx-auto px-6 md:px-12 pb-16 md:pb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12 will-change-transform"
      >
        {/* Left Column: Metadata & Title & Description */}
        <div className="flex flex-col items-start gap-5 max-w-[680px]">
          
          {/* Metadata Block */}
          <div className="flex flex-col gap-1.5 border-l-2 border-[#FC7911] pl-4">
            <div className="flex items-center gap-2 text-white/95">
              <Calendar className="w-3.5 h-3.5 text-[#FBC84F] shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-medium">
                {dateStr}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-white/60 shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-medium">
                {locationStr}
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 
            className="font-display font-bold leading-[0.95] tracking-tighter text-white" 
            style={{ fontSize: 'clamp(44px, 7.5vw, 84px)' }}
          >
            Nova Paw <span className="text-[#FC7911]">Festival</span>
          </h1>

          {/* Description */}
          <p className="text-[14px] md:text-[15px] leading-relaxed text-white/70 max-w-[500px] font-sans font-medium">
            {t('description')}
          </p>
        </div>

        {/* Right Column: CTA Buttons */}
        <div className="flex items-center gap-4 shrink-0 pb-1 w-full sm:w-auto">
          <Link
            href="/competitions"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center h-12 px-6 border border-white/20 hover:border-white text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-200 active:scale-[0.98] bg-white/5 hover:bg-white/10 backdrop-blur-sm"
          >
            {t('cta_competitions')}
          </Link>
          <Link
            href="/tickets"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#FC7810] hover:bg-white hover:text-black text-white rounded-sm font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-200 active:scale-[0.98]"
          >
            <Ticket className="w-3.5 h-3.5" />
            {t('cta_tickets')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
