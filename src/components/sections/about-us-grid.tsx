import React from 'react';
import Image from 'next/image';

const AboutUsGrid = () => {
  return (
    <section className="py-20 md:py-32 bg-white" id="about-us">
      <div className="container mx-auto px-6 max-w-[1280px]">
        {/* Top Bento Block: Yellow Main Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8 bg-primary rounded-[32px] p-8 md:p-12 flex flex-col justify-between items-start min-h-[460px]">
            <div className="space-y-8">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E6E6E6]/50 text-[12px] font-semibold uppercase tracking-wider text-black">
                About the Festival
              </span>
              <h2 className="text-[32px] md:text-[56px] font-semibold leading-[1.1] tracking-tight text-black max-w-[640px]">
                United by passion for animals and community, we bring people together to share unforgettable experiences with their pets
              </h2>
            </div>
            <a
              href="/about-us"
              className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white font-semibold transition-transform hover:scale-105 active:scale-95 text-[16px]"
            >
              Learn More About the Festival
            </a>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4 h-full">
            <div className="relative h-full min-h-[460px] lg:min-h-0 rounded-[32px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop"
                alt="Happy Dog"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <div className="relative h-full min-h-[460px] lg:min-h-0 rounded-[32px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop"
                alt="Curious Cat"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Bento Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Black Block: Mission & Cyclist */}
          <div className="lg:col-span-7 bg-black rounded-[32px] overflow-hidden flex flex-col">
            <div className="p-8 md:p-12">
              <h4 className="text-[24px] md:text-[32px] font-semibold leading-[1.3] text-white">
                Our mission is to bring together pet owners of all levels to explore dedicated zones, challenge their pets in shows, and foster a spirit of animal welfare
              </h4>
            </div>
            <div className="relative flex-grow min-h-[300px] mt-auto mx-6 mb-6 rounded-[24px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
                alt="Pet Festival Excitement"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Floating Labels */}
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black text-white text-[12px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                Welfare
              </div>
              <div className="absolute top-1/2 right-6 -translate-y-1/2 px-4 py-1.5 rounded-full bg-black text-white text-[12px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                Inspire
              </div>
              <div className="absolute bottom-6 left-1/4 px-4 py-1.5 rounded-full bg-black text-white text-[12px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                Care
              </div>
            </div>
          </div>

          {/* Yellow Block: Register */}
          <div className="lg:col-span-5 bg-accent rounded-[32px] p-8 md:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-[32px] md:text-[48px] font-semibold leading-[1.1] text-black">
                Join the festival register now!
              </h2>
              <p className="text-[18px] text-black/70 leading-[1.6]">
                Secure your spot today and be part of an exhilarating pet celebration that you won't want to miss.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <a
                href="/registration"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white font-semibold transition-transform hover:scale-105 active:scale-95 text-[16px]"
              >
                Register now!
              </a>

              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop"
                ].map((avatar, i) => (
                  <div key={i} className="relative w-10 h-10 rounded-full border-2 border-accent overflow-hidden">
                    <Image
                      src={avatar}
                      alt={`Festival pet ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-black border-2 border-accent flex items-center justify-center text-white text-[12px] font-bold">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsGrid;