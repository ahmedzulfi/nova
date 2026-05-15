'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Plus, Minus, Dog, Cat, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
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
  const [otp, setOtp] = useState('');
  const [checkedTerms, setCheckedTerms] = useState<Record<number, boolean>>({});

  const [ownerData, setOwnerData] = useState({ fullName: '', email: '', phone: '' });
  const [adultQty, setAdultQty] = useState(1);
  const [kidsQty, setKidsQty] = useState(0);
  const [petQty, setPetQty] = useState(0);
  const [petName, setPetName] = useState('');

  const ADULT_PRICE = 25;
  const KID_PRICE = 15;
  const PET_FEE = 25;
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

  // ─── Step 1: Owner Info ────────────────────────────────────────────────────
  if (step === 1) return (
    <Shell step={step} labels={STEP_LABELS} selectedTier={selectedTier} total={total}>
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-3">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">{t('form.name')} *</Label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 rtl:right-5 rtl:left-auto" />
              <input
                type="text"
                placeholder={t('form.name_placeholder')}
                value={ownerData.fullName}
                onChange={(e) => setOwnerData({ ...ownerData, fullName: e.target.value })}
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm pl-12 pr-5 py-5 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px] placeholder:text-black/20 rtl:pr-12 rtl:pl-5"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">{t('form.email')} *</Label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 rtl:right-5 rtl:left-auto" />
              <input
                type="email"
                placeholder={t('form.email_placeholder')}
                value={ownerData.email}
                onChange={(e) => setOwnerData({ ...ownerData, email: e.target.value })}
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm pl-12 pr-5 py-5 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px] placeholder:text-black/20 rtl:pr-12 rtl:pl-5"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">{t('form.mobile')} *</Label>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 rtl:right-5 rtl:left-auto" />
              <input
                type="tel"
                placeholder={t('form.mobile_placeholder')}
                value={ownerData.phone}
                onChange={(e) => setOwnerData({ ...ownerData, phone: e.target.value })}
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm pl-12 pr-5 py-5 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px] placeholder:text-black/20 rtl:pr-12 rtl:pl-5"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setStep(2)}
          className="w-full bg-black text-white rounded-sm py-6 text-[14px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-primary  shadow-sm  shadow-black/10 mt-6"
        >
          {t('form.continue')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
        </button>
      </div>
    </Shell>
  );

  // ─── Step 2: OTP ──────────────────────────────────────────────────────────
  if (step === 2) return (
    <Shell step={step} labels={STEP_LABELS} selectedTier={selectedTier} total={total}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
        <div className="bg-[#F5F5F0] rounded-sm p-10 text-center space-y-8">
          <ShieldCheck className="w-16 h-16 mx-auto text-primary" />
          <div>
            <p className="text-[12px] font-bold text-black/40 uppercase tracking-[0.1em] mb-2">{t('otp.sent_to')}</p>
            <p className="font-bold text-[24px] tracking-tight text-black">{ownerData.phone || ownerData.email}</p>
          </div>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-12 h-16 md:w-16 md:h-20 rounded-sm border-2 flex items-center justify-center text-[28px] font-bold transition-all ${otp[i] ? 'border-primary bg-white text-black' : 'border-black/5 bg-white text-black/10'
                  }`}
              >
                {otp[i] || '·'}
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
          <button
            onClick={() => {
              const el = document.querySelector('input.sr-only') as HTMLInputElement;
              if (el) el.focus();
            }}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-primary transition-all"
          >
            {t('otp.tap')}
          </button>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setStep(3)}
            className="w-full bg-black text-white rounded-sm py-6 text-[14px] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.97] hover:bg-primary  shadow-sm  shadow-black/10"
          >
            {t('form.verify_btn')}
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 hover:text-black transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {t('form.back')}
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 3: Ticket Selection ─────────────────────────────────────────────
  if (step === 3) return (
    <Shell step={step} labels={STEP_LABELS} selectedTier={selectedTier} total={total}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">

        {selectedTier !== 'adult' && (
          <div className="border border-black/5 rounded-sm overflow-hidden shadow-sm">
            <div className="bg-primary px-10 py-6 flex items-center gap-5">
              <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center  shadow-sm ">
                {selectedTier === 'dog-owner' ? <Dog className="w-6 h-6 text-primary" /> : <Cat className="w-6 h-6 text-primary" />}
              </div>
              <div>
                <p className="font-bold text-white text-[16px] uppercase tracking-tight leading-none mb-1">
                  {t('tickets_sec.pet_details', { type: selectedTier === 'dog-owner' ? tTickets('tiers.dog.name') : tTickets('tiers.cat.name') })}
                </p>
                <p className="text-[11px] text-white/70 font-bold uppercase tracking-wider">
                  {selectedTier === 'dog-owner' ? t('tickets_sec.pet_helper') : t('tickets_sec.cat_helper')}
                </p>
              </div>
            </div>
            <div className="bg-[#F5F5F0]/30 p-10 space-y-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">{t('form.pet_name')} *</Label>
                <input
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder={t('form.pet_placeholder')}
                  className="w-full bg-white border border-black/5 rounded-sm px-6 py-5 outline-none focus:border-black transition-all font-bold text-[15px] shadow-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[16px] text-black tracking-tight">{t('tickets_sec.num_pets', { type: selectedTier === 'dog-owner' ? tTickets('tiers.dog.name') : tTickets('tiers.cat.name') })}</p>
                  <p className="text-[12px] text-black/30 font-bold">{t('tickets_sec.fee_msg')}</p>
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

        <div className="border border-black/5 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-black/5 px-10 py-5">
            <p className="font-bold text-[12px] uppercase tracking-[0.2em] text-black/60">{t('tickets_sec.visitor_tickets')}</p>
          </div>
          <div className="bg-white divide-y divide-black/5">
            <div className="px-10 py-8 flex items-center justify-between group">
              <div>
                <p className="font-bold text-[16px] text-black tracking-tight">{t('tickets_sec.adults')}</p>
                <p className="text-[12px] text-black/30 font-bold uppercase tracking-tight">{t('tickets_sec.adult_helper')}</p>
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
                <p className="font-bold text-[16px] text-black tracking-tight">{t('tickets_sec.kids')}</p>
                <p className="text-[12px] text-black/30 font-bold uppercase tracking-tight">{t('tickets_sec.kids_helper')}</p>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="md:col-span-1 bg-[#F5F5F0] text-black/40 rounded-sm py-6 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-black hover:text-white flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {t('form.back')}
          </button>
          <button
            type="button"
            onClick={() => setStep(4)}
            className="md:col-span-3 bg-black text-white rounded-sm py-6 text-[14px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-primary  shadow-sm  shadow-black/10"
          >
            {t('form.next_safety')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 4: Terms ────────────────────────────────────────────────────────
  if (step === 4) return (
    <Shell step={step} labels={STEP_LABELS} selectedTier={selectedTier} total={total}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
        <div className="flex items-center justify-between px-2">
          <p className="text-[12px] text-black/40 font-bold uppercase tracking-widest">
            {t('safety.required', { count: currentTerms.length })}
          </p>
          <span
            className={`text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-sm transition-all shadow-sm ${allChecked ? 'bg-green-100 text-green-700' : 'bg-black/5 text-black/30'
              }`}
          >
            {t('safety.agreed', { count: Object.values(checkedTerms).filter(Boolean).length, total: currentTerms.length })}
          </span>
        </div>

        <div className="space-y-3 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
          {currentTerms.map((term, i) => (
            <div
              key={i}
              onClick={() => toggleTerm(i)}
              className={`flex items-start gap-5 p-6 rounded-sm border cursor-pointer transition-all duration-300 ${checkedTerms[i] ? 'bg-green-50/50 border-green-200 shadow-sm' : 'bg-[#F5F5F0] border-black/5 hover:border-black/20'
                }`}
            >
              <Checkbox
                id={`term-${i}`}
                checked={!!checkedTerms[i]}
                onCheckedChange={() => toggleTerm(i)}
                className="mt-1 w-5 h-5 rounded-sm flex-shrink-0 border-black/10 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <Label htmlFor={`term-${i}`} className="text-[13px] md:text-[14px] font-bold leading-relaxed cursor-pointer text-black/70 tracking-tight">
                {term}
              </Label>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setStep(3)}
            className="md:col-span-1 bg-[#F5F5F0] text-black/40 rounded-sm py-6 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-black hover:text-white flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {t('form.back')}
          </button>
          <button
            type="button"
            onClick={() => allChecked && setStep(5)}
            className={`md:col-span-3 rounded-sm py-6 text-[14px] font-bold uppercase tracking-[0.2em] transition-all  shadow-sm  ${allChecked ? 'bg-black text-white hover:bg-primary active:scale-[0.97]' : 'bg-black/5 text-black/20 cursor-not-allowed shadow-none'
              }`}
          >
            {allChecked ? t('safety.continue_summary') : t('safety.agree_btn')}
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 5: Summary ──────────────────────────────────────────────────────
  return (
    <Shell step={step} labels={STEP_LABELS} selectedTier={selectedTier} total={total}>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
        <div className="bg-[#F5F5F0] rounded-sm p-10 space-y-4 border border-black/5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30 leading-none">{t('summary.attendee')}</p>
          <p className="font-bold text-[28px] tracking-tighter text-black leading-none">{ownerData.fullName}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <span className="px-3 py-1 bg-white rounded-sm text-[11px] font-bold text-black/40 uppercase border border-black/5">{ownerData.email}</span>
            <span className="px-3 py-1 bg-white rounded-sm text-[11px] font-bold text-black/40 uppercase border border-black/5">{ownerData.phone}</span>
          </div>
        </div>

        <div className="bg-white rounded-sm overflow-hidden border border-black/5 shadow-sm">
          <div className="divide-y divide-black/5 bg-[#F5F5F0]/20">
            <div className="flex justify-between items-center px-10 py-7">
              <div>
                <p className="font-bold text-[16px] text-black tracking-tight">{t('summary.adult_tickets')}</p>
                <p className="text-[12px] text-black/30 font-bold">QAR 25 × {adultQty}</p>
              </div>
              <p className="font-bold text-[20px] tracking-tight">QAR {adultQty * ADULT_PRICE}</p>
            </div>
            {kidsQty > 0 && (
              <div className="flex justify-between items-center px-10 py-7">
                <div>
                  <p className="font-bold text-[16px] text-black tracking-tight">{t('summary.kid_tickets')}</p>
                  <p className="text-[12px] text-black/30 font-bold">QAR 15 × {kidsQty}</p>
                </div>
                <p className="font-bold text-[20px] tracking-tight">QAR {kidsQty * KID_PRICE}</p>
              </div>
            )}
            {petQty > 0 && (
              <div className="flex justify-between items-center px-10 py-7">
                <div>
                  <p className="font-bold text-[16px] text-black tracking-tight">
                    {selectedTier === 'dog-owner' ? tTickets('tiers.dog.name') : tTickets('tiers.cat.name')} — {petName}
                  </p>
                  <p className="text-[12px] text-black/30 font-bold">QAR 25 × {petQty}</p>
                </div>
                <p className="font-bold text-[20px] tracking-tight">QAR {petQty * PET_FEE}</p>
              </div>
            )}
          </div>
          <div className="bg-black px-10 py-10 flex items-center justify-between">
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-white/40">{t('summary.total')}</p>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-[48px] text-primary tracking-tighter leading-none">QAR {total}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setStep(4)}
            className="md:col-span-1 bg-[#F5F5F0] text-black/40 rounded-sm py-6 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-black hover:text-white flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {t('form.back')}
          </button>
          <button
            type="button"
            onClick={handleFinish}
            className="md:col-span-3 bg-black text-white rounded-sm py-6 text-[15px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-primary  shadow-sm  shadow-black/20"
          >
            {t('form.finish')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </button>
        </div>
        <p className="text-[11px] text-center text-black/30 font-bold uppercase tracking-widest">
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
  <section className="py-20 md:py-32 bg-[#F5F5F0] min-h-screen">
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
                  className={`w-10 h-10 rounded-full text-[13px] font-bold flex items-center justify-center transition-all duration-700 shadow-sm ${isDone ? 'bg-primary text-white' : isActive ? 'bg-black text-white  shadow-sm ' : 'bg-black/5 text-black/20'
                    }`}
                >
                  {isDone ? '✓' : num}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.15em] hidden md:block transition-colors duration-300 ${isActive ? 'text-black' : 'text-black/30'
                    }`}
                >
                  {label}
                </span>
              </div>
              {idx < labels.length - 1 && (
                <div className="flex-1 h-[3px] mx-3 mb-7 rounded-full overflow-hidden bg-black/5">
                  <div
                    className="h-full bg-primary transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{ width: isDone ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Card */}
      <div className="bg-white rounded-sm border border-black/5  shadow-sm  overflow-hidden animate-in fade-in zoom-in-95 duration-700">
        <div className="border-b border-black/5 px-10 pt-12 pb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30 mb-4 leading-none">
            {selectedTier.replace('-', ' ')} · {step} / 5
          </p>
          <h2 className="text-[44px] md:text-[72px] font-display font-bold text-black leading-[0.9] tracking-tighter">
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
  <div className="flex items-center gap-0 border border-black/5 bg-[#F5F5F0] rounded-sm overflow-hidden shadow-inner">
    <button
      type="button"
      onClick={onDecrement}
      className="w-12 h-12 flex items-center justify-center text-black/40 hover:text-black hover:bg-black/5 transition-all active:scale-90"
    >
      <Minus className="w-5 h-5" />
    </button>
    <span className="w-14 text-center font-bold text-[18px] text-black">{value}</span>
    <button
      type="button"
      onClick={onIncrement}
      disabled={!canIncrement}
      className={`w-12 h-12 flex items-center justify-center transition-all active:scale-90 ${canIncrement ? 'bg-primary text-white  shadow-sm ' : 'bg-black/5 text-black/10 cursor-not-allowed shadow-none'
        }`}
    >
      <Plus className="w-5 h-5" />
    </button>
  </div>
);

export default TicketsCheckout;
