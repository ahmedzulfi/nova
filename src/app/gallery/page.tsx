"use client";

import React from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import GallerySection from "@/components/sections/gallery";
import VenuesGrid from "@/components/sections/gallery/venues-grid";
import HighlightsGrid from "@/components/sections/gallery/highlights-grid";
import { Instagram, ArrowRight } from 'lucide-react';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-10 lg:pt-48 lg:pb-20">
        <div className="container mx-auto px-6 max-w-[1280px] text-center">
          <span className="inline-block bg-[#F3F3F3] text-black text-[12px] font-semibold px-4 py-1.5 rounded-sm uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            Gallery & Venues
          </span>
          <h1 className="text-[48px] md:text-[84px] font-bold font-display leading-[1] text-black mb-10 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Explore the <br className="hidden md:block" /> Festival Magic
          </h1>
          <p className="text-[18px] md:text-[20px] text-[#666666] leading-[1.6] max-w-[700px] mx-auto font-body animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            A glimpse into the incredible spaces and experiences awaiting you at Nova Paw Festival 2026.
          </p>
        </div>
      </section>

      {/* Venues Grid */}
      <VenuesGrid />

      {/* Highlights Grid */}
      <HighlightsGrid />

      {/* Visual Gallery */}
      <div className="py-24">
        <div className="container mx-auto px-6 max-w-[1280px] mb-16 text-center">
          <h2 className="text-[40px] md:text-[60px] font-display font-black tracking-tighter mb-4">Event Moments</h2>
          <p className="text-black/50 font-medium">Relive the highlights through our lens.</p>
        </div>
        <GallerySection />
      </div>

      {/* Social CTA */}
      <section className="py-24 bg-black text-white overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-[1280px] text-center relative z-10">
          <h3 className="text-[32px] md:text-[56px] font-display font-black mb-8 tracking-tight">Share Your Moments</h3>
          <p className="text-white/60 text-[18px] mb-12 max-w-[600px] mx-auto leading-relaxed">
            Tag your photos with <span className="text-primary font-bold">#NovaPawFestival2026</span> and follow us for updates!
          </p>
          <a
            href="https://www.instagram.com/nova_paw_festival/"
            target="_blank"
            className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-sm font-bold text-[18px] hover:bg-white hover:text-black transition-all active:scale-95"
          >
            <Instagram className="w-6 h-6" />
            Follow on Instagram
          </a>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary rounded-full blur-[100px] -ml-48 -mb-48" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
