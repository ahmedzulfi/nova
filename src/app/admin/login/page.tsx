"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock authentication delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock successful login
        router.push('/admin');
    };

    return (
        <main className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Dark Aesthetic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-[450px] relative z-10">
                <div className="bg-[#111111] border border-white/10    rounded-sm  p-8 md:p-12 backdrop-blur-3xl">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-primary/10    rounded-sm  flex items-center justify-center border border-primary/20">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold font-display text-white mb-2">Admin Portal</h1>
                        <p className="text-gray-400 font-body">Enter your credentials to manage the festival.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Admin Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <Input
                                    required
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@petfestival.com"
                                    className="bg-white/5 border-white/10 text-white h-14 pl-12  rounded-sm focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <Input
                                    required
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-white/5 border-white/10 text-white h-14 pl-12  rounded-sm focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>

                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold  rounded-sm text-lg transition-all group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Sign In to Dashboard
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <a href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                            ← Return to main website
                        </a>
                    </div>
                </div>

                <p className="text-center text-gray-600 text-xs mt-8">
                    &copy; 2026 Nova Paw Festival. Secure Administrative Access.
                </p>
            </div>
        </main>
    );
}
