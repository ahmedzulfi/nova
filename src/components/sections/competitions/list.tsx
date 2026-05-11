"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Clock, Users, Star, ArrowRight } from 'lucide-react';

const competitions = [
  {
    title: "Dog Fashion Show",
    desc: "Owners and dogs strut the runway in matching themed outfits. Judged on creativity, coordination, fit, presentation, and overall charm by WKU international judges.",
    stats: [
      { label: "Contestants", value: "8 per day", icon: <Users className="w-4 h-4" /> },
      { label: "Duration", value: "50 min show", icon: <Clock className="w-4 h-4" /> },
      { label: "Awards", value: "Gold/Silver/Rose Cups", icon: <Trophy className="w-4 h-4" /> }
    ],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2068&auto=format&fit=crop",
    color: "bg-primary"
  },
  {
    title: "Grooming Competition",
    desc: "Professional groomers showcase precision trimming, styling, and finishing under live judging by WKU officials. Evaluated on technique, cleanliness, creativity, handling, and final appearance.",
    stats: [
      { label: "Contestants", value: "8 per day", icon: <Users className="w-4 h-4" /> },
      { label: "Duration", value: "60 min show", icon: <Clock className="w-4 h-4" /> },
      { label: "Provided", value: "Grooming tables", icon: <Star className="w-4 h-4" /> }
    ],
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop",
    color: "bg-accent"
  },
  {
    title: "Best Dog Show",
    desc: "The prestigious WKU-recognized event evaluating breed structure, temperament, and presentation across Puppy, Youth, and Adult classes in a double-ring setup.",
    stats: [
      { label: "Contestants", value: "40 dogs per day", icon: <Users className="w-4 h-4" /> },
      { label: "Classes", value: "3 Classes", icon: <Star className="w-4 h-4" /> },
      { label: "Grand Prize", value: "Best in Show Trophy", icon: <Trophy className="w-4 h-4" /> }
    ],
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
    color: "bg-primary"
  },
  {
    title: "Best Cat Show",
    desc: "WCF-licensed grand judging inside the immersive Cat Dome. Cats evaluated on body type, head, ears, eyes, coat, and overall condition according to WCF international standards.",
    stats: [
      { label: "Contestants", value: "20 cats per day", icon: <Users className="w-4 h-4" /> },
      { label: "Judges", value: "WCF International", icon: <Star className="w-4 h-4" /> },
      { label: "Grand Prize", value: "Best Cat of Show", icon: <Trophy className="w-4 h-4" /> }
    ],
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
    color: "bg-accent"
  },
  {
    title: "Cat Drawing Battle",
    desc: "A live creative battle where artists compete to draw cats in real-time under the spotlight. Judged on speed, style, imagination, and artistic technique  the ultimate feline art showdown.",
    stats: [
      { label: "Eligibility", value: "Open to all ages", icon: <Users className="w-4 h-4" /> },
      { label: "Provided", value: "All Materials", icon: <Star className="w-4 h-4" /> },
      { label: "Prizes", value: "Top 3 artists", icon: <Trophy className="w-4 h-4" /> }
    ],
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
    color: "bg-black"
  }
];

const CompetitionsList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const registration = localStorage.getItem('nova_registration');
    if (registration) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <section className="py-20 md:py-32 bg-[#F9F9F9]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="space-y-12 md:space-y-24">
          {competitions.map((comp, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                  <Image
                    src={comp.image}
                    alt={comp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="space-y-6">
                  <h3 className="text-[32px] md:text-[48px] font-display   font-bold  text-black leading-tight tracking-tighter">
                    {comp.title}
                  </h3>
                  <p className="text-[18px] md:text-[20px] text-black/60 font-body leading-relaxed">
                    {comp.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {comp.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-primary">
                        {stat.icon}
                        <span className="text-[12px] font-bold uppercase tracking-wider">{stat.label}</span>
                      </div>
                      <span className="text-[16px] font-bold text-black">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col gap-6">
                  <Link 
                    href={isLoggedIn ? "/dashboard" : "/tickets"}
                    className="inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-5 rounded-sm font-bold text-[14px] uppercase tracking-widest hover:bg-primary transition-all active:scale-95 w-fit"
                  >
                    {isLoggedIn ? "Manage My Entry" : "Register Now"} <ArrowRight className="w-5 h-5" />
                  </Link>
                  
                  <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest italic flex items-center gap-2">
                    <Star className="w-3 h-3 text-primary" /> Participation requires a Pet Owner Ticket
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitionsList;
