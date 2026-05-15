"use client";

import React from 'react';
import {
    PawPrint,
    Clock,
    CheckCircle2,
    Plus,
    FileText,
    ShieldCheck,
    MoreHorizontal,
    MessageSquare,
    ExternalLink,
    ChevronRight,
    Edit3,
    Eye,
    Activity
} from 'lucide-react';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

const mockRegistrations = [
    {
        id: "X8Y",
        petName: "Buddy",
        breed: "Golden Retriever",
        type: "Dog Show - Agility",
        status: "Under Review",
        date: "Nov 12, 2026",
        steps: [
            { label: "Submitted", date: "Nov 12", completed: true },
            { label: "Security Check", date: "Nov 13", completed: true },
            { label: "Final Approval", date: "TBD", completed: false },
            { label: "Payment & Entry", date: "TBD", completed: false },
        ]
    }
];

export default function PetOwnerDashboard() {
    const t = useTranslations('PetOwnerDashboard');

    return (
        <div className="animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-12">
                <div className="text-[78px] mb-4">🐕</div>
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">
                    {t('title')}
                </h1>
            </div>

            <div className="space-y-12">
                {/* Introduction Block */}
                <div className="text-[16px] text-[#37352F] leading-relaxed max-w-3xl">
                    {t('desc')}
                </div>

                {/* Registration Journey Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-[18px] font-semibold text-[#37352F]">
                        <ChevronRight size={18} />
                        <h3>{t('journey_title', { name: mockRegistrations[0].petName })}</h3>
                    </div>

                    <div className="bg-[#FBFAFB] rounded-sm p-6 border border-[#E9E9E7]">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white border border-[#E9E9E7] rounded-sm flex items-center justify-center">
                                    <PawPrint size={20} className="text-[#37352F]" />
                                </div>
                                <div>
                                    <p className="font-bold text-[14px]">{mockRegistrations[0].type}</p>
                                    <p className="text-[12px] text-[#91918E]">{t('journey_ref', { ref: mockRegistrations[0].id })}</p>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-sm text-[12px] font-medium">
                                {t('status', { status: mockRegistrations[0].status })}
                            </div>
                        </div>

                        {/* Minimal Timeline */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {mockRegistrations[0].steps.map((step, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-[#E9E9E7] rounded-sm">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                        {step.completed ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium">{step.label}</p>
                                        <p className="text-[11px] text-[#91918E]">{step.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Pet Profiles Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-2">
                        <h3 className="text-[18px] font-semibold text-[#37352F]">{t('pets_title')}</h3>
                        <Button variant="ghost" size="sm" className="text-[#91918E] hover:text-[#37352F] text-[13px] h-8 gap-2">
                            <Plus size={14} />
                            {t('new_pet')}
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="group flex items-center gap-4 p-4 border border-[#E9E9E7] rounded-sm hover:bg-[#F7F6F3] transition-colors">
                            <div className="w-12 h-12 bg-[#F7F6F3] group-hover:bg-white border border-[#E9E9E7] rounded-sm flex items-center justify-center">
                                <PawPrint size={24} className="text-[#37352F]" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-[15px]">Buddy</p>
                                <p className="text-[13px] text-[#91918E]">Golden Retriever • 2 Years</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-sm hover:bg-[#E9E9E7]">
                                        <MoreHorizontal size={18} className="text-[#91918E]" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 rounded-sm border-[#E9E9E7] bg-white p-1.5 shadow-sm">
                                    <DropdownMenuItem className="rounded-sm text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">
                                        <Eye size={16} className="mr-2 text-[#91918E]" />
                                        View Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="rounded-sm text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">
                                        <Edit3 size={16} className="mr-2 text-[#91918E]" />
                                        Edit Details
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-[#E9E9E7] my-1" />
                                    <DropdownMenuItem className="rounded-sm text-[13px] font-medium py-2 cursor-pointer focus:bg-[#F7F6F3]">
                                        <Activity size={16} className="mr-2 text-[#91918E]" />
                                        Medical Records
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center justify-center p-4 border border-dashed border-[#E9E9E7] rounded-sm hover:bg-[#F7F6F3] transition-colors cursor-pointer text-[#91918E] text-[14px] gap-2">
                            <Plus size={16} />
                            <span>{t('new_pet')}</span>
                        </div>
                    </div>
                </div>

                {/* Resources Grid removed */}
            </div>
        </div>
    );
}
