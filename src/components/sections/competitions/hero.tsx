'use client';

import React from 'react';
import Image from 'next/image';

const CompetitionsHero = () => {
  return (
    <section className="relative w-full pt-[140px] pb-[80px] md:pt-[180px] md:pb-[120px] bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-accent text-white text-[12px] font-bold uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            Compete & Shine
          </span>
          <h1 className="text-[40px] sm:text-[54px] md:text-[72px] lg:text-[70px] font-display font-bold text-black leading-[1] tracking-tighter mb-10 max-w-[1000px] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Join or Participate Now in One of the 5 International Competitions
          </h1>
          <p className="text-[18px] md:text-[22px] leading-[1.5] text-black/60 max-w-[800px] font-body animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            Judged by <span className="text-primary font-bold">WKU World Kennel Union</span> & <span className="text-primary font-bold">WCF World Cat Federation</span> international judges  register your pet or yourself and compete for champion cups, medals, and certificates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompetitionsHero;
