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
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold">Ticket Sales</h1>
                    <p className="text-gray-500">Track and manage ticket sales and types.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className=" rounded-sm border-black/5 hover:bg-black/5">
                        <Download className="w-4 h-4 mr-2" />
                        Download CSV
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white  rounded-sm shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Ticket Type
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6    rounded-sm  border border-black/5 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10  rounded-sm bg-blue-50 flex items-center justify-center text-blue-600">
                            <Ticket className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">Total Sales</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold">$42,500.00</h3>
                    <p className="text-green-500 text-xs font-bold mt-1">+12% from yesterday</p>
                </div>
                <div className="bg-white p-6    rounded-sm  border border-black/5 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10  rounded-sm bg-orange-50 flex items-center justify-center text-orange-600">
                            <Tag className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">Tickets Sold</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold">3,420</h3>
                    <p className="text-blue-500 text-xs font-bold mt-1">85% of total capacity</p>
                </div>
                <div className="bg-white p-6    rounded-sm  border border-black/5 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10  rounded-sm bg-teal-50 flex items-center justify-center text-teal-600">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">Days Remaining</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold">45 Days</h3>
                    <p className="text-gray-400 text-xs font-bold mt-1">Countdown to festival</p>
                </div>
            </div>

            <div className="bg-white    rounded-sm  border border-black/5 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-black/5">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search by Ticket ID or Buyer..." className="pl-10 h-10 bg-black/5 border-none    rounded-sm " />
                    </div>
                </div>
                <Table>
                    <TableHeader className="bg-black/[0.02]">
                        <TableRow>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">ID</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Buyer</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Type</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Qty</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Amount</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Status</TableHead>
                            <TableHead className="w-16 px-6 py-4"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow key={ticket.id} className="hover:bg-black/[0.01]">
                                <TableCell className="px-6 py-4 font-bold text-primary">{ticket.id}</TableCell>
                                <TableCell className="px-6 py-4 font-bold">{ticket.buyer}</TableCell>
                                <TableCell className="px-6 py-4">
                                    <Badge variant="outline" className="rounded-full border-black/10 font-medium">{ticket.type}</Badge>
                                </TableCell>
                                <TableCell className="px-6 py-4 font-medium">{ticket.quantity}</TableCell>
                                <TableCell className="px-6 py-4 font-bold">{ticket.price}</TableCell>
                                <TableCell className="px-6 py-4">
                                    <Badge className={cn(
                                        "px-2.5 py-0.5 rounded-full border-none font-bold text-[10px] uppercase tracking-wider",
                                        ticket.status === 'Active' ? 'bg-green-100 text-green-700' :
                                            ticket.status === 'Used' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'
                                    )}>
                                        {ticket.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="rounded-full">
                                                <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48  rounded-sm border-black/5 shadow-xl">
                                            <DropdownMenuItem className="py-2 cursor-pointer font-medium">View Ticket</DropdownMenuItem>
                                            <DropdownMenuItem className="py-2 cursor-pointer font-medium">Resend Email</DropdownMenuItem>
                                            <DropdownMenuItem className="py-2 cursor-pointer font-medium text-red-500">Refund</DropdownMenuItem>
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
