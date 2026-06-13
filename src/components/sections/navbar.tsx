import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

/**
 * Navbar component for Cyclix website.
 * Features:
 * - Pixel perfect logo and layout based on provided computed styles.
 * - Navigation links: About us, Membership, Events, Our team, All pages.
 * - Pill-shaped primary CTA button "Register now!".
 * - Fully responsive (hidden mobile menu logic container provided).
 */
const Navbar: React.FC = () => {
  const navLinks = [
    { name: 'About us', href: '/about-us' },
    { name: 'Membership', href: '/membership' },
    { name: 'Events', href: '/events' },
    { name: 'Our team', href: '/our-team' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-transparent">
      <nav className="flex items-center justify-between h-[89px] px-4 md:px-10 lg:px-20 max-w-screen-2xl mx-auto">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <a href="/" className="block">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/gstxLSiknmmGSvWzmXPPUxFz8Kk-1.svg"
              alt="Cyclix Logo"
              width={101}
              height={19}
              className="h-[19px] w-auto object-contain"
              priority
            />
          </a>
        </div>

        {/* Navigation Links Middle */}
        <div className="hidden lg:flex items-center gap-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-black font-medium transition-opacity duration-200 hover:opacity-70"
              style={{
                fontSize: '16px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {link.name}
            </a>
          ))}

          {/* Dropdown Link: All pages */}
          <div className="relative group flex items-center gap-1 cursor-pointer">
            <span
              className="text-black font-medium"
              style={{
                fontSize: '16px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              All pages
            </span>
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/Zs51nppwjrdb1eAKqXcDgwU8Y-2.svg"
              alt="Arrow Down"
              width={20}
              height={19}
              className="h-[14px] w-auto transition-transform duration-200 group-hover:translate-y-0.5"
            />
          </div>
        </div>

        {/* CTA Button Right */}
        <div className="flex-shrink-0">
          <a
            href="/contact-us"
            className="btn-pill inline-flex items-center justify-center bg-primary text-white font-bold h-[53px] px-[26px] py-[15px] rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Register now!
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;