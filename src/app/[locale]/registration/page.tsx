"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Label } from "@/components/ui/label";
import PhoneInput from "@/components/ui/phone-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import EventSelectionGrid from "@/components/sections/event-selection-grid";
import {
    ArrowLeft,
    Check,
    Upload,
    Info,
    ArrowRight,
    User,
    Phone,
    Mail,
    MapPin,
    PawPrint,
    FileText,
    Clock,
    Trophy,
    History,
    Sparkles,
    Eye,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WKU_GROUPS } from "@/lib/wku-breeds";

type CompetitionType = 'dog-grooming' | 'dog-fashion-show' | 'cat-fashion-show' | 'dog-best-in-show' | 'cat-best-show' | 'cat-drawing-battle' | '';

function RegistrationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations('RegistrationPage');
    const tComp = useTranslations('CompetitionsPage.list');

    const [step, setStep] = useState(1);
    const [selectedEventId, setSelectedEventId] = useState<CompetitionType>('');
    const [selectedEventName, setSelectedEventName] = useState("");
    const [checkedTerms, setCheckedTerms] = useState<Record<number, boolean>>({});
    const [files, setFiles] = useState<{ passport: string | null, vaccination: string | null }>({
        passport: null,
        vaccination: null
    });

    const STEP_LABELS = [
        t('steps.selection'),
        t('steps.owner') + ' & ' + t('steps.pet_info'),
        t('steps.done')
    ];

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        petName: "",
        breed: "",
        age: "",
        gender: "Male",
        groomerExperience: "",
        groomingCategory: "",
        outfitDescription: "",
        drawingExperience: "",
        drawingMaterials: "",
        experienceLevel: "Intermediate",
        previousTitles: "",
        dogGroup: "",
        dogBreed: "",
    });

    useEffect(() => {
        const eventParam = searchParams.get('event');
        if (eventParam) {
            const eventMap: Record<string, { id: CompetitionType, key: string }> = {
                'dog-grooming': { id: 'dog-grooming', key: 'grooming' },
                'grooming-competition': { id: 'dog-grooming', key: 'grooming' },
                'dog-fashion-show': { id: 'dog-fashion-show', key: 'fashion' },
                'cat-fashion-show': { id: 'cat-fashion-show', key: 'fashion' },
                'best-dog-show': { id: 'dog-best-in-show', key: 'dog_show' },
                'best-cat-show': { id: 'cat-best-show', key: 'cat_show' },
                'cat-drawing-battle': { id: 'cat-drawing-battle', key: 'drawing' },
            };

            const found = eventMap[eventParam];
            if (found) {
                setSelectedEventId(found.id);
                setSelectedEventName(tComp(`items.${found.key}.title`));
                setStep(2);
                setFormData(prev => ({
                    ...prev,
                    experienceLevel: found.id === 'dog-grooming'
                        ? "Session 1: Dog Figure Grooming (4:00 PM – 6:00 PM)"
                        : "Intermediate",
                    dogGroup: found.id === 'dog-best-in-show'
                        ? "Group 1: Sheepdogs"
                        : ""
                }));
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

    const handleEventSelect = (eventId: string, eventTitle: string) => {
        setSelectedEventId(eventId as CompetitionType);
        setSelectedEventName(eventTitle);
        setStep(2);
        setFormData(prev => ({
            ...prev,
            experienceLevel: eventId === 'dog-grooming'
                ? "Session 1: Dog Figure Grooming (4:00 PM – 6:00 PM)"
                : "Intermediate",
            dogGroup: eventId === 'dog-best-in-show'
                ? "Group 1: Sheepdogs"
                : ""
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setStep(s => s - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFinish = () => {
        const savedData = localStorage.getItem('nova_registration');
        let currentReg = savedData ? JSON.parse(savedData) : {};
        currentReg.competitionEntry = selectedEventName;
        currentReg.petName = formData.petName || currentReg.petName;
        localStorage.setItem('nova_registration', JSON.stringify(currentReg));
        setStep(3);
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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <EventSelectionGrid onSelect={handleEventSelect} selectedEventId={selectedEventId} />
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-12 animate-in fade-in duration-500"
                    >
                        {/* 1. Contact & Owner Details */}
                        <div className="space-y-6">
                            <h3 className="text-[12px] font-bold text-[#37352F] uppercase tracking-[0.2em] px-3 py-1.5 bg-[#F7F6F3] border-l-2 border-[#37352F]">1. Contact & Owner Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block rtl:text-right">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E]" />
                                        <input
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="Enter your legal name"
                                            className="w-full bg-[#F7F6F3] border-none rounded-sm pl-12 pr-6 py-4 outline-none focus:ring-1 focus:ring-[#E9E9E7] transition-all font-medium text-[#37352F] text-[14px]"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block rtl:text-right">Mobile Number</Label>
                                    <PhoneInput
                                        value={formData.phone}
                                        onChange={(val: string) => setFormData({ ...formData, phone: val })}
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block rtl:text-right">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E]" />
                                        <input
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="email@example.com"
                                            className="w-full bg-[#F7F6F3] border-none rounded-sm pl-12 pr-6 py-4 outline-none focus:ring-1 focus:ring-[#E9E9E7] transition-all font-medium text-[#37352F] text-[14px]"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block rtl:text-right">Home Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E]" />
                                        <input
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="Doha, Qatar"
                                            className="w-full bg-[#F7F6F3] border-none rounded-sm pl-12 pr-6 py-4 outline-none focus:ring-1 focus:ring-[#E9E9E7] transition-all font-medium text-[#37352F] text-[14px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Pet Information */}
                        <div className="space-y-6 pt-6 border-t border-[#F1F1EF]">
                            <h3 className="text-[12px] font-bold text-[#37352F] uppercase tracking-[0.2em] px-3 py-1.5 bg-[#F7F6F3] border-l-2 border-[#37352F]">2. Pet Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block">Pet Name</Label>
                                    <div className="relative">
                                        <PawPrint className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E]" />
                                        <input
                                            value={formData.petName}
                                            onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                                            placeholder="Pet's name"
                                            className="w-full bg-[#F7F6F3] border-none rounded-sm pl-12 pr-6 py-4 outline-none focus:ring-1 focus:ring-[#E9E9E7] transition-all font-medium text-[#37352F] text-[14px]"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block">Breed / Species</Label>
                                    <input
                                        value={formData.breed}
                                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                                        placeholder="e.g. Golden Retriever"
                                        className="w-full bg-[#F7F6F3] border-none rounded-sm px-6 py-4 outline-none focus:ring-1 focus:ring-[#E9E9E7] transition-all font-medium text-[#37352F] text-[14px]"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block">Pet Age</Label>
                                    <input
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        placeholder="e.g. 3 years"
                                        className="w-full bg-[#F7F6F3] border-none rounded-sm px-6 py-4 outline-none focus:ring-1 focus:ring-[#E9E9E7] transition-all font-medium text-[#37352F] text-[14px]"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block">Gender</Label>
                                    <Select value={formData.gender} onValueChange={(val) => setFormData({ ...formData, gender: val })}>
                                        <SelectTrigger className="w-full h-[52px] bg-[#F7F6F3] border-none rounded-sm px-6 font-medium text-[14px] text-[#37352F]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-sm border-[#E9E9E7] p-1 shadow-sm">
                                            <SelectItem value="Male" className="rounded-sm py-2.5">Male</SelectItem>
                                            <SelectItem value="Female" className="rounded-sm py-2.5">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* 3. Competition Specifics */}
                        {(selectedEventId === 'cat-drawing-battle' || selectedEventId === 'dog-fashion-show' || selectedEventId === 'cat-fashion-show' || selectedEventId === 'dog-best-in-show' || selectedEventId === 'cat-best-show' || formData.previousTitles) && (
                            <div className="space-y-6 pt-6 border-t border-[#F1F1EF]">
                                <h3 className="text-[12px] font-bold text-[#37352F] uppercase tracking-[0.2em] px-3 py-1.5 bg-[#F7F6F3] border-l-2 border-[#37352F]">3. Contest Details</h3>
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {selectedEventId === 'dog-best-in-show' && (
                                            <>
                                                {/* Step 1 – WKU Group */}
                                                <div className="space-y-3">
                                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block">WKU Breed Group *</Label>
                                                    <Select
                                                        value={formData.dogGroup}
                                                        onValueChange={(val) => setFormData({ ...formData, dogGroup: val, dogBreed: '' })}
                                                    >
                                                        <SelectTrigger className="w-full h-[52px] bg-[#F7F6F3] border-none rounded-sm px-6 font-medium text-[14px] text-[#37352F]">
                                                            <SelectValue placeholder="Select WKU Group" />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-sm border-[#E9E9E7] p-1 shadow-sm max-h-72">
                                                            {WKU_GROUPS.map(g => (
                                                                <SelectItem key={g.id} value={g.id} className="rounded-sm py-2.5 text-[13px]">
                                                                    {g.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                {/* Step 2 – Breed within group */}
                                                {formData.dogGroup && (
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block">Dog Breed *</Label>
                                                        <Select
                                                            value={formData.dogBreed}
                                                            onValueChange={(val) => setFormData({ ...formData, dogBreed: val })}
                                                        >
                                                            <SelectTrigger className="w-full h-[52px] bg-[#F7F6F3] border-none rounded-sm px-6 font-medium text-[14px] text-[#37352F]">
                                                                <SelectValue placeholder="Select Breed" />
                                                            </SelectTrigger>
                                                            <SelectContent className="rounded-sm border-[#E9E9E7] p-1 shadow-sm max-h-72">
                                                                {(WKU_GROUPS.find(g => g.id === formData.dogGroup)?.breeds ?? []).map(breed => (
                                                                    <SelectItem key={breed} value={breed} className="rounded-sm py-2 text-[13px]">
                                                                        {breed}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block">Previous Titles / Honors</Label>
                                            <input
                                                value={formData.previousTitles}
                                                onChange={(e) => setFormData({ ...formData, previousTitles: e.target.value })}
                                                placeholder="List any major wins"
                                                className="w-full bg-[#F7F6F3] border-none rounded-sm px-6 py-4 outline-none focus:ring-1 focus:ring-[#E9E9E7] transition-all font-medium text-[#37352F] text-[14px]"
                                            />
                                        </div>
                                    </div>

                                    {selectedEventId === 'cat-drawing-battle' && (
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block">Required Materials List</Label>
                                            <Textarea
                                                value={formData.drawingMaterials}
                                                onChange={(e) => setFormData({ ...formData, drawingMaterials: e.target.value })}
                                                placeholder="List the pencils, paper, and tools you'll be bringing."
                                                className="w-full bg-[#F7F6F3] border-none rounded-sm min-h-[120px] font-medium text-[14px] p-6 focus:ring-1 focus:ring-[#E9E9E7] transition-all"
                                            />
                                        </div>
                                    )}

                                    {(selectedEventId === 'dog-fashion-show' || selectedEventId === 'cat-fashion-show') && (
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block">Outfit & Theme Description</Label>
                                            <Textarea
                                                value={formData.outfitDescription}
                                                onChange={(e) => setFormData({ ...formData, outfitDescription: e.target.value })}
                                                placeholder="Describe the matching costumes for owner and pet."
                                                className="w-full bg-[#F7F6F3] border-none rounded-sm min-h-[120px] font-medium text-[14px] p-6 focus:ring-1 focus:ring-[#E9E9E7] transition-all"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 4. Health Compliance Uploads */}
                        <div className="space-y-6 pt-6 border-t border-[#F1F1EF]">
                            <h3 className="text-[12px] font-bold text-[#37352F] uppercase tracking-[0.2em] px-3 py-1.5 bg-[#F7F6F3] border-l-2 border-[#37352F]">4. Health Compliance Documents</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block">Pet Passport (PDF/JPG)</Label>
                                    <div
                                        onClick={() => setFiles(f => ({ ...f, passport: 'Passport_Uploaded.pdf' }))}
                                        className={cn(
                                            "h-48 border border-dashed rounded-sm flex flex-col items-center justify-center transition-all cursor-pointer group bg-[#F7F6F3]",
                                            files.passport ? 'border-green-500 bg-green-50/20 text-green-700' : 'border-[#E9E9E7] hover:border-[#37352F]'
                                        )}
                                    >
                                        {files.passport ? (
                                            <>
                                                <CheckCircle2 className="w-8 h-8 mb-3 text-green-600 animate-in zoom-in duration-300" />
                                                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{files.passport}</span>
                                                <p className="text-[9px] mt-1 opacity-50 uppercase tracking-widest">Click to change file</p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 mb-3 text-[#91918E] group-hover:scale-110 transition-transform" />
                                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#91918E]">Upload Passport</span>
                                                <p className="text-[9px] mt-1 text-[#91918E]/60 uppercase tracking-widest">Max file size 5MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E] block">
                                        {selectedEventId === 'dog-best-in-show' ? 'Dog Competition Photos' : selectedEventId === 'cat-best-show' ? 'Cat Competition Photos' : 'Vaccination Record'}
                                    </Label>
                                    <div
                                        onClick={() => setFiles(f => ({ ...f, vaccination: selectedEventId === 'dog-best-in-show' ? 'Dog_Competition_Photos.jpg' : selectedEventId === 'cat-best-show' ? 'Cat_Competition_Photos.jpg' : 'Vaccination_Record.pdf' }))}
                                        className={cn(
                                            "h-48 border border-dashed rounded-sm flex flex-col items-center justify-center transition-all cursor-pointer group bg-[#F7F6F3]",
                                            files.vaccination ? 'border-green-500 bg-green-50/20 text-green-700' : 'border-[#E9E9E7] hover:border-[#37352F]'
                                        )}
                                    >
                                        {files.vaccination ? (
                                            <>
                                                <CheckCircle2 className="w-8 h-8 mb-3 text-green-600 animate-in zoom-in duration-300" />
                                                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{files.vaccination}</span>
                                                <p className="text-[9px] mt-1 opacity-50 uppercase tracking-widest">Click to change file</p>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 mb-3 text-[#91918E] group-hover:scale-110 transition-transform" />
                                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#91918E]">
                                                    {selectedEventId === 'dog-best-in-show' || selectedEventId === 'cat-best-show' ? 'Upload Photos' : 'Upload Record'}
                                                </span>
                                                <p className="text-[9px] mt-1 text-[#91918E]/60 uppercase tracking-widest">
                                                    {selectedEventId === 'dog-best-in-show' || selectedEventId === 'cat-best-show' ? 'Mandatory for show entry' : 'Mandatory for entry'}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. Terms & Agreements */}
                        <div className="space-y-6 pt-6 border-t border-[#F1F1EF]">
                            <h3 className="text-[12px] font-bold text-[#37352F] uppercase tracking-[0.2em] px-3 py-1.5 bg-[#F7F6F3] border-l-2 border-[#37352F]">5. Safety & Judging Agreements</h3>
                            <div className="space-y-3">
                                {currentTerms.map((term, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setCheckedTerms(prev => ({ ...prev, [i]: !prev[i] }))}
                                        className={cn(
                                            "flex items-start gap-4 p-5 rounded-sm border cursor-pointer transition-all",
                                            checkedTerms[i] ? 'bg-[#FACC15]/5 border-[#FACC15]/20' : 'bg-[#F7F6F3] border-transparent hover:border-[#E9E9E7]'
                                        )}
                                    >
                                        <Checkbox checked={!!checkedTerms[i]} className="mt-1 w-5 h-5 rounded-sm border-[#E9E9E7]" />
                                        <Label className="text-[13px] font-medium leading-relaxed text-[#37352F] cursor-pointer flex-1">
                                            {term}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-[#F1F1EF]">
                            <Button variant="outline" onClick={prevStep} className="h-14 md:col-span-1 rounded-sm border-[#E9E9E7] text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-[#F7F6F3]">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                            </Button>
                            <Button
                                onClick={handleFinish}
                                disabled={
                                    !formData.fullName.trim() || 
                                    !formData.phone.trim() || 
                                    !formData.email.trim() || 
                                    !formData.address.trim() ||
                                    !formData.petName.trim() ||
                                    !formData.breed.trim() ||
                                    !formData.age.trim() ||
                                    !files.passport ||
                                    !files.vaccination ||
                                    (selectedEventId === 'dog-best-in-show' ? (!formData.dogGroup.trim() || !formData.dogBreed.trim()) : false) ||
                                    !allChecked
                                }
                                className="h-14 md:col-span-3 bg-[#37352F] hover:bg-black text-white rounded-sm text-[13px] font-bold uppercase tracking-[0.2em] disabled:opacity-50"
                            >
                                Submit Registration <Sparkles className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-12 py-10"
                    >
                        <div className="w-24 h-24 bg-[#FACC15] text-black rounded-full flex items-center justify-center mx-auto shadow-sm shadow-yellow-500/20">
                            <Check className="w-12 h-12 stroke-[4px]" />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-[40px] md:text-[64px] font-bold font-display tracking-tighter text-[#37352F] leading-none">Application Sent</h2>
                            <p className="text-[18px] text-[#91918E] leading-relaxed max-w-[600px] mx-auto font-medium">
                                Your entry for <span className="text-[#37352F] font-bold">{selectedEventName}</span> has been submitted to the WKU/WCF judging panel.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <Button onClick={() => router.push('/dashboard')} className="h-16 px-14 bg-[#37352F] hover:bg-black text-white rounded-sm text-[14px] font-bold uppercase tracking-[0.2em]">
                                Go to Dashboard
                            </Button>
                            <Button variant="outline" onClick={() => router.push('/')} className="h-16 px-14 border-[#E9E9E7] rounded-sm text-[14px] font-bold uppercase tracking-[0.2em] hover:bg-[#F7F6F3]">
                                Back to Home
                            </Button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Navigation />
            <section className="pt-32 pb-24 lg:pt-48 lg:pb-32 bg-[#F5F5F0]">
                <div className="container mx-auto px-6 max-w-[1100px]">
                    {/* Elite Step Indicator */}
                    <div className="flex items-center gap-0 mb-20">
                        {STEP_LABELS.map((label, idx) => {
                            const num = idx + 1;
                            const isActive = num === step;
                            const isDone = num < step;
                            return (
                                <React.Fragment key={num}>
                                    <div className="flex flex-col items-center gap-4 relative">
                                        <div className={cn(
                                            "w-10 h-10 rounded-sm text-[12px] font-bold flex items-center justify-center transition-all duration-500",
                                            isDone ? 'bg-[#37352F] text-white' : isActive ? 'bg-[#FACC15] text-black shadow-sm shadow-yellow-500/20 scale-110' : 'bg-[#E9E9E7] text-[#91918E]'
                                        )}>
                                            {isDone ? <Check size={16} /> : num}
                                        </div>
                                        <span className={cn(
                                            "text-[9px] font-bold uppercase tracking-[0.2em] absolute -bottom-8 whitespace-nowrap hidden md:block transition-all",
                                            isActive ? 'text-[#37352F] opacity-100' : 'text-[#91918E] opacity-40'
                                        )}>
                                            {label}
                                        </span>
                                    </div>
                                    {idx < STEP_LABELS.length - 1 && (
                                        <div className="flex-1 h-[2px] mx-4 bg-[#E9E9E7] overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: isDone ? '100%' : '0%' }}
                                                className="h-full bg-[#37352F]"
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Elite Registration Card */}
                    <div className="bg-white rounded-sm border border-[#E9E9E7] shadow-sm shadow-black/[0.03] overflow-hidden animate-in fade-in zoom-in-95 duration-1000">
                        <div className="border-b border-[#F1F1EF] px-12 pt-16 pb-12 bg-white relative">
                            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#91918E] mb-2">
                                        Elite Registration · {selectedEventName || "Phase 1"}
                                    </p>
                                    <h2 className="text-[48px] md:text-[72px] font-display font-bold text-[#37352F] leading-[0.85] tracking-tighter">
                                        {STEP_LABELS[step - 1]}
                                    </h2>
                                </div>
                                <div className="hidden md:flex items-center gap-3 pb-2">
                                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest px-3 h-8 border-[#E9E9E7] text-[#91918E]">
                                        Step {step} of {STEP_LABELS.length}
                                    </Badge>
                                    {selectedEventId && (
                                        <div className="h-8 px-3 rounded-full border border-yellow-200 bg-yellow-50 flex items-center gap-2">
                                            <Sparkles size={12} className="text-[#854d0e]" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#854d0e]">WKU/WCF Approved</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                                <Trophy size={200} className="text-black" />
                            </div>
                        </div>
                        <div className="px-12 py-16">
                            <AnimatePresence mode="wait">
                                {renderStep()}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

const Badge = ({ children, variant = 'default', className }: { children: React.ReactNode, variant?: 'default' | 'outline', className?: string }) => (
    <div className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === 'outline' ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        className
    )}>
        {children}
    </div>
);

export default function RegistrationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center font-bold font-display uppercase tracking-widest text-black/20">Loading Nova Studio...</div>}>
            <RegistrationContent />
        </Suspense>
    );
}
