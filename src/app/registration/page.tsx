"use client";

import React, { useState } from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import EventSelectionGrid from "@/components/sections/event-selection-grid";
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [selectedEventName, setSelectedEventName] = useState("");
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    petName: "",
    breed: "",
    age: "",
    competition: "",
  });

  const handleEventSelect = (eventId: string, eventTitle: string) => {
    setFormData({ ...formData, competition: eventId });
    setSelectedEventName(eventTitle);
    setStep(2);
    // Smooth scroll to top of form area
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

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
            className={`absolute ${img.position} ${img.size} rounded-[24px] overflow-hidden z-0 transition-transform duration-500 hover:scale-110`}
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
        <div className="container mx-auto px-6 max-w-[1000px]">
          <div className="text-center mb-16">
            <h1 className="text-[48px] md:text-[72px] font-bold font-display leading-[1.1] text-black mb-6 tracking-tight">
              Register Your Pet
            </h1>
            <p className="text-[18px] text-[#666666] leading-[1.6] max-w-[540px] mx-auto font-body">
              {step === 1
                ? "First, select the event your pet would like to participate in."
                : `Great choice! Now, please provide the details for the ${selectedEventName}.`
              }
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-[#666666]'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[14px] ${step >= 1 ? 'bg-primary text-white' : 'bg-[#E6E6E6]'}`}>
                1
              </div>
              <span className="font-semibold text-[15px]">Select Event</span>
            </div>
            <div className="w-12 h-[2px] bg-[#E6E6E6]" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-[#666666]'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[14px] ${step >= 2 ? 'bg-primary text-white' : 'bg-[#E6E6E6]'}`}>
                2
              </div>
              <span className="font-semibold text-[15px]">Pet Details</span>
            </div>
          </div>

          {step === 1 ? (
            <div className="animate-in fade-in slide-in-from-bottom duration-500">
              <EventSelectionGrid onSelect={handleEventSelect} selectedEventId={formData.competition} />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right duration-500 max-w-[800px] mx-auto">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-[#666666] hover:text-primary transition-colors mb-8 font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to event selection
              </button>

              <form className="space-y-8 bg-[#F9F9F9] p-8 md:p-12 rounded-[40px] border border-[#f0f0f0]">
                {/* Pre-selected Event Display */}
                <div className="p-6 bg-white rounded-2xl border border-primary/20 flex items-center justify-between mb-8">
                  <div>
                    <span className="text-[12px] font-bold text-primary uppercase tracking-wider block mb-1">Selected Competition</span>
                    <span className="text-[20px] font-bold text-black font-display">{selectedEventName}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Check className="w-6 h-6" />
                  </div>
                </div>

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

                <div className="space-y-3">
                  <Label htmlFor="age" className="text-[15px] font-medium text-black">Pet Age</Label>
                  <Input id="age" placeholder="2 years" className="rounded-2xl border-[#E6E6E6] bg-white h-14 px-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
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

                <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-bold rounded-full text-[18px] mt-8 transition-all active:scale-[0.98]">
                  Submit Registration
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
