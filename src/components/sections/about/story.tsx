import React from 'react';
import Image from 'next/image';

const AboutStory = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Image with floating elements */}
          <div className="relative group">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
                alt="Festival Vibe"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            
            {/* Floating Info Cards */}
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 bg-primary p-6 md:p-8 rounded-[2rem] shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500 z-20">
              <span className="block text-[40px] md:text-[56px]   font-bold  text-black leading-none mb-1">10K</span>
              <span className="text-[14px] md:text-[16px] font-bold uppercase tracking-widest text-black/60">Expected Visitors</span>
            </div>
            
            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-black p-6 md:p-8 rounded-[2rem] shadow-2xl -rotate-3 transition-transform hover:rotate-0 duration-500 z-20">
              <span className="block text-[40px] md:text-[56px]   font-bold  text-white leading-none mb-1">270m</span>
              <span className="text-[14px] md:text-[16px] font-bold uppercase tracking-widest text-white/60">Venue Length</span>
            </div>
          </div>

          {/* Right Side: Detailed Text Content */}
          <div className="space-y-10">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-[14px] mb-4 block">Festival Overview</span>
              <h2 className="text-[36px] md:text-[54px] font-display   font-bold  text-black leading-[1.1] tracking-tight">
                Groundbreaking Debut in Qatar
              </h2>
            </div>
            
            <div className="space-y-6 text-[18px] md:text-[20px] leading-[1.6] text-black/70 font-body">
              <p>
                The Nova Paw Festival is a groundbreaking international pet event making its debut in Qatar on <span className="text-black font-semibold">November 27th & 28th, 2026</span>, at the stunning The Pearl Island, Qatar.
              </p>
              <p>
                This festival brings together pet lovers, families, breeders, and animal enthusiasts from across the globe for an unforgettable celebration of our furry companions.
              </p>
              <div className="p-8 bg-accent/10 border-l-4 border-accent rounded-r-2xl">
                <p className="text-black font-medium leading-[1.5]">
                  "What sets Nova Paw apart is its international judging panel    <span className="font-bold">WKU officials</span> judge all dog competitions, while <span className="font-bold">WCF officials</span> evaluate the cat shows."
                </p>
              </div>
              <p>
                The festival spans a 270-meter venue divided into three main zones: the Dog Space, the Cat Space, and the Carnival Zone    each offering unique experiences, competitions, and activities.
              </p>
              <p>
                From the 18m × 14m Dog Arena hosting WDF/WKU-sanctioned shows to the 10m geodesic Cat Dome with immersive 180° projection, every space is designed for maximum engagement and comfort.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
