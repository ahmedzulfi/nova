'use client';

import React, { useEffect, useState } from 'react';
import Navigation from "@/components/sections/navigation";
import { QrCode, Check, CreditCard } from 'lucide-react';

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
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-[600px]">
          
          {!isPaid ? (
            /* Step 5 & 6 Integrated: Final Payment */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="text-center mb-12">
                <h1 className="text-[40px] font-display font-black tracking-tighter">Complete Purchase</h1>
                <p className="text-black/40 font-medium">Review your selection and finalize payment</p>
              </div>

              <div className="bg-[#F9F9F9] rounded-sm border border-black/5 p-8 space-y-6">
                <div className="space-y-3 pb-6 border-b border-black/5">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-black/40 font-bold uppercase tracking-widest">Name</span>
                    <span className="font-bold">{data.fullName}</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-black/40 font-bold uppercase tracking-widest">Tier</span>
                    <span className="font-bold uppercase">{data.tier.replace('-', ' ')}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[15px] font-medium">
                    <span>Adult Tickets × {data.adultQty}</span>
                    <span>QAR {data.adultQty * 25}</span>
                  </div>
                  {data.kidsQty > 0 && (
                    <div className="flex justify-between text-[15px] font-medium">
                      <span>Kids Tickets × {data.kidsQty}</span>
                      <span>QAR {data.kidsQty * 15}</span>
                    </div>
                  )}
                  {data.petQty > 0 && (
                    <div className="flex justify-between text-[15px] font-medium">
                      <span>{data.tier.replace('-owner', '')} Registration</span>
                      <span>QAR {data.petQty * 25}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-black/10 flex justify-between items-center">
                  <span className="text-[18px] font-black uppercase tracking-tighter">Total Due</span>
                  <span className="text-[48px] font-display font-black text-primary leading-none">QAR {data.total}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setIsPaid(true)}
                  className="w-full bg-black text-white py-6 rounded-sm font-black text-[18px] flex items-center justify-center gap-3 transition-all hover:bg-black/90 active:scale-[0.98] shadow-2xl shadow-black/20"
                >
                  <CreditCard className="w-6 h-6" /> Pay & Generate Tickets
                </button>
                <p className="text-[11px] text-center text-black/30 font-medium px-4">Secure payment processed by QPay. By continuing, you agree to our terms of service.</p>
              </div>
            </div>
          ) : (
            /* Simple Dashboard: QR Code & Details Only */
            <div className="animate-in zoom-in fade-in duration-700 space-y-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-sm flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Check className="w-8 h-8 stroke-[4px]" />
                </div>
                <h1 className="text-[40px] font-display font-black tracking-tighter mb-2">Digital Pass</h1>
                <p className="text-black/40 font-bold uppercase tracking-widest text-[11px]">Nova Paw Festival · Qatar 2026</p>
              </div>

              <div className="bg-white rounded-sm border-2 border-black p-10 space-y-12 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 bg-black text-white text-[10px] font-black uppercase tracking-widest">
                   Official Entry
                </div>

                <div className="flex flex-col items-center py-4">
                   <div className="p-4 bg-white border border-black/10 rounded-sm mb-6">
                      <QrCode className="w-48 h-48 text-black" />
                   </div>
                   <p className="text-[13px] font-black uppercase tracking-[0.2em] text-black/30">Order ID: {data.orderId}</p>
                </div>

                <div className="grid grid-cols-2 gap-y-10 gap-x-8 pt-10 border-t border-black/10">
                  <div>
                    <p className="text-black/30 text-[10px] font-bold uppercase tracking-widest mb-1">Attendee</p>
                    <p className="font-bold text-[18px] leading-tight">{data.fullName}</p>
                  </div>
                  <div>
                    <p className="text-black/30 text-[10px] font-bold uppercase tracking-widest mb-1">Pass Type</p>
                    <p className="font-bold text-[18px] leading-tight uppercase">{data.tier.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-black/30 text-[10px] font-bold uppercase tracking-widest mb-1">Guests</p>
                    <p className="font-bold text-[18px] leading-tight">
                      {data.adultQty} Adult{data.adultQty > 1 && 's'}
                      {data.kidsQty > 0 && `, ${data.kidsQty} Kid${data.kidsQty > 1 && 's'}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-black/30 text-[10px] font-bold uppercase tracking-widest mb-1">Pet</p>
                    <p className="font-bold text-[18px] leading-tight">{data.petName || 'None'}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-8 pt-10">
                 <button onClick={() => window.print()} className="text-[12px] font-black uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors">Download PDF</button>
                 <button onClick={() => window.location.href = '/'} className="text-[12px] font-black uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors">Return to Site</button>
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
