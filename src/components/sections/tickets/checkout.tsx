'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Plus, Minus, Dog, Cat, ArrowRight, ShieldCheck } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TicketsCheckoutProps {
  selectedTier: string;
}

const STEP_LABELS = ['Your Info', 'Verify', 'Tickets', 'Safety', 'Summary'];

const TicketsCheckout = ({ selectedTier }: TicketsCheckoutProps) => {
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
    window.location.href = '/dashboard';
  };

  const dogTerms = [
    'I am fully responsible for my dog and children at all times during the event.',
    "My dog's vaccination is up to date and I have a valid pet passport for verification.",
    'If my dog is medium or large-sized, they will arrive wearing a muzzle.',
    'My dog will be on a secure, non-extendable leash at all times.',
    'My dog will wear a secure collar or harness at all times.',
    'I understand female dogs in heat are strictly not allowed.',
    'I understand aggressive dogs are not allowed, even if muzzled.',
    'Sick, injured, or visibly unwell dogs are not allowed to enter.',
    'Shock chains, prong collars, and harmful equipment are prohibited.',
    'I will carry waste bags and clean after my dog immediately.',
    'I agree to photo and video coverage during the event.',
    'Staff reserve the right to refuse entry to any unsafe dog.',
    'I accept full responsibility for any injury or damage caused by my dog.',
  ];
  const catTerms = [
    'Cats must remain in their carrier unless participating in an official activity.',
    'All cats must be vaccinated with a valid pet passport available.',
    'Entry may be denied if vaccination records are not provided.',
    'I agree to photo and video coverage during the event.',
    'The organizer is not liable for incidents caused by negligence.',
  ];
  const adultTerms = [
    'I agree to photo and video coverage during the festival.',
    'I am fully responsible for supervising my children at all times.',
    'Do not approach or touch pets without the owner\'s permission.',
    'I will follow all staff guidance and safety instructions.',
    'The organizer is not liable for incidents from rule violations.',
  ];
  const currentTerms = selectedTier === 'dog-owner' ? dogTerms : selectedTier === 'cat-owner' ? catTerms : adultTerms;
  const allChecked = currentTerms.every((_, i) => checkedTerms[i]);

  const toggleTerm = (i: number) =>
    setCheckedTerms((prev) => ({ ...prev, [i]: !prev[i] }));

  // ─── Shared Layout Shell ───────────────────────────────────────────────────
  const Shell = ({ children }: { children: React.ReactNode }) => (
    <section className="py-20 md:py-32 bg-[#F5F5F0] min-h-screen">
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
                  <div
                    className={`w-8 h-8 rounded-full text-[11px]  font-bold  flex items-center justify-center transition-all duration-500 ${
                      isDone ? 'bg-primary text-white' : isActive ? 'bg-black text-white' : 'bg-black/10 text-black/30'
                    }`}
                  >
                    {isDone ? '✓' : num}
                  </div>
                  <span
                    className={`text-[9px]  font-bold  uppercase tracking-widest hidden md:block transition-colors duration-300 ${
                      isActive ? 'text-black' : 'text-black/30'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {idx < STEP_LABELS.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 mb-5 rounded-full overflow-hidden bg-black/10">
                    <div
                      className="h-full bg-primary transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      style={{ width: isDone ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white rounded-sm border border-black/5 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="border-b border-black/5 px-10 pt-10 pb-8">
            <p className="text-[9px]  font-bold  uppercase tracking-[0.3em] text-black/30 mb-3">
              {selectedTier.replace('-', ' ')} · Step {step} of 5
            </p>
            <h2 className="text-[40px] md:text-[56px] font-display  font-bold  text-black leading-[0.9] tracking-tighter">
              {step === 1 && 'Your Info'}
              {step === 2 && 'Verify'}
              {step === 3 && 'Tickets'}
              {step === 4 && 'Safety'}
              {step === 5 && 'Summary'}
            </h2>
          </div>

          {/* Card Body */}
          <div className="px-10 py-10">{children}</div>
        </div>

      
      </div>
    </section>
  );

  // ─── Step 1: Owner Info ────────────────────────────────────────────────────
  if (step === 1) return (
    <Shell>
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="md:col-span-2 space-y-2">
            <Label className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/40">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
              <input
                type="text"
                placeholder="Mohammed Al-Rashid"
                value={ownerData.fullName}
                onChange={(e) => setOwnerData({ ...ownerData, fullName: e.target.value })}
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm pl-12 pr-5 py-4 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px] placeholder:text-black/20"
              />
            </div>
          </div>
          {/* Email */}
          <div className="space-y-2">
            <Label className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/40">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
              <input
                type="email"
                placeholder="you@email.com"
                value={ownerData.email}
                onChange={(e) => setOwnerData({ ...ownerData, email: e.target.value })}
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm pl-12 pr-5 py-4 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px] placeholder:text-black/20"
              />
            </div>
          </div>
          {/* Phone */}
          <div className="space-y-2">
            <Label className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/40">Mobile *</Label>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
              <input
                type="tel"
                placeholder="+974 XXXX XXXX"
                value={ownerData.phone}
                onChange={(e) => setOwnerData({ ...ownerData, phone: e.target.value })}
                className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm pl-12 pr-5 py-4 outline-none focus:border-black focus:bg-white transition-all font-bold text-black text-[14px] placeholder:text-black/20"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep(2)}
          className="w-full bg-black text-white rounded-sm py-5 text-[14px]  font-bold  flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-black/90 mt-4"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </Shell>
  );

  // ─── Step 2: OTP ──────────────────────────────────────────────────────────
  if (step === 2) return (
    <Shell>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
        <div className="bg-[#F5F5F0] rounded-sm p-8 text-center space-y-6">
          <ShieldCheck className="w-12 h-12 mx-auto text-black/30" />
          <div>
            <p className="text-[12px] font-bold text-black/50 mb-1">Code sent to</p>
            <p className=" font-bold  text-[18px] tracking-tight">{ownerData.phone || ownerData.email}</p>
          </div>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-12 h-16 md:w-14 md:h-20 rounded-sm border-2 flex items-center justify-center text-[24px]  font-bold  transition-all ${
                  otp[i] ? 'border-black bg-white' : 'border-black/10 bg-white'
                }`}
              >
                {otp[i] || <span className="text-black/10">·</span>}
              </div>
            ))}
          </div>
          {/* Hidden real input */}
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="sr-only"
            autoFocus
          />
          <p className="text-[10px] text-black/30 font-bold uppercase tracking-widest">Click above boxes then type your 6-digit code</p>
          {/* Clickable overlay to focus hidden input */}
          <button
            onClick={() => {
              const el = document.querySelector('input.sr-only') as HTMLInputElement;
              if (el) el.focus();
            }}
            className="text-[11px]  font-bold  uppercase tracking-widest text-black/40 hover:text-black transition-all"
          >
            Tap to enter code
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setStep(3)}
            className="w-full bg-black text-white rounded-sm py-5 text-[14px]  font-bold  transition-all active:scale-[0.97] hover:bg-black/90"
          >
            Verify &amp; Continue
          </button>
          <button onClick={() => setStep(1)} className="w-full py-3 text-[11px]  font-bold  uppercase tracking-widest text-black/30 hover:text-black transition-all">
            ← Back
          </button>
        </div>
      </div>
    </Shell>
  );

  // ─── Step 3: Ticket Selection ─────────────────────────────────────────────
  if (step === 3) return (
    <Shell>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
        
        {/* Pet Card (conditional) */}
        {selectedTier !== 'adult' && (
          <div className="border border-black/5 rounded-sm overflow-hidden">
            <div className="bg-primary px-8 py-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                {selectedTier === 'dog-owner' ? <Dog className="w-5 h-5 text-primary" /> : <Cat className="w-5 h-5 text-primary" />}
              </div>
              <div>
                <p className=" font-bold  text-white text-[14px] uppercase tracking-tight">
                  {selectedTier === 'dog-owner' ? 'Dog' : 'Cat'} Details
                </p>
                <p className="text-[10px] text-white/70 font-bold">{selectedTier === 'dog-owner' ? '1 dog per adult · max' : 'Max 2 cats'}</p>
              </div>
            </div>
            <div className="bg-white p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/40">Pet Name *</Label>
                <input
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder={selectedTier === 'dog-owner' ? 'Buddy' : 'Luna'}
                  className="w-full bg-[#F5F5F0] border border-black/5 rounded-sm px-5 py-4 outline-none focus:border-black focus:bg-white transition-all font-bold text-[14px]"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className=" font-bold  text-[14px]">Number of {selectedTier === 'dog-owner' ? 'Dogs' : 'Cats'}</p>
                  <p className="text-[11px] text-black/40 font-medium">QAR 25 registration fee each</p>
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

        {/* Visitor Tickets */}
        <div className="border border-black/5 rounded-sm overflow-hidden">
          <div className="bg-black/5 px-8 py-5">
            <p className=" font-bold  text-[13px] uppercase tracking-tight">Visitor Tickets</p>
          </div>
          <div className="bg-white divide-y divide-black/5">
            <div className="px-8 py-6 flex items-center justify-between">
              <div>
                <p className=" font-bold  text-[13px]">Adults</p>
                <p className="text-[10px] text-black/40 font-medium">QAR 25 · min 1</p>
              </div>
              <QtyControl
                value={adultQty}
                onDecrement={() => setAdultQty(Math.max(1, adultQty - 1))}
                onIncrement={() => setAdultQty(adultQty + 1)}
                canIncrement={true}
              />
            </div>
            <div className="px-8 py-6 flex items-center justify-between">
              <div>
                <p className=" font-bold  text-[14px]">Kids</p>
                <p className="text-[12px] text-black/40 font-medium">QAR 15 · under 12</p>
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

        <button onClick={() => setStep(4)} className="w-full bg-black text-white rounded-sm py-5 text-[14px]  font-bold  flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-black/90">
          Next: Safety Terms <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </Shell>
  );

  // ─── Step 4: Terms ────────────────────────────────────────────────────────
  if (step === 4) return (
    <Shell>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] text-black/50 font-bold">All {currentTerms.length} items required</p>
          <span
            className={`text-[10px]  font-bold  uppercase tracking-widest px-3 py-1.5 rounded-full transition-all ${
              allChecked ? 'bg-green-100 text-green-700' : 'bg-black/5 text-black/30'
            }`}
          >
            {Object.values(checkedTerms).filter(Boolean).length}/{currentTerms.length} agreed
          </span>
        </div>

        <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {currentTerms.map((term, i) => (
            <div
              key={i}
              onClick={() => toggleTerm(i)}
              className={`flex items-start gap-4 p-5 rounded-sm border cursor-pointer transition-all duration-200 ${
                checkedTerms[i] ? 'bg-green-50 border-green-200' : 'bg-[#F5F5F0] border-black/5 hover:border-black/20'
              }`}
            >
              <Checkbox
                id={`term-${i}`}
                checked={!!checkedTerms[i]}
                onCheckedChange={() => toggleTerm(i)}
                className="mt-0.5 w-4 h-4 rounded-sm flex-shrink-0 border-black/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={`term-${i}`} className="text-[12px] font-medium leading-relaxed cursor-pointer text-black/70">
                {term}
              </Label>
            </div>
          ))}
        </div>

        <button
          onClick={() => allChecked && setStep(5)}
          className={`w-full rounded-sm py-5 text-[14px]  font-bold  transition-all ${
            allChecked ? 'bg-black text-white hover:bg-black/90 active:scale-[0.97]' : 'bg-black/10 text-black/20 cursor-not-allowed'
          }`}
        >
          {allChecked ? 'Continue to Summary' : `Agree to all ${currentTerms.length} terms to proceed`}
        </button>
      </div>
    </Shell>
  );

  // ─── Step 5: Summary ──────────────────────────────────────────────────────
  return (
    <Shell>
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
        {/* Attendee */}
        <div className="bg-[#F5F5F0] rounded-sm p-8 space-y-4">
          <p className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/30">Attendee</p>
          <p className=" font-bold  text-[18px] tracking-tight">{ownerData.fullName}</p>
          <p className="text-[12px] text-black/40 font-bold">{ownerData.email} · {ownerData.phone}</p>
        </div>

        {/* Line Items */}
        <div className="bg-[#F5F5F0] rounded-sm overflow-hidden">
          <div className="divide-y divide-black/5">
            <div className="flex justify-between items-center px-8 py-5">
              <div>
                <p className=" font-bold  text-[14px]">Adult Tickets</p>
                <p className="text-[11px] text-black/40 font-medium">QAR 25 × {adultQty}</p>
              </div>
              <p className=" font-bold  text-[16px]">QAR {adultQty * ADULT_PRICE}</p>
            </div>
            {kidsQty > 0 && (
              <div className="flex justify-between items-center px-8 py-5">
                <div>
                  <p className=" font-bold  text-[14px]">Kid Tickets</p>
                  <p className="text-[11px] text-black/40 font-medium">QAR 15 × {kidsQty}</p>
                </div>
                <p className=" font-bold  text-[16px]">QAR {kidsQty * KID_PRICE}</p>
              </div>
            )}
            {petQty > 0 && (
              <div className="flex justify-between items-center px-8 py-5">
                <div>
                  <p className=" font-bold  text-[14px]">{selectedTier === 'dog-owner' ? 'Dog' : 'Cat'} — {petName}</p>
                  <p className="text-[11px] text-black/40 font-medium">QAR 25 × {petQty}</p>
                </div>
                <p className=" font-bold  text-[16px]">QAR {petQty * PET_FEE}</p>
              </div>
            )}
          </div>
          <div className="bg-black px-8 py-7 flex items-center justify-between">
            <p className="text-[11px]  font-bold  uppercase tracking-[0.2em] text-white/50">Total</p>
            <p className="font-display  font-bold  text-[32px] text-primary leading-none">QAR {total}</p>
          </div>
        </div>

        <button
          onClick={handleFinish}
          className="w-full bg-black text-white rounded-sm py-5 text-[15px]  font-bold  flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-black/90 shadow-2xl shadow-black/20"
        >
          Proceed to Payment <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-[11px] text-center text-black/30 font-medium">
          Secure payment · Your QR ticket is generated after payment
        </p>
      </div>
    </Shell>
  );
};

// ─── Reusable Quantity Control ─────────────────────────────────────────────
const QtyControl = ({
  value, onDecrement, onIncrement, canIncrement,
}: {
  value: number; onDecrement: () => void; onIncrement: () => void; canIncrement: boolean;
}) => (
  <div className="flex items-center gap-0 border border-black/10 rounded-sm overflow-hidden">
    <button
      onClick={onDecrement}
      className="w-10 h-10 flex items-center justify-center text-black/40 hover:text-black hover:bg-black/5 transition-all active:scale-90"
    >
      <Minus className="w-4 h-4" />
    </button>
    <span className="w-10 text-center  font-bold  text-[16px]">{value}</span>
    <button
      onClick={onIncrement}
      disabled={!canIncrement}
      className={`w-10 h-10 flex items-center justify-center transition-all active:scale-90 ${
        canIncrement ? 'bg-primary text-white hover:bg-primary/90' : 'bg-black/5 text-black/20 cursor-not-allowed'
      }`}
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>
);

export default TicketsCheckout;
