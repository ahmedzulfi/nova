'use client';

import React from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Instagram,
  Youtube,
  Music2,
  Mail,
  Phone,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import logo from '@/media/Artboard 1@2x (1).png';

const Footer = () => {
  const t = useTranslations('Footer');
  const nt = useTranslations('Navigation');
  const locale = useLocale();

  const logoSrc = locale === 'ar' ? '/aa/Logo New ARABIC final.svg' : '/aa/Logo New Final English.svg';

  const footerLinks = {
    navigation: [
      { label: nt('home'), href: '/' },
      { label: nt('about'), href: '/about' },
      { label: nt('competitions'), href: '/competitions' },
      { label: nt('tickets'), href: '/tickets' },
      { label: nt('gallery'), href: '/gallery' },
      { label: nt('contact'), href: '/#contact' },
    ],
    support: [
      { label: t('terms'), href: '/terms' },
      { label: t('privacy'), href: '/privacy' },
    ],
  };

  return (
    <footer className="w-full bg-[#050505] text-white pt-24 pb-12 overflow-hidden relative border-t border-white/5">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

      <div className="container max-w-[1280px] px-6 mx-auto relative z-10">

        {/* Top Section: High Impact Newsletter */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pb-20 mb-20 border-b border-white/10">
          <div className="max-w-[640px] text-center lg:text-start">
            <h2 className="text-[32px] md:text-[54px] font-bold font-display leading-[1.1] mb-6 tracking-tighter text-white">
              {t('newsletter_title')} <span className="text-primary italic">{t('newsletter_italic')}</span>
            </h2>
            <p className="text-white/50 text-[18px] md:text-[20px] font-medium leading-relaxed">
              {t('newsletter_desc')}
            </p>
          </div>

          <div className="w-full lg:max-w-[460px]">
            <div className="relative group">
              <input
                type="email"
                placeholder={t('newsletter_placeholder')}
                className="w-full bg-white/5 border border-white/10 rounded-sm px-8 py-6 text-[16px] text-white outline-none placeholder:text-white/20 focus:border-primary transition-all duration-500"
              />
              <button
                type="button"
                className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 bg-primary text-white h-14 px-8 rounded-sm font-bold uppercase tracking-[0.2em] text-[12px] flex items-center gap-3 hover:bg-white hover:text-black transition-all  shadow-sm  shadow-primary/20"
              >
                {t('newsletter_btn')}
                <ArrowRight size={18} className="rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 mb-24">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-10">
            <Image
              src={logoSrc}
              alt="Nova Paw"
              height={80}
              width={150}
              className="h-[70px] md:h-[90px] w-auto object-contain brightness-0 invert"
            />
            <p className="text-white/40 text-[16px] leading-relaxed max-w-[340px] font-medium">
              {t('brand_desc')}
            </p>

            <div className="flex items-center gap-5">
              <a href="https://www.instagram.com/nova_paw_festival/" target="_blank" className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-white  shadow-sm ">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@nova_paw_festival" target="_blank" className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-white  shadow-sm ">
                <Music2 size={20} />
              </a>
              <a href="https://www.youtube.com/@paw_festival" target="_blank" className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-white  shadow-sm ">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-10">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary">{t('col_discover')}</h4>
            <ul className="space-y-5">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link href={link.href as any} className="text-white/50 hover:text-white transition-all flex items-center group font-bold text-[14px] uppercase tracking-widest">
                    <ChevronRight size={14} className="ltr:mr-2 rtl:ml-2 opacity-0 ltr:-ml-4 rtl:-mr-4 group-hover:opacity-100 ltr:group-hover:ml-0 rtl:group-hover:mr-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (Integrated Directly) */}
          <div className="space-y-10">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary">{t('col_contact')}</h4>
            <ul className="space-y-8">
              <li className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/20">{t('contact_call')}</p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center">
                    <Phone size={14} className="text-primary" />
                  </div>
                  <a href="tel:+97433022248" className="text-[16px] font-bold hover:text-primary transition-colors tracking-tight">+974 3302 2248</a>
                </div>
              </li>
              <li className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/20">{t('contact_email')}</p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center">
                    <Mail size={14} className="text-primary" />
                  </div>
                  <a href={`mailto:${t('val_email')}`} className="text-[16px] font-bold hover:text-primary transition-colors">{t('val_email')}</a>
                </div>
              </li>
              <li className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/20">{t('contact_location')}</p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <a href="https://www.google.com/maps/place/Pet+Park/@25.3713397,51.5206187,5553m/data=!3m1!1e3!4m10!1m2!2m1!1spets+park!3m6!1s0x3e45c36bebd7c1ff:0xe9fe34995eb0a7b4!8m2!3d25.3713397!4d51.5566676!15sCglwZXRzIHBhcmtaCyIJcGV0cyBwYXJrkgEEcGFya5oBJENoZERTVWhOTUc5blMwVkpRMEZuU1VNdGQyUmZaeTFSUlJBQuABAPoBBAgAEDQ!16s%2Fg%2F11tdhzkd61?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-[16px] font-bold leading-tight hover:text-primary transition-colors block">
                    {t('location_val')}<br />
                    <span className="text-[13px] text-white/40 font-medium mt-1 block group-hover:text-primary/70 transition-colors">{t('date_val')}</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-10">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary">{t('col_resources')}</h4>
            <ul className="space-y-5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as any}
                    className="text-white/50 hover:text-white transition-all flex items-center group font-bold text-[14px] uppercase tracking-widest"
                  >
                    <ChevronRight size={14} className="ltr:mr-2 rtl:ml-2 opacity-0 ltr:-ml-4 rtl:-mr-4 group-hover:opacity-100 ltr:group-hover:ml-0 rtl:group-hover:mr-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-white/20 text-[13px] font-medium gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2">
            <span>© 2026 Nova Paw Festival · {t('rights')}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="uppercase tracking-[0.2em] text-[11px]">Doha, Qatar</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
