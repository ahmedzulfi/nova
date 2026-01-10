import React from 'react';
import Image from 'next/image';

const InnerBanner = () => {
  return (
    <section
      className="bg-white pt-[160px] pb-[80px]"
      style={{ fontFamily: '"Instrument Sans", sans-serif' }}
    >
      <div className="container max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Left Column: Title & Description */}
          <div className="md:col-span-8">
            <div className="flex flex-col gap-6">
              {/* Breadcrumb / Label */}
              <div className="inline-flex items-center gap-2 group cursor-pointer transition-colors duration-300">
                <span className="text-[16px] text-[#8C8C8C] font-normal group-hover:text-foreground">
                  Festivals & Exhibitions
                </span>
                <div className="w-[22px] h-[22px] relative">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/mJ4B3sUua6gvwJ6rQYS23DLJ9c-3.svg"
                    alt="Arrow Icon"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Banner Title */}
              <h1 className="text-[clamp(64px,10vw,120px)] font-semibold text-[#1C1C1C] leading-[0.95] tracking-[-0.04em] mt-2">
                Festival Zones
              </h1>

              {/* Description */}
              <p className="max-w-[500px] text-[18px] text-[#1C1C1C] leading-[1.6] mt-4">
                Explore dedicated spaces for dogs and cats, featuring specialized arenas for shows, grooming, and play.
              </p>
            </div>
          </div>

          {/* Right Column: Event Metadata & CTA */}
          <div className="md:col-span-4 flex flex-col justify-between h-full pt-4">
            <div className="flex flex-col border-t border-[#E8E8E8]">
              {/* Event Meta List */}
              <div className="flex justify-between py-4 border-b border-[#E8E8E8]">
                <span className="text-[#8C8C8C] text-[16px]">Start:</span>
                <span className="text-[#1C1C1C] font-medium text-[16px]">April 3, 2026</span>
              </div>
              <div className="flex justify-between py-4 border-b border-[#E8E8E8]">
                <span className="text-[#8C8C8C] text-[16px]">End:</span>
                <span className="text-[#1C1C1C] font-medium text-[16px]">April 4, 2026</span>
              </div>
              <div className="flex justify-between py-4 border-b border-[#E8E8E8]">
                <span className="text-[#8C8C8C] text-[16px]">Location:</span>
                <span className="text-[#1C1C1C] font-medium text-[16px]">Pet&apos;s Park, The Pearl, Qatar</span>
              </div>
            </div>

            {/* Register Button */}
            <div className="mt-12 group">
              <a
                href="/registration"
                className="inline-flex items-center justify-between bg-primary hover:bg-primary/90 text-white px-8 py-5 rounded-full transition-all duration-300 w-full md:w-fit min-w-[240px]"
              >
                <span className="text-[18px] font-semibold">Register now</span>
                <div className="flex items-center justify-center bg-white/20 rounded-full w-[28px] h-[28px] ml-4 transition-transform duration-300 group-hover:translate-x-1">
                  <div className="w-5 h-5 relative">
                    <Image
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/mJ4B3sUua6gvwJ6rQYS23DLJ9c-3.svg"
                      alt="Arrow"
                      fill
                      className="object-contain grayscale invert"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InnerBanner;