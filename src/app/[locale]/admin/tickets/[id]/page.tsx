"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
    ArrowLeft,
    Ticket,
    User,
    Mail,
    Phone,
    MapPin,
    Users,
    Baby,
    PawPrint,
    Calendar,
    Download,
    MailCheck,
    CheckCircle2,
    Clock,
    ChevronRight,
    ExternalLink,
    CreditCard,
    ShieldCheck,
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock data fetching based on ID
const mockGetTicketDetails = (id: string) => {
    return {
        id,
        status: 'Active',
        purchaseDate: '2026-01-15T14:20:00Z',
        tier: 'Dog Owner Ticket',
        total: '$125.00',
        paymentMethod: 'Visa ending in 4242',
        attendee: {
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            phone: '+1 (555) 123-4567',
            address: 'Al Waab St, Doha, Qatar',
            avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
        },
        breakdown: {
            adults: 1,
            kids: 1,
            pets: 1
        },
        registrations: [
            { id: 'REG-001', category: 'Grooming Competition', pet: 'Luna', status: 'Pending' },
            { id: 'REG-007', category: 'Drawing Cat Battle', pet: 'Daisy', status: 'Completed' }
        ]
    };
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export default function TicketDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const data = mockGetTicketDetails(resolvedParams.id);

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

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-7xl mx-auto space-y-12 pb-20"
        >
            {/* Header & Navigation */}
            <motion.div variants={itemVariants} className="space-y-6">
                <Link
                    href="/admin/tickets"
                    className="inline-flex items-center gap-2 text-[#91918E] hover:text-[#37352F] text-[13px] font-medium transition-all group"
                >
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    Back to guest ledger
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#F1F1EF]">
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-[48px] font-bold text-[#37352F] tracking-tighter leading-none">{data.id}</h1>
                            <Badge className="bg-green-100 text-green-800 border-green-200/50 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full h-fit mt-2">
                                {data.status}
                            </Badge>
                        </div>
                        <p className="text-[18px] text-[#91918E] font-medium">
                            {data.tier} • Purchased on {new Date(data.purchaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => toast.success("Confirmation Resent", { description: "Email sent to " + data.attendee.email })}
                            variant="outline"
                            className="h-12 px-6 rounded-sm border-[#E9E9E7] text-[#37352F] hover:bg-[#F7F6F3] text-[14px] font-bold transition-all active:scale-[0.98]"
                        >
                            <MailCheck className="w-4 h-4 mr-2 text-[#91918E]" />
                            Resend Email
                        </Button>
                        <Button
                            onClick={() => toast.info("Exporting Ticket Data", { description: "PDF generation started." })}
                            className="h-12 px-10 bg-[#FACC15] hover:bg-[#EAB308] text-black rounded-sm text-[14px] font-bold transition-all active:scale-[0.98]  shadow-sm  shadow-yellow-500/10 border border-black/5"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </Button>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Attendee & Order Details */}
                <div className="lg:col-span-8 space-y-12">

                    {/* Attendee Profile Section */}
                    <motion.section variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-sm">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-[20px] font-bold text-[#37352F]">Attendee Information</h2>
                        </div>

                        <Card className="border-[#E9E9E7] shadow-none bg-[#F7F6F3]/30 rounded-sm">
                            <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <Avatar className="w-24 h-24 border-4 border-white shadow-sm shrink-0">
                                        <AvatarImage src={data.attendee.avatarUrl} />
                                        <AvatarFallback className="bg-yellow-100 text-yellow-800 text-2xl font-bold">
                                            {data.attendee.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full">
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Full Name</p>
                                            <p className="text-[18px] font-bold text-[#37352F]">{data.attendee.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Email Address</p>
                                            <p className="text-[16px] font-bold text-[#37352F]">{data.attendee.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Phone Number</p>
                                            <p className="text-[16px] font-bold text-[#37352F]">{data.attendee.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Billing Address</p>
                                            <p className="text-[16px] font-bold text-[#37352F]">{data.attendee.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.section>

                    {/* Guest Breakdown Section */}
                    <motion.section variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 rounded-sm">
                                <Users className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-[20px] font-bold text-[#37352F]">Guest Breakdown</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="p-6 border border-[#E9E9E7] bg-white rounded-sm text-center space-y-2">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                                    <Users size={20} />
                                </div>
                                <p className="text-[24px] font-bold text-[#37352F]">{data.breakdown.adults}</p>
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Adults</p>
                            </div>
                            <div className="p-6 border border-[#E9E9E7] bg-white rounded-sm text-center space-y-2">
                                <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-4">
                                    <Baby size={20} />
                                </div>
                                <p className="text-[24px] font-bold text-[#37352F]">{data.breakdown.kids}</p>
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Kids</p>
                            </div>
                            <div className="p-6 border border-[#E9E9E7] bg-white rounded-sm text-center space-y-2">
                                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
                                    <PawPrint size={20} />
                                </div>
                                <p className="text-[24px] font-bold text-[#37352F]">{data.breakdown.pets}</p>
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Pets</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Terms & Conditions Section */}
                    <motion.section variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 rounded-sm">
                                <ShieldCheck className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-[20px] font-bold text-[#37352F]">Accepted Terms & Conditions</h2>
                        </div>

                        <Card className="border-[#E9E9E7] shadow-none bg-white rounded-sm">
                            <CardContent className="p-8 space-y-4">
                                <p className="text-[12px] text-[#91918E] font-medium">
                                    The guest agreed to the following terms and safety conditions during ticket checkout:
                                </p>
                                <div className="space-y-3 bg-[#F7F6F3]/50 p-6 rounded-sm border border-[#E9E9E7]">
                                    {getTermsForTier(data.tier).map((term: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3 text-[14px] text-[#37352F] font-medium">
                                            <span className="text-green-600 font-bold shrink-0">✓</span>
                                            <span className="leading-tight">{term}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.section>

                    {/* Linked Registrations Section */}
                    <motion.section variants={itemVariants} className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-50 rounded-sm">
                                    <Trophy className="w-5 h-5 text-yellow-600" />
                                </div>
                                <h2 className="text-[20px] font-bold text-[#37352F]">Linked Competitions</h2>
                            </div>
                            <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest border-[#E9E9E7] text-[#91918E]">
                                {data.registrations.length} Active Entries
                            </Badge>
                        </div>

                        <div className="space-y-3">
                            {data.registrations.map((reg) => (
                                <Link key={reg.id} href={`/admin/registrations/${reg.id}`} className="block group">
                                    <div className="flex items-center justify-between p-5 border border-[#E9E9E7] bg-white rounded-sm group-hover:border-[#FACC15] group-hover:bg-[#F7F6F3]/50 transition-all active:scale-[0.99]">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-sm bg-[#F7F6F3] flex items-center justify-center text-[#91918E] group-hover:bg-[#FACC15]/10 group-hover:text-[#854d0e] transition-colors font-bold text-[13px]">
                                                {reg.id.split('-')[1]}
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-bold text-[#37352F] group-hover:text-[#37352F] transition-colors">{reg.category}</p>
                                                <p className="text-[12px] text-[#91918E] font-medium flex items-center gap-2">
                                                    For: <span className="text-[#37352F] font-bold">{reg.pet}</span>
                                                    <span className="w-1 h-1 rounded-full bg-[#E9E9E7]" />
                                                    ID: {reg.id}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge className={cn(
                                                "text-[10px] font-bold uppercase tracking-widest px-2",
                                                reg.status === 'Completed' ? "bg-green-50 text-green-700 border-green-100" : "bg-yellow-50 text-yellow-700 border-yellow-100"
                                            )}>
                                                {reg.status}
                                            </Badge>
                                            <ChevronRight className="w-4 h-4 text-[#E9E9E7] group-hover:text-[#37352F] transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.section>
                </div>

                {/* Right Column: Order Details */}
                <div className="lg:col-span-4 space-y-8">
                    <motion.div variants={itemVariants}>
                        <Card className="border-[#E9E9E7]  shadow-sm  shadow-black/[0.02] rounded-sm overflow-hidden border-t-4 border-t-[#FACC15]">
                            <CardHeader className="bg-[#F7F6F3]/50">
                                <CardTitle className="text-[18px] font-bold text-[#37352F]">Order Summary</CardTitle>
                                <CardDescription className="text-[12px]">Financial breakdown & payment</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[14px]">
                                        <span className="text-[#91918E] font-medium">Ticket Price</span>
                                        <span className="text-[#37352F] font-bold">{data.total}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[14px]">
                                        <span className="text-[#91918E] font-medium">VAT (5%)</span>
                                        <span className="text-[#37352F] font-bold">$6.25</span>
                                    </div>
                                    <div className="pt-4 border-t border-[#F1F1EF] flex justify-between items-center">
                                        <span className="text-[13px] font-bold text-[#37352F]">Grand Total</span>
                                        <span className="text-[22px] font-bold text-[#37352F] tracking-tight">{data.total}</span>
                                    </div>
                                </div>

                                <div className="pt-8 space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-[#F7F6F3] rounded-sm">
                                        <CreditCard className="w-4 h-4 text-[#91918E]" />
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-0.5">Payment Method</p>
                                            <p className="text-[13px] font-bold text-[#37352F]">{data.paymentMethod}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 border border-[#E9E9E7] rounded-sm">
                                        <ShieldCheck className="w-4 h-4 text-green-600" />
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-0.5">Verification</p>
                                            <p className="text-[13px] font-bold text-[#37352F]">3D Secure Verified</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants} className="p-6 bg-[#37352F] rounded-sm text-white space-y-4">
                        <div className="flex items-center gap-2 text-white/50">
                            <Clock size={14} />
                            <span className="text-[11px] font-bold uppercase tracking-widest">Entry History</span>
                        </div>
                        <div className="space-y-4 pt-2">
                            <div className="flex gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                                <div>
                                    <p className="text-[13px] font-bold">Scanned at Main Gate</p>
                                    <p className="text-[11px] opacity-50 font-medium">Today, 10:45 AM</p>
                                </div>
                            </div>
                            <div className="flex gap-4 opacity-50">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5" />
                                <div>
                                    <p className="text-[13px] font-bold">Ticket Issued</p>
                                    <p className="text-[11px] font-medium">Jan 15, 2:20 PM</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
