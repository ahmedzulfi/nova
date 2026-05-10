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
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold">Event Schedule</h1>
                    <p className="text-gray-500">Plan and coordinate festival activities and sessions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-black/5 p-1  rounded-sm flex items-center">
                        <Button variant="ghost" size="icon" className="w-10 h-10    rounded-sm  bg-white shadow-sm text-black">
                            <List className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-10 h-10    rounded-sm  text-gray-400">
                            <LayoutGrid className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white  rounded-sm shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Event
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                {/* Days Navigation */}
                <Card className="md:col-span-2 border-black/5 shadow-sm    rounded-sm  h-fit">
                    <CardHeader className="p-6">
                        <CardTitle className="text-lg font-display font-bold">Festival Dates</CardTitle>
                        <CardDescription>Select a day to manage its schedule</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                        {['Day 1: Friday, Feb 20', 'Day 2: Saturday, Feb 21', 'Day 3: Sunday, Feb 22'].map((day, i) => (
                            <button
                                key={day}
                                className={cn(
                                    "w-full text-left p-4  rounded-sm font-bold transition-all",
                                    i === 0 ? "bg-black text-white shadow-lg shadow-black/10" : "hover:bg-black/5 text-gray-500"
                                )}
                            >
                                {day}
                            </button>
                        ))}
                    </CardContent>
                </Card>

                {/* Timeline */}
                <div className="md:col-span-5 space-y-4">
                    {scheduleItems.map((item) => (
                        <div key={item.id} className="group flex items-start gap-6 relative">
                            <div className="flex flex-col items-center gap-2 pt-2">
                                <span className="text-sm font-bold text-gray-400 whitespace-nowrap">{item.time}</span>
                                <div className="w-px h-full bg-black/5 group-last:bg-transparent" />
                            </div>

                            <Card className="flex-1 border-black/5 shadow-sm    rounded-sm  overflow-hidden hover:shadow-md transition-shadow relative">
                                <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", item.color)} />
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className="rounded-full border-black/10 font-bold text-[10px] uppercase tracking-wider">{item.type}</Badge>
                                                <span className={cn(
                                                    "text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full",
                                                    item.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'
                                                )}>
                                                    • {item.status}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-display font-bold">{item.event}</h3>
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                                    <Clock className="w-4 h-4 text-gray-300" />
                                                    60 Minutes
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                                    <MapPin className="w-4 h-4 text-gray-300" />
                                                    {item.location}
                                                </div>
                                            </div>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-full">
                                                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48  rounded-sm border-black/5 shadow-xl">
                                                <DropdownMenuItem className="py-2 cursor-pointer font-medium">Edit Event</DropdownMenuItem>
                                                <DropdownMenuItem className="py-2 cursor-pointer font-medium">Reschedule</DropdownMenuItem>
                                                <DropdownMenuItem className="py-2 cursor-pointer font-medium text-red-500">Cancel Event</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

