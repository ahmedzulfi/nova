'use client';

import React, { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, useScroll, useTransform } from 'framer-motion';

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
          className="w-full h-full object-cover"
        >
          <source src="/vectors/WIDE VERSION.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Top Decorative Border ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/5 z-20" />

      {/* ── Bottom-Left Typography Stack (Cardless) ── */}
      <motion.div
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1330px] mx-auto px-6 md:px-12 pb-16 md:pb-24 flex flex-col items-start gap-6"
      >
        {/* Date / Category Tag */}
        <div className="inline-flex items-center">
          <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-[#68461d] border-b border-[#68461d]/30 pb-1">
            {t('badge')}
          </span>
        </div>

        {/* Headings */}
        <div className="max-w-[720px] flex flex-col gap-3">
          <h1 
            className="font-display font-bold leading-[0.9] tracking-tighter text-[#465067]" 
            style={{ fontSize: 'clamp(48px, 7vw, 84px)' }}
          >
            Nova Paw <span className="text-[#FC7911]">Festival</span>
          </h1>
          <p className="text-[18px] md:text-[22px] font-semibold text-[#68461d] tracking-tight leading-snug max-w-[560px]">
            {t('subtitle')}
          </p>
        </div>

        {/* Short description */}
        <p className="text-[14px] md:text-[16px] leading-relaxed text-[#666666] max-w-[520px] font-sans">
          {t('description')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
          <Link
            href="/competitions"
            className="inline-flex items-center justify-center h-12 px-8 bg-[#FC7810] hover:bg-black text-white text-[12px] font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-200 active:scale-[0.98]"
          >
            {t('cta_competitions')}
          </Link>
          <Link
            href="/tickets"
            className="inline-flex items-center justify-center h-12 px-8 border border-[#465067] hover:border-[#FC7911] text-[#465067] hover:text-[#FC7911] text-[12px] font-bold uppercase tracking-[0.2em] rounded-sm bg-white/40 backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
          >
            {t('cta_tickets')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
