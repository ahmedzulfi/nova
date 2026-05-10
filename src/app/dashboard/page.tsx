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
  isCompetitionPass?: boolean;
  eventName?: string;
}

const QR_CODE_URL = "https://public-api.qr-code-generator.com/v1/create/extended?image_format=PNG&image_width=300&qr_code_text=https%3A%2F%2Fvalidmvps.vercel.app%2F&foreground_color=%23000000&background_color=%23FFFFFF&frame_name=no-frame";

export default function DashboardPage() {
  const [data, setData] = useState<RegistrationData | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'ticket' | 'competition'>('ticket');

  useEffect(() => {
    const savedData = localStorage.getItem('nova_registration');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setData(parsed);
      if (parsed.isCompetitionPass) {
        setIsPaid(true);
        setActiveTab('competition');
      }
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
            <h1 className="text-[32px] font-display font-bold tracking-tighter">Start Here</h1>
            <a href="/tickets" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-sm font-bold text-[14px] hover:bg-black/90 active:scale-[0.98] transition-all">
              Get Tickets <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>
    );
  }

  const tierLabel = data.isCompetitionPass ? 'Competitor' : data.tier === 'dog-owner' ? 'Dog Owner' : data.tier === 'cat-owner' ? 'Cat Owner' : 'Adult';
  const TierIcon = data.tier === 'dog-owner' ? Dog : data.tier === 'cat-owner' ? Cat : User;

  if (!isPaid) {
    return (
      <main className="min-h-screen bg-[#F5F5F0]">
        <Navigation />
        <section className="pt-36 pb-24">
          <div className="container mx-auto px-6 max-w-[1100px]">
            <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30 mb-4">Final Step</p>
              <h1 className="text-[40px] md:text-[56px] font-display font-bold tracking-tighter leading-[0.9] text-black">
                Review &<br />Complete
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-white rounded-sm border border-black/5 p-8 flex items-center gap-6">
                  <div className="w-16 h-16 bg-black rounded-sm flex items-center justify-center flex-shrink-0">
                    <TierIcon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-1">Registered As</p>
                    <p className="text-[18px] font-bold tracking-tight truncate">{data.fullName}</p>
                    <p className="text-[12px] text-black/40 font-medium">{data.email} · {data.phone}</p>
                  </div>
                  <span className="flex-shrink-0 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                    {tierLabel}
                  </span>
                </div>

                <div className="bg-white rounded-sm border border-black/5 overflow-hidden">
                  <div className="px-8 py-6 border-b border-black/5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">Ticket Breakdown</p>
                  </div>
                  <div className="divide-y divide-black/5">
                    <div className="px-8 py-5 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[14px]">Adult {data.tier === 'dog-owner' ? '(Dog Owner)' : data.tier === 'cat-owner' ? '(Cat Owner)' : ''}</p>
                        <p className="text-[12px] text-black/40 font-medium">QAR 25 × {data.adultQty}</p>
                      </div>
                      <span className="font-bold text-[16px]">QAR {data.adultQty * 25}</span>
                    </div>
                  </div>
                  <div className="bg-black px-8 py-7 flex items-center justify-between">
                    <p className="text-white text-[12px] font-bold uppercase tracking-[0.2em]">Total</p>
                    <p className="text-primary text-[32px] font-display font-bold leading-none">QAR {data.total}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-sm border border-black/5 p-8 space-y-8">
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full py-5 rounded-sm font-bold text-[15px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
                      isProcessing ? 'bg-black/60 text-white cursor-wait' : 'bg-black text-white hover:bg-black/90'
                    }`}
                  >
                    {isProcessing ? 'Processing…' : `Pay QAR ${data.total}`} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <Navigation />
      <section className="pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-[1100px]">

          {/* Header & Tabs */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-[40px] md:text-[56px] font-display font-bold tracking-tighter leading-[0.9] text-black mb-6">
                My Dashboard
              </h1>
              {data.isCompetitionPass && (
                <div className="flex gap-1 p-1 bg-black/5 rounded-sm w-fit">
                  <button 
                    onClick={() => setActiveTab('ticket')}
                    className={`px-6 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === 'ticket' ? 'bg-black text-white shadow-lg' : 'text-black/40 hover:text-black'}`}
                  >
                    Entry Ticket
                  </button>
                  <button 
                    onClick={() => setActiveTab('competition')}
                    className={`px-6 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === 'competition' ? 'bg-black text-white shadow-lg' : 'text-black/40 hover:text-black'}`}
                  >
                    Competition Profile
                  </button>
                </div>
              )}
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-1">Order ID</p>
              <p className="font-bold text-[18px] tracking-widest">{data.orderId}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* ── Main Content Area ── */}
            <div className="lg:col-span-3 space-y-6">
              {activeTab === 'ticket' ? (
                /* Ticket View */
                <div className="bg-white rounded-sm border border-black/5 overflow-hidden shadow-sm animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="bg-black px-10 py-8 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Nova Paw Festival</p>
                      <p className="text-white text-[18px] font-bold tracking-tight leading-tight">Official Entry Pass<br />Qatar · 2026</p>
                    </div>
                    <div className="bg-primary px-4 py-2 rounded-sm">
                      <p className="text-white text-[11px] font-bold uppercase tracking-widest">{tierLabel}</p>
                    </div>
                  </div>
                  <div className="px-10 py-10 flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-3 border-2 border-black rounded-sm bg-white">
                        <img src={QR_CODE_URL} alt="Entry QR Code" width={150} height={150} />
                      </div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30">Scan at Entrance</p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-y-8">
                      <div className="col-span-2">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30 mb-1">Attendee</p>
                        <p className="font-bold text-[20px] tracking-tight">{data.fullName}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30 mb-1">Venue</p>
                        <p className="font-bold text-[14px]">The Pearl</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30 mb-1">Status</p>
                        <p className="font-bold text-[14px] text-green-600 uppercase">Confirmed</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Competition View */
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="bg-white rounded-sm border border-black/5 p-10">
                    <div className="flex items-start justify-between mb-10">
                      <div className="space-y-2">
                        <span className="px-3 py-1 bg-primary text-white text-[9px] font-bold uppercase tracking-widest rounded-sm">In Review</span>
                        <h2 className="text-[32px] font-display font-bold tracking-tighter text-black">{data.eventName}</h2>
                        <p className="text-[14px] text-black/40">Official Registration ID: {data.orderId}</p>
                      </div>
                      <div className="w-16 h-16 bg-[#F5F5F0] rounded-sm flex items-center justify-center">
                        {data.tier.includes('dog') ? <Dog className="w-8 h-8 text-black/20" /> : <Cat className="w-8 h-8 text-black/20" />}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/5 pt-10">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30 mb-4">Pet Profile</p>
                        <div className="space-y-4">
                          <div>
                            <p className="text-[9px] font-bold text-black/40 uppercase mb-1">Pet Name</p>
                            <p className="font-bold">{data.petName || '—'}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-black/40 uppercase mb-1">Health Compliance</p>
                            <p className="text-[12px] font-medium text-green-600 flex items-center gap-2">
                              <Check className="w-3 h-3" /> Documents Uploaded
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-black text-white rounded-sm p-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Judging Note</p>
                        <p className="text-[12px] leading-relaxed text-white/70">
                          Your application is currently being evaluated by the international panel. Approval status will be updated here within 48 hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-black/5 p-6 rounded-sm">
                      <p className="text-[9px] font-bold text-black/30 uppercase mb-2">Arena Entry</p>
                      <p className="text-[14px] font-bold">Main Stage · Day 1</p>
                    </div>
                    <div className="bg-white border border-black/5 p-6 rounded-sm">
                      <p className="text-[9px] font-bold text-black/30 uppercase mb-2">Judge Group</p>
                      <p className="text-[14px] font-bold">WKU officials</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-2 space-y-4">
              {/* Competition Promotion (Only on Ticket Tab and if not a competitor) */}
              {!data.isCompetitionPass && activeTab === 'ticket' && (
                <div className="bg-black rounded-sm p-8 text-white space-y-6 animate-in zoom-in duration-500">
                  <h3 className="text-[20px] font-display font-bold leading-tight">Ready to Shine?</h3>
                  <p className="text-[12px] text-white/60 leading-relaxed">Your pet can still join the international stage. Register for a competition today.</p>
                  <button onClick={() => window.location.href = '/registration'} className="w-full py-4 bg-primary text-white rounded-sm font-bold text-[11px] uppercase tracking-widest hover:scale-105 transition-all">
                    Register Now
                  </button>
                </div>
              )}

              <div className="bg-white rounded-sm border border-black/5 p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-6">Security Details</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] font-bold text-black/30 uppercase mb-1">Email Hash</p>
                    <p className="text-[12px] font-mono break-all">{data.email}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-black/30 uppercase mb-1">Issued Date</p>
                    <p className="text-[12px] font-bold">May 10, 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-sm border border-black/5 p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-6">Need Help?</p>
                <button className="w-full py-4 border border-black/10 rounded-sm font-bold text-[11px] uppercase tracking-widest hover:bg-black/5 transition-all">
                  Contact Support
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
