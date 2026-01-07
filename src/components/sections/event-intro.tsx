import React from 'react';
import Image from 'next/image';

/**
 * EventIntro Section
 * 
 * This component clones the "What we did" section from the Urban Night event page.
 * It features a large vertical heading and descriptive text on the left, 
 * paired with a tall vertical portrait image of a cyclist on the right.
 */
export default function EventIntro() {
  return (
    <section className="bg-white py-[120px] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-[60px] items-start">
          
          {/* Left Content Column */}
          <div className="flex flex-col">
            <div className="mb-10">
              {/* Heading: What we did */}
              <h2 className="text-[48px] md:text-[60px] lg:text-[80px] font-semibold text-[#1a1a1a] leading-[1.1] tracking-[-0.04em] mb-8">
                What we did
              </h2>
              
              {/* Descriptive Text */}
              <div className="max-w-[540px]">
                <p className="text-[18px] md:text-[20px] text-[#1a1a1a] leading-[1.6] font-normal tracking-[-0.01em]">
                  Urban Night transformed the city into a playground of lights, motion, and adrenaline. 
                  Cyclists rode through glowing streets, neon-lit alleyways, and iconic landmarks — 
                  all under the cover of darkness. With music pulsing at checkpoints and the hum 
                  of wheels on pavement, the ride was electric. It wasn’t just about distance — 
                  it was about rhythm, style, and owning the night.
                </p>
              </div>
            </div>
            
            {/* 
              Note: The vertical text "What we did" visible in some screenshots 
              is likely an architectural watermark or a stylistic overlay handled 
              differently across viewport sizes. The core narrative content is 
              the primary focus here.
            */}
          </div>

          {/* Right Image Column */}
          <div className="relative w-full flex justify-center md:justify-end">
            <div className="relative w-full max-w-[540px] aspect-[4381/5652] overflow-hidden rounded-[24px]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/YMFIn97OUJJLFQjNRbPJFQgfumQ-1.jpg"
                alt="Cyclist riding at night"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 540px"
                priority
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}