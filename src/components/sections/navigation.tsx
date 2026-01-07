import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const Navigation = () => {
    const navLinks = [
      { name: 'About us', href: '/about-us' },
      { name: 'Blog', href: '/blog' },
      { name: 'Registration', href: '/registration' },
      { name: 'Sponsors', href: '/sponsorship' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Contact', href: '/contact' },
    ];

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#F0F0F0]">
      <nav className="flex items-center justify-center w-full min-h-[89px] py-[18px]">
        <div className="flex items-center justify-between w-full max-w-[1330px] px-[15px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
                <span className="text-[24px] font-bold tracking-tighter text-black font-display uppercase">
                  NOVA PAW<span className="text-primary">.</span>
                </span>
              </a>
            </div>
  
            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-[40px]">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative flex flex-col items-center justify-center h-[30px]"
                >
                  <p className="text-[15px] font-semibold text-black transition-colors group-hover:text-primary">
                    {link.name}
                  </p>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
  
            {/* CTA Button */}
            <div className="flex-shrink-0">
              <a
                href="/registration"
                className="inline-flex items-center justify-center px-[32px] py-[14px] bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 rounded-full text-[16px] font-bold text-white shadow-sm"
              >
                Register Now
              </a>
            </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
