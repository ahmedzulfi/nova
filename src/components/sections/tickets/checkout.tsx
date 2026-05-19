'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Plus, Minus, Dog, Cat, ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';

interface TicketsCheckoutProps {
  selectedTier: string;
}

const TicketsCheckout = ({ selectedTier }: TicketsCheckoutProps) => {
  const router = useRouter();
  const t = useTranslations('Checkout');
  const tTickets = useTranslations('Tickets');

  const [step, setStep] = useState(1);
  const [checkedTerms, setCheckedTerms] = useState<Record<number, boolean>>({});

  const [ownerData, setOwnerData] = useState({ fullName: '', email: '', phone: '' });
  const [adultQty, setAdultQty] = useState(1);
  const [kidsQty, setKidsQty] = useState(0);
  const [petQty, setPetQty] = useState(0);
  const [petName, setPetName] = useState('');

  const ADULT_PRICE = 45;
  const KID_PRICE = 15;
  const PET_FEE = 45;
  const total = adultQty * ADULT_PRICE + kidsQty * KID_PRICE + petQty * PET_FEE;

  const STEP_LABELS = t.raw('steps') as string[];

  useEffect(() => {
    if (selectedTier === 'dog-owner') {
      if (petQty > adultQty) setPetQty(adultQty);
      if (petQty === 0) setPetQty(1);
    } else if (selectedTier === 'cat-owner') {
      if (petQty > 2) setPetQty(2);
      if (petQty === 0) setPetQty(1);
    } else {
      setPetQty(0);
    }
  }, [adultQty, selectedTier]);

  useEffect(() => {
    setStep(1);
    setAdultQty(1);
    setKidsQty(0);
    setPetQty(selectedTier === 'adult' ? 0 : 1);
    setCheckedTerms({});
  }, [selectedTier]);

  const handleFinish = () => {
    const registration = {
      ...ownerData,
      tier: selectedTier,
      adultQty,
      kidsQty,
      petQty,
      petName,
      total,
      orderId: `#NPV-2026-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    };
    localStorage.setItem('nova_registration', JSON.stringify(registration));
    router.push('/dashboard');
  };

  const dogTerms = t.raw('terms.dog') as string[];
  const catTerms = t.raw('terms.cat') as string[];
  const adultTerms = t.raw('terms.adult') as string[];

  const currentTerms = selectedTier === 'dog-owner' ? dogTerms : selectedTier === 'cat-owner' ? catTerms : adultTerms;
  const allChecked = currentTerms.every((_, i) => checkedTerms[i]);

  const toggleTerm = (i: number) =>
    setCheckedTerms((prev) => ({ ...prev, [i]: !prev[i] }));

  const isStep1Valid =
    ownerData.fullName.trim() !== '' &&
    ownerData.email.trim() !== '' &&
    ownerData.phone.trim() !== '' &&
    (selectedTier === 'adult' || petName.trim() !== '');

  // ─── Step 1: Tickets & Details ─────────────────────────────────────────────
  if (step === 1) return (
    <Shell step={step} labels={STEP_LABELS} selectedTier={selectedTier} total={total}>
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        
        {/* Section 1: Contact Details */}
        <div className="border border-[#E9E9E7] rounded-sm overflow-hidden bg-white">
          <div className="bg-[#F7F6F3] border-b border-[#E9E9E7] px-10 py-5">
            <p className="font-bold text-[12px] uppercase tracking-[0.2em] text-[#37352F]">{t('form.details') || 'Contact Details'}</p>
          </div>
          <div className="p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">{t('form.name')} *</Label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E] rtl:right-5 rtl:left-auto" />
                  <input
                    type="text"
                    required
                    placeholder={t('form.name_placeholder')}
                    value={ownerData.fullName}
                    onChange={(e) => setOwnerData({ ...ownerData, fullName: e.target.value })}
                    className="w-full bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm pl-12 pr-5 py-4 outline-none focus:border-[#37352F] focus:bg-white transition-all font-medium text-[#37352F] text-[14px] placeholder:text-[#91918E]/50 rtl:pr-12 rtl:pl-5"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">{t('form.email')} *</Label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E] rtl:right-5 rtl:left-auto" />
                  <input
                    type="email"
                    required
                    placeholder={t('form.email_placeholder')}
                    value={ownerData.email}
                    onChange={(e) => setOwnerData({ ...ownerData, email: e.target.value })}
                    className="w-full bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm pl-12 pr-5 py-4 outline-none focus:border-[#37352F] focus:bg-white transition-all font-medium text-[#37352F] text-[14px] placeholder:text-[#91918E]/50 rtl:pr-12 rtl:pl-5"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">{t('form.mobile')} *</Label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91918E] rtl:right-5 rtl:left-auto" />
                  <input
                    type="tel"
                    required
                    placeholder={t('form.mobile_placeholder')}
                    value={ownerData.phone}
                    onChange={(e) => setOwnerData({ ...ownerData, phone: e.target.value })}
                    className="w-full bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm pl-12 pr-5 py-4 outline-none focus:border-[#37352F] focus:bg-white transition-all font-medium text-[#37352F] text-[14px] placeholder:text-[#91918E]/50 rtl:pr-12 rtl:pl-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Ticket Selection */}
        {selectedTier !== 'adult' && (
          <div className="border border-[#E9E9E7] rounded-sm overflow-hidden bg-white">
            <div className="bg-[#37352F] px-10 py-6 flex items-center gap-5">
              <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center">
                {selectedTier === 'dog-owner' ? <Dog className="w-6 h-6 text-white" /> : <Cat className="w-6 h-6 text-white" />}
              </div>
              <div>
                <p className="font-bold text-white text-[16px] uppercase tracking-tight leading-none mb-1">
                  {t('tickets_sec.pet_details', { type: selectedTier === 'dog-owner' ? tTickets('tiers.dog.name') : tTickets('tiers.cat.name') })}
                </p>
                <p className="text-[11px] text-white/60 font-bold uppercase tracking-wider">
                  {selectedTier === 'dog-owner' ? t('tickets_sec.pet_helper') : t('tickets_sec.cat_helper')}
                </p>
              </div>
            </div>
            <div className="p-10 space-y-8 border-t border-[#E9E9E7]">
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#91918E]">{t('form.pet_name')} *</Label>
                <input
                  required
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder={t('form.pet_placeholder')}
                  className="w-full bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm px-6 py-4 outline-none focus:border-[#37352F] focus:bg-white transition-all font-medium text-[#37352F] text-[14px] placeholder:text-[#91918E]/50"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[16px] text-[#37352F] tracking-tight">{t('tickets_sec.num_pets', { type: selectedTier === 'dog-owner' ? tTickets('tiers.dog.name') : tTickets('tiers.cat.name') })}</p>
                  <p className="text-[12px] text-[#91918E] font-medium">{t('tickets_sec.fee_msg')}</p>
                </div>
                <QtyControl
                  value={petQty}
                  onDecrement={() => setPetQty(Math.max(1, petQty - 1))}
                  onIncrement={() => {
                    if (selectedTier === 'dog-owner' && petQty < adultQty) setPetQty(petQty + 1);
                    if (selectedTier === 'cat-owner' && petQty < 2) setPetQty(petQty + 1);
                  }}
                  canIncrement={selectedTier === 'dog-owner' ? petQty < adultQty : petQty < 2}
                />
              </div>
            </div>
          </div>
        )}

        <div className="border border-[#E9E9E7] rounded-sm overflow-hidden bg-white">
          <div className="bg-[#F7F6F3] border-b border-[#E9E9E7] px-10 py-5">
            <p className="font-bold text-[12px] uppercase tracking-[0.2em] text-[#37352F]">{t('tickets_sec.visitor_tickets')}</p>
          </div>
          <div className="divide-y divide-[#E9E9E7]">
            <div className="px-10 py-8 flex items-center justify-between group">
              <div>
                <p className="font-bold text-[16px] text-[#37352F] tracking-tight">{t('tickets_sec.adults')}</p>
                <p className="text-[12px] text-[#91918E] font-medium uppercase tracking-tight">{t('tickets_sec.adult_helper')}</p>
              </div>
              <QtyControl
                value={adultQty}
                onDecrement={() => setAdultQty(Math.max(1, adultQty - 1))}
                onIncrement={() => setAdultQty(adultQty + 1)}
                canIncrement={true}
              />
            </div>
            <div className="px-10 py-8 flex items-center justify-between group">
              <div>
                <p className="font-bold text-[16px] text-[#37352F] tracking-tight">{t('tickets_sec.kids')}</p>
                <p className="text-[12px] text-[#91918E] font-medium uppercase tracking-tight">{t('tickets_sec.kids_helper')}</p>
              </div>
              <QtyControl
                value={kidsQty}
                onDecrement={() => setKidsQty(Math.max(0, kidsQty - 1))}
                onIncrement={() => setKidsQty(kidsQty + 1)}
                canIncrement={true}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={!isStep1Valid}
          onClick={() => setStep(2)}
          className={`w-full rounded-sm py-5 text-[13px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
            isStep1Valid
              ? 'bg-[#37352F] hover:bg-black text-white active:scale-[0.97]'
              : 'bg-[#F1F1EF] text-[#91918E] cursor-not-allowed'
          }`}
        >
          {t('form.next_safety') || 'Next: Safety & Terms'} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>
    </Shell>
  );

  // ─── Step 2: Safety & Summary ──────────────────────────────────────────────
  return (
    <Shell step={step} labels={STEP_LABELS} selectedTier={selectedTier} total={total}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
        
        {/* Safety Terms Section */}
        <div className="border border-[#E9E9E7] rounded-sm overflow-hidden bg-white">
          <div className="bg-[#F7F6F3] px-10 py-5 flex items-center justify-between border-b border-[#E9E9E7]">
            <p className="font-bold text-[12px] uppercase tracking-[0.2em] text-[#37352F]">{t('safety.required', { count: currentTerms.length })}</p>
            <span
              className={`text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-sm transition-all ${allChecked ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-[#F1F1EF] text-[#91918E]'
                }`}
            >
              {t('safety.agreed', { count: Object.values(checkedTerms).filter(Boolean).length, total: currentTerms.length })}
            </span>
          </div>
          
          <div className="p-10 space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {currentTerms.map((term, i) => (
              <div
                key={i}
                onClick={() => toggleTerm(i)}
                className={`flex items-start gap-5 p-6 rounded-sm border cursor-pointer transition-all duration-300 ${checkedTerms[i] ? 'bg-[#FACC15]/5 border-[#FACC15]/20' : 'bg-[#F7F6F3] border-transparent hover:border-[#E9E9E7]'
                  }`}
              >
                <Checkbox
                  id={`term-${i}`}
                  checked={!!checkedTerms[i]}
                  onCheckedChange={() => toggleTerm(i)}
                  className="mt-1 w-5 h-5 rounded-sm flex-shrink-0 border-[#E9E9E7] data-[state=checked]:bg-[#37352F] data-[state=checked]:border-[#37352F]"
                />
                <Label htmlFor={`term-${i}`} className="text-[13px] md:text-[14px] font-medium leading-relaxed cursor-pointer text-[#37352F] tracking-tight">
                  {term}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="space-y-6">
          <div className="bg-[#F7F6F3] rounded-sm p-10 space-y-4 border border-[#E9E9E7]">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#91918E] leading-none">{t('summary.attendee')}</p>
            <p className="font-bold text-[28px] tracking-tighter text-[#37352F] leading-none">{ownerData.fullName}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <span className="px-3 py-1 bg-white rounded-sm text-[11px] font-bold text-[#91918E] uppercase border border-[#E9E9E7]">{ownerData.email}</span>
              <span className="px-3 py-1 bg-white rounded-sm text-[11px] font-bold text-[#91918E] uppercase border border-[#E9E9E7]">{ownerData.phone}</span>
            </div>
          </div>

          <div className="bg-white rounded-sm overflow-hidden border border-[#E9E9E7]">
            <div className="divide-y divide-[#E9E9E7] bg-[#F7F6F3]/20">
              <div className="flex justify-between items-center px-10 py-7">
                <div>
                  <p className="font-bold text-[16px] text-[#37352F] tracking-tight">{t('summary.adult_tickets')}</p>
                  <p className="text-[12px] text-[#91918E] font-medium">QAR {ADULT_PRICE} × {adultQty}</p>
                </div>
                <p className="font-bold text-[20px] text-[#37352F] tracking-tight">QAR {adultQty * ADULT_PRICE}</p>
              </div>
              {kidsQty > 0 && (
                <div className="flex justify-between items-center px-10 py-7">
                  <div>
                    <p className="font-bold text-[16px] text-[#37352F] tracking-tight">{t('summary.kid_tickets')}</p>
                    <p className="text-[12px] text-[#91918E] font-medium">QAR {KID_PRICE} × {kidsQty}</p>
                  </div>
                  <p className="font-bold text-[20px] text-[#37352F] tracking-tight">QAR {kidsQty * KID_PRICE}</p>
                </div>
              )}
              {petQty > 0 && (
                <div className="flex justify-between items-center px-10 py-7">
                  <div>
                    <p className="font-bold text-[16px] text-[#37352F] tracking-tight">
                      {selectedTier === 'dog-owner' ? tTickets('tiers.dog.name') : tTickets('tiers.cat.name')} — {petName}
                    </p>
                    <p className="text-[12px] text-[#91918E] font-medium">QAR {PET_FEE} × {petQty}</p>
                  </div>
                  <p className="font-bold text-[20px] text-[#37352F] tracking-tight">QAR {petQty * PET_FEE}</p>
                </div>
              )}
            </div>
            <div className="bg-[#F7F6F3] border-t border-[#E9E9E7] px-10 py-8 flex items-center justify-between">
              <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#91918E]">{t('summary.total')}</p>
              <span className="font-display font-bold text-[36px] text-[#37352F] tracking-tighter leading-none">QAR {total}</span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="md:col-span-1 bg-white border border-[#E9E9E7] text-[#37352F] rounded-sm py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#F7F6F3] flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {t('form.back')}
          </button>
          <button
            type="button"
            disabled={!allChecked}
            onClick={handleFinish}
            className={`md:col-span-3 rounded-sm py-5 text-[13px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
              allChecked
                ? 'bg-[#37352F] hover:bg-black text-white active:scale-[0.97]'
                : 'bg-[#F1F1EF] text-[#91918E] cursor-not-allowed'
            }`}
          >
            {t('form.finish')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
        <p className="text-[11px] text-center text-[#91918E] font-medium uppercase tracking-widest">
          {t('form.secure_msg')}
        </p>
      </div>
    </Shell>
  );
};

// ─── Shared Layout Shell ───────────────────────────────────────────────────
const Shell = ({
  children,
  step,
  labels,
  selectedTier,
  total
}: {
  children: React.ReactNode;
  step: number;
  labels: string[];
  selectedTier: string;
  total: number;
}) => (
  <section className="py-20 md:py-32 bg-[#F7F6F3] min-h-screen">
    <div className="container mx-auto px-6 max-w-[860px]">
      {/* Step Indicator */}
      <div className="flex items-center gap-0 mb-16 px-4">
        {labels.map((label, idx) => {
          const num = idx + 1;
          const isActive = num === step;
          const isDone = num < step;
          return (
            <React.Fragment key={num}>
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-sm text-[13px] font-bold flex items-center justify-center transition-all duration-700 ${isDone ? 'bg-[#37352F] text-white' : isActive ? 'bg-[#FACC15] text-[#37352F]' : 'bg-[#E9E9E7] text-[#91918E]'
                    }`}
                >
                  {isDone ? '✓' : num}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.15em] hidden md:block transition-colors duration-300 ${isActive ? 'text-[#37352F]' : 'text-[#91918E]'
                    }`}
                >
                  {label}
                </span>
              </div>
              {idx < labels.length - 1 && (
                <div className="flex-1 h-[3px] mx-3 mb-7 rounded-full overflow-hidden bg-[#E9E9E7]">
                  <div
                    className="h-full bg-[#37352F] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{ width: isDone ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Card */}
      <div className="bg-white rounded-sm border border-[#E9E9E7] overflow-hidden animate-in fade-in zoom-in-95 duration-700 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="border-b border-[#E9E9E7] px-10 pt-12 pb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#91918E] mb-4 leading-none">
            {selectedTier.replace('-', ' ')} · {step} / {labels.length}
          </p>
          <h2 className="text-[36px] md:text-[54px] font-display font-bold text-[#37352F] leading-[0.9] tracking-tighter">
            {labels[step - 1]}
          </h2>
        </div>
        <div className="px-10 py-12">{children}</div>
      </div>
    </div>
  </section>
);

const QtyControl = ({
  value, onDecrement, onIncrement, canIncrement,
}: {
  value: number; onDecrement: () => void; onIncrement: () => void; canIncrement: boolean;
}) => (
  <div className="flex items-center gap-0 border border-[#E9E9E7] bg-[#F7F6F3] rounded-sm overflow-hidden">
    <button
      type="button"
      onClick={onDecrement}
      className="w-12 h-12 flex items-center justify-center text-[#91918E] hover:text-[#37352F] hover:bg-black/[0.02] transition-all active:scale-90"
    >
      <Minus className="w-5 h-5" />
    </button>
    <span className="w-14 text-center font-bold text-[18px] text-[#37352F]">{value}</span>
    <button
      type="button"
      onClick={onIncrement}
      disabled={!canIncrement}
      className={`w-12 h-12 flex items-center justify-center transition-all active:scale-90 ${canIncrement ? 'bg-[#37352F] text-white' : 'bg-[#E9E9E7] text-[#91918E] cursor-not-allowed shadow-none'
        }`}
    >
      <Plus className="w-5 h-5" />
    </button>
  </div>
);

export default TicketsCheckout;
