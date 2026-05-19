'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/media/Artboard 1@2x (1).png';
import { Menu, X, Globe } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const logoSrc = locale === 'ar' ? '/aa/Logo New ARABIC final.svg' : '/aa/Logo New Final English.svg';

  React.useEffect(() => {
    const registration = localStorage.getItem('nova_registration');
    if (registration) {
      setIsRegistered(true);
    }
  }, []);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('competitions'), href: '/competitions' },
    { name: t('tickets'), href: '/tickets' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('contact'), href: '/#contact' },
  ];

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full z-[130] bg-white/90 backdrop-blur-md border-b border-black/5">
        <nav className="flex items-center justify-center w-full min-h-[70px] md:min-h-[89px] py-[12px] md:py-[18px]">
          <div className="flex items-center justify-between w-full max-w-[95%] px-[20px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Image
                  src={logoSrc}
                  alt="Nova Paw Festival"
                  height={80}
                  width={150}
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
                  href={link.href as any}
                  className="group relative flex flex-col items-center justify-center h-[30px]"
                >
                  <p className="text-[13px] xl:text-[14px] font-bold text-black transition-colors group-hover:text-primary uppercase tracking-[0.2em]">
                    {link.name}
                  </p>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3 xl:gap-6 flex-shrink-0">
              {/* Language Switcher */}
              <button
                onClick={toggleLocale}
                className="flex items-center gap-2 px-4 py-2 rounded-sm hover:bg-black/5 transition-all text-[12px] font-bold uppercase tracking-widest text-black/60 hover:text-black"
              >
                <Globe className="w-4 h-4" />
                {locale === 'en' ? 'عربي' : 'English'}
              </button>

              <div className="w-[1px] h-6 bg-black/5" />

              {isRegistered ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 xl:px-[32px] py-[14px] bg-black hover:bg-primary transition-all hover:scale-105 active:scale-95 rounded-sm text-[12px] font-bold text-white uppercase tracking-[0.2em]"
                >
                  {t('dashboard')}
                </Link>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="text-[13px] font-bold text-black hover:text-primary transition-colors px-2 xl:px-4 uppercase tracking-[0.2em]"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href="/tickets"
                    className="inline-flex items-center justify-center px-5 xl:px-[28px] py-[13px] bg-primary hover:bg-black transition-all hover:scale-105 active:scale-95 rounded-sm text-[12px] font-bold text-white uppercase tracking-[0.2em]"
                  >
                    {t('tickets')}
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
        <div className="flex flex-col p-10 pt-[140px] gap-8 overflow-y-auto h-full">
          {/* Mobile Language Switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-3 text-[14px] font-bold uppercase tracking-[0.2em] text-primary mb-4"
          >
            <Globe className="w-5 h-5" />
            {locale === 'en' ? 'Switch to العربية' : 'التبديل إلى English'}
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href as any}
              className="text-[32px] font-display font-bold text-black hover:text-primary transition-colors border-b border-black/5 pb-6 tracking-tighter"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-4 pt-10">
            {isRegistered ? (
              <Link
                href="/dashboard"
                className="flex items-center justify-center w-full py-6 text-[14px] font-bold text-white bg-black rounded-sm uppercase tracking-[0.2em]  shadow-sm "
                onClick={() => setIsOpen(false)}
              >
                {t('dashboard')}
              </Link>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center w-full py-6 text-[14px] font-bold text-black border border-black/10 rounded-sm uppercase tracking-[0.2em]"
                  onClick={() => setIsOpen(false)}
                >
                  {t('login')}
                </Link>
                <Link
                  href="/tickets"
                  className="flex items-center justify-center w-full py-6 text-[14px] font-bold text-white bg-primary rounded-sm uppercase tracking-[0.2em]  shadow-sm  shadow-primary/20"
                  onClick={() => setIsOpen(false)}
                >
                  {t('tickets')}
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
