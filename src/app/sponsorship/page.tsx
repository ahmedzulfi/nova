"use client";

import React from 'react';
import Image from 'next/image';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

const eventSponsors = [
  { name: "PetWorld Qatar", logo: "https://framerusercontent.com/images/uqxH2heGt0ngsf0S3cOuOmQOA.svg", width: 226 },
  { name: "Global Paws", logo: "https://framerusercontent.com/images/rSWXz9k6xFTe7pyVefjM14YqYXQ.svg", width: 320 },
  { name: "Royal Canin", logo: "https://framerusercontent.com/images/op7bcrGQodbRPWlq3bR4sZ2O3rc.svg", width: 226 },
  { name: "Purina", logo: "https://framerusercontent.com/images/iu22u8KtpVL4GrwppTLL7zrL0.svg", width: 264 },
  { name: "Bark & Co", logo: "https://framerusercontent.com/images/jfrfvu3Ifo5mXe10jXRiBQ4JC8.svg", width: 281 },
  { name: "Pet Zone", logo: "https://framerusercontent.com/images/clj2Zv1q1pTKgYyUE48uDsdv1g.svg", width: 220 },
  { name: "Happy Tail", logo: "https://framerusercontent.com/images/uqxH2heGt0ngsf0S3cOuOmQOA.svg", width: 226 },
  { name: "VetCare", logo: "https://framerusercontent.com/images/rSWXz9k6xFTe7pyVefjM14YqYXQ.svg", width: 320 },
  { name: "Paw-some Goods", logo: "https://framerusercontent.com/images/op7bcrGQodbRPWlq3bR4sZ2O3rc.svg", width: 226 },
];

export default function SponsorshipPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-40">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="text-[48px] md:text-[72px] font-semibold font-display leading-[1.1] text-black mb-6">
              Our Event Sponsors
            </h1>
            <p className="text-[18px] text-[#666666] leading-[1.6] max-w-[700px] mx-auto">
              Meet the amazing partners who make Nova Paw Festival possible. Their support helps us create a better world for our furry friends and their families.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            {eventSponsors.map((sponsor, idx) => (
              <div 
                key={idx} 
                className="group relative flex items-center justify-center w-full p-8 md:p-12 bg-[#F9F9F9] rounded-[40px] transition-all duration-300 hover:bg-primary h-[160px] md:h-[200px]"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={sponsor.width}
                  height={80}
                  className="object-contain w-auto h-12 md:h-16 transition-transform duration-500 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                />
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm border border-[#E6E6E6]">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 15L15 5M15 5H7M15 5V13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
