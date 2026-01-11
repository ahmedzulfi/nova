import React from 'react';
import Image from 'next/image';
import { ArrowRight, Facebook, Twitter, Instagram } from 'lucide-react';
import logo from '@/media/Artboard 1@2x (1).png';

/**
 * Footer Component
 */

const footerLinks = {
  about: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Dog Zone', href: '/about-us#dog-zone' },
    { label: 'Cat Zone', href: '/about-us#cat-zone' },
  ],
  schedule: [
    { label: 'Registration', href: '/registration' },
    { label: 'Sponsors', href: '/sponsorship' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
};

const Footer = () => {
  return (
    <footer className="w-full bg-white relative overflow-hidden pt-[100px] pb-10">
      <div className="container max-w-[1280px] px-6 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 mb-20">
          {/* Logo and Brand Info */}
          <div className="flex flex-col gap-8 max-w-[400px]">
            <Image
              src={logo}
              alt="Nova Paw Festival"
              height={100}
              className="h-[100px] w-auto object-contain"
            />
            <p className="text-[16px] leading-[1.6] text-[#666666]">
              Qatar’s first pet festival, bringing together pets, families, and professionals in a unique outdoor experience.
            </p>
          </div>

          {/* Link Columns Wrapper */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 flex-1 lg:ml-12">
            {/* About Column */}
            <div className="flex flex-col gap-6">
              <h6 className="text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-black">
                About
              </h6>
              <ul className="flex flex-col gap-4">
                {footerLinks.about.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[16px] text-[#666666] hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule Column */}
            <div className="flex flex-col gap-6">
              <h6 className="text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-black">
                Festival
              </h6>
              <ul className="flex flex-col gap-4">
                {footerLinks.schedule.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[16px] text-[#666666] hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col gap-6">
              <h6 className="text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-black">
                Contact
              </h6>
              <ul className="flex flex-col gap-4">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[16px] text-[#666666] hover:text-black transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="flex flex-col gap-8 max-w-[360px] w-full lg:ml-auto text-right md:text-left">
            <h6 className="text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-black">
              Subscribe for updates
            </h6>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-[#f2f2f2] border-none rounded-[12px] px-5 py-4 text-[16px] text-black outline-none placeholder:text-[#999999] transition-all duration-200 focus:ring-1 focus:ring-black"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-black hover:opacity-70 transition-opacity"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Large Watermark Text */}
        <div className="relative w-full overflow-hidden select-none pointer-events-none mt-10 md:mt-16">
          <h2 className="watermark-footer text-center translate-y-[15%] text-[clamp(100px,14vw,300px)] font-bold text-[#f0f0f0] leading-[0.8] tracking-[-0.05em] uppercase">
            NOVA PAW
          </h2>
        </div>

        {/* Bottom Social & Copyright Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-[-20px] relative z-20">
          <div className="flex items-center gap-1 text-[14px] text-[#999999] mb-4 md:mb-0">
            <span>© Nova Paw Festival 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-[#666666] hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-[#666666] hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e5e5e5] text-[#666666] hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Made with Framer Badge (Bottom Right) */}
      <a
        href="https://framer.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-white border border-[#e5e5e5] rounded-[8px] px-3 py-1.5 flex items-center gap-2 shadow-sm hover:bg-[#f9f9f9] transition-colors z-[100] text-[12px] font-medium"
      >
        <svg
          width="13"
          height="19"
          viewBox="0 0 13 19"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H12.5V6.25H6.25L0 0Z" />
          <path d="M0 6.25H12.5V12.5H6.25L0 6.25Z" />
          <path d="M0 12.5H6.25V18.75L0 12.5Z" />
        </svg>
        <span>Made in Framer</span>
      </a>
    </footer>
  );
};

export default Footer;