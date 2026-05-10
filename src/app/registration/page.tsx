"use client";

import React, { useState } from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import EventSelectionGrid from "@/components/sections/event-selection-grid";
import { ArrowLeft, Check, Upload, Info } from 'lucide-react';

type CompetitionType = 'dog-grooming' | 'dog-fashion-show' | 'cat-fashion-show' | 'dog-best-in-show' | 'cat-best-show' | 'cat-drawing-battle' | '';

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState<CompetitionType>('');
  const [selectedEventName, setSelectedEventName] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    // Pet Info
    petName: "",
    breed: "",
    age: "",
    // Competition Specific
    groomerExperience: "",
    groomingCategory: "",
    outfitDescription: "",
    drawingExperience: "",
    drawingMaterials: "",
    // Checkboxes (we'll handle these locally or in an object)
  });

  const handleEventSelect = (eventId: string, eventTitle: string) => {
    setSelectedEventId(eventId as CompetitionType);
    setSelectedEventName(eventTitle);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompetitionInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCompetitionSpecificFields = () => {
    switch (selectedEventId) {
      case 'dog-grooming':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-[15px] font-bold">Competition Category</Label>
                <Select onValueChange={(val) => setFormData({...formData, groomingCategory: val})}>
                  <SelectTrigger className="h-14    rounded-sm ">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog-figure">Dog Figure Grooming (Artificial)</SelectItem>
                    <SelectItem value="real-dog">Real Dog Grooming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-[15px] font-bold">Groomer Experience Level</Label>
                <Input 
                  placeholder="e.g. 5 Years Professional" 
                  className="h-14    rounded-sm "
                  onChange={(e) => setFormData({...formData, groomerExperience: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="text-[15px] font-bold">Dog Name</Label>
                <Input placeholder="Pet's name" className="h-14    rounded-sm " onChange={(e) => setFormData({...formData, petName: e.target.value})} />
              </div>
              <div className="space-y-3">
                <Label className="text-[15px] font-bold">Dog Breed</Label>
                <Input placeholder="e.g. Poodle" className="h-14    rounded-sm " onChange={(e) => setFormData({...formData, breed: e.target.value})} />
              </div>
              <div className="space-y-3">
                <Label className="text-[15px] font-bold">Dog Age</Label>
                <Input placeholder="e.g. 3 Years" className="h-14    rounded-sm " onChange={(e) => setFormData({...formData, age: e.target.value})} />
              </div>
            </div>
          </div>
        );

      case 'dog-fashion-show':
      case 'cat-fashion-show':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="text-[15px] font-bold">Pet Name</Label>
                <Input placeholder="Pet's name" className="h-14    rounded-sm " onChange={(e) => setFormData({...formData, petName: e.target.value})} />
              </div>
              <div className="space-y-3">
                <Label className="text-[15px] font-bold">Breed</Label>
                <Input placeholder="e.g. Persian" className="h-14    rounded-sm " onChange={(e) => setFormData({...formData, breed: e.target.value})} />
              </div>
              <div className="space-y-3">
                <Label className="text-[15px] font-bold">Age</Label>
                <Input placeholder="e.g. 2 Years" className="h-14    rounded-sm " onChange={(e) => setFormData({...formData, age: e.target.value})} />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[15px] font-bold">Matching Owner/Pet Outfit Description</Label>
              <Textarea 
                placeholder="Describe your matching outfits..." 
                className="   rounded-sm  min-h-[120px]" 
                onChange={(e) => setFormData({...formData, outfitDescription: e.target.value})}
              />
            </div>
          </div>
        );

      case 'dog-best-in-show':
      case 'cat-best-show':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label className="text-[15px] font-bold">Pet Name</Label>
              <Input placeholder="Pet's name" className="h-14    rounded-sm " onChange={(e) => setFormData({...formData, petName: e.target.value})} />
            </div>
            <div className="space-y-3">
              <Label className="text-[15px] font-bold">Breed</Label>
              <Input placeholder="Breed" className="h-14    rounded-sm " onChange={(e) => setFormData({...formData, breed: e.target.value})} />
            </div>
            <div className="space-y-3">
              <Label className="text-[15px] font-bold">Age</Label>
              <Input placeholder="Age" className="h-14    rounded-sm " onChange={(e) => setFormData({...formData, age: e.target.value})} />
            </div>
          </div>
        );

      case 'cat-drawing-battle':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-[15px] font-bold">Age of Participant</Label>
                <Input placeholder="Your age" className="h-14    rounded-sm " onChange={(e) => setFormData({...formData, age: e.target.value})} />
              </div>
              <div className="space-y-3">
                <Label className="text-[15px] font-bold">Experience Level</Label>
                <Input placeholder="e.g. Intermediate" className="h-14    rounded-sm " onChange={(e) => setFormData({...formData, drawingExperience: e.target.value})} />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[15px] font-bold">Materials Being Used</Label>
              <Textarea 
                placeholder="List the materials you will bring (pencils, canvas, etc.)" 
                className="   rounded-sm  min-h-[100px]" 
                onChange={(e) => setFormData({...formData, drawingMaterials: e.target.value})}
              />
            </div>
          </div>
        );
      default: return null;
    }
  };

  const renderTermsAndConditions = () => {
    const terms = {
      'dog-grooming': [
        "I confirm that all submitted information is correct.",
        "I confirm that my dog's vaccination is up to date.",
        "I confirm that I have uploaded a valid pet passport.",
        "I confirm that my dog has completed a recent health checkup.",
        "If no recent health checkup is available, I understand that I must complete a veterinary checkup with Nova Vet before final competition approval.",
        "I understand that registration submission does not guarantee final acceptance into the competition.",
        "I agree to attend on time for my assigned competition slot.",
        "I understand that photography and videography will take place during the event and I agree to media coverage.",
        "I accept all judging decisions as final."
      ],
      'dog-fashion-show': [
        "I confirm that my dog's vaccination is up to date.",
        "I confirm that I have uploaded a valid pet passport.",
        "I confirm that my dog has completed a recent health checkup.",
        "If no recent health checkup is available, I understand that I must complete a veterinary checkup with Nova Vet before final competition approval.",
        "I understand that this is a matching fashion show and both owner and dog must participate together on the runway.",
        "I confirm that all costumes and outfits respect local culture, public decency, and event guidelines.",
        "I confirm that my dog will remain under my full supervision and control at all times.",
        "I agree to arrive on time for rehearsal and competition schedule.",
        "I understand that photography and videography will take place and I agree to media usage and promotion.",
        "I understand that registration does not guarantee final selection.",
        "I accept all judging decisions as final."
      ],
      'cat-fashion-show': [
        "I confirm that my cat's vaccination is up to date.",
        "I confirm that I have uploaded a valid pet passport.",
        "I confirm that my cat has completed a recent health checkup.",
        "If no recent health checkup is available, I understand that I must complete a veterinary checkup with Nova Vet before final competition approval.",
        "I understand that my cat must remain inside its carrier/cage except during official runway participation.",
        "I understand that this is a matching fashion show and both owner and cat must participate together.",
        "I confirm that all costumes respect local culture and event guidelines.",
        "I confirm that my cat will remain under my supervision at all times.",
        "I agree to arrive on time for the competition schedule.",
        "I understand that photography and videography will take place and I agree to media usage.",
        "I understand that registration does not guarantee final selection.",
        "I accept all judging decisions as final."
      ],
      'dog-best-in-show': [
        "My dog is fully vaccinated.",
        "My dog is not aggressive and is fully under control.",
        "My dog is healthy and fit for participation.",
        "My dog will remain under my supervision at all times.",
        "I understand photography and videography will take place.",
        "I understand registration does not guarantee final selection.",
        "I accept all judging decisions as final."
      ],
      'cat-best-show': [
        "My cat is fully vaccinated.",
        "My cat is healthy and fit for participation.",
        "My cat will remain inside its carrier except during judging.",
        "My cat will remain under my supervision at all times.",
        "I understand photography and videography will take place.",
        "I understand registration does not guarantee final selection.",
        "I accept all judging decisions as final."
      ],
      'cat-drawing-battle': [
        "I understand that I must bring my own drawing materials and equipment.",
        "I understand that all artwork must follow event guidelines and public decency standards.",
        "I understand that the Drawing Cat Battle competition duration is strictly 1 hour only.",
        "I agree to complete my artwork within the official competition time.",
        "I understand that attendance is mandatory for the full competition period and I may not leave before completion unless approved by the organizer.",
        "I agree to arrive on time for registration and competition briefing.",
        "I understand that photography and videography will take place during the event and I agree to media coverage.",
        "I understand that registration submission does not guarantee final selection.",
        "I accept all judging decisions as final.",
        "I confirm my attendance and understand the 3-week cancellation notice policy.",
        "I understand that emergency absence must be reported immediately to the organizer."
      ]
    };

    const currentTerms = terms[selectedEventId as keyof typeof terms] || [];

    return (
      <div className="space-y-4 pt-4 border-t border-black/5 mt-8">
        <h4 className="text-[16px] font-bold uppercase tracking-widest text-black/40 mb-6">Terms & Conditions</h4>
        {currentTerms.map((term, i) => (
          <div key={i} className="flex items-start space-x-3 group cursor-pointer">
            <Checkbox id={`term-${i}`} className="mt-1 w-5 h-5    rounded-sm  border-black/10 data-[state=checked]:bg-primary data-[state=checked]:border-primary" required />
            <Label htmlFor={`term-${i}`} className="text-[14px] text-black/60 leading-relaxed cursor-pointer group-hover:text-black transition-colors">
              {term}
            </Label>
          </div>
        ))}
      </div>
    );
  };

  const getSuccessMessage = () => {
    switch (selectedEventId) {
      case 'dog-grooming':
        return "Thank you for registering for the Grooming Competition. Your application has been successfully submitted for review. Congratulations on completing the first step. Our team will review your registration and contact you by email or phone regarding final approval and competition participation.";
      case 'dog-fashion-show':
        return "Thank you for registering for the Dog Fashion Show. Your application has been submitted successfully for review. Our team will contact you regarding final approval and participation details.";
      case 'cat-fashion-show':
        return "Thank you for registering for the Cat Fashion Show. Your application has been submitted successfully for review. Our team will contact you regarding final approval and participation details.";
      default:
        return "Thank you for registering! Your application is now pending review. Our team will contact you regarding final approval and competition participation details.";
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 max-w-[900px]">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-[40px] md:text-[84px] font-bold font-display leading-[0.9] text-black mb-8 tracking-tighter">
              {step === 4 ? "Registration Received" : "Register Your Pet"}
            </h1>
            <p className="text-[18px] md:text-[20px] text-black/50 leading-[1.6] max-w-[600px] mx-auto font-body">
              {step === 1 && "Choose the competition you'd like to join and showcase your pet's talent."}
              {step === 2 && `Tell us a bit about yourself. You are registering for the ${selectedEventName}.`}
              {step === 3 && `Final step! Provide the specific details for the ${selectedEventName}.`}
              {step === 4 && "Great job! Your application has been sent to our international judging panel for review."}
            </p>
          </div>

          {/* Progress Steps */}
          {step < 4 && (
            <div className="flex items-center justify-center gap-4 mb-16">
              {[1, 2, 3].map((i) => (
                <React.Fragment key={i}>
                  <div className={`flex items-center gap-3 ${step >= i ? 'text-primary' : 'text-black/20'}`}>
                    <div className={`w-10 h-10 rounded-sm flex items-center justify-center font-bold text-[16px] transition-all duration-500 active:scale-[0.95] ${
                      step >= i ? 'bg-primary text-white shadow-sm shadow-primary/20' : 'bg-[#F9F9F9] border border-black/5'
                    }`}>
                      {i}
                    </div>
                    <span className="hidden sm:inline font-bold text-[14px] uppercase tracking-widest">
                      {i === 1 ? "Event" : i === 2 ? "Owner" : "Details"}
                    </span>
                  </div>
                  {i < 3 && <div className={`w-12 h-[2px] transition-all duration-500 ${step > i ? 'bg-primary' : 'bg-black/5'}`} />}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Step 1: Event Selection */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom duration-700">
              <EventSelectionGrid onSelect={handleEventSelect} selectedEventId={selectedEventId} />
            </div>
          )}

          {/* Step 2: Owner Info */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right duration-500 max-w-[700px] mx-auto">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-black/40 hover:text-black mb-8 font-bold transition-all active:scale-[0.97]">
                <ArrowLeft className="w-4 h-4" /> Back to Selection
              </button>

              <form onSubmit={handleBasicInfoSubmit} className="space-y-8 bg-[#F9F9F9] p-8 md:p-12 rounded-sm border border-black/5 shadow-sm shadow-black/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Full Name *</Label>
                    <Input required placeholder="Your name" className="h-14    rounded-sm  border-black/5 bg-white focus:ring-primary" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Mobile Number *</Label>
                    <Input required placeholder="+974 XXXX XXXX" className="h-14    rounded-sm  border-black/5 bg-white focus:ring-primary" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Email Address *</Label>
                    <Input required type="email" placeholder="email@example.com" className="h-14    rounded-sm  border-black/5 bg-white focus:ring-primary" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Home Address *</Label>
                    <Input required placeholder="Your address in Qatar" className="h-14    rounded-sm  border-black/5 bg-white focus:ring-primary" onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>
                <Button type="submit" className="w-full h-16 bg-black text-white font-bold    rounded-sm  text-[18px] transition-all active:scale-[0.97] hover:bg-black/90 shadow-xl shadow-black/10">
                  Continue Registration
                </Button>
              </form>
            </div>
          )}

          {/* Step 3: Competition Specific Info */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right duration-500 max-w-[800px] mx-auto">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-black/40 hover:text-black mb-8 font-bold transition-all active:scale-[0.97]">
                <ArrowLeft className="w-4 h-4" /> Back to Owner Info
              </button>

              <form onSubmit={handleCompetitionInfoSubmit} className="space-y-8 bg-[#F9F9F9] p-8 md:p-12 rounded-sm border border-black/5 shadow-sm shadow-black/5">
                
                {renderCompetitionSpecificFields()}

                {selectedEventId !== 'cat-drawing-battle' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-black/5">
                    <div className="space-y-3">
                      <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Pet Passport *</Label>
                      <div className="h-32 border-2 border-dashed border-black/5    rounded-sm  bg-white flex flex-col items-center justify-center text-black/20 hover:border-primary hover:text-primary transition-all cursor-pointer group">
                        <Upload className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-[13px] font-bold">Upload Passport</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[12px] font-bold uppercase tracking-widest text-black/40 px-2">Vaccination Record *</Label>
                      <div className="h-32 border-2 border-dashed border-black/5    rounded-sm  bg-white flex flex-col items-center justify-center text-black/20 hover:border-primary hover:text-primary transition-all cursor-pointer group">
                        <Upload className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-[13px] font-bold">Upload Record</span>
                      </div>
                    </div>
                  </div>
                )}

                {renderTermsAndConditions()}

                <Button type="submit" className="w-full h-16 bg-primary text-white font-bold    rounded-sm  text-[18px] transition-all active:scale-[0.97] hover:bg-primary/90 shadow-xl shadow-primary/20">
                  Submit Final Registration
                </Button>
              </form>
            </div>
          )}

          {/* Step 4: Success Message */}
          {step === 4 && (
            <div className="animate-in zoom-in fade-in duration-700 max-w-[700px] mx-auto text-center">
              <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary/40">
                <Check className="w-12 h-12 stroke-[3px]" />
              </div>
              <div className="bg-[#F9F9F9] p-10 md:p-16 rounded-sm border border-black/5 shadow-sm shadow-black/5">
                <h2 className="text-[32px] font-bold font-display mb-6 tracking-tight">Registration Submitted</h2>
                <p className="text-[18px] text-black/60 leading-[1.7] mb-12 font-body">
                  {getSuccessMessage()}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/" className="inline-flex items-center justify-center px-10 py-5 bg-black text-white    rounded-sm  font-bold transition-all hover:scale-105 active:scale-0.95 shadow-xl shadow-black/20">
                    Return to Home
                  </a>
                  <a href="/competitions" className="inline-flex items-center justify-center px-10 py-5 bg-white border border-black/5 text-black    rounded-sm  font-bold transition-all hover:scale-105 active:scale-0.95">
                    View Other Events
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
