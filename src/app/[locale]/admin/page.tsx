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
    Plus,
    Activity
} from 'lucide-react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    ResponsiveContainer
} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
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
    { name: 'Total Registrations', value: '1,284' },
    { name: 'Tickets Sold', value: '3,420' },
    { name: 'Total Attendees', value: '5,842' },
    { name: 'Revenue', value: '$42,500' },
];

const recentActivity = [
    { id: 1, type: 'registration', user: 'Sarah Johnson', pet: 'Grooming Competition', time: '2 mins ago', status: 'completed' },
    { id: 2, type: 'ticket', user: 'Michael Chen', quantity: '2 Adults, 1 Kid', time: '15 mins ago', status: 'completed' },
    { id: 3, type: 'registration', user: 'Emma Wilson', pet: 'Dog Fashion Show', time: '45 mins ago', status: 'pending' },
    { id: 4, type: 'ticket', user: 'David Rodriguez', quantity: 'Dog Owner Pass', time: '1 hour ago', status: 'completed' },
    { id: 5, type: 'registration', user: 'James Thompson', pet: 'Best Looking Dog Show', time: '2 hours ago', status: 'completed' },
];

const chartData = [
    { day: "Mon", registrations: 45 },
    { day: "Tue", registrations: 52 },
    { day: "Wed", registrations: 38 },
    { day: "Thu", registrations: 65 },
    { day: "Fri", registrations: 48 },
    { day: "Sat", registrations: 82 },
    { day: "Sun", registrations: 70 },
];

const chartConfig = {
    registrations: {
        label: "Registrations",
        color: "#FACC15",
    },
} satisfies ChartConfig;

export default function AdminOverviewPage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-12">
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">Dashboard Overview</h1>
                <p className="text-[16px] text-[#91918E] max-w-2xl">Manage registrations and festival operations.</p>
                
                <div className="flex items-center gap-2 mt-8">
                    {/* Simplified Header Actions */}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="group p-6 bg-white border border-[#E9E9E7] rounded-sm hover:border-[#FACC15]/50 transition-all duration-150 [transition-timing-function:var(--ease-emil-out)] active:scale-[0.98] cursor-default">
                        <p className="text-[11px] font-bold text-[#91918E] uppercase tracking-widest">{stat.name}</p>
                        <h3 className="text-[32px] font-bold text-[#37352F] mt-2 tracking-tight">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Activity Feed */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-2">
                            <h2 className="font-bold text-[#37352F] text-[16px] uppercase tracking-wider">Recent Activity</h2>
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
                    {/* Registration Trends Chart */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-2">
                            <h3 className="font-bold text-[#37352F] text-[12px] uppercase tracking-widest">Registration Trends</h3>
                            <Activity className="w-3.5 h-3.5 text-[#FACC15]" />
                        </div>
                        <div className="p-4 bg-white border border-[#E9E9E7] rounded-sm">
                            <ChartContainer config={chartConfig} className="h-[200px] w-full">
                                <AreaChart
                                    data={chartData}
                                    margin={{
                                        left: -20,
                                        right: 12,
                                        top: 10,
                                        bottom: 0
                                    }}
                                >
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F1F1EF" />
                                    <XAxis
                                        dataKey="day"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value}
                                        fontSize={10}
                                        fontWeight={600}
                                        tick={{ fill: '#91918E' }}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Area
                                        dataKey="registrations"
                                        type="natural"
                                        fill="#FACC15"
                                        fillOpacity={0.1}
                                        stroke="#FACC15"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ChartContainer>
                            <div className="mt-4 pt-4 border-t border-[#F1F1EF]">
                                <div className="flex items-center justify-between text-[11px] font-bold">
                                    <span className="text-[#91918E] uppercase tracking-widest">Total this week</span>
                                    <span className="text-[#37352F]">400 Entries</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
