"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const dogCompetitions = [
    {
        title: "Best in Show",
        description: "The ultimate canine prestige event, judging temperament, structure, and presentation across breeds.",
        image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Grooming Competition",
        description: "Showcasing the artistry of professional groomers in transforming pets with precision and style.",
        image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Fashion Show",
        description: "A fun and stylish runway event featuring the latest trends in pet couture and coordinated owner outfits.",
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop"
    }
];

const catCompetitions = [
    {
        title: "Best Cat Show",
        description: "A celebration of feline beauty and temperament, featuring diverse breeds judged by international experts.",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
    },
    {
        title: "Drawing Cat Battle",
        description: "An interactive event where feline instinct meets artistic expression in a unique play-based competition.",
        image: "https://images.unsplash.com/photo-1533702165324-66678e2034b1?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "Fashion Show",
        description: "Elegant felines showcase their grace and unique personalities on a specially designed cat runway.",
        image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop"
    }
];

export default function CompetitionList() {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6 max-w-[1280px]">
                <div className="text-center mb-12 md:mb-24 px-4">
                    <span className="badge-label bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[11px] md:text-[12px] font-semibold uppercase tracking-wider mb-4 md:mb-6 inline-block">
                        On the Stage
                    </span>
                    <h2 className="text-[26px] sm:text-[40px] md:text-[56px] font-display font-bold text-black leading-[1.1] tracking-tight">
                        Festival Shows & Competitions
                    </h2>
                </div>

                {/* Dog Competitions */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-[18px] font-bold font-display uppercase tracking-widest text-[#999999]">Dog Zone Shows</h3>
                        <div className="h-[1px] bg-border flex-grow" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {dogCompetitions.map((comp, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-6 shadow-lg shadow-black/5">
                                    <Image
                                        src={comp.image}
                                        alt={comp.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                                    <div className="absolute bottom-6 right-6">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-primary group-hover:border-primary transition-all">
                                            <ArrowUpRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-[22px] font-bold text-black mb-3 font-display">{comp.title}</h4>
                                <p className="text-muted-foreground text-[16px] leading-relaxed">{comp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cat Competitions */}
                <div>
                    <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-[18px] font-bold font-display uppercase tracking-widest text-[#999999]">Cat Zone Shows</h3>
                        <div className="h-[1px] bg-border flex-grow" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {catCompetitions.map((comp, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-6 shadow-lg shadow-black/5">
                                    <Image
                                        src={comp.image}
                                        alt={comp.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                                    <div className="absolute bottom-6 right-6">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-accent group-hover:border-accent transition-all">
                                            <ArrowUpRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-[22px] font-bold text-black mb-3 font-display">{comp.title}</h4>
                                <p className="text-muted-foreground text-[16px] leading-relaxed">{comp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
