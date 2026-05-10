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
    <div className="animate-in fade-in slide-in-from-right duration-500 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Full Name *</Label>
          <div className="relative">
            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
            <input type="text" placeholder="Your full name" className="w-full bg-[#F9F9F9] border border-black/5    rounded-sm  px-14 py-5 outline-none focus:border-primary focus:bg-white transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] font-body text-black" />
          </div>
        </div>
        <div className="space-y-3">
          <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
            <input type="email" placeholder="your@email.com" className="w-full bg-[#F9F9F9] border border-black/5    rounded-sm  px-14 py-5 outline-none focus:border-primary focus:bg-white transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] font-body text-black" />
          </div>
        </div>
        <div className="space-y-3 md:col-span-2">
          <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Mobile Number *</Label>
          <div className="relative">
            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
            <input type="tel" placeholder="+974 XXXX XXXX" className="w-full bg-[#F9F9F9] border border-black/5    rounded-sm  px-14 py-5 outline-none focus:border-primary focus:bg-white transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] font-body text-black" />
          </div>
        </div>
      </div>
      <button onClick={() => setStep(2)} className="w-full bg-black text-white    rounded-sm  py-6 text-[18px] font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-black/90  shadow-sm  shadow-black/10">
        Next: Selection <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-in fade-in slide-in-from-right duration-500 space-y-10">
      
      {/* Pet Section */}
      {selectedTier !== 'adult' && (
        <div className="space-y-8 bg-white border border-black/5 p-8    rounded-sm  ">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-primary/10    rounded-sm  flex items-center justify-center text-primary">
              {selectedTier === 'dog-owner' ? <Dog className="w-6 h-6" /> : <Cat className="w-6 h-6" />}
            </div>
            <div>
              <h4 className="text-[18px] font-bold uppercase tracking-tight">{selectedTier === 'dog-owner' ? 'Dog' : 'Cat'} Information</h4>
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
                className="w-full bg-[#F9F9F9] border border-black/5    rounded-sm  px-6 py-5 outline-none focus:border-primary focus:bg-white transition-all font-body" 
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <Label className="text-[15px] font-bold text-black">Number of {selectedTier === 'dog-owner' ? 'Dogs' : 'Cats'} *</Label>
                <p className="text-[13px] text-black/40">{selectedTier === 'dog-owner' ? '(Maximum: 1 Dog Per Adult Only)' : '(Maximum 2 Cats Only)'}</p>
              </div>
              <div className="flex items-center gap-4 bg-[#F9F9F9] p-2    rounded-sm  border border-black/5">
                <button onClick={() => setPetQty(Math.max(1, petQty - 1))} className="w-10 h-10  rounded-sm bg-white flex items-center justify-center shadow-sm active:scale-95 transition-all"><Minus className="w-4 h-4" /></button>
                <span className="text-[18px] font-bold w-8 text-center">{petQty}</span>
                <button 
                  onClick={() => {
                    if (selectedTier === 'dog-owner' && petQty < adultQty) setPetQty(petQty + 1);
                    if (selectedTier === 'cat-owner' && petQty < 2) setPetQty(petQty + 1);
                  }} 
                  className={`w-10 h-10  rounded-sm flex items-center justify-center shadow-sm active:scale-95 transition-all ${
                    (selectedTier === 'dog-owner' && petQty >= adultQty) || (selectedTier === 'cat-owner' && petQty >= 2)
                    ? 'bg-black/5 text-black/20' : 'bg-primary text-white'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            {selectedTier === 'dog-owner' && petQty >= adultQty && (
              <p className="text-[11px] text-primary font-bold px-2">* Add more Adult tickets to register more dogs.</p>
            )}
          </div>
        </div>
      )}

      {/* Visitor Section */}
      <div className="space-y-8 bg-white border border-black/5 p-8    rounded-sm  ">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-black/5    rounded-sm  flex items-center justify-center text-black">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-[18px] font-bold uppercase tracking-tight">Visitor Information</h4>
            <p className="text-[13px] text-black/40 font-medium">Select ticket quantities</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[16px] font-bold text-black">Adult Tickets</h4>
              <p className="text-[13px] text-black/40">QAR 25 per person</p>
            </div>
            <div className="flex items-center gap-4 bg-[#F9F9F9] p-2    rounded-sm  border border-black/5">
              <button onClick={() => setAdultQty(Math.max(1, adultQty - 1))} className="w-10 h-10  rounded-sm bg-white flex items-center justify-center shadow-sm active:scale-95 transition-all"><Minus className="w-4 h-4" /></button>
              <span className="text-[18px] font-bold w-8 text-center">{adultQty}</span>
              <button onClick={() => setAdultQty(adultQty + 1)} className="w-10 h-10  rounded-sm bg-primary text-white flex items-center justify-center shadow-sm active:scale-95 transition-all"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[16px] font-bold text-black">Kid Tickets</h4>
              <p className="text-[13px] text-black/40">QAR 15 per person (Under 12)</p>
            </div>
            <div className="flex items-center gap-4 bg-[#F9F9F9] p-2    rounded-sm  border border-black/5">
              <button onClick={() => setKidsQty(Math.max(0, kidsQty - 1))} className="w-10 h-10  rounded-sm bg-white flex items-center justify-center shadow-sm active:scale-95 transition-all"><Minus className="w-4 h-4" /></button>
              <span className="text-[18px] font-bold w-8 text-center">{kidsQty}</span>
              <button onClick={() => setKidsQty(kidsQty + 1)} className="w-10 h-10  rounded-sm bg-primary text-white flex items-center justify-center shadow-sm active:scale-95 transition-all"><Plus className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setStep(3)} className="w-full bg-black text-white    rounded-sm  py-6 text-[18px] font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.97] hover:bg-black/90  shadow-sm  shadow-black/10">
        Next: Terms & Conditions <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderStep3 = () => {
    const currentTerms = selectedTier === 'dog-owner' ? dogTerms : (selectedTier === 'cat-owner' ? catTerms : adultTerms);
    const isDog = selectedTier === 'dog-owner';

    return (
      <div className="animate-in fade-in slide-in-from-right duration-500 space-y-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-[18px] font-bold uppercase tracking-tight">Terms & Conditions</h4>
              <p className="text-[13px] text-black/40 font-medium">{isDog ? "16 items must be checked individually" : "Please agree to the terms below"}</p>
            </div>
            {isDog && <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-[12px] font-bold uppercase">Mandatory</span>}
          </div>

          <div className={`grid grid-cols-1 gap-4 ${isDog ? 'max-h-[500px]' : ''} overflow-y-auto pr-4 custom-scrollbar`}>
            {currentTerms.map((term, i) => (
              <div key={i} className="flex items-start space-x-4 p-5    rounded-sm  bg-[#F9F9F9] border border-black/5 transition-all hover:border-primary/30 group cursor-pointer">
                <Checkbox id={`term-${i}`} className="mt-1 w-5 h-5    rounded-sm  border-black/10 data-[state=checked]:bg-primary data-[state=checked]:border-primary" required />
                <Label htmlFor={`term-${i}`} className="text-[14px] text-black/60 leading-relaxed cursor-pointer group-hover:text-black transition-colors">
                  {term}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setStep(4)} className="w-full bg-black text-white    rounded-sm  py-6 text-[18px] font-bold transition-all active:scale-[0.97] hover:bg-black/90  shadow-sm  shadow-black/10">
          Proceed to Payment
        </button>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="animate-in fade-in slide-in-from-right duration-500 space-y-10">
      <div className="space-y-8">
        <h4 className="text-[18px] font-bold uppercase tracking-tight text-center">Payment Method</h4>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-8 rounded-sm border border-primary bg-primary/5 flex flex-col items-center gap-3 transition-all active:scale-[0.95]">
            <CreditCard className="w-8 h-8 text-primary" />
            <span className="font-bold">Card</span>
          </button>
          <button className="p-8 rounded-sm border border-black/5 bg-[#F9F9F9] flex flex-col items-center gap-3 transition-all active:scale-[0.95]">
            <div className="w-8 h-8 bg-black text-white    rounded-sm  flex items-center justify-center font-bold text-[12px]">Pay</div>
            <span className="font-bold">Apple/Google</span>
          </button>
        </div>
      </div>
      <button onClick={() => setStep(5)} className="w-full bg-black text-white    rounded-sm  py-6 text-[18px] font-bold transition-all active:scale-[0.97] hover:bg-black/90  shadow-sm ">
        Submit Payment
      </button>
    </div>
  );

  const renderStep5 = () => (
    <div className="animate-in fade-in slide-in-from-right duration-500 space-y-10 text-center">
      <div className="space-y-6">
        <h4 className="text-[18px] font-bold uppercase tracking-tight">OTP Verification</h4>
        <p className="text-black/50">We've sent a 6-digit code to your mobile/email.</p>
        <div className="flex justify-center">
          <input 
            type="text" 
            maxLength={6} 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full max-w-[300px] h-20 text-center text-[32px] font-bold tracking-[0.5em]    rounded-sm  border border-black/5 bg-[#F9F9F9] focus:bg-white focus:border-primary outline-none transition-all"
            placeholder="000000"
          />
        </div>
      </div>
      <button onClick={() => setStep(6)} className="w-full bg-black text-white    rounded-sm  py-6 text-[18px] font-bold transition-all active:scale-[0.97] hover:bg-black/90  shadow-sm ">
        Verify & Generate Tickets
      </button>
    </div>
  );

  const renderStep6 = () => (
    <div className="animate-in zoom-in fade-in duration-700 space-y-8 text-center py-10">
      <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-8  shadow-sm  shadow-primary/40">
        <Check className="w-12 h-12 stroke-[3px]" />
      </div>
      <div>
        <h3 className="text-[36px] font-bold font-display mb-4 tracking-tight">Purchase Successful!</h3>
        <p className="text-[18px] text-black/50 max-w-[500px] mx-auto leading-relaxed">
          Your tickets have been purchased successfully. Your QR code has been sent to your email and mobile number. Please present your QR code at the entrance.
        </p>
      </div>
      <div className="bg-[#F9F9F9] rounded-sm p-10 space-y-5 text-left max-w-[450px] mx-auto border border-black/5">
        <div className="flex justify-between border-b border-black/5 pb-4">
          <span className="text-black/40 font-bold uppercase text-[12px] tracking-widest">Order ID</span>
          <span className="font-bold">#NPV-2026-T8X</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-black/40 font-bold uppercase text-[12px] tracking-widest">Total Paid</span>
          <span className="text-[32px] font-display font-bold text-primary">QAR {total}</span>
        </div>
      </div>
      <button onClick={() => window.location.href = '/'} className="inline-flex items-center justify-center px-12 py-6 bg-black text-white    rounded-sm  font-bold text-[18px] transition-all hover:scale-105 active:scale-95  shadow-sm  shadow-black/20">
        Return to Festival Home
      </button>
    </div>
  );

  return (
    <section className="py-20 md:py-32 bg-[#F9F9F9]">
      <div className="container mx-auto px-6 max-w-[900px]">
        <div className="bg-white rounded-sm p-8 md:p-20  shadow-sm  shadow-black/5 border border-black/5 relative overflow-hidden">
          
          {/* Header */}
          {step < 6 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                  Step {step} of 5
                </span>
                <span className="text-black/20 font-bold">/</span>
                <span className="text-black/60 font-bold uppercase text-[11px] tracking-widest">
                  {selectedTier.replace('-', ' ')} flow
                </span>
              </div>
              <h2 className="text-[40px] md:text-[60px] font-display font-bold text-black leading-[0.95] tracking-tighter mb-6">
                {step === 1 ? "Owner Details" : step === 2 ? "Ticket Selection" : step === 3 ? "Safety Terms" : step === 4 ? "Payment" : "Verification"}
              </h2>
              
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" 
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
          {step < 4 && (
            <div className="mt-16 bg-[#F9F9F9]    rounded-sm  p-10 space-y-5 border border-black/5">
              <h5 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black/30 mb-4 px-2">Order Summary</h5>
              <div className="space-y-4">
                <div className="flex justify-between text-[16px] font-bold text-black/60 px-2">
                  <span>Adult Tickets × {adultQty}</span>
                  <span>QAR {adultQty * ADULT_PRICE}</span>
                </div>
                {kidsQty > 0 && (
                  <div className="flex justify-between text-[16px] font-bold text-black/60 px-2">
                    <span>Kids Tickets × {kidsQty}</span>
                    <span>QAR {kidsQty * KID_PRICE}</span>
                  </div>
                )}
                {petQty > 0 && (
                  <div className="flex justify-between text-[16px] font-bold text-black/60 px-2">
                    <span>{selectedTier === 'dog-owner' ? 'Dog' : 'Cat'} Registration × {petQty}</span>
                    <span>QAR {petQty * PET_FEE}</span>
                  </div>
                )}
                <div className="pt-6 border-t border-black/10 flex justify-between items-center px-2">
                  <span className="text-[20px] font-bold text-black uppercase tracking-widest">Total</span>
                  <span className="text-[36px] font-display font-bold text-primary">QAR {total}</span>
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
