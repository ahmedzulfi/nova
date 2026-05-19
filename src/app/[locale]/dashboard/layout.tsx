"use client";

import React, { useState } from 'react';
import { 
  Link, 
  usePathname, 
  useRouter 
} from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { 
  LayoutDashboard, 
  Trophy, 
  ShieldCheck, 
  Calendar, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Ticket,
  Search,
  Bell,
  Plus,
  Menu,
  X
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const t = useTranslations('Dashboard');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { id: 'overview', label: t('sidebar.overview'), icon: LayoutDashboard, href: '/dashboard' },
    { id: 'register-pet', label: 'Competition Entry', icon: Plus, href: '/dashboard/register-pet' },
    { id: 'competitions', label: t('sidebar.competitions'), icon: Trophy, href: '/dashboard/pet-owner' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('nova_registration');
    router.push('/tickets');
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-[#37352F]">
      {/* Notion Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col bg-[#F7F6F3] border-r border-[#E9E9E7] transition-all duration-300
          ${isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full lg:w-16 lg:translate-x-0'}
          rtl:left-auto rtl:right-0 rtl:border-l rtl:border-r-0
        `}
      >
        {/* User Workspace Header */}
        <div className="p-4 flex items-center justify-between group">
          <div className={`flex items-center gap-2 overflow-hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-6 h-6 bg-[#37352F] rounded-sm flex items-center justify-center text-white text-[12px] font-bold">
              N
            </div>
            <span className="font-semibold text-[14px] truncate">Nova Paw Festival</span>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 hover:bg-[#E9E9E7] rounded-sm text-[#91918E] lg:hidden"
            >
              <X size={16} />
            </button>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 hover:bg-[#E9E9E7] rounded-sm text-[#91918E] hidden lg:block"
            >
              {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 px-2 space-y-0.5 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href as any}
              className={`
                flex items-center gap-2 px-2 py-1.5 rounded-sm text-[14px] transition-all duration-150
                ${pathname === item.href ? 'bg-[#FACC15] text-black font-bold shadow-sm' : 'hover:bg-[#E9E9E7] text-[#37352F]'}
              `}
            >
              <item.icon size={18} className={pathname === item.href ? "text-black" : "text-[#91918E]"} />
              <span>{item.label}</span>
            </Link>
          ))}
          

        </nav>

        {/* Footer Actions */}
        <div className={`p-4 border-t border-[#E9E9E7] transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[#E9E9E7] rounded-sm text-[14px] text-red-600"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main 
        className={`
          flex-1 transition-all duration-300 bg-white
          ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}
          rtl:lg:ml-0 rtl:lg:mr-64
          ${!isSidebarOpen && 'rtl:lg:mr-16'}
        `}
      >
        {/* Notion Header */}
        <header className="h-12 flex items-center justify-between px-8 md:px-16 border-b border-[#F1F1EF] sticky top-0 bg-white/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 hover:bg-[#F1F1EF] rounded-sm text-[#91918E]"
              >
                <Menu size={18} />
              </button>
            )}
            <div className="flex items-center gap-2 text-[13px] text-[#91918E]">
              <span>Nova Paw</span>
              <span>/</span>
              <span className="text-[#37352F] capitalize font-medium">
                {pathname === '/dashboard' ? 'Overview' : pathname.split('/').pop()?.replace(/-/g, ' ')}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:bg-[#F1F1EF] rounded-sm text-[#91918E]">
              <Bell size={16} />
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-8 md:p-16">
          {children}
        </div>
      </main>
    </div>
  );
}
