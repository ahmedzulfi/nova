"use client";

import React from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20 lg:pt-48 lg:pb-40">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="text-[48px] md:text-[72px] text-black mb-6">
              Get in Touch
            </h1>
            <p className="text-[18px] text-[#666666] leading-[1.6] max-w-[600px] mx-auto">
              Have questions about the festival? We're here to help. Reach out to us through the form or our contact details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-[32px]">Contact Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-[#666666] uppercase text-[12px] tracking-wider">Location</Label>
                    <p className="text-[18px] font-medium">Pet’s Park, The Pearl, Qatar</p>
                  </div>
                  <div>
                    <Label className="text-[#666666] uppercase text-[12px] tracking-wider">Phone</Label>
                    <p className="text-[18px] font-medium">+974 0000 0000</p>
                  </div>
                  <div>
                    <Label className="text-[#666666] uppercase text-[12px] tracking-wider">Email</Label>
                    <p className="text-[18px] font-medium">hello@novapaw.com</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[32px]">Follow Us</h3>
                <div className="flex gap-4">
                  {['Facebook', 'Instagram', 'X'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="px-6 py-2 rounded-full border border-[#E6E6E6] hover:bg-black hover:text-white transition-colors font-medium"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#F9F9F9] p-8 md:p-12 rounded-[32px]">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="rounded-xl border-[#E6E6E6] bg-white h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="rounded-xl border-[#E6E6E6] bg-white h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="General Inquiry" className="rounded-xl border-[#E6E6E6] bg-white h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help you?" className="rounded-xl border-[#E6E6E6] bg-white min-h-[150px]" />
                </div>
                <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full text-[16px]">
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
