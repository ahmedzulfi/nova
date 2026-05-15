"use client";

import React from 'react';
import {
    Calendar,
    Plus,
    Clock,
    MapPin,
    MoreVertical,
    Star,
    LayoutGrid,
    List,
    MoreHorizontal
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
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
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-10">
                <div className="text-[78px] mb-4">📅</div>
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">Living Schedule</h1>
                <p className="text-[16px] text-[#91918E] max-w-2xl">Coordinate arena timings and session blocks for the Nova Paw Festival 2026.</p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F1EF] pb-6">
                <div className="flex items-center gap-4">
                    <div className="bg-[#F1F1EF] p-1 rounded-sm flex items-center border border-[#E9E9E7]">
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm bg-white shadow-sm text-[#37352F]">
                            <List className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm text-[#91918E] hover:text-[#37352F]">
                            <LayoutGrid className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="text-[13px] font-medium text-[#37352F]">
                        <span className="text-[#91918E]">Showing:</span> Today
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9 px-3 rounded-sm border-[#E9E9E7] text-[13px] font-medium text-[#37352F] hover:bg-[#F7F6F3]">
                        <Star className="w-3.5 h-3.5 mr-2 text-[#91918E]" />
                        Key Events
                    </Button>
                    <Button className="h-9 bg-[#37352F] hover:bg-black text-white rounded-sm text-[13px] font-bold px-4">
                        <Plus className="w-4 h-4 mr-1.5" />
                        Add Slot
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-10">
                {/* Days Navigation */}
                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-display font-bold text-[#37352F] text-[13px] uppercase tracking-wider">Festival Days</h3>
                        <div className="space-y-1.5">
                            {['Day 1: Friday, Feb 20', 'Day 2: Saturday, Feb 21', 'Day 3: Sunday, Feb 22'].map((day, i) => (
                                <button
                                    key={day}
                                    className={cn(
                                        "w-full text-left p-3.5  rounded-sm  font-bold text-[14px] transition-all border",
                                        i === 0
                                            ? "bg-[#37352F] text-white border-[#37352F]  shadow-sm  shadow-black/10"
                                            : "hover:bg-[#F7F6F3] text-[#37352F]/60 border-transparent hover:border-[#E9E9E7]"
                                    )}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-5 bg-[#F1F1EF]  rounded-sm  border border-[#E9E9E7]">
                        <h4 className="font-display font-bold text-[#37352F] text-[13px] mb-2">Venue Map</h4>
                        <p className="text-[12px] text-[#91918E] leading-relaxed mb-4">Quick access to stage technical requirements and arena layouts.</p>
                        <Button variant="outline" className="w-full h-8  rounded-sm  border-[#E9E9E7] bg-white text-[11px] font-bold text-[#37352F]">
                            Open Floor Plan
                        </Button>
                    </div>
                </div>

                {/* Timeline Area */}
                <div className="md:col-span-5 space-y-2 relative">
                    <div className="absolute left-[39px] top-4 bottom-4 w-px bg-[#F1F1EF]" />

                    {scheduleItems.map((item) => (
                        <div key={item.id} className="group flex items-start gap-8 relative pb-8 last:pb-0">
                            <div className="w-20 pt-1 text-right">
                                <span className="text-[12px] font-bold text-[#91918E] group-hover:text-[#37352F] transition-colors duration-100 [transition-timing-function:var(--ease-emil-out)]">{item.time}</span>
                            </div>

                            {/* Connector dot */}
                            <div className={cn(
                                "w-2.5 h-2.5 rounded-full mt-2 relative z-10 border-2 border-white ring-4 ring-transparent transition-all group-hover:ring-[#F1F1EF]",
                                item.color.replace('bg-', 'bg-')
                            )} />

                            <div className="flex-1 bg-white border border-[#E9E9E7]  rounded-sm  p-6 hover:border-[#37352F]/20 hover:shadow-sm transition-all duration-150 [transition-timing-function:var(--ease-emil-out)] group-hover:translate-x-1">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5  rounded-sm  bg-[#F1F1EF] text-[#37352F]/70 border border-[#E9E9E7]/50">
                                                {item.type}
                                            </span>
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                                                item.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'
                                            )}>
                                                <div className={cn("w-1 h-1 rounded-full", item.status === 'Confirmed' ? 'bg-green-600' : 'bg-yellow-600')} />
                                                {item.status}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-[#37352F] tracking-tight">{item.event}</h3>
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
                                            <Button variant="ghost" size="icon" className="h-8 w-8  rounded-sm  hover:bg-[#F7F6F3] transition-all duration-100 [transition-timing-function:var(--ease-emil-out)] active:scale-[0.90]">
                                                <MoreHorizontal className="w-4.5 h-4.5 text-[#91918E]" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48  rounded-sm  p-1.5 border-[#E9E9E7]  shadow-sm  bg-white">
                                            <DropdownMenuItem className=" rounded-sm  text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">Edit Activity</DropdownMenuItem>
                                            <DropdownMenuItem className=" rounded-sm  text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">Relocate Session</DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-[#F1F1EF] my-1" />
                                            <DropdownMenuItem className=" rounded-sm  text-[13px] font-medium py-2 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">Cancel Slot</DropdownMenuItem>
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

