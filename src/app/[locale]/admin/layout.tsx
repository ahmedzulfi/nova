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
    Shield
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
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-[#FAFAFA]">
                <Sidebar className="border-r border-black/5 bg-white">
                    <SidebarHeader className="p-6">
                        <Link href="/admin" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-primary  rounded-sm flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-lg leading-tight">Nova Paw</span>
                                <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Admin Portal</span>
                            </div>
                        </Link>
                    </SidebarHeader>

                    <SidebarContent className="px-4 py-6">
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.name} className="mb-1">
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-3  rounded-sm transition-all duration-200 group",
                                                    isActive
                                                        ? "bg-black text-white shadow-md shadow-black/10"
                                                        : "text-gray-500 hover:bg-black/5 hover:text-black"
                                                )}
                                            >
                                                <item.icon className={cn(
                                                    "w-5 h-5 transition-transform group-hover:scale-110",
                                                    isActive ? "text-primary" : "text-gray-400 group-hover:text-black"
                                                )} />
                                                <span className="font-semibold text-[15px]">{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarContent>

                    <SidebarFooter className="p-6 mt-auto">
                        <div className="bg-black/5    rounded-sm  p-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                    AD
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-bold truncate">Admin User</span>
                                    <span className="text-[10px] text-gray-500 truncate">admin@petfestival.com</span>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/admin/login"
                            className="flex items-center gap-3 px-4 py-3  rounded-sm text-red-500 hover:bg-red-50 font-semibold text-[15px] transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </Link>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset className="flex-1 overflow-auto">
                    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-8 sticky top-0 z-20">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="md:hidden" />
                            <h2 className="text-xl font-display font-bold capitalize">
                                {pathname === '/admin' ? 'Overview' : pathname.split('/').pop()}
                            </h2>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center px-4 py-2 bg-black/5 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                                System Live
                            </div>
                            <button className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
                                <Settings className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </header>
                    <main className="p-8">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
