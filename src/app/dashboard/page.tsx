'use client';

import React, { useEffect, useState } from 'react';
import Navigation from '@/components/sections/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, QrCode, CreditCard, Printer, Home } from 'lucide-react';

interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  tier: string;
  adultQty: number;
  kidsQty: number;
  petQty: number;
  petName: string;
  total: number;
  orderId: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<RegistrationData | null>(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nova_registration');
    if (saved) setData(JSON.parse(saved));
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-muted/30">
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
          <p className="text-muted-foreground">No registration found.</p>
          <Button variant="outline" onClick={() => (window.location.href = '/tickets')}>
            Go to Tickets
          </Button>
        </div>
      </main>
    );
  }

  const tierLabel = data.tier.replace('-owner', '').replace('-', ' ');
  const ADULT_PRICE = 25;
  const KID_PRICE = 15;
  const PET_FEE = 25;

  return (
    <main className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container max-w-xl mx-auto px-4 pt-36 pb-20">

        {!isPaid ? (
          /* ── Payment Step ── */
          <div className="space-y-5">
            <div className="text-center space-y-1 mb-8">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Almost there</p>
              <h1 className="text-2xl font-bold tracking-tight">Complete Your Purchase</h1>
            </div>

            {/* Booking details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Name</p>
                    <p className="font-semibold">{data.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Pass Type</p>
                    <Badge variant="secondary" className="capitalize mt-0.5">{tierLabel}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Email</p>
                    <p className="font-semibold">{data.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Mobile</p>
                    <p className="font-semibold">{data.phone}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Adults × {data.adultQty}</span>
                    <span>QAR {data.adultQty * ADULT_PRICE}</span>
                  </div>
                  {data.kidsQty > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Children × {data.kidsQty}</span>
                      <span>QAR {data.kidsQty * KID_PRICE}</span>
                    </div>
                  )}
                  {data.petQty > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground capitalize">{tierLabel} registration</span>
                      <span>QAR {data.petQty * PET_FEE}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span className="text-primary text-xl">QAR {data.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={() => setIsPaid(true)}>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay QAR {data.total} — Confirm Booking
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Secure payment via QPay. Your ticket will be generated immediately after payment.
            </p>
          </div>
        ) : (
          /* ── Ticket / Digital Pass ── */
          <div className="space-y-6">
            {/* Success banner */}
            <div className="flex flex-col items-center gap-2 text-center py-4">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">Payment Confirmed!</h1>
              <p className="text-sm text-muted-foreground">Your digital ticket is ready. Present the QR code at the gate.</p>
            </div>

            {/* Ticket card */}
            <Card className="overflow-hidden border-2">
              {/* Top stripe */}
              <div className="bg-primary px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-xs font-medium uppercase tracking-widest">Nova Paw Festival</p>
                  <p className="text-white font-bold text-lg">Official Entry Pass</p>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  {data.orderId}
                </Badge>
              </div>

              <CardContent className="pt-6 space-y-6">
                {/* QR Code */}
                <div className="flex flex-col items-center py-4">
                  <div className="border-2 border-dashed border-border p-6 rounded-lg bg-muted/30">
                    <QrCode className="w-40 h-40 text-foreground" strokeWidth={1} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Scan at gate entry</p>
                </div>

                <Separator />

                {/* Ticket details */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">Attendee</p>
                    <p className="font-semibold">{data.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">Pass Type</p>
                    <p className="font-semibold capitalize">{tierLabel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">Guests</p>
                    <p className="font-semibold">
                      {data.adultQty} Adult{data.adultQty > 1 ? 's' : ''}
                      {data.kidsQty > 0 ? `, ${data.kidsQty} Kid${data.kidsQty > 1 ? 's' : ''}` : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">Pet Name</p>
                    <p className="font-semibold">{data.petName || '—'}</p>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Amount Paid</span>
                  <span className="text-xl font-bold text-primary">QAR {data.total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Print Pass
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => (window.location.href = '/')}>
                <Home className="mr-2 h-4 w-4" /> Back to Site
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
