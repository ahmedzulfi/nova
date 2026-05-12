"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, Key } from 'lucide-react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to dashboard (mock)
        window.location.href = "/dashboard/attendee";
    };

    return (
        <main className="min-h-screen bg-white">
            <Navigation />

            <section className="pt-32 pb-20 lg:pt-48 lg:pb-40 relative flex items-center justify-center">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="absolute top-40 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 max-w-[500px] relative z-10">
                    <div className="bg-white  rounded-sm p-10 md:p-14 border border-[#F0F0F0] backdrop-blur-xl bg-white/80">
                        <div className="text-center mb-10">
                            <h1 className="text-[32px] md:text-[40px] font-bold font-display mb-4">
                                {step === 1 ? "Welcome Back" : "Check Your Email"}
                            </h1>
                            <p className="text-[#666666] font-body">
                                {step === 1
                                    ? "Enter your email to access your festival dashboard."
                                    : `We've sent a 6-digit code to ${email}`}
                            </p>
                        </div>

                        {step === 1 ? (
                            <form onSubmit={handleEmailSubmit} className="space-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="email" className="text-[14px] font-bold uppercase tracking-wider pl-2">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                                        <Input
                                            required
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="   rounded-sm  border-[#E6E6E6] bg-white h-16 pl-14 pr-6 focus:ring-2 focus:ring-primary transition-all text-[16px]"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full h-16 bg-black text-white font-bold  rounded-sm text-[18px] transition-all hover:scale-[1.02] active:scale-[0.98] group">
                                    Continue
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleOtpSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <Label htmlFor="otp" className="text-[14px] font-bold uppercase tracking-wider pl-2 text-center block">Enter OTP Code</Label>
                                    <div className="relative">
                                        <Key className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                                        <Input
                                            id="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                            placeholder="000 000"
                                            className="   rounded-sm  border-[#E6E6E6] bg-white h-16 text-center tracking-[0.5em] font-bold text-[24px] focus:ring-2 focus:ring-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Button type="submit" className="w-full h-16 bg-primary text-white font-bold  rounded-sm text-[18px] transition-all hover:scale-[1.02] active:scale-[0.98]">
                                        Verify & Login
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="w-full py-2 text-[#666666] font-semibold text-[14px] hover:text-black transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Use a different email
                                    </button>
                                </div>
                                <div className="text-center">
                                    <p className="text-[14px] text-[#999999]">
                                        Didn't receive it? <button type="button" className="text-primary font-bold hover:underline">Resend Code</button>
                                    </p>
                                </div>
                            </form>
                        )}

                        <div className="mt-12 pt-8 border-t border-[#F0F0F0] text-center">
                            <p className="text-[14px] text-[#666666]">
                                Don't have an account? <br className="md:hidden" />
                                <a href="/registration" className="text-black font-bold hover:underline ml-1">Register your pet now</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </main>
    );
}
