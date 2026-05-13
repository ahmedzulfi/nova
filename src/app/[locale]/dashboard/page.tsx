"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { 
  ArrowRight, 
  Dog, 
  Cat, 
  User, 
  Ticket, 
  Trophy, 
  Calendar, 
  ShieldCheck, 
  Clock,
  Loader2,
  ChevronRight,
  Download,
  Info,
  ExternalLink,
  PawPrint
} from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

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

type TabType = 'overview' | 'competitions' | 'receipt' | 'health' | 'schedule' | 'settings';

function DashboardContent() {
  const router = useRouter();
  const t = useTranslations('Dashboard');
  const tTickets = useTranslations('Tickets');
  const tSchedule = useTranslations('Schedule');
  const locale = useLocale();
  
  const [data, setData] = useState<RegistrationData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [activeDay, setActiveDay] = useState(0);

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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-[64px] mb-8">🎟️</div>
        <h1 className="text-[32px] font-bold text-[#37352F] tracking-tight mb-4">{t('no_session.title')}</h1>
        <p className="text-[16px] text-[#91918E] max-w-sm mb-8">{t('no_session.desc')}</p>
        <Link href="/tickets">
            <Button className="bg-[#37352F] hover:bg-black text-white px-8 h-12 font-bold rounded-sm">
                {t('no_session.cta')}
            </Button>
        </Link>
      </div>
    );
  }

  const isPetOwner = data.tier === 'dog-owner' || data.tier === 'cat-owner';
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
    <div className="animate-in fade-in duration-700">
      {/* Notion Page Header */}
      <div className="mb-12">
        <div className="text-[78px] mb-4">
            {activeTab === 'overview' ? '👋' : 
             activeTab === 'competitions' ? '🏆' :
             activeTab === 'receipt' ? '📄' :
             activeTab === 'health' ? '🏥' :
             activeTab === 'schedule' ? '📅' : '⚙️'}
        </div>
        <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">
            {activeTab === 'overview' ? `Welcome, ${data.fullName.split(' ')[0]}` : 
             activeTab === 'competitions' ? t('sidebar.competitions') :
             activeTab === 'receipt' ? 'Order Receipt' :
             activeTab === 'health' ? t('sidebar.health') :
             activeTab === 'schedule' ? t('sidebar.schedule') : t('sidebar.settings')}
        </h1>
        
        {/* Simple Tab Switcher (Notion Style) */}
        <div className="flex items-center gap-1 mt-6 border-b border-[#E9E9E7]">
            {['overview', 'competitions', 'receipt', 'health', 'schedule', 'settings'].map((tab) => {
                if (!isPetOwner && (tab === 'competitions' || tab === 'health')) return null;
                return (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as TabType)}
                        className={`px-4 py-2 text-[14px] font-medium transition-colors border-b-2 -mb-[1px] ${
                            activeTab === tab ? 'border-[#37352F] text-[#37352F]' : 'border-transparent text-[#91918E] hover:text-[#37352F]'
                        }`}
                    >
                        {tab === 'receipt' ? 'Receipt' : t(`sidebar.${tab}`)}
                    </button>
                );
            })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* ─── TAB: Overview ─────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Ticket Block */}
                    <div className="p-6 border border-[#E9E9E7] rounded-sm space-y-6">
                        <div className="flex items-center gap-3 text-[#91918E] text-[12px] font-bold uppercase tracking-wider">
                            <Ticket size={14} />
                            <span>Digital Pass</span>
                        </div>
                        <div className="flex gap-6 items-center">
                            <div className="bg-white p-2 border border-[#E9E9E7] rounded-sm">
                                <img src={QR_CODE_URL} alt="QR" className="w-24 h-24" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-bold text-[18px]">{data.orderId}</p>
                                <p className="text-[14px] text-[#37352F]">{getTierName(data.tier)}</p>
                                <p className="text-[12px] text-[#91918E]">{data.adultQty} Adult • {data.kidsQty || 0} Kids</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full border-[#E9E9E7] h-10 text-[13px] gap-2">
                            <Download size={14} />
                            {t('overview.download')}
                        </Button>
                    </div>

                    {/* Quick Stats / Info */}
                    <div className="p-6 border border-[#E9E9E7] rounded-sm space-y-6">
                        <div className="flex items-center gap-3 text-[#91918E] text-[12px] font-bold uppercase tracking-wider">
                            <Info size={14} />
                            <span>Quick Info</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-[14px]">
                                <span className="text-[#91918E]">Status</span>
                                <span className="font-bold text-green-600">Active</span>
                            </div>
                            <div className="flex items-center justify-between text-[14px]">
                                <span className="text-[#91918E]">Location</span>
                                <span className="font-bold text-[#37352F]">The Pearl, Qatar</span>
                            </div>
                            <div className="flex items-center justify-between text-[14px]">
                                <span className="text-[#91918E]">Total Paid</span>
                                <span className="font-bold text-[#37352F]">{data.total} {tTickets('currency')}</span>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setActiveTab('receipt')}
                            variant="outline" 
                            className="w-full border-[#E9E9E7] h-10 text-[13px] gap-2 mt-4"
                        >
                            <ExternalLink size={14} />
                            View Full Receipt
                        </Button>
                    </div>
                </div>

                {data.competitionEntry && (
                    <div className="p-6 bg-[#FBFAFB] border border-[#E9E9E7] rounded-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="text-[24px]">🏅</div>
                            <div>
                                <p className="text-[12px] font-bold text-[#91918E] uppercase tracking-wider">COMPETITION ENTRY</p>
                                <p className="font-bold text-[18px]">{data.competitionEntry}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-sm text-[12px] font-medium">
                            <Clock size={12} />
                            {t('overview.review_pending')}
                        </div>
                    </div>
                )}
            </div>
          )}

          {/* ─── TAB: Competitions ─────────────────────────────────────────── */}
          {activeTab === 'competitions' && (
            <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(t.raw('competitions.list') as any[]).map((comp, i) => {
                    const isEntered = data.competitionEntry === comp.title;
                    return (
                    <div key={i} className={`p-6 border rounded-sm transition-all ${isEntered ? 'bg-[#FBFAFB] border-[#E9E9E7] opacity-60' : 'border-[#E9E9E7] hover:bg-[#F7F6F3] cursor-pointer group'}`}>
                        <div className="text-[32px] mb-4">
                            {i === 0 ? '🐕' : i === 1 ? '✨' : i === 2 ? '🐱' : '🏆'}
                        </div>
                        <h3 className="text-[18px] font-bold text-[#37352F] mb-2">{comp.title}</h3>
                        <p className="text-[14px] text-[#666666] leading-relaxed mb-6">{comp.desc}</p>
                        <Button 
                            disabled={isEntered}
                            onClick={() => router.push(`/registration?event=${i}`)}
                            className={`w-full h-10 text-[13px] font-bold ${isEntered ? 'bg-white border-[#E9E9E7] text-[#91918E]' : 'bg-[#37352F] text-white hover:bg-black'}`}
                        >
                            {isEntered ? t('competitions.entered') : t('competitions.register')}
                        </Button>
                    </div>
                    );
                })}
                </div>
            </div>
          )}

          {/* ─── TAB: Receipt ──────────────────────────────────────────────── */}
          {activeTab === 'receipt' && (
            <div className="max-w-3xl mx-auto">
                <div className="p-12 border border-[#E9E9E7] rounded-sm bg-white shadow-sm space-y-12">
                    {/* Receipt Header */}
                    <div className="flex justify-between items-start border-b border-[#E9E9E7] pb-8">
                        <div>
                            <div className="w-12 h-12 bg-[#37352F] rounded-sm flex items-center justify-center text-white text-[20px] font-bold mb-4">
                                N
                            </div>
                            <h2 className="text-[24px] font-bold text-[#37352F]">Official Receipt</h2>
                            <p className="text-[14px] text-[#91918E]">Nova Paw Festival 2026</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[12px] font-bold text-[#91918E] uppercase tracking-wider">Order ID</p>
                            <p className="text-[18px] font-bold text-[#37352F]">{data.orderId}</p>
                            <p className="text-[12px] text-[#91918E] mt-2">{new Date(data.entryDate || '').toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Receipt Content */}
                    <div className="space-y-8">
                        {/* Customer Info */}
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-2">Billed To</p>
                                <p className="text-[15px] font-bold text-[#37352F]">{data.fullName}</p>
                                <p className="text-[14px] text-[#666666]">{data.email}</p>
                                <p className="text-[14px] text-[#666666]">{data.phone}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-2">Venue</p>
                                <p className="text-[15px] font-bold text-[#37352F]">The Pearl Island</p>
                                <p className="text-[14px] text-[#666666]">Doha, Qatar</p>
                            </div>
                        </div>

                        {/* Order Details Table */}
                        <div className="border border-[#E9E9E7] rounded-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#F7F6F3] border-b border-[#E9E9E7]">
                                    <tr>
                                        <th className="px-6 py-3 text-[11px] font-bold text-[#91918E] uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-[11px] font-bold text-[#91918E] uppercase tracking-wider text-right">Quantity</th>
                                        <th className="px-6 py-3 text-[11px] font-bold text-[#91918E] uppercase tracking-wider text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E9E9E7]">
                                    <tr>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-[14px] text-[#37352F]">{getTierName(data.tier)}</p>
                                            <p className="text-[12px] text-[#91918E]">Full Access Pass</p>
                                        </td>
                                        <td className="px-6 py-4 text-right text-[14px]">1</td>
                                        <td className="px-6 py-4 text-right text-[14px]">Included</td>
                                    </tr>
                                    {data.adultQty > 0 && (
                                        <tr>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-[14px] text-[#37352F]">Additional Adult Pass</p>
                                                <p className="text-[12px] text-[#91918E]">Standard Entry</p>
                                            </td>
                                            <td className="px-6 py-4 text-right text-[14px]">{data.adultQty}</td>
                                            <td className="px-6 py-4 text-right text-[14px]">Calculated</td>
                                        </tr>
                                    )}
                                    {data.kidsQty > 0 && (
                                        <tr>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-[14px] text-[#37352F]">Kids Pass</p>
                                                <p className="text-[12px] text-[#91918E]">Under 12 Years</p>
                                            </td>
                                            <td className="px-6 py-4 text-right text-[14px]">{data.kidsQty}</td>
                                            <td className="px-6 py-4 text-right text-[14px]">Free</td>
                                        </tr>
                                    )}
                                    {data.competitionEntry && (
                                        <tr>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-[14px] text-[#37352F]">Competition Registration</p>
                                                <p className="text-[12px] text-[#91918E]">{data.competitionEntry}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right text-[14px]">1</td>
                                            <td className="px-6 py-4 text-right text-[14px]">Included</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pet Info */}
                        {isPetOwner && (
                            <div className="p-4 bg-[#F7F6F3] rounded-sm border border-[#E9E9E7]">
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-2">Registered Pet</p>
                                <div className="flex items-center gap-2">
                                    <PawPrint size={14} className="text-[#37352F]" />
                                    <p className="text-[15px] font-bold text-[#37352F]">{data.petName}</p>
                                </div>
                            </div>
                        )}

                        {/* Summary */}
                        <div className="flex justify-end pt-4">
                            <div className="w-48 space-y-2">
                                <div className="flex justify-between text-[14px]">
                                    <span className="text-[#91918E]">Total Paid</span>
                                    <span className="font-bold text-[#37352F]">{data.total} QAR</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer / PDF Style CTA */}
                    <div className="pt-12 border-t border-[#E9E9E7] flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[12px] text-[#91918E]">
                            <ShieldCheck size={14} />
                            <span>Verified by Nova Studio</span>
                        </div>
                        <Button 
                            className="bg-[#37352F] text-white hover:bg-black gap-2 h-10 px-6 font-bold rounded-sm shadow-sm"
                            onClick={() => window.print()}
                        >
                            <Download size={14} />
                            Download PDF
                        </Button>
                    </div>
                </div>
            </div>
          )}

          {/* ─── TAB: Health ───────────────────────────────────────────────── */}
          {activeTab === 'health' && (
            <div className="p-12 border border-[#E9E9E7] rounded-sm bg-[#FBFAFB] text-center space-y-6">
                <div className="text-[64px]">🏥</div>
                <h2 className="text-[28px] font-bold text-[#37352F]">{t('health.title')}</h2>
                <p className="text-[16px] text-[#666666] max-w-md mx-auto">{t('health.desc')}</p>
                <Button className="bg-[#37352F] text-white hover:bg-black px-12 h-12 font-bold rounded-sm">
                    {t('health.cta')}
                </Button>
            </div>
          )}

          {/* ─── TAB: Schedule ─────────────────────────────────────────────── */}
          {activeTab === 'schedule' && (
            <div className="space-y-8">
                <div className="flex gap-2 p-1 bg-[#F1F1EF] rounded-sm w-fit">
                    {scheduleDays.map((d, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveDay(index)}
                            className={`px-4 py-1.5 rounded-sm text-[13px] font-medium transition-all ${
                                activeDay === index ? 'bg-white shadow-sm text-[#37352F]' : 'text-[#91918E] hover:text-[#37352F]'
                            }`}
                        >
                            {d.day}
                        </button>
                    ))}
                </div>

                <div className="border border-[#E9E9E7] rounded-sm divide-y divide-[#E9E9E7]">
                    {(tSchedule.raw(`days.${scheduleDays[activeDay].eventsKey}.events`) as any[]).map((event, index) => (
                        <div key={index} className="p-6 flex gap-8 hover:bg-[#F7F6F3] transition-colors group">
                            <div className="w-24 text-[14px] font-medium text-[#91918E] pt-1">{event.time}</div>
                            <div className="flex-1 space-y-1">
                                <h4 className="text-[16px] font-bold text-[#37352F] group-hover:text-black transition-colors">{event.title}</h4>
                                <p className="text-[14px] text-[#666666] leading-relaxed">{event.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {/* ─── TAB: Settings ─────────────────────────────────────────────── */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 border border-[#E9E9E7] rounded-sm space-y-8">
                    <h3 className="text-[14px] font-bold text-[#91918E] uppercase tracking-wider border-b border-[#E9E9E7] pb-4">{t('settings.profile_title')}</h3>
                    <div className="space-y-6">
                        <div>
                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('settings.name')}</p>
                            <p className="text-[16px] font-medium text-[#37352F]">{data.fullName}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('settings.email')}</p>
                            <p className="text-[16px] font-medium text-[#37352F]">{data.email}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('settings.phone')}</p>
                            <p className="text-[16px] font-medium text-[#37352F]">{data.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 border border-[#E9E9E7] rounded-sm space-y-8">
                    <h3 className="text-[14px] font-bold text-[#91918E] uppercase tracking-wider border-b border-[#E9E9E7] pb-4">{t('settings.data_title')}</h3>
                    <div className="space-y-6">
                        <div>
                            <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('settings.tier')}</p>
                            <p className="text-[16px] font-bold text-[#37352F]">{getTierName(data.tier)}</p>
                        </div>
                        {isPetOwner && (
                            <div>
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('settings.pet_name')}</p>
                                <p className="text-[16px] font-medium text-[#37352F]">{data.petName || '—'}</p>
                            </div>
                        )}
                        <div className="flex gap-12">
                            <div>
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('overview.adults')}</p>
                                <p className="text-[16px] font-medium text-[#37352F]">{data.adultQty}</p>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-1">{t('overview.kids')}</p>
                                <p className="text-[16px] font-medium text-[#37352F]">{data.kidsQty || '0'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20 text-[#91918E] text-[14px] font-medium tracking-wider uppercase animate-pulse">{t('loading')}</div>}>
      <DashboardContent />
    </Suspense>
  );
}
