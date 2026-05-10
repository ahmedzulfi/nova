import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const TicketsCheckout = ({ selectedTier }: TicketsCheckoutProps) => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  
  // Selection State
  const [ownerData, setOwnerData] = useState({ fullName: "", email: "", phone: "" });
  const [adultQty, setAdultQty] = useState(1);
  const [kidsQty, setKidsQty] = useState(0);
  const [petQty, setPetQty] = useState(0);
  const [petName, setPetName] = useState("");

  const ADULT_PRICE = 25;
  const KID_PRICE = 15;
  const PET_FEE = 25;

  const total = (adultQty * ADULT_PRICE) + (kidsQty * KID_PRICE) + (petQty * PET_FEE);

  // Rules & Validation
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
  }, [selectedTier]);

  const handleFinish = () => {
    const registration = {
      ...ownerData,
      tier: selectedTier,
      adultQty,
      kidsQty,
      petQty,
      petName,
      total,
      orderId: `#NPV-2026-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    };
    localStorage.setItem('nova_registration', JSON.stringify(registration));
    window.location.href = '/dashboard';
  };

  const stepsHeader = (
    <div className="mb-10 space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="px-3 py-1 text-[10px] uppercase tracking-widest font-semibold border-slate-200 text-slate-500">
          Step {step} of 5
        </Badge>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{selectedTier.replace('-', ' ')} Registration</span>
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          {step === 1 && "Personal Information"}
          {step === 2 && "Security Verification"}
          {step === 3 && "Ticket Selection"}
          {step === 4 && "Terms of Service"}
          {step === 5 && "Review & Complete"}
        </h2>
        <p className="text-sm text-slate-500">
          {step === 1 && "Enter your contact details to start your registration."}
          {step === 2 && "We've sent a code to verify your identity."}
          {step === 3 && "Select your tickets and register your pets."}
          {step === 4 && "Please review and accept our event policies."}
          {step === 5 && "Verify your order details before proceeding to payment."}
        </p>
      </div>
      <Progress value={(step / 5) * 100} className="h-1.5 bg-slate-100" />
    </div>
  );

  const renderStep1 = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              id="name"
              placeholder="John Doe" 
              value={ownerData.fullName}
              onChange={(e) => setOwnerData({...ownerData, fullName: e.target.value})}
              className="pl-10 h-12 border-slate-200 focus-visible:ring-slate-900" 
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              id="email"
              type="email"
              placeholder="john@example.com" 
              value={ownerData.email}
              onChange={(e) => setOwnerData({...ownerData, email: e.target.value})}
              className="pl-10 h-12 border-slate-200 focus-visible:ring-slate-900" 
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              id="phone"
              type="tel"
              placeholder="+974 XXXX XXXX" 
              value={ownerData.phone}
              onChange={(e) => setOwnerData({...ownerData, phone: e.target.value})}
              className="pl-10 h-12 border-slate-200 focus-visible:ring-slate-900" 
            />
          </div>
        </div>
      </div>
      <Button onClick={() => setStep(2)} className="w-full h-14 text-base font-semibold bg-slate-900 hover:bg-slate-800 transition-all">
        Continue to Verification <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
      <div className="grid gap-6 text-center">
        <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-lg">
          <p className="text-sm text-slate-600">Verification code sent to</p>
          <p className="text-base font-bold text-slate-900 mt-1">{ownerData.phone || ownerData.email}</p>
        </div>
        <div className="grid gap-4">
          <Input 
            type="text" 
            maxLength={6} 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="h-20 text-center text-3xl font-bold tracking-[0.5em] border-slate-200 focus-visible:ring-slate-900"
            placeholder="000000"
          />
          <p className="text-xs text-slate-400 font-medium italic">Enter the 6-digit code to proceed</p>
        </div>
      </div>
      <div className="space-y-4">
        <Button onClick={() => setStep(3)} className="w-full h-14 text-base font-semibold bg-slate-900 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
          Verify Account
        </Button>
        <Button variant="ghost" onClick={() => setStep(1)} className="w-full text-slate-400 hover:text-slate-900 font-semibold text-xs uppercase tracking-widest">
          Change Contact Info
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
      {selectedTier !== 'adult' && (
        <div className="grid gap-6 p-6 rounded-xl border border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center">
              {selectedTier === 'dog-owner' ? <Dog className="w-5 h-5" /> : <Cat className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{selectedTier === 'dog-owner' ? 'Dog' : 'Cat'} Details</h4>
              <p className="text-[11px] text-slate-500 font-medium">Register your pets for the festival</p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Pet Names</Label>
              <Input 
                value={petName} 
                onChange={(e) => setPetName(e.target.value)}
                placeholder={selectedTier === 'dog-owner' ? "Buddy, Max" : "Luna"} 
                className="h-11 border-slate-200"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg">
              <span className="text-sm font-semibold text-slate-700">Quantity</span>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setPetQty(Math.max(1, petQty - 1))} className="h-8 w-8 rounded-md"><Minus className="w-3 h-3" /></Button>
                <span className="text-base font-bold w-4 text-center">{petQty}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    if (selectedTier === 'dog-owner' && petQty < adultQty) setPetQty(petQty + 1);
                    if (selectedTier === 'cat-owner' && petQty < 2) setPetQty(petQty + 1);
                  }} 
                  className="h-8 w-8 rounded-md border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 p-6 rounded-xl border border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Tickets</h4>
            <p className="text-[11px] text-slate-500 font-medium">Choose number of attendees</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg">
            <div>
              <p className="text-sm font-bold text-slate-800">Adults</p>
              <p className="text-[10px] font-bold text-slate-400">QAR 25.00</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => setAdultQty(Math.max(1, adultQty - 1))} className="h-8 w-8 rounded-md"><Minus className="w-3 h-3" /></Button>
              <span className="text-base font-bold w-4 text-center">{adultQty}</span>
              <Button variant="outline" size="icon" onClick={() => setAdultQty(adultQty + 1)} className="h-8 w-8 rounded-md border-slate-900 bg-slate-900 text-white hover:bg-slate-800"><Plus className="w-3 h-3" /></Button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg">
            <div>
              <p className="text-sm font-bold text-slate-800">Kids</p>
              <p className="text-[10px] font-bold text-slate-400">QAR 15.00</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => setKidsQty(Math.max(0, kidsQty - 1))} className="h-8 w-8 rounded-md"><Minus className="w-3 h-3" /></Button>
              <span className="text-base font-bold w-4 text-center">{kidsQty}</span>
              <Button variant="outline" size="icon" onClick={() => setKidsQty(kidsQty + 1)} className="h-8 w-8 rounded-md border-slate-900 bg-slate-900 text-white hover:bg-slate-800"><Plus className="w-3 h-3" /></Button>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={() => setStep(4)} className="w-full h-14 text-base font-semibold bg-slate-900 hover:bg-slate-800 transition-all">
        Continue to Terms <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );

  const renderStep4 = () => {
    const terms = [
      "I accept the event code of conduct and safety regulations.",
      "I confirm that all pet health records are valid and up to date.",
      "I agree to follow all instructions from event staff and safety personnel.",
      "I understand that photography and videography will be taken for media purposes."
    ];

    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
        <div className="grid gap-4">
          {terms.map((term, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50/30 group hover:border-slate-200 transition-all cursor-pointer">
              <Checkbox id={`term-${i}`} className="mt-1 border-slate-300" required />
              <Label htmlFor={`term-${i}`} className="text-sm text-slate-600 leading-relaxed font-medium cursor-pointer group-hover:text-slate-900">
                {term}
              </Label>
            </div>
          ))}
        </div>
        <Button onClick={() => setStep(5)} className="w-full h-14 text-base font-semibold bg-slate-900 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
          Confirm Policies & Review
        </Button>
      </div>
    );
  };

  const renderStep5 = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
      <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">Adult Tickets</span>
            <span className="font-bold text-slate-900">QAR {adultQty * ADULT_PRICE}.00</span>
          </div>
          {kidsQty > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">Kids Tickets</span>
              <span className="font-bold text-slate-900">QAR {kidsQty * KID_PRICE}.00</span>
            </div>
          )}
          {petQty > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">{selectedTier.replace('-owner', '')} Entry</span>
              <span className="font-bold text-slate-900">QAR {petQty * PET_FEE}.00</span>
            </div>
          )}
        </div>
        <Separator className="bg-slate-100" />
        <div className="flex justify-between items-center pt-2">
          <span className="text-base font-bold text-slate-900">Total Amount</span>
          <span className="text-4xl font-bold tracking-tighter text-slate-900">QAR {total}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button onClick={handleFinish} className="w-full h-16 text-lg font-bold bg-slate-900 hover:bg-slate-800 transition-all rounded-xl shadow-xl shadow-slate-900/20">
          Proceed to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest px-8">Secure encryption · 256-bit SSL</p>
      </div>
    </div>
  );

  return (
    <section className="py-24 md:py-40 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <Card className="max-w-[650px] mx-auto border-slate-200/60 shadow-2xl shadow-slate-200/40 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardHeader className="pt-12 px-12 pb-0">
             {stepsHeader}
          </CardHeader>
          <CardContent className="px-12 pb-16 pt-2">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TicketsCheckout;
