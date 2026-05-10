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
  CreditCard,
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
        <div className="max-w-[1100px] mx-auto">
          
          <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                {/* Premium Ticket Card */}
                <div className="bg-white rounded-sm border border-black/5 overflow-hidden shadow-2xl shadow-black/5">
                  <div className="bg-black p-10 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Official Entrance Pass</p>
                      <p className="text-white text-[24px] md:text-[32px] font-display font-bold tracking-tighter leading-none">THE PEARL ISLAND<br /><span className="text-primary">QATAR 2026</span></p>
                    </div>
                    <div className="relative z-10 text-right">
                      <div className="bg-primary/20 backdrop-blur-md border border-primary/30 px-6 py-3 rounded-sm">
                        <p className="text-white text-[12px] font-bold uppercase tracking-[0.2em]">{data.tier.replace('-', ' ')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center px-6">
                    <div className="w-8 h-8 bg-[#F5F5F0] rounded-full -ml-10 border border-black/5 z-20" />
                    <div className="flex-1 border-t-2 border-dashed border-black/10 mx-2" />
                    <div className="w-8 h-8 bg-[#F5F5F0] rounded-full -mr-10 border border-black/5 z-20" />
                  </div>

                  <div className="p-10 flex flex-col md:flex-row gap-12">
                    <div className="flex flex-col items-center gap-4 bg-[#F9F9F9] p-6 rounded-sm border border-black/5">
                      <img src={QR_CODE_URL} alt="QR" className="w-32 h-32 md:w-40 md:h-40 mix-blend-multiply" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20">ORDER: {data.orderId}</p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-8 content-start">
                      <div className="col-span-2">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-2">Guest Name</p>
                        <p className="font-bold text-[24px] tracking-tight">{data.fullName}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-2">Adult Passes</p>
                        <p className="font-bold text-[20px]">{data.adultQty}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-2">Child Passes</p>
                        <p className="font-bold text-[20px]">{data.kidsQty || '—'}</p>
                      </div>
                      {data.petName && (
                        <div className="col-span-2 pt-6 border-t border-black/5">
                          <p className="text-[11px] font-bold uppercase tracking-widest text-black/30 mb-2">Companion Pet Name</p>
                          <p className="font-bold text-[20px] text-primary">{data.petName}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-black rounded-sm p-10 text-white space-y-8">
                  <h4 className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/40 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" /> Entry Protocols
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { icon: Clock, text: "Gates open at 2:00 PM Sharp" },
                      { icon: MapPin, text: "The Pearl - Central Arena" },
                      { icon: Info, text: "Keep QR Code ready for scan" },
                      { icon: Heart, text: "Pets must be in carriers/leashed" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-sm">
                        <item.icon className="w-5 h-5 text-primary" />
                        <span className="text-[13px] font-bold tracking-tight">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="xl:col-span-2 space-y-6">
                <div className="bg-white rounded-sm border border-black/5 p-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-8">Purchase Ledger</p>
                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-end">
                      <p className="text-[14px] font-bold text-black/40">Total Amount Paid</p>
                      <p className="text-[32px] font-display font-bold leading-none">QAR {data.total}</p>
                    </div>
                    <div className="flex justify-between text-[14px] font-bold pt-6 border-t border-black/5">
                      <span className="text-black/40">Reference</span>
                      <span className="tracking-widest">#{data.orderId.slice(-6)}</span>
                    </div>
                  </div>
                  <button className="w-full py-5 bg-black text-white rounded-sm font-bold text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary transition-all active:scale-[0.98]">
                    <Download className="w-4 h-4" /> Download PDF Receipt
                  </button>
                </div>

                {isPetOwner && (
                  <div className="bg-primary p-10 rounded-sm text-white group cursor-pointer overflow-hidden relative" onClick={() => setActiveTab('competitions')}>
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                      <Trophy className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-[24px] font-display font-bold leading-none mb-2">Pet Championship</h4>
                      <p className="text-[13px] text-white/70 font-medium mb-8 max-w-[200px]">Register {data.petName} for international judging today.</p>
                      <span className="inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest group-hover:gap-5 transition-all">
                        Enter Arena <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── TAB: Competitions ─────────────────────────────────────────── */}
          {activeTab === 'competitions' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Dog Fashion Show", desc: "Showcase themed coordination with your dog on the grand runway.", slug: "dog-fashion-show", role: 'dog-owner', icon: Dog },
                  { title: "Grooming World Cup", desc: "Expert styling competition judged by international WKU masters.", slug: "dog-grooming", role: 'dog-owner', icon: Star },
                  { title: "WCF Best In Show", desc: "The ultimate cat beauty and breed standard judging arena.", slug: "cat-best-show", role: 'cat-owner', icon: Cat },
                  { title: "Drawing Battle", desc: "A live 1-hour creative clash for artists of all skill levels.", slug: "cat-drawing-battle", role: 'any', icon: Trophy }
                ].filter(c => c.role === 'any' || (data.tier === c.role)).map((comp, i) => (
                  <div key={i} className="group bg-white rounded-sm border border-black/5 p-10 hover:border-black transition-all hover:shadow-2xl hover:shadow-black/5">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-16 h-16 bg-[#F5F5F0] rounded-sm flex items-center justify-center group-hover:bg-primary transition-colors">
                        <comp.icon className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-green-50 text-green-600 rounded-sm">Registration Open</span>
                    </div>
                    <h3 className="text-[24px] font-display font-bold mb-4">{comp.title}</h3>
                    <p className="text-[15px] text-black/40 font-medium mb-10 leading-relaxed">{comp.desc}</p>
                    <button 
                      onClick={() => router.push(`/registration?event=${comp.slug}`)}
                      className="w-full py-5 bg-black text-white rounded-sm font-bold text-[13px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary transition-all"
                    >
                      Enter Competition <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-sm border border-black/5 p-12 text-center">
                <Clock className="w-12 h-12 text-black/10 mx-auto mb-6" />
                <p className="font-bold text-[18px] mb-2">My Entry Status</p>
                <p className="text-[14px] text-black/40">You haven't submitted any competition entries yet.</p>
              </div>
            </div>
          )}

          {/* ─── TAB: Health Docs ───────────────────────────────────────────── */}
          {activeTab === 'health' && (
            <div className="bg-white rounded-sm border border-black/5 p-16 text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="w-24 h-24 bg-[#F5F5F0] rounded-sm flex items-center justify-center mx-auto mb-10">
                <ShieldCheck className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-[32px] font-display font-bold mb-6 tracking-tight">WKU Health Compliance</h2>
              <p className="text-[16px] text-black/40 max-w-[500px] mx-auto leading-relaxed mb-12">
                All participating animals must have a verified Pet Passport and up-to-date Vaccination Record to enter the judging arena. Documentation must be uploaded during your competition entry.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-12 py-5 bg-black text-white rounded-sm font-bold text-[13px] uppercase tracking-widest hover:bg-primary transition-all">
                  View Requirements
                </button>
                <button className="px-12 py-5 border border-black/10 rounded-sm font-bold text-[13px] uppercase tracking-widest hover:border-black transition-all">
                  FAQ & Support
                </button>
              </div>
            </div>
          )}

          {/* ─── TAB: Schedule ─────────────────────────────────────────────── */}
          {activeTab === 'schedule' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              {[
                { time: "02:00 PM", event: "Grand Opening Ceremony", zone: "Main Arena", cat: "Ceremony" },
                { time: "03:30 PM", event: "WKU Dog Agility Heats", zone: "Dog Zone A", cat: "Championship" },
                { time: "05:00 PM", event: "Cat Dome Fashion Parade", zone: "The Cat Dome", cat: "Entertainment" },
                { time: "06:30 PM", event: "Best In Show Judging", zone: "Main Stage", cat: "Judging" },
                { time: "08:00 PM", event: "Fireworks & Prize Giving", zone: "Pearl Plaza", cat: "Awards" }
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-sm border border-black/5 p-8 flex flex-col md:flex-row md:items-center justify-between group hover:border-black transition-all">
                  <div className="flex items-center gap-10">
                    <span className="font-display font-bold text-[24px] text-primary min-w-[120px]">{s.time}</span>
                    <div className="space-y-1">
                      <p className="font-bold text-[18px] text-black tracking-tight">{s.event}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {s.zone}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-black/10" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{s.cat}</span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-6 md:mt-0 px-6 py-3 border border-black/5 rounded-sm font-bold text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white">
                    Remind Me
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ─── TAB: Festival Map ─────────────────────────────────────────── */}
          {activeTab === 'map' && (
            <div className="bg-white rounded-sm border border-black/5 p-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="aspect-video bg-[#F5F5F0] rounded-sm flex items-center justify-center mb-10 overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1511974035430-5de47d3b95da?q=80&w=2070&auto=format&fit=crop" 
                  alt="Map Placeholder" 
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm group-hover:backdrop-blur-0 transition-all">
                  <MapIcon className="w-20 h-20 text-white mb-4 animate-bounce" />
                  <p className="text-white font-display font-bold text-[24px]">Pearl Island Arena Map</p>
                  <p className="text-white/60 font-bold uppercase text-[12px] tracking-[0.3em] mt-2">Interactive Guide Coming Soon</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Main Stage', 'Dog Arena', 'Cat Dome', 'Vip Lounge'].map((zone, i) => (
                  <div key={i} className="p-6 bg-[#F5F5F0] rounded-sm border border-black/5 text-center">
                    <p className="font-bold text-[14px] mb-1">{zone}</p>
                    <p className="text-[9px] font-bold text-black/30 uppercase tracking-widest">Zone 0{i + 1}</p>
                  </div>
                ))}
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
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center font-display font-bold text-[24px] animate-pulse">Loading Nova Studio...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
