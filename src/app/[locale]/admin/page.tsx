"use client";

import React from 'react';
import {
    Users,
    PawPrint,
    Ticket,
    TrendingUp,
    ArrowUpRight,
    Calendar,
    Bell,
    CheckCircle2,
    Clock,
    Shield,
    Plus
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
    { name: 'Total Registrations', value: '1,284', change: '+12%', icon: PawPrint, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'Tickets Sold', value: '3,420', change: '+8%', icon: Ticket, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Total Attendees', value: '5,842', change: '+24%', icon: Users, color: 'text-teal-500', bg: 'bg-teal-50' },
    { name: 'Revenue', value: '$42,500', change: '+15%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
];

const recentActivity = [
    { id: 1, type: 'registration', user: 'Sarah Johnson', pet: 'Luna (Golden Retriever)', time: '2 mins ago', status: 'completed' },
    { id: 2, type: 'ticket', user: 'Michael Chen', quantity: '3 Tickets', time: '15 mins ago', status: 'completed' },
    { id: 3, type: 'registration', user: 'Emma Wilson', pet: 'Oliver (Tabby Cat)', time: '45 mins ago', status: 'pending' },
    { id: 4, type: 'ticket', user: 'David Rodriguez', quantity: '1 Ticket', time: '1 hour ago', status: 'completed' },
    { id: 5, type: 'registration', user: 'James Thompson', pet: 'Max (Beagle)', time: '2 hours ago', status: 'completed' },
];

export default function AdminOverviewPage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-12">
                <div className="text-[78px] mb-4">🕹️</div>
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">Command Center</h1>
                <p className="text-[16px] text-[#91918E] max-w-2xl">Operational overview and real-time management of the Nova Paw Festival 2026.</p>
                
                <div className="flex items-center gap-2 mt-8">
                    <Button variant="outline" className="h-9 rounded-sm border-[#E9E9E7] bg-white text-[13px] font-semibold text-[#37352F] hover:bg-[#F7F6F3] transition-all active:scale-[0.98]">
                        <Calendar className="w-4 h-4 mr-2 text-[#91918E]" />
                        Event Schedule
                    </Button>
                    <Button className="h-9 bg-[#37352F] hover:bg-black text-white rounded-sm text-[13px] font-bold px-6 transition-all active:scale-[0.98]">
                        Generate Report
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="group p-6 bg-white border border-[#E9E9E7] rounded-sm hover:bg-[#F7F6F3]/50 transition-all duration-150 [transition-timing-function:var(--ease-emil-out)] active:scale-[0.98] cursor-default">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("w-8 h-8 rounded-sm flex items-center justify-center", stat.bg)}>
                                <stat.icon className={cn("w-4.5 h-4.5", stat.color)} />
                            </div>
                            <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-sm border border-green-100/30">
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">{stat.name}</p>
                        <h3 className="text-[24px] font-bold text-[#37352F] mt-1 tracking-tight">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Activity Feed */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-2">
                            <h2 className="font-bold text-[#37352F] text-[16px] uppercase tracking-wider">Real-time Stream</h2>
                            <Button variant="ghost" className="text-[12px] font-bold text-[#91918E] hover:text-[#37352F] h-8 px-2">
                                View Full Log
                            </Button>
                        </div>
                        <div className="border border-[#E9E9E7] rounded-sm divide-y divide-[#F1F1EF] overflow-hidden">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="group p-4 flex items-center justify-between hover:bg-[#F7F6F3] transition-all duration-150 [transition-timing-function:var(--ease-emil-out)] cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-9 h-9 rounded-sm flex items-center justify-center transition-transform duration-200 [transition-timing-function:var(--ease-emil-out)] group-hover:scale-105",
                                            activity.type === 'registration' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                                        )}>
                                            {activity.type === 'registration' ? <PawPrint className="w-4.5 h-4.5" /> : <Ticket className="w-4.5 h-4.5" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[14px] text-[#37352F]">
                                                {activity.type === 'registration'
                                                    ? `New Registration: ${activity.pet}`
                                                    : `Ticket Purchased: ${activity.quantity}`}
                                            </p>
                                            <p className="text-[12px] text-[#91918E]">by {activity.user} • {activity.time}</p>
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border",
                                        activity.status === 'completed' 
                                            ? 'bg-green-50 text-green-600 border-green-100/50' 
                                            : 'bg-yellow-50 text-yellow-600 border-yellow-100/50'
                                    )}>
                                        {activity.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="space-y-8">
                    {/* System Status */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-[#37352F] text-[12px] uppercase tracking-widest border-b border-[#E9E9E7] pb-2">System Health</h3>
                        <div className="p-6 bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm space-y-4">
                            {[
                                { label: 'API Gateway', status: 'Stable' },
                                { label: 'Auth Service', status: 'Stable' },
                                { label: 'DB Cluster', status: 'Stable' },
                            ].map((s) => (
                                <div key={s.label} className="flex items-center justify-between">
                                    <span className="text-[13px] text-[#37352F] font-medium">{s.label}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest">{s.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
