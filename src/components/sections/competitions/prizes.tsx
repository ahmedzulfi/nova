'use client';

import React from 'react';
import { Trophy, Award, Star, Ribbon, Medal } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type CupPlacement = { rank: string; title: string; color: string; textColor: string; ringColor: string; shine: string };
type RosetteItem = { label: string; ribbon: string; accent: string; bg: string };

// ─── BIS Cup Groups ───────────────────────────────────────────────────────────
const bisGroups: { title: string; subtitle: string; icon: React.ReactNode; cups: CupPlacement[] }[] = [
  {
    title: 'BIS Cups',
    subtitle: 'Best in Show',
    icon: <Trophy className="w-6 h-6" />,
    cups: [
      { rank: '🥇 1st', title: 'Best in Show',       color: 'from-yellow-300 via-yellow-400 to-amber-500',   textColor: 'text-amber-900',   ringColor: 'ring-yellow-400',   shine: 'bg-yellow-200' },
      { rank: '🥈 2nd', title: 'Res. Best in Show',  color: 'from-slate-200 via-slate-300 to-slate-400',     textColor: 'text-slate-700',   ringColor: 'ring-slate-400',    shine: 'bg-slate-100' },
      { rank: '🥉 3rd', title: '3rd Best in Show',   color: 'from-orange-300 via-orange-400 to-amber-600',   textColor: 'text-orange-900',  ringColor: 'ring-orange-400',   shine: 'bg-orange-100' },
    ]
  },
  {
    title: 'Best Junior',
    subtitle: 'Junior Competition',
    icon: <Star className="w-6 h-6" />,
    cups: [
      { rank: '🥇 1st', title: 'Best Junior in Show',       color: 'from-yellow-300 via-yellow-400 to-amber-500', textColor: 'text-amber-900',  ringColor: 'ring-yellow-400',  shine: 'bg-yellow-200' },
      { rank: '🥈 2nd', title: 'Res. Best Junior in Show',  color: 'from-slate-200 via-slate-300 to-slate-400',   textColor: 'text-slate-700',  ringColor: 'ring-slate-400',   shine: 'bg-slate-100' },
      { rank: '🥉 3rd', title: '3rd Best Junior in Show',   color: 'from-orange-300 via-orange-400 to-amber-600', textColor: 'text-orange-900', ringColor: 'ring-orange-400',  shine: 'bg-orange-100' },
    ]
  },
  {
    title: 'Best Puppy',
    subtitle: 'Puppy Competition',
    icon: <Medal className="w-6 h-6" />,
    cups: [
      { rank: '🥇 1st', title: 'Best Puppy in Show',       color: 'from-yellow-300 via-yellow-400 to-amber-500', textColor: 'text-amber-900',  ringColor: 'ring-yellow-400',  shine: 'bg-yellow-200' },
      { rank: '🥈 2nd', title: 'Res. Best Puppy in Show',  color: 'from-slate-200 via-slate-300 to-slate-400',   textColor: 'text-slate-700',  ringColor: 'ring-slate-400',   shine: 'bg-slate-100' },
      { rank: '🥉 3rd', title: '3rd Best Puppy in Show',   color: 'from-orange-300 via-orange-400 to-amber-600', textColor: 'text-orange-900', ringColor: 'ring-orange-400',  shine: 'bg-orange-100' },
    ]
  },
  {
    title: 'Best Baby',
    subtitle: 'Baby Competition',
    icon: <Award className="w-6 h-6" />,
    cups: [
      { rank: '🥇 1st', title: 'Best Baby in Show',       color: 'from-yellow-300 via-yellow-400 to-amber-500', textColor: 'text-amber-900',  ringColor: 'ring-yellow-400',  shine: 'bg-yellow-200' },
      { rank: '🥈 2nd', title: 'Res. Best Baby in Show',  color: 'from-slate-200 via-slate-300 to-slate-400',   textColor: 'text-slate-700',  ringColor: 'ring-slate-400',   shine: 'bg-slate-100' },
      { rank: '🥉 3rd', title: '3rd Best Baby in Show',   color: 'from-orange-300 via-orange-400 to-amber-600', textColor: 'text-orange-900', ringColor: 'ring-orange-400',  shine: 'bg-orange-100' },
    ]
  },
];

