'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const logoSrc = locale === 'ar' ? '/aa/Logo New ARABIC final.svg' : '/aa/Logo New Final English.svg';

  useEffect(() => {
    const registration = localStorage.getItem('nova_registration');
    if (registration) setIsRegistered(true);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('competitions'), href: '/competitions' },
    { name: t('tickets'), href: '/tickets' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('contact'), href: '/contact' },
  ];

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      {/* ─── Desktop / Tablet Bar ─── */}
      <div
        className={`fixed top-0 left-0 right-0 w-full z-[130] transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
            : 'bg-white/80 backdrop-blur-md border-b border-black/[0.04]'
        }`}
      >
        <nav className="flex items-center justify-between w-full max-w-[1330px] mx-auto px-5 md:px-8 min-h-[70px] md:min-h-[80px]">

          {/* ── Logo ── */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src={logoSrc}
                alt="Nova Paw Festival"
                height={80}
                width={150}
                className="h-[44px] md:h-[56px] w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* ── Center Nav Links ── */}
          <div className="hidden lg:flex items-center gap-[6px]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href as any}
                className="group relative px-3 xl:px-4 py-2 flex flex-col items-center"
              >
                <span className="text-[11px] xl:text-[12px] font-bold text-[#465067] transition-colors duration-200 group-hover:text-[#FC7911] uppercase tracking-[0.22em] whitespace-nowrap">
                  {link.name}
                </span>
                {/* Animated underline */}
                <span className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4 h-[2px] bg-[#FC7911] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-full" />
              </Link>
            ))}
          </div>

          {/* ── Right: Lang + Login + CTA ── */}
          <div className="hidden md:flex items-center gap-2 xl:gap-4 flex-shrink-0">

            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-widest text-[#465067]/70 hover:text-[#FC7911] hover:bg-[#FC7911]/5 transition-all duration-200"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5" />
              {locale === 'en' ? 'عربي' : 'EN'}
            </button>

            <div className="w-px h-5 bg-black/8" />

            {isRegistered ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-black hover:bg-[#FC7911] transition-all duration-200 hover:scale-105 active:scale-95 rounded-sm text-[11px] font-bold text-white uppercase tracking-[0.2em]"
              >
                {t('dashboard')}
              </Link>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-[11px] font-bold text-[#465067] hover:text-[#FC7911] transition-colors px-2 uppercase tracking-[0.22em] whitespace-nowrap"
                >
                  {t('login')}
                </Link>

                {/* Pill-shaped Ticket CTA */}
                <Link
                  href="/tickets"
                  className="inline-flex items-center justify-center gap-1.5 px-5 xl:px-6 py-2.5 bg-[#FC7810] hover:bg-[#465067] transition-all duration-200 hover:scale-105 active:scale-95 rounded-full text-[11px] font-bold text-white uppercase tracking-[0.22em] shadow-sm shadow-[#FC7810]/20 whitespace-nowrap"
                >
                  {t('tickets')}
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden p-2 -mr-1 text-[#465067] hover:text-[#FC7911] transition-colors z-[140]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>
        </nav>
      </div>

      {/* ─── Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white z-[110] lg:hidden overflow-y-auto"
          >
            {/* Decorative top stripe */}
            <div className="h-1 w-full bg-gradient-to-r from-[#FC7911] via-[#FBC84F] to-[#FC7911]" />

            <div className="flex flex-col px-8 pt-[100px] pb-12 gap-0 h-full">

              {/* Mobile Lang Switcher */}
              <button
                onClick={toggleLocale}
                className="self-start flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#465067] hover:text-[#FC7911] transition-colors mb-10"
              >
                <Globe className="w-4 h-4" />
                {locale === 'en' ? 'Switch to العربية' : 'Switch to English'}
              </button>

              {/* Mobile Nav Links */}
              <div className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <Link
                      href={link.href as any}
                      className="flex items-center justify-between w-full py-5 border-b border-[#E6E6E6] text-[28px] font-display font-bold text-[#465067] hover:text-[#FC7911] transition-colors tracking-tighter group"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                      <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTAs */}
              <div className="flex flex-col gap-3 mt-auto pt-10">
                {isRegistered ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center w-full py-4 text-[13px] font-bold text-white bg-black rounded-sm uppercase tracking-[0.2em]"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('dashboard')}
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center w-full py-4 text-[13px] font-bold text-[#465067] border border-[#E6E6E6] rounded-sm uppercase tracking-[0.2em] hover:border-[#FC7911] hover:text-[#FC7911] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href="/tickets"
                      className="flex items-center justify-center w-full py-4 text-[13px] font-bold text-white bg-[#FC7810] rounded-sm uppercase tracking-[0.2em] hover:bg-[#465067] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('tickets')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
