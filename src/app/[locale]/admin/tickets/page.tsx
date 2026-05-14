"use client";

import React from 'react';
import Link from 'next/link';
import {
    Plus,
    Download,
    Search,
    Ticket,
    CheckCircle2,
    Calendar,
    Tag,
    MoreHorizontal,
    Eye,
    Users
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const tickets = [
    { id: 'NP-2026-X8Y1', name: 'Sarah Johnson', email: 'sarah.j@example.com', type: 'Dog Owner', adults: 1, kids: 1, pets: 1, total: '$125.00', date: '2026-01-15', status: 'Active' },
    { id: 'NP-2026-A1B2', name: 'Michael Chen', email: 'm.chen@example.com', type: 'Adult', adults: 2, kids: 0, pets: 0, total: '$100.00', date: '2026-01-14', status: 'Active' },
    { id: 'NP-2026-C3D4', name: 'Emma Wilson', email: 'emma.w@example.com', type: 'Cat Owner', adults: 1, kids: 2, pets: 1, total: '$90.00', date: '2026-01-14', status: 'Active' },
    { id: 'NP-2026-E5F6', name: 'David Rodriguez', email: 'd.rod@example.com', type: 'Dog Owner', adults: 2, kids: 1, pets: 2, total: '$210.00', date: '2026-01-13', status: 'Used' },
    { id: 'NP-2026-G7H8', name: 'James Smith', email: 'j.smith@example.com', type: 'Adult', adults: 1, kids: 0, pets: 0, total: '$50.00', date: '2026-01-13', status: 'Active' },
];

export default function TicketsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-10">
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">Guest & Ticket Ledger</h1>
                <p className="text-[16px] text-[#91918E] max-w-2xl">Unified database of festival attendees, ticket tiers, and order breakdowns.</p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F1EF] pb-6">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E] group-focus-within:text-[#37352F] transition-colors" />
                        <Input
                            placeholder="Search by ID, name or email..."
                            className="pl-10 h-9 bg-[#F7F6F3] border-none rounded-sm text-[13px] focus-visible:ring-1 focus-visible:ring-[#E9E9E7] placeholder:text-[#91918E]"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9 px-3 rounded-sm border-[#E9E9E7] text-[13px] font-medium text-[#37352F] hover:bg-[#F7F6F3]">
                        <Download className="w-3.5 h-3.5 mr-2 text-[#91918E]" />
                        Export Ledger
                    </Button>
                </div>
            </div>

            {/* Main Listing */}
            <div className="bg-white border border-[#E9E9E7]  rounded-sm  overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-[#F7F6F3]/50">
                        <TableRow className="hover:bg-transparent border-b border-[#E9E9E7]">
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Order ID</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Guest Information</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Ticket Tier</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Breakdown</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Total Paid</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Status</TableHead>
                            <TableHead className="w-16 px-6 py-4"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow key={ticket.id} className="hover:bg-[#F7F6F3]/30 border-b border-[#F1F1EF] last:border-0 transition-colors duration-100 [transition-timing-function:var(--ease-emil-out)]">
                                <TableCell className="px-6 py-5 font-bold text-[#37352F] text-[13px]">{ticket.id}</TableCell>
                                <TableCell className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-8 h-8 border border-[#E9E9E7] rounded-sm">
                                            <AvatarFallback className="bg-[#FACC15]/20 text-[#854d0e] font-bold text-[10px]">{ticket.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[14px] text-[#37352F]">{ticket.name}</span>
                                            <span className="text-[11px] text-[#91918E]">{ticket.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-5">
                                    <span className={cn(
                                        "text-[11px] font-bold px-2 py-1  rounded-sm  border uppercase tracking-wider",
                                        ticket.type === 'Dog Owner' ? 'bg-orange-50 text-orange-600 border-orange-100/50' :
                                        ticket.type === 'Cat Owner' ? 'bg-blue-50 text-blue-600 border-blue-100/50' :
                                        'bg-[#F1F1EF] text-[#37352F] border-[#E9E9E7]'
                                    )}>
                                        {ticket.type}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-5 text-[12px] text-[#91918E] font-medium">
                                    {ticket.adults}A • {ticket.kids}K • {ticket.pets}P
                                </TableCell>
                                <TableCell className="px-6 py-5 font-bold text-[#37352F] text-[13px]">{ticket.total}</TableCell>
                                <TableCell className="px-6 py-5">
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1  rounded-sm  border",
                                        ticket.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100/50' : 'bg-[#F1F1EF] text-[#91918E] border-[#E9E9E7]/50'
                                    )}>
                                        {ticket.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8  rounded-sm  hover:bg-[#EBEBE9] transition-all duration-100 [transition-timing-function:var(--ease-emil-out)] active:scale-[0.90]">
                                                <MoreHorizontal className="w-4.5 h-4.5 text-[#91918E]" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48  rounded-sm  p-1.5 border-[#E9E9E7] shadow-xl bg-white">
                                            <Link href={`/admin/tickets/${ticket.id}`}>
                                                <DropdownMenuItem className=" rounded-sm  text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">
                                                    <Eye className="w-4 h-4 mr-2 text-[#91918E]" />
                                                    View Ticket
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem className=" rounded-sm  text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">Resend Confirmation</DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-[#F1F1EF] my-1" />
                                            <DropdownMenuItem className=" rounded-sm  text-[13px] font-medium py-2 cursor-pointer text-[#37352F] focus:bg-[#F7F6F3]">Mark as Used</DropdownMenuItem>
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
