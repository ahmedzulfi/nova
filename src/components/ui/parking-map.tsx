'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParkingLocation {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  mapUrl: string;
  googleMapsLink: string;
  coordinates: string;
}

const PARKING_LOCATIONS: ParkingLocation[] = [
  {
    id: 'lot-a',
    name: 'Main Entrance Parking (Lot A)',
    nameAr: 'مواقف المدخل الرئيسي (موقف أ)',
    description: 'Located directly adjacent to The Pearl Pet Park. Best for quick access to the main entrance. Space is limited, so arriving early is recommended.',
    descriptionAr: 'تقع بجوار حديقة الحيوانات الأليفة مباشرة. الخيار الأفضل للوصول السريع إلى المدخل الرئيسي. المواقف محدودة، لذا ننصح بالوصول مبكراً.',
    mapUrl: 'https://maps.google.com/maps?q=25.3713397,51.5566676&t=&z=16&ie=UTF8&iwloc=&output=embed',
    googleMapsLink: 'https://maps.google.com/maps/place/Pet+Park/@25.3713397,51.5566676,16z/data=!4m6!3m5!1s0x3e45c36bebd7c1ff:0xe9fe34995eb0a7b4!8m2!3d25.3713397!4d51.5566676!16s%2Fg%2F11tdhzkd61',
    coordinates: '25.3713397, 51.5566676'
  },
  {
    id: 'lot-b',
    name: 'Marina Overflow Parking (Lot B)',
    nameAr: 'مواقف بورتو أرابيا الإضافية (موقف ب)',
    description: 'Located at Porto Arabia Marina Retail Parking. A scenic 5-minute walk along the boardwalk to the festival gates. Highly recommended for overflow parking.',
    descriptionAr: 'تقع في مواقف التجزئة لبورتو أرابيا مارينا. على بعد 5 دقائق سيراً على الأقدام على طول الممشى إلى بوابات المهرجان. خيار ممتاز للمواقف الإضافية.',
    mapUrl: 'https://maps.google.com/maps?q=25.3752,51.5518&t=&z=16&ie=UTF8&iwloc=&output=embed',
    googleMapsLink: 'https://maps.google.com/maps?q=25.3752,51.5518',
    coordinates: '25.3752, 51.5518'
  }
];

interface ParkingMapProps {
  className?: string;
}

export default function ParkingMap({ className }: ParkingMapProps) {
  const [activeLot, setActiveLot] = useState<string>('lot-a');
  const isArabic = typeof window !== 'undefined' && window.location.pathname.includes('/ar');

  const activeLocation = PARKING_LOCATIONS.find(loc => loc.id === activeLot) || PARKING_LOCATIONS[0];

  return (
    <div className={cn("w-full flex flex-col bg-[#F7F6F3] border border-[#E9E9E7] rounded-sm overflow-hidden shadow-xs", className)}>
      {/* Toggles */}
      <div className="flex border-b border-[#E9E9E7] p-1 bg-white">
        {PARKING_LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            type="button"
            onClick={() => setActiveLot(loc.id)}
            className={cn(
              "flex-1 py-3 px-4 text-[11px] md:text-[12px] font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer text-center",
              activeLot === loc.id 
                ? "bg-[#465067] text-white" 
                : "text-[#91918E] hover:text-[#37352F] hover:bg-[#F7F6F3]"
            )}
          >
            {isArabic ? loc.nameAr : loc.name}
          </button>
        ))}
      </div>

      {/* Map Embed */}
      <div className="relative w-full aspect-video overflow-hidden bg-black/5 min-h-[300px]">
        <iframe
          src={activeLocation.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-700"
        ></iframe>
      </div>

      {/* Information Panel */}
      <div className="p-5 md:p-6 space-y-4 bg-white border-t border-[#E9E9E7]">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[#FC7911] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-[13px] font-bold text-[#37352F] uppercase tracking-wider">
              {isArabic ? 'التعليمات والتفاصيل' : 'Directions & Details'}
            </h4>
            <p className="text-[13px] text-[#666666] leading-relaxed font-medium">
              {isArabic ? activeLocation.descriptionAr : activeLocation.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={activeLocation.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F6F3] hover:bg-[#465067] hover:text-white text-[#37352F] text-[11px] font-bold uppercase tracking-wider rounded-sm transition-all border border-[#E9E9E7]"
          >
            <Navigation className="w-3.5 h-3.5" />
            {isArabic ? 'الذهاب إلى خرائط Google' : 'Open in Google Maps'}
          </a>
          <span className="inline-flex items-center gap-1.5 px-3 py-2 text-[#91918E] text-[11px] font-mono select-all bg-[#F7F6F3] rounded-sm border border-[#E9E9E7]/40">
            <Compass className="w-3.5 h-3.5" />
            {activeLocation.coordinates}
          </span>
        </div>
      </div>
    </div>
  );
}
