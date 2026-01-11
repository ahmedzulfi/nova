"use client";

import React from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import GallerySection from "@/components/sections/gallery";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-10 lg:pt-48 lg:pb-20">
        <div className="container mx-auto px-6 max-w-[1280px] text-center">
          <span className="inline-block bg-[#F3F3F3] text-black text-[12px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-8">
            Visual Highlights
          </span>
          <h1 className="text-[48px] md:text-[84px] font-bold font-display leading-[1] text-black mb-10 tracking-tight">
            Capturing the <br className="hidden md:block" /> Festival Magic
          </h1>
          <p className="text-[18px] md:text-[20px] text-[#666666] leading-[1.6] max-w-[700px] mx-auto font-body">
            Relive the best moments of Nova Paw Festival 2026. From the high-energy dog shows to the serene Cat Dome highlights.
          </p>
        </div>
      </section>

      <GallerySection />

      <Footer />
    </main>
  );
}
