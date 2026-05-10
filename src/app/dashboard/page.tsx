'use client';

import React, { useEffect, useState } from 'react';
import Navigation from "@/components/sections/navigation";
import { QrCode, Check, CreditCard, Download, Share2, MapPin, Calendar, User, Ticket, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('nova_registration');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  if (!data) return null;

  return (
    <main className="min-h-screen bg-slate-50/50">
      <Navigation />
      
      <div className="pt-32 pb-20 container mx-auto px-6 max-w-[1000px]">
        {!isPaid ? (
          /* Professional Payment Review */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[600px] mx-auto space-y-8">
            <div className="space-y-2 text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">Complete Your Order</h1>
              <p className="text-slate-500 font-medium">Please review your registration details before payment.</p>
            </div>

            <Card className="border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden rounded-2xl bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-bold">Order Summary</CardTitle>
                    <CardDescription className="text-xs font-semibold uppercase tracking-widest text-slate-400">{data.orderId}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200 px-3 py-1 text-[10px] uppercase font-bold tracking-wider">Pending Payment</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div className="space-y-1">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Registrant</p>
                    <p className="font-bold text-slate-900">{data.fullName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Access Tier</p>
                    <p className="font-bold text-slate-900 uppercase">{data.tier.replace('-', ' ')}</p>
                  </div>
                </div>
                
                <Separator className="bg-slate-100" />
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-medium text-slate-600">
                    <span>Adult Tickets × {data.adultQty}</span>
                    <span className="font-bold text-slate-900">QAR {data.adultQty * 25}.00</span>
                  </div>
                  {data.kidsQty > 0 && (
                    <div className="flex justify-between text-sm font-medium text-slate-600">
                      <span>Kids Tickets × {data.kidsQty}</span>
                      <span className="font-bold text-slate-900">QAR {data.kidsQty * 15}.00</span>
                    </div>
                  )}
                  {data.petQty > 0 && (
                    <div className="flex justify-between text-sm font-medium text-slate-600">
                      <span>{data.tier.replace('-owner', '')} Registration × {data.petQty}</span>
                      <span className="font-bold text-slate-900">QAR {data.petQty * 25}.00</span>
                    </div>
                  )}
                </div>
                
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900 uppercase tracking-tighter">Amount Due</span>
                  <span className="text-5xl font-bold tracking-tighter text-slate-900">QAR {data.total}</span>
                </div>
              </CardContent>
              <CardFooter className="p-8 bg-slate-50/50 border-t border-slate-100">
                <div className="w-full space-y-4">
                  <Button 
                    onClick={() => setIsPaid(true)}
                    className="w-full h-16 text-lg font-bold bg-slate-900 hover:bg-slate-800 transition-all rounded-xl shadow-xl shadow-slate-900/20"
                  >
                    <CreditCard className="mr-3 w-5 h-5" /> Pay Now
                  </Button>
                  <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">Encrypted Checkout · Guaranteed Security</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        ) : (
          /* Professional Attendee Dashboard */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-200 pb-10">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 px-3 py-1 text-[10px] uppercase font-bold tracking-wider">Booking Confirmed</Badge>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{data.orderId}</span>
                </div>
                <h1 className="text-5xl font-bold tracking-tight text-slate-900">Hi, {data.fullName.split(' ')[0]}</h1>
                <p className="text-slate-500 font-medium">Your tickets are ready. See you at The Pearl!</p>
              </div>
              <div className="flex items-center gap-3">
                 <Button variant="outline" className="rounded-lg font-bold text-xs uppercase tracking-widest h-11"><Download className="mr-2 w-4 h-4" /> Save PDF</Button>
                 <Button variant="outline" className="rounded-lg font-bold text-xs uppercase tracking-widest h-11"><Share2 className="mr-2 w-4 h-4" /> Share</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <Card className="border-slate-200 shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                    <div className="md:col-span-3 p-10 space-y-10">
                      <div className="space-y-6">
                        <div className="space-y-1">
                          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Event</p>
                          <h3 className="text-2xl font-bold text-slate-900 leading-tight">Nova Paw Festival 2026</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-1">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Date</p>
                            <div className="flex items-center gap-2 font-bold text-slate-900">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span>Oct 14-15, 2026</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Venue</p>
                            <div className="flex items-center gap-2 font-bold text-slate-900">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span>The Pearl, Qatar</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="bg-slate-100" />
                      
                      <div className="grid grid-cols-2 gap-8">
                         <div className="space-y-1">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Attendee</p>
                            <p className="font-bold text-slate-900">{data.fullName}</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Access</p>
                            <p className="font-bold text-slate-900">{data.adultQty} Adult{data.adultQty > 1 && 's'}{data.kidsQty > 0 && `, ${data.kidsQty} Kid${data.kidsQty > 1 && 's'}`}</p>
                         </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 bg-slate-900 flex flex-col items-center justify-center p-10 text-center space-y-6">
                      <div className="p-4 bg-white rounded-2xl shadow-2xl">
                        <QrCode className="w-36 h-36 text-slate-900" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-white font-bold uppercase tracking-widest text-[10px] opacity-60">Scan Pass</p>
                        <p className="text-white text-xs font-medium">Valid for Single Entry</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {data.petQty > 0 && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-slate-200 shadow-lg rounded-2xl overflow-hidden group hover:border-slate-900 transition-all cursor-pointer">
                        <CardContent className="p-8 flex items-center gap-6">
                           <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all">
                              {data.tier === 'dog-owner' ? <Dog className="w-7 h-7" /> : <Cat className="w-7 h-7" />}
                           </div>
                           <div>
                              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">Registered Pet</p>
                              <h4 className="text-lg font-bold text-slate-900">{data.petName}</h4>
                           </div>
                        </CardContent>
                      </Card>
                      <Card className="border-slate-200 shadow-lg rounded-2xl overflow-hidden group hover:border-slate-900 transition-all cursor-pointer bg-slate-900 text-white border-none">
                        <CardContent className="p-8 flex items-center gap-6">
                           <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                              <Ticket className="w-7 h-7" />
                           </div>
                           <div>
                              <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-1">Competition</p>
                              <h4 className="text-lg font-bold">Sign Up Now</h4>
                           </div>
                        </CardContent>
                      </Card>
                   </div>
                )}
              </div>

              <div className="space-y-8">
                 <Card className="border-slate-200 shadow-lg rounded-2xl overflow-hidden bg-white">
                   <CardHeader className="p-8 pb-4">
                     <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-slate-400">
                        <Info className="w-4 h-4" /> Guidelines
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="p-8 pt-0 space-y-6">
                      <div className="space-y-4">
                         <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                            <p className="text-sm text-slate-600 font-medium">Please arrive 30 mins early for check-in.</p>
                         </div>
                         <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                            <p className="text-sm text-slate-600 font-medium">Keep your pet on a leash at all times.</p>
                         </div>
                         <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                            <p className="text-sm text-slate-600 font-medium">Carry your pet's vaccination record.</p>
                         </div>
                      </div>
                      <Button variant="outline" className="w-full rounded-lg font-bold text-xs uppercase tracking-widest h-11 border-slate-200">View Full Policy</Button>
                   </CardContent>
                 </Card>
                 
                 <div className="p-8 bg-slate-900 rounded-3xl text-white space-y-6">
                    <h4 className="text-xl font-bold tracking-tight">Need help?</h4>
                    <p className="text-sm text-white/60 font-medium leading-relaxed">Our support team is available 24/7 to assist with your booking.</p>
                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl h-12">Contact Support</Button>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
