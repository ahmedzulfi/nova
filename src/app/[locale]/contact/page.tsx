"use client";

import React, { useState } from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Instagram, Youtube, Music2, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ParkingMap from "@/components/ui/parking-map";

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="text-center mb-16 lg:mb-32">
            <span className="inline-block bg-[#F5F5F0] text-black text-[12px] font-bold px-6 py-2 rounded-full uppercase tracking-[0.3em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm border border-black/5">
              {t('badge')}
            </span>
            <h1 className="text-[48px] md:text-[84px] font-bold font-display leading-[0.85] text-black mb-10 tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 whitespace-pre-line">
              {t('title')}
            </h1>
            <p className="text-[18px] md:text-[22px] text-black/40 leading-[1.6] max-w-[760px] mx-auto font-medium font-body animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
              {t('desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            {/* Contact Info & Map */}
            <div className="space-y-16 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-primary mb-2 rtl:flex-row-reverse rtl:justify-end">
                    <MapPin className="w-6 h-6" />
                    <Label className="text-black/30 uppercase text-[11px] font-bold tracking-[0.2em] pl-0">{t('info.location')}</Label>
                  </div>
                  <a href="https://www.google.com/maps/place/Pet+Park/@25.3713397,51.5206187,5553m/data=!3m1!1e3!4m10!1m2!2m1!1spets+park!3m6!1s0x3e45c36bebd7c1ff:0xe9fe34995eb0a7b4!8m2!3d25.3713397!4d51.5566676!15sCglwZXRzIHBhcmtaCyIJcGV0cyBwYXJrkgEEcGFya5oBJENoZERTVWhOTUc5blMwVkpRMEZuU1VNdGQyUmZaeTFSUlJBQuABAPoBBAgAEDQ!16s%2Fg%2F11tdhzkd61?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-[22px] font-bold text-black font-display tracking-tight whitespace-pre-line rtl:text-right hover:text-primary transition-colors block">
                    {t('info.val_location')}
                  </a>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-primary mb-2 rtl:flex-row-reverse rtl:justify-end">
                    <Phone className="w-6 h-6" />
                    <Label className="text-black/30 uppercase text-[11px] font-bold tracking-[0.2em] pl-0">{t('info.phone')}</Label>
                  </div>
                  <p className="text-[22px] font-bold text-black font-display tracking-tight rtl:text-right">{t('info.val_phone')}</p>
                  <p className="text-[15px] text-black/40 font-medium rtl:text-right">{t('info.support')}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-primary mb-2 rtl:flex-row-reverse rtl:justify-end">
                    <Mail className="w-6 h-6" />
                    <Label className="text-black/30 uppercase text-[11px] font-bold tracking-[0.2em] pl-0">{t('info.email')}</Label>
                  </div>
                  <p className="text-[22px] font-bold text-black font-display tracking-tight rtl:text-right">{t('info.val_email')}</p>
                  <p className="text-[15px] text-black/40 font-medium rtl:text-right">{t('info.inquiries')}</p>
                </div>
              </div>

              {/* Google Maps Embed with Toggles */}
              <ParkingMap />

              <div className="space-y-8 pt-8">
                <h3 className="text-[28px] font-bold font-display tracking-tight rtl:text-right">{t('social.title')}</h3>
                <div className="flex flex-wrap gap-4 rtl:flex-row-reverse">
                  {[
                    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/nova_paw_festival/' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="inline-flex items-center gap-4 px-10 py-5 rounded-full border border-black/5 bg-[#F5F5F0] hover:bg-black hover:text-white transition-all duration-500 font-bold text-[14px] uppercase tracking-widest"
                    >
                      <social.icon className="w-5 h-5" />
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#F5F5F0] p-10 md:p-16 rounded-sm border border-black/5 sticky top-32 shadow-sm shadow-black/5 animate-in fade-in slide-in-from-right-8 duration-1000 min-h-[550px] flex flex-col justify-center">
              {submitted ? (
                <div className="text-center space-y-8 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                    <CheckCircle2 className="w-10 h-10 text-primary animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-[32px] font-bold font-display text-black mb-4 tracking-tighter">
                      {t('form.success_title')}
                    </h3>
                    <p className="text-black/50 font-medium text-[15px] max-w-[340px] mx-auto leading-relaxed">
                      {t('form.success_desc')}
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="w-full h-16 bg-black hover:bg-primary text-white font-bold rounded-full text-[14px] uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] shadow-sm shadow-black/10"
                  >
                    {t('form.success_cta')}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-12 text-center">
                    <h3 className="text-[36px] font-bold font-display mb-4 tracking-tighter">{t('form.title')}</h3>
                    <p className="text-black/40 font-medium">{t('form.desc')}</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-[11px] font-bold uppercase tracking-[0.2em] pl-4 rtl:pl-0 rtl:pr-4 block rtl:text-right">{t('form.label_name')}</Label>
                      <Input id="name" required placeholder={t('form.placeholder_name')} className="rounded-full border-black/5 bg-white h-16 px-8 focus:ring-4 focus:ring-primary/20 transition-all font-bold text-black rtl:text-right" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.2em] pl-4 rtl:pl-0 rtl:pr-4 block rtl:text-right">{t('form.label_email')}</Label>
                      <Input id="email" required type="email" placeholder={t('form.placeholder_email')} className="rounded-full border-black/5 bg-white h-16 px-8 focus:ring-4 focus:ring-primary/20 transition-all font-bold text-black rtl:text-right" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="type" className="text-[11px] font-bold uppercase tracking-[0.2em] pl-4 rtl:pl-0 rtl:pr-4 block rtl:text-right">{t('form.label_type')}</Label>
                      <select id="type" className="w-full rounded-full border border-black/5 bg-white h-16 px-8 focus:ring-4 focus:ring-primary/20 transition-all appearance-none cursor-pointer font-bold text-black rtl:text-right">
                        <option>{t('form.types.general')}</option>
                        <option>{t('form.types.sponsorship')}</option>
                        <option>{t('form.types.media')}</option>
                        <option>{t('form.types.ticketing')}</option>
                        <option>{t('form.types.registration')}</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-[11px] font-bold uppercase tracking-[0.2em] pl-4 rtl:pl-0 rtl:pr-4 block rtl:text-right">{t('form.label_message')}</Label>
                      <Textarea id="message" required placeholder={t('form.placeholder_message')} className=" rounded-sm  border-black/5 bg-white min-h-[180px] p-8 focus:ring-4 focus:ring-primary/20 transition-all font-bold text-black rtl:text-right" />
                    </div>
                    <Button className="w-full h-18 bg-black hover:bg-primary text-white font-bold rounded-full text-[16px] uppercase tracking-[0.2em] transition-all duration-500 active:scale-[0.98] mt-6  shadow-sm  shadow-black/10">
                      {t('form.cta')}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-[1280px] pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
        <div className="bg-black  rounded-sm  p-16 md:p-24 flex flex-col items-center text-center text-white relative overflow-hidden group  shadow-sm  shadow-black/20">
          <div className="relative z-10">
            <h2 className="text-[40px] md:text-[72px] text-white font-bold font-display mb-8 leading-[0.9] tracking-tighter">{t('whatsapp.title')}</h2>
            <p className="text-white/40 text-[18px] md:text-[22px] mb-12 max-w-[700px] mx-auto font-medium leading-relaxed">
              {t('whatsapp.desc')}
            </p>
            <a
              href="https://wa.me/97433022248"
              className="inline-flex items-center gap-6 bg-primary text-white px-14 py-6 rounded-full font-bold text-[18px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 active:scale-95  shadow-sm  shadow-primary/20"
            >
              {t('whatsapp.cta')}
            </a>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] group-hover:bg-primary/20 transition-all duration-1000 -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -ml-64 -mb-64" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
