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
      className="relative w-full min-h-[100dvh] overflow-hidden bg-black flex flex-col items-center justify-center"
      aria-label="Nova Paw Festival Hero"
    >
      {/* ── Full-bleed video ── */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-[115%] z-0 will-change-transform"
      >
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

        {/* Dark scrim over video */}
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* ── Centered content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[900px] mx-auto pt-[89px]">

        {/* Event tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 rounded-sm text-[10px] font-bold uppercase tracking-[0.28em] text-white/70 backdrop-blur-sm bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC7911] inline-block" />
            {t('video_badge_top')}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-playfair italic font-semibold text-white leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: 'clamp(54px, 10vw, 110px)' }}
        >
          Nova Paw{' '}
          <span className="text-[#FBC84F]">Festival</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="text-[16px] md:text-[18px] text-white/65 leading-relaxed font-sans font-medium max-w-[560px] mb-4"
        >
          {t('subtitle')}
        </motion.p>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          className="mb-10"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#FBC84F]/80">
            {t('badge')}
          </span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <Link
            href="/competitions"
            className="inline-flex items-center justify-center h-12 px-8 bg-[#FC7911] hover:bg-[#FBC84F] text-white hover:text-black rounded-sm font-bold uppercase tracking-[0.2em] text-[12px] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#FC7911]/25"
          >
            {t('cta_competitions')}
          </Link>
          <Link
            href="/tickets"
            className="inline-flex items-center justify-center h-12 px-8 bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/50 rounded-sm font-bold uppercase tracking-[0.2em] text-[12px] transition-all duration-200 active:scale-[0.97] backdrop-blur-sm"
          >
            {t('cta_tickets')}
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/50 to-white/0"
        />
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Scroll</span>
      </motion.div>

    </section>
  );
};

export default HeroSection;
