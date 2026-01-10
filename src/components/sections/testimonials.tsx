import React from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

/**
 * Assets from the user's provided list:
 * These correspond to the circular avatars in the carousel cards.
 */
const testimonials = [
  {
    name: 'Eleanor Pena',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/pMoHY0KpvQcZzky6TDGCi4qJ1V0-6.jpg',
    isActive: true,
  },
  {
    name: 'Wade Warren',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/4nHZksGD5ZNkN82eTdzdWp8hxU-7.jpg',
    isActive: false,
  },
  {
    name: 'Arlene McCoy',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    isActive: false,
  },
  {
    name: 'Leslie Alex',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/kIBiy2xM79Ac692vRBBeMc3YFw8-9.jpg',
    isActive: false,
  },
  {
    name: 'Marvin Foster',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/F8ur4MxzltB6kcNMHbY8uVKQbg-10.jpg',
    isActive: false,
  },
  {
    name: 'Robert Fox',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/nSEdyezykUDo7M1Yyik0s75r1Hs-11.jpg',
    isActive: false,
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-white pb-[120px] pt-[80px]">
      <div className="container relative z-10 flex flex-col items-center">
        {/* Section Label */}
        <div className="mb-4 inline-flex items-center rounded-full bg-[#f5f5f5] px-4 py-1.5 shadow-sm">
          <span className="text-[14px] font-medium text-[#1c1c1c]">What our people say</span>
        </div>

        {/* Star Rating */}
        <div className="mb-8 flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={24} fill="currentColor" stroke="none" className="text-[#1c1c1c]" />
          ))}
        </div>

        {/* Central Quote Wrapper */}
        <div className="relative mb-[80px] w-full max-w-[1000px] px-8 text-center">
          {/* Navigation Arrows */}
          <button className="absolute -left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#e8e8e8] bg-[#f5f5f5] text-[#1c1c1c] transition-colors hover:bg-[#1c1c1c] hover:text-white md:left-0 lg:h-14 lg:w-14">
            <ArrowLeft size={20} />
          </button>

          <h2 className="mx-auto block text-[28px] leading-[1.3] text-[#1c1c1c] md:text-[40px] lg:text-[48px] font-semibold tracking-[-0.03em]">
            “An unforgettable pet festival world-class shows, great vibes, inspiring moments, beautiful memories, and amazing people. Absolutely loved it. Can’t wait for next year!”
          </h2>

          <button className="absolute -right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#e8e8e8] bg-[#f5f5f5] text-[#1c1c1c] transition-colors hover:bg-[#1c1c1c] hover:text-white md:right-0 lg:h-14 lg:w-14">
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Horizontal Carousel of Avatars */}
        <div className="flex w-full overflow-hidden px-4 md:justify-center">
          <div className="flex gap-4 scrollbar-hide md:flex-nowrap">
            {testimonials.map((person, index) => (
              <div
                key={index}
                className={`flex min-w-[150px] flex-col items-center justify-center rounded-[24px] p-6 transition-colors duration-300 md:w-[180px] ${person.isActive ? 'bg-primary' : 'bg-muted'
                  }`}
              >
                <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-white/20 shadow-sm md:h-24 md:w-24">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                </div>
                <span className={`text-center text-[16px] font-medium ${person.isActive ? 'text-white' : 'text-[#1c1c1c]'}`}>
                  {person.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decor Component (Vertical Text overlap logic from the High Level Design) */}
      <div className="absolute left-[-40px] top-1/2 z-0 -translate-y-1/2">
        <span className="vertical-text whitespace-nowrap opacity-20 md:opacity-40 select-none pointer-events-none">
          EVERYONE&apos;S ROUTE
        </span>
      </div>
    </section >
  );
};

export default Testimonials;