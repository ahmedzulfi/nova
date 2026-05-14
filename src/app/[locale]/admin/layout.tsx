"use client";

import React from 'react';
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
    Menu,
    X,
    Shield,
    Bell
} from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset
} from "@/components/ui/sidebar";

const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Registrations', href: '/admin/registrations', icon: PawPrint },
    { name: 'Tickets', href: '/admin/tickets', icon: Ticket },
    { name: 'Attendees', href: '/admin/attendees', icon: Users },
    { name: 'Schedule', href: '/admin/schedule', icon: Calendar },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Don't show sidebar on login page
    if (pathname.includes('/admin/login')) {
        return <>{children}</>;
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-white">
                {/* Notion-style Sidebar */}
                <Sidebar className="border-r border-[#E9E9E7] bg-[#F7F6F3]">
                    <SidebarHeader className="p-6">
                        <Link href="/admin" className="flex items-center gap-3 group px-2">
                            <div className="w-8 h-8 bg-[#37352F] rounded-md flex items-center justify-center text-white transition-transform group-hover:scale-105">
                                <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-[15px] text-[#37352F] leading-tight tracking-tight">Nova Paw Admin</span>
                                <span className="text-[10px] uppercase tracking-widest text-[#91918E] font-bold">Workspace</span>
                            </div>
                        </Link>
                    </SidebarHeader>

                    <SidebarContent className="px-3 py-2">
                        <div className="mb-4 px-4 py-2 text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Navigation</div>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.name} className="mb-0.5">
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors group",
                                                    isActive
                                                        ? "bg-[#EBEBE9] text-[#37352F]"
                                                        : "text-[#37352F]/70 hover:bg-[#EBEBE9] hover:text-[#37352F]"
                                                )}
                                            >
                                                <item.icon className={cn(
                                                    "w-4.5 h-4.5",
                                                    isActive ? "text-[#37352F]" : "text-[#91918E] group-hover:text-[#37352F]"
                                                )} />
                                                <span className="font-medium text-[14px]">{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>

                        <div className="mt-8 mb-4 px-4 py-2 text-[11px] font-bold text-[#91918E] uppercase tracking-widest">Resources</div>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Link href="#" className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[#37352F]/70 hover:bg-[#EBEBE9] hover:text-[#37352F] transition-colors">
                                    <div className="w-4.5 h-4.5 flex items-center justify-center">📄</div>
                                    <span className="font-medium text-[14px]">Show Manual</span>
                                </Link>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Link href="#" className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[#37352F]/70 hover:bg-[#EBEBE9] hover:text-[#37352F] transition-colors">
                                    <div className="w-4.5 h-4.5 flex items-center justify-center">🎫</div>
                                    <span className="font-medium text-[14px]">Ticket Templates</span>
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>

                    <SidebarFooter className="p-4 mt-auto">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-[#EBEBE9] cursor-pointer transition-colors group">
                                <div className="w-7 h-7 rounded-md bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                                    AD
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-[13px] font-bold text-[#37352F] truncate">Admin User</span>
                                    <span className="text-[10px] text-[#91918E] truncate">admin@petfestival.com</span>
                                </div>
                            </div>
                            <Link
                                href="/admin/login"
                                className="flex items-center gap-2.5 px-3 py-2 rounded-md text-red-600/70 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="font-medium text-[13px]">Log Out</span>
                            </Link>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset className="flex-1 overflow-auto bg-white">
                    <header className="h-14 border-b border-[#E9E9E7] flex items-center justify-between px-6 sticky top-0 z-20 bg-white/80 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <SidebarTrigger className="md:hidden" />
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
                    <main className=" w-full  mx-auto p-8 lg:p-12">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
