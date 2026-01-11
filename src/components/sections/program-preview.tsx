"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const programData = [
    {
        day: "Day 01",
        date: "Friday, April 3, 2026",
        events: [
            {
                time: "10:00 AM",
                title: "Opening Ceremony",
                description: "Official kickoff of Qatar’s first pet festival at The Pearl. Welcome speech and parade."
            },
            {
                time: "11:30 AM",
                title: "International Dog Show - Preliminaries",
                description: "Watch purebred dogs from around the world compete in the first round of judging."
            },
            {
                time: "02:00 PM",
                title: "K9 Speed & Agility Demo",
                description: "High-energy performance featuring professional service dogs navigating complex obstacle courses."
            },
            {
                time: "04:30 PM",
                title: "Cat Dome: Expert Breed Talk",
                description: "Learn about rare cat breeds and specialized care from international feline experts."
            },
            {
                time: "07:00 PM",
                title: "Evening Live Music & Food Trucks",
                description: "Wind down with family-friendly performances and a curated selection of gourmet pet-themed snacks."
            }
        ],
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop"
    },
    {
        day: "Day 02",
        date: "Saturday, April 4, 2026",
        events: [
            {
                time: "10:30 AM",
                title: "Pet Fashion Show",
                description: "The most stylish pets hit the runway in custom-designed outfits. Prizes for most creative duo!"
            },
            {
                time: "12:00 PM",
                title: "International Cat Show - Finals",
                description: "Grand finale of the feline competition. Crowning the 'Best in Show' cat."
            },
            {
                time: "03:00 PM",
                title: "Community Adoption Parade",
                description: "A special showcase of pets looking for their forever homes. Meet rescue groups and experts."
            },
            {
                time: "05:30 PM",
                title: "Dog Show - Championship Finals",
                description: "The main event. Top-ranked dogs compete for the prestigious Nova Paw Trophy."
            },
            {
                time: "08:00 PM",
                title: "Closing Ceremony & Fireworks",
                description: "Farewell celebration with a synchronized drone show and final prize distributions."
            }
        ],
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
    }
];

const ProgramPreview = () => {
    const [activeDay, setActiveDay] = useState(0);

    return (
        <section className="bg-[#F9F9F9] py-[120px] md:py-[160px]">
            <div className="container max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-x-12 items-start">
                    {/* Left Column: Sticky Selection */}
                    <div className="flex flex-col gap-8 sticky top-32">
                        <div>
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E6E6E6] text-black text-[12px] font-semibold uppercase tracking-[0.05em] font-body">
                                Program Preview
                            </span>
                        </div>

                        <div className="flex flex-row md:flex-col gap-4">
                            {programData.map((data, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveDay(index)}
                                    className={`text-left px-6 py-4 rounded-2xl transition-all duration-300 ${activeDay === index
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-black hover:bg-white/80'
                                        }`}
                                >
                                    <span className="block text-[14px] uppercase tracking-wider font-semibold opacity-80 mb-1">
                                        {data.day}
                                    </span>
                                    <span className="block text-[18px] font-bold font-display leading-[1.2]">
                                        {data.date}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Static Image match to Advantage layout */}
                        <div className="hidden md:block w-full mt-8">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px]">
                                <Image
                                    src={programData[activeDay].image}
                                    alt="Program Preview"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Schedule List */}
                    <div className="flex flex-col mt-12 md:mt-0">
                        <h2 className="text-[40px] md:text-[64px] font-bold leading-[1] text-black mb-12 font-display tracking-tight">
                            Explore the <br className="hidden md:block" /> Festival Schedule
                        </h2>

                        <div className="flex flex-col">
                            {programData[activeDay].events.map((event, index) => (
                                <div
                                    key={index}
                                    className={`py-8 ${index !== 0 ? 'border-t border-[#E6E6E6]' : ''} group`}
                                >
                                    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-12">
                                        <span className="text-[18px] font-bold text-primary min-w-[100px] pt-1 font-body">
                                            {event.time}
                                        </span>
                                        <div className="flex flex-col gap-3">
                                            <h4 className="text-[24px] md:text-[32px] font-bold text-black font-display leading-[1.2] group-hover:text-primary transition-colors">
                                                {event.title}
                                            </h4>
                                            <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#666666] max-w-[620px] font-body">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="border-t border-[#E6E6E6]"></div>
                        </div>

                        <div className="mt-12">
                            <a
                                href="/about-us"
                                className="inline-flex items-center justify-center px-10 py-5 bg-black text-white rounded-full font-bold text-[18px] transition-all hover:scale-105 active:scale-95"
                            >
                                Learn More About the Festival
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramPreview;
