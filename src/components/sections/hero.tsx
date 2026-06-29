'use client';

import React, { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Ticket } from 'lucide-react';

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
          Refined Black Scrim:
          Ensures the buttons stand out beautifully.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-1" />
      </motion.div>

      {/* ── Centered CTA Buttons ── */}
      <motion.div
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1330px] mx-auto px-6 md:px-12 pb-24 md:pb-36 flex flex-col items-center justify-center will-change-transform"
      >
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/competitions"
            className="inline-flex items-center justify-center h-12 px-8 border border-white/20 hover:border-white text-white text-[12px] font-bold uppercase tracking-[0.2em] rounded-full bg-white/10 backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
          >
            {t('cta_competitions')}
          </Link>
          <Link
            href="/tickets"
            className="inline-flex items-center justify-center gap-2.5 h-12 px-8 bg-[#FC7810] hover:bg-white hover:text-black text-white rounded-full font-bold uppercase tracking-[0.2em] text-[12px] transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#FC7810]/20"
          >
            <Ticket className="w-4 h-4" />
            {t('cta_tickets')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
