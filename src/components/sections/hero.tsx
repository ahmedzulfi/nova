import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-[100px] pb-[80px] md:pt-[140px] md:pb-[120px]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left">
            {/* Badge */}
            <div
              className="group mb-12 inline-flex items-center gap-4 px-6 py-2 bg-[#F9F9F9] border border-black/5 rounded-none transition-all duration-500 ease-[var(--ease-out)] hover:bg-black hover:text-white"
            >
              <span className="text-[12px] font-black uppercase tracking-[0.2em]">
                27 & 28 Nov 2026 · The Pearl · Qatar
              </span>
              <div className="flex items-center justify-center transition-transform group-hover:translate-x-2">
                <Image
                  src="https://framerusercontent.com/images/mJ4B3sUua6gvwJ6rQYS23DLJ9c.svg"
                  alt="Arrow Icon"
                  width={16}
                  height={16}
                  className="group-hover:brightness-0 group-hover:invert transition-all"
                />
              </div>
            </div>

            {/* Headline */}
            <h1 className="mb-10 font-display text-[48px] sm:text-[64px] md:text-[84px] lg:text-[96px] xl:text-[110px] text-black leading-[0.9] tracking-tighter font-black">
              Nova Paw <br /> Festival
            </h1>
            
            <h2 className="mb-8 text-[18px] md:text-[22px] font-black text-primary uppercase tracking-[0.1em] font-display">
              International Pet Festival · First Time in Qatar
            </h2>

            {/* Description */}
            <p className="mb-12 text-[18px] md:text-[20px] leading-[1.6] text-black/50 max-w-[620px] font-body font-medium">
              Judged by <span className="text-black font-bold">WKU</span> & <span className="text-black font-bold">WCF</span> international panels. The world comes to Qatar, and your pet takes center stage in an unprecedented celebration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
              <a
                href="#competitions"
                className="group inline-flex items-center justify-center gap-4 w-full sm:w-auto px-12 py-6 bg-primary text-black rounded-none font-black text-[14px] uppercase tracking-widest transition-all duration-300 ease-[var(--ease-out)] hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-primary/20"
              >
                <span>Competitions</span>
                <Image
                  src="https://framerusercontent.com/images/mJ4B3sUua6gvwJ6rQYS23DLJ9c.svg"
                  alt="Arrow"
                  width={18}
                  height={18}
                  className="transition-transform group-hover:translate-x-2"
                />
              </a>
              <a
                href="#tickets"
                className="inline-flex items-center justify-center w-full sm:w-auto px-12 py-6 bg-black text-white rounded-none font-black text-[14px] uppercase tracking-widest transition-all duration-300 ease-[var(--ease-out)] hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                Get Tickets
              </a>
            </div>
          </div>

          {/* Right Column: Video Container */}
          <div className="relative w-full aspect-[4/5] rounded-none overflow-hidden shadow-sm group">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            >
              <source src="https://player.vimeo.com/external/494278657.sd.mp4?s=d5965457c154379a528e53ef711674a2b270a68d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

            {/* Floating Badges on Video */}
            <div className="absolute top-8 left-8 z-20">
              <div className="px-6 py-2 bg-white rounded-none shadow-sm border border-black/5">
                <span className="text-black font-display text-[12px] font-black uppercase tracking-widest">International Shows</span>
              </div>
            </div>

            <div className="absolute bottom-10 left-10 right-10 z-20">
              <div className="p-8 glass rounded-none border border-white/20">
                <p className="text-white font-display text-[20px] md:text-[24px] font-black leading-tight tracking-tight">
                  Experience the largest pet gathering in Qatar.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
