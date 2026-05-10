'use client';

import React from 'react';

const TicketsHero = () => {
  return (
    <section className="relative w-full pt-[140px] pb-[40px] md:pt-[180px] md:pb-[60px] bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        <div className="text-center">
          <span className="inline-block bg-[#F3F3F3] text-black text-[12px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
            Ticketing & Entry
          </span>
          <h1 className="text-[32px] md:text-[84px] font-bold font-display leading-[1] text-black mb-10 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 ease-[cubic-bezier(0.23,1,0.32,1)]">
            Secure Your Festival Access
          </h1>
          <p className="text-[18px] md:text-[20px] text-[#666666] leading-[1.6] max-w-[600px] mx-auto font-body animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
            Join us for two days of celebration, competition, and community at The
            Pearl, Qatar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TicketsHero;
