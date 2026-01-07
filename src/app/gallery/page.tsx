"use client";

import React from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import GallerySection from "@/components/sections/gallery";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-32">
        <div className="container mx-auto px-6 max-w-[1280px] text-center mb-16">
          <h1 className="text-[48px] md:text-[72px] font-semibold font-display leading-[1.1] text-black mb-6">
            Event Highlights
          </h1>
          <p className="text-[18px] text-[#666666] leading-[1.6] max-w-[540px] mx-auto">
            A visual journey through the most memorable moments of the Nova Paw Festival.
          </p>
        </div>
      </section>

      <GallerySection />

      <Footer />
    </main>
  );
}
