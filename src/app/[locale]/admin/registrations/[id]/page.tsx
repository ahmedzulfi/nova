"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    User,
    Mail,
    Phone,
    MapPin,
    PawPrint,
    Calendar,
    FileText,
    Image as ImageIcon,
    Download,
    Clock,
    ShieldCheck,
    Trophy,
    ExternalLink,
    ChevronRight,
    Info,
    Hash
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
const mockGetRegistrationDetails = (id: string) => {
    return {
        id,
        status: 'Pending',
        submissionDate: '2026-01-14T10:30:00Z',
        attendee: {
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            phone: '+1 (555) 123-4567',
            address: 'Al Waab St, Doha, Qatar',
            location: 'Doha, Qatar',
            avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
            memberSince: '2025-11-20',
        },
        pet: {
            name: 'Luna',
            type: 'Dog',
            breed: 'Golden Retriever',
            age: '3 years',
            weight: '28 kg',
            gender: 'Female',
            medicalNotes: 'Up to date on all vaccinations. Slightly allergic to chicken.',
            specialNeeds: 'None',
        },
        competition: {
            category: 'Drawing Cat Battle',
            experienceLevel: 'Professional',
            previousTitles: 'National Art Winner 2024',
            materialsList: 'Graphite pencils, Charcoal, Arches 300gsm Paper, Fixing spray',
        },
        documents: [
            { name: 'Identity_Proof.pdf', size: '0.8 MB', type: 'pdf' },
            { name: 'Portfolio_Sample.jpg', size: '4.2 MB', type: 'image' },
            { name: 'Pet_Passport.pdf', size: '1.5 MB', type: 'pdf' },
            { name: 'Vaccination_Record.pdf', size: '1.2 MB', type: 'pdf' },
        ],
        passportId: 'NP-PASS-7721-Q'
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

export default function RegistrationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const data = mockGetRegistrationDetails(resolvedParams.id);

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-6xl mx-auto space-y-12 pb-20"
        >
            {/* Header & Breadcrumbs */}
            <motion.div variants={itemVariants} className="space-y-6">
                <Link
                    href="/admin/registrations"
                    className="inline-flex items-center gap-2 text-[#91918E] hover:text-[#37352F] text-[13px] font-medium transition-all group"
                >
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    Back to registrations
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#F1F1EF]">
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-[48px] font-bold text-[#37352F] tracking-tighter leading-none">{data.id}</h1>
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200/50 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full h-fit mt-2">
                                {data.status}
                            </Badge>
                        </div>
                        <p className="text-[18px] text-[#91918E] font-medium">
                            Submitted on {new Date(data.submissionDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button 
                            onClick={() => toast.error("Entry Declined", { description: "The owner has been notified." })}
                            variant="outline" 
                            className="h-12 px-6 rounded-sm border-[#E9E9E7] text-[#37352F] hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-[14px] font-bold transition-all active:scale-[0.98]"
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Decline
                        </Button>
                        <Button 
                            onClick={() => toast.success("Entry Approved", { description: "Digital pass sent to owner." })}
                            className="h-12 px-10 bg-[#FACC15] hover:bg-[#EAB308] text-black rounded-sm text-[14px] font-bold transition-all active:scale-[0.98] shadow-lg shadow-yellow-500/10 border border-black/5"
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Approve Registration
                        </Button>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Details */}
                <div className="lg:col-span-8 space-y-12">
                    
                    {/* Pet Profile Section */}
                    <motion.section variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-50 rounded-sm">
                                <PawPrint className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-[20px] font-bold text-[#37352F]">Pet Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-[#E9E9E7] shadow-none bg-[#F7F6F3]/30 rounded-sm">
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Name</p>
                                            <p className="text-[16px] font-bold text-[#37352F]">{data.pet.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Breed</p>
                                            <p className="text-[16px] font-bold text-[#37352F]">{data.pet.breed}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Gender</p>
                                            <p className="text-[16px] font-bold text-[#37352F]">{data.pet.gender}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Age</p>
                                            <p className="text-[16px] font-bold text-[#37352F]">{data.pet.age}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-[#E9E9E7] shadow-none bg-white rounded-sm overflow-hidden">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <ShieldCheck className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Medical & Passport</p>
                                            <div className="space-y-2">
                                                <p className="text-[13px] text-[#37352F] leading-relaxed font-medium">
                                                    {data.pet.medicalNotes}
                                                </p>
                                                <div className="inline-flex items-center gap-2 px-2 py-1 bg-blue-50 text-blue-700 rounded-sm">
                                                    <Hash size={12} />
                                                    <span className="text-[11px] font-bold tracking-wider">{data.passportId}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-[#F1F1EF]">
                                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Special Needs</p>
                                        <p className="text-[13px] text-[#37352F] font-medium">{data.pet.specialNeeds}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.section>

                    {/* Competition Entry Section */}
                    <motion.section variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-sm">
                                <Trophy className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-[20px] font-bold text-[#37352F]">Competition Entry</h2>
                        </div>

                        <div className="p-8 border-2 border-[#FACC15]/20 bg-[#FACC15]/5 rounded-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 translate-x-1/3 -translate-y-1/3 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500">
                                <Trophy className="w-64 h-64 text-black" />
                            </div>
                            
                            <div className="relative z-10 space-y-6">
                                <div>
                                    <p className="text-[12px] font-bold text-[#854d0e] uppercase tracking-[0.2em] mb-2">Selected Category</p>
                                    <h3 className="text-[32px] font-bold text-[#37352F] tracking-tight">{data.competition.category}</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-black/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                            <Calendar className="w-4 h-4 text-[#854d0e]" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Experience</p>
                                            <p className="text-[15px] font-bold text-[#37352F]">{data.competition.experienceLevel}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                            <ShieldCheck className="w-4 h-4 text-[#854d0e]" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Past Honors</p>
                                            <p className="text-[15px] font-bold text-[#37352F]">{data.competition.previousTitles || 'None'}</p>
                                        </div>
                                    </div>
                                </div>

                                {data.competition.category === 'Drawing Cat Battle' && (
                                    <div className="mt-8 pt-6 border-t border-black/5">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                                                <FileText className="w-4 h-4 text-[#854d0e]" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Required Materials List</p>
                                                <p className="text-[14px] text-[#37352F] font-medium leading-relaxed italic">
                                                    "{data.competition.materialsList}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.section>

                    {/* Documents Section */}
                    <motion.section variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-sm">
                                <FileText className="w-5 h-5 text-slate-600" />
                            </div>
                            <h2 className="text-[20px] font-bold text-[#37352F]">Verification Documents</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {data.documents.map((doc, idx) => (
                                <div 
                                    key={idx} 
                                    className="group flex items-center justify-between p-4 border border-[#E9E9E7] rounded-sm hover:border-[#FACC15] hover:bg-[#F7F6F3]/50 transition-all cursor-pointer active:scale-[0.98]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-sm bg-[#F7F6F3] flex items-center justify-center text-[#91918E] group-hover:bg-[#FACC15]/10 group-hover:text-[#854d0e] transition-colors">
                                            {doc.type === 'image' ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-bold text-[#37352F]">{doc.name}</p>
                                            <p className="text-[11px] text-[#91918E] font-medium uppercase tracking-widest">{doc.size} • {doc.type.toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-[#91918E] group-hover:text-[#37352F]">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                </div>

                {/* Right Column: Attendee & Quick Stats */}
                <div className="lg:col-span-4 space-y-8">
                    <motion.div variants={itemVariants}>
                        <Card className="border-[#E9E9E7] shadow-xl shadow-black/[0.02] rounded-sm overflow-hidden border-t-4 border-t-[#FACC15]">
                            <CardHeader className="bg-[#F7F6F3]/50 pb-8">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                                        <AvatarImage src={data.attendee.avatarUrl} />
                                        <AvatarFallback className="bg-yellow-100 text-yellow-800 text-2xl font-bold">
                                            {data.attendee.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-[22px] font-bold text-[#37352F]">{data.attendee.name}</CardTitle>
                                        <CardDescription className="text-[13px] font-medium">Attendee Profile</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-[14px]">
                                        <div className="w-8 h-8 rounded-full bg-[#F7F6F3] flex items-center justify-center text-[#91918E]">
                                            <Mail size={14} />
                                        </div>
                                        <span className="font-medium text-[#37352F]">{data.attendee.email}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[14px]">
                                        <div className="w-8 h-8 rounded-full bg-[#F7F6F3] flex items-center justify-center text-[#91918E]">
                                            <Phone size={14} />
                                        </div>
                                        <span className="font-medium text-[#37352F]">{data.attendee.phone}</span>
                                    </div>
                                    <div className="flex items-start gap-4 text-[14px]">
                                        <div className="w-8 h-8 rounded-full bg-[#F7F6F3] flex items-center justify-center text-[#91918E] shrink-0">
                                            <MapPin size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Home Address</p>
                                            <span className="font-medium text-[#37352F]">{data.attendee.address}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-[#F1F1EF]">
                                    <Link href={`/admin/tickets/NP-2026-X8Y1`}>
                                        <Button variant="outline" className="w-full h-11 text-[13px] font-bold border-[#E9E9E7] hover:bg-[#F7F6F3] hover:text-[#37352F] group transition-all">
                                            View Guest Ledger Entry
                                            <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
