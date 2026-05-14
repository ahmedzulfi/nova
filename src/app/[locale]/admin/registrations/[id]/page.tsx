"use client";

import React, { use } from 'react';
import Link from 'next/link';
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
    Clock
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
            location: 'New York, USA',
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
            category: 'Agility Course (Large Dogs)',
            experienceLevel: 'Intermediate',
            previousTitles: 'Best in Show 2025 (Local)',
        },
        documents: [
            { name: 'Vaccination_Record.pdf', size: '1.2 MB', type: 'pdf' },
            { name: 'Pet_Photo.jpg', size: '3.4 MB', type: 'image' },
        ]
    };
};

export default function RegistrationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const data = mockGetRegistrationDetails(resolvedParams.id);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Back Navigation */}
            <Link
                href="/admin/registrations"
                className="flex items-center gap-2 text-[#91918E] hover:text-[#37352F] text-[13px] font-medium transition-colors mb-8 group"
            >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to registrations
            </Link>

            {/* Notion Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#F1F1EF]">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight">{data.id}</h1>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-sm border border-yellow-100/50 flex items-center gap-1.5 h-fit mt-3">
                            <Clock className="w-3 h-3" /> {data.status}
                        </span>
                    </div>
                    <p className="text-[16px] text-[#91918E]">Submitted on {new Date(data.submissionDate).toLocaleDateString()} at {new Date(data.submissionDate).toLocaleTimeString()}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 px-6 rounded-sm border-red-200 text-red-600 hover:bg-red-50 text-[13px] font-bold transition-all active:scale-[0.98]">
                        <XCircle className="w-4 h-4 mr-2" />
                        Decline Entry
                    </Button>
                    <Button className="h-10 px-8 bg-[#FACC15] hover:bg-[#EAB308] text-black rounded-sm text-[13px] font-bold transition-all active:scale-[0.98] shadow-sm border border-black/5">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Approve Registration
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Pet Details */}
                    <Card className="border-[#E9E9E7] shadow-sm hover:shadow-md transition-all duration-300 [transition-timing-function:var(--ease-emil-out)]">
                        <CardHeader className="border-b border-[#E9E9E7] bg-[#F7F6F3]/50 pb-4">
                            <CardTitle className="text-lg font-display font-bold text-[#37352F] flex items-center gap-2">
                                <PawPrint className="w-5 h-5 text-primary" />
                                Pet Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                                <div>
                                    <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Name</p>
                                    <p className="text-[14px] font-semibold text-[#37352F]">{data.pet.name}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Type & Breed</p>
                                    <p className="text-[14px] font-semibold text-[#37352F]">{data.pet.type} - {data.pet.breed}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Gender</p>
                                    <p className="text-[14px] font-semibold text-[#37352F]">{data.pet.gender}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Age</p>
                                    <p className="text-[14px] font-semibold text-[#37352F]">{data.pet.age}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Weight</p>
                                    <p className="text-[14px] font-semibold text-[#37352F]">{data.pet.weight}</p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="bg-blue-50/50 p-4  rounded-sm  border border-blue-100">
                                    <p className="text-[11px] font-bold text-blue-800 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                        <FileText className="w-3.5 h-3.5" /> Medical Notes
                                    </p>
                                    <p className="text-[13px] text-blue-900/80 leading-relaxed">{data.pet.medicalNotes}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Competition Details */}
                    <Card className="border-[#E9E9E7] shadow-sm hover:shadow-md transition-all duration-300 [transition-timing-function:var(--ease-emil-out)]">
                        <CardHeader className="border-b border-[#E9E9E7] bg-[#F7F6F3]/50 pb-4">
                            <CardTitle className="text-lg font-display font-bold text-[#37352F] flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-teal-600" />
                                Competition Entry
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid gap-6">
                                <div>
                                    <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Selected Category</p>
                                    <div className="inline-flex items-center px-3 py-1.5  rounded-sm  bg-[#F7F6F3] border border-[#E9E9E7] text-[14px] font-semibold text-[#37352F]">
                                        {data.competition.category}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#F1F1EF]">
                                    <div>
                                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Experience Level</p>
                                        <p className="text-[14px] text-[#37352F]">{data.competition.experienceLevel}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest mb-1">Previous Titles</p>
                                        <p className="text-[14px] text-[#37352F]">{data.competition.previousTitles || 'None'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Documents */}
                    <Card className="border-[#E9E9E7] shadow-sm hover:shadow-md transition-all duration-300 [transition-timing-function:var(--ease-emil-out)]">
                        <CardHeader className="border-b border-[#E9E9E7] bg-[#F7F6F3]/50 pb-4">
                            <CardTitle className="text-lg font-display font-bold text-[#37352F] flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#91918E]" />
                                Uploaded Documents
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 border border-[#E9E9E7]  rounded-sm  hover:border-[#37352F]/20 transition-all duration-150 [transition-timing-function:var(--ease-emil-out)] hover:bg-[#F7F6F3]/50 active:scale-[0.98] group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8  rounded-sm  bg-[#F7F6F3] flex items-center justify-center text-[#91918E]">
                                                {doc.type === 'image' ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-bold text-[#37352F] truncate max-w-[150px]">{doc.name}</p>
                                                <p className="text-[11px] text-[#91918E]">{doc.size}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#91918E] group-hover:text-[#37352F]">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar (Attendee Profile) */}
                <div className="space-y-6">
                    <Card className="border-[#E9E9E7] shadow-sm hover:shadow-md transition-all duration-300 [transition-timing-function:var(--ease-emil-out)]">
                        <CardHeader className="border-b border-[#E9E9E7] bg-[#F7F6F3]/50 pb-4">
                            <CardTitle className="text-lg font-display font-bold text-[#37352F] flex items-center gap-2">
                                <User className="w-5 h-5 text-indigo-500" />
                                Attendee Profile
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="w-16 h-16 border border-[#E9E9E7]">
                                    <AvatarImage src={data.attendee.avatarUrl} />
                                    <AvatarFallback className="bg-[#FACC15]/20 text-[#854d0e] font-bold text-xl">
                                        {data.attendee.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-[#37352F] text-lg">{data.attendee.name}</h3>
                                    <p className="text-[12px] text-[#91918E]">Member since {new Date(data.attendee.memberSince).getFullYear()}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-[#91918E] mt-0.5" />
                                    <div>
                                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Email</p>
                                        <p className="text-[13px] text-[#37352F]">{data.attendee.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-[#91918E] mt-0.5" />
                                    <div>
                                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Phone</p>
                                        <p className="text-[13px] text-[#37352F]">{data.attendee.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-[#91918E] mt-0.5" />
                                    <div>
                                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Location</p>
                                        <p className="text-[13px] text-[#37352F]">{data.attendee.location}</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full mt-6 text-[13px] font-semibold border-[#E9E9E7]">
                                View Full Profile
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
