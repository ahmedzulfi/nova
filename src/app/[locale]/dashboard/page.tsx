'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { 
  ArrowRight, 
  Dog, 
  Cat, 
  User, 
  Ticket, 
  Trophy, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  Clock,
  Star,
  Loader2
} from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

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
  competitionEntry?: string;
  entryDate?: string;
}

const QR_CODE_URL = "https://public-api.qr-code-generator.com/v1/create/extended?image_format=PNG&image_width=300&qr_code_text=https%3A%2F%2Fvalidmvps.vercel.app%2F&foreground_color=%23000000&background_color=%23FFFFFF&frame_name=no-frame";

type TabType = 'overview' | 'competitions' | 'health' | 'schedule' | 'settings';

function DashboardContent() {
  const router = useRouter();
  const t = useTranslations('Dashboard');
  const tTickets = useTranslations('Tickets');
  const tSchedule = useTranslations('Schedule');
  const locale = useLocale();
  
  const [data, setData] = useState<RegistrationData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [activeDay, setActiveDay] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('nova_registration');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      setData({
        fullName: "Ahmed Zulfi",
        email: "ahmed@nova.com",
        phone: "+974 5555 1234",
        tier: "dog-owner",
        adultQty: 2,
        kidsQty: 1,
        petQty: 1,
        petName: "Maximus",
        total: 225,
        orderId: "NP-2026-X8Y1",
        competitionEntry: "Dog Fashion Show",
        entryDate: new Date().toISOString()
      });
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center p-6">
        <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="w-24 h-24 bg-white rounded-sm border border-black/5 shadow-2xl flex items-center justify-center mx-auto mb-8">
            <Ticket className="w-12 h-12 text-primary" />
          </div>
          <div className="space-y-4">
            <h1 className="text-[32px] md:text-[48px] font-display font-bold tracking-tighter leading-none text-black">{t('no_session.title')}</h1>
            <p className="text-[16px] text-black/40 max-w-[400px] mx-auto leading-relaxed font-bold">{t('no_session.desc')}</p>
          </div>
          <Link href="/tickets" className="inline-flex items-center gap-4 bg-black text-white px-12 py-6 rounded-sm font-bold text-[14px] uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-black/10">
            {t('no_session.cta')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  const isPetOwner = data.tier === 'dog-owner' || data.tier === 'cat-owner';
  const TierIcon = data.tier === 'dog-owner' ? Dog : data.tier === 'cat-owner' ? Cat : User;

  const sidebarItems = [
    { id: 'overview', label: t('sidebar.overview'), icon: Ticket, roles: ['any'] },
    { id: 'competitions', label: t('sidebar.competitions'), icon: Trophy, roles: ['pet-owner'] },
    { id: 'health', label: t('sidebar.health'), icon: ShieldCheck, roles: ['pet-owner'] },
    { id: 'schedule', label: t('sidebar.schedule'), icon: Calendar, roles: ['any'] },
    { id: 'settings', label: t('sidebar.settings'), icon: Settings, roles: ['any'] },
  ];

  const filteredSidebar = sidebarItems.filter(item => 
    item.roles.includes('any') || (item.roles.includes('pet-owner') && isPetOwner)
  );

  const getTierName = (tierId: string) => {
    if (tierId === 'dog-owner') return tTickets('tiers.dog.name');
    if (tierId === 'cat-owner') return tTickets('tiers.cat.name');
    return tTickets('tiers.adult.name');
  };

  const scheduleDays = [
    { day: tSchedule('days.day1.label'), date: tSchedule('days.day1.date'), eventsKey: 'day1' },
    { day: tSchedule('days.day2.label'), date: tSchedule('days.day2.date'), eventsKey: 'day2' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex selection:bg-primary selection:text-white overflow-x-hidden">
      {/* ─── Mobile Sidebar Toggle ────────────────────────────────────────── */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 right-6 z-[100] lg:hidden w-14 h-14 bg-white rounded-sm border border-black/5 shadow-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all rtl:left-6 rtl:right-auto"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* ─── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className={`
        fixed inset-y-0 left-0 z-[90] w-80 bg-white border-r border-black/5 transition-transform duration-700 lg:translate-x-0 rtl:right-0 rtl:left-auto rtl:border-l rtl:border-r-0
        ${isSidebarOpen ? 'translate-x-0' : (locale === 'ar' ? 'translate-x-full' : '-translate-x-full')}
      `}>
        <div className="h-full flex flex-col p-10">
          <div className="mb-20">
            <Link href="/" className="inline-block group">
              <span className="text-[28px] font-display font-bold tracking-tighter text-black uppercase">NOVA<span className="text-primary group-hover:text-black transition-colors">PAW</span></span>
            </Link>
          </div>

          <nav className="flex-1 space-y-3">
            {filteredSidebar.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as TabType); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-5 px-6 py-5 rounded-sm font-bold text-[12px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeTab === item.id 
                    ? 'bg-black text-white shadow-2xl shadow-black/20' 
                    : 'text-black/30 hover:bg-black/5 hover:text-black'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary' : ''}`} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-10 border-t border-black/5 mt-auto">
            <div className="flex items-center gap-5 mb-8 p-5 bg-[#F5F5F0] rounded-sm border border-black/5">
              <div className="w-12 h-12 bg-black rounded-sm flex items-center justify-center flex-shrink-0 shadow-lg">
                <TierIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[15px] truncate leading-none mb-2 text-black">{data.fullName}</p>
                <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">{getTierName(data.tier)}</p>
              </div>
            </div>
            <button 
              onClick={() => { localStorage.removeItem('nova_registration'); router.push('/tickets'); }}
              className="w-full flex items-center gap-5 px-6 py-5 rounded-sm font-bold text-[12px] uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              {t('sidebar.sign_out')}
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Content Area ────────────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-80 min-h-screen p-8 lg:p-16 transition-all duration-700 rtl:lg:ml-0 rtl:lg:mr-80">
        <div className="max-w-[1200px] mx-auto">
          
          <header className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-6 mb-6">
              <span className="h-[2px] w-16 bg-primary" />
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-black/30">{t(`sidebar.${activeTab}`)}</p>
            </div>
            <h1 className="text-[56px] md:text-[96px] font-display font-bold tracking-tighter leading-[0.85] text-black">
              {filteredSidebar.find(i => i.id === activeTab)?.label}
            </h1>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* ─── TAB: Overview ─────────────────────────────────────────────── */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
                  <div className="xl:col-span-3 space-y-8">
                    <div className="bg-white rounded-sm border border-black/5 overflow-hidden shadow-2xl shadow-black/5 group">
                      <div className="bg-black p-12 flex items-center justify-between relative overflow-hidden">
                        <div className="relative z-10 space-y-3">
                          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">{t('overview.badge')}</p>
                          <p className="text-white text-[28px] md:text-[40px] font-display font-bold tracking-tighter leading-none text-primary uppercase">{t('overview.location')}</p>
                        </div>
                        <div className="relative z-10">
                          <div className="bg-white/10 backdrop-blur-xl px-6 py-3 rounded-sm border border-white/10">
                            <p className="text-white text-[12px] font-bold uppercase tracking-[0.2em]">{getTierName(data.tier)}</p>
                          </div>
                        </div>
                        {/* Decorative BG */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                      </div>
                      <div className="p-12 flex flex-col md:flex-row gap-16 items-center md:items-start">
                        <div className="flex flex-col items-center gap-4 group-hover:scale-105 transition-transform duration-700">
                          <div className="bg-white p-3 border border-black/5 rounded-sm shadow-xl">
                            <img src={QR_CODE_URL} alt="QR" className="w-36 h-36" />
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">{t('overview.id')}: {data.orderId}</p>
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-10 text-center md:text-start">
                          <div className="sm:col-span-2">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 mb-2">{t('overview.attendee')}</p>
                            <p className="font-bold text-[22px] text-black tracking-tight leading-none">{data.fullName}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 mb-2">{t('overview.adults')}</p>
                            <p className="font-bold text-[22px] text-black tracking-tight leading-none">{data.adultQty}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 mb-2">{t('overview.kids')}</p>
                            <p className="font-bold text-[22px] text-black tracking-tight leading-none">{data.kidsQty || '—'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xl:col-span-2 space-y-8">
                    <div className="bg-white rounded-sm border border-black/5 p-12 shadow-sm">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30 mb-8">{t('overview.payment')}</p>
                      <div className="flex items-baseline gap-3 mb-10">
                        <span className="font-display font-bold text-[48px] text-black leading-none">{data.total}</span>
                        <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-black/20">{tTickets('currency')}</span>
                      </div>
                      <button className="w-full h-16 border border-black/10 rounded-sm font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300">
                        {t('overview.download')}
                      </button>
                    </div>

                    {data.competitionEntry && (
                      <div className="bg-black p-12 rounded-sm text-white shadow-2xl shadow-black/20 relative overflow-hidden">
                        <div className="relative z-10">
                          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6">{t('overview.entry_spotlight')}</p>
                          <h4 className="text-[24px] md:text-[32px] font-display font-bold leading-[0.9] mb-4 tracking-tighter">{data.competitionEntry}</h4>
                          <div className="flex items-center gap-3 text-primary">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em]">{t('overview.review_pending')}</span>
                          </div>
                        </div>
                        <Trophy className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 rotate-12" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── TAB: Competitions ─────────────────────────────────────────── */}
              {activeTab === 'competitions' && (
                <div className="space-y-12">
                  {data.competitionEntry && (
                    <div className="bg-white border-2 border-primary rounded-sm p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-primary/5">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 bg-[#F5F5F0] rounded-sm flex items-center justify-center shadow-inner">
                          <ShieldCheck className="w-10 h-10 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/30">{t('competitions.badge')}</p>
                          <h3 className="text-[28px] md:text-[36px] font-display font-bold leading-none tracking-tighter text-black">{data.competitionEntry}</h3>
                          <div className="flex items-center gap-3 text-primary font-bold text-[12px] uppercase tracking-[0.2em]">
                            <Clock className="w-4 h-4" /> {t('competitions.received')}: {new Date(data.entryDate || '').toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <div className="bg-black text-white px-8 py-4 rounded-sm flex items-center gap-4 shadow-xl">
                          <Loader2 className="w-5 h-5 animate-spin text-primary" />
                          <span className="text-[13px] font-bold uppercase tracking-[0.2em]">{t('competitions.pending')}</span>
                        </div>
                        <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.3em]">{t('competitions.panel')}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {(t.raw('competitions.list') as any[]).map((comp, i) => {
                      const icons = [Dog, Star, Cat, Trophy];
                      const Icon = icons[i] || Trophy;
                      const isEntered = data.competitionEntry === comp.title;
                      
                      return (
                        <div key={i} className={`group bg-white rounded-sm border border-black/5 p-12 transition-all duration-500 shadow-sm ${isEntered ? 'opacity-40 grayscale pointer-events-none' : 'hover:border-primary hover:shadow-2xl hover:shadow-primary/5'}`}>
                          <Icon className="w-16 h-16 text-primary mb-10 group-hover:scale-110 transition-transform duration-700" />
                          <h3 className="text-[28px] font-display font-bold mb-5 tracking-tighter leading-none text-black">{comp.title}</h3>
                          <p className="text-[16px] text-black/40 mb-12 font-medium leading-relaxed">{comp.desc}</p>
                          <button 
                            disabled={isEntered}
                            onClick={() => router.push(`/registration?event=${i}`)} 
                            className="w-full h-18 bg-black text-white rounded-sm font-bold text-[13px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all duration-300 hover:bg-primary shadow-xl shadow-black/10"
                          >
                            {isEntered ? t('competitions.entered') : t('competitions.register')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ─── TAB: Health ───────────────────────────────────────────────── */}
              {activeTab === 'health' && (
                <div className="bg-white rounded-sm border border-black/5 p-20 text-center shadow-sm">
                  <ShieldCheck className="w-24 h-24 text-primary mx-auto mb-10 animate-pulse" />
                  <h2 className="text-[40px] font-display font-bold mb-6 tracking-tighter text-black">{t('health.title')}</h2>
                  <p className="text-[18px] text-black/40 max-w-[600px] mx-auto mb-16 font-bold">{t('health.desc')}</p>
                  <button className="h-18 px-16 bg-black text-white rounded-sm font-bold text-[14px] uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-2xl shadow-black/10">
                    {t('health.cta')}
                  </button>
                </div>
              )}

              {/* ─── TAB: Schedule ─────────────────────────────────────────────── */}
              {activeTab === 'schedule' && (
                <div className="bg-white rounded-sm border border-black/5 p-12 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
                      <div className="flex flex-col gap-5 sticky top-32">
                          {scheduleDays.map((d, index) => (
                              <button
                                  key={index}
                                  onClick={() => setActiveDay(index)}
                                  className={`text-left px-8 py-6 rounded-sm transition-all duration-500 shadow-sm ${activeDay === index
                                      ? 'bg-black text-white scale-[1.02] shadow-2xl shadow-black/20'
                                      : 'bg-[#F5F5F0] text-black hover:bg-black/5'
                                      }`}
                              >
                                  <span className="block text-[12px] uppercase tracking-[0.3em] font-bold opacity-40 mb-2">
                                      {d.day}
                                  </span>
                                  <span className="block text-[22px] font-bold font-display leading-[1.1] tracking-tight">
                                      {d.date}
                                  </span>
                              </button>
                          ))}
                      </div>

                      <div className="flex flex-col">
                          <div className="flex flex-col divide-y divide-black/5">
                              {(tSchedule.raw(`days.${scheduleDays[activeDay].eventsKey}.events`) as any[]).map((event, index) => (
                                  <div
                                      key={index}
                                      className="py-10 group"
                                  >
                                      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
                                          <span className="text-[20px] font-bold text-primary min-w-[120px] pt-1 font-body tracking-tight">
                                              {event.time}
                                          </span>
                                          <div className="flex flex-col gap-4">
                                              <h4 className="text-[24px] md:text-[32px] font-bold text-black font-display leading-[0.9] tracking-tighter group-hover:text-primary transition-colors">
                                                  {event.title}
                                              </h4>
                                              <p className="text-[16px] md:text-[18px] leading-[1.6] text-black/40 max-w-[640px] font-medium">
                                                  {event.desc}
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
                </div>
              )}

              {/* ─── TAB: Account / Settings ──────────────────────────────────── */}
              {activeTab === 'settings' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="bg-white rounded-sm border border-black/5 p-12 space-y-10 shadow-sm">
                    <h3 className="font-display font-bold text-[28px] pb-8 border-b border-black/5 tracking-tighter text-black uppercase">{t('settings.profile_title')}</h3>
                    <div className="space-y-8">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/30 mb-3">{t('settings.name')}</p>
                        <p className="font-bold text-[20px] text-black tracking-tight">{data.fullName}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/30 mb-3">{t('settings.email')}</p>
                        <p className="font-bold text-[20px] text-black tracking-tight">{data.email}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/30 mb-3">{t('settings.phone')}</p>
                        <p className="font-bold text-[20px] text-black tracking-tight">{data.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-sm border border-black/5 p-12 space-y-10 shadow-sm">
                    <h3 className="font-display font-bold text-[28px] pb-8 border-b border-black/5 tracking-tighter text-black uppercase">{t('settings.data_title')}</h3>
                    <div className="space-y-8">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/30 mb-3">{t('settings.tier')}</p>
                        <p className="font-bold text-[20px] text-primary uppercase tracking-[0.2em]">{getTierName(data.tier)}</p>
                      </div>
                      {isPetOwner && (
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/30 mb-3">{t('settings.pet_name')}</p>
                          <p className="font-bold text-[20px] text-black tracking-tight">{data.petName || '—'}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/30 mb-3">{t('overview.adults')}</p>
                          <p className="font-bold text-[20px] text-black tracking-tight">{data.adultQty}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/30 mb-3">{t('overview.kids')}</p>
                          <p className="font-bold text-[20px] text-black tracking-tight">{data.kidsQty || '0'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center font-bold tracking-widest text-black/20 uppercase">{t('loading')}</div>}>
      <DashboardContent />
    </Suspense>
  );
}
