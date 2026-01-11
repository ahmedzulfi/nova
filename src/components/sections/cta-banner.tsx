import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

/**
 * CTA Banner Section component.
 * Features a large background image with a bold heading, supporting text, 
 * and dual CTA buttons for Registration and Tickets.
 */
const CTABanner = () => {
  // Asset validation: Using high-quality pet festival imagery - Dog and Cat together
  const backgroundImage = "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=2070&auto=format&fit=crop";
  const arrowIcon = "https://framerusercontent.com/images/mJ4B3sUua6gvwJ6rQYS23DLJ9c.svg";

  return (
    <section className="container px-6 my-20 lg:my-32 mx-auto max-w-[1400px]">
      <div
        className="relative w-full rounded-[48px] overflow-hidden min-h-[500px] lg:h-[600px] flex items-center"
      >
        {/* Background Image Container with Parallax-like effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Nova Paw Festival"
            fill
            className="object-cover -scale-x-105"
            priority
          />
          {/* Enhanced Gradient Overlay for better legibility and premium feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 px-8 lg:px-20 py-12 lg:py-24 max-w-[900px]">
          <h2 className="text-white text-[48px] lg:text-[84px] font-bold font-display leading-[1] mb-8 tracking-tight drop-shadow-xl">
            Join the Nova Paw <br className="hidden md:block" />
            Festival 2026
          </h2>

          <p className="text-white/90 text-[18px] lg:text-[22px] font-medium leading-[1.6] max-w-[600px] mb-12 drop-shadow-md">
            Don’t miss out on this incredible opportunity to celebrate your pets, connect with fellow lovers, and experience the thrill of the festival!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="/registration"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary hover:bg-white hover:text-black text-white font-bold px-12 py-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
            >
              <span className="text-[18px]">Register Your Pet</span>
              <img src={arrowIcon} alt="" className="w-5 h-5 brightness-0 invert group-hover:brightness-100 group-hover:invert-0" aria-hidden="true" />
            </a>
            <a
              href="/tickets"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-white/90 text-black font-bold px-12 py-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
            >
              <span className="text-[18px]">Buy Tickets</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;