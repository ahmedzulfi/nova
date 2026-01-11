import React from 'react';
import Image from 'next/image';
import logo from '@/media/Artboard 1@2x (1).png';

const Navigation = () => {
  const navLinks = [
    { name: 'About us', href: '/about-us' },
    { name: 'Tickets', href: '/tickets' },
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
              <Image
                src={logo}
                alt="Nova Paw Festival"
                height={80}
                width={80}
                className="h-[80px] w-auto object-contain"
                priority
              />
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

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href="/tickets"
              className="hidden sm:inline-flex items-center justify-center px-[24px] py-[12px] bg-white border border-[#F0F0F0] hover:bg-[#F9F9F9] transition-all hover:scale-105 active:scale-95 rounded-full text-[15px] font-bold text-black"
            >
              Buy Ticket
            </a>
            <a
              href="/registration"
              className="inline-flex items-center justify-center px-[28px] py-[13px] bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 rounded-full text-[15px] font-bold text-white"
            >
              Register Pet
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
