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
  const [adultQty, setAdultQty] = useState(1);
  const [kidsQty, setKidsQty] = useState(0);
  const [petQty, setPetQty] = useState(0);
  const [petName, setPetName] = useState("");

  const ADULT_PRICE = 25;
  const KID_PRICE = 15;
  const PET_FEE = 25;

  // Rules & Validation
  useEffect(() => {
    if (selectedTier === 'dog-owner') {
      // Max 1 dog per adult
      if (petQty > adultQty) setPetQty(adultQty);
      if (petQty === 0) setPetQty(1); // Default to 1 if it's a dog owner
    } else if (selectedTier === 'cat-owner') {
      // Max 2 cats
      if (petQty > 2) setPetQty(2);
      if (petQty === 0) setPetQty(1); // Default to 1
    } else {
      setPetQty(0);
    }
  }, [adultQty, selectedTier]);

  // Reset when tier changes
  useEffect(() => {
    setStep(1);
    setAdultQty(1);
    setKidsQty(0);
    setPetQty(selectedTier === 'adult' ? 0 : 1);
  }, [selectedTier]);

  const total = (adultQty * ADULT_PRICE) + (kidsQty * KID_PRICE) + (petQty * PET_FEE);

  const dogTerms = [
    "I confirm that I am fully responsible for my dog and my children at all times during the event.",
    "I confirm that my dog’s vaccination is up to date and I have uploaded/provided a valid pet passport for verification.",
    "I confirm that if my dog is medium or large-sized (not a puppy), my dog will arrive wearing a muzzle.",
    "I confirm that my dog will be on a secure, non-extendable leash at all times.",
    "I confirm that my dog will wear a secure collar or harness at all times.",
    "I confirm that female dogs in heat are strictly not allowed to enter the event.",
    "I confirm that aggressive dogs are strictly not allowed, even if wearing a muzzle.",
    "I confirm that sick, injured, or visibly unwell dogs are not allowed to enter the event.",
    "I confirm that food aggression or behavioral concerns have been reported before entry.",
    "I confirm that shock chains, prong collars, or any harmful training equipment are strictly prohibited inside the event.",
    "I confirm that my dog’s nails are trimmed for safety purposes.",
    "I confirm that I will carry waste bags and clean after my dog immediately when needed.",
    "I confirm that no direct interaction with other dogs is allowed on-site unless fully controlled and permitted safely.",
    "I understand that Nova Paw Festival is a public event where photography and videography will take place, and I agree to photo and video coverage of myself, my family, and my dog.",
    "I understand that event staff and organizers reserve the right to refuse entry to any dog considered unsafe.",
    "I accept full responsibility for any injury, damage, or incident caused by my dog during the event."
  ];

  const catTerms = [
    "Cats must remain inside their carrier/cage at all times unless participating in an official competition or judged activity.",
    "Owners are fully responsible for the safety, behavior, and supervision of their cats at all times during the event.",
    "All cats must be vaccinated and must have a valid pet passport/health record available for verification.",
    "Entry may be denied if vaccination records or pet passport are not provided.",
    "Nova Paw Festival is a public event where photography and videography will take place, and owners agree to photo and video coverage of themselves and their pets.",
    "Parents and guardians are fully responsible for supervising their children at all times.",
    "Children and visitors must not approach, touch, or interact with pets without the owner’s permission and staff guidance.",
    "The organizer is not responsible for lost pets, incidents caused by negligence, or failure to follow event safety rules."
  ];

  const adultTerms = [
    "Nova Paw Festival is a public pet event where photography and videography may take place during the festival.",
    "Parents and guardians are fully responsible for supervising their children at all times.",
    "Children and visitors must not approach, touch, feed, or interact with any dog, cat, or pet without the owner’s permission.",
    "Visitors must follow all staff guidance and safety instructions inside the event.",
    "The organizer is not responsible for any incidents caused by failure to follow safety rules and instructions."
  ];

  const renderStep1 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-700 ease-[var(--ease-out)] space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-black/40 px-2">Full Name *</Label>
          <div className="relative">
            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
            <input type="text" placeholder="Your full name" className="w-full bg-[#F9F9F9] border border-black/5 rounded-none px-14 py-6 outline-none focus:border-primary focus:bg-white transition-all duration-500 ease-[var(--ease-out)] font-body text-black" />
          </div>
        </div>
        <div className="space-y-4">
          <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-black/40 px-2">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
            <input type="email" placeholder="your@email.com" className="w-full bg-[#F9F9F9] border border-black/5 rounded-none px-14 py-6 outline-none focus:border-primary focus:bg-white transition-all duration-500 ease-[var(--ease-out)] font-body text-black" />
          </div>
        </div>
        <div className="space-y-4 md:col-span-2">
          <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-black/40 px-2">Mobile Number *</Label>
          <div className="relative">
            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
            <input type="tel" placeholder="+974 XXXX XXXX" className="w-full bg-[#F9F9F9] border border-black/5 rounded-none px-14 py-6 outline-none focus:border-primary focus:bg-white transition-all duration-500 ease-[var(--ease-out)] font-body text-black" />
          </div>
        </div>
      </div>
      <button onClick={() => setStep(2)} className="w-full bg-black text-white rounded-none py-8 text-[14px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all duration-300 ease-[var(--ease-out)] hover:scale-[1.01] active:scale-[0.98] shadow-sm">
        Next: Selection <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-700 ease-[var(--ease-out)] space-y-12">
      
      {/* Pet Section */}
      {selectedTier !== 'adult' && (
        <div className="space-y-10 bg-white border border-black/5 p-10 rounded-none shadow-sm">
          <div className="flex items-center gap-6 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-none flex items-center justify-center text-primary">
              {selectedTier === 'dog-owner' ? <Dog className="w-8 h-8" /> : <Cat className="w-8 h-8" />}
            </div>
            <div>
              <h4 className="text-[20px] font-black uppercase tracking-tight leading-none mb-2">{selectedTier === 'dog-owner' ? 'Dog' : 'Cat'} Info</h4>
              <p className="text-[13px] text-black/40 font-bold uppercase tracking-widest">Pet Registration details</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-black/40 px-2">Pet Name(s) *</Label>
              <input 
                value={petName} 
                onChange={(e) => setPetName(e.target.value)}
                placeholder={selectedTier === 'dog-owner' ? "Buddy" : "Luna, Simpa"} 
                className="w-full bg-[#F9F9F9] border border-black/5 rounded-none px-8 py-6 outline-none focus:border-primary focus:bg-white transition-all duration-500 font-body font-bold" 
              />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-black/5">
              <div>
                <Label className="text-[14px] font-black uppercase tracking-widest text-black">Quantity *</Label>
                <p className="text-[11px] text-black/30 font-bold uppercase tracking-widest mt-1">{selectedTier === 'dog-owner' ? 'Max 1 per Adult' : 'Max 2 Cats'}</p>
              </div>
              <div className="flex items-center gap-6 bg-[#F9F9F9] p-3 rounded-none border border-black/5">
                <button onClick={() => setPetQty(Math.max(1, petQty - 1))} className="w-12 h-12 rounded-none bg-white border border-black/5 flex items-center justify-center shadow-sm active:scale-90 transition-all"><Minus className="w-5 h-5" /></button>
                <span className="text-[20px] font-black w-8 text-center">{petQty}</span>
                <button 
                  onClick={() => {
                    if (selectedTier === 'dog-owner' && petQty < adultQty) setPetQty(petQty + 1);
                    if (selectedTier === 'cat-owner' && petQty < 2) setPetQty(petQty + 1);
                  }} 
                  className={`w-12 h-12 rounded-none flex items-center justify-center shadow-sm active:scale-90 transition-all ${
                    (selectedTier === 'dog-owner' && petQty >= adultQty) || (selectedTier === 'cat-owner' && petQty >= 2)
                    ? 'bg-black/5 text-black/20' : 'bg-primary text-black'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visitor Section */}
      <div className="space-y-10 bg-white border border-black/5 p-10 rounded-none shadow-sm">
        <div className="flex items-center gap-6 mb-4">
          <div className="w-16 h-16 bg-black/5 rounded-none flex items-center justify-center text-black">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-[20px] font-black uppercase tracking-tight leading-none mb-2">Visitors</h4>
            <p className="text-[13px] text-black/40 font-bold uppercase tracking-widest">Ticket Quantities</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[15px] font-black uppercase tracking-widest text-black">Adult Tickets</h4>
              <p className="text-[12px] text-black/40 font-bold">QAR 25 / Person</p>
            </div>
            <div className="flex items-center gap-6 bg-[#F9F9F9] p-3 rounded-none border border-black/5">
              <button onClick={() => setAdultQty(Math.max(1, adultQty - 1))} className="w-12 h-12 rounded-none bg-white border border-black/5 flex items-center justify-center shadow-sm active:scale-90 transition-all"><Minus className="w-5 h-5" /></button>
              <span className="text-[20px] font-black w-8 text-center">{adultQty}</span>
              <button onClick={() => setAdultQty(adultQty + 1)} className="w-12 h-12 rounded-none bg-primary text-black flex items-center justify-center shadow-sm active:scale-90 transition-all"><Plus className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-black/5">
            <div>
              <h4 className="text-[15px] font-black uppercase tracking-widest text-black">Kid Tickets</h4>
              <p className="text-[12px] text-black/40 font-bold">QAR 15 / Person</p>
            </div>
            <div className="flex items-center gap-6 bg-[#F9F9F9] p-3 rounded-none border border-black/5">
              <button onClick={() => setKidsQty(Math.max(0, kidsQty - 1))} className="w-12 h-12 rounded-none bg-white border border-black/5 flex items-center justify-center shadow-sm active:scale-90 transition-all"><Minus className="w-5 h-5" /></button>
              <span className="text-[20px] font-black w-8 text-center">{kidsQty}</span>
              <button onClick={() => setKidsQty(kidsQty + 1)} className="w-12 h-12 rounded-none bg-primary text-black flex items-center justify-center shadow-sm active:scale-90 transition-all"><Plus className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setStep(3)} className="w-full bg-black text-white rounded-none py-8 text-[14px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all duration-300 ease-[var(--ease-out)] hover:scale-[1.01] active:scale-[0.98] shadow-sm">
        Next: Safety Terms <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderStep3 = () => {
    const currentTerms = selectedTier === 'dog-owner' ? dogTerms : (selectedTier === 'cat-owner' ? catTerms : adultTerms);
    const isDog = selectedTier === 'dog-owner';

    return (
      <div className="animate-in fade-in slide-in-from-right-8 duration-700 ease-[var(--ease-out)] space-y-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h4 className="text-[24px] font-black uppercase tracking-tight mb-2">Safety Terms</h4>
              <p className="text-[13px] text-black/40 font-bold uppercase tracking-widest">{isDog ? "16 points individual check required" : "General event safety rules"}</p>
            </div>
            {isDog && <span className="bg-primary text-black px-6 py-2 rounded-none text-[11px] font-black uppercase tracking-[0.2em]">Mandatory</span>}
          </div>

          <div className={`grid grid-cols-1 gap-4 ${isDog ? 'max-h-[600px]' : ''} overflow-y-auto pr-6 custom-scrollbar`}>
            {currentTerms.map((term, i) => (
              <div key={i} className="flex items-start space-x-6 p-8 rounded-none bg-[#F9F9F9] border border-black/5 transition-all duration-300 hover:border-primary/50 group cursor-pointer">
                <Checkbox id={`term-${i}`} className="mt-1 w-6 h-6 rounded-none border-black/10 data-[state=checked]:bg-primary data-[state=checked]:border-primary" required />
                <Label htmlFor={`term-${i}`} className="text-[15px] text-black/50 leading-relaxed font-medium cursor-pointer group-hover:text-black transition-colors">
                  {term}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setStep(4)} className="w-full bg-black text-white rounded-none py-8 text-[14px] font-black uppercase tracking-[0.2em] transition-all duration-300 ease-[var(--ease-out)] hover:scale-[1.01] active:scale-[0.98] shadow-sm">
          Proceed to Payment
        </button>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-700 ease-[var(--ease-out)] space-y-12">
      <div className="space-y-10">
        <h4 className="text-[24px] font-black uppercase tracking-tight text-center">Payment Method</h4>
        <div className="grid grid-cols-2 gap-8">
          <button className="p-10 rounded-none border-2 border-primary bg-primary/5 flex flex-col items-center gap-4 transition-all duration-300 hover:bg-primary/10 active:scale-[0.98]">
            <CreditCard className="w-10 h-10 text-primary" />
            <span className="font-black uppercase tracking-widest text-[13px]">Debit / Credit</span>
          </button>
          <button className="p-10 rounded-none border border-black/5 bg-[#F9F9F9] flex flex-col items-center gap-4 transition-all duration-300 hover:bg-black/5 active:scale-[0.98]">
            <div className="w-10 h-10 bg-black text-white rounded-none flex items-center justify-center font-black text-[12px] uppercase">Pay</div>
            <span className="font-black uppercase tracking-widest text-[13px]">Express Pay</span>
          </button>
        </div>
      </div>
      <button onClick={() => setStep(5)} className="w-full bg-black text-white rounded-none py-8 text-[14px] font-black uppercase tracking-[0.2em] transition-all duration-300 ease-[var(--ease-out)] hover:scale-[1.01] active:scale-[0.98] shadow-sm">
        Submit Payment
      </button>
    </div>
  );

  const renderStep5 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-700 ease-[var(--ease-out)] space-y-12 text-center">
      <div className="space-y-8">
        <h4 className="text-[24px] font-black uppercase tracking-tight">OTP Verification</h4>
        <p className="text-black/40 font-bold uppercase tracking-widest text-[12px]">Verification code sent to your mobile</p>
        <div className="flex justify-center">
          <input 
            type="text" 
            maxLength={6} 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full max-w-[400px] h-24 text-center text-[48px] font-black tracking-[0.5em] rounded-none border-2 border-black/5 bg-[#F9F9F9] focus:bg-white focus:border-primary outline-none transition-all duration-500 ease-[var(--ease-out)]"
            placeholder="000000"
          />
        </div>
      </div>
      <button onClick={() => setStep(6)} className="w-full bg-black text-white rounded-none py-8 text-[14px] font-black uppercase tracking-[0.2em] transition-all duration-300 ease-[var(--ease-out)] hover:scale-[1.01] active:scale-[0.98] shadow-sm">
        Verify & Generate Tickets
      </button>
    </div>
  );

  const renderStep6 = () => (
    <div className="animate-in zoom-in-95 fade-in duration-1000 ease-[var(--ease-out)] space-y-12 text-center py-10">
      <div className="w-28 h-28 bg-primary text-black rounded-none flex items-center justify-center mx-auto mb-10 shadow-sm shadow-primary/40 border-4 border-primary">
        <Check className="w-14 h-14 stroke-[4px]" />
      </div>
      <div className="space-y-4">
        <h3 className="text-[48px] md:text-[64px] font-black font-display mb-4 tracking-tighter leading-none">Purchase <br /> Successful!</h3>
        <p className="text-[18px] text-black/40 font-bold uppercase tracking-widest leading-relaxed">
          Your QR Tickets have been sent to your email.
        </p>
      </div>
      <div className="glass rounded-none p-12 space-y-6 text-left max-w-[500px] mx-auto border border-black/5">
        <div className="flex justify-between border-b border-black/5 pb-6">
          <span className="text-black/30 font-black uppercase text-[11px] tracking-[0.2em]">Reference ID</span>
          <span className="font-black font-mono">NPV-2026-T8X</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-black/30 font-black uppercase text-[11px] tracking-[0.2em]">Final Total</span>
          <span className="text-[40px] font-display font-black text-primary">QAR {total}</span>
        </div>
      </div>
      <button onClick={() => window.location.href = '/'} className="inline-flex items-center justify-center px-16 py-8 bg-black text-white rounded-none font-black text-[14px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm">
        Return to Festival Home
      </button>
    </div>
  );

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1000px]">
        <div className="bg-white rounded-none p-8 md:p-20 shadow-sm border border-black/5 relative overflow-hidden">
          
          {/* Header */}
          {step < 6 && (
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <span className="px-6 py-2 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em]">
                  Step 0{step}
                </span>
                <span className="text-primary font-black uppercase text-[12px] tracking-[0.2em]">
                  {selectedTier.replace('-', ' ')}
                </span>
              </div>
              <h2 className="text-[48px] md:text-[84px] font-display font-black text-black leading-[0.9] tracking-tighter mb-10">
                {step === 1 ? "Owner Details" : step === 2 ? "Select Tickets" : step === 3 ? "Safety Check" : step === 4 ? "Checkout" : "Verification"}
              </h2>
              
              {/* Progress Bar */}
              <div className="w-full h-[4px] bg-black/5 rounded-none overflow-hidden relative">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-[var(--ease-in-out)]" 
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          {step === 6 && renderStep6()}

          {/* Summary Preview */}
          {step < 6 && (
            <div className="mt-20 pt-16 border-t border-black/5">
              <div className="bg-[#F9F9F9] rounded-none p-12 space-y-6">
                <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-black/30 mb-8">Booking Summary</h5>
                <div className="space-y-4">
                  <div className="flex justify-between text-[15px] font-bold text-black px-2">
                    <span className="uppercase tracking-widest text-black/40">Adult x {adultQty}</span>
                    <span>QAR {adultQty * ADULT_PRICE}</span>
                  </div>
                  {kidsQty > 0 && (
                    <div className="flex justify-between text-[15px] font-bold text-black px-2">
                      <span className="uppercase tracking-widest text-black/40">Kids x {kidsQty}</span>
                      <span>QAR {kidsQty * KID_PRICE}</span>
                    </div>
                  )}
                  {petQty > 0 && (
                    <div className="flex justify-between text-[15px] font-bold text-black px-2">
                      <span className="uppercase tracking-widest text-black/40">{selectedTier === 'dog-owner' ? 'Dog' : 'Cat'} x {petQty}</span>
                      <span>QAR {petQty * PET_FEE}</span>
                    </div>
                  )}
                  <div className="pt-8 mt-4 border-t-2 border-black/5 flex justify-between items-center px-2">
                    <span className="text-[18px] font-black text-black uppercase tracking-[0.2em]">Total</span>
                    <span className="text-[48px] font-display font-black text-primary leading-none">QAR {total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TicketsCheckout;
