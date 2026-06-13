'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, MapPin, Calendar, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const t = useTranslations('Hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-dvh min-h-[680px] overflow-hidden bg-[#0d0a05]">

      {/* ── Full-screen Video Background ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
          className="w-full h-full object-cover"
          onCanPlay={() => setLoaded(true)}
        >
          <source src="/vectors/WIDE VERSION.mp4" type="video/mp4" />
        </video>

        {/* Cinematic gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a05] via-[#0d0a05]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a05]/80 via-transparent to-transparent" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* ── Animated Grain Overlay (textural depth) ── */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* ── Content Layer ── */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-16 lg:pb-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 w-full">

          {/* ── Top floating label (shown on md+) ── */}
          <div
            className={`hidden md:flex items-center gap-3 mb-8 transition-all duration-700 delay-[200ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#FC7911] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[3px] text-white/50">
              {t('video_badge_top')}
            </span>
            <div className="h-px w-12 bg-white/20" />
          </div>

          {/* ── Main headline cluster ── */}
          <div className="max-w-[860px]">
            {/* Eyebrow line */}
            <div
              className={`flex items-center gap-3 mb-4 transition-all duration-700 delay-[300ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FC7911]/20 border border-[#FC7911]/40 rounded-sm">
                <span className="text-[10px] font-black uppercase tracking-[2.5px] text-[#FC7911]">
                  Qatar's First
                </span>
              </div>
              <div className="h-px flex-1 max-w-[60px] bg-[#FC7911]/40" />
            </div>

            {/* Giant hero title */}
            <h1
              className={`font-black leading-[0.88] tracking-[-2px] text-white transition-all duration-700 delay-[400ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ fontSize: 'clamp(52px, 9vw, 120px)' }}
            >
              Nova Paw
            </h1>
            <h1
              className={`font-black leading-[0.88] tracking-[-2px] text-[#FC7911] transition-all duration-700 delay-[480ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ fontSize: 'clamp(52px, 9vw, 120px)' }}
            >
              Festival
            </h1>

            {/* Subtitle */}
            <p
              className={`mt-5 text-[15px] md:text-[17px] leading-relaxed text-white/60 max-w-[520px] font-medium transition-all duration-700 delay-[560ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              {t('subtitle')}
            </p>
          </div>

          {/* ── Bottom Action Row ── */}
          <div
            className={`mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all duration-700 delay-[680ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Primary CTA */}
            <Link
              href="/tickets"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-[#FC7911] hover:bg-[#e06a0a] text-white text-[13px] font-black uppercase tracking-[2px] rounded-sm transition-all duration-200 active:scale-[0.97] shadow-xl shadow-[#FC7911]/25"
            >
              Get Tickets
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/competitions"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white text-[13px] font-bold uppercase tracking-[2px] rounded-sm transition-all duration-200 backdrop-blur-sm"
            >
              View Competitions
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 opacity-50 group-hover:opacity-100" />
            </Link>

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 bg-white/15" />

            {/* Date + Location pills */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-white/50 text-[12px] font-semibold tracking-wide">
                <Calendar className="w-3.5 h-3.5 text-[#FC7911]" />
                27–28 Nov 2026
              </div>
              <div className="flex items-center gap-2 text-white/50 text-[12px] font-semibold tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-[#FC7911]" />
                Pet Park, The Pearl · Qatar
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row (desktop only) ── */}
        <div
          className={`hidden lg:flex absolute bottom-8 right-10 items-center gap-8 transition-all duration-700 delay-[800ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {[
            { value: '6+', label: 'Competitions' },
            { value: '10K+', label: 'Expected Visitors' },
            { value: '2', label: 'Festival Days' },
            { value: '48+', label: 'Champion Cups' },
          ].map((stat) => (
            <div key={stat.label} className="text-right">
              <div className="text-[26px] font-black leading-none text-white tabular-nums">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-white/40 mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Scroll indicator ── */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 transition-all duration-700 delay-[900ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-white/30">
            Scroll
          </span>
          <ChevronDown
            className="w-4 h-4 text-white/30 animate-bounce"
            style={{ animationDuration: '2s' }}
          />
        </div>
      </div>

      {/* ── Bottom gradient scrim ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FC7911]/30 to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
