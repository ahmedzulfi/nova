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
    DropdownMenuSeparator,
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
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-10">
                <div className="text-[78px] mb-4">👥</div>
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">Attendee Directory</h1>
                <p className="text-[16px] text-[#91918E] max-w-2xl">Comprehensive database of festival guests and ticket holders.</p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F1EF] pb-6">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E] group-focus-within:text-[#37352F] transition-colors" />
                        <Input 
                            placeholder="Search by name, email or location..." 
                            className="pl-10 h-9 bg-[#F7F6F3] border-none rounded-sm text-[13px] focus-visible:ring-1 focus-visible:ring-[#E9E9E7] placeholder:text-[#91918E]"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9 px-3 rounded-sm border-[#E9E9E7] text-[13px] font-medium text-[#37352F] hover:bg-[#F7F6F3]">
                        <Mail className="w-3.5 h-3.5 mr-2 text-[#91918E]" />
                        Email All
                    </Button>
                    <Button className="h-9 bg-[#37352F] hover:bg-black text-white rounded-sm text-[13px] font-bold px-4">
                        Add Guest
                    </Button>
                </div>
            </div>

            {/* Table Area */}
            <div className="border border-[#E9E9E7] rounded-sm overflow-hidden bg-white">
                <Table>
                    <TableHeader className="bg-[#F7F6F3]/50">
                        <TableRow className="hover:bg-transparent border-b border-[#E9E9E7]">
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Guest</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Communication</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Origin</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Access</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Registry Date</TableHead>
                            <TableHead className="w-16 px-6 py-4"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendees.map((person) => (
                            <TableRow key={person.id} className="hover:bg-[#F7F6F3]/30 border-b border-[#F1F1EF] last:border-0 transition-colors duration-100 [transition-timing-function:var(--ease-emil-out)]">
                                <TableCell className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-9 h-9 border border-[#E9E9E7] rounded-lg">
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">{person.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[14px] text-[#37352F]">{person.name}</span>
                                            <span className="text-[11px] text-[#91918E] font-medium tracking-tight">#{person.id + 1000}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1.5 text-[12px] text-[#37352F] font-medium">
                                            <Mail className="w-3.5 h-3.5 text-[#91918E]" />
                                            {person.email}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[12px] text-[#91918E]">
                                            <Phone className="w-3.5 h-3.5 text-[#E9E9E7]" />
                                            {person.phone}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-5">
                                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#37352F]">
                                        <MapPin className="w-3.5 h-3.5 text-red-400/60" />
                                        {person.location}
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-5">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#37352F] text-white">
                                        {person.tickets} Passes
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-5 text-[13px] text-[#37352F] font-medium">
                                    {person.joined}
                                </TableCell>
                                <TableCell className="px-6 py-5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md hover:bg-[#EBEBE9] transition-all duration-100 [transition-timing-function:var(--ease-emil-out)] active:scale-[0.90]">
                                                <MoreHorizontal className="w-4.5 h-4.5 text-[#91918E]" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 rounded-lg p-1.5 border-[#E9E9E7] shadow-xl bg-white">
                                            <DropdownMenuItem className="rounded-md text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">View Dossier</DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-md text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">Transaction History</DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-[#F1F1EF] my-1" />
                                            <DropdownMenuItem className="rounded-md text-[13px] font-medium py-2 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">Suspend Account</DropdownMenuItem>
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
