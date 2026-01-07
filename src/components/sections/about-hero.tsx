import React from 'react';
import Image from 'next/image';

const AboutHero = () => {
  // Image assets from the provided list
  const imagesLeftSet = [
    "https://images.unsplash.com/photo-1541591419107-bb248ff6677a?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=2070&auto=format&fit=crop",
  ];

  const imagesRightSet = [
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070&auto=format&fit=crop",
  ];

  return (
    <section className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-white">
      <div className="container mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start justify-between">
        
        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2 max-w-[580px] z-10">
          <h1 className="text-[56px] lg:text-[96px] font-semibold font-display leading-[1.1] tracking-[-0.04em] text-[#111111] mb-8">
            Nova Paw Festival
          </h1>
          <p className="text-[18px] lg:text-[20px] font-sans leading-[1.6] text-[#666666] max-w-[460px]">
            From world-class pet shows to family entertainment, we are here to celebrate the unique bond between humans and their beloved animal companions.
          </p>
        </div>

        {/* Right Side: Image Grid Collage */}
        <div className="w-full lg:w-1/2 flex gap-4 mt-16 lg:mt-0 relative">
          
          {/* Column 1 (Scroll set 1 behavior in original) */}
          <div className="flex flex-col gap-4 w-1/2 pt-12">
            <div className="w-full h-[180px] lg:h-[240px] relative rounded-[32px] overflow-hidden">
              <Image 
                src={imagesLeftSet[0]} 
                alt="Cycling adventure"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full h-[220px] lg:h-[300px] relative rounded-[32px] overflow-hidden">
              <Image 
                src={imagesLeftSet[1]} 
                alt="Cloudy cycling trail"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full h-[160px] lg:h-[220px] relative rounded-[24px] overflow-hidden">
              <Image 
                src={imagesLeftSet[2]} 
                alt="Architecture view"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 2 (Scroll set 2 behavior in original) */}
          <div className="flex flex-col gap-4 w-1/2">
            <div className="w-full h-[140px] lg:h-[180px] relative rounded-[24px] overflow-hidden">
              <Image 
                src={imagesRightSet[0]} 
                alt="Professional cyclist"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full h-[280px] lg:h-[380px] relative rounded-[32px] overflow-hidden">
              <Image 
                src={imagesRightSet[1]} 
                alt="Cycling close up"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full h-[180px] lg:h-[240px] relative rounded-[32px] overflow-hidden">
              <Image 
                src={imagesRightSet[2]} 
                alt="Group cycling"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;