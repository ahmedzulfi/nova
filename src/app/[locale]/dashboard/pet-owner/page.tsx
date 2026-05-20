"use client";

import React from 'react';
import {
    PawPrint,
    Clock,
    CheckCircle2,
    Plus,
    MoreHorizontal,
    Eye,
    Edit3,
    Activity,
    FileText,
} from 'lucide-react';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
        <div className="animate-in fade-in duration-500 pb-20">
            <div className="max-w-[708px]">
                {/* Notion Page Header */}
                <div className="mb-10 mt-4">
                    <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">
                        {t('title')}
                    </h1>
                    <p className="text-[16px] text-[#37352F]/70">
                        {t('desc')}
                    </p>
                </div>

                <div className="space-y-10">
                    
                    {/* Active Registration Journey */}
                    <div className="space-y-4">
                        <h2 className="text-[24px] font-bold text-[#37352F] tracking-tight mb-4">
                            {t('journey_title', { name: mockRegistrations[0].petName })}
                        </h2>
                        
                        <div className="border border-[#E9E9E7] rounded-sm bg-white overflow-hidden">
                            <div className="p-4 border-b border-[#E9E9E7] flex items-center justify-between bg-[#F7F6F3]">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white border border-[#E9E9E7] rounded-sm flex items-center justify-center shrink-0">
                                        <PawPrint size={16} className="text-[#37352F]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-[#37352F] leading-tight">
                                            {mockRegistrations[0].type}
                                        </span>
                                        <span className="text-[12px] text-[#91918E]">
                                            {t('journey_ref', { ref: mockRegistrations[0].id })}
                                        </span>
                                    </div>
                                </div>
                                <div className="px-2 py-1 bg-yellow-100/50 text-[#854d0e] border border-yellow-200 rounded-sm text-[12px] font-medium">
                                    {t('status', { status: mockRegistrations[0].status })}
                                </div>
                            </div>
                            
                            <div className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white">
                                {mockRegistrations[0].steps.map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${step.completed ? 'bg-[#37352F] text-white' : 'bg-[#F1F1EF] text-[#91918E]'}`}>
                                            {step.completed ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-[13px] font-medium leading-tight ${step.completed ? 'text-[#37352F]' : 'text-[#91918E]'}`}>
                                                {step.label}
                                            </span>
                                            <span className="text-[11px] text-[#91918E]">
                                                {step.date}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="h-[1px] bg-[#E9E9E7] w-full" />

                    {/* Registered Pets */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[24px] font-bold text-[#37352F] tracking-tight">
                                {t('pets_title')}
                            </h2>
                            <Button variant="ghost" className="h-8 px-3 text-[#37352F] hover:bg-[#F7F6F3] text-[13px] font-medium gap-2 rounded-sm border border-[#E9E9E7]">
                                <Plus size={14} />
                                {t('new_pet')}
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 border border-[#E9E9E7] rounded-sm hover:bg-[#F7F6F3] transition-colors bg-white">
                                <div className="w-10 h-10 bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm flex items-center justify-center shrink-0">
                                    <PawPrint size={18} className="text-[#37352F]" />
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <span className="font-bold text-[14px] text-[#37352F] leading-tight">Buddy</span>
                                    <span className="text-[12px] text-[#91918E]">Golden Retriever • 2 Years</span>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-[#E9E9E7]">
                                            <MoreHorizontal size={16} className="text-[#91918E]" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 rounded-sm border-[#E9E9E7] bg-white p-1 shadow-sm">
                                        <DropdownMenuItem className="rounded-sm text-[13px] font-medium py-1.5 cursor-pointer focus:bg-[#F7F6F3]">
                                            <Eye size={14} className="mr-2 text-[#91918E]" />
                                            View Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="rounded-sm text-[13px] font-medium py-1.5 cursor-pointer focus:bg-[#F7F6F3]">
                                            <Edit3 size={14} className="mr-2 text-[#91918E]" />
                                            Edit Details
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-[#E9E9E7] my-1" />
                                        <DropdownMenuItem className="rounded-sm text-[13px] font-medium py-1.5 cursor-pointer focus:bg-[#F7F6F3]">
                                            <Activity size={14} className="mr-2 text-[#91918E]" />
                                            Medical Records
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="flex items-center justify-center p-3 border border-dashed border-[#E9E9E7] rounded-sm hover:bg-[#F7F6F3] transition-colors cursor-pointer bg-white text-[#91918E] hover:text-[#37352F] gap-2">
                                <Plus size={16} />
                                <span className="text-[13px] font-medium">{t('new_pet')}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-[1px] bg-[#E9E9E7] w-full" />
                    
                    {/* Important Information Callout */}
                    <div className="bg-[#F1F1EF] p-4 rounded-sm border border-[#E9E9E7] flex gap-3 items-start">
                        <FileText size={16} className="text-[#37352F] shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1">
                            <span className="text-[14px] font-bold text-[#37352F] leading-tight">Registration Handbook</span>
                            <span className="text-[13px] text-[#37352F]/80">Please ensure all medical records and vaccination certificates are up to date before final approval.</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
