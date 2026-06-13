'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X, Ticket, Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about-us' },
    { name: t('competitions'), href: '/competitions' },
    { name: t('tickets'), href: '/tickets' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('contact'), href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const logoSrc =
    locale === 'ar'
      ? '/aa/Logo New ARABIC final.svg'
      : '/aa/Logo New Final English.svg';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#1a1209]/90 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <nav className="flex items-center justify-between h-[76px]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative z-10">
              <Image
                src={logoSrc}
                alt="Nova Paw Festival"
                width={140}
                height={40}
                className="h-[38px] w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] font-semibold uppercase tracking-[1.5px] transition-all duration-200 rounded-sm group ${
                    isActive(link.href)
                      ? 'text-[#FC7911]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#FC7911] rounded-full transition-transform duration-300 origin-left ${
                      isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Locale Switcher */}
              <Link
                href={pathname}
                locale={locale === 'en' ? 'ar' : 'en'}
                className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold uppercase tracking-[1px] text-white/60 hover:text-white transition-colors duration-200"
              >
                <Globe className="w-3.5 h-3.5" />
                {locale === 'en' ? 'عربي' : 'EN'}
              </Link>

              {/* CTA */}
              <Link
                href="/tickets"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FC7911] hover:bg-[#e06a0a] text-white text-[12px] font-bold uppercase tracking-[1.5px] rounded-sm transition-all duration-200 active:scale-[0.97] shadow-md shadow-[#FC7911]/30"
              >
                <Ticket className="w-3.5 h-3.5" />
                {t('tickets')}
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-10 p-2 text-white transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0d0a05]/95 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-[76px] left-0 right-0 transition-all duration-400 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col px-5 py-6 gap-1 border-t border-white/10">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3.5 text-[14px] font-bold uppercase tracking-[1.5px] rounded-sm transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-[#FC7911] bg-[#FC7911]/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                style={{ transitionDelay: isOpen ? `${i * 40}ms` : '0ms' }}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/tickets"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#FC7911] text-white text-[13px] font-bold uppercase tracking-[1.5px] rounded-sm transition-all duration-200"
              >
                <Ticket className="w-4 h-4" />
                Get Tickets
              </Link>
              <Link
                href={pathname}
                locale={locale === 'en' ? 'ar' : 'en'}
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-[12px] font-bold uppercase tracking-[1px] text-white/50 hover:text-white transition-colors duration-200"
              >
                <Globe className="w-3.5 h-3.5" />
                {locale === 'en' ? 'عربي' : 'English'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;