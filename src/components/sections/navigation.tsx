'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navigation - Nova Paw Festival
 * 
 * Design: Transparent-to-frosted scroll behavior.
 * Layout: Logo centered, nav links split left/right on desktop.
 * Supports: RTL (Arabic), scroll-aware bg, mobile fullscreen overlay.
 */
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const logoSrc = locale === 'ar'
    ? '/aa/Logo New ARABIC final.svg'
    : '/aa/Logo New Final English.svg';

  useEffect(() => {
    const registration = localStorage.getItem('nova_registration');
    if (registration) setIsRegistered(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const leftLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('competitions'), href: '/competitions' },
  ];

  const rightLinks = [
    { name: t('gallery'), href: '/gallery' },
    { name: t('contact'), href: '/contact' },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <>
      {/* Desktop + Tablet Navbar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[130] w-full"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`transition-all duration-500 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl border-b border-black/6 shadow-sm shadow-black/5'
              : 'bg-transparent border-b border-transparent'
          }`}
        >
          <nav className="flex items-center justify-between min-h-[72px] md:min-h-[80px] px-5 md:px-10 xl:px-16 max-w-[1440px] mx-auto">

            {/* Left Nav Links - Desktop */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10 flex-1">
              {leftLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href as any}
                  className="group relative"
                >
                  <span className={`text-[11px] font-bold uppercase tracking-[0.22em] transition-colors duration-200 ${
                    isScrolled ? 'text-[#465067] group-hover:text-[#FC7911]' : 'text-white/90 group-hover:text-white'
                  }`}>
                    {link.name}
                  </span>
                  <span className={`absolute -bottom-0.5 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-[#FC7911]' : 'bg-white'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Centered Logo */}
            <div className="flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <Link href="/" className="block">
                <Image
                  src={logoSrc}
                  alt="Nova Paw Festival"
                  height={52}
                  width={140}
                  className={`h-[40px] md:h-[52px] w-auto object-contain transition-all duration-300 ${
                    isScrolled ? '' : 'brightness-0 invert'
                  }`}
                  priority
                />
              </Link>
            </div>

            {/* Right Nav Links + CTA - Desktop */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10 flex-1 justify-end">
              {rightLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href as any}
                  className="group relative"
                >
                  <span className={`text-[11px] font-bold uppercase tracking-[0.22em] transition-colors duration-200 ${
                    isScrolled ? 'text-[#465067] group-hover:text-[#FC7911]' : 'text-white/90 group-hover:text-white'
                  }`}>
                    {link.name}
                  </span>
                  <span className={`absolute -bottom-0.5 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-[#FC7911]' : 'bg-white'
                  }`} />
                </Link>
              ))}

              <div className={`h-4 w-px ${isScrolled ? 'bg-black/10' : 'bg-white/20'}`} />

              {/* Language Toggle */}
              <button
                onClick={toggleLocale}
                className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-200 ${
                  isScrolled ? 'text-[#465067] hover:text-[#FC7911]' : 'text-white/80 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                {locale === 'en' ? 'عربي' : 'EN'}
              </button>

              {/* Primary CTA */}
              {isRegistered ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-[#FC7810] hover:bg-[#465067] transition-all active:scale-95 rounded-sm text-[11px] font-bold text-white uppercase tracking-[0.2em]"
                >
                  {t('dashboard')}
                </Link>
              ) : (
                <Link
                  href="/tickets"
                  className={`inline-flex items-center justify-center px-6 py-2.5 transition-all active:scale-95 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] ${
                    isScrolled
                      ? 'bg-[#FC7810] hover:bg-[#465067] text-white'
                      : 'bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm'
                  }`}
                >
                  {t('tickets')}
                </Link>
              )}
            </div>

            {/* Mobile: Logo + Hamburger */}
            <div className="flex items-center gap-4 lg:hidden ml-auto">
              <button
                onClick={toggleLocale}
                className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                  isScrolled ? 'text-[#465067]' : 'text-white'
                }`}
              >
                {locale === 'en' ? 'ع' : 'EN'}
              </button>
              <button
                className={`p-1 transition-colors z-[140] ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

          </nav>
        </div>
      </motion.div>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[120] bg-[#1a1714] flex flex-col lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button inside overlay */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col justify-center h-full px-10 gap-2 pt-20">
              {/* Logo in mobile menu */}
              <div className="mb-10">
                <Image
                  src="/aa/Logo New Final English.svg"
                  alt="Nova Paw Festival"
                  width={120}
                  height={45}
                  className="h-10 w-auto brightness-0 invert opacity-70"
                />
              </div>

              {allLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href as any}
                    className="block py-4 text-[28px] font-bold text-white/70 hover:text-white tracking-tighter border-b border-white/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="flex flex-col gap-3 pt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {isRegistered ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center w-full py-4 text-[13px] font-bold text-white bg-[#FC7810] rounded-sm uppercase tracking-[0.2em]"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('dashboard')}
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center w-full py-4 text-[13px] font-bold text-white/70 border border-white/10 rounded-sm uppercase tracking-[0.2em]"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href="/tickets"
                      className="flex items-center justify-center w-full py-4 text-[13px] font-bold text-white bg-[#FC7810] rounded-sm uppercase tracking-[0.2em]"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('tickets')}
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
