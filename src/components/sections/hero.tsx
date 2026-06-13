'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

// ─── Main Component ───────────────────────────────────────────────────────────
const HeroSection = () => {
  const t = useTranslations('Hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Subtle parallax on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.85;
    const onCanPlay = () => setVideoReady(true);
    v.addEventListener('canplaythrough', onCanPlay);
    return () => v.removeEventListener('canplaythrough', onCanPlay);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[#FFF2E5] flex flex-col"
      aria-label="Hero Section"
    >

      {/* ── Video Background with parallax ── */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-[115%] z-0 will-change-transform"
      >
        {/* Poster / fallback image (shown until video loads) */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
        >
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
            alt="Nova Paw Festival background"
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
          className={`w-full h-full object-cover transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/vectors/WIDE VERSION.mp4" type="video/mp4" />
        </video>

        {/* Light-mode scrim — keeps the right panel readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/30 rtl:bg-gradient-to-l" />
        {/* Bottom fade to white for seamless section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF2E5]/60 to-transparent" />
      </motion.div>

      {/* ── Top decorative bar ── */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FC7911] via-[#FBC84F] to-[#FC7911] z-30" />

      {/* ── Main Content ── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex-1 w-full flex items-center pt-[80px] md:pt-[89px] will-change-transform"
      >
        <div className="container max-w-[1330px] mx-auto px-5 md:px-8 w-full py-10 md:py-0 flex justify-center lg:justify-end">

          {/* ── Hero Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="w-full sm:max-w-[480px] lg:max-w-[440px]"
          >
            <div className="relative overflow-hidden rounded-[28px] bg-[#FBC84F]/96 backdrop-blur-xl border border-white/30 shadow-2xl shadow-black/15 p-7 md:p-8 flex flex-col gap-5">

              {/* Inner glow */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#FC7911]/20 blur-2xl pointer-events-none" />

              {/* ── Headline block ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col select-none relative"
              >
                <h1
                  className="font-display font-black leading-[0.88] tracking-tighter text-white"
                  style={{ fontSize: 'clamp(52px, 8vw, 76px)' }}
                >
                  Nova Paw
                </h1>
                <h1
                  className="font-display font-black leading-[0.88] tracking-tighter text-[#FC7911]"
                  style={{ fontSize: 'clamp(52px, 8vw, 76px)' }}
                >
                  Festival
                </h1>
              </motion.div>

              {/* ── Subtitle ── */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="text-[15px] md:text-[16px] font-bold text-[#37352F] font-display leading-[1.25] tracking-tight"
              >
                {t('subtitle')}
              </motion.p>

              {/* ── Description card ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/75 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-white/50"
              >
                <p className="text-[13px] md:text-[14px] leading-relaxed text-[#37352F] font-medium font-sans">
                  {t('description')}
                </p>
              </motion.div>

              {/* ── Date badge ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                className="flex items-center gap-2.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#465067] flex-shrink-0" />
                <div className="bg-[#465067] text-white px-4 py-2 rounded-sm text-[10px] md:text-[11px] font-bold uppercase tracking-[2px] inline-block">
                  {t('badge')}
                </div>
              </motion.div>

              {/* ── CTA Buttons ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col sm:flex-row gap-3 w-full"
              >
                {/* Primary */}
                <Link
                  href="/competitions"
                  className="group flex-1 inline-flex items-center justify-center gap-2.5 h-12 md:h-[50px] bg-[#FC7810] text-white rounded-sm font-bold uppercase tracking-[2px] text-[11px] md:text-[12px] transition-all duration-200 hover:bg-black active:scale-[0.97] shadow-sm shadow-[#FC7810]/20"
                >
                  <span>{t('cta_competitions')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                {/* Secondary */}
                <Link
                  href="/tickets"
                  className="flex-1 inline-flex items-center justify-center h-12 md:h-[50px] bg-[#465067] text-white rounded-sm font-bold uppercase tracking-[2px] text-[11px] md:text-[12px] transition-all duration-200 hover:bg-[#FC7911] active:scale-[0.97] shadow-sm shadow-[#465067]/10"
                >
                  {t('cta_tickets')}
                </Link>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-[9px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>

    </section>
  );
};

export default HeroSection;
