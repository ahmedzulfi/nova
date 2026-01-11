"use client";

import React from 'react';
import { Trophy, Music, Users, Heart, MapPin } from 'lucide-react';

const highlights = [
    {
        icon: <Trophy className="w-6 h-6" />,
        text: "International Dog & Cat Shows",
    },
    {
        icon: <Music className="w-6 h-6" />,
        text: "Live Entertainment & Performances",
    },
    {
        icon: <Users className="w-6 h-6" />,
        text: "Family-Friendly Festival",
    },
    {
        icon: <Heart className="w-6 h-6" />,
        text: "Vet Talks & Adoption Programs",
    },
    {
        icon: <MapPin className="w-6 h-6" />,
        text: "Dedicated Dog & Cat Zones",
    }
];

export default function HighlightsStrip() {
    return (
        <section className="bg-white border-y border-[#F0F0F0] py-8 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap items-center justify-center lg:justify-between gap-8 lg:gap-4">
                    {highlights.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 group transition-all duration-300"
                        >
                            <div className="p-2.5 rounded-xl bg-[#F9F9F9] text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                {item.icon}
                            </div>
                            <span className="text-[15px] font-bold text-black tracking-tight whitespace-nowrap">
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
