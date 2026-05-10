"use client";

import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Download,
    Plus,
    PawPrint,
    CheckCircle2,
    XCircle,
    Clock
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const registrations = [
    { id: 'REG-001', owner: 'Sarah Johnson', email: 'sarah.j@example.com', pet: 'Luna', category: 'Dog (Golden Retriever)', date: '2026-01-15', status: 'Completed' },
    { id: 'REG-002', owner: 'Michael Chen', email: 'm.chen@example.com', pet: 'Noodle', category: 'Cat (Persian)', date: '2026-01-14', status: 'Pending' },
    { id: 'REG-003', owner: 'Emma Wilson', email: 'emma.w@example.com', pet: 'Oliver', category: 'Dog (Beagle)', date: '2026-01-14', status: 'Completed' },
    { id: 'REG-004', owner: 'James Smith', email: 'j.smith@example.com', pet: 'Bella', category: 'Dog (Bulldog)', date: '2026-01-13', status: 'Cancelled' },
    { id: 'REG-005', owner: 'Lisa Garcia', email: 'lisa.g@example.com', pet: 'Charlie', category: 'Cat (Siamese)', date: '2026-01-13', status: 'Completed' },
    { id: 'REG-006', owner: 'Robert Brown', email: 'r.brown@example.com', pet: 'Cooper', category: 'Dog (Poodle)', date: '2026-01-12', status: 'Pending' },
    { id: 'REG-007', owner: 'Emily Davis', email: 'e.davis@example.com', pet: 'Daisy', category: 'Dog (Dachshund)', date: '2026-01-12', status: 'Completed' },
    { id: 'REG-008', owner: 'William Taylor', email: 'w.taylor@example.com', pet: 'Finn', category: 'Dog (Husky)', date: '2026-01-11', status: 'Completed' },
];

export default function RegistrationsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Completed':
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-3 py-1 rounded-full flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Completed</Badge>;
            case 'Pending':
                return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-none px-3 py-1 rounded-full flex items-center gap-1.5"><Clock className="w-3 h-3" /> Pending</Badge>;
            case 'Cancelled':
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none px-3 py-1 rounded-full flex items-center gap-1.5"><XCircle className="w-3 h-3" /> Cancelled</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold">Registrations</h1>
                    <p className="text-gray-500">Manage and view all pet registrations for the festival.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className=" rounded-sm border-black/5 hover:bg-black/5">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white  rounded-sm shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Registration
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative col-span-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search registrations by name, email or pet..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-14 bg-white border-black/5    rounded-sm  focus:ring-primary shadow-sm"
                    />
                </div>
                <Button variant="outline" className="h-14    rounded-sm  border-black/5 bg-white shadow-sm hover:bg-black/5 justify-between px-6">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold">Filter Status</span>
                    </div>
                    <Badge variant="secondary" className="bg-black/5 text-gray-600    rounded-sm ">All</Badge>
                </Button>
            </div>

            <div className="bg-white    rounded-sm  border border-black/5 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-black/[0.02]">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-24 px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">ID</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Owner / Email</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Pet Details</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Reg. Date</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-gray-400 uppercase tracking-widest text-[11px]">Status</TableHead>
                            <TableHead className="w-16 px-6 py-4"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registrations.map((reg) => (
                            <TableRow key={reg.id} className="hover:bg-black/[0.01] transition-colors">
                                <TableCell className="px-6 py-4 font-bold text-primary">{reg.id}</TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-[15px]">{reg.owner}</span>
                                        <span className="text-xs text-gray-500">{reg.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8    rounded-sm  bg-orange-100 flex items-center justify-center text-orange-600">
                                            <PawPrint className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[15px]">{reg.pet}</span>
                                            <span className="text-xs text-gray-500">{reg.category}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4 font-medium text-gray-600">{reg.date}</TableCell>
                                <TableCell className="px-6 py-4">
                                    {getStatusBadge(reg.status)}
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="w-8 h-8 p-0 rounded-full hover:bg-black/5">
                                                <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48  rounded-sm p-2 border-black/5 shadow-xl">
                                            <DropdownMenuLabel className="px-2 py-1.5 text-xs text-gray-400 uppercase font-bold tracking-widest">Actions</DropdownMenuLabel>
                                            <DropdownMenuItem className="   rounded-sm  font-medium cursor-pointer">View Details</DropdownMenuItem>
                                            <DropdownMenuItem className="   rounded-sm  font-medium cursor-pointer">Edit Registration</DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-black/5" />
                                            <DropdownMenuItem className="   rounded-sm  font-medium text-red-500 hover:bg-red-50 cursor-pointer">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="p-6 border-t border-black/5 flex items-center justify-between bg-black/[0.01]">
                    <p className="text-sm text-gray-500">Showing <span className="font-bold text-black">8</span> of <span className="font-bold text-black">124</span> registrations</p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="   rounded-sm  border-black/5 bg-white text-xs font-bold disabled:opacity-50">Previous</Button>
                        <div className="flex items-center gap-1">
                            <Button size="sm" className="w-8 h-8    rounded-sm  bg-primary text-white text-xs font-bold">1</Button>
                            <Button variant="ghost" size="sm" className="w-8 h-8    rounded-sm  text-xs font-bold">2</Button>
                            <Button variant="ghost" size="sm" className="w-8 h-8    rounded-sm  text-xs font-bold">3</Button>
                        </div>
                        <Button variant="outline" size="sm" className="   rounded-sm  border-black/5 bg-white text-xs font-bold">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
