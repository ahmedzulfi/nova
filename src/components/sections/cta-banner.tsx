import React from 'react';
import Image from 'next/image';

interface CTABannerProps {
  title?: React.ReactNode;
  subtitle?: string;
  primaryBtnText?: string;
  primaryBtnHref?: string;
  secondaryBtnText?: string;
  secondaryBtnHref?: string;
}

const CTABanner = ({
  title = <>Join the Nova Paw <br className="hidden md:block" /> Festival 2026</>,
  subtitle = "Don’t miss out on this incredible opportunity to celebrate your pets, connect with fellow lovers, and experience the thrill of the festival!",
  primaryBtnText = "Register Your Pet",
  primaryBtnHref = "/registration",
  secondaryBtnText = "Buy Tickets",
  secondaryBtnHref = "/tickets"
}: CTABannerProps) => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1350px]">
        <div className="relative w-full rounded-sm overflow-hidden min-h-[500px] lg:h-[650px] flex items-center shadow-sm">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=2070&auto=format&fit=crop"
              alt="Nova Paw Festival"
              fill
              className="object-cover -scale-x-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
          
          <div className="relative z-10 px-8 lg:px-20 py-12 lg:py-24 max-w-[900px]">
            <h2 className="text-white text-[32px] lg:text-[64px] font-black font-display leading-[0.95] mb-8 tracking-tighter drop-shadow-2xl">
              {title}
            </h2>
            <p className="text-white/90 text-[18px] lg:text-[22px] font-medium leading-[1.6] max-w-[600px] mb-12 drop-shadow-md font-body">
              {subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary hover:bg-white hover:text-black text-white font-bold px-12 py-6    rounded-sm  transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                href={primaryBtnHref}
              >
                <span className="text-[18px]">{primaryBtnText}</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-white/90 text-black font-bold px-12 py-6    rounded-sm  transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                href={secondaryBtnHref}
              >
                <span className="text-[18px]">{secondaryBtnText}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;