"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowLeft,
    Check,
    Upload,
    CheckCircle2,
    Trophy,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CompetitionType =
    | "dog-grooming"
    | "dog-fashion-show"
    | "cat-fashion-show"
    | "dog-best-in-show"
    | "cat-best-show"
    | "cat-drawing-battle"
    | "";

function RegistrationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations("RegistrationPage");
    const tComp = useTranslations("CompetitionsPage.list");

    const [selectedEventId, setSelectedEventId] = useState<CompetitionType>("");
    const [selectedEventName, setSelectedEventName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [checkedTerms, setCheckedTerms] = useState<Record<number, boolean>>({});
    const [files, setFiles] = useState<{
        passport: string | null;
        vaccination: string | null;
    }>({
        passport: null,
        vaccination: null,
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
        "dog-grooming": "grooming",
        "dog-fashion-show": "dog_fashion",
        "cat-fashion-show": "cat_fashion",
        "dog-best-in-show": "dog_show",
        "cat-best-show": "cat_show",
        "cat-drawing-battle": "drawing",
    };

    const competitionOptions = Object.entries(termKeys).map(([id, key], i) => ({
        id: id as CompetitionType,
        key,
        emoji:
            i === 0
                ? "🐕"
                : i === 1
                    ? "✨"
                    : i === 2
                        ? "🐱"
                        : i === 3
                            ? "🏆"
                            : i === 4
                                ? "🐱"
                                : "🎨",
    }));

    useEffect(() => {
        const eventParam = searchParams.get("event");
        if (eventParam) {
            const eventMap: Record<string, { id: CompetitionType; key: string }> = {
                "dog-grooming": { id: "dog-grooming", key: "grooming" },
                "dog-fashion-show": { id: "dog-fashion-show", key: "fashion" },
                "cat-fashion-show": { id: "cat-fashion-show", key: "fashion" },
                "dog-best-in-show": { id: "dog-best-in-show", key: "dog_show" },
                "cat-best-show": { id: "cat-best-show", key: "cat_show" },
                "cat-drawing-battle": { id: "cat-drawing-battle", key: "drawing" },
            };

            const found = eventMap[eventParam];
            if (found) {
                setSelectedEventId(found.id);
                setSelectedEventName(tComp(`items.${found.key}.title`));
                setFormData(prev => ({
                    ...prev,
                    experienceLevel: found.id === "dog-grooming"
                        ? "Session 1: Dog Figure Grooming (4:00 PM – 6:00 PM)"
                        : "Intermediate"
                }));
            }
        }
    }, [searchParams, tComp]);

    useEffect(() => {
        const savedData = localStorage.getItem("nova_registration");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setFormData((prev) => ({
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
        ? (t.raw(
            `safety.terms.${termKeys[selectedEventId] || "dog_show"}`,
        ) as string[])
        : [];
    const allChecked =
        currentTerms.length > 0 &&
        Object.values(checkedTerms).filter(Boolean).length === currentTerms.length;

    const isFormValid =
        selectedEventId &&
        formData.fullName &&
        formData.phone &&
        formData.email &&
        formData.petName &&
        formData.breed &&
        files.passport &&
        files.vaccination &&
        allChecked;

    const handleSubmit = () => {
        if (!isFormValid) {
            toast.error(
                "Please complete all required fields, upload documents, and accept all terms.",
            );
            return;
        }
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ─── SUCCESS STATE ───────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="animate-in fade-in duration-700 py-12">
                <div className="max-w-2xl">
                    <div className="bg-[#F1F1EF] rounded-sm p-6 flex gap-4 items-start border border-[#E9E9E7]">
                        <span className="text-[24px]">🎉</span>
                        <div>
                            <h3 className="text-[16px] font-bold text-[#37352F] mb-1">
                                Application Sent successfully
                            </h3>
                            <p className="text-[14px] text-[#37352F]/70 leading-relaxed mb-4">
                                Your registration for <strong>{selectedEventName}</strong> has been submitted. Our team will review your details and get back to you shortly.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/dashboard")}
                                className="bg-white border-[#E9E9E7] text-[#37352F] hover:bg-[#F7F6F3] rounded-sm h-9 px-4 font-medium text-[13px]"
                            >
                                Return to Overview
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── NOTION STYLE INPUT COMPONENTS ──────────────────────────────
    const NotionInput = ({ label, value, onChange, placeholder, required = false }: any) => (
        <div className="space-y-1.5 w-full">
            <Label className="text-[14px] font-medium text-[#37352F]">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-[#F7F6F3] border-none rounded-sm px-3 py-2 text-[14px] text-[#37352F] placeholder:text-[#91918E] outline-none focus:ring-1 focus:ring-[#E9E9E7] transition-all"
            />
        </div>
    );

    const Divider = () => <div className="h-[1px] bg-[#E9E9E7] my-8 w-full" />;

    const SectionHeading = ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-[24px] font-bold text-[#37352F] tracking-tight mb-4">
            {children}
        </h2>
    );

    return (
        <div className="animate-in fade-in duration-500 pb-20">
            <div className="max-w-[708px]">
                {/* Page Header */}
                <div className="mb-10 mt-4">
                    <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">
                        Competition Entry
                    </h1>
                    <p className="text-[16px] text-[#37352F]/70">
                        Complete all sections below to register for your chosen competition.
                    </p>
                </div>

                {/* ─── SECTION 1: Competition Selection ──────────────────────── */}
                <div className="space-y-4">
                    <SectionHeading>Select Competition</SectionHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {competitionOptions.map(({ id, key, emoji }) => (
                            <div
                                key={id}
                                onClick={() => {
                                    setSelectedEventId(id);
                                    setSelectedEventName(tComp(`items.${key}.title`));
                                    setCheckedTerms({});
                                    setFormData(prev => ({
                                        ...prev,
                                        experienceLevel: id === "dog-grooming"
                                            ? "Session 1: Dog Figure Grooming (4:00 PM – 6:00 PM)"
                                            : "Intermediate"
                                    }));
                                }}
                                className={cn(
                                    "p-4 border rounded-sm cursor-pointer transition-all flex flex-col gap-2",
                                    selectedEventId === id
                                        ? "border-[#37352F] bg-[#F7F6F3]"
                                        : "border-[#E9E9E7] bg-white hover:bg-[#F7F6F3]/50",
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[20px]">{emoji}</span>
                                    {selectedEventId === id && (
                                        <Check size={16} className="text-[#37352F]" />
                                    )}
                                </div>
                                <h3 className="font-bold text-[14px] text-[#37352F] leading-tight">
                                    {tComp(`items.${key}.title`)}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                <Divider />

                {/* ─── SECTION 2: Personal Information ───────────────────────── */}
                <div className="space-y-4">
                    <SectionHeading>Personal Information</SectionHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <NotionInput
                            label="Legal Full Name"
                            required
                            value={formData.fullName}
                            onChange={(e: any) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="John Doe"
                        />
                        <NotionInput
                            label="Primary Contact Number"
                            required
                            value={formData.phone}
                            onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+974 XXXX XXXX"
                        />
                        <NotionInput
                            label="Email Address"
                            required
                            value={formData.email}
                            onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@example.com"
                        />
                        <NotionInput
                            label="Residential Address"
                            value={formData.address}
                            onChange={(e: any) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Doha, Qatar"
                        />
                    </div>
                </div>

                <Divider />

                {/* ─── SECTION 3: Pet / Companion Profile ────────────────────── */}
                <div className="space-y-4">
                    <SectionHeading>Companion Profile</SectionHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <NotionInput
                            label="Pet Name"
                            required
                            value={formData.petName}
                            onChange={(e: any) => setFormData({ ...formData, petName: e.target.value })}
                            placeholder="Buddy"
                        />
                        <NotionInput
                            label="Pet Breed"
                            required
                            value={formData.breed}
                            onChange={(e: any) => setFormData({ ...formData, breed: e.target.value })}
                            placeholder="Golden Retriever"
                        />
                        <div className="space-y-1.5 w-full">
                            <Label className="text-[14px] font-medium text-[#37352F]">Gender</Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(val) => setFormData({ ...formData, gender: val })}
                            >
                                <SelectTrigger className="w-full bg-[#F7F6F3] border-none rounded-sm px-3 py-2 h-[36px] text-[14px] text-[#37352F] focus:ring-1 focus:ring-[#E9E9E7]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-[#E9E9E7]">
                                    <SelectItem value="Male" className="text-[14px]">Male</SelectItem>
                                    <SelectItem value="Female" className="text-[14px]">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {selectedEventId === "dog-grooming" ? (
                            <div className="space-y-1.5 w-full">
                                <Label className="text-[14px] font-medium text-[#37352F]">Preferred Timeslot *</Label>
                                <Select
                                    value={formData.experienceLevel}
                                    onValueChange={(val) => setFormData({ ...formData, experienceLevel: val })}
                                >
                                    <SelectTrigger className="w-full bg-[#F7F6F3] border-none rounded-sm px-3 py-2 h-[36px] text-[14px] text-[#37352F] focus:ring-1 focus:ring-[#E9E9E7]">
                                        <SelectValue placeholder="Select Timeslot" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-sm border-[#E9E9E7]">
                                        <SelectItem value="Session 1: Dog Figure Grooming (4:00 PM – 6:00 PM)" className="text-[14px]">
                                            Session 1: Dog Figure Grooming (4:00 PM – 6:00 PM)
                                        </SelectItem>
                                        <SelectItem value="Session 2: Real Dog Grooming (2:00 PM – 4:00 PM)" className="text-[14px]">
                                            Session 2: Real Dog Grooming (2:00 PM – 4:00 PM)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <div className="space-y-1.5 w-full">
                                <Label className="text-[14px] font-medium text-[#37352F]">Experience Level</Label>
                                <Select
                                    value={formData.experienceLevel}
                                    onValueChange={(val) => setFormData({ ...formData, experienceLevel: val })}
                                >
                                    <SelectTrigger className="w-full bg-[#F7F6F3] border-none rounded-sm px-3 py-2 h-[36px] text-[14px] text-[#37352F] focus:ring-1 focus:ring-[#E9E9E7]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-sm border-[#E9E9E7]">
                                        <SelectItem value="Beginner" className="text-[14px]">Beginner</SelectItem>
                                        <SelectItem value="Intermediate" className="text-[14px]">Intermediate</SelectItem>
                                        <SelectItem value="Professional" className="text-[14px]">Professional</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                </div>

                <Divider />

                {/* ─── SECTION 4: Health Documents ────────────────────────────── */}
                <div className="space-y-4">
                    <SectionHeading>Health Documents</SectionHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                            onClick={() => setFiles((f) => ({ ...f, passport: "passport.pdf" }))}
                            className={cn(
                                "p-4 border rounded-sm cursor-pointer transition-all flex items-center gap-3",
                                files.passport
                                    ? "border-[#37352F] bg-[#F7F6F3]"
                                    : "border-[#E9E9E7] hover:bg-[#F7F6F3]"
                            )}
                        >
                            <div className="w-8 h-8 rounded-sm bg-white border border-[#E9E9E7] flex items-center justify-center shrink-0">
                                {files.passport ? <CheckCircle2 size={16} className="text-[#37352F]" /> : <Upload size={16} className="text-[#91918E]" />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] font-medium text-[#37352F]">Pet Passport *</span>
                                <span className="text-[12px] text-[#91918E]">
                                    {files.passport ? files.passport : "Upload PDF (Max 5MB)"}
                                </span>
                            </div>
                        </div>

                        <div
                            onClick={() => setFiles((f) => ({ ...f, vaccination: "vaccination.pdf" }))}
                            className={cn(
                                "p-4 border rounded-sm cursor-pointer transition-all flex items-center gap-3",
                                files.vaccination
                                    ? "border-[#37352F] bg-[#F7F6F3]"
                                    : "border-[#E9E9E7] hover:bg-[#F7F6F3]"
                            )}
                        >
                            <div className="w-8 h-8 rounded-sm bg-white border border-[#E9E9E7] flex items-center justify-center shrink-0">
                                {files.vaccination ? <CheckCircle2 size={16} className="text-[#37352F]" /> : <Upload size={16} className="text-[#91918E]" />}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] font-medium text-[#37352F]">Vaccination Record *</span>
                                <span className="text-[12px] text-[#91918E]">
                                    {files.vaccination ? files.vaccination : "Upload PDF (Max 5MB)"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <Divider />

                {/* ─── SECTION 5: Terms & Agreements ──────────────────────────── */}
                {selectedEventId && (
                    <div className="space-y-4">
                        <SectionHeading>Terms & Agreements</SectionHeading>

                        <div className="bg-[#F1F1EF] p-4 rounded-sm mb-4">
                            <p className="text-[14px] text-[#37352F] font-medium flex items-center gap-2">
                                <span>📋</span> Required for {selectedEventName}
                            </p>
                        </div>

                        <div className="space-y-3">
                            {currentTerms.map((term, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Checkbox
                                        id={`term-${i}`}
                                        checked={checkedTerms[i]}
                                        onCheckedChange={() =>
                                            setCheckedTerms((prev) => ({ ...prev, [i]: !prev[i] }))
                                        }
                                        className="mt-1 border-[#37352F]/30 data-[state=checked]:bg-[#37352F] data-[state=checked]:border-[#37352F] rounded-[3px]"
                                    />
                                    <label
                                        htmlFor={`term-${i}`}
                                        className="text-[14px] leading-relaxed cursor-pointer text-[#37352F] flex-1"
                                    >
                                        {term}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─── SUBMIT BUTTON ─────────────────────────────────────────── */}
                <div className="mt-10 pt-6 border-t border-[#E9E9E7] flex items-center gap-3">
                    <Button
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className="bg-[#FACC15] text-[#37352F] hover:bg-[#E5B814] rounded-sm h-9 px-6 font-medium text-[14px] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Submit Registration
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/dashboard")}
                        className="h-9 px-4 text-[#91918E] hover:text-[#37352F] font-medium text-[14px] hover:bg-transparent"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function RegisterPetPage() {
    return (
        <Suspense
            fallback={
                <div className="py-20 text-[#91918E] text-[14px] font-medium animate-pulse">
                    Loading...
                </div>
            }
        >
            <RegistrationContent />
        </Suspense>
    );
}
