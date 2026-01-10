"use client";

import React from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';

export default function RegistrationPage() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop",
      position: "top-20 left-[5%] rotate-[-12deg]",
      size: "w-[150px] h-[180px]"
    },
    {
      url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
      position: "top-40 right-[8%] rotate-[8deg]",
      size: "w-[140px] h-[170px]"
    },
    {
      url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1988&auto=format&fit=crop",
      position: "bottom-20 left-[8%] rotate-[5deg]",
      size: "w-[160px] h-[200px]"
    },
    {
      url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070&auto=format&fit=crop",
      position: "bottom-40 right-[5%] rotate-[-10deg]",
      size: "w-[150px] h-[180px]"
    }
  ];

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Navigation />

      {/* Decorative Images */}
      <div className="absolute inset-0 pointer-events-none hidden xl:block">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute ${img.position} ${img.size} rounded-[24px] overflow-hidden shadow-2xl z-0 transition-transform duration-500 hover:scale-110`}
          >
            <Image
              src={img.url}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <section className="pt-32 pb-20 lg:pt-48 lg:pb-40 relative z-10">
        <div className="container mx-auto px-6 max-w-[800px]">
          <div className="text-center mb-16">
            <h1 className="text-[48px] md:text-[72px] font-semibold font-display leading-[1.1] text-black mb-6">
              Register Your Pet
            </h1>
            <p className="text-[18px] text-[#666666] leading-[1.6] max-w-[540px] mx-auto">
              Join the competitions and shows at Nova Paw Festival 2026. Fill out the form below to secure your spot in the spotlight.
            </p>
          </div>

          <form className="space-y-8 bg-[#F9F9F9] p-8 md:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#f0f0f0]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="owner-name" className="text-[15px] font-medium text-black">Owner Name</Label>
                <Input id="owner-name" placeholder="John Doe" className="rounded-2xl border-[#E6E6E6] bg-white h-14 px-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-[15px] font-medium text-black">Phone Number</Label>
                <Input id="phone" placeholder="+974 0000 0000" className="rounded-2xl border-[#E6E6E6] bg-white h-14 px-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-[15px] font-medium text-black">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" className="rounded-2xl border-[#E6E6E6] bg-white h-14 px-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="pet-name" className="text-[15px] font-medium text-black">Pet Name</Label>
                <Input id="pet-name" placeholder="Buddy" className="rounded-2xl border-[#E6E6E6] bg-white h-14 px-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="breed" className="text-[15px] font-medium text-black">Breed</Label>
                <Input id="breed" placeholder="Golden Retriever" className="rounded-2xl border-[#E6E6E6] bg-white h-14 px-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="age" className="text-[15px] font-medium text-black">Pet Age</Label>
                <Input id="age" placeholder="2 years" className="rounded-2xl border-[#E6E6E6] bg-white h-14 px-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="competition" className="text-[15px] font-medium text-black">Select Competition</Label>
                <Select>
                  <SelectTrigger className="rounded-2xl border-[#E6E6E6] bg-white h-14 px-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                    <SelectValue placeholder="Choose a show" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-[#E6E6E6]">
                    <SelectItem value="dog-show">Best in Show (Dog)</SelectItem>
                    <SelectItem value="cat-show">Best Cat Show</SelectItem>
                    <SelectItem value="grooming">Grooming Competition</SelectItem>
                    <SelectItem value="fashion">Fashion Show</SelectItem>
                    <SelectItem value="drawing">Drawing Cat Battle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-3">
                <Checkbox id="vaccination" className="w-5 h-5 rounded-md border-[#E6E6E6] data-[state=checked]:bg-primary data-[state=checked]:text-white" />
                <Label htmlFor="vaccination" className="text-[14px] text-[#666666] leading-none cursor-pointer">
                  I confirm that my pet is up to date with all vaccinations
                </Label>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox id="terms" className="mt-1 w-5 h-5 rounded-md border-[#E6E6E6] data-[state=checked]:bg-primary data-[state=checked]:text-white" />
                <Label htmlFor="terms" className="text-[14px] text-[#666666] leading-relaxed cursor-pointer">
                  I agree to the Nova Paw Festival Terms & Conditions and understand the rules of the selected competition.
                </Label>
              </div>
            </div>

            <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-bold rounded-full text-[18px] mt-8 shadow-lg transition-all active:scale-[0.98]">
              Submit Registration
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
