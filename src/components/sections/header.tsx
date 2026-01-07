import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e5e5e5]">
      <div className="container mx-auto max-w-[1330px] h-[89px] px-[15px] flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <a href="/" className="block">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/gstxLSiknmmGSvWzmXPPUxFz8Kk-1.svg"
              alt="Cyclix Logo"
              width={101}
              height={19}
              priority
              className="object-contain"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-[40px]">
          <a
            href="/about-us"
            className="text-[16px] font-semibold text-[#111111] leading-[1.2] hover:opacity-70 transition-opacity"
          >
            About us
          </a>
          <a
            href="/membership"
            className="text-[16px] font-semibold text-[#111111] leading-[1.2] hover:opacity-70 transition-opacity"
          >
            Membership
          </a>
          <a
            href="/events"
            className="text-[16px] font-semibold text-[#111111] leading-[1.2] hover:opacity-70 transition-opacity"
          >
            Events
          </a>
          <a
            href="/our-team"
            className="text-[16px] font-semibold text-[#111111] leading-[1.2] hover:opacity-70 transition-opacity"
          >
            Our team
          </a>
          <div className="relative group cursor-pointer flex items-center gap-1">
            <span className="text-[16px] font-semibold text-[#111111] leading-[1.2]">
              All pages
            </span>
            <ChevronDown size={18} className="text-[#111111]" />
          </div>
        </nav>

        {/* Call to Action Button */}
        <div className="flex-shrink-0">
          <a
            href="/contact-us"
            className="bg-[#f7f58e] text-[#111111] px-[32px] py-[16px] rounded-full text-[14px] font-bold transition-all duration-200 hover:scale-105 active:scale-95 inline-flex items-center justify-center whitespace-nowrap"
          >
            Register now!
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;