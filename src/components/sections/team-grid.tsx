'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Naomy Horther",
    role: "CEO & Founder",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/qO6J2g9CARsBhWEEQMTdRZOlJU-1.jpg",
    socials: { facebook: "#", instagram: "#", twitter: "#" }
  },
  {
    id: 2,
    name: "Emma Ghonson",
    role: "Assistant Coach",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/AIej7rWhwm5xBS4wzFjrMS4QGsg-2.jpg",
    socials: { facebook: "#", instagram: "#", twitter: "#" }
  },
  {
    id: 3,
    name: "Lyra Voss",
    role: "Senior Instructor",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/bLBpoj3L2TyYHtbi4PZacvlc1Wk-3.jpg",
    socials: { facebook: "#", instagram: "#", twitter: "#" }
  },
  {
    id: 4,
    name: "Axel Raze",
    role: "Assistant Coach",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/zWBbANox8Z8HofkKJVP6JkMEZo-4.jpg",
    socials: { facebook: "#", instagram: "#", twitter: "#" }
  },
  {
    id: 5,
    name: "Karl May",
    role: "Instructor",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/j1ZnIvzF8liXtp00oQpovvUD68A-5.jpg",
    socials: { facebook: "#", instagram: "#", twitter: "#" }
  },
  {
    id: 6,
    name: "Damon Cross",
    role: "Instructor",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/iClHdzCFpIaFRm0su9eyqlXey5s-6.jpg",
    socials: { facebook: "#", instagram: "#", twitter: "#" }
  }
];

const TeamCard = ({ member }: { member: TeamMember }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[12px] bg-[#f2f2f2]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Social Icons Overlay */}
        <div 
          className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <a href={member.socials.facebook} className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform hover:scale-110">
            <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/G4dbdCCFmaS4ZEf8nvsxgbyNQMc-3.svg" alt="Facebook" className="w-5 h-5" />
          </a>
          <a href={member.socials.instagram} className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform hover:scale-110">
            <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/xM8Vm3gENNTennsSPmjyxyv8a14-4.svg" alt="Instagram" className="w-5 h-5" />
          </a>
          <a href={member.socials.twitter} className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform hover:scale-110">
            <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/zvxHdkmzMIrpVrnNgVGWUZ9Rw-5.svg" alt="Twitter" className="w-5 h-5" />
          </a>
        </div>

        {/* Interactive Plus Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f170] shadow-sm transition-all duration-300 hover:scale-110 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
        >
          <div className="relative h-4 w-4">
            <div className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-black"></div>
            <div className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-black"></div>
          </div>
        </button>
      </div>

      <div className="flex flex-col">
        <h6 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-black">
          {member.name}
        </h6>
        <p className="role-text text-[16px] leading-[1.4] text-[#666666]">
          {member.role}
        </p>
      </div>
    </div>
  );
};

export default function TeamGrid() {
  return (
    <section className="bg-white py-[140px]">
      <div className="container mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}