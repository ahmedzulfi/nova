import React from 'react';
import Image from 'next/image';

const competitionsData = [
  {
    title: "Dog Fashion Show",
    description: "Owners and dogs strut the runway in matching themed outfits   judged on creativity, coordination, and charm.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2068&auto=format&fit=crop"
  },
  {
    title: "Grooming Competition",
    description: "Professional groomers showcase their artistry   precision trimming, styling, and finishing under WKU supervision.",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop"
  },
  {
    title: "Best Dog Show",
    description: "The prestigious WKU-recognized event evaluating breed structure, temperament, and presentation across three classes.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
  },
  {
    title: "Best Cat Show",
    description: "WCF-licensed grand judging of elegance, breed standards, and feline grace inside the immersive Cat Dome.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
  },
  {
    title: "Cat Drawing Battle",
    description: "A live creative battle where artists compete to draw cats in real-time   speed, style, and imagination under the spotlight.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
  },
  {
    title: "Painting Competition",
    description: "Live painting session where artists create cat and dog inspired works projected across the Cat Dome walls.",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop"
  }
];

const Competitions = () => {
  return (
    <section className="bg-[#F9F9F9] py-[120px] md:py-[160px]" id="competitions">
      <div className="container max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E6E6E6] text-black text-[12px] font-semibold uppercase tracking-[0.05em] font-body mb-6">
            Compete & Shine
          </span>
          <h2 className="text-[32px] sm:text-[48px] md:text-[64px] font-bold leading-[1.1] text-black mb-6 font-display tracking-tight max-w-[800px]">
            Join or Participate Now in One of the 6 International Competitions
          </h2>
          <p className="text-[16px] md:text-[18px] leading-[1.6] text-black/70 max-w-[640px] font-body">
            Judged by WKU World Kennel Union & WCF World Cat Federation international judges   your chance to compete on the world stage.
          </p>
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitionsData.map((competition, index) => (
            <div key={index} className="group bg-white    rounded-sm  overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-[240px] w-full overflow-hidden">
                <Image
                  src={competition.image}
                  alt={competition.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h4 className="text-[24px] font-bold text-black font-display mb-4">
                  {competition.title}
                </h4>
                <p className="text-[16px] leading-[1.6] text-black/70 font-body">
                  {competition.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <a
            href="/registration"
            className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 bg-primary text-white  rounded-sm font-bold text-[16px] md:text-[18px] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            Register for a Competition Now
          </a>
        </div>

      </div>
    </section>
  );
};

export default Competitions;
