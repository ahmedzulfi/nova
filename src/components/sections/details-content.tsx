import React from 'react';
import Image from 'next/image';

const DetailsContent = () => {
  return (
    <section
      className="bg-white py-[120px]"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        className="container mx-auto px-8 max-w-[1280px]"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '24px',
          alignItems: 'flex-start'
        }}
      >
        {/* Left Column: Text Content */}
        <div
          className="flex-1"
          style={{
            maxWidth: '66.66%'
          }}
        >
          <div className="space-y-6">
            <h2
              className="font-semibold text-[#1c1c1c] tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(40px, 6vw, 64px)',
                lineHeight: '1.1',
                marginBottom: '32px'
              }}
            >
              What we did
            </h2>
            <p
              className="text-[#1c1c1c] font-normal"
              style={{
                fontSize: '18px',
                lineHeight: '1.6',
                maxWidth: '600px'
              }}
            >
              Urban Night transformed the city into a playground of lights, motion, and adrenaline.
              Cyclists rode through glowing streets, neon-lit alleyways, and iconic landmarks
              all under the cover of darkness. With music pulsing at checkpoints and the hum
              of wheels on pavement, the ride was electric. It wasn’t just about distance
              it was about rhythm, style, and owning the night.
            </p>
          </div>
        </div>

        {/* Right Column: Image */}
        <div
          className="flex-1 sticky top-[120px]"
          style={{
            maxWidth: '33.33%'
          }}
        >
          <div
            className="overflow-hidden"
            style={{
              borderRadius: '24px',
              width: '100%',
              aspectRatio: '4381 / 5652',
              position: 'relative'
            }}
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/YMFIn97OUJJLFQjNRbPJFQgfumQ-1.jpg"
              alt="Thumbnail of a cyclist in urban environment"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 991px) 100vw, 33vw"
            />
          </div>
        </div>
      </div>

      {/* Vertical Text Overlay Element (As per High Level Design Visual Motif) */}
      <div
        className="vertical-text absolute"
        style={{
          right: '50%',
          top: '150px',
          zIndex: 0,
          whiteSpace: 'nowrap',
          transform: 'translateX(50%)'
        }}
      >
        What we did
      </div>
    </section>
  );
};

export default DetailsContent;