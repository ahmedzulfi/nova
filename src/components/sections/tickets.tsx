'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ticketTiers = [
  {
    name: "Adult",
    price: "25",
    description: "Full festival access for individuals.",
    features: [
      "Full festival access both zones",
      "All shows & competitions",
      "Food truck zone",
      "Giveaway bag"
    ]
  },
  {
    name: "Pet Owner",
    price: "50",
    description: "Complete package including pet entry.",
    features: [
      "Full festival access",
      "Pet entry (max 2 dogs)",
      "Competition eligibility",
      "Premium giveaway bag"
    ]
  },
  {
    name: "Kid",
    price: "15",
    description: "Special entry for children under 12 years old.",
    features: [
      "All kids activities",
      "Carnival games",
      "Petting zones",
      "Kids giveaway"
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
            Ticket Tiers
          </h2>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1150px] mx-auto">
          {ticketTiers.map((tier, index) => (
            <div 
              key={index} 
              className="flex flex-col p-10 md:p-12 rounded-sm border border-black/5 bg-[#F9F9F9] text-black transition-all duration-300 hover:scale-[1.02] hover:border-black/20 h-full shadow-sm"
            >
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
                    <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-primary shadow-sm shadow-primary/40" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={isRegistered ? "/dashboard" : "/tickets"}
                className={`inline-flex items-center justify-center w-full h-16 rounded-sm font-bold text-[14px] uppercase tracking-widest transition-all active:scale-95 ${
                  isRegistered 
                  ? "bg-primary text-white hover:bg-black" 
                  : "bg-black text-white hover:bg-primary"
                }`}
              >
                {isRegistered ? "View Your Pass" : "Purchase"}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Tickets;
