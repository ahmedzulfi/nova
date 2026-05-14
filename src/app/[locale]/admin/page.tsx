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
        <div className="space-y-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[13px] font-bold text-primary uppercase tracking-widest">
                        <Shield className="w-3.5 h-3.5" />
                        Admin Workspace
                    </div>
                    <h1 className="text-4xl font-display font-bold text-[#37352F] tracking-tight">Command Center</h1>
                    <p className="text-[#91918E] text-[15px]">Operational overview of the Nova Paw Festival 2026.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9 rounded-md border-[#E9E9E7] bg-white text-[13px] font-semibold text-[#37352F] hover:bg-[#F7F6F3]">
                        <Calendar className="w-4 h-4 mr-2 text-[#91918E]" />
                        Schedule
                    </Button>
                    <Button className="h-9 bg-[#37352F] hover:bg-[#37352F]/90 text-white rounded-md text-[13px] font-semibold px-5">
                        Generate Report
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="group p-6 bg-white border border-[#E9E9E7] rounded-xl hover:border-[#37352F]/20 hover:shadow-sm transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", stat.bg)}>
                                <stat.icon className={cn("w-5 h-5", stat.color)} />
                            </div>
                            <div className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md border border-green-100/50">
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-[12px] font-bold text-[#91918E] uppercase tracking-widest">{stat.name}</p>
                        <h3 className="text-2xl font-display font-bold text-[#37352F] mt-1 tracking-tight">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Activity Feed */}
                    <div className="bg-white border border-[#E9E9E7] rounded-xl overflow-hidden">
                        <div className="px-6 py-5 border-b border-[#E9E9E7] flex items-center justify-between">
                            <h2 className="font-display font-bold text-[#37352F] text-lg">Real-time Stream</h2>
                            <Button variant="ghost" className="text-[12px] font-bold text-[#91918E] hover:text-[#37352F] h-8 px-3">
                                View Full Log
                            </Button>
                        </div>
                        <div className="divide-y divide-[#F1F1EF]">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="group p-5 flex items-center justify-between hover:bg-[#F7F6F3] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105",
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
                                        "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border",
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

                    {/* Revenue Snapshot (Mock Chart representation) */}
                    <div className="p-8 bg-[#F7F6F3] border border-[#E9E9E7] rounded-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="font-display font-bold text-[#37352F] text-lg mb-1">Revenue Trend</h3>
                            <p className="text-[#91918E] text-[13px] mb-8">Daily performance across all ticket categories.</p>
                            
                            <div className="flex items-end gap-1.5 h-32 mb-4">
                                {[40, 60, 45, 90, 65, 80, 55, 75, 95, 70, 85, 100].map((h, i) => (
                                    <div 
                                        key={i} 
                                        className="flex-1 bg-[#37352F]/10 hover:bg-primary rounded-t-sm transition-all duration-300"
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-[#91918E] uppercase tracking-widest pt-4 border-t border-[#E9E9E7]">
                                <span>May 01</span>
                                <span>May 14 (Today)</span>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                            <TrendingUp className="w-32 h-32" />
                        </div>
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white border border-[#E9E9E7] rounded-xl p-6">
                        <h3 className="font-display font-bold text-[#37352F] text-sm mb-4 uppercase tracking-wider">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-2">
                            <button className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-[#F7F6F3] transition-colors text-left group">
                                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Plus className="w-4 h-4" />
                                </div>
                                <span className="text-[13px] font-bold text-[#37352F]">Manual Registration</span>
                            </button>
                            <button className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-[#F7F6F3] transition-colors text-left group">
                                <div className="w-8 h-8 rounded-md bg-[#37352F]/10 flex items-center justify-center text-[#37352F] group-hover:bg-[#37352F] group-hover:text-white transition-colors">
                                    <Bell className="w-4 h-4" />
                                </div>
                                <span className="text-[13px] font-bold text-[#37352F]">Broadcast Alert</span>
                            </button>
                            <button className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-[#F7F6F3] transition-colors text-left group">
                                <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <span className="text-[13px] font-bold text-[#37352F]">Validate Tickets</span>
                            </button>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-[#F1F1EF] border border-[#E9E9E7] rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-display font-bold text-[#37352F] text-[13px] uppercase tracking-wider">Health</h3>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'API Gateway', status: 'Stable' },
                                { label: 'Auth Service', status: 'Stable' },
                                { label: 'DB Cluster', status: 'Stable' },
                            ].map((s) => (
                                <div key={s.label} className="flex items-center justify-between">
                                    <span className="text-[12px] text-[#91918E] font-medium">{s.label}</span>
                                    <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest">{s.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-primary p-6 rounded-xl text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="font-display font-bold text-[15px] mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Pro Tip
                            </h4>
                            <p className="text-[12px] text-white/80 leading-relaxed">
                                Use the <code className="bg-white/20 px-1 rounded">CMD + K</code> shortcut to search anything across the admin workspace.
                            </p>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    </div>
                </div>
            </div>
        </div>
    );
}

