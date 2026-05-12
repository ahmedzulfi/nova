import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const AboutHero = () => {
  const floatingImages = [
    {
      src: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1974&auto=format&fit=crop",
      size: "w-24 h-24 md:w-32 md:h-32",
      position: "top-[20%] left-[5%] md:left-[12%]",
      delay: "0s"
    },
    {
      src: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop",
      size: "w-20 h-20 md:w-28 md:h-28",
      position: "top-[40%] left-[5%] md:left-[8%]",
      delay: "1s"
    },
    {
      src: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop",
      size: "w-28 h-28 md:w-40 md:h-40",
      position: "bottom-[15%] left-[15%] md:left-[20%]",
      delay: "2s"
    },
    {
      src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop",
      size: "w-24 h-24 md:w-36 md:h-36",
      position: "top-[10%] right-[10%] md:right-[15%]",
      delay: "0.5s"
    },
    {
      src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000&auto=format&fit=crop",
      size: "w-32 h-32 md:w-44 md:h-44",
      position: "top-[45%] right-[5%] md:right-[8%]",
      delay: "1.5s"
    },
    {
      src: "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=2070&auto=format&fit=crop",
      size: "w-24 h-24 md:w-32 md:h-32",
      position: "bottom-[10%] right-[15%] md:right-[20%]",
      delay: "2.5s"
    },
  ];

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-24 pb-20 lg:pt-32">
      {/* Floating Images Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingImages.map((img, index) => (
          <div
            key={index}
            className={`absolute ${img.position} ${img.size} rounded-sm overflow-hidden border-[6px] border-white shadow-2xl animate-float hidden md:block`}
            style={{ animationDelay: img.delay }}
          >
            <Image
              src={img.src}
              alt={`Festival moment ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-[40px] sm:text-[54px] md:text-[72px] lg:text-[84px] font-bold leading-[1] tracking-tighter text-black mb-8 font-display px-4">
            United by passion for <br className="hidden md:block" /> animals and community
          </h1>
          <p className="text-[18px] md:text-[22px] leading-[1.6] text-black/40 max-w-[640px] font-body mb-12 px-4 font-medium">
            Nova Paw Festival   Pearl 2026 is Qatar&apos;s first pet festival, designed to bring together pets, families, professionals, and global partners in an outdoor experience.
          </p>

          <button className="group bg-primary hover:bg-black text-white font-bold h-16 px-12 rounded-sm flex items-center gap-4 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-primary/20 uppercase tracking-[0.2em] text-[13px]">
            Let&apos;s get started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
