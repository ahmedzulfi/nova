"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import EventSelectionGrid from "@/components/sections/event-selection-grid";
import { ArrowLeft, Check, Upload, Info, ShieldCheck, ArrowRight, User, Phone } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

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

  const STEP_KEYS = ['selection', 'owner', 'pet_info', 'specifics', 'health', 'safety', 'done'];
  const STEP_LABELS = STEP_KEYS.map(key => t(`steps.${key}`));

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
      }
    }
  }, [searchParams, tComp]);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    petName: "",
    breed: "",
    age: "",
    groomerExperience: "",
    groomingCategory: "",
    outfitDescription: "",
    drawingExperience: "",
    drawingMaterials: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem('nova_registration');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(prev => ({
        ...prev,
        fullName: parsed.fullName || "",
        phone: parsed.phone || "",
        email: parsed.email || "",
      }));
    }
  }, []);

  const handleEventSelect = (eventId: string, eventTitle: string) => {
    setSelectedEventId(eventId as CompetitionType);
    setSelectedEventName(eventTitle);
    setStep(2);
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

  // ─── Step 1: Selection ─────────────────────────────────────────────────────
  if (step === 1) return (
    <Shell step={step} selectedEventName={selectedEventName} stepLabels={STEP_LABELS} t={t}>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        <EventSelectionGrid onSelect={handleEventSelect} selectedEventId={selectedEventId} />
      </div>
    </Shell>
  );

  // ─── Step 2: Owner Info & OTP ──────────────────────────────────────────────
  if (step === 2) return (
    <Shell step={step} selectedEventName={selectedEventName} stepLabels={STEP_LABELS} t={t}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('owner.labels.full_name')}</Label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20 rtl:left-auto rtl:right-6" />
              <input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={t('owner.labels.placeholder_name')}
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-full pl-14 pr-8 py-5 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[15px] rtl:pl-8 rtl:pr-14 rtl:text-right"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('owner.labels.mobile')}</Label>
            <div className="relative">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20 rtl:left-auto rtl:right-6" />
              <input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t('owner.labels.placeholder_phone')}
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-full pl-14 pr-8 py-5 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[15px] rtl:pl-8 rtl:pr-14 rtl:text-right"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#F5F5F0]  rounded-sm  p-10 text-center space-y-8 border border-black/5">
          <ShieldCheck className="w-14 h-14 mx-auto text-primary" />
          <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-black/40">{t('owner.verification.title')}</p>
          <div className="flex justify-center gap-4 rtl:flex-row-reverse">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-12 h-18 rounded-sm border-2 flex items-center justify-center text-[24px] font-bold transition-all shadow-sm ${otp[i] ? 'border-black bg-white scale-105' : 'border-black/5 bg-white opacity-40'}`}>
                {otp[i] || <span className="text-black/5">·</span>}
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
          <button onClick={() => setStep(3)} className="w-full bg-black text-white rounded-full py-6 text-[14px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-primary shadow-2xl shadow-black/10">
            {t('owner.verification.cta')}
          </button>
        </div>

        <button onClick={() => setStep(1)} className="w-full py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-black/20 hover:text-black transition-all flex items-center justify-center gap-3 rtl:flex-row-reverse">
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {t('owner.verification.change_comp')}
        </button>
      </div>
    </Shell>
  );

  // ─── Step 3: Pet Info ──────────────────────────────────────────────────────
  if (step === 3) return (
    <Shell step={step} selectedEventName={selectedEventName} stepLabels={STEP_LABELS} t={t}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('pet.labels.name')}</Label>
            <input
              value={formData.petName}
              onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
              placeholder={t('pet.labels.placeholder_name')}
              className="w-full bg-[#F5F5F0] border border-black/5 rounded-full px-8 py-5 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[15px] rtl:text-right"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('pet.labels.breed')}</Label>
            <input
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              placeholder={t('pet.labels.placeholder_breed')}
              className="w-full bg-[#F5F5F0] border border-black/5 rounded-full px-8 py-5 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[15px] rtl:text-right"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('pet.labels.age')}</Label>
            <input
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder={t('pet.labels.placeholder_age')}
              className="w-full bg-[#F5F5F0] border border-black/5 rounded-full px-8 py-5 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[15px] rtl:text-right"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button type="button" onClick={() => setStep(2)} className="md:col-span-1 bg-black/5 text-black/40 rounded-full py-6 text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-black/10 flex items-center justify-center gap-3 rtl:flex-row-reverse">
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {t('navigation.back')}
          </button>
          <button onClick={() => setStep(4)} className="md:col-span-3 bg-black text-white rounded-full py-6 text-[14px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all hover:bg-primary shadow-2xl shadow-black/10">
            {t('navigation.next_details')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 4: Specifics ─────────────────────────────────────────────────────
  if (step === 4) return (
    <Shell step={step} selectedEventName={selectedEventName} stepLabels={STEP_LABELS} t={t}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-12">
        {selectedEventId === 'dog-grooming' && (
          <div className="space-y-8">
            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('specifics.grooming.label_category')}</Label>
              <Select onValueChange={(val) => setFormData({ ...formData, groomingCategory: val })}>
                <SelectTrigger className="w-full h-16 bg-[#F5F5F0] border-black/5 rounded-full px-8 font-bold text-[15px] rtl:flex-row-reverse">
                  <SelectValue placeholder={t('specifics.grooming.placeholder_cat')} />
                </SelectTrigger>
                <SelectContent className=" rounded-sm  border-black/5 p-2">
                  <SelectItem value="dog-figure" className="rounded-full py-3">{t('specifics.grooming.cat_figure')}</SelectItem>
                  <SelectItem value="real-dog" className="rounded-full py-3">{t('specifics.grooming.cat_real')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('specifics.grooming.label_experience')}</Label>
              <input
                value={formData.groomerExperience}
                onChange={(e) => setFormData({ ...formData, groomerExperience: e.target.value })}
                placeholder={t('specifics.grooming.placeholder_experience')}
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-full px-8 py-5 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[15px] rtl:text-right"
              />
            </div>
          </div>
        )}

        {(selectedEventId === 'dog-fashion-show' || selectedEventId === 'cat-fashion-show') && (
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('specifics.fashion.label_theme')}</Label>
            <Textarea
              value={formData.outfitDescription}
              onChange={(e) => setFormData({ ...formData, outfitDescription: e.target.value })}
              placeholder={t('specifics.fashion.placeholder_theme')}
              className="w-full bg-[#F5F5F0] border-black/5  rounded-sm  min-h-[180px] font-bold text-[15px] p-8 focus:border-black focus:bg-white transition-all rtl:text-right"
            />
          </div>
        )}

        {selectedEventId === 'cat-drawing-battle' && (
          <div className="space-y-8">
            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('specifics.drawing.label_exp')}</Label>
              <input
                value={formData.drawingExperience}
                onChange={(e) => setFormData({ ...formData, drawingExperience: e.target.value })}
                placeholder={t('specifics.drawing.placeholder_exp')}
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-full px-8 py-5 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[15px] rtl:text-right"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('specifics.drawing.label_materials')}</Label>
              <Textarea
                value={formData.drawingMaterials}
                onChange={(e) => setFormData({ ...formData, drawingMaterials: e.target.value })}
                placeholder={t('specifics.drawing.placeholder_materials')}
                className="w-full bg-[#F5F5F0] border-black/5  rounded-sm  min-h-[150px] font-bold text-[15px] p-8 focus:border-black focus:bg-white transition-all rtl:text-right"
              />
            </div>
          </div>
        )}

        {selectedEventId.includes('best-') && (
          <div className="bg-[#F5F5F0] p-12  rounded-sm  text-center border border-black/5">
            <Info className="w-12 h-12 mx-auto text-primary mb-6" />
            <p className="text-[18px] font-bold text-black tracking-tight">{t('specifics.none.title')}</p>
            <p className="text-[12px] text-black/30 uppercase tracking-[0.3em] mt-4">{t('specifics.none.desc')}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button type="button" onClick={() => setStep(3)} className="md:col-span-1 bg-black/5 text-black/40 rounded-full py-6 text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-black/10 flex items-center justify-center gap-3 rtl:flex-row-reverse">
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {t('navigation.back')}
          </button>
          <button onClick={() => setStep(5)} className="md:col-span-3 bg-black text-white rounded-full py-6 text-[14px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all hover:bg-primary shadow-2xl shadow-black/10">
            {t('navigation.next_health')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 5: Compliance ────────────────────────────────────────────────────
  if (step === 5) return (
    <Shell step={step} selectedEventName={selectedEventName} stepLabels={STEP_LABELS} t={t}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('health.passport')}</Label>
            <div className="h-60 border-2 border-dashed border-black/10  rounded-sm  bg-[#F5F5F0] flex flex-col items-center justify-center text-black/20 hover:border-primary hover:text-primary transition-all cursor-pointer group">
              <Upload className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-[12px] font-bold uppercase tracking-[0.3em]">{t('health.cta_passport')}</span>
              <p className="text-[10px] mt-3 opacity-50 uppercase tracking-widest">{t('health.hint')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 block rtl:text-right">{t('health.vaccination')}</Label>
            <div className="h-60 border-2 border-dashed border-black/10  rounded-sm  bg-[#F5F5F0] flex flex-col items-center justify-center text-black/20 hover:border-primary hover:text-primary transition-all cursor-pointer group">
              <Upload className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-[12px] font-bold uppercase tracking-[0.3em]">{t('health.cta_vaccination')}</span>
              <p className="text-[10px] mt-3 opacity-50 uppercase tracking-widest">{t('health.hint')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button type="button" onClick={() => setStep(4)} className="md:col-span-1 bg-black/5 text-black/40 rounded-full py-6 text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-black/10 flex items-center justify-center gap-3 rtl:flex-row-reverse">
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {t('navigation.back')}
          </button>
          <button onClick={() => setStep(6)} className="md:col-span-3 bg-black text-white rounded-full py-6 text-[14px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all hover:bg-primary shadow-2xl shadow-black/10">
            {t('navigation.next_safety')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 6: Safety ────────────────────────────────────────────────────────
  if (step === 6) return (
    <Shell step={step} selectedEventName={selectedEventName} stepLabels={STEP_LABELS} t={t}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-12">
        <div className="space-y-4">
          {currentTerms.map((term, i) => (
            <div
              key={i}
              onClick={() => setCheckedTerms(prev => ({ ...prev, [i]: !prev[i] }))}
              className={`flex items-start gap-5 p-8  rounded-sm  border cursor-pointer transition-all ${checkedTerms[i] ? 'bg-primary/5 border-primary/20' : 'bg-[#F5F5F0] border-black/5 hover:border-black/20'
                } rtl:flex-row-reverse`}
            >
              <Checkbox checked={!!checkedTerms[i]} className="mt-1 w-6 h-6 rounded-sm border-black/10" />
              <Label className="text-[15px] font-bold leading-relaxed text-black/60 cursor-pointer flex-1 rtl:text-right">
                {term}
              </Label>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button type="button" onClick={() => setStep(5)} className="md:col-span-1 bg-black/5 text-black/40 rounded-full py-6 text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-black/10 flex items-center justify-center gap-3 rtl:flex-row-reverse">
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {t('navigation.back')}
          </button>
          <button
            disabled={!allChecked}
            onClick={() => {
              const existingData = localStorage.getItem('nova_registration');
              if (existingData) {
                const parsed = JSON.parse(existingData);
                localStorage.setItem('nova_registration', JSON.stringify({
                  ...parsed,
                  competitionEntry: selectedEventName,
                  entryDate: new Date().toISOString()
                }));
              }
              setStep(7);
            }}
            className={`md:col-span-3 rounded-full py-6 text-[14px] font-bold uppercase tracking-[0.2em] transition-all shadow-2xl ${allChecked ? 'bg-black text-white hover:bg-primary shadow-black/10' : 'bg-black/10 text-black/20 cursor-not-allowed shadow-none'
              }`}
          >
            {t('safety.cta')}
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 7: Success ───────────────────────────────────────────────────────
  return (
    <Shell step={step} selectedEventName={selectedEventName} stepLabels={STEP_LABELS} t={t}>
      <div className="animate-in zoom-in fade-in duration-1000 text-center space-y-12 py-10">
        <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/40">
          <Check className="w-12 h-12 stroke-[4px]" />
        </div>
        <div className="space-y-6">
          <h2 className="text-[40px] md:text-[56px] font-bold font-display tracking-tighter text-black leading-none">{t('success.title')}</h2>
          <p className="text-[18px] text-black/40 leading-relaxed max-w-[600px] mx-auto font-medium">
            {t.rich('success.desc', {
              event: (chunks) => <strong className="text-black font-bold">{selectedEventName}</strong>
            })}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
          <button onClick={() => router.push('/')} className="px-14 py-6 bg-black text-white rounded-full font-bold text-[14px] uppercase tracking-[0.2em] hover:bg-primary hover:scale-105 transition-all shadow-2xl shadow-black/10">
            {t('success.cta_home')}
          </button>
          <button onClick={() => router.push('/dashboard')} className="px-14 py-6 border-2 border-black/5 rounded-full font-bold text-[14px] uppercase tracking-[0.2em] hover:bg-black/5 transition-all">
            {t('success.cta_dashboard')}
          </button>
        </div>
      </div>
    </Shell>
  );
}

const Shell = ({ children, step, selectedEventName, stepLabels, t }: { children: React.ReactNode; step: number; selectedEventName: string, stepLabels: string[], t: any }) => (
  <main className="min-h-screen bg-white">
    <Navigation />
    <section className="pt-32 pb-24 lg:pt-48 lg:pb-32 bg-[#F5F5F0]">
      <div className="container mx-auto px-6 max-w-[1000px]">
        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-20 rtl:flex-row-reverse">
          {stepLabels.map((label, idx) => {
            const num = idx + 1;
            const isActive = num === step;
            const isDone = num < step;
            return (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-10 h-10 rounded-full text-[12px] font-bold flex items-center justify-center transition-all duration-700 shadow-sm ${isDone ? 'bg-primary text-white scale-90' : isActive ? 'bg-black text-white scale-110 shadow-2xl' : 'bg-black/5 text-black/20'
                    }`}>
                    {isDone ? '✓' : num}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] hidden md:block transition-all duration-500 ${isActive ? 'text-black opacity-100 scale-105' : 'text-black/20 opacity-40'
                    }`}>
                    {label}
                  </span>
                </div>
                {idx < stepLabels.length - 1 && (
                  <div className="flex-1 h-[3px] mx-4 mb-8 rounded-full overflow-hidden bg-black/5">
                    <div className="h-full bg-primary transition-all duration-1000 ease-in-out" style={{ width: isDone ? '100%' : '0%' }} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white  rounded-sm  border border-black/5 shadow-2xl shadow-black/5 overflow-hidden animate-in fade-in zoom-in-95 duration-1000">
          <div className="border-b border-black/5 px-12 pt-16 pb-12 bg-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-black/20 mb-4 block rtl:text-right">
                Competition · {selectedEventName || t('steps.selection')}
              </p>
              <h2 className="text-[48px] md:text-[84px] font-display font-bold text-black leading-[0.85] tracking-tighter rtl:text-right">
                {stepLabels[step - 1]}
              </h2>
            </div>
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          </div>
          <div className="px-12 py-16">{children}</div>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default function RegistrationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center font-bold font-display uppercase tracking-widest text-black/20">Loading Nova Studio...</div>}>
      <RegistrationContent />
    </Suspense>
  );
}
