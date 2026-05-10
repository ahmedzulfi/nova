'use client';

import React from 'react';
import { Dog, Cat, Tent, Utensils, HeartPulse, Flag } from 'lucide-react';

const highlights = [
  {
    title: "Dog Space",
    icon: <Dog className="w-6 h-6" />,
    emoji: "🐕",
    description: "Main stage, dog arena, vet booth, adoption area, sponsor booths, and food trucks.",
    bg: "bg-[#F9F9F9]"
  },
  {
    title: "Cat Space",
    icon: <Cat className="w-6 h-6" />,
    emoji: "🐱",
    description: "Cat Dome with projection shows, grooming zone, fashion runway, and cat statue landmark.",
    bg: "bg-[#F3F3F3]"
  },
  {
    title: "Carnival Zone",
    icon: <Tent className="w-6 h-6" />,
    emoji: "🎪",
    description: "Fetch & Win, Spin-A-Treat, Smash-A-Cat, Pawspin Ruffle, and the Paw Shot Challenge.",
    bg: "bg-white"
  },
  {
    title: "Food Trucks",
    icon: <Utensils className="w-6 h-6" />,
    emoji: "🍔",
    description: "6 food trucks: Baker St, Karak Signature, Amora Pizza, Seven Lives, Burgeri, Pasta To Go.",
    bg: "bg-[#F9F9F9]"
  },
  {
    title: "Vet & Adoption",
    icon: <HeartPulse className="w-6 h-6" />,
    emoji: "🏥",
    description: "NovaVet free consultations, QAWS dog adoption, Paws Rescue cat adoption, and pharmacy booth.",
    bg: "bg-[#F3F3F3]"
  },
  {
    title: "Landmarks",
    icon: <Flag className="w-6 h-6" />,
    emoji: "🎈",
    description: "10m helium paw balloon, 3.5m dog & cat statues, 3D letter installation, and mascot walkabouts.",
    bg: "bg-white"
  }
];

const HighlightsGrid = () => {
  return (
    <section className="py-24 md:py-32 bg-[#F9F9F9]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-[12px] mb-6 block">What Awaits You</span>
          <h2 className="text-[40px] md:text-[72px] font-display font-black text-black tracking-tighter leading-[0.95] mb-8">
            Festival Highlights
          </h2>
          <div className="w-20 h-1 bg-black mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {highlights.map((item, index) => (
            <div key={index} className={`p-12 border border-black/5 flex flex-col items-start transition-all duration-500 hover:z-10 hover:shadow-sm hover:scale-[1.01] ${item.bg}`}>
              <div className="text-[40px] mb-8 grayscale hover:grayscale-0 transition-all duration-500">
                {item.emoji}
              </div>
              <h3 className="text-[24px] font-display font-black mb-4 tracking-tight flex items-center gap-3">
                {item.title}
              </h3>
              <p className="text-[16px] text-black/50 leading-relaxed font-body">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsGrid;
