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
  
  const [ownerData, setOwnerData] = useState({ fullName: "", email: "", phone: "" });
  const [adultQty, setAdultQty] = useState(1);
  const [kidsQty, setKidsQty] = useState(0);
  const [petQty, setPetQty] = useState(0);
  const [petName, setPetName] = useState("");

  const ADULT_PRICE = 25;
  const KID_PRICE = 15;
  const PET_FEE = 25;

  const total = (adultQty * ADULT_PRICE) + (kidsQty * KID_PRICE) + (petQty * PET_FEE);

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
    window.location.href = '/dashboard';
  };

  const renderStep1 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
      <div className="space-y-8">
        <div className="group space-y-3">
          <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-black/40 group-focus-within:text-primary transition-colors">Full Name</Label>
          <input 
            type="text" 
            placeholder="John Doe" 
            value={ownerData.fullName}
            onChange={(e) => setOwnerData({...ownerData, fullName: e.target.value})}
            className="w-full bg-white border-b-2 border-black/5 py-5 text-[20px] font-bold outline-none focus:border-black transition-all duration-500 placeholder:text-black/10" 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="group space-y-3">
            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-black/40 group-focus-within:text-primary transition-colors">Email Address</Label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              value={ownerData.email}
              onChange={(e) => setOwnerData({...ownerData, email: e.target.value})}
              className="w-full bg-white border-b-2 border-black/5 py-5 text-[20px] font-bold outline-none focus:border-black transition-all duration-500 placeholder:text-black/10" 
            />
          </div>
          <div className="group space-y-3">
            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-black/40 group-focus-within:text-primary transition-colors">Phone Number</Label>
            <input 
              type="tel" 
              placeholder="+974 0000 0000" 
              value={ownerData.phone}
              onChange={(e) => setOwnerData({...ownerData, phone: e.target.value})}
              className="w-full bg-white border-b-2 border-black/5 py-5 text-[20px] font-bold outline-none focus:border-black transition-all duration-500 placeholder:text-black/10" 
            />
          </div>
        </div>
      </div>
      <button onClick={() => setStep(2)} className="w-full h-24 bg-black text-white rounded-sm font-black text-[18px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-primary transition-all duration-500 active:scale-[0.98]">
        Continue to Verification <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
      <div className="text-center space-y-4">
        <p className="text-black/40 font-bold uppercase tracking-widest text-[12px]">Verification Code</p>
        <h3 className="text-[18px] font-bold">Sent to {ownerData.phone || ownerData.email}</h3>
      </div>
      <div className="flex justify-center">
        <input 
          type="text" 
          maxLength={6} 
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full max-w-[400px] h-32 text-center text-[48px] font-black tracking-[0.3em] bg-black text-white rounded-sm outline-none border-4 border-black focus:border-primary transition-all duration-500"
          placeholder="000000"
        />
      </div>
      <div className="flex flex-col gap-4">
        <button onClick={() => setStep(3)} className="w-full h-24 bg-black text-white rounded-sm font-black text-[18px] uppercase tracking-widest hover:bg-primary transition-all duration-500 active:scale-[0.98]">
          Verify Identity
        </button>
        <button onClick={() => setStep(1)} className="text-[11px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-all">Go Back</button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Tier Specific Info */}
        <div className="p-10 bg-black text-white rounded-sm space-y-8 flex flex-col justify-between">
           <div className="space-y-4">
             <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center">
                {selectedTier === 'dog-owner' ? <Dog className="w-6 h-6" /> : <Cat className="w-6 h-6" />}
             </div>
             <h4 className="text-[24px] font-black uppercase tracking-tighter leading-none">
               {selectedTier.replace('-', ' ')} <br /> Details
             </h4>
           </div>
           
           {selectedTier !== 'adult' ? (
             <div className="space-y-6">
               <div className="space-y-2">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Pet Name</Label>
                 <input 
                   value={petName} 
                   onChange={(e) => setPetName(e.target.value)}
                   className="w-full bg-white/5 border-b border-white/20 py-3 text-[18px] font-bold outline-none focus:border-primary transition-all" 
                 />
               </div>
               <div className="flex items-center justify-between">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Quantity</Label>
                 <div className="flex items-center gap-6">
                    <button onClick={() => setPetQty(Math.max(1, petQty - 1))} className="hover:text-primary transition-colors"><Minus className="w-5 h-5" /></button>
                    <span className="text-[20px] font-black">{petQty}</span>
                    <button 
                      onClick={() => {
                        if (selectedTier === 'dog-owner' && petQty < adultQty) setPetQty(petQty + 1);
                        if (selectedTier === 'cat-owner' && petQty < 2) setPetQty(petQty + 1);
                      }}
                      className="hover:text-primary transition-colors"
                    ><Plus className="w-5 h-5" /></button>
                 </div>
               </div>
             </div>
           ) : (
             <p className="text-white/40 text-[14px] leading-relaxed">General admission for adults and pet enthusiasts. Access to all grounds and major arenas.</p>
           )}
        </div>

        {/* Quantities */}
        <div className="p-10 bg-[#F9F9F9] rounded-sm space-y-10 border border-black/5">
           <div className="space-y-8">
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-black text-[18px]">Adults</p>
                 <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest">QAR 25.00</p>
               </div>
               <div className="flex items-center gap-6">
                  <button onClick={() => setAdultQty(Math.max(1, adultQty - 1))} className="w-10 h-10 border border-black/5 rounded-sm flex items-center justify-center hover:bg-black hover:text-white transition-all"><Minus className="w-4 h-4" /></button>
                  <span className="text-[18px] font-black">{adultQty}</span>
                  <button onClick={() => setAdultQty(adultQty + 1)} className="w-10 h-10 border border-black/5 rounded-sm flex items-center justify-center hover:bg-black hover:text-white transition-all"><Plus className="w-4 h-4" /></button>
               </div>
             </div>
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-black text-[18px]">Kids</p>
                 <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest">QAR 15.00</p>
               </div>
               <div className="flex items-center gap-6">
                  <button onClick={() => setKidsQty(Math.max(0, kidsQty - 1))} className="w-10 h-10 border border-black/5 rounded-sm flex items-center justify-center hover:bg-black hover:text-white transition-all"><Minus className="w-4 h-4" /></button>
                  <span className="text-[18px] font-black">{kidsQty}</span>
                  <button onClick={() => setKidsQty(kidsQty + 1)} className="w-10 h-10 border border-black/5 rounded-sm flex items-center justify-center hover:bg-black hover:text-white transition-all"><Plus className="w-4 h-4" /></button>
               </div>
             </div>
           </div>
           
           <div className="pt-8 border-t border-black/10 flex justify-between items-center">
             <span className="font-black text-[12px] uppercase tracking-widest text-black/30">Total Value</span>
             <span className="text-[32px] font-display font-black leading-none text-primary">QAR {total}</span>
           </div>
        </div>

      </div>
      <button onClick={() => setStep(4)} className="w-full h-24 bg-black text-white rounded-sm font-black text-[18px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-primary transition-all duration-500 active:scale-[0.98]">
        Accept Safety Terms <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );

  const renderStep4 = () => {
    const dogTerms = ["Full responsibility for behavior.", "Current vaccination required.", "Muzzle for large dogs.", "Non-extendable leash.", "Secure collar mandatory.", "No dogs in heat.", "No aggressive dogs.", "No sick dogs.", "Waste cleanup mandatory.", "Media consent.", "Staff right to refuse entry.", "Full liability for damages."];
    const catTerms = ["Carrier mandatory.", "Owner responsibility.", "Vaccinated pets only.", "Media consent.", "Supervised children.", "No unauthorized touching."];
    const adultTerms = ["Media consent.", "Supervised children.", "No touching pets.", "Follow staff guidance."];
    
    const currentTerms = selectedTier === 'dog-owner' ? dogTerms : (selectedTier === 'cat-owner' ? catTerms : adultTerms);

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
          {currentTerms.map((term, i) => (
            <div key={i} className="group relative p-8 bg-[#F9F9F9] border border-black/5 rounded-sm hover:border-black transition-all duration-500 flex gap-6 cursor-pointer">
              <Checkbox id={`term-${i}`} className="mt-1 w-6 h-6 rounded-sm border-black/20 group-hover:border-black transition-all" required />
              <Label htmlFor={`term-${i}`} className="text-[14px] font-bold leading-relaxed text-black/50 group-hover:text-black transition-colors cursor-pointer">{term}</Label>
            </div>
          ))}
        </div>
        <button onClick={() => setStep(5)} className="w-full h-24 bg-black text-white rounded-sm font-black text-[18px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-primary transition-all duration-500 active:scale-[0.98]">
          Review & Finalize <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    );
  };

  const renderStep5 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
      <div className="bg-black text-white p-12 rounded-sm space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 space-y-8">
           <div className="flex justify-between items-start">
             <div>
               <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Registration Summary</h4>
               <p className="text-[32px] font-display font-black leading-tight">{ownerData.fullName}</p>
               <p className="text-primary font-bold text-[14px] mt-1">{ownerData.email}</p>
             </div>
             <div className="text-right">
               <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Final Amount</p>
               <p className="text-[48px] font-display font-black leading-none text-primary">QAR {total}</p>
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/10">
              <div>
                <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-1">Pass Type</p>
                <p className="font-bold text-[16px] uppercase">{selectedTier.replace('-', ' ')}</p>
              </div>
              <div>
                <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-1">Pet</p>
                <p className="font-bold text-[16px]">{petName || 'N/A'}</p>
              </div>
           </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <button onClick={handleFinish} className="w-full h-24 bg-primary text-white rounded-sm font-black text-[20px] uppercase tracking-widest flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-2xl shadow-primary/20">
          Proceed to Dashboard <ArrowRight className="w-6 h-6" />
        </button>
        <p className="text-[11px] text-center text-black/30 font-bold uppercase tracking-widest">Redirection to payment portal follows</p>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-[1000px]">
        
        {/* Progress System */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-black/30">
              {selectedTier.replace('-', ' ')} Registration
            </h2>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className={`h-1.5 w-12 rounded-full transition-all duration-700 ${step >= s ? 'bg-black' : 'bg-black/5'}`} />
              ))}
            </div>
          </div>
          <h3 className="text-[48px] md:text-[72px] font-display font-black text-black leading-none tracking-tighter">
            {step === 1 ? "Identification" : step === 2 ? "Verification" : step === 3 ? "Selection" : step === 4 ? "Agreement" : "Confirmation"}
          </h3>
        </div>

        <div className="relative">
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
