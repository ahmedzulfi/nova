"use client";

import React from 'react';
import {
    QrCode,
    Ticket,
    Calendar,
    Map as MapIcon,
    Download,
    Search,
    MessageSquare,
    Clock,
    ExternalLink,
    Info
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

const mockTickets = [
    {
        id: "PV-2026-91",
        type: "Adult General Pass",
        holder: "Ahmed Zulfi",
        date: "Nov 27-28, 2026",
        status: "Valid",
        zone: "Main Arena"
    }
];

export default function AttendeeDashboard() {
    const t = useTranslations('AttendeeDashboard');

    return (
        <div className="animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-12">
                <div className="text-[78px] mb-4">🎫</div>
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">
                    {t('title')}
                </h1>
                <div className="flex items-center gap-6 text-[14px] text-[#91918E] border-b border-[#E9E9E7] pb-6">
                    <div className="flex items-center gap-2">
                        <MessageSquare size={14} />
                        <span>Add comment</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>Last updated Nov 13, 2026</span>
                    </div>
                </div>
            </div>

            <div className="space-y-12">
                {/* Introduction Callout */}
                <div className="flex gap-4 p-4 bg-[#F1F1EF] rounded-sm text-[16px] text-[#37352F] leading-relaxed">
                    <div className="text-[20px]">✨</div>
                    <div>{t('welcome', { name: 'Ahmed' })}</div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-12">
                    {/* Main Content: Ticket & Schedule */}
                    <div className="xl:col-span-3 space-y-12">
                        {/* Ticket Block */}
                        <div className="space-y-4">
                            <h3 className="text-[14px] font-bold text-[#91918E] uppercase tracking-wider">ACTIVE TICKET</h3>
                            <div className="bg-[#FBFAFB] border border-[#E9E9E7] rounded-sm p-8">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="p-3 bg-white border border-[#E9E9E7] rounded-sm shadow-sm shrink-0">
                                        <QrCode size={140} className="text-[#37352F]" />
                                    </div>
                                    <div className="flex-1 space-y-4 text-center md:text-left rtl:text-right">
                                        <div>
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-sm text-[11px] font-bold uppercase tracking-wider mb-2 inline-block">
                                                {t('valid_badge')}
                                            </span>
                                            <h4 className="text-[24px] font-bold text-[#37352F]">{mockTickets[0].type}</h4>
                                            <p className="text-[14px] text-[#91918E]">{t('ticket_ref', { ref: mockTickets[0].id })}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E9E9E7]">
                                            <div>
                                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider">DATE</p>
                                                <p className="text-[13px] font-medium">{mockTickets[0].date}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider">LOCATION</p>
                                                <p className="text-[13px] font-medium">The Pearl, Qatar</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-center md:justify-start pt-4">
                                            <Button variant="outline" size="sm" className="h-9 gap-2 border-[#E9E9E7] text-[12px]">
                                                <Download size={14} />
                                                {t('download_pdf')}
                                            </Button>
                                            <Button variant="outline" size="sm" className="h-9 gap-2 border-[#E9E9E7] text-[12px]">
                                                <Ticket size={14} />
                                                {t('add_wallet')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Living Schedule Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-2">
                                <h3 className="text-[18px] font-semibold text-[#37352F]">{t('schedule_title')}</h3>
                                <div className="flex items-center gap-2 px-2 py-1 bg-[#F1F1EF] rounded-sm text-[12px] font-medium">
                                    <Calendar size={14} />
                                    {t('day_badge', { num: 1 })}
                                </div>
                            </div>
                            
                            <div className="divide-y divide-[#E9E9E7]">
                                {[
                                    { time: "10:00 AM", event: "Festival Grand Opening", loc: "Main Gateway", emoji: "🎊" },
                                    { time: "11:30 AM", event: "Dog Agility Prelims", loc: "Arena A", emoji: "🐕" },
                                    { time: "01:00 PM", event: "Feline Grooming Expo", loc: "Cat Dome", emoji: "🐱" },
                                    { time: "02:30 PM", event: "Pet Care Masterclass", loc: "Workshop Zone", emoji: "🎓" }
                                ].map((item, idx) => (
                                    <div key={idx} className="py-4 flex gap-6 hover:bg-[#F7F6F3] transition-colors px-2 rounded-sm cursor-pointer group">
                                        <div className="w-20 text-[13px] font-medium text-[#91918E] pt-1">{item.time}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[16px]">{item.emoji}</span>
                                                <p className="font-bold text-[15px] text-[#37352F]">{item.event}</p>
                                            </div>
                                            <p className="text-[13px] text-[#91918E] mt-1">{item.loc}</p>
                                        </div>
                                        <ChevronRight size={16} className="text-[#E9E9E7] group-hover:text-[#91918E] self-center" />
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full text-[#91918E] hover:text-[#37352F] text-[13px] h-10 border border-dashed border-[#E9E9E7] mt-4">
                                {t('full_schedule')}
                            </Button>
                        </div>
                    </div>

                    {/* Sidebar: Map & Help */}
                    <div className="xl:col-span-2 space-y-12">
                        {/* Map Block */}
                        <div className="space-y-4">
                            <h3 className="text-[14px] font-bold text-[#91918E] uppercase tracking-wider">{t('map_title')}</h3>
                            <div className="group relative border border-[#E9E9E7] rounded-sm overflow-hidden bg-[#FBFAFB] cursor-pointer">
                                <div className="aspect-square flex items-center justify-center p-8 opacity-20 group-hover:opacity-30 transition-opacity">
                                    <MapIcon size={80} className="text-[#37352F]" />
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-white/90 backdrop-blur-sm border-t border-[#E9E9E7]">
                                    <p className="font-bold text-[14px]">{t('map_locate')}</p>
                                    <p className="text-[12px] text-[#91918E]">{t('map_desc')}</p>
                                    <Button size="sm" className="w-full mt-3 bg-[#37352F] text-white hover:bg-black text-[12px] h-8">
                                        {t('map_cta')}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Help Callout */}
                        <div className="p-6 border border-[#E9E9E7] rounded-sm bg-[#FBFAFB] space-y-4">
                            <div className="flex items-center gap-2 text-[#37352F]">
                                <Info size={18} />
                                <span className="font-bold text-[14px]">{t('help_title')}</span>
                            </div>
                            <p className="text-[13px] text-[#666666] leading-relaxed">
                                {t('help_desc')}
                            </p>
                            <Button variant="outline" className="w-full border-[#E9E9E7] text-[12px] font-bold h-9">
                                {t('help_cta')}
                            </Button>
                        </div>

                        {/* Quick Settings Link */}
                        <div className="pt-6 border-t border-[#E9E9E7]">
                            <div className="flex items-center gap-3 p-3 hover:bg-[#F7F6F3] rounded-sm transition-colors cursor-pointer text-[#37352F]">
                                <div className="w-8 h-8 bg-[#37352F] rounded-sm flex items-center justify-center text-white">
                                    <span className="text-[12px]">AZ</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-bold truncate">Ahmed Zulfi</p>
                                    <p className="text-[11px] text-[#91918E]">{t('member_badge')}</p>
                                </div>
                                <ExternalLink size={14} className="text-[#E9E9E7]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Minimalist Chevron for sections
function ChevronRight({ size, className }: { size: number, className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
