'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/media/Artboard 1@2x (1).png';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  React.useEffect(() => {
    const registration = localStorage.getItem('nova_registration');
    if (registration) {
      setIsRegistered(true);
    }
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Competitions', href: '/competitions' },
    { name: 'Tickets', href: '/tickets' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full z-[130] bg-white/90 backdrop-blur-md border-b border-[#F0F0F0]">
        <nav className="flex items-center justify-center w-full min-h-[70px] md:min-h-[89px] py-[12px] md:py-[18px]">
          <div className="flex items-center justify-between w-full max-w-[1330px] px-[20px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Image
                  src={logo}
                  alt="Nova Paw Festival"
                  height={80}
                  width={80}
                  className="h-[50px] md:h-[80px] w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Nav Links - Desktop */}
            <div className="hidden lg:flex items-center gap-[30px] xl:gap-[40px]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative flex flex-col items-center justify-center h-[30px]"
                >
                  <p className="text-[14px] xl:text-[15px] font-semibold text-black transition-colors group-hover:text-primary uppercase tracking-widest">
                    {link.name}
                  </p>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3 xl:gap-4 flex-shrink-0">
              {isRegistered ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 xl:px-[32px] py-[14px] bg-black hover:bg-primary transition-all hover:scale-105 active:scale-95 rounded-sm text-[12px] font-bold text-white uppercase tracking-[0.2em]"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="text-[13px] font-bold text-black hover:text-primary transition-colors px-2 xl:px-4 uppercase tracking-widest"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/tickets"
                    className="inline-flex items-center justify-center px-5 xl:px-[28px] py-[13px] bg-primary hover:bg-black transition-all hover:scale-105 active:scale-95 rounded-sm text-[12px] font-bold text-white uppercase tracking-widest"
                  >
                    Get Tickets
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-black hover:text-primary transition-colors z-[140]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-white z-[110] transition-transform duration-500 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
      `} style={{ backgroundColor: '#ffffff' }}>
        <div className="flex flex-col p-8 pt-[120px] gap-6 overflow-y-auto h-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[28px] font-display font-bold text-black hover:text-primary transition-colors border-b border-[#F0F0F0] pb-4 tracking-tighter"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-4 pt-8">
            {isRegistered ? (
              <Link
                href="/dashboard"
                className="flex items-center justify-center w-full py-5 text-[16px] font-bold text-white bg-black rounded-sm uppercase tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center w-full py-5 text-[16px] font-bold text-black border-2 border-black rounded-sm uppercase tracking-widest"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/tickets"
                  className="flex items-center justify-center w-full py-5 text-[16px] font-bold text-white bg-primary rounded-sm uppercase tracking-widest"
                  onClick={() => setIsOpen(false)}
                >
                  Get Tickets
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
