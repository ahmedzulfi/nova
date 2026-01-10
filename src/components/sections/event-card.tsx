import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

/**
 * EventCardSection - Clones the section with the wide background image of cyclists
 * and a floating white card on the left containing event details.
 */
const EventCardSection = () => {
  return (
    <section className="relative w-full py-20 px-4 md:px-0 flex justify-center items-center">
      {/* Background Container with rounded corners */}
      <div className="container relative overflow-hidden rounded-[32px] min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop"
            alt="Dogs in action"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Card Wrapper */}
        <div className="container relative z-10 px-6 md:px-12">
          <div className="bg-white max-w-[480px] rounded-[24px] p-8 md:p-12 shadow-sm flex flex-col gap-6">
            {/* Category Badge */}
            <div>
              <span className="inline-block bg-[#E6E6E6] text-[#000000] px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wider font-body">
                Festival Zone
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[#000000] text-[40px] md:text-[56px] font-bold leading-[1.1] font-display">
              Dedicated Dog Zone
            </h2>

            {/* Event Info (Dotted list style appearance) */}
            <div className="flex flex-col gap-2">
              <p className="text-[#000000] text-[16px] font-semibold font-body leading-tight">
                Best in Show · Grooming Competition
              </p>
              <p className="text-[#666666] text-[14px] font-medium font-body leading-relaxed max-w-[320px]">
                Pet’s Park, The Pearl, Qatar
              </p>
            </div>

            {/* Description */}
            <p className="text-[#666666] text-[16px] font-normal leading-[1.6] font-body">
              Experience the excitement of our Dog Zone, featuring fashion shows, K9 demonstrations, and the prestigious Best in Show competition. A place for dogs of all sizes to shine.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="/registration"
                className="inline-flex items-center justify-between gap-6 px-8 py-4 rounded-full bg-primary text-white font-semibold text-[16px] transition-transform hover:scale-105 active:scale-95 group font-body min-w-[200px]"
              >
                <span>Register your pet</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCardSection;