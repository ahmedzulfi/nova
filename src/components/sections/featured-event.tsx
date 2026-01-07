import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

/**
 * FeaturedEvent Section Component
 * 
 * Clones the "Ultimate cycling adventure" section with pixel-perfect accuracy.
 * Features a background image of cyclists with a white overlay card containing event details.
 */
export default function FeaturedEvent() {
  const backgroundImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/uNIn3b0YXNADeGWQCJYglPqn8-11.jpg";

  return (
    <section className="relative w-full py-[120px] px-5 lg:px-10 bg-white">
      <div className="container mx-auto">
        {/* Main Background Container */}
        <div className="relative w-full h-[600px] lg:h-[800px] overflow-hidden rounded-[24px] lg:rounded-[40px]">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={backgroundImage}
              alt="Ultimate cycling adventure background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Dark Overlay for better contrast if needed (Subtle) */}
          <div className="absolute inset-0 bg-black/5" />

          {/* Content Card Overlay */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-10 lg:left-16 w-full max-w-[calc(100%-32px)] md:max-w-[480px]">
            <div className="bg-white p-8 md:p-12 rounded-[24px] lg:rounded-[32px] shadow-sm flex flex-col gap-6">
              
              {/* Badge */}
              <div className="inline-flex self-start">
                <span className="bg-[#F1F1F1] text-black text-[12px] font-medium py-1.5 px-3.5 rounded-full">
                  Cyclix event
                </span>
              </div>

              {/* Title Content */}
              <div className="flex flex-col gap-4">
                <h2 className="text-[32px] md:text-[48px] font-semibold leading-[1.1] text-black transition-colors duration-300">
                  Ultimate cycling adventure
                </h2>
                
                {/* Date and Location */}
                <div className="flex flex-col gap-1.5">
                  <p className="text-[#000000] text-[16px] font-semibold leading-relaxed m-0">
                    March 19, 2025
                  </p>
                  <p className="text-[#666666] text-[16px] leading-relaxed m-0">
                    123 Cycling Lane, Adventure City, State, 39580
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="text-[#666666] text-[16px] md:text-[18px] leading-[1.6]">
                This exciting day promises breathtaking routes, invigorating challenges, and a vibrant community atmosphere. Participants will traverse stunning landscapes, enjoying the beauty of nature while pushing their limits.
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <a 
                  href="/contact-us"
                  className="inline-flex items-center justify-between gap-4 bg-[#F7F07A] hover:bg-[#f5ec54] text-black font-semibold text-[16px] py-4 px-8 rounded-full transition-all duration-300 group w-full sm:w-auto"
                >
                  Register now
                  <div className="bg-black/5 rounded-full p-0.5 group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={18} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}