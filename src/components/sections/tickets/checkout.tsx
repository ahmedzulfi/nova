'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, User, Mail, Phone, Plus, Minus, Check, Dog, Cat, ArrowRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TicketsCheckoutProps {
  selectedTier: string;
}

const TicketsCheckout = ({ selectedTier }: TicketsCheckoutProps) => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  
  // Selection State
  const [ownerData, setOwnerData] = useState({ fullName: "", email: "", phone: "" });
  const [adultQty, setAdultQty] = useState(1);
  const [kidsQty, setKidsQty] = useState(0);
  const [petQty, setPetQty] = useState(0);
  const [petName, setPetName] = useState("");

  const ADULT_PRICE = 25;
  const KID_PRICE = 15;
  const PET_FEE = 25;

  const total = (adultQty * ADULT_PRICE) + (kidsQty * KID_PRICE) + (petQty * PET_FEE);

  // Rules & Validation
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
  }, [selectedTier]);

  const handleFinish = () => {
    // Save to LocalStorage for Dashboard
    const registration = {
      ...ownerData,
      tier: selectedTier,
      adultQty,
      kidsQty,
      petQty,
      petName,
      total,
      orderId: `#NPV-2026-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    };
    localStorage.setItem('nova_registration', JSON.stringify(registration));
    
    // Redirect to Dashboard
    window.location.href = '/dashboard';
  };

  const renderStep1 = () => (
    <div className="animate-in fade-in slide-in-from-right duration-500 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Full Name *</Label>
          <div className="relative">
            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
            <input 
              type="text" 
              placeholder="Your full name" 
              value={ownerData.fullName}
              onChange={(e) => setOwnerData({...ownerData, fullName: e.target.value})}
              className="w-full bg-[#F9F9F9] border border-black/5 rounded-sm px-14 py-5 outline-none focus:border-primary focus:bg-white transition-all font-body text-black" 
            />
          </div>
        </div>
        <div className="space-y-3">
          <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
            <input 
              type="email" 
              placeholder="your@email.com" 
              value={ownerData.email}
              onChange={(e) => setOwnerData({...ownerData, email: e.target.value})}
              className="w-full bg-[#F9F9F9] border border-black/5 rounded-sm px-14 py-5 outline-none focus:border-primary focus:bg-white transition-all font-body text-black" 
            />
          </div>
        </div>
        <div className="space-y-3 md:col-span-2">
          <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Mobile Number *</Label>
          <div className="relative">
            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
            <input 
              type="tel" 
              placeholder="+974 XXXX XXXX" 
              value={ownerData.phone}
              onChange={(e) => setOwnerData({...ownerData, phone: e.target.value})}
              className="w-full bg-[#F9F9F9] border border-black/5 rounded-sm px-14 py-5 outline-none focus:border-primary focus:bg-white transition-all font-body text-black" 
            />
          </div>
        </div>
      </div>
      <button onClick={() => setStep(2)} className="w-full bg-black text-white rounded-sm py-6 text-[18px] font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-black/90 shadow-sm shadow-black/10">
        Get Verification Code <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-in fade-in slide-in-from-right duration-500 space-y-10 text-center">
      <div className="space-y-6">
        <p className="text-black/50">We've sent a 6-digit code to <span className="font-bold text-black">{ownerData.phone || ownerData.email}</span></p>
        <div className="flex justify-center">
          <input 
            type="text" 
            maxLength={6} 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full max-w-[300px] h-20 text-center text-[32px] font-bold tracking-[0.5em] rounded-sm border border-black/5 bg-[#F9F9F9] focus:bg-white focus:border-primary outline-none transition-all"
            placeholder="000000"
          />
        </div>
      </div>
      <button onClick={() => setStep(3)} className="w-full bg-black text-white rounded-sm py-6 text-[18px] font-bold transition-all active:scale-[0.97] hover:bg-black/90 shadow-sm ">
        Verify & Continue
      </button>
      <button onClick={() => setStep(1)} className="text-black/40 font-bold uppercase text-[12px] tracking-widest hover:text-black transition-all">Back to Info</button>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-in fade-in slide-in-from-right duration-500 space-y-10">
      {selectedTier !== 'adult' && (
        <div className="space-y-8 bg-white border border-black/5 p-8 rounded-sm ">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center text-primary">
              {selectedTier === 'dog-owner' ? <Dog className="w-6 h-6" /> : <Cat className="w-6 h-6" />}
            </div>
            <div>
              <h4 className="text-[18px] font-bold uppercase tracking-tight">{selectedTier === 'dog-owner' ? 'Dog' : 'Cat'} Info</h4>
              <p className="text-[13px] text-black/40 font-medium">Please provide your pet's details</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Pet Name(s) *</Label>
              <input 
                value={petName} 
                onChange={(e) => setPetName(e.target.value)}
                placeholder={selectedTier === 'dog-owner' ? "Buddy" : "Luna, Simpa"} 
                className="w-full bg-[#F9F9F9] border border-black/5 rounded-sm px-6 py-5 outline-none focus:border-primary focus:bg-white transition-all font-body" 
              />
            </div>
            <div className="flex items-center justify-between pt-4">
              <Label className="text-[15px] font-bold text-black">Number of {selectedTier === 'dog-owner' ? 'Dogs' : 'Cats'} *</Label>
              <div className="flex items-center gap-4 bg-[#F9F9F9] p-2 rounded-sm border border-black/5">
                <button onClick={() => setPetQty(Math.max(1, petQty - 1))} className="w-10 h-10 rounded-sm bg-white flex items-center justify-center shadow-sm active:scale-95 transition-all"><Minus className="w-4 h-4" /></button>
                <span className="text-[18px] font-bold w-8 text-center">{petQty}</span>
                <button 
                  onClick={() => {
                    if (selectedTier === 'dog-owner' && petQty < adultQty) setPetQty(petQty + 1);
                    if (selectedTier === 'cat-owner' && petQty < 2) setPetQty(petQty + 1);
                  }} 
                  className={`w-10 h-10 rounded-sm flex items-center justify-center shadow-sm active:scale-95 transition-all ${
                    (selectedTier === 'dog-owner' && petQty >= adultQty) || (selectedTier === 'cat-owner' && petQty >= 2)
                    ? 'bg-black/5 text-black/20' : 'bg-primary text-white'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8 bg-white border border-black/5 p-8 rounded-sm ">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-black/5 rounded-sm flex items-center justify-center text-black">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-[18px] font-bold uppercase tracking-tight">Visitor Selection</h4>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[16px] font-bold text-black">Adults</h4>
              <p className="text-[13px] text-black/40">QAR 25</p>
            </div>
            <div className="flex items-center gap-4 bg-[#F9F9F9] p-2 rounded-sm border border-black/5">
              <button onClick={() => setAdultQty(Math.max(1, adultQty - 1))} className="w-10 h-10 rounded-sm bg-white flex items-center justify-center shadow-sm active:scale-95 transition-all"><Minus className="w-4 h-4" /></button>
              <span className="text-[18px] font-bold w-8 text-center">{adultQty}</span>
              <button onClick={() => setAdultQty(adultQty + 1)} className="w-10 h-10 rounded-sm bg-primary text-white flex items-center justify-center shadow-sm active:scale-95 transition-all"><Plus className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[16px] font-bold text-black">Kids</h4>
              <p className="text-[13px] text-black/40">QAR 15</p>
            </div>
            <div className="flex items-center gap-4 bg-[#F9F9F9] p-2 rounded-sm border border-black/5">
              <button onClick={() => setKidsQty(Math.max(0, kidsQty - 1))} className="w-10 h-10 rounded-sm bg-white flex items-center justify-center shadow-sm active:scale-95 transition-all"><Minus className="w-4 h-4" /></button>
              <span className="text-[18px] font-bold w-8 text-center">{kidsQty}</span>
              <button onClick={() => setKidsQty(kidsQty + 1)} className="w-10 h-10 rounded-sm bg-primary text-white flex items-center justify-center shadow-sm active:scale-95 transition-all"><Plus className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setStep(4)} className="w-full bg-black text-white rounded-sm py-6 text-[18px] font-bold transition-all active:scale-[0.97] hover:bg-black/90 shadow-sm ">
        Next: Safety Terms <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderStep4 = () => {
    const dogTerms = [
      "Full responsibility for dog and children.", "Vaccination is up to date.", "Muzzle for large/medium dogs.", "Secure, non-extendable leash.", "Secure collar or harness.", "No female dogs in heat.", "No aggressive dogs.", "No sick/injured dogs.", "Behavioral concerns reported.", "No shock/prong collars.", "Nails trimmed.", "Waste cleaning mandatory.", "No direct interaction unless controlled.", "Media coverage consent.", "Staff right to refuse entry.", "Full liability for damages."
    ];
    const catTerms = ["Carrier/cage mandatory.", "Owner responsibility.", "Vaccinated pets only.", "Entry denied if no records.", "Media consent.", "Supervised children.", "No unauthorized touching.", "Organizer not liable for loss."];
    const adultTerms = ["Media coverage consent.", "Supervised children.", "No touching pets without permission.", "Staff safety guidance.", "Organizer not liable for safety violations."];
    
    const currentTerms = selectedTier === 'dog-owner' ? dogTerms : (selectedTier === 'cat-owner' ? catTerms : adultTerms);
    const isDog = selectedTier === 'dog-owner';

    return (
      <div className="animate-in fade-in slide-in-from-right duration-500 space-y-10">
        <div className="space-y-6">
          <h4 className="text-[18px] font-bold uppercase tracking-tight">Safety & Conduct Terms</h4>
          <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {currentTerms.map((term, i) => (
              <div key={i} className="flex items-start space-x-4 p-5 rounded-sm bg-[#F9F9F9] border border-black/5 group cursor-pointer">
                <Checkbox id={`term-${i}`} className="mt-1 w-5 h-5 rounded-sm border-black/10" required />
                <Label htmlFor={`term-${i}`} className="text-[14px] text-black/60 leading-relaxed cursor-pointer group-hover:text-black">{term}</Label>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => setStep(5)} className="w-full bg-black text-white rounded-sm py-6 text-[18px] font-bold transition-all active:scale-[0.97] hover:bg-black/90 shadow-sm ">
          Proceed to Order Summary
        </button>
      </div>
    );
  };

  const renderStep5 = () => (
    <div className="animate-in fade-in slide-in-from-right duration-500 space-y-10">
      <div className="space-y-8 bg-[#F9F9F9] p-10 rounded-sm border border-black/5">
        <h4 className="text-[18px] font-bold uppercase tracking-tight text-center">Order Summary</h4>
        <div className="space-y-4 pt-4 border-t border-black/5">
          <div className="flex justify-between font-bold text-black/60"><span>Adults × {adultQty}</span><span>QAR {adultQty * ADULT_PRICE}</span></div>
          {kidsQty > 0 && <div className="flex justify-between font-bold text-black/60"><span>Kids × {kidsQty}</span><span>QAR {kidsQty * KID_PRICE}</span></div>}
          {petQty > 0 && <div className="flex justify-between font-bold text-black/60"><span>{selectedTier.replace('-owner', '')}s × {petQty}</span><span>QAR {petQty * PET_FEE}</span></div>}
          <div className="pt-6 border-t border-black/10 flex justify-between items-center">
            <span className="text-[20px] font-bold uppercase">Total</span>
            <span className="text-[48px] font-display font-black text-primary">QAR {total}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <button onClick={handleFinish} className="w-full bg-black text-white rounded-sm py-6 text-[18px] font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-black/90 shadow-2xl shadow-black/20">
          Proceed to Payment <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-[11px] text-center text-black/30 font-medium px-8">By clicking "Proceed to Payment", you will be redirected to the secure payment gateway and your attendee dashboard.</p>
      </div>
    </div>
  );

  return (
    <section className="py-20 md:py-32 bg-[#F9F9F9]">
      <div className="container mx-auto px-6 max-w-[800px]">
        <div className="bg-white rounded-sm p-8 md:p-16 shadow-sm border border-black/5 relative overflow-hidden">
          
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest">Step {step} of 5</span>
              <span className="text-black/20 font-bold">/</span>
              <span className="text-black/60 font-bold uppercase text-[11px] tracking-widest">{selectedTier.replace('-', ' ')}</span>
            </div>
            <h2 className="text-[40px] md:text-[60px] font-display font-black text-black leading-[0.95] tracking-tighter mb-10">
              {step === 1 ? "Your Info" : step === 2 ? "Verification" : step === 3 ? "Selection" : step === 4 ? "Safety" : "Summary"}
            </h2>
            <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-700" style={{ width: `${(step / 5) * 100}%` }} />
            </div>
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </div>
      </div>
    </section>
  );
};

export default TicketsCheckout;
