'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, Phone, MessageSquare, Check, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

const SponsorRegistrationForm = () => {
    const t = useTranslations('SponsorshipPage.form');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-primary  rounded-sm  p-12 text-center text-white animate-in zoom-in duration-500  shadow-sm ">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Check className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-[32px] md:text-[44px] font-bold mb-4 font-display tracking-tight leading-tight">
                    {t('success_title')}
                </h3>
                <p className="text-[18px] md:text-[20px] text-white/80 max-w-[500px] mx-auto font-medium font-body leading-relaxed">
                    {t('success_desc')}
                </p>
                <Button
                    variant="outline"
                    className="mt-12 border-white text-white hover:bg-white hover:text-primary rounded-full px-12 h-16 font-bold text-[18px] transition-all"
                    onClick={() => setSubmitted(false)}
                >
                    {t('success_cta')}
                </Button>
            </div>
        );
    }

    return (
        <section className="bg-[#F5F5F0] p-8 md:p-16  rounded-sm  border border-black/5">
            <div className="max-w-[800px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[54px] font-bold font-display text-black mb-6 tracking-tighter leading-[0.9]">
                        {t('title')}
                    </h2>
                    <p className="text-[18px] md:text-[20px] text-black/40 font-medium font-body leading-relaxed">
                        {t('desc')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Label htmlFor="company-name" className="text-[12px] font-bold text-black uppercase tracking-[0.2em] pl-2 rtl:pl-0 rtl:pr-2 block rtl:text-right">
                                {t('label_company')}
                            </Label>
                            <div className="relative">
                                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20 rtl:left-auto rtl:right-5" />
                                <Input
                                    id="company-name"
                                    required
                                    placeholder={t('placeholder_company')}
                                    className=" rounded-sm  border-black/5 bg-white h-16 pl-14 pr-6 focus:ring-2 focus:ring-primary transition-all text-[16px] font-medium rtl:pl-6 rtl:pr-14 rtl:text-right"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="contact-person" className="text-[12px] font-bold text-black uppercase tracking-[0.2em] pl-2 rtl:pl-0 rtl:pr-2 block rtl:text-right">
                                {t('label_person')}
                            </Label>
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20 rtl:left-auto rtl:right-5" />
                                <Input
                                    id="contact-person"
                                    required
                                    placeholder={t('placeholder_person')}
                                    className=" rounded-sm  border-black/5 bg-white h-16 pl-14 pr-6 focus:ring-2 focus:ring-primary transition-all text-[16px] font-medium rtl:pl-6 rtl:pr-14 rtl:text-right"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Label htmlFor="contact-email" className="text-[12px] font-bold text-black uppercase tracking-[0.2em] pl-2 rtl:pl-0 rtl:pr-2 block rtl:text-right">
                                {t('label_email')}
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20 rtl:left-auto rtl:right-5" />
                                <Input
                                    id="contact-email"
                                    required
                                    type="email"
                                    placeholder={t('placeholder_email')}
                                    className=" rounded-sm  border-black/5 bg-white h-16 pl-14 pr-6 focus:ring-2 focus:ring-primary transition-all text-[16px] font-medium rtl:pl-6 rtl:pr-14 rtl:text-right"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="contact-phone" className="text-[12px] font-bold text-black uppercase tracking-[0.2em] pl-2 rtl:pl-0 rtl:pr-2 block rtl:text-right">
                                {t('label_phone')}
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20 rtl:left-auto rtl:right-5" />
                                <Input
                                    id="contact-phone"
                                    required
                                    placeholder={t('placeholder_phone')}
                                    className=" rounded-sm  border-black/5 bg-white h-16 pl-14 pr-6 focus:ring-2 focus:ring-primary transition-all text-[16px] font-medium rtl:pl-6 rtl:pr-14 rtl:text-right"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="sponsorship-interest" className="text-[12px] font-bold text-black uppercase tracking-[0.2em] pl-2 rtl:pl-0 rtl:pr-2 block rtl:text-right">
                            {t('label_interest')}
                        </Label>
                        <Select>
                            <SelectTrigger className=" rounded-sm  border-black/5 bg-white h-16 px-6 focus:ring-2 focus:ring-primary transition-all text-[16px] font-medium rtl:text-right">
                                <SelectValue placeholder={t('placeholder_tier')} />
                            </SelectTrigger>
                            <SelectContent className=" rounded-sm ">
                                <SelectItem value="platinum">{t('tiers.platinum')}</SelectItem>
                                <SelectItem value="gold">{t('tiers.gold')}</SelectItem>
                                <SelectItem value="silver">{t('tiers.silver')}</SelectItem>
                                <SelectItem value="other">{t('tiers.other')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="message" className="text-[12px] font-bold text-black uppercase tracking-[0.2em] pl-2 rtl:pl-0 rtl:pr-2 block rtl:text-right">
                            {t('label_message')}
                        </Label>
                        <div className="relative">
                            <MessageSquare className="absolute left-5 top-6 w-5 h-5 text-black/20 rtl:left-auto rtl:right-5" />
                            <Textarea
                                id="message"
                                placeholder={t('placeholder_message')}
                                className=" rounded-sm  border-black/5 bg-white min-h-[160px] p-6 pl-14 focus:ring-2 focus:ring-primary transition-all text-[16px] font-medium rtl:pl-6 rtl:pr-14 rtl:text-right"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-18 bg-black hover:bg-black/90 text-white font-bold  rounded-sm  text-[18px] mt-8 transition-all active:scale-[0.98] py-8">
                        {t('cta')}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default SponsorRegistrationForm;
