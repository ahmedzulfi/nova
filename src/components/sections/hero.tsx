'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

/**
 * HeroSection - Nova Paw Festival
 *
 * Design: Full-bleed video background with bold display typography.
 * Layout: Large title anchored bottom-left, event details in a bottom bar,
 *         CTA in bottom-right corner — cinematic festival poster aesthetic.
 * Motion: Staggered content reveal on mount (title, details, CTA).
 */
const HeroSection = () => {
  const t = useTranslations('Hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ minHeight: '100dvh' }}
    >
      {/* ── Video Background ─────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          poster="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/vectors/WIDE VERSION.mp4" type="video/mp4" />
        </video>

        {/* Multi-layer gradient vignette for text legibility */}
        {/* Bottom-up dark gradient (anchor area) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />
        {/* Left edge scrim for text pop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col justify-between h-full"
        style={{ minHeight: '100dvh' }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >

        {/* Top: Event tag pill */}
        <motion.div
          variants={fadeIn}
          className="flex items-start justify-between pt-28 md:pt-32 px-6 md:px-12 xl:px-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#FC7911] text-white px-4 py-1.5 rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Qatar 2026</span>
          </div>

          {/* Scroll hint on desktop */}
          <div className="hidden lg:flex flex-col items-center gap-2 text-white/40 mt-2">
            <span className="text-[9px] uppercase tracking-[0.3em] rotate-90 origin-center mt-6">Scroll</span>
            <div className="w-px h-12 bg-white/20 mt-2" />
          </div>
        </motion.div>

        {/* Bottom: Main title + info bar */}
        <div className="px-6 md:px-10 xl:px-14 pb-10 md:pb-14">

          {/* ── Giant title ─────────────────────────────── */}
          <motion.div variants={fadeUp} className="mb-8 md:mb-10">
            {/* Eyebrow */}
            <p className="text-[#FBC84F] text-[11px] font-bold uppercase tracking-[0.35em] mb-4 md:mb-5">
              {t('video_badge_top')}
            </p>

            {/* Display headline */}
            <h1 className="font-display font-bold text-white leading-[0.88] tracking-tighter">
              <span className="block text-[13vw] md:text-[10vw] lg:text-[9vw] xl:text-[8.5vw]">
                Nova Paw
              </span>
              <span className="block text-[13vw] md:text-[10vw] lg:text-[9vw] xl:text-[8.5vw] text-[#FC7911]">
                Festival
              </span>
            </h1>
          </motion.div>

          {/* ── Bottom bar: info + CTAs ──────────────────── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8"
          >
            {/* Left: Subtitle + meta */}
            <div className="flex flex-col gap-4 max-w-md">
              <p className="text-white/75 text-[15px] md:text-[17px] font-medium leading-snug">
                {t('subtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-white/50">
                  <Calendar className="w-3.5 h-3.5 text-[#FBC84F]" strokeWidth={2} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em]">27-28 Nov 2026</span>
                </div>
                <div className="w-px h-4 bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-2 text-white/50">
                  <MapPin className="w-3.5 h-3.5 text-[#FBC84F]" strokeWidth={2} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em]">Pet Park, The Pearl · Qatar</span>
                </div>
              </div>
            </div>

            {/* Right: CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/tickets"
                className="group inline-flex items-center justify-center gap-2.5 h-[52px] px-7 bg-[#FC7810] hover:bg-white transition-all duration-300 active:scale-[0.97] text-white hover:text-black rounded-sm text-[11px] font-bold uppercase tracking-[0.22em]"
              >
                Get Tickets
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>

              <Link
                href="/competitions"
                className="inline-flex items-center justify-center h-[52px] px-7 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-300 active:scale-[0.97] text-white rounded-sm text-[11px] font-bold uppercase tracking-[0.22em]"
              >
                Competitions
              </Link>
            </div>
          </motion.div>

          {/* ── Divider line ────────────────────────────── */}
          <motion.div
            variants={fadeIn}
            className="mt-8 w-full h-px bg-white/10"
          />

          {/* ── Bottom meta strip ───────────────────────── */}
          <motion.div
            variants={fadeIn}
            className="mt-5 flex flex-wrap items-center justify-between gap-3"
          >
            <p className="text-white/35 text-[10px] uppercase tracking-[0.25em]">
              {t('video_badge_bottom')}
            </p>
            <div className="flex items-center gap-3">
              {['WKU Judged', 'WCF Certified', 'International'].map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 border border-white/10 px-2.5 py-1 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Animated scroll indicator ──────────────────── */}
      <div className="absolute bottom-10 right-6 md:right-12 z-20 hidden md:flex flex-col items-center gap-2">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-white/10 overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white/60"
            style={{ height: '30%' }}
            animate={{ y: ['0%', '300%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
