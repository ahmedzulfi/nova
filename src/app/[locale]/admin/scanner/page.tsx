"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Maximize,
    Camera,
    X,
    CheckCircle2,
    AlertCircle,
    User,
    Ticket,
    PawPrint,
    Clock,
    CreditCard,
    MapPin,
    ShieldCheck,
    Smartphone,
    RefreshCcw,
    ChevronRight,
    Trophy,
    ArrowLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

// Mock scanning results
const mockGetGuestData = (id: string) => {
    return {
        id: id || 'NP-2026-X8Y1',
        status: 'Valid',
        checkInTime: null,
        tier: 'Dog Owner Ticket',
        attendee: {
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            phone: '+974 5555 1234',
            address: 'Al Waab, Doha',
            avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
        },
        breakdown: {
            adults: 1,
            kids: 1,
            pets: 1
        },
        registrations: [
            { id: 'REG-007', category: 'Grooming Competition', pet: 'Luna', status: 'Application under review' },
            { id: 'REG-012', category: 'Dog Fashion Show', pet: 'Luna', status: 'Application under review' }
        ]
    };
};

export default function ScannerPage() {
    const [isScanning, setIsScanning] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [scannedData, setScannedData] = useState<any>(null);
    const [manualId, setManualId] = useState("");

    const tCheckout = useTranslations('Checkout');

    const getTermsForTier = (tier: string) => {
        const cleanTier = tier.toLowerCase();
        if (cleanTier.includes('dog')) {
            return (tCheckout.raw('terms.dog') as string[]) || [];
        } else if (cleanTier.includes('cat')) {
            return (tCheckout.raw('terms.cat') as string[]) || [];
        }
        return (tCheckout.raw('terms.adult') as string[]) || [];
    };

    const handleScan = (id?: string) => {
        setIsLoading(true);
        // Simulate network/db latency
        setTimeout(() => {
            const data = mockGetGuestData(id || manualId);
            setScannedData(data);
            setIsLoading(false);
            setIsScanning(false);
        }, 800);
    };

    const handleCheckIn = () => {
        toast.success("Check-in Successful", {
            description: `Guest ${scannedData.attendee.name} marked as present.`
        });
        resetScanner();
    };

    const resetScanner = () => {
        setIsScanning(true);
        setScannedData(null);
        setManualId("");
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center -mt-8">
            <AnimatePresence mode="wait">
                {isScanning ? (
                    <motion.div
                        key="scanner"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="w-full max-w-lg space-y-8"
                    >
                        <div className="text-center space-y-2">
                            <h2 className="text-[24px] font-bold text-[#37352F]">Staff Ticket Scanner</h2>
                            <p className="text-[14px] text-[#91918E]">Position QR code within the frame to verify entry.</p>
                        </div>

                        {/* Camera Viewport Simulation */}
                        <div className="relative aspect-square bg-[#000000] rounded-sm overflow-hidden shadow-xs border-4 border-white">
                            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />

                            {/* Scanning Laser */}
                            <motion.div
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-[#FACC15] shadow-[0_0_15px_#FACC15] z-10"
                            />

                            {/* Corners */}
                            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-[#FACC15] rounded-tl-lg" />
                            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-[#FACC15] rounded-tr-lg" />
                            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-[#FACC15] rounded-bl-lg" />
                            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-[#FACC15] rounded-br-lg" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                {isLoading ? (
                                    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                                        <div className="w-12 h-12 border-4 border-[#FACC15] border-t-transparent rounded-full animate-spin" />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Verifying ID...</span>
                                    </div>
                                ) : (
                                    <Camera className="w-16 h-16 text-white/10" />
                                )}
                            </div>

                            {/* Simulation Trigger */}
                            <button
                                onClick={() => handleScan('NP-2026-AUTO')}
                                className="absolute inset-0 w-full h-full cursor-pointer z-20 group"
                            >
                                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] group-hover:text-[#FACC15] transition-colors">
                                    Click to simulate scan
                                </span>
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <input
                                    value={manualId}
                                    onChange={(e) => setManualId(e.target.value)}
                                    placeholder="Enter Order ID Manually..."
                                    className="w-full bg-[#F7F6F3] border-none rounded-sm px-6 py-4 text-[14px] font-bold focus:ring-1 focus:ring-[#E9E9E7] outline-none"
                                />
                            </div>
                            <Button
                                onClick={() => handleScan()}
                                className="h-14 px-8 bg-[#37352F] text-white rounded-sm font-bold uppercase text-[12px] tracking-widest hover:bg-black transition-all"
                            >
                                <ChevronRight size={18} />
                            </Button>
                        </div>

                        <div className="flex justify-center gap-8 pt-4">
                            <div className="flex flex-col items-center gap-2 opacity-30">
                                <Smartphone size={20} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Mobile Ready</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 opacity-30">
                                <RefreshCcw size={20} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Auto-Sync</span>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl space-y-6 pb-12"
                    >
                        <button
                            onClick={resetScanner}
                            className="flex items-center gap-2 text-[#91918E] hover:text-[#37352F] text-[12px] font-bold uppercase tracking-widest transition-all mb-4"
                        >
                            <ArrowLeft size={14} /> Back to Scanner
                        </button>

                        <div className="bg-white border border-[#E9E9E7] rounded-sm shadow-xs overflow-hidden">
                            {/* Header Status */}
                            <div className="bg-[#FACC15] p-8 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em]">Ticket Verified</p>
                                    <h3 className="text-[32px] font-bold text-black tracking-tighter leading-none">{scannedData.id}</h3>
                                </div>
                                <div className="w-16 h-16 bg-white rounded-sm flex items-center justify-center text-[#37352F] shadow-xs">
                                    <CheckCircle2 size={32} strokeWidth={3} />
                                </div>
                            </div>

                            <div className="p-10 space-y-12">
                                {/* Guest Pass Section */}
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <Avatar className="w-24 h-24 border-4 border-[#F7F6F3] shadow-sm">
                                        <AvatarImage src={scannedData.attendee.avatarUrl} />
                                        <AvatarFallback className="bg-yellow-100 text-yellow-800 text-2xl font-bold">
                                            {scannedData.attendee.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-4 flex-1">
                                        <div>
                                            <h4 className="text-[24px] font-bold text-[#37352F]">{scannedData.attendee.name}</h4>
                                            <p className="text-[14px] text-[#91918E] font-medium">{scannedData.attendee.phone} • {scannedData.attendee.email}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge className="bg-[#37352F] text-white rounded-sm px-3 h-7 text-[10px] font-bold tracking-widest uppercase">{scannedData.tier}</Badge>
                                            <Badge variant="outline" className="border-[#E9E9E7] text-[#91918E] rounded-sm px-3 h-7 text-[10px] font-bold tracking-widest uppercase">Verified Buyer</Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Breakdown Grid */}
                                <div className="grid grid-cols-3 gap-4 border-y border-[#F1F1EF] py-8">
                                    <div className="text-center space-y-1">
                                        <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-widest">Adults</p>
                                        <p className="text-[20px] font-bold text-[#37352F]">{scannedData.breakdown.adults}</p>
                                    </div>
                                    <div className="text-center space-y-1 border-x border-[#F1F1EF]">
                                        <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-widest">Kids</p>
                                        <p className="text-[20px] font-bold text-[#37352F]">{scannedData.breakdown.kids}</p>
                                    </div>
                                    <div className="text-center space-y-1">
                                        <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-widest">Pets</p>
                                        <p className="text-[20px] font-bold text-[#37352F]">{scannedData.breakdown.pets}</p>
                                    </div>
                                </div>

                                {/* Linked Competitions */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Trophy size={16} className="text-[#FACC15]" />
                                            <span className="text-[11px] font-bold text-[#37352F] uppercase tracking-widest">Linked Competitions</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-[#91918E] bg-[#F7F6F3] px-2 py-1 rounded-sm uppercase tracking-widest">
                                            {scannedData.registrations.length} Active
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {scannedData.registrations.map((reg: any) => (
                                            <div key={reg.id} className="flex items-center justify-between p-4 bg-[#F7F6F3] rounded-sm border border-[#E9E9E7]">
                                                <div>
                                                    <p className="text-[13px] font-bold text-[#37352F]">{reg.category}</p>
                                                    <p className="text-[11px] text-[#91918E] font-medium flex items-center gap-2">
                                                        Pet: <span className="text-[#37352F]">{reg.pet}</span> • ID: {reg.id}
                                                    </p>
                                                </div>
                                                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200/50 text-[9px] h-6 rounded-sm px-2 uppercase font-bold tracking-widest whitespace-nowrap">
                                                    {reg.status}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Accepted Terms Checklist */}
                                <div className="space-y-4 pt-4 border-t border-[#F1F1EF]">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={16} className="text-green-600 shrink-0" />
                                        <span className="text-[11px] font-bold text-[#37352F] uppercase tracking-widest">Accepted Terms & Conditions</span>
                                    </div>
                                    <div className="space-y-2 bg-[#F7F6F3] p-4 rounded-sm border border-[#E9E9E7]">
                                        {getTermsForTier(scannedData.tier).map((term: string, idx: number) => (
                                            <div key={idx} className="flex items-start gap-2.5 text-[12px] text-[#37352F] font-medium">
                                                <span className="text-green-600 font-bold shrink-0">✓</span>
                                                <span className="leading-tight">{term}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Security Footer */}
                                <div className="p-6 bg-[#37352F] rounded-sm text-white flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck size={20} className="text-[#FACC15]" />
                                        <div>
                                            <p className="text-[13px] font-bold">Compliance Verified</p>
                                            <p className="text-[11px] opacity-50">Health records & ID checked</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleCheckIn}
                                        className="bg-[#FACC15] hover:bg-[#EAB308] text-black font-bold uppercase text-[11px] tracking-widest h-10 px-6 rounded-sm active:scale-95"
                                    >
                                        Confirm Entry
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
