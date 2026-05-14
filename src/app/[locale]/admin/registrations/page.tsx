"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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
    { id: 'REG-001', owner: 'Sarah Johnson', email: 'sarah.j@example.com', pet: 'Luna', category: 'Grooming Competition', date: '2026-01-15', status: 'Completed' },
    { id: 'REG-002', owner: 'Michael Chen', email: 'm.chen@example.com', pet: 'Noodle', category: 'Cat Fashion Show', date: '2026-01-14', status: 'Pending' },
    { id: 'REG-003', owner: 'Emma Wilson', email: 'emma.w@example.com', pet: 'Oliver', category: 'Dog Fashion Show', date: '2026-01-14', status: 'Completed' },
    { id: 'REG-005', owner: 'Lisa Garcia', email: 'lisa.g@example.com', pet: 'Charlie', category: 'Best Looking Cat Show', date: '2026-01-13', status: 'Completed' },
    { id: 'REG-006', owner: 'Robert Brown', email: 'r.brown@example.com', pet: 'Cooper', category: 'Best Looking Dog Show', date: '2026-01-12', status: 'Pending' },
    { id: 'REG-007', owner: 'Emily Davis', email: 'e.davis@example.com', pet: 'Daisy', category: 'Drawing Cat Battle', date: '2026-01-12', status: 'Completed' },
    { id: 'REG-008', owner: 'William Taylor', email: 'w.taylor@example.com', pet: 'Finn', category: 'Grooming Competition', date: '2026-01-11', status: 'Completed' },
];

export default function RegistrationsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Completed':
                return <span className="text-[11px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5  rounded-sm  border border-green-100/50 flex items-center gap-1.5 w-fit"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
            case 'Pending':
                return <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-2 py-0.5  rounded-sm  border border-yellow-100/50 flex items-center gap-1.5 w-fit"><Clock className="w-3 h-3" /> Pending</span>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-10">
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">Registrations</h1>
                <p className="text-[16px] text-[#91918E] max-w-2xl">Manage and review all pet competition entries for the festival.</p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F1EF] pb-6">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E] group-focus-within:text-[#37352F] transition-colors" />
                        <Input
                            placeholder="Search by owner, email or pet name..."
                            className="pl-10 h-9 bg-[#F7F6F3] border-none rounded-sm text-[13px] focus-visible:ring-1 focus-visible:ring-[#E9E9E7] placeholder:text-[#91918E]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="h-9 px-3 rounded-sm border-[#E9E9E7] text-[13px] font-medium text-[#37352F] hover:bg-[#F7F6F3]">
                        <Filter className="w-3.5 h-3.5 mr-2 text-[#91918E]" />
                        Filter
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9 px-3 rounded-sm border-[#E9E9E7] text-[13px] font-medium text-[#37352F] hover:bg-[#F7F6F3]">
                        <Download className="w-3.5 h-3.5 mr-2 text-[#91918E]" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Table Area */}
            <div className="border border-[#E9E9E7] rounded-sm overflow-hidden bg-white">
                <Table>
                    <TableHeader className="bg-[#F7F6F3]/50">
                        <TableRow className="hover:bg-transparent border-b border-[#E9E9E7]">
                            <TableHead className="w-24 px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">ID</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Owner Information</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Pet Details</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Reg. Date</TableHead>
                            <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Status</TableHead>
                            <TableHead className="w-16 px-6 py-4"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registrations.map((reg) => (
                            <TableRow key={reg.id} className="hover:bg-[#F7F6F3]/30 transition-colors duration-100 [transition-timing-function:var(--ease-emil-out)] border-b border-[#F1F1EF] last:border-0">
                                <TableCell className="px-6 py-5 font-bold text-[#37352F] text-[13px]">{reg.id}</TableCell>
                                <TableCell className="px-6 py-5">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-[14px] text-[#37352F]">{reg.owner}</span>
                                        <span className="text-[12px] text-[#91918E]">{reg.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8  rounded-sm  bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100/50">
                                            <PawPrint className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[14px] text-[#37352F]">{reg.pet}</span>
                                            <span className="text-[12px] text-[#91918E]">{reg.category}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-5 text-[13px] text-[#37352F] font-medium">{reg.date}</TableCell>
                                <TableCell className="px-6 py-5">
                                    {getStatusBadge(reg.status)}
                                </TableCell>
                                <TableCell className="px-6 py-5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="w-8 h-8 p-0  rounded-sm  hover:bg-[#EBEBE9] transition-all duration-100 [transition-timing-function:var(--ease-emil-out)] active:scale-[0.90]">
                                                <MoreHorizontal className="w-4.5 h-4.5 text-[#91918E]" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48  rounded-sm  p-1.5 border-[#E9E9E7] shadow-xl bg-white">
                                            <DropdownMenuLabel className="px-2 py-1.5 text-[10px] text-[#91918E] uppercase font-bold tracking-widest">Manage</DropdownMenuLabel>
                                            <Link href={`/admin/registrations/${reg.id}`}>
                                                <DropdownMenuItem className=" rounded-sm  text-[13px] font-medium text-[#37352F] focus:bg-[#F7F6F3] cursor-pointer">View Details</DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem className=" rounded-sm  text-[13px] font-medium text-[#37352F] focus:bg-[#F7F6F3] cursor-pointer">Edit Data</DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-[#F1F1EF] my-1" />
                                            <DropdownMenuItem className=" rounded-sm  text-[13px] font-medium text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer">Delete Record</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-[#E9E9E7] flex items-center justify-between bg-[#F7F6F3]/30">
                    <p className="text-[12px] text-[#91918E] font-medium">
                        Showing <span className="font-bold text-[#37352F]">8</span> of <span className="font-bold text-[#37352F]">124</span> records
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8  rounded-sm  border-[#E9E9E7] bg-white text-[11px] font-bold text-[#37352F] px-3 disabled:opacity-50">
                            Previous
                        </Button>
                        <div className="flex items-center gap-1">
                            <Button size="sm" className="w-8 h-8  rounded-sm  bg-[#FACC15] text-black text-[11px] font-bold shadow-sm border border-black/5">1</Button>
                            <Button variant="ghost" size="sm" className="w-8 h-8  rounded-sm  text-[11px] font-bold text-[#91918E] hover:text-[#37352F]">2</Button>
                            <Button variant="ghost" size="sm" className="w-8 h-8  rounded-sm  text-[11px] font-bold text-[#91918E] hover:text-[#37352F]">3</Button>
                        </div>
                        <Button variant="outline" size="sm" className="h-8  rounded-sm  border-[#E9E9E7] bg-white text-[11px] font-bold text-[#37352F] px-3">
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
