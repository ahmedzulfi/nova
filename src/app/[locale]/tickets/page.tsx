"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import TicketsHero from "@/components/sections/tickets/hero";
import TicketsPricing from "@/components/sections/tickets/pricing";

function TicketsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Checkout");
  const tTickets = useTranslations("Tickets");

  const checkoutRef = useRef<HTMLDivElement>(null);

  const [selectedTier, setSelectedTier] = useState<string>("adult");
  const [submitted, setSubmitted] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState<Record<number, boolean>>({});

  const [ownerData, setOwnerData] = useState({ fullName: "", email: "", phone: "" });
  const [adultQty, setAdultQty] = useState(1);
  const [kidsQty, setKidsQty] = useState(0);
  const [petQty, setPetQty] = useState(0);
  const [petName, setPetName] = useState("");

  const ADULT_PRICE = 60;
  const KID_PRICE = 45;
  const PET_FEE = 60;
  const total = ADULT_PRICE + (adultQty - 1) * ADULT_PRICE + (selectedTier === "adult" ? 0 : (petQty > 1 ? (petQty - 1) * PET_FEE : 0)) + kidsQty * KID_PRICE;

  // Sync pet quantity logic based on tier rules
  useEffect(() => {
    if (selectedTier === "dog-owner") {
      if (petQty > adultQty) setPetQty(adultQty);
      if (petQty === 0) setPetQty(1);
    } else if (selectedTier === "cat-owner") {
      if (petQty > 2) setPetQty(2);
      if (petQty === 0) setPetQty(1);
    } else {
      setPetQty(0);
    }
  }, [adultQty, selectedTier]);

  useEffect(() => {
    const tier = searchParams.get("tier");
    if (tier && ["adult", "dog-owner", "cat-owner"].includes(tier)) {
      setSelectedTier(tier);
      setTimeout(() => {
        checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    setAdultQty(1);
    setKidsQty(0);
    setPetQty(tier === "adult" || selectedTier === "adult" ? 0 : 1);
    setCheckedTerms({});
  }, [searchParams, selectedTier]);

  const handleFinish = () => {
    const registration = {
      ...ownerData,
      tier: selectedTier,
      adultQty,
      kidsQty,
      petQty,
      petName,
      total,
      orderId: `#NPV-2026-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    };
    localStorage.setItem("nova_registration", JSON.stringify(registration));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectTier = (tier: string) => {
    setSelectedTier(tier);
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const dogTerms = (t.raw("terms.dog") as string[]) || [];
  const catTerms = (t.raw("terms.cat") as string[]) || [];
  const adultTerms = (t.raw("terms.adult") as string[]) || [];

  const currentTerms =
    selectedTier === "dog-owner"
      ? dogTerms
      : selectedTier === "cat-owner"
        ? catTerms
        : adultTerms;

  const allChecked =
    currentTerms.length > 0 &&
    currentTerms.every((_, i) => checkedTerms[i]);

  const isFormValid =
    ownerData.fullName.trim() !== "" &&
    ownerData.email.trim() !== "" &&
    ownerData.phone.trim() !== "" &&
    (selectedTier === "adult" || petName.trim() !== "") &&
    allChecked;

  const tiers = [
    { id: "dog-owner", key: "dog", price: "60", emoji: "🐕" },
    { id: "cat-owner", key: "cat", price: "60", emoji: "🐱" },
    { id: "adult", key: "adult", price: "60", emoji: "👤" },
  ];

  // ─── SUCCESS STATE ───────────────────────────────────────────────
  if (submitted) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-white">
          <div className="container mx-auto px-6 max-w-[708px]">
            <div className="animate-in fade-in duration-700 py-12">
              <div className="bg-[#F1F1EF] rounded-sm p-6 flex gap-4 items-start border border-[#E9E9E7]">
                <span className="text-[24px]">🎟️</span>
                <div>
                  <h3 className="text-[16px] font-bold text-[#37352F] mb-1">
                    Tickets Purchased Successfully
                  </h3>
                  <p className="text-[14px] text-[#37352F]/70 leading-relaxed mb-4">
                    Your <strong>{tTickets(`tiers.${tiers.find(t => t.id === selectedTier)?.key}.name`)}</strong> pass has been secured. We have sent the digital tickets to {ownerData.email}.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/dashboard")}
                    className="bg-white border-[#E9E9E7] text-[#37352F] hover:bg-[#F7F6F3] rounded-sm h-9 px-4 font-medium text-[13px]"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // ─── NOTION STYLE INPUT COMPONENTS ──────────────────────────────
  const NotionInput = ({ label, type = "text", value, onChange, placeholder, required = false }: any) => (
    <div className="space-y-1.5 w-full">
      <Label className="text-[14px] font-medium text-[#37352F]">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#F7F6F3] border-none rounded-sm px-3 py-2 text-[14px] text-[#37352F] placeholder:text-[#91918E] outline-none focus:ring-1 focus:ring-[#E9E9E7] transition-all"
      />
    </div>
  );

  const Divider = () => <div className="h-[1px] bg-[#E9E9E7] my-8 w-full" />;

  const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-[24px] font-bold text-[#37352F] tracking-tight mb-4">
      {children}
    </h2>
  );

  const QtyControl = ({
    value,
    onDecrement,
    onIncrement,
    canIncrement,
  }: {
    value: number;
    onDecrement: () => void;
    onIncrement: () => void;
    canIncrement: boolean;
  }) => (
    <div className="flex items-center gap-0 border border-[#E9E9E7] bg-[#F7F6F3] rounded-sm overflow-hidden h-9">
      <button
        type="button"
        onClick={onDecrement}
        className="w-9 h-full flex items-center justify-center text-[#91918E] hover:text-[#37352F] hover:bg-black/[0.02] transition-all active:scale-90"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-10 text-center font-bold text-[14px] text-[#37352F]">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={!canIncrement}
        className={cn(
          "w-9 h-full flex items-center justify-center transition-all active:scale-90",
          canIncrement
            ? "bg-[#37352F] text-white"
            : "bg-[#E9E9E7] text-[#91918E] cursor-not-allowed"
        )}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <TicketsHero />
      <TicketsPricing onSelect={handleSelectTier} selectedTier={selectedTier} />

      <div ref={checkoutRef} className="py-24 bg-white border-t border-[#E9E9E7]">
        <div className="container mx-auto px-6 max-w-[708px] animate-in fade-in duration-500">
          
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-[40px] font-bold text-[#37352F] tracking-tight mb-2">
              Purchase Tickets
            </h1>
            <p className="text-[16px] text-[#37352F]/70">
              Configure your visitor details for the selected {tTickets(`tiers.${tiers.find(t => t.id === selectedTier)?.key}.name`)} pass.
            </p>
          </div>

          {/* ─── SECTION 1: Contact Details ───────────────────────── */}
          <div className="space-y-4">
            <SectionHeading>Contact Details</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <NotionInput
                label={t("form.name") || "Full Name"}
                required
                value={ownerData.fullName}
                onChange={(e: any) => setOwnerData({ ...ownerData, fullName: e.target.value })}
                placeholder={t("form.name_placeholder")}
              />
              <NotionInput
                label={t("form.mobile") || "Mobile Number"}
                type="tel"
                required
                value={ownerData.phone}
                onChange={(e: any) => setOwnerData({ ...ownerData, phone: e.target.value })}
                placeholder={t("form.mobile_placeholder")}
              />
              <NotionInput
                label={t("form.email") || "Email Address"}
                type="email"
                required
                value={ownerData.email}
                onChange={(e: any) => setOwnerData({ ...ownerData, email: e.target.value })}
                placeholder={t("form.email_placeholder")}
              />
            </div>
          </div>

          <Divider />

          {/* ─── SECTION 2: Ticket Configuration ────────────────────────────── */}
          <div className="space-y-4">
            <SectionHeading>Configure Tickets</SectionHeading>
            
            <div className="space-y-3">
              {/* Adult Tickets */}
              <div className="flex items-center justify-between p-4 border border-[#E9E9E7] rounded-sm">
                <div>
                  <p className="font-bold text-[14px] text-[#37352F]">{t("tickets_sec.adults") || "Adult Tickets"}</p>
                  <p className="text-[12px] text-[#91918E]">{ADULT_PRICE} QAR per pass</p>
                </div>
                <QtyControl
                  value={adultQty}
                  onDecrement={() => setAdultQty(Math.max(1, adultQty - 1))}
                  onIncrement={() => setAdultQty(adultQty + 1)}
                  canIncrement={true}
                />
              </div>

              {/* Kids Tickets */}
              <div className="flex items-center justify-between p-4 border border-[#E9E9E7] rounded-sm">
                <div>
                  <p className="font-bold text-[14px] text-[#37352F]">{t("tickets_sec.kids") || "Child Tickets "}</p>
                  <p className="text-[12px] text-[#91918E]">{KID_PRICE} QAR per pass</p>
                </div>
                <QtyControl
                  value={kidsQty}
                  onDecrement={() => setKidsQty(Math.max(0, kidsQty - 1))}
                  onIncrement={() => setKidsQty(kidsQty + 1)}
                  canIncrement={true}
                />
              </div>

              {/* Pet Tickets */}
              {selectedTier !== "adult" && (
                <div className="p-4 border border-[#E9E9E7] rounded-sm space-y-4 bg-[#F7F6F3]/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[14px] text-[#37352F]">
                        {t("tickets_sec.num_pets", { type: tTickets(`tiers.${selectedTier === "dog-owner" ? "dog" : "cat"}.name`) }) || "Pet Passes"}
                      </p>
                      <p className="text-[12px] text-[#91918E]">{PET_FEE} QAR per pet</p>
                    </div>
                    <QtyControl
                      value={petQty}
                      onDecrement={() => setPetQty(Math.max(1, petQty - 1))}
                      onIncrement={() => {
                        if (selectedTier === "dog-owner" && petQty < adultQty) setPetQty(petQty + 1);
                        if (selectedTier === "cat-owner" && petQty < 2) setPetQty(petQty + 1);
                      }}
                      canIncrement={selectedTier === "dog-owner" ? petQty < adultQty : petQty < 2}
                    />
                  </div>
                  <NotionInput
                    label={t("form.pet_name") || "Pet Name"}
                    required
                    value={petName}
                    onChange={(e: any) => setPetName(e.target.value)}
                    placeholder={t("form.pet_placeholder")}
                  />
                </div>
              )}
            </div>
          </div>

          <Divider />

          {/* ─── SECTION 3: Terms & Agreements ──────────────────────────── */}
          <div className="space-y-4">
            <SectionHeading>Terms & Conditions</SectionHeading>
            
            <div className="bg-[#F1F1EF] p-4 rounded-sm mb-4">
              <p className="text-[14px] text-[#37352F] font-medium flex items-center gap-2">
                <span>📋</span> Required to complete purchase
              </p>
            </div>

            <div className="space-y-3">
              {currentTerms.map((term, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Checkbox
                    id={`term-${i}`}
                    checked={checkedTerms[i]}
                    onCheckedChange={() =>
                      setCheckedTerms((prev) => ({ ...prev, [i]: !prev[i] }))
                    }
                    className="mt-1 border-[#37352F]/30 data-[state=checked]:bg-[#37352F] data-[state=checked]:border-[#37352F] rounded-[3px]"
                  />
                  <label
                    htmlFor={`term-${i}`}
                    className="text-[14px] leading-relaxed cursor-pointer text-[#37352F] flex-1"
                  >
                    {term}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ─── SECTION 4: Summary & Checkout ─────────────────────────── */}
          <div className="space-y-6">
            <div className="bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm p-6">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-[#37352F]">Total Order Amount</span>
                <span className="text-[28px] font-bold text-[#37352F] tracking-tight">{total} QAR</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleFinish}
                disabled={!isFormValid}
                className="bg-[#FACC15] text-[#37352F] hover:bg-[#E5B814] rounded-sm h-9 px-6 font-medium text-[14px] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Checkout Securely <ArrowRight className="w-4 h-4 ml-2 rtl:rotate-180" />
              </Button>
            </div>
            <p className="text-[12px] text-[#91918E] font-medium">
              {t("form.secure_msg") || "Secure 256-bit encrypted connection"}
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function TicketsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-[#91918E] text-[14px] font-medium animate-pulse text-center">
          Loading Tickets...
        </div>
      }
    >
      <TicketsContent />
    </Suspense>
  );
}
