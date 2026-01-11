import React from 'react';
import Image from 'next/image';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import SponsorRegistrationForm from "@/components/sections/sponsor-registration-form";

const sponsors = {
  platinum: [
    { name: "Global Paws", logo: "https://framerusercontent.com/images/rSWXz9k6xFTe7pyVefjM14YqYXQ.svg", width: 320 },
    { name: "Royal Canin", logo: "https://framerusercontent.com/images/op7bcrGQodbRPWlq3bR4sZ2O3rc.svg", width: 226 },
  ],
  gold: [
    { name: "PetWorld Qatar", logo: "https://framerusercontent.com/images/uqxH2heGt0ngsf0S3cOuOmQOA.svg", width: 226 },
    { name: "Purina", logo: "https://framerusercontent.com/images/iu22u8KtpVL4GrwppTLL7zrL0.svg", width: 264 },
    { name: "Bark & Co", logo: "https://framerusercontent.com/images/jfrfvu3Ifo5mXe10jXRiBQ4JC8.svg", width: 281 },
  ],
  silver: [
    { name: "Pet Zone", logo: "https://framerusercontent.com/images/clj2Zv1q1pTKgYyUE48uDsdv1g.svg", width: 220 },
    { name: "Happy Tail", logo: "https://framerusercontent.com/images/uqxH2heGt0ngsf0S3cOuOmQOA.svg", width: 226 },
    { name: "VetCare", logo: "https://framerusercontent.com/images/rSWXz9k6xFTe7pyVefjM14YqYXQ.svg", width: 320 },
    { name: "Paw-some Goods", logo: "https://framerusercontent.com/images/op7bcrGQodbRPWlq3bR4sZ2O3rc.svg", width: 226 },
  ]
};

const SponsorTier = ({ title, sponsors, cardHeight, gridCols }: { title: string, sponsors: any[], cardHeight: string, gridCols: string }) => (
  <div className="mb-20">
    <div className="flex items-center gap-4 mb-10">
      <div className="h-px bg-primary flex-grow opacity-20"></div>
      <h3 className="text-[20px] font-bold text-[#999999] uppercase tracking-[0.2em] font-display whitespace-nowrap">
        {title} Sponsors
      </h3>
      <div className="h-px bg-primary flex-grow opacity-20"></div>
    </div>
    <div className={`grid ${gridCols} gap-6 md:gap-8`}>
      {sponsors.map((sponsor, idx) => (
        <div
          key={idx}
          className={`group relative flex items-center justify-center w-full p-8 md:p-12 bg-[#F9F9F9] rounded-[40px] transition-all duration-300 hover:bg-primary ${cardHeight}`}
        >
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={sponsor.width}
            height={80}
            className="object-contain w-auto h-12 md:h-16 transition-transform duration-500 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
          />
        </div>
      ))}
    </div>
  </div>
);

export default function SponsorshipPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="text-center mb-16 lg:mb-32">
            <span className="inline-block bg-[#F3F3F3] text-black text-[12px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-8">
              Partnership Program
            </span>
            <h1 className="text-[48px] md:text-[84px] font-bold font-display leading-[1] text-black mb-10 tracking-tight">
              Our Visionary <br className="hidden md:block" /> Festival Partners
            </h1>
            <p className="text-[18px] md:text-[20px] text-[#666666] leading-[1.6] max-w-[800px] mx-auto font-body">
              Nova Paw Festival offers brands premium visibility and engagement with a highly targeted audience of pet owners and families.
            </p>
          </div>

          <div className="max-w-[1000px] mx-auto">
            <SponsorTier title="Platinum" sponsors={sponsors.platinum} cardHeight="h-[220px] md:h-[280px]" gridCols="grid-cols-1 md:grid-cols-2" />
            <SponsorTier title="Gold" sponsors={sponsors.gold} cardHeight="h-[180px] md:h-[220px]" gridCols="grid-cols-1 md:grid-cols-3" />
            <SponsorTier title="Silver" sponsors={sponsors.silver} cardHeight="h-[140px] md:h-[180px]" gridCols="grid-cols-2 lg:grid-cols-4" />
          </div>

          <div className="mt-32 max-w-[800px] mx-auto">
            <SponsorRegistrationForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
