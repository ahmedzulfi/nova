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
  Heart,
  Upload,
  AlertCircle,
  Bell,
  Lock,
  Smartphone,
  ChevronRight,
  Gift
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
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-6 text-center">
        <div className="max-w-[400px] animate-in fade-in zoom-in duration-700">
          <Ticket className="w-16 h-16 text-primary mx-auto mb-8 animate-bounce" />
          <h1 className="text-[32px] font-display font-bold mb-4 tracking-tighter">Access Denied</h1>
          <p className="text-[16px] text-black/40 mb-10 leading-relaxed">Please complete your ticket registration to unlock your personal Nova Studio dashboard.</p>
          <button onClick={() => router.push('/tickets')} className="w-full py-5 bg-black text-white rounded-sm font-bold text-[14px] uppercase tracking-widest hover:scale-105 transition-all">
            Get Tickets Now
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
    { id: 'health', label: 'Health Vault', icon: ShieldCheck, roles: ['pet-owner'] },
    { id: 'schedule', label: 'Schedule', icon: Calendar, roles: ['any'] },
    { id: 'map', label: 'Festival Map', icon: MapIcon, roles: ['any'] },
    { id: 'settings', label: 'Account Settings', icon: Settings, roles: ['any'] },
  ];

  const filteredSidebar = sidebarItems.filter(item => 
    item.roles.includes('any') || (item.roles.includes('pet-owner') && isPetOwner)
  );

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex selection:bg-primary selection:text-white overflow-hidden">
      
      {/* ─── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className={`
        fixed inset-y-0 left-0 z-[110] w-[320px] bg-white border-r border-black/5 transition-all duration-700 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full shadow-none'}
        shadow-[20px_0_60px_-15px_rgba(0,0,0,0.03)]
      `}>
        <div className="h-full flex flex-col p-10">
          <div className="mb-20 flex items-center justify-between">
            <Link href="/" className="group">
              <span className="text-[26px] font-display font-bold tracking-tighter text-black">NOVA<span className="text-primary group-hover:text-black transition-colors">STUDIO</span></span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2">
              <X className="w-6 h-6 text-black/20" />
            </button>
          </div>

          <nav className="flex-1 space-y-3">
            {filteredSidebar.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as TabType); setIsSidebarOpen(false); }}
                className={`w-full group flex items-center justify-between px-6 py-5 rounded-sm font-bold text-[13px] uppercase tracking-[0.2em] transition-all ${
                  activeTab === item.id 
                    ? 'bg-black text-white shadow-2xl shadow-black/20 translate-x-2' 
                    : 'text-black/30 hover:bg-black/5 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-5">
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary' : 'group-hover:text-primary transition-colors'}`} />
                  {item.label}
                </div>
                {activeTab === item.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            ))}
          </nav>

          <div className="pt-10 border-t border-black/5 mt-auto">
            <div className="flex items-center gap-5 mb-10 p-5 bg-[#F9F9F9] rounded-sm border border-black/5">
              <div className="w-12 h-12 bg-black rounded-sm flex items-center justify-center flex-shrink-0 relative">
                <TierIcon className="w-6 h-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[15px] truncate leading-tight mb-1 tracking-tight">{data.fullName}</p>
                <p className="text-[9px] font-bold text-black/30 uppercase tracking-[0.2em]">{data.tier.replace('-', ' ')} Member</p>
              </div>
            </div>
            <button 
              onClick={() => { localStorage.removeItem('nova_registration'); router.push('/tickets'); }}
              className="w-full flex items-center gap-5 px-6 py-5 rounded-sm font-bold text-[13px] uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 transition-all active:scale-95"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Content ───────────────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-[320px] h-screen overflow-y-auto p-8 lg:p-16 transition-all duration-700 bg-[#F5F5F0]">
        <div className="max-w-[95%] mx-auto">
          
          {/* Mobile Header */}
          <div className="flex lg:hidden items-center justify-between mb-12">
             <span className="text-[20px] font-display font-bold tracking-tighter">NOVA<span className="text-primary">STUDIO</span></span>
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="w-12 h-12 bg-white rounded-sm border border-black/5 flex items-center justify-center shadow-sm"
             >
               <Menu className="w-6 h-6" />
             </button>
          </div>

          <header className="mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="flex items-center gap-5 mb-6">
              <div className="h-[1px] w-16 bg-black/10" />
              <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-black/30">System // {activeTab}</p>
            </div>
            <h1 className="text-[56px] md:text-[96px] font-display font-bold tracking-tighter leading-[0.8] text-black">
              {filteredSidebar.find(i => i.id === activeTab)?.label}
            </h1>
          </header>

          {/* ──────────────────────────────────────────────────────────
              TAB: Overview
          ────────────────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 xl:grid-cols-6 gap-10 animate-in fade-in slide-in-from-bottom-20 duration-1000">
              <div className="xl:col-span-4 space-y-10">
                {/* Master Entry Pass */}
                <div className="bg-white rounded-sm border border-black/5 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
                  
                  <div className="bg-black p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                    <div className="space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/30">Exclusive Access Token</p>
                      <h2 className="text-white text-[32px] md:text-[42px] font-display font-bold tracking-tighter leading-none uppercase">The Pearl Arena<br /><span className="text-primary">Nov 27-28, 2026</span></h2>
                    </div>
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-sm text-center min-w-[160px]">
                      <p className="text-primary text-[14px] font-bold uppercase tracking-[0.3em] mb-1">Status</p>
                      <p className="text-white font-bold text-[20px] uppercase">Active Pass</p>
                    </div>
                  </div>

                  <div className="flex items-center px-10">
                    <div className="w-12 h-12 bg-[#F5F5F0] rounded-full -ml-16 border border-black/5 z-20 shadow-inner" />
                    <div className="flex-1 border-t-2 border-dashed border-black/10 mx-4" />
                    <div className="w-12 h-12 bg-[#F5F5F0] rounded-full -mr-16 border border-black/5 z-20 shadow-inner" />
                  </div>

                  <div className="p-12 flex flex-col lg:flex-row gap-16">
                    <div className="flex flex-col items-center gap-6 bg-[#F9F9F9] p-10 rounded-sm border border-black/5 shadow-inner">
                      <img src={QR_CODE_URL} alt="QR" className="w-40 h-40 md:w-56 md:h-56 mix-blend-multiply opacity-90" />
                      <div className="text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/20 mb-1">Scan ID</p>
                        <p className="font-bold text-[14px] tracking-widest">{data.orderId}</p>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12 content-start">
                      <div className="col-span-2">
                        <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-black/20 mb-3">Primary Attendee</p>
                        <p className="font-bold text-[32px] md:text-[42px] tracking-tighter leading-none">{data.fullName}</p>
                      </div>
                      <div className="p-6 bg-[#F9F9F9] rounded-sm border border-black/5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/20 mb-2">Tier Level</p>
                        <p className="font-bold text-[20px] uppercase tracking-tight">{data.tier.replace('-', ' ')}</p>
                      </div>
                      <div className="p-6 bg-[#F9F9F9] rounded-sm border border-black/5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/20 mb-2">Total Guests</p>
                        <p className="font-bold text-[20px] uppercase tracking-tight">{data.adultQty + (data.kidsQty || 0)} Persons</p>
                      </div>
                      {data.petName && (
                        <div className="col-span-2 p-8 bg-primary/5 rounded-sm border border-primary/20 flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/40 mb-1">Companion Animal</p>
                            <p className="font-bold text-[28px] tracking-tight">{data.petName}</p>
                          </div>
                          <TierIcon className="w-12 h-12 text-primary opacity-20" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notifications Strip */}
                <div className="bg-black rounded-sm p-12 text-white">
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                    <h4 className="text-[16px] font-bold uppercase tracking-[0.4em] text-white/40 flex items-center gap-4">
                      <Bell className="w-5 h-5 text-primary" /> Live Updates
                    </h4>
                    <span className="text-[11px] font-bold text-primary">2 NEW ALERTS</span>
                  </div>
                  <div className="space-y-8">
                    {[
                      { title: "Arrival Window", desc: "VIP Parking is available from 1:00 PM at Zone C.", time: "10m ago", icon: MapPin },
                      { title: "Health Check", desc: "Please have your pet's digital passport ready for WKU verification.", time: "1h ago", icon: ShieldCheck }
                    ].map((n, i) => (
                      <div key={i} className="flex gap-8 group">
                        <div className="w-14 h-14 rounded-sm bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                          <n.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-[18px] tracking-tight">{n.title}</p>
                            <span className="text-[11px] font-bold text-white/20 uppercase">{n.time}</span>
                          </div>
                          <p className="text-[14px] text-white/40 leading-relaxed max-w-[450px]">{n.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Sidebar */}
              <div className="xl:col-span-2 space-y-10">
                <div className="bg-white rounded-sm border border-black/5 p-12 flex flex-col justify-between h-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)]">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-black/20 mb-10">Transaction Receipt</p>
                    <div className="space-y-8 mb-12">
                      <div className="flex flex-col gap-2">
                        <p className="text-[14px] font-bold text-black/30">Gross Amount</p>
                        <p className="text-[48px] font-display font-bold leading-none tracking-tighter">QAR {data.total}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-6 pt-8 border-t border-black/5">
                        <div>
                          <p className="text-[10px] font-bold text-black/20 uppercase tracking-widest mb-1">Method</p>
                          <p className="font-bold text-[14px] flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-primary" /> AMEX 4111
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-black/20 uppercase tracking-widest mb-1">Auth Code</p>
                          <p className="font-bold text-[14px] uppercase">9X2Z-NP</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-6 bg-black text-white rounded-sm font-bold text-[13px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-primary transition-all active:scale-95 group shadow-2xl shadow-black/20">
                    <Download className="w-5 h-5 group-hover:animate-bounce" /> Get PDF Pass
                  </button>
                </div>

                {isPetOwner && (
                  <div className="bg-primary p-12 rounded-sm text-white group cursor-pointer relative overflow-hidden shadow-2xl shadow-primary/20" onClick={() => setActiveTab('competitions')}>
                    <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-150 transition-all duration-1000 rotate-12">
                      <Trophy className="w-64 h-64" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-[32px] font-display font-bold leading-tight mb-4 tracking-tighter uppercase">Compete on the<br />World Stage</h4>
                      <p className="text-[15px] text-white/70 font-medium mb-12 leading-relaxed max-w-[240px]">International judges from WKU & WCF are waiting for {data.petName}.</p>
                      <div className="inline-flex items-center gap-4 text-[13px] font-bold uppercase tracking-[0.3em] group-hover:gap-8 transition-all">
                        Register Pet <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────
              TAB: Competitions
          ────────────────────────────────────────────────────────── */}
          {activeTab === 'competitions' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-20 duration-1000">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {[
                  { title: "Dog Fashion Show", prize: "QAR 10,000", slug: "dog-fashion-show", role: 'dog-owner', icon: Dog, judge: "WKU Global Team" },
                  { title: "Grooming World Cup", prize: "Elite Studio Kit", slug: "dog-grooming", role: 'dog-owner', icon: Star, judge: "Master Hiroshi (JPN)" },
                  { title: "WCF Best In Show", prize: "Golden Feline Trophy", slug: "cat-best-show", role: 'cat-owner', icon: Cat, judge: "WCF Official Panel" },
                  { title: "Drawing Cat Battle", prize: "Intuos Pro Tablet", slug: "cat-drawing-battle", role: 'any', icon: Trophy, judge: "Nova Creative Jury" }
                ].filter(c => c.role === 'any' || (data.tier === c.role)).map((comp, i) => (
                  <div key={i} className="group bg-white rounded-sm border border-black/5 p-12 hover:border-black transition-all hover:shadow-[0_60px_100px_-30px_rgba(0,0,0,0.08)]">
                    <div className="flex items-start justify-between mb-12">
                      <div className="w-20 h-20 bg-[#F5F5F0] rounded-sm flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                        <comp.icon className="w-10 h-10 text-black group-hover:text-white transition-colors" />
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/20 mb-2">Grand Prize</p>
                        <p className="text-primary font-display font-bold text-[24px] tracking-tight">{comp.prize}</p>
                      </div>
                    </div>
                    <div className="mb-12 space-y-4">
                      <h3 className="text-[32px] font-display font-bold tracking-tighter leading-none uppercase">{comp.title}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-black text-white rounded-sm">Official Judging</span>
                        <p className="text-[11px] font-bold text-black/30 uppercase tracking-widest flex items-center gap-2">
                          <User className="w-3 h-3" /> {comp.judge}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => router.push(`/registration?event=${comp.slug}`)}
                      className="w-full py-6 bg-black text-white rounded-sm font-bold text-[14px] uppercase tracking-[0.3em] flex items-center justify-center gap-5 hover:bg-primary transition-all active:scale-[0.98]"
                    >
                      Enter Arena <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Registration Status Tracker */}
              <div className="bg-white rounded-sm border border-black/5 p-16">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16 pb-10 border-b border-black/5">
                    <div>
                       <h4 className="text-[20px] font-display font-bold uppercase tracking-tight mb-2">Submission Manager</h4>
                       <p className="text-[14px] text-black/40 font-medium">Track your pet's entry progress in real-time.</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#F9F9F9] rounded-sm border border-black/5">
                       <Clock className="w-5 h-5 text-black/20" />
                       <p className="text-[12px] font-bold uppercase tracking-widest text-black/40">Next Deadline: Nov 15th</p>
                    </div>
                 </div>
                 <div className="text-center py-20">
                    <Trophy className="w-16 h-16 text-black/5 mx-auto mb-8" />
                    <p className="font-bold text-[18px] mb-2 tracking-tight">No submissions found.</p>
                    <p className="text-[14px] text-black/40 max-w-[320px] mx-auto leading-relaxed">Start your journey by selecting an international competition above.</p>
                 </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────
              TAB: Health Vault
          ────────────────────────────────────────────────────────── */}
          {activeTab === 'health' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-20 duration-1000">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Pet Passport", desc: "Digital/Physical copy of international travel docs.", status: "REQUIRED", icon: Ticket },
                  { title: "Vaccination Log", desc: "WCF/WKU standards for rabies and essential core.", status: "REQUIRED", icon: ShieldCheck },
                  { title: "Microchip ID", desc: "ISO 11784/11785 compliant microchip data.", status: "OPTIONAL", icon: Lock }
                ].map((doc, i) => (
                  <div key={i} className="bg-white rounded-sm border border-black/5 p-10 hover:border-black transition-all group">
                    <div className="w-16 h-16 bg-[#F5F5F0] rounded-sm flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-500">
                      <doc.icon className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-[22px] font-display font-bold tracking-tighter mb-2 uppercase">{doc.title}</h3>
                    <p className="text-[14px] text-black/40 font-medium mb-10 leading-relaxed">{doc.desc}</p>
                    <div className="flex items-center justify-between">
                       <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm ${doc.status === 'REQUIRED' ? 'bg-red-50 text-red-500' : 'bg-black text-white'}`}>
                          {doc.status}
                       </span>
                       <button className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 text-black/40 hover:text-black transition-colors">
                          <Upload className="w-4 h-4" /> Upload
                       </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-black rounded-sm p-16 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse" />
                <AlertCircle className="w-16 h-16 text-primary mx-auto mb-8 opacity-40" />
                <h2 className="text-[32px] font-display font-bold mb-6 tracking-tight uppercase leading-none">WKU Compliance Mandatory</h2>
                <p className="text-[16px] text-white/40 max-w-[560px] mx-auto leading-relaxed mb-12">
                  To maintain the highest standards of animal welfare and competitive integrity, all documentation will be reviewed by our veterinary panel within 48 hours of submission.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                   <button className="px-12 py-6 bg-primary text-white rounded-sm font-bold text-[14px] uppercase tracking-[0.3em] hover:scale-105 transition-all">Submit Dossier</button>
                   <button className="px-12 py-6 border border-white/20 text-white rounded-sm font-bold text-[14px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">Download Guidelines</button>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────
              TAB: Schedule
          ────────────────────────────────────────────────────────── */}
          {activeTab === 'schedule' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-20 duration-1000">
              <div className="flex items-center justify-between mb-12">
                 <div className="flex gap-4">
                    <button className="px-8 py-4 bg-black text-white rounded-sm font-bold text-[12px] uppercase tracking-widest">Day 01 - Nov 27</button>
                    <button className="px-8 py-4 bg-white border border-black/5 text-black/40 rounded-sm font-bold text-[12px] uppercase tracking-widest hover:text-black transition-colors">Day 02 - Nov 28</button>
                 </div>
                 <p className="text-[12px] font-bold uppercase tracking-widest text-black/30 hidden md:block">Timezone: UTC+3 (AST)</p>
              </div>

              {[
                { time: "02:00 PM", event: "Grand Opening Ceremony", zone: "Central Pearl Arena", cat: "Ceremony", staff: "WKU Global" },
                { time: "03:30 PM", event: "Dog Agility: World Qualifiers", zone: "Dog Arena Zone A", cat: "Championship", staff: "Judge Hiroshi" },
                { time: "05:00 PM", event: "Cat Fashion Show - Immersion", zone: "The Cat Dome", cat: "Entertainment", staff: "WCF Team" },
                { time: "06:45 PM", event: "Best in Show: Breed Judging", zone: "Main Expo Stage", cat: "Judging", staff: "Master Panel" },
                { time: "08:30 PM", event: "Festival Fireworks & Night Mix", zone: "Skyline Terrace", cat: "Festival", staff: "Nova Ops" }
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-sm border border-black/5 p-10 flex flex-col md:flex-row md:items-center justify-between group hover:border-black transition-all hover:translate-x-2">
                  <div className="flex items-center gap-12">
                    <span className="font-display font-bold text-[32px] text-primary min-w-[140px] leading-none tracking-tighter">{s.time}</span>
                    <div className="space-y-2">
                      <p className="font-bold text-[22px] text-black tracking-tight uppercase leading-none">{s.event}</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-primary" /> {s.zone}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-black/10" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-sm">{s.cat}</span>
                        <div className="w-1 h-1 rounded-full bg-black/10" />
                        <span className="text-[10px] font-bold text-black/20 uppercase tracking-widest italic">Host: {s.staff}</span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-8 md:mt-0 px-8 py-4 border-2 border-black/5 rounded-sm font-bold text-[12px] uppercase tracking-widest group-hover:border-primary group-hover:text-primary transition-all active:scale-95">
                    Add to Calendar
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────
              TAB: Festival Map
          ────────────────────────────────────────────────────────── */}
          {activeTab === 'map' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-20 duration-1000">
              <div className="bg-white rounded-sm border border-black/5 p-12 relative overflow-hidden group shadow-2xl shadow-black/5">
                <div className="aspect-[21/9] bg-[#F5F5F0] rounded-sm flex items-center justify-center mb-12 overflow-hidden relative border border-black/5">
                  <img 
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Map Visual" 
                    className="w-full h-full object-cover opacity-30 grayscale blur-[2px] scale-110 group-hover:scale-100 group-hover:grayscale-0 group-hover:blur-0 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-center p-12 text-center transition-opacity group-hover:opacity-0 duration-700">
                    <MapIcon className="w-24 h-24 text-white mb-6 animate-bounce opacity-40" />
                    <h3 className="text-white font-display font-bold text-[48px] tracking-tighter uppercase mb-4">Central Pearl Island Arena</h3>
                    <p className="text-white/60 font-bold uppercase text-[14px] tracking-[0.5em]">Interactive 3D Wayfinder Active Nov 27</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
                   {[
                      { title: "Arena 01", name: "Dog Show Main", detail: "WKU Championship Ground", color: "text-primary" },
                      { title: "Arena 02", name: "Cat Dome", detail: "WCF Immersive Space", color: "text-blue-500" },
                      { title: "Zone 03", name: "Pet Expo", detail: "Vendor & Product Alley", color: "text-green-500" },
                      { title: "Zone 04", name: "Vip Lounge", detail: "Exhibitor Network Hub", color: "text-purple-500" }
                   ].map((zone, i) => (
                      <div key={i} className="p-10 bg-[#F9F9F9] rounded-sm border border-black/5 hover:border-black transition-all">
                        <p className={`font-bold text-[12px] uppercase tracking-[0.3em] mb-4 ${zone.color}`}>{zone.title}</p>
                        <h5 className="font-display font-bold text-[22px] tracking-tight mb-2 uppercase leading-none">{zone.name}</h5>
                        <p className="text-[12px] text-black/30 font-bold uppercase tracking-widest">{zone.detail}</p>
                      </div>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 <div className="bg-black rounded-sm p-12 text-white">
                    <h4 className="text-[14px] font-bold uppercase tracking-[0.4em] text-white/40 mb-10 flex items-center gap-4">
                       <Info className="w-5 h-5 text-primary" /> Key Facilities
                    </h4>
                    <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                       {[
                          "First Aid & Vet Station",
                          "Restroom & Grooming Pods",
                          "Hydration Stations",
                          "Main Exit & Uber Drop",
                          "VIP Concierge Desk",
                          "Official Merchandise"
                       ].map((f, i) => (
                          <div key={i} className="flex items-center gap-4">
                             <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                             <span className="text-[13px] font-bold text-white/60 uppercase tracking-tight">{f}</span>
                          </div>
                       ))}
                    </div>
                 </div>
                 <div className="bg-white rounded-sm border border-black/5 p-12 flex flex-col justify-center items-center text-center">
                    <Smartphone className="w-12 h-12 text-black/10 mb-6" />
                    <h4 className="text-[20px] font-display font-bold uppercase tracking-tight mb-4 leading-none">Download Mobile App</h4>
                    <p className="text-[14px] text-black/40 mb-10 max-w-[280px] leading-relaxed">Access turn-by-turn navigation and live queue status for all arenas.</p>
                    <div className="flex gap-4">
                       <div className="px-6 py-3 bg-black text-white rounded-sm font-bold text-[11px] uppercase tracking-widest">App Store</div>
                       <div className="px-6 py-3 bg-black text-white rounded-sm font-bold text-[11px] uppercase tracking-widest">Google Play</div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────
              TAB: Settings
          ────────────────────────────────────────────────────────── */}
          {activeTab === 'settings' && (
            <div className="max-w-[800px] animate-in fade-in slide-in-from-bottom-20 duration-1000">
              <div className="space-y-12">
                
                {/* Profile Settings */}
                <div className="bg-white rounded-sm border border-black/5 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)]">
                  <div className="px-10 py-6 bg-black flex items-center justify-between">
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/40">Profile Information</h4>
                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Edit Details</button>
                  </div>
                  <div className="p-10 space-y-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20">Legal Name</p>
                           <p className="font-bold text-[18px] text-black pb-2 border-b border-black/5 tracking-tight">{data.fullName}</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20">Digital Identifier</p>
                           <p className="font-bold text-[18px] text-black pb-2 border-b border-black/5 tracking-tight">#{data.orderId.slice(-8)}</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20">Registered Email</p>
                           <p className="font-bold text-[18px] text-black pb-2 border-b border-black/5 tracking-tight">{data.email}</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20">Mobile Number</p>
                           <p className="font-bold text-[18px] text-black pb-2 border-b border-black/5 tracking-tight">{data.phone}</p>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-sm border border-black/5 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)]">
                  <div className="px-10 py-6 border-b border-black/5">
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.4em] text-black/20">Festival Preferences</h4>
                  </div>
                  <div className="p-10 space-y-8">
                     {[
                        { title: "Real-time Schedule Alerts", desc: "Push notifications for upcoming judging events.", active: true },
                        { title: "Marketing & Partner Offers", desc: "Exclusive discounts from festival exhibitors.", active: false },
                        { title: "Public Profile Visibility", desc: "Show your competition ranking on leaderboards.", active: true }
                     ].map((pref, i) => (
                        <div key={i} className="flex items-center justify-between group">
                           <div className="space-y-1">
                              <p className="font-bold text-[16px] tracking-tight">{pref.title}</p>
                              <p className="text-[13px] text-black/40 font-medium">{pref.desc}</p>
                           </div>
                           <button className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${pref.active ? 'bg-primary' : 'bg-black/10'}`}>
                              <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-all ${pref.active ? 'translate-x-6' : 'translate-x-0'}`} />
                           </button>
                        </div>
                     ))}
                  </div>
                </div>

                {/* Security */}
                <div className="bg-white rounded-sm border border-black/5 p-10 flex items-center justify-between group cursor-pointer hover:bg-black hover:text-white transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-[#F5F5F0] rounded-sm flex items-center justify-center group-hover:bg-primary transition-all">
                         <Lock className="w-5 h-5 text-black group-hover:text-white transition-all" />
                      </div>
                      <div>
                         <p className="font-bold text-[16px] tracking-tight">Security & Privacy</p>
                         <p className="text-[13px] text-black/40 font-medium group-hover:text-white/40">Manage your password and data exports.</p>
                      </div>
                   </div>
                   <ChevronRight className="w-6 h-6 text-black/10 group-hover:text-white transition-all" />
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
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center font-display font-bold text-[24px] animate-pulse">Initializing Studio Environment...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
