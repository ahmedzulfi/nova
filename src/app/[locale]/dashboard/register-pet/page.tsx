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
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CompetitionType = 'dog-grooming' | 'dog-fashion-show' | 'cat-fashion-show' | 'dog-best-in-show' | 'cat-best-show' | 'cat-drawing-battle' | '';

function RegistrationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations('RegistrationPage');
    const tComp = useTranslations('CompetitionsPage.list');

    const [selectedEventId, setSelectedEventId] = useState<CompetitionType>('');
    const [selectedEventName, setSelectedEventName] = useState("");
    const [submitted, setSubmitted] = useState(false);
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

    const competitionOptions = Object.entries(termKeys).map(([id, key], i) => ({
        id: id as CompetitionType,
        key,
        emoji: i === 0 ? '🐕' : i === 1 ? '✨' : i === 2 ? '🐱' : i === 3 ? '🏆' : i === 4 ? '🐱' : '🎨'
    }));

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

    const currentTerms = selectedEventId
        ? (t.raw(`safety.terms.${termKeys[selectedEventId] || 'dog_show'}`) as string[])
        : [];
    const allChecked = currentTerms.length > 0 && Object.values(checkedTerms).filter(Boolean).length === currentTerms.length;

    const isFormValid = selectedEventId && formData.fullName && formData.phone && formData.email && formData.petName && formData.breed && files.passport && files.vaccination && allChecked;

    const handleSubmit = () => {
        if (!isFormValid) {
            toast.error("Please complete all required fields, upload documents, and accept all terms.");
            return;
        }
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ─── SUCCESS STATE ───────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="animate-in fade-in duration-700">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16 space-y-6 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <Check size={40} strokeWidth={3} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[32px] font-bold tracking-tight text-[#37352F]">Application Sent!</h2>
                        <p className="text-[16px] text-[#666666] max-w-sm mx-auto">Your registration for {selectedEventName} has been submitted for review.</p>
                    </div>
                    <Button onClick={() => router.push('/dashboard')} className="bg-[#37352F] text-white hover:bg-black rounded-sm h-12 px-12 font-bold text-[13px] mt-8">
                        Return to Overview
                    </Button>
                </motion.div>
            </div>
        );
    }

    // ─── SECTION NUMBER BADGE ────────────────────────────────────────
    const SectionBadge = ({ number, icon: Icon, title, subtitle }: { number: string; icon: React.ElementType; title: string; subtitle: string }) => (
        <div className="flex items-center gap-4 border-b border-[#E9E9E7] pb-6">
            <div className="w-12 h-12 bg-[#37352F] rounded-sm flex items-center justify-center text-white">
                <Icon size={24} />
            </div>
            <div>
                <h2 className="text-[20px] font-bold text-[#37352F] tracking-tight">{number}. {title}</h2>
                <p className="text-[12px] text-[#91918E] font-medium uppercase tracking-widest">{subtitle}</p>
            </div>
        </div>
    );

    return (
        <div className="animate-in fade-in duration-700">
            {/* Notion Header */}
            <div className="mb-10">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center gap-2 text-[13px] text-[#91918E] hover:text-[#37352F] font-medium mb-6 transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">
                    Competition Entry
                </h1>
                <p className="text-[16px] text-[#91918E] max-w-2xl">
                    Complete all sections below to register for your chosen competition.
                </p>
            </div>

            <div className="max-w-3xl space-y-8">

                {/* ─── SECTION 1: Competition Selection ──────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-[#F7F6F3]/50 backdrop-blur-sm border border-[#E9E9E7] rounded-sm p-8 md:p-10 space-y-6 shadow-sm"
                >
                    <SectionBadge number="01" icon={Trophy} title="Select Competition" subtitle="Choose your event category" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {competitionOptions.map(({ id, key, emoji }) => (
                            <div
                                key={id}
                                onClick={() => {
                                    setSelectedEventId(id);
                                    setSelectedEventName(tComp(`items.${key}.title`));
                                    setCheckedTerms({});
                                }}
                                className={cn(
                                    "p-5 border rounded-sm cursor-pointer transition-all group",
                                    selectedEventId === id
                                        ? 'border-[#37352F] bg-[#37352F]/[0.03] shadow-sm'
                                        : 'border-[#E9E9E7] hover:bg-[#F7F6F3]'
                                )}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-[22px]">{emoji}</div>
                                    {selectedEventId === id ? (
                                        <div className="w-5 h-5 bg-[#37352F] rounded-full flex items-center justify-center">
                                            <Check size={12} className="text-white" strokeWidth={3} />
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 border-2 border-[#E9E9E7] rounded-full group-hover:border-[#91918E] transition-colors" />
                                    )}
                                </div>
                                <h3 className="font-bold text-[15px] text-[#37352F] mb-1">{tComp(`items.${key}.title`)}</h3>
                                <p className="text-[12px] text-[#91918E] line-clamp-2">{tComp(`items.${key}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ─── SECTION 2: Personal Information ───────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#F7F6F3]/50 backdrop-blur-sm border border-[#E9E9E7] rounded-sm p-8 md:p-10 space-y-8 shadow-sm"
                >
                    <SectionBadge number="02" icon={User} title="Personal Information" subtitle="Legal Guardian / Owner Details" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Legal Full Name *</Label>
                            <input
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full bg-white border border-[#E9E9E7] rounded-sm px-5 py-4 text-[14px] font-bold text-[#37352F] outline-none focus:border-[#37352F] transition-all shadow-sm"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Primary Contact Number *</Label>
                            <input
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-white border border-[#E9E9E7] rounded-sm px-5 py-4 text-[14px] font-bold text-[#37352F] outline-none focus:border-[#37352F] transition-all shadow-sm"
                                placeholder="+974 XXXX XXXX"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Email Address *</Label>
                            <input
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white border border-[#E9E9E7] rounded-sm px-5 py-4 text-[14px] font-bold text-[#37352F] outline-none focus:border-[#37352F] transition-all shadow-sm"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Residential Address in Qatar</Label>
                            <input
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full bg-white border border-[#E9E9E7] rounded-sm px-5 py-4 text-[14px] font-bold text-[#37352F] outline-none focus:border-[#37352F] transition-all shadow-sm"
                                placeholder="The Pearl, Porto Arabia, Tower 12"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* ─── SECTION 3: Pet / Companion Profile ────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-[#F7F6F3]/50 backdrop-blur-sm border border-[#E9E9E7] rounded-sm p-8 md:p-10 space-y-8 shadow-sm"
                >
                    <SectionBadge number="03" icon={PawPrint} title="Companion Profile" subtitle="Detailed Pet Information" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Pet Name *</Label>
                            <input
                                value={formData.petName}
                                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                                className="w-full bg-white border border-[#E9E9E7] rounded-sm px-5 py-4 text-[14px] font-bold text-[#37352F] outline-none focus:border-[#37352F] transition-all shadow-sm"
                                placeholder="Buddy"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Pet Breed *</Label>
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
                </motion.div>

                {/* ─── SECTION 4: Health Documents ────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#F7F6F3]/50 backdrop-blur-sm border border-[#E9E9E7] rounded-sm p-8 md:p-10 space-y-8 shadow-sm"
                >
                    <SectionBadge number="04" icon={FileText} title="Health Documents" subtitle="Mandatory compliance uploads" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Pet Passport *</Label>
                            <div
                                onClick={() => setFiles(f => ({ ...f, passport: 'passport.pdf' }))}
                                className={cn(
                                    "h-36 border-2 border-dashed rounded-sm flex flex-col items-center justify-center cursor-pointer transition-all",
                                    files.passport ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-[#E9E9E7] hover:border-[#37352F]'
                                )}
                            >
                                {files.passport ? (
                                    <>
                                        <CheckCircle2 size={24} className="mb-2" />
                                        <span className="text-[12px] font-bold">{files.passport}</span>
                                        <span className="text-[10px] mt-1 text-green-600">Uploaded successfully</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={24} className="mb-2 text-[#91918E]" />
                                        <span className="text-[12px] font-bold text-[#91918E]">Upload PDF</span>
                                        <span className="text-[10px] mt-1 text-[#B4B4B0]">Click to browse files</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Vaccination Record *</Label>
                            <div
                                onClick={() => setFiles(f => ({ ...f, vaccination: 'vaccination.pdf' }))}
                                className={cn(
                                    "h-36 border-2 border-dashed rounded-sm flex flex-col items-center justify-center cursor-pointer transition-all",
                                    files.vaccination ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-[#E9E9E7] hover:border-[#37352F]'
                                )}
                            >
                                {files.vaccination ? (
                                    <>
                                        <CheckCircle2 size={24} className="mb-2" />
                                        <span className="text-[12px] font-bold">{files.vaccination}</span>
                                        <span className="text-[10px] mt-1 text-green-600">Uploaded successfully</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={24} className="mb-2 text-[#91918E]" />
                                        <span className="text-[12px] font-bold text-[#91918E]">Upload PDF</span>
                                        <span className="text-[10px] mt-1 text-[#B4B4B0]">Click to browse files</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ─── SECTION 5: Terms & Agreements ──────────────────────────── */}
                {selectedEventId && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="bg-[#F7F6F3]/50 backdrop-blur-sm border border-[#E9E9E7] rounded-sm p-8 md:p-10 space-y-8 shadow-sm"
                    >
                        <SectionBadge number="05" icon={ShieldCheck} title="Terms & Agreements" subtitle="Safety compliance for your event" />

                        {/* Summary Banner */}
                        <div className="flex items-center gap-4 p-5 bg-white border border-[#E9E9E7] rounded-sm">
                            <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center text-[18px] shrink-0">🏅</div>
                            <div>
                                <p className="text-[10px] font-bold text-[#91918E] uppercase tracking-[0.15em]">Selected Competition</p>
                                <p className="text-[15px] font-bold text-[#37352F]">{selectedEventName}</p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
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
                    </motion.div>
                )}

                {/* ─── SUBMIT BUTTON ─────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4 pt-2 pb-12"
                >
                    <Button
                        variant="ghost"
                        onClick={() => router.push('/dashboard')}
                        className="font-bold text-[13px] text-[#91918E] hover:text-[#37352F]"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className="bg-[#FACC15] text-black hover:bg-yellow-400 rounded-sm h-14 px-12 font-bold text-[14px] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/10 transition-all active:scale-[0.98]"
                    >
                        Submit Registration <Sparkles size={16} className="ml-2" />
                    </Button>
                </motion.div>
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
