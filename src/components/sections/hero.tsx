'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const t = useTranslations('Hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Subtle parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

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
      {/* ── Video Background ── */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-[115%] z-0 will-change-transform"
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

        {/* Minimalist Light-Mode Scrim */}
        <div className="absolute inset-0 bg-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-black/10" />
      </motion.div>

      {/* ── Bottom Left Clean Content Panel ── */}
      <motion.div
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1330px] mx-auto px-6 md:px-12 pb-10 md:pb-16 flex justify-start pointer-events-none"
      >
        <div className="w-full max-w-[540px] bg-white/95 backdrop-blur-md border border-[#E6E6E6] rounded-sm p-8 md:p-10 shadow-sm pointer-events-auto flex flex-col gap-6">
          
          {/* Tag / Badge */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] bg-[#FBC84F]/20 text-[#68461d] px-2.5 py-1 rounded-sm">
              {t('badge')}
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-1">
            <h1 className="font-display font-bold leading-[0.95] tracking-tighter text-[#465067]" style={{ fontSize: 'clamp(44px, 6vw, 64px)' }}>
              Nova Paw <span className="text-[#FC7911]">Festival</span>
            </h1>
            <p className="text-[15px] md:text-[17px] font-semibold text-[#68461d] tracking-tight leading-snug mt-1">
              {t('subtitle')}
            </p>
          </div>

          {/* Divider */}
          <div className="h-[1px] w-full bg-[#E6E6E6]" />

          {/* Description */}
          <p className="text-[14px] md:text-[15px] leading-relaxed text-[#666666] font-sans">
            {t('description')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/competitions"
              className="inline-flex items-center justify-center h-12 px-6 bg-[#FC7810] hover:bg-black text-white text-[12px] font-bold uppercase tracking-[0.15em] rounded-sm transition-all duration-200 active:scale-[0.98]"
            >
              {t('cta_competitions')}
            </Link>
            <Link
              href="/tickets"
              className="inline-flex items-center justify-center h-12 px-6 border border-[#E6E6E6] hover:border-[#FC7911] text-[#465067] hover:text-[#FC7911] text-[12px] font-bold uppercase tracking-[0.15em] rounded-sm bg-white transition-all duration-200 active:scale-[0.98]"
            >
              {t('cta_tickets')}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
