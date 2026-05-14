"use client";

import React from 'react';
import {
    Calendar,
    Plus,
    Clock,
    MapPin,
    LayoutGrid,
    List,
    MoreHorizontal
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const scheduleItems = [
    { id: 1, time: '09:00 AM', event: 'Festival Opening Ceremony', location: 'Main Stage', type: 'Special', status: 'Confirmed', color: 'bg-primary' },
    { id: 2, time: '10:30 AM', event: 'Dog Agility Show', location: 'Performance Ring', type: 'Show', status: 'Confirmed', color: 'bg-blue-500' },
    { id: 3, time: '12:00 PM', event: 'Pet Grooming Workshop', location: 'Workshop Area', type: 'Workshop', status: 'Confirmed', color: 'bg-teal-500' },
    { id: 4, time: '01:30 PM', event: 'Grand Pet Parade', location: 'Festival Boulevard', type: 'Parade', status: 'Pending', color: 'bg-orange-500' },
    { id: 5, time: '03:00 PM', event: 'Vet Q&A Session', location: 'Seminar Hall', type: 'Education', status: 'Confirmed', color: 'bg-purple-500' },
    { id: 6, time: '04:30 PM', event: 'Best in Show Awards', location: 'Main Stage', type: 'Awards', status: 'Confirmed', color: 'bg-amber-500' },
];

export default function SchedulePage() {
    return (
        <div className="animate-in fade-in duration-700">
            {/* Header */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="text-[78px] mb-4">📅</div>
                    <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">Living Schedule</h1>
                    <p className="text-[#91918E] text-[16px]">Coordinate arena timings and session blocks for Nova Paw 2026.</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#F1F1EF] p-1 rounded-sm flex items-center border border-[#E9E9E7]">
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm bg-white shadow-sm text-[#37352F]">
                            <List className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm text-[#91918E] hover:text-[#37352F]">
                            <LayoutGrid className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button className="h-10 bg-[#37352F] hover:bg-black text-white rounded-sm text-[13px] font-bold px-5">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Event
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-10">
                {/* Days Navigation */}
                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-bold text-[#91918E] text-[11px] uppercase tracking-wider mb-2 border-b border-[#E9E9E7] pb-2">Festival Days</h3>
                        <div className="space-y-1">
                            {['Day 1: Friday, Feb 20', 'Day 2: Saturday, Feb 21', 'Day 3: Sunday, Feb 22'].map((day, i) => (
                                <button
                                    key={day}
                                    className={cn(
                                        "w-full text-left px-4 py-3 rounded-sm font-bold text-[14px] transition-all border",
                                        i === 0 
                                            ? "bg-[#F7F6F3] text-[#37352F] border-[#E9E9E7]" 
                                            : "text-[#37352F]/70 border-transparent hover:bg-[#F1F1EF] hover:text-[#37352F]"
                                    )}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-[#FBFAFB] rounded-sm border border-[#E9E9E7]">
                        <h4 className="font-bold text-[#37352F] text-[13px] mb-2">Venue Map</h4>
                        <p className="text-[12px] text-[#91918E] leading-relaxed mb-4">Quick access to stage technical requirements and arena layouts.</p>
                        <Button variant="outline" className="w-full h-8 rounded-sm border-[#E9E9E7] bg-white text-[11px] font-bold text-[#37352F]">
                            Open Floor Plan
                        </Button>
                    </div>
                </div>

                {/* Timeline Area */}
                <div className="md:col-span-5 space-y-2 relative">
                    <div className="absolute left-[39px] top-4 bottom-4 w-px bg-[#E9E9E7]" />
                    
                    {scheduleItems.map((item) => (
                        <div key={item.id} className="group flex items-start gap-8 relative pb-8 last:pb-0">
                            <div className="w-20 pt-1 text-right">
                                <span className="text-[12px] font-bold text-[#91918E] group-hover:text-[#37352F] transition-colors">{item.time}</span>
                            </div>
                            
                            {/* Connector dot */}
                            <div className={cn(
                                "w-2.5 h-2.5 rounded-sm mt-2 relative z-10 border-2 border-white ring-4 ring-transparent transition-all group-hover:ring-[#F1F1EF]",
                                item.color.replace('bg-', 'bg-')
                            )} />

                            <div className="flex-1 bg-white border border-[#E9E9E7] rounded-sm p-6 hover:bg-[#F7F6F3] transition-all group-hover:translate-x-1 duration-300">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-white text-[#37352F] border border-[#E9E9E7]">
                                                {item.type}
                                            </span>
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                                                item.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'
                                            )}>
                                                <div className={cn("w-1.5 h-1.5 rounded-sm", item.status === 'Confirmed' ? 'bg-green-600' : 'bg-yellow-600')} />
                                                {item.status}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#37352F] tracking-tight">{item.event}</h3>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2 text-[12px] text-[#91918E] font-medium">
                                                <Clock className="w-3.5 h-3.5" />
                                                60 Mins
                                            </div>
                                            <div className="flex items-center gap-2 text-[12px] text-[#91918E] font-medium">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {item.location}
                                            </div>
                                        </div>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-sm hover:bg-white border border-transparent hover:border-[#E9E9E7]">
                                                <MoreHorizontal className="w-4.5 h-4.5 text-[#91918E]" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 rounded-sm p-1.5 border-[#E9E9E7] shadow-sm bg-white">
                                            <DropdownMenuItem className="rounded-sm text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">Edit Activity</DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-sm text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">Relocate Session</DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-[#E9E9E7] my-1" />
                                            <DropdownMenuItem className="rounded-sm text-[13px] font-medium py-2 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">Cancel Slot</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

