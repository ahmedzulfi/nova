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
    PawPrint
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
                                {/* Elite Digital Pass Block */}
                                <div className="p-8 bg-[#F5F5F0] border border-black/5 rounded-sm space-y-8 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Ticket size={120} className="-rotate-12 translate-x-8 -translate-y-8" />
                                    </div>

                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-black/40 uppercase tracking-[0.2em] leading-none">Official Pass</p>
                                            <h3 className="text-[28px] font-bold text-black tracking-tighter leading-none">{data.orderId}</h3>
                                        </div>
                                        <div className="w-10 h-10 bg-black rounded-sm flex items-center justify-center text-white">
                                            <ShieldCheck size={20} />
                                        </div>
                                    </div>

                                    <div className="flex gap-8 items-center relative z-10">
                                        <div className="bg-white p-3 border border-black/5 rounded-sm shadow-sm transition-transform group-hover:scale-105 duration-500">
                                            <img src={QR_CODE_URL} alt="QR" className="w-24 h-24" />
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.15em] mb-1">Holder</p>
                                                <p className="font-bold text-[16px] text-black leading-none">{data.fullName}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.15em] mb-1">Tier</p>
                                                <p className="font-bold text-[14px] text-primary leading-none uppercase">{getTierName(data.tier)}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <div>
                                                    <p className="text-[9px] font-bold text-black/30 uppercase tracking-[0.1em]">Guests</p>
                                                    <p className="font-bold text-[13px]">{data.adultQty + (data.kidsQty || 0)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-black/30 uppercase tracking-[0.1em]">Pets</p>
                                                    <p className="font-bold text-[13px]">{data.petQty}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-black hover:bg-black/90 text-white rounded-sm h-12 text-[13px] font-bold uppercase tracking-[0.15em] relative z-10 gap-2 shadow-lg shadow-black/10 transition-all active:scale-[0.98]">
                                        <Download size={16} />
                                        {t('overview.download')}
                                    </Button>
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
                        <div className="max-w-4xl mx-auto py-4">
                            <div className="p-10 md:p-16 border border-[#E9E9E7] rounded-sm bg-white shadow-xl space-y-16 relative overflow-hidden">
                                {/* Watermark/Background Decoration */}
                                <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                                    <ShieldCheck size={400} className="-rotate-12 translate-x-24 -translate-y-24" />
                                </div>

                                {/* Receipt Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-[#E9E9E7] pb-12 relative z-10">
                                    <div className="space-y-6">
                                        <div className="w-16 h-16 bg-[#37352F] rounded-sm flex items-center justify-center text-white text-[28px] font-bold shadow-lg">
                                            N
                                        </div>
                                        <div>
                                            <h2 className="text-[32px] font-bold text-[#37352F] tracking-tighter leading-none mb-2">Official Receipt</h2>
                                            <p className="text-[14px] text-[#91918E] font-medium tracking-tight">Nova Paw Festival · Qatar 2026</p>
                                        </div>
                                    </div>
                                    <div className="md:text-right space-y-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em] mb-1">Transaction ID</p>
                                            <p className="text-[20px] font-bold text-[#37352F] tracking-tight">{data.orderId}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em] mb-1">Issue Date</p>
                                            <p className="text-[14px] font-bold text-[#37352F]">{new Date(data.entryDate || '').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Receipt Content */}
                                <div className="space-y-12 relative z-10">
                                    {/* Stakeholder Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                        <div>
                                            <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em] mb-3">Merchant</p>
                                            <div className="space-y-1">
                                                <p className="text-[15px] font-bold text-[#37352F]">Nova Events LLC</p>
                                                <p className="text-[13px] text-[#666666]">CR: 1928374-Q</p>
                                                <p className="text-[13px] text-[#666666]">The Pearl Island, Parcel 18</p>
                                                <p className="text-[13px] text-[#666666]">Doha, Qatar</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em] mb-3">Billed To</p>
                                            <div className="space-y-1">
                                                <p className="text-[15px] font-bold text-[#37352F]">{data.fullName}</p>
                                                <p className="text-[13px] text-[#666666]">{data.email}</p>
                                                <p className="text-[13px] text-[#666666]">{data.phone}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em] mb-3">Payment Info</p>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-[14px] font-bold text-[#37352F]">
                                                    <div className="w-8 h-5 bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm flex items-center justify-center text-[8px] font-bold uppercase">Visa</div>
                                                    <span>•••• 4242</span>
                                                </div>
                                                <p className="text-[13px] text-[#666666]">Auth: #881920</p>
                                                <p className="text-[13px] text-green-600 font-bold uppercase tracking-wider">Status: Completed</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Details Table */}
                                    <div className="space-y-6">
                                        <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.2em]">Itemized Breakdown</p>
                                        <div className="border border-[#E9E9E7] rounded-sm overflow-hidden">
                                            <table className="w-full text-left border-collapse">
                                                <thead className="bg-[#F7F6F3] border-b border-[#E9E9E7]">
                                                    <tr>
                                                        <th className="px-8 py-4 text-[10px] font-bold text-[#91918E] uppercase tracking-[0.1em]">Description</th>
                                                        <th className="px-8 py-4 text-[10px] font-bold text-[#91918E] uppercase tracking-[0.1em] text-center">Qty</th>
                                                        <th className="px-8 py-4 text-[10px] font-bold text-[#91918E] uppercase tracking-[0.1em] text-right">Unit Price</th>
                                                        <th className="px-8 py-4 text-[10px] font-bold text-[#91918E] uppercase tracking-[0.1em] text-right">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#E9E9E7]">
                                                    <tr>
                                                        <td className="px-8 py-5">
                                                            <p className="font-bold text-[15px] text-[#37352F]">{getTierName(data.tier)}</p>
                                                            <p className="text-[12px] text-[#91918E]">Primary registration and festival access pass</p>
                                                        </td>
                                                        <td className="px-8 py-5 text-center text-[14px] font-medium text-[#37352F]">1</td>
                                                        <td className="px-8 py-5 text-right text-[14px] font-medium text-[#37352F]">QAR 50.00</td>
                                                        <td className="px-8 py-5 text-right text-[14px] font-bold text-[#37352F]">QAR 50.00</td>
                                                    </tr>
                                                    {data.adultQty > 0 && (
                                                        <tr>
                                                            <td className="px-8 py-5">
                                                                <p className="font-bold text-[15px] text-[#37352F]">Additional Adult Passes</p>
                                                                <p className="text-[12px] text-[#91918E]">Standard companion entry passes</p>
                                                            </td>
                                                            <td className="px-8 py-5 text-center text-[14px] font-medium text-[#37352F]">{data.adultQty}</td>
                                                            <td className="px-8 py-5 text-right text-[14px] font-medium text-[#37352F]">QAR 25.00</td>
                                                            <td className="px-8 py-5 text-right text-[14px] font-bold text-[#37352F]">QAR {data.adultQty * 25}.00</td>
                                                        </tr>
                                                    )}
                                                    {data.kidsQty > 0 && (
                                                        <tr>
                                                            <td className="px-8 py-5">
                                                                <p className="font-bold text-[15px] text-[#37352F]">Junior Passes (U-12)</p>
                                                                <p className="text-[12px] text-[#91918E]">Kids entry for children under 12 years</p>
                                                            </td>
                                                            <td className="px-8 py-5 text-center text-[14px] font-medium text-[#37352F]">{data.kidsQty}</td>
                                                            <td className="px-8 py-5 text-right text-[14px] font-medium text-[#37352F]">QAR 15.00</td>
                                                            <td className="px-8 py-5 text-right text-[14px] font-bold text-[#37352F]">QAR {data.kidsQty * 15}.00</td>
                                                        </tr>
                                                    )}
                                                    {isPetOwner && (
                                                        <tr>
                                                            <td className="px-8 py-5">
                                                                <p className="font-bold text-[15px] text-[#37352F]">Pet Registration — {data.petName || 'Companion'}</p>
                                                                <p className="text-[12px] text-[#91918E]">Security verification and sanitary management fee</p>
                                                            </td>
                                                            <td className="px-8 py-5 text-center text-[14px] font-medium text-[#37352F]">{data.petQty}</td>
                                                            <td className="px-8 py-5 text-right text-[14px] font-medium text-[#37352F]">QAR 25.00</td>
                                                            <td className="px-8 py-5 text-right text-[14px] font-bold text-[#37352F]">QAR {data.petQty * 25}.00</td>
                                                        </tr>
                                                    )}
                                                    <tr className="bg-[#FBFAFB]/50">
                                                        <td colSpan={3} className="px-8 py-4 text-right text-[13px] font-bold text-[#91918E] uppercase tracking-wider">Service Fee</td>
                                                        <td className="px-8 py-4 text-right text-[14px] font-bold text-[#37352F]">QAR 10.00</td>
                                                    </tr>
                                                    <tr className="bg-[#FBFAFB]/50 border-b-2 border-black/5">
                                                        <td colSpan={3} className="px-8 py-4 text-right text-[13px] font-bold text-[#91918E] uppercase tracking-wider">VAT (5%)</td>
                                                        <td className="px-8 py-4 text-right text-[14px] font-bold text-[#37352F]">QAR {(data.total * 0.05).toFixed(2)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Grand Summary */}
                                    <div className="flex flex-col md:flex-row justify-between gap-12 items-end pt-6">
                                        <div className="max-w-md space-y-4">
                                            <div className="p-4 bg-[#F7F6F3] rounded-sm border border-[#E9E9E7] space-y-2">
                                                <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.1em]">Security & Safety Compliance</p>
                                                <p className="text-[12px] text-[#666666] leading-relaxed">
                                                    This receipt confirms the digital acceptance of the <span className="font-bold text-[#37352F]">Nova Paw 2026 Safety Agreement</span>.
                                                    Attendee agrees to adhere to all venue rules, pet leash requirements, and waste management policies.
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-[#91918E] font-medium">
                                                <ShieldCheck size={14} className="text-green-600" />
                                                <span>Verified Transaction · Secured by Nova Gatekeeper</span>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-80 space-y-4">
                                            <div className="flex justify-between items-center text-[14px] text-[#91918E]">
                                                <span>Subtotal</span>
                                                <span>QAR {(data.total - (data.total * 0.05) - 10).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[14px] text-[#91918E]">
                                                <span>Adjustments</span>
                                                <span>QAR 0.00</span>
                                            </div>
                                            <div className="pt-4 border-t border-[#37352F]/10 flex justify-between items-center">
                                                <span className="text-[16px] font-bold text-[#37352F] uppercase tracking-widest">Grand Total</span>
                                                <span className="text-[32px] font-bold text-[#37352F] tracking-tighter">QAR {data.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer / PDF Style CTA */}
                                <div className="pt-12 border-t border-[#E9E9E7] flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                                    <div className="space-y-1">
                                        <p className="text-[12px] font-bold text-[#37352F]">Thank you for your purchase.</p>
                                        <p className="text-[12px] text-[#91918E]">For support, contact support@nova.qa or call +974 4400 1234</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            className="border-[#E9E9E7] text-[#37352F] hover:bg-[#F7F6F3] gap-2 h-12 px-8 font-bold rounded-sm"
                                            onClick={() => window.print()}
                                        >
                                            <ExternalLink size={16} />
                                            Print
                                        </Button>
                                        <Button
                                            className="bg-[#37352F] text-white hover:bg-black gap-2 h-12 px-8 font-bold rounded-sm shadow-xl"
                                            onClick={() => toast.success("Downloading PDF...")}
                                        >
                                            <Download size={16} />
                                            Download PDF
                                        </Button>
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

                    {/* ─── TAB: Settings ─────────────────────────────────────────────── */}
                    {activeTab === 'settings' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 border border-[#E9E9E7] rounded-sm space-y-8">
                                <h3 className="text-[14px] font-bold text-[#91918E] uppercase tracking-wider border-b border-[#E9E9E7] pb-4">{t('settings.profile_title')}</h3>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('settings.name')}</p>
                                        <p className="text-[16px] font-medium text-[#37352F]">{data.fullName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('settings.email')}</p>
                                        <p className="text-[16px] font-medium text-[#37352F]">{data.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('settings.phone')}</p>
                                        <p className="text-[16px] font-medium text-[#37352F]">{data.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border border-[#E9E9E7] rounded-sm space-y-8">
                                <h3 className="text-[14px] font-bold text-[#91918E] uppercase tracking-wider border-b border-[#E9E9E7] pb-4">{t('settings.data_title')}</h3>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('settings.tier')}</p>
                                        <p className="text-[16px] font-bold text-[#37352F]">{getTierName(data.tier)}</p>
                                    </div>
                                    {isPetOwner && (
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('settings.pet_name')}</p>
                                            <p className="text-[16px] font-medium text-[#37352F]">{data.petName || '—'}</p>
                                        </div>
                                    )}
                                    <div className="flex gap-12">
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('overview.adults')}</p>
                                            <p className="text-[16px] font-medium text-[#37352F]">{data.adultQty}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('overview.kids')}</p>
                                            <p className="text-[16px] font-medium text-[#37352F]">{data.kidsQty || '0'}</p>
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
