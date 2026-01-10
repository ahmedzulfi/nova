import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

/**
 * CTA Banner Section component.
 * Features a large background image with a bold heading, supporting text, 
 * and a primary yellow pill-shaped button.
 * 
 * Based on the design instructions:
 * - Large background image of a cyclist.
 * - Bold heading "Join the ultimate cycling adventure".
 * - Yellow "Let's get started" button with an arrow icon.
 */
const CTABanner = () => {
  // Asset validation: Using the provided background image and arrow SVG if available
  const backgroundImage = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop";
  const arrowIcon = "https://framerusercontent.com/images/mJ4B3sUua6gvwJ6rQYS23DLJ9c.svg";

  return (
    <section className="container px-6 my-20 lg:my-32 mx-auto max-w-[1280px]">
      <div
        className="relative w-full rounded-[30px] overflow-hidden min-h-[500px] lg:h-[680px] flex items-center"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Pet Festival Fun"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 px-8 lg:px-16 py-12 lg:py-24 max-w-[800px]">
          <h2 className="text-white text-[48px] lg:text-[72px] mb-6 drop-shadow-sm">
            Join the Nova Paw <br />
            Festival 2026
          </h2>

          <p className="text-white text-lg lg:text-xl font-normal leading-[1.5] max-w-[480px] mb-10 drop-shadow-sm">
            Don’t miss out on this incredible opportunity to celebrate your pets, connect with fellow lovers, and experience the thrill of the festival!
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/registration"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transition-transform duration-200 hover:-translate-y-1 active:translate-y-0"
            >
              <span className="text-[17px]">Register Your Pet Now</span>
              <img src={arrowIcon} alt="" className="w-5 h-5 brightness-0 invert" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;