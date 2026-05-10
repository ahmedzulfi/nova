"use client";

import React, { useState, useEffect } from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import EventSelectionGrid from "@/components/sections/event-selection-grid";
import { ArrowLeft, Check, Upload, Info, ShieldCheck, ArrowRight, Dog, Cat, User, Mail, Phone, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

type CompetitionType = 'dog-grooming' | 'dog-fashion-show' | 'cat-fashion-show' | 'dog-best-in-show' | 'cat-best-show' | 'cat-drawing-battle' | '';

const STEP_LABELS = ['Selection', 'Owner', 'Pet Info', 'Specifics', 'Health', 'Safety', 'Done'];

export default function RegistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState<CompetitionType>('');
  const [selectedEventName, setSelectedEventName] = useState("");
  const [otp, setOtp] = useState('');
  const [checkedTerms, setCheckedTerms] = useState<Record<number, boolean>>({});

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    // Pet Info
    petName: "",
    breed: "",
    age: "",
    // Competition Specific
    groomerExperience: "",
    groomingCategory: "",
    outfitDescription: "",
    drawingExperience: "",
    drawingMaterials: "",
  });

  const handleEventSelect = (eventId: string, eventTitle: string) => {
    setSelectedEventId(eventId as CompetitionType);
    setSelectedEventName(eventTitle);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTerms = {
    'dog-grooming': [
      "I confirm that all submitted information is correct.",
      "I confirm that my dog's vaccination is up to date.",
      "I confirm that I have uploaded a valid pet passport.",
      "I confirm that my dog has completed a recent health checkup.",
      "I understand that I must complete a veterinary checkup with Nova Vet before final approval.",
      "I understand that registration submission does not guarantee final acceptance.",
      "I agree to attend on time for my assigned competition slot.",
      "I accept all judging decisions as final."
    ],
    'dog-fashion-show': [
      "I confirm that my dog's vaccination is up to date.",
      "I confirm that I have uploaded a valid pet passport.",
      "I understand that both owner and dog must participate together.",
      "I confirm that all costumes respect local culture and decency.",
      "I confirm that my dog will remain under my control at all times.",
      "I understand that registration does not guarantee final selection.",
      "I accept all judging decisions as final."
    ],
    'cat-fashion-show': [
      "I confirm that my cat's vaccination is up to date.",
      "I confirm that I have uploaded a valid pet passport.",
      "I understand that my cat must remain inside its carrier except during runway participation.",
      "I confirm that all costumes respect local culture and decency.",
      "I confirm that my cat will remain under my supervision at all times.",
      "I understand that registration does not guarantee final selection.",
      "I accept all judging decisions as final."
    ],
    'dog-best-in-show': [
      "My dog is fully vaccinated.",
      "My dog is not aggressive and is fully under control.",
      "My dog is healthy and fit for participation.",
      "I understand registration does not guarantee final selection.",
      "I accept all judging decisions as final."
    ],
    'cat-best-show': [
      "My cat is fully vaccinated.",
      "My cat is healthy and fit for participation.",
      "My cat will remain inside its carrier except during judging.",
      "I understand registration does not guarantee final selection.",
      "I accept all judging decisions as final."
    ],
    'cat-drawing-battle': [
      "I understand that I must bring my own drawing materials.",
      "I understand that all artwork must follow event guidelines.",
      "I understand that the competition duration is strictly 1 hour.",
      "I agree to complete my artwork within the official time.",
      "I accept all judging decisions as final.",
      "I confirm my attendance and understand the 3-week cancellation policy."
    ]
  }[selectedEventId as string] || [];

  const allChecked = currentTerms.length > 0 && Object.values(checkedTerms).filter(Boolean).length === currentTerms.length;

  // ─── Step 1: Selection ─────────────────────────────────────────────────────
  if (step === 1) return (
    <Shell step={step} selectedEventName={selectedEventName}>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        <EventSelectionGrid onSelect={handleEventSelect} selectedEventId={selectedEventId} />
      </div>
    </Shell>
  );

  // ─── Step 2: Owner Info & OTP ──────────────────────────────────────────────
  if (step === 2) return (
    <Shell step={step} selectedEventName={selectedEventName}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
              <input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Mohammed Al-Rashid"
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm pl-12 pr-5 py-4 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Mobile *</Label>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
              <input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+974 XXXX XXXX"
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm pl-12 pr-5 py-4 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px]"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#F5F5F0] rounded-sm p-8 text-center space-y-6">
          <ShieldCheck className="w-12 h-12 mx-auto text-black/30" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-black/40">Enter 6-digit Verification Code</p>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-10 h-14 rounded-sm border-2 flex items-center justify-center text-[20px] font-bold transition-all ${otp[i] ? 'border-black bg-white' : 'border-black/10 bg-white'}`}>
                {otp[i] || <span className="text-black/10">·</span>}
              </div>
            ))}
          </div>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="sr-only"
            autoFocus
          />
          <button onClick={() => setStep(3)} className="w-full bg-black text-white rounded-sm py-5 text-[14px] font-bold transition-all hover:bg-black/90">
            Verify & Continue
          </button>
        </div>

        <button onClick={() => setStep(1)} className="w-full py-3 text-[11px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-all flex items-center justify-center gap-2">
          <ArrowLeft className="w-3 h-3" /> Change Competition
        </button>
      </div>
    </Shell>
  );

  // ─── Step 3: Pet Info ──────────────────────────────────────────────────────
  if (step === 3) return (
    <Shell step={step} selectedEventName={selectedEventName}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Pet Name *</Label>
            <input
              value={formData.petName}
              onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
              placeholder="Buddy"
              className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm px-5 py-4 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Breed *</Label>
            <input
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              placeholder="Golden Retriever"
              className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm px-5 py-4 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Age *</Label>
            <input
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="3 Years"
              className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm px-5 py-4 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <button type="button" onClick={() => setStep(2)} className="md:col-span-1 bg-black/5 text-black/40 rounded-sm py-5 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-black/10 flex items-center justify-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <button onClick={() => setStep(4)} className="md:col-span-3 bg-black text-white rounded-sm py-5 text-[14px] font-bold flex items-center justify-center gap-3 transition-all hover:bg-black/90">
            Next: Competition Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 4: Specifics ─────────────────────────────────────────────────────
  if (step === 4) return (
    <Shell step={step} selectedEventName={selectedEventName}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
        {/* Specific Fields logic */}
        {selectedEventId === 'dog-grooming' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Grooming Category *</Label>
              <Select onValueChange={(val) => setFormData({ ...formData, groomingCategory: val })}>
                <SelectTrigger className="w-full h-14 bg-[#F5F5F0] border-black/5 rounded-sm font-bold text-[14px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog-figure">Figure Grooming</SelectItem>
                  <SelectItem value="real-dog">Real Dog Grooming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Years of Experience *</Label>
              <input
                value={formData.groomerExperience}
                onChange={(e) => setFormData({ ...formData, groomerExperience: e.target.value })}
                placeholder="e.g. 5 Years"
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm px-5 py-4 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px]"
              />
            </div>
          </div>
        )}

        {(selectedEventId === 'dog-fashion-show' || selectedEventId === 'cat-fashion-show') && (
          <div className="space-y-2">
            <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Outfit Theme Description *</Label>
            <Textarea
              value={formData.outfitDescription}
              onChange={(e) => setFormData({ ...formData, outfitDescription: e.target.value })}
              placeholder="Describe your matching theme and coordination..."
              className="w-full bg-[#F5F5F0] border-black/5 rounded-sm min-h-[150px] font-bold text-[14px] p-5 focus:border-black focus:bg-white transition-all"
            />
          </div>
        )}

        {selectedEventId === 'cat-drawing-battle' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Artist Experience *</Label>
              <input
                value={formData.drawingExperience}
                onChange={(e) => setFormData({ ...formData, drawingExperience: e.target.value })}
                placeholder="e.g. Professional / Hobbyist"
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm px-5 py-4 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Materials You'll Bring *</Label>
              <Textarea
                value={formData.drawingMaterials}
                onChange={(e) => setFormData({ ...formData, drawingMaterials: e.target.value })}
                placeholder="Pencils, charcoal, tablets, etc."
                className="w-full bg-[#F5F5F0] border-black/5 rounded-sm min-h-[100px] font-bold text-[14px] p-5 focus:border-black focus:bg-white transition-all"
              />
            </div>
          </div>
        )}

        {selectedEventId.includes('best-in-show') && (
          <div className="bg-[#F5F5F0] p-8 rounded-sm text-center">
            <Info className="w-8 h-8 mx-auto text-black/20 mb-4" />
            <p className="text-[14px] font-bold">No additional specifics required for this category.</p>
            <p className="text-[11px] text-black/40 uppercase tracking-widest mt-2">Proceed to Health Compliance</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <button type="button" onClick={() => setStep(3)} className="md:col-span-1 bg-black/5 text-black/40 rounded-sm py-5 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-black/10 flex items-center justify-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <button onClick={() => setStep(5)} className="md:col-span-3 bg-black text-white rounded-sm py-5 text-[14px] font-bold flex items-center justify-center gap-3 transition-all hover:bg-black/90">
            Next: Health Compliance <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 5: Compliance ────────────────────────────────────────────────────
  if (step === 5) return (
    <Shell step={step} selectedEventName={selectedEventName}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Pet Passport *</Label>
            <div className="h-48 border-2 border-dashed border-black/10 rounded-sm bg-white flex flex-col items-center justify-center text-black/20 hover:border-black hover:text-black transition-all cursor-pointer group">
              <Upload className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-[12px] font-bold uppercase tracking-widest">Upload Passport</span>
              <p className="text-[10px] mt-2 opacity-50">PDF, JPG or PNG</p>
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Vaccination Record *</Label>
            <div className="h-48 border-2 border-dashed border-black/10 rounded-sm bg-white flex flex-col items-center justify-center text-black/20 hover:border-black hover:text-black transition-all cursor-pointer group">
              <Upload className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-[12px] font-bold uppercase tracking-widest">Upload Record</span>
              <p className="text-[10px] mt-2 opacity-50">PDF, JPG or PNG</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <button type="button" onClick={() => setStep(4)} className="md:col-span-1 bg-black/5 text-black/40 rounded-sm py-5 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-black/10 flex items-center justify-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <button onClick={() => setStep(6)} className="md:col-span-3 bg-black text-white rounded-sm py-5 text-[14px] font-bold flex items-center justify-center gap-3 transition-all hover:bg-black/90">
            Next: Safety Terms <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 6: Safety ────────────────────────────────────────────────────────
  if (step === 6) return (
    <Shell step={step} selectedEventName={selectedEventName}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
        <div className="space-y-3">
          {currentTerms.map((term, i) => (
            <div
              key={i}
              onClick={() => setCheckedTerms(prev => ({ ...prev, [i]: !prev[i] }))}
              className={`flex items-start gap-4 p-5 rounded-sm border cursor-pointer transition-all ${
                checkedTerms[i] ? 'bg-green-50 border-green-200' : 'bg-[#F5F5F0] border-black/5 hover:border-black/20'
              }`}
            >
              <Checkbox checked={!!checkedTerms[i]} className="mt-0.5 rounded-sm" />
              <Label className="text-[12px] font-medium leading-relaxed text-black/70 cursor-pointer">
                {term}
              </Label>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <button type="button" onClick={() => setStep(5)} className="md:col-span-1 bg-black/5 text-black/40 rounded-sm py-5 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-black/10 flex items-center justify-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <button
            disabled={!allChecked}
            onClick={() => setStep(7)}
            className={`md:col-span-3 rounded-sm py-5 text-[14px] font-bold transition-all ${
              allChecked ? 'bg-black text-white hover:bg-black/90' : 'bg-black/10 text-black/20 cursor-not-allowed'
            }`}
          >
            Submit Final Registration
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 7: Success ───────────────────────────────────────────────────────
  return (
    <Shell step={step} selectedEventName={selectedEventName}>
      <div className="animate-in zoom-in fade-in duration-700 text-center space-y-10">
        <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/40">
          <Check className="w-10 h-10 stroke-[3px]" />
        </div>
        <div className="space-y-4">
          <h2 className="text-[32px] font-bold font-display tracking-tight text-black">Registration Received</h2>
          <p className="text-[15px] text-black/60 leading-relaxed max-w-[500px] mx-auto">
            Your application for the <strong>{selectedEventName}</strong> has been submitted. Our international panel will review your details and contact you regarding final approval.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => router.push('/')} className="px-10 py-5 bg-black text-white rounded-sm font-bold text-[14px] hover:scale-105 transition-all">
            Return to Home
          </button>
          <button onClick={() => router.push('/dashboard')} className="px-10 py-5 border border-black/10 rounded-sm font-bold text-[14px] hover:bg-black/5 transition-all">
            Go to Dashboard
          </button>
        </div>
      </div>
    </Shell>
  );
}

// ─── Layout Shell ───────────────────────────────────────────────────────────
const Shell = ({ children, step, selectedEventName }: { children: React.ReactNode; step: number; selectedEventName: string }) => (
  <main className="min-h-screen bg-white">
    <Navigation />
    <section className="pt-32 pb-24 lg:pt-48 lg:pb-32 bg-[#F5F5F0]">
      <div className="container mx-auto px-6 max-w-[860px]">
        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-16">
          {STEP_LABELS.map((label, idx) => {
            const num = idx + 1;
            const isActive = num === step;
            const isDone = num < step;
            return (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full text-[11px] font-bold flex items-center justify-center transition-all duration-500 ${
                    isDone ? 'bg-primary text-white' : isActive ? 'bg-black text-white' : 'bg-black/10 text-black/30'
                  }`}>
                    {isDone ? '✓' : num}
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest hidden md:block transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-black/30'
                  }`}>
                    {label}
                  </span>
                </div>
                {idx < STEP_LABELS.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 mb-5 rounded-full overflow-hidden bg-black/10">
                    <div className="h-full bg-primary transition-all duration-700" style={{ width: isDone ? '100%' : '0%' }} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white rounded-sm border border-black/5 shadow-sm overflow-hidden">
          <div className="border-b border-black/5 px-10 pt-10 pb-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/30 mb-3">
              Competition · {selectedEventName || 'Registration'}
            </p>
            <h2 className="text-[40px] md:text-[56px] font-display font-bold text-black leading-[0.9] tracking-tighter">
              {STEP_LABELS[step - 1]}
            </h2>
          </div>
          <div className="px-10 py-10">{children}</div>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);
