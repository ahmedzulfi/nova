"use client";

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

const events = [
    {
        id: 'dog-best-in-show',
        title: 'Best in Show',
        category: 'Dogs',
        image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 'dog-grooming',
        title: 'Grooming',
        category: 'Dogs',
        image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 'dog-fashion-show',
        title: 'Fashion Show',
        category: 'Dogs',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop',
    },
    {
        id: 'cat-best-show',
        title: 'Best Cat Show',
        category: 'Cats',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop',
    },
    {
        id: 'cat-drawing-battle',
        title: 'Drawing Cat Battle',
        category: 'Cats',
        image: 'https://images.unsplash.com/photo-1533702165324-66678e2034b1?q=80&w=1974&auto=format&fit=crop',
    },
    {
        id: 'cat-fashion-show',
        title: 'Fashion Show',
        category: 'Cats',
        image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop',
    }
];

interface EventSelectionGridProps {
    onSelect: (eventId: string, eventTitle: string) => void;
    selectedEventId?: string;
}

const EventSelectionGrid = ({ onSelect, selectedEventId }: EventSelectionGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
                <button
                    key={event.id}
                    type="button"
                    onClick={() => onSelect(event.id, event.title)}
                    className={`group relative aspect-[4/3] rounded-none overflow-hidden transition-all duration-500 ease-[var(--ease-out)] text-left active:scale-[0.98] ${selectedEventId === event.id
                        ? 'border-4 border-primary'
                        : 'border border-black/5'
                        }`}
                >
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ${selectedEventId === event.id ? 'bg-primary/10' : 'bg-black/40 group-hover:bg-black/20'
                        }`} />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <span className="text-[11px] font-black text-white uppercase tracking-[0.2em] mb-3">
                            {event.category}
                        </span>
                        <h3 className="text-[24px] md:text-[28px] font-black text-white leading-tight font-display tracking-tight">
                            {event.title}
                        </h3>
                    </div>

                    {/* Selected Badge */}
                    {selectedEventId === event.id && (
                        <div className="absolute top-6 right-6 w-10 h-10 bg-primary text-black rounded-none flex items-center justify-center animate-in zoom-in duration-300">
                            <Check className="w-6 h-6 stroke-[3px]" />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default EventSelectionGrid;
