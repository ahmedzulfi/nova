"use client";

import React, { use } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Ticket,
    PawPrint,
    Clock,
    MoreHorizontal,
    Shield,
    ExternalLink
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Mock data fetching based on ID
const mockGetAttendeeDetails = (id: string) => {
    return {
        id,
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
        memberSince: '2025-11-20',
        status: 'Active',
        registrations: [
            { id: 'REG-001', pet: 'Luna', type: 'Dog', status: 'Completed', date: '2026-01-15' },
            { id: 'REG-084', pet: 'Bella', type: 'Dog', status: 'Pending', date: '2026-02-10' },
        ],
        tickets: [
            { id: 'TIC-1024', type: 'VIP Pass', price: '$150.00', status: 'Active', date: '2026-01-14' },
            { id: 'TIC-1025', type: 'General Admission', price: '$50.00', status: 'Active', date: '2026-01-14' },
        ]
    };
};

export default function AttendeeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const data = mockGetAttendeeDetails(resolvedParams.id);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Back Navigation */}
            <Link 
                href="/admin/attendees" 
                className="flex items-center gap-2 text-[#91918E] hover:text-[#37352F] text-[13px] font-medium transition-colors mb-8 group"
            >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to directory
            </Link>

            {/* Notion Page Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[#F1F1EF]">
                <div className="flex items-start gap-6">
                    <Avatar className="w-24 h-24 border border-[#E9E9E7] rounded-sm">
                        <AvatarImage src={data.avatarUrl} />
                        <AvatarFallback className="bg-[#FACC15]/20 text-[#854d0e] font-bold text-3xl">
                            {data.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="pt-2">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight">{data.name}</h1>
                            <Badge className="bg-green-50 text-green-600 border-green-100/50 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm h-fit mt-3">
                                {data.status}
                            </Badge>
                        </div>
                        <p className="text-[16px] text-[#91918E]">Attendee ID: #{data.id} • Member since {new Date(data.memberSince).getFullYear()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 pt-4">
                    <Button variant="outline" className="h-10 px-6 rounded-sm border-[#E9E9E7] text-[#37352F] hover:bg-[#F7F6F3] text-[13px] font-bold transition-all active:scale-[0.98]">
                        Edit Profile
                    </Button>
                    <Button className="h-10 px-8 bg-red-600 hover:bg-red-700 text-white rounded-sm text-[13px] font-bold transition-all active:scale-[0.98]">
                        <Shield className="w-4 h-4 mr-2" />
                        Suspend Account
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-[#37352F] text-[12px] uppercase tracking-widest border-b border-[#E9E9E7] pb-2">Contact Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-[#F7F6F3]/30 border border-[#E9E9E7] rounded-sm">
                            <div className="space-y-1">
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Email Address</p>
                                <div className="flex items-center gap-2 text-[14px] font-semibold text-[#37352F]">
                                    <Mail className="w-4 h-4 text-[#91918E]" />
                                    {data.email}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Phone Number</p>
                                <div className="flex items-center gap-2 text-[14px] font-semibold text-[#37352F]">
                                    <Phone className="w-4 h-4 text-[#91918E]" />
                                    {data.phone}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Location</p>
                                <div className="flex items-center gap-2 text-[14px] font-semibold text-[#37352F]">
                                    <MapPin className="w-4 h-4 text-[#91918E]" />
                                    {data.location}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Registrations List */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-[#37352F] text-[12px] uppercase tracking-widest border-b border-[#E9E9E7] pb-2">Pet Registrations</h3>
                        <div className="border border-[#E9E9E7] rounded-sm overflow-hidden bg-white">
                            <Table>
                                <TableHeader className="bg-[#F7F6F3]/50">
                                    <TableRow className="hover:bg-transparent border-b border-[#E9E9E7]">
                                        <TableHead className="px-6 py-3 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">ID</TableHead>
                                        <TableHead className="px-6 py-3 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Pet</TableHead>
                                        <TableHead className="px-6 py-3 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Status</TableHead>
                                        <TableHead className="px-6 py-3 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Date</TableHead>
                                        <TableHead className="w-16 px-6 py-3"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.registrations.map((reg) => (
                                        <TableRow key={reg.id} className="hover:bg-[#F7F6F3]/30 border-b border-[#F1F1EF] last:border-0">
                                            <TableCell className="px-6 py-4 font-bold text-[#37352F] text-[13px]">{reg.id}</TableCell>
                                            <TableCell className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <PawPrint className="w-4 h-4 text-[#91918E]" />
                                                    <span className="font-bold text-[14px] text-[#37352F]">{reg.pet}</span>
                                                    <span className="text-[11px] text-[#91918E]">({reg.type})</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4">
                                                <Badge className={cn(
                                                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border",
                                                    reg.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100/50' : 'bg-yellow-50 text-yellow-600 border-yellow-100/50'
                                                )}>
                                                    {reg.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-[13px] text-[#37352F] font-medium">{reg.date}</TableCell>
                                            <TableCell className="px-6 py-4">
                                                <Link href={`/admin/registrations/${reg.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <ExternalLink className="w-4 h-4 text-[#91918E]" />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="space-y-8">
                    {/* Ticket Summary */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-[#37352F] text-[12px] uppercase tracking-widest border-b border-[#E9E9E7] pb-2">Active Tickets</h3>
                        <div className="space-y-3">
                            {data.tickets.map((ticket) => (
                                <div key={ticket.id} className="p-4 bg-white border border-[#E9E9E7] rounded-sm hover:border-[#FACC15]/50 transition-all cursor-default">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Ticket className="w-4 h-4 text-[#FACC15]" />
                                            <span className="font-bold text-[14px] text-[#37352F]">{ticket.type}</span>
                                        </div>
                                        <Badge className="bg-[#FACC15] text-black border-none text-[10px] font-bold uppercase tracking-widest">
                                            {ticket.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-[12px]">
                                        <span className="text-[#91918E] font-medium">{ticket.id}</span>
                                        <span className="font-bold text-[#37352F]">{ticket.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full h-10 rounded-sm border-[#E9E9E7] text-[13px] font-bold mt-2">
                            Add New Ticket
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
