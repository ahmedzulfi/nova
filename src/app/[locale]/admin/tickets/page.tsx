"use client";

import React from 'react';
import {
    Plus,
    Download,
    Search,
    Ticket,
    CheckCircle2,
    Calendar,
    Tag,
    MoreHorizontal
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

const tickets = [
    { id: 'TIC-1024', buyer: 'Sarah Johnson', type: 'General Admission', quantity: 2, price: '$100.00', date: '2026-01-15', status: 'Active' },
    { id: 'TIC-1025', buyer: 'Michael Chen', type: 'VIP Pass', quantity: 1, price: '$150.00', date: '2026-01-14', status: 'Active' },
    { id: 'TIC-1026', buyer: 'Emma Wilson', type: 'General Admission', quantity: 4, price: '$200.00', date: '2026-01-14', status: 'Active' },
    { id: 'TIC-1027', buyer: 'James Smith', type: 'Pet & Owner Combo', quantity: 1, price: '$75.00', date: '2026-01-13', status: 'Used' },
    { id: 'TIC-1028', buyer: 'Lisa Garcia', type: 'VIP Pass', quantity: 2, price: '$300.00', date: '2026-01-13', status: 'Refunded' },
];

export default function TicketsPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-display font-bold text-[#37352F] tracking-tight">Ticket Ledger</h1>
                    <p className="text-[#91918E] text-[15px]">Issuance tracking and inventory management for festival passes.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9 rounded-md border-[#E9E9E7] bg-white text-[13px] font-semibold text-[#37352F] hover:bg-[#F7F6F3]">
                        <Download className="w-4 h-4 mr-2 text-[#91918E]" />
                        Export CSV
                    </Button>
                    <Button className="h-9 bg-[#37352F] hover:bg-[#37352F]/90 text-white rounded-md text-[13px] font-semibold px-5">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Type
                    </Button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#F7F6F3]/50 p-6 rounded-xl border border-[#E9E9E7] transition-all hover:border-[#37352F]/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/50">
                            <Ticket className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Total Revenue</span>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-[#37352F] tracking-tight">$42,500.00</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-green-600 text-[11px] font-bold">+12.4%</span>
                        <span className="text-[#91918E] text-[11px]">vs last month</span>
                    </div>
                </div>
                <div className="bg-[#F7F6F3]/50 p-6 rounded-xl border border-[#E9E9E7] transition-all hover:border-[#37352F]/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100/50">
                            <Tag className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Utilization</span>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-[#37352F] tracking-tight">3,420</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px]">
                        <div className="w-16 h-1.5 bg-[#E9E9E7] rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 w-[85%]" />
                        </div>
                        <span className="text-[#37352F] font-bold">85% Sold</span>
                    </div>
                </div>
                <div className="bg-[#F7F6F3]/50 p-6 rounded-xl border border-[#E9E9E7] transition-all hover:border-[#37352F]/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-100/50">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Time to Event</span>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-[#37352F] tracking-tight">45 Days</h3>
                    <p className="text-[#91918E] text-[11px] font-medium mt-1">Counting down to showtime</p>
                </div>
            </div>

            {/* Main Listing */}
            <div className="bg-white border border-[#E9E9E7] rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-[#E9E9E7] bg-[#F7F6F3]/30">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E]" />
                        <Input placeholder="Search ledger by ID or Buyer..." className="pl-10 h-9 bg-white border-[#E9E9E7] rounded-lg text-[13px]" />
                    </div>
                </div>
                <Table>
                    <TableHeader className="bg-[#F7F6F3]/50">
                        <TableRow className="hover:bg-transparent border-b border-[#E9E9E7]">
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">ID</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Primary Buyer</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Pass Type</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Qty</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Net Value</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Status</TableHead>
                            <TableHead className="w-16 px-6 py-4"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow key={ticket.id} className="hover:bg-[#F7F6F3]/30 border-b border-[#F1F1EF] last:border-0 transition-colors duration-100 [transition-timing-function:var(--ease-emil-out)]">
                                <TableCell className="px-6 py-5 font-bold text-[#37352F] text-[13px]">{ticket.id}</TableCell>
                                <TableCell className="px-6 py-5 font-bold text-[#37352F] text-[14px]">{ticket.buyer}</TableCell>
                                <TableCell className="px-6 py-5">
                                    <span className="text-[12px] font-bold text-[#37352F] bg-[#F1F1EF] px-2 py-1 rounded-md border border-[#E9E9E7]/50">
                                        {ticket.type}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-5 font-medium text-[#37352F] text-[13px]">{ticket.quantity}</TableCell>
                                <TableCell className="px-6 py-5 font-bold text-[#37352F] text-[13px]">{ticket.price}</TableCell>
                                <TableCell className="px-6 py-5">
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border",
                                        ticket.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100/50' :
                                            ticket.status === 'Used' ? 'bg-[#F1F1EF] text-[#91918E] border-[#E9E9E7]/50' : 'bg-red-50 text-red-600 border-red-100/50'
                                    )}>
                                        {ticket.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md hover:bg-[#EBEBE9] transition-all duration-100 [transition-timing-function:var(--ease-emil-out)] active:scale-[0.90]">
                                                <MoreHorizontal className="w-4.5 h-4.5 text-[#91918E]" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 rounded-lg p-1.5 border-[#E9E9E7] shadow-xl bg-white">
                                            <DropdownMenuItem className="rounded-md text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">View Ticket</DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-md text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">Resend Confirmation</DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-[#F1F1EF] my-1" />
                                            <DropdownMenuItem className="rounded-md text-[13px] font-medium py-2 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">Refund Sale</DropdownMenuItem>
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
