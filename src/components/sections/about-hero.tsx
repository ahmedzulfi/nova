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

        {/* Left Column: Heading and Description */}
        <div className="flex flex-col">
          <h1 className="text-[48px] md:text-[84px] font-bold leading-[1.05] tracking-[-0.04em] text-black mb-10 max-w-[800px] font-display">
            United by passion for animals and community
          </h1>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-[#666666] max-w-[640px] font-body">
            Nova Paw Festival – Pearl 2026 is Qatar’s first pet festival, designed to bring together pets, families, professionals, and global partners in a professionally organized, pet-focused outdoor experience.
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