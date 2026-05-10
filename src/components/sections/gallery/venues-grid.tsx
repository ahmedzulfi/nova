'use client';

import React from 'react';
import Image from 'next/image';
import { Dog, Cat, Mic2, Camera, ArrowUpRight } from 'lucide-react';

const venues = [
  {
    id: "dog-arena",
    title: "Dog Arena",
    description: "WDF shows, races, and K9 demonstrations with professional ring setup.",
    icon: <Dog className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
    size: "18m × 14m",
    className: "md:col-span-1 md:row-span-2" // Tall Hero
  },
  {
    id: "cat-dome",
    title: "Cat Dome",
    description: "10m geodesic dome with 180° projection and grooming shows.",
    icon: <Cat className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
    size: "10m Geodesic",
    className: "md:col-span-2 md:row-span-1" // Wide Hero
  },
  {
    id: "main-stage",
    title: "Main Stage",
    description: "6m × 4m stage with 5m LED screen and runway ramp.",
    icon: <Mic2 className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    size: "6m × 4m",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: "photo-zone",
    title: "Photo Zone",
    description: "3D letter installation and mascot photo booths.",
    icon: <Camera className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop",
    size: "8m Wide 3D",
    className: "md:col-span-1 md:row-span-1"
  }
];

const VenuesGrid = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
          {venues.map((venue) => (
            <div 
              key={venue.id} 
              className={`group relative rounded-sm overflow-hidden border border-black/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.01] active:scale-[0.98] cursor-pointer shadow-sm hover:shadow-md ${venue.className}`}
            >
              {/* Background Image */}
              <Image
                src={venue.image}
                alt={venue.title}
                fill
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
              />
              
              {/* Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-white/90 backdrop-blur-md text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm w-fit shadow-sm">
                  {venue.size}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/90 backdrop-blur-md rounded-sm flex items-center justify-center text-white shadow-lg border border-white/20">
                    {venue.icon}
                  </div>
                  <h3 className="text-[24px] md:text-[32px] font-display font-bold text-white leading-tight tracking-tighter">
                    {venue.title}
                  </h3>
                </div>
                <p className="text-white/70 text-[14px] md:text-[15px] max-w-[400px] line-clamp-2 font-body opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  {venue.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  Explore Details <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenuesGrid;
