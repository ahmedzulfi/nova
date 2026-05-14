"use client";

import React, { use } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Ticket,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Users,
    PawPrint,
    Clock,
    Download,
    ShieldCheck,
    ExternalLink,
    Trophy
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

const QR_CODE_URL = "https://public-api.qr-code-generator.com/v1/create/extended?image_format=PNG&image_width=300&qr_code_text=https%3A%2F%2Fvalidmvps.vercel.app%2F&foreground_color=%23000000&background_color=%23FFFFFF&frame_name=no-frame";

const mockGetTicketDetails = (id: string) => {
    return {
        id,
        fullName: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '+974 5555 1234',
        tier: 'Dog Owner',
        adultQty: 1,
        kidsQty: 1,
        petQty: 1,
        petName: 'Luna',
        total: 125,
        orderId: id,
        competitionEntry: 'Grooming Competition',
        entryDate: '2026-01-15',
        status: 'Active'
    };
};

export default function TicketDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const data = mockGetTicketDetails(resolvedParams.id);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Back Navigation */}
            <Link 
                href="/admin/tickets" 
                className="flex items-center gap-2 text-[#91918E] hover:text-[#37352F] text-[13px] font-medium transition-colors mb-8 group"
            >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to ledger
            </Link>

            {/* Notion Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#F1F1EF]">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight">{data.orderId}</h1>
                        <Badge className="bg-green-50 text-green-600 border-green-100/50 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm h-fit mt-3">
                            {data.status}
                        </Badge>
                    </div>
                    <p className="text-[16px] text-[#91918E]">Full Access Pass • Issued on {data.entryDate}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 px-6 rounded-sm border-[#E9E9E7] text-[#37352F] hover:bg-[#F7F6F3] text-[13px] font-bold transition-all active:scale-[0.98]">
                        Resend Email
                    </Button>
                    <Button className="h-10 px-8 bg-[#FACC15] hover:bg-[#EAB308] text-black rounded-sm text-[13px] font-bold transition-all active:scale-[0.98] shadow-sm border border-black/5">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Guest Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 border border-[#E9E9E7] rounded-sm space-y-6">
                            <div className="flex items-center gap-3 text-[#91918E] text-[12px] font-bold uppercase tracking-wider">
                                <Ticket size={14} className="text-[#FACC15]" />
                                <span>Digital Pass</span>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="bg-white p-2 border border-[#E9E9E7] rounded-sm">
                                    <img src={QR_CODE_URL} alt="QR" className="w-24 h-24" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold text-[18px]">{data.orderId}</p>
                                    <p className="text-[14px] text-[#37352F]">{data.tier}</p>
                                    <p className="text-[12px] text-[#91918E]">{data.adultQty} Adult • {data.kidsQty} Kids</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border border-[#E9E9E7] rounded-sm space-y-6 bg-[#F7F6F3]/30">
                            <div className="flex items-center gap-3 text-[#91918E] text-[12px] font-bold uppercase tracking-wider">
                                <User size={14} />
                                <span>Primary Buyer</span>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">Full Name</p>
                                    <p className="text-[16px] font-bold text-[#37352F]">{data.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">Email / Phone</p>
                                    <p className="text-[14px] text-[#37352F]">{data.email}</p>
                                    <p className="text-[14px] text-[#37352F]">{data.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Registration Details */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-[#37352F] text-[12px] uppercase tracking-widest border-b border-[#E9E9E7] pb-2">Pass Breakdown</h3>
                        <div className="border border-[#E9E9E7] rounded-sm overflow-hidden">
                            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Adult Passes</p>
                                    <p className="text-[20px] font-bold text-[#37352F]">{data.adultQty}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Kids Added</p>
                                    <p className="text-[20px] font-bold text-[#37352F]">{data.kidsQty}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Pet Entitlements</p>
                                    <p className="text-[20px] font-bold text-[#37352F]">{data.petQty}</p>
                                </div>
                            </div>
                            {data.petName && (
                                <div className="px-6 py-4 bg-[#F7F6F3]/50 border-t border-[#E9E9E7] flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <PawPrint className="w-4 h-4 text-[#37352F]" />
                                        <span className="text-[14px] font-bold text-[#37352F]">Registered Pet: {data.petName}</span>
                                    </div>
                                    <Badge className="bg-white border-[#E9E9E7] text-[#91918E] rounded-sm text-[10px] font-bold uppercase tracking-widest">
                                        Health Check Required
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Competitions */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-[#37352F] text-[12px] uppercase tracking-widest border-b border-[#E9E9E7] pb-2">Festival Participation</h3>
                        {data.competitionEntry ? (
                            <div className="p-6 bg-[#FBFAFB] border border-[#E9E9E7] rounded-sm flex items-center justify-between group hover:border-[#FACC15]/50 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white border border-[#E9E9E7] rounded-sm flex items-center justify-center text-[24px]">
                                        <Trophy className="w-6 h-6 text-[#FACC15]" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Competition Registration</p>
                                        <p className="text-[18px] font-bold text-[#37352F]">{data.competitionEntry}</p>
                                    </div>
                                </div>
                                <Link href={`/admin/registrations/REG-001`}>
                                    <Button variant="ghost" className="h-10 text-[13px] font-bold text-[#91918E] hover:text-[#37352F]">
                                        View Entry <ExternalLink className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="p-12 border border-dashed border-[#E9E9E7] rounded-sm text-center">
                                <p className="text-[14px] text-[#91918E]">No competition entries found for this ticket.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="space-y-8">
                    {/* Financial Summary */}
                    <div className="p-6 bg-[#37352F] text-white rounded-sm space-y-6">
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Order Total</p>
                            <p className="text-[32px] font-bold">{data.total} QAR</p>
                        </div>
                        <div className="pt-6 border-t border-white/10 space-y-4">
                            <div className="flex justify-between text-[13px]">
                                <span className="text-white/50">Payment Status</span>
                                <span className="font-bold text-green-400 flex items-center gap-1.5">
                                    <ShieldCheck size={14} />
                                    Captured
                                </span>
                            </div>
                            <div className="flex justify-between text-[13px]">
                                <span className="text-white/50">Transaction ID</span>
                                <span className="font-bold opacity-80">TXN-8842-X1</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border border-[#E9E9E7] rounded-sm space-y-4">
                        <p className="text-[13px] text-[#91918E] leading-relaxed">
                            This ticket was purchased via the online checkout flow. Access is granted for both days of the festival.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
