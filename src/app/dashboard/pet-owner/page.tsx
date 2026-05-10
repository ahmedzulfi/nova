"use client";

import React from 'react';
import {
    PawPrint,
    Clock,
    CheckCircle2,
    Calendar,
    AlertCircle,
    ChevronRight,
    User,
    LogOut,
    Plus,
    FileText,
    Settings,
    ShieldCheck
} from 'lucide-react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";

const mockRegistrations = [
    {
        id: "NPV-2026-X8Y",
        petName: "Buddy",
        breed: "Golden Retriever",
        type: "Dog Show - Agility",
        status: "Under Review",
        date: "Jan 12, 2026",
        steps: [
            { label: "Submitted", date: "Jan 12", completed: true },
            { label: "Security Check", date: "Jan 13", completed: true },
            { label: "Final Approval", date: "TBD", completed: false },
            { label: "Payment & Entry", date: "TBD", completed: false },
        ]
    }
];

export default function PetOwnerDashboard() {
    return (
        <main className="min-h-screen bg-[#FAFAFA]">
            <Navigation />

            <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
                <div className="container mx-auto px-6 max-w-[1400px]">

                    {/* Spacious Header */}
                    <div className="mb-16">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-[#F0F0F0] pb-12">
                            <div>
                                <span className="text-primary font-bold uppercase tracking-[0.2em] text-[13px] mb-4 block">Competitor Hub</span>
                                <h1 className="text-[40px] md:text-[56px] font-bold font-display leading-[1.1] text-black">
                                    Welcome, Pet Owner
                                </h1>
                                <p className="text-[#666666] mt-4 text-[18px] max-w-xl">
                                    Track Buddy's registration progress and manage your competition details for pearl 2026.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Button className="bg-black text-white hover:bg-black/90  rounded-sm px-8 h-14 font-bold transition-all shadow-xl shadow-black/10">
                                    <Plus className="w-5 h-5 mr-2" /> Add Another Pet
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">

                        {/* Main Content Column */}
                        <div className="xl:col-span-8 space-y-12">

                            {/* Active Application Timeline */}
                            <div className="bg-white    rounded-sm  p-8 md:p-12 border border-[#F0F0F0] shadow-sm">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                                    <div>
                                        <h3 className="text-[28px] font-bold font-display mb-2">Buddy's Journey</h3>
                                        <p className="text-[#999999] font-medium">Dog Show - Agility • Ref: #X8Y</p>
                                    </div>
                                    <span className="bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-wider border border-yellow-100 italic">
                                        Status: {mockRegistrations[0].status}
                                    </span>
                                </div>

                                <div className="relative pt-12 pb-4">
                                    {/* Line */}
                                    <div className="absolute top-[3.5rem] left-[1.25rem] md:left-[2.5rem] right-[1.25rem] md:right-[2.5rem] h-[2px] bg-[#F5F5F5]" />

                                    <div className="flex justify-between items-start relative z-10 px-4">
                                        {mockRegistrations[0].steps.map((step, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-6 w-1/4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-xl transition-all duration-500 ${step.completed ? 'bg-primary text-white scale-110' : 'bg-white text-[#CCCCCC] border-[#F5F5F5]'
                                                    }`}>
                                                    {step.completed ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                                </div>
                                                <div className="text-center">
                                                    <p className={`font-bold text-[15px] mb-1 ${step.completed ? 'text-black' : 'text-[#CCCCCC]'}`}>{step.label}</p>
                                                    <p className="text-[12px] text-[#999999] whitespace-nowrap">{step.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-16 p-6 bg-[#F9F9F9]  rounded-sm border border-[#F0F0F0] flex items-center gap-6">
                                    <div className="w-12 h-12 bg-white    rounded-sm  flex items-center justify-center text-primary shadow-sm shrink-0">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <p className="text-[14px] text-[#666666] leading-relaxed">
                                        <strong>Action Required:</strong> Please ensure Buddy's behavioral records are uploaded 72 hours before the event. You are currently at **Security Check** phase.
                                    </p>
                                    <Button variant="link" className="text-primary font-bold ml-auto shrink-0">Upload Now</Button>
                                </div>
                            </div>

                            {/* My Pet Profiles - Grid */}
                            <div className="space-y-6">
                                <h3 className="text-[28px] font-bold font-display">My Registered Pets</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-white    rounded-sm  p-8 border border-[#F0F0F0] shadow-sm hover:border-primary transition-all group flex flex-col items-center text-center">
                                        <div className="w-32 h-32    rounded-sm  bg-[#F9F9F9] mb-6 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
                                            <PawPrint className="w-16 h-16 text-[#E0E0E0] group-hover:text-primary transition-colors" />
                                        </div>
                                        <h4 className="text-[22px] font-bold font-display mb-1">Buddy</h4>
                                        <p className="text-[#666666] mb-6">Golden Retriever • 2 Years</p>
                                        <div className="w-full pt-6 border-t border-[#F5F5F5] flex justify-between gap-4">
                                            <Button variant="ghost" className="flex-1    rounded-sm  text-[#999999] hover:text-black">Edit Bio</Button>
                                            <Button variant="ghost" className="flex-1    rounded-sm  text-[#999999] hover:text-black">Records</Button>
                                        </div>
                                    </div>

                                    <div className="border-2 border-dashed border-[#E6E6E6]    rounded-sm  p-8 flex flex-col items-center justify-center text-center hover:bg-[#F9F9F9] hover:border-primary/50 transition-all cursor-pointer group">
                                        <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#999999] mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                                            <Plus className="w-8 h-8" />
                                        </div>
                                        <p className="font-bold">Register New Pet</p>
                                        <p className="text-[14px] text-[#999999]">Join other competitions</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="xl:col-span-4 space-y-8">

                            {/* Competition Kit Card */}
                            <div className="bg-black    rounded-sm  p-8 text-white">
                                <div className="flex items-center justify-between mb-8">
                                    <FileText className="w-8 h-8 text-primary" />
                                    <span className="text-[12px] font-bold text-white/40 uppercase tracking-widest">Digital Kit</span>
                                </div>
                                <h4 className="text-[24px] font-bold font-display mb-4">Competitor Handbook</h4>
                                <p className="text-white/60 text-[15px] leading-relaxed mb-8">
                                    Everything you need to know about show rules, arena arrival, and behavioral standards.
                                </p>
                                <Button className="w-full bg-white text-black hover:bg-white/90  rounded-sm h-14 font-bold">
                                    Download Kit (PDF)
                                </Button>
                            </div>

                            {/* Important Alerts */}
                            <div className="bg-white    rounded-sm  p-8 border border-[#F0F0F0] shadow-sm">
                                <h4 className="font-bold text-[18px] mb-6 flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    Security Notices
                                </h4>
                                <div className="space-y-6">
                                    <div className="p-4 bg-red-50  rounded-sm border border-red-100">
                                        <p className="text-[13px] text-red-900 leading-relaxed font-medium">
                                            Pet passports must be valid for at least 6 months post-event.
                                        </p>
                                    </div>
                                    <div className="p-4 bg-[#FAFAFA]  rounded-sm border border-[#F0F0F0]">
                                        <p className="text-[13px] text-[#666666] leading-relaxed">
                                            Behavioral screening starts online next week. Keep an eye on your inbox.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Account Actions */}
                            <div className="bg-white    rounded-sm  p-8 border border-[#F0F0F0] shadow-sm">
                                <div className="space-y-2">
                                    {[
                                        { icon: User, label: "Owner Profile" },
                                        { icon: ShieldCheck, label: "Verification Status" },
                                        { icon: Settings, label: "Notification Settings" },
                                        { icon: LogOut, label: "Secure Log Out", danger: true }
                                    ].map((link, idx) => (
                                        <button
                                            key={idx}
                                            className={`w-full flex items-center gap-4 px-6 py-4  rounded-sm font-bold transition-all ${link.danger
                                                ? 'text-red-500 hover:bg-red-50'
                                                : 'text-[#666666] hover:bg-[#F9F9F9] hover:text-black'
                                                }`}
                                        >
                                            <link.icon className="w-5 h-5 text-primary" />
                                            {link.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />

        </main>
    );
}
