"use client";

import React, { useState } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import {
    LayoutDashboard,
    PawPrint,
    Ticket,
    Users,
    Calendar,
    Settings,
    LogOut,
    Shield,
    Bell,
    ChevronLeft,
    ChevronRight,
    Plus
} from 'lucide-react';

const navItems = [
    { id: 'overview', name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { id: 'registrations', name: 'Registrations', href: '/admin/registrations', icon: PawPrint },
    { id: 'tickets', name: 'Tickets', href: '/admin/tickets', icon: Ticket },
    { id: 'attendees', name: 'Attendees', href: '/admin/attendees', icon: Users },
    { id: 'schedule', name: 'Schedule', href: '/admin/schedule', icon: Calendar },
    { id: 'settings', name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    // Don't show sidebar on login page
    if (pathname.includes('/admin/login')) {
        return <>{children}</>;
    }

    const handleLogout = () => {
        router.push('/admin/login');
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
                {/* Admin Workspace Header */}
                <div className="p-4 flex items-center justify-between group">
                    <div className={`flex items-center gap-2 overflow-hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-6 h-6 bg-[#37352F] rounded-sm flex items-center justify-center text-white transition-transform group-hover:scale-105">
                            <Shield className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-semibold text-[14px] truncate">Nova Paw Admin</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-[#E9E9E7] rounded-sm text-[#91918E]"
                    >
                        {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className={`flex-1 px-2 space-y-0.5 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="mt-2 mb-2 px-2 text-[11px] font-bold text-[#91918E] uppercase tracking-wider">
                        Navigation
                    </div>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.id}
                                href={item.href as any}
                                className={`
                                    flex items-center gap-2 px-2 py-1.5 rounded-sm text-[14px] transition-colors
                                    ${isActive ? 'bg-[#E9E9E7] font-semibold text-[#37352F]' : 'hover:bg-[#E9E9E7] text-[#37352F]/70 hover:text-[#37352F]'}
                                `}
                            >
                                <item.icon size={18} className={isActive ? 'text-[#37352F]' : 'text-[#91918E]'} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}

                    <div className="mt-8 mb-2 px-2 text-[11px] font-bold text-[#91918E] uppercase tracking-wider">
                        Resources
                    </div>
                    <Link href="#" className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#E9E9E7] rounded-sm text-[14px] text-[#37352F]/70 hover:text-[#37352F]">
                        <div className="w-[18px] flex justify-center text-[14px]">📄</div>
                        <span>Show Manual</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#E9E9E7] rounded-sm text-[14px] text-[#37352F]/70 hover:text-[#37352F]">
                        <div className="w-[18px] flex justify-center text-[14px]">🎫</div>
                        <span>Ticket Templates</span>
                    </Link>
                </nav>

                {/* Footer Actions */}
                <div className={`p-4 border-t border-[#E9E9E7] transition-opacity flex flex-col gap-2 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-[#E9E9E7] cursor-pointer transition-colors group">
                        <div className="w-6 h-6 rounded-sm bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                            AD
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-[13px] font-bold text-[#37352F] truncate leading-none">Admin User</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-red-50 rounded-sm text-[14px] text-red-600 transition-colors"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main
                className={`
          flex-1 transition-all duration-300 flex flex-col
          ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}
          rtl:lg:ml-0 rtl:lg:mr-64
          ${!isSidebarOpen && 'rtl:lg:mr-16'}
        `}
            >
                {/* Admin Header */}
                <header className="h-14 border-b border-[#E9E9E7] flex items-center justify-between px-6 sticky top-0 z-20 bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-[#91918E] text-[13px]">
                            <span className="hover:text-[#37352F] cursor-pointer transition-colors">Nova Paw</span>
                            <span>/</span>
                            <span className="text-[#37352F] font-semibold capitalize">
                                {pathname === '/admin' ? 'Overview' : pathname.split('/').pop()}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center px-3 py-1 bg-[#F1F1EF] rounded-md text-[10px] font-bold text-[#91918E] uppercase tracking-widest border border-[#E9E9E7]">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                            System Live
                        </div>
                        <button className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-[#F1F1EF] transition-colors">
                            <Bell className="w-4 h-4 text-[#37352F]" />
                        </button>
                        <button className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-[#F1F1EF] transition-colors">
                            <Settings className="w-4 h-4 text-[#37352F]" />
                        </button>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto w-full p-8 md:p-12 lg:p-16">
                    {children}
                </div>
            </main>
        </div>
    );
}

