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
  Star,
  Download,
  MapPin,
  Heart
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
    <div className="min-h-screen bg-[#F5F5F0] flex selection:bg-primary selection:text-white">
      {/* ─── Mobile Sidebar Toggle ────────────────────────────────────────── */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 right-6 z-[100] lg:hidden w-12 h-12 bg-white rounded-sm border border-black/5 shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition-all"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* ─── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className={`
        fixed inset-y-0 left-0 z-[90] w-72 bg-white border-r border-black/5 transition-transform duration-500 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-8">
          <div className="mb-16">
            <Link href="/" className="inline-block group">
              <span className="text-[24px] font-display font-bold tracking-tighter text-black">NOVA<span className="text-primary group-hover:text-black transition-colors">PAW</span></span>
            </Link>
          </div>

          <nav className="flex-1 space-y-2">
            {filteredSidebar.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as TabType); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-sm font-bold text-[13px] uppercase tracking-widest transition-all ${
                  activeTab === item.id 
                    ? 'bg-black text-white shadow-xl shadow-black/10' 
                    : 'text-black/30 hover:bg-black/5 hover:text-black'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary' : ''}`} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-black/5 mt-auto">
            <div className="flex items-center gap-4 mb-8 p-4 bg-[#F5F5F0] rounded-sm">
              <div className="w-10 h-10 bg-black rounded-sm flex items-center justify-center flex-shrink-0">
                <TierIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[14px] truncate leading-none mb-1">{data.fullName}</p>
                <p className="text-[9px] font-bold text-black/30 uppercase tracking-widest">{data.tier.replace('-', ' ')}</p>
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

      {/* ─── Main Content Area ────────────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-72 min-h-screen p-6 lg:p-12 transition-all duration-500">
        <div className="max-w-[95%] mx-auto">
          
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px w-12 bg-black/10" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30">{activeTab}</p>
            </div>
            <h1 className="text-[48px] md:text-[80px] font-display font-bold tracking-tighter leading-[0.85] text-black">
              {filteredSidebar.find(i => i.id === activeTab)?.label}
            </h1>
          </header>

          {/* ─── TAB: Overview ─────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="xl:col-span-3 space-y-6">
                <div className="bg-white rounded-sm border border-black/5 overflow-hidden shadow-2xl shadow-black/5">
                  <div className="bg-black p-10 flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Official Entrance Pass</p>
                      <p className="text-white text-[24px] md:text-[32px] font-display font-bold tracking-tighter leading-none text-primary">QATAR 2026</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/10 px-4 py-2 rounded-sm border border-white/10">
                        <p className="text-white text-[10px] font-bold uppercase tracking-widest">{data.tier.replace('-', ' ')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-10 flex flex-col md:flex-row gap-10">
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
                <div className="bg-white rounded-sm border border-black/5 p-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-6">Payment Summary</p>
                  <p className="font-bold text-[32px] mb-8">QAR {data.total}</p>
                  <button className="w-full py-5 border border-black/10 rounded-sm font-bold text-[12px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                    Download Receipt
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB: Competitions ─────────────────────────────────────────── */}
          {activeTab === 'competitions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              {[
                { title: "Dog Fashion Show", desc: "Showcase themed coordination with your dog.", slug: "dog-fashion-show", role: 'dog-owner', icon: Dog },
                { title: "Grooming World Cup", desc: "Expert styling judged by international masters.", slug: "dog-grooming", role: 'dog-owner', icon: Star },
                { title: "WCF Best In Show", desc: "Ultimate cat beauty arena.", slug: "cat-best-show", role: 'cat-owner', icon: Cat },
                { title: "Drawing Battle", desc: "Live creative clash for all levels.", slug: "cat-drawing-battle", role: 'any', icon: Trophy }
              ].filter(c => c.role === 'any' || (data.tier === c.role)).map((comp, i) => (
                <div key={i} className="group bg-white rounded-sm border border-black/5 p-10 hover:border-black transition-all">
                  <comp.icon className="w-12 h-12 text-primary mb-8" />
                  <h3 className="text-[24px] font-display font-bold mb-4">{comp.title}</h3>
                  <p className="text-[15px] text-black/40 mb-10">{comp.desc}</p>
                  <button onClick={() => router.push(`/registration?event=${comp.slug}`)} className="w-full py-5 bg-black text-white rounded-sm font-bold text-[13px] uppercase tracking-widest flex items-center justify-center gap-3">
                    Register <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ─── TAB: Health ───────────────────────────────────────────────── */}
          {activeTab === 'health' && (
            <div className="bg-white rounded-sm border border-black/5 p-16 text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <ShieldCheck className="w-20 h-20 text-primary mx-auto mb-8" />
              <h2 className="text-[32px] font-display font-bold mb-6">Health Compliance</h2>
              <p className="text-[16px] text-black/40 max-w-[500px] mx-auto mb-12">Pet Passport and Vaccination Records are required for arena entry.</p>
              <button className="px-12 py-5 bg-black text-white rounded-sm font-bold text-[13px] uppercase tracking-widest">View Rules</button>
            </div>
          )}

          {/* ─── TAB: Schedule ─────────────────────────────────────────────── */}
          {activeTab === 'schedule' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              {[
                { time: "02:00 PM", event: "Grand Opening", zone: "Main Stage" },
                { time: "05:00 PM", event: "Cat Parade", zone: "Cat Dome" }
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-sm border border-black/5 p-8 flex justify-between items-center">
                  <div className="flex items-center gap-10">
                    <span className="font-display font-bold text-[24px] text-primary">{s.time}</span>
                    <p className="font-bold text-[18px]">{s.event}</p>
                  </div>
                  <span className="text-[11px] font-bold text-black/30 uppercase tracking-[0.2em]">{s.zone}</span>
                </div>
              ))}
            </div>
          )}

          {/* ─── TAB: Map ─────────────────────────────────────────────────── */}
          {activeTab === 'map' && (
            <div className="bg-white rounded-sm border border-black/5 p-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="aspect-video bg-[#F5F5F0] rounded-sm flex flex-col items-center justify-center border-2 border-dashed border-black/5">
                <MapIcon className="w-16 h-16 text-black/10 mb-4" />
                <p className="font-bold text-black/20 text-[20px]">Interactive Map Coming Soon</p>
              </div>
            </div>
          )}

          {/* ─── TAB: Account / Settings ──────────────────────────────────── */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="bg-white rounded-sm border border-black/5 p-10 space-y-8">
                <h3 className="font-display font-bold text-[24px] pb-6 border-b border-black/5">Visitor Profile</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-2">Legal Name</p>
                    <p className="font-bold text-[18px]">{data.fullName}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-2">Email Address</p>
                    <p className="font-bold text-[18px]">{data.email}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-2">Phone Number</p>
                    <p className="font-bold text-[18px]">{data.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-sm border border-black/5 p-10 space-y-8">
                <h3 className="font-display font-bold text-[24px] pb-6 border-b border-black/5">Festival Data</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-2">Ticket Tier</p>
                    <p className="font-bold text-[18px] text-primary uppercase tracking-widest">{data.tier.replace('-', ' ')}</p>
                  </div>
                  {isPetOwner && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-2">Pet Name</p>
                      <p className="font-bold text-[18px]">{data.petName || 'N/A'}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-2">Adults</p>
                      <p className="font-bold text-[18px]">{data.adultQty}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-2">Kids</p>
                      <p className="font-bold text-[18px]">{data.kidsQty || '0'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">Loading Nova Studio...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
