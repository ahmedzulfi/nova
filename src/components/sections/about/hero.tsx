'use client';

import React from 'react';
import Image from 'next/image';

const AboutHero = () => {
  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-24 pb-20 lg:pt-32">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Moment 1 */}
        <div
          className="absolute top-[20%] left-[5%] md:left-[12%] w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-float hidden md:block"
          style={{ animationDelay: "0s" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1974&auto=format&fit=crop"
            alt="Festival moment 1"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Floating Moment 2 */}
        <div
          className="absolute top-[40%] left-[5%] md:left-[8%] w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-float hidden md:block"
          style={{ animationDelay: "1s" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop"
            alt="Festival moment 2"
            fill
            className="object-cover"
          />
        </div>

        {/* Floating Moment 3 */}
        <div
          className="absolute bottom-[15%] left-[15%] md:left-[20%] w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-float hidden md:block"
          style={{ animationDelay: "2s" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop"
            alt="Festival moment 3"
            fill
            className="object-cover"
          />
        </div>

        {/* Floating Moment 4 */}
        <div
          className="absolute top-[10%] right-[10%] md:right-[15%] w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-float hidden md:block"
          style={{ animationDelay: "0.5s" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop"
            alt="Festival moment 4"
            fill
            className="object-cover"
          />
        </div>

        {/* Floating Moment 5 */}
        <div
          className="absolute top-[45%] right-[5%] md:right-[8%] w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-float hidden md:block"
          style={{ animationDelay: "1.5s" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000&auto=format&fit=crop"
            alt="Festival moment 5"
            fill
            className="object-cover"
          />
        </div>

        {/* Floating Moment 6 */}
        <div
          className="absolute bottom-[10%] right-[15%] md:right-[20%] w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-float hidden md:block"
          style={{ animationDelay: "2.5s" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=2070&auto=format&fit=crop"
            alt="Festival moment 6"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[84px]   font-bold  leading-[1.1] tracking-tighter text-black mb-6 md:mb-8 font-display px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            About the Festival
          </h1>
          <p className="text-[16px] md:text-[20px] leading-[1.6] text-black/60 max-w-[700px] font-body mb-8 md:mb-12 px-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            Qatar's first international pet festival    two days of world-class competitions, entertainment, and family fun. Experience a complete pet ecosystem featuring <span className="text-primary font-bold">NovaVet health services</span>, <span className="text-primary font-bold">pet adoption zones</span>, and a curated selection of <span className="text-primary font-bold">local food trucks</span> at The Pearl Island.
          </p>
          <a 
            href="#story"
            className="group bg-primary hover:bg-primary/90 text-white font-bold h-14 md:h-16 px-8 md:px-10 rounded-full flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/20 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300"
          >
            Learn more
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
