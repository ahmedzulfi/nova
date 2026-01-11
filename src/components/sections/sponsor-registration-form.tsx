"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, Phone, Globe, MessageSquare, Check } from 'lucide-react';

const SponsorRegistrationForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-primary rounded-[40px] p-12 text-center text-white animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-[32px] font-bold mb-4 font-display">Thank You for Your Interest!</h3>
                <p className="text-[18px] text-white/80 max-w-[440px] mx-auto font-body">
                    Our partnership team has received your inquiry and will be in touch within 24-48 hours with our sponsorship prospectus.
                </p>
                <Button
                    variant="outline"
                    className="mt-10 border-white text-white hover:bg-white hover:text-primary rounded-full px-10 h-14"
                    onClick={() => setSubmitted(false)}
                >
                    Send another inquiry
                </Button>
            </div>
        );
    }

    return (
        <section className="bg-[#F9F9F9] p-8 md:p-16 rounded-[40px] border border-[#f0f0f0]">
            <div className="max-w-[700px] mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-[32px] md:text-[48px] font-bold font-display text-black mb-4">
                        Become a Partner
                    </h2>
                    <p className="text-[16px] md:text-[18px] text-[#666666] font-body">
                        Interested in showcasing your brand at Qatar's premier pet event? Join us as a sponsor and connect with thousands of pet lovers.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="company-name" className="text-[14px] font-semibold text-black uppercase tracking-wider pl-2">Company Name</Label>
                            <div className="relative">
                                <Input id="company-name" required placeholder="Brand Name" className="rounded-2xl border-[#E6E6E6] bg-white h-14 pl-12 focus:ring-2 focus:ring-primary transition-all" />
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-person" className="text-[14px] font-semibold text-black uppercase tracking-wider pl-2">Contact Person</Label>
                            <div className="relative">
                                <Input id="contact-person" required placeholder="John Doe" className="rounded-2xl border-[#E6E6E6] bg-white h-14 pl-12 focus:ring-2 focus:ring-primary transition-all" />
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="contact-email" className="text-[14px] font-semibold text-black uppercase tracking-wider pl-2">Email</Label>
                            <div className="relative">
                                <Input id="contact-email" required type="email" placeholder="partners@company.com" className="rounded-2xl border-[#E6E6E6] bg-white h-14 pl-12 focus:ring-2 focus:ring-primary transition-all" />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-phone" className="text-[14px] font-semibold text-black uppercase tracking-wider pl-2">Phone</Label>
                            <div className="relative">
                                <Input id="contact-phone" required placeholder="+974 0000 0000" className="rounded-2xl border-[#E6E6E6] bg-white h-14 pl-12 focus:ring-2 focus:ring-primary transition-all" />
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="sponsorship-interest" className="text-[14px] font-semibold text-black uppercase tracking-wider pl-2">Sponsorship Interest</Label>
                        <Select>
                            <SelectTrigger className="rounded-2xl border-[#E6E6E6] bg-white h-14 px-6 focus:ring-2 focus:ring-primary transition-all">
                                <SelectValue placeholder="Select Sponsorship Tier" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                                <SelectItem value="platinum">Platinum Sponsor</SelectItem>
                                <SelectItem value="gold">Gold Sponsor</SelectItem>
                                <SelectItem value="silver">Silver Sponsor</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-[14px] font-semibold text-black uppercase tracking-wider pl-2">Message</Label>
                        <div className="relative">
                            <Textarea
                                id="message"
                                placeholder="Tell us about your brand and what kind of partnership you're looking for..."
                                className="rounded-2xl border-[#E6E6E6] bg-white min-h-[140px] p-6 pl-12 focus:ring-2 focus:ring-primary transition-all"
                            />
                            <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-[#999999]" />
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-bold rounded-full text-[18px] mt-4 transition-all active:scale-[0.98]">
                        Send Interest Inquiry
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default SponsorRegistrationForm;
