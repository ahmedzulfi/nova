'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface TeamMember {
  id: string;
  key: string;
  image: string;
  socials: {
    instagram: string;
    linkedin: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    key: "founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    socials: { instagram: "#", linkedin: "#" }
  },
  {
    id: "2",
    key: "judge_wku",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    socials: { instagram: "#", linkedin: "#" }
  },
  {
    id: "3",
    key: "judge_wcf",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    socials: { instagram: "#", linkedin: "#" }
  },
  {
    id: "4",
    key: "director",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    socials: { instagram: "#", linkedin: "#" }
  },
  {
    id: "5",
    key: "vet",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    socials: { instagram: "#", linkedin: "#" }
  },
  {
    id: "6",
    key: "groomer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    socials: { instagram: "#", linkedin: "#" }
  }
];

const TeamCard = ({ member, t }: { member: TeamMember, t: any }) => {
  return (
    <div className="flex flex-col gap-6 group">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-[#F5F5F0] border border-black/5">
        <Image
          src={member.image}
          alt={t(`members.${member.key}.name`)}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="flex flex-col items-center text-center">
        <h3 className="text-[28px] font-bold font-display tracking-tight text-black leading-tight mb-2">
          {t(`members.${member.key}.name`)}
        </h3>
        <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-primary">
          {t(`members.${member.key}.role`)}
        </p>
      </div>
    </div>
  );
};

export default function TeamGrid() {
  const t = useTranslations('TeamPage');

  return (
    <section className="bg-white py-24 md:py-40">
      <div className="container mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}