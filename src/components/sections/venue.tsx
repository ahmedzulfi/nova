import React from 'react';
import Image from 'next/image';

const Venue = () => {
  return (
    <section className="bg-[#F9F9F9] py-[120px] md:py-[160px]" id="venue">
      <div className="container max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <div className="relative h-[400px] md:h-[600px] w-full    rounded-sm  overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop"
              alt="The Pearl Island Qatar"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[14px] font-bold tracking-wider mb-3">
                Location
              </div>
              <h3 className="text-white text-[32px] md:text-[40px] font-bold leading-tight font-display">
                The Pearl Island, Qatar
              </h3>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E6E6E6] text-black text-[12px] font-semibold uppercase tracking-[0.05em] font-body mb-6">
              The Venue
            </span>
            <h2 className="text-[32px] sm:text-[48px] md:text-[64px] font-bold leading-[1.1] text-black mb-8 font-display tracking-tight">
              A World-Class Destination for Pets
            </h2>
            <p className="text-[16px] md:text-[20px] leading-[1.6] text-black/70 mb-12 font-body max-w-[600px]">
              Set against the stunning waterfront of The Pearl Island, Qatar, the festival spans a 270-meter venue featuring the Dog Arena, the immersive Cat Dome, main stage, food trucks, adoption zones, and carnival areas   all designed for maximum fun and comfort for pets and families.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white  rounded-sm font-bold text-[16px] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
            >
              Get Directions & Contact Us
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Venue;
