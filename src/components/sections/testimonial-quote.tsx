import React from 'react';
import Image from 'next/image';

const TestimonialQuote = () => {
  return (
    <section className="bg-white py-[140px] px-6">
      <div className="container mx-auto max-w-[1280px]">
        {/* Quote Container */}
        <div className="flex flex-col items-center">
          <blockquote className="quote-text text-black mb-12">
            &ldquo;Cycling is more than just a sport &mdash; it&apos;s a journey of discovery, 
            connection, and growth. Our mission is to inspire every rider to 
            push their limits, explore new horizons, and be part of a community 
            that moves the world forward, one pedal at a time.&rdquo;
          </blockquote>

          {/* Author Details */}
          <div className="flex flex-col items-center gap-4">
            {/* Avatar */}
            <div className="relative w-14 h-14 overflow-hidden rounded-full border-2 border-white shadow-sm">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/Jqayfjs2tuO7Zr58zNE6U1qsQ-7.jpg"
                alt="Jaxon Cole"
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>

            {/* Name and Title */}
            <div className="text-center">
              <h6 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-black m-0">
                Jaxon Cole
              </h6>
              <p className="role-text text-[#666666] text-[16px] leading-[1.4] m-0">
                CEO & Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialQuote;