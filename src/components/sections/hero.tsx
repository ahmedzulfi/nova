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
    const timer = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-dvh min-h-[680px] overflow-hidden bg-[#FFF2E5]">

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

        {/* Light overlay layers — warm & airy */}
        {/* Bottom-up: strong warm-peach scrim so text on left is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF2E5]/95 via-[#FFF2E5]/40 to-[#FFF2E5]/10" />
        {/* Left-side content zone: warm white gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF2E5]/90 via-[#FFF2E5]/40 to-transparent" />
        {/* Subtle warm vignette at top for nav area readability */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FFF2E5]/30 to-transparent" />
      </div>

      {/* ── Content Layer ── */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-16 lg:pb-20">
        <div className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12 w-full">

          {/* ── Top label strip ── */}
          <div
            className={`hidden md:flex items-center gap-3 mb-8 transition-all duration-700 delay-[200ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#FC7911]" />
            <span className="text-[11px] font-bold uppercase tracking-[3px] text-[#465067]/60">
              {t('video_badge_top')}
            </span>
            <div className="h-px w-10 bg-[#465067]/20" />
          </div>

          {/* ── Main headline cluster ── */}
          <div className="max-w-[780px]">
            {/* Eyebrow badge */}
            <div
              className={`flex items-center gap-3 mb-5 transition-all duration-700 delay-[300ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FC7911]/10 border border-[#FC7911]/25 rounded-sm">
                <span className="text-[10px] font-black uppercase tracking-[2.5px] text-[#FC7911]">
                  Qatar's First International Pet Festival
                </span>
              </div>
            </div>

            {/* Giant hero title — dark on light */}
            <h1
              className={`font-black leading-[0.88] tracking-[-2px] text-[#1a1209] transition-all duration-700 delay-[400ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ fontSize: 'clamp(52px, 8.5vw, 110px)' }}
            >
              Nova Paw
            </h1>
            <h1
              className={`font-black leading-[0.88] tracking-[-2px] text-[#FC7911] transition-all duration-700 delay-[480ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ fontSize: 'clamp(52px, 8.5vw, 110px)' }}
            >
              Festival
            </h1>

            {/* Subtitle */}
            <p
              className={`mt-6 text-[15px] md:text-[17px] leading-relaxed text-[#465067]/80 max-w-[500px] font-medium transition-all duration-700 delay-[560ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
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
              className="group inline-flex items-center gap-3 px-7 py-4 bg-[#FC7911] hover:bg-[#e06a0a] text-white text-[13px] font-black uppercase tracking-[2px] rounded-sm transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#FC7911]/30"
            >
              Get Tickets
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/competitions"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-[#465067] hover:bg-[#37404f] text-white text-[13px] font-bold uppercase tracking-[2px] rounded-sm transition-all duration-200 active:scale-[0.97]"
            >
              View Competitions
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 bg-[#465067]/15" />

            {/* Date + Location info */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-[#465067]/70 text-[12px] font-semibold tracking-wide">
                <Calendar className="w-3.5 h-3.5 text-[#FC7911]" />
                27–28 Nov 2026
              </div>
              <div className="flex items-center gap-2 text-[#465067]/70 text-[12px] font-semibold tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-[#FC7911]" />
                Pet Park, The Pearl · Qatar
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row — desktop bottom-right ── */}
        <div
          className={`hidden lg:flex absolute bottom-10 right-12 items-center gap-8 transition-all duration-700 delay-[800ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {[
            { value: '6+', label: 'Competitions' },
            { value: '10K+', label: 'Expected Visitors' },
            { value: '2', label: 'Festival Days' },
            { value: '48+', label: 'Champion Cups' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-right">
              {/* Divider between stats */}
              {i !== 0 && (
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-px h-8 bg-[#465067]/15 hidden" />
              )}
              <div
                className="text-[28px] font-black leading-none text-[#1a1209] tabular-nums"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#465067]/50 mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Scroll indicator ── */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 transition-all duration-700 delay-[900ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#465067]/30">
            Scroll
          </span>
          <ChevronDown
            className="w-4 h-4 text-[#465067]/30 animate-bounce"
            style={{ animationDuration: '2s' }}
          />
        </div>
      </div>

      {/* ── Warm bottom trim line ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FC7911]/20 to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
