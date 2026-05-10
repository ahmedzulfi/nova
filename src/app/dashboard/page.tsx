'use client';

import React, { useEffect, useState } from 'react';
import Navigation from "@/components/sections/navigation";
import { Check, CreditCard, ArrowRight, Dog, Cat, User } from 'lucide-react';

interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  tier: string;
  adultQty: number;
  kidsQty: number;
  petQty: number;
  petName: string;
  total: number;
  orderId: string;
}

const QR_CODE_URL = "https://public-api.qr-code-generator.com/v1/create/extended?image_format=PNG&image_width=300&qr_code_text=https%3A%2F%2Fvalidmvps.vercel.app%2F&foreground_color=%23000000&background_color=%23FFFFFF&frame_name=no-frame";

export default function DashboardPage() {
  const [data, setData] = useState<RegistrationData | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('nova_registration');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  if (!data) {
    return (
      <main className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30">No Session Found</p>
            <h1 className="text-[32px] font-display  font-bold  tracking-tighter">Start Here</h1>
            <a href="/tickets" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-sm  font-bold  text-[14px] hover:bg-black/90 active:scale-[0.98] transition-all">
              Get Tickets <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>
    );
  }

  const tierLabel = data.tier === 'dog-owner' ? 'Dog Owner' : data.tier === 'cat-owner' ? 'Cat Owner' : 'Adult';
  const TierIcon = data.tier === 'dog-owner' ? Dog : data.tier === 'cat-owner' ? Cat : User;

  if (!isPaid) {
    return (
      <main className="min-h-screen bg-[#F5F5F0]">
        <Navigation />
        <section className="pt-36 pb-24">
          <div className="container mx-auto px-6 max-w-[1100px]">
            
            {/* Header */}
            <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-[10px]  font-bold  uppercase tracking-[0.3em] text-black/30 mb-4">Final Step</p>
              <h1 className="text-[40px] md:text-[56px] font-display  font-bold  tracking-tighter leading-[0.9] text-black">
                Review &<br />Complete
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              
              {/* Left: Order Breakdown */}
              <div className="lg:col-span-3 space-y-4">
                
                {/* Attendee Card */}
                <div className="bg-white rounded-sm border border-black/5 p-8 flex items-center gap-6">
                  <div className="w-16 h-16 bg-black rounded-sm flex items-center justify-center flex-shrink-0">
                    <TierIcon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-1">Registered As</p>
                    <p className="text-[18px]  font-bold  tracking-tight truncate">{data.fullName}</p>
                    <p className="text-[12px] text-black/40 font-medium">{data.email} · {data.phone}</p>
                  </div>
                  <span className="flex-shrink-0 bg-primary text-white text-[10px]  font-bold  uppercase tracking-widest px-3 py-1.5 rounded-sm">
                    {tierLabel}
                  </span>
                </div>

                {/* Ticket Breakdown */}
                <div className="bg-white rounded-sm border border-black/5 overflow-hidden">
                  <div className="px-8 py-6 border-b border-black/5">
                    <p className="text-[10px]  font-bold  uppercase tracking-[0.2em] text-black/30">Ticket Breakdown</p>
                  </div>
                  <div className="divide-y divide-black/5">
                    <div className="px-8 py-5 flex items-center justify-between">
                      <div>
                        <p className=" font-bold  text-[14px]">Adult {data.tier === 'dog-owner' ? '(Dog Owner)' : data.tier === 'cat-owner' ? '(Cat Owner)' : ''}</p>
                        <p className="text-[12px] text-black/40 font-medium">QAR 25 × {data.adultQty}</p>
                      </div>
                      <span className=" font-bold  text-[16px]">QAR {data.adultQty * 25}</span>
                    </div>
                    {data.kidsQty > 0 && (
                      <div className="px-8 py-5 flex items-center justify-between">
                        <div>
                          <p className=" font-bold  text-[14px]">Kids</p>
                          <p className="text-[12px] text-black/40 font-medium">QAR 15 × {data.kidsQty}</p>
                        </div>
                        <span className=" font-bold  text-[16px]">QAR {data.kidsQty * 15}</span>
                      </div>
                    )}
                    {data.petQty > 0 && (
                      <div className="px-8 py-5 flex items-center justify-between">
                        <div>
                          <p className=" font-bold  text-[14px]">{data.tier === 'dog-owner' ? 'Dog' : 'Cat'} Registration — {data.petName}</p>
                          <p className="text-[12px] text-black/40 font-medium">QAR 25 × {data.petQty}</p>
                        </div>
                        <span className=" font-bold  text-[16px]">QAR {data.petQty * 25}</span>
                      </div>
                    )}
                  </div>
                  <div className="bg-black px-8 py-7 flex items-center justify-between">
                    <p className="text-white text-[12px]  font-bold  uppercase tracking-[0.2em]">Total</p>
                    <p className="text-primary text-[32px] font-display  font-bold  leading-none">QAR {data.total}</p>
                  </div>
                </div>

                <p className="text-[11px] text-black/30 font-medium px-2">Order ID: {data.orderId} · Secured by QPay Payment Gateway</p>
              </div>

              {/* Right: Payment */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-sm border border-black/5 p-8 space-y-8">
                  <div>
                    <p className="text-[10px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-4">Select Payment</p>
                    <div className="space-y-3">
                      <label className="flex items-center gap-4 p-5 rounded-sm border-2 border-black bg-black/5 cursor-pointer">
                        <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-black" />
                        </div>
                        <div className="flex items-center gap-3 flex-1">
                          <CreditCard className="w-5 h-5" />
                          <span className=" font-bold  text-[14px]">Debit / Credit Card</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-4 p-5 rounded-sm border border-black/10 cursor-pointer hover:border-black/30 transition-colors">
                        <div className="w-5 h-5 rounded-full border-2 border-black/20" />
                        <span className=" font-bold  text-[14px] text-black/40">QPay Wallet</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Card Details */}
                  <div className="space-y-4">
                    <div className="bg-[#F5F5F0] rounded-sm px-5 py-4">
                      <p className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-2">Card Number</p>
                      <input type="text" placeholder="0000 0000 0000 0000" className="bg-transparent w-full  font-bold  text-[15px] tracking-widest outline-none placeholder:text-black/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#F5F5F0] rounded-sm px-5 py-4">
                        <p className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-2">Expiry</p>
                        <input type="text" placeholder="MM / YY" className="bg-transparent w-full  font-bold  text-[15px] outline-none placeholder:text-black/20" />
                      </div>
                      <div className="bg-[#F5F5F0] rounded-sm px-5 py-4">
                        <p className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-2">CVV</p>
                        <input type="text" placeholder="•••" className="bg-transparent w-full  font-bold  text-[15px] outline-none placeholder:text-black/20" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full py-5 rounded-sm  font-bold  text-[15px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
                      isProcessing ? 'bg-black/60 text-white cursor-wait' : 'bg-black text-white hover:bg-black/90'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>Pay QAR {data.total} <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-sm p-6 flex items-start gap-4">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] font-bold text-black/60 leading-relaxed">Your ticket and QR code will be generated immediately after successful payment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ──────────────────────────────────────────────────────────
  // CONFIRMED TICKET VIEW
  // ──────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <Navigation />
      <section className="pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-[1100px]">

          {/* Header */}
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[10px]  font-bold  uppercase tracking-[0.3em] text-black/30 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                Booking Confirmed
              </p>
              <h1 className="text-[40px] md:text-[56px] font-display  font-bold  tracking-tighter leading-[0.9] text-black">
                You're In!
              </h1>
            </div>
            <div className="text-right">
              <p className="text-[10px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-1">Order ID</p>
              <p className=" font-bold  text-[18px] tracking-widest">{data.orderId}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

            {/* ── Ticket (hero) ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-sm border border-black/5 overflow-hidden shadow-sm">

                {/* Ticket Header Bar */}
                <div className="bg-black px-10 py-8 flex items-center justify-between">
                  <div>
                    <p className="text-[9px]  font-bold  uppercase tracking-[0.3em] text-white/40 mb-2">Nova Paw Festival</p>
                    <p className="text-white text-[18px]  font-bold  tracking-tight leading-tight">Official Entry Pass<br />Qatar · 2026</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-primary px-4 py-2 rounded-sm inline-block">
                      <p className="text-white text-[11px]  font-bold  uppercase tracking-widest">{tierLabel}</p>
                    </div>
                  </div>
                </div>

                {/* Dashed Divider */}
                <div className="flex items-center px-8 py-0">
                  <div className="w-6 h-6 rounded-full bg-[#F5F5F0] border border-black/5 -ml-11 flex-shrink-0" />
                  <div className="flex-1 border-t-2 border-dashed border-black/10 mx-4" />
                  <div className="w-6 h-6 rounded-full bg-[#F5F5F0] border border-black/5 -mr-11 flex-shrink-0" />
                </div>

                {/* Ticket Body */}
                <div className="px-10 py-10 flex flex-col md:flex-row gap-10">
                  
                  {/* QR Code */}
                  <div className="flex flex-col items-center gap-4 flex-shrink-0">
                    <div className="p-3 border-2 border-black rounded-sm bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={QR_CODE_URL}
                        alt="Entry QR Code"
                        width={150}
                        height={150}
                        className="block"
                      />
                    </div>
                    <p className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/30 text-center">Scan at Entrance</p>
                  </div>

                  {/* Details */}
                  <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-8 content-start">
                    <div className="col-span-2">
                      <p className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-1">Attendee Name</p>
                      <p className=" font-bold  text-[20px] tracking-tight leading-tight">{data.fullName}</p>
                    </div>
                    <div>
                      <p className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-1">Adults</p>
                      <p className=" font-bold  text-[18px]">{data.adultQty}</p>
                    </div>
                    <div>
                      <p className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-1">Kids</p>
                      <p className=" font-bold  text-[18px]">{data.kidsQty > 0 ? data.kidsQty : '—'}</p>
                    </div>
                    {data.petQty > 0 && (
                      <div className="col-span-2">
                        <p className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-1">Registered Pet</p>
                        <p className=" font-bold  text-[18px]">{data.petName}</p>
                      </div>
                    )}
                    <div className="col-span-2 pt-6 border-t border-black/10 flex items-center justify-between">
                      <div>
                        <p className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-1">Venue</p>
                        <p className=" font-bold  text-[14px]">The Pearl · Qatar</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-1">Total Paid</p>
                        <p className=" font-bold  text-[16px] text-primary">QAR {data.total}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket Footer */}
                <div className="border-t border-black/5 bg-[#F5F5F0] px-10 py-5 flex items-center justify-between">
                  <p className="text-[10px]  font-bold  uppercase tracking-[0.2em] text-black/30">Present QR at Main Gate</p>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <p className="text-[10px]  font-bold  uppercase tracking-[0.1em] text-green-600">Verified &amp; Confirmed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Competition Section (EXCLUSIVE TO PET OWNERS) */}
              {(data.tier === 'dog-owner' || data.tier === 'cat-owner') ? (
                <div className="bg-white rounded-sm border border-black/5 p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Pet Owner Exclusive</p>
                    <h3 className="text-[20px] font-display font-bold text-black tracking-tight">Competitions</h3>
                    <p className="text-[12px] text-black/40 mt-1">Register your pet for international judging.</p>
                  </div>

                  {/* Filtered Competitions */}
                  <div className="space-y-3">
                    {data.tier === 'dog-owner' && (
                      <>
                        <div className="group p-4 bg-[#F5F5F0] rounded-sm border border-black/5 hover:border-primary transition-all cursor-pointer" onClick={() => window.location.href = '/registration?event=dog-fashion-show'}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Dog className="w-4 h-4 text-primary" />
                              <span className="text-[13px] font-bold">Dog Fashion Show</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-primary transition-all" />
                          </div>
                          <p className="text-[11px] text-black/40 leading-relaxed">Strut the runway in matching outfits with your dog.</p>
                        </div>
                        <div className="group p-4 bg-[#F5F5F0] rounded-sm border border-black/5 hover:border-primary transition-all cursor-pointer" onClick={() => window.location.href = '/registration?event=dog-grooming'}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-primary" />
                              <span className="text-[13px] font-bold">Grooming Competition</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-primary transition-all" />
                          </div>
                          <p className="text-[11px] text-black/40 leading-relaxed">Showcase your grooming skills to WKU judges.</p>
                        </div>
                      </>
                    )}
                    {data.tier === 'cat-owner' && (
                      <>
                        <div className="group p-4 bg-[#F5F5F0] rounded-sm border border-black/5 hover:border-primary transition-all cursor-pointer" onClick={() => window.location.href = '/registration?event=cat-fashion-show'}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Cat className="w-4 h-4 text-primary" />
                              <span className="text-[13px] font-bold">Cat Fashion Show</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-primary transition-all" />
                          </div>
                          <p className="text-[11px] text-black/40 leading-relaxed">Showcase your cat's style in the Cat Dome.</p>
                        </div>
                        <div className="group p-4 bg-[#F5F5F0] rounded-sm border border-black/5 hover:border-primary transition-all cursor-pointer" onClick={() => window.location.href = '/registration?event=cat-drawing-battle'}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-primary" />
                              <span className="text-[13px] font-bold">Drawing Cat Battle</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-primary transition-all" />
                          </div>
                          <p className="text-[11px] text-black/40 leading-relaxed">Live 1-hour creative battle for artists.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                /* VISITOR ONLY VIEW: No Competitions, maybe just Festival Info */
                <div className="bg-black rounded-sm p-8 space-y-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Festival Guide</p>
                  <div className="space-y-4">
                    <p className="text-[14px] text-white font-display font-bold">Ready for the Pearl?</p>
                    <p className="text-[12px] text-white/60 leading-relaxed">As a general visitor, you have access to all festival zones, food trucks, and live stage performances.</p>
                    <button className="w-full py-4 bg-primary text-white rounded-sm font-bold text-[11px] uppercase tracking-widest hover:bg-primary/90 transition-all">
                      View Event Schedule
                    </button>
                  </div>
                </div>
              )}

              {/* Contact Card */}
              <div className="bg-white rounded-sm border border-black/5 p-8">
                <p className="text-[10px]  font-bold  uppercase tracking-[0.2em] text-black/30 mb-6">Your Details</p>
                <div className="space-y-5">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-black/30 mb-1">Email</p>
                    <p className="font-bold text-[14px]">{data.email}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-black/30 mb-1">Phone</p>
                    <p className="font-bold text-[14px]">{data.phone}</p>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-black rounded-sm p-8 space-y-6">
                <p className="text-[10px]  font-bold  uppercase tracking-[0.2em] text-white/40">What to Know</p>
                <div className="space-y-4">
                  {[
                    "Arrive 30 mins before your competition slot",
                    "Valid pet passport required at the gate",
                    data.tier === 'dog-owner' ? "Muzzle required for medium & large dogs" : data.tier === 'cat-owner' ? "Carrier required for your cat at all times" : "Tickets are non-transferable",
                    "Photography & media coverage will be present"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                      <p className="text-[12px] font-medium text-white/60 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button onClick={() => window.print()} className="flex-1 py-4 rounded-sm bg-white border border-black/10  font-bold  text-[11px] uppercase tracking-widest text-black/50 hover:text-black hover:border-black transition-all">
                  Download
                </button>
                <button onClick={() => window.location.href = '/'} className="flex-1 py-4 rounded-sm bg-primary text-white  font-bold  text-[11px] uppercase tracking-widest hover:bg-primary/90 transition-all">
                  Home
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
