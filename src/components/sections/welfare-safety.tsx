"use client";

import React from 'react';
import { Shield, Heart, UserCheck, Activity } from 'lucide-react';

const welfarePoints = [
    {
        icon: <Shield className="w-8 h-8" />,
        title: "On-site Veterinary Support",
        description: "Full-time professional veterinary team available throughout the festival for check-ups and immediate assistance."
    },
    {
        icon: <Activity className="w-8 h-8" />,
        title: "Hydration & Rest Zones",
        description: "Temperature-controlled areas with fresh water stations and comfortable resting spots for all pets."
    },
    {
        icon: <UserCheck className="w-8 h-8" />,
        title: "Safety Marshals",
        description: "Trained staff enforcing festival rules (leash requirements, vaccination checks) to ensure a peaceful environment."
    },
    {
        icon: <Heart className="w-8 h-8" />,
        title: "Strict Entry Protocol",
        description: "Verification of vaccination records and health certificates for all participating pets at the entry point."
    }
];

export default function WelfareSafety() {
    return (
        <section className="py-24 md:py-32 bg-muted/30">
            <div className="container mx-auto px-6 max-w-[1280px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-6 md:space-y-8">
                        <div>
                            <span className="badge-label bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[11px] md:text-[12px] font-semibold uppercase tracking-wider mb-4 md:mb-6 inline-block">
                                Priority One
                            </span>
                            <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-display font-bold text-black leading-[1.1] tracking-tight">
                                Safety & Welfare <br className="hidden sm:block" /> are at our core
                            </h2>
                        </div>
                        <p className="text-[16px] md:text-[18px] text-muted-foreground leading-relaxed max-w-[540px]">
                            We have implemented rigorous protocols to ensure that every pet and attendee enjoys the festival in a safe, healthy, and stress-free environment.
                        </p>
                        <div className="pt-2 md:pt-4">
                            <a
                                href="/registration"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-bold text-[15px] md:text-[16px] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                            >
                                Read Full Guidelines
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {welfarePoints.map((point, index) => (
                            <div
                                key={index}
                                className="bg-white p-8  rounded-sm  border border-border hover:border-primary/20 transition-all duration-300 group shadow-sm"
                            >
                                <div className="w-16 h-16    rounded-sm  bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    {point.icon}
                                </div>
                                <h4 className="text-[20px] font-bold text-black mb-3 font-display">
                                    {point.title}
                                </h4>
                                <p className="text-[#666666] text-[15px] leading-relaxed">
                                    {point.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
