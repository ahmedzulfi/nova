"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    PawPrint,
    Ticket,
    Users,
    Calendar,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Shield,
    Bell,
    Plus,
    FileText,
    Search
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const navItems = [
    { id: 'overview', name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { id: 'scanner', name: 'Scanner', href: '/admin/scanner', icon: Shield },
    { id: 'registrations', name: 'Registrations', href: '/admin/registrations', icon: PawPrint },
    { id: 'tickets', name: 'Tickets', href: '/admin/tickets', icon: Ticket },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    // Don't show sidebar on login page
    if (pathname.includes('/admin/login')) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-white font-sans text-[#37352F]">
            {/* Notion Sidebar */}
            <aside 
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex flex-col bg-[#F7F6F3] border-r border-[#E9E9E7] transition-all duration-300",
                    isSidebarOpen ? "w-64" : "w-0 -translate-x-full lg:w-16 lg:translate-x-0"
                )}
            >
                {/* Workspace Header */}
                <div className="p-4 flex items-center justify-between group">
                    <div className={cn(
                        "flex items-center gap-2 overflow-hidden transition-opacity",
                        isSidebarOpen ? "opacity-100" : "opacity-0"
                    )}>
                        <div className="w-6 h-6 bg-[#FACC15] rounded-sm flex items-center justify-center text-black text-[12px] font-bold">
                            N
                        </div>
                        <span className="font-semibold text-[14px] truncate">Nova Admin</span>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-[#E9E9E7] rounded-sm text-[#91918E]"
                    >
                        {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className={cn(
                    "flex-1 px-2 space-y-0.5 transition-opacity",
                    isSidebarOpen ? "opacity-100" : "opacity-0"
                )}>
                    <div className="mt-4 mb-1 px-2 text-[11px] font-bold text-[#91918E] uppercase tracking-wider">
                        Workspace
                    </div>
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 px-2 py-1.5 rounded-sm text-[14px] transition-all duration-150",
                                pathname === item.href 
                                    ? "bg-[#FACC15] text-black font-bold shadow-sm" 
                                    : "hover:bg-[#EBEBE9] text-[#37352F]"
                            )}
                        >
                            <item.icon size={18} className={cn(pathname === item.href ? "text-black" : "text-[#91918E]")} />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                    
                    {/* Removed Quick Actions */}
                </nav>

                {/* Footer User Profile */}
                <div className={cn(
                    "p-4 border-t border-[#E9E9E7] transition-opacity",
                    isSidebarOpen ? "opacity-100" : "opacity-0"
                )}>
                    <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
                        <div className="w-5 h-5 rounded-sm bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">
                            AD
                        </div>
                        <span className="text-[13px] font-medium truncate">Admin Workspace</span>
                    </div>
                    <Link
                        href="/admin/login"
                        className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[#EBEBE9] rounded-sm text-[14px] text-red-600"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main 
                className={cn(
                    "flex-1 transition-all duration-300 bg-white",
                    isSidebarOpen ? "lg:ml-64" : "lg:ml-16"
                )}
            >
                {/* Simple Notion Header */}
                <header className="h-12 flex items-center justify-between px-8 md:px-16 border-b border-[#F1F1EF] sticky top-0 bg-white/80 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-2 text-[13px] text-[#91918E]">
                        <span>Nova Paw</span>
                        <span>/</span>
                        <span className="text-[#37352F] capitalize font-medium">
                            {pathname === '/admin' ? 'Overview' : pathname.split('/').pop()?.replace(/-/g, ' ')}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => toast.info("No new notifications", { description: "You are all caught up for today." })}
                            className="p-1.5 hover:bg-[#F1F1EF] rounded-sm text-[#91918E]"
                        >
                            <Bell size={16} />
                        </button>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto p-8 md:p-16">
                    {children}
                </div>
            </main>
        </div>
    );
}
