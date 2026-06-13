'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe, Ticket, ChevronRight } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const logoSrc =
    locale === 'ar'
      ? '/aa/Logo New ARABIC final.svg'
      : '/aa/Logo New Final English.svg';

  useEffect(() => {
    const registration = localStorage.getItem('nova_registration');
    if (registration) setIsRegistered(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('competitions'), href: '/competitions' },
    { name: t('tickets'), href: '/tickets' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('contact'), href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      {/* ─── Main Navbar ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[130] transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-white/96 backdrop-blur-xl shadow-sm shadow-black/[0.06] border-b border-black/[0.06]'
            : 'bg-white/80 backdrop-blur-md border-b border-black/[0.05]'
        }`}
      >
        <nav className="flex items-center justify-between mx-auto max-w-[1380px] px-5 md:px-8 lg:px-12 min-h-[70px] md:min-h-[86px]">

          {/* Logo */}
          <div className="flex-shrink-0 relative z-10">
            <Link href="/" className="block">
              <Image
                src={logoSrc}
                alt="Nova Paw Festival"
                height={80}
                width={160}
                className="h-[44px] md:h-[58px] w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href as any}
                className={`relative px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[1.8px] transition-all duration-200 rounded-sm group ${
                  isActive(link.href)
                    ? 'text-[#FC7911]'
                    : 'text-[#465067] hover:text-[#FC7911]'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0.5 left-4 right-4 h-[1.5px] bg-[#FC7911] rounded-full transition-transform duration-300 origin-left ${
                    isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#465067]/60 hover:text-[#FC7911] transition-all duration-200 rounded-sm hover:bg-[#FC7911]/[0.06]"
            >
              <Globe className="w-3.5 h-3.5" />
              {locale === 'en' ? 'عربي' : 'EN'}
            </button>

            <div className="w-px h-5 bg-black/10 mx-1" />

            {isRegistered ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#465067] hover:bg-[#37404f] text-white text-[11px] font-bold uppercase tracking-[1.5px] rounded-sm transition-all duration-200"
              >
                {t('dashboard')}
              </Link>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2.5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#465067]/70 hover:text-[#465067] transition-all duration-200"
                >
                  {t('login')}
                </Link>
                <Link
                  href="/tickets"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FC7911] hover:bg-[#e06a0a] text-white text-[11px] font-bold uppercase tracking-[1.5px] rounded-sm transition-all duration-200 active:scale-[0.97] shadow-md shadow-[#FC7911]/20"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  {t('tickets')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative z-10 p-2.5 -mr-1 text-[#465067] transition-colors hover:text-[#FC7911]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      <div
        className={`fixed inset-0 z-[120] lg:hidden transition-all duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Slide-in panel — light */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-[340px] bg-white border-l border-black/[0.07] flex flex-col shadow-2xl shadow-black/10 transition-all duration-400 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-5 border-b border-black/[0.06]">
            <Image
              src={logoSrc}
              alt="Nova Paw Festival"
              height={60}
              width={120}
              className="h-[38px] w-auto object-contain"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#465067]/40 hover:text-[#465067] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-2.5 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#FC7911] hover:bg-[#FC7911]/[0.06] transition-colors border-b border-black/[0.04]"
          >
            <Globe className="w-3.5 h-3.5" />
            {locale === 'en' ? 'Switch to عربي' : 'Switch to English'}
          </button>

          {/* Nav links */}
          <div className="flex flex-col py-2 flex-1 overflow-y-auto">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href as any}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-6 py-4 text-[13px] font-bold uppercase tracking-[1.5px] transition-all duration-200 border-b border-black/[0.04] ${
                  isActive(link.href)
                    ? 'text-[#FC7911] bg-[#FC7911]/[0.05]'
                    : 'text-[#465067] hover:text-[#FC7911] hover:bg-[#FC7911]/[0.04]'
                }`}
                style={{ transitionDelay: isOpen ? `${i * 35}ms` : '0ms' }}
              >
                {link.name}
                <ChevronRight
                  className={`w-4 h-4 ${
                    isActive(link.href) ? 'text-[#FC7911]' : 'text-[#465067]/20'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Bottom action buttons */}
          <div className="px-6 pb-8 pt-4 flex flex-col gap-3 border-t border-black/[0.06]">
            {isRegistered ? (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center py-4 text-[12px] font-bold uppercase tracking-[1.5px] text-white bg-[#465067] hover:bg-[#37404f] rounded-sm transition-all duration-200"
              >
                {t('dashboard')}
              </Link>
            ) : (
              <>
                <Link
                  href="/tickets"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-4 text-[12px] font-bold uppercase tracking-[1.5px] text-white bg-[#FC7911] hover:bg-[#e06a0a] rounded-sm transition-all duration-200 shadow-md shadow-[#FC7911]/20"
                >
                  <Ticket className="w-4 h-4" />
                  Get Tickets
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center py-3.5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#465067]/50 hover:text-[#465067] transition-colors"
                >
                  {t('login')}
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
