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
        <section className="bg-white py-[120px] md:py-[160px]">
            <div className="container max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-x-16 items-start">
                    {/* Left Column: Sticky Selection */}
                    <div className="flex flex-col gap-10 sticky top-32">
                        <div>
                            <span className="inline-flex items-center px-5 py-2 rounded-sm bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
                                Program Preview
                            </span>
                        </div>

                        <div className="flex flex-row md:flex-col gap-4">
                            {programData.map((data, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveDay(index)}
                                    className={`text-left px-8 py-6 rounded-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeDay === index
                                        ? 'bg-primary text-white shadow-xl shadow-primary/20'
                                        : 'bg-[#F5F5F0] text-black hover:bg-[#E6E6E6]'
                                        }`}
                                >
                                    <span className="block text-[12px] uppercase tracking-[0.2em] font-bold opacity-70 mb-2">
                                        {data.day}
                                    </span>
                                    <span className="block text-[20px] font-bold font-display leading-tight tracking-tight">
                                        {data.date}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="hidden md:block w-full mt-10">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-2xl border border-black/5">
                                <Image
                                    src={programData[activeDay].image}
                                    alt="Program Preview"
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Schedule List */}
                    <div className="flex flex-col mt-12 md:mt-0">
                        <h2 className="text-[40px] md:text-[72px] font-bold leading-[1] text-black mb-16 font-display tracking-tighter">
                            Explore the <br className="hidden md:block" /> Festival Schedule
                        </h2>

                        <div className="flex flex-col">
                            {programData[activeDay].events.map((event, index) => (
                                <div
                                    key={index}
                                    className={`py-10 ${index !== 0 ? 'border-t border-black/5' : ''} group transition-all duration-300`}
                                >
                                    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-12">
                                        <span className="text-[20px] font-bold text-primary min-w-[120px] pt-1 font-body tracking-tight">
                                            {event.time}
                                        </span>
                                        <div className="flex flex-col gap-4">
                                            <h4 className="text-[28px] md:text-[36px] font-bold text-black font-display leading-[1.1] tracking-tight group-hover:text-primary transition-colors">
                                                {event.title}
                                            </h4>
                                            <p className="text-[16px] md:text-[18px] leading-[1.6] text-black/50 max-w-[680px] font-medium font-body">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="border-t border-black/5"></div>
                        </div>

                        <div className="mt-16">
                            <a
                                href="/about"
                                className="inline-flex items-center justify-center h-16 px-12 bg-black text-white rounded-sm font-bold text-[14px] uppercase tracking-[0.2em] transition-all hover:bg-primary active:scale-95 shadow-xl shadow-black/10"
                            >
                                Detailed Festival Guide
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramPreview;
