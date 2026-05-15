"use client";

import React, { useEffect, useState, Suspense } from 'react';
import {
    ArrowRight,
    Dog,
    Cat,
    User,
    Ticket,
    Trophy,
    Calendar,
    ShieldCheck,
    Clock,
    Loader2,
    ChevronRight,
    Download,
    Info,
    ExternalLink,
    PawPrint,
    Mail,
    Phone
} from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface RegistrationData {
    fullName: string;
    email: string;
    phone: string;
    tier: string;
    adultQty: number;
    kidsQty: number;
    petQty: number;
    petName: string;
    total: number;
    orderId: string;
    competitionEntry?: string;
    entryDate?: string;
}

const QR_CODE_URL = "https://public-api.qr-code-generator.com/v1/create/extended?image_format=PNG&image_width=300&qr_code_text=https%3A%2F%2Fvalidmvps.vercel.app%2F&foreground_color=%23000000&background_color=%23FFFFFF&frame_name=no-frame";

type TabType = 'overview' | 'competitions' | 'receipt' | 'schedule' | 'settings';

function DashboardContent() {
    const router = useRouter();
    const t = useTranslations('Dashboard');
    const tTickets = useTranslations('Tickets');
    const tSchedule = useTranslations('Schedule');
    const locale = useLocale();

    const [data, setData] = useState<RegistrationData | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [activeDay, setActiveDay] = useState(0);

    useEffect(() => {
        const savedData = localStorage.getItem('nova_registration');
        if (savedData) {
            setData(JSON.parse(savedData));
        } else {
            setData({
                fullName: "Ahmed Zulfi",
                email: "ahmed@nova.com",
                phone: "+974 5555 1234",
                tier: "dog-owner",
                adultQty: 2,
                kidsQty: 1,
                petQty: 1,
                petName: "Maximus",
                total: 225,
                orderId: "NP-2026-X8Y1",
                competitionEntry: "Dog Fashion Show",
                entryDate: new Date().toISOString()
            });
        }
    }, []);

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-[64px] mb-8">🎟️</div>
                <h1 className="text-[32px] font-bold text-[#37352F] tracking-tight mb-4">{t('no_session.title')}</h1>
                <p className="text-[16px] text-[#91918E] max-w-sm mb-8">{t('no_session.desc')}</p>
                <Link href="/tickets">
                    <Button className="bg-[#37352F] hover:bg-black text-white px-8 h-12 font-bold rounded-sm">
                        {t('no_session.cta')}
                    </Button>
                </Link>
            </div>
        );
    }

    const isPetOwner = data.tier === 'dog-owner' || data.tier === 'cat-owner';
    const getTierName = (tierId: string) => {
        if (tierId === 'dog-owner') return tTickets('tiers.dog.name');
        if (tierId === 'cat-owner') return tTickets('tiers.cat.name');
        return tTickets('tiers.adult.name');
    };

    const scheduleDays = [
        { day: tSchedule('days.day1.label'), date: tSchedule('days.day1.date'), eventsKey: 'day1' },
        { day: tSchedule('days.day2.label'), date: tSchedule('days.day2.date'), eventsKey: 'day2' }
    ];

    return (
        <div className="animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-12">
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">
                    {activeTab === 'overview' ? `Welcome, ${data.fullName.split(' ')[0]}` :
                            activeTab === 'receipt' ? 'Order Receipt' :
                                activeTab === 'schedule' ? t('sidebar.schedule') : t('sidebar.settings')}
                </h1>

                {/* Simple Tab Switcher (Notion Style) */}
                <div className="flex items-center gap-1 mt-6 border-b border-[#E9E9E7]">
                    {['overview', 'receipt', 'schedule', 'settings'].map((tab) => {
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as TabType)}
                                className={`px-4 py-2 text-[14px] font-medium transition-colors border-b-2 -mb-[1px] ${activeTab === tab ? 'border-[#37352F] text-[#37352F]' : 'border-transparent text-[#91918E] hover:text-[#37352F]'
                                    }`}
                            >
                                {tab === 'receipt' ? 'Receipt' : t(`sidebar.${tab}`)}
                            </button>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* ─── TAB: Overview ─────────────────────────────────────────────── */}
                    {activeTab === 'overview' && (
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Elite Digital Pass Block - Notion Style */}
                                    <div className="p-10 bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm space-y-10 relative overflow-hidden group">
                                        <div className="flex items-center justify-between relative z-10">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] leading-none">Official Entrance Pass</p>
                                                <h3 className="text-[32px] font-bold text-black tracking-tighter leading-none">{data.orderId}</h3>
                                            </div>
                                            <div className="w-12 h-12 bg-black rounded-sm flex items-center justify-center text-white">
                                                <Ticket size={24} />
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                                            <div className="bg-white p-4 border border-[#E9E9E7] rounded-sm shadow-sm transition-transform group-hover:scale-[1.02] duration-500">
                                                <img src={QR_CODE_URL} alt="QR" className="w-28 h-28" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-12 gap-y-6 flex-1">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">Attendee</p>
                                                    <p className="font-bold text-[16px] text-black leading-tight">{data.fullName}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">Tier</p>
                                                    <p className="font-bold text-[16px] text-primary leading-tight uppercase">{getTierName(data.tier)}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">Adults</p>
                                                    <p className="font-bold text-[16px] text-black leading-tight">{data.adultQty}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">Kids</p>
                                                    <p className="font-bold text-[16px] text-black leading-tight">{data.kidsQty || 0}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-black/5">
                                            <Button className="w-full bg-white hover:bg-black/5 text-black border border-[#E9E9E7] rounded-sm h-12 text-[13px] font-bold uppercase tracking-[0.2em] gap-2 transition-all active:scale-[0.98]">
                                                <Download size={16} className="text-black/40" />
                                                {t('overview.download')}
                                            </Button>
                                        </div>
                                    </div>

                                {/* Festival Status / Info */}
                                <div className="p-8 border border-[#E9E9E7] rounded-sm space-y-8 bg-white shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-black/40 uppercase tracking-[0.2em] leading-none">Festival Status</p>
                                            <h3 className="text-[20px] font-bold text-black tracking-tight">Active Access</h3>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-[11px] font-bold uppercase tracking-wider">
                                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
                                            Valid
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-black/[0.03] pb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-[#F7F6F3] rounded-sm flex items-center justify-center text-black/40">
                                                    <Calendar size={16} />
                                                </div>
                                                <span className="text-[14px] font-medium text-black/60">Event Dates</span>
                                            </div>
                                            <span className="text-[14px] font-bold text-black">Nov 15-16, 2026</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-black/[0.03] pb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-[#F7F6F3] rounded-sm flex items-center justify-center text-black/40">
                                                    <PawPrint size={16} />
                                                </div>
                                                <span className="text-[14px] font-medium text-black/60">Location</span>
                                            </div>
                                            <span className="text-[14px] font-bold text-black">The Pearl, Qatar</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-[#F7F6F3] rounded-sm flex items-center justify-center text-black/40">
                                                    <Clock size={16} />
                                                </div>
                                                <span className="text-[14px] font-medium text-black/60">Gate Open</span>
                                            </div>
                                            <span className="text-[14px] font-bold text-black">09:00 AM AST</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => setActiveTab('receipt')}
                                        variant="ghost"
                                        className="w-full text-[#37352F] hover:bg-[#F7F6F3] h-12 text-[13px] font-bold uppercase tracking-[0.1em] gap-2 mt-2"
                                    >
                                        <ExternalLink size={16} />
                                        {t('overview.view_receipt') || 'View Receipt'}
                                    </Button>
                                </div>
                            </div>

                            {/* Exclusive Invitations (Tier-Based) */}
                            {isPetOwner && !data.competitionEntry && (
                                <div className="bg-black text-white p-8 rounded-sm relative overflow-hidden group shadow-xl">
                                    <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                                        <Trophy size={160} className="rotate-12 translate-x-12 -translate-y-8" />
                                    </div>
                                    <div className="relative z-10 max-w-2xl space-y-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-black rounded-sm text-[10px] font-bold uppercase tracking-widest">
                                            Exclusive Invitation
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-[32px] md:text-[40px] text-white font-bold tracking-tighter leading-tight italic">
                                                {data.tier === 'dog-owner' ? "Is Maximus the next Dog Fashion Star?" : "Showcase the elegance of your feline."}
                                            </h3>
                                            <p className="text-[16px] text-white/60 leading-relaxed">
                                                Based on your <span className="text-primary font-bold">{getTierName(data.tier)}</span> pass,
                                                you are eligible for elite competition entry. Register now to showcase your pet to the world.
                                            </p>
                                            <Button 
                                                onClick={() => router.push('/dashboard/register-pet')}
                                                className="w-full h-11 bg-[#37352F] hover:bg-black text-white rounded-sm text-[12px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
                                            >
                                                Register Now
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {data.competitionEntry && (
                                <div className="p-8 bg-[#FBFAFB] border border-[#E9E9E7] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 bg-white border border-[#E9E9E7] rounded-sm flex items-center justify-center text-[32px] shadow-sm">
                                            🏅
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[11px] font-bold text-black/30 uppercase tracking-[0.2em]">Registered Event</p>
                                            <p className="font-bold text-[24px] text-black tracking-tight">{data.competitionEntry}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-5 py-3 bg-yellow-50 border border-yellow-100 text-yellow-800 rounded-sm">
                                        <Clock size={18} />
                                        <div className="space-y-0.5">
                                            <p className="text-[13px] font-bold leading-none">{t('overview.review_pending')}</p>
                                            <p className="text-[11px] opacity-60 font-medium">Expected update in 24-48h</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}


                    {/* ─── TAB: Receipt ──────────────────────────────────────────────── */}
                    {activeTab === 'receipt' && (
                        <div className="max-w-4xl mx-auto space-y-8 pb-12">
                            <div className="bg-white border border-[#E9E9E7] rounded-sm shadow-sm overflow-hidden animate-in fade-in zoom-in-[0.99] duration-500">
                                {/* Notion Header Style - Official Document */}
                                <div className="p-12 md:p-16 space-y-16">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-black/5 pb-12">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm flex items-center justify-center text-[40px] shadow-sm">
                                                📜
                                            </div>
                                            <div className="space-y-1">
                                                <h2 className="text-[32px] font-bold text-[#37352F] tracking-tighter">Festival Pass & Receipt</h2>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[12px] text-[#91918E] font-medium uppercase tracking-widest">{data.orderId}</span>
                                                    <span className="w-1 h-1 bg-[#E9E9E7] rounded-full" />
                                                    <span className="text-[12px] text-green-600 font-bold uppercase tracking-widest">Verified</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:text-right space-y-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em] mb-1">Issue Date</p>
                                                <p className="text-[15px] font-bold text-[#37352F]">
                                                    {new Date(data.entryDate || '').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em] mb-1">Status</p>
                                                <p className="text-[13px] font-bold text-black bg-[#F7F6F3] px-3 py-1 rounded-sm inline-block">PAID · SECURED</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Multi-Section Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                        {/* Attendee & Billing Column */}
                                        <div className="space-y-12">
                                            <div className="space-y-6">
                                                <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-[0.2em] border-l-2 border-primary pl-3">Attendee Profile</h3>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-black/30 uppercase">Legal Name</p>
                                                        <p className="text-[14px] font-bold text-[#37352F]">{data.fullName}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-black/30 uppercase">Nationality</p>
                                                        <p className="text-[14px] font-bold text-[#37352F]">Qatari / Resident</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-black/30 uppercase">Contact</p>
                                                        <p className="text-[13px] font-medium text-[#666666]">{data.email}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-black/30 uppercase">Festival Zone</p>
                                                        <p className="text-[14px] font-bold text-primary">Elite VIP Access</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-[0.2em] border-l-2 border-black/20 pl-3">Billing Details</h3>
                                                <div className="p-6 bg-[#F7F6F3] rounded-sm space-y-4">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-black/30 uppercase">Billing Address</p>
                                                        <p className="text-[13px] text-[#37352F] font-medium leading-relaxed">
                                                            The Pearl, Porto Arabia<br />
                                                            Parcel 12, Tower 4<br />
                                                            Doha, Qatar
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-4 border-t border-black/5">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold text-black/30 uppercase">Payment Method</p>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-5 bg-white border border-[#E9E9E7] rounded-sm flex items-center justify-center text-[8px] font-bold">VISA</div>
                                                                <p className="text-[13px] font-bold text-[#37352F]">•••• 4242</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right space-y-1">
                                                            <p className="text-[10px] font-bold text-black/30 uppercase">Merchant ID</p>
                                                            <p className="text-[13px] font-mono text-[#37352F]">NV-8829-X</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ticket breakdown & Competition Column */}
                                        <div className="space-y-12">
                                            <div className="space-y-6">
                                                <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-[0.2em] border-l-2 border-black/20 pl-3">Ticket Inventory</h3>
                                                <div className="space-y-4 divide-y divide-black/5">
                                                    <div className="flex justify-between items-center py-2">
                                                        <div className="space-y-1">
                                                            <span className="text-[14px] font-bold text-[#37352F]">{getTierName(data.tier)}</span>
                                                            <p className="text-[11px] text-[#91918E]">Primary Admission Pass</p>
                                                        </div>
                                                        <span className="text-[14px] font-bold text-[#37352F]">QAR 50.00</span>
                                                    </div>
                                                    {data.adultQty > 0 && (
                                                        <div className="flex justify-between items-center py-4">
                                                            <div className="space-y-1">
                                                                <span className="text-[14px] text-[#666666]">Adult Companion (x{data.adultQty})</span>
                                                                <p className="text-[11px] text-[#91918E]">Standard Secondary Access</p>
                                                            </div>
                                                            <span className="text-[14px] font-bold text-[#37352F]">QAR {data.adultQty * 25}.00</span>
                                                        </div>
                                                    )}
                                                    {data.kidsQty > 0 && (
                                                        <div className="flex justify-between items-center py-4">
                                                            <div className="space-y-1">
                                                                <span className="text-[14px] text-[#666666]">Kids Admission (x{data.kidsQty})</span>
                                                                <p className="text-[11px] text-[#91918E]">Junior Pass (U-12)</p>
                                                            </div>
                                                            <span className="text-[14px] font-bold text-[#37352F]">QAR {data.kidsQty * 15}.00</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between items-center pt-8">
                                                        <span className="text-[12px] font-bold text-[#37352F] uppercase tracking-[0.2em]">Total Amount</span>
                                                        <div className="text-right">
                                                            <span className="text-[32px] font-bold text-[#37352F] tracking-tighter leading-none">QAR {data.total.toFixed(2)}</span>
                                                            <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-1">Authorized · 0.0s</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Competition Registration Block */}
                                            <div className="space-y-6">
                                                <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-[0.2em] border-l-2 border-yellow-500 pl-3">Competition Summary</h3>
                                                <div className="p-6 bg-yellow-50/50 border border-yellow-100 rounded-sm space-y-4">
                                                    {data.competitionEntry ? (
                                                        <>
                                                            <div className="flex justify-between items-start">
                                                                <div className="space-y-1">
                                                                    <p className="text-[14px] font-bold text-yellow-900">{data.competitionEntry}</p>
                                                                    <p className="text-[12px] text-yellow-800/60 font-medium italic">Confirmed Application</p>
                                                                </div>
                                                                <Trophy size={20} className="text-yellow-600" />
                                                            </div>
                                                            <div className="pt-4 border-t border-yellow-200/50 flex items-center justify-between">
                                                                <span className="text-[11px] font-bold text-yellow-800/60 uppercase tracking-widest">Entry ID</span>
                                                                <span className="text-[11px] font-mono font-bold text-yellow-900">REG-COMP-{data.orderId.split('-')[2]}</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="text-center py-4 space-y-3">
                                                            <p className="text-[13px] font-medium text-yellow-800/60">No active competition entries found for this order.</p>
                                                            <Button 
                                                                onClick={() => router.push('/dashboard/register-pet')}
                                                                className="h-9 bg-yellow-600 hover:bg-yellow-700 text-white text-[11px] font-bold uppercase tracking-widest px-6"
                                                            >
                                                                Register Now
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer / Legal / Actions */}
                                    <div className="pt-16 border-t border-black/5 space-y-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-4 p-6 border border-[#E9E9E7] rounded-sm">
                                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-[0.2em] flex items-center gap-2">
                                                    <Info size={14} />
                                                    Compliance & Security
                                                </p>
                                                <p className="text-[12px] text-[#666666] leading-relaxed">
                                                    This document serves as an official proof of purchase for Nova Paw Festival 2026. 
                                                    Digital signatures were captured for all safety agreements at the time of transaction.
                                                    Verified by Nova Gatekeeper Security Systems.
                                                </p>
                                            </div>
                                            <div className="flex flex-col justify-end gap-4">
                                                <Button className="w-full h-14 bg-[#37352F] hover:bg-black text-white text-[14px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-black/10 transition-all active:scale-[0.98] gap-3">
                                                    <Download size={18} />
                                                    Download Official PDF
                                                </Button>
                                                <div className="flex gap-4">
                                                    <Button variant="outline" className="flex-1 h-12 border-[#E9E9E7] text-[12px] font-bold uppercase tracking-widest gap-2" onClick={() => window.print()}>
                                                        <ExternalLink size={16} />
                                                        Print Pass
                                                    </Button>
                                                    <Button variant="ghost" className="flex-1 h-12 text-[#91918E] hover:text-[#37352F] text-[12px] font-bold uppercase tracking-widest">
                                                        Need Help?
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center space-y-1 pt-8 border-t border-black/[0.03]">
                                            <p className="text-[11px] font-medium text-[#91918E]">Nova Events Qatar · The Pearl · Parcel 18 · Doha, QA</p>
                                            <p className="text-[10px] text-black/20 font-bold uppercase tracking-[0.3em]">Nova Paw 2026</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PDF Print Styles */}
                            <style jsx global>{`
                                @media print {
                                    body * { visibility: hidden; }
                                    .max-w-4xl, .max-w-4xl * { visibility: visible; }
                                    .max-w-4xl { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
                                    button { display: none !important; }
                                }
                            `}</style>
                        </div>
                    )}

                    {/* ─── TAB: Health ───────────────────────────────────────────────── */}
                    {activeTab === 'health' && (
                        <div className="p-12 border border-[#E9E9E7] rounded-sm bg-[#FBFAFB] text-center space-y-6">
                            <div className="text-[64px]">🏥</div>
                            <h2 className="text-[28px] font-bold text-[#37352F]">{t('health.title')}</h2>
                            <p className="text-[16px] text-[#666666] max-w-md mx-auto">{t('health.desc')}</p>
                            <Button className="bg-[#37352F] text-white hover:bg-black px-12 h-12 font-bold rounded-sm">
                                {t('health.cta')}
                            </Button>
                        </div>
                    )}

                    {/* ─── TAB: Schedule ─────────────────────────────────────────────── */}
                    {activeTab === 'schedule' && (
                        <div className="space-y-8">
                            <div className="flex gap-2 p-1 bg-[#F1F1EF] rounded-sm w-fit">
                                {scheduleDays.map((d, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveDay(index)}
                                        className={`px-4 py-1.5 rounded-sm text-[13px] font-medium transition-all ${activeDay === index ? 'bg-white shadow-sm text-[#37352F]' : 'text-[#91918E] hover:text-[#37352F]'
                                            }`}
                                    >
                                        {d.day}
                                    </button>
                                ))}
                            </div>

                            <div className="border border-[#E9E9E7] rounded-sm divide-y divide-[#E9E9E7]">
                                {(tSchedule.raw(`days.${scheduleDays[activeDay].eventsKey}.events`) as any[]).map((event, index) => (
                                    <div key={index} className="p-6 flex gap-8 hover:bg-[#F7F6F3] transition-colors group">
                                        <div className="w-24 text-[14px] font-medium text-[#91918E] pt-1">{event.time}</div>
                                        <div className="flex-1 space-y-1">
                                            <h4 className="text-[16px] font-bold text-[#37352F] group-hover:text-black transition-colors">{event.title}</h4>
                                            <p className="text-[14px] text-[#666666] leading-relaxed">{event.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ─── TAB: Account Settings ─────────────────────────────────────────────── */}
                    {activeTab === 'settings' && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {/* Profile Header Block */}
                            <div className="flex flex-col md:flex-row gap-10 items-start md:items-center p-10 bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm relative overflow-hidden">
                                <div className="relative group">
                                    <div className="w-24 h-24 bg-white border border-[#E9E9E7] rounded-sm flex items-center justify-center text-[40px] shadow-sm">
                                        👤
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-[#E9E9E7] rounded-sm flex items-center justify-center text-[#37352F] shadow-sm hover:bg-[#F7F6F3] transition-all">
                                        <Clock size={14} className="opacity-40" />
                                    </button>
                                </div>
                                <div className="space-y-2 flex-1">
                                    <h2 className="text-[28px] font-bold text-[#37352F] tracking-tight">{data.fullName}</h2>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 text-[12px] font-medium text-[#91918E]">
                                            <Mail size={14} />
                                            {data.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-[12px] font-medium text-[#91918E]">
                                            <Phone size={14} />
                                            {data.phone}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 text-right">
                                    <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-[10px] font-bold uppercase tracking-widest">Active Member</span>
                                    <p className="text-[11px] text-[#91918E] font-medium">Joined Oct 2023</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Pass Details */}
                                <div className="md:col-span-2 space-y-8">
                                    <div className="space-y-6">
                                        <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-[0.2em] border-b border-black/5 pb-4">Digital Pass Configuration</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em]">Membership Tier</p>
                                                <p className="text-[16px] font-bold text-primary uppercase">{getTierName(data.tier)}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em]">Registered Pet</p>
                                                <p className="text-[16px] font-bold text-[#37352F]">{data.petName || '—'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em]">Additional Adults</p>
                                                <p className="text-[16px] font-bold text-[#37352F]">{data.adultQty}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em]">Additional Kids</p>
                                                <p className="text-[16px] font-bold text-[#37352F]">{data.kidsQty || 0}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Compliance Block */}
                                    <div className="p-8 border border-[#E9E9E7] rounded-sm space-y-6 bg-[#FBFAFB]">
                                        <h3 className="text-[14px] font-bold text-[#37352F] flex items-center gap-2">
                                            <ShieldCheck size={18} className="text-green-600" />
                                            Safety & Legal Compliance
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-3 bg-white border border-[#E9E9E7] rounded-sm">
                                                <span className="text-[13px] font-medium text-[#37352F]">Nova Paw Safety Agreement</span>
                                                <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest">Signed</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-white border border-[#E9E9E7] rounded-sm">
                                                <span className="text-[13px] font-medium text-[#37352F]">Liability Waiver 2026</span>
                                                <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest">Signed</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar Stats */}
                                <div className="space-y-8">
                                    <div className="p-6 bg-white border border-[#E9E9E7] rounded-sm space-y-6">
                                        <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-[0.2em]">Security Overview</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-[#91918E] uppercase mb-1">Last Active</p>
                                                <p className="text-[13px] font-bold text-[#37352F]">Today, 10:45 AM</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-[#91918E] uppercase mb-1">Trusted Device</p>
                                                <p className="text-[13px] font-medium text-[#666666]">iPhone 15 Pro · Doha, QA</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-[#91918E] uppercase mb-1">Account ID</p>
                                                <p className="text-[13px] font-mono text-[#37352F]">{data.orderId.replace('NP-', 'USR-')}</p>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-black/5">
                                            <Button variant="ghost" className="w-full text-[#37352F] hover:bg-[#F7F6F3] text-[12px] font-bold uppercase tracking-widest h-10">
                                                Manage Security
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white border border-[#E9E9E7] rounded-sm space-y-4">
                                        <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-[0.2em]">Preferences</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[13px] text-[#666666]">Email Notifications</span>
                                            <div className="w-8 h-4 bg-green-500 rounded-full relative">
                                                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[13px] text-[#666666]">SMS Alerts</span>
                                            <div className="w-8 h-4 bg-[#E9E9E7] rounded-full relative">
                                                <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function DashboardPage() {
    const t = useTranslations('Dashboard');
    return (
        <Suspense fallback={<div className="flex items-center justify-center py-20 text-[#91918E] text-[14px] font-medium tracking-wider uppercase animate-pulse">{t('loading')}</div>}>
            <DashboardContent />
        </Suspense>
    );
}
