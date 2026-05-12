"use client";

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import TicketsHero from '@/components/sections/tickets/hero';
import TicketsPricing from '@/components/sections/tickets/pricing';
import TicketsCheckout from '@/components/sections/tickets/checkout';

function TicketsContent() {
  const searchParams = useSearchParams();
  const [selectedTier, setSelectedTier] = useState<string>("adult");
  const checkoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tier = searchParams.get('tier');
    if (tier && ["adult", "dog-owner", "cat-owner"].includes(tier)) {
      setSelectedTier(tier);
      // Wait for components to mount before scrolling
      setTimeout(() => {
        checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [searchParams]);

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

export default function TicketsPage() {
  return (
    <Suspense fallback={<div>Loading tickets...</div>}>
      <TicketsContent />
    </Suspense>
  );
}
