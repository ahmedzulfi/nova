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
    const baseTicketPrice = data.tier === 'adult' ? 45 : 90;
    const companionPrice = data.adultQty > 1 ? (data.adultQty - 1) * 45 : 0;
    const extraPetPrice = data.petQty > 1 ? (data.petQty - 1) * 45 : 0;
    const kidsPrice = data.kidsQty > 0 ? data.kidsQty * 45 : 0;
    const competitionPrice = (isPetOwner && data.competitionEntry) ? 50 : 0;
    const computedTotal = baseTicketPrice + companionPrice + extraPetPrice + kidsPrice + competitionPrice;

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
                        <div className="max-w-3xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            {/* 1. Official Digital Entrance Pass - Horizontal Ticket Block */}
                            <div className="relative w-full bg-[#FBFBFA] border border-[#E9E9E7] rounded-sm shadow-xs overflow-visible flex flex-col md:flex-row">
                                {/* Desktop Perforation Cutouts */}
                                <div className="absolute top-0 left-[70%] -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white border border-[#E9E9E7] rounded-full z-20 hidden md:block" />
                                <div className="absolute bottom-0 left-[70%] -translate-x-1/2 translate-y-1/2 w-7 h-7 bg-white border border-[#E9E9E7] rounded-full z-20 hidden md:block" />

                                {/* Mobile Perforation Cutouts */}
                                <div className="absolute -left-3.5 top-[65%] -translate-y-1/2 w-7 h-7 bg-white border border-[#E9E9E7] rounded-full z-20 md:hidden" />
                                <div className="absolute -right-3.5 top-[65%] -translate-y-1/2 w-7 h-7 bg-white border border-[#E9E9E7] rounded-full z-20 md:hidden" />

                                {/* Left Pane: Ticket Information (70% width on desktop) */}
                                <div className="w-full md:w-[70%] p-6 md:p-8 flex flex-col justify-between space-y-6 md:border-r md:border-dashed md:border-[#E9E9E7]">
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
                                </div>

                                {/* Divider for Mobile */}
                                <div className="border-t border-dashed border-[#E9E9E7] w-full md:hidden my-2" />

                                {/* Right Pane: Stub with QR Code (30% width on desktop) */}
                                <div className="w-full md:w-[30%] p-6 md:p-8 flex flex-col items-center justify-center space-y-4">
                                    <div className="bg-white p-3 border border-[#E9E9E7] rounded-sm shadow-sm hover:scale-[1.02] transition-transform duration-500 cursor-zoom-in">
                                        <img src={QR_CODE_URL} alt="Scan to Verify" className="w-32 h-32" />
                                    </div>
                                    <div className="text-center space-y-1">
                                        <p className="text-[11px] font-bold text-[#37352F]">Unique QR Code</p>
                                        <p className="text-[9px] text-[#91918E] leading-normal max-w-[120px] mx-auto">Present at entrance gate for validation.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button className="flex-1 h-12 bg-[#37352F] hover:bg-black text-white text-[13px] font-bold uppercase tracking-[0.2em] rounded-sm gap-3 shadow-xs transition-all active:scale-[0.98]">
                                    <Download size={16} />
                                    Download Digital Pass
                                </Button>
                                <Button variant="ghost" className="flex-1 h-12 text-[#91918E] hover:text-[#37352F] text-[11px] font-bold uppercase tracking-widest border border-[#E9E9E7] rounded-sm bg-white" onClick={() => window.print()}>
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
                    {activeTab === 'receipt' && (
                        <div className="max-w-3xl mx-auto space-y-8 pb-12">
                            {/* Notion Invoice Container */}
                            <div className="bg-[#FBFBFA] border border-[#E9E9E7] rounded-sm shadow-sm overflow-hidden animate-in fade-in zoom-in-[0.99] duration-500">
                                {/* Top Banner/Decorative Bar */}
                                <div className="h-1.5 bg-[#37352F] w-full" />

                                <div className="p-8 md:p-12 space-y-10">
                                    {/* Invoice Header */}
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-black/5 pb-8">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[20px]">🧾</span>
                                                <h2 className="text-[24px] font-bold text-[#37352F] tracking-tight">Official Invoice & Receipt</h2>
                                            </div>
                                            <p className="text-[12px] text-[#666666] leading-relaxed">
                                                Nova Events Qatar · pet park The Pearl · Doha, Qatar
                                            </p>
                                        </div>
                                        <div className="md:text-right space-y-2">
                                            <div className="inline-block px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                                                Paid & Verified
                                            </div>
                                            <p className="text-[11px] text-[#91918E] font-mono">INVOICE: #{data.orderId.split('-')[2] || data.orderId}</p>
                                            <p className="text-[11px] text-[#91918E]">Date: {new Date(data.entryDate || '').toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    {/* Billing & Payment Meta Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-bold text-[#91918E] uppercase tracking-wider">Billed To</p>
                                            <div className="space-y-0.5">
                                                <p className="text-[13px] font-bold text-[#37352F]">{data.fullName}</p>
                                                <p className="text-[12px] text-[#666666]">{data.email}</p>
                                                <p className="text-[11px] text-[#91918E]">Doha, Qatar</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:text-right">
                                            <p className="text-[9px] font-bold text-[#91918E] uppercase tracking-wider">Payment Method</p>
                                            <div className="space-y-0.5 md:flex md:flex-col md:items-end">
                                                <p className="text-[13px] font-bold text-[#37352F]">VISA •••• 4242</p>
                                                <p className="text-[12px] text-[#666666]">Authorized Transaction</p>
                                                <p className="text-[11px] text-[#91918E] font-mono">Auth Code: #8829-X</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Itemized Table */}
                                    <div className="space-y-4">
                                        <p className="text-[9px] font-bold text-[#91918E] uppercase tracking-wider">Itemized Costs</p>
                                        <div className="border border-[#E9E9E7] rounded-sm overflow-hidden bg-white">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-[#E9E9E7] text-[10px] font-bold text-[#91918E] uppercase tracking-wider bg-[#F7F6F3]">
                                                        <th className="p-4">Description</th>
                                                        <th className="p-4 text-center w-20">Qty</th>
                                                        <th className="p-4 text-right w-32">Unit Price</th>
                                                        <th className="p-4 text-right w-32">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#E9E9E7] text-[13px] text-[#37352F]">
                                                    <tr className="hover:bg-[#FAF9F5] transition-colors">
                                                        <td className="p-4 font-medium">
                                                            {getTierName(data.tier)} Pass
                                                            <span className="block text-[10px] text-[#91918E] mt-0.5">Primary Admission Access</span>
                                                        </td>
                                                        <td className="p-4 text-center">1</td>
                                                        <td className="p-4 text-right">QAR {data.tier === 'adult' ? 45 : 90}.00</td>
                                                        <td className="p-4 text-right">QAR {data.tier === 'adult' ? 45 : 90}.00</td>
                                                    </tr>
                                                    {data.adultQty > 1 && (
                                                        <tr className="hover:bg-[#FAF9F5] transition-colors">
                                                            <td className="p-4">
                                                                Adult Companion
                                                                <span className="block text-[10px] text-[#91918E] mt-0.5">Secondary Admission Access</span>
                                                            </td>
                                                            <td className="p-4 text-center">{data.adultQty - 1}</td>
                                                            <td className="p-4 text-right">QAR 45.00</td>
                                                            <td className="p-4 text-right">QAR {(data.adultQty - 1) * 45}.00</td>
                                                        </tr>
                                                    )}
                                                    {data.petQty > 1 && (
                                                        <tr className="hover:bg-[#FAF9F5] transition-colors">
                                                            <td className="p-4">
                                                                Additional Pet Admission
                                                                <span className="block text-[10px] text-[#91918E] mt-0.5">Extra Pet Access Badge</span>
                                                            </td>
                                                            <td className="p-4 text-center">{data.petQty - 1}</td>
                                                            <td className="p-4 text-right">QAR 45.00</td>
                                                            <td className="p-4 text-right">QAR {(data.petQty - 1) * 45}.00</td>
                                                        </tr>
                                                    )}
                                                    {data.kidsQty > 0 && (
                                                        <tr className="hover:bg-[#FAF9F5] transition-colors">
                                                            <td className="p-4">
                                                                Kids Admission
                                                                <span className="block text-[10px] text-[#91918E] mt-0.5">Junior Pass (U-12)</span>
                                                            </td>
                                                            <td className="p-4 text-center">{data.kidsQty}</td>
                                                            <td className="p-4 text-right">QAR 45.00</td>
                                                            <td className="p-4 text-right">QAR {data.kidsQty * 45}.00</td>
                                                        </tr>
                                                    )}
                                                    {isPetOwner && data.competitionEntry && (
                                                        <tr className="hover:bg-[#FAF9F5] transition-colors bg-amber-50/20">
                                                            <td className="p-4 font-medium">
                                                                Competition Registration
                                                                <span className="block text-[10px] text-amber-800 mt-0.5">Event: {data.competitionEntry}</span>
                                                            </td>
                                                            <td className="p-4 text-center">1</td>
                                                            <td className="p-4 text-right">QAR 50.00</td>
                                                            <td className="p-4 text-right">QAR 50.00</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Subtotal / Grand Total Section */}
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-6 border-t border-black/5">
                                        {/* Security & Verification Stamp */}
                                        <div className="flex items-center gap-4 p-4 border border-[#E9E9E7] rounded-sm bg-white shadow-sm">
                                            <div className="w-12 h-12 rounded-full border-2 border-green-600/40 flex items-center justify-center text-green-600 text-[14px] font-bold transform -rotate-12 select-none">
                                                PAID
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[11px] font-bold text-[#37352F]">Transaction Verified</p>
                                                <p className="text-[10px] text-[#91918E]">Secured by Nova Gatekeeper</p>
                                            </div>
                                        </div>

                                        {/* Total Summary Block */}
                                        <div className="w-full md:w-64 space-y-2 text-[13px]">
                                            <div className="flex justify-between text-[#666666]">
                                                <span>Subtotal</span>
                                                <span>QAR {computedTotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-[#666666]">
                                                <span>VAT / Processing (0%)</span>
                                                <span>QAR 0.00</span>
                                            </div>
                                            <div className="flex justify-between pt-2 border-t border-black/5 text-[16px] font-bold text-[#37352F]">
                                                <span>Grand Total</span>
                                                <span>QAR {computedTotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button className="flex-1 h-12 bg-[#37352F] hover:bg-black text-white text-[13px] font-bold uppercase tracking-[0.2em] rounded-sm gap-3 shadow-xs transition-all active:scale-[0.98]">
                                    <Download size={16} />
                                    Download PDF Receipt
                                </Button>
                                <Button variant="ghost" className="flex-1 h-12 text-[#91918E] hover:text-[#37352F] text-[11px] font-bold uppercase tracking-widest border border-[#E9E9E7] rounded-sm bg-white" onClick={() => window.print()}>
                                    Print Document
                                </Button>
                            </div>

                            {/* PDF Print Styles */}
                            <style jsx global>{`
                                @media print {
                                     body * { visibility: hidden; }
                                     .max-w-3xl, .max-w-3xl * { visibility: visible; }
                                     .max-w-3xl { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
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
