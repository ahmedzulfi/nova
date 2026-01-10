import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-[120px] pb-[80px] md:pt-[160px] md:pb-[120px]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <div
            className="group mb-8 inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full transition-all hover:bg-accent/90"
          >
            <span className="text-[14px] font-medium text-white tracking-tight">
              April 3-4, 2026 · Pet’s Park, The Pearl, Qatar
            </span>
            <div className="flex items-center justify-center bg-transparent group-hover:translate-x-1 transition-transform brightness-0 invert">
              <Image
                src="https://framerusercontent.com/images/mJ4B3sUua6gvwJ6rQYS23DLJ9c.svg"
                alt="Arrow Icon"
                width={22}
                height={22}
              />
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-6 font-display text-[48px] md:text-[84px] text-black max-w-[900px]">
            Qatar’s First Pet Festival
          </h1>

          {/* Description */}
          <p className="mb-10 text-[18px] leading-[1.6] text-black/70 max-w-[640px] font-body">
            A two-day celebration of dogs and cats featuring international shows, live entertainment, family experiences, and adoption initiatives.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 lg:mb-24">
            <a
              href="/registration"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold text-[16px] transition-transform hover:scale-105 active:scale-95"
            >
              Register for Shows
              <div className="transition-transform group-hover:translate-x-1">
                <Image
                  src="https://framerusercontent.com/images/mJ4B3sUua6gvwJ6rQYS23DLJ9c.svg"
                  alt="Arrow"
                  width={22}
                  height={22}
                />
              </div>
            </a>
            <a
              href="/about-us"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-full font-semibold text-[16px] transition-transform hover:scale-105 active:scale-95"
            >
              Learn More
            </a>
          </div>

          {/* Video Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
              className="w-full h-full object-cover"
            >
              <source src="https://player.vimeo.com/external/494278657.sd.mp4?s=d5965457c154379a528e53ef711674a2b270a68d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            {/* Floating Badges on Video */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
              <div className="px-6 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                <span className="text-black font-display text-[14px] md:text-[16px] font-semibold tracking-tight">International Shows</span>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20">
              <div className="px-6 py-2.5 bg-primary rounded-full shadow-lg">
                <span className="text-white font-display text-[14px] md:text-[16px] font-semibold tracking-tight">Live Entertainment</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
