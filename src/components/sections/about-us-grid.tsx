import React from 'react';
import Image from 'next/image';

const AboutUsGrid = () => {
  return (
    <section className="py-20 md:py-32 bg-white" id="about-us">
      <div className="container mx-auto px-6 max-w-[1280px]">
        {/* Top Bento Block: Yellow Main Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8 bg-primary  rounded-sm p-8 md:p-12 flex flex-col justify-between items-start min-h-[360px] md:min-h-[460px]">
            <div className="space-y-6 md:space-y-8">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E6E6E6]/50 text-[11px] md:text-[12px] font-semibold uppercase tracking-wider text-black">
                About the Festival
              </span>
              <h2 className="text-[24px] sm:text-[36px] md:text-[56px] font-semibold leading-[1.1] tracking-tight text-black max-w-[640px]">
                Where Paws Meet Celebration
              </h2>
            </div>
            <a
              href="#about-us"
              className="mt-8 inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-full bg-black text-white font-semibold transition-transform hover:scale-105 active:scale-95 text-[14px] md:text-[16px]"
            >
              Learn More About the Festival
            </a>
          </div>

          <div className="lg:col-span-4">
            <div className="relative h-full min-h-[300px] md:min-h-[460px]  rounded-sm overflow-hidden shadow-sm group">
              <Image
                src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop"
                alt="Happy Pets"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Bento Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Black Block: Description - Fixed UI */}
          <div className="lg:col-span-7 bg-[#0A0A0A]  rounded-sm overflow-hidden flex flex-col group border border-white/5 shadow-2xl">
            <div className="p-8 md:p-12 relative z-10">
              <h4 className="text-[18px] sm:text-[20px] md:text-[24px] leading-[1.6] text-white/90 font-medium">
                The <span className="text-primary">Nova Paw Festival</span> is Qatar's first international pet festival, bringing together pet lovers, families, and animal enthusiasts from around the world for an unforgettable two-day celebration at The Pearl Island, Qatar. Featuring <span className="text-white font-bold underline decoration-primary underline-offset-4">WKU</span> and <span className="text-white font-bold underline decoration-primary underline-offset-4">WCF</span> internationally certified judges, this landmark event sets a new standard for pet shows in the region.
              </h4>
            </div>
            <div className="relative flex-grow min-h-[240px] sm:min-h-[280px] mt-auto mx-4 md:mx-6 mb-4 md:mb-6    rounded-sm  overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
                alt="Pet Festival"
                fill
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>

          {/* Stats Block - Refined UI */}
          <div className="lg:col-span-5 bg-white border border-black/5    rounded-sm  p-8 md:p-14 flex flex-col justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
            <div className="grid grid-cols-2 gap-x-8 gap-y-16">
              <div className="group/item">
                <div className="flex items-baseline gap-1 mb-3">
                  <h3 className="text-[56px] md:text-[72px] font-display   font-bold  leading-none text-black tracking-tighter transition-transform duration-300 group-hover/item:-translate-y-1">6</h3>
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-[14px] md:text-[15px] font-bold uppercase tracking-widest text-black/40 leading-snug">
                  International<br/>Competitions
                </p>
              </div>
              <div className="group/item">
                <div className="flex items-baseline gap-1 mb-3">
                  <h3 className="text-[56px] md:text-[72px] font-display   font-bold  leading-none text-black tracking-tighter transition-transform duration-300 group-hover/item:-translate-y-1">10K</h3>
                  <div className="w-2 h-2 rounded-full bg-black/20" />
                </div>
                <p className="text-[14px] md:text-[15px] font-bold uppercase tracking-widest text-black/40 leading-snug">
                  Expected<br/>Visitors
                </p>
              </div>
              <div className="group/item">
                <div className="flex items-baseline gap-1 mb-3">
                  <h3 className="text-[56px] md:text-[72px] font-display   font-bold  leading-none text-black tracking-tighter transition-transform duration-300 group-hover/item:-translate-y-1">2</h3>
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-[14px] md:text-[15px] font-bold uppercase tracking-widest text-black/40 leading-snug">
                  Festival<br/>Days
                </p>
              </div>
              <div className="group/item">
                <div className="flex items-baseline gap-1 mb-3">
                  <h3 className="text-[56px] md:text-[72px] font-display   font-bold  leading-none text-black tracking-tighter transition-transform duration-300 group-hover/item:-translate-y-1">48</h3>
                  <div className="w-2 h-2 rounded-full bg-black/20" />
                </div>
                <p className="text-[14px] md:text-[15px] font-bold uppercase tracking-widest text-black/40 leading-snug">
                  Champion<br/>Cups
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsGrid;