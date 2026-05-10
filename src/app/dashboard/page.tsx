'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { 
  Check, 
  ArrowRight, 
  Dog, 
  Cat, 
  User, 
  Ticket, 
  Trophy, 
  Calendar, 
  Map as MapIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  Info,
  Clock,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

type TabType = 'overview' | 'competitions' | 'health' | 'schedule' | 'map' | 'settings';

function DashboardContent() {
  const router = useRouter();
  const [data, setData] = useState<RegistrationData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('nova_registration');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-6">
        <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-white rounded-sm border border-black/5 shadow-sm flex items-center justify-center mx-auto mb-8">
            <Ticket className="w-12 h-12 text-primary" />
          </div>
          <div className="space-y-4">
            <h1 className="text-[32px] md:text-[48px] font-display font-bold tracking-tighter leading-none text-black">No Session Found</h1>
            <p className="text-[16px] text-black/40 max-w-[400px] mx-auto leading-relaxed">Please complete your ticket purchase to access your personalized festival dashboard.</p>
          </div>
          <button onClick={() => router.push('/tickets')} className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-sm font-bold text-[14px] hover:scale-105 transition-all">
            Get Tickets <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const isPetOwner = data.tier === 'dog-owner' || data.tier === 'cat-owner';
  const TierIcon = data.tier === 'dog-owner' ? Dog : data.tier === 'cat-owner' ? Cat : User;

  const sidebarItems = [
    { id: 'overview', label: 'My Tickets', icon: Ticket, roles: ['any'] },
    { id: 'competitions', label: 'Competitions', icon: Trophy, roles: ['pet-owner'] },
    { id: 'health', label: 'Health Docs', icon: ShieldCheck, roles: ['pet-owner'] },
    { id: 'schedule', label: 'Schedule', icon: Calendar, roles: ['any'] },
    { id: 'map', label: 'Festival Map', icon: MapIcon, roles: ['any'] },
    { id: 'settings', label: 'Account', icon: Settings, roles: ['any'] },
  ];

  const filteredSidebar = sidebarItems.filter(item => 
    item.roles.includes('any') || (item.roles.includes('pet-owner') && isPetOwner)
  );

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex">
      {/* ─── Mobile Sidebar Toggle ────────────────────────────────────────── */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 right-6 z-[100] lg:hidden w-12 h-12 bg-white rounded-sm border border-black/5 shadow-sm flex items-center justify-center"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* ─── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className={`
        fixed inset-y-0 left-0 z-[90] w-72 bg-white border-r border-black/5 transition-transform duration-500 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-8">
          <div className="mb-12">
            <Link href="/" className="inline-block">
              <span className="text-[20px] font-display font-bold tracking-tighter text-black">NOVA<span className="text-primary">PAW</span></span>
            </Link>
          </div>

          <nav className="flex-1 space-y-2">
            {filteredSidebar.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as TabType); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-sm font-bold text-[13px] uppercase tracking-widest transition-all ${
                  activeTab === item.id 
                    ? 'bg-black text-white' 
                    : 'text-black/30 hover:bg-black/5 hover:text-black'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary' : ''}`} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-black/5 mt-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-black rounded-sm flex items-center justify-center flex-shrink-0">
                <TierIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[14px] truncate">{data.fullName}</p>
                <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">{data.tier.replace('-', ' ')}</p>
              </div>
            </div>
            <button 
              onClick={() => { localStorage.removeItem('nova_registration'); router.push('/tickets'); }}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-sm font-bold text-[13px] uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Content ───────────────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-72 min-h-screen p-6 lg:p-12">
        <div className="max-w-[1000px] mx-auto">
          <header className="mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30 mb-4">Dashboard / {activeTab}</p>
            <h1 className="text-[48px] md:text-[64px] font-display font-bold tracking-tighter leading-none text-black">
              {filteredSidebar.find(i => i.id === activeTab)?.label}
            </h1>
          </header>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
              <div className="xl:col-span-3 space-y-6">
                <div className="bg-white rounded-sm border border-black/5 overflow-hidden shadow-sm">
                  <div className="bg-black p-8 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Festival Pass</p>
                      <p className="text-white text-[20px] font-display font-bold tracking-tight">Qatar 2026</p>
                    </div>
                    <div className="bg-primary px-4 py-2 rounded-sm text-white text-[10px] font-bold uppercase tracking-widest">
                      {data.tier.replace('-', ' ')}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col items-center gap-3">
                      <img src={QR_CODE_URL} alt="QR" className="w-32 h-32 border border-black/5 p-2 rounded-sm" />
                      <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">ID: {data.orderId}</p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-6">
                      <div className="col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-1">Attendee</p>
                        <p className="font-bold text-[18px]">{data.fullName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-1">Adults</p>
                        <p className="font-bold text-[18px]">{data.adultQty}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-1">Kids</p>
                        <p className="font-bold text-[18px]">{data.kidsQty || '—'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-2 space-y-6">
                <div className="bg-white rounded-sm border border-black/5 p-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-6">Payment Summary</p>
                  <p className="font-bold text-[24px] mb-8">QAR {data.total}</p>
                  <button className="w-full py-4 border border-black/10 rounded-sm font-bold text-[11px] uppercase tracking-widest hover:border-black transition-all">
                    Download Receipt
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'competitions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Dog Fashion Show", desc: "Matching owner/pet outfits.", slug: "dog-fashion-show", role: 'dog-owner' },
                { title: "Grooming Contest", desc: "Artistry under WKU judges.", slug: "dog-grooming", role: 'dog-owner' },
                { title: "Best Cat Show", desc: "Grand judging of breed standards.", slug: "cat-best-show", role: 'cat-owner' },
                { title: "Drawing Battle", desc: "Live creative battle.", slug: "cat-drawing-battle", role: 'any' }
              ].filter(c => c.role === 'any' || (data.tier === c.role)).map((comp, i) => (
                <div key={i} className="bg-white rounded-sm border border-black/5 p-8 hover:border-primary transition-all">
                  <Trophy className="w-10 h-10 text-primary mb-6" />
                  <h3 className="text-[20px] font-display font-bold mb-2">{comp.title}</h3>
                  <p className="text-[13px] text-black/40 mb-8">{comp.desc}</p>
                  <button onClick={() => router.push(`/registration?event=${comp.slug}`)} className="text-black font-bold text-[12px] uppercase tracking-widest flex items-center gap-2">
                    Register <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'health' && (
            <div className="bg-white rounded-sm border border-black/5 p-12 text-center">
              <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-8" />
              <h2 className="text-[24px] font-display font-bold mb-4">Health Compliance</h2>
              <p className="text-black/40 max-w-[400px] mx-auto mb-8">Required for all international competitions.</p>
              <button className="px-8 py-4 bg-black text-white rounded-sm font-bold text-[12px] uppercase tracking-widest">View Rules</button>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              {[
                { time: "02:00 PM", event: "Grand Opening", zone: "Main Stage" },
                { time: "04:00 PM", event: "Pet Fashion Parade", zone: "Arena" }
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-sm border border-black/5 p-6 flex justify-between">
                  <span className="font-display font-bold text-primary">{s.time}</span>
                  <span className="font-bold">{s.event}</span>
                  <span className="text-black/30 uppercase text-[10px] font-bold tracking-widest">{s.zone}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
