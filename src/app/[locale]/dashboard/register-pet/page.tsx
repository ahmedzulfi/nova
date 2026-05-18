"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Check,
    Upload,
    ArrowRight,
    User,
    PawPrint,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CompetitionType = 'dog-grooming' | 'dog-fashion-show' | 'cat-fashion-show' | 'dog-best-in-show' | 'cat-best-show' | 'cat-drawing-battle' | '';

function RegistrationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations('RegistrationPage');
    const tComp = useTranslations('CompetitionsPage.list');

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<CompetitionType>('dog-best-in-show');
    const [selectedEventName, setSelectedEventName] = useState("");
    const [checkedTerms, setCheckedTerms] = useState<Record<number, boolean>>({});
    const [files, setFiles] = useState<{ passport: string | null, vaccination: string | null }>({
        passport: null,
        vaccination: null
    });

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        petName: "",
        breed: "",
        age: "",
        gender: "Male",
        experienceLevel: "Intermediate",
        previousTitles: "",
        drawingMaterials: "",
        outfitDescription: "",
    });

    const termKeys: Record<string, string> = {
        'dog-grooming': 'grooming',
        'dog-fashion-show': 'dog_fashion',
        'cat-fashion-show': 'cat_fashion',
        'dog-best-in-show': 'dog_show',
        'cat-best-show': 'cat_show',
        'cat-drawing-battle': 'drawing'
    };

    useEffect(() => {
        const eventParam = searchParams.get('event');
        if (eventParam && termKeys[eventParam]) {
            setSelectedEventId(eventParam as CompetitionType);
        }
    }, [searchParams]);

    useEffect(() => {
        if (selectedEventId) {
            setSelectedEventName(tComp(`items.${termKeys[selectedEventId]}.title`));
            setCheckedTerms({}); // reset terms
        }
    }, [selectedEventId, tComp]);

    useEffect(() => {
        const savedData = localStorage.getItem('nova_registration');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setFormData(prev => ({
                ...prev,
                fullName: parsed.fullName || "",
                phone: parsed.phone || "",
                email: parsed.email || "",
                address: parsed.address || "",
                petName: parsed.petName || "",
            }));
        }
    }, []);

    const currentTerms = t.raw(`safety.terms.${termKeys[selectedEventId] || 'dog_show'}`) as string[];
    const allChecked = currentTerms.length > 0 && Object.values(checkedTerms).filter(Boolean).length === currentTerms.length;

    const handleSubmit = () => {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isSubmitted) {
        return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <Check size={40} strokeWidth={3} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-[32px] font-bold tracking-tight">Application Sent!</h2>
                    <p className="text-[16px] text-[#666666] max-w-sm mx-auto">Your registration for {selectedEventName} has been submitted for review.</p>
                </div>
                <Button onClick={() => router.push('/dashboard')} className="bg-[#37352F] text-white hover:bg-black rounded-sm h-12 px-12 font-bold text-[13px] mt-8">
                    Return to Overview
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="animate-in fade-in duration-700">
            {/* Notion Header */}
            <div className="mb-12">
                <div className="text-[64px] mb-4">🏆</div>
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">
                    Competition Entry
                </h1>
                <p className="text-[16px] text-[#91918E] max-w-2xl">
                    Complete the official registration form to enter the competition.
                </p>
            </div>

            <div className="max-w-3xl space-y-12">
                
                {/* Competition Selection */}
                <div className="space-y-6">
                    <h2 className="text-[20px] font-bold text-[#37352F] tracking-tight">Select Competition</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(termKeys).map(([id, key], i) => (
                            <div 
                                key={id}
                                onClick={() => setSelectedEventId(id as CompetitionType)}
                                className={cn(
                                    "p-6 border rounded-sm cursor-pointer transition-all group",
                                    selectedEventId === id 
                                    ? "border-[#37352F] bg-[#F7F6F3]" 
                                    : "border-[#E9E9E7] hover:bg-[#F7F6F3]"
                                )}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-[24px]">{i === 0 ? '🐕' : i === 1 ? '✨' : i === 2 ? '🐱' : '🏆'}</div>
                                    <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center transition-colors", selectedEventId === id ? "border-[#37352F]" : "border-[#E9E9E7]")}>
                                        {selectedEventId === id && <div className="w-2 h-2 rounded-full bg-[#37352F]" />}
                                    </div>
                                </div>
                                <h3 className="font-bold text-[16px] text-[#37352F] mb-1">{tComp(`items.${key}.title`)}</h3>
                                <p className="text-[13px] text-[#91918E] line-clamp-2">{tComp(`items.${key}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-[#F7F6F3]/50 backdrop-blur-sm border border-[#E9E9E7] rounded-sm p-10 space-y-8 shadow-sm">
                    <div className="flex items-center gap-4 border-b border-[#E9E9E7] pb-6">
                        <div className="w-12 h-12 bg-[#37352F] rounded-sm flex items-center justify-center text-white">
                            <User size={24} />
                        </div>
                        <div>
                            <h2 className="text-[20px] font-bold text-[#37352F] tracking-tight">Personal Information</h2>
                            <p className="text-[12px] text-[#91918E] font-medium uppercase tracking-widest">Legal Guardian / Owner Details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Legal Full Name</Label>
                            <input
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full bg-white border border-[#E9E9E7] rounded-sm px-5 py-4 text-[14px] font-bold text-[#37352F] outline-none focus:border-[#37352F] transition-all shadow-sm"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Primary Contact Number</Label>
                            <input
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-white border border-[#E9E9E7] rounded-sm px-5 py-4 text-[14px] font-bold text-[#37352F] outline-none focus:border-[#37352F] transition-all shadow-sm"
                                placeholder="+974 XXXX XXXX"
                            />
                        </div>
                        <div className="space-y-3 md:col-span-2">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Residential Address in Qatar</Label>
                            <input
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full bg-white border border-[#E9E9E7] rounded-sm px-5 py-4 text-[14px] font-bold text-[#37352F] outline-none focus:border-[#37352F] transition-all shadow-sm"
                                placeholder="pet park The Pearl, Porto Arabia, Tower 12"
                            />
                        </div>
                    </div>
                </div>

                {/* Companion Profile */}
                <div className="bg-[#F7F6F3]/50 backdrop-blur-sm border border-[#E9E9E7] rounded-sm p-10 space-y-8 shadow-sm">
                    <div className="flex items-center gap-4 border-b border-[#E9E9E7] pb-6">
                        <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center text-white">
                            <PawPrint size={24} />
                        </div>
                        <div>
                            <h2 className="text-[20px] font-bold text-[#37352F] tracking-tight">Companion Profile</h2>
                            <p className="text-[12px] text-[#91918E] font-medium uppercase tracking-widest">Detailed Pet Information</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Pet Name</Label>
                            <input
                                value={formData.petName}
                                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                                className="w-full bg-white border border-[#E9E9E7] rounded-sm px-5 py-4 text-[14px] font-bold text-[#37352F] outline-none focus:border-[#37352F] transition-all shadow-sm"
                                placeholder="Buddy"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Pet Breed</Label>
                            <input
                                value={formData.breed}
                                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                                className="w-full bg-white border border-[#E9E9E7] rounded-sm px-5 py-4 text-[14px] font-bold text-[#37352F] outline-none focus:border-[#37352F] transition-all shadow-sm"
                                placeholder="Golden Retriever"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Gender</Label>
                            <Select value={formData.gender} onValueChange={(val) => setFormData({ ...formData, gender: val })}>
                                <SelectTrigger className="w-full h-14 bg-white border-[#E9E9E7] rounded-sm font-bold text-[14px] shadow-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm">
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Experience Level</Label>
                            <Select value={formData.experienceLevel} onValueChange={(val) => setFormData({ ...formData, experienceLevel: val })}>
                                <SelectTrigger className="w-full h-14 bg-white border-[#E9E9E7] rounded-sm font-bold text-[14px] shadow-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm">
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Professional">Professional</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Upload Documents */}
                <div className="bg-[#F7F6F3]/50 backdrop-blur-sm border border-[#E9E9E7] rounded-sm p-10 space-y-8 shadow-sm">
                    <div>
                        <h2 className="text-[20px] font-bold text-[#37352F] tracking-tight">Documents</h2>
                        <p className="text-[12px] text-[#91918E] font-medium uppercase tracking-widest mt-1">Upload Required Files</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Label className="text-[11px] font-bold uppercase tracking-wider text-[#91918E]">Pet Passport</Label>
                            <div 
                                onClick={() => setFiles(f => ({ ...f, passport: 'passport.pdf' }))}
                                className={cn(
                                    "h-40 border-2 border-dashed rounded-sm flex flex-col items-center justify-center cursor-pointer transition-all",
                                    files.passport ? 'bg-green-50 border-green-200 text-green-700' : 'bg-[#F7F6F3] border-[#E9E9E7] hover:border-[#37352F]'
                                )}
                            >
                                <Upload size={24} className="mb-2" />
                                <span className="text-[12px] font-bold">{files.passport || 'Upload PDF'}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Label className="text-[11px] font-bold uppercase tracking-wider text-[#91918E]">Vaccination Record</Label>
                            <div 
                                onClick={() => setFiles(f => ({ ...f, vaccination: 'vaccination.pdf' }))}
                                className={cn(
                                    "h-40 border-2 border-dashed rounded-sm flex flex-col items-center justify-center cursor-pointer transition-all",
                                    files.vaccination ? 'bg-green-50 border-green-200 text-green-700' : 'bg-[#F7F6F3] border-[#E9E9E7] hover:border-[#37352F]'
                                )}
                            >
                                <Upload size={24} className="mb-2" />
                                <span className="text-[12px] font-bold">{files.vaccination || 'Upload PDF'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terms and Submit */}
                <div className="p-6 bg-[#F7F6F3] rounded-sm space-y-6">
                    <div className="space-y-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#91918E]">Terms & Agreements</p>
                        {currentTerms.map((term, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <Checkbox 
                                    id={`term-${i}`} 
                                    checked={checkedTerms[i]} 
                                    onCheckedChange={() => setCheckedTerms(prev => ({ ...prev, [i]: !prev[i] }))}
                                    className="mt-1"
                                />
                                <label htmlFor={`term-${i}`} className="text-[13px] leading-relaxed cursor-pointer text-[#37352F]">{term}</label>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="flex justify-end pt-4">
                    <Button 
                        onClick={handleSubmit}
                        disabled={!allChecked || !files.passport || !files.vaccination}
                        className="bg-[#FACC15] text-black hover:bg-yellow-400 rounded-sm h-14 px-12 font-bold text-[14px] disabled:opacity-50 shadow-lg shadow-yellow-500/10 w-full md:w-auto"
                    >
                        Submit Registration <Sparkles size={16} className="ml-2" />
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default function RegisterPetPage() {
    return (
        <Suspense fallback={<div className="py-20 text-center text-[#91918E] uppercase tracking-widest text-[12px] font-bold animate-pulse">Loading Workspace...</div>}>
            <RegistrationContent />
        </Suspense>
    );
}
