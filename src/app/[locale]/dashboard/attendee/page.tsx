"use client";

import React from 'react';
import {
    QrCode,
    Ticket,
    Calendar,
    Map as MapIcon,
    Download,
    ChevronRight,
    User,
    LogOut,
    Search,
    Bell
} from 'lucide-react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";

const mockTickets = [
    {
        id: "TKT-993-812",
        type: "Adult General Pass",
        holder: "John Doe",
        date: "April 3-4, 2026",
        status: "Valid",
        zone: "Main Arena"
    }
];

export default function AttendeeDashboard() {
    return (
        <main className="min-h-screen bg-[#FAFAFA]">
            <Navigation />

            <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
                <div className="container mx-auto px-6 max-w-[1400px]">

                    {/* Header with Search and Notifications */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-[32px] md:text-[48px] font-bold font-display leading-tight">My Festival Pass</h1>
                            <p className="text-[#666666] mt-2 text-[18px]">Welcome back, John! Your adventure at The Pearl awaits.</p>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    className="w-full h-12 pl-12 pr-4  rounded-sm border border-[#F0F0F0] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-[14px]"
                                />
                            </div>
                            <button className="w-12 h-12  rounded-sm bg-white border border-[#F0F0F0] flex items-center justify-center text-[#666666] hover:text-black transition-colors relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full border-2 border-white" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                        {/* Left Column: Tickets & Schedule */}
                        <div className="xl:col-span-8 space-y-8">

                            {/* Featured Ticket Card */}
                            <div className="bg-black    rounded-sm  p-8 md:p-12 text-white relative overflow-hidden group">
                                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                    <div className="w-48 h-48 bg-white    rounded-sm  flex items-center justify-center p-4 shrink-0 shadow-2xl">
                                        <QrCode className="w-full h-full text-black" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                                            <span className="bg-primary text-black px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider">Valid Entry</span>
                                            <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider">Ticket #PV-2026-91</span>
                                        </div>
                                        <h2 className="text-[32px] md:text-[40px] font-bold font-display mb-2">Adult General Pass</h2>
                                        <p className="text-white/60 text-[18px] mb-8">Valid for April 3rd and 4th at The Pearl, Qatar</p>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                            <Button className="bg-white text-black hover:bg-white/90  rounded-sm px-8 h-12 font-bold transition-all">
                                                <Download className="w-4 h-4 mr-2" /> Download PDF
                                            </Button>
                                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10  rounded-sm px-8 h-12 font-bold transition-all">
                                                Add to Wallet
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule & Map Preview */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white    rounded-sm  p-8 border border-[#F0F0F0] shadow-sm">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-[24px] font-bold font-display">Living Schedule</h3>
                                        <span className="text-primary font-bold text-[14px]">Day 1</span>
                                    </div>
                                    <div className="space-y-8">
                                        {[
                                            { time: "10:00 AM", event: "Festival Grand Opening", loc: "Main Gateway", type: "Ceremony" },
                                            { time: "11:30 AM", event: "Dog Agility Prelims", loc: "Arena A", type: "Competition" },
                                            { time: "01:00 PM", event: "Feline Grooming Expo", loc: "Cat Dome", type: "Exhibition" },
                                            { time: "02:30 PM", event: "Pet Care Masterclass", loc: "Workshop Zone", type: "Learning" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex gap-6 items-start group cursor-pointer">
                                                <div className="w-16 text-primary font-bold text-[14px] pt-1">{item.time}</div>
                                                <div className="flex-1 pb-6 border-b border-[#F5F5F5] group-last:border-0 group-last:pb-0">
                                                    <p className="font-bold text-[17px] mb-1 group-hover:text-primary transition-colors">{item.event}</p>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-[14px] text-[#999999]">{item.loc}</p>
                                                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#CCCCCC]">{item.type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="ghost" className="w-full mt-8  rounded-sm font-bold text-[#666666] hover:text-black">
                                        View Full Schedule <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>

                                <div className="bg-white    rounded-sm  p-8 border border-[#F0F0F0] shadow-sm flex flex-col">
                                    <h3 className="text-[24px] font-bold font-display mb-8">Interactive Map</h3>
                                    <div className="flex-1 bg-[#F9F9F9]    rounded-sm  border border-[#F0F0F0] relative overflow-hidden group cursor-pointer">
                                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center p-8">
                                            <MapIcon className="w-24 h-24 text-[#E0E0E0] group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-white via-white/80 to-transparent">
                                            <p className="font-bold text-[18px] mb-1">Locate Your Spot</p>
                                            <p className="text-[14px] text-[#666666]">Navigate through the 5 festival zones at The Pearl.</p>
                                        </div>
                                    </div>
                                    <Button className="mt-8 bg-black text-white hover:bg-black/90  rounded-sm h-14 font-bold shadow-lg shadow-black/10">
                                        Open Full Map
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Profile & Navigation */}
                        <div className="xl:col-span-4 space-y-8">

                            {/* Profile Card */}
                            <div className="bg-white    rounded-sm  p-8 border border-[#F0F0F0] shadow-sm">
                                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#F5F5F5]">
                                    <div className="w-20 h-20 bg-primary    rounded-sm  flex items-center justify-center text-white p-4 shrink-0 shadow-lg shadow-primary/20">
                                        <User className="w-full h-full" />
                                    </div>
                                    <div>
                                        <h4 className="text-[22px] font-bold font-display">John Doe</h4>
                                        <p className="text-[#999999]">Festival Member</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {[
                                        { icon: Ticket, label: "Manage Tickets", active: true },
                                        { icon: Calendar, label: "My Schedule", active: false },
                                        { icon: User, label: "Profile Settings", active: false },
                                        { icon: LogOut, label: "Secure Log Out", active: false, danger: true }
                                    ].map((link, idx) => (
                                        <button
                                            key={idx}
                                            className={`w-full flex items-center gap-4 px-6 py-4  rounded-sm font-bold transition-all ${link.active
                                                ? 'bg-black text-white shadow-xl shadow-black/10'
                                                : link.danger
                                                    ? 'text-red-500 hover:bg-red-50'
                                                    : 'text-[#666666] hover:bg-[#F9F9F9] hover:text-black'
                                                }`}
                                        >
                                            <link.icon className="w-5 h-5" />
                                            {link.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Help & Support Banner */}
                            <div className="bg-primary/5 border border-primary/10    rounded-sm  p-8">
                                <h4 className="font-bold text-[18px] mb-3">Questions?</h4>
                                <p className="text-[14px] text-[#666666] leading-relaxed mb-6">
                                    Check our FAQ or join the live chat for help with your tickets or the festival schedule.
                                </p>
                                <Button variant="outline" className="w-full  rounded-sm border-primary/20 text-primary hover:bg-primary/5 font-bold h-12">
                                    Help Center
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />

        </main>
    );
}
