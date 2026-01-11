"use client";

import React from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Instagram, Youtube, Music2 } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="text-center mb-16 lg:mb-32">
            <span className="inline-block bg-[#F3F3F3] text-black text-[12px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-8">
              Contact Center
            </span>
            <h1 className="text-[48px] md:text-[84px] font-bold font-display leading-[1] text-black mb-10 tracking-tight">
              Let's Connect <br className="hidden md:block" /> with Nova Paw
            </h1>
            <p className="text-[18px] md:text-[20px] text-[#666666] leading-[1.6] max-w-[700px] mx-auto font-body">
              Whether you're an attendee, a potential sponsor, or a member of the press, our team is ready to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Contact Info & Map */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 text-primary mb-2">
                    <MapPin className="w-5 h-5" />
                    <Label className="text-[#666666] uppercase text-[12px] font-bold tracking-widest pl-0">Location</Label>
                  </div>
                  <p className="text-[18px] font-bold text-black font-display">Pet’s Park,</p>
                  <p className="text-[16px] text-[#666666]">The Pearl – Qatar</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 text-primary mb-2">
                    <Phone className="w-5 h-5" />
                    <Label className="text-[#666666] uppercase text-[12px] font-bold tracking-widest pl-0">Phone</Label>
                  </div>
                  <p className="text-[18px] font-bold text-black font-display">TBD</p>
                  <p className="text-[16px] text-[#666666]">Support Line</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 text-primary mb-2">
                    <Mail className="w-5 h-5" />
                    <Label className="text-[#666666] uppercase text-[12px] font-bold tracking-widest pl-0">Email</Label>
                  </div>
                  <p className="text-[18px] font-bold text-black font-display">TBD</p>
                  <p className="text-[16px] text-[#666666]">Inquiries & Media</p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="w-full aspect-video rounded-[40px] overflow-hidden grayscale contrast-125 border border-[#F0F0F0]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d14421.7377561!2d51.5435!3d25.3725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c4793f77df23%3A0xc669f379fa4d4bb!2sThe%20Pearl-Qatar!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="space-y-6 pt-8">
                <h3 className="text-[24px] font-bold font-display">Follow the Journey</h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: 'Instagram', icon: Instagram, href: '#' },
                    { name: 'TikTok', icon: Music2, href: '#' },
                    { name: 'YouTube', icon: Youtube, href: '#' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#F0F0F0] hover:bg-black hover:text-white transition-all duration-300 font-bold text-[15px]"
                    >
                      <social.icon className="w-5 h-5" />
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#F9F9F9] p-8 md:p-16 rounded-[40px] border border-[#f0f0f0] sticky top-32">
              <div className="mb-10 text-center">
                <h3 className="text-[32px] font-bold font-display mb-4">Send us a Message</h3>
                <p className="text-[#666666]">Drop us a line and we'll get back to you shortly.</p>
              </div>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[14px] font-bold uppercase tracking-wider pl-2">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="rounded-2xl border-[#E6E6E6] bg-white h-14 px-6 focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[14px] font-bold uppercase tracking-wider pl-2">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="rounded-2xl border-[#E6E6E6] bg-white h-14 px-6 focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[14px] font-bold uppercase tracking-wider pl-2">Your Message</Label>
                  <Textarea id="message" placeholder="How can we help you?" className="rounded-2xl border-[#E6E6E6] bg-white min-h-[160px] p-6 focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-bold rounded-full text-[18px] transition-all active:scale-[0.98] mt-4 shadow-none">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
