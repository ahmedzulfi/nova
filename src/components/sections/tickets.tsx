'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

const ticketTiers = [
  {
    id: "dog-owner",
    name: "Dog Owner",
    price: "50",
    description: "Includes adult entry and registration for one dog.",
    popular: true,
    features: [
      "Full Festival Grounds Access",
      "Dog Entry (Max 1 per Adult)",
      "Competition Eligibility",
      "Premium Dog Goodie Bag",
      "Priority Vet Checkup"
    ]
  },
  {
    id: "cat-owner",
    name: "Cat Owner",
    price: "50",
    description: "Includes adult entry and registration for two cats.",
    features: [
      "Full Festival Grounds Access",
      "Cat Entry (Max 2 per Owner)",
      "Competition Eligibility",
      "Premium Cat Goodie Bag",
      "Priority Vet Checkup"
    ]
  },
  {
    id: "adult",
    name: "Adult",
    price: "25",
    description: "General admission for pet enthusiasts.",
    features: [
      "Full Festival Grounds Access",
      "All Live Shows & Music",
      "Workshops & Expert Talks",
      "Shopping & Food Village",
      "Family Friendly Experience"
    ]
  }
];

const Tickets = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const registration = localStorage.getItem('nova_registration');
    if (registration) {
      setIsRegistered(true);
    }
  }, []);

  return (
    <section className="bg-white py-[120px] md:py-[160px]" id="tickets">
      <div className="container max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="inline-flex items-center px-5 py-2 rounded-sm bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            Secure Your Spot
          </span>
          <h2 className="text-[40px] md:text-[72px] font-bold leading-[1] text-black font-display tracking-tighter">
            Choose Your Tier
          </h2>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1150px] mx-auto">
          {ticketTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`flex flex-col p-10 md:p-12 rounded-sm border transition-all duration-500 hover:scale-[1.02] h-full shadow-sm relative ${
                tier.popular ? 'border-primary bg-white ring-1 ring-primary/20' : 'border-black/5 bg-[#F9F9F9]'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20">
                  <Star className="w-3 h-3 fill-current" /> Most Popular
                </div>
              )}

              <h3 className="text-[28px] font-bold mb-2 font-display text-black tracking-tight">
                {tier.name}
              </h3>
              <p className="text-[14px] mb-10 font-body text-black/40 font-medium">
                {tier.description}
              </p>
              
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-[56px] font-bold tracking-tighter font-display text-black leading-none">
                  {tier.price}
                </span>
                <span className="text-[14px] font-bold uppercase tracking-widest text-black/30">QAR</span>
              </div>

              <ul className="flex flex-col gap-5 mb-12 flex-grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-[15px] font-bold font-body">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${tier.popular ? 'bg-primary' : 'bg-black/20'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={isRegistered ? "/dashboard" : `/tickets?tier=${tier.id}`}
                className={`inline-flex items-center justify-center w-full h-16 rounded-sm font-bold text-[14px] uppercase tracking-widest transition-all active:scale-95 group ${
                  isRegistered 
                  ? "bg-primary text-white hover:bg-black" 
                  : tier.popular ? "bg-primary text-white hover:bg-black" : "bg-black text-white hover:bg-primary"
                }`}
              >
                {isRegistered ? "View Your Pass" : "Purchase Now"} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Tickets;
