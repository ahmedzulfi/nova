import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const EventHighlight = () => {
  return (
    <section className="w-full py-20 px-4 md:px-10 bg-white">
      <div className="container mx-auto">
        <div className="relative w-full rounded-[2rem] overflow-hidden min-h-[600px] flex items-center md:items-end">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2070&auto=format&fit=crop"
              alt="Pet Festival Zones"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating Card Content Wrapper */}
          <div className="relative z-10 w-full max-w-full md:max-w-7xl mx-auto px-4 md:px-8 pb-8 md:pb-12">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-[500px] shadow-sm">
              <div className="mb-6">
                <span className="inline-block bg-[#F3F3F3] text-[#111111] text-[12px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                  Festival Zones
                </span>
                <h2 className="text-[40px] md:text-[56px] text-[#111111] mb-6 tracking-tight">
                  Dog Zone & Cat Zone
                </h2>
              </div>

              <div className="space-y-1 mb-6 text-[#111111] font-medium text-[16px]">
                <p>April 3-4, 2026</p>
                <p>Pet’s Park, The Pearl, Qatar</p>
              </div>

              <div className="mb-8">
                <p className="text-[#666666] leading-relaxed text-[16px]">
                  Explore our dedicated zones designed for maximum fun and safety. From high-energy agility shows in the Dog Zone to the tranquil atmosphere of the Cat Dome, we have created the perfect environment for every pet and owner.
                </p>
              </div>

              <a
                href="/registration"
                className="group inline-flex items-center justify-between w-full md:w-auto md:min-w-[200px] bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                <span>Register Your Pet</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHighlight;