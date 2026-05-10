"use client";

import React, { useState, useRef } from 'react';
import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import TicketsHero from '@/components/sections/tickets/hero';
import TicketsPricing from '@/components/sections/tickets/pricing';
import TicketsCheckout from '@/components/sections/tickets/checkout';

export default function TicketsPage() {
  const [selectedTier, setSelectedTier] = useState<string>("adult");
  const checkoutRef = useRef<HTMLDivElement>(null);

  const handleSelectTier = (tier: string) => {
    setSelectedTier(tier);
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <TicketsHero />
      <TicketsPricing onSelect={handleSelectTier} selectedTier={selectedTier} />
      <div ref={checkoutRef}>
        <TicketsCheckout selectedTier={selectedTier} />
      </div>
      <Footer />
    </main>
  );
}
