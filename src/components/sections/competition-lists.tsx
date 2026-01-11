import React from 'react';
import Image from 'next/image';
import { Dog, Cat, ArrowRight, Check } from 'lucide-react';

const CompetitionLists = () => {
    return (
        <section className="bg-white py-12 md:py-24">
            <div className="container mx-auto px-6 max-w-[1280px]">
                {/* Dog Zone Bento Block */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                    <div className="lg:col-span-7 bg-primary rounded-[40px] p-8 md:p-12 flex flex-col justify-between items-start min-h-[500px] relative overflow-hidden group">
                        <div className="relative z-10 w-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <Dog className="text-white w-7 h-7" />
                                </div>
                                <span className="text-white/80 font-semibold uppercase tracking-wider text-[14px]">Dog Zone</span>
                            </div>

                            <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.1] tracking-tight text-white mb-8 max-w-[500px] font-display">
                                International Dog Show
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                                {[
                                    'Best in Show (All Breeds)',
                                    'Puppy Excellence Award',
                                    'Agility & Speed Trial',
                                    'Obedience Showcase'
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-white/90 font-medium text-[16px]">
                                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <a
                                href="/registration"
                                className="inline-flex items-center justify-between gap-6 px-8 py-4 rounded-full bg-black text-white font-bold text-[16px] transition-all hover:scale-105 active:scale-95 group/btn"
                            >
                                <span>Register Dog</span>
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Decorative Background Icon */}
                        <Dog className="absolute -bottom-20 -right-20 w-80 h-80 text-white/5 -rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                    </div>

                    <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-0 rounded-[40px] overflow-hidden shadow-sm group">
                        <Image
                            src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop"
                            alt="International Dog Show"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>

                {/* Cat Zone Bento Block */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-0 rounded-[40px] overflow-hidden shadow-sm group order-2 lg:order-1">
                        <Image
                            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
                            alt="International Cat Show"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="lg:col-span-7 bg-accent rounded-[40px] p-8 md:p-12 flex flex-col justify-between items-start min-h-[500px] relative overflow-hidden group order-1 lg:order-2">
                        <div className="relative z-10 w-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <Cat className="text-white w-7 h-7" />
                                </div>
                                <span className="text-white/80 font-semibold uppercase tracking-wider text-[14px]">Cat Zone</span>
                            </div>

                            <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.1] tracking-tight text-white mb-8 max-w-[500px] font-display">
                                International Cat Show
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                                {[
                                    'Best in Show (Feline)',
                                    'Traditional Breed Show',
                                    'Cat Dome Experience',
                                    'Kitten Growth Class'
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-white/90 font-medium text-[16px]">
                                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <a
                                href="/registration"
                                className="inline-flex items-center justify-between gap-6 px-8 py-4 rounded-full bg-black text-white font-bold text-[16px] transition-all hover:scale-105 active:scale-95 group/btn"
                            >
                                <span>Register Cat</span>
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Decorative Background Icon */}
                        <Cat className="absolute -bottom-20 -right-20 w-80 h-80 text-white/5 -rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompetitionLists;
