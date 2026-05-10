'use client';

import React, { useState, useEffect } from 'react';
import { Dog, Cat, User, Mail, Phone, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

interface TicketsCheckoutProps {
  selectedTier: string;
}

const STEPS = ['Your Info', 'Verify OTP', 'Ticket Selection', 'Safety Terms', 'Summary'];

const ADULT_PRICE = 25;
const KID_PRICE = 15;
const PET_FEE = 25;

const DOG_TERMS = [
  "I am fully responsible for my dog and children at all times during the event.",
  "My dog's vaccination is up to date and I have a valid pet passport for verification.",
  "If my dog is medium or large-sized, they will arrive wearing a muzzle.",
  "My dog will be on a secure, non-extendable leash at all times.",
  "My dog will wear a secure collar or harness at all times.",
  "Female dogs in heat are not permitted to enter.",
  "Aggressive dogs are strictly not allowed, even if wearing a muzzle.",
  "Sick, injured, or visibly unwell dogs are not permitted to enter.",
  "Food aggression or behavioral concerns have been reported before entry.",
  "Shock chains, prong collars, or harmful training equipment are prohibited.",
  "My dog's nails are trimmed for safety.",
  "I will carry waste bags and clean up after my dog immediately.",
  "No direct interaction with other dogs unless fully controlled.",
  "I consent to photo and video coverage of myself, my family, and my dog.",
  "Staff reserve the right to refuse entry to any dog considered unsafe.",
  "I accept full responsibility for any injury or damage caused by my dog.",
];

const CAT_TERMS = [
  "Cats must remain inside their carrier at all times unless in an official activity.",
  "I am fully responsible for my cat's safety and supervision.",
  "All cats must be vaccinated with records available for verification.",
  "Entry may be denied if vaccination records are not provided.",
  "I consent to photo and video coverage of myself and my pet.",
  "Children must be supervised at all times.",
  "No unauthorized touching or interacting with pets.",
  "The organizer is not liable for lost pets or incidents due to negligence.",
];

const ADULT_TERMS = [
  "I consent to photo and video coverage during the festival.",
  "I will supervise my children at all times.",
  "I will not touch or interact with any pet without the owner's explicit permission.",
  "I will follow all staff guidance and safety instructions.",
  "The organizer is not liable for incidents caused by failure to follow safety rules.",
];

export default function TicketsCheckout({ selectedTier }: TicketsCheckoutProps) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [ownerData, setOwnerData] = useState({ fullName: '', email: '', phone: '' });
  const [adultQty, setAdultQty] = useState(1);
  const [kidsQty, setKidsQty] = useState(0);
  const [petQty, setPetQty] = useState(0);
  const [petName, setPetName] = useState('');
  const [checkedTerms, setCheckedTerms] = useState<boolean[]>([]);

  const total = adultQty * ADULT_PRICE + kidsQty * KID_PRICE + petQty * PET_FEE;
  const isPetOwner = selectedTier !== 'adult';
  const tierLabel = selectedTier.replace('-owner', '').replace('-', ' ');

  const currentTerms =
    selectedTier === 'dog-owner' ? DOG_TERMS :
    selectedTier === 'cat-owner' ? CAT_TERMS : ADULT_TERMS;

  useEffect(() => {
    setCheckedTerms(new Array(currentTerms.length).fill(false));
  }, [selectedTier]);

  useEffect(() => {
    if (selectedTier === 'dog-owner') {
      if (petQty > adultQty) setPetQty(adultQty);
      if (petQty === 0) setPetQty(1);
    } else if (selectedTier === 'cat-owner') {
      if (petQty > 2) setPetQty(2);
      if (petQty === 0) setPetQty(1);
    } else {
      setPetQty(0);
    }
  }, [adultQty, selectedTier]);

  useEffect(() => {
    setStep(1);
    setAdultQty(1);
    setKidsQty(0);
    setPetQty(selectedTier === 'adult' ? 0 : 1);
    setOtp('');
    setOwnerData({ fullName: '', email: '', phone: '' });
  }, [selectedTier]);

  const allTermsChecked = checkedTerms.every(Boolean);

  const handleFinish = () => {
    const registration = {
      ...ownerData,
      tier: selectedTier,
      adultQty,
      kidsQty,
      petQty,
      petName,
      total,
      orderId: `NPV-2026-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    };
    localStorage.setItem('nova_registration', JSON.stringify(registration));
    window.location.href = '/dashboard';
  };

  const toggleTerm = (i: number) => {
    const updated = [...checkedTerms];
    updated[i] = !updated[i];
    setCheckedTerms(updated);
  };

  const QtyControl = ({
    value,
    onDecrement,
    onIncrement,
    canIncrement = true,
  }: {
    value: number;
    onDecrement: () => void;
    onIncrement: () => void;
    canIncrement?: boolean;
  }) => (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={onDecrement} className="h-9 w-9">
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center font-semibold text-base">{value}</span>
      <Button
        variant={canIncrement ? 'default' : 'outline'}
        size="icon"
        onClick={onIncrement}
        disabled={!canIncrement}
        className="h-9 w-9"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <section className="py-16 bg-muted/30">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Step header */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="font-medium">Step {step} of {STEPS.length}</span>
            <Badge variant="secondary" className="capitalize">{tierLabel} ticket</Badge>
          </div>
          <Progress value={(step / STEPS.length) * 100} className="h-1.5" />
          <div className="flex gap-1 pt-1">
            {STEPS.map((s, i) => (
              <span
                key={i}
                className={`text-xs font-medium flex-1 text-center truncate ${
                  i + 1 === step ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── STEP 1: Owner Info ── */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Information</CardTitle>
              <CardDescription>We'll use this to send your ticket confirmation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="Ahmed Al-Qassim"
                    className="pl-9"
                    value={ownerData.fullName}
                    onChange={(e) => setOwnerData({ ...ownerData, fullName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    className="pl-9"
                    value={ownerData.email}
                    onChange={(e) => setOwnerData({ ...ownerData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+974 5555 0000"
                    className="pl-9"
                    value={ownerData.phone}
                    onChange={(e) => setOwnerData({ ...ownerData, phone: e.target.value })}
                  />
                </div>
              </div>
              <Button
                className="w-full mt-2"
                size="lg"
                onClick={() => setStep(2)}
                disabled={!ownerData.fullName || !ownerData.email || !ownerData.phone}
              >
                Send Verification Code <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── STEP 2: OTP ── */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Verify Your Number</CardTitle>
              <CardDescription>
                A 6-digit code was sent to{' '}
                <span className="text-foreground font-semibold">{ownerData.phone || ownerData.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center py-4">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-14 w-12 text-xl" />
                    <InputOTPSlot index={1} className="h-14 w-12 text-xl" />
                    <InputOTPSlot index={2} className="h-14 w-12 text-xl" />
                    <InputOTPSlot index={3} className="h-14 w-12 text-xl" />
                    <InputOTPSlot index={4} className="h-14 w-12 text-xl" />
                    <InputOTPSlot index={5} className="h-14 w-12 text-xl" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button className="w-full" size="lg" onClick={() => setStep(3)} disabled={otp.length < 6}>
                Verify & Continue <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <button
                onClick={() => setStep(1)}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Go back and edit info
              </button>
            </CardContent>
          </Card>
        )}

        {/* ── STEP 3: Ticket Selection ── */}
        {step === 3 && (
          <div className="space-y-4">
            {/* Pet Info */}
            {isPetOwner && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {selectedTier === 'dog-owner' ? <Dog className="h-5 w-5" /> : <Cat className="h-5 w-5" />}
                    </div>
                    <div>
                      <CardTitle className="text-base capitalize">{tierLabel} Details</CardTitle>
                      <CardDescription>Tell us about your pet</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Pet Name(s)</Label>
                    <Input
                      id="petName"
                      placeholder={selectedTier === 'dog-owner' ? 'e.g. Buddy' : 'e.g. Luna, Simba'}
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Number of {selectedTier === 'dog-owner' ? 'Dogs' : 'Cats'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedTier === 'dog-owner' ? 'Max 1 per adult' : 'Max 2 per booking'}
                      </p>
                    </div>
                    <QtyControl
                      value={petQty}
                      onDecrement={() => setPetQty(Math.max(1, petQty - 1))}
                      onIncrement={() => {
                        if (selectedTier === 'dog-owner' && petQty < adultQty) setPetQty(petQty + 1);
                        if (selectedTier === 'cat-owner' && petQty < 2) setPetQty(petQty + 1);
                      }}
                      canIncrement={
                        (selectedTier === 'dog-owner' && petQty < adultQty) ||
                        (selectedTier === 'cat-owner' && petQty < 2)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Visitor Tickets */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Visitor Tickets</CardTitle>
                <CardDescription>Select number of attendees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Adults</p>
                    <p className="text-xs text-muted-foreground">QAR 25 per person</p>
                  </div>
                  <QtyControl
                    value={adultQty}
                    onDecrement={() => setAdultQty(Math.max(1, adultQty - 1))}
                    onIncrement={() => setAdultQty(adultQty + 1)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Children</p>
                    <p className="text-xs text-muted-foreground">QAR 15 · Under 12</p>
                  </div>
                  <QtyControl
                    value={kidsQty}
                    onDecrement={() => setKidsQty(Math.max(0, kidsQty - 1))}
                    onIncrement={() => setKidsQty(kidsQty + 1)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Preview */}
            <Card className="bg-muted/40 border-dashed">
              <CardContent className="pt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Adults × {adultQty}</span>
                  <span>QAR {adultQty * ADULT_PRICE}</span>
                </div>
                {kidsQty > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Children × {kidsQty}</span>
                    <span>QAR {kidsQty * KID_PRICE}</span>
                  </div>
                )}
                {petQty > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground capitalize">{tierLabel} registration</span>
                    <span>QAR {petQty * PET_FEE}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary text-lg">QAR {total}</span>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={() => setStep(4)}>
              Next: Safety Terms <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* ── STEP 4: Terms ── */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-xl">Safety & Conduct</CardTitle>
                  <CardDescription>
                    Each item must be individually acknowledged before proceeding.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-[400px] overflow-y-auto space-y-3 pr-1">
                {currentTerms.map((term, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-md border bg-background hover:border-primary/40 transition-colors cursor-pointer"
                    onClick={() => toggleTerm(i)}
                  >
                    <Checkbox
                      id={`term-${i}`}
                      checked={checkedTerms[i] ?? false}
                      onCheckedChange={() => toggleTerm(i)}
                      className="mt-0.5 shrink-0"
                    />
                    <Label
                      htmlFor={`term-${i}`}
                      className="text-sm leading-relaxed cursor-pointer text-muted-foreground"
                    >
                      {term}
                    </Label>
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-2"
                size="lg"
                disabled={!allTermsChecked}
                onClick={() => setStep(5)}
              >
                Proceed to Summary <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── STEP 5: Summary & Checkout ── */}
        {step === 5 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
                <CardDescription>Review your booking before payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Name</p>
                    <p className="font-semibold mt-0.5">{ownerData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Email</p>
                    <p className="font-semibold mt-0.5">{ownerData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Mobile</p>
                    <p className="font-semibold mt-0.5">{ownerData.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Pass Type</p>
                    <p className="font-semibold mt-0.5 capitalize">{tierLabel}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Adults × {adultQty}</span>
                    <span>QAR {adultQty * ADULT_PRICE}</span>
                  </div>
                  {kidsQty > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Children × {kidsQty}</span>
                      <span>QAR {kidsQty * KID_PRICE}</span>
                    </div>
                  )}
                  {petQty > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground capitalize">{tierLabel} registration × {petQty}</span>
                      <span>QAR {petQty * PET_FEE}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-base">Total</span>
                  <span className="text-2xl font-bold text-primary">QAR {total}</span>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={handleFinish}>
              Proceed to Payment <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <p className="text-center text-xs text-muted-foreground px-4">
              You'll be taken to the payment portal and your ticket will be confirmed instantly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
