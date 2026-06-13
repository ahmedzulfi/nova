'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const t = useTranslations('Hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.75;
    const onCanPlay = () => setVideoReady(true);
    v.addEventListener('canplaythrough', onCanPlay);
    return () => v.removeEventListener('canplaythrough', onCanPlay);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-black flex flex-col"
      aria-label="Nova Paw Festival Hero"
    >
      {/* ── Full-bleed video background ── */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-[115%] z-0 will-change-transform"
      >
        {/* Poster fallback */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${videoReady ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
            alt="Nova Paw Festival"
            fill
            className="object-cover"
            priority
          />
        </div>

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/vectors/WIDE VERSION.mp4" type="video/mp4" />
        </video>

        {/* Cinematic gradient scrim — heavier at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        {/* Subtle left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* ── Content — bottom-left anchored ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-16 md:pb-20 lg:pb-24 pt-[90px]">
        <div className="max-w-[1330px] mx-auto px-6 md:px-10 w-full">

          {/* Event label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="mb-5 md:mb-7"
          >
            <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
              {/* Orange dot accent */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC7911] inline-block" />
              {t('video_badge_top')}
            </span>
          </motion.div>

          {/* Massive headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="font-display font-black text-white leading-[0.9] tracking-[-0.04em] mb-6 md:mb-8 max-w-[820px]"
            style={{ fontSize: 'clamp(58px, 10vw, 108px)' }}
          >
            Nova Paw{' '}
            <span className="text-[#FBC84F]">Festival</span>
          </motion.h1>

          {/* Divider + subtitle row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12"
          >
            {/* Left: subtitle + CTAs */}
            <div className="flex flex-col gap-6 max-w-[480px]">
              <p className="text-[15px] md:text-[16px] text-white/70 leading-relaxed font-sans font-medium">
                {t('subtitle')}
              </p>

              {/* CTA row */}
              <div className="flex flex-row gap-3">
                <Link
                  href="/competitions"
                  className="inline-flex items-center justify-center h-11 px-6 bg-[#FC7911] hover:bg-[#FBC84F] text-white hover:text-black rounded-sm font-bold uppercase tracking-[0.18em] text-[11px] transition-all duration-200 active:scale-[0.97]"
                >
                  {t('cta_competitions')}
                </Link>
                <Link
                  href="/tickets"
                  className="inline-flex items-center justify-center h-11 px-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 rounded-sm font-bold uppercase tracking-[0.18em] text-[11px] transition-all duration-200 active:scale-[0.97] backdrop-blur-sm"
                >
                  {t('cta_tickets')}
                </Link>
              </div>
            </div>

            {/* Right: date + description — horizontal separator */}
            <div className="hidden md:flex items-start gap-8 md:border-l md:border-white/15 md:pl-10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/40 font-bold">Date</span>
                <span className="text-[14px] font-bold text-white/80 tracking-tight font-display">
                  {t('badge')}
                </span>
              </div>
              <div className="w-px h-10 bg-white/10 self-center" />
              <div className="flex flex-col gap-1 max-w-[220px]">
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/40 font-bold">Event</span>
                <span className="text-[13px] text-white/60 leading-snug font-sans">
                  {t('description')}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Mobile: date strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="md:hidden mt-6 pt-5 border-t border-white/10"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
              {t('badge')}
            </span>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 right-8 md:right-12 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
        />
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold rotate-90 origin-center mt-2">
          Scroll
        </span>
      </motion.div>

    </section>
  );
};

export default HeroSection;
