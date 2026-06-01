import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import { Link } from '@/i18n/routing';
import { Trophy, Clock, Users, ArrowLeft, CheckCircle, AlertCircle, Upload, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

// ─── Competition Data ──────────────────────────────────────────────────────────
const competitions: Record<string, {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  color: string;
  judge: string;
  desc: string;
  longDesc: string;
  stats: { label: string; value: string; icon: React.ReactNode }[];
  requirements: string[];
  rules: string[];
  registrationEvent: string;
}> = {
  'dog-fashion-show': {
    slug: 'dog-fashion-show',
    title: 'Dog Fashion Show',
    subtitle: 'Runway Glamour with Man\'s Best Friend',
    badge: 'WKU SANCTIONED',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2068&auto=format&fit=crop',
    color: '#FACC15',
    judge: 'WKU International',
    desc: 'Owners and dogs strut the runway in matching themed outfits. Judged on creativity, coordination, fit, presentation, and overall charm by WKU international judges.',
    longDesc: 'The Dog Fashion Show is one of the most anticipated events at Nova Paw Festival. Owners and their canine companions take the spotlight on our main runway, dressed in coordinated themed outfits that showcase creativity, style, and the special bond between owner and pet. WKU-certified international judges evaluate each pair on five criteria: creativity of concept, coordination between owner and dog outfits, overall fit and presentation quality, stage confidence, and combined charm. All costumes must respect local culture and community standards.',
    stats: [
      { label: 'Contestants', value: '8 per day', icon: <Users className="w-5 h-5" /> },
      { label: 'Show Duration', value: '50 minutes', icon: <Clock className="w-5 h-5" /> },
      { label: 'Awards', value: 'Gold / Silver / Rose Cups', icon: <Trophy className="w-5 h-5" /> },
    ],
    requirements: [
      'Owner Full Name',
      'Mobile Number',
      'Email Address',
      'Dog Name, Breed & Age',
      'Upload Pet Passport',
      'Outfit & Theme Description',
    ],
    rules: [
      'Matching owner and pet outfits are mandatory — solo costumes are not permitted.',
      'All costumes must be respectful of local culture and community standards.',
      'Dogs must remain calm and safe throughout the runway walk.',
      'Aggressive dogs are strictly not allowed, even if wearing a muzzle.',
      'Dogs must be fully vaccinated with a valid pet passport.',
      'Outfits must be safe and comfortable for the dog — no restrictive accessories.',
      'Participation is limited to 8 pairs per day — register early to secure your spot.',
    ],
    registrationEvent: 'dog-fashion-show',
  },
  'cat-fashion-show': {
    slug: 'cat-fashion-show',
    title: 'Cat Fashion Show',
    subtitle: 'Feline Elegance on the Runway',
    badge: 'WCF SANCTIONED',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop',
    color: '#FACC15',
    judge: 'WCF International',
    desc: 'Cats and their owners dazzle the runway in coordinated themed outfits. Judged on creativity, coordination, presentation, and feline grace by WCF international judges.',
    longDesc: 'Bring your feline companion to the spotlight! The Cat Fashion Show invites cat owners and their elegant pets to take the stage in beautifully coordinated themed outfits. WCF-certified international judges evaluate each pair based on creativity of the outfit concept, coordination between owner and cat outfits, stage presence and handling, feline comfort and grace, and overall visual impact. Cats must remain in their approved carriers except during their official runway appearance.',
    stats: [
      { label: 'Contestants', value: '8 per day', icon: <Users className="w-5 h-5" /> },
      { label: 'Show Duration', value: '50 minutes', icon: <Clock className="w-5 h-5" /> },
      { label: 'Awards', value: 'Gold / Silver / Rose Cups', icon: <Trophy className="w-5 h-5" /> },
    ],
    requirements: [
      'Owner Full Name',
      'Mobile Number',
      'Email Address',
      'Home Address',
      'Cat Name, Breed & Age',
      'Upload Pet Passport',
      'Outfit & Theme Description',
    ],
    rules: [
      'Matching owner and cat outfits are mandatory.',
      'Cats must remain in approved carriers at all times except during the runway segment.',
      'All costumes must be respectful of local culture and community standards.',
      'Outfits must be safe and comfortable — no restrictive accessories.',
      'Cats must be fully vaccinated with a valid pet passport.',
      'Aggressive or visibly stressed cats will not be permitted on stage.',
      'Participation is limited to 8 pairs per day.',
    ],
    registrationEvent: 'cat-fashion-show',
  },
  'grooming-competition': {
    slug: 'grooming-competition',
    title: 'Grooming Competition',
    subtitle: 'Professional Artistry Under the Spotlight',
    badge: 'WKU OFFICIAL',
    image: '/grooming.jpeg',
    color: '#FACC15',
    judge: 'WKU Officials',
    desc: 'Professional groomers showcase precision trimming, styling, and finishing under live judging by WKU officials. Evaluated on technique, cleanliness, creativity, handling, and final appearance.',
    longDesc: 'The Grooming Competition is a prestigious showcase for professional dog groomers. Two sessions take place over the festival: Session 1 focuses on Dog Figure Grooming (Artificial) from 4:00 PM–6:00 PM, and Session 2 is Real Dog Grooming from 6:30 PM–8:30 PM. WKU officials evaluate groomers on five criteria: technical precision and trimming technique, cleanliness and hygiene standards, creative styling and finishing, safe and respectful dog handling, and the quality of the final appearance. All health documentation must be submitted prior to the competition.',
    stats: [
      { label: 'Sessions', value: '2 Sessions per day', icon: <Users className="w-5 h-5" /> },
      { label: 'Duration', value: '2 hours per session', icon: <Clock className="w-5 h-5" /> },
      { label: 'Provided', value: 'Grooming Tables', icon: <Star className="w-5 h-5" /> },
    ],
    requirements: [
      'Full Name',
      'Mobile Number',
      'Email Address',
      'Home Address',
      'Experience Level',
      'Dog Name, Breed & Age',
      'Upload Pet Passport',
      'Upload Vaccination Record',
    ],
    rules: [
      'Session 1 (4:00 PM – 6:00 PM): Dog Figure Grooming (Artificial)',
      'Session 2 (6:30 PM – 8:30 PM): Real Dog Grooming',
      'All dogs must be fully vaccinated with an up-to-date vaccination record.',
      'A veterinary health check is mandatory — Nova Vet health check required if not available.',
      'Groomers must bring their own tools and professional equipment.',
      'Grooming tables are provided by the organizer.',
      'Dogs must remain calm; aggressive behavior will result in immediate disqualification.',
      'All work must be completed within the official session time only.',
    ],
    registrationEvent: 'grooming-competition',
  },
  'best-dog-show': {
    slug: 'best-dog-show',
    title: 'Best Dog Show',
    subtitle: 'The Premier WKU Championship',
    badge: 'WKU CHAMPIONSHIP',
    image: '/best.PNG',
    color: '#FACC15',
    judge: 'WKU International',
    desc: 'The prestigious WKU-recognized event evaluating breed structure, temperament, and presentation across Puppy, Youth, and Adult classes in a double-ring setup.',
    longDesc: 'The Best Dog Show is Nova Paw Festival\'s flagship canine competition — a WKU-sanctioned championship that draws top pedigree dogs from across the region. Dogs compete across three official WKU classes: Puppy Class (6–18 months), Youth Class (15–24 months), and Adult Class (15+ months). Judging follows strict WKU international standards, evaluating breed conformity and structure, gait and movement quality, temperament and behavior, coat condition and presentation, and overall breed type and impression. The top performers across all classes compete for the prestigious Best in Show Trophy.',
    stats: [
      { label: 'Dogs per Day', value: '30 dogs', icon: <Users className="w-5 h-5" /> },
      { label: 'WKU Classes', value: 'Puppy · Youth · Adult', icon: <Star className="w-5 h-5" /> },
      { label: 'Grand Prize', value: 'Best in Show Trophy', icon: <Trophy className="w-5 h-5" /> },
    ],
    requirements: [
      'Owner Full Name',
      'Mobile Number',
      'Email Address',
      'Dog Name, Breed & Age',
      'WKU Breed Group Classification',
      'Upload Pet Passport',
      'Upload Dog Competition Photos',
      'Previous Titles / Awards (if applicable)',
    ],
    rules: [
      'Dogs must be registered under the correct official WKU breed group classification.',
      'Incorrect breed classification may result in rejection or disqualification.',
      'All dogs must be fully vaccinated with a valid, up-to-date pet passport.',
      'A veterinary health check confirming fitness to compete is mandatory.',
      'Dogs must be non-aggressive and safe to participate around judges, handlers, and other dogs.',
      'Aggressive dogs are strictly not allowed — even if wearing a muzzle.',
      'Dogs must remain under full owner supervision and control at all times.',
      'Dogs must be presented on a secure collar or harness.',
    ],
    registrationEvent: 'best-dog-show',
  },
  'best-cat-show': {
    slug: 'best-cat-show',
    title: 'Best Cat Show',
    subtitle: 'WCF Grand Championship Inside the Cat Dome',
    badge: 'WCF LICENSED',
    image: '/cathsow.PNG',
    color: '#FACC15',
    judge: 'WCF International',
    desc: 'WCF-licensed grand judging inside the immersive Cat Dome. Cats evaluated on body type, head, ears, eyes, coat, and overall condition according to WCF international standards.',
    longDesc: 'The Best Cat Show is Nova Paw Festival\'s premier feline championship — a WCF-licensed event held inside our stunning 10-meter geodesic Cat Dome with 180° immersive projection. WCF-certified international judges evaluate each cat on six detailed criteria following strict WCF breed standards: body type and structure, head shape and proportion, ear placement and form, eye color and expression, coat quality and condition, and overall impression and condition. All participating cats must be healthy, clean, and fully vaccinated.',
    stats: [
      { label: 'Cats per Day', value: '20 cats', icon: <Users className="w-5 h-5" /> },
      { label: 'Judges', value: 'WCF International', icon: <Star className="w-5 h-5" /> },
      { label: 'Grand Prize', value: 'Best Cat of Show', icon: <Trophy className="w-5 h-5" /> },
    ],
    requirements: [
      'Owner Full Name',
      'Mobile Number',
      'Email Address',
      'Cat Name, Breed & Age',
      'Gender',
      'Upload Pet Passport',
      'Upload Competition Photos',
      'Previous Titles / Awards (if applicable)',
    ],
    rules: [
      'All cats must be fully vaccinated with a valid pet passport and vaccination record.',
      'A veterinary health check confirming fitness to compete is mandatory.',
      'Cats must be healthy, clean, and suitable for professional judging under WCF standards.',
      'Sick, injured, pregnant, nursing, or visibly unwell cats are not allowed.',
      'Cats must remain in their approved carriers at all times except during official judging.',
      'Cats must be non-aggressive and safe to be handled by judges and event staff.',
      'Dogs are strictly NOT allowed inside the Cat Dome tent at any time.',
    ],
    registrationEvent: 'best-cat-show',
  },
  'cat-drawing-battle': {
    slug: 'cat-drawing-battle',
    title: 'Cat Drawing Battle',
    subtitle: 'Live Art Competition — 1 Hour, One Canvas',
    badge: 'OPEN TO ALL',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
    color: '#FACC15',
    judge: 'Festival Panel',
    desc: 'A live creative battle where artists compete to draw cats in real-time under the spotlight. Judged on speed, style, imagination, and artistic technique.',
    longDesc: 'The Cat Drawing Battle is Nova Paw Festival\'s most electrifying creative event — a live 1-hour competition where artists from all backgrounds race against the clock to create their best cat artwork. All artwork must be completed within the official competition time. Participants must bring their own drawing materials including brushes, pencils, markers, paints, and any personal art tools. The organizer provides a standardized canvas size for all participants. Judging is based on creativity and artistic interpretation, technical skill and technique, originality and uniqueness, overall presentation, and adherence to the cat-themed brief.',
    stats: [
      { label: 'Eligibility', value: 'Open to all ages', icon: <Users className="w-5 h-5" /> },
      { label: 'Duration', value: '1 hour live battle', icon: <Clock className="w-5 h-5" /> },
      { label: 'Materials', value: 'All provided by participant', icon: <Upload className="w-5 h-5" /> },
    ],
    requirements: [
      'Full Name',
      'Mobile Number',
      'Email Address',
      'Age',
      'Experience Level',
      'Materials List (tools you will bring)',
    ],
    rules: [
      'This is a live 1-hour Cat Drawing Battle — all artwork must be completed within the official competition time only.',
      'Participants must bring their own drawing materials (brushes, pencils, markers, paints, personal art tools).',
      'All participants must use the same approved canvas size provided by the organizer.',
      'No pre-drawn sketches, printed artwork, tracing, or pre-prepared designs are allowed before the competition starts.',
      'All artwork must be original and created live during the competition period.',
      'Artwork must follow decency standards and respect local cultural guidelines.',
      'Attendance is required 15 minutes before the competition start time.',
    ],
    registrationEvent: 'cat-drawing-battle',
  },
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function CompetitionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = competitions[slug];
  if (!comp) notFound();

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative w-full pt-0 overflow-hidden">
        <div className="relative h-[60vh] min-h-[420px] w-full">
          <Image src={comp.image} alt={comp.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-[1280px] mx-auto w-full">
            <Link
              href="/competitions"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[12px] font-bold uppercase tracking-[0.3em] mb-8 transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> All Competitions
            </Link>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-primary text-black shadow-md">
                  {comp.badge}
                </span>
                <span className="text-white/50 text-[12px] font-bold uppercase tracking-widest">
                  Judged by {comp.judge}
                </span>
              </div>
              <h1 className="text-[52px] md:text-[88px] font-display font-bold text-white tracking-tighter leading-[0.9]">
                {comp.title}
              </h1>
              <p className="text-white/60 text-[18px] md:text-[22px] font-medium max-w-[700px] leading-relaxed">
                {comp.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-black text-white py-6">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {comp.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-4 py-4 sm:py-2 sm:px-10 first:pl-0 last:pr-0">
                <div className="w-10 h-10 rounded-sm bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
                  <p className="text-[16px] font-bold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24">

            {/* Left – Description + Rules */}
            <div className="space-y-16">
              {/* About */}
              <div>
                <span className="text-primary font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">About This Competition</span>
                <p className="text-[18px] md:text-[20px] text-black/70 font-body font-medium leading-relaxed">
                  {comp.longDesc}
                </p>
              </div>

              {/* Rules */}
              <div>
                <span className="text-primary font-bold uppercase tracking-[0.4em] text-[11px] mb-6 block">Competition Rules</span>
                <ul className="space-y-4">
                  {comp.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1.5 w-5 h-5 rounded-sm bg-black flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-[16px] text-black/70 font-medium leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Important Note */}
              <div className="flex gap-4 p-6 bg-amber-50 border border-amber-200 rounded-sm">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-widest text-amber-800 mb-1">Important Notice</p>
                  <p className="text-[14px] text-amber-700 leading-relaxed">
                    All competition applications are held in a <strong>Pending Review</strong> state following submission. Final approval is granted by the official {comp.judge} judging panel. You will be notified via email once your application is reviewed.
                  </p>
                </div>
              </div>
            </div>

            {/* Right – Requirements + CTA */}
            <div className="space-y-8 lg:sticky lg:top-32 self-start">

              {/* Registration Requirements */}
              <div className="bg-[#F5F5F0] rounded-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.3em]">Required Information</h3>
                </div>
                <ul className="space-y-3">
                  {comp.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-3 text-[14px] font-medium text-black/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Register CTA */}
              <div className="space-y-4">
                <Link
                  href={`/registration?event=${comp.registrationEvent}`}
                  className="w-full inline-flex items-center justify-center gap-3 h-16 bg-black text-white rounded-sm font-bold text-[13px] uppercase tracking-[0.3em] hover:bg-primary hover:text-black transition-all duration-300 group"
                >
                  Register Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/tickets"
                  className="w-full inline-flex items-center justify-center h-12 border border-black/10 rounded-sm font-bold text-[12px] uppercase tracking-[0.3em] text-black/50 hover:text-black hover:border-black transition-all"
                >
                  Get Festival Ticket First
                </Link>
                <p className="text-center text-[11px] text-black/30 font-bold uppercase tracking-widest">
                  WKU / WCF Approved Event
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Back to all */}
      <section className="py-16 bg-[#F5F5F0]">
        <div className="container mx-auto px-6 max-w-[1280px] text-center">
          <p className="text-[14px] text-black/40 font-bold uppercase tracking-widest mb-6">Explore More Competitions</p>
          <Link
            href="/competitions"
            className="inline-flex items-center gap-3 h-14 px-10 border-2 border-black rounded-sm font-bold text-[13px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> View All Competitions
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