// ─── Rosettes ─────────────────────────────────────────────────────────────────
const classRosettes: RosetteItem[] = [
  { label: '1st in Class', ribbon: '#f59e0b', accent: '#fef3c7', bg: 'bg-amber-50' },
  { label: '2nd in Class', ribbon: '#64748b', accent: '#f1f5f9', bg: 'bg-slate-50' },
  { label: '3rd in Class', ribbon: '#f97316', accent: '#fff7ed', bg: 'bg-orange-50' },
];

const participantRosettes: RosetteItem[] = [
  { label: 'Participant',         ribbon: '#FACC15', accent: '#fefce8', bg: 'bg-yellow-50' },
  { label: 'Nova Paw Competitor', ribbon: '#22c55e', accent: '#f0fdf4', bg: 'bg-green-50' },
  { label: 'Festival Entrant',    ribbon: '#8b5cf6', accent: '#f5f3ff', bg: 'bg-violet-50' },
];

// ─── Rosette SVG ─────────────────────────────────────────────────────────────
const RosetteIcon = ({ color, size = 80 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
    {/* Ribbon tails */}
    <polygon points="38,70 50,60 62,70 58,100 42,100" fill={color} opacity="0.85" />
    <polygon points="40,73 50,63 60,73 56,100 44,100" fill={color} opacity="0.5" />
    {/* Outer ring petals */}
    {Array.from({ length: 14 }).map((_, i) => {
      const angle = (i * 360) / 14;
      const rad = (angle * Math.PI) / 180;
      const cx = 50 + 30 * Math.cos(rad);
      const cy = 50 + 30 * Math.sin(rad);
      return <ellipse key={i} cx={cx} cy={cy} rx={10} ry={6} fill={color} opacity="0.7" transform={`rotate(${angle}, ${cx}, ${cy})`} />;
    })}
    {/* Inner ring petals */}
    {Array.from({ length: 10 }).map((_, i) => {
      const angle = (i * 360) / 10 + 18;
      const rad = (angle * Math.PI) / 180;
      const cx = 50 + 20 * Math.cos(rad);
      const cy = 50 + 20 * Math.sin(rad);
      return <ellipse key={i} cx={cx} cy={cy} rx={8} ry={5} fill={color} opacity="0.9" transform={`rotate(${angle}, ${cx}, ${cy})`} />;
    })}
    {/* Center circle */}
    <circle cx="50" cy="50" r="16" fill="white" />
    <circle cx="50" cy="50" r="13" fill={color} />
    <circle cx="50" cy="50" r="10" fill="white" opacity="0.9" />
  </svg>
);

// ─── Cup SVG ─────────────────────────────────────────────────────────────────
const CupIcon = ({ gradient, gradientId }: { gradient: string[]; gradientId: string }) => (
  <svg width="64" height="80" viewBox="0 0 64 80" className="drop-shadow-xl">
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={gradient[0]} />
        <stop offset="100%" stopColor={gradient[1]} />
      </linearGradient>
    </defs>
    {/* Handles */}
    <path d="M12,18 Q4,18 4,28 Q4,38 12,38" stroke={`url(#${gradientId})`} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M52,18 Q60,18 60,28 Q60,38 52,38" stroke={`url(#${gradientId})`} strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Body */}
    <path d="M12,10 L52,10 L46,50 L18,50 Z" fill={`url(#${gradientId})`} rx="4" />
    {/* Base stem */}
    <rect x="26" y="50" width="12" height="10" fill={`url(#${gradientId})`} />
    {/* Base plate */}
    <rect x="18" y="60" width="28" height="6" rx="3" fill={`url(#${gradientId})`} />
    {/* Shine */}
    <ellipse cx="24" cy="22" rx="5" ry="8" fill="white" opacity="0.25" />
  </svg>
);

const gradientColors: Record<string, [string, string]> = {
  gold:   ['#fde68a', '#d97706'],
  silver: ['#e2e8f0', '#64748b'],
  bronze: ['#fed7aa', '#c2410c'],
};

// ─── Component ───────────────────────────────────────────────────────────────
const AwardsSection = () => {
  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="container mx-auto px-6 max-w-[1280px]">

        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[12px] mb-6 block leading-none">
            Victory & Recognition
          </span>
          <h2 className="text-[48px] md:text-[84px] font-display font-bold text-black tracking-tighter leading-[0.85]">
            Awards & Prizes
          </h2>
          <p className="mt-8 text-[18px] md:text-[20px] text-black/40 font-medium max-w-[600px] mx-auto leading-relaxed">
            Official WKU & WCF recognition cups, class rosettes, and participation awards for every competitor.
          </p>
        </div>

        {/* ── BIS Cups ─────────────────────────────────────────────────────── */}
        <div className="mb-24 md:mb-40">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-black/5" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-black/30 px-4">Champion Cups</span>
            <div className="h-px flex-1 bg-black/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {bisGroups.map((group, gi) => (
              <div key={gi} className="bg-[#F5F5F0] rounded-sm p-10 group hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                {/* Group Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary">
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-[22px] font-display font-bold text-black tracking-tighter leading-none">{group.title}</h3>
                    <p className="text-[12px] font-bold uppercase tracking-widest text-black/30 mt-0.5">{group.subtitle}</p>
                  </div>
                </div>

                {/* Cup Placements */}
                <div className="space-y-4">
                  {group.cups.map((cup, ci) => {
                    const gradKey = ci === 0 ? 'gold' : ci === 1 ? 'silver' : 'bronze';
                    return (
                      <div key={ci} className={`flex items-center gap-5 p-4 rounded-sm bg-gradient-to-r ${cup.color} bg-opacity-10`}>
                        {/* Mini Cup */}
                        <div className="flex-shrink-0">
                          <CupIcon gradient={gradientColors[gradKey]} gradientId={`cup-${gi}-${ci}`} />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/40">{cup.rank}</p>
                          <p className={`text-[18px] font-display font-bold tracking-tight ${cup.textColor}`}>{cup.title}</p>
                        </div>
                        {/* Trophy Cup Shape hint */}
                        <div className={`ml-auto w-8 h-8 rounded-full ring-2 ${cup.ringColor} ${cup.shine} flex items-center justify-center`}>
                          <Trophy className="w-4 h-4 text-black/30" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Rosettes ─────────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-black/5" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-black/30 px-4 flex items-center gap-2">
              <Ribbon className="w-4 h-4" /> Rosettes
            </span>
            <div className="h-px flex-1 bg-black/5" />
          </div>

          {/* Class Rosettes */}
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-black/25 mb-8 text-center">Class Placements</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {classRosettes.map((r, i) => (
                <div
                  key={i}
                  className={`${r.bg} rounded-sm p-10 flex flex-col items-center text-center group hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-black/5`}
                >
                  <div className="mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                    <RosetteIcon color={r.ribbon} size={90} />
                  </div>
                  <p className="text-[20px] font-display font-bold text-black tracking-tight">{r.label}</p>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mt-2">Official Class Rosette</p>
                </div>
              ))}
            </div>
          </div>

          {/* Participation Rosettes */}
          <div className="mt-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-black/25 mb-8 text-center">Participation Rosettes</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {participantRosettes.map((r, i) => (
                <div
                  key={i}
                  className={`${r.bg} rounded-sm p-8 flex flex-col items-center text-center group hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-black/5`}
                >
                  <div className="mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700">
                    <RosetteIcon color={r.ribbon} size={76} />
                  </div>
                  <p className="text-[18px] font-display font-bold text-black tracking-tight">{r.label}</p>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mt-2">Nova Paw Festival 2026</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-16 text-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-black/20 flex items-center justify-center gap-3">
              <Trophy className="w-4 h-4 text-primary" />
              All awards presented by WKU & WCF certified judges
              <Trophy className="w-4 h-4 text-primary" />
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AwardsSection;
