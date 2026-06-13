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

        {/* Warm light overlay — keeps the image visible but brightened */}
        <div className="absolute inset-0 bg-[#FFF2E5]/55" />
        {/* Soft radial spotlight on center for text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,242,229,0.35)_0%,rgba(255,242,229,0.70)_100%)]" />
      </div>

      {/* ── Centered Content ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 text-center">

        {/* Eyebrow badge */}
        <div
          className={`flex items-center gap-2 mb-7 transition-all duration-700 delay-[150ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#FC7911] animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-[3px] text-[#FC7911]">
            Qatar's First International Pet Festival
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#FC7911] animate-pulse" />
        </div>

        {/* Giant headline */}
        <div className={`transition-all duration-700 delay-[250ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1
            className="font-black leading-[0.85] tracking-[-3px] text-[#1a1209]"
            style={{ fontSize: 'clamp(60px, 11vw, 148px)' }}
          >
            Nova Paw
          </h1>
          <h1
            className="font-black leading-[0.85] tracking-[-3px] text-[#FC7911]"
            style={{ fontSize: 'clamp(60px, 11vw, 148px)' }}
          >
            Festival
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className={`mt-7 text-[15px] md:text-[18px] leading-relaxed text-[#465067]/75 max-w-[560px] font-medium transition-all duration-700 delay-[380ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {t('subtitle')}
        </p>

        {/* Date + Location pill row */}
        <div
          className={`mt-6 flex flex-wrap items-center justify-center gap-5 transition-all duration-700 delay-[460ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-sm border border-black/[0.07] shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#FC7911] flex-shrink-0" />
            <span className="text-[12px] font-bold tracking-wide text-[#465067]">27–28 Nov 2026</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-sm border border-black/[0.07] shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#FC7911] flex-shrink-0" />
            <span className="text-[12px] font-bold tracking-wide text-[#465067]">Pet Park, The Pearl · Qatar</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-[560ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <Link
            href="/tickets"
            className="group inline-flex items-center gap-3 px-9 py-4 bg-[#FC7911] hover:bg-[#e06a0a] text-white text-[13px] font-black uppercase tracking-[2.5px] rounded-sm transition-all duration-200 active:scale-[0.97] shadow-xl shadow-[#FC7911]/30 min-w-[190px] justify-center"
          >
            Get Tickets
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/competitions"
            className="group inline-flex items-center gap-3 px-9 py-4 bg-[#465067] hover:bg-[#37404f] text-white text-[13px] font-bold uppercase tracking-[2.5px] rounded-sm transition-all duration-200 active:scale-[0.97] min-w-[190px] justify-center"
          >
            Competitions
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Stats strip */}
        <div
          className={`mt-14 flex items-center justify-center gap-8 md:gap-14 transition-all duration-700 delay-[680ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {[
            { value: '6+', label: 'Competitions' },
            { value: '10K+', label: 'Visitors' },
            { value: '2', label: 'Days' },
            { value: '48+', label: 'Cups' },
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i !== 0 && <div className="w-px h-8 bg-[#465067]/15 hidden sm:block" />}
              <div className="text-center">
                <div
                  className="text-[28px] md:text-[34px] font-black leading-none text-[#1a1209] tabular-nums"
                >
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#465067]/50 mt-1">
                  {stat.label}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-[800ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#465067]/30">
          Scroll
        </span>
        <ChevronDown
          className="w-4 h-4 text-[#465067]/30 animate-bounce"
          style={{ animationDuration: '2s' }}
        />
      </div>

      {/* Bottom trim */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FC7911]/25 to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
