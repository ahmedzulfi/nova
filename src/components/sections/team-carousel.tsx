"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Best in Show",
    role: "Dog Competition",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop",
  },
  {
    name: "Best Cat Show",
    role: "Cat Competition",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
  },
  {
    name: "Grooming Competition",
    role: "Pet Care",
    image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Fashion Show",
    role: "Pet Runway",
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop",
  },
  {
    name: "Drawing Cat Battle",
    role: "Interactive Art",
    image: "https://images.unsplash.com/photo-1573865662567-57ef7b73392a?q=80&w=1915&auto=format&fit=crop",
  },
  {
    name: "K9 Demonstrations",
    role: "Action & Agility",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function TeamCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 md:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-[1280px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
          <div className="space-y-4">
            <span className="badge-label bg-[#f3f3f3] text-[#666666] px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wider">Competitions</span>
            <h2 className="text-[40px] md:text-[56px] font-display font-semibold text-[#111111] leading-[1.2] tracking-[-0.03em]">
              Festival competition highlights
            </h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#E5E5E5] flex items-center justify-center transition-all duration-200 hover:bg-[#F3F3F3] active:scale-95 group"
              aria-label="Previous team member"
            >
              <ArrowLeft className="w-5 h-5 text-[#666666] group-hover:text-[#111111]" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Next team member"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] md:w-[400px] snap-start group"
              >
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 bg-[#F3F3F3]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 300px, 400px"
                  />

                  <div className="absolute bottom-6 right-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform duration-300 hover:rotate-90">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 ml-2">
                  <h6 className="text-[20px] md:text-[24px] font-display font-semibold text-[#111111]">
                    {member.name}
                  </h6>
                  <p className="text-[14px] md:text-[16px] text-[#666666] font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
