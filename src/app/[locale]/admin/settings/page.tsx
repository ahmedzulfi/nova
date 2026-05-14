"use client";

import React, { useState } from 'react';
import {
    Settings,
    Users,
    Plug,
    ToggleLeft,
    Save,
    Shield,
    Globe,
    Mail,
    Database,
    CreditCard,
    Plus,
    MoreHorizontal
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const teamMembers = [
    { id: 1, name: 'Ahmed Zulfiqar', email: 'ahmed@novapaw.com', role: 'Owner', status: 'Active' },
    { id: 2, name: 'Sarah Miller', email: 'sarah@novapaw.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Dr. Karim Hassan', email: 'karim@novapaw.com', role: 'Editor', status: 'Pending' },
];

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Notion Page Header */}
            <div className="mb-10">
                <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">Settings</h1>
                <p className="text-[16px] text-[#91918E] max-w-2xl">Manage workspace configurations, team permissions, and platform integrations.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="bg-transparent border-b border-[#F1F1EF] w-full justify-start h-auto p-0 rounded-none gap-8 mb-8">
                    <TabsTrigger 
                        value="general" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FACC15] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-[14px] font-medium text-[#91918E] data-[state=active]:text-[#37352F] transition-all"
                    >
                        General
                    </TabsTrigger>
                    <TabsTrigger
                        value="features"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#FACC15] rounded-none px-0 py-3 text-[14px] font-medium text-[#91918E] data-[state=active]:text-[#37352F]"
                    >
                        <ToggleLeft className="w-4 h-4 mr-2" />
                        Features
                    </TabsTrigger>
                    <TabsTrigger
                        value="team"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#FACC15] rounded-none px-0 py-3 text-[14px] font-medium text-[#91918E] data-[state=active]:text-[#37352F]"
                    >
                        <Users className="w-4 h-4 mr-2" />
                        Team
                    </TabsTrigger>
                    <TabsTrigger
                        value="integrations"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#FACC15] rounded-none px-0 py-3 text-[14px] font-medium text-[#91918E] data-[state=active]:text-[#37352F]"
                    >
                        <Plug className="w-4 h-4 mr-2" />
                        Integrations
                    </TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general" className="pt-6 space-y-6">
                    <div className="bg-white border border-[#E9E9E7]  rounded-sm  p-6">
                        <h3 className="font-display font-bold text-[#37352F] text-lg mb-6">Workspace Details</h3>
                        <div className="space-y-6 max-w-2xl">
                            <div className="grid gap-2">
                                <Label htmlFor="eventName" className="text-[13px] font-bold text-[#91918E] uppercase tracking-widest">Event Name</Label>
                                <Input id="eventName" defaultValue="Nova Paw Festival 2026" className="bg-[#F7F6F3] border-[#E9E9E7] focus-visible:ring-[#37352F]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="supportEmail" className="text-[13px] font-bold text-[#91918E] uppercase tracking-widest">Support Email</Label>
                                <Input id="supportEmail" defaultValue="support@novapaw.qa" type="email" className="bg-[#F7F6F3] border-[#E9E9E7] focus-visible:ring-[#37352F]" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-[13px] font-bold text-[#91918E] uppercase tracking-widest">Timezone</Label>
                                    <div className="px-3 py-2 bg-[#F7F6F3] border border-[#E9E9E7] rounded-md text-[14px] text-[#37352F] flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-[#91918E]" />
                                        Asia/Qatar (GMT+3)
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-[13px] font-bold text-[#91918E] uppercase tracking-widest">Currency</Label>
                                    <div className="px-3 py-2 bg-[#F7F6F3] border border-[#E9E9E7] rounded-md text-[14px] text-[#37352F] flex items-center gap-2">
                                        QAR (Qatari Riyal)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-100  rounded-sm  p-6">
                        <h3 className="font-display font-bold text-red-600 text-lg mb-2">Danger Zone</h3>
                        <p className="text-[13px] text-red-600/80 mb-4">Permanent actions that affect the entire workspace.</p>
                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white text-[13px] font-semibold">
                            Archive Event Workspace
                        </Button>
                    </div>
                </TabsContent>

                {/* Features Tab */}
                <TabsContent value="features" className="pt-6 space-y-6">
                    <div className="bg-white border border-[#E9E9E7]  rounded-sm  overflow-hidden">
                        <div className="px-6 py-5 border-b border-[#E9E9E7]">
                            <h3 className="font-display font-bold text-[#37352F] text-lg">Public Facing Features</h3>
                            <p className="text-[13px] text-[#91918E]">Toggle what users can see and interact with on the main website.</p>
                        </div>
                        <div className="divide-y divide-[#F1F1EF]">
                            <div className="p-6 flex items-center justify-between hover:bg-[#F7F6F3] transition-colors duration-100 [transition-timing-function:var(--ease-emil-out)]">
                                <div className="space-y-1">
                                    <h4 className="font-bold text-[#37352F] text-[15px]">Ticket Sales</h4>
                                    <p className="text-[13px] text-[#91918E]">Allow users to purchase tickets online.</p>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-[#37352F]" />
                            </div>
                            <div className="p-6 flex items-center justify-between hover:bg-[#F7F6F3] transition-colors duration-100 [transition-timing-function:var(--ease-emil-out)]">
                                <div className="space-y-1">
                                    <h4 className="font-bold text-[#37352F] text-[15px]">Pet Registration</h4>
                                    <p className="text-[13px] text-[#91918E]">Open registration forms for competitions and shows.</p>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-[#37352F]" />
                            </div>
                            <div className="p-6 flex items-center justify-between hover:bg-[#F7F6F3] transition-colors duration-100 [transition-timing-function:var(--ease-emil-out)]">
                                <div className="space-y-1">
                                    <h4 className="font-bold text-[#37352F] text-[15px]">Public Schedule</h4>
                                    <p className="text-[13px] text-[#91918E]">Display the event timeline on the website.</p>
                                </div>
                                <Switch className="data-[state=checked]:bg-[#37352F]" />
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Team Tab */}
                <TabsContent value="team" className="pt-6 space-y-6">
                    <div className="bg-white border border-[#E9E9E7]  rounded-sm  overflow-hidden shadow-sm">
                        <div className="px-6 py-5 border-b border-[#E9E9E7] flex items-center justify-between bg-[#F7F6F3]/30">
                            <div>
                                <h3 className="font-display font-bold text-[#37352F] text-lg">Team Members</h3>
                                <p className="text-[13px] text-[#91918E]">Manage admin access to this workspace.</p>
                            </div>
                            <Button className="h-8 bg-[#FACC15] hover:bg-[#EAB308] text-black rounded-sm text-[12px] font-bold shadow-sm border border-black/5">
                                <Plus className="w-3.5 h-3.5 mr-1.5" />
                                Invite Member
                            </Button>
                        </div>
                        <Table>
                            <TableHeader className="bg-transparent">
                                <TableRow className="hover:bg-transparent border-b border-[#E9E9E7]">
                                    <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">User</TableHead>
                                    <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Role</TableHead>
                                    <TableHead className="px-6 py-4 font-bold text-[#91918E] uppercase tracking-widest text-[10px]">Status</TableHead>
                                    <TableHead className="w-16 px-6 py-4"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teamMembers.map((member) => (
                                    <TableRow key={member.id} className="hover:bg-[#F7F6F3]/50 border-b border-[#F1F1EF] last:border-0 transition-colors duration-100 [transition-timing-function:var(--ease-emil-out)]">
                                        <TableCell className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#37352F] text-[14px]">{member.name}</span>
                                                <span className="text-[12px] text-[#91918E]">{member.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Badge variant="outline" className="font-bold text-[#37352F] border-[#E9E9E7]">
                                                {member.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md",
                                                member.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                                            )}>
                                                {member.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#91918E] hover:text-[#37352F] hover:bg-[#EBEBE9] transition-all duration-100 [transition-timing-function:var(--ease-emil-out)] active:scale-[0.90]">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                {/* Integrations Tab */}
                <TabsContent value="integrations" className="pt-6 space-y-4">
                    {/* Stripe */}
                    <div className="bg-white border border-[#E9E9E7]  rounded-sm  p-6 flex items-center justify-between hover:border-[#37352F]/20 transition-all duration-150 [transition-timing-function:var(--ease-emil-out)] hover:shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#37352F] text-[15px]">Stripe Payments</h4>
                                <p className="text-[13px] text-[#91918E] mt-0.5">Process ticket sales and vendor fees.</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest">Connected</span>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="border-[#E9E9E7] text-[#37352F] text-[12px] font-semibold">Manage</Button>
                    </div>

                    {/* Resend */}
                    <div className="bg-white border border-[#E9E9E7]  rounded-sm  p-6 flex items-center justify-between hover:border-[#37352F]/20 transition-all duration-150 [transition-timing-function:var(--ease-emil-out)] hover:shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#37352F] text-[15px]">Resend Emails</h4>
                                <p className="text-[13px] text-[#91918E] mt-0.5">Transactional emails for tickets and OTPs.</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest">Connected</span>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="border-[#E9E9E7] text-[#37352F] text-[12px] font-semibold">Manage</Button>
                    </div>

                    {/* Turso */}
                    <div className="bg-white border border-[#E9E9E7]  rounded-sm  p-6 flex items-center justify-between hover:border-[#37352F]/20 transition-all duration-150 [transition-timing-function:var(--ease-emil-out)] hover:shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                                <Database className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#37352F] text-[15px]">Turso Database</h4>
                                <p className="text-[13px] text-[#91918E] mt-0.5">Edge database for high-performance reads.</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest">Connected</span>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="border-[#E9E9E7] text-[#37352F] text-[12px] font-semibold">Manage</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
