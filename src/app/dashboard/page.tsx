'use client';

import React, { useEffect, useState } from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { QrCode, Dog, Cat, Calendar, MapPin, User, ArrowRight, Download, Share2 } from 'lucide-react';

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

export default function DashboardPage() {
  const [data, setData] = useState<RegistrationData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('nova_registration');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-48 pb-32 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-black/5 rounded-sm flex items-center justify-center mb-8 animate-pulse">
            <User className="w-10 h-10 text-black/10" />
          </div>
          <h1 className="text-[32px] font-display font-black mb-4">No Active Session</h1>
          <p className="text-black/40 mb-8">Please complete your registration to view your dashboard.</p>
          <a href="/tickets" className="bg-primary text-white px-10 py-5 rounded-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all">
            Go to Tickets
          </a>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <Navigation />

      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 max-w-[1280px]">
          
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-[12px] mb-4 block">Attendee Portal</span>
              <h1 className="text-[48px] md:text-[72px] font-display font-black text-black leading-[0.9] tracking-tighter">
                Welcome, <br />
                {data.fullName.split(' ')[0]}
              </h1>
            </div>
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="bg-white p-6 rounded-sm border border-black/5 shadow-sm text-right">
                <p className="text-black/40 text-[11px] font-bold uppercase tracking-widest mb-1">Order Status</p>
                <div className="flex items-center gap-2 justify-end">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-black text-[18px]">Confirmed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Ticket Pass */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-sm border border-black/5 overflow-hidden shadow-sm animate-in fade-in slide-in-from-left-8 duration-700">
                <div className="bg-black p-8 text-white flex justify-between items-center">
                  <div>
                    <h3 className="text-[24px] font-display font-black tracking-tight">Festival Entry Pass</h3>
                    <p className="text-white/40 text-[13px] font-medium">Nova Paw Festival · Qatar 2026</p>
                  </div>
                  <div className="px-4 py-2 bg-primary text-white rounded-sm text-[12px] font-black uppercase">
                    {data.tier.replace('-', ' ')}
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12">
                  <div className="flex-grow space-y-10">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-black/30 text-[11px] font-bold uppercase tracking-widest mb-2">Attendee</p>
                        <p className="font-bold text-[18px]">{data.fullName}</p>
                      </div>
                      <div>
                        <p className="text-black/30 text-[11px] font-bold uppercase tracking-widest mb-2">Order ID</p>
                        <p className="font-bold text-[18px]">{data.orderId}</p>
                      </div>
                      <div>
                        <p className="text-black/30 text-[11px] font-bold uppercase tracking-widest mb-2">Access Type</p>
                        <p className="font-bold text-[18px]">
                          {data.adultQty} Adult{data.adultQty > 1 && 's'}
                          {data.kidsQty > 0 && `, ${data.kidsQty} Kid${data.kidsQty > 1 && 's'}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-black/30 text-[11px] font-bold uppercase tracking-widest mb-2">Venue</p>
                        <p className="font-bold text-[18px]">The Pearl, Qatar</p>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-black/5 flex flex-wrap gap-4">
                      <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-sm text-[13px] font-bold hover:bg-black/90 transition-all active:scale-95">
                        <Download className="w-4 h-4" /> Download PDF
                      </button>
                      <button className="flex items-center gap-2 bg-[#F9F9F9] text-black px-6 py-3 rounded-sm border border-black/5 text-[13px] font-bold hover:bg-black hover:text-white transition-all active:scale-95">
                        <Share2 className="w-4 h-4" /> Share Ticket
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-8 bg-[#F9F9F9] rounded-sm border border-black/5 min-w-[240px]">
                    <div className="bg-white p-4 rounded-sm border border-black/5 mb-4">
                      <QrCode className="w-32 h-32 text-black" />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black/30">Scan at Entrance</p>
                  </div>
                </div>
              </div>

              {/* Pet Card */}
              {data.petQty > 0 && (
                <div className="bg-primary p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white rounded-sm flex items-center justify-center text-primary shadow-lg">
                      {data.tier === 'dog-owner' ? <Dog className="w-10 h-10" /> : <Cat className="w-10 h-10" />}
                    </div>
                    <div>
                      <h4 className="text-[28px] font-display font-black text-white leading-tight">
                        {data.petName} <span className="text-white/60 text-[20px]">is ready!</span>
                      </h4>
                      <p className="text-white/80 font-bold uppercase tracking-widest text-[12px] mt-2">
                        Registered {data.tier === 'dog-owner' ? 'Dog' : 'Cat'} · {data.petQty} Entry
                      </p>
                    </div>
                  </div>
                  <button className="bg-black text-white px-8 py-4 rounded-sm font-bold text-[14px] hover:scale-105 active:scale-95 transition-all">
                    Register for Competitions
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar: Schedule & Info */}
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
              <div className="bg-white p-8 rounded-sm border border-black/5 shadow-sm">
                <h4 className="text-[18px] font-bold uppercase tracking-tight mb-8 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" /> Event Schedule
                </h4>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="text-[14px] font-black text-primary min-w-[60px]">09:00</span>
                    <div>
                      <p className="font-bold text-[15px]">Opening Ceremony</p>
                      <p className="text-black/40 text-[13px]">Main Stage</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[14px] font-black text-primary min-w-[60px]">11:30</span>
                    <div>
                      <p className="font-bold text-[15px]">{data.tier === 'dog-owner' ? 'Dog Arena Open' : 'Cat Dome Experience'}</p>
                      <p className="text-black/40 text-[13px]">Venue A1</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[14px] font-black text-primary min-w-[60px]">15:00</span>
                    <div>
                      <p className="font-bold text-[15px]">International Judging</p>
                      <p className="text-black/40 text-[13px]">Arena Floor</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-10 flex items-center justify-center gap-2 text-black/40 hover:text-black font-bold text-[13px] transition-all">
                  Full Schedule <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#F3F3F3] p-8 rounded-sm border border-black/5">
                <h4 className="text-[18px] font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" /> Venue Info
                </h4>
                <p className="text-[14px] text-black/60 leading-relaxed mb-8">
                  The Pearl Island, Qatar. Please arrive 30 minutes before your scheduled competition. Parking is available at P1 and P4.
                </p>
                <div className="w-full h-40 bg-black/5 rounded-sm relative overflow-hidden grayscale">
                   <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-black/20" />
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
