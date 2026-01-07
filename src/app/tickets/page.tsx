"use client";

import React from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";

const ticketPlans = [
  {
    name: "Pet Owners",
    price: "35",
    currency: "QAR",
    features: [
      "Full access to festival zones",
      "Entry for 1 pet",
      "Competition participation eligibility",
      "Festival goodie bag",
    ],
    highlight: true,
  },
  {
    name: "Adults",
    price: "25",
    currency: "QAR",
    features: [
      "Full access to festival zones",
      "Live entertainment access",
      "Vet talks & workshops",
      "Food court access",
    ],
    highlight: false,
  },
  {
    name: "Kids (Under 12)",
    price: "15",
    currency: "QAR",
    features: [
      "Full access to festival zones",
      "Kids zone activities",
      "Entertainment shows",
      "Interactive pet experiences",
    ],
    highlight: false,
  },
];

export default function TicketsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-40">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="text-[48px] md:text-[72px] font-semibold font-display leading-[1.1] text-black mb-6">
              Festival Tickets
            </h1>
            <p className="text-[18px] text-[#666666] leading-[1.6] max-w-[540px] mx-auto">
              Choose the perfect ticket for your Nova Paw Festival experience. All tickets include access to both festival days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ticketPlans.map((plan) => (
              <div 
                key={plan.name}
                className={`flex flex-col p-8 md:p-12 rounded-[40px] border-2 ${
                  plan.highlight 
                    ? "bg-black text-white border-black" 
                    : "bg-[#F9F9F9] text-black border-transparent"
                }`}
              >
                <h3 className="text-[24px] font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-[48px] font-bold">{plan.price}</span>
                  <span className="text-[18px] opacity-70">{plan.currency}</span>
                </div>

                <ul className="flex flex-col gap-4 mb-12 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-[16px]">
                      <div className={`w-1.5 h-1.5 rounded-full ${plan.highlight ? "bg-[#F7F56D]" : "bg-black"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full h-14 rounded-full font-semibold text-[16px] transition-transform hover:scale-105 active:scale-95 ${
                    plan.highlight 
                      ? "bg-[#F7F56D] text-black hover:bg-[#F7F56D]/90" 
                      : "bg-black text-white hover:bg-black/90"
                  }`}
                >
                  Buy Ticket
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 md:p-12 bg-[#F9F9F9] rounded-[32px] max-w-[800px] mx-auto">
            <h4 className="text-[20px] font-semibold mb-4">Entry Rules & Terms</h4>
            <ul className="list-disc pl-5 space-y-2 text-[#666666] text-[15px]">
              <li>Pets must be on a leash or in a carrier at all times.</li>
              <li>Proof of vaccination may be required at the entrance.</li>
              <li>Tickets are non-refundable but transferable.</li>
              <li>Kids under 3 enter for free.</li>
              <li>Owners are responsible for their pets' behavior and waste.</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
