import React from 'react';
import Image from 'next/image';
import { ArrowRight, Dog, Cat, Check } from 'lucide-react';

const ZoneSplit = () => {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-[1280px]">
                {/* Section Header */}
                <div className="mb-12 md:mb-16 max-w-[800px]">
                    <span className="inline-block bg-[#F3F3F3] text-black text-[12px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
                        Explore Our Zones
                    </span>
                    <h2 className="text-[40px] md:text-[56px] leading-[1.1] font-bold text-black tracking-tight">
                        Dedicated Experiences for <br className="hidden md:block" /> Every Pet & Owner
                    </h2>
                </div>

                {/* Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Dog Zone Card */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-primary rounded-[40px] p-8 md:p-12 flex flex-col justify-between min-h-[480px] overflow-hidden relative group">
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8">
                                    <Dog className="text-primary w-8 h-8" />
                                </div>
                                <h3 className="text-white text-[32px] md:text-[42px] font-bold mb-6">Dog Zone</h3>
                                <ul className="space-y-3 mb-10">
                                    {['Best in Show', 'Grooming Competition', 'Fashion Show', 'K9 Demonstrations'].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-white/90 font-medium">
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                                <Check className="w-3.5 h-3.5 text-white" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative z-10">
                                <a
                                    href="/registration"
                                    className="inline-flex items-center justify-between gap-4 bg-black text-white px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 group/btn"
                                >
                                    <span>Explore Dog Competitions</span>
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            {/* Decorative Background Icon */}
                            <Dog className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 -rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="relative h-[240px] rounded-[40px] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
                                alt="Dog Competition"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Cat Zone Card */}
                    <div className="flex flex-col-reverse lg:flex-col gap-6">
                        <div className="relative h-[240px] rounded-[40px] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
                                alt="Cat Show"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="bg-accent rounded-[40px] p-8 md:p-12 flex flex-col justify-between min-h-[480px] overflow-hidden relative group">
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8">
                                    <Cat className="text-accent w-8 h-8" />
                                </div>
                                <h3 className="text-white text-[32px] md:text-[42px] font-bold mb-6">Cat Zone</h3>
                                <ul className="space-y-3 mb-10">
                                    {['Best Cat Show', 'Drawing Cat Battle', 'Fashion Show', 'Cat Dome Experience'].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-white/90 font-medium">
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                                <Check className="w-3.5 h-3.5 text-white" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative z-10">
                                <a
                                    href="/registration"
                                    className="inline-flex items-center justify-between gap-4 bg-black text-white px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 group/btn"
                                >
                                    <span>Explore Cat Competitions</span>
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            {/* Decorative Background Icon */}
                            <Cat className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 -rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ZoneSplit;
