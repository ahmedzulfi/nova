'use client';

import React from 'react';
import Image from 'next/image';
import { Dog, Cat, Mic2, Camera, ArrowUpRight } from 'lucide-react';

const venues = [
  {
    title: "Dog Arena",
    description: "The 18m × 14m arena hosts WDF dog shows, races, and K9 demonstrations with professional ring setup.",
    icon: <Dog className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
    size: "18m × 14m"
  },
  {
    title: "Cat Dome",
    description: "The 10m geodesic dome with 180° projection, fashion shows, grooming competitions, and immersive cat experiences.",
    icon: <Cat className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
    size: "10m Geodesic"
  },
  {
    title: "Main Stage",
    description: "The 6m × 4m stage with 5m LED screen, runway ramp, and full AV system hosting opening ceremonies and entertainment.",
    icon: <Mic2 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    size: "6m × 4m"
  },
  {
    title: "Photo Zone",
    description: "The 8m wide 3D \"NOVA PAW FESTIVAL\" letters, interactive photo booth, and mascot installations.",
    icon: <Camera className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop",
    size: "8m Wide 3D"
  }
];

const VenuesGrid = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {venues.map((venue, index) => (
            <div key={index} className="group relative bg-[#F9F9F9] rounded-sm overflow-hidden border border-black/5 flex flex-col md:flex-row h-full transition-all duration-500 hover:shadow-sm hover:-translate-y-1">
              <div className="relative w-full md:w-[40%] h-[300px] md:h-auto overflow-hidden">
                <Image
                  src={venue.image}
                  alt={venue.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-sm text-[11px] font-black uppercase tracking-widest text-black">
                  {venue.size}
                </div>
              </div>
              <div className="p-8 md:p-12 flex-grow flex flex-col justify-center">
                <div className="w-12 h-12 bg-primary text-white rounded-sm flex items-center justify-center mb-6 shadow-sm">
                  {venue.icon}
                </div>
                <h3 className="text-[28px] font-display font-black mb-4 tracking-tight">{venue.title}</h3>
                <p className="text-[16px] text-black/50 leading-relaxed font-body">
                  {venue.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[11px] opacity-0 group-hover:opacity-100 transition-all duration-500">
                  View Space Details <ArrowUpRight className="w-4 h-4" />
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
