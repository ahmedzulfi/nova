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
      {/* ─── Floating Pill Navbar (Top Center) ─── */}
      <div className="fixed top-6 left-0 right-0 w-full z-[130] flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center justify-between gap-6 md:gap-12 px-6 py-2.5 bg-white/15 backdrop-blur-xl border border-white/20 rounded-full shadow-lg max-w-[540px] w-full"
        >
          {/* Logo */}
          <Link href="/" className="block flex-shrink-0">
            <Image
              src={logoSrc}
              alt="Nova Paw Festival"
              height={50}
              width={110}
              className="h-[32px] md:h-[40px] w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>

          {/* Right section: Lang & Menu */}
          <div className="flex items-center gap-3">
            {/* Lang Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-[#FC7911] hover:bg-white/10 transition-all duration-200"
            >
              <Globe className="w-3.5 h-3.5" />
              {locale === 'en' ? 'AR' : 'EN'}
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 active:scale-95 text-[11px] font-bold uppercase tracking-[0.15em]"
            >
              <span>Menu</span>
              {isOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* ─── Full-Screen Mobile/Desktop Overlay Menu ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/80 z-[120] flex items-center justify-center"
          >
            <div className="w-full max-w-[1330px] mx-auto px-6 md:px-12 flex flex-col items-center gap-12 text-center">
              
              {/* Menu Links */}
              <div className="flex flex-col gap-6 md:gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <Link
                      href={link.href as any}
                      className="text-[32px] md:text-[54px] font-display font-bold text-white hover:text-[#FC7911] transition-colors tracking-tighter block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col sm:flex-row gap-4 w-full max-w-[420px]"
              >
                {isRegistered ? (
                  <Link
                    href="/dashboard"
                    className="flex-1 flex items-center justify-center py-4 text-[12px] font-bold text-white bg-[#FC7810] hover:bg-white hover:text-black rounded-full uppercase tracking-[0.2em] transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('dashboard')}
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex-1 flex items-center justify-center py-4 text-[12px] font-bold text-white border border-white/20 hover:bg-white hover:text-black rounded-full uppercase tracking-[0.2em] transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href="/tickets"
                      className="flex-1 flex items-center justify-center py-4 text-[12px] font-bold text-white bg-[#FC7810] hover:bg-[#465067] rounded-full uppercase tracking-[0.2em] transition-all"
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
