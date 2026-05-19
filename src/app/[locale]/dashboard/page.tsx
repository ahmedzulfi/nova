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
                total: 150,
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
                        activeTab === 'receipt' ? 'Order Receipt' : t('sidebar.schedule')}
                </h1>

                {/* Simple Tab Switcher (Notion Style) */}
                <div className="flex items-center gap-1 mt-6 border-b border-[#E9E9E7]">
                    {['overview', 'receipt', 'schedule'].map((tab) => {
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
                        <div className="max-w-md mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            {/* 1. Official Digital Entrance Pass - Vertical Ticket Block */}
                            <div className="relative bg-[#FBFBFA] border border-[#E9E9E7] rounded-sm shadow-md overflow-visible">
                                {/* Left & Right Perforation Cutouts */}
                                <div className="absolute -left-3.5 top-[60%] w-7 h-7 bg-white border border-[#E9E9E7] rounded-full z-10" />
                                <div className="absolute -right-3.5 top-[60%] w-7 h-7 bg-white border border-[#E9E9E7] rounded-full z-10" />
                                
                                <div className="p-6 md:p-8 space-y-6">
                                    {/* Top Part: Ticket Header & Info */}
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t('badge') || "Official Entrance Pass"}</p>
                                                <h2 className="text-[22px] font-display font-bold text-[#37352F] tracking-tighter leading-tight">Nova Paw Festival 2026</h2>
                                                <p className="text-[11px] text-[#91918E]">Order ID: {data.orderId}</p>
                                            </div>
                                            <div className="w-12 h-12 bg-white border border-[#E9E9E7] rounded-sm flex items-center justify-center text-[#37352F] shrink-0">
                                                <Ticket size={24} strokeWidth={1.5} />
                                            </div>
                                        </div>

                                        {/* Main Details Table */}
                                        <div className="space-y-4 pt-4 border-t border-black/5">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[9px] font-bold text-[#91918E] uppercase tracking-widest">Main Attendee</p>
                                                    <p className="text-[14px] font-bold text-[#37352F] truncate">{data.fullName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-[#91918E] uppercase tracking-widest">Ticket Tier</p>
                                                    <span className="text-[13px] font-bold text-primary uppercase tracking-wider block">{getTierName(data.tier)}</span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[9px] font-bold text-[#91918E] uppercase tracking-widest">Guest Count</p>
                                                    <p className="text-[13px] font-bold text-[#37352F]">{data.adultQty} Adults · {data.kidsQty || 0} Kids</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-[#91918E] uppercase tracking-widest">Event Dates</p>
                                                    <p className="text-[13px] font-bold text-[#37352F]">Nov 15 - 16, 2026</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[9px] font-bold text-[#91918E] uppercase tracking-widest">Venue</p>
                                                    <p className="text-[12px] font-medium text-[#37352F]">pet park The Pearl Island</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-[#91918E] uppercase tracking-widest">Gate Status</p>
                                                    <div>
                                                        <span className="inline-block mt-0.5 px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded-sm text-[10px] font-bold uppercase tracking-widest">Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Perforation Line */}
                                    <div className="relative py-2">
                                        <div className="border-t border-dashed border-[#E9E9E7] w-full" />
                                    </div>

                                    {/* Bottom Part: Stub with QR Code & Barcode */}
                                    <div className="flex flex-col items-center justify-center space-y-4 pt-2">
                                        <div className="bg-white p-4 border border-[#E9E9E7] rounded-sm shadow-sm hover:scale-[1.02] transition-transform duration-500 cursor-zoom-in">
                                            <img src={QR_CODE_URL} alt="Scan to Verify" className="w-36 h-36" />
                                        </div>
                                        
                                        <div className="text-center space-y-1">
                                            <p className="text-[12px] font-bold text-[#37352F]">Unique Identification QR</p>
                                            <p className="text-[10px] text-[#91918E]">Present at entrance gate for validation.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="flex flex-col gap-3">
                                <Button className="w-full h-12 bg-[#37352F] hover:bg-black text-white text-[13px] font-bold uppercase tracking-[0.2em] rounded-sm gap-3 shadow-md transition-all active:scale-[0.98]">
                                    <Download size={16} />
                                    Download Digital Pass
                                </Button>
                                <Button variant="ghost" className="w-full h-10 text-[#91918E] hover:text-[#37352F] text-[11px] font-bold uppercase tracking-widest" onClick={() => window.print()}>
                                    Print Physical Copy
                                </Button>
                            </div>

                            {/* 2. Competition & Event Status - Single Column Integration */}
                            {isPetOwner && data.competitionEntry && (
                                <div className="space-y-6">
                                    <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-[0.2em] px-2 border-l-2 border-primary">Event Registration</h3>
                                    <div className="p-8 bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm space-y-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-white border border-[#E9E9E7] rounded-sm flex items-center justify-center text-[28px] shadow-sm">
                                                🏅
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em]">Registered Activity</p>
                                                <p className="text-[20px] font-bold text-[#37352F] tracking-tight">{data.competitionEntry}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-5 bg-white border border-[#E9E9E7] rounded-sm">
                                            <Clock size={18} className="text-[#37352F] opacity-40" />
                                            <div className="space-y-0.5">
                                                <p className="text-[13px] font-bold text-[#37352F] leading-none">Application Under Review</p>
                                                <p className="text-[11px] text-[#91918E] font-medium italic">Our panel is currently verifying your pet's credentials. Status will update shortly.</p>
                                            </div>
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
                                                            pet park The Pearl, Porto Arabia<br />
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
                                                        <span className="text-[14px] font-bold text-[#37352F]">QAR {data.tier === 'adult' ? 45 : 90}.00</span>
                                                    </div>
                                                    {data.adultQty > 1 && (
                                                        <div className="flex justify-between items-center py-4">
                                                            <div className="space-y-1">
                                                                <span className="text-[14px] text-[#666666]">Adult Companion (x{data.adultQty - 1})</span>
                                                                <p className="text-[11px] text-[#91918E]">Standard Secondary Access</p>
                                                            </div>
                                                            <span className="text-[14px] font-bold text-[#37352F]">QAR {(data.adultQty - 1) * 45}.00</span>
                                                        </div>
                                                    )}
                                                    {data.petQty > 1 && (
                                                        <div className="flex justify-between items-center py-4">
                                                            <div className="space-y-1">
                                                                <span className="text-[14px] text-[#666666]">Additional Pet (x{data.petQty - 1})</span>
                                                                <p className="text-[11px] text-[#91918E]">Extra Pet Admission</p>
                                                            </div>
                                                            <span className="text-[14px] font-bold text-[#37352F]">QAR {(data.petQty - 1) * 45}.00</span>
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
                                            {isPetOwner && data.competitionEntry && (
                                                <div className="space-y-6">
                                                    <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-[0.2em] border-l-2 border-yellow-500 pl-3">Competition Summary</h3>
                                                    <div className="p-6 bg-yellow-50/50 border border-yellow-100 rounded-sm space-y-4">
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
                                                    </div>
                                                </div>
                                            )}
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
                                            <p className="text-[11px] font-medium text-[#91918E]">Nova Events Qatar · pet park The Pearl · Parcel 18 · Doha, QA</p>
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
