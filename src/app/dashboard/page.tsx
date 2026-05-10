'use client';

import React, { useEffect, useState } from 'react';
import Navigation from "@/components/sections/navigation";
import { QrCode, Check, CreditCard, ArrowRight, Printer, Share2 } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('nova_registration');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  if (!data) return null;

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 max-w-[1200px]">
          
          {!isPaid ? (
            /* Cinematic Final Payment */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="space-y-12">
                <div>
                  <span className="text-primary font-black uppercase tracking-[0.4em] text-[12px] mb-6 block">Final Step</span>
                  <h1 className="text-[64px] md:text-[84px] font-display font-black leading-[0.9] tracking-tighter text-black">
                    Secure Your <br /> Experience.
                  </h1>
                </div>
                <p className="text-black/40 text-[18px] leading-relaxed max-w-[500px]">
                  Confirm your details and proceed to the payment gateway to finalize your registration for Nova Paw Festival 2026.
                </p>
                <div className="flex items-center gap-8">
                  <div className="h-px bg-black/10 flex-grow" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-black/20">Verified Session</span>
                </div>
              </div>

              <div className="bg-[#F9F9F9] border border-black/5 p-12 md:p-16 rounded-sm space-y-12 shadow-2xl shadow-black/5">
                <div className="space-y-6">
                   <div className="flex justify-between items-end">
                     <p className="text-[11px] font-black uppercase tracking-widest text-black/30">Primary Attendee</p>
                     <p className="font-bold text-[18px] uppercase">{data.fullName}</p>
                   </div>
                   <div className="flex justify-between items-end">
                     <p className="text-[11px] font-black uppercase tracking-widest text-black/30">Selected Pass</p>
                     <p className="font-bold text-[18px] uppercase text-primary">{data.tier.replace('-', ' ')}</p>
                   </div>
                </div>

                <div className="py-10 border-y border-black/5 space-y-4">
                  <div className="flex justify-between text-black/60 font-medium">
                    <span>Registration Fee</span>
                    <span>QAR {data.total}.00</span>
                  </div>
                  <div className="flex justify-between text-black/60 font-medium">
                    <span>Service Fee</span>
                    <span className="text-green-500 font-bold">Complimentary</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[20px] font-black uppercase tracking-tighter">Amount Due</span>
                  <span className="text-[56px] font-display font-black leading-none text-black">QAR {data.total}</span>
                </div>

                <button 
                  onClick={() => setIsPaid(true)}
                  className="w-full h-24 bg-black text-white rounded-sm font-black text-[20px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-primary transition-all duration-500 active:scale-[0.98]"
                >
                  <CreditCard className="w-6 h-6" /> Pay Now
                </button>
              </div>
            </div>
          ) : (
            /* The "Physical Ticket" Dashboard */
            <div className="animate-in fade-in zoom-in-95 duration-1000">
              <div className="flex flex-col items-center text-center mb-20">
                <div className="w-20 h-20 bg-primary text-white rounded-sm flex items-center justify-center mb-8 shadow-xl shadow-primary/20">
                  <Check className="w-10 h-10 stroke-[3px]" />
                </div>
                <h2 className="text-[48px] md:text-[64px] font-display font-black tracking-tighter leading-none mb-4">You're in, {data.fullName.split(' ')[0]}.</h2>
                <p className="text-black/40 font-bold uppercase tracking-[0.3em] text-[12px]">Nova Paw Festival · Qatar 2026</p>
              </div>

              <div className="max-w-[500px] mx-auto group">
                <div className="bg-white border-2 border-black rounded-sm overflow-hidden shadow-[32px_32px_0px_0px_rgba(0,0,0,0.02)] transition-transform duration-700 group-hover:scale-[1.01]">
                  
                  {/* Ticket Header */}
                  <div className="bg-black text-white p-8 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Pass Type</p>
                      <h3 className="text-[20px] font-display font-black uppercase tracking-tight">{data.tier.replace('-', ' ')}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Status</p>
                      <p className="text-primary font-black uppercase tracking-widest text-[12px]">Confirmed</p>
                    </div>
                  </div>

                  {/* QR Section */}
                  <div className="p-12 flex flex-col items-center bg-[#F9F9F9] border-b-2 border-dashed border-black/10 relative">
                    <div className="bg-white p-6 border-2 border-black rounded-sm shadow-sm mb-6">
                      <QrCode className="w-48 h-48 text-black" />
                    </div>
                    <p className="text-[12px] font-mono font-bold text-black/20 uppercase tracking-widest">{data.orderId}</p>
                    
                    {/* Perforation circles */}
                    <div className="absolute -left-4 top-full -translate-y-1/2 w-8 h-8 bg-white border-2 border-black rounded-full" />
                    <div className="absolute -right-4 top-full -translate-y-1/2 w-8 h-8 bg-white border-2 border-black rounded-full" />
                  </div>

                  {/* Details Section */}
                  <div className="p-10 space-y-10 bg-white">
                    <div className="grid grid-cols-2 gap-8">
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Attendee</p>
                         <p className="font-bold text-[16px] leading-tight">{data.fullName}</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Venue</p>
                         <p className="font-bold text-[16px] leading-tight uppercase">The Pearl, Qatar</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Access</p>
                         <p className="font-bold text-[16px] leading-tight">
                           {data.adultQty} Adults{data.kidsQty > 0 && `, ${data.kidsQty} Kids`}
                         </p>
                       </div>
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Registered Pet</p>
                         <p className="font-bold text-[16px] leading-tight">{data.petName || 'N/A'}</p>
                       </div>
                    </div>
                    
                    <div className="pt-10 border-t border-black/5 flex justify-between items-center">
                       <div className="flex gap-4">
                          <button onClick={() => window.print()} className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90">
                            <Printer className="w-5 h-5" />
                          </button>
                          <button className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90">
                            <Share2 className="w-5 h-5" />
                          </button>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-black/20">Date of Issue</p>
                          <p className="font-bold text-[12px]">May 2026</p>
                       </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-20 flex justify-center">
                 <button onClick={() => window.location.href = '/'} className="group flex items-center gap-4 text-[14px] font-black uppercase tracking-[0.4em] text-black/20 hover:text-black transition-all">
                   <ArrowRight className="w-6 h-6 rotate-180 group-hover:-translate-x-2 transition-transform" /> Back to Home
                 </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
