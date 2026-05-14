"use client";

import React, { useState } from 'react';
import {
    Users,
    PawPrint,
    Ticket,
    TrendingUp,
    Calendar,
    Bell,
    CheckCircle2,
    Shield,
    Plus,
    Download
} from 'lucide-react';
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

type TabType = 'overview' | 'reports' | 'system';

export default function AdminOverviewPage() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    return (
        <div className="animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="text-[78px] mb-4">🎛️</div>
                    <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">Command Center</h1>
                    <p className="text-[#91918E] text-[16px] max-w-xl">Operational overview and live monitoring of the Nova Paw Festival 2026.</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <Button variant="outline" className="h-10 rounded-sm border-[#E9E9E7] bg-white text-[13px] font-semibold text-[#37352F] hover:bg-[#F7F6F3]">
                        <Calendar className="w-4 h-4 mr-2 text-[#91918E]" />
                        Schedule
                    </Button>
                    <Button className="h-10 bg-[#37352F] hover:bg-black text-white rounded-sm text-[13px] font-bold px-5">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                    </Button>
                </div>
            </div>

            {/* Simple Tab Switcher (Notion Style) */}
            <div className="flex items-center gap-1 mb-8 border-b border-[#E9E9E7]">
                {(['overview', 'reports', 'system'] as TabType[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-[14px] font-medium transition-colors border-b-2 -mb-[1px] capitalize ${activeTab === tab ? 'border-[#37352F] text-[#37352F]' : 'border-transparent text-[#91918E] hover:text-[#37352F]'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-12">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat) => (
                            <div key={stat.name} className="group p-6 bg-white border border-[#E9E9E7] rounded-sm transition-all hover:bg-[#F7F6F3] cursor-default">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-[#91918E] text-[12px] font-bold uppercase tracking-wider">
                                        <stat.icon className="w-4 h-4" />
                                        <span>{stat.name}</span>
                                    </div>
                                    <div className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-sm border border-green-100/50">
                                        {stat.change}
                                    </div>
                                </div>
                                <h3 className="text-[32px] font-bold text-[#37352F] tracking-tight">{stat.value}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Activity Feed */}
                            <div className="bg-white border border-[#E9E9E7] rounded-sm overflow-hidden">
                                <div className="px-6 py-5 border-b border-[#E9E9E7] flex items-center justify-between bg-[#F7F6F3]">
                                    <h2 className="font-bold text-[#37352F] text-[16px]">Real-time Stream</h2>
                                    <Button variant="ghost" className="text-[12px] font-bold text-[#91918E] hover:text-[#37352F] h-8 px-3 rounded-sm">
                                        View Full Log
                                    </Button>
                                </div>
                                <div className="divide-y divide-[#E9E9E7]">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="group p-5 flex items-center justify-between hover:bg-[#F7F6F3] transition-colors cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-sm flex items-center justify-center transition-transform group-hover:scale-105",
                                                    activity.type === 'registration' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                                )}>
                                                    {activity.type === 'registration' ? <PawPrint className="w-4 h-4" /> : <Ticket className="w-4 h-4" />}
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

                            {/* Revenue Snapshot (Mock Chart representation) */}
                            <div className="p-8 bg-[#FBFAFB] border border-[#E9E9E7] rounded-sm relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="font-bold text-[#37352F] text-[16px] mb-1">Revenue Trend</h3>
                                    <p className="text-[#91918E] text-[13px] mb-8">Daily performance across all ticket categories.</p>

                                    <div className="flex items-end gap-1 h-32 mb-4">
                                        {[40, 60, 45, 90, 65, 80, 55, 75, 95, 70, 85, 100].map((h, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 bg-[#E9E9E7] group-hover:bg-[#37352F] transition-colors duration-300"
                                                style={{ height: `${h}%` }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold text-[#91918E] uppercase tracking-widest pt-4 border-t border-[#E9E9E7]">
                                        <span>May 01</span>
                                        <span>May 14 (Today)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar area */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-white border border-[#E9E9E7] rounded-sm p-6">
                                <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-4 border-b border-[#E9E9E7] pb-2">Quick Actions</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <button className="flex items-center gap-3 w-full px-2 py-2.5 rounded-sm hover:bg-[#E9E9E7] transition-colors text-left text-[#37352F]">
                                        <Plus className="w-4 h-4 text-[#91918E]" />
                                        <span className="text-[14px] font-medium">Manual Registration</span>
                                    </button>
                                    <button className="flex items-center gap-3 w-full px-2 py-2.5 rounded-sm hover:bg-[#E9E9E7] transition-colors text-left text-[#37352F]">
                                        <Bell className="w-4 h-4 text-[#91918E]" />
                                        <span className="text-[14px] font-medium">Broadcast Alert</span>
                                    </button>
                                    <button className="flex items-center gap-3 w-full px-2 py-2.5 rounded-sm hover:bg-[#E9E9E7] transition-colors text-left text-[#37352F]">
                                        <CheckCircle2 className="w-4 h-4 text-[#91918E]" />
                                        <span className="text-[14px] font-medium">Validate Tickets</span>
                                    </button>
                                </div>
                            </div>

                            {/* System Status */}
                            <div className="bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm p-6">
                                <div className="flex items-center justify-between mb-4 border-b border-[#E9E9E7] pb-2">
                                    <h3 className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider">Health</h3>
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { label: 'API Gateway', status: 'Stable' },
                                        { label: 'Auth Service', status: 'Stable' },
                                        { label: 'DB Cluster', status: 'Stable' },
                                    ].map((s) => (
                                        <div key={s.label} className="flex items-center justify-between">
                                            <span className="text-[13px] text-[#37352F]">{s.label}</span>
                                            <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest">{s.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pro Tip */}
                            <div className="border border-[#E9E9E7] p-6 rounded-sm text-[#37352F] relative overflow-hidden group">
                                <h4 className="text-[11px] font-bold text-[#91918E] uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Shield className="w-3.5 h-3.5" />
                                    Pro Tip
                                </h4>
                                <p className="text-[13px] text-[#666666] leading-relaxed">
                                    Use the <code className="bg-[#E9E9E7] text-[#37352F] px-1.5 py-0.5 rounded-sm font-bold">CMD + K</code> shortcut to search anything across the admin workspace.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {activeTab === 'reports' && (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-[#E9E9E7] border-dashed rounded-sm">
                    <div className="text-[48px] mb-4">📊</div>
                    <h2 className="text-[24px] font-bold text-[#37352F] mb-2">Reports Module</h2>
                    <p className="text-[14px] text-[#91918E]">Detailed analytics and exports will be available here.</p>
                </div>
            )}

            {activeTab === 'system' && (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-[#E9E9E7] border-dashed rounded-sm">
                    <div className="text-[48px] mb-4">⚙️</div>
                    <h2 className="text-[24px] font-bold text-[#37352F] mb-2">System Configuration</h2>
                    <p className="text-[14px] text-[#91918E]">Platform settings and access controls will be available here.</p>
                </div>
            )}
        </div>
    );
}

