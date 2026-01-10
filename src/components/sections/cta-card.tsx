import React from 'react';
import Image from 'next/image';

const CTACard = () => {
  // Asset found in the provided list that matches the cyclist background image in the screenshot
  const backgroundImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/7jSYn7v3dR8rZl8uaSIe8ZKTymM-12.jpg";
  // SVG for the arrow in the button
  const arrowIcon = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/mJ4B3sUua6gvwJ6rQYS23DLJ9c-3.svg";

  return (
    <section className="container section-spacing">
      <div
        className="relative w-full aspect-[16/9] min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-[32px] overflow-hidden flex items-end p-8 md:p-12 lg:p-16"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Cyclist in action"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle dark gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-[800px] flex flex-col items-start">
          <h2 className="text-white text-[40px] md:text-[56px] lg:text-[72px] mb-6 tracking-tight">
            Celebrate the Bond <br />
            with Your Pet
          </h2>

          <p className="text-white/90 text-lg md:text-xl font-normal max-w-[540px] mb-10 leading-relaxed">
            Don&apos;t miss out on this incredible opportunity to celebrate your pets, connect with fellow lovers, and experience the thrill of the festival!
          </p>

          <a
            href="/get-started"
            className="group flex items-center gap-2 bg-primary hover:bg-primary/90 transition-all duration-300 px-8 py-4 rounded-full text-white font-medium text-base md:text-lg"
          >
            Let&apos;s get started
            <div className="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <Image
                src={arrowIcon}
                alt="Arrow"
                width={20}
                height={20}
                className="w-full h-full brightness-0 invert"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTACard;