"use client";

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

const EventSelectionGrid = ({ onSelect, selectedEventId }: { onSelect: (id: string, title: string) => void, selectedEventId?: string }) => {
  const t = useTranslations('CompetitionsPage.list');
  const tReg = useTranslations('RegistrationPage.steps');

  const events = [
    { id: 'dog-best-in-show', key: 'dog_show', category: 'dog', image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop' },
    { id: 'dog-grooming', key: 'grooming', category: 'dog', image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2070&auto=format&fit=crop' },
    { id: 'dog-fashion-show', key: 'fashion', category: 'dog', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop' },
    { id: 'cat-best-show', key: 'cat_show', category: 'cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop' },
    { id: 'cat-drawing-battle', key: 'drawing', category: 'cat', image: 'https://images.unsplash.com/photo-1533702165324-66678e2034b1?q=80&w=1974&auto=format&fit=crop' },
    { id: 'cat-fashion-show', key: 'fashion', category: 'cat', image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <button
          key={event.id}
          type="button"
          onClick={() => onSelect(event.id, t(`items.${event.key}.title`))}
          className={`group relative aspect-[4/3] rounded-sm overflow-hidden transition-all duration-500 text-left ${
            selectedEventId === event.id
              ? 'ring-4 ring-primary ring-offset-4 ring-offset-white'
              : 'hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-white'
          }`}
        >
          <Image
            src={event.image}
            alt={t(`items.${event.key}.title`)}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            selectedEventId === event.id ? 'bg-primary/20' : 'bg-black/60 group-hover:bg-black/20'
          }`} />

          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] mb-3 block rtl:text-right">
              {event.category === 'dog' ? tReg('dog') : tReg('cat')}
            </span>
            <h3 className="text-[22px] md:text-[26px] font-bold text-white leading-tight font-display tracking-tight rtl:text-right">
              {t(`items.${event.key}.title`)}
            </h3>
          </div>

          {selectedEventId === event.id && (
            <div className="absolute top-6 right-6 rtl:right-auto rtl:left-6 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center animate-in zoom-in duration-500 shadow-2xl">
              <Check className="w-6 h-6 stroke-[3px]" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default EventSelectionGrid;
