"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowLeft,
    Check,
    Upload,
    ShieldCheck,
    ArrowRight,
    User,
    Phone,
    Mail,
    MapPin,
    PawPrint,
    Trophy,
    Sparkles,
    CheckCircle2,
    Activity,
    FileText,
    ChevronRight
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CompetitionType = 'dog-grooming' | 'dog-fashion-show' | 'cat-fashion-show' | 'dog-best-in-show' | 'cat-best-show' | 'cat-drawing-battle' | '';

function RegistrationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations('RegistrationPage');
    const tComp = useTranslations('CompetitionsPage.list');

    const [step, setStep] = useState(1);
    const [selectedEventId, setSelectedEventId] = useState<CompetitionType>('');
    const [selectedEventName, setSelectedEventName] = useState("");
    const [otp, setOtp] = useState('');
    const [checkedTerms, setCheckedTerms] = useState<Record<number, boolean>>({});
    const [files, setFiles] = useState<{ passport: string | null, vaccination: string | null }>({
        passport: null,
        vaccination: null
    });

    const STEP_KEYS = ['selection', 'owner', 'pet_info', 'specifics', 'health', 'review', 'done'];
    const STEP_LABELS = STEP_KEYS.map(key => t(`steps.${key}`));

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

    useEffect(() => {
        const eventParam = searchParams.get('event');
        if (eventParam) {
            const eventMap: Record<string, { id: CompetitionType, key: string }> = {
                'dog-grooming': { id: 'dog-grooming', key: 'grooming' },
                'dog-fashion-show': { id: 'dog-fashion-show', key: 'fashion' },
                'cat-fashion-show': { id: 'cat-fashion-show', key: 'fashion' },
                'dog-best-in-show': { id: 'dog-best-in-show', key: 'dog_show' },
                'cat-best-show': { id: 'cat-best-show', key: 'cat_show' },
                'cat-drawing-battle': { id: 'cat-drawing-battle', key: 'drawing' },
            };

            const found = eventMap[eventParam];
            if (found) {
                setSelectedEventId(found.id);
                setSelectedEventName(tComp(`items.${found.key}.title`));
                setStep(2);
            }
        }
    }, [searchParams, tComp]);

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

    const nextStep = () => {
        setStep(s => s + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setStep(s => s - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const termKeys: Record<string, string> = {
        'dog-grooming': 'grooming',
        'dog-fashion-show': 'dog_fashion',
        'cat-fashion-show': 'cat_fashion',
        'dog-best-in-show': 'dog_show',
        'cat-best-show': 'cat_show',
        'cat-drawing-battle': 'drawing'
    };

    const currentTerms = t.raw(`safety.terms.${termKeys[selectedEventId] || 'dog_show'}`) as string[];
    const allChecked = currentTerms.length > 0 && Object.values(checkedTerms).filter(Boolean).length === currentTerms.length;

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(termKeys).map(([id, key], i) => (
                                <div 
                                    key={id}
                                    onClick={() => {
                                        setSelectedEventId(id as CompetitionType);
                                        setSelectedEventName(tComp(`items.${key}.title`));
                                        nextStep();
                                    }}
                                    className="p-6 border border-[#E9E9E7] rounded-sm hover:bg-[#F7F6F3] cursor-pointer transition-all group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-[24px]">{i === 0 ? '🐕' : i === 1 ? '✨' : i === 2 ? '🐱' : '🏆'}</div>
                                        <ChevronRight size={18} className="text-[#E9E9E7] group-hover:text-[#37352F] transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-[16px] text-[#37352F] mb-1">{tComp(`items.${key}.title`)}</h3>
                                    <p className="text-[13px] text-[#91918E] line-clamp-2">{tComp(`items.${key}.desc`)}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                        <div className="bg-[#F7F6F3]/50 backdrop-blur-sm border border-[#E9E9E7] rounded-sm p-10 space-y-8 shadow-sm">
                            <div className="flex items-center gap-4 border-b border-[#E9E9E7] pb-6">
                                <div className="w-12 h-12 bg-[#37352F] rounded-sm flex items-center justify-center text-white">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h2 className="text-[20px] font-bold text-[#37352F] tracking-tight">Step 02: Personal Information</h2>
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
                                        placeholder="The Pearl, Porto Arabia, Tower 12"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="ghost" onClick={prevStep} className="font-bold text-[13px] text-[#91918E] hover:text-[#37352F]">
                                <ArrowLeft size={16} className="mr-2" /> Back
                            </Button>
                            <Button onClick={nextStep} className="bg-[#37352F] text-white hover:bg-black rounded-sm h-14 px-10 font-bold text-[14px] shadow-lg shadow-black/5">
                                Save & Continue <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                        <div className="bg-[#F7F6F3]/50 backdrop-blur-sm border border-[#E9E9E7] rounded-sm p-10 space-y-8 shadow-sm">
                            <div className="flex items-center gap-4 border-b border-[#E9E9E7] pb-6">
                                <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center text-white">
                                    <PawPrint size={24} />
                                </div>
                                <div>
                                    <h2 className="text-[20px] font-bold text-[#37352F] tracking-tight">Step 03: Companion Profile</h2>
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

                        <div className="flex gap-4">
                            <Button variant="ghost" onClick={prevStep} className="font-bold text-[13px] text-[#91918E] hover:text-[#37352F]">
                                <ArrowLeft size={16} className="mr-2" /> Back
                            </Button>
                            <Button onClick={nextStep} className="bg-[#37352F] text-white hover:bg-black rounded-sm h-14 px-10 font-bold text-[14px] shadow-lg shadow-black/5">
                                Save & Upload Documents <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
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
                        <div className="flex gap-4 pt-4">
                            <Button variant="ghost" onClick={prevStep} className="font-bold text-[13px] text-[#91918E] hover:text-[#37352F]">
                                <ArrowLeft size={16} className="mr-2" /> Back
                            </Button>
                            <Button 
                                onClick={nextStep} 
                                disabled={!files.passport || !files.vaccination}
                                className="bg-[#37352F] text-white hover:bg-black rounded-sm h-12 px-8 font-bold text-[13px] disabled:opacity-50"
                            >
                                Final Review <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                );
            case 5:
                return (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                        <div className="p-6 bg-[#F7F6F3] rounded-sm space-y-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#91918E] mb-2">Owner</p>
                                    <p className="font-bold text-[15px]">{formData.fullName}</p>
                                    <p className="text-[13px] text-[#666666]">{formData.email}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#91918E] mb-2">Pet</p>
                                    <p className="font-bold text-[15px]">{formData.petName}</p>
                                    <p className="text-[13px] text-[#666666]">{formData.breed}</p>
                                </div>
                            </div>
                            <div className="border-t border-[#E9E9E7] pt-6 space-y-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#91918E]">Terms & Agreements</p>
                                {currentTerms.map((term, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Checkbox 
                                            id={`term-${i}`} 
                                            checked={checkedTerms[i]} 
                                            onCheckedChange={() => setCheckedTerms(prev => ({ ...prev, [i]: !prev[i] }))}
                                            className="mt-1"
                                        />
                                        <label htmlFor={`term-${i}`} className="text-[13px] leading-relaxed cursor-pointer">{term}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="ghost" onClick={prevStep} className="font-bold text-[13px] text-[#91918E] hover:text-[#37352F]">
                                <ArrowLeft size={16} className="mr-2" /> Back
                            </Button>
                            <Button 
                                onClick={nextStep}
                                disabled={!allChecked}
                                className="bg-[#FACC15] text-black hover:bg-yellow-400 rounded-sm h-12 px-12 font-bold text-[13px] disabled:opacity-50 shadow-lg shadow-yellow-500/10"
                            >
                                Submit Registration <Sparkles size={16} className="ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                );
            case 6:
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
            default:
                return null;
        }
    };

    return (
        <div className="animate-in fade-in duration-700">
            {/* Notion Header */}
            <div className="mb-12">
                <div className="text-[64px] mb-4">🏆</div>
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">
                    {step === 6 ? 'Registration Complete' : 'Competition Entry'}
                </h1>
                <p className="text-[16px] text-[#91918E] max-w-2xl">
                    {step < 6 ? `Complete the official registration for the ${selectedEventName || 'competition'} phase.` : 'You are all set! Our judges will review your application.'}
                </p>
                
                {/* Step Indicator */}
                {step < 6 && (
                    <div className="flex gap-2 mt-8">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div 
                                key={s} 
                                className={cn(
                                    "h-1 rounded-full transition-all duration-500",
                                    s === step ? 'w-12 bg-[#37352F]' : s < step ? 'w-4 bg-green-500' : 'w-4 bg-[#E9E9E7]'
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="max-w-3xl">
                <AnimatePresence mode="wait">
                    {renderStep()}
                </AnimatePresence>
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
