'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    id: "dog-owner",
    name: "Dog Owner",
    price: "50",
    description: "Includes adult entry and registration for one dog.",
    benefits: [
      "Full Festival Grounds Access",
      "Dog Entry (Max 1 per Adult)",
      "Competition Eligibility",
      "Premium Dog Goodie Bag",
      "Vet Checkup Priority",
      "All Live Shows & Music"
    ]
  },
  {
    id: "cat-owner",
    name: "Cat Owner",
    price: "50",
    description: "Includes adult entry and registration for up to two cats.",
    benefits: [
      "Full Festival Grounds Access",
      "Cat Entry (Max 2 per Owner)",
      "Competition Eligibility",
      "Premium Cat Goodie Bag",
      "Vet Checkup Priority",
      "All Live Shows & Music"
    ]
  },
  {
    id: "adult",
    name: "Adult",
    price: "25",
    description: "General admission for adults and pet enthusiasts.",
    benefits: [
      "Full Festival Grounds Access",
      "All Live Shows & Music",
      "Workshops & Expert Talks",
      "Shopping & Food Village",
      "Community Engagement",
      "Family Friendly Experience"
    ]
  }
];

interface TicketsPricingProps {
  onSelect: (tier: string) => void;
  selectedTier: string;
}

const TicketsPricing = ({ onSelect, selectedTier }: TicketsPricingProps) => {
  return (
    <section className="pb-24 md:pb-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              className={`flex flex-col p-8 md:p-12  rounded-sm border bg-[#F9F9F9] text-black transition-all h-full duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] ${
                selectedTier === tier.id
                ? 'border-primary shadow-sm shadow-primary/5' 
                : 'border-[#F0F0F0]'
              }`}
            >
              <h3 className="text-[24px] font-bold mb-2 font-display text-black">
                {tier.name}
              </h3>
              
              <p className="text-[15px] mb-8 font-body text-[#666666]">
                {tier.description}
              </p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-[48px] font-bold tracking-tight font-display text-black">
                  {tier.price}
                </span>
                <span className="text-[18px] font-semibold opacity-70">QAR</span>
              </div>

              <ul className="flex flex-col gap-5 mb-12 flex-grow">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-4 text-[16px] font-medium font-body">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-black" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <button 
                type="button"
                onClick={() => onSelect(tier.id)}
                className={`inline-flex items-center justify-center w-full h-16  rounded-sm font-bold text-[18px] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95] ${
                  selectedTier === tier.id
                  ? 'bg-primary text-white shadow-sm shadow-primary/20'
                  : 'bg-black text-white hover:bg-black/90'
                }`}
              >
                {selectedTier === tier.id ? 'Selected' : 'Select Ticket'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TicketsPricing;
