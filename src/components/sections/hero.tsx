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
              className="group mb-8 inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full transition-all hover:bg-accent/90"
            >
              <span className="text-[14px] font-medium text-white tracking-tight">
                27th & 28th of Nov 2026 · The Pearl Island · Qatar
              </span>
              <div className="flex items-center justify-center bg-transparent group-hover:translate-x-1 transition-transform brightness-0 invert">
                <Image
                  src="https://framerusercontent.com/images/mJ4B3sUua6gvwJ6rQYS23DLJ9c.svg"
                  alt="Arrow Icon"
                  width={20}
                  height={20}
                />
              </div>
            </div>

            {/* Headline */}
            <h1 className="mb-6 font-display text-[40px] sm:text-[54px] md:text-[64px] lg:text-[72px] xl:text-[84px] text-black leading-[1.05] tracking-tight">
              Nova Paw Festival
            </h1>
            
            <h2 className="mb-6 text-[20px] md:text-[24px] font-semibold text-primary font-display leading-tight">
              International Pet Festival, First Time in Qatar
            </h2>

            {/* Description */}
            <p className="mb-10 text-[16px] md:text-[18px] leading-[1.6] text-black/70 max-w-[580px] font-body">
              Judged by WKU World Kennel Union & WCF World Cat Federation international judges. The world comes to Qatar, and your pet takes center stage.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <a
                href="#competitions"
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-primary text-white  rounded-sm font-bold text-[16px] md:text-[18px] transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-primary/20"
              >
                <span>Competitions</span>
                <div className="transition-transform group-hover:translate-x-1">
                  <Image
                    src="https://framerusercontent.com/images/mJ4B3sUua6gvwJ6rQYS23DLJ9c.svg"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                </div>
              </a>
              <a
                href="#tickets"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-black text-white  rounded-sm font-bold text-[16px] md:text-[18px] transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-black/20"
              >
                Get Tickets
              </a>
            </div>
          </div>

          {/* Right Column: Video Container */}
          <div className="relative w-full aspect-[4/5] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            >
              <source src="https://player.vimeo.com/external/494278657.sd.mp4?s=d5965457c154379a528e53ef711674a2b270a68d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

            {/* Floating Badges on Video */}
            <div className="absolute top-6 left-6 z-20">
              <div className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20">
                <span className="text-black font-display text-[14px] font-bold tracking-tight">International Shows</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="p-6 bg-white/10 backdrop-blur-lg    rounded-sm  border border-white/20 shadow-2xl">
                <p className="text-white font-display text-[16px] md:text-[18px] font-bold leading-tight">
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
