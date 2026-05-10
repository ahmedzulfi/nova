"use client";

import React from 'react';
import {
    Users,
    Search,
    Mail,
    MoreHorizontal,
    Phone,
    MapPin,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const attendees = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '+1 234 567 8901', location: 'New York, USA', joined: '2026-01-15', tickets: 2 },
    { id: 2, name: 'Michael Chen', email: 'm.chen@example.com', phone: '+1 345 678 9012', location: 'San Francisco, USA', joined: '2026-01-14', tickets: 1 },
    { id: 3, name: 'Emma Wilson', email: 'emma.w@example.com', phone: '+1 456 789 0123', location: 'London, UK', joined: '2026-01-14', tickets: 4 },
    { id: 4, name: 'David Rodriguez', email: 'd.rod@example.com', phone: '+1 567 890 1234', location: 'Madrid, Spain', joined: '2026-01-13', tickets: 1 },
    { id: 5, name: 'Aisha Hassan', email: 'a.hassan@example.com', phone: '+971 50 123 4567', location: 'Dubai, UAE', joined: '2026-01-13', tickets: 2 },
];

export default function AttendeesPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold">Attendees</h1>
                    <p className="text-gray-500">View and manage all festival attendees and their details.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className=" rounded-sm border-black/5 hover:bg-black/5 px-6">
                        Send Broadcast Email
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input placeholder="Search attendees by name, email, or ticket ID..." className="pl-12 h-14 bg-white border-black/5    rounded-sm  shadow-sm" />
                </div>
                <Button className="h-14 bg-black text-white hover:bg-black/90    rounded-sm  font-bold">
                    Filter List
                </Button>
            </div>

            <div className="bg-white    rounded-sm  border border-black/5 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-black/[0.02]">
                        <TableRow>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Attendee</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Contact Info</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Location</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Tickets</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Joined</TableHead>
                            <TableHead className="w-16 px-6 py-4"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendees.map((person) => (
                            <TableRow key={person.id} className="hover:bg-black/[0.01]">
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-10 h-10 border border-black/5">
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold">{person.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[15px]">{person.name}</span>
                                            <span className="text-xs text-gray-500">ID: #{person.id + 1000}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail className="w-3 h-3" />
                                            {person.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="w-3 h-3" />
                                            {person.phone}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                        <MapPin className="w-3 h-3 text-red-400" />
                                        {person.location}
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full">
                                            {person.tickets} TICKETS
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                        <Calendar className="w-3 h-3" />
                                        {person.joined}
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="rounded-full">
                                                <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48  rounded-sm border-black/5 shadow-xl">
                                            <DropdownMenuItem className="py-2 cursor-pointer font-medium">View Profile</DropdownMenuItem>
                                            <DropdownMenuItem className="py-2 cursor-pointer font-medium">Purchase History</DropdownMenuItem>
                                            <DropdownMenuItem className="py-2 cursor-pointer font-medium">Send Message</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
