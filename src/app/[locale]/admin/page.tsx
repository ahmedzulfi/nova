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
    Shield
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
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold">Welcome back, Admin</h1>
                    <p className="text-gray-500">Here's what's happening with the Nova Paw Festival today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className=" rounded-sm border-black/5 hover:bg-black/5">
                        <Calendar className="w-4 h-4 mr-2" />
                        Download Report
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white  rounded-sm shadow-lg shadow-primary/20">
                        Manage Events
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.name} className="border-black/5 shadow-sm hover:shadow-md transition-shadow    rounded-sm  overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={cn("w-12 h-12  rounded-sm flex items-center justify-center", stat.bg)}>
                                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                                </div>
                                <div className="flex items-center text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                                    {stat.change}
                                    <ArrowUpRight className="w-3 h-3 ml-1" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.name}</p>
                                <h3 className="text-3xl font-display font-bold mt-1">{stat.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 border-black/5 shadow-sm    rounded-sm ">
                    <CardHeader className="p-8 border-b border-black/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-display font-bold">Recent Activity</CardTitle>
                                <CardDescription>Latest registrations and ticket sales</CardDescription>
                            </div>
                            <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5">View All</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-black/5">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-black/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center",
                                            activity.type === 'registration' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                        )}>
                                            {activity.type === 'registration' ? <PawPrint className="w-5 h-5" /> : <Ticket className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[15px]">
                                                {activity.type === 'registration'
                                                    ? `New Registration: ${activity.pet}`
                                                    : `Ticket Purchased: ${activity.quantity}`}
                                            </p>
                                            <p className="text-sm text-gray-500">by {activity.user}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{activity.time}</p>
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
                                            activity.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                        )}>
                                            {activity.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions & Notifications */}
                <div className="space-y-8">
                    <Card className="border-black/5 shadow-sm    rounded-sm ">
                        <CardHeader className="p-6">
                            <CardTitle className="text-xl font-display font-bold">System Status</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-50  rounded-sm border border-green-100">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-bold text-green-900">Registration API</span>
                                </div>
                                <span className="text-xs font-bold text-green-600 uppercase">Online</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-green-50  rounded-sm border border-green-100">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-bold text-green-900">Payment Gateway</span>
                                </div>
                                <span className="text-xs font-bold text-green-600 uppercase">Online</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-yellow-50  rounded-sm border border-yellow-100">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-yellow-600" />
                                    <span className="text-sm font-bold text-yellow-900">Email Server</span>
                                </div>
                                <span className="text-xs font-bold text-yellow-600 uppercase">Slow</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary text-white border-none shadow-xl shadow-primary/20    rounded-sm  overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Shield className="w-24 h-24" />
                        </div>
                        <CardContent className="p-6 relative z-10">
                            <h3 className="text-xl font-display font-bold mb-2">Festival Countdown</h3>
                            <p className="text-white/80 text-sm mb-6">Pearls are forever, and the festival is coming soon!</p>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-white/10    rounded-sm  p-2">
                                    <p className="text-2xl font-bold">45</p>
                                    <p className="text-[10px] uppercase font-bold text-white/60">Days</p>
                                </div>
                                <div className="bg-white/10    rounded-sm  p-2">
                                    <p className="text-2xl font-bold">12</p>
                                    <p className="text-[10px] uppercase font-bold text-white/60">Hours</p>
                                </div>
                                <div className="bg-white/10    rounded-sm  p-2">
                                    <p className="text-2xl font-bold">34</p>
                                    <p className="text-[10px] uppercase font-bold text-white/60">Mins</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

