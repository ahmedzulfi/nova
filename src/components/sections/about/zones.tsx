'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const AboutZones = () => {
  const t = useTranslations('AboutPage.zones');

  // Helper to split stamp text nicely
  const renderStampText = (text: string) => {
    const parts = text.split(' ');
    if (parts.length >= 2) {
      return (
        <>
          <span className="block">{parts[0]}</span>
          <span className="block mt-0.5">{parts.slice(1).join(' ')}</span>
        </>
      );
    }
    return <span>{text}</span>;
  };

  return (
    <section className="py-24 md:py-40 bg-white" id="zones">
      <div className="container mx-auto px-6 max-w-[1350px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-32">
          <div className="max-w-[800px]">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[12px] mb-6 block leading-none">{t('badge')}</span>
            <h2 className="text-[48px] md:text-[84px] font-display font-bold text-black tracking-tighter leading-[0.85]">
              {t('title')}
            </h2>
          </div>
          <p className="text-[18px] md:text-[22px] text-black/40 font-body max-w-[440px] font-medium leading-relaxed">
            {t('desc')}
          </p>
        </div>

        {/* Passport Grid (Centered 3-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          
          {/* Card 1: Zone A (Paw Care District) */}
          <section className="aspect-[2/3] min-h-[480px] flex flex-col relative overflow-hidden rounded-lg bg-[#fdf6e9] text-center shadow-md border border-black/5 group hover:shadow-xl transition-all duration-500 pb-[42px]">
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <div className="bg-[#f1641e] text-white px-5 py-1 [clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)] font-bold text-sm inline-block font-display">
                  ZONE A
                </div>
                <h3 className="text-[#f1641e] font-black text-xl mt-2 leading-tight font-display">
                  {t('list.zone_a.title').replace(/^Zone \w:\s*/i, '').replace(/^المنطقة \w:\s*/i, '').replace(/^المنطقة \S+:\s*/i, '')}
                </h3>
                <p className="text-xs font-bold text-[#333333]/60 mb-4 tracking-wider uppercase">
                  {t('list.zone_a.subtitle')}
                </p>
                
                <div className="relative mb-4 w-full h-32 rounded shadow overflow-hidden">
                  <Image 
                    alt="Vet Zone" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida/ADBb0ug3FTyX27bIQDtqPyiLbQsJbt0y3qVYmcHqFkqLIcnPpr97EIkERxs5yMnv3nE_1THtxKA2IX6VbzB7ZOtQYeiTHpTuvXJZa4ZCGd7X39T8EE-O_SlnpHVc6vQiYnZhOOW1NeeIWSiGKYdJGJnhUhkZ0dbDaFHUvlAgPq-C41pE54MPMPK3MqQAig_55PwdOi92mqm5U5_riep-xULLmU-GXvSpHy47lKsEJH9R5Yze0gMwS4sC9ubbabs" 
                  />
                </div>
                
                <div className="grid grid-cols-2 text-[10px] text-left rtl:text-right gap-y-1.5 font-bold text-[#333333] px-2 leading-tight">
                  {(t.raw('list.zone_a.items') as string[]).map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[#f1641e] flex-shrink-0">🐾</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stamp Circle */}
              <div className="border-2 border-dashed border-gray-300 rounded-full w-20 h-20 flex flex-col items-center justify-center text-center text-[10px] font-bold text-gray-400 uppercase select-none mx-auto mt-4 bg-white/40 group-hover:border-[#f1641e]/50 group-hover:text-[#f1641e]/70 transition-colors duration-500">
                {renderStampText(t('passport.stamp_here'))}
              </div>
            </div>
            
            {/* Footer Bar */}
            <div className="absolute bottom-0 left-0 h-[30px] bg-[#f1641e] w-full flex justify-center items-center">
              <div className="bg-white text-[#f1641e] w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shadow-sm">1</div>
            </div>
          </section>

          {/* Card 2: Zone B (Forever Home Corner) */}
          <section className="aspect-[2/3] min-h-[480px] flex flex-col relative overflow-hidden rounded-lg bg-[#fdf6e9] text-center shadow-md border border-black/5 group hover:shadow-xl transition-all duration-500 pb-[42px]">
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <div className="bg-[#f1641e] text-white px-5 py-1 [clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)] font-bold text-sm inline-block font-display">
                  ZONE B
                </div>
                <h3 className="text-[#f1641e] font-black text-xl mt-2 leading-tight uppercase font-display">
                  {t('list.zone_b.title').replace(/^Zone \w:\s*/i, '').replace(/^المنطقة \w:\s*/i, '').replace(/^المنطقة \S+:\s*/i, '')}
                </h3>
                <p className="text-xs font-bold text-[#333333]/60 mb-4 tracking-wider uppercase">
                  {t('list.zone_b.subtitle')}
                </p>
                
                <div className="relative mb-4 flex flex-col items-center w-full shadow rounded overflow-hidden">
                  <div className="w-full bg-[#f1641e] p-2 h-24 relative overflow-hidden">
                    <Image 
                      alt="Adoption" 
                      fill
                      className="object-contain p-1" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3EMI-j7Z2B5SM6-op-XWAPi88Fwxmp1CfGuJtCz-BMg-x9LqWdPX7J5o_Yy0pkh6Y3LXrOf_6XHgUWMBBB9yOKSrMnVbjBa19ZSljQabTc8epS6d_iU62oJRruToK--yWGE3OxvfYSYbx4aopAUAKwLmw9ov0wjQgShpUoXt-1ZTP4iSFuSXnLW4E03uFpbUfX3k0GNc466YQV7fCiSJXaBMCPW50Eg9j_mDoGeiK6ONJAFXJDkwWzNsn6Fzj8aO7x1-jtpaa1RI" 
                      style={{ objectPosition: '80% 18%' }}
                    />
                  </div>
                  <div className="bg-white w-full py-1 text-[#f1641e] font-black italic text-xs shadow-inner font-display uppercase tracking-wider">
                    ADOPT DON'T SHOP
                  </div>
                </div>
                
                <div className="grid grid-cols-2 text-[10px] text-left rtl:text-right gap-y-1.5 font-bold text-[#333333] px-2 leading-tight">
                  {(t.raw('list.zone_b.items') as string[]).map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[#f1641e] flex-shrink-0">🐾</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stamp Circle */}
              <div className="border-2 border-dashed border-gray-300 rounded-full w-20 h-20 flex flex-col items-center justify-center text-center text-[10px] font-bold text-gray-400 uppercase select-none mx-auto mt-4 bg-white/40 group-hover:border-[#f1641e]/50 group-hover:text-[#f1641e]/70 transition-colors duration-500">
                {renderStampText(t('passport.stamp_here'))}
              </div>
            </div>
            
            {/* Footer Bar */}
            <div className="absolute bottom-0 left-0 h-[30px] bg-[#f1641e] w-full flex justify-center items-center">
              <div className="bg-white text-[#f1641e] w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shadow-sm">2</div>
            </div>
          </section>

          {/* Card 3: Zone C (Paws & Play Land) */}
          <section className="aspect-[2/3] min-h-[480px] flex flex-col relative overflow-hidden rounded-lg bg-[#fdf6e9] text-center shadow-md border border-black/5 group hover:shadow-xl transition-all duration-500 pb-[42px]">
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <div className="bg-[#f1641e] text-white px-5 py-1 [clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)] font-bold text-sm inline-block font-display">
                  ZONE C
                </div>
                <h3 className="text-[#f1641e] font-black text-xl mt-2 leading-tight uppercase font-display">
                  {t('list.zone_c.title').replace(/^Zone \w:\s*/i, '').replace(/^المنطقة \w:\s*/i, '').replace(/^المنطقة \S+:\s*/i, '')}
                </h3>
                <p className="text-xs font-bold text-[#333333]/60 mb-4 tracking-wider uppercase">
                  {t('list.zone_c.subtitle')}
                </p>
                
                <div className="relative mb-4 w-full h-32 rounded shadow overflow-hidden">
                  <Image 
                    alt="Kids Zone" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida/ADBb0ugiluHjNAeT5lpEkjah5_R_VNqXk2P6y4r7ZNQMiUwKXByjt9N0ECHgGWkSS861YvRpA8kCGKf7dVbzTQDfbMOfsd3tJviXM_Zc59AtrpCFIMPikG0VEQQ-8860m0dCE5sFGOu1QhO6CnJt9ReiWoXmcWJ5iDEHrcIQCO4-KPYWatifgAE3bG6DrvnZV48kF4f_4GY3RjulKOz6DRcsyl2gKP59socjMz3Cehp1XAenJ4mU9nRRNwJ1Ols" 
                  />
                </div>
                
                <div className="grid grid-cols-2 text-[10px] text-left rtl:text-right gap-y-1.5 font-bold text-[#333333] px-2 leading-tight">
                  {(t.raw('list.zone_c.items') as string[]).map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[#f1641e] flex-shrink-0">🐾</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stamp Circle */}
              <div className="border-2 border-dashed border-gray-300 rounded-full w-20 h-20 flex flex-col items-center justify-center text-center text-[10px] font-bold text-gray-400 uppercase select-none mx-auto mt-4 bg-white/40 group-hover:border-[#f1641e]/50 group-hover:text-[#f1641e]/70 transition-colors duration-500">
                {renderStampText(t('passport.stamp_here'))}
              </div>
            </div>
            
            {/* Footer Bar */}
            <div className="absolute bottom-0 left-0 h-[30px] bg-[#f1641e] w-full flex justify-center items-center">
              <div className="bg-white text-[#f1641e] w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shadow-sm">3</div>
            </div>
          </section>

          {/* Card 4: Zone D (Tails & Tastes Street) */}
          <section className="aspect-[2/3] min-h-[480px] flex flex-col relative overflow-hidden rounded-lg bg-[#fdf6e9] text-center shadow-md border border-black/5 group hover:shadow-xl transition-all duration-500 pb-[42px]">
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <div className="bg-[#f1641e] text-white px-5 py-1 [clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)] font-bold text-sm inline-block font-display">
                  ZONE D
                </div>
                <h3 className="text-[#f1641e] font-black text-xl mt-2 leading-tight uppercase font-display">
                  {t('list.zone_d.title').replace(/^Zone \w:\s*/i, '').replace(/^المنطقة \w:\s*/i, '').replace(/^المنطقة \S+:\s*/i, '')}
                </h3>
                <p className="text-xs font-bold text-[#333333]/60 mb-4 tracking-wider uppercase">
                  {t('list.zone_d.subtitle')}
                </p>
                
                <div className="relative mb-4 w-full h-32 rounded shadow overflow-hidden">
                  <Image 
                    alt="Food Truck" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida/ADBb0uhYp1zQ_ZQEUtqghBnvNaEm9Omvhumjj91pO2dqvRu6i2uuQ1Kqx9h8koXi5ARZqnFftkx7KqCCybDyJZZxmqUjKB3mwyWZP6Ly7jvUVyEORrHkD1R9M9kBsaEkH0QeXtFy-PS-75-0LIxzRxrFfJ0jTUVX7n7jifhXKks_zmrxvDV8UszB3rlV2SYiCAJWlH7aEV18wooeQa-7gCGSGNSmXd4xd3w8lP4OtN-G8e21_iZzeonEzvSKs3w" 
                  />
                </div>
                
                <div className="grid grid-cols-1 text-[10px] text-left rtl:text-right gap-y-1.5 font-bold text-[#333333] px-2 leading-tight">
                  {(t.raw('list.zone_d.items') as string[]).map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[#f1641e] flex-shrink-0">🐾</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stamp Circle */}
              <div className="border-2 border-dashed border-gray-300 rounded-full w-20 h-20 flex flex-col items-center justify-center text-center text-[10px] font-bold text-gray-400 uppercase select-none mx-auto mt-4 bg-white/40 group-hover:border-[#f1641e]/50 group-hover:text-[#f1641e]/70 transition-colors duration-500">
                {renderStampText(t('passport.stamp_here'))}
              </div>
            </div>
            
            {/* Footer Bar */}
            <div className="absolute bottom-0 left-0 h-[30px] bg-[#f1641e] w-full flex justify-center items-center">
              <div className="bg-white text-[#f1641e] w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shadow-sm">4</div>
            </div>
          </section>

          {/* Card 5: Zone E (The Feline Kingdom) */}
          <section className="aspect-[2/3] min-h-[480px] flex flex-col relative overflow-hidden rounded-lg bg-[#fdf6e9] text-center shadow-md border border-black/5 group hover:shadow-xl transition-all duration-500 pb-[42px]">
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <div className="bg-[#f1641e] text-white px-5 py-1 [clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)] font-bold text-sm inline-block font-display">
                  ZONE E
                </div>
                <h3 className="text-[#f1641e] font-black text-xl mt-2 leading-tight uppercase font-display">
                  {t('list.zone_e.title').replace(/^Zone \w:\s*/i, '').replace(/^المنطقة \w:\s*/i, '').replace(/^المنطقة \S+:\s*/i, '')}
                </h3>
                <p className="text-xs font-bold text-[#333333]/60 mb-4 tracking-wider uppercase">
                  {t('list.zone_e.subtitle')}
                </p>
                
                <div className="relative mb-4 w-full h-32 rounded shadow overflow-hidden">
                  <Image 
                    alt="Fluffy Cat" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida/ADBb0ujYmhd4CKNi2Ii5-Di4wM67sbXMtTWAo71Av766TMaH-jPwwCikM4NfyszjPIVdhFMFQtrUtkhGJzHz81GOGuZ58ju24awPBn0648kQszIpYsGtgSa27bg0JZcXerKG2LyZRK8AkTv4rTZeUrwOpPbsmlEZb33NOyBDeSZvIm8-3vEse-X9oPL0OGyz10t-LrH7iadeLWI1JuMbR-Ha_WDa4odtbbotaTlx0vbMATjFhvB8HDWvcxAB9_Q" 
                  />
                  {/* Dogs Warning Badge */}
                  <div className="absolute bottom-1.5 right-1.5 bg-white border-2 border-red-500 rounded p-1.5 flex items-center gap-1 shadow-md animate-pulse">
                    <span className="text-[7.5px] font-black text-[#333333] leading-tight text-left">
                      DOGS ARE NOT<br />ALLOWED IN TENT
                    </span>
                    <span className="text-red-500 text-sm">🚫</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 text-[10px] text-left rtl:text-right gap-y-1.5 font-bold text-[#333333] px-2 leading-tight">
                  {(t.raw('list.zone_e.items') as string[]).slice(0, 5).map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[#f1641e] flex-shrink-0">🐾</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stamp Circle */}
              <div className="border-2 border-dashed border-gray-300 rounded-full w-20 h-20 flex flex-col items-center justify-center text-center text-[10px] font-bold text-gray-400 uppercase select-none mx-auto mt-4 bg-white/40 group-hover:border-[#f1641e]/50 group-hover:text-[#f1641e]/70 transition-colors duration-500">
                {renderStampText(t('passport.stamp_here'))}
              </div>
            </div>
            
            {/* Footer Bar */}
            <div className="absolute bottom-0 left-0 h-[30px] bg-[#f1641e] w-full flex justify-center items-center">
              <div className="bg-white text-[#f1641e] w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shadow-sm">5</div>
            </div>
          </section>

          {/* Card 6: Zone F (Memory Paws Studio) */}
          <section className="aspect-[2/3] min-h-[480px] flex flex-col relative overflow-hidden rounded-lg bg-[#fdf6e9] text-center shadow-md border border-black/5 group hover:shadow-xl transition-all duration-500 pb-[42px]">
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <div className="bg-[#f1641e] text-white px-5 py-1 [clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)] font-bold text-sm inline-block font-display">
                  ZONE F
                </div>
                <h3 className="text-[#f1641e] font-black text-xl mt-2 leading-tight uppercase font-display">
                  {t('list.zone_f.title').replace(/^Zone \w:\s*/i, '').replace(/^المنطقة \w:\s*/i, '').replace(/^المنطقة \S+:\s*/i, '')}
                </h3>
                <p className="text-xs font-bold text-[#333333]/60 mb-2 tracking-wider uppercase font-display">
                  {t('list.zone_f.subtitle')}
                </p>
                <p className="text-[10px] font-semibold text-[#333333] mb-4">
                  {t('list.zone_f.items.0')}
                </p>
                
                {/* 3 stamps inside Zone F */}
                <div className="flex justify-around items-center gap-2 mb-4 mt-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-full w-14 h-14 flex flex-col items-center justify-center text-center text-[8px] font-bold text-gray-400 uppercase select-none bg-white/40">
                    {renderStampText(t('passport.stamp_here'))}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-full w-14 h-14 flex flex-col items-center justify-center text-center text-[8px] font-bold text-gray-400 uppercase select-none bg-white/40">
                    {renderStampText(t('passport.stamp_here'))}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-full w-14 h-14 flex flex-col items-center justify-center text-center text-[8px] font-bold text-gray-400 uppercase select-none bg-white/40">
                    {renderStampText(t('passport.stamp_here'))}
                  </div>
                </div>
              </div>
              
              <div className="text-[10px] font-bold text-[#f1641e] italic flex items-center justify-center gap-2 mb-2 mt-auto">
                {t('passport.smile')}
              </div>
            </div>
            
            {/* Footer Bar */}
            <div className="absolute bottom-0 left-0 h-[30px] bg-[#f1641e] w-full flex justify-center items-center">
              <div className="bg-white text-[#f1641e] w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shadow-sm">6</div>
            </div>
          </section>

        </div>
      </div>
    </section>
  );
};

export default AboutZones;
