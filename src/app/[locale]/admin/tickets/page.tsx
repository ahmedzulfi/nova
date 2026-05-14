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
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-10">
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">Ticket Ledger</h1>
                <p className="text-[16px] text-[#91918E] max-w-2xl">Issuance tracking and inventory management for festival passes.</p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F1EF] pb-6">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E] group-focus-within:text-[#37352F] transition-colors" />
                        <Input 
                            placeholder="Search by ID, buyer or type..." 
                            className="pl-10 h-9 bg-[#F7F6F3] border-none rounded-sm text-[13px] focus-visible:ring-1 focus-visible:ring-[#E9E9E7] placeholder:text-[#91918E]"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9 px-3 rounded-sm border-[#E9E9E7] text-[13px] font-medium text-[#37352F] hover:bg-[#F7F6F3]">
                        <Download className="w-3.5 h-3.5 mr-2 text-[#91918E]" />
                        Export
                    </Button>
                    <Button className="h-9 bg-[#FACC15] hover:bg-[#EAB308] text-black rounded-sm text-[13px] font-bold px-4 shadow-sm border border-black/5">
                        <Plus className="w-4 h-4 mr-1.5" />
                        New Type
                    </Button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-sm border border-[#E9E9E7] transition-all hover:border-[#FACC15]/50 active:scale-[0.98]">
                    <span className="font-bold text-[#91918E] uppercase tracking-widest text-[11px]">Total Revenue</span>
                    <h3 className="text-[32px] font-bold text-[#37352F] mt-2 tracking-tight">$42,500.00</h3>
                </div>
                <div className="bg-white p-6 rounded-sm border border-[#E9E9E7] transition-all hover:border-[#FACC15]/50 active:scale-[0.98]">
                    <span className="font-bold text-[#91918E] uppercase tracking-widest text-[11px]">Utilization</span>
                    <h3 className="text-[32px] font-bold text-[#37352F] mt-2 tracking-tight">3,420</h3>
                </div>
                <div className="bg-white p-6 rounded-sm border border-[#E9E9E7] transition-all hover:border-[#FACC15]/50 active:scale-[0.98]">
                    <span className="font-bold text-[#91918E] uppercase tracking-widest text-[11px]">Time to Event</span>
                    <h3 className="text-[32px] font-bold text-[#37352F] mt-2 tracking-tight">45 Days</h3>
                </div>
            </div>

            {/* Main Listing */}
            <div className="bg-white border border-[#E9E9E7]  rounded-sm  overflow-hidden shadow-sm">
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
