import React from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Instagram,
  Youtube,
  Music2,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  ChevronRight
} from 'lucide-react';
import logo from '@/media/Artboard 1@2x (1).png';

/**
 * Completely Redesigned Premium Footer
 */

const footerLinks = {
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about-us' },
    { label: 'Competitions', href: '#competitions' },
    { label: 'Tickets', href: '#tickets' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '#contact' },
  ],
  explore: [
    { label: 'Dog Zone', href: '/about-us#dog-zone' },
    { label: 'Cat Zone', href: '/about-us#cat-zone' },
    { label: 'Sponsorship', href: '/sponsorship' },
    { label: 'Photo Gallery', href: '/gallery' },
  ],
  support: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

      <div className="container max-w-[1280px] px-6 mx-auto relative z-10">

        {/* Top Section: High Impact Newsletter */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pb-20 mb-20 border-b border-white/10">
          <div className="max-w-[600px] text-center lg:text-left">
            <h2 className="text-[28px] md:text-[48px] font-bold font-display leading-[1.1] mb-4 tracking-tight text-white">
              Don’t miss a single <span className="text-primary italic">wag, purr, or roar.</span>
            </h2>
            <p className="text-white/60 text-[18px]">
              Subscribe for exclusive festival updates, competition results, and early-bird ticket access.
            </p>
          </div>

          <div className="w-full lg:max-w-[440px]">
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white/5 border border-white/10    rounded-sm  px-6 py-5 text-[16px] text-white outline-none placeholder:text-white/30 focus:border-primary transition-all duration-300"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-black h-12 px-6  rounded-sm font-bold flex items-center gap-2 hover:scale-[1.05] active:scale-[0.95] transition-all"
              >
                Join Now
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 mb-24">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8 text-white">
            <Image
              src={logo}
              alt="Nova Paw"
              height={80}
              className="h-[80px] w-auto object-contain brightness-0 invert"
            />
            <p className="text-white/40 text-[15px] leading-relaxed max-w-[320px]">
              Qatar's first international pet festival   WKU & WCF judged competitions, family fun, and celebration of our furry companions.
            </p>

            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/nova_paw_festival/" target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 text-white">
                <Instagram size={18} />
              </a>
              <a href="https://www.tiktok.com/@nova_paw_festival" target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 text-white">
                <Music2 size={18} />
              </a>
              <a href="https://www.youtube.com/@paw_festival" target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 text-white">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary">Discover</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/60 hover:text-white transition-colors flex items-center group font-medium">
                    <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (Integrated Directly) */}
          <div className="space-y-8">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary">Get in Touch</h4>
            <ul className="space-y-6">
              <li className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/30">Call Support</p>
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-primary" />
                  <a href="tel:+97433022248" className="text-[15px] font-bold hover:text-primary transition-colors">+974 3302 2248</a>
                </div>
              </li>
              <li className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/30">Email Us</p>
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-primary" />
                  <a href="mailto:info@novapawfestival.com" className="text-[15px] font-bold hover:text-primary transition-colors">info@novapawfestival.com</a>
                </div>
              </li>
              <li className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/30">Location & Date</p>
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-primary" />
                  <p className="text-[15px] font-bold">The Pearl Island, Qatar<br/><span className="text-[13px] text-white/60 font-normal mt-1 block">November 27–28, 2026</span></p>
                </div>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-8">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    className="text-white/60 hover:text-white transition-colors flex items-center group font-medium"
                  >
                    <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span className="flex items-center gap-2">
                      {link.label}
                      {link.external && <ExternalLink size={12} className="opacity-40" />}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-white/30 text-[13px] gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2">
            <span>© 2026 Nova Paw Festival · Organized by Esraa Hamoudah · All Rights Reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
